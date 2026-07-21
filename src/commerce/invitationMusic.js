export const DEFAULT_INVITATION_MUSIC = '/assets/audio/wedding-harp.mp3';
export const INVITATION_MUSIC_DISABLED = 'none';

const ASSET_PREFIX = 'asset:';

export const invitationMusicLibrary = [
  {
    id: 'wedding-harp',
    name: 'Wedding Harp',
    artist: 'Francisco Alvear',
    duration: '2:21',
    mood: 'Harp lãng mạn',
    src: DEFAULT_INVITATION_MUSIC,
  },
  {
    id: 'wedding-01',
    name: 'Wedding 01',
    artist: 'Francisco Alvear',
    duration: '2:26',
    mood: 'Piano và harp',
    src: '/assets/audio/wedding-01.mp3',
  },
  {
    id: 'possible-dreams',
    name: 'Possible Dreams',
    artist: 'Eugenio Mininni',
    duration: '2:39',
    mood: 'Piano cổ điển',
    src: '/assets/audio/possible-dreams.mp3',
  },
  {
    id: 'forever-in-my-heart',
    name: 'Forever in My Heart',
    artist: 'Michael Ramir C.',
    duration: '2:29',
    mood: 'Acoustic ấm áp',
    src: '/assets/audio/forever-in-my-heart.mp3',
  },
];

export function invitationMusicAssetValue(assetId) {
  return assetId ? `${ASSET_PREFIX}${assetId}` : '';
}

export function getInvitationMusicAssetId(value) {
  const source = String(value || '');
  return source.startsWith(ASSET_PREFIX) ? source.slice(ASSET_PREFIX.length) : '';
}

export function getActiveInvitationMusic(value, audioAssets = []) {
  if (value) return value;
  const latestUpload = audioAssets.find((asset) => asset.kind === 'music' && asset.id);
  return latestUpload ? invitationMusicAssetValue(latestUpload.id) : DEFAULT_INVITATION_MUSIC;
}
