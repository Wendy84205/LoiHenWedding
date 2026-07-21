import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

function migration(name) {
  return readFileSync(resolve(process.cwd(), `supabase/migrations/${name}`), 'utf8');
}

describe('production database migrations', () => {
  it('keeps commerce rows private and tracks signed upload reservations', () => {
    const sql = migration('202607160008_production_hardening.sql');
    expect(sql).toContain('create table if not exists public.asset_upload_reservations');
    expect(sql).toContain('drop policy if exists public_read_published_invitations');
    for (const table of ['customers', 'orders', 'invitations', 'assets', 'rsvps', 'wishes']) {
      expect(sql).toContain(`revoke all on table public.${table} from public, anon, authenticated`);
    }
  });

  it('publishes the draft and order through one version-checked transaction', () => {
    const sql = migration('202607160009_atomic_publish.sql');
    expect(sql).toContain('create or replace function public.publish_invitation_draft');
    expect(sql).toContain('for update');
    expect(sql).toContain('draft_version_conflict');
    expect(sql).toContain("set status = 'published'");
    expect(sql).toContain('to service_role');
  });

  it('keeps storage cleanup retryable after deleting customer data', () => {
    const sql = migration('202607160010_asset_cleanup_jobs.sql');
    expect(sql).toContain('create table if not exists public.asset_cleanup_jobs');
    expect(sql).toContain("status text not null default 'pending'");
    expect(sql).toContain('revoke all on table public.asset_cleanup_jobs');
  });
});
