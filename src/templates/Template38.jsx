import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Gift, Heart, MapPin, Send, Sparkles } from 'lucide-react';
import WeddingMusicButton from './WeddingMusicButton.jsx';
import useWeddingCountdown from './useWeddingCountdown.js';
import './template38.css';
import './new/fontFidelity.css';

const t38Assets = {
  cutout: '/assets/template44/couple-sticker.webp',
  hero: '/assets/template39/couple-red.webp',
  seated: '/assets/template39/couple-red-seated.webp',
  bride: '/assets/template44/bride-portrait.webp',
  groom: '/assets/template44/groom-portrait.webp',
  close: '/assets/template61/couple-close.webp',
  warm: '/assets/template61/couple-hero.webp',
  detail: '/assets/template61/gallery-1.webp',
};

const makeReveal38 = (direction = 'up', delay = 0) => {
  const offsets = {
    up: { x: 0, y: 48 },
    left: { x: 54, y: 0 },
    right: { x: -54, y: 0 },
  };
  return {
    initial: { opacity: 0, ...offsets[direction] },
    whileInView: { opacity: 1, x: 0, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 1.3, delay, ease: 'easeOut' },
  };
};

const calendar38 = [
  ...Array.from({ length: 5 }, (_, index) => `empty-${index}`),
  ...Array.from({ length: 30 }, (_, index) => index + 1),
];

function Template38() {
  const [rsvpSent, setRsvpSent] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('template38-page');
    document.body.classList.add('template38-page');
    return () => {
      document.documentElement.classList.remove('template38-page');
      document.body.classList.remove('template38-page');
    };
  }, []);

  useEffect(() => {
    const section = new URLSearchParams(window.location.search).get('section');
    if (!section) return undefined;
    const timer = window.setTimeout(() => document.getElementById(section)?.scrollIntoView({ block: 'start' }), 200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="template38">
      <WeddingMusicButton className="t38-music" />
      <Hero38 />
      <Invitation38 />
      <Date38 />
      <VenueRsvp38 sent={rsvpSent} setSent={setRsvpSent} />
      <Story38 />
      <Chapter38 />
      <ThankYou38 />
    </main>
  );
}

function Hero38() {
  return (
    <section className="t38-hero" id="hero">
      <motion.div className="t38-save" initial={{ opacity: 0, x: -45 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.3, ease: 'easeOut' }}><span>Save The Date</span><b>16.11.2027</b></motion.div>
      <motion.h1 initial={{ opacity: 0, y: 45 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.3, ease: 'easeOut' }}>Thanh Huy <i>–</i> Phương Thúy</motion.h1>
      <motion.div className="t38-doubleJoy" initial={{ opacity: 0, x: 45 }} animate={{ opacity: .78, x: 0 }} transition={{ duration: 1.3, delay: .2, ease: 'easeOut' }}>囍</motion.div>
      <motion.img src={t38Assets.cutout} alt="Thanh Huy và Phương Thúy" fetchPriority="high" initial={{ opacity: 0, y: 48 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.3, delay: .2, ease: 'easeOut' }} />
    </section>
  );
}

function Invitation38() {
  const countdown = useWeddingCountdown('2027-11-16T12:00:00+07:00');
  return (
    <section className="t38-invitation" id="invitation">
      <motion.h2 {...makeReveal38('up')}>Wedding Invitation</motion.h2>
      <div className="t38-families">
        <motion.article {...makeReveal38('right')}><b>Nhà trai</b><span>Ông Nguyễn Viết Minh<br />Bà Trịnh Thị Lan</span></motion.article>
        <motion.i {...makeReveal38('up')}>&amp;</motion.i>
        <motion.article {...makeReveal38('left')}><b>Nhà gái</b><span>Ông Trịnh Văn Huy<br />Bà Ngô Mai Hoàn</span></motion.article>
      </div>
      <div className="t38-portraits">
        <motion.figure {...makeReveal38('right', 0.2)}><img loading="lazy" decoding="async" src={t38Assets.groom} alt="Chú rể Nguyễn Thanh Huy" /><figcaption>Nguyễn Thanh Huy</figcaption></motion.figure>
        <motion.figure {...makeReveal38('left', 0.2)}><img loading="lazy" decoding="async" src={t38Assets.bride} alt="Cô dâu Trịnh Phương Thúy" /><figcaption>Trịnh Phương Thúy</figcaption></motion.figure>
      </div>
      <motion.div className="t38-countdown" {...makeReveal38('up', 0.3)}>
        {['ngày', 'giờ', 'phút', 'giây'].map((label, index) => <span key={label}><b>{countdown[index]}</b><small>{label}</small></span>)}
      </motion.div>
      <motion.div className="t38-divider" {...makeReveal38('up', 0.2)} />
      <motion.h3 {...makeReveal38('up')}>Trân Trọng Kính Mời</motion.h3>
      <div className="t38-photoTriptych">
        <motion.img loading="lazy" decoding="async" src={t38Assets.seated} alt="Khoảnh khắc cưới của Huy và Thúy" {...makeReveal38('right', 0.2)} />
        <motion.img loading="lazy" decoding="async" src={t38Assets.hero} alt="Ảnh cưới của Huy và Thúy" {...makeReveal38('up', 0.2)} />
        <motion.img loading="lazy" decoding="async" src={t38Assets.close} alt="Cô dâu chú rể bên nhau" {...makeReveal38('left', 0.2)} />
      </div>
      <motion.p className="t38-inviteLine" {...makeReveal38('up')}>THAM DỰ TIỆC MỪNG LỄ THÀNH HÔN</motion.p>
      <motion.div className="t38-eventStamp" {...makeReveal38('up')}>
        <span><small>Vào lúc</small><b>12:00</b></span>
        <span><small>Chủ Nhật</small><strong>16</strong><small>Tháng 11</small></span>
        <span><small>Năm</small><b>2027</b></span>
      </motion.div>
    </section>
  );
}

function Date38() {
  return (
    <section className="t38-date" id="save-the-date">
      <motion.div className="t38-calendar" {...makeReveal38('up')}>
        <h2>11.2027</h2>
        <div className="t38-calendarGrid">
          {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => <b key={day}>{day}</b>)}
          {calendar38.map((day) => typeof day === 'string' ? <span key={day} /> : <span key={day} className={day === 16 ? 'is-wedding' : ''}>{day === 16 && <Heart size={38} fill="currentColor" strokeWidth={0} />}<i>{day}</i></span>)}
        </div>
        <strong>2027</strong>
      </motion.div>
    </section>
  );
}

function VenueRsvp38({ sent, setSent }) {
  const submit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <section className="t38-venueRsvp" id="venue">
      <motion.div className="t38-divider" {...makeReveal38('up', 0.2)} />
      <motion.header {...makeReveal38('up')}><h2>Địa Điểm Tổ Chức</h2><p>Nhà hàng Diamond Palace,<br />Hai Bà Trưng, Hà Nội</p></motion.header>
      <motion.a className="t38-map" href="https://www.google.com/maps/search/?api=1&query=Diamond%20Palace%20Hai%20Ba%20Trung%20Ha%20Noi" target="_blank" rel="noreferrer" {...makeReveal38('up', 0.3)}>
        <span className="t38-mapRoad roadOne" /><span className="t38-mapRoad roadTwo" /><span className="t38-mapRoad roadThree" />
        <MapPin size={34} fill="currentColor" /><b>DIAMOND PALACE</b><small>Mở Google Maps</small>
      </motion.a>
      <motion.div className="t38-divider" {...makeReveal38('up', 0.2)} />
      <motion.h2 className="t38-rsvpTitle" id="rsvp" {...makeReveal38('up')}>Xác nhận tham dự</motion.h2>
      <motion.div className="t38-seal" {...makeReveal38('up', 0.2)}>囍</motion.div>
      <motion.form onSubmit={submit} {...makeReveal38('up', 0.3)}>
        <label>Họ và tên<input required placeholder="Nhập tên của bạn" /></label>
        <fieldset><legend>Bạn sẽ tham dự chứ?</legend><label><input type="radio" name="attendance38" defaultChecked /> Có, tôi sẽ tham dự</label><label><input type="radio" name="attendance38" /> Tôi bận, rất tiếc không thể tham dự</label></fieldset>
        <button type="submit"><Send size={16} /> Gửi xác nhận</button>
        {sent && <span className="t38-success" role="status"><Check size={16} /> Cảm ơn bạn, chúng mình đã nhận được xác nhận.</span>}
      </motion.form>
    </section>
  );
}

function Story38() {
  return (
    <section className="t38-story" id="our-story">
      <motion.div className="t38-charms" {...makeReveal38('up', 0.2)}>
        <span><Gift /></span>
        <span><Heart fill="currentColor" /></span>
        <span><Sparkles /></span>
      </motion.div>
      <motion.img className="t38-storyCutout" loading="lazy" decoding="async" src={t38Assets.cutout} alt="Minh hoạ cô dâu chú rể" {...makeReveal38('up', 0.2)} />
      <motion.p className="t38-storyQuote" {...makeReveal38('up')}>Hạnh phúc lớn nhất chính là có thể đặt tay mình vào tay em.</motion.p>
      <motion.div className="t38-storyFrame" {...makeReveal38('up', 0.2)}>
        <span>Huy<br /><i>&amp;</i><br />Thúy</span>
        <img loading="lazy" decoding="async" src={t38Assets.seated} alt="Thanh Huy và Phương Thúy" />
      </motion.div>
    </section>
  );
}

function Chapter38() {
  return (
    <section className="t38-chapter" id="chapter-three">
      <motion.blockquote {...makeReveal38('up')}>Em không phải là điểm cuối của tình yêu, mà là động lực nguyên sơ của nó. Vì em, anh đã yêu thế giới này.</motion.blockquote>
      <div className="t38-chapterPair">
        <motion.img loading="lazy" decoding="async" src={t38Assets.groom} alt="Chú rể Thanh Huy" {...makeReveal38('right', 0.2)} />
        <motion.img loading="lazy" decoding="async" src={t38Assets.bride} alt="Cô dâu Phương Thúy" {...makeReveal38('left', 0.2)} />
      </div>
      <motion.figure {...makeReveal38('up', 0.2)}><img loading="lazy" decoding="async" src={t38Assets.hero} alt="Chương ba trong câu chuyện tình yêu" /><figcaption>Chapter Three</figcaption></motion.figure>
      <motion.p {...makeReveal38('up')}>“Giữa thế gian huyên náo, em là điều duy nhất đáng giá.”</motion.p>
      <div className="t38-lastPair">
        <motion.img loading="lazy" decoding="async" src={t38Assets.warm} alt="Cặp đôi trong ngày cưới" {...makeReveal38('right', 0.2)} />
        <motion.img loading="lazy" decoding="async" src={t38Assets.close} alt="Khoảnh khắc thân mật trong ngày cưới" {...makeReveal38('left', 0.2)} />
      </div>
    </section>
  );
}

function ThankYou38() {
  return (
    <footer className="t38-thanks" id="thank-you">
      <motion.img loading="lazy" decoding="async" src={t38Assets.seated} alt="Thanh Huy và Phương Thúy cảm ơn khách mời" {...makeReveal38('up', 0.2)} />
      <motion.div {...makeReveal38('up')}><span>Thank You !</span><small>THANH HUY &amp; PHƯƠNG THÚY</small></motion.div>
    </footer>
  );
}

export default Template38;
