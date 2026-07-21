import { describe, expect, it } from 'vitest';
import {
  DEFAULT_INVITATION_MUSIC, getActiveInvitationMusic, getInvitationMusicAssetId,
  invitationMusicAssetValue, invitationMusicLibrary,
} from './invitationMusic.js';

describe('invitation music sources', () => {
  it('keeps the bundled music catalog unique and uses the harp track by default', () => {
    expect(invitationMusicLibrary).toHaveLength(4);
    expect(new Set(invitationMusicLibrary.map((track) => track.src)).size).toBe(4);
    expect(getActiveInvitationMusic('', [])).toBe(DEFAULT_INVITATION_MUSIC);
  });

  it('stores uploaded selections as stable asset references', () => {
    const value = invitationMusicAssetValue('asset-id');
    expect(value).toBe('asset:asset-id');
    expect(getInvitationMusicAssetId(value)).toBe('asset-id');
    expect(getActiveInvitationMusic('', [{ id: 'newest', kind: 'music' }])).toBe('asset:newest');
  });
});
