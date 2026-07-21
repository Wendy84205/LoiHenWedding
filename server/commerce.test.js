import { beforeEach, describe, expect, it } from 'vitest';
import {
  createAdminPreviewToken,
  createGuestToken,
  getCommerceConfigurationStatus,
  getOrderToken,
  isCronAuthorized,
  probeCommerceRuntime,
  secureTextEqual,
  verifyAdminPreviewToken,
  verifyGuestToken,
} from './commerce.js';

describe('signed invitation tokens', () => {
  beforeEach(() => {
    process.env.DATA_HASH_SALT = 'test-only-secret-with-enough-entropy';
  });

  it('accepts a valid short-lived admin preview token only for its invitation', () => {
    const token = createAdminPreviewToken('invite-1', 60);
    expect(verifyAdminPreviewToken(token, 'invite-1')).toBe(true);
    expect(verifyAdminPreviewToken(token, 'invite-2')).toBe(false);
    expect(verifyAdminPreviewToken(`${token}x`, 'invite-1')).toBe(false);
  });

  it('round-trips a personalized guest token and rejects tampering', () => {
    const token = createGuestToken('guest-1', 'invite-1');
    expect(verifyGuestToken(token, 'invite-1')).toBe('guest-1');
    expect(verifyGuestToken(token, 'invite-2')).toBe('');
    const [, payload, signature] = token.split('.');
    const tamperedPayload = `${payload.slice(0, -1)}${payload.endsWith('A') ? 'B' : 'A'}`;
    expect(verifyGuestToken(`guest.${tamperedPayload}.${signature}`, 'invite-1')).toBe('');
    expect(verifyGuestToken(`${token}x`, 'invite-1')).toBe('');
  });

  it('prefers the order token header so secrets do not need to be sent in URLs', () => {
    expect(getOrderToken({ headers: { 'x-order-token': 'header-secret' }, query: { token: 'query-secret' }, body: {} })).toBe('header-secret');
  });

  it('compares secrets without leaking partial string matches', () => {
    expect(secureTextEqual('same-secret', 'same-secret')).toBe(true);
    expect(secureTextEqual('same-secret', 'same-secrex')).toBe(false);
    expect(secureTextEqual('short', 'a-longer-secret')).toBe(false);
  });

  it('separates a usable backend from a production-ready commerce configuration', () => {
    const environment = {
      SUPABASE_URL: 'https://project.supabase.co',
      SUPABASE_SERVICE_ROLE_KEY: 's'.repeat(64),
      DATA_HASH_SALT: 'h'.repeat(48),
      PUBLIC_SITE_URL: 'https://thiep.example.vn',
      VITE_BANK_NAME: 'Vietcombank',
      VITE_BANK_ACCOUNT: '0123456789',
      VITE_BANK_OWNER: 'LOI HEN STUDIO',
      GOOGLE_OAUTH_ENABLED: 'true',
      CRON_SECRET: 'c'.repeat(48),
      RESEND_API_KEY: `re_${'e'.repeat(32)}`,
      EMAIL_FROM: 'Loi Hen <hello@loihen.vn>',
      STUDIO_NOTIFICATION_EMAIL: 'studio@loihen.vn',
    };
    expect(getCommerceConfigurationStatus(environment)).toMatchObject({
      backendConfigured: true,
      productionConfigured: true,
      missing: [],
    });
    const withoutPayment = getCommerceConfigurationStatus({ ...environment, VITE_BANK_ACCOUNT: '' });
    expect(withoutPayment.backendConfigured).toBe(true);
    expect(withoutPayment.productionConfigured).toBe(false);
    expect(withoutPayment.missing).toContain('bankTransfer');
    const withoutOperations = getCommerceConfigurationStatus({ ...environment, CRON_SECRET: '', RESEND_API_KEY: '' });
    expect(withoutOperations.backendConfigured).toBe(true);
    expect(withoutOperations.productionConfigured).toBe(false);
    expect(withoutOperations.missing).toEqual(expect.arrayContaining(['cronSecret', 'emailNotifications']));
  });

  it('fails closed when the maintenance secret is missing or mismatched', () => {
    const environment = { CRON_SECRET: 'c'.repeat(48) };
    expect(isCronAuthorized({ headers: { authorization: `Bearer ${environment.CRON_SECRET}` } }, environment)).toBe(true);
    expect(isCronAuthorized({ headers: { authorization: 'Bearer wrong' } }, environment)).toBe(false);
    expect(isCronAuthorized({ headers: {} }, {})).toBe(false);
  });

  it('rejects placeholders and reports database, storage and auth probes independently', async () => {
    expect(getCommerceConfigurationStatus({
      SUPABASE_URL: 'replace-me',
      SUPABASE_SERVICE_ROLE_KEY: 'change-me',
      DATA_HASH_SALT: 'short',
    }).backendConfigured).toBe(false);
    let query = 0;
    const supabase = {
      from: () => ({ select: () => ({ limit: async () => ({ error: query++ < 2 ? null : { message: 'migration missing' } }) }) }),
      storage: { getBucket: async () => ({ error: { message: 'missing bucket' } }) },
      auth: { admin: { listUsers: async () => ({ error: null, data: { users: [] } }) } },
    };
    await expect(probeCommerceRuntime(supabase)).resolves.toEqual({
      checked: true,
      database: true,
      schema: false,
      storage: false,
      auth: true,
    });
  });
});
