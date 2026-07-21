import { describe, expect, it, vi } from 'vitest';
import {
  escapeEmailHtml, getNotificationConfiguration, sendTransactionalEmail,
} from './notifications.js';

const environment = {
  RESEND_API_KEY: `re_${'x'.repeat(30)}`,
  EMAIL_FROM: 'Loi Hen Studio <hello@loihen.vn>',
  STUDIO_NOTIFICATION_EMAIL: 'studio@loihen.vn',
};

describe('transactional email', () => {
  it('fails closed when sender configuration is incomplete', () => {
    expect(getNotificationConfiguration(environment).configured).toBe(true);
    expect(getNotificationConfiguration({ ...environment, RESEND_API_KEY: '' }).configured).toBe(false);
    expect(getNotificationConfiguration({ ...environment, EMAIL_FROM: 'not-an-email' }).configured).toBe(false);
  });

  it('escapes customer content before it is embedded into HTML', () => {
    expect(escapeEmailHtml('<img src=x onerror=alert(1)>')).toBe('&lt;img src=x onerror=alert(1)&gt;');
  });

  it('sends a bounded idempotent request to Resend', async () => {
    const fetchImpl = vi.fn(async () => ({ ok: true, json: async () => ({ id: 'email-1' }) }));
    await expect(sendTransactionalEmail({
      to: 'customer@example.com',
      subject: 'Đơn mới',
      text: 'Nội dung',
      html: '<p>Nội dung</p>',
      idempotencyKey: 'order-1-customer',
    }, { environment, fetchImpl })).resolves.toEqual({ sent: true, id: 'email-1' });
    expect(fetchImpl).toHaveBeenCalledWith('https://api.resend.com/emails', expect.objectContaining({ method: 'POST' }));
    const request = fetchImpl.mock.calls[0][1];
    expect(request.headers.Authorization).toBe(`Bearer ${environment.RESEND_API_KEY}`);
    expect(request.headers['Idempotency-Key']).toBe('order-1-customer');
  });
});

