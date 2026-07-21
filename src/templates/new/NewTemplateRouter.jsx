import React, { createElement, lazy, Suspense } from 'react';

const templateModules = import.meta.glob('./Template*.jsx');
const templateLoaders = {};

Object.entries(templateModules).forEach(([path, loader]) => {
  const numericId = path.match(/Template(\d+)New\.jsx$/)?.[1];
  if (numericId) templateLoaders[`thiep-cuoi-${numericId}`] = loader;
});

templateLoaders['thiep-cuoi-tone-xanh'] = templateModules['./TemplateToneXanh.jsx'];
templateLoaders['thiep-bw-1'] = templateModules['./TemplateBW1.jsx'];

const templateComponents = Object.fromEntries(
  Object.entries(templateLoaders).map(([slug, loader]) => [slug, lazy(loader)]),
);

export const newTemplateSlugs = Object.freeze(Object.keys(templateComponents));

export function getNewTemplateComponent(slug) {
  return templateComponents[slug] || null;
}

export function createNewTemplateElement(slug, props = {}) {
  const component = templateComponents[slug];
  return component ? createElement(component, props) : null;
}

const templateTitles = {
  'thiep-cuoi-tone-xanh': 'Thiệp cưới Tone Xanh',
  'thiep-bw-1': 'Thiệp cưới Black & White',
};

export function getNewTemplateSlug(pathname) {
  const match = pathname.match(/^\/template\/([^/]+)\/?$/);
  return match && templateComponents[match[1]] ? match[1] : null;
}

export function getNewTemplateTitle(slug) {
  if (!slug) return null;
  return templateTitles[slug] || `Thiệp cưới ${slug.replace('thiep-cuoi-', '')}`;
}

export default function NewTemplateRouter({ slug }) {
  const template = createNewTemplateElement(slug);
  if (!template) return null;
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#f7f7f4', fontFamily: 'Georgia, serif' }}>Đang mở thiệp...</div>}>
      {template}
    </Suspense>
  );
}
