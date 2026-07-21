import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Maximize2 } from 'lucide-react';
import { ProjectionTransport, useProjectionPlayback } from './ProjectionPlayback.jsx';
import './botanicalEngagementBackground.css';

function BotanicalEngagementBackground() {
  const player = useProjectionPlayback({ length: 1, sceneDuration: 20000, pageClass: 'projection-botanical-engagement-page' });

  return (
    <main className={`backgroundBotanical projectionSurface${player.presenting ? ' is-presenting' : ''}${player.controlsVisible ? ' show-controls' : ''}`}>
      <motion.div
        className="bbe-photo"
        initial={{ scale: 1.025 }}
        animate={{ scale: [1.025, 1.075, 1.025], x: [0, -12, 0] }}
        transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
      />
      <div className="bbe-photoVeil" aria-hidden="true" />
      <img className="bbe-flower bbe-flowerTop" src="/assets/new-templates/thiep-cuoi-73/flower-parallax.webp" alt="" aria-hidden="true" />
      <img className="bbe-flower bbe-flowerBottom" src="/assets/new-templates/thiep-cuoi-73/flower-top.webp" alt="" aria-hidden="true" />
      <div className="bbe-lines" aria-hidden="true"><i /><i /><i /></div>

      <a className="bbe-back" href="/dich-vu/trinh-chieu" aria-label="Trở về thư viện trình chiếu" title="Thư viện trình chiếu"><ArrowLeft size={19} /></a>
      <button className="bbe-fullscreen" type="button" onClick={player.toggleFullscreen} aria-label="Bật chế độ toàn màn hình" title="Toàn màn hình TV/LED"><Maximize2 size={19} /></button>

      <motion.section
        className="bbe-copy"
        initial={{ opacity: 0, x: -34 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="bbe-monogram"><span>N</span><i>&amp;</i><span>L</span></div>
        <p className="bbe-kicker">SAVE OUR DATE · 07.11.2027</p>
        <h1>LỄ ĐÍNH HÔN</h1>
        <p className="bbe-lead">Với niềm vui của hai gia đình,<br />chúng con trân trọng báo tin lễ đính hôn</p>
        <div className="bbe-names">
          <strong>NHẬT MINH</strong>
          <em>&amp;</em>
          <strong>LAN ANH</strong>
        </div>
        <div className="bbe-event">
          <b>10:00</b>
          <span>CHỦ NHẬT<br />07 · 11 · 2027</span>
        </div>
        <p className="bbe-place">TẠI TƯ GIA · QUẬN TÂY HỒ · HÀ NỘI</p>
      </motion.section>

      <p className="bbe-caption">THE BEGINNING OF OUR FOREVER</p>
      <ProjectionTransport player={player} className="bbe-transport" label="Background TV lễ đính hôn Botanical" />
    </main>
  );
}

export default BotanicalEngagementBackground;
