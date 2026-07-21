import React, { useCallback, useEffect, useMemo, useState } from 'react';
import QRCode from 'qrcode';
import { ArrowLeft, CalendarDays, Check, Copy, Download, ExternalLink, EyeOff, FileImage, LogOut, Phone, RefreshCw, Search, Send, Trash2, Upload, UserPlus, Users } from 'lucide-react';
import {
  addGuest,
  commerceConfigured,
  commerceDemoMode,
  deleteOrderPermanently,
  deleteGuest,
  downloadGuestCsv,
  downloadRsvpCsv,
  getAdminSession,
  getAdminPreviewUrl,
  getOrder,
  listConsultations,
  listOrders,
  moderateWish,
  publishOrder,
  signInAdmin,
  signOutAdmin,
  triggerDownload,
  updateOrder,
  updateConsultation,
  uploadOrderAsset,
} from './commerceApi.js';
import { formatCurrency, normalizeInvitationContent, slugifyWedding } from './invitationContent.js';
import './commerce.css';

const statusLabels = {
  new: 'Đơn mới', awaiting_deposit: 'Chờ cọc', in_progress: 'Đang thiết kế', customer_review: 'Chờ duyệt',
  revision: 'Chỉnh sửa', approved: 'Đã duyệt', published: 'Đã phát hành', expired: 'Hết hạn', cancelled: 'Đã hủy',
};

const consultationStatusLabels = {
  new: 'Mới', contacted: 'Đã liên hệ', qualified: 'Đủ điều kiện', converted: 'Đã thành đơn', lost: 'Không tiếp tục',
};

function AdminConsultationCard({ consultation, onSaved }) {
  const [form, setForm] = useState({ status: consultation.status, internalNote: consultation.internal_note || '' });
  const [state, setState] = useState({ loading: false, error: '', success: '' });
  const save = async () => {
    setState({ loading: true, error: '', success: '' });
    try {
      const value = await updateConsultation(consultation.id, form);
      onSaved(value);
      setState({ loading: false, error: '', success: 'Đã lưu.' });
    } catch (error) {
      setState({ loading: false, error: error.message, success: '' });
    }
  };
  return (
    <article className="commerceConsultationCard">
      <header>
        <div><small>{consultation.public_id}</small><h3>{consultation.full_name}</h3><p>{consultation.service}</p></div>
        <span className={`commerceLeadStatus is-${consultation.status}`}>{consultationStatusLabels[consultation.status] || consultation.status}</span>
      </header>
      <dl>
        <div><dt><Phone /> Liên hệ</dt><dd><a href={`tel:${consultation.phone}`}>{consultation.phone}</a>{consultation.email && <a href={`mailto:${consultation.email}`}>{consultation.email}</a>}</dd></div>
        <div><dt><CalendarDays /> Lịch hẹn</dt><dd>{new Date(`${consultation.preferred_date}T00:00:00`).toLocaleDateString('vi-VN')} · {String(consultation.preferred_time).slice(0, 5)}</dd></div>
        {consultation.template_slug && <div><dt>Mẫu quan tâm</dt><dd><a href={`/template/${consultation.template_slug}`} target="_blank" rel="noreferrer">{consultation.template_slug} <ExternalLink /></a></dd></div>}
      </dl>
      {consultation.note && <blockquote>{consultation.note}</blockquote>}
      <div className="commerceConsultationEditor">
        <label>Trạng thái<select aria-label={`Trạng thái ${consultation.public_id}`} value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}>{Object.entries(consultationStatusLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
        <label>Ghi chú nội bộ<textarea aria-label={`Ghi chú ${consultation.public_id}`} rows="2" value={form.internalNote} onChange={(event) => setForm({ ...form, internalNote: event.target.value })} /></label>
        <button type="button" onClick={save} disabled={state.loading}><Check /> {state.loading ? 'Đang lưu' : 'Lưu lead'}</button>
      </div>
      {state.error && <p className="commerceError" role="alert">{state.error}</p>}
      {state.success && <small className="commerceInlineStatus" role="status">{state.success}</small>}
    </article>
  );
}

function AdminLogin({ onSuccess }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [state, setState] = useState({ loading: false, error: '' });
  const submit = async (event) => {
    event.preventDefault();
    setState({ loading: true, error: '' });
    try {
      await signInAdmin(form.email, form.password);
      onSuccess();
    } catch (error) {
      setState({ loading: false, error: error.message });
    }
  };
  return (
    <main className="commerceAdminLogin">
      <a className="commerceAdminBrand" href="/">LH · Lời Hẹn Studio</a>
      <form onSubmit={submit}>
        <p className="commerceEyebrow">KHU VỰC NỘI BỘ</p><h1>Đăng nhập quản trị</h1>
        {commerceDemoMode && <p className="commerceDemoBanner">Chế độ demo đang bật. Nhấn đăng nhập để vào dashboard mẫu.</p>}
        {!commerceConfigured && !commerceDemoMode && <p className="commerceError">Chưa cấu hình Supabase cho môi trường này.</p>}
        <label>Email<input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required={commerceConfigured} /></label>
        <label>Mật khẩu<input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required={commerceConfigured} /></label>
        {state.error && <p className="commerceError">{state.error}</p>}
        <button type="submit" disabled={state.loading}>{state.loading ? 'Đang đăng nhập...' : 'Đăng nhập'}</button>
      </form>
    </main>
  );
}

function useAdminGate() {
  const [state, setState] = useState({ loading: true, session: null });
  const refresh = () => getAdminSession().then((session) => setState({ loading: false, session }));
  useEffect(() => { refresh(); }, []);
  return { ...state, refresh };
}

export function AdminDashboard() {
  const gate = useAdminGate();
  const [orders, setOrders] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [state, setState] = useState({ loading: false, error: '', query: '', view: 'orders' });
  const load = useCallback(async () => {
    setState((current) => ({ ...current, loading: true, error: '' }));
    try {
      const [orderValues, consultationValues] = await Promise.all([listOrders(), listConsultations()]);
      setOrders(orderValues);
      setConsultations(consultationValues);
      setState((current) => ({ ...current, loading: false }));
    } catch (error) {
      setState((current) => ({ ...current, loading: false, error: error.message }));
    }
  }, []);
  useEffect(() => { if (gate.session) load(); }, [gate.session, load]);
  const filtered = useMemo(() => orders.filter((order) => `${order.public_id} ${order.customers?.full_name} ${order.customers?.phone}`.toLowerCase().includes(state.query.toLowerCase())), [orders, state.query]);
  const filteredConsultations = useMemo(() => consultations.filter((item) => `${item.public_id} ${item.full_name} ${item.phone} ${item.email} ${item.service} ${item.template_slug}`.toLowerCase().includes(state.query.toLowerCase())), [consultations, state.query]);
  const metrics = useMemo(() => ({
    total: orders.length,
    active: orders.filter((item) => !['published', 'expired', 'cancelled'].includes(item.status)).length,
    newLeads: consultations.filter((item) => item.status === 'new').length,
    revenue: orders.filter((item) => item.deposit_status === 'paid').reduce((sum, item) => sum + item.deposit_amount, 0),
  }), [consultations, orders]);

  if (gate.loading) return <main className="commerceState">Đang kiểm tra phiên...</main>;
  if (!gate.session) return <AdminLogin onSuccess={gate.refresh} />;
  return (
    <div className="commerceAdminPage">
      <header className="commerceAdminHeader"><a href="/admin">LH · Quản trị</a><nav><a href="/dat-thiep" target="_blank">Tạo đơn</a><button type="button" onClick={async () => { await signOutAdmin(); gate.refresh(); }}><LogOut /> Đăng xuất</button></nav></header>
      <main className="commerceAdminMain">
        <div className="commerceAdminTitle"><div><p className="commerceEyebrow">VẬN HÀNH THIỆP ONLINE</p><h1>{state.view === 'orders' ? 'Đơn hàng' : 'Yêu cầu tư vấn'}</h1></div><button type="button" onClick={load}><RefreshCw /> Làm mới</button></div>
        {commerceDemoMode && <p className="commerceDemoBanner">Đây là dữ liệu demo trên trình duyệt. Kết nối Supabase trước khi nhận đơn thật.</p>}
        <section className="commerceMetrics"><article><small>Tổng đơn</small><strong>{metrics.total}</strong></article><article><small>Đang xử lý</small><strong>{metrics.active}</strong></article><article><small>Lead mới</small><strong>{metrics.newLeads}</strong></article><article><small>Cọc đã nhận</small><strong>{formatCurrency(metrics.revenue)}</strong></article></section>
        <div className="commerceAdminTabs" role="tablist" aria-label="Khu vực vận hành"><button type="button" role="tab" aria-selected={state.view === 'orders'} onClick={() => setState((current) => ({ ...current, view: 'orders', query: '' }))}>Đơn hàng <span>{orders.length}</span></button><button type="button" role="tab" aria-selected={state.view === 'consultations'} onClick={() => setState((current) => ({ ...current, view: 'consultations', query: '' }))}>Tư vấn <span>{consultations.length}</span></button></div>
        <label className="commerceSearch"><Search /><input value={state.query} onChange={(event) => setState({ ...state, query: event.target.value })} placeholder={state.view === 'orders' ? 'Tìm mã đơn, tên hoặc số điện thoại' : 'Tìm mã lead, tên, dịch vụ hoặc mẫu'} /></label>
        {state.error && <p className="commerceError">{state.error}</p>}
        {state.view === 'orders' && <div className="commerceOrderTable" aria-label="Danh sách đơn hàng">
          <div className="commerceOrderRow table-head"><span>Mã đơn</span><span>Khách hàng</span><span>Gói</span><span>Trạng thái</span><span>Ngày tạo</span></div>
          {filtered.map((order) => <a className="commerceOrderRow" href={`/admin/orders/${order.id}`} key={order.id}><strong>{order.public_id}</strong><span>{order.customers?.full_name}<small>{order.customers?.phone}</small></span><span>{order.package_code}<small>{formatCurrency(order.amount_total)}</small></span><span><i className={`commerceStatus status-${order.status}`}>{statusLabels[order.status]}</i></span><time>{new Date(order.created_at).toLocaleDateString('vi-VN')}</time></a>)}
          {!state.loading && filtered.length === 0 && <p className="commerceEmpty">Không có đơn phù hợp.</p>}
        </div>}
        {state.view === 'consultations' && <div className="commerceConsultationGrid" aria-label="Danh sách yêu cầu tư vấn">{filteredConsultations.map((consultation) => <AdminConsultationCard consultation={consultation} onSaved={(value) => setConsultations((current) => current.map((item) => item.id === value.id ? value : item))} key={consultation.id} />)}{!state.loading && filteredConsultations.length === 0 && <p className="commerceEmpty">Chưa có yêu cầu tư vấn phù hợp.</p>}</div>}
      </main>
    </div>
  );
}

async function makeSocialCover(content) {
  const canvas = document.createElement('canvas');
  canvas.width = 1200; canvas.height = 630;
  const context = canvas.getContext('2d');
  context.fillStyle = '#f7f4ef'; context.fillRect(0, 0, 1200, 630);
  if (content.media.hero) {
    try {
      const image = new Image(); image.crossOrigin = 'anonymous'; image.src = content.media.hero;
      await image.decode();
      const ratio = Math.max(1200 / image.width, 630 / image.height);
      const width = image.width * ratio; const height = image.height * ratio;
      context.drawImage(image, (1200 - width) / 2, (630 - height) / 2, width, height);
      const shade = context.createLinearGradient(0, 0, 0, 630); shade.addColorStop(0, 'rgba(0,0,0,.08)'); shade.addColorStop(1, 'rgba(0,0,0,.66)'); context.fillStyle = shade; context.fillRect(0, 0, 1200, 630);
      context.fillStyle = '#fff';
    } catch {
      context.fillStyle = '#222';
    }
  } else context.fillStyle = '#222';
  context.textAlign = 'center'; context.font = '500 70px Georgia';
  context.fillText(`${content.couple.groomName} & ${content.couple.brideName}`, 600, 480);
  context.font = '400 28px Arial'; context.fillText(new Date(content.event.startsAt).toLocaleDateString('vi-VN'), 600, 535);
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.9));
  if (!blob) throw new Error('Không thể tạo ảnh chia sẻ.');
  return new File([blob], 'anh-chia-se-1200x630.jpg', { type: 'image/jpeg' });
}

export function AdminOrderDetail({ orderId }) {
  const gate = useAdminGate();
  const [order, setOrder] = useState(null);
  const [content, setContent] = useState(null);
  const [form, setForm] = useState({ status: '', depositStatus: '', internalNote: '', seoTitle: '', seoDescription: '', slug: '', expiresAt: '', assetKind: 'gallery' });
  const [guestForm, setGuestForm] = useState({ fullName: '', phone: '', groupName: '', invitedCount: 1 });
  const [state, setState] = useState({ loading: true, busy: '', error: '', success: '' });
  const load = useCallback(async () => {
    setState((current) => ({ ...current, loading: true, error: '' }));
    try {
      const value = await getOrder(orderId);
      const normalized = normalizeInvitationContent(value.invitation.content);
      setOrder(value); setContent(normalized);
      setForm({ status: value.status, depositStatus: value.deposit_status, internalNote: value.internal_note || '', seoTitle: value.invitation.seo_title || '', seoDescription: value.invitation.seo_description || '', slug: value.invitation.slug || slugifyWedding(`${normalized.couple.groomName}-${normalized.couple.brideName}`), expiresAt: value.invitation.expires_at?.slice(0, 10) || '', assetKind: 'gallery' });
      setState({ loading: false, busy: '', error: '', success: '' });
    } catch (error) { setState({ loading: false, busy: '', error: error.message, success: '' }); }
  }, [orderId]);
  useEffect(() => { if (gate.session) load(); }, [gate.session, load]);
  const setNested = (section, key, value) => setContent((current) => ({ ...current, [section]: { ...current[section], [key]: value } }));
  const setSchedule = (index, key, value) => setContent((current) => ({ ...current, schedule: current.schedule.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: value } : item) }));

  const save = async () => {
    setState((current) => ({ ...current, busy: 'save', error: '', success: '' }));
    try {
      const value = await updateOrder(orderId, { status: form.status, depositStatus: form.depositStatus, internalNote: form.internalNote, seoTitle: form.seoTitle, seoDescription: form.seoDescription, content });
      setOrder(value); setContent(normalizeInvitationContent(value.invitation.content));
      setState((current) => ({ ...current, busy: '', success: 'Đã lưu thay đổi.' }));
    } catch (error) { setState((current) => ({ ...current, busy: '', error: error.message })); }
  };

  const upload = async (event, overrideKind = '') => {
    const file = event.target.files?.[0]; if (!file) return;
    const kind = overrideKind || form.assetKind;
    setState((current) => ({ ...current, busy: 'upload', error: '', success: '' }));
    try { await uploadOrderAsset(orderId, '', file, kind); await load(); }
    catch (error) { setState((current) => ({ ...current, busy: '', error: error.message })); }
    finally { event.target.value = ''; }
  };

  const publish = async () => {
    setState((current) => ({ ...current, busy: 'publish', error: '', success: '' }));
    try {
      const saved = await updateOrder(orderId, { status: form.status, depositStatus: form.depositStatus, internalNote: form.internalNote, seoTitle: form.seoTitle, seoDescription: form.seoDescription, content });
      setOrder(saved);
      setContent(normalizeInvitationContent(saved.invitation.content));
      const expiresAt = form.expiresAt ? new Date(`${form.expiresAt}T23:59:59+07:00`).toISOString() : undefined;
      const result = await publishOrder(orderId, form.slug, expiresAt);
      setState((current) => ({ ...current, busy: '', success: `Đã phát hành: ${result.url || `${window.location.origin}/w/${form.slug}`}` }));
      await load();
    } catch (error) { setState((current) => ({ ...current, busy: '', error: error.message })); }
  };

  const downloadQr = async () => {
    const url = `${window.location.origin}/w/${form.slug}`;
    const dataUrl = await QRCode.toDataURL(url, { width: 1200, margin: 3, errorCorrectionLevel: 'H' });
    const blob = await fetch(dataUrl).then((response) => response.blob());
    triggerDownload(blob, `qr-${form.slug}.png`);
  };

  const createCover = async () => {
    setState((current) => ({ ...current, busy: 'cover', error: '', success: '' }));
    try {
      const heroAsset = order.assets.find((asset) => ['hero', 'couple', 'bride', 'groom'].includes(asset.kind) && asset.signed_url);
      const coverContent = { ...content, media: { ...content.media, hero: content.media.hero || heroAsset?.signed_url || '' } };
      const file = await makeSocialCover(coverContent);
      await uploadOrderAsset(orderId, '', file, 'social');
      await load();
      setState((current) => ({ ...current, busy: '', success: 'Đã tạo ảnh chia sẻ 1200×630.' }));
    }
    catch (error) { setState((current) => ({ ...current, busy: '', error: error.message })); }
  };

  const openPreview = async () => {
    const previewWindow = window.open('', '_blank', 'noopener,noreferrer');
    try {
      const url = await getAdminPreviewUrl(order);
      if (previewWindow) previewWindow.location.href = url;
      else window.location.href = url;
    } catch (error) {
      if (previewWindow) previewWindow.close();
      setState((current) => ({ ...current, error: error.message }));
    }
  };

  const createGuest = async (event) => {
    event.preventDefault();
    setState((current) => ({ ...current, busy: 'guest', error: '', success: '' }));
    try {
      await addGuest(orderId, { ...guestForm, invitedCount: Number(guestForm.invitedCount) });
      setGuestForm({ fullName: '', phone: '', groupName: '', invitedCount: 1 });
      await load();
      setState((current) => ({ ...current, busy: '', success: 'Đã tạo link cá nhân hóa cho khách.' }));
    } catch (error) {
      setState((current) => ({ ...current, busy: '', error: error.message }));
    }
  };

  const removeGuest = async (guestId) => {
    try {
      await deleteGuest(guestId, orderId);
      await load();
    } catch (error) {
      setState((current) => ({ ...current, error: error.message }));
    }
  };

  const setWishApproval = async (wishId, isApproved) => {
    setState((current) => ({ ...current, busy: `wish-${wishId}`, error: '', success: '' }));
    try {
      await moderateWish(wishId, isApproved, orderId);
      await load();
      setState((current) => ({ ...current, busy: '', success: isApproved ? 'Lời chúc đã được duyệt.' : 'Lời chúc đã được ẩn.' }));
    } catch (error) {
      setState((current) => ({ ...current, busy: '', error: error.message }));
    }
  };

  const deleteOrder = async () => {
    const confirmation = window.prompt(`Nhập chính xác mã ${order.public_id} để xóa vĩnh viễn đơn hàng và dữ liệu khách:`);
    if (confirmation === null) return;
    if (confirmation.trim() !== order.public_id) {
      setState((current) => ({ ...current, error: 'Mã xác nhận không khớp.', success: '' }));
      return;
    }
    if (!window.confirm('Thao tác này không thể hoàn tác. Tiếp tục xóa?')) return;
    setState((current) => ({ ...current, busy: 'delete-order', error: '', success: '' }));
    try {
      await deleteOrderPermanently(order.id, confirmation.trim());
      window.location.assign('/admin');
    } catch (error) {
      setState((current) => ({ ...current, busy: '', error: error.message }));
    }
  };

  if (gate.loading || state.loading) return <main className="commerceState">Đang tải đơn hàng...</main>;
  if (!gate.session) return <AdminLogin onSuccess={gate.refresh} />;
  if (!order || !content) return <main className="commerceState"><h1>Không thể mở đơn</h1><p>{state.error}</p></main>;
  return (
    <div className="commerceAdminPage">
      <header className="commerceAdminHeader"><a href="/admin"><ArrowLeft /> Danh sách đơn</a><nav><button type="button" onClick={openPreview}>Xem thiệp <ExternalLink /></button><button type="button" onClick={save} disabled={state.busy === 'save'}><Check /> {state.busy === 'save' ? 'Đang lưu' : 'Lưu'}</button></nav></header>
      <main className="commerceAdminMain order-detail">
        <div className="commerceAdminTitle"><div><p className="commerceEyebrow">{order.public_id}</p><h1>{content.couple.groomName} &amp; {content.couple.brideName}</h1><p>{order.customers.full_name} · {order.customers.phone}</p></div><span className={`commerceStatus status-${order.status}`}>{statusLabels[order.status]}</span></div>
        {state.error && <p className="commerceError">{state.error}</p>}{state.success && <p className="commerceSuccessMessage">{state.success}</p>}
        <div className="commerceAdminGrid">
          <section className="commercePanel">
            <h2>Trạng thái đơn</h2>
            <div className="commerceFields two-columns"><label>Tiến độ<select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}>{Object.entries(statusLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label><label>Tiền cọc<select value={form.depositStatus} onChange={(event) => setForm({ ...form, depositStatus: event.target.value })}><option value="pending">Chờ cọc</option><option value="submitted">Đã gửi biên nhận</option><option value="paid">Đã nhận</option><option value="failed">Không hợp lệ</option><option value="refunded">Đã hoàn</option></select></label><label className="full-width">Ghi chú nội bộ<textarea rows="3" value={form.internalNote} onChange={(event) => setForm({ ...form, internalNote: event.target.value })} /></label></div>
          </section>
          <section className="commercePanel">
            <h2>Cô dâu và chú rể</h2>
            <div className="commerceFields two-columns"><label>Tên chú rể<input value={content.couple.groomName} onChange={(event) => setNested('couple', 'groomName', event.target.value)} /></label><label>Tên cô dâu<input value={content.couple.brideName} onChange={(event) => setNested('couple', 'brideName', event.target.value)} /></label><label>Họ tên chú rể<input value={content.couple.groomFullName} onChange={(event) => setNested('couple', 'groomFullName', event.target.value)} /></label><label>Họ tên cô dâu<input value={content.couple.brideFullName} onChange={(event) => setNested('couple', 'brideFullName', event.target.value)} /></label><label>Ngày sinh chú rể<input value={content.couple.groomBirthDate} onChange={(event) => setNested('couple', 'groomBirthDate', event.target.value)} /></label><label>Ngày sinh cô dâu<input value={content.couple.brideBirthDate} onChange={(event) => setNested('couple', 'brideBirthDate', event.target.value)} /></label></div>
          </section>
          <section className="commercePanel">
            <h2>Thông tin hai gia đình</h2>
            <div className="commerceFields two-columns"><label>Cha chú rể<input value={content.families.groomFather} onChange={(event) => setNested('families', 'groomFather', event.target.value)} /></label><label>Mẹ chú rể<input value={content.families.groomMother} onChange={(event) => setNested('families', 'groomMother', event.target.value)} /></label><label>Địa chỉ nhà trai<input value={content.families.groomAddress} onChange={(event) => setNested('families', 'groomAddress', event.target.value)} /></label><span /><label>Cha cô dâu<input value={content.families.brideFather} onChange={(event) => setNested('families', 'brideFather', event.target.value)} /></label><label>Mẹ cô dâu<input value={content.families.brideMother} onChange={(event) => setNested('families', 'brideMother', event.target.value)} /></label><label>Địa chỉ nhà gái<input value={content.families.brideAddress} onChange={(event) => setNested('families', 'brideAddress', event.target.value)} /></label></div>
          </section>
          <section className="commercePanel full-span">
            <h2>Ngày cưới và địa điểm</h2>
            <div className="commerceFields two-columns"><label>Thời gian<input type="datetime-local" value={content.event.startsAt.slice(0, 16)} onChange={(event) => setNested('event', 'startsAt', `${event.target.value}:00+07:00`)} /></label><label>Tên địa điểm<input value={content.event.venueName} onChange={(event) => setNested('event', 'venueName', event.target.value)} /></label><label>Địa chỉ<input value={content.event.address} onChange={(event) => setNested('event', 'address', event.target.value)} /></label><label>Google Maps<input value={content.event.mapUrl} onChange={(event) => setNested('event', 'mapUrl', event.target.value)} /></label><label className="full-width">Ngày âm lịch<input value={content.event.lunarDate} onChange={(event) => setNested('event', 'lunarDate', event.target.value)} /></label></div>
            <div className="commerceScheduleEditor">{content.schedule.slice(0, 4).map((item, index) => <div key={index}><input aria-label={`Giờ mốc ${index + 1}`} value={item.time} onChange={(event) => setSchedule(index, 'time', event.target.value)} /><input aria-label={`Nội dung mốc ${index + 1}`} value={item.label} onChange={(event) => setSchedule(index, 'label', event.target.value)} /></div>)}</div>
          </section>
          <section className="commercePanel full-span">
            <h2>Nội dung và SEO</h2>
            <div className="commerceFields two-columns"><label className="full-width">Lời mời<textarea rows="3" value={content.copy.intro} onChange={(event) => setNested('copy', 'intro', event.target.value)} /></label><label className="full-width">Câu chuyện<textarea rows="5" value={content.copy.story} onChange={(event) => setNested('copy', 'story', event.target.value)} /></label><label className="full-width">Câu trích dẫn<textarea rows="2" value={content.copy.quote} onChange={(event) => setNested('copy', 'quote', event.target.value)} /></label><label className="full-width">Lời cảm ơn<textarea rows="3" value={content.copy.thankYou} onChange={(event) => setNested('copy', 'thankYou', event.target.value)} /></label><label>SEO title<input value={form.seoTitle} onChange={(event) => setForm({ ...form, seoTitle: event.target.value })} /></label><label>SEO description<input value={form.seoDescription} onChange={(event) => setForm({ ...form, seoDescription: event.target.value })} /></label></div>
          </section>
          <section className="commercePanel full-span">
            <div className="commercePanelHeading"><div><small>TƯ LIỆU</small><h2>{order.assets.length} tệp đã tải</h2></div><div className="commerceUploadRow"><select value={form.assetKind} onChange={(event) => setForm({ ...form, assetKind: event.target.value })}><option value="hero">Ảnh bìa</option><option value="bride">Cô dâu</option><option value="groom">Chú rể</option><option value="couple">Cặp đôi</option><option value="venue">Địa điểm</option><option value="final">Ảnh kết</option><option value="gallery">Album</option><option value="music">Nhạc</option><option value="gift_qr">QR mừng cưới</option></select><label className="commerceUploadButton"><Upload /> Tải tệp<input type="file" accept="image/*,audio/mpeg,audio/mp4" onChange={upload} /></label></div></div>
            <div className="commerceAssetList">{order.assets.map((asset) => <article key={asset.id}><FileImage /><div><strong>{asset.original_name}</strong><small>{asset.kind}</small></div>{asset.signed_url && <a href={asset.signed_url} target="_blank" rel="noreferrer">Xem</a>}</article>)}</div>
          </section>
          <section className="commercePanel full-span commercePublishPanel">
            <div><small>PHÁT HÀNH</small><h2>Link, QR và ảnh chia sẻ</h2></div>
            <div className="commerceFields three-columns"><label>Slug<input value={form.slug} onChange={(event) => setForm({ ...form, slug: slugifyWedding(event.target.value) })} /></label><label>Ngày hết hạn<input type="date" value={form.expiresAt} onChange={(event) => setForm({ ...form, expiresAt: event.target.value })} /></label><span className="commercePublishUrl">/w/{form.slug}</span></div>
            <div className="commerceActionRow"><button type="button" onClick={publish} disabled={state.busy === 'publish'}><Send /> {state.busy === 'publish' ? 'Đang phát hành' : 'Phát hành thiệp'}</button><button type="button" onClick={downloadQr}><Download /> QR PNG</button><button type="button" onClick={createCover} disabled={state.busy === 'cover'}><FileImage /> Ảnh 1200×630</button></div>
          </section>
          <section className="commercePanel full-span">
            <div className="commercePanelHeading"><div><small>KHÁCH MỜI</small><h2>{order.guests?.length || 0} link cá nhân hóa</h2></div><button type="button" onClick={() => downloadGuestCsv(order.guests, `khach-moi-${order.public_id}.csv`)}><Download /> Xuất CSV</button></div>
            <form className="commerceGuestForm" onSubmit={createGuest}><input aria-label="Tên khách mời" placeholder="Họ và tên" value={guestForm.fullName} onChange={(event) => setGuestForm({ ...guestForm, fullName: event.target.value })} required /><input aria-label="Số điện thoại khách mời" placeholder="Số điện thoại" value={guestForm.phone} onChange={(event) => setGuestForm({ ...guestForm, phone: event.target.value })} /><input aria-label="Nhóm khách" placeholder="Nhóm: Bạn chú rể..." value={guestForm.groupName} onChange={(event) => setGuestForm({ ...guestForm, groupName: event.target.value })} /><input aria-label="Số người được mời" type="number" min="1" max="20" value={guestForm.invitedCount} onChange={(event) => setGuestForm({ ...guestForm, invitedCount: Number(event.target.value) })} /><button type="submit" disabled={state.busy === 'guest'}><UserPlus /> Thêm khách</button></form>
            <div className="commerceGuestList">{order.guests?.map((guest) => <article key={guest.id}><div><strong>{guest.full_name}</strong><small>{guest.group_name || 'Chưa phân nhóm'} · {guest.invited_count} người</small></div><code>{guest.personal_url}</code><button type="button" onClick={() => navigator.clipboard.writeText(guest.personal_url)} aria-label={`Sao chép link của ${guest.full_name}`}><Copy /></button><button type="button" onClick={() => removeGuest(guest.id)} aria-label={`Xóa ${guest.full_name}`}><Trash2 /></button></article>)}{!order.guests?.length && <p>Chưa có khách mời cá nhân hóa.</p>}</div>
          </section>
          <section className="commercePanel full-span">
            <div className="commercePanelHeading"><div><small>RSVP</small><h2>{order.rsvps?.length || 0} phản hồi</h2></div><button type="button" onClick={() => downloadRsvpCsv(order.id, `rsvp-${order.public_id}.csv`)}><Download /> Xuất CSV</button></div>
            <div className="commerceMiniTable"><div className="table-head"><span>Khách</span><span>Tham dự</span><span>Số người</span><span>Lời nhắn</span></div>{order.rsvps?.map((item) => <div key={item.id}><span>{item.full_name}<small>{item.phone}</small></span><span>{item.attendance}</span><span>{item.party_size}</span><span>{item.note}</span></div>)}{!order.rsvps?.length && <p>Chưa có phản hồi.</p>}</div>
          </section>
          <section className="commercePanel full-span"><div className="commercePanelHeading"><div><small>LỜI CHÚC</small><h2>{order.wishes?.length || 0} lời chúc</h2></div><Users /></div><div className="commerceWishList">{order.wishes?.map((item) => <blockquote className={item.is_approved ? 'is-approved' : 'is-pending'} key={item.id}><p>{item.message}</p><footer>{item.full_name} · {new Date(item.created_at).toLocaleString('vi-VN')}</footer><div className="commerceWishActions"><span>{item.is_approved ? 'Đang hiển thị' : 'Chờ duyệt'}</span>{item.is_approved ? <button type="button" onClick={() => setWishApproval(item.id, false)} disabled={state.busy === `wish-${item.id}`}><EyeOff /> Ẩn</button> : <button type="button" onClick={() => setWishApproval(item.id, true)} disabled={state.busy === `wish-${item.id}`}><Check /> Duyệt</button>}</div></blockquote>)}{!order.wishes?.length && <p>Chưa có lời chúc.</p>}</div></section>
          {!commerceDemoMode && <section className="commercePanel full-span commerceDangerPanel"><div><small>QUẢN LÝ DỮ LIỆU</small><h2>Xóa vĩnh viễn đơn hàng</h2><p>Xóa nội dung thiệp, RSVP, lời chúc, khách mời và toàn bộ tư liệu riêng tư. Chỉ tài khoản admin được thực hiện.</p></div><button type="button" onClick={deleteOrder} disabled={state.busy === 'delete-order'}><Trash2 /> {state.busy === 'delete-order' ? 'Đang xóa...' : 'Xóa dữ liệu đơn'}</button></section>}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
