import React, { lazy, Suspense, useEffect } from 'react';
import NewTemplateRouter, { getNewTemplateSlug } from './templates/new/NewTemplateRouter.jsx';
import { archivedInvitationSlugs, getInvitationDisplayTitle } from './data/invitationCatalog.js';
import TemplateCommerceBar from './commerce/TemplateCommerceBar.jsx';

const StudioHome = lazy(() => import('./studio/StudioHome.jsx'));
const TemplatesDashboard = lazy(() => import('./studio/TemplatesDashboard.jsx'));
const StudioServicePages = lazy(() => import('./studio/StudioServicePages.jsx'));
const ConsultationPage = lazy(() => import('./studio/StudioServicePages.jsx').then((module) => ({ default: module.ConsultationPage })));
const PrivacyPage = lazy(() => import('./studio/LegalPages.jsx').then((module) => ({ default: module.PrivacyPage })));
const TermsPage = lazy(() => import('./studio/LegalPages.jsx').then((module) => ({ default: module.TermsPage })));
const NotFoundPage = lazy(() => import('./studio/LegalPages.jsx').then((module) => ({ default: module.NotFoundPage })));
const OrderPage = lazy(() => import('./commerce/OrderPage.jsx'));
const CustomerPortal = lazy(() => import('./commerce/CustomerPortal.jsx'));
const InvitationEditor = lazy(() => import('./commerce/InvitationEditor.jsx'));
const AccountPage = lazy(() => import('./commerce/AccountPage.jsx'));
const CommercialInvitationPage = lazy(() => import('./commerce/CommercialInvitationPage.jsx'));
const AdminDashboard = lazy(() => import('./commerce/AdminPages.jsx').then((module) => ({ default: module.AdminDashboard })));
const AdminOrderDetail = lazy(() => import('./commerce/AdminPages.jsx').then((module) => ({ default: module.AdminOrderDetail })));

const legacyTemplates = {
  'thiep-cuoi-2': lazy(() => import('./templates/Template2.jsx')),
  'thiep-cuoi-16': lazy(() => import('./templates/Template16.jsx')),
  'thiep-cuoi-19': lazy(() => import('./templates/Template19.jsx')),
  'thiep-cuoi-36': lazy(() => import('./templates/Template36.jsx')),
  'thiep-cuoi-38': lazy(() => import('./templates/Template38.jsx')),
  'thiep-cuoi-39': lazy(() => import('./templates/Template39.jsx')),
  'thiep-cuoi-40': lazy(() => import('./templates/Template40.jsx')),
  'thiep-cuoi-42': lazy(() => import('./templates/Template42.jsx')),
  'thiep-cuoi-44': lazy(() => import('./templates/Template44.jsx')),
  'thiep-cuoi-46': lazy(() => import('./templates/Template46.jsx')),
  'thiep-cuoi-47': lazy(() => import('./templates/Template47.jsx')),
  'thiep-cuoi-48': lazy(() => import('./templates/Template48.jsx')),
  'thiep-cuoi-61': lazy(() => import('./templates/Template61.jsx')),
};

const projectionRoutes = {
  '/trinh-chieu/opening-frame': lazy(() => import('./projections/OpeningFrame.jsx')),
  '/trinh-chieu/white-palace': lazy(() => import('./projections/WhitePalace.jsx')),
  '/trinh-chieu/sea-of-us': lazy(() => import('./projections/SeaOfUs.jsx')),
  '/trinh-chieu/love-countdown': lazy(() => import('./projections/LoveCountdown.jsx')),
  '/trinh-chieu/polaroid-memories': lazy(() => import('./projections/PolaroidMemories.jsx')),
  '/trinh-chieu/film-strip': lazy(() => import('./projections/FilmStrip.jsx')),
  '/trinh-chieu/cinematic-crossfade': lazy(() => import('./projections/CinematicCrossfade.jsx')),
  '/trinh-chieu/coverflow-gallery': lazy(() => import('./projections/CoverflowGallery.jsx')),
  '/trinh-chieu/love-cinema': lazy(() => import('./projections/LoveCinema.jsx')),
  '/trinh-chieu/background-dam-ngo': lazy(() => import('./projections/DamNgoBackground.jsx')),
  '/trinh-chieu/background-an-hoi': lazy(() => import('./projections/AnHoiLotusBackground.jsx')),
  '/trinh-chieu/background-dinh-hon': lazy(() => import('./projections/BotanicalEngagementBackground.jsx')),
};

const pageTitles = {
  '/': 'Lời Hẹn Wedding Studio',
  '/dich-vu/thiep-cuoi-online': 'Thiệp cưới Online | Lời Hẹn Studio',
  '/mau-thiep': '108 mẫu thiệp cưới Online | Lời Hẹn Studio',
  '/dich-vu/trap-cuoi': 'Thư viện Tráp cưới | Lời Hẹn Studio',
  '/dich-vu/trinh-chieu': 'Trình chiếu cưới | Lời Hẹn Studio',
  '/trinh-chieu/opening-frame': 'Royal Symphony | Lời Hẹn Studio',
  '/trinh-chieu/white-palace': 'White Palace Elegance | Lời Hẹn Studio',
  '/trinh-chieu/love-countdown': 'Velvet Rose | Lời Hẹn Studio',
  '/trinh-chieu/sea-of-us': 'Editorial Minimalist | Lời Hẹn Studio',
  '/trinh-chieu/polaroid-memories': 'Polaroid Memories | Lời Hẹn Studio',
  '/trinh-chieu/film-strip': 'Vintage Cinema VHS | Lời Hẹn Studio',
  '/trinh-chieu/cinematic-crossfade': 'Cinematic Crossfade | Lời Hẹn Studio',
  '/trinh-chieu/coverflow-gallery': 'Album of Love 3D | Lời Hẹn Studio',
  '/trinh-chieu/love-cinema': 'Love Cinema · Khung Vòm Điện Ảnh | Lời Hẹn Studio',
  '/trinh-chieu/background-dam-ngo': 'Background TV lễ dạm ngõ | Lời Hẹn Studio',
  '/trinh-chieu/background-an-hoi': 'Background TV lễ ăn hỏi | Lời Hẹn Studio',
  '/trinh-chieu/background-dinh-hon': 'Background TV lễ đính hôn | Lời Hẹn Studio',
  '/tu-van': 'Đặt lịch tư vấn | Lời Hẹn Studio',
  '/chinh-sach-bao-mat': 'Chính sách bảo mật | Lời Hẹn Studio',
  '/dieu-khoan-dich-vu': 'Điều khoản dịch vụ | Lời Hẹn Studio',
  '/dat-thiep': 'Đặt thiệp cưới Online | Lời Hẹn Studio',
  '/tai-khoan': 'Tài khoản khách hàng | Lời Hẹn Studio',
  '/admin': 'Quản trị đơn hàng | Lời Hẹn Studio',
};

function PageFallback({ invitation = false }) {
  return (
    <div style={{ width: '100%', minHeight: '100dvh', display: 'grid', placeItems: 'center', color: invitation ? '#2d2926' : '#fff8ed', background: invitation ? '#f7f7f4' : '#101010', fontFamily: 'Georgia, serif' }}>
      {invitation ? 'Đang mở thiệp...' : 'Đang chuẩn bị trang...'}
    </div>
  );
}

function RoutedPage({ children, invitation = false }) {
  return <Suspense fallback={<PageFallback invitation={invitation} />}>{children}</Suspense>;
}

function TemplatePreview({ slug, children }) {
  return <><RoutedPage invitation>{children}</RoutedPage><div className="templateCommerceSpacer" aria-hidden="true" /><TemplateCommerceBar slug={slug} /></>;
}

function upsertMeta(selector, attributes) {
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement(attributes.tag || 'meta');
    document.head.appendChild(node);
  }
  Object.entries(attributes).forEach(([key, value]) => {
    if (key !== 'tag') node.setAttribute(key, value);
  });
}

function App() {
  const pathname = window.location.pathname.replace(/\/$/, '') || '/';
  const routeSlug = pathname.match(/^\/template\/([^/]+)$/)?.[1] || null;
  const newTemplateSlug = getNewTemplateSlug(pathname);
  const LegacyTemplate = routeSlug ? legacyTemplates[routeSlug] : null;
  const Projection = projectionRoutes[pathname];
  const commercialSlug = pathname.match(/^\/w\/([^/]+)$/)?.[1] || null;
  const editorOrderId = pathname.match(/^\/chinh-sua-thiep\/([^/]+)$/)?.[1] || null;
  const customerOrderId = pathname.match(/^\/don-hang\/([^/]+)$/)?.[1] || null;
  const adminOrderId = pathname.match(/^\/admin\/orders\/([^/]+)$/)?.[1] || null;

  useEffect(() => {
    const invitationTitle = routeSlug ? `${getInvitationDisplayTitle(routeSlug)} | Lời Hẹn Studio` : null;
    const title = editorOrderId
      ? 'Chỉnh sửa thiệp | Lời Hẹn Studio'
      : invitationTitle || pageTitles[pathname] || 'Không tìm thấy trang | Lời Hẹn Studio';
    const description = routeSlug
      ? `${getInvitationDisplayTitle(routeSlug)} - mẫu thiệp cưới online có animation, album ảnh, lịch, bản đồ và RSVP.`
      : 'Lời Hẹn Wedding Studio - thiệp cưới online, tráp cưới và trình chiếu ngày cưới.';
    const canonical = `${window.location.origin}${pathname}`;
    document.title = title;
    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
    upsertMeta('link[rel="canonical"]', { tag: 'link', rel: 'canonical', href: canonical });
    const isPrivate = Boolean(editorOrderId || customerOrderId || adminOrderId || pathname === '/admin' || pathname === '/tai-khoan' || (routeSlug && archivedInvitationSlugs.includes(routeSlug)));
    upsertMeta('meta[name="robots"]', { name: 'robots', content: isPrivate ? 'noindex,nofollow,noarchive' : 'index,follow' });
  }, [adminOrderId, customerOrderId, editorOrderId, pathname, routeSlug]);

  if (newTemplateSlug) return <TemplatePreview slug={newTemplateSlug}><NewTemplateRouter slug={newTemplateSlug} /></TemplatePreview>;
  if (LegacyTemplate) return <TemplatePreview slug={routeSlug}><LegacyTemplate /></TemplatePreview>;
  if (commercialSlug) return <RoutedPage invitation><CommercialInvitationPage slug={commercialSlug} /></RoutedPage>;
  if (editorOrderId) return <RoutedPage><InvitationEditor orderId={editorOrderId} /></RoutedPage>;
  if (customerOrderId) return <RoutedPage><CustomerPortal orderId={customerOrderId} /></RoutedPage>;
  if (adminOrderId) return <RoutedPage><AdminOrderDetail orderId={adminOrderId} /></RoutedPage>;
  if (Projection) return <RoutedPage><Projection /></RoutedPage>;
  if (pathname === '/') return <RoutedPage><StudioHome /></RoutedPage>;
  if (pathname === '/mau-thiep') return <RoutedPage><TemplatesDashboard /></RoutedPage>;
  if (pathname === '/dich-vu/thiep-cuoi-online') return <RoutedPage><StudioServicePages type="invitations" /></RoutedPage>;
  if (pathname === '/dich-vu/trap-cuoi') return <RoutedPage><StudioServicePages type="trays" /></RoutedPage>;
  if (pathname === '/dich-vu/trinh-chieu') return <RoutedPage><StudioServicePages type="projection" /></RoutedPage>;
  if (pathname === '/tu-van') return <RoutedPage><ConsultationPage /></RoutedPage>;
  if (pathname === '/dat-thiep') return <RoutedPage><OrderPage /></RoutedPage>;
  if (pathname === '/tai-khoan') return <RoutedPage><AccountPage /></RoutedPage>;
  if (pathname === '/admin') return <RoutedPage><AdminDashboard /></RoutedPage>;
  if (pathname === '/chinh-sach-bao-mat') return <RoutedPage><PrivacyPage /></RoutedPage>;
  if (pathname === '/dieu-khoan-dich-vu') return <RoutedPage><TermsPage /></RoutedPage>;
  return <RoutedPage><NotFoundPage /></RoutedPage>;
}

export default App;
