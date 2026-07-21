import { allowMethod, authorizeOrderAccess, getServiceClient, sendError } from '../server/commerce.js';

function csvCell(value) {
  let text = String(value ?? '');
  if (/^[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replaceAll('"', '""')}"`;
}

export default async function handler(req, res) {
  if (!allowMethod(req, res, ['GET'])) return;
  try {
    const supabase = getServiceClient();
    const orderId = String(req.query.orderId || '');
    await authorizeOrderAccess(req, supabase, orderId);
    const { data: invitation, error: invitationError } = await supabase.from('invitations').select('id').eq('order_id', orderId).single();
    if (invitationError || !invitation) throw invitationError || new Error('Không tìm thấy thiệp.');
    const { data, error } = await supabase
      .from('rsvps')
      .select('full_name, phone, attendance, party_size, note, created_at')
      .eq('invitation_id', invitation.id)
      .order('created_at');
    if (error) throw error;
    const headers = ['Họ và tên', 'Số điện thoại', 'Tham dự', 'Số người', 'Lời nhắn', 'Thời gian'];
    const rows = (data || []).map((item) => [item.full_name, item.phone, item.attendance, item.party_size, item.note, item.created_at]);
    const csv = `\uFEFF${[headers, ...rows].map((row) => row.map(csvCell).join(',')).join('\r\n')}`;
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="rsvp-${orderId}.csv"`);
    res.status(200).send(csv);
  } catch (error) {
    sendError(res, error);
  }
}
