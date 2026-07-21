-- Keep database template switching aligned with the scene registry shipped by the app.
create or replace function public.switch_invitation_template(
  p_order_id uuid,
  p_template_slug text,
  p_design jsonb,
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
  if p_template_slug not in (
    'thiep-cuoi-1', 'thiep-cuoi-2', 'thiep-cuoi-3', 'thiep-cuoi-4',
    'thiep-cuoi-5', 'thiep-cuoi-6', 'thiep-cuoi-7', 'thiep-cuoi-8',
    'thiep-cuoi-9', 'thiep-cuoi-10', 'thiep-cuoi-11', 'thiep-cuoi-12',
    'thiep-cuoi-13', 'thiep-cuoi-14', 'thiep-cuoi-15', 'thiep-cuoi-16',
    'thiep-cuoi-17', 'thiep-cuoi-18', 'thiep-cuoi-19', 'thiep-cuoi-20',
    'thiep-cuoi-21', 'thiep-cuoi-22', 'thiep-cuoi-23', 'thiep-cuoi-24',
    'thiep-cuoi-25', 'thiep-cuoi-26', 'thiep-cuoi-27', 'thiep-cuoi-28',
    'thiep-cuoi-29', 'thiep-cuoi-30', 'thiep-cuoi-31', 'thiep-cuoi-32',
    'thiep-cuoi-33', 'thiep-cuoi-34', 'thiep-cuoi-35', 'thiep-cuoi-36',
    'thiep-cuoi-37', 'thiep-cuoi-38', 'thiep-cuoi-39', 'thiep-cuoi-40',
    'thiep-cuoi-41', 'thiep-cuoi-42', 'thiep-cuoi-43', 'thiep-cuoi-44',
    'thiep-cuoi-46', 'thiep-cuoi-47', 'thiep-cuoi-48', 'thiep-cuoi-49',
    'thiep-cuoi-50', 'thiep-cuoi-52', 'thiep-cuoi-53', 'thiep-cuoi-54',
    'thiep-cuoi-55', 'thiep-cuoi-56', 'thiep-cuoi-57', 'thiep-cuoi-58',
    'thiep-cuoi-59', 'thiep-cuoi-60', 'thiep-cuoi-61', 'thiep-cuoi-62',
    'thiep-cuoi-63', 'thiep-cuoi-64', 'thiep-cuoi-65', 'thiep-cuoi-66',
    'thiep-cuoi-67', 'thiep-cuoi-68', 'thiep-cuoi-69', 'thiep-cuoi-70',
    'thiep-cuoi-71', 'thiep-cuoi-72', 'thiep-cuoi-73', 'thiep-cuoi-74',
    'thiep-cuoi-75', 'thiep-cuoi-76', 'thiep-cuoi-77', 'thiep-cuoi-78',
    'thiep-cuoi-79', 'thiep-cuoi-80', 'thiep-cuoi-81', 'thiep-cuoi-82',
    'thiep-cuoi-83', 'thiep-cuoi-84', 'thiep-cuoi-85',
    'thiep-cuoi-86', 'thiep-cuoi-87', 'thiep-cuoi-88', 'thiep-cuoi-89',
    'thiep-cuoi-90', 'thiep-cuoi-91', 'thiep-cuoi-92', 'thiep-cuoi-93',
    'thiep-cuoi-94', 'thiep-cuoi-95', 'thiep-cuoi-96', 'thiep-cuoi-97',
    'thiep-cuoi-98', 'thiep-cuoi-99', 'thiep-cuoi-100',
    'thiep-cuoi-101', 'thiep-cuoi-102', 'thiep-cuoi-103', 'thiep-cuoi-104',
    'thiep-cuoi-105', 'thiep-cuoi-106', 'thiep-cuoi-107', 'thiep-cuoi-108',
    'thiep-bw-1', 'thiep-cuoi-tone-xanh'
  ) then
    raise exception 'unsupported_commercial_template';
  end if;
  if p_design is null then raise exception 'scene_design_required'; end if;

  select * into current_invitation
  from public.invitations
  where order_id = p_order_id
  for update;
  if not found then raise exception 'invitation_not_found'; end if;

  update public.orders
  set template_slug = p_template_slug
  where id = p_order_id;

  update public.invitations
  set template_slug = p_template_slug,
      draft_design = p_design,
      draft_version = draft_version + 1
  where id = current_invitation.id
  returning * into current_invitation;

  insert into public.invitation_versions (
    invitation_id, version, template_slug, content, theme, design, created_by
  )
  values (
    current_invitation.id,
    current_invitation.draft_version,
    current_invitation.template_slug,
    current_invitation.draft_content,
    current_invitation.draft_theme,
    current_invitation.draft_design,
    case when p_created_by = 'staff' then 'staff' else 'customer' end
  );

  delete from public.invitation_versions
  where id in (
    select id
    from public.invitation_versions
    where invitation_id = current_invitation.id
    order by version desc
    offset 50
  );

  return current_invitation;
end;
$$;

revoke all on function public.switch_invitation_template(uuid, text, jsonb, text)
from public, anon, authenticated;
grant execute on function public.switch_invitation_template(uuid, text, jsonb, text)
to service_role;
