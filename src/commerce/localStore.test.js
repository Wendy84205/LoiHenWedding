// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  localAddAsset, localClaimCustomerOrder, localCreateOrder, localDeleteAsset, localGetInvitation,
  localGetOrder, localListCustomerOrders, localListInvitationVersions,
  localPublishOrder, localRestoreInvitationVersion, localSaveInvitationDraft,
  localSelfPublishOrder, localSwitchInvitationTemplate, localUpdateAssetKind, localUpdateOrder,
} from './localStore.js';
import { patchSceneNode } from './scene/sceneSchema.js';
import { getSceneTemplate } from './scene/sceneTemplates.js';

function createPaidOrder() {
  const created = localCreateOrder(orderInput);
  localUpdateOrder(created.orderId, { depositStatus: 'paid' });
  return created;
}

const orderInput = {
  fullName: 'Nguyễn An',
  email: 'an@example.com',
  phone: '0901234567',
  zalo: '',
  groomName: 'Đức Anh',
  brideName: 'Hà My',
  eventDate: '2027-08-21',
  eventTime: '17:30',
  venueName: 'Lời Hẹn Palace',
  address: 'Hà Nội',
  mapUrl: '',
  invitationMessage: 'Trân trọng kính mời.',
  packageCode: 'basic',
  templateSlug: 'thiep-cuoi-44',
  customerNote: '',
};

describe('local commerce draft versions', () => {
  beforeEach(() => {
    const values = new Map();
    vi.stubGlobal('localStorage', {
      getItem: (key) => values.get(key) ?? null,
      setItem: (key, value) => values.set(key, String(value)),
      removeItem: (key) => values.delete(key),
      clear: () => values.clear(),
      key: (index) => [...values.keys()][index] ?? null,
      get length() { return values.size; },
    });
  });

  it('keeps published content isolated from later draft changes', () => {
    const created = createPaidOrder();
    const order = localGetOrder(created.orderId);
    const firstDraft = structuredClone(order.invitation.content);
    firstDraft.couple.groomName = 'Anh Khoa';
    localSaveInvitationDraft(created.orderId, firstDraft, { hiddenLayers: ['story'], motion: 'reduced' }, 1);
    localPublishOrder(created.orderId, order.invitation.slug, order.expires_at);

    const secondDraft = structuredClone(firstDraft);
    secondDraft.couple.groomName = 'Minh Quân';
    localSaveInvitationDraft(created.orderId, secondDraft, { hiddenLayers: ['event'], motion: 'full' }, 2);

    const live = localGetInvitation(order.invitation.slug);
    const preview = localGetInvitation(order.invitation.slug, created.previewToken);
    expect(live.content.couple.groomName).toBe('Anh Khoa');
    expect(live.theme).toMatchObject({ hiddenLayers: ['story'], motion: 'reduced', palette: 'original', font: 'original' });
    expect(preview.content.couple.groomName).toBe('Minh Quân');
    expect(preview.theme).toMatchObject({ hiddenLayers: ['event'], motion: 'full', palette: 'original', font: 'original' });
  });

  it('versions, publishes and restores scene patches with the invitation', () => {
    const created = createPaidOrder();
    const order = localGetOrder(created.orderId);
    const template = getSceneTemplate(order.template_slug);
    const textNode = template.nodes.find((node) => node.type === 'text');
    const firstDesign = patchSceneNode(order.invitation.design, template, textNode.id, { x: textNode.x + 12 });
    localSaveInvitationDraft(created.orderId, order.invitation.content, order.invitation.theme, firstDesign, 1);
    localPublishOrder(created.orderId, order.invitation.slug, order.expires_at);
    const secondDesign = patchSceneNode(firstDesign, template, textNode.id, { x: textNode.x + 30 });
    localSaveInvitationDraft(created.orderId, order.invitation.content, order.invitation.theme, secondDesign, 2);

    expect(localGetInvitation(order.invitation.slug).design.nodeOverrides[textNode.id].x).toBe(textNode.x + 12);
    expect(localGetInvitation(order.invitation.slug, created.previewToken).design.nodeOverrides[textNode.id].x).toBe(textNode.x + 30);
    const restored = localRestoreInvitationVersion(created.orderId, 2);
    expect(restored.design.nodeOverrides[textNode.id].x).toBe(textNode.x + 12);
  });

  it('gives the seeded published order a private draft preview', () => {
    const seeded = localListCustomerOrders('demo-customer')[0];
    localSaveInvitationDraft(seeded.id, seeded.invitation.content, {
      hiddenLayers: [], motion: 'full', palette: 'sage', font: 'modern',
      colors: { surface: '', ink: '', accent: '' },
    }, seeded.invitation.draft_version);
    const preview = localGetInvitation(seeded.invitation.slug, seeded.preview_token);
    const live = localGetInvitation(seeded.invitation.slug);
    expect(seeded.preview_token).toHaveLength(64);
    expect(preview.theme.palette).toBe('sage');
    expect(live.theme.palette).toBe('original');
  });

  it('switches layout as a new version without losing invitation data', () => {
    const created = createPaidOrder();
    const before = localGetOrder(created.orderId);
    const result = localSwitchInvitationTemplate(created.orderId, 'thiep-cuoi-61');
    const after = localGetOrder(created.orderId);
    expect(result).toMatchObject({ templateSlug: 'thiep-cuoi-61', version: 2 });
    expect(after.template_slug).toBe('thiep-cuoi-61');
    expect(after.invitation.template_slug).toBe('thiep-cuoi-61');
    expect(after.invitation.content).toEqual(before.invitation.content);
    expect(localListInvitationVersions(created.orderId).versions[0].version).toBe(2);
    const restored = localRestoreInvitationVersion(created.orderId, 1);
    expect(restored.templateSlug).toBe('thiep-cuoi-44');
    expect(localGetOrder(created.orderId).template_slug).toBe('thiep-cuoi-44');
  });

  it('restores an old draft as a new version without deleting newer history', () => {
    const created = createPaidOrder();
    const original = localGetOrder(created.orderId).invitation.content;
    const second = structuredClone(original);
    second.couple.brideName = 'Lan Anh';
    localSaveInvitationDraft(created.orderId, second, { hiddenLayers: ['story'], motion: 'reduced' }, 1);
    const third = structuredClone(second);
    third.couple.brideName = 'Minh Châu';
    localSaveInvitationDraft(created.orderId, third, { hiddenLayers: ['event'], motion: 'full' }, 2);

    const restored = localRestoreInvitationVersion(created.orderId, 2);
    const history = localListInvitationVersions(created.orderId);
    expect(restored.version).toBe(4);
    expect(restored.content.couple.brideName).toBe('Lan Anh');
    expect(restored.theme).toMatchObject({ hiddenLayers: ['story'], motion: 'reduced', palette: 'original', font: 'original' });
    expect(history.versions.map((item) => item.version)).toEqual([4, 3, 2, 1]);
  });

  it('claims an anonymous order only with its private access token', () => {
    const created = localCreateOrder(orderInput);
    expect(localListCustomerOrders('demo-customer')).toHaveLength(1);
    expect(() => localClaimCustomerOrder(created.orderId, 'invalid', 'demo-customer')).toThrow('không hợp lệ');
    localClaimCustomerOrder(created.orderId, created.accessToken, 'demo-customer');
    expect(localListCustomerOrders('demo-customer').map((order) => order.id)).toContain(created.orderId);
  });

  it('reassigns an uploaded image to a template role', async () => {
    const created = localCreateOrder(orderInput);
    const asset = await localAddAsset(created.orderId, new File(['image'], 'couple.png', { type: 'image/png' }), 'gallery');
    localUpdateAssetKind(created.orderId, asset.id, 'hero');
    const order = localGetOrder(created.orderId);
    expect(order.assets.find((item) => item.id === asset.id).kind).toBe('hero');
    expect(order.invitation.content.media.hero).toBe(asset.signed_url);
    expect(order.invitation.content.media.gallery).not.toContain(asset.signed_url);
  });

  it('stores uploaded music by asset id and resolves it only for playback', async () => {
    const created = localCreateOrder(orderInput);
    const asset = await localAddAsset(created.orderId, new File(['audio'], 'first-dance.mp3', { type: 'audio/mpeg' }), 'music');
    const order = localGetOrder(created.orderId);
    const preview = localGetInvitation(order.invitation.slug, created.previewToken);
    expect(order.invitation.content.media.music).toBe(`asset:${asset.id}`);
    expect(preview.content.media.music).toBe(asset.signed_url);
  });

  it('adds and removes a wedding gift QR from invitation media', async () => {
    const created = localCreateOrder(orderInput);
    const asset = await localAddAsset(created.orderId, new File(['qr'], 'gift.png', { type: 'image/png' }), 'gift_qr');
    expect(localGetOrder(created.orderId).invitation.content.media.giftQr).toBe(asset.signed_url);
    localDeleteAsset(created.orderId, asset.id);
    expect(localGetOrder(created.orderId).invitation.content.media.giftQr).toBe('');
  });

  it('allows a paid single-price order to self-publish after preflight', () => {
    const created = localCreateOrder(orderInput);
    expect(() => localSelfPublishOrder(created.orderId)).toThrow('xác nhận thanh toán');
    localUpdateOrder(created.orderId, { depositStatus: 'paid' });
    const result = localSelfPublishOrder(created.orderId);
    expect(result).toMatchObject({ ok: true, reviewRequired: false, status: 'published' });
    expect(localGetOrder(created.orderId).invitation.status).toBe('published');
  });

  it('normalizes a legacy package request to the single-price plan', () => {
    const created = localCreateOrder({ ...orderInput, packageCode: 'signature' });
    expect(localGetOrder(created.orderId).package_code).toBe('basic');
    expect(localGetOrder(created.orderId).amount_total).toBe(50000);
  });
});
