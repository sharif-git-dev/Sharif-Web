export function newRequestId() {
  return window.crypto?.randomUUID?.()
    || `contact-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 14)}`;
}

export async function sendInquiry(payload, signal) {
  const response = await fetch('/api/contact.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Contact-Form': '1' },
    credentials: 'same-origin',
    signal,
    body: JSON.stringify(payload),
  });
  let result;
  try { result = await response.json(); } catch {
    throw new Error('Message sending is unavailable. Please email info@sharifjamo.com directly.');
  }
  if (!response.ok || result.success !== true) {
    throw new Error(typeof result.message === 'string' ? result.message : 'We could not send your message. Please try again.');
  }
  return result;
}
