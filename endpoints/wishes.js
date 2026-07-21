import { z } from 'zod';
import { allowMethod, authorizeOrderAccess, getClientAddress, getServiceClient, hashValue, sendError, verifyGuestToken } from '../server/commerce.js';
import { getPublishedInvitationRecord } from '../server/invitations.js';
import { wishSchema } from '../server/validators.js';

const moderationSchema = z.object({
  orderId: z.string().uuid(),
  wishId: z.string().uuid(),
  isApproved: z.boolean(),
});

export default async function handler(req, res) {
  if (!allowMethod(req, res, ['POST', 'PATCH'])) return;
  try {
    if (req.method === 'PATCH') {
      const supabase = getServiceClient();
      const input = moderationSchema.parse(req.body || {});
      await authorizeOrderAccess(req, supabase, input.orderId);
      const { data: invitation, error: invitationError } = await supabase.from('invitations').select('id').eq('order_id', input.orderId).single();
      if (invitationError || !invitation) throw invitationError || new Error('Không tìm thấy thiệp.');
      const { data, error } = await supabase.from('wishes').update({ is_approved: input.isApproved }).eq('id', input.wishId).eq('invitation_id', invitation.id).select('id, is_approved').single();
      if (error) throw error;
      res.status(200).json({ wish: data });
      return;
    }

    const input = wishSchema.parse(req.body || {});
    const { supabase, invitation } = await getPublishedInvitationRecord(input.slug);
    const guestId = verifyGuestToken(input.guestToken, invitation.id);
    const sourceHash = hashValue(getClientAddress(req));
    const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const { count } = await supabase.from('wishes').select('id', { count: 'exact', head: true }).eq('invitation_id', invitation.id).eq('source_hash', sourceHash).gte('created_at', since);
    if ((count || 0) >= 8) {
      const limited = new Error('Bạn đã gửi quá nhiều lời chúc. Vui lòng thử lại sau.');
      limited.statusCode = 429;
      throw limited;
    }
    const { error } = await supabase.from('wishes').insert({
      invitation_id: invitation.id,
      guest_id: guestId || null,
      full_name: input.fullName,
      message: input.message,
      is_approved: false,
      source_hash: sourceHash,
    });
    if (error) throw error;
    res.status(201).json({ ok: true });
  } catch (error) {
    sendError(res, error);
  }
}
