import { z } from 'zod';
import { allowMethod, authorizeOrderAccess, createGuestToken, enforceGuestQuota, getPublicOrigin, getServiceClient, sendError } from '../server/commerce.js';

const guestSchema = z.object({
  orderId: z.string().uuid(),
  fullName: z.string().trim().min(1).max(120),
  phone: z.string().trim().max(24).optional().default(''),
  groupName: z.string().trim().max(80).optional().default(''),
  invitedCount: z.number().int().min(1).max(20).default(1),
});

export default async function handler(req, res) {
  if (!allowMethod(req, res, ['POST', 'DELETE'])) return;
  try {
    const supabase = getServiceClient();

    if (req.method === 'DELETE') {
      const orderId = String(req.query.orderId || req.body?.orderId || '');
      const guestId = String(req.query.id || req.body?.id || '');
      await authorizeOrderAccess(req, supabase, orderId);
      const { data: invitation, error: invitationError } = await supabase.from('invitations').select('id').eq('order_id', orderId).single();
      if (invitationError || !invitation) throw invitationError || new Error('Không tìm thấy thiệp.');
      const { error } = await supabase.from('guests').delete().eq('id', guestId).eq('invitation_id', invitation.id);
      if (error) throw error;
      res.status(200).json({ ok: true });
      return;
    }

    const input = guestSchema.parse(req.body || {});
    await authorizeOrderAccess(req, supabase, input.orderId);
    const { data: invitation, error: invitationError } = await supabase.from('invitations').select('id, slug').eq('order_id', input.orderId).single();
    if (invitationError || !invitation) throw invitationError || new Error('Không tìm thấy thiệp.');
    await enforceGuestQuota(supabase, input.orderId, invitation.id);
    const { data: guest, error } = await supabase.from('guests').insert({
      invitation_id: invitation.id,
      full_name: input.fullName,
      phone: input.phone || null,
      group_name: input.groupName || null,
      invited_count: input.invitedCount,
    }).select('id, full_name, phone, group_name, invited_count, created_at').single();
    if (error) throw error;
    const base = getPublicOrigin();
    const token = createGuestToken(guest.id, invitation.id);
    res.status(201).json({ guest: { ...guest, personal_url: `${base}/w/${invitation.slug}?guest=${encodeURIComponent(token)}` } });
  } catch (error) {
    sendError(res, error);
  }
}
