import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Heart, MapPin, Send } from 'lucide-react';
import WeddingMusicButton from './WeddingMusicButton.jsx';
import './template2.css';
import './new/fontFidelity.css';

const t2Assets = {
  hero: '/assets/template61/couple-hero.webp',
  couple: '/assets/template61/couple-close.webp',
  rings: '/assets/template61/gallery-1.webp',
  sunlight: '/assets/template61/gallery-2.webp',
  venue: '/assets/template61/gallery-3.webp',
  hands: '/assets/template61/gallery-4.webp',
  celebration: '/assets/template61/gallery-5.webp',
  sunset: '/assets/template61/gallery-6.webp',
  table: '/assets/template61/story.webp',
  bride: '/assets/template44/bride-portrait.webp',
  groom: '/assets/template44/groom-portrait.webp',
  illustration: '/assets/template44/couple-sticker.webp',
};

const reveal2 = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-70px' },
  transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
};

const calendar2 = [
  ...Array.from({ length: new Date(2050, 4, 1).getDay() }, (_, index) => `empty-${index}`),
  ...Array.from({ length: 31 }, (_, index) => index + 1),
];

function getCountdown2() {
  const target = new Date('2050-05-20T12:00:00+07:00').getTime();
  const total = Math.max(0, Math.floor((target - Date.now()) / 1000));
  return [
    [Math.floor(total / 86400), 'ngày'],
    [Math.floor((total % 86400) / 3600), 'giờ'],
    [Math.floor((total % 3600) / 60), 'phút'],
    [total % 60, 'giây'],
  ];
}

function Template2() {
  const [rsvpSent, setRsvpSent] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('template2-page');
    document.body.classList.add('template2-page');
    return () => {
      document.documentElement.classList.remove('template2-page');
      document.body.classList.remove('template2-page');
    };
  }, []);

  useEffect(() => {
    const section = new URLSearchParams(window.location.search).get('section');
    if (!section) return undefined;
    const timer = window.setTimeout(() => document.getElementById(section)?.scrollIntoView({ block: 'start' }), 180);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="template2">
      <WeddingMusicButton className="t2-music" />
      <Hero2 />
      <Welcome2 />
      <LoveStory2 />
      <Editorial2 />
      <Information2 />
      <Date2 />
      <Venue2 />
      <Rsvp2 sent={rsvpSent} setSent={setRsvpSent} />
      <Footer2 />
    </main>
  );
}

function Hero2() {
  return (
    <section className="t2-hero" id="hero">
      <img src={t2Assets.hero} alt="Quang Huy và Thuỳ Linh trong ngày cưới" fetchPriority="high" />
      <div className="t2-heroShade" />
      <motion.p className="t2-heroQuote" initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        I love three things in this world.<br />Sun, moon and you.
      </motion.p>
      <motion.div className="t2-heroWelcome" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.14 }}>
        <span>WELCOME TO OUR WEDDING</span>
        <h1>We got married</h1>
      </motion.div>
      <motion.div className="t2-heroNames" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.45 }}>
        <span><small>BRIDE</small>THUỲ LINH</span>
        <b>20 · 05 · 2050</b>
        <span><small>GROOM</small>QUANG HUY</span>
      </motion.div>
    </section>
  );
}

function Welcome2() {
  return (
    <section className="t2-welcome" id="welcome">
      <motion.figure {...reveal2}>
        <img loading="lazy" decoding="async" src={t2Assets.sunset} alt="Khoảnh khắc bình yên của cô dâu chú rể" />
        <figcaption>Right love <i>|</i> Right reason <i>|</i> Right for you</figcaption>
      </motion.figure>
      <motion.div className="t2-welcomeCopy" {...reveal2}>
        <p>TO OUR FAMILY AND FRIENDS,</p>
        <h2>Thank you for celebrating our special day, supporting us and sharing our love.</h2>
        <span>Gửi đến bạn tấm thiệp cưới đầy yêu thương. Những ai nhận được lời mời này đều là những người đặc biệt với bọn mình. Mong bạn và gia đình sẽ đến chung vui, cùng chứng kiến khoảnh khắc hạnh phúc nhất của hai đứa.</span>
      </motion.div>
    </section>
  );
}

function LoveStory2() {
  return (
    <section className="t2-story" id="love-story">
      <motion.header {...reveal2}>
        <span>01 / OUR STORY</span>
        <h2>OUR LOVE STORY</h2>
        <p>How it all began</p>
      </motion.header>
      <motion.div className="t2-storyLead" {...reveal2}>
        <img loading="lazy" decoding="async" src={t2Assets.hands} alt="Hai người nắm tay nhau" />
        <span>Our story<br />begins here</span>
      </motion.div>
      <motion.blockquote {...reveal2}>“Trước đây cứ nghĩ đám cưới chỉ là một thông báo chính thức. Đến khi gặp đúng người, mình mới hiểu đó là ngày muốn chia sẻ niềm vui với tất cả những người mình thương.”</motion.blockquote>
      <motion.div className="t2-storyCollage" {...reveal2}>
        <div className="t2-botanicalRing"><img loading="lazy" decoding="async" src={t2Assets.sunlight} alt="Cặp đôi dưới ánh nắng" /></div>
        <img loading="lazy" decoding="async" src={t2Assets.rings} alt="Nhẫn cưới của cô dâu chú rể" />
        <strong>OUR<br />LOVE STORY</strong>
      </motion.div>
      <motion.p className="t2-storyPromise" {...reveal2}>Love goes with the wind,<br />but never goes away.</motion.p>
    </section>
  );
}

function Editorial2() {
  return (
    <section className="t2-editorial" id="album">
      <motion.div className="t2-editorialLabels" {...reveal2}><span>FALL<br />IN LOVE</span><span>YOU ARE</span><span>MY DEAREST<br />LOVE</span></motion.div>
      <motion.figure className="t2-editorialMain" {...reveal2}>
        <img loading="lazy" decoding="async" src={t2Assets.sunset} alt="Cặp đôi bên nhau lúc hoàng hôn" />
        <figcaption>Mong rằng khi ngoảnh lại,<br />ta vẫn có nhau.</figcaption>
      </motion.figure>
      <div className="t2-editorialPair">
        <motion.img loading="lazy" decoding="async" src={t2Assets.hands} alt="Bàn tay cô dâu chú rể" initial={{ opacity: 0, x: -34 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} />
        <motion.img loading="lazy" decoding="async" src={t2Assets.sunlight} alt="Bó hoa cưới dưới nắng" initial={{ opacity: 0, x: 34 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} />
      </div>
      <motion.div className="t2-editorialWords" {...reveal2}><span>LOVE</span><span>WEDDING</span><span>FOREVER</span></motion.div>
      <motion.p className="t2-poem" {...reveal2}>Núi biếc rừng xanh vang vọng tiếng lòng.<br />Chúng mình, hẹn gặp nhau trong ngày cưới nhé!</motion.p>
    </section>
  );
}

function Information2() {
  return (
    <section className="t2-information" id="wedding-information">
      <motion.header {...reveal2}><p>THE BRIDE · THE GROOM · LOVE</p><h2>WEDDING<br />INFORMATION</h2></motion.header>
      <div className="t2-profiles">
        <motion.article initial={{ opacity: 0, x: -36 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.72 }}><img loading="lazy" decoding="async" src={t2Assets.bride} alt="Cô dâu Thuỳ Linh" /><span>Cô dâu</span><b>THUỲ LINH</b></motion.article>
        <motion.article initial={{ opacity: 0, x: 36 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.72 }}><img loading="lazy" decoding="async" src={t2Assets.groom} alt="Chú rể Quang Huy" /><span>Chú rể</span><b>QUANG HUY</b></motion.article>
      </div>
      <motion.figure className="t2-perfect" {...reveal2}>
        <img loading="lazy" decoding="async" src={t2Assets.couple} alt="Ảnh cưới Thuỳ Linh và Quang Huy" />
        <figcaption><small>YOU ARE</small>PERFECT</figcaption>
      </motion.figure>
    </section>
  );
}

function Countdown2() {
  const [time, setTime] = useState(getCountdown2);
  useEffect(() => {
    const timer = window.setInterval(() => setTime(getCountdown2()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  return <div className="t2-countdown">{time.map(([value, label]) => <span key={label}><b>{value}</b><small>{label}</small></span>)}</div>;
}

function Date2() {
  return (
    <section className="t2-date" id="save-the-date">
      <motion.header {...reveal2}><Heart size={20} fill="currentColor" /><span>SAVE THE DATE</span><h2>MAY 2050</h2></motion.header>
      <motion.div className="t2-calendar" {...reveal2}>
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => <b key={day}>{day}</b>)}
        {calendar2.map((day) => typeof day === 'string' ? <span key={day} /> : <span key={day} className={day === 20 ? 'is-wedding' : ''}>{day === 20 && <Heart size={36} fill="currentColor" strokeWidth={0} />}<i>{day}</i></span>)}
      </motion.div>
      <motion.div className="t2-dateCopy" {...reveal2}><b>THỨ SÁU, 20/05/2050</b><span>Âm lịch 20/04 · 12:00 PM</span></motion.div>
      <Countdown2 />
      <motion.p className="t2-countdownNote" {...reveal2}>Đếm từng ngày để được gặp những người chúng mình yêu quý trong khoảnh khắc trọng đại.</motion.p>
      <div className="t2-datePhotos">
        <motion.img loading="lazy" decoding="async" src={t2Assets.rings} alt="Nhẫn cưới" initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }} />
        <motion.img loading="lazy" decoding="async" src={t2Assets.sunlight} alt="Bó hoa cưới" initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }} />
      </div>
    </section>
  );
}

function Venue2() {
  return (
    <section className="t2-venue" id="venue">
      <motion.p className="t2-venueIntro" {...reveal2}>A day full of love and sunlight</motion.p>
      <motion.figure {...reveal2}><img loading="lazy" decoding="async" src={t2Assets.venue} alt="Không gian tổ chức lễ cưới ngoài trời" /></motion.figure>
      <motion.div className="t2-venueCard" {...reveal2}>
        <span>FOREVER AND EVER</span>
        <h2>TRUNG TÂM TIỆC CƯỚI<br />CINELOVE</h2>
        <p>124 Đường Chiến Thắng, Lê Chân, Hải Phòng</p>
        <a href="https://www.google.com/maps/search/?api=1&query=124%20Duong%20Chien%20Thang%20Le%20Chan%20Hai%20Phong" target="_blank" rel="noreferrer"><MapPin size={16} /> Xem đường đi</a>
      </motion.div>
      <motion.figure className="t2-sunshine" {...reveal2}>
        <img loading="lazy" decoding="async" src={t2Assets.celebration} alt="Khách mời cùng cô dâu chú rể chung vui" />
        <figcaption><small>LOVE YOU</small>Sunshine</figcaption>
      </motion.figure>
    </section>
  );
}

function Rsvp2({ sent, setSent }) {
  const options = useMemo(() => ['1 người', '2 người', '3 người', '4 người'], []);
  const submit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <section className="t2-rsvp" id="rsvp">
      <motion.div className="t2-rsvpPhoto" {...reveal2}><img loading="lazy" decoding="async" src={t2Assets.table} alt="Bàn tiệc cưới" /><span>See you at<br />our wedding</span></motion.div>
      <motion.form onSubmit={submit} {...reveal2}>
        <p>PLEASE REPLY</p><h2>Xác nhận tham dự</h2>
        <label>Họ và tên<input required placeholder="Nhập tên của bạn" /></label>
        <fieldset><legend>Bạn sẽ tham dự chứ?</legend><label><input type="radio" name="attendance2" defaultChecked /> Có, tôi sẽ tham dự</label><label><input type="radio" name="attendance2" /> Tôi bận, rất tiếc không thể tham dự</label></fieldset>
        <label>Số lượng người tham dự<select defaultValue="1 người">{options.map((option) => <option key={option}>{option}</option>)}</select></label>
        <button type="submit"><Send size={16} /> Gửi xác nhận</button>
        {sent && <span className="t2-success" role="status"><Check size={16} /> Cảm ơn bạn, hẹn gặp bạn trong ngày cưới!</span>}
      </motion.form>
    </section>
  );
}

function Footer2() {
  return (
    <footer className="t2-footer">
      <motion.img loading="lazy" decoding="async" src={t2Assets.illustration} alt="Minh hoạ cô dâu chú rể" {...reveal2} />
      <motion.span {...reveal2}>Thankyou.</motion.span>
      <p>THUỲ LINH &amp; QUANG HUY · 20.05.2050</p>
    </footer>
  );
}

export default Template2;
