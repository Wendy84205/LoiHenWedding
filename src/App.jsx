import React, { lazy, Suspense, useEffect } from 'react';
import NewTemplateRouter, { getNewTemplateSlug } from './templates/new/NewTemplateRouter.jsx';
import { getInvitationDisplayTitle } from './data/invitationCatalog.js';
import TemplateCommerceBar from './commerce/TemplateCommerceBar.jsx';

const TemplatesDashboard = lazy(() => import('./studio/TemplatesDashboard.jsx'));

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
  '/mau-thiep': '108 Mẫu Thiệp Cưới Online | Lời Hẹn Wedding Studio',
  ...Object.fromEntries(Object.keys(projectionRoutes).map((path) => [path, 'Trình chiếu cưới | Lời Hẹn Wedding Studio'])),
};

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement(attributes.tag || 'meta');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => {
    if (key !== 'tag') element.setAttribute(key, value);
  });
}

function RoutedPage({ children, invitation = false }) {
  return <Suspense fallback={<main className={invitation ? 'invitationLoading' : 'pageLoading'}>Đang tải…</main>}>{children}</Suspense>;
}

function TemplatePreview({ slug, children }) {
  return <><RoutedPage invitation>{children}</RoutedPage><div className="templateCommerceSpacer" aria-hidden="true" /><TemplateCommerceBar slug={slug} /></>;
}

export default function App() {
  const pathname = window.location.pathname.replace(/\/$/, '') || '/';
  const newTemplateSlug = getNewTemplateSlug(pathname);
  const routeSlug = pathname.match(/^\/template\/([^/]+)$/)?.[1] || null;
  const LegacyTemplate = routeSlug ? legacyTemplates[routeSlug] : null;
  const Projection = projectionRoutes[pathname];

  useEffect(() => {
    const invitationTitle = routeSlug ? `${getInvitationDisplayTitle(routeSlug)} | Lời Hẹn Wedding Studio` : null;
    const title = invitationTitle || pageTitles[pathname] || pageTitles['/mau-thiep'];
    const description = routeSlug
      ? `${getInvitationDisplayTitle(routeSlug)} - xem live mẫu thiệp cưới online của Lời Hẹn Wedding Studio.`
      : 'Khám phá bộ sưu tập mẫu thiệp cưới online của Lời Hẹn Wedding Studio.';
    const canonical = `${window.location.origin}${pathname}`;
    document.title = title;
    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
    upsertMeta('link[rel="canonical"]', { tag: 'link', rel: 'canonical', href: canonical });
    upsertMeta('meta[name="robots"]', { name: 'robots', content: 'index,follow' });
  }, [pathname, routeSlug]);

  if (newTemplateSlug) return <TemplatePreview slug={newTemplateSlug}><NewTemplateRouter slug={newTemplateSlug} /></TemplatePreview>;
  if (LegacyTemplate) return <TemplatePreview slug={routeSlug}><LegacyTemplate /></TemplatePreview>;
  if (Projection) return <RoutedPage><Projection /></RoutedPage>;
  if (pathname === '/mau-thiep') return <RoutedPage><TemplatesDashboard /></RoutedPage>;

  window.location.replace('/mau-thiep');
  return null;
}