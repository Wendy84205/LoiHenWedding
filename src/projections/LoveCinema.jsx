import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Maximize2 } from 'lucide-react';
import { ProjectionTransport, useProjectionPlayback } from './ProjectionPlayback.jsx';
import './loveCinema.css';

const SCENE_DURATION = 8500;

const scenes = [
  {
    chapter: 'Chương  I  ·  Lần Đầu Gặp Gỡ',
    nameA: 'Minh Quân',
    nameB: 'Khánh An',
    quote: 'Có những cuộc gặp gỡ rất khẽ, nhưng đủ để làm thay đổi cả một đời.',
    date: '20 · 12 · 2027',
    image: '/assets/template44/mountain-couple.webp',
    cropY: '28%',
  },
  {
    chapter: 'Chương  II  ·  Những Ngày Bên Nhau',
    nameA: 'Minh Quân',
    nameB: 'Khánh An',
    quote: 'Từ những buổi sáng thật bình thường, chúng mình đã gom góp thành thương nhớ.',
    date: '20 · 12 · 2027',
    image: '/assets/template61/couple-close.webp',
    cropY: '18%',
  },
  {
    chapter: 'Chương  III  ·  Cùng Đi Thật Xa',
    nameA: 'Minh Quân',
    nameB: 'Khánh An',
    quote: 'Chỉ cần vẫn nắm tay nhau, mọi miền xa đều trở thành nhà.',
    date: '20 · 12 · 2027',
    image: '/assets/template44/sea-couple.webp',
    cropY: '32%',
  },
  {
    chapter: 'Chương  IV  ·  Ngày Chung Đôi',
    nameA: 'Minh Quân',
    nameB: 'Khánh An',
    quote: 'Hôm nay, một lời hẹn được viết bằng yêu thương và giữ bằng cả cuộc đời.',
    date: '20 · 12 · 2027',
    image: '/assets/template61/couple-hero.webp',
    cropY: '22%',
  },
];

const bokeh = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: `${(i * 53 + 11) % 100}%`,
  y: `${(i * 37 + 19) % 100}%`,
  size: `${5 + (i % 5) * 6}px`,
  delay: `-${((i * 2.3) % 10).toFixed(1)}s`,
  dur: `${7 + (i % 6) * 2.2}s`,
}));

export default function LoveCinema() {
  const player = useProjectionPlayback({
    length: scenes.length,
    sceneDuration: SCENE_DURATION,
    pageClass: 'projection-love-cinema-page',
  });
  const scene = scenes[player.activeIndex];

  return (
    <main
      className={`loveCinema projectionSurface${player.presenting ? ' is-presenting' : ''}${player.controlsVisible ? ' show-controls' : ''}`}
    >
      {/* Blurred background photo */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${scene.image}`}
          className="lc-bg"
          style={{ backgroundImage: `url(${scene.image})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.2 }}
        />
      </AnimatePresence>

      {/* Dark vignette */}
      <div className="lc-vignette" aria-hidden="true" />

      {/* Bokeh particles */}
      <div className="lc-bokeh" aria-hidden="true">
        {bokeh.map((b) => (
          <i
            key={b.id}
            style={{
              '--lc-bx': b.x,
              '--lc-by': b.y,
              '--lc-bs': b.size,
              '--lc-bd': b.delay,
              '--lc-bdur': b.dur,
            }}
          />
        ))}
      </div>

      {/* Main slide */}
      <AnimatePresence mode="wait">
        <motion.section
          key={scene.chapter}
          className="lc-slide"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          aria-label={`${scene.nameA} & ${scene.nameB} — ${scene.chapter}`}
        >
          {/* Chapter label */}
          <p className="lc-chapter">{scene.chapter}</p>

          {/* Arch photo frame */}
          <div className="lc-frame-wrap">
            <div className="lc-frame">
              <img
                src={scene.image}
                alt={`Ảnh cưới ${scene.nameA} & ${scene.nameB}`}
                style={{ objectPosition: `center ${scene.cropY}` }}
              />
            </div>
          </div>

          {/* Couple names */}
          <div className="lc-names" aria-label={`${scene.nameA} và ${scene.nameB}`}>
            <span>{scene.nameA}</span>
            <em>&amp;</em>
            <span>{scene.nameB}</span>
          </div>

          {/* Gold divider + ornament */}
          <hr className="lc-rule" />
          <span className="lc-ornament">✦ ✦ ✦</span>

          {/* Quote */}
          <p className="lc-quote">❝ {scene.quote} ❞</p>

          {/* Date badge */}
          <small className="lc-date">{scene.date}</small>
        </motion.section>
      </AnimatePresence>

      {/* Top bar */}
      <nav className="lc-topbar" aria-label="Điều hướng trình chiếu">
        <a href="/dich-vu/trinh-chieu" aria-label="Trở về thư viện trình chiếu" title="Thư viện trình chiếu">
          <ArrowLeft size={18} />
        </a>
        <div className="lc-brand" aria-hidden="true">
          LH
          <span>WEDDING</span>
        </div>
        <button
          type="button"
          onClick={player.toggleFullscreen}
          aria-label={player.presenting ? 'Thoát toàn màn hình' : 'Phát toàn màn hình TV/LED'}
          title="Toàn màn hình"
        >
          <Maximize2 size={18} />
        </button>
      </nav>

      {/* Playback controls */}
      <ProjectionTransport player={player} label="Love Cinema" />
    </main>
  );
}
