import { getServiceClient, hashValue, signAssetUrls, verifyAdminPreviewToken, verifyGuestToken } from './commerce.js';
import { normalizeInvitationContent } from '../src/commerce/invitationContent.js';
import { getInvitationMusicAssetId, INVITATION_MUSIC_DISABLED } from '../src/commerce/invitationMusic.js';

const publicAssetKinds = new Set(['hero', 'bride', 'groom', 'couple', 'venue', 'final', 'gallery', 'music', 'social', 'gift_qr']);

export function mergePublicInvitationAssets(contentValue, candidateAssets = []) {
  const content = normalizeInvitationContent(contentValue);
  const media = { ...content.media };
  const assignedKinds = new Set();
  const uploadedGallery = [];
  const assets = candidateAssets.filter((asset) => publicAssetKinds.has(asset.kind) && asset.signed_url);
  const selectedMusicAssetId = getInvitationMusicAssetId(media.music);

  if (selectedMusicAssetId) {
    media.music = assets.find((asset) => asset.id === selectedMusicAssetId && asset.kind === 'music')?.signed_url || '';
    assignedKinds.add('music');
  } else if (media.music === INVITATION_MUSIC_DISABLED || media.music) {
    assignedKinds.add('music');
  }

  for (const asset of assets) {
    if (asset.kind === 'gallery') uploadedGallery.push(asset.signed_url);
    else if (asset.kind === 'gift_qr' && !assignedKinds.has(asset.kind)) {
      media.giftQr = asset.signed_url;
      assignedKinds.add(asset.kind);
    }
    else if (!assignedKinds.has(asset.kind)) {
      media[asset.kind] = asset.signed_url;
      assignedKinds.add(asset.kind);
    }
  }
  if (uploadedGallery.length) media.gallery = uploadedGallery;

  return {
    content: { ...content, media },
    assets: assets.map((asset) => ({
      id: asset.id,
      kind: asset.kind,
      original_name: asset.original_name,
      content_type: asset.content_type,
      byte_size: asset.byte_size,
      sort_order: asset.sort_order,
      signed_url: asset.signed_url,
    })),
  };
}

export async function getInvitationBundle(slug, previewToken = '', guestToken = '') {
  const supabase = getServiceClient();
  const { data: invitation, error } = await supabase
    .from('invitations')
    .select('id, order_id, slug, template_slug, status, content, theme, design, draft_content, draft_theme, draft_design, seo_title, seo_description, preview_token_hash, published_at, expires_at')
    .eq('slug', slug)
    .single();

  if (error || !invitation) {
    const notFound = new Error('Không tìm thấy thiệp.');
    notFound.statusCode = 404;
    throw notFound;
  }

  const isPreview = previewToken && (invitation.preview_token_hash === hashValue(previewToken) || verifyAdminPreviewToken(previewToken, invitation.id));
  const isPublished = invitation.status === 'published'
    && (!invitation.expires_at || new Date(invitation.expires_at).getTime() > Date.now());

  if (!isPublished && !isPreview) {
    const unavailable = new Error('Thiệp chưa được xuất bản hoặc đã hết hạn.');
    unavailable.statusCode = 404;
    throw unavailable;
  }

  const guestId = verifyGuestToken(guestToken, invitation.id);
  const [eventResult, assetResult, wishResult, guestResult] = await Promise.all([
    supabase.from('events').select('id, event_type, name, starts_at, venue_name, address, map_url, sort_order').eq('invitation_id', invitation.id).order('sort_order'),
    supabase.from('assets').select('id, kind, storage_bucket, storage_path, original_name, content_type, byte_size, sort_order, created_at').eq('invitation_id', invitation.id).in('kind', [...publicAssetKinds]).order('created_at', { ascending: false }),
    supabase.from('wishes').select('id, full_name, message, created_at').eq('invitation_id', invitation.id).eq('is_approved', true).order('created_at', { ascending: false }).limit(50),
    guestId ? supabase.from('guests').select('id, full_name, group_name, invited_count').eq('id', guestId).eq('invitation_id', invitation.id).maybeSingle() : { data: null },
  ]);

  const queryError = eventResult.error || assetResult.error || wishResult.error || guestResult.error;
  if (queryError) throw queryError;

  const events = eventResult.data || [];
  const wishes = wishResult.data || [];
  const guest = guestResult.data || null;
  const assets = await signAssetUrls(supabase, assetResult.data || [], isPublished ? 86400 : 3600);
  const sourceContent = isPreview ? invitation.draft_content : invitation.content;
  const publicBundle = mergePublicInvitationAssets(sourceContent, assets);

  return {
    id: invitation.id,
    slug: invitation.slug,
    templateSlug: invitation.template_slug,
    status: invitation.status,
    preview: Boolean(isPreview),
    content: publicBundle.content,
    theme: (isPreview ? invitation.draft_theme : invitation.theme) || {},
    design: isPreview ? invitation.draft_design : invitation.design,
    seo: {
      title: invitation.seo_title,
      description: invitation.seo_description,
    },
    events,
    assets: publicBundle.assets,
    wishes,
    guest,
    publishedAt: invitation.published_at,
    expiresAt: invitation.expires_at,
  };
}

export async function getPublishedInvitationRecord(slug) {
  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from('invitations')
    .select('id, slug, status, expires_at')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error || !data || (data.expires_at && new Date(data.expires_at).getTime() <= Date.now())) {
    const notFound = new Error('Thiệp chưa được xuất bản hoặc đã hết hạn.');
    notFound.statusCode = 404;
    throw notFound;
  }
  return { supabase, invitation: data };
}
