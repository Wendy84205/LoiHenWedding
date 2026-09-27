import React, { useMemo } from 'react';
import { CommercialInvitationProvider } from '../commerce/CommercialInvitationContext.jsx';
import { createScenePatch } from '../commerce/scene/sceneSchema.js';
import { defaultInvitationContent, defaultInvitationTheme } from '../commerce/invitationContent.js';
import { getSceneTemplate } from '../commerce/scene/sceneTemplates.js';
import SceneInvitationRenderer from '../commerce/scene/SceneRenderer.jsx';
import ZenLovePreviewPage from './ZenLovePreviewPage.jsx';

export default function ZenLoveScenePreview({ item }) {
  const template = getSceneTemplate(item.slug);
  const invitation = useMemo(() => {
    if (!template) return null;
    return {
      slug: `zenlove-rebuilt-${item.slug}`,
      templateSlug: item.slug,
      content: defaultInvitationContent,
      theme: defaultInvitationTheme,
      design: createScenePatch(template),
      preview: true,
      embeddedEditor: false,
      wishes: [],
    };
  }, [item.slug, template]);

  if (!template) return <ZenLovePreviewPage item={item} />;
  return <CommercialInvitationProvider invitation={invitation}><SceneInvitationRenderer invitation={invitation} /></CommercialInvitationProvider>;
}