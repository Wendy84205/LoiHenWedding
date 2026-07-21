import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Maximize2 } from 'lucide-react';
import { ProjectionTransport, useProjectionPlayback } from './ProjectionPlayback.jsx';
import './polaroidMemories.css';

const memories = [
  { image: '/assets/new-templates/thiep-cuoi-20/image-1.webp', caption: 'the first page of us', date: 'summer · 2021' },
  { image: '/assets/new-templates/thiep-cuoi-20/image-2.webp', caption: 'you make ordinary days golden', date: 'somewhere · 2022' },
  { image: '/assets/new-templates/thiep-cuoi-20/image-3.webp', caption: 'our favorite little adventure', date: 'autumn · 2023' },
  { image: '/assets/new-templates/thiep-cuoi-20/image-4.webp', caption: 'from this moment, always', date: 'december · 2027' },
  { image: '/assets/new-templates/thiep-cuoi-20/image-5.webp', caption: 'minh quân & khánh an', date: '20 · 12 · 2027' },
];

function PolaroidMemories() {
  const player = useProjectionPlayback({ length: memories.length, sceneDuration: 5000, pageClass: 'projection-polaroid-page' });
  const active = memories[player.activeIndex];

  return (
    <main className={`projectionPolaroid projectionSurface${player.presenting ? ' is-presenting' : ''}${player.controlsVisible ? ' show-controls' : ''}`}>
      <div className="pm-grain" aria-hidden="true" />
      <header className="pm-header">
        <a href="/dich-vu/trinh-chieu" aria-label="Trở về thư viện trình chiếu" title="Thư viện trình chiếu"><ArrowLeft size={18} /></a>
        <div><strong>POLAROID MEMORIES</strong><span>OUR LITTLE FOREVER ARCHIVE</span></div>
        <button type="button" onClick={player.toggleFullscreen} aria-label="Bật chế độ trình chiếu toàn màn hình" title="Trình chiếu toàn màn hình TV/LED"><Maximize2 size={18} /></button>
      </header>

      <section className="pm-table">
        <div className="pm-stack one" aria-hidden="true" /><div className="pm-stack two" aria-hidden="true" />
        <div className="pm-perspective">
          <AnimatePresence mode="wait" custom={player.direction}>
            <motion.figure
              key={active.image}
              className="pm-card"
              custom={player.direction}
              initial={{ opacity: 0, rotateY: player.direction * 88, x: player.direction * 70 }}
              animate={{ opacity: 1, rotateY: 0, x: 0 }}
              exit={{ opacity: 0, rotateY: player.direction * -88, x: player.direction * -55 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="pm-photo"><img src={active.image} alt={active.caption} /></div>
              <figcaption><strong>{active.caption}</strong><span>{active.date}</span></figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
      </section>

      <ProjectionTransport player={player} className="pm-transport" label="Polaroid Memories" />
      <p className="pm-note">MINH QUÂN + KHÁNH AN · BOX 01</p>
    </main>
  );
}

export default PolaroidMemories;
