import React, { lazy, Suspense, useEffect } from 'react';
import NewTemplateRouter, { getNewTemplateSlug } from './templates/new/NewTemplateRouter.jsx';
import { archivedInvitationSlugs, getInvitationDisplayTitle } from './data/invitationCatalog.js';
import ZenLoveScenePreview from './templates/ZenLoveScenePreview.jsx';
import legacyTemplates from './templates/legacyTemplateRegistry.js';
import { getZenLovePreviewItem } from './commerce/zenloveManifest.js';

const TemplatesDashboard = lazy(() => import('./studio/TemplatesDashboard.jsx'));
const CommercialInvitationPage = lazy(() => import('./commerce/CommercialInvitationPage.jsx'));

const pageTitles = {
  '/': 'Mẫu thiệp cưới Online | Lời Hẹn Wedding Studio',
  '/mau-thiep': '108 Mẫu Thiệp Cưới Online | Lời Hẹn Wedding Studio',
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
  return <Suspense fallback={<main className={invitation ? 'invitationLoading' : 'pageLoading'} style={invitation ? { color: '#fff', background: '#15100e' } : undefined}>Đang tải…</main>}>{children}</Suspense>;
}

function TemplatePreview({ children }) {
  return <RoutedPage invitation>{children}</RoutedPage>;
}

export default function App() {
  const pathname = window.location.pathname.replace(/\/$/, '') || '/';
  const newTemplateSlug = getNewTemplateSlug(pathname);
  const routeSlug = pathname.match(/^\/template\/([^/]+)$/)?.[1] || null;
  const commercialSlug = pathname.match(/^\/w\/([^/]+)$/)?.[1] || null;
  const LegacyTemplate = routeSlug ? legacyTemplates[routeSlug] : null;
  const zenLovePreviewItem = routeSlug ? getZenLovePreviewItem(routeSlug) : null;

  useEffect(() => {
    const invitationTitle = routeSlug && (newTemplateSlug || LegacyTemplate || zenLovePreviewItem)
      ? `${zenLovePreviewItem?.name || getInvitationDisplayTitle(routeSlug)} | Lời Hẹn Wedding Studio`
      : null;
    const title = invitationTitle || pageTitles[pathname] || (commercialSlug ? 'Thiệp cưới | Lời Hẹn Wedding Studio' : pageTitles['/mau-thiep']);
    const description = invitationTitle
      ? `${zenLovePreviewItem?.name || getInvitationDisplayTitle(routeSlug)} - preview local catalog của Lời Hẹn Wedding Studio.`
      : commercialSlug
        ? 'Thiệp cưới online cá nhân hóa của Lời Hẹn Wedding Studio.'
      : 'Khám phá bộ sưu tập mẫu thiệp cưới online của Lời Hẹn Wedding Studio.';
    const canonical = `${window.location.origin}${pathname}`;
    document.title = title;
    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
    upsertMeta('link[rel="canonical"]', { tag: 'link', rel: 'canonical', href: canonical });
    const noIndexRoute = zenLovePreviewItem || archivedInvitationSlugs.includes(routeSlug);
    upsertMeta('meta[name="robots"]', { name: 'robots', content: noIndexRoute ? 'noindex,nofollow,noarchive' : 'index,follow' });
    }, [commercialSlug, LegacyTemplate, newTemplateSlug, pathname, routeSlug, zenLovePreviewItem]);

  if (commercialSlug) return <RoutedPage><CommercialInvitationPage slug={commercialSlug} /></RoutedPage>;
  if (newTemplateSlug) return <TemplatePreview slug={newTemplateSlug}><NewTemplateRouter slug={newTemplateSlug} /></TemplatePreview>;
  if (LegacyTemplate) return <TemplatePreview slug={routeSlug}><LegacyTemplate /></TemplatePreview>;
  if (zenLovePreviewItem) return <ZenLoveScenePreview item={zenLovePreviewItem} />;
  return <RoutedPage><TemplatesDashboard /></RoutedPage>;
}