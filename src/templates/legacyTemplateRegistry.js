import { lazy } from 'react';

const legacyTemplates = Object.freeze({
  'thiep-cuoi-2': lazy(() => import('./Template2.jsx')),
  'thiep-cuoi-16': lazy(() => import('./Template16.jsx')),
  'thiep-cuoi-19': lazy(() => import('./Template19.jsx')),
  'thiep-cuoi-36': lazy(() => import('./Template36.jsx')),
  'thiep-cuoi-38': lazy(() => import('./Template38.jsx')),
  'thiep-cuoi-39': lazy(() => import('./Template39.jsx')),
  'thiep-cuoi-40': lazy(() => import('./Template40.jsx')),
  'thiep-cuoi-42': lazy(() => import('./Template42.jsx')),
  'thiep-cuoi-44': lazy(() => import('./Template44.jsx')),
  'thiep-cuoi-46': lazy(() => import('./Template46.jsx')),
  'thiep-cuoi-47': lazy(() => import('./Template47.jsx')),
  'thiep-cuoi-48': lazy(() => import('./Template48.jsx')),
  'thiep-cuoi-61': lazy(() => import('./Template61.jsx')),
});

export const legacyTemplateSlugs = Object.freeze(Object.keys(legacyTemplates));
export default legacyTemplates;
