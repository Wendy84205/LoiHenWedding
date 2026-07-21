import React, { useEffect, useRef, useState } from 'react';
import { Music2 } from 'lucide-react';
import { DEFAULT_INVITATION_MUSIC, INVITATION_MUSIC_DISABLED } from '../commerce/invitationMusic.js';

export const DEFAULT_WEDDING_MUSIC = DEFAULT_INVITATION_MUSIC;

export default function WeddingMusicButton({
  className = '',
  playingClassName = 'is-playing',
  src = DEFAULT_WEDDING_MUSIC,
  volume = 0.48,
}) {
  const disabled = src === INVITATION_MUSIC_DISABLED;
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;
    audio.volume = volume;
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [src, volume]);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    setFailed(false);
    try {
      await audio.play();
    } catch {
      setPlaying(false);
      setFailed(true);
    }
  };

  const stateClass = playing ? playingClassName : '';
  const label = failed ? 'Không thể phát nhạc' : playing ? 'Tạm dừng nhạc nền' : 'Phát nhạc nền';

  if (disabled) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="metadata"
        hidden
        data-wedding-music
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => {
          setPlaying(false);
          setFailed(true);
        }}
      />
      <button
        className={`${className} ${stateClass}`.trim()}
        type="button"
        onClick={toggleMusic}
        aria-label={label}
        aria-pressed={playing}
        title={label}
        data-audio-state={failed ? 'error' : playing ? 'playing' : 'paused'}
      >
        <Music2 size={18} />
      </button>
    </>
  );
}
