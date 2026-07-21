import {
  allowMethod, createPublicConsultationId, getClientAddress, getServiceClient,
  hashValue, requireAdmin, sendError,
} from '../server/commerce.js';
import { consultationSchema, updateConsultationSchema } from '../server/validators.js';
import { escapeEmailHtml, getNotificationConfiguration, sendTransactionalEmailSafely } from '../server/notifications.js';

export default async function handler(req, res) {
  if (!allowMethod(req, res, ['GET', 'POST', 'PATCH'])) return;

  try {
    const supabase = getServiceClient();

    if (req.method === 'GET') {
      await requireAdmin(req, supabase);
      const { data, error } = await supabase
        .from('consultations')
        .select('id, public_id, full_name, phone, email, service, template_slug, preferred_date, preferred_time, note, status, internal_note, created_at, updated_at')
        .order('created_at', { ascending: false })
        .limit(500);
      if (error) throw error;
      res.status(200).json({ consultations: data || [] });
      return;
    }

    if (req.method === 'PATCH') {
      await requireAdmin(req, supabase);
      const input = updateConsultationSchema.parse(req.body || {});
      const { data, error } = await supabase
        .from('consultations')
        .update({ status: input.status, internal_note: input.internalNote || null })
        .eq('id', input.id)
        .select('id, public_id, full_name, phone, email, service, template_slug, preferred_date, preferred_time, note, status, internal_note, created_at, updated_at')
        .single();
      if (error) throw error;
      res.status(200).json({ consultation: data });
      return;
    }

    const input = consultationSchema.parse(req.body || {});
    const sourceHash = hashValue(getClientAddress(req));
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count, error: rateError } = await supabase
      .from('consultations')
      .select('id', { count: 'exact', head: true })
      .eq('source_hash', sourceHash)
      .gte('created_at', oneHourAgo);
    if (rateError) throw rateError;
    if ((count || 0) >= 5) {
      const limited = new Error('Bạn đã gửi nhiều yêu cầu trong thời gian ngắn. Vui lòng liên hệ trực tiếp với studio.');
      limited.statusCode = 429;
      throw limited;
    }

    const publicId = createPublicConsultationId();
    const { data, error } = await supabase
      .from('consultations')
      .insert({
        public_id: publicId,
        full_name: input.fullName,
        phone: input.phone,
        email: input.email || null,
        service: input.service,
        template_slug: input.templateSlug || null,
        preferred_date: input.preferredDate,
        preferred_time: input.preferredTime,
        note: input.note || null,
        source_hash: sourceHash,
        consent_at: new Date().toISOString(),
      })
      .select('public_id, status, created_at')
      .single();
    if (error) throw error;
    const notification = getNotificationConfiguration();
    const adminUrl = `${process.env.PUBLIC_SITE_URL || 'https://thiep-moi-online.vercel.app'}/admin`;
    await sendTransactionalEmailSafely({
      to: notification.studioEmail,
      subject: `[${publicId}] Yêu cầu tư vấn mới`,
      text: `${input.fullName} cần tư vấn ${input.service} vào ${input.preferredDate} ${input.preferredTime}. Số điện thoại: ${input.phone}.`,
      html: `<h1>Yêu cầu tư vấn mới</h1><p><strong>${escapeEmailHtml(publicId)}</strong></p><p>${escapeEmailHtml(input.fullName)} · ${escapeEmailHtml(input.phone)}</p><p>Dịch vụ: ${escapeEmailHtml(input.service)}</p><p>Lịch mong muốn: ${escapeEmailHtml(input.preferredDate)} ${escapeEmailHtml(input.preferredTime)}</p><p><a href="${escapeEmailHtml(adminUrl)}">Mở quản trị</a></p>`,
      idempotencyKey: `${data.public_id}-consultation-studio`,
    });
    res.status(201).json({ consultation: data });
  } catch (error) {
    sendError(res, error);
  }
}
