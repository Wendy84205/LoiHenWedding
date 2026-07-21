import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Gift, Heart, MapPin, Send } from 'lucide-react';
import WeddingMusicButton from './WeddingMusicButton.jsx';
import useWeddingCountdown from './useWeddingCountdown.js';
import './template46.css';

const t46Assets = {
  cutout: '/assets/template44/couple-sticker.webp',
  hero: '/assets/template61/couple-hero.webp',
  close: '/assets/template61/couple-close.webp',
  bride: '/assets/template44/bride-portrait.webp',
  groom: '/assets/template44/groom-portrait.webp',
  sea: '/assets/template44/sea-couple.webp',
  mountain: '/assets/template44/mountain-couple.webp',
  red: '/assets/template39/couple-red.webp',
  seated: '/assets/template39/couple-red-seated.webp',
  detail: '/assets/template61/gallery-1.webp',
  sunlight: '/assets/template61/gallery-2.webp',
};

const reveal46 = (direction = 'up', delay = 0) => {
  const offset = direction === 'left' ? { x: 54, y: 0 } : direction === 'right' ? { x: -54, y: 0 } : { x: 0, y: 48 };
  return {
    initial: { opacity: 0, ...offset },
    whileInView: { opacity: 1, x: 0, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 1.3, delay, ease: 'easeOut' },
  };
};

const calendar46 = Array.from({ length: 31 }, (_, index) => index + 1);

function Template46() {
  const [rsvpSent, setRsvpSent] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('template46-page');
    document.body.classList.add('template46-page');
    return () => {
      document.documentElement.classList.remove('template46-page');
      document.body.classList.remove('template46-page');
    };
  }, []);

  useEffect(() => {
    const section = new URLSearchParams(window.location.search).get('section');
    if (!section) return undefined;
    const timer = window.setTimeout(() => document.getElementById(section)?.scrollIntoView({ block: 'start' }), 200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="template46">
      <WeddingMusicButton className="t46-music" />
      <Hero46 />
      <Family46 />
      <Invitation46 />
      <Calendar46 />
      <Story46 />
      <Gallery46 />
      <Portrait46 />
      <Countdown46 />
      <Rsvp46 sent={rsvpSent} setSent={setRsvpSent} />
      <Gift46 />
    </main>
  );
}

function Hero46() {
  return (
    <section className="t46-hero" id="hero">
      <motion.p className="t46-arcText" initial={{ opacity: 0, x: -45 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.3, ease: 'easeOut' }}>I LOVE YOU</motion.p>
      <motion.div className="t46-heroArch" initial={{ opacity: 0, y: 45 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.3, delay: .2, ease: 'easeOut' }}><img src={t46Assets.cutout} alt="Tuấn Linh và Nguyễn Phượng" fetchPriority="high" /></motion.div>
      <motion.div className="t46-heroSchedule" initial={{ opacity: 0, x: 45 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.3, delay: .2, ease: 'easeOut' }}>
        <article><span>THƯ MỜI TIỆC CƯỚI</span><b>THỨ BẢY · 16:30</b><small>05 . 12 . 2027</small></article>
        <article><span>LỄ THÀNH HÔN</span><b>CHỦ NHẬT · 12:00</b><small>06 . 12 . 2027</small></article>
      </motion.div>
    </section>
  );
}

function Family46() {
  return (
    <section className="t46-family" id="family">
      <motion.h1 {...reveal46('up', .2)}>WEDDING</motion.h1>
      <div className="t46-familyGrid">
        <motion.article {...reveal46('right')}><h2>Nhà Trai</h2><p>Ông: Tống Đình Quý<br />Bà: Vũ Thị Hoài Vân</p><small>10 Lê Lợi · Đề Thám · TP. Thái Bình</small></motion.article>
        <motion.i {...reveal46('up')}>✣</motion.i>
        <motion.article {...reveal46('left')}><h2>Nhà Gái</h2><p>Ông: Nguyễn Đình Quý<br />Bà: Vũ Thị Hoài Vân</p><small>Vĩnh An Nam · Tam Xuân · Đà Nẵng</small></motion.article>
      </div>
      <motion.div className="t46-names" {...reveal46('up', .2)}><span>Tuấn Linh</span><i>囍</i><span>Nguyễn Phượng</span></motion.div>
    </section>
  );
}

function Invitation46() {
  const locations = [
    { title: 'Tiệc Mời Cưới Nhà Trai', time: '16:30 · Thứ bảy', date: '05 . 12 . 2027', lunar: '11/11 âm lịch', place: 'Tại tư gia Nhà Trai', query: '10 Le Loi De Tham Thai Binh' },
    { title: 'Tiệc Mời Cưới Nhà Gái', time: '18:00 · Thứ bảy', date: '06 . 12 . 2027', lunar: '11/11 âm lịch', place: 'Khách sạn Cinelove', query: 'Cinelove hotel Da Nang' },
  ];

  return (
    <section className="t46-invitation" id="invitation">
      <motion.div className="t46-inviteHead" {...reveal46('up')}><span>Thư Mời</span><p>THAM DỰ LỄ THÀNH HÔN CỦA CHÚNG MÌNH</p></motion.div>
      <div className="t46-invitePhotos">
        <motion.img loading="lazy" decoding="async" src={t46Assets.sea} alt="Ảnh cưới bên bờ biển" {...reveal46('right', .2)} />
        <motion.img loading="lazy" decoding="async" src={t46Assets.cutout} alt="Cặp đôi trong ngày cưới" {...reveal46('up', .2)} />
        <motion.img loading="lazy" decoding="async" src={t46Assets.hero} alt="Tuấn Linh và Nguyễn Phượng" {...reveal46('left', .2)} />
      </div>
      <motion.p className="t46-at" {...reveal46('up')}>Vào Lúc</motion.p>
      <motion.div className="t46-dateRow" {...reveal46('up')}><b>12:00</b><b>06.12.2027</b><b>Chủ Nhật</b></motion.div>
      <motion.p className="t46-lunar" {...reveal46('up')}>Tức ngày 12 tháng 11 năm Ất Tỵ</motion.p>
      <motion.div className="t46-mainVenue" {...reveal46('up', .2)}><span>Tại</span><h2>Tư Gia Nhà Trai</h2><p>10 Lê Lợi · Đề Thám · TP. Thái Bình</p><a href="https://www.google.com/maps/search/?api=1&query=10%20Le%20Loi%20De%20Tham%20Thai%20Binh" target="_blank" rel="noreferrer"><MapPin size={14} /> Chỉ đường</a></motion.div>
      <div className="t46-locationGrid">
        {locations.map((location, index) => <motion.article key={location.title} {...reveal46(index ? 'left' : 'right')}><h3>{location.title}</h3><b>{location.time}</b><strong>{location.date}</strong><span>{location.lunar}</span><p>{location.place}</p><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.query)}`} target="_blank" rel="noreferrer">Chỉ đường</a></motion.article>)}
      </div>
    </section>
  );
}

function Calendar46() {
  return (
    <section className="t46-calendarSection" id="save-the-date">
      <motion.div className="t46-calendar" {...reveal46('up', .2)}>
        <h2>Tháng 12</h2>
        <div>
          {calendar46.map((day) => <span key={day} className={day === 6 ? 'is-wedding' : day === 5 ? 'is-eve' : ''}>{day === 6 && <Heart size={40} fill="currentColor" strokeWidth={0} />}{day === 5 && <Heart size={38} />}<i>{day}</i></span>)}
        </div>
      </motion.div>
    </section>
  );
}

function Story46() {
  return (
    <section className="t46-story" id="love-story">
      <div className="t46-storyColumns">
        <motion.figure className="t46-tallBride" {...reveal46('right')}><img loading="lazy" decoding="async" src={t46Assets.bride} alt="Cô dâu Nguyễn Phượng" /><figcaption>If I know what love is,<br />it is because of you.</figcaption></motion.figure>
        <div className="t46-storyRight">
          <motion.figure {...reveal46('left', .2)}><img loading="lazy" decoding="async" src={t46Assets.close} alt="Khoảnh khắc thân mật của cặp đôi" /><figcaption>I love you all I can</figcaption></motion.figure>
          <motion.figure {...reveal46('left')}><img loading="lazy" decoding="async" src={t46Assets.sea} alt="Ảnh cưới của Tuấn Linh và Nguyễn Phượng" /><figcaption>With You</figcaption></motion.figure>
          <motion.p {...reveal46('left')}>Khoảnh khắc gặp được em,<br />anh đã quyết định sẽ cùng em đi đến<br />hết cuộc đời.</motion.p>
        </div>
      </div>
    </section>
  );
}

function Gallery46() {
  return (
    <section className="t46-gallery" id="with-you">
      <motion.p className="t46-galleryQuote" {...reveal46('up')}>Hôn nhân là chuyện cả đời<br />Yêu người vừa ý, Cưới người Mình thương</motion.p>
      <div className="t46-galleryGrid">
        <motion.img loading="lazy" decoding="async" src={t46Assets.close} alt="Cặp đôi ôm nhau" {...reveal46('right')} />
        <motion.img loading="lazy" decoding="async" src={t46Assets.mountain} alt="Khoảnh khắc cưới giữa thiên nhiên" {...reveal46('left')} />
        <motion.img loading="lazy" decoding="async" src={t46Assets.sunlight} alt="Cặp đôi trong ánh sáng" {...reveal46('right')} />
        <motion.img loading="lazy" decoding="async" src={t46Assets.sea} alt="Cặp đôi bên bờ biển" {...reveal46('left')} />
      </div>
      <motion.div className="t46-withYou" {...reveal46('up')}><h2>WITH YOU</h2><p>Every moment of each day,<br />loving and missing you<br />dominates every inch of my brain.</p></motion.div>
    </section>
  );
}

function Portrait46() {
  return (
    <section className="t46-portrait" id="better-together">
      <motion.div className="t46-portraitEnglish" {...reveal46('up')}>You make me want to be a better man.</motion.div>
      <motion.img loading="lazy" decoding="async" src={t46Assets.hero} alt="Cô dâu Nguyễn Phượng cầm hoa" {...reveal46('right', .2)} />
      <motion.img loading="lazy" decoding="async" src={t46Assets.cutout} alt="Tuấn Linh và Nguyễn Phượng vui bên nhau" {...reveal46('left', .2)} />
      <motion.p {...reveal46('up')}>Em khiến anh muốn trở thành phiên bản tốt nhất của chính mình</motion.p>
    </section>
  );
}

function Countdown46() {
  const countdown = useWeddingCountdown('2027-12-06T12:00:00+07:00');
  return (
    <section className="t46-countdownSection" id="countdown">
      <motion.img loading="lazy" decoding="async" src={t46Assets.close} alt="Cặp đôi trong khoảnh khắc hạnh phúc" {...reveal46('up', .2)} />
      <div className="t46-countdown">{['ngày', 'giờ', 'phút', 'giây'].map((label, index) => <motion.span key={label} {...reveal46('right', index * .08)}><b>{countdown[index]}</b><small>{label}</small></motion.span>)}</div>
    </section>
  );
}

function Rsvp46({ sent, setSent }) {
  const submit = (event) => {
    event.preventDefault();
    setSent(true);
  };
  return (
    <section className="t46-rsvp" id="rsvp">
      <motion.div className="t46-rsvpPhoto" {...reveal46('up', .2)}><span>LOVE</span><img loading="lazy" decoding="async" src={t46Assets.cutout} alt="Tuấn Linh và Nguyễn Phượng" /><span>LOVE</span></motion.div>
      <motion.form onSubmit={submit} {...reveal46('up', .3)}>
        <h2>Xác nhận tham dự</h2>
        <label>Họ và tên<input required placeholder="Nhập tên của bạn" /></label>
        <fieldset><legend>Bạn sẽ tham dự chứ?</legend><label><input type="radio" name="attendance46" defaultChecked /> Có, tôi sẽ tham dự</label><label><input type="radio" name="attendance46" /> Tôi bận, rất tiếc không thể tham dự</label></fieldset>
        <label>Số lượng người tham dự<select defaultValue="1 người">{Array.from({ length: 10 }, (_, index) => <option key={index + 1}>{index + 1} người</option>)}</select></label>
        <button type="submit"><Send size={16} /> Gửi xác nhận</button>
        {sent && <span className="t46-success" role="status"><Check size={16} /> Cảm ơn bạn, xác nhận đã được ghi nhận.</span>}
      </motion.form>
    </section>
  );
}

function Gift46() {
  return (
    <section className="t46-gift" id="gift-box">
      <motion.div {...reveal46('up', .2)}><h2>HỘP QUÀ YÊU THƯƠNG</h2><Gift size={82} /><p>Cảm ơn bạn đã đồng hành và chúc phúc cho hành trình yêu thương của chúng mình.<br />Niềm vui hôm nay trọn vẹn hơn khi có bạn cùng sẻ chia! 🌷</p></motion.div>
    </section>
  );
}

export default Template46;
