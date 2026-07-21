import { allowMethod, getClientAddress, hashValue, sendError, verifyGuestToken } from '../server/commerce.js';
import { getPublishedInvitationRecord } from '../server/invitations.js';
import { rsvpSchema } from '../server/validators.js';

export default async function handler(req, res) {
  if (!allowMethod(req, res, ['POST'])) return;
  try {
    const input = rsvpSchema.parse(req.body || {});
    const { supabase, invitation } = await getPublishedInvitationRecord(input.slug);
    const guestId = verifyGuestToken(input.guestToken, invitation.id);
    if (guestId && input.attendance !== 'no') {
      const { data: guest } = await supabase.from('guests').select('invited_count').eq('id', guestId).eq('invitation_id', invitation.id).maybeSingle();
      if (guest && input.partySize > guest.invited_count) {
        const invalid = new Error(`Link mời này được xác nhận tối đa ${guest.invited_count} người.`);
        invalid.statusCode = 400;
        throw invalid;
      }
    }
    const sourceHash = hashValue(getClientAddress(req));
    const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const { count } = await supabase.from('rsvps').select('id', { count: 'exact', head: true }).eq('invitation_id', invitation.id).eq('source_hash', sourceHash).gte('created_at', since);
    if ((count || 0) >= 8) {
      const limited = new Error('Bạn đã gửi quá nhiều phản hồi. Vui lòng thử lại sau.');
      limited.statusCode = 429;
      throw limited;
    }
    const response = {
      invitation_id: invitation.id,
      guest_id: guestId || null,
      full_name: input.fullName,
      phone: input.phone || null,
      attendance: input.attendance,
      party_size: input.attendance === 'no' ? 0 : input.partySize,
      note: input.note || null,
      source_hash: sourceHash,
    };
    const { error } = guestId
      ? await supabase.from('rsvps').upsert(response, { onConflict: 'invitation_id,guest_id' })
      : await supabase.from('rsvps').insert(response);
    if (error) throw error;
    res.status(201).json({ ok: true });
  } catch (error) {
    sendError(res, error);
  }
}
