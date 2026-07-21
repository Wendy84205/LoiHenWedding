-- Keep all commerce records behind the server API and reserve signed uploads so
-- abandoned URLs cannot bypass package quotas or accumulate orphaned objects.
create table if not exists public.asset_upload_reservations (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  storage_path text not null unique,
  kind text not null check (kind in (
    'hero', 'bride', 'groom', 'couple', 'venue', 'final', 'gallery', 'music',
    'social', 'payment_proof', 'gift_qr', 'other'
  )),
  original_name text not null,
  content_type text not null check (content_type in (
    'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'audio/mpeg', 'audio/mp4'
  )),
  byte_size bigint not null check (byte_size > 0 and byte_size <= 15728640),
  status text not null default 'pending' check (status in ('pending', 'completed', 'cancelled', 'expired')),
  asset_id uuid references public.assets(id) on delete set null,
  expires_at timestamptz not null,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists asset_upload_reservations_order_pending_idx
on public.asset_upload_reservations(order_id, status, expires_at);

create index if not exists asset_upload_reservations_order_created_idx
on public.asset_upload_reservations(order_id, created_at desc);

create index if not exists rsvps_invitation_source_created_idx
on public.rsvps(invitation_id, source_hash, created_at desc);

create index if not exists wishes_invitation_source_created_idx
on public.wishes(invitation_id, source_hash, created_at desc);

alter table public.asset_upload_reservations enable row level security;

drop policy if exists public_read_published_invitations on public.invitations;
drop policy if exists customers_read_own_account on public.customers;
drop policy if exists orders_read_own_account on public.orders;

revoke all on table public.profiles from public, anon, authenticated;
revoke all on table public.customers from public, anon, authenticated;
revoke all on table public.orders from public, anon, authenticated;
revoke all on table public.invitations from public, anon, authenticated;
revoke all on table public.invitation_versions from public, anon, authenticated;
revoke all on table public.events from public, anon, authenticated;
revoke all on table public.assets from public, anon, authenticated;
revoke all on table public.asset_upload_reservations from public, anon, authenticated;
revoke all on table public.guests from public, anon, authenticated;
revoke all on table public.rsvps from public, anon, authenticated;
revoke all on table public.wishes from public, anon, authenticated;
revoke all on table public.payments from public, anon, authenticated;
revoke all on table public.revisions from public, anon, authenticated;
revoke all on table public.consultations from public, anon, authenticated;

grant all on table public.profiles to service_role;
grant all on table public.customers to service_role;
grant all on table public.orders to service_role;
grant all on table public.invitations to service_role;
grant all on table public.invitation_versions to service_role;
grant all on table public.events to service_role;
grant all on table public.assets to service_role;
grant all on table public.asset_upload_reservations to service_role;
grant all on table public.guests to service_role;
grant all on table public.rsvps to service_role;
grant all on table public.wishes to service_role;
grant all on table public.payments to service_role;
grant all on table public.revisions to service_role;
grant all on table public.consultations to service_role;

