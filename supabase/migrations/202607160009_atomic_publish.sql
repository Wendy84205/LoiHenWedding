-- Commit the live invitation and order status in one locked transaction. The API
-- runs preflight first; the expected version prevents publishing a stale draft.
create or replace function public.publish_invitation_draft(
  p_order_id uuid,
  p_slug text,
  p_expires_at timestamptz,
  p_expected_version integer,
  p_require_paid boolean default false
)
returns public.invitations
language plpgsql
security definer
set search_path = public
as $$
declare
  current_order public.orders;
  current_invitation public.invitations;
begin
  select * into current_order
  from public.orders
  where id = p_order_id
  for update;
  if not found then raise exception 'order_not_found'; end if;

  select * into current_invitation
  from public.invitations
  where order_id = p_order_id
  for update;
  if not found then raise exception 'invitation_not_found'; end if;
  if current_invitation.draft_version <> p_expected_version then
    raise exception 'draft_version_conflict';
  end if;
  if p_slug is null or length(p_slug) < 3 or length(p_slug) > 72
    or p_slug !~ '^[a-z0-9]+(-[a-z0-9]+)*$' then
    raise exception 'invalid_public_slug';
  end if;
  if p_expires_at is not null and p_expires_at <= now() then
    raise exception 'invalid_expiry';
  end if;
  if exists (
    select 1 from public.invitations
    where slug = p_slug and id <> current_invitation.id
  ) then
    raise exception 'slug_already_used';
  end if;

  if p_require_paid then
    if current_order.package_code not in ('basic', 'premium') then
      raise exception 'studio_review_required';
    end if;
    if current_order.deposit_status <> 'paid' then
      raise exception 'deposit_not_paid';
    end if;
    if current_order.status in ('cancelled', 'expired') then
      raise exception 'order_closed';
    end if;
  end if;

  update public.invitations
  set slug = p_slug,
      status = 'published',
      content = current_invitation.draft_content,
      theme = coalesce(current_invitation.draft_theme, '{}'::jsonb),
      design = current_invitation.draft_design,
      expires_at = coalesce(p_expires_at, current_invitation.expires_at),
      published_at = now()
  where id = current_invitation.id
  returning * into current_invitation;

  update public.orders
  set status = 'published'
  where id = p_order_id;

  return current_invitation;
end;
$$;

revoke all on function public.publish_invitation_draft(uuid, text, timestamptz, integer, boolean)
from public, anon, authenticated;
grant execute on function public.publish_invitation_draft(uuid, text, timestamptz, integer, boolean)
to service_role;
