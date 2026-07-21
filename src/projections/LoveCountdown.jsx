import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Maximize2 } from 'lucide-react';
import { ProjectionTransport, useProjectionPlayback } from './ProjectionPlayback.jsx';
import './loveCountdown.css';

const albumSlides = [
  { image: '/assets/new-templates/thiep-cuoi-112/image-2.webp', chapter: '01', title: 'MINH QUÂN & KHÁNH AN', note: 'Velvet Rose · 20.12.2027' },
  { image: '/assets/new-templates/thiep-cuoi-112/image-6.webp', chapter: '02', title: 'THE WAY YOU LOVE ME', note: 'Một tình yêu nồng nàn như đóa hồng nhung' },
  { image: '/assets/template39/couple-red.webp', chapter: '03', title: 'OUR FAVORITE FOREVER', note: 'Bình yên nhất là khi có nhau' },
  { image: '/assets/template39/couple-red-seated.webp', chapter: '04', title: 'TO LOVE, TO HOLD', note: 'Cảm ơn bạn đã đến chung vui cùng chúng mình' },
];

const petals = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  x: `${(index * 37 + 4) % 100}%`,
  delay: `${-(index % 10) * 1.15}s`,
  duration: `${8 + (index % 6) * 1.4}s`,
  drift: `${-70 + (index % 7) * 24}px`,
  size: `${10 + (index % 4) * 5}px`,
}));

function LoveCountdown() {
  const player = useProjectionPlayback({ length: albumSlides.length, sceneDuration: 6500, pageClass: 'projection-countdown-page' });
  const active = albumSlides[player.activeIndex];

  return (
    <main className={`projectionCountdown projectionSurface${player.presenting ? ' is-presenting' : ''}${player.controlsVisible ? ' show-controls' : ''}`}>
      <AnimatePresence mode="sync">
        <motion.div
          key={active.image}
          className="pc-backdrop"
          style={{ '--pc-image': `url(${active.image})` }}
          initial={{ opacity: 0, x: '-2.5%', scale: 1.08 }}
          animate={{ opacity: 1, x: '2.5%', scale: 1.08 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.5 }, x: { duration: 6.5, ease: 'linear' } }}
        />
      </AnimatePresence>
      <div className="pc-shade" />
      <div className="pc-grain" aria-hidden="true" />
      <div className="pc-petals" aria-hidden="true">
        {petals.map((petal) => <i key={petal.id} style={{ '--pc-x': petal.x, '--pc-delay': petal.delay, '--pc-duration': petal.duration, '--pc-drift': petal.drift, '--pc-size': petal.size }} />)}
      </div>

      <a className="pc-back" href="/dich-vu/trinh-chieu" aria-label="Trở về thư viện trình chiếu" title="Thư viện trình chiếu"><ArrowLeft size={18} /></a>
      <button className="pc-present" type="button" onClick={player.toggleFullscreen} aria-label="Bật chế độ trình chiếu toàn màn hình" title="Trình chiếu toàn màn hình TV/LED"><Maximize2 size={18} /></button>
      <AnimatePresence mode="wait">
        <motion.section key={active.chapter} className="pc-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }}>
          <p>VELVET ROSE · {active.chapter} / {String(albumSlides.length).padStart(2, '0')}</p>
          <h1>{active.title}</h1>
          <span>{active.note}</span>
        </motion.section>
      </AnimatePresence>

      <ProjectionTransport player={player} className="pc-transport" label="Velvet Rose" />
      <p className="pc-footer">MINH QUÂN &amp; KHÁNH AN · VELVET ROSE · 16:9</p>
    </main>
  );
}

export default LoveCountdown;
