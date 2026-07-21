import { createClient } from '@supabase/supabase-js';
import {
  localAddAsset,
  localAddGuest,
  localClaimCustomerOrder,
  localCreateConsultation,
  localCreateOrder,
  localDeleteAsset,
  localDeleteGuest,
  localGetInvitation,
  localGetOrder,
  localGetRsvps,
  localListOrders,
  localListCustomerOrders,
  localListConsultations,
  localListInvitationVersions,
  localModerateWish,
  localPublishOrder,
  localSelfPublishOrder,
  localSaveInvitationDraft,
  localRestoreInvitationVersion,
  localSwitchInvitationTemplate,
  localSubmitRsvp,
  localSubmitInvitationReview,
  localSubmitWish,
  localUpdateOrder,
  localUpdateAssetKind,
  localUpdateConsultation,
} from './localStore.js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
export const commerceConfigured = Boolean(supabaseUrl && supabaseAnonKey);
export const commerceDemoMode = !commerceConfigured && (import.meta.env.DEV || import.meta.env.VITE_COMMERCE_DEMO === 'true');
export const commerceAvailable = commerceConfigured || commerceDemoMode;
export const browserSupabase = commerceConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, { auth: { persistSession: true, autoRefreshToken: true } })
  : null;

function assertCommerceAvailable() {
  if (!commerceAvailable) throw new Error('Hệ thống đặt thiệp đang được cấu hình. Vui lòng liên hệ studio để tạo đơn.');
}

async function request(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
  });
  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json') ? await response.json() : await response.text();
  if (!response.ok) throw new Error(payload?.error || payload || 'Không thể xử lý yêu cầu.');
  return payload;
}

async function adminHeaders() {
  return sessionHeaders('Vui lòng đăng nhập quản trị.');
}

async function sessionHeaders(message = 'Vui lòng đăng nhập tài khoản.') {
  const { data } = await browserSupabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) throw new Error(message);
  return { Authorization: `Bearer ${token}` };
}

async function optionalSessionHeaders() {
  if (!browserSupabase) return {};
  const { data } = await browserSupabase.auth.getSession();
  return data.session?.access_token ? { Authorization: `Bearer ${data.session.access_token}` } : {};
}

export async function signInAdmin(email, password) {
  if (commerceDemoMode) return { demo: true };
  assertCommerceAvailable();
  const { data, error } = await browserSupabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOutAdmin() {
  if (browserSupabase) await browserSupabase.auth.signOut();
}

export async function getAdminSession() {
  if (commerceDemoMode) return { demo: true, user: { email: 'demo@loihen.local' } };
  if (!commerceAvailable) return null;
  const { data } = await browserSupabase.auth.getSession();
  return data.session;
}

export async function signInCustomer(email) {
  if (commerceDemoMode) {
    const session = { demo: true, user: { id: 'demo-customer', email: email || 'khach@loihen.local' } };
    localStorage.setItem('loi-hen-demo-customer-session', JSON.stringify(session));
    return session;
  }
  assertCommerceAvailable();
  const { data, error } = await browserSupabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${window.location.origin}/tai-khoan` },
  });
  if (error) throw error;
  return data;
}

export async function signInCustomerWithGoogle() {
  if (commerceDemoMode) {
    const session = {
      demo: true,
      provider: 'google',
      user: { id: 'demo-customer', email: 'google-demo@loihen.local' },
    };
    localStorage.setItem('loi-hen-demo-customer-session', JSON.stringify(session));
    return session;
  }
  assertCommerceAvailable();
  const { data, error } = await browserSupabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${window.location.origin}/tai-khoan` },
  });
  if (error) throw error;
  return data;
}

export async function getCustomerSession() {
  if (commerceDemoMode) {
    try {
      return JSON.parse(localStorage.getItem('loi-hen-demo-customer-session') || 'null');
    } catch {
      return null;
    }
  }
  if (!commerceAvailable) return null;
  const { data } = await browserSupabase.auth.getSession();
  return data.session;
}

export async function signOutCustomer() {
  if (commerceDemoMode) {
    localStorage.removeItem('loi-hen-demo-customer-session');
    return;
  }
  if (browserSupabase) await browserSupabase.auth.signOut();
}

function localAccountDashboard() {
  const orders = localListCustomerOrders('demo-customer');
  const customer = orders[0]?.customers || null;
  let session = null;
  try {
    session = JSON.parse(localStorage.getItem('loi-hen-demo-customer-session') || 'null');
  } catch {
    session = null;
  }
  return {
    user: {
      id: session?.user?.id || 'demo-customer',
      email: session?.user?.email || customer?.email || 'khach@loihen.local',
    },
    customer,
    orders: orders.map((order) => ({ ...order, guest_count: 0 })),
  };
}

export async function getCustomerAccount() {
  if (commerceDemoMode) return localAccountDashboard();
  assertCommerceAvailable();
  const payload = await request('/api/account', { headers: await sessionHeaders() });
  return payload.account;
}

export async function claimCustomerOrder(orderId, accessToken) {
  if (commerceDemoMode) {
    localClaimCustomerOrder(orderId, accessToken, 'demo-customer');
    return localAccountDashboard();
  }
  assertCommerceAvailable();
  const payload = await request('/api/account', {
    method: 'POST',
    headers: await sessionHeaders(),
    body: JSON.stringify({ orderId, accessToken }),
  });
  return payload.account;
}

export async function createOrder(input) {
  if (commerceDemoMode) return localCreateOrder(input);
  assertCommerceAvailable();
  return request('/api/orders', { method: 'POST', headers: await optionalSessionHeaders(), body: JSON.stringify(input) });
}

export async function createConsultation(input) {
  if (commerceDemoMode) return localCreateConsultation(input);
  assertCommerceAvailable();
  const payload = await request('/api/consultations', { method: 'POST', body: JSON.stringify(input) });
  return payload.consultation;
}

export async function listConsultations() {
  if (commerceDemoMode) return localListConsultations();
  assertCommerceAvailable();
  const payload = await request('/api/consultations', { headers: await adminHeaders() });
  return payload.consultations;
}

export async function updateConsultation(id, patch) {
  if (commerceDemoMode) return localUpdateConsultation(id, patch);
  assertCommerceAvailable();
  const payload = await request('/api/consultations', {
    method: 'PATCH',
    headers: await adminHeaders(),
    body: JSON.stringify({ id, ...patch }),
  });
  return payload.consultation;
}

export async function listOrders() {
  if (commerceDemoMode) return localListOrders();
  assertCommerceAvailable();
  const payload = await request('/api/orders', { headers: await adminHeaders() });
  return payload.orders;
}

export async function getOrder(orderId, accessToken = '') {
  if (commerceDemoMode) return localGetOrder(orderId);
  assertCommerceAvailable();
  const query = new URLSearchParams({ id: orderId });
  const options = { headers: accessToken ? { 'X-Order-Token': accessToken } : await sessionHeaders() };
  const payload = await request(`/api/order?${query}`, options);
  return payload.order;
}

export async function updateOrder(orderId, patch, accessToken = '') {
  if (commerceDemoMode) return localUpdateOrder(orderId, patch, accessToken ? 'customer' : 'admin');
  assertCommerceAvailable();
  const headers = accessToken ? { 'X-Order-Token': accessToken } : await sessionHeaders();
  const payload = await request('/api/order', {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ orderId, ...patch }),
  });
  return payload.order;
}

export async function deleteOrderPermanently(orderId, confirmPublicId) {
  if (commerceDemoMode) throw new Error('Không xóa dữ liệu vĩnh viễn trong chế độ demo.');
  assertCommerceAvailable();
  return request('/api/order', {
    method: 'DELETE',
    headers: await adminHeaders(),
    body: JSON.stringify({ orderId, confirmPublicId }),
  });
}

export async function saveInvitationDraft(orderId, accessToken, content, theme, design, expectedVersion) {
  if (commerceDemoMode) return localSaveInvitationDraft(orderId, content, theme, design, expectedVersion);
  assertCommerceAvailable();
  return request('/api/editor', {
    method: 'PATCH',
    headers: accessToken ? { 'X-Order-Token': accessToken } : await sessionHeaders(),
    body: JSON.stringify({ orderId, content, theme, design, expectedVersion }),
  });
}

export async function submitInvitationReview(orderId, accessToken) {
  if (commerceDemoMode) return localSubmitInvitationReview(orderId);
  assertCommerceAvailable();
  return request('/api/editor', {
    method: 'POST',
    headers: accessToken ? { 'X-Order-Token': accessToken } : await sessionHeaders(),
    body: JSON.stringify({ orderId, action: 'submit_review' }),
  });
}

export async function switchInvitationTemplate(orderId, accessToken, templateSlug) {
  if (commerceDemoMode) return localSwitchInvitationTemplate(orderId, templateSlug);
  assertCommerceAvailable();
  return request('/api/editor', {
    method: 'POST',
    headers: accessToken ? { 'X-Order-Token': accessToken } : await sessionHeaders(),
    body: JSON.stringify({ orderId, action: 'switch_template', templateSlug }),
  });
}

export async function listInvitationVersions(orderId, accessToken = '') {
  if (commerceDemoMode) return localListInvitationVersions(orderId);
  assertCommerceAvailable();
  const query = new URLSearchParams({ orderId });
  return request(`/api/versions?${query}`, { headers: accessToken ? { 'X-Order-Token': accessToken } : await sessionHeaders() });
}

export async function restoreInvitationVersion(orderId, accessToken, version) {
  if (commerceDemoMode) return localRestoreInvitationVersion(orderId, version);
  assertCommerceAvailable();
  return request('/api/versions', {
    method: 'POST',
    headers: accessToken ? { 'X-Order-Token': accessToken } : await sessionHeaders(),
    body: JSON.stringify({ orderId, version }),
  });
}

export async function uploadOrderAsset(orderId, accessToken, file, kind) {
  if (commerceDemoMode) return localAddAsset(orderId, file, kind);
  assertCommerceAvailable();
  const authHeaders = accessToken ? { 'X-Order-Token': accessToken } : await sessionHeaders();
  const upload = await request('/api/upload', {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({ orderId, fileName: file.name, contentType: file.type, byteSize: file.size, kind }),
  });
  try {
    const { error } = await browserSupabase.storage.from(upload.bucket).uploadToSignedUrl(upload.path, upload.token, file, { contentType: file.type });
    if (error) throw error;
    const registered = await request('/api/assets', {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ orderId, uploadId: upload.uploadId, fileName: file.name, contentType: file.type, byteSize: file.size, kind, storagePath: upload.path }),
    });
    return registered.asset;
  } catch (error) {
    await request('/api/upload', {
      method: 'DELETE',
      headers: authHeaders,
      body: JSON.stringify({ orderId, uploadId: upload.uploadId }),
    }).catch(() => {});
    throw error;
  }
}

export async function deleteOrderAsset(orderId, accessToken, assetId) {
  if (commerceDemoMode) return localDeleteAsset(orderId, assetId);
  assertCommerceAvailable();
  return request('/api/assets', {
    method: 'DELETE',
    headers: accessToken ? { 'X-Order-Token': accessToken } : await sessionHeaders(),
    body: JSON.stringify({ orderId, assetId }),
  });
}

export async function updateOrderAssetKind(orderId, accessToken, assetId, kind) {
  if (commerceDemoMode) return localUpdateAssetKind(orderId, assetId, kind);
  assertCommerceAvailable();
  const payload = await request('/api/assets', {
    method: 'PATCH',
    headers: accessToken ? { 'X-Order-Token': accessToken } : await sessionHeaders(),
    body: JSON.stringify({ orderId, assetId, kind }),
  });
  return payload.asset;
}

export async function publishOrder(orderId, slug, expiresAt) {
  if (commerceDemoMode) return localPublishOrder(orderId, slug, expiresAt);
  assertCommerceAvailable();
  return request('/api/publish', {
    method: 'POST',
    headers: await adminHeaders(),
    body: JSON.stringify({ orderId, slug, expiresAt }),
  });
}

export async function selfPublishInvitation(orderId, accessToken = '') {
  if (commerceDemoMode) return localSelfPublishOrder(orderId);
  assertCommerceAvailable();
  return request('/api/self-publish', {
    method: 'POST',
    headers: accessToken ? { 'X-Order-Token': accessToken } : await sessionHeaders(),
    body: JSON.stringify({ orderId }),
  });
}

export async function addGuest(orderId, input, accessToken = '') {
  if (commerceDemoMode) return localAddGuest(orderId, input);
  assertCommerceAvailable();
  const headers = accessToken ? { 'X-Order-Token': accessToken } : await sessionHeaders();
  const payload = await request('/api/guests', { method: 'POST', headers, body: JSON.stringify({ orderId, ...input }) });
  return payload.guest;
}

export async function deleteGuest(guestId, orderId, accessToken = '') {
  if (commerceDemoMode) return localDeleteGuest(guestId);
  assertCommerceAvailable();
  const headers = accessToken ? { 'X-Order-Token': accessToken } : await sessionHeaders();
  return request('/api/guests', { method: 'DELETE', headers, body: JSON.stringify({ id: guestId, orderId }) });
}

export async function getAdminPreviewUrl(order) {
  return getOrderPreviewUrl(order.id);
}

export async function getOrderPreviewUrl(orderId, accessToken = '') {
  if (commerceDemoMode) {
    const order = localGetOrder(orderId);
    const token = order.preview_token || order.access_token || accessToken;
    return `${window.location.origin}/w/${order.invitation.slug}?preview=${encodeURIComponent(token)}`;
  }
  assertCommerceAvailable();
  const payload = await request('/api/preview', {
    method: 'POST',
    headers: accessToken ? { 'X-Order-Token': accessToken } : await sessionHeaders(),
    body: JSON.stringify({ orderId }),
  });
  return payload.url;
}

export async function getInvitation(slug, preview = '', guest = '') {
  if (commerceDemoMode) return localGetInvitation(slug, preview, guest);
  assertCommerceAvailable();
  const query = new URLSearchParams({ slug });
  if (preview) query.set('preview', preview);
  if (guest) query.set('guest', guest);
  const payload = await request(`/api/invitation?${query}`);
  return payload.invitation;
}

export async function submitRsvp(input) {
  if (commerceDemoMode) return localSubmitRsvp(input);
  assertCommerceAvailable();
  return request('/api/rsvps', { method: 'POST', body: JSON.stringify(input) });
}

export async function submitWish(input) {
  if (commerceDemoMode) return localSubmitWish(input);
  assertCommerceAvailable();
  return request('/api/wishes', { method: 'POST', body: JSON.stringify(input) });
}

export async function moderateWish(wishId, isApproved, orderId, accessToken = '') {
  if (commerceDemoMode) return localModerateWish(wishId, isApproved);
  assertCommerceAvailable();
  const headers = accessToken ? { 'X-Order-Token': accessToken } : await sessionHeaders();
  const payload = await request('/api/wishes', {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ wishId, isApproved, orderId }),
  });
  return payload.wish;
}

export async function getRsvps(orderId, accessToken = '') {
  if (commerceDemoMode) return localGetRsvps(localGetOrder(orderId).invitation.id);
  assertCommerceAvailable();
  const headers = accessToken ? { 'X-Order-Token': accessToken } : await sessionHeaders();
  const response = await fetch(`/api/export?orderId=${encodeURIComponent(orderId)}`, { headers });
  if (!response.ok) throw new Error('Không thể xuất RSVP.');
  return response.blob();
}

export async function downloadRsvpCsv(orderId, fileName = 'rsvp.csv', accessToken = '') {
  if (commerceDemoMode) {
    const invitationId = localGetOrder(orderId).invitation.id;
    const values = localGetRsvps(invitationId);
    const rows = [['Họ và tên', 'Số điện thoại', 'Tham dự', 'Số người', 'Lời nhắn', 'Thời gian'], ...values.map((item) => [item.full_name, item.phone, item.attendance, item.party_size, item.note, item.created_at])];
    const csv = `\uFEFF${rows.map((row) => row.map(csvCell).join(',')).join('\r\n')}`;
    triggerDownload(new Blob([csv], { type: 'text/csv;charset=utf-8' }), fileName);
    return;
  }
  assertCommerceAvailable();
  triggerDownload(await getRsvps(orderId, accessToken), fileName);
}

function csvCell(value) {
  let text = String(value ?? '');
  if (/^[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replaceAll('"', '""')}"`;
}

export function downloadGuestCsv(guests, fileName = 'danh-sach-khach.csv') {
  const rows = [['Họ và tên', 'Số điện thoại', 'Nhóm khách', 'Số người mời', 'Link cá nhân hóa'], ...(guests || []).map((guest) => [guest.full_name, guest.phone, guest.group_name, guest.invited_count, guest.personal_url])];
  const csv = `\uFEFF${rows.map((row) => row.map(csvCell).join(',')).join('\r\n')}`;
  triggerDownload(new Blob([csv], { type: 'text/csv;charset=utf-8' }), fileName);
}

export function triggerDownload(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
