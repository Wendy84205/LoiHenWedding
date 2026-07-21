-- Keep invitations created before scene-graph conversion editable by studio staff.
create or replace function public.save_invitation_draft(
  p_order_id uuid,
  p_expected_version integer,
  p_content jsonb,
  p_theme jsonb,
  p_design jsonb,
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
      draft_design = coalesce(p_design, current_invitation.draft_design),
      draft_version = draft_version + 1
  where id = current_invitation.id
  returning * into current_invitation;

  insert into public.invitation_versions (invitation_id, version, template_slug, content, theme, design, created_by)
  values (
    current_invitation.id,
    current_invitation.draft_version,
    current_invitation.template_slug,
    current_invitation.draft_content,
    current_invitation.draft_theme,
    current_invitation.draft_design,
    p_created_by
  );

  delete from public.invitation_versions where id in (
    select id from public.invitation_versions where invitation_id = current_invitation.id order by version desc offset 50
  );
  return current_invitation;
end;
$$;

revoke all on function public.save_invitation_draft(uuid, integer, jsonb, jsonb, jsonb, text) from public, anon, authenticated;
grant execute on function public.save_invitation_draft(uuid, integer, jsonb, jsonb, jsonb, text) to service_role;
