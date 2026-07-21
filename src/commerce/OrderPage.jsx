import React, { useMemo, useState } from 'react';
import { ArrowRight, Check, Copy, ExternalLink, LockKeyhole } from 'lucide-react';
import { StudioFooter, StudioHeader } from '../studio/StudioChrome.jsx';
import { getInvitationDisplayTitle } from '../data/invitationCatalog.js';
import { commerceAvailable, createOrder } from './commerceApi.js';
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
  const requestedPackage = query.get('package') || '';
  return {
    fullName: '', email: '', phone: '', zalo: '',
    packageCode: commercePackages[requestedPackage] ? requestedPackage : 'premium',
    templateSlug: commercialTemplateSlugs.includes(requestedTemplate) ? requestedTemplate : 'thiep-cuoi-44',
    groomName: '', brideName: '', eventDate: defaultEventDate(), eventTime: '11:00', venueName: '', address: '',
    mapUrl: '', invitationMessage: '', customerNote: '', consent: false, website: '',
  };
}

export default function OrderPage() {
  const [form, setForm] = useState(createInitialForm);
  const [state, setState] = useState({ loading: false, error: '', result: null, copied: false });
  const selectedPackage = commercePackages[form.packageCode];
  const portalUrl = useMemo(() => state.result
    ? `${window.location.origin}/don-hang/${state.result.orderId}?token=${encodeURIComponent(state.result.accessToken)}`
    : '', [state.result]);

  const update = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setState({ loading: true, error: '', result: null, copied: false });
    try {
      const result = await createOrder(form);
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

  if (state.result) {
    return (
      <div className="commercePage">
        <StudioHeader />
        <main className="commerceSuccess">
          <span className="commerceSuccessIcon"><Check /></span>
          <p className="commerceEyebrow">ĐÃ TIẾP NHẬN YÊU CẦU</p>
          <h1>Mã đơn {state.result.publicId}</h1>
          <p>Link quản lý bên dưới chứa khóa riêng của đơn hàng. Chỉ gửi cho người cùng chuẩn bị thiệp.</p>
          <div className="commerceLinkBox"><code>{portalUrl}</code><button type="button" onClick={copyPortal} aria-label="Sao chép link"><Copy /></button></div>
          {state.copied && <span className="commerceInlineStatus">Đã sao chép link.</span>}
          <dl className="commerceReceipt">
            <div><dt>Tổng gói</dt><dd>{formatCurrency(state.result.amountTotal)}</dd></div>
            <div><dt>Tiền cọc</dt><dd>{formatCurrency(state.result.depositAmount)}</dd></div>
            <div><dt>Trạng thái</dt><dd>Chờ xác nhận cọc</dd></div>
          </dl>
          <a className="commercePrimaryAction" href={portalUrl}>Mở cổng khách hàng <ExternalLink /></a>
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
          <p>Bạn nhận link xem trước riêng tư trước khi thiệp được phát hành chính thức.</p>
        </header>

        <form className="commerceOrderForm" onSubmit={submit}>
          <section>
            <div className="commerceSectionTitle"><span>01</span><div><h2>Chọn gói dịch vụ</h2><p>Giá thử nghiệm đã gồm link, QR và ảnh chia sẻ.</p></div></div>
            <div className="commercePackageGrid">
              {Object.values(commercePackages).map((item) => (
                <label className={form.packageCode === item.code ? 'is-selected' : ''} key={item.code}>
                  <input type="radio" name="packageCode" value={item.code} checked={form.packageCode === item.code} onChange={update} />
                  <strong>{item.name}</strong><b>{formatCurrency(item.amount)}</b><span>{item.description}</span>
                </label>
              ))}
            </div>
          </section>

          <section>
            <div className="commerceSectionTitle"><span>02</span><div><h2>Chọn mẫu bán trực tiếp</h2><p>Đang chọn: {getInvitationDisplayTitle(form.templateSlug)}. Các mẫu còn lại được studio cá nhân hóa theo yêu cầu.</p></div></div>
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
            <div><small>Gói {selectedPackage.name}</small><strong>{formatCurrency(selectedPackage.amount)}</strong><span>Cọc {formatCurrency(selectedPackage.depositAmount)}</span></div>
            <label className="commerceConsent"><input type="checkbox" name="consent" checked={form.consent} onChange={update} required /><span>Tôi đồng ý với <a href="/dieu-khoan-dich-vu">điều khoản dịch vụ</a> và việc xử lý dữ liệu theo <a href="/chinh-sach-bao-mat">chính sách bảo mật</a>.</span></label>
            {state.error && <p className="commerceError" role="alert">{state.error}</p>}
            <button className="commercePrimaryAction" type="submit" disabled={state.loading}>{state.loading ? 'Đang tạo đơn...' : <>Tạo đơn và nhận link riêng <ArrowRight /></>}</button>
            <p><LockKeyhole /> Không tải ảnh cưới lên source code hoặc thư viện công khai.</p>
          </section>
        </form>
      </main>
      <StudioFooter />
    </div>
  );
}
