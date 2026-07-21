alter table public.invitation_versions add column if not exists template_slug text;

update public.invitation_versions as version
set template_slug = invitation.template_slug
from public.invitations as invitation
where version.invitation_id = invitation.id
  and version.template_slug is null;

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
  select * into current_invitation from public.invitations where order_id = p_order_id for update;
  if not found then raise exception 'invitation_not_found'; end if;
  if current_invitation.draft_version <> p_expected_version then raise exception 'draft_version_conflict'; end if;
  if p_created_by not in ('customer', 'staff', 'system') then raise exception 'invalid_editor_role'; end if;

  update public.invitations
  set draft_content = p_content,
      draft_theme = coalesce(p_theme, current_invitation.draft_theme, '{}'::jsonb),
      draft_version = draft_version + 1
  where id = current_invitation.id
  returning * into current_invitation;

  insert into public.invitation_versions (invitation_id, version, template_slug, content, theme, created_by)
  values (current_invitation.id, current_invitation.draft_version, current_invitation.template_slug, current_invitation.draft_content, current_invitation.draft_theme, p_created_by);

  delete from public.invitation_versions where id in (
    select id from public.invitation_versions where invitation_id = current_invitation.id order by version desc offset 50
  );
  return current_invitation;
end;
$$;

revoke all on function public.save_invitation_draft(uuid, integer, jsonb, jsonb, text) from public, anon, authenticated;
grant execute on function public.save_invitation_draft(uuid, integer, jsonb, jsonb, text) to service_role;

create or replace function public.switch_invitation_template(
  p_order_id uuid,
  p_template_slug text,
  p_created_by text default 'customer'
)
returns public.invitations
language plpgsql
security definer
set search_path = public
as $$
declare
  current_invitation public.invitations;
begin
  if p_template_slug not in ('thiep-cuoi-39', 'thiep-cuoi-44', 'thiep-cuoi-47', 'thiep-cuoi-61', 'thiep-cuoi-104') then
    raise exception 'unsupported_commercial_template';
  end if;

  select * into current_invitation
  from public.invitations
  where order_id = p_order_id
  for update;

  if not found then
    raise exception 'invitation_not_found';
  end if;

  update public.orders
  set template_slug = p_template_slug
  where id = p_order_id;

  update public.invitations
  set template_slug = p_template_slug,
      draft_version = draft_version + 1
  where id = current_invitation.id
  returning * into current_invitation;

  insert into public.invitation_versions (invitation_id, version, template_slug, content, theme, created_by)
  values (
    current_invitation.id,
    current_invitation.draft_version,
    current_invitation.template_slug,
    current_invitation.draft_content,
    current_invitation.draft_theme,
    case when p_created_by = 'staff' then 'staff' else 'customer' end
  );

  delete from public.invitation_versions where id in (
    select id from public.invitation_versions where invitation_id = current_invitation.id order by version desc offset 50
  );

  return current_invitation;
end;
$$;

revoke all on function public.switch_invitation_template(uuid, text, text) from public, anon, authenticated;
grant execute on function public.switch_invitation_template(uuid, text, text) to service_role;

create or replace function public.restore_invitation_version(
  p_order_id uuid,
  p_version integer,
  p_created_by text default 'customer'
)
returns public.invitations
language plpgsql
security definer
set search_path = public
as $$
declare
  current_invitation public.invitations;
  target_version public.invitation_versions;
begin
  select * into current_invitation from public.invitations where order_id = p_order_id for update;
  if not found then raise exception 'invitation_not_found'; end if;

  select * into target_version
  from public.invitation_versions
  where invitation_id = current_invitation.id and version = p_version;
  if not found then raise exception 'version_not_found'; end if;

  update public.orders
  set template_slug = coalesce(target_version.template_slug, current_invitation.template_slug)
  where id = p_order_id;

  update public.invitations
  set template_slug = coalesce(target_version.template_slug, current_invitation.template_slug),
      draft_content = target_version.content,
      draft_theme = target_version.theme,
      draft_version = draft_version + 1
  where id = current_invitation.id
  returning * into current_invitation;

  insert into public.invitation_versions (invitation_id, version, template_slug, content, theme, created_by)
  values (
    current_invitation.id, current_invitation.draft_version, current_invitation.template_slug,
    current_invitation.draft_content, current_invitation.draft_theme,
    case when p_created_by = 'staff' then 'staff' else 'customer' end
  );

  delete from public.invitation_versions where id in (
    select id from public.invitation_versions where invitation_id = current_invitation.id order by version desc offset 50
  );
  return current_invitation;
end;
$$;

revoke all on function public.restore_invitation_version(uuid, integer, text) from public, anon, authenticated;
grant execute on function public.restore_invitation_version(uuid, integer, text) to service_role;
