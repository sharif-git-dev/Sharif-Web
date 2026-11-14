// HTTP integration checks against the real endpoint and a local fake mail transport.
// This never connects to an SMTP server or sends a real message.
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import fs from 'node:fs/promises';
import net from 'node:net';
import path from 'node:path';
import { setTimeout as wait } from 'node:timers/promises';

const workspace = process.cwd();
const tools = path.resolve(workspace, '.tools');
await fs.mkdir(tools, { recursive: true });
const fixture = await fs.mkdtemp(path.join(tools, 'contact-tests-'));
const api = path.join(fixture, 'site', 'api');
const stateDir = path.join(fixture, 'private', 'sharifjamo-contact');
await fs.mkdir(path.join(api, 'lib', 'PHPMailer'), { recursive: true });
await fs.mkdir(stateDir, { recursive: true });
await fs.copyFile(path.join(workspace, 'public/api/contact.php'), path.join(api, 'contact.php'));
for (const name of ['Exception.php', 'SMTP.php']) await fs.writeFile(path.join(api, 'lib/PHPMailer', name), '<?php\n');
await fs.writeFile(path.join(api, 'lib/PHPMailer/PHPMailer.php'), `<?php
namespace PHPMailer\\PHPMailer;
#[\\AllowDynamicProperties]
class PHPMailer {
    const ENCRYPTION_SMTPS = 'ssl';
    public array $captured = [];
    public function __construct($exceptions = true) {}
    public function __call($name, $arguments) { $this->captured[$name] = $arguments; }
    public function send() {
        if (str_contains($this->Body, 'SIMULATE_FAILURE')) throw new \\RuntimeException('Simulated SMTP failure');
        $this->captured['transport'] = [$this->Host, $this->Port, $this->SMTPSecure, $this->SMTPAuth];
        $this->captured['tls'] = $this->SMTPOptions;
        file_put_contents(dirname(__DIR__, 4) . '/transport.json', json_encode($this->captured));
        return true;
    }
}
`);
const reserve = net.createServer();
reserve.listen(0, '127.0.0.1'); await once(reserve, 'listening');
const port = reserve.address().port;
await new Promise(resolve => reserve.close(resolve));
const php = process.env.PHP_BIN || path.join(tools, 'php', 'php.exe');
const server = spawn(php, ['-S', `127.0.0.1:${port}`, '-t', path.join(fixture, 'site')], { stdio: 'pipe' });
let logs = '';
server.stderr.on('data', chunk => { logs += chunk; });
const url = `http://127.0.0.1:${port}/api/contact.php`;
const valid = { name: 'Alex Example', replyTo: 'alex@example.com', message: 'Please help with my new website.', interest: ['Web development'], website: '', requestId: 'test-request-00000001' };
const headers = { 'Content-Type': 'application/json', 'X-Contact-Form': '1', Origin: 'https://sharifjamo.com' };
const post = (body = valid, extra = {}) => fetch(url, { method: 'POST', headers: { ...headers, ...extra }, body: JSON.stringify(body) });
const reset = async () => { await fs.writeFile(path.join(stateDir, 'delivery-state.json'), JSON.stringify({ attempts: [], requests: [] })); };
let checks = 0;
const check = (condition, description) => { assert.ok(condition, description); checks++; console.log(`PASS ${description}`); };
try {
  let ready = false;
  for (let attempt = 0; attempt < 40; attempt++) {
    try { const response = await fetch(url); if (response.status === 405) { ready = true; break; } } catch {}
    await wait(100);
  }
  assert.ok(ready, `PHP server did not start: ${logs}`);
  check((await fetch(url)).status === 405, 'GET cannot send mail');
  check((await post()).status === 503, 'missing private config fails clearly');
  await fs.writeFile(path.join(stateDir, 'config.php'), `<?php return ['smtp_password' => 'local-test-only', 'allowed_origins' => ['https://sharifjamo.com']];`);
  check((await post(valid, { Origin: 'https://other.example' })).status === 403, 'foreign browser origin rejected');
  check((await post(valid, { 'X-Contact-Form': '' })).status === 415, 'ordinary cross-site form posts rejected');
  check((await post({ ...valid, name: 'Bad\\r\\nBcc:bad@example.com'.replaceAll('\\r', '\r').replaceAll('\\n', '\n') })).status === 422, 'header injection rejected');
  check((await post({ ...valid, message: 'x'.repeat(4001) })).status === 422, 'message length enforced on server');
  check((await post({ ...valid, website: 'spam.example' })).status === 422, 'honeypot rejected');
  check((await post({ ...valid, interest: ['Unknown topic'] })).status === 422, 'unknown topics rejected');
  const sent = await post();
  check(sent.status === 200 && (await sent.json()).success === true, 'valid submission accepted by transport');
  const transportPath = path.join(fixture, 'transport.json');
  // The fake transport records the calls; no network mail is involved.
  const transport = JSON.parse(await fs.readFile(transportPath, 'utf8'));
  check(transport.setFrom[0] === 'info@sharifjamo.com' && transport.addAddress[0] === 'info@sharifjamo.com' && transport.addReplyTo[0] === 'alex@example.com', 'fixed sender and recipient; visitor is Reply-To only');
  check(transport.transport.join('|') === 'sharifjamo.com|465|ssl|true' && transport.tls.ssl.verify_peer && transport.tls.ssl.verify_peer_name && !transport.tls.ssl.allow_self_signed, 'authenticated implicit TLS with certificate verification');
  const before = JSON.parse(await fs.readFile(path.join(stateDir, 'delivery-state.json'), 'utf8')).attempts.length;
  check((await post()).status === 200, 'same request ID can be retried successfully');
  check(JSON.parse(await fs.readFile(path.join(stateDir, 'delivery-state.json'), 'utf8')).attempts.length === before, 'retry does not send twice');
  check((await post({ ...valid, message: 'A different message using the same ID.' })).status === 409, 'request ID cannot be reused for different contents');
  await reset();
  const attempts = Array.from({ length: 12 }, () => ({ time: Math.floor(Date.now() / 1000), ip: 'other-address' }));
  await fs.writeFile(path.join(stateDir, 'delivery-state.json'), JSON.stringify({ attempts, requests: {} }));
  check((await post()).status === 429, 'global quota protects the 20-per-hour mailbox allowance');
  await reset();
  const failed = { ...valid, message: 'SIMULATE_FAILURE: transport unavailable' };
  check((await post(failed)).status === 503, 'SMTP failure is not reported as success');
  const failureState = JSON.parse(await fs.readFile(path.join(stateDir, 'delivery-state.json'), 'utf8'));
  check(!failureState.requests[failed.requestId] && failureState.attempts.length === 1, 'failed sends release their request ID but still count against abuse limits');
  console.log(`${checks} contact endpoint checks passed; no real email sent.`);
} finally {
  server.kill();
  await once(server, 'exit').catch(() => {});
  if (!fixture.startsWith(path.join(tools, 'contact-tests-'))) throw new Error('Unexpected fixture path');
  await fs.rm(fixture, { recursive: true, force: true });
}
