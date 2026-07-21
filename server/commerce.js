import crypto from 'node:crypto';
import { createClient } from '@supabase/supabase-js';
import { assertPackageAssetQuota, assertPackageGuestQuota } from '../src/commerce/packageLimits.js';
import { getNotificationConfiguration } from './notifications.js';

function hasMeaningfulValue(value, minimumLength = 1) {
  const normalized = String(value || '').trim();
  return normalized.length >= minimumLength && !/^(?:change-me|replace-me|example|todo|your[-_])/i.test(normalized);
}

function isSecureHttpUrl(value) {
  try {
    const url = new URL(String(value || ''));
    return url.protocol === 'https:' || (url.protocol === 'http:' && ['127.0.0.1', 'localhost'].includes(url.hostname));
  } catch {
    return false;
  }
}

export function getCommerceConfigurationStatus(environment = process.env) {
  const checks = {
    supabaseUrl: isSecureHttpUrl(environment.SUPABASE_URL),
    serviceRole: hasMeaningfulValue(environment.SUPABASE_SERVICE_ROLE_KEY, 32),
    signingSalt: hasMeaningfulValue(environment.DATA_HASH_SALT, 32),
    publicSite: isSecureHttpUrl(environment.PUBLIC_SITE_URL),
    bankTransfer: [environment.VITE_BANK_NAME, environment.VITE_BANK_ACCOUNT, environment.VITE_BANK_OWNER]
      .every((value) => hasMeaningfulValue(value, 2)),
    googleOAuth: String(environment.GOOGLE_OAUTH_ENABLED || '').toLowerCase() === 'true',
    cronSecret: hasMeaningfulValue(environment.CRON_SECRET, 32),
    emailNotifications: getNotificationConfiguration(environment).configured,
  };
  const backendConfigured = checks.supabaseUrl && checks.serviceRole && checks.signingSalt;
  const productionConfigured = backendConfigured
    && checks.publicSite
    && checks.bankTransfer
    && checks.googleOAuth
    && checks.cronSecret
    && checks.emailNotifications;
  return {
    checks,
    backendConfigured,
    productionConfigured,
    missing: Object.entries(checks).filter(([, ready]) => !ready).map(([name]) => name),
  };
}

export function hasCommerceEnvironment() {
  return getCommerceConfigurationStatus().backendConfigured;
}

export function getServiceClient() {
  if (!hasCommerceEnvironment()) {
    const error = new Error('Commerce backend is not configured.');
    error.statusCode = 503;
    throw error;
  }

  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function probeCommerceRuntime(supabase = getServiceClient()) {
  const results = await Promise.allSettled([
    supabase.from('invitations').select('id, design, draft_design', { count: 'exact', head: true }).limit(1),
    supabase.from('asset_upload_reservations').select('id', { count: 'exact', head: true }).limit(1),
    supabase.from('asset_cleanup_jobs').select('id', { count: 'exact', head: true }).limit(1),
    supabase.storage.getBucket('order-assets'),
    supabase.auth.admin.listUsers({ page: 1, perPage: 1 }),
  ]);
  const succeeded = (result) => result.status === 'fulfilled' && !result.value?.error;
  return {
    checked: true,
    database: succeeded(results[0]),
    schema: succeeded(results[1]) && succeeded(results[2]),
    storage: succeeded(results[3]),
    auth: succeeded(results[4]),
  };
}

export function createAccessToken() {
  return crypto.randomBytes(32).toString('base64url');
}

function previewSignature(payload) {
  return crypto.createHmac('sha256', process.env.DATA_HASH_SALT || 'local-development').update(payload).digest('base64url');
}

export function secureTextEqual(left, right) {
  const leftBuffer = Buffer.from(String(left || ''), 'utf8');
  const rightBuffer = Buffer.from(String(right || ''), 'utf8');
  return leftBuffer.length === rightBuffer.length && crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

export function createAdminPreviewToken(invitationId, expiresInSeconds = 3600) {
  const payload = Buffer.from(JSON.stringify({ invitationId, expiresAt: Date.now() + expiresInSeconds * 1000 })).toString('base64url');
  return `admin.${payload}.${previewSignature(payload)}`;
}

export function verifyAdminPreviewToken(token, invitationId) {
  const [prefix, payload, signature] = String(token || '').split('.');
  if (prefix !== 'admin' || !payload || !signature) return false;
  const expected = previewSignature(payload);
  if (!secureTextEqual(signature, expected)) return false;
  try {
    const value = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return value.invitationId === invitationId && Number(value.expiresAt) > Date.now();
  } catch {
    return false;
  }
}

export function createGuestToken(guestId, invitationId) {
  const payload = Buffer.from(JSON.stringify({ guestId, invitationId })).toString('base64url');
  return `guest.${payload}.${previewSignature(payload)}`;
}

export function verifyGuestToken(token, invitationId) {
  const [prefix, payload, signature] = String(token || '').split('.');
  if (prefix !== 'guest' || !payload || !signature) return '';
  const expected = previewSignature(payload);
  if (!secureTextEqual(signature, expected)) return '';
  try {
    const value = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return value.invitationId === invitationId ? String(value.guestId || '') : '';
  } catch {
    return '';
  }
}

export function hashValue(value) {
  return crypto
    .createHash('sha256')
    .update(`${process.env.DATA_HASH_SALT || 'local-development'}:${String(value || '')}`)
    .digest('hex');
}

export function createPublicOrderId() {
  const date = new Date().toISOString().slice(0, 10).replaceAll('-', '');
  return `LH-${date}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
}

export function createPublicConsultationId() {
  const date = new Date().toISOString().slice(0, 10).replaceAll('-', '');
  return `LH-TV-${date}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
}

export function getBearerToken(req) {
  const header = req.headers.authorization || '';
  return header.startsWith('Bearer ') ? header.slice(7).trim() : '';
}

export function isCronAuthorized(req, environment = process.env) {
  const expected = environment.CRON_SECRET;
  return hasMeaningfulValue(expected, 32)
    && secureTextEqual(req.headers.authorization || '', `Bearer ${expected}`);
}

export async function requireUser(req, supabase = getServiceClient()) {
  const token = getBearerToken(req);
  if (!token) {
    const error = new Error('Vui lòng đăng nhập tài khoản.');
    error.statusCode = 401;
    throw error;
  }
  const { data, error: authError } = await supabase.auth.getUser(token);
  if (authError || !data.user) {
    const error = new Error('Phiên đăng nhập không hợp lệ hoặc đã hết hạn.');
    error.statusCode = 401;
    throw error;
  }
  return data.user;
}

export function getOrderToken(req) {
  const header = req.headers['x-order-token'];
  const headerToken = Array.isArray(header) ? header[0] : header;
  return String(headerToken || req.body?.accessToken || req.query?.token || '').trim();
}

export async function requireAdmin(req, supabase = getServiceClient()) {
  const user = await requireUser(req, supabase);

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, role, display_name')
    .eq('id', user.id)
    .single();

  if (profileError || !profile || !['admin', 'staff'].includes(profile.role)) {
    const error = new Error('This account cannot access the admin area.');
    error.statusCode = 403;
    throw error;
  }

  return { user, profile };
}

export function getClientAddress(req) {
  const forwarded = req.headers['x-forwarded-for'];
  const address = Array.isArray(forwarded) ? forwarded[0] : String(forwarded || '').split(',')[0];
  return address.trim() || req.socket?.remoteAddress || 'unknown';
}

export function getPublicOrigin() {
  const candidate = process.env.PUBLIC_SITE_URL || 'https://thiep-moi-online.vercel.app';
  try {
    const url = new URL(candidate);
    if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Invalid public URL protocol.');
    return url.origin;
  } catch {
    return 'https://thiep-moi-online.vercel.app';
  }
}

export function setApiHeaders(res, methods = 'GET, POST, PATCH, OPTIONS') {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Methods', methods);
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type, X-Order-Token');
  res.setHeader('X-Content-Type-Options', 'nosniff');
}

export function sendError(res, error) {
  const validationError = error?.name === 'ZodError';
  const status = validationError ? 400 : Number(error.statusCode) || 500;
  const requestId = status >= 500 ? crypto.randomUUID() : '';
  const message = validationError
    ? `Dữ liệu không hợp lệ: ${error.issues?.[0]?.message || 'vui lòng kiểm tra lại thông tin.'}`
    : status >= 500 && status !== 503 ? 'Không thể xử lý yêu cầu lúc này.' : error.message;
  if (requestId) {
    console.error(`[commerce:${requestId}]`, {
      name: error?.name,
      code: error?.code,
      message: error?.message,
      stack: error?.stack,
    });
  }
  res.status(status).json({ error: message, ...(requestId ? { requestId } : {}) });
}

export function allowMethod(req, res, methods) {
  setApiHeaders(res, `${methods.join(', ')}, OPTIONS`);
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return false;
  }
  if (!methods.includes(req.method)) {
    res.setHeader('Allow', methods.join(', '));
    res.status(405).json({ error: 'Method not allowed.' });
    return false;
  }
  return true;
}

export async function verifyOrderAccess(supabase, orderId, token) {
  if (!orderId || !token) return null;
  const { data, error } = await supabase
    .from('orders')
    .select('id, access_token_hash')
    .eq('id', orderId)
    .single();
  if (error || !data || !secureTextEqual(data.access_token_hash, hashValue(token))) return null;
  return data;
}

export async function authorizeOrderAccess(req, supabase, orderId) {
  if (getBearerToken(req)) {
    const user = await requireUser(req, supabase);
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).maybeSingle();
    if (profile && ['admin', 'staff'].includes(profile.role)) return 'staff';

    const { data: order, error: orderError } = await supabase.from('orders').select('customer_id').eq('id', orderId).single();
    if (!orderError && order) {
      const { data: customer } = await supabase.from('customers').select('auth_user_id').eq('id', order.customer_id).single();
      if (customer?.auth_user_id === user.id) return 'customer';
    }
  } else if (await verifyOrderAccess(supabase, orderId, getOrderToken(req))) {
    return 'customer';
  }

  const forbidden = new Error('Bạn không có quyền truy cập đơn hàng này.');
  forbidden.statusCode = 403;
  throw forbidden;
}

export async function enforceAssetQuota(supabase, orderId, kind, byteSize, excludeReservationId = '') {
  let reservationQuery = supabase
    .from('asset_upload_reservations')
    .select('id, kind, byte_size')
    .eq('order_id', orderId)
    .eq('status', 'pending')
    .gt('expires_at', new Date().toISOString());
  if (excludeReservationId) reservationQuery = reservationQuery.neq('id', excludeReservationId);
  const [
    { data: order, error: orderError },
    { data: assets, error: assetsError },
    { data: reservations, error: reservationsError },
  ] = await Promise.all([
    supabase.from('orders').select('package_code').eq('id', orderId).single(),
    supabase.from('assets').select('kind, byte_size').eq('order_id', orderId),
    reservationQuery,
  ]);
  if (orderError || !order) {
    const notFound = new Error('Không tìm thấy đơn hàng.');
    notFound.statusCode = 404;
    throw notFound;
  }
  if (assetsError) throw assetsError;
  if (reservationsError) throw reservationsError;
  return assertPackageAssetQuota(order.package_code, [...(assets || []), ...(reservations || [])], { kind, byteSize });
}

export async function enforceGuestQuota(supabase, orderId, invitationId) {
  const [{ data: order, error: orderError }, { count, error: countError }] = await Promise.all([
    supabase.from('orders').select('package_code').eq('id', orderId).single(),
    supabase.from('guests').select('id', { count: 'exact', head: true }).eq('invitation_id', invitationId),
  ]);
  if (orderError || !order) {
    const notFound = new Error('Không tìm thấy đơn hàng.');
    notFound.statusCode = 404;
    throw notFound;
  }
  if (countError) throw countError;
  return assertPackageGuestQuota(order.package_code, count || 0);
}

export async function signAssetUrls(supabase, assets = [], expiresIn = 3600) {
  return Promise.all(assets.map(async (asset) => {
    const { data, error } = await supabase.storage
      .from(asset.storage_bucket)
      .createSignedUrl(asset.storage_path, expiresIn);
    return { ...asset, signed_url: error ? '' : data.signedUrl };
  }));
}
