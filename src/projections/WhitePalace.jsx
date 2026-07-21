import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Maximize2 } from 'lucide-react';
import { ProjectionTransport, useProjectionPlayback } from './ProjectionPlayback.jsx';
import './whitePalace.css';

const palaceSlides = [
  { image: '/assets/new-templates/thiep-cuoi-56/image-1.jpg', title: 'Minh Quân & Khánh An', note: 'A promise dressed in white' },
  { image: '/assets/new-templates/thiep-cuoi-56/image-2.jpg', title: 'Our White Palace', note: 'Where every quiet moment becomes forever' },
  { image: '/assets/new-templates/thiep-cuoi-56/image-3.jpg', title: 'Love, in its purest form', note: '20 · 12 · 2027' },
  { image: '/assets/new-templates/thiep-cuoi-56/image-4.jpg', title: 'You are my home', note: 'Lời Hẹn Wedding Studio' },
  { image: '/assets/new-templates/thiep-cuoi-56/image-5.jpg', title: 'Always, with you', note: 'Thank you for celebrating with us' },
];

const silverDust = Array.from({ length: 26 }, (_, index) => ({
  id: index,
  x: `${(index * 29 + 5) % 100}%`,
  size: `${2 + (index % 4) * 1.4}px`,
  delay: `${-(index % 9) * .85}s`,
  duration: `${7 + (index % 6) * 1.1}s`,
}));

function WhitePalace() {
  const player = useProjectionPlayback({ length: palaceSlides.length, sceneDuration: 7300, pageClass: 'projection-palace-page' });
  const active = palaceSlides[player.activeIndex];

  return (
    <main className={`projectionPalace projectionSurface${player.presenting ? ' is-presenting' : ''}${player.controlsVisible ? ' show-controls' : ''}`}>
      <AnimatePresence mode="sync">
        <motion.div key={`background-${active.image}`} className="wp-backdrop" style={{ '--wp-image': `url(${active.image})` }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.8 }} />
      </AnimatePresence>
      <div className="wp-shade" />
      <div className="wp-silverDust" aria-hidden="true">{silverDust.map((dust) => <i key={dust.id} style={{ '--wp-x': dust.x, '--wp-size': dust.size, '--wp-delay': dust.delay, '--wp-duration': dust.duration }} />)}</div>

      <header className="wp-header">
        <a href="/dich-vu/trinh-chieu" aria-label="Trở về thư viện trình chiếu" title="Thư viện trình chiếu"><ArrowLeft size={18} /></a>
        <span>WHITE PALACE ELEGANCE</span>
        <button type="button" onClick={player.toggleFullscreen} aria-label="Bật chế độ trình chiếu toàn màn hình" title="Trình chiếu toàn màn hình TV/LED"><Maximize2 size={18} /></button>
      </header>

      <section className="wp-stage">
        <div className="wp-doubleFrame">
          <AnimatePresence mode="sync" custom={player.direction}>
            <motion.img
              key={active.image}
              src={active.image}
              alt={active.title}
              custom={player.direction}
              initial={{ opacity: 0, x: player.direction * 50, scale: 1.025 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: player.direction * -35 }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </AnimatePresence>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={active.title} className="wp-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 1.25, delay: .5 }}>
            <h1>{active.title}</h1>
            <p>{active.note}</p>
          </motion.div>
        </AnimatePresence>
      </section>

      <ProjectionTransport player={player} className="wp-transport" label="White Palace Elegance" />
    </main>
  );
}

export default WhitePalace;
