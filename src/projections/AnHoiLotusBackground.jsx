import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Maximize2 } from 'lucide-react';
import { ProjectionTransport, useProjectionPlayback } from './ProjectionPlayback.jsx';
import './anHoiLotusBackground.css';

const sparkles = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  x: `${(index * 41 + 9) % 100}%`,
  y: `${(index * 29 + 13) % 100}%`,
  delay: `${-(index % 8) * 1.8}s`,
  duration: `${8 + (index % 6) * 1.5}s`,
}));

function Lotus({ className = '' }) {
  return (
    <div className={`bah-lotus ${className}`} aria-hidden="true">
      <span className="bah-lotusPetals">
        {Array.from({ length: 7 }, (_, index) => <i key={index} />)}
      </span>
      <b />
    </div>
  );
}

function AnHoiLotusBackground() {
  const player = useProjectionPlayback({ length: 1, sceneDuration: 18000, pageClass: 'projection-an-hoi-page' });

  return (
    <main className={`backgroundAnHoi projectionSurface${player.presenting ? ' is-presenting' : ''}${player.controlsVisible ? ' show-controls' : ''}`}>
      <div className="bah-paper" aria-hidden="true" />
      <div className="bah-sun bah-sunOne" aria-hidden="true" />
      <div className="bah-sun bah-sunTwo" aria-hidden="true" />
      <Lotus className="bah-lotusLeft" />
      <Lotus className="bah-lotusRight" />
      <div className="bah-sparkles" aria-hidden="true">
        {sparkles.map((sparkle) => (
          <i key={sparkle.id} style={{ '--bah-x': sparkle.x, '--bah-y': sparkle.y, '--bah-delay': sparkle.delay, '--bah-duration': sparkle.duration }} />
        ))}
      </div>

      <a className="bah-back" href="/dich-vu/trinh-chieu" aria-label="Trở về thư viện trình chiếu" title="Thư viện trình chiếu"><ArrowLeft size={19} /></a>
      <button className="bah-fullscreen" type="button" onClick={player.toggleFullscreen} aria-label="Bật chế độ toàn màn hình" title="Toàn màn hình TV/LED"><Maximize2 size={19} /></button>

      <motion.section
        className="bah-copy"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="bah-kicker">TRÂN TRỌNG BÁO TIN</p>
        <h1>LỄ ĂN HỎI</h1>
        <p className="bah-invitation">Hai gia đình vui mừng tổ chức lễ ăn hỏi cho hai con</p>

        <div className="bah-names">
          <strong>HOÀNG NAM</strong>
          <span className="bah-happiness"><i>囍</i></span>
          <strong>THU HÀ</strong>
        </div>

        <div className="bah-date">
          <span>THỨ BẢY</span>
          <b>17</b>
          <span>THÁNG 04 · 2027</span>
        </div>
        <p className="bah-time">09:30 · TƯ GIA NHÀ GÁI</p>
        <p className="bah-location">HOÀN KIẾM · HÀ NỘI</p>
      </motion.section>

      <p className="bah-family bah-familyLeft">NHÀ TRAI · GIA ĐÌNH ÔNG BÀ NGUYỄN VĂN HẢI</p>
      <p className="bah-family bah-familyRight">NHÀ GÁI · GIA ĐÌNH ÔNG BÀ LÊ MINH TÂM</p>
      <ProjectionTransport player={player} className="bah-transport" label="Background TV lễ ăn hỏi Hồng Liên" />
    </main>
  );
}

export default AnHoiLotusBackground;
