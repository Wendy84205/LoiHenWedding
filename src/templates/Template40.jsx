import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Check, Gem, Gift, GlassWater, Heart, MapPin, Send } from 'lucide-react';
import WeddingMusicButton from './WeddingMusicButton.jsx';
import './template40.css';

const assets40 = {
  hero: '/assets/template40-ref/hero.jpg',
  couple: '/assets/template40-ref/couple.jpg',
  close: '/assets/template40-ref/save.jpg',
  bride: '/assets/template40-ref/bride.jpg',
  groom: '/assets/template40-ref/groom.jpg',
  story: '/assets/template40-ref/hero.jpg',
  paper: '/assets/template40-ref/paper.png',
  qr: '/assets/template40-ref/qr.png',
};

const reveal40 = (direction = 'up', delay = 0) => {
  const move = direction === 'left' ? { x: 52, y: 0 } : direction === 'right' ? { x: -52, y: 0 } : { x: 0, y: 44 };
  return {
    initial: { opacity: 0, ...move },
    whileInView: { opacity: 1, x: 0, y: 0 },
    viewport: { once: true, margin: '-55px' },
    transition: { duration: 1.3, delay, ease: 'easeOut' },
  };
};

const calendar40 = [...Array.from({ length: 2 }, (_, i) => `blank-${i}`), ...Array.from({ length: 31 }, (_, i) => i + 1)];

function getCountdown40() {
  const difference = Math.max(0, new Date('2027-12-12T10:30:00+07:00').getTime() - Date.now());
  return [
    Math.floor(difference / 86400000),
    Math.floor((difference / 3600000) % 24),
    Math.floor((difference / 60000) % 60),
    Math.floor((difference / 1000) % 60),
  ];
}

export default function Template40() {
  const [sent, setSent] = useState(false);
  const [countdown, setCountdown] = useState(getCountdown40);

  useEffect(() => {
    document.documentElement.classList.add('template40-page');
    document.body.classList.add('template40-page');
    const timer = window.setInterval(() => setCountdown(getCountdown40()), 1000);
    return () => {
      window.clearInterval(timer);
      document.documentElement.classList.remove('template40-page');
      document.body.classList.remove('template40-page');
    };
  }, []);

  return (
    <main className="template40">
      <h1 className="visually-hidden">Thiệp cưới Phương Nga</h1>
      <WeddingMusicButton className="t40-music" />
      <Hero40 countdown={countdown} />
      <SaveDate40 />
      <Invitation40 />
      <CalendarVenue40 />
      <Profiles40 />
      <Timeline40 />
      <Rsvp40 sent={sent} setSent={setSent} />
      <Gift40 />
    </main>
  );
}

function Hero40({ countdown }) {
  return (
    <section className="t40-hero" id="hero">
      <motion.div className="t40-heroImage" initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.45, ease: [0.22, 1, 0.36, 1] }}>
        <img src={assets40.hero} alt="Phương Nga và Hoàng Long" fetchPriority="high" />
      </motion.div>
      <motion.p className="t40-scriptTitle" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: .2 }}>We get married!</motion.p>
      <motion.div className="t40-heroNames" initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: .42 }}>
        <span>PHƯƠNG NGA</span><i>&amp;</i><span>HOÀNG LONG</span><small>12.12.2027</small>
      </motion.div>
      <motion.p className="t40-heroCaption" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.1, delay: .65 }}>We will become husband and wife in</motion.p>
      <div className="t40-countdown">
        {['ngày', 'giờ', 'phút', 'giây'].map((label, index) => <span key={label}><b>{countdown[index]}</b><small>{label}</small></span>)}
      </div>
    </section>
  );
}

function SaveDate40() {
  return (
    <section className="t40-save" id="save-the-date">
      <motion.figure className="t40-saveMain" {...reveal40('right')}><img loading="lazy" src={assets40.close} alt="Khoảnh khắc của cô dâu chú rể" /></motion.figure>
      <motion.figure className="t40-saveSmall" {...reveal40('left', .12)}><img loading="lazy" src={assets40.couple} alt="Ảnh cưới Phương Nga và Hoàng Long" /></motion.figure>
      <motion.h2 {...reveal40('left', .2)}><span>SAVE</span><i>the</i><span>DATE</span></motion.h2>
      <div className="t40-families">
        <motion.article {...reveal40('right')}><h3>Nhà gái</h3><p>Ông. Đặng Thái Công<br />Bà. Hoàng Mai Hương</p><small>TP. Hà Nội</small></motion.article>
        <motion.article {...reveal40('left')}><h3>Nhà trai</h3><p>Ông. Phan Đình Hải<br />Bà. Nguyễn Thị Mai</p><small>TP. Hải Phòng</small></motion.article>
      </div>
    </section>
  );
}

function Invitation40() {
  return (
    <section className="t40-invitation" id="invitation">
      <motion.p {...reveal40('up')}>Thân mời đến dự lễ thành hôn của<br />chúng mình!</motion.p>
      <motion.div className="t40-inviteNames" {...reveal40('up', .15)}><span>Phương Nga</span><i>&amp;</i><span>Hoàng Long</span></motion.div>
      <motion.small {...reveal40('up')}>Được tổ chức vào lúc</motion.small>
      <motion.div className="t40-timeStamp" {...reveal40('up', .15)}><b>10:30</b><strong>THỨ BẢY</strong><b>12.12.2027</b></motion.div>
      <motion.em {...reveal40('up')}>(Nhằm ngày 1 tháng 11 năm Bính Ngọ)</motion.em>
    </section>
  );
}

function CalendarVenue40() {
  return (
    <section className="t40-calendarVenue" id="calendar">
      <motion.div className="t40-paperCalendar" {...reveal40('up')}>
        <span className="t40-clip" />
        <h2>Tháng 12</h2>
        <div className="t40-week"><b>T2</b><b>T3</b><b>T4</b><b>T5</b><b>T6</b><b>T7</b><b>CN</b></div>
        <div className="t40-days">
          {calendar40.map((day) => typeof day === 'string' ? <span key={day} /> : <span key={day} className={day === 12 ? 'is-wedding' : ''}>{day === 12 && <Heart fill="currentColor" strokeWidth={0} />}<i>{day}</i></span>)}
        </div>
      </motion.div>
      <motion.div className="t40-venue" {...reveal40('up', .12)}>
        <h3>Địa điểm:</h3><b>Tại tư gia nhà trai</b><p>12 Trần Phú, Ngô Quyền, Hải Phòng</p>
        <a href="https://www.google.com/maps/search/?api=1&query=12%20Tran%20Phu%20Ngo%20Quyen%20Hai%20Phong" target="_blank" rel="noreferrer"><MapPin size={16} /> Xem chỉ đường</a>
      </motion.div>
    </section>
  );
}

function Profiles40() {
  return (
    <section className="t40-profiles" id="couple">
      <motion.article {...reveal40('right')}><img loading="lazy" src={assets40.bride} alt="Cô dâu Phương Nga" /><div><small>Cô dâu</small><h2>Phương Nga</h2><p>20 / 12 / 2001</p></div></motion.article>
      <motion.article {...reveal40('left')}><div><small>Chú rể</small><h2>Hoàng Long</h2><p>05 / 08 / 1995</p></div><img loading="lazy" src={assets40.groom} alt="Chú rể Hoàng Long" /></motion.article>
    </section>
  );
}

function Timeline40() {
  const events = [
    { icon: Camera, time: '05:30', label: 'Rước dâu' },
    { icon: GlassWater, time: '10:30', label: 'Đón khách' },
    { icon: Gem, time: '12:00', label: 'Lễ thành hôn' },
    { icon: Heart, time: '13:00', label: 'Lưu niệm' },
  ];
  return (
    <section className="t40-timeline" id="timeline">
      <motion.h2 {...reveal40('up')}>TIMELINE</motion.h2>
      <div className="t40-eventLine">
        {events.map(({ icon: Icon, time, label }, index) => <motion.article key={time} {...reveal40('up', index * .08)}><Icon /><b>{time}</b><span>{label}</span></motion.article>)}
      </div>
      <motion.p {...reveal40('up', .2)}>Hãy xác nhận sự có mặt của bạn để chúng mình<br />chuẩn bị đón tiếp một cách chu đáo nhất.<br />Trân trọng!</motion.p>
    </section>
  );
}

function Rsvp40({ sent, setSent }) {
  const submit = (event) => { event.preventDefault(); setSent(true); };
  return (
    <section className="t40-rsvp" id="rsvp">
      <motion.form onSubmit={submit} {...reveal40('up')}>
        <h2>Xác nhận tham dự</h2>
        <label>Họ và tên<input required placeholder="Nhập tên của bạn" /></label>
        <fieldset><legend>Bạn sẽ tham dự chứ?</legend><label><input type="radio" name="attendance40" defaultChecked /> Có, tôi sẽ tham dự</label><label><input type="radio" name="attendance40" /> Tôi bận, rất tiếc không thể tham dự</label></fieldset>
        <label>Số lượng người tham dự<select defaultValue="1 người"><option>1 người</option><option>2 người</option><option>3 người</option><option>4 người</option></select></label>
        <button type="submit"><Send size={16} /> Gửi xác nhận</button>
        {sent && <span className="t40-success" role="status"><Check size={15} /> Cảm ơn bạn, xác nhận đã được ghi nhận.</span>}
      </motion.form>
    </section>
  );
}

function Gift40() {
  return (
    <section className="t40-gift" id="gift">
      <motion.div {...reveal40('up')}><h2><Gift size={18} /> Hộp quà mừng</h2><img loading="lazy" src={assets40.qr} alt="Mã QR mừng cưới cô dâu" /><b>Cô dâu</b><span>Đặng Phương Nga</span><small>Techcombank · 19037057235014</small></motion.div>
      <motion.p {...reveal40('up', .2)}>Thank you!</motion.p>
    </section>
  );
}
