import React, { createElement, lazy, Suspense } from 'react';
import { createNewTemplateElement, getNewTemplateComponent } from '../templates/new/NewTemplateRouter.jsx';
import { CommercialInvitationProvider } from './CommercialInvitationContext.jsx';
import { getEditorManifest } from './editorTemplateManifests.js';
import { buildInvitationThemeCss } from './invitationThemeRuntime.js';
import SceneInvitationRenderer from './scene/SceneRenderer.jsx';
import { getSceneTemplate } from './scene/sceneTemplates.js';

const legacyCommercialTemplates = {
  'thiep-cuoi-2': lazy(() => import('../templates/Template2.jsx')),
  'thiep-cuoi-16': lazy(() => import('../templates/Template16.jsx')),
  'thiep-cuoi-19': lazy(() => import('../templates/Template19.jsx')),
  'thiep-cuoi-36': lazy(() => import('../templates/Template36.jsx')),
  'thiep-cuoi-38': lazy(() => import('../templates/Template38.jsx')),
  'thiep-cuoi-39': lazy(() => import('../templates/Template39.jsx')),
  'thiep-cuoi-40': lazy(() => import('../templates/Template40.jsx')),
  'thiep-cuoi-42': lazy(() => import('../templates/Template42.jsx')),
  'thiep-cuoi-44': lazy(() => import('../templates/Template44.jsx')),
  'thiep-cuoi-46': lazy(() => import('../templates/Template46.jsx')),
  'thiep-cuoi-47': lazy(() => import('../templates/Template47.jsx')),
  'thiep-cuoi-48': lazy(() => import('../templates/Template48.jsx')),
  'thiep-cuoi-61': lazy(() => import('../templates/Template61.jsx')),
};

function InvitationThemeRuntime({ invitation }) {
  const manifest = getEditorManifest(invitation.templateSlug);
  if (!manifest) return null;
  const css = buildInvitationThemeCss(manifest, invitation.theme);
  return css ? <style>{css}</style> : null;
}

export default function InvitationRenderer({ invitation }) {
  const legacyTemplate = legacyCommercialTemplates[invitation.templateSlug];
  const hasNewTemplate = Boolean(getNewTemplateComponent(invitation.templateSlug));
  const hasScene = Boolean(invitation.design?.schemaVersion === 1 && getSceneTemplate(invitation.templateSlug));
  if (!hasScene && !legacyTemplate && !hasNewTemplate) {
    return (
      <main className="commerceState">
        <h1>Mẫu chưa hỗ trợ xuất bản thương mại</h1>
        <p>Mẫu này không còn nằm trong catalog đang phát hành. Vui lòng chọn một mẫu khác.</p>
      </main>
    );
  }

  return (
    <CommercialInvitationProvider invitation={invitation}>
      <InvitationThemeRuntime invitation={invitation} />
      {invitation.preview && !invitation.embeddedEditor && <div className="commercePreviewBar">Bản xem trước riêng tư · Chưa phát hành</div>}
      {invitation.guest && <div className="commerceGuestGreeting">Trân trọng kính mời <strong>{invitation.guest.full_name}</strong></div>}
      <Suspense fallback={<div className="commerceState"><p>Đang mở thiệp...</p></div>}>
        {hasScene
          ? <SceneInvitationRenderer invitation={invitation} />
          : legacyTemplate
          ? createElement(legacyTemplate, { invitation })
          : createNewTemplateElement(invitation.templateSlug, { invitation })}
      </Suspense>
    </CommercialInvitationProvider>
  );
}
