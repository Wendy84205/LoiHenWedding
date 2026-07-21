import React, { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { getInvitation } from './commerceApi.js';
import InvitationRenderer from './InvitationRenderer.jsx';
import './commerce.css';

function setMeta(selector, attributes) {
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement(attributes.tag || 'meta');
    document.head.appendChild(node);
  }
  Object.entries(attributes).forEach(([key, value]) => {
    if (key !== 'tag') node.setAttribute(key, value);
  });
}

export default function CommercialInvitationPage({ slug }) {
  const [state, setState] = useState({ loading: true, invitation: null, error: '' });
  const preview = new URLSearchParams(window.location.search).get('preview') || '';
  const guest = new URLSearchParams(window.location.search).get('guest') || '';
  const embeddedEditor = new URLSearchParams(window.location.search).has('editorVersion');

  useEffect(() => {
    let active = true;
    getInvitation(slug, preview, guest)
      .then((invitation) => {
        if (!active) return;
        setState({ loading: false, invitation: { ...invitation, guestToken: guest, embeddedEditor }, error: '' });
        const title = invitation.seo?.title || `${invitation.content.couple.groomName} & ${invitation.content.couple.brideName} | Thiệp cưới`;
        const description = invitation.seo?.description || invitation.content.copy.intro;
        const canonical = `${window.location.origin}/w/${invitation.slug}`;
        const rawImage = invitation.content.media.social || invitation.content.media.hero || `/social/${invitation.templateSlug}.jpg`;
        const image = new URL(rawImage, window.location.origin).href;
        document.title = title;
        setMeta('meta[name="description"]', { name: 'description', content: description });
        setMeta('meta[property="og:title"]', { property: 'og:title', content: title });
        setMeta('meta[property="og:description"]', { property: 'og:description', content: description });
        setMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
        setMeta('meta[property="og:image"]', { property: 'og:image', content: image });
        setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
        setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image });
        setMeta('link[rel="canonical"]', { tag: 'link', rel: 'canonical', href: canonical });
        setMeta('meta[name="robots"]', { name: 'robots', content: invitation.preview || guest ? 'noindex,nofollow,noarchive' : 'index,follow' });
      })
      .catch((error) => active && setState({ loading: false, invitation: null, error: error.message }));
    return () => { active = false; };
  }, [embeddedEditor, guest, preview, slug]);

  if (state.loading) return <main className="commerceState"><p>Đang mở thiệp...</p></main>;
  if (state.error) return <main className="commerceState"><AlertCircle /><h1>Không thể mở thiệp</h1><p>{state.error}</p><a href="/mau-thiep">Xem thư viện mẫu</a></main>;
  return <InvitationRenderer invitation={state.invitation} />;
}
