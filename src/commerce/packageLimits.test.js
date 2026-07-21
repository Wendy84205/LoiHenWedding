import { describe, expect, it } from 'vitest';
import { assertPackageAssetQuota, assertPackageGuestQuota, formatStorage, getPackageUsage } from './packageLimits.js';

describe('commerce package limits', () => {
  it('counts design assets without charging payment evidence', () => {
    const usage = getPackageUsage('basic', [
      { kind: 'gallery', byte_size: 1000 },
      { kind: 'music', byte_size: 2000 },
      { kind: 'payment_proof', byte_size: 3000 },
    ], 12);
    expect(usage.assets).toBe(2);
    expect(usage.images).toBe(1);
    expect(usage.storageBytes).toBe(3000);
    expect(usage.paymentProofs).toBe(1);
    expect(usage.paymentProofBytes).toBe(3000);
    expect(usage.guests).toBe(12);
  });

  it('caps payment evidence independently from package media', () => {
    const proofs = Array.from({ length: 3 }, () => ({ kind: 'payment_proof', byte_size: 1024 }));
    expect(() => assertPackageAssetQuota('basic', proofs, { kind: 'payment_proof', byteSize: 1024 }))
      .toThrow('tối đa 3 biên nhận');
    expect(() => assertPackageAssetQuota('basic', [
      { kind: 'payment_proof', byte_size: 25 * 1024 * 1024 },
    ], { kind: 'payment_proof', byteSize: 6 * 1024 * 1024 })).toThrow('vượt quá 30 MB');
  });

  it('rejects new images after the package limit', () => {
    const assets = Array.from({ length: 15 }, (_, index) => ({ kind: 'gallery', byte_size: index + 1 }));
    expect(() => assertPackageAssetQuota('basic', assets, { kind: 'gallery', byteSize: 100 }))
      .toThrow('tối đa 15 ảnh');
  });

  it('formats commercial storage limits', () => {
    expect(formatStorage(104857600)).toBe('100 MB');
    expect(formatStorage(1073741824)).toBe('1 GB');
  });

  it('enforces personalized guest limits', () => {
    expect(() => assertPackageGuestQuota('basic', 100, 1)).toThrow('tối đa 100 khách');
    expect(assertPackageGuestQuota('premium', 499, 1)).toBe(500);
  });
});
