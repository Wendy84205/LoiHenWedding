import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Maximize2 } from 'lucide-react';
import { ProjectionTransport, useProjectionPlayback } from './ProjectionPlayback.jsx';
import './damNgoBackground.css';

const goldDust = Array.from({ length: 28 }, (_, index) => ({
  id: index,
  x: `${(index * 37 + 7) % 100}%`,
  y: `${(index * 53 + 11) % 100}%`,
  size: `${2 + (index % 4) * 2}px`,
  delay: `${-(index % 10) * 1.3}s`,
  duration: `${7 + (index % 7) * 1.4}s`,
}));

function DamNgoBackground() {
  const player = useProjectionPlayback({ length: 1, sceneDuration: 18000, pageClass: 'projection-dam-ngo-page' });

  return (
    <main className={`backgroundDamNgo projectionSurface${player.presenting ? ' is-presenting' : ''}${player.controlsVisible ? ' show-controls' : ''}`}>
      <motion.div
        className="bdn-photo"
        initial={{ scale: 1.02, x: 0 }}
        animate={{ scale: [1.02, 1.075, 1.02], x: [0, -14, 0] }}
        transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
      />
      <div className="bdn-photoShade" aria-hidden="true" />
      <div className="bdn-pattern" aria-hidden="true" />
      <div className="bdn-rings" aria-hidden="true"><i /><i /><i /></div>
      <div className="bdn-dust" aria-hidden="true">
        {goldDust.map((dust) => <i key={dust.id} style={{ '--bdn-x': dust.x, '--bdn-y': dust.y, '--bdn-size': dust.size, '--bdn-delay': dust.delay, '--bdn-duration': dust.duration }} />)}
      </div>

      <a className="bdn-back" href="/dich-vu/trinh-chieu" aria-label="Trở về thư viện trình chiếu" title="Thư viện trình chiếu"><ArrowLeft size={19} /></a>
      <button className="bdn-fullscreen" type="button" onClick={player.toggleFullscreen} aria-label="Bật chế độ toàn màn hình" title="Toàn màn hình TV/LED"><Maximize2 size={19} /></button>

      <motion.section
        className="bdn-copy"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="bdn-kicker">TRÂN TRỌNG BÁO TIN</p>
        <span className="bdn-doubleJoy" aria-hidden="true">囍</span>
        <h1>LỄ DẠM NGÕ</h1>
        <div className="bdn-rule"><i /><b>19 · 12 · 2027</b><i /></div>
        <div className="bdn-names"><strong>MINH QUÂN</strong><em>&amp;</em><strong>KHÁNH AN</strong></div>
        <p className="bdn-time">09:00 · CHỦ NHẬT</p>
        <p className="bdn-place">TƯ GIA NHÀ GÁI · HÀ NỘI</p>
      </motion.section>

      <div className="bdn-monogram" aria-hidden="true"><span>Q</span><i>&amp;</i><span>A</span></div>
      <ProjectionTransport player={player} className="bdn-transport" label="Background TV lễ dạm ngõ" />
    </main>
  );
}

export default DamNgoBackground;
