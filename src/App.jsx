import React, { lazy, Suspense, useEffect } from 'react';
import { getInvitationDisplayTitle } from './data/invitationCatalog.js';

const TemplatesDashboard = lazy(() => import('./studio/TemplatesDashboard.jsx'));

const templateRegistry = {
  'thiep-cuoi-3': lazy(() => import('./templates/new/Template3New.jsx')),
  'thiep-cuoi-4': lazy(() => import('./templates/new/Template4New.jsx')),
  'thiep-cuoi-7': lazy(() => import('./templates/new/Template7New.jsx')),
  'thiep-cuoi-10': lazy(() => import('./templates/new/Template10New.jsx')),
  'thiep-cuoi-14': lazy(() => import('./templates/new/Template14New.jsx')),
  'thiep-cuoi-16': lazy(() => import('./templates/new/Template16New.jsx')),
  'thiep-cuoi-27': lazy(() => import('./templates/new/Template27New.jsx')),
  'thiep-cuoi-47': lazy(() => import('./templates/Template47.jsx')),
  'thiep-cuoi-48': lazy(() => import('./templates/Template48.jsx')),
  'thiep-cuoi-55': lazy(() => import('./templates/new/Template55New.jsx')),
  'thiep-cuoi-56': lazy(() => import('./templates/new/Template56New.jsx')),
};

const pageTitles = {
  '/': 'Mẫu thiệp cưới Online | Lời Hẹn Wedding Studio',
  '/mau-thiep': '11 Mẫu Thiệp Cưới Online Tuyển Chọn | Lời Hẹn Wedding Studio',
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
  return (
    <Suspense
      fallback={
        <main
          className={invitation ? 'invitationLoading' : 'pageLoading'}
          style={invitation ? { color: '#fff', background: '#15100e' } : undefined}
        >
          Đang tải…
        </main>
      }
    >
      {children}
    </Suspense>
  );
}

export default function App() {
  const pathname = window.location.pathname.replace(/\/$/, '') || '/';
  const routeSlug = pathname.match(/^\/template\/([^/]+)$/)?.[1] || null;
  const TemplateComponent = routeSlug ? templateRegistry[routeSlug] : null;

  useEffect(() => {
    const invitationTitle = TemplateComponent
      ? `${getInvitationDisplayTitle(routeSlug)} | Lời Hẹn Wedding Studio`
      : null;
    const title = invitationTitle || pageTitles[pathname] || pageTitles['/mau-thiep'];
    const description = invitationTitle
      ? `${getInvitationDisplayTitle(routeSlug)} - Mẫu thiệp cưới online tuyển chọn của Lời Hẹn Wedding Studio.`
      : 'Khám phá bộ sưu tập 11 mẫu thiệp cưới online tuyển chọn của Lời Hẹn Wedding Studio.';
    const canonical = `${window.location.origin}${pathname}`;
    document.title = title;
    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
    upsertMeta('link[rel="canonical"]', { tag: 'link', rel: 'canonical', href: canonical });
    upsertMeta('meta[name="robots"]', { name: 'robots', content: 'index,follow' });
  }, [TemplateComponent, pathname, routeSlug]);

  if (TemplateComponent) {
    return (
      <RoutedPage invitation>
        <TemplateComponent />
      </RoutedPage>
    );
  }

  return (
    <RoutedPage>
      <TemplatesDashboard />
    </RoutedPage>
  );
}