import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Maximize2 } from 'lucide-react';
import { ProjectionTransport, useProjectionPlayback } from './ProjectionPlayback.jsx';
import './filmStrip.css';

const frames = [
  { image: '/assets/new-templates/thiep-cuoi-20/image-1.webp', line: 'THE WAY YOU LOOK AT ME', number: '00:00:04' },
  { image: '/assets/new-templates/thiep-cuoi-20/image-3.webp', line: 'A LIFE LIVED SIDE BY SIDE', number: '00:00:09' },
  { image: '/assets/new-templates/thiep-cuoi-37/image-1.webp', line: 'OUR FAVORITE FRAME', number: '00:00:14' },
  { image: '/assets/template44/mountain-couple.webp', line: 'SOMEWHERE, ONLY WE KNOW', number: '00:00:19' },
];

function FilmStrip() {
  const player = useProjectionPlayback({ length: frames.length, sceneDuration: 5300, pageClass: 'projection-film-page' });
  const frame = frames[player.activeIndex];

  return (
    <main className={`projectionFilm projectionSurface${player.presenting ? ' is-presenting' : ''}${player.controlsVisible ? ' show-controls' : ''}`}>
      <div className="pf-header"><a href="/dich-vu/trinh-chieu" aria-label="Trở về thư viện trình chiếu" title="Thư viện trình chiếu"><ArrowLeft size={18} /></a><span>VINTAGE CINEMA VHS</span><small>REC · MINH QUÂN &amp; KHÁNH AN</small><button className="pf-present" type="button" onClick={player.toggleFullscreen} aria-label="Bật chế độ trình chiếu toàn màn hình" title="Trình chiếu toàn màn hình TV/LED"><Maximize2 size={17} /></button></div>
      <section className="pf-stage">
        <div className="pf-frame">
          <AnimatePresence mode="wait">
            <motion.img key={frame.image} src={frame.image} alt={frame.line} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} />
          </AnimatePresence>
          <div className="pf-vhsStatus"><span>PLAY ▶</span><time>{frame.number}</time></div>
          <span className="pf-filmNumber left">SP · VHS-C</span><span className="pf-filmNumber right">20 · 12 · 26</span>
          <p>{frame.line}</p>
        </div>
      </section>
      <ProjectionTransport player={player} className="pf-transport" label="Vintage Cinema VHS" />
      <p className="pf-caption">VINTAGE CINEMA <i>·</i> TAPE 01</p>
    </main>
  );
}

export default FilmStrip;
