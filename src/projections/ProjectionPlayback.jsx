import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Maximize2, Minimize2, Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import './projectionPlayback.css';

const TICK_RATE = 80;

function formatTime(milliseconds) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function useProjectionPlayback({ length, sceneDuration = 7000, pageClass }) {
  const [playback, setPlayback] = useState({ index: 0, elapsed: 0, direction: 1 });
  const [playing, setPlaying] = useState(true);
  const [presenting, setPresenting] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const lastTick = useRef(0);

  useEffect(() => {
    if (!pageClass) return undefined;
    document.documentElement.classList.add(pageClass);
    document.body.classList.add(pageClass);
    return () => {
      document.documentElement.classList.remove(pageClass);
      document.body.classList.remove(pageClass);
    };
  }, [pageClass]);

  useEffect(() => {
    if (!playing) {
      lastTick.current = 0;
      return undefined;
    }

    const timer = window.setInterval(() => {
      const now = performance.now();
      const delta = lastTick.current ? now - lastTick.current : TICK_RATE;
      lastTick.current = now;
      setPlayback((current) => {
        const nextElapsed = current.elapsed + delta;
        if (nextElapsed < sceneDuration) return { ...current, elapsed: nextElapsed };
        const advancedScenes = Math.max(1, Math.floor(nextElapsed / sceneDuration));
        return {
          index: (current.index + advancedScenes) % length,
          elapsed: nextElapsed % sceneDuration,
          direction: 1,
        };
      });
    }, TICK_RATE);

    return () => {
      window.clearInterval(timer);
      lastTick.current = 0;
    };
  }, [length, playing, sceneDuration]);

  const goTo = useCallback((index, direction = 1, elapsed = 0) => {
    const normalizedIndex = ((index % length) + length) % length;
    setPlayback({
      index: normalizedIndex,
      elapsed: Math.max(0, Math.min(sceneDuration - 1, elapsed)),
      direction,
    });
    lastTick.current = performance.now();
  }, [length, sceneDuration]);

  const previous = useCallback(() => goTo(playback.index - 1, -1), [goTo, playback.index]);
  const next = useCallback(() => goTo(playback.index + 1, 1), [goTo, playback.index]);
  const togglePlaying = useCallback(() => setPlaying((value) => !value), []);

  const totalDuration = length * sceneDuration;
  const currentTime = playback.index * sceneDuration + playback.elapsed;
  const totalProgress = totalDuration ? (currentTime / totalDuration) * 100 : 0;

  const seek = useCallback((fraction) => {
    const clamped = Math.max(0, Math.min(0.999999, fraction));
    const target = clamped * totalDuration;
    const index = Math.floor(target / sceneDuration);
    const elapsed = target - index * sceneDuration;
    goTo(index, index >= playback.index ? 1 : -1, elapsed);
  }, [goTo, playback.index, sceneDuration, totalDuration]);

  const toggleFullscreen = useCallback(async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen?.();
      setPresenting(false);
      return;
    }
    if (!document.documentElement.requestFullscreen) {
      setPresenting((value) => !value);
      return;
    }
    try {
      await document.documentElement.requestFullscreen();
      try {
        await window.screen?.orientation?.lock?.('landscape');
      } catch {
        // Orientation lock is optional and unsupported on many desktop/TV browsers.
      }
    } catch {
      setPresenting(true);
    }
  }, []);

  useEffect(() => {
    const syncFullscreen = () => setPresenting(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', syncFullscreen);
    return () => document.removeEventListener('fullscreenchange', syncFullscreen);
  }, []);

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'ArrowLeft') previous();
      if (event.key === 'ArrowRight') next();
      if (event.key === ' ') {
        event.preventDefault();
        togglePlaying();
      }
      if (event.key.toLowerCase() === 'f') toggleFullscreen();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [next, previous, toggleFullscreen, togglePlaying]);

  useEffect(() => {
    if (!presenting || !playing) {
      setControlsVisible(true);
      return undefined;
    }

    let hideTimer;
    const showControls = () => {
      setControlsVisible(true);
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => setControlsVisible(false), 2400);
    };
    showControls();
    window.addEventListener('pointermove', showControls);
    window.addEventListener('pointerdown', showControls);
    return () => {
      window.clearTimeout(hideTimer);
      window.removeEventListener('pointermove', showControls);
      window.removeEventListener('pointerdown', showControls);
    };
  }, [playing, presenting]);

  return useMemo(() => ({
    activeIndex: playback.index,
    direction: playback.direction,
    sceneProgress: (playback.elapsed / sceneDuration) * 100,
    totalProgress,
    currentTime,
    totalDuration,
    playing,
    presenting,
    controlsVisible,
    previous,
    next,
    goTo,
    seek,
    togglePlaying,
    toggleFullscreen,
  }), [
    controlsVisible,
    currentTime,
    goTo,
    next,
    playback.direction,
    playback.elapsed,
    playback.index,
    playing,
    presenting,
    previous,
    sceneDuration,
    seek,
    toggleFullscreen,
    togglePlaying,
    totalDuration,
    totalProgress,
  ]);
}

export function ProjectionTransport({ player, className = '', label = 'Trình chiếu ảnh cưới' }) {
  return (
    <div className={`projectionTransport ${className}`} aria-label={`${label} - điều khiển phát`}>
      <button type="button" onClick={player.previous} aria-label="Ảnh trước" title="Ảnh trước">
        <SkipBack size={17} />
      </button>
      <button className="projectionTransportPlay" type="button" onClick={player.togglePlaying} aria-label={player.playing ? 'Tạm dừng' : 'Tiếp tục phát'} title={player.playing ? 'Tạm dừng' : 'Phát'}>
        {player.playing ? <Pause size={18} /> : <Play size={18} />}
      </button>
      <button type="button" onClick={player.next} aria-label="Ảnh tiếp theo" title="Ảnh tiếp theo">
        <SkipForward size={17} />
      </button>
      <time>{formatTime(player.currentTime)}</time>
      <input
        className="projectionTransportTimeline"
        type="range"
        min="0"
        max="1000"
        value={Math.round(player.totalProgress * 10)}
        onChange={(event) => player.seek(Number(event.target.value) / 1000)}
        style={{ '--projection-played': `${player.totalProgress}%` }}
        aria-label="Tiến trình video trình chiếu"
      />
      <time>{formatTime(player.totalDuration)}</time>
      <button type="button" onClick={player.toggleFullscreen} aria-label={player.presenting ? 'Thoát toàn màn hình' : 'Phát toàn màn hình'} title={player.presenting ? 'Thoát toàn màn hình' : 'Toàn màn hình TV/LED'}>
        {player.presenting ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
      </button>
    </div>
  );
}
