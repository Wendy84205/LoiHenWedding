import {
  buildInitialInvitationContent, commercePackages, commercialTemplateSlugs,
  normalizeInvitationContent, normalizeInvitationTheme, slugifyWedding,
} from './invitationContent.js';
import { assertPackageAssetQuota, assertPackageGuestQuota } from './packageLimits.js';
import { getInvitationMusicAssetId, invitationMusicAssetValue } from './invitationMusic.js';
import { createScenePatch, normalizeScenePatch } from './scene/sceneSchema.js';
import { runInvitationPreflight } from './scene/scenePreflight.js';
import { getSceneTemplate } from './scene/sceneTemplates.js';

const STORE_KEY = 'loi-hen-commerce-demo-v1';

function nowIso() {
  return new Date().toISOString();
}

function futureDate(months = 18) {
  const date = new Date();
  date.setMonth(date.getMonth() + months);
  return date.toISOString();
}

function currentLocalAccountId() {
  try {
    return JSON.parse(localStorage.getItem('loi-hen-demo-customer-session') || 'null')?.user?.id || '';
  } catch {
    return '';
  }
}

function initialSceneDesign(templateSlug) {
  const template = getSceneTemplate(templateSlug);
  return template ? createScenePatch(template) : null;
}

function normalizeSceneDesign(value, templateSlug) {
  const template = getSceneTemplate(templateSlug);
  return template ? normalizeScenePatch(value, template) : null;
}

function seedStore() {
  const orderId = crypto.randomUUID();
  const invitationId = crypto.randomUUID();
  const previewToken = crypto.randomUUID().replaceAll('-', '') + crypto.randomUUID().replaceAll('-', '');
  const content = normalizeInvitationContent({
    couple: { groomName: 'Tuấn Hà', groomFullName: 'Nguyễn Tuấn Hà', brideName: 'Minh Vy', brideFullName: 'Trần Minh Vy' },
    event: {
      startsAt: '2027-11-28T12:00:00+07:00',
      venueName: 'Trung tâm tiệc cưới Lời Hẹn',
      address: '48 Lê Văn Lương, Hà Nội',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=48+Le+Van+Luong+Ha+Noi',
    },
    media: {
      hero: '/assets/new-templates/thiep-cuoi-104/image-2.png',
      couple: '/assets/new-templates/thiep-cuoi-104/image-2.png',
      venue: '/assets/new-templates/thiep-cuoi-104/image-3.png',
      social: '/social/thiep-cuoi-104.jpg',
      gallery: [],
    },
  });
  const design = initialSceneDesign('thiep-cuoi-104');
  return {
    orders: [{
      id: orderId,
      public_id: 'LH-DEMO-001',
      access_token: previewToken,
      preview_token: previewToken,
      package_code: 'basic',
      template_slug: 'thiep-cuoi-104',
      status: 'published',
      amount_total: commercePackages.basic.amount,
      deposit_amount: commercePackages.basic.depositAmount,
      deposit_status: 'paid',
      revision_limit: commercePackages.basic.revisionLimit,
      revision_count: 0,
      customer_note: 'Đơn mẫu dùng để kiểm tra quy trình thương mại.',
      internal_note: '',
      expires_at: futureDate(),
      created_at: nowIso(),
      updated_at: nowIso(),
      account_user_id: 'demo-customer',
      customers: { id: crypto.randomUUID(), full_name: 'Khách hàng mẫu', email: 'demo@example.com', phone: '0900000000', zalo: '' },
      invitation: {
        id: invitationId,
        slug: 'tuan-ha-minh-vy-demo',
        template_slug: 'thiep-cuoi-104',
        status: 'published',
        content,
        live_content: clone(content),
        draft_version: 1,
        theme: {},
        design,
        live_design: clone(design),
        seo_title: 'Tuấn Hà & Minh Vy | Thiệp cưới',
        seo_description: content.copy.intro,
        published_at: nowIso(),
        expires_at: futureDate(),
      },
      events: [{ id: crypto.randomUUID(), name: 'Lễ thành hôn', starts_at: content.event.startsAt, venue_name: content.event.venueName, address: content.event.address, map_url: content.event.mapUrl, sort_order: 0 }],
      assets: [],
      payments: [{ id: crypto.randomUUID(), provider: 'bank_transfer', status: 'paid', amount: commercePackages.basic.depositAmount, created_at: nowIso() }],
      revisions: [],
    }],
    rsvps: [],
    wishes: [],
    guests: [],
    consultations: [],
    versions: [{ id: crypto.randomUUID(), invitation_id: invitationId, version: 1, template_slug: 'thiep-cuoi-104', content: clone(content), theme: {}, design: clone(design), created_by: 'system', created_at: nowIso() }],
  };
}

function readStore() {
  try {
    const value = JSON.parse(localStorage.getItem(STORE_KEY));
    if (value?.orders && value?.rsvps && value?.wishes) {
      value.guests ||= [];
      value.consultations ||= [];
      value.versions ||= [];
      value.orders.forEach((order) => {
        if (order.account_user_id === undefined) order.account_user_id = order.public_id === 'LH-DEMO-001' ? 'demo-customer' : '';
        if (!order.access_token) order.access_token = crypto.randomUUID().replaceAll('-', '') + crypto.randomUUID().replaceAll('-', '');
        if (!order.preview_token) order.preview_token = order.access_token;
        order.invitation.live_content ||= clone(order.invitation.content);
        order.invitation.draft_version ||= 1;
        order.invitation.theme = normalizeInvitationTheme(order.invitation.theme);
        order.invitation.live_theme ||= clone(order.invitation.theme);
        order.invitation.design = normalizeSceneDesign(order.invitation.design, order.invitation.template_slug);
        order.invitation.live_design = normalizeSceneDesign(
          order.invitation.live_design === undefined ? order.invitation.design : order.invitation.live_design,
          order.invitation.template_slug,
        );
        value.versions.filter((version) => version.invitation_id === order.invitation.id).forEach((version) => {
          version.template_slug ||= order.invitation.template_slug;
          version.theme ||= {};
          version.design = normalizeSceneDesign(version.design, version.template_slug);
        });
      });
      return value;
    }
  } catch {
    // Reset invalid demo data below.
  }
  const value = seedStore();
  localStorage.setItem(STORE_KEY, JSON.stringify(value));
  return value;
}

function writeStore(value) {
  localStorage.setItem(STORE_KEY, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent('loi-hen-commerce-update'));
}

function clone(value) {
  return structuredClone(value);
}

export function localListOrders() {
  return clone(readStore().orders).sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export function localCreateConsultation(input) {
  const store = readStore();
  const createdAt = nowIso();
  const consultation = {
    id: crypto.randomUUID(),
    public_id: `LH-TV-DEMO-${String(store.consultations.length + 1).padStart(3, '0')}`,
    full_name: input.fullName,
    phone: input.phone,
    email: input.email || '',
    service: input.service,
    template_slug: input.templateSlug || '',
    preferred_date: input.preferredDate,
    preferred_time: input.preferredTime,
    note: input.note || '',
    status: 'new',
    internal_note: '',
    consent_at: createdAt,
    created_at: createdAt,
    updated_at: createdAt,
  };
  store.consultations.unshift(consultation);
  writeStore(store);
  return clone(consultation);
}

export function localListConsultations() {
  return clone(readStore().consultations).sort((left, right) => right.created_at.localeCompare(left.created_at));
}

export function localUpdateConsultation(id, patch) {
  const store = readStore();
  const consultation = store.consultations.find((item) => item.id === id);
  if (!consultation) throw new Error('Không tìm thấy yêu cầu tư vấn.');
  consultation.status = patch.status;
  consultation.internal_note = patch.internalNote || '';
  consultation.updated_at = nowIso();
  writeStore(store);
  return clone(consultation);
}

export function localListCustomerOrders(userId) {
  return clone(readStore().orders.filter((order) => order.account_user_id === userId)).sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export function localClaimCustomerOrder(orderId, accessToken, userId) {
  const store = readStore();
  const order = store.orders.find((item) => item.id === orderId);
  if (!order || order.access_token !== accessToken) throw new Error('Mã truy cập đơn hàng không hợp lệ.');
  if (order.account_user_id && order.account_user_id !== userId) throw new Error('Đơn hàng này đã thuộc một tài khoản khác.');
  order.account_user_id = userId;
  order.updated_at = nowIso();
  writeStore(store);
  return clone(order);
}

export function localGetOrder(orderId) {
  const store = readStore();
  const order = store.orders.find((item) => item.id === orderId);
  if (!order) throw new Error('Không tìm thấy đơn hàng.');
  return clone({
    ...order,
    rsvps: store.rsvps.filter((item) => item.invitation_id === order.invitation.id),
    wishes: store.wishes.filter((item) => item.invitation_id === order.invitation.id),
    guests: store.guests.filter((item) => item.invitation_id === order.invitation.id).map((guest) => ({ ...guest, personal_url: `${window.location.origin}/w/${order.invitation.slug}?guest=${encodeURIComponent(guest.guest_token)}` })),
  });
}

export function localCreateOrder(input) {
  const store = readStore();
  const packageInfo = commercePackages.basic;
  const orderId = crypto.randomUUID();
  const invitationId = crypto.randomUUID();
  const token = crypto.randomUUID().replaceAll('-', '') + crypto.randomUUID().replaceAll('-', '');
  const previewToken = token;
  const publicId = `LH-DEMO-${String(store.orders.length + 1).padStart(3, '0')}`;
  const content = buildInitialInvitationContent(input);
  const design = initialSceneDesign(input.templateSlug);
  const slug = `${slugifyWedding(`${input.groomName}-${input.brideName}`) || 'thiep-cuoi'}-${publicId.slice(-3)}`;
  const createdAt = nowIso();
  const expiresAt = futureDate(packageInfo.retentionMonths);
  const order = {
    id: orderId,
    public_id: publicId,
    access_token: token,
    preview_token: previewToken,
    package_code: packageInfo.code,
    template_slug: input.templateSlug,
    status: 'awaiting_deposit',
    amount_total: packageInfo.amount,
    deposit_amount: packageInfo.depositAmount,
    deposit_status: 'pending',
    revision_limit: packageInfo.revisionLimit,
    revision_count: 0,
    customer_note: input.customerNote || '',
    internal_note: '',
    expires_at: expiresAt,
    created_at: createdAt,
    updated_at: createdAt,
    account_user_id: currentLocalAccountId(),
    customers: { id: crypto.randomUUID(), full_name: input.fullName, email: input.email, phone: input.phone, zalo: input.zalo },
    invitation: {
      id: invitationId,
      slug,
      template_slug: input.templateSlug,
      status: 'draft',
      content,
      live_content: clone(content),
      draft_version: 1,
      theme: {},
      design,
      live_design: clone(design),
      seo_title: `${input.groomName} & ${input.brideName} | Thiệp cưới`,
      seo_description: content.copy.intro,
      published_at: null,
      expires_at: expiresAt,
    },
    events: [{ id: crypto.randomUUID(), name: 'Lễ thành hôn', starts_at: content.event.startsAt, venue_name: input.venueName, address: input.address, map_url: content.event.mapUrl, sort_order: 0 }],
    assets: [],
    payments: [{ id: crypto.randomUUID(), provider: 'bank_transfer', status: 'pending', amount: packageInfo.depositAmount, created_at: createdAt }],
    revisions: [],
  };
  store.orders.push(order);
  store.versions.push({ id: crypto.randomUUID(), invitation_id: invitationId, version: 1, template_slug: input.templateSlug, content: clone(content), theme: {}, design: clone(design), created_by: 'customer', created_at: createdAt });
  writeStore(store);
  return {
    orderId,
    publicId,
    accessToken: token,
    previewToken,
    invitationSlug: slug,
    status: order.status,
    amountTotal: order.amount_total,
    depositAmount: order.deposit_amount,
  };
}

export function localUpdateOrder(orderId, patch, role = 'admin') {
  const store = readStore();
  const order = store.orders.find((item) => item.id === orderId);
  if (!order) throw new Error('Không tìm thấy đơn hàng.');
  if (role === 'customer') {
    if (patch.customerNote !== undefined) order.customer_note = patch.customerNote;
    if (patch.revisionMessage) {
      if (order.revision_count >= order.revision_limit) throw new Error('Đơn hàng đã sử dụng hết số lần hỗ trợ chỉnh sửa.');
      order.revisions.unshift({ id: crypto.randomUUID(), requested_by: 'customer', message: patch.revisionMessage, status: 'open', created_at: nowIso() });
      order.status = 'revision';
      order.revision_count += 1;
    }
  } else {
    if (patch.status) order.status = patch.status;
    if (patch.depositStatus) {
      order.deposit_status = patch.depositStatus;
      order.payments = order.payments.map((payment) => ({ ...payment, status: patch.depositStatus, paid_at: patch.depositStatus === 'paid' ? nowIso() : payment.paid_at }));
    }
    if (patch.customerNote !== undefined) order.customer_note = patch.customerNote;
    if (patch.internalNote !== undefined) order.internal_note = patch.internalNote;
    if (patch.content) {
      order.invitation.content = normalizeInvitationContent(patch.content);
      order.invitation.draft_version = (order.invitation.draft_version || 1) + 1;
      store.versions.push({
        id: crypto.randomUUID(),
        invitation_id: order.invitation.id,
        version: order.invitation.draft_version,
        template_slug: order.invitation.template_slug,
        content: clone(order.invitation.content),
        theme: clone(normalizeInvitationTheme(order.invitation.theme)),
        design: clone(order.invitation.design),
        created_by: 'staff',
        created_at: nowIso(),
      });
      store.versions = store.versions.filter((item) => item.invitation_id !== order.invitation.id)
        .concat(store.versions.filter((item) => item.invitation_id === order.invitation.id).slice(-50));
    }
    if (patch.seoTitle !== undefined) order.invitation.seo_title = patch.seoTitle;
    if (patch.seoDescription !== undefined) order.invitation.seo_description = patch.seoDescription;
  }
  order.updated_at = nowIso();
  writeStore(store);
  return clone(order);
}

export async function localAddAsset(orderId, file, kind) {
  if (file.size > 1500000) throw new Error('Chế độ demo chỉ lưu tệp tối đa 1,5 MB. Production hỗ trợ 15 MB.');
  const currentOrder = readStore().orders.find((item) => item.id === orderId);
  if (!currentOrder) throw new Error('Không tìm thấy đơn hàng.');
  assertPackageAssetQuota(currentOrder.package_code, currentOrder.assets, { kind, byteSize: file.size });
  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Không đọc được tệp.'));
    reader.readAsDataURL(file);
  });
  const store = readStore();
  const order = store.orders.find((item) => item.id === orderId);
  if (!order) throw new Error('Không tìm thấy đơn hàng.');
  const asset = { id: crypto.randomUUID(), kind, original_name: file.name, content_type: file.type, byte_size: file.size, signed_url: dataUrl, created_at: nowIso() };
  order.assets.push(asset);
  if (kind === 'payment_proof') {
    order.deposit_status = 'submitted';
    order.payments = order.payments.map((payment) => ({ ...payment, status: 'submitted', proof_asset_id: asset.id }));
  }
  if (kind === 'gallery') order.invitation.content.media.gallery.push(dataUrl);
  else if (kind === 'music') order.invitation.content.media.music = invitationMusicAssetValue(asset.id);
  else if (kind === 'gift_qr') order.invitation.content.media.giftQr = dataUrl;
  else order.invitation.content.media[kind] = dataUrl;
  writeStore(store);
  return clone(asset);
}

export function localDeleteAsset(orderId, assetId) {
  const store = readStore();
  const order = store.orders.find((item) => item.id === orderId);
  if (!order) throw new Error('Không tìm thấy đơn hàng.');
  const asset = order.assets.find((item) => item.id === assetId);
  if (!asset) throw new Error('Không tìm thấy tệp.');
  if (asset.kind === 'payment_proof') throw new Error('Biên nhận thanh toán chỉ có thể được xử lý bởi studio.');
  order.assets = order.assets.filter((item) => item.id !== assetId);
  if (asset.kind === 'gallery') order.invitation.content.media.gallery = order.invitation.content.media.gallery.filter((url) => url !== asset.signed_url);
  else if (asset.kind === 'music' && (getInvitationMusicAssetId(order.invitation.content.media.music) === asset.id || order.invitation.content.media.music === asset.signed_url)) order.invitation.content.media.music = '';
  else if (asset.kind === 'gift_qr' && order.invitation.content.media.giftQr === asset.signed_url) order.invitation.content.media.giftQr = '';
  else if (order.invitation.content.media[asset.kind] === asset.signed_url) order.invitation.content.media[asset.kind] = '';
  writeStore(store);
  return { ok: true };
}

export function localUpdateAssetKind(orderId, assetId, kind) {
  const store = readStore();
  const order = store.orders.find((item) => item.id === orderId);
  if (!order) throw new Error('Không tìm thấy đơn hàng.');
  const asset = order.assets.find((item) => item.id === assetId);
  if (!asset) throw new Error('Không tìm thấy tệp.');
  if (asset.kind === 'payment_proof') throw new Error('Không thể dùng biên nhận thanh toán làm tư liệu thiệp.');
  const isAudio = String(asset.content_type || '').startsWith('audio/');
  if ((kind === 'music') !== isAudio && kind !== 'other') throw new Error(isAudio ? 'Tệp âm thanh chỉ có thể dùng làm nhạc nền.' : 'Ảnh không thể dùng làm nhạc nền.');
  if (asset.kind === 'gallery') order.invitation.content.media.gallery = order.invitation.content.media.gallery.filter((url) => url !== asset.signed_url);
  else if (asset.kind === 'music' && (getInvitationMusicAssetId(order.invitation.content.media.music) === asset.id || order.invitation.content.media.music === asset.signed_url)) order.invitation.content.media.music = '';
  else if (asset.kind === 'gift_qr' && order.invitation.content.media.giftQr === asset.signed_url) order.invitation.content.media.giftQr = '';
  else if (order.invitation.content.media[asset.kind] === asset.signed_url) order.invitation.content.media[asset.kind] = '';
  asset.kind = kind;
  if (kind === 'gallery') order.invitation.content.media.gallery = [...new Set([...order.invitation.content.media.gallery, asset.signed_url])];
  else if (kind === 'music') order.invitation.content.media.music = invitationMusicAssetValue(asset.id);
  else if (kind === 'gift_qr') order.invitation.content.media.giftQr = asset.signed_url;
  else if (Object.hasOwn(order.invitation.content.media, kind)) order.invitation.content.media[kind] = asset.signed_url;
  writeStore(store);
  return clone(asset);
}

export function localPublishOrder(orderId, slug, expiresAt) {
  const store = readStore();
  if (store.orders.some((item) => item.id !== orderId && item.invitation.slug === slug)) throw new Error('Link thiệp này đã được sử dụng.');
  const order = store.orders.find((item) => item.id === orderId);
  if (!order) throw new Error('Không tìm thấy đơn hàng.');
  order.status = 'published';
  order.invitation.status = 'published';
  order.invitation.live_content = clone(order.invitation.content);
  order.invitation.live_theme = clone(order.invitation.theme);
  order.invitation.live_design = clone(order.invitation.design);
  order.invitation.slug = slug;
  order.invitation.published_at = nowIso();
  if (expiresAt) order.invitation.expires_at = expiresAt;
  writeStore(store);
  return clone(order.invitation);
}

export function localSelfPublishOrder(orderId) {
  const order = readStore().orders.find((item) => item.id === orderId);
  if (!order) throw new Error('Không tìm thấy đơn hàng.');
  if (order.package_code !== 'basic') {
    localSubmitInvitationReview(orderId);
    return { ok: true, reviewRequired: true, status: 'customer_review' };
  }
  if (order.deposit_status !== 'paid') throw new Error('Cần xác nhận thanh toán trước khi tự phát hành.');
  const preflight = runInvitationPreflight({
    content: order.invitation.content,
    design: order.invitation.design,
    template: getSceneTemplate(order.template_slug),
    slug: order.invitation.slug,
    expiresAt: order.invitation.expires_at,
    seoTitle: order.invitation.seo_title,
    seoDescription: order.invitation.seo_description,
  });
  if (!preflight.ok) throw new Error(`Thiệp chưa thể phát hành: ${preflight.errors.map((item) => item.message).join(' ')}`);
  const invitation = localPublishOrder(orderId, order.invitation.slug, order.invitation.expires_at);
  return { ok: true, reviewRequired: false, status: 'published', invitation, url: `${window.location.origin}/w/${invitation.slug}`, preflight };
}

export function localGetInvitation(slug, preview = '', guestToken = '') {
  const order = readStore().orders.find((item) => item.invitation.slug === slug);
  if (!order) throw new Error('Không tìm thấy thiệp.');
  const published = order.invitation.status === 'published';
  const validPreview = preview && preview === order.preview_token;
  if (!published && !validPreview) throw new Error('Thiệp chưa được xuất bản.');
  const guest = readStore().guests.find((item) => item.invitation_id === order.invitation.id && item.guest_token === guestToken);
  const content = normalizeInvitationContent(validPreview ? order.invitation.content : order.invitation.live_content || order.invitation.content);
  const selectedMusicAssetId = getInvitationMusicAssetId(content.media.music);
  if (selectedMusicAssetId) {
    content.media.music = order.assets.find((asset) => asset.id === selectedMusicAssetId && asset.kind === 'music')?.signed_url || '';
  } else if (!content.media.music) {
    content.media.music = order.assets.find((asset) => asset.kind === 'music')?.signed_url || '';
  }
  return {
    id: order.invitation.id,
    slug,
    templateSlug: order.invitation.template_slug,
    status: order.invitation.status,
    preview: Boolean(validPreview),
    content,
    theme: validPreview ? order.invitation.theme : order.invitation.live_theme || order.invitation.theme,
    design: validPreview ? order.invitation.design : order.invitation.live_design || order.invitation.design,
    seo: { title: order.invitation.seo_title, description: order.invitation.seo_description },
    events: clone(order.events),
    assets: clone(order.assets),
    wishes: clone(readStore().wishes.filter((item) => item.invitation_id === order.invitation.id && item.is_approved !== false)),
    guest: guest ? { id: guest.id, full_name: guest.full_name, group_name: guest.group_name, invited_count: guest.invited_count } : null,
    expiresAt: order.invitation.expires_at,
  };
}

export function localSaveInvitationDraft(orderId, content, theme, design, expectedVersion) {
  const store = readStore();
  const order = store.orders.find((item) => item.id === orderId);
  if (!order) throw new Error('Không tìm thấy đơn hàng.');
  if (expectedVersion === undefined) {
    expectedVersion = design;
    design = order.invitation.design;
  }
  const currentVersion = order.invitation.draft_version || 1;
  if (currentVersion !== expectedVersion) throw new Error('Bản thiệp đã được thay đổi ở tab khác. Hãy tải lại trước khi tiếp tục.');
  order.invitation.content = normalizeInvitationContent(content);
  order.invitation.theme = normalizeInvitationTheme(theme);
  order.invitation.design = normalizeSceneDesign(design, order.invitation.template_slug);
  order.invitation.draft_version = currentVersion + 1;
  order.updated_at = nowIso();
  store.versions.push({ id: crypto.randomUUID(), invitation_id: order.invitation.id, version: order.invitation.draft_version, template_slug: order.invitation.template_slug, content: clone(order.invitation.content), theme: clone(order.invitation.theme), design: clone(order.invitation.design), created_by: 'customer', created_at: order.updated_at });
  store.versions = store.versions.filter((item) => item.invitation_id !== order.invitation.id).concat(store.versions.filter((item) => item.invitation_id === order.invitation.id).slice(-50));
  writeStore(store);
  return clone({ content: order.invitation.content, theme: order.invitation.theme, design: order.invitation.design, version: order.invitation.draft_version, updatedAt: order.updated_at });
}

export function localSubmitInvitationReview(orderId) {
  const store = readStore();
  const order = store.orders.find((item) => item.id === orderId);
  if (!order) throw new Error('Không tìm thấy đơn hàng.');
  order.status = 'customer_review';
  order.updated_at = nowIso();
  writeStore(store);
  return { ok: true, status: order.status };
}

export function localSwitchInvitationTemplate(orderId, templateSlug) {
  const store = readStore();
  const order = store.orders.find((item) => item.id === orderId);
  if (!order) throw new Error('Không tìm thấy đơn hàng.');
  if (!commercialTemplateSlugs.includes(templateSlug)) throw new Error('Mẫu thiệp chưa hỗ trợ tự chỉnh sửa.');
  if (order.template_slug === templateSlug) return { ok: true, templateSlug, version: order.invitation.draft_version };
  order.template_slug = templateSlug;
  order.invitation.template_slug = templateSlug;
  order.invitation.design = initialSceneDesign(templateSlug);
  order.invitation.draft_version = (order.invitation.draft_version || 1) + 1;
  order.updated_at = nowIso();
  store.versions.push({
    id: crypto.randomUUID(), invitation_id: order.invitation.id, version: order.invitation.draft_version, template_slug: templateSlug,
    content: clone(order.invitation.content), theme: clone(normalizeInvitationTheme(order.invitation.theme)), design: clone(order.invitation.design),
    created_by: 'customer', created_at: order.updated_at,
  });
  store.versions = store.versions.filter((item) => item.invitation_id !== order.invitation.id)
    .concat(store.versions.filter((item) => item.invitation_id === order.invitation.id).slice(-50));
  writeStore(store);
  return { ok: true, templateSlug, version: order.invitation.draft_version };
}

export function localListInvitationVersions(orderId) {
  const store = readStore();
  const order = store.orders.find((item) => item.id === orderId);
  if (!order) throw new Error('Không tìm thấy đơn hàng.');
  return {
    currentVersion: order.invitation.draft_version || 1,
    versions: store.versions
      .filter((item) => item.invitation_id === order.invitation.id)
      .sort((a, b) => b.version - a.version)
      .slice(0, 50)
      .map(({ id, version, template_slug, created_by, created_at }) => ({ id, version, template_slug, created_by, created_at })),
  };
}

export function localRestoreInvitationVersion(orderId, version) {
  const store = readStore();
  const order = store.orders.find((item) => item.id === orderId);
  if (!order) throw new Error('Không tìm thấy đơn hàng.');
  const target = store.versions.find((item) => item.invitation_id === order.invitation.id && item.version === version);
  if (!target) throw new Error('Không tìm thấy phiên bản cần khôi phục.');
  order.invitation.content = normalizeInvitationContent(target.content);
  order.invitation.theme = normalizeInvitationTheme(target.theme);
  order.invitation.template_slug = target.template_slug || order.invitation.template_slug;
  order.invitation.design = normalizeSceneDesign(target.design, order.invitation.template_slug);
  order.template_slug = order.invitation.template_slug;
  order.invitation.draft_version = (order.invitation.draft_version || 1) + 1;
  order.updated_at = nowIso();
  store.versions.push({
    id: crypto.randomUUID(), invitation_id: order.invitation.id, version: order.invitation.draft_version, template_slug: order.invitation.template_slug,
    content: clone(order.invitation.content), theme: clone(order.invitation.theme), design: clone(order.invitation.design), created_by: 'customer', created_at: order.updated_at,
  });
  store.versions = store.versions.filter((item) => item.invitation_id !== order.invitation.id).concat(store.versions.filter((item) => item.invitation_id === order.invitation.id).slice(-50));
  writeStore(store);
  return clone({ content: order.invitation.content, theme: order.invitation.theme, design: order.invitation.design, templateSlug: order.invitation.template_slug, version: order.invitation.draft_version, updatedAt: order.updated_at });
}

export function localAddGuest(orderId, input) {
  const store = readStore();
  const order = store.orders.find((item) => item.id === orderId);
  if (!order) throw new Error('Không tìm thấy đơn hàng.');
  const guestCount = store.guests.filter((item) => item.invitation_id === order.invitation.id).length;
  assertPackageGuestQuota(order.package_code, guestCount);
  const guest = {
    id: crypto.randomUUID(),
    invitation_id: order.invitation.id,
    full_name: input.fullName,
    phone: input.phone || '',
    group_name: input.groupName || '',
    invited_count: Number(input.invitedCount) || 1,
    guest_token: `${crypto.randomUUID().replaceAll('-', '')}${crypto.randomUUID().replaceAll('-', '')}`,
    created_at: nowIso(),
  };
  store.guests.push(guest);
  writeStore(store);
  return clone({ ...guest, personal_url: `${window.location.origin}/w/${order.invitation.slug}?guest=${encodeURIComponent(guest.guest_token)}` });
}

export function localDeleteGuest(guestId) {
  const store = readStore();
  store.guests = store.guests.filter((item) => item.id !== guestId);
  writeStore(store);
}

export function localSubmitRsvp(input) {
  const store = readStore();
  const order = store.orders.find((item) => item.invitation.slug === input.slug && item.invitation.status === 'published');
  if (!order) throw new Error('Thiệp chưa được xuất bản.');
  const guest = store.guests.find((item) => item.invitation_id === order.invitation.id && item.guest_token === input.guestToken);
  if (guest && input.attendance !== 'no' && input.partySize > guest.invited_count) throw new Error(`Link mời này được xác nhận tối đa ${guest.invited_count} người.`);
  const response = { id: crypto.randomUUID(), invitation_id: order.invitation.id, guest_id: guest?.id || null, full_name: input.fullName, phone: input.phone, attendance: input.attendance, party_size: input.attendance === 'no' ? 0 : input.partySize, note: input.note, created_at: nowIso() };
  const existingIndex = guest ? store.rsvps.findIndex((item) => item.invitation_id === order.invitation.id && item.guest_id === guest.id) : -1;
  if (existingIndex >= 0) store.rsvps[existingIndex] = { ...store.rsvps[existingIndex], ...response, id: store.rsvps[existingIndex].id };
  else store.rsvps.push(response);
  writeStore(store);
}

export function localSubmitWish(input) {
  const store = readStore();
  const order = store.orders.find((item) => item.invitation.slug === input.slug && item.invitation.status === 'published');
  if (!order) throw new Error('Thiệp chưa được xuất bản.');
  const guest = store.guests.find((item) => item.invitation_id === order.invitation.id && item.guest_token === input.guestToken);
  store.wishes.unshift({ id: crypto.randomUUID(), invitation_id: order.invitation.id, guest_id: guest?.id || null, full_name: input.fullName, message: input.message, is_approved: false, created_at: nowIso() });
  writeStore(store);
}

export function localModerateWish(wishId, isApproved) {
  const store = readStore();
  const wish = store.wishes.find((item) => item.id === wishId);
  if (!wish) throw new Error('Không tìm thấy lời chúc.');
  wish.is_approved = Boolean(isApproved);
  writeStore(store);
  return clone(wish);
}

export function localGetRsvps(invitationId) {
  return clone(readStore().rsvps.filter((item) => item.invitation_id === invitationId));
}
