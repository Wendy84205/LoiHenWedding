-- Preserve storage paths after an order row is deleted so object cleanup can be
-- retried by the daily maintenance task if the storage service is unavailable.
create table if not exists public.asset_cleanup_jobs (
  id uuid primary key default gen_random_uuid(),
  order_id uuid,
  storage_bucket text not null default 'order-assets',
  storage_path text not null,
  status text not null default 'pending' check (status in ('pending', 'completed')),
  attempts integer not null default 0 check (attempts >= 0),
  last_error text,
  created_at timestamptz not null default now(),
  completed_at timestamptz,
  unique (storage_bucket, storage_path)
);

create index if not exists asset_cleanup_jobs_pending_idx
on public.asset_cleanup_jobs(status, created_at);

alter table public.asset_cleanup_jobs enable row level security;
revoke all on table public.asset_cleanup_jobs from public, anon, authenticated;
grant all on table public.asset_cleanup_jobs to service_role;

