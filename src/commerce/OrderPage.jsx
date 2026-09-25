import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Check, LockKeyhole, Sparkles } from 'lucide-react';
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

function makeDraftInput(templateSlug, session) {
  const email = session?.user?.email || '';
  return {
    fullName: email.split('@')[0] || 'Khách hàng',
    email,
    phone: '00000000',
    zalo: '',
    packageCode: 'basic',
    templateSlug,
    groomName: 'Tên chú rể',
    brideName: 'Tên cô dâu',
    eventDate: defaultEventDate(),
    eventTime: '11:00',
    venueName: 'Địa điểm tiệc cưới',
    address: 'Bạn có thể cập nhật trong trình chỉnh sửa',
    mapUrl: '',
    invitationMessage: '',
    customerNote: '',
    consent: true,
    website: '',
  };
}

export default function OrderPage() {
  const query = useMemo(() => new URLSearchParams(window.location.search), []);
  const requestedTemplate = query.get('template') || '';
  const templateSlug = commercialTemplateSlugs.includes(requestedTemplate) ? requestedTemplate : 'thiep-cuoi-44';
  const [session, setSession] = useState(undefined);
  const [state, setState] = useState({ loading: false, error: '' });
  const price = commercePackages.basic?.amount || 50000;
  const loginUrl = useMemo(() => `/tai-khoan?next=${encodeURIComponent(`${window.location.pathname}${window.location.search}`)}`, []);

  useEffect(() => {
    getCustomerSession().then(setSession).catch(() => setSession(null));
  }, []);

  const createDraftOrder = async () => {
    setState({ loading: true, error: '' });
    try {
      const result = await createOrder(makeDraftInput(templateSlug, session));
      localStorage.setItem(`loi-hen-order-${result.orderId}`, JSON.stringify({ accessToken: result.accessToken, previewToken: result.previewToken }));
      window.location.assign(`/don-hang/${result.orderId}`);
    } catch (error) {
      setState({ loading: false, error: error.message });
    }
  };

  if (!commerceAvailable) return (
    <div className="commercePage"><StudioHeader /><main className="commerceState commerceUnavailable"><LockKeyhole /><p className="commerceEyebrow">HỆ THỐNG TẠO THIỆP</p><h1>Đang hoàn tất cấu hình</h1><p>Vui lòng quay lại sau hoặc liên hệ studio để được hỗ trợ.</p></main><StudioFooter /></div>
  );

  if (session === undefined) return <div className="commercePage"><StudioHeader /><main className="commerceState"><LockKeyhole /><p>Đang kiểm tra tài khoản…</p></main><StudioFooter /></div>;

  if (!session) return (
    <div className="commercePage"><StudioHeader /><main className="commerceState commerceAuthGate"><LockKeyhole /><p className="commerceEyebrow">BƯỚC 1 / 3</p><h1>Đăng nhập để đặt thiệp theo mẫu</h1><p>Mỗi đơn được gắn với tài khoản để bạn có thể gửi tư liệu, theo dõi tiến độ và phát hành vào thời điểm phù hợp.</p><a className="commercePrimaryAction" href={loginUrl}>Đăng nhập hoặc tạo tài khoản <ArrowRight /></a></main><StudioFooter /></div>
  );

  return (
    <div className="commercePage">
      <StudioHeader />
      <main className="commerceDraftStarter">
        <section className="commerceDraftCopy">
          <p className="commerceEyebrow">THIỆP NHÁP · {getInvitationDisplayTitle(templateSlug)}</p>
          <h1>Bắt đầu với mẫu này, <em>studio sẽ hoàn thiện cùng bạn.</em></h1>
          <p>Tạo đơn để gửi ảnh, thông tin ngày cưới và yêu cầu cá nhân hóa. Studio sẽ dựa trên mẫu bạn chọn để hoàn thiện thiệp, sau đó bạn có thể xem trước trước khi phát hành.</p>
          <div className="commerceDraftSteps"><span><b>01</b> Tạo đơn</span><span><b>02</b> Gửi tư liệu</span><span><b>03</b> Quét QR để phát hành</span></div>
          {state.error && <p className="commerceError" role="alert">{state.error}</p>}
          <button type="button" className="commercePrimaryAction commerceDraftStart" onClick={createDraftOrder} disabled={state.loading}>{state.loading ? 'Đang tạo đơn...' : <>Đặt thiệp với mẫu này <ArrowRight /></>}</button>
          <small><Sparkles size={15} /> Chỉ thanh toán {formatCurrency(price)} khi thiệp đã sẵn sàng phát hành link.</small>
        </section>
        <section className="commerceDraftPreview">
          <img src={`/social/${templateSlug}.jpg`} alt={`Xem trước ${getInvitationDisplayTitle(templateSlug)}`} />
          <div><strong>Studio hỗ trợ cá nhân hóa theo thông tin của bạn</strong><p><Check size={16} /> Xem trước trên điện thoại bất cứ lúc nào</p></div>
        </section>
      </main>
      <StudioFooter />
    </div>
  );
}
