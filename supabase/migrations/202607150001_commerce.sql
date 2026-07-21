create extension if not exists pgcrypto;

do $$ begin
  create type public.order_status as enum (
    'new', 'awaiting_deposit', 'in_progress', 'customer_review',
    'revision', 'approved', 'published', 'expired', 'cancelled'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.invitation_status as enum ('draft', 'review', 'published', 'expired', 'archived');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.payment_status as enum ('pending', 'submitted', 'paid', 'failed', 'refunded');
exception when duplicate_object then null;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role text not null default 'staff' check (role in ('admin', 'staff')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text,
  phone text not null,
  zalo text,
  consent_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  public_id text not null unique,
  customer_id uuid not null references public.customers(id) on delete restrict,
  package_code text not null check (package_code in ('basic', 'premium', 'signature', 'event_bundle')),
  template_slug text not null,
  status public.order_status not null default 'awaiting_deposit',
  amount_total integer not null default 0 check (amount_total >= 0),
  deposit_amount integer not null default 0 check (deposit_amount >= 0),
  deposit_status public.payment_status not null default 'pending',
  access_token_hash text not null,
  source_hash text,
  revision_limit smallint not null default 1 check (revision_limit between 0 and 20),
  revision_count smallint not null default 0 check (revision_count between 0 and 20),
  customer_note text,
  internal_note text,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.invitations (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null unique references public.orders(id) on delete cascade,
  slug text unique,
  template_slug text not null,
  status public.invitation_status not null default 'draft',
  content jsonb not null default '{}'::jsonb,
  theme jsonb not null default '{}'::jsonb,
  draft_content jsonb not null default '{}'::jsonb,
  draft_theme jsonb not null default '{}'::jsonb,
  draft_version integer not null default 1 check (draft_version > 0),
  seo_title text,
  seo_description text,
  cover_asset_id uuid,
  preview_token_hash text not null,
  published_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.invitations add column if not exists draft_content jsonb not null default '{}'::jsonb;
alter table public.invitations add column if not exists draft_theme jsonb not null default '{}'::jsonb;
alter table public.invitations add column if not exists draft_version integer not null default 1;
update public.invitations set draft_content = content where draft_content = '{}'::jsonb and content <> '{}'::jsonb;
update public.invitations set draft_theme = theme where draft_theme = '{}'::jsonb and theme <> '{}'::jsonb;

create table if not exists public.invitation_versions (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid not null references public.invitations(id) on delete cascade,
  version integer not null check (version > 0),
  content jsonb not null,
  theme jsonb not null default '{}'::jsonb,
  created_by text not null default 'system' check (created_by in ('customer', 'staff', 'system')),
  created_at timestamptz not null default now(),
  unique (invitation_id, version)
);

insert into public.invitation_versions (invitation_id, version, content, theme, created_by)
select id, draft_version, draft_content, draft_theme, 'system'
from public.invitations
on conflict (invitation_id, version) do nothing;

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid not null references public.invitations(id) on delete cascade,
  event_type text not null default 'wedding',
  name text not null,
  starts_at timestamptz not null,
  venue_name text,
  address text,
  map_url text,
  sort_order smallint not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.assets (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  invitation_id uuid references public.invitations(id) on delete cascade,
  kind text not null check (kind in ('hero', 'bride', 'groom', 'couple', 'venue', 'final', 'gallery', 'music', 'social', 'payment_proof', 'gift_qr', 'other')),
  storage_bucket text not null default 'order-assets',
  storage_path text not null unique,
  original_name text,
  content_type text,
  byte_size bigint check (byte_size is null or byte_size >= 0),
  sort_order smallint not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.invitations drop constraint if exists invitations_cover_asset_id_fkey;
alter table public.invitations
  add constraint invitations_cover_asset_id_fkey foreign key (cover_asset_id) references public.assets(id) on delete set null;

create table if not exists public.guests (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid not null references public.invitations(id) on delete cascade,
  full_name text not null,
  phone text,
  group_name text,
  invited_count smallint not null default 1 check (invited_count between 1 and 20),
  access_token_hash text,
  created_at timestamptz not null default now()
);

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid not null references public.invitations(id) on delete cascade,
  guest_id uuid references public.guests(id) on delete set null,
  full_name text not null,
  phone text,
  attendance text not null check (attendance in ('yes', 'no', 'unsure')),
  party_size smallint not null default 1 check (party_size between 0 and 20),
  note text,
  source_hash text,
  created_at timestamptz not null default now()
);

create table if not exists public.wishes (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid not null references public.invitations(id) on delete cascade,
  guest_id uuid references public.guests(id) on delete set null,
  full_name text not null,
  message text not null,
  is_approved boolean not null default false,
  source_hash text,
  created_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  provider text not null default 'bank_transfer',
  status public.payment_status not null default 'pending',
  amount integer not null check (amount >= 0),
  reference text,
  proof_asset_id uuid references public.assets(id) on delete set null,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.revisions (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  requested_by text not null check (requested_by in ('customer', 'staff')),
  message text not null,
  status text not null default 'open' check (status in ('open', 'resolved', 'rejected')),
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create or replace function public.save_invitation_draft(
  p_order_id uuid,
  p_expected_version integer,
  p_content jsonb,
  p_theme jsonb,
  p_created_by text
)
returns public.invitations
language plpgsql
security definer
set search_path = public
as $$
declare
  current_invitation public.invitations;
begin
  select * into current_invitation
  from public.invitations
  where order_id = p_order_id
  for update;

  if not found then raise exception 'invitation_not_found'; end if;
  if current_invitation.draft_version <> p_expected_version then raise exception 'draft_version_conflict'; end if;
  if p_created_by not in ('customer', 'staff', 'system') then raise exception 'invalid_editor_role'; end if;

  update public.invitations
  set draft_content = p_content,
      draft_theme = coalesce(p_theme, current_invitation.draft_theme, '{}'::jsonb),
      draft_version = draft_version + 1
  where id = current_invitation.id
  returning * into current_invitation;

  insert into public.invitation_versions (invitation_id, version, content, theme, created_by)
  values (current_invitation.id, current_invitation.draft_version, current_invitation.draft_content, current_invitation.draft_theme, p_created_by);

  delete from public.invitation_versions
  where id in (
    select id from public.invitation_versions
    where invitation_id = current_invitation.id
    order by version desc
    offset 50
  );

  return current_invitation;
end;
$$;

revoke all on function public.save_invitation_draft(uuid, integer, jsonb, jsonb, text) from public, anon, authenticated;
grant execute on function public.save_invitation_draft(uuid, integer, jsonb, jsonb, text) to service_role;

create or replace function public.request_order_revision(p_order_id uuid, p_message text)
returns public.orders
language plpgsql
security definer
set search_path = public
as $$
declare
  current_order public.orders;
begin
  select * into current_order from public.orders where id = p_order_id for update;
  if not found then
    raise exception 'order_not_found';
  end if;
  if current_order.revision_count >= current_order.revision_limit then
    raise exception 'revision_limit_reached';
  end if;

  insert into public.revisions (order_id, requested_by, message)
  values (p_order_id, 'customer', p_message);

  update public.orders
  set status = 'revision', revision_count = revision_count + 1
  where id = p_order_id
  returning * into current_order;
  return current_order;
end;
$$;

revoke all on function public.request_order_revision(uuid, text) from public, anon, authenticated;
grant execute on function public.request_order_revision(uuid, text) to service_role;

create index if not exists orders_customer_id_idx on public.orders(customer_id);
create index if not exists orders_status_idx on public.orders(status, created_at desc);
create index if not exists orders_source_hash_idx on public.orders(source_hash, created_at desc);
create index if not exists invitations_slug_idx on public.invitations(slug) where slug is not null;
create index if not exists invitations_status_idx on public.invitations(status, expires_at);
create index if not exists invitation_versions_invitation_idx on public.invitation_versions(invitation_id, version desc);
create index if not exists events_invitation_id_idx on public.events(invitation_id, sort_order);
create index if not exists assets_order_id_idx on public.assets(order_id, kind, sort_order);
create index if not exists rsvps_invitation_id_idx on public.rsvps(invitation_id, created_at desc);
drop index if exists public.rsvps_invitation_guest_unique_idx;
create unique index rsvps_invitation_guest_unique_idx on public.rsvps(invitation_id, guest_id);
create index if not exists wishes_invitation_id_idx on public.wishes(invitation_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles for each row execute function public.set_updated_at();
drop trigger if exists customers_set_updated_at on public.customers;
create trigger customers_set_updated_at before update on public.customers for each row execute function public.set_updated_at();
drop trigger if exists orders_set_updated_at on public.orders;
create trigger orders_set_updated_at before update on public.orders for each row execute function public.set_updated_at();
drop trigger if exists invitations_set_updated_at on public.invitations;
create trigger invitations_set_updated_at before update on public.invitations for each row execute function public.set_updated_at();
drop trigger if exists events_set_updated_at on public.events;
create trigger events_set_updated_at before update on public.events for each row execute function public.set_updated_at();
drop trigger if exists payments_set_updated_at on public.payments;
create trigger payments_set_updated_at before update on public.payments for each row execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'staff')
  );
$$;

alter table public.profiles enable row level security;
alter table public.customers enable row level security;
alter table public.orders enable row level security;
alter table public.invitations enable row level security;
alter table public.invitation_versions enable row level security;
alter table public.events enable row level security;
alter table public.assets enable row level security;
alter table public.guests enable row level security;
alter table public.rsvps enable row level security;
alter table public.wishes enable row level security;
alter table public.payments enable row level security;
alter table public.revisions enable row level security;

drop policy if exists profiles_read_self on public.profiles;
create policy profiles_read_self on public.profiles for select to authenticated using (id = auth.uid() or public.is_admin());

do $$
declare table_name text;
begin
  foreach table_name in array array['customers','orders','invitations','invitation_versions','events','assets','guests','rsvps','wishes','payments','revisions']
  loop
    execute format('drop policy if exists admin_all on public.%I', table_name);
    execute format('create policy admin_all on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin())', table_name);
  end loop;
end $$;

drop policy if exists public_read_published_invitations on public.invitations;
create policy public_read_published_invitations on public.invitations for select to anon
using (status = 'published' and (expires_at is null or expires_at > now()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'order-assets',
  'order-assets',
  false,
  15728640,
  array['image/jpeg','image/png','image/webp','image/gif','audio/mpeg','audio/mp4']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists admin_manage_order_assets on storage.objects;
create policy admin_manage_order_assets on storage.objects for all to authenticated
using (bucket_id = 'order-assets' and public.is_admin())
with check (bucket_id = 'order-assets' and public.is_admin());
