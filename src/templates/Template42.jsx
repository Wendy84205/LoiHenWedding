import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Camera, Check, Gift, Heart, MapPin, Send, UtensilsCrossed } from 'lucide-react';
import WeddingMusicButton from './WeddingMusicButton.jsx';
import './template42.css';
import './new/fontFidelity.css';

const assets42 = {
  hero: '/assets/template61/couple-close.webp',
  couple: '/assets/template61/couple-hero.webp',
  bride: '/assets/template44/bride-portrait.webp',
  groom: '/assets/template44/groom-portrait.webp',
  wideA: '/assets/template61/gallery-1.webp',
  wideB: '/assets/template61/gallery-2.webp',
  wideC: '/assets/template61/gallery-4.webp',
  wideD: '/assets/template61/gallery-5.webp',
  wideE: '/assets/template61/gallery-6.webp',
};

const calendar42 = ['empty', ...Array.from({ length: 31 }, (_, index) => index + 1)];

const reveal42 = {
  initial: { opacity: 0, y: 34 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-70px' },
  transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
};

function getCountdown42() {
  const target = new Date('2027-12-25T10:30:00+07:00').getTime();
  const seconds = Math.max(0, Math.floor((target - Date.now()) / 1000));
  return [
    [Math.floor(seconds / 86400), 'ngày'],
    [Math.floor((seconds % 86400) / 3600), 'giờ'],
    [Math.floor((seconds % 3600) / 60), 'phút'],
    [seconds % 60, 'giây'],
  ];
}

function Template42() {
  const [opened, setOpened] = useState(() => new URLSearchParams(window.location.search).has('preview'));
  const [opening, setOpening] = useState(false);
  const [rsvpSent, setRsvpSent] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('template42-page');
    document.body.classList.add('template42-page');
    return () => {
      document.documentElement.classList.remove('template42-page');
      document.body.classList.remove('template42-page');
    };
  }, []);

  useEffect(() => {
    const previous = document.body.style.overflow;
    if (!opened) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [opened]);

  useEffect(() => {
    if (!opened) return undefined;
    const section = new URLSearchParams(window.location.search).get('section');
    if (!section) return undefined;
    const timer = window.setTimeout(() => document.getElementById(section)?.scrollIntoView({ block: 'start' }), 180);
    return () => window.clearTimeout(timer);
  }, [opened]);

  const openInvitation = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(() => setOpened(true), 1450);
  };

  return (
    <main className="template42">
      <h1 className="visually-hidden">Thiệp cưới online mẫu 42</h1>
      <AnimatePresence>{!opened && <Intro42 opening={opening} onOpen={openInvitation} />}</AnimatePresence>
      <WeddingMusicButton className="t42-music" />
      <Hero42 />
      <Invitation42 />
      <Family42 />
      <Event42 />
      <SweetStory42 />
      <About42 />
      <SaveDate42 />
      <Album42 />
      <Rsvp42 sent={rsvpSent} setSent={setRsvpSent} />
      <Gift42 />
      <footer className="t42-footer"><span>Thank you</span><p>MAI ANH &amp; QUỐC HUY</p></footer>
    </main>
  );
}

function Intro42({ opening, onOpen }) {
  return (
    <motion.section className="t42-intro" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.48 }}>
      <div className="t42-introMark">囍</div>
      <button className={opening ? 't42-envelope is-opening' : 't42-envelope'} type="button" onClick={onOpen} aria-label="Chạm để mở thiệp">
        <span className="t42-envelopeBack" />
        <motion.img src={assets42.wideA} alt="Ảnh cưới bên trong phong bì" animate={opening ? { y: -128, opacity: 1 } : { y: 34, opacity: 0 }} transition={{ duration: 0.75, delay: 0.34, ease: [0.22, 1, 0.36, 1] }} />
        <span className="t42-envelopeLeft" /><span className="t42-envelopeRight" /><span className="t42-envelopeFront" /><span className="t42-envelopeFlap" />
        <i>LH</i>
      </button>
      <motion.p animate={opening ? { opacity: 0, y: 8 } : { opacity: 1, y: 0 }}>Chạm để mở thiệp</motion.p>
    </motion.section>
  );
}

function Countdown42() {
  const [time, setTime] = useState(getCountdown42);
  useEffect(() => {
    const timer = window.setInterval(() => setTime(getCountdown42()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  return <div className="t42-countdown">{time.map(([value, label]) => <span key={label}><b>{String(value).padStart(2, '0')}</b><small>{label}</small></span>)}</div>;
}

function Hero42() {
  return (
    <section className="t42-hero" style={{ '--t42-hero': `url(${assets42.hero})` }}>
      <div className="t42-heroShade" />
      <motion.p initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>WEDDING INVITATION</motion.p>
      <motion.div className="t42-heroNames" initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.95, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}><span>Mai Anh</span><i>&amp;</i><span>Quốc Huy</span></motion.div>
      <motion.div className="t42-heroInvite" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.35 }}><strong>INVITATION</strong><span>25 · 12 · 2027</span></motion.div>
      <Countdown42 />
    </section>
  );
}

function Invitation42() {
  return (
    <section className="t42-invitation" id="invitation">
      <motion.div className="t42-invitationFrame" {...reveal42}>
        <span>INVITATION</span><h2>Gửi đến gia đình<br />và bạn bè thân mến,</h2>
        <p>Cảm ơn bạn đã dành thời gian quý báu để cùng chúng mình chung vui trong ngày đặc biệt này.</p>
        <p>Chúng mình vô cùng biết ơn vì luôn có sự đồng hành và thật vinh hạnh khi được chia sẻ niềm hạnh phúc cùng bạn.</p>
        <strong>Trân trọng kính mời bạn đến dự lễ cưới của chúng mình</strong>
      </motion.div>
    </section>
  );
}

function Family42() {
  return (
    <section className="t42-family">
      <motion.p className="t42-scriptTitle" {...reveal42}>Lễ Thành Hôn</motion.p>
      <motion.div className="t42-familyPhoto" {...reveal42}><img loading="lazy" decoding="async" src={assets42.wideB} alt="Mai Anh và Quốc Huy" /></motion.div>
      <div className="t42-familyGrid">
        <motion.article initial={{ opacity: 0, x: -38 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-70px' }} transition={{ duration: 0.7 }}><span>NHÀ TRAI</span><b>ÔNG PHẠM QUANG HẢI<br />BÀ ĐINH THỊ MAI</b><small>TP. Hà Nội</small></motion.article>
        <motion.article initial={{ opacity: 0, x: 38 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-70px' }} transition={{ duration: 0.7 }}><span>NHÀ GÁI</span><b>ÔNG NGUYỄN TIẾN MINH<br />BÀ LÊ THỊ HẢI YẾN</b><small>TP. Điện Biên</small></motion.article>
      </div>
      <motion.div className="t42-coupleNames" {...reveal42}><span>Phạm Quốc Huy</span><i>&amp;</i><span>Nguyễn Mai Anh</span></motion.div>
    </section>
  );
}

function Event42() {
  return (
    <section className="t42-event" id="event-details">
      <motion.p {...reveal42}>TIỆC MỪNG LỄ THÀNH HÔN</motion.p>
      <motion.h2 {...reveal42}>Vào lúc 10:30 · Thứ Sáu</motion.h2>
      <motion.div className="t42-dateStamp" {...reveal42}><span>THÁNG 12</span><strong>25</strong><span>NĂM 2027</span></motion.div>
      <motion.small {...reveal42}>(Tức ngày 17 tháng 11 năm Bính Ngọ)</motion.small>
      <motion.div className="t42-venue" {...reveal42}><span>ĐỊA ĐIỂM TỔ CHỨC</span><h3>TRỐNG ĐỒNG PALACE</h3><p>18A Lý Văn Phức, P. Ô Chợ Dừa, Hà Nội</p><a href="https://www.google.com/maps/search/?api=1&query=18A%20Ly%20Van%20Phuc%20Ha%20Noi" target="_blank" rel="noreferrer"><MapPin size={15} /> Xem đường đi</a></motion.div>
    </section>
  );
}

function SweetStory42() {
  return (
    <section className="t42-sweet">
      <motion.p {...reveal42}>SWEET WEDDING</motion.p>
      <motion.h2 {...reveal42}>MARRY<br /><em>ME?</em></motion.h2>
      <div className="t42-sweetCollage">
        <motion.img loading="lazy" decoding="async" src={assets42.bride} alt="Cô dâu trong ngày cưới" initial={{ opacity: 0, x: -36, rotate: -4 }} whileInView={{ opacity: 1, x: 0, rotate: -2 }} viewport={{ once: true }} transition={{ duration: 0.75 }} />
        <motion.img loading="lazy" decoding="async" src={assets42.wideC} alt="Khoảnh khắc cầu hôn" initial={{ opacity: 0, x: 36, rotate: 4 }} whileInView={{ opacity: 1, x: 0, rotate: 2 }} viewport={{ once: true }} transition={{ duration: 0.75, delay: 0.08 }} />
      </div>
      <motion.div className="t42-yes" {...reveal42}>YES, I DO!</motion.div>
    </section>
  );
}

function About42() {
  return (
    <section className="t42-about" id="about-us">
      <motion.p className="t42-scriptTitle" {...reveal42}>About us</motion.p>
      <div className="t42-profile bride"><motion.img loading="lazy" decoding="async" src={assets42.bride} alt="Cô dâu Nguyễn Mai Anh" initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.75 }} /><motion.div {...reveal42}><span>Bride</span><h3>Nguyễn Mai Anh</h3><p>12.05.2000<br />TP. Điện Biên</p></motion.div></div>
      <div className="t42-profile groom"><motion.img loading="lazy" decoding="async" src={assets42.groom} alt="Chú rể Phạm Quốc Huy" initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.75 }} /><motion.div {...reveal42}><span>Groom</span><h3>Phạm Quốc Huy</h3><p>05.08.1995<br />TP. Hà Nội</p></motion.div></div>
    </section>
  );
}

function SaveDate42() {
  const timeline = useMemo(() => [
    [Heart, '08:00', 'Lễ rước dâu'],
    [Camera, '09:30', 'Chụp hình lưu niệm'],
    [UtensilsCrossed, '10:30', 'Khai tiệc'],
  ], []);

  return (
    <section className="t42-saveDate" id="save-the-date">
      <motion.div className="t42-saveHead" {...reveal42}><span>Save the date</span><strong>2027 / DEC</strong></motion.div>
      <motion.figure {...reveal42}><img loading="lazy" decoding="async" src={assets42.wideE} alt="Ảnh cưới Mai Anh và Quốc Huy" /></motion.figure>
      <motion.div className="t42-calendar" {...reveal42}>
        {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day) => <b key={day}>{day}</b>)}
        {calendar42.map((day) => day === 'empty' ? <span key="empty" /> : <span key={day} className={day === 25 ? 'is-wedding' : ''}>{day === 25 && <Heart size={30} fill="currentColor" strokeWidth={0} />}<i>{day}</i></span>)}
      </motion.div>
      <div className="t42-timeline">{timeline.map(([Icon, time, title], index) => <motion.article key={time} initial={{ opacity: 0, x: index % 2 ? 34 : -34 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.64, delay: index * 0.08 }}><Icon size={21} /><b>{time}</b><span>{title}</span></motion.article>)}</div>
    </section>
  );
}

function Album42() {
  return (
    <section className="t42-album" id="album-of-love">
      <motion.p className="t42-scriptTitle" {...reveal42}>Album of love</motion.p>
      <div className="t42-albumGrid">
        <motion.img loading="lazy" decoding="async" src={assets42.wideA} alt="Album ảnh cưới 1" {...reveal42} />
        <motion.img loading="lazy" decoding="async" src={assets42.couple} alt="Album ảnh cưới 2" {...reveal42} />
        <motion.img loading="lazy" decoding="async" src={assets42.wideD} alt="Album ảnh cưới 3" {...reveal42} />
        <motion.img loading="lazy" decoding="async" src={assets42.wideC} alt="Album ảnh cưới 4" {...reveal42} />
      </div>
    </section>
  );
}

function Rsvp42({ sent, setSent }) {
  const submit = (event) => {
    event.preventDefault();
    setSent(true);
  };
  return (
    <section className="t42-rsvp" id="rsvp">
      <motion.form onSubmit={submit} {...reveal42}>
        <span>INVITATION</span><h2>Xác nhận tham dự</h2>
        <label>Họ và tên<input required placeholder="Nhập tên của bạn" /></label>
        <fieldset><legend>Bạn sẽ tham dự chứ?</legend><label><input type="radio" name="attendance42" defaultChecked /> Có, tôi sẽ tham dự</label><label><input type="radio" name="attendance42" /> Tôi bận, rất tiếc không thể tham dự</label></fieldset>
        <label>Số lượng người tham dự<select defaultValue="1 người"><option>1 người</option><option>2 người</option><option>3 người</option><option>4 người</option></select></label>
        <button type="submit"><Send size={16} /> Gửi xác nhận</button>
        {sent && <p className="t42-success" role="status"><Check size={16} /> Cảm ơn bạn, xác nhận đã được ghi nhận.</p>}
      </motion.form>
      <p>Mình rất muốn được chụp chung với bạn những tấm hình kỷ niệm, vì vậy hãy đến sớm hơn một chút bạn nhé!</p>
    </section>
  );
}

function Gift42() {
  return (
    <section className="t42-gift">
      <motion.div className="t42-giftHead" {...reveal42}><Gift size={28} /><span>GỬI QUÀ MỪNG</span></motion.div>
      <motion.article {...reveal42}><img className="t42-giftPortrait" loading="lazy" decoding="async" src={assets42.bride} alt="Cô dâu Mai Anh" /><div><span>Cô dâu</span><b>Nguyễn Mai Anh</b><small>MB Bank · 012345678</small></div><img className="t42-bankQr" loading="lazy" decoding="async" src="/assets/template42/qr-demo.png" alt="QR mở thiệp mẫu 42" /></motion.article>
      <motion.article {...reveal42}><img className="t42-bankQr" loading="lazy" decoding="async" src="/assets/template42/qr-demo.png" alt="QR mở thiệp mẫu 42" /><div><span>Chú rể</span><b>Phạm Quốc Huy</b><small>MB Bank · 012345678</small></div><img className="t42-giftPortrait" loading="lazy" decoding="async" src={assets42.groom} alt="Chú rể Quốc Huy" /></motion.article>
    </section>
  );
}

export default Template42;
