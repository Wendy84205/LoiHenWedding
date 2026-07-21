function validEmail(value) {
  return /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(String(value || '').trim());
}

function senderEmail(value) {
  const normalized = String(value || '').trim();
  const bracketed = normalized.match(/<([^<>]+)>$/)?.[1];
  return bracketed || normalized;
}

export function getNotificationConfiguration(environment = process.env) {
  const apiKey = String(environment.RESEND_API_KEY || '').trim();
  const from = String(environment.EMAIL_FROM || '').trim();
  const studioEmail = String(environment.STUDIO_NOTIFICATION_EMAIL || '').trim();
  return {
    apiKey,
    from,
    studioEmail,
    configured: apiKey.startsWith('re_') && apiKey.length >= 20
      && validEmail(senderEmail(from)) && validEmail(studioEmail),
  };
}

export function escapeEmailHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export async function sendTransactionalEmail(message, options = {}) {
  const environment = options.environment || process.env;
  const fetchImpl = options.fetchImpl || fetch;
  const config = getNotificationConfiguration(environment);
  if (!config.configured) return { sent: false, skipped: true };

  const recipients = (Array.isArray(message.to) ? message.to : [message.to])
    .map((value) => String(value || '').trim())
    .filter(validEmail);
  if (!recipients.length) return { sent: false, skipped: true };

  const response = await fetchImpl('https://api.resend.com/emails', {
    method: 'POST',
    signal: AbortSignal.timeout(4000),
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': String(message.idempotencyKey || '').slice(0, 256),
      'User-Agent': 'LoiHenStudio/1.0',
    },
    body: JSON.stringify({
      from: config.from,
      to: recipients,
      subject: String(message.subject || '').slice(0, 240),
      text: String(message.text || ''),
      html: String(message.html || ''),
    }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.message || 'Không thể gửi email giao dịch.');
    error.code = 'email_delivery_failed';
    throw error;
  }
  return { sent: true, id: payload.id || '' };
}

export async function sendTransactionalEmailSafely(message, options = {}) {
  try {
    return await sendTransactionalEmail(message, options);
  } catch (error) {
    console.error('[commerce:email]', { code: error.code, message: error.message });
    return { sent: false, error: true };
  }
}
