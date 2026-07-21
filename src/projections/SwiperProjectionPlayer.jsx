import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const UPDATE_INTERVAL = 90;

function isTypingTarget(target) {
  return target instanceof HTMLElement && ['INPUT', 'SELECT', 'TEXTAREA', 'BUTTON'].includes(target.tagName);
}

export function useSwiperProjectionPlayer({ length, sceneDuration, pageClass }) {
  const swiperRef = useRef(null);
  const progressTick = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [presenting, setPresenting] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const reducedMotion = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  useEffect(() => {
    document.documentElement.classList.add(pageClass);
    document.body.classList.add(pageClass);
    return () => {
      document.documentElement.classList.remove(pageClass);
      document.body.classList.remove(pageClass);
    };
  }, [pageClass]);

  const onSwiper = useCallback((swiper) => {
    swiperRef.current = swiper;
    setActiveIndex(swiper.realIndex || 0);
    if (reducedMotion) swiper.autoplay?.stop();
  }, [reducedMotion]);

  const onSlideChange = useCallback((swiper) => {
    setActiveIndex(swiper.realIndex || 0);
    setElapsed(0);
  }, []);

  const onAutoplayTimeLeft = useCallback((_, timeLeft) => {
    const now = performance.now();
    if (now - progressTick.current < UPDATE_INTERVAL) return;
    progressTick.current = now;
    setElapsed(Math.max(0, sceneDuration - Math.min(sceneDuration, timeLeft)));
  }, [sceneDuration]);

  const previous = useCallback(() => swiperRef.current?.slidePrev(), []);
  const next = useCallback(() => swiperRef.current?.slideNext(), []);

  const togglePlaying = useCallback(() => {
    const swiper = swiperRef.current;
    if (!swiper?.autoplay) return;
    if (playing) swiper.autoplay.stop();
    else swiper.autoplay.start();
    setPlaying((value) => !value);
  }, [playing]);

  const seek = useCallback((fraction) => {
    const clamped = Math.max(0, Math.min(0.999999, fraction));
    const totalDuration = length * sceneDuration;
    const targetTime = clamped * totalDuration;
    const targetIndex = Math.floor(targetTime / sceneDuration);
    swiperRef.current?.slideToLoop(targetIndex);
    setElapsed(targetTime - targetIndex * sceneDuration);
  }, [length, sceneDuration]);

  const toggleFullscreen = useCallback(async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen?.();
      return;
    }
    try {
      await document.documentElement.requestFullscreen?.();
      try {
        await window.screen?.orientation?.lock?.('landscape');
      } catch {
        // Landscape locking is optional on desktop browsers and most smart TVs.
      }
    } catch {
      setPresenting((value) => !value);
    }
  }, []);

  useEffect(() => {
    const syncFullscreen = () => setPresenting(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', syncFullscreen);
    return () => document.removeEventListener('fullscreenchange', syncFullscreen);
  }, []);

  useEffect(() => {
    const handleKey = (event) => {
      if (isTypingTarget(event.target)) return;
      if (event.key === ' ') {
        event.preventDefault();
        togglePlaying();
      }
      if (event.key.toLowerCase() === 'f') toggleFullscreen();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [toggleFullscreen, togglePlaying]);

  useEffect(() => {
    if (!presenting || !playing) {
      setControlsVisible(true);
      return undefined;
    }

    let hideTimer;
    const showControls = () => {
      setControlsVisible(true);
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => setControlsVisible(false), 2200);
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

  const totalDuration = length * sceneDuration;
  const currentTime = activeIndex * sceneDuration + elapsed;

  const player = useMemo(() => ({
    activeIndex,
    controlsVisible,
    currentTime,
    next,
    playing,
    presenting,
    previous,
    seek,
    toggleFullscreen,
    togglePlaying,
    totalDuration,
    totalProgress: totalDuration ? (currentTime / totalDuration) * 100 : 0,
  }), [activeIndex, controlsVisible, currentTime, next, playing, presenting, previous, seek, toggleFullscreen, togglePlaying, totalDuration]);

  return {
    player,
    reducedMotion,
    swiperEvents: { onSwiper, onSlideChange, onAutoplayTimeLeft },
  };
}
