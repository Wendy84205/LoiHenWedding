import { describe, expect, it } from 'vitest';
import { mergePublicInvitationAssets } from './invitations.js';

describe('public invitation assets', () => {
  it('uses the newest customer uploads instead of sample media', () => {
    const result = mergePublicInvitationAssets({
      media: { hero: '/sample.jpg', gallery: ['/sample-gallery.jpg'] },
    }, [
      { id: 'new', kind: 'hero', signed_url: 'https://cdn.test/new.jpg' },
      { id: 'old', kind: 'hero', signed_url: 'https://cdn.test/old.jpg' },
      { id: 'gallery', kind: 'gallery', signed_url: 'https://cdn.test/gallery.jpg' },
    ]);

    expect(result.content.media.hero).toBe('https://cdn.test/new.jpg');
    expect(result.content.media.gallery).toEqual(['https://cdn.test/gallery.jpg']);
  });

  it('never exposes payment proofs or arbitrary internal files', () => {
    const result = mergePublicInvitationAssets({}, [
      { id: 'proof', kind: 'payment_proof', signed_url: 'https://cdn.test/payment.png' },
      { id: 'other', kind: 'other', signed_url: 'https://cdn.test/private.pdf' },
      { id: 'music', kind: 'music', signed_url: 'https://cdn.test/song.mp3' },
    ]);

    expect(result.assets).toHaveLength(1);
    expect(result.assets[0].kind).toBe('music');
    expect(JSON.stringify(result)).not.toContain('payment.png');
    expect(JSON.stringify(result)).not.toContain('private.pdf');
  });

  it('resolves an explicitly selected upload and respects bundled or disabled music', () => {
    const assets = [
      { id: 'new', kind: 'music', signed_url: 'https://cdn.test/new.mp3' },
      { id: 'chosen', kind: 'music', signed_url: 'https://cdn.test/chosen.mp3' },
    ];

    expect(mergePublicInvitationAssets({ media: { music: 'asset:chosen' } }, assets).content.media.music).toBe('https://cdn.test/chosen.mp3');
    expect(mergePublicInvitationAssets({ media: { music: '/assets/audio/wedding-01.mp3' } }, assets).content.media.music).toBe('/assets/audio/wedding-01.mp3');
    expect(mergePublicInvitationAssets({ media: { music: 'none' } }, assets).content.media.music).toBe('none');
  });

  it('maps the newest public gift asset into the rendered wedding QR', () => {
    const result = mergePublicInvitationAssets({}, [
      { id: 'gift-new', kind: 'gift_qr', signed_url: 'https://cdn.test/gift-new.png' },
      { id: 'gift-old', kind: 'gift_qr', signed_url: 'https://cdn.test/gift-old.png' },
    ]);
    expect(result.content.media.giftQr).toBe('https://cdn.test/gift-new.png');
    expect(result.assets).toHaveLength(2);
  });
});
