import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Maximize2 } from 'lucide-react';
import { ProjectionTransport, useProjectionPlayback } from './ProjectionPlayback.jsx';
import './openingFrame.css';

const scenes = [
  {
    chapter: 'THE ROYAL SYMPHONY · I',
    title: ['MINH QUÂN', 'KHÁNH AN'],
    line: 'Từ hôm nay, mọi mùa trong đời đều có chúng ta.',
    date: '20 · 12 · 2027',
    image: '/assets/template44/mountain-couple.webp',
  },
  {
    chapter: 'THE ROYAL SYMPHONY · II',
    title: ['OUR PROMISE', 'OUR FOREVER'],
    line: 'Một lời hẹn dịu dàng, được viết bằng cả cuộc đời.',
    date: 'LỜI HẸN WEDDING STUDIO',
    image: '/assets/template61/couple-close.webp',
  },
  {
    chapter: 'THE ROYAL SYMPHONY · III',
    title: ['TOGETHER', 'IN EVERY SEASON'],
    line: 'Cảm ơn bạn đã hiện diện trong chương đẹp nhất.',
    date: 'MINH QUÂN & KHÁNH AN',
    image: '/assets/template44/sea-couple.webp',
  },
];

const bokehLights = Array.from({ length: 22 }, (_, index) => ({
  id: index,
  x: `${(index * 43 + 7) % 100}%`,
  size: `${8 + (index % 5) * 7}px`,
  delay: `${-(index % 8) * 1.35}s`,
  duration: `${9 + (index % 6) * 1.8}s`,
}));

function OpeningFrame() {
  const player = useProjectionPlayback({ length: scenes.length, sceneDuration: 8000, pageClass: 'projection-opening-page' });
  const scene = scenes[player.activeIndex];

  return (
    <main className={`projectionOpening projectionSurface${player.presenting ? ' is-presenting' : ''}${player.controlsVisible ? ' show-controls' : ''}`}>
      <AnimatePresence mode="sync">
        <motion.div
          key={scene.image}
          className="po-image"
          style={{ '--po-image': `url(${scene.image})` }}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.05 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 2 }, scale: { duration: 8, ease: 'linear' } }}
        />
      </AnimatePresence>
      <div className="po-vignette" />
      <div className="po-grain" aria-hidden="true" />
      <div className="po-bokeh" aria-hidden="true">
        {bokehLights.map((light) => <i key={light.id} style={{ '--po-x': light.x, '--po-size': light.size, '--po-delay': light.delay, '--po-duration': light.duration }} />)}
      </div>

      <a className="po-back" href="/dich-vu/trinh-chieu" aria-label="Trở về thư viện trình chiếu" title="Thư viện trình chiếu"><ArrowLeft size={18} /></a>
      <div className="po-mark">LH<br /><span>WEDDING</span></div>
      <button className="po-present" type="button" onClick={player.toggleFullscreen} aria-label="Bật chế độ trình chiếu toàn màn hình" title="Trình chiếu toàn màn hình TV/LED"><Maximize2 size={18} /></button>

      <AnimatePresence mode="wait">
        <motion.section key={scene.chapter} className="po-copy" initial={{ opacity: 0, y: 38 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: 1.25, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}>
          <p>{scene.chapter}</p>
          <h1><span>{scene.title[0]}</span><em>{scene.title[1]}</em></h1>
          <i />
          <strong>{scene.line}</strong>
          <small>{scene.date}</small>
        </motion.section>
      </AnimatePresence>

      <ProjectionTransport player={player} className="po-transport" label="Royal Symphony" />
    </main>
  );
}

export default OpeningFrame;
