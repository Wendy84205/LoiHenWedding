import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Check, Copy, ExternalLink, LockKeyhole } from 'lucide-react';
import { StudioFooter, StudioHeader } from '../studio/StudioChrome.jsx';
import { getInvitationDisplayTitle } from '../data/invitationCatalog.js';
import { commerceAvailable, createOrder, getCustomerSession } from './commerceApi.js';
import { commercePackages, commercialTemplateSlugs, formatCurrency } from './invitationContent.js';
import './commerce.css';

function defaultEventDate() {
  const date = new Date();
  date.setMonth(date.getMonth() + 6);
  return date.toISOString().slice(0, 10);
}

function createInitialForm() {
  const query = new URLSearchParams(window.location.search);
  const requestedTemplate = query.get('template') || '';
  return {
    fullName: '', email: '', phone: '', zalo: '',
    packageCode: 'basic',
    templateSlug: commercialTemplateSlugs.includes(requestedTemplate) ? requestedTemplate : 'thiep-cuoi-44',
    groomName: '', brideName: '', eventDate: defaultEventDate(), eventTime: '11:00', venueName: '', address: '',
    mapUrl: '', invitationMessage: '', customerNote: '', consent: false, website: '',
  };
}

export default function OrderPage() {
  const [form, setForm] = useState(createInitialForm);
  const [state, setState] = useState({ loading: false, error: '', result: null, copied: false });
  const [session, setSession] = useState(undefined);
  const selectedPackage = commercePackages[form.packageCode];
  const loginUrl = useMemo(() => `/tai-khoan?next=${encodeURIComponent(`${window.location.pathname}${window.location.search}`)}`, []);

  useEffect(() => {
    getCustomerSession().then(setSession).catch(() => setSession(null));
  }, []);
  const portalUrl = useMemo(() => state.result
    ? `${window.location.origin}/don-hang/${state.result.orderId}?token=${encodeURIComponent(state.result.accessToken)}`
    : '', [state.result]);

  const update = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!session) {
      window.location.assign(loginUrl);
      return;
    }
    setState({ loading: true, error: '', result: null, copied: false });
    try {
      const result = await createOrder({ ...form, email: form.email || session.user?.email || '' });
      localStorage.setItem(`loi-hen-order-${result.orderId}`, JSON.stringify({ accessToken: result.accessToken, previewToken: result.previewToken }));
      setState({ loading: false, error: '', result, copied: false });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setState({ loading: false, error: error.message, result: null, copied: false });
    }
  };

  const copyPortal = async () => {
    await navigator.clipboard.writeText(portalUrl);
    setState((current) => ({ ...current, copied: true }));
  };

  if (!commerceAvailable) {
    return (
      <div className="commercePage">
        <StudioHeader />
        <main className="commerceState commerceUnavailable">
          <LockKeyhole />
          <p className="commerceEyebrow">HỆ THỐNG ĐẶT THIỆP</p>
          <h1>Đang hoàn tất cấu hình nhận đơn</h1>
          <p>Trong thời gian này, vui lòng gửi yêu cầu trực tiếp qua trang tư vấn. Thư viện mẫu vẫn hoạt động bình thường.</p>
          <a className="commercePrimaryAction" href="/tu-van">Đặt lịch tư vấn <ArrowRight /></a>
        </main>
        <StudioFooter />
      </div>
    );
  }

  if (session === undefined) {
    return <div className="commercePage"><StudioHeader /><main className="commerceState"><LockKeyhole /><p>Đang kiểm tra tài khoản…</p></main><StudioFooter /></div>;
  }

  if (!session) {
    return (
      <div className="commercePage">
        <StudioHeader />
        <main className="commerceState commerceAuthGate">
          <LockKeyhole />
          <p className="commerceEyebrow">BƯỚC 1 / 3</p>
          <h1>Đăng nhập để dùng mẫu thiệp</h1>
          <p>Mỗi thiệp được liên kết với tài khoản của bạn để quản lý thanh toán, lịch sử chỉnh sửa và link phát hành an toàn.</p>
          <a className="commercePrimaryAction" href={loginUrl}>Đăng nhập hoặc tạo tài khoản <ArrowRight /></a>
        </main>
        <StudioFooter />
      </div>
    );
  }

  if (state.result) {
    return (
      <div className="commercePage">
        <StudioHeader />
        <main className="commerceSuccess">
          <span className="commerceSuccessIcon"><Check /></span>
          <p className="commerceEyebrow">ĐÃ TIẾP NHẬN YÊU CẦU</p>
          <h1>Mã đơn {state.result.publicId}</h1>
          <p>Thiệp nháp đã được tạo trong tài khoản. Bắt đầu tự chỉnh sửa ngay; chỉ cần quét mã thanh toán 50.000đ ở bước cuối để phát hành link.</p>
          <div className="commerceLinkBox"><code>{portalUrl}</code><button type="button" onClick={copyPortal} aria-label="Sao chép link"><Copy /></button></div>
          {state.copied && <span className="commerceInlineStatus">Đã sao chép link.</span>}
          <dl className="commerceReceipt">
            <div><dt>Giá thiệp</dt><dd>{formatCurrency(state.result.amountTotal)}</dd></div>
            <div><dt>Thanh toán</dt><dd>{formatCurrency(state.result.depositAmount)}</dd></div>
            <div><dt>Trạng thái</dt><dd>Chờ xác nhận thanh toán</dd></div>
          </dl>
          <div className="commerceSuccessActions">
            <a className="commercePrimaryAction" href={`/chinh-sua-thiep/${state.result.orderId}`}>Bắt đầu tự chỉnh sửa <ArrowRight /></a>
            <a className="commerceSecondaryAction" href={portalUrl}>Thanh toán khi hoàn thiện <ExternalLink /></a>
          </div>
        </main>
        <StudioFooter />
      </div>
    );
  }

  return (
    <div className="commercePage">
      <StudioHeader />
      <main className="commerceOrderLayout">
        <header className="commercePageHeader">
          <p className="commerceEyebrow">ĐẶT THIỆP CƯỚI ONLINE</p>
          <h1>Gửi thông tin để bắt đầu thiết kế</h1>
          <p>Đã đăng nhập với <strong>{session.user?.email || 'tài khoản của bạn'}</strong>. Bạn có thể tự chỉnh sửa không giới hạn; thanh toán QR 50.000đ chỉ cần thực hiện khi phát hành link.</p>
        </header>

        <form className="commerceOrderForm" onSubmit={submit}>
          <section>
            <div className="commerceSectionTitle"><span>01</span><div><h2>Một mức giá, thanh toán ở bước cuối</h2><p>Bạn có thể chỉnh sửa và xem trước toàn bộ thiệp trước. Khi đã sẵn sàng phát hành, quét QR để thanh toán 50.000đ.</p></div></div>
            <div className="commerceSinglePrice">
              <div><small>THIỆP CƯỚI ONLINE</small><strong>{formatCurrency(selectedPackage.amount)}</strong><p>{selectedPackage.description}</p></div>
              <span><Check size={17} /> Áp dụng cho toàn bộ thư viện mẫu</span>
            </div>
          </section>

          <section>
            <div className="commerceSectionTitle"><span>02</span><div><h2>Chọn mẫu để bắt đầu</h2><p>Đang chọn: {getInvitationDisplayTitle(form.templateSlug)}. Sau khi tạo, hai bạn có thể tự thay ảnh, nội dung, nhạc, RSVP và QR.</p></div></div>
            <div className="commerceTemplateSelect">
              {commercialTemplateSlugs.map((slug) => (
                <label className={form.templateSlug === slug ? 'is-selected' : ''} key={slug}>
                  <input type="radio" name="templateSlug" value={slug} checked={form.templateSlug === slug} onChange={update} />
                  <img src={`/social/${slug}.jpg`} alt={`Mẫu thiệp ${slug.replace('thiep-cuoi-', '')}`} />
                  <span>Mẫu {slug.replace('thiep-cuoi-', '')}</span>
                  <a href={`/template/${slug}`} target="_blank" rel="noreferrer">Xem mẫu</a>
                </label>
              ))}
            </div>
          </section>

          <section>
            <div className="commerceSectionTitle"><span>03</span><div><h2>Thông tin liên hệ</h2><p>Thông tin này chỉ dùng để xử lý đơn hàng.</p></div></div>
            <div className="commerceFields two-columns">
              <label>Họ và tên<input name="fullName" value={form.fullName} onChange={update} required /></label>
              <label>Số điện thoại<input name="phone" value={form.phone} onChange={update} inputMode="tel" required /></label>
              <label>Email<input name="email" value={form.email} onChange={update} type="email" /></label>
              <label>Zalo<input name="zalo" value={form.zalo} onChange={update} /></label>
            </div>
          </section>

          <section>
            <div className="commerceSectionTitle"><span>04</span><div><h2>Nội dung thiệp</h2><p>Ảnh và nhạc sẽ được tải lên tại cổng khách hàng sau khi tạo đơn.</p></div></div>
            <div className="commerceFields two-columns">
              <label>Tên chú rể<input name="groomName" value={form.groomName} onChange={update} required /></label>
              <label>Tên cô dâu<input name="brideName" value={form.brideName} onChange={update} required /></label>
              <label>Ngày cưới<input name="eventDate" value={form.eventDate} onChange={update} type="date" required /></label>
              <label>Giờ bắt đầu<input name="eventTime" value={form.eventTime} onChange={update} type="time" required /></label>
              <label>Tên địa điểm<input name="venueName" value={form.venueName} onChange={update} required /></label>
              <label>Địa chỉ<input name="address" value={form.address} onChange={update} required /></label>
              <label className="full-width">Link Google Maps<input name="mapUrl" value={form.mapUrl} onChange={update} type="url" placeholder="https://maps.google.com/..." /></label>
              <label className="full-width">Lời mời<textarea name="invitationMessage" value={form.invitationMessage} onChange={update} rows="4" /></label>
              <label className="full-width">Ghi chú cho studio<textarea name="customerNote" value={form.customerNote} onChange={update} rows="3" /></label>
              <label className="commerceHoneypot" aria-hidden="true">Website<input name="website" value={form.website} onChange={update} tabIndex="-1" autoComplete="off" /></label>
            </div>
          </section>

          <section className="commerceCheckout">
            <div><small>Thanh toán một lần cho mẫu đã chọn</small><strong>{formatCurrency(selectedPackage.amount)}</strong><span>Không có gói nâng cấp hoặc phí theo mẫu</span></div>
            <label className="commerceConsent"><input type="checkbox" name="consent" checked={form.consent} onChange={update} required /><span>Tôi đồng ý với <a href="/dieu-khoan-dich-vu">điều khoản dịch vụ</a> và việc xử lý dữ liệu theo <a href="/chinh-sach-bao-mat">chính sách bảo mật</a>.</span></label>
            {state.error && <p className="commerceError" role="alert">{state.error}</p>}
            <button className="commercePrimaryAction" type="submit" disabled={state.loading}>{state.loading ? 'Đang tạo thiệp...' : <>Tạo thiệp nháp và bắt đầu chỉnh sửa <ArrowRight /></>}</button>
            <p><LockKeyhole /> Không tải ảnh cưới lên source code hoặc thư viện công khai.</p>
          </section>
        </form>
      </main>
      <StudioFooter />
    </div>
  );
}
