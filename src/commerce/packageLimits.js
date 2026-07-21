import { commercePackages } from './invitationContent.js';

export const imageAssetKinds = new Set(['hero', 'bride', 'groom', 'couple', 'venue', 'final', 'gallery', 'social', 'gift_qr']);
export const paymentProofLimits = Object.freeze({ files: 3, storageBytes: 30 * 1024 * 1024 });

export function getPackageUsage(packageCode, assets = [], guestCount = 0) {
  const packageInfo = commercePackages[packageCode] || commercePackages.basic;
  const designAssets = assets.filter((asset) => asset.kind !== 'payment_proof');
  return {
    packageInfo,
    assets: designAssets.length,
    images: designAssets.filter((asset) => imageAssetKinds.has(asset.kind)).length,
    storageBytes: designAssets.reduce((sum, asset) => sum + Number(asset.byte_size || 0), 0),
    paymentProofs: assets.filter((asset) => asset.kind === 'payment_proof').length,
    paymentProofBytes: assets
      .filter((asset) => asset.kind === 'payment_proof')
      .reduce((sum, asset) => sum + Number(asset.byte_size || 0), 0),
    guests: Number(guestCount || 0),
  };
}

export function assertPackageAssetQuota(packageCode, assets, nextAsset) {
  const usage = getPackageUsage(packageCode, assets);
  if (nextAsset.kind === 'payment_proof') {
    if (usage.paymentProofs + 1 > paymentProofLimits.files) {
      const error = new Error(`Mỗi đơn hàng hỗ trợ tối đa ${paymentProofLimits.files} biên nhận thanh toán.`);
      error.statusCode = 409;
      throw error;
    }
    if (usage.paymentProofBytes + Number(nextAsset.byteSize || 0) > paymentProofLimits.storageBytes) {
      const error = new Error('Tổng dung lượng biên nhận thanh toán vượt quá 30 MB.');
      error.statusCode = 413;
      throw error;
    }
    return usage;
  }
  const limits = usage.packageInfo.limits;
  if (usage.assets + 1 > limits.assets) {
    const error = new Error(`Gói ${usage.packageInfo.name} hỗ trợ tối đa ${limits.assets} tư liệu.`);
    error.statusCode = 409;
    throw error;
  }
  if (imageAssetKinds.has(nextAsset.kind) && usage.images + 1 > limits.images) {
    const error = new Error(`Gói ${usage.packageInfo.name} hỗ trợ tối đa ${limits.images} ảnh.`);
    error.statusCode = 409;
    throw error;
  }
  if (usage.storageBytes + Number(nextAsset.byteSize || 0) > limits.storageBytes) {
    const error = new Error(`Dung lượng tư liệu đã vượt giới hạn của gói ${usage.packageInfo.name}.`);
    error.statusCode = 413;
    throw error;
  }
  return usage;
}

export function assertPackageGuestQuota(packageCode, guestCount, additionalGuests = 1) {
  const packageInfo = commercePackages[packageCode] || commercePackages.basic;
  if (Number(guestCount || 0) + Number(additionalGuests || 0) > packageInfo.limits.guests) {
    const error = new Error(`Gói ${packageInfo.name} hỗ trợ tối đa ${packageInfo.limits.guests} khách cá nhân hóa.`);
    error.statusCode = 409;
    throw error;
  }
  return packageInfo.limits.guests;
}

export function formatStorage(value) {
  const bytes = Number(value || 0);
  if (bytes >= 1073741824) return `${(bytes / 1073741824).toFixed(bytes % 1073741824 ? 1 : 0)} GB`;
  return `${Math.ceil(bytes / 1048576)} MB`;
}
