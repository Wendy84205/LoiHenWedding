import { describe, expect, it } from 'vitest';
import { createOrderSchema, registerAssetSchema, uploadSchema } from './validators.js';

const orderInput = {
  fullName: 'Nguyen Van A',
  email: 'a@example.com',
  phone: '0900000000',
  zalo: '',
  packageCode: 'basic',
  templateSlug: 'thiep-cuoi-44',
  groomName: 'Minh',
  brideName: 'An',
  eventDate: '2027-12-15',
  eventTime: '10:30',
  venueName: 'Loi Hen Palace',
  address: 'Ha Noi',
  mapUrl: 'https://maps.google.com/?q=Ha+Noi',
  invitationMessage: '',
  customerNote: '',
  consent: true,
  website: '',
};

const uploadInput = {
  orderId: '9ca34dbd-a459-4857-b833-4c1f3ab726be',
  fileName: 'wedding.webp',
  contentType: 'image/webp',
  byteSize: 1024,
  kind: 'hero',
};

describe('commerce input validators', () => {
  it('only accepts HTTPS map links', () => {
    expect(createOrderSchema.parse(orderInput).mapUrl).toBe(orderInput.mapUrl);
    expect(() => createOrderSchema.parse({ ...orderInput, mapUrl: 'javascript:alert(1)' })).toThrow('HTTPS');
    expect(() => createOrderSchema.parse({ ...orderInput, mapUrl: 'http://maps.example.com' })).toThrow('HTTPS');
  });

  it('keeps audio and image roles compatible', () => {
    expect(uploadSchema.parse(uploadInput)).toMatchObject(uploadInput);
    expect(uploadSchema.parse({ ...uploadInput, kind: 'music', contentType: 'audio/mpeg', fileName: 'song.mp3' }))
      .toMatchObject({ kind: 'music', contentType: 'audio/mpeg' });
    expect(() => uploadSchema.parse({ ...uploadInput, kind: 'music' })).toThrow('âm thanh');
    expect(() => uploadSchema.parse({ ...uploadInput, contentType: 'audio/mpeg' })).toThrow('không thể dùng');
  });

  it('requires a server-issued upload reservation when registering a file', () => {
    expect(() => registerAssetSchema.parse({
      ...uploadInput,
      storagePath: `${uploadInput.orderId}/hero/file.webp`,
    })).toThrow();
    expect(registerAssetSchema.parse({
      ...uploadInput,
      uploadId: 'f843611a-71a4-4bd0-85f9-58c0bd5aa627',
      storagePath: `${uploadInput.orderId}/hero/file.webp`,
    }).uploadId).toBe('f843611a-71a4-4bd0-85f9-58c0bd5aa627');
  });
});

