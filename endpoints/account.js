import { allowMethod, getServiceClient, requireUser, sendError, verifyOrderAccess } from '../server/commerce.js';
import { claimOrderSchema } from '../server/validators.js';

async function getAccountCustomer(supabase, userId) {
  const { data, error } = await supabase
    .from('customers')
    .select('id, full_name, email, phone, zalo')
    .eq('auth_user_id', userId)
    .maybeSingle();
  if (error) throw error;
  return data || null;
}

async function getDashboard(supabase, user) {
  const customer = await getAccountCustomer(supabase, user.id);
  if (!customer) return { user: { id: user.id, email: user.email }, customer: null, orders: [] };
  const { data, error } = await supabase
    .from('orders')
    .select('id, public_id, package_code, template_slug, status, amount_total, deposit_status, revision_limit, revision_count, expires_at, created_at, updated_at, invitations(id, slug, status, draft_content, published_at, expires_at), assets(id, kind, byte_size)')
    .eq('customer_id', customer.id)
    .order('created_at', { ascending: false });
  if (error) throw error;
  const orders = data || [];
  const invitationIds = orders.flatMap((order) => {
    const invitation = Array.isArray(order.invitations) ? order.invitations[0] : order.invitations;
    return invitation?.id ? [invitation.id] : [];
  });
  let guests = [];
  if (invitationIds.length) {
    const { data: guestRows, error: guestError } = await supabase.from('guests').select('invitation_id').in('invitation_id', invitationIds);
    if (guestError) throw guestError;
    guests = guestRows || [];
  }
  return {
    user: { id: user.id, email: user.email },
    customer,
    orders: orders.map((order) => {
      const invitation = Array.isArray(order.invitations) ? order.invitations[0] : order.invitations;
      return {
        ...order,
        invitation: invitation ? { ...invitation, content: invitation.draft_content, draft_content: undefined } : null,
        invitations: undefined,
        assets: order.assets || [],
        guest_count: invitation ? guests.filter((guest) => guest.invitation_id === invitation.id).length : 0,
      };
    }),
  };
}

export default async function handler(req, res) {
  if (!allowMethod(req, res, ['GET', 'POST'])) return;
  try {
    const supabase = getServiceClient();
    const user = await requireUser(req, supabase);
    if (req.method === 'POST') {
      const input = claimOrderSchema.parse(req.body || {});
      if (!await verifyOrderAccess(supabase, input.orderId, input.accessToken)) {
        const forbidden = new Error('Mã truy cập đơn hàng không hợp lệ.');
        forbidden.statusCode = 403;
        throw forbidden;
      }
      const { data: order, error: orderError } = await supabase.from('orders').select('customer_id').eq('id', input.orderId).single();
      if (orderError || !order) throw orderError || new Error('Không tìm thấy đơn hàng.');
      const { data: sourceCustomer, error: customerError } = await supabase.from('customers').select('id, auth_user_id, email').eq('id', order.customer_id).single();
      if (customerError || !sourceCustomer) throw customerError || new Error('Không tìm thấy khách hàng.');
      if (sourceCustomer.auth_user_id && sourceCustomer.auth_user_id !== user.id) {
        const conflict = new Error('Đơn hàng này đã thuộc một tài khoản khác.');
        conflict.statusCode = 409;
        throw conflict;
      }
      const accountCustomer = await getAccountCustomer(supabase, user.id);
      if (accountCustomer && accountCustomer.id !== sourceCustomer.id) {
        const { error: moveError } = await supabase.from('orders').update({ customer_id: accountCustomer.id }).eq('id', input.orderId);
        if (moveError) throw moveError;
        const { count } = await supabase.from('orders').select('id', { count: 'exact', head: true }).eq('customer_id', sourceCustomer.id);
        if (!count) await supabase.from('customers').delete().eq('id', sourceCustomer.id).is('auth_user_id', null);
      } else if (!sourceCustomer.auth_user_id) {
        const { error: linkError } = await supabase.from('customers').update({ auth_user_id: user.id, email: sourceCustomer.email || user.email }).eq('id', sourceCustomer.id);
        if (linkError) throw linkError;
      }
    }
    res.status(200).json({ account: await getDashboard(supabase, user) });
  } catch (error) {
    sendError(res, error);
  }
}
