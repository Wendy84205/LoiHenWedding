import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Maximize2 } from 'lucide-react';
import { ProjectionTransport, useProjectionPlayback } from './ProjectionPlayback.jsx';
import './seaOfUs.css';

const editorialSlides = [
  { image: '/assets/new-templates/thiep-cuoi-56/image-1.jpg', issue: 'ISSUE 01', title: 'THE NEW ROMANCE', quote: 'Fashion fades. The way we love remains.' },
  { image: '/assets/new-templates/thiep-cuoi-37/image-1.webp', issue: 'ISSUE 02', title: 'TWO OF A KIND', quote: 'Một câu chuyện riêng, được kể bằng những điều rất thật.' },
  { image: '/assets/new-templates/thiep-cuoi-94/image-1.webp', issue: 'ISSUE 03', title: 'THE VOW EDIT', quote: 'This is not a perfect love. It is ours.' },
];

function SeaOfUs() {
  const player = useProjectionPlayback({ length: editorialSlides.length, sceneDuration: 8000, pageClass: 'projection-sea-page' });
  const active = editorialSlides[player.activeIndex];

  return (
    <main className={`projectionSea projectionSurface${player.presenting ? ' is-presenting' : ''}${player.controlsVisible ? ' show-controls' : ''}`}>
      <header className="ps-side">
        <a href="/dich-vu/trinh-chieu" aria-label="Trở về thư viện trình chiếu" title="Thư viện trình chiếu"><ArrowLeft size={18} /></a>
        <span>THE WEDDING EDIT</span>
        <small>VOLUME 01 · 2027</small>
      </header>

      <section className="ps-media">
        <AnimatePresence mode="sync" custom={player.direction}>
          <motion.img
            key={active.image}
            src={active.image}
            alt={active.title}
            custom={player.direction}
            initial={{ opacity: 0, x: player.direction * 110, scale: 1.025 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: player.direction * -70, scale: 0.985 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>
        <p className="ps-photoLabel">WEDDING JOURNAL · MINH QUÂN &amp; KHÁNH AN</p>
      </section>

      <section className="ps-copy">
        <motion.p key={active.issue} initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.35 }}>{active.issue}</motion.p>
        <AnimatePresence mode="wait">
          <motion.h1 key={active.title} initial={{ opacity: 0, x: 65 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>{active.title}</motion.h1>
        </AnimatePresence>
        <AnimatePresence mode="wait"><motion.blockquote key={active.quote} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, delay: 0.25 }}>{active.quote}</motion.blockquote></AnimatePresence>
        <div className="ps-names"><span>MINH QUÂN</span><i>&amp;</i><span>KHÁNH AN</span></div>
        <div className="ps-dots" aria-label="Chọn chương video">{editorialSlides.map((slide, index) => <button key={slide.issue} className={index === player.activeIndex ? 'is-active' : ''} type="button" onClick={() => player.goTo(index, index > player.activeIndex ? 1 : -1)} aria-label={`Chọn ${slide.issue}`} aria-current={index === player.activeIndex ? 'true' : undefined} />)}</div>
      </section>

      <button className="ps-present" type="button" onClick={player.toggleFullscreen} aria-label="Bật chế độ trình chiếu toàn màn hình" title="Trình chiếu toàn màn hình TV/LED"><Maximize2 size={18} /></button>
      <ProjectionTransport player={player} className="ps-transport" label="The Wedding Edit" />
    </main>
  );
}

export default SeaOfUs;
