import React, { useCallback, useEffect, useMemo, useState } from 'react';
import QRCode from 'qrcode';
import { Check, CheckCircle2, Copy, Download, ExternalLink, FileImage, Link2, Music, PenLine, RefreshCw, Send, Trash2, Upload, UserPlus, Users } from 'lucide-react';
import { StudioFooter, StudioHeader } from '../studio/StudioChrome.jsx';
import {
  addGuest, deleteGuest, downloadGuestCsv, downloadRsvpCsv, getOrder, getOrderPreviewUrl,
  moderateWish, selfPublishInvitation, submitPaymentIntent, triggerDownload, updateOrder, uploadOrderAsset,
} from './commerceApi.js';
import { formatCurrency } from './invitationContent.js';
import { formatStorage, getPackageUsage } from './packageLimits.js';
import './commerce.css';

const statusLabels = {
  new: 'Đơn mới', awaiting_deposit: 'Chờ xác nhận cọc', in_progress: 'Đang thiết kế', customer_review: 'Chờ khách duyệt',
  revision: 'Đang chỉnh sửa', approved: 'Đã duyệt', published: 'Đã phát hành', expired: 'Đã hết hạn', cancelled: 'Đã hủy',
};

export default function CustomerPortal({ orderId }) {
  const queryToken = new URLSearchParams(window.location.search).get('token') || '';
  const [token] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(`loi-hen-order-${orderId}`) || '{}');
      return queryToken || saved.accessToken || '';
    } catch {
      return queryToken;
    }
  });
  const [state, setState] = useState({ loading: true, order: null, previewUrl: '', error: '', success: '', busy: '' });
  const [revision, setRevision] = useState('');
  const [assetKind, setAssetKind] = useState('gallery');
  const [guestForm, setGuestForm] = useState({ fullName: '', phone: '', groupName: '', invitedCount: 1 });
  const previewUrl = useMemo(() => state.previewUrl || '', [state.previewUrl]);

  const load = useCallback(async () => {
    setState((current) => ({ ...current, loading: true, error: '' }));
    try {
      const order = await getOrder(orderId, token);
      const invitationUrl = order.invitation.status === 'published'
        ? `${window.location.origin}/w/${order.invitation.slug}`
        : await getOrderPreviewUrl(orderId, token);
      localStorage.setItem(`loi-hen-order-${orderId}`, JSON.stringify({ accessToken: token, previewToken: token }));
      setState({ loading: false, order, previewUrl: invitationUrl, error: '', success: '', busy: '' });
    } catch (error) {
      setState({ loading: false, order: null, error: error.message, success: '', busy: '' });
    }
  }, [orderId, token]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    if (!queryToken) return;
    const cleanUrl = new URL(window.location.href);
    cleanUrl.searchParams.delete('token');
    window.history.replaceState({}, '', `${cleanUrl.pathname}${cleanUrl.search}${cleanUrl.hash}`);
  }, [queryToken]);

  const upload = async (event, overrideKind = '') => {
    const file = event.target.files?.[0];
    if (!file) return;
    setState((current) => ({ ...current, busy: 'upload', error: '' }));
    try {
      await uploadOrderAsset(orderId, token, file, overrideKind || assetKind);
      await load();
    } catch (error) {
      setState((current) => ({ ...current, busy: '', error: error.message }));
    } finally {
      event.target.value = '';
    }
  };

  const sendRevision = async (event) => {
    event.preventDefault();
    if (!revision.trim()) return;
    setState((current) => ({ ...current, busy: 'revision', error: '' }));
    try {
      const order = await updateOrder(orderId, { revisionMessage: revision }, token);
      setRevision('');
      setState((current) => ({ ...current, loading: false, order, error: '', busy: '' }));
    } catch (error) {
      setState((current) => ({ ...current, busy: '', error: error.message }));
    }
  };

  const downloadQr = async () => {
    setState((current) => ({ ...current, busy: 'qr', error: '', success: '' }));
    try {
      const dataUrl = await QRCode.toDataURL(previewUrl, { width: 1200, margin: 3, errorCorrectionLevel: 'H' });
      const blob = await fetch(dataUrl).then((response) => response.blob());
      triggerDownload(blob, `qr-${state.order.invitation.slug}.png`);
      setState((current) => ({ ...current, busy: '', success: 'Đã tải QR thiệp cưới.' }));
    } catch (error) {
      setState((current) => ({ ...current, busy: '', error: error.message }));
    }
  };

  const downloadSocialImage = async () => {
    const socialAsset = state.order.assets.find((asset) => asset.kind === 'social' && asset.signed_url);
    const socialUrl = socialAsset?.signed_url || state.order.invitation.content.media.social;
    if (!socialUrl) {
      setState((current) => ({ ...current, error: 'Studio chưa hoàn tất ảnh chia sẻ 1200×630.' }));
      return;
    }
    setState((current) => ({ ...current, busy: 'social', error: '', success: '' }));
    try {
      const response = await fetch(socialUrl);
      if (!response.ok) throw new Error('Không thể tải ảnh chia sẻ.');
      triggerDownload(await response.blob(), `anh-chia-se-${state.order.invitation.slug}.jpg`);
      setState((current) => ({ ...current, busy: '', success: 'Đã tải ảnh chia sẻ.' }));
    } catch (error) {
      setState((current) => ({ ...current, busy: '', error: error.message }));
    }
  };

  const createGuest = async (event) => {
    event.preventDefault();
    setState((current) => ({ ...current, busy: 'guest', error: '', success: '' }));
    try {
      await addGuest(orderId, { ...guestForm, invitedCount: Number(guestForm.invitedCount) }, token);
      setGuestForm({ fullName: '', phone: '', groupName: '', invitedCount: 1 });
      await load();
      setState((current) => ({ ...current, success: 'Đã tạo link mời cá nhân hóa.' }));
    } catch (error) {
      setState((current) => ({ ...current, busy: '', error: error.message }));
    }
  };

  const removeGuest = async (guestId) => {
    setState((current) => ({ ...current, busy: `guest-${guestId}`, error: '', success: '' }));
    try {
      await deleteGuest(guestId, orderId, token);
      await load();
      setState((current) => ({ ...current, success: 'Đã xóa khách mời.' }));
    } catch (error) {
      setState((current) => ({ ...current, busy: '', error: error.message }));
    }
  };

  const setWishApproval = async (wishId, isApproved) => {
    setState((current) => ({ ...current, busy: `wish-${wishId}`, error: '', success: '' }));
    try {
      await moderateWish(wishId, isApproved, orderId, token);
      await load();
      setState((current) => ({ ...current, success: isApproved ? 'Lời chúc đã được duyệt.' : 'Lời chúc đã được ẩn.' }));
    } catch (error) {
      setState((current) => ({ ...current, busy: '', error: error.message }));
    }
  };

  const submitTransfer = async () => {
    setState((current) => ({ ...current, busy: 'payment', error: '', success: '' }));
    try {
      await submitPaymentIntent(orderId, token);
      await load();
      setState((current) => ({ ...current, success: 'Đã ghi nhận yêu cầu thanh toán. Studio sẽ tự động hoặc thủ công xác nhận giao dịch trước khi mở phát hành.' }));
    } catch (error) {
      setState((current) => ({ ...current, busy: '', error: error.message }));
    }
  };

  const publishInvitation = async () => {
    setState((current) => ({ ...current, busy: 'publish', error: '', success: '' }));
    try {
      const result = await selfPublishInvitation(orderId, token);
      await load();
      setState((current) => ({
        ...current,
        success: result.reviewRequired
          ? 'Đã gửi bản thiệp để studio kiểm tra và phát hành.'
          : 'Thiệp đã vượt qua kiểm tra và được phát hành.',
      }));
    } catch (error) {
      setState((current) => ({ ...current, busy: '', error: error.message }));
    }
  };

  if (state.loading) return <main className="commerceState"><p>Đang tải đơn hàng...</p></main>;
  if (state.error && !state.order) return <main className="commerceState"><h1>Không thể mở đơn hàng</h1><p>{state.error}</p><a href="/dat-thiep">Tạo yêu cầu mới</a></main>;
  const order = state.order;
  const packageUsage = getPackageUsage(order.package_code, order.assets, order.guests?.length || 0);
  const isPublished = order.invitation.status === 'published';
  const guests = order.guests || [];
  const rsvps = order.rsvps || [];
  const wishes = order.wishes || [];
  const attendingRsvps = rsvps.filter((item) => item.attendance === 'yes');
  const attendingPeople = attendingRsvps.reduce((total, item) => total + Number(item.party_size || 0), 0);
  const attendanceLabel = { yes: 'Tham dự', no: 'Không tham dự', unsure: 'Chưa chắc' };
  const bank = { name: import.meta.env.VITE_BANK_NAME, account: import.meta.env.VITE_BANK_ACCOUNT, owner: import.meta.env.VITE_BANK_OWNER, bin: import.meta.env.VITE_BANK_BIN };
  const paymentAmount = order.deposit_amount || order.amount_total;
  const paymentQrUrl = bank.bin && bank.account
    ? `https://img.vietqr.io/image/${bank.bin}-${bank.account}-compact2.png?amount=${paymentAmount}&addInfo=${encodeURIComponent(order.public_id)}&accountName=${encodeURIComponent(bank.owner || '')}`
    : '';

  return (
    <div className="commercePage">
      <StudioHeader />
      <main className="commercePortal">
        <header className="commercePortalHeader">
          <div><p className="commerceEyebrow">CỔNG KHÁCH HÀNG</p><h1>{order.public_id}</h1><p>{order.customers.full_name} · {order.customers.phone}</p></div>
          <span className={`commerceStatus status-${order.status}`}>{statusLabels[order.status] || order.status}</span>
        </header>

        <section className="commerceProgress" aria-label="Tiến độ đơn hàng">
          {['Đã tạo đơn', 'Xác nhận cọc', 'Thiết kế', 'Duyệt', 'Phát hành'].map((label, index) => <span className={index <= (order.status === 'published' ? 4 : order.deposit_status === 'paid' ? 2 : 0) ? 'is-done' : ''} key={label}><i>{index + 1}</i>{label}</span>)}
        </section>

        <div className="commercePortalGrid">
          <section className="commercePanel">
            <div className="commercePanelHeading"><div><small>BẢN THIỆP</small><h2>{order.invitation.content.couple.groomName} &amp; {order.invitation.content.couple.brideName}</h2></div><div className="commercePanelActions"><a className="is-primary" href={`/chinh-sua-thiep/${order.id}`}><PenLine /> Tự chỉnh sửa</a><a href={previewUrl} target="_blank" rel="noreferrer">Mở thiệp <ExternalLink /></a>{!isPublished && (order.deposit_status === 'paid' ? <button type="button" onClick={publishInvitation} disabled={state.busy === 'publish'}><Send /> Phát hành thiệp</button> : <a href="#payment" className="commercePaymentLink"><Send /> Thanh toán để phát hành</a>)}</div></div>
            <img className="commerceTemplatePreview" src={`/social/${order.template_slug}.jpg`} alt={`Mẫu ${order.template_slug}`} />
            <div className="commerceLinkBox"><code>{previewUrl}</code><button type="button" onClick={() => navigator.clipboard.writeText(previewUrl)} aria-label="Sao chép link"><Copy /></button></div>
          </section>

          {isPublished && <section className="commercePanel full-span commerceHandoffPanel">
            <div className="commercePanelHeading"><div><small>BỘ BÀN GIAO</small><h2>Thiệp đã sẵn sàng để gửi khách</h2></div><span className="commerceStatus status-published"><Check /> Đã phát hành</span></div>
            <div className="commerceLinkBox"><code>{previewUrl}</code><button type="button" onClick={() => { navigator.clipboard.writeText(previewUrl); setState((current) => ({ ...current, success: 'Đã sao chép link thiệp.' })); }} aria-label="Sao chép link chính thức"><Copy /></button></div>
            <div className="commerceDeliveryActions">
              <a href={previewUrl} target="_blank" rel="noreferrer"><ExternalLink /> Mở thiệp</a>
              <button type="button" onClick={downloadQr} disabled={state.busy === 'qr'}><Download /> QR PNG</button>
              <button type="button" onClick={downloadSocialImage} disabled={state.busy === 'social'}><FileImage /> Ảnh 1200×630</button>
              <button type="button" onClick={() => downloadGuestCsv(guests, `khach-moi-${order.public_id}.csv`)}><Users /> CSV khách mời</button>
            </div>
            <dl className="commerceDeliveryMeta">
              <div><dt>Ngày hết hạn</dt><dd>{order.invitation.expires_at ? new Date(order.invitation.expires_at).toLocaleDateString('vi-VN') : 'Không giới hạn'}</dd></div>
              <div><dt>Chỉnh sửa</dt><dd>{order.revision_count}/{order.revision_limit} lần</dd></div>
              <div><dt>Link cá nhân hóa</dt><dd>{guests.length}</dd></div>
              <div><dt>Người xác nhận tham dự</dt><dd>{attendingPeople}</dd></div>
            </dl>
          </section>}

          <section className="commercePanel commerceQrPayment" id="payment">
            <div className="commercePanelHeading"><div><small>THANH TOÁN ĐỂ PHÁT HÀNH</small><h2>{formatCurrency(paymentAmount)}</h2></div><span className={`commerceStatus payment-${order.deposit_status}`}>{order.deposit_status === 'paid' ? 'Đã xác nhận' : order.deposit_status === 'submitted' ? 'Đang kiểm tra' : 'Sẵn sàng thanh toán'}</span></div>
            {order.deposit_status === 'paid' ? <p className="commercePaymentDone"><CheckCircle2 /> Thanh toán đã xác nhận. Bạn có thể phát hành link thiệp ngay.</p> : bank.name && bank.account && bank.owner ? <div className="commerceQrPaymentBody">{paymentQrUrl && <img src={paymentQrUrl} alt={`Mã QR thanh toán ${formatCurrency(paymentAmount)}`} className="commercePaymentQr" />}<div><p>Quét mã bằng ứng dụng ngân hàng và chuyển đúng số tiền. Nội dung chuyển khoản đã được điền sẵn theo mã đơn.</p><dl className="commerceBank"><div><dt>Ngân hàng</dt><dd>{bank.name}</dd></div><div><dt>Số tài khoản</dt><dd>{bank.account}</dd></div><div><dt>Chủ tài khoản</dt><dd>{bank.owner}</dd></div><div><dt>Nội dung</dt><dd>{order.public_id}</dd></div></dl><button type="button" className="commercePrimaryAction" onClick={submitTransfer} disabled={state.busy === 'payment'}>{state.busy === 'payment' ? 'Đang ghi nhận...' : 'Tôi đã chuyển khoản'}</button></div></div> : <p>Studio sẽ gửi mã QR chuyển khoản qua kênh liên hệ đã đăng ký.</p>}
          </section>

          <section className="commercePanel full-span">
            <div className="commercePanelHeading"><div><small>TƯ LIỆU THIẾT KẾ · GÓI {packageUsage.packageInfo.name.toUpperCase()}</small><h2>Ảnh cưới và nhạc nền</h2></div><span>{packageUsage.assets}/{packageUsage.packageInfo.limits.assets} tệp</span></div>
            <div className="commerceUsageGrid" aria-label="Hạn mức gói">
              <span><strong>{packageUsage.images}/{packageUsage.packageInfo.limits.images}</strong> ảnh</span>
              <span><strong>{formatStorage(packageUsage.storageBytes)}/{formatStorage(packageUsage.packageInfo.limits.storageBytes)}</strong> dung lượng</span>
              <span><strong>{packageUsage.guests}/{packageUsage.packageInfo.limits.guests}</strong> khách cá nhân hóa</span>
            </div>
            <div className="commerceUploadRow">
              <select value={assetKind} onChange={(event) => setAssetKind(event.target.value)} aria-label="Loại tệp">
                <option value="hero">Ảnh bìa</option><option value="bride">Ảnh cô dâu</option><option value="groom">Ảnh chú rể</option><option value="couple">Ảnh cặp đôi</option><option value="venue">Ảnh địa điểm</option><option value="final">Ảnh kết</option><option value="gallery">Ảnh album</option><option value="music">Nhạc nền</option><option value="gift_qr">QR mừng cưới</option>
              </select>
              <label className="commerceUploadButton"><Upload /> {state.busy === 'upload' ? 'Đang tải...' : 'Chọn tệp'}<input type="file" accept={assetKind === 'music' ? 'audio/mpeg,audio/mp4' : 'image/jpeg,image/png,image/webp,image/gif'} onChange={upload} disabled={state.busy === 'upload'} /></label>
            </div>
            <div className="commerceAssetList">
              {order.assets.length === 0 && <p>Chưa có tệp nào được tải lên.</p>}
              {order.assets.map((asset) => <article key={asset.id}>{asset.kind === 'music' ? <Music /> : <FileImage />}<div><strong>{asset.original_name}</strong><small>{asset.kind} · {Math.ceil((asset.byte_size || 0) / 1024)} KB</small></div>{asset.signed_url && <a href={asset.signed_url} target="_blank" rel="noreferrer">Xem</a>}</article>)}
            </div>
          </section>

          {isPublished && <section className="commercePanel full-span">
            <div className="commercePanelHeading"><div><small>KHÁCH MỜI CÁ NHÂN HÓA</small><h2>Quản lý link gửi riêng</h2></div><span>{guests.length}/{packageUsage.packageInfo.limits.guests} khách</span></div>
            <form className="commerceGuestForm" onSubmit={createGuest}><input aria-label="Tên khách mời" placeholder="Họ và tên" value={guestForm.fullName} onChange={(event) => setGuestForm({ ...guestForm, fullName: event.target.value })} required /><input aria-label="Số điện thoại khách mời" placeholder="Số điện thoại" value={guestForm.phone} onChange={(event) => setGuestForm({ ...guestForm, phone: event.target.value })} /><input aria-label="Nhóm khách" placeholder="Nhóm khách" value={guestForm.groupName} onChange={(event) => setGuestForm({ ...guestForm, groupName: event.target.value })} /><input aria-label="Số người được mời" type="number" min="1" max="20" value={guestForm.invitedCount} onChange={(event) => setGuestForm({ ...guestForm, invitedCount: Number(event.target.value) })} /><button type="submit" disabled={state.busy === 'guest'}><UserPlus /> Thêm khách</button></form>
            <div className="commerceGuestList">{guests.map((guest) => <article key={guest.id}><div><strong>{guest.full_name}</strong><small>{guest.group_name || 'Chưa phân nhóm'} · {guest.invited_count} người</small></div><code>{guest.personal_url}</code><button type="button" onClick={() => navigator.clipboard.writeText(guest.personal_url)} aria-label={`Sao chép link của ${guest.full_name}`}><Copy /></button><button type="button" onClick={() => removeGuest(guest.id)} disabled={state.busy === `guest-${guest.id}`} aria-label={`Xóa ${guest.full_name}`}><Trash2 /></button></article>)}{!guests.length && <p>Chưa có link khách mời cá nhân hóa.</p>}</div>
          </section>}

          {isPublished && <section className="commercePanel full-span">
            <div className="commercePanelHeading"><div><small>RSVP</small><h2>Phản hồi tham dự</h2></div><button type="button" onClick={() => downloadRsvpCsv(order.id, `rsvp-${order.public_id}.csv`, token)}><Download /> Xuất CSV</button></div>
            <div className="commerceRsvpMetrics"><span><strong>{rsvps.length}</strong> phản hồi</span><span><strong>{attendingRsvps.length}</strong> xác nhận đến</span><span><strong>{attendingPeople}</strong> người tham dự</span><span><strong>{rsvps.filter((item) => item.attendance === 'no').length}</strong> vắng mặt</span></div>
            <div className="commerceMiniTable"><div className="table-head"><span>Khách</span><span>Trạng thái</span><span>Số người</span><span>Lời nhắn</span></div>{rsvps.map((item) => <div key={item.id}><span>{item.full_name}<small>{item.phone}</small></span><span>{attendanceLabel[item.attendance] || item.attendance}</span><span>{item.party_size}</span><span>{item.note || '—'}</span></div>)}{!rsvps.length && <p>Chưa có phản hồi tham dự.</p>}</div>
          </section>}

          {isPublished && <section className="commercePanel full-span">
            <div className="commercePanelHeading"><div><small>LỜI CHÚC</small><h2>Duyệt nội dung trước khi hiển thị</h2></div><Link2 /></div>
            <div className="commerceWishList">{wishes.map((item) => <blockquote className={item.is_approved ? 'is-approved' : 'is-pending'} key={item.id}><p>{item.message}</p><footer>{item.full_name} · {new Date(item.created_at).toLocaleString('vi-VN')}</footer><div className="commerceWishActions"><span>{item.is_approved ? 'Đang hiển thị' : 'Chờ duyệt'}</span>{item.is_approved ? <button type="button" onClick={() => setWishApproval(item.id, false)} disabled={state.busy === `wish-${item.id}`}>Ẩn</button> : <button type="button" onClick={() => setWishApproval(item.id, true)} disabled={state.busy === `wish-${item.id}`}>Duyệt</button>}</div></blockquote>)}{!wishes.length && <p>Chưa có lời chúc.</p>}</div>
          </section>}

          <section className="commercePanel full-span">
            <div className="commercePanelHeading"><div><small>YÊU CẦU CHỈNH SỬA</small><h2>{order.revision_count}/{order.revision_limit} lần đã sử dụng</h2></div></div>
            <form className="commerceRevisionForm" onSubmit={sendRevision}><textarea value={revision} onChange={(event) => setRevision(event.target.value)} rows="4" placeholder="Ghi rõ vị trí và nội dung cần chỉnh..." /><button type="submit" disabled={state.busy === 'revision'}>{state.busy === 'revision' ? 'Đang gửi...' : 'Gửi yêu cầu'}</button></form>
            {order.revisions.map((item) => <blockquote key={item.id}><p>{item.message}</p><footer>{new Date(item.created_at).toLocaleString('vi-VN')} · {item.status}</footer></blockquote>)}
          </section>
        </div>
        {state.error && <p className="commerceError" role="alert">{state.error}</p>}
        {state.success && <p className="commerceSuccessMessage" role="status">{state.success}</p>}
        <button className="commerceRefresh" type="button" onClick={load}><RefreshCw /> Làm mới trạng thái</button>
        <p className="commerceSecurityNote"><CheckCircle2 /> Link này là khóa truy cập đơn hàng. Không đăng công khai.</p>
      </main>
      <StudioFooter />
    </div>
  );
}
