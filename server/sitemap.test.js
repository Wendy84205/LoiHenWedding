import { afterEach, describe, expect, it, vi } from 'vitest';
import handler from '../endpoints/sitemap.js';

afterEach(() => vi.unstubAllEnvs());

describe('sitemap endpoint', () => {
  it('publishes only the 108 active catalog templates', async () => {
    vi.stubEnv('SUPABASE_URL', '');
    vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', '');
    const response = {
      body: '',
      statusCode: 0,
      headers: {},
      setHeader(name, value) { this.headers[name] = value; },
      status(code) { this.statusCode = code; return this; },
      send(body) { this.body = body; return this; },
    };

    await handler({}, response);

    expect(response.statusCode).toBe(200);
    expect(response.headers['Content-Type']).toContain('application/xml');
    expect(response.body.match(/\/template\//g)).toHaveLength(108);
    expect(response.body).not.toContain('/template/thiep-cuoi-51');
    expect(response.body).not.toContain('/template/thiep-cuoi-112');
  });
});
