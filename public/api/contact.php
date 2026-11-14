<?php
declare(strict_types=1);

// Credentials and delivery state live outside the website's document root.
ini_set('display_errors', '0');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $status, string $message, bool $success = false): never
{
    http_response_code($status);
    echo json_encode(['success' => $success, 'message' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

function lengthOf(string $value): int
{
    return preg_match_all('/./us', $value) ?: 0;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, 'Please submit the contact form.');
}
if (strtolower(trim(explode(';', $_SERVER['CONTENT_TYPE'] ?? '')[0])) !== 'application/json'
    || ($_SERVER['HTTP_X_CONTACT_FORM'] ?? '') !== '1') {
    respond(415, 'Please submit the contact form on this website.');
}
if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 20000) {
    respond(413, 'Your message is too long.');
}
$raw = file_get_contents('php://input', false, null, 0, 20001);
if ($raw === false || strlen($raw) > 20000) {
    respond(413, 'Your message is too long.');
}
try {
    $input = json_decode($raw, true, 16, JSON_THROW_ON_ERROR);
} catch (JsonException $error) {
    respond(400, 'The message could not be read. Please try again.');
}
if (!is_array($input)) {
    respond(400, 'Please check the form and try again.');
}
foreach (['name', 'replyTo', 'message', 'website', 'requestId'] as $field) {
    if (isset($input[$field]) && !is_string($input[$field])) {
        respond(422, 'Please check the form and try again.');
    }
}
$name = trim($input['name'] ?? '');
$replyTo = trim($input['replyTo'] ?? '');
$message = trim($input['message'] ?? '');
$requestId = $input['requestId'] ?? '';
$interest = $input['interest'] ?? [];
$topics = ['Product design', 'Web development', 'Mobile app', 'AI automation', 'AI video', 'Something else'];
if (trim($input['website'] ?? '') !== '') {
    respond(422, 'The message could not be accepted. Please email us directly.');
}
if (lengthOf($name) < 2 || lengthOf($name) > 100 || preg_match('/[\r\n\x00]/', $name)
    || strlen($replyTo) > 254 || !filter_var($replyTo, FILTER_VALIDATE_EMAIL)
    || preg_match('/[\r\n\x00]/', $replyTo)
    || lengthOf($message) < 10 || lengthOf($message) > 4000 || str_contains($message, "\0")
    || !preg_match('/^[a-zA-Z0-9-]{16,80}$/D', $requestId)
    || !is_array($interest) || !array_is_list($interest) || count($interest) > count($topics)) {
    respond(422, 'Please enter a valid name, email address and message (10–4,000 characters).');
}
foreach ($interest as $topic) {
    if (!is_string($topic) || !in_array($topic, $topics, true)) {
        respond(422, 'Please choose one of the available project topics.');
    }
}
$interest = array_values(array_unique($interest));
$payloadHash = hash('sha256', json_encode([$name, $replyTo, $message, $interest]));
$lock = null;
$accepted = false;

try {
    $configPath = getenv('SHARIF_CONTACT_CONFIG')
        ?: dirname(__DIR__, 2) . '/private/sharifjamo-contact/config.php';
    if (!is_file($configPath)) {
        respond(503, 'Message sending is not available yet. Please email info@sharifjamo.com directly.');
    }
    $config = require $configPath;
    if (!is_array($config) || empty($config['smtp_password'])
        || $config['smtp_password'] === 'SET_MAILBOX_PASSWORD_HERE') {
        respond(503, 'Message sending is not available yet. Please email info@sharifjamo.com directly.');
    }

    // No wildcard CORS. A browser on another origin cannot post this JSON API.
    $allowedOrigins = $config['allowed_origins'] ?? ['https://sharifjamo.com', 'https://www.sharifjamo.com'];
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if (($origin !== '' && !in_array($origin, $allowedOrigins, true))
        || ($_SERVER['HTTP_SEC_FETCH_SITE'] ?? '') === 'cross-site') {
        respond(403, 'Please send your message from sharifjamo.com.');
    }

    $stateDir = dirname($configPath);
    // A nonblocking lock prevents parallel sends from exceeding the host quota.
    $lock = fopen($stateDir . '/delivery-state.json', 'c+');
    if ($lock === false) {
        throw new RuntimeException('Private delivery state is not writable.');
    }
    @chmod($stateDir . '/delivery-state.json', 0600);
    if (!flock($lock, LOCK_EX | LOCK_NB)) {
        header('Retry-After: 20');
        respond(503, 'Another message is being processed. Please try again in a moment.');
    }
    $saved = stream_get_contents($lock);
    $state = $saved === '' ? ['attempts' => [], 'requests' => []] : json_decode($saved, true, 32, JSON_THROW_ON_ERROR);
    if (!is_array($state) || !isset($state['attempts'], $state['requests'])
        || !is_array($state['attempts']) || !is_array($state['requests'])) {
        throw new RuntimeException('Invalid delivery state.');
    }
    $now = time();
    $state['attempts'] = array_values(array_filter($state['attempts'], static fn($item) => $item['time'] > $now - 3600));
    $state['requests'] = array_filter($state['requests'], static fn($item) => $item['time'] > $now - 86400);
    $existing = $state['requests'][$requestId] ?? null;
    if ($existing !== null) {
        if (!hash_equals($existing['hash'], $payloadHash)) {
            respond(409, 'The form changed. Please refresh the page and try again.');
        }
        if ($existing['status'] === 'sent') {
            respond(200, 'Your message has been sent. Thank you for getting in touch.', true);
        }
        respond(409, 'This message is already being processed. Please wait before trying again.');
    }
    // Use REMOTE_ADDR, never client-controlled forwarding headers.
    $ip = hash_hmac('sha256', $_SERVER['REMOTE_ADDR'] ?? 'unknown', $config['smtp_password']);
    $ownAttempts = array_filter($state['attempts'], static fn($item) => $item['ip'] === $ip);
    $globalLimit = max(1, min(12, (int) ($config['hourly_limit'] ?? 12)));
    if (count($state['attempts']) >= $globalLimit || count($ownAttempts) >= 3) {
        header('Retry-After: 3600');
        respond(429, 'The contact form has reached its sending limit. Please try again later or email info@sharifjamo.com.');
    }
    foreach ($ownAttempts as $attempt) {
        if ($attempt['time'] > $now - 30) {
            header('Retry-After: 30');
            respond(429, 'Please wait a moment before sending another message.');
        }
    }
    $persist = static function () use (&$state, $lock): void {
        $json = json_encode($state, JSON_THROW_ON_ERROR);
        rewind($lock);
        if (!ftruncate($lock, 0) || fwrite($lock, $json) !== strlen($json) || !fflush($lock)) {
            throw new RuntimeException('Could not save delivery state.');
        }
    };
    // Attempts count even if SMTP fails, to protect the provider's hourly quota.
    $state['attempts'][] = ['time' => $now, 'ip' => $ip];
    $state['requests'][$requestId] = ['time' => $now, 'hash' => $payloadHash, 'status' => 'pending'];
    $persist();

    require_once __DIR__ . '/lib/PHPMailer/Exception.php';
    require_once __DIR__ . '/lib/PHPMailer/PHPMailer.php';
    require_once __DIR__ . '/lib/PHPMailer/SMTP.php';
    $mail = new PHPMailer\PHPMailer\PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = $config['smtp_host'] ?? 'sharifjamo.com';
    $mail->Port = 465;
    $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS;
    $mail->SMTPAuth = true;
    $mail->Username = 'info@sharifjamo.com';
    $mail->Password = $config['smtp_password'];
    $mail->Timeout = 15;
    $mail->Timelimit = 20;
    $mail->SMTPDebug = 0;
    $mail->CharSet = 'UTF-8';
    $mail->MessageID = '<contact-' . $requestId . '@sharifjamo.com>';
    // Keep certificate and hostname verification enabled.
    $mail->SMTPOptions = ['ssl' => ['verify_peer' => true, 'verify_peer_name' => true, 'allow_self_signed' => false]];
    $mail->setFrom('info@sharifjamo.com', 'Sharif Jamo website');
    $mail->addAddress('info@sharifjamo.com');
    $mail->addReplyTo($replyTo, $name);
    $mail->Subject = 'Website inquiry' . ($interest !== [] ? ' — ' . implode(', ', $interest) : '');
    $mail->isHTML(false);
    $mail->Body = "New website inquiry\n\nName: {$name}\nEmail: {$replyTo}\nInterested in: "
        . ($interest !== [] ? implode(', ', $interest) : 'Let’s discuss') . "\n\n{$message}\n";
    if (!$mail->send()) {
        throw new RuntimeException('SMTP did not accept the message.');
    }
    $accepted = true;
    $state['requests'][$requestId]['status'] = 'sent';
    $persist();
    flock($lock, LOCK_UN);
    fclose($lock);
    respond(200, 'Your message has been sent. Thank you for getting in touch.', true);
} catch (Throwable $error) {
    // Never return SMTP diagnostics, credentials or visitor data to the browser.
    error_log('Contact delivery failed: ' . get_class($error));
    if (!$accepted && isset($state['requests'][$requestId], $persist)) {
        unset($state['requests'][$requestId]);
        try { $persist(); } catch (Throwable $storageError) {
            error_log('Contact delivery state could not be updated.');
        }
    }
    if (is_resource($lock)) {
        flock($lock, LOCK_UN);
        fclose($lock);
    }
    if ($accepted) {
        respond(200, 'Your message has been sent. Thank you for getting in touch.', true);
    }
    respond(503, 'We could not send your message. Please email info@sharifjamo.com directly.');
}
