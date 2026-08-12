import { allowMethod, authorizeOrderAccess, getServiceClient, sendError } from '../server/commerce.js';

export default async function handler(req, res) {
  if (!allowMethod(req, res, ['POST'])) return;
  try {
    const orderId = String(req.body?.orderId || '').trim();
    if (!orderId) {
      const invalid = new Error('Thiếu mã đơn hàng.');
      invalid.statusCode = 400;
      throw invalid;
    }

    const supabase = getServiceClient();
    await authorizeOrderAccess(req, supabase, orderId);
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('id, public_id, deposit_status, amount_total, deposit_amount')
      .eq('id', orderId)
      .single();
    if (orderError || !order) {
      const missing = new Error('Không tìm thấy đơn hàng.');
      missing.statusCode = 404;
      throw missing;
    }

    if (order.deposit_status !== 'paid') {
      const { error: updateOrderError } = await supabase
        .from('orders')
        .update({ deposit_status: 'submitted' })
        .eq('id', orderId);
      if (updateOrderError) throw updateOrderError;
      const { error: updatePaymentError } = await supabase
        .from('payments')
        .update({ status: 'submitted' })
        .eq('order_id', orderId);
      if (updatePaymentError) throw updatePaymentError;
    }

    res.status(200).json({
      ok: true,
      publicId: order.public_id,
      amount: order.deposit_amount || order.amount_total,
      status: order.deposit_status === 'paid' ? 'paid' : 'submitted',
    });
  } catch (error) {
    sendError(res, error);
  }
}
