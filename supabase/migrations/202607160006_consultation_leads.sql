create table if not exists public.consultations (
  id uuid primary key default gen_random_uuid(),
  public_id text not null unique,
  full_name text not null,
  phone text not null,
  email text,
  service text not null check (service in ('Thiệp cưới Online', 'Tráp cưới', 'Trình chiếu sự kiện', 'Gói dịch vụ trọn bộ')),
  template_slug text,
  preferred_date date not null,
  preferred_time time not null,
  note text,
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'converted', 'lost')),
  internal_note text,
  source_hash text,
  consent_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists consultations_status_created_at_idx on public.consultations(status, created_at desc);
create index if not exists consultations_source_hash_created_at_idx on public.consultations(source_hash, created_at desc);

drop trigger if exists consultations_set_updated_at on public.consultations;
create trigger consultations_set_updated_at
before update on public.consultations
for each row execute function public.set_updated_at();

alter table public.consultations enable row level security;
revoke all on public.consultations from public, anon, authenticated;
grant all on public.consultations to service_role;
