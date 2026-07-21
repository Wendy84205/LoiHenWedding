import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Gift, Heart, MapPin, Send } from 'lucide-react';
import WeddingMusicButton from './WeddingMusicButton.jsx';
import useWeddingCountdown from './useWeddingCountdown.js';
import './template36.css';

const assets36 = {
  hero: '/assets/template36-ref/hero.jpg',
  couple: '/assets/template36-ref/wide-a.jpg',
  bride: '/assets/template36-ref/bride.jpg',
  groom: '/assets/template36-ref/groom.jpg',
  story: '/assets/template36-ref/veil.jpg',
  first: '/assets/template36-ref/wide-b.jpg',
  second: '/assets/template36-ref/bride-full.jpg',
  third: '/assets/template36-ref/play.jpg',
  fourth: '/assets/template36-ref/hug.jpg',
  close: '/assets/template36-ref/close.jpg',
  kiss: '/assets/template36-ref/kiss.jpg',
  laugh: '/assets/template36-ref/laugh.jpg',
  qr: '/assets/template42/qr-demo.png',
};

const reveal36 = (direction = 'up', delay = 0) => {
  const delta = direction === 'left' ? { x: 56, y: 0 } : direction === 'right' ? { x: -56, y: 0 } : { x: 0, y: 45 };
  return { initial: { opacity: 0, ...delta }, whileInView: { opacity: 1, x: 0, y: 0 }, viewport: { once: true, margin: '-55px' }, transition: { duration: 1.3, delay, ease: 'easeOut' } };
};

const calendar36 = [...Array.from({ length: 2 }, (_, i) => `blank-${i}`), ...Array.from({ length: 31 }, (_, i) => i + 1)];

export default function Template36() {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('template36-page');
    document.body.classList.add('template36-page');
    return () => {
      document.documentElement.classList.remove('template36-page');
      document.body.classList.remove('template36-page');
    };
  }, []);

  return (
    <main className="template36">
      <WeddingMusicButton className="t36-music" />
      <Hero36 />
      <Invitation36 />
      <About36 />
      <Beginning36 />
      <Freedom36 />
      <Gallery36 />
      <DateVenue36 />
      <Tips36 />
      <Rsvp36 sent={sent} setSent={setSent} />
      <Gift36 />
    </main>
  );
}

function Hero36() {
  const countdown = useWeddingCountdown('2027-10-12T12:00:00+07:00');
  return (
    <section className="t36-hero" id="hero">
      <motion.p className="t36-topQuote" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1 }}>I have three things in this world. Sun, moon and you.<br />Sun for morning, moon for night, and you forever.</motion.p>
      <motion.div className="t36-orbit" initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.35, delay: .16 }}><span>WEDDING INVITATION</span><img src={assets36.hero} alt="Mai Anh và Minh Quân" fetchPriority="high" /></motion.div>
      <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: .38 }}>Mai Anh <i>&amp;</i> Minh Quân</motion.h1>
      <motion.p className="t36-married" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: .62 }}>WE ARE GETTING MARRIED</motion.p>
      <div className="t36-zeroCount">{['ngày', 'giờ', 'phút', 'giây'].map((label, index) => <span key={label}><b>{countdown[index]}</b><small>{label}</small></span>)}</div>
    </section>
  );
}

function Invitation36() {
  return (
    <section className="t36-invitation" id="invitation">
      <motion.div className="t36-dateStrip" {...reveal36('up')}><span>Chủ Nhật<br /><b>12:00 PM</b></span><strong>12</strong><span>Tháng 10<br /><b>2027</b></span></motion.div>
      <motion.div className="t36-addressStrip" {...reveal36('up', .1)}><i>Address</i><p>Trung tâm tiệc cưới Cinelove</p></motion.div>
      <motion.div className="t36-invitePhoto" {...reveal36('up', .12)}><img loading="lazy" src={assets36.couple} alt="Ảnh cưới Mai Anh và Minh Quân" /><span>INVITATION</span></motion.div>
      <motion.p className="t36-formal" {...reveal36('up')}>Trân trọng kính mời bạn đến chung vui<br />và chứng kiến ngày hạnh phúc của chúng mình.</motion.p>
    </section>
  );
}

function About36() {
  return (
    <section className="t36-about" id="about-us">
      <motion.div className="t36-aboutLead" {...reveal36('right')}><img loading="lazy" src={assets36.first} alt="Khoảnh khắc nắm tay" /><p>We have no idea where this story would take us,<br />but we know this chapter is ours.</p></motion.div>
      <motion.h2 {...reveal36('up')}>ABOUT US</motion.h2>
      <div className="t36-aboutCards">
        <motion.figure {...reveal36('right')}><img loading="lazy" src={assets36.bride} alt="Cô dâu Mai Anh" /><figcaption><small>Cô dâu</small><b>Mai Anh</b></figcaption></motion.figure>
        <motion.figure {...reveal36('left')}><img loading="lazy" src={assets36.groom} alt="Chú rể Minh Quân" /><figcaption><small>Chú rể</small><b>Minh Quân</b></figcaption></motion.figure>
      </div>
      <motion.blockquote {...reveal36('up')}>Tình yêu mình bắt đầu thật dịu dàng.<br />Em mang bình yên đến bên anh,<br />cùng nhau viết tiếp những ngày sau.</motion.blockquote>
    </section>
  );
}

function Beginning36() {
  return (
    <section className="t36-beginning" id="beginning">
      <motion.div className="t36-roundPhoto" {...reveal36('right')}><img loading="lazy" src={assets36.close} alt="Mai Anh và Minh Quân mỉm cười" /></motion.div>
      <motion.p className="t36-poem" {...reveal36('left')}>Khoảnh khắc ấy thật hiền,<br />Em đến bên anh bằng nụ cười trong veo.<br />Chúng mình từ hai lối nhỏ,<br />bỗng chung một con đường.</motion.p>
      <motion.div className="t36-english" {...reveal36('up')}><h2>YOU ARE MY END<br /><span>AND MY BEGINNING</span></h2><img loading="lazy" src={assets36.kiss} alt="Câu chuyện tình yêu" /></motion.div>
    </section>
  );
}

function Freedom36() {
  return (
    <section className="t36-freedom" id="love-and-freedom">
      <div className="t36-freedomGrid">
        <motion.img loading="lazy" src={assets36.second} alt="Bó hoa cưới" {...reveal36('right')} />
        <motion.div {...reveal36('left')}><img loading="lazy" src={assets36.couple} alt="Mai Anh và Minh Quân" /><p>LOVE AND FREEDOM<br /><span>YOU AND GENTLENESS</span></p></motion.div>
      </div>
      <motion.blockquote {...reveal36('up')}>Điều đẹp đẽ nhất có lẽ<br />là được tự do và dịu dàng bên nhau.</motion.blockquote>
      <motion.figure className="t36-fullPortrait" {...reveal36('up')}><img loading="lazy" src={assets36.story} alt="Cặp đôi trong ngày cưới" /><figcaption>Love you</figcaption></motion.figure>
    </section>
  );
}

function Gallery36() {
  return (
    <section className="t36-gallery" id="gallery">
      <motion.p {...reveal36('up')}>Gặp anh trong tuổi thanh xuân,<br />một mai ngoảnh lại vẫn là chúng ta.</motion.p>
      <div className="t36-galleryPair"><motion.img loading="lazy" src={assets36.third} alt="Ảnh cưới toàn thân" {...reveal36('right')} /><motion.img loading="lazy" src={assets36.fourth} alt="Cặp đôi bên nhau" {...reveal36('left')} /></div>
      <motion.div className="t36-cantHelp" {...reveal36('up')}><img loading="lazy" src={assets36.laugh} alt="Ảnh cưới Mai Anh Minh Quân" /><span>Can't help<br />falling in love</span></motion.div>
    </section>
  );
}

function DateVenue36() {
  return (
    <section className="t36-dateVenue" id="date">
      <motion.div className="t36-calendar" {...reveal36('up')}>
        <h2>October <b>2027</b></h2><div>{calendar36.map((day) => typeof day === 'string' ? <span key={day} /> : <span key={day} className={day === 12 ? 'is-wedding' : ''}>{day === 12 && <Heart fill="currentColor" strokeWidth={0} />}<i>{day}</i></span>)}</div>
      </motion.div>
      <motion.div className="t36-timeCopy" {...reveal36('up', .1)}><span>TIME</span><p>Chủ nhật ngày 12 tháng 10 năm 2027<br /><small>Tức ngày 21 tháng 08 âm lịch</small></p></motion.div>
      <motion.a className="t36-map" href="https://www.google.com/maps/search/?api=1&query=Trung%20tam%20tiec%20cuoi%20Cinelove" target="_blank" rel="noreferrer" {...reveal36('up')}><MapPin /><b>Trung tâm tiệc cưới Cinelove</b><span>Xem chỉ đường</span></motion.a>
    </section>
  );
}

function Tips36() {
  return (
    <section className="t36-tips" id="tips">
      <motion.div className="t36-tipsPhoto" {...reveal36('right')}><img loading="lazy" src={assets36.first} alt="Cặp đôi chuẩn bị lễ cưới" /></motion.div>
      <motion.h2 {...reveal36('up')}>TIPS</motion.h2>
      <motion.ul {...reveal36('up', .1)}>
        <li>Xin vui lòng xác nhận trước ngày cưới để chúng mình sắp xếp đón tiếp chu đáo.</li>
        <li>Nếu có yêu cầu đặc biệt về món ăn, hãy ghi chú trong phần xác nhận tham dự.</li>
        <li>Bạn có thể bấm nút chỉ đường để đến đúng địa điểm tổ chức.</li>
        <li>Khoảnh khắc đẹp nhất của ngày vui là khi có bạn ở bên.</li>
      </motion.ul>
      <motion.p {...reveal36('up')}>Hẹn gặp bạn trong ngày hạnh phúc!</motion.p>
    </section>
  );
}

function Rsvp36({ sent, setSent }) {
  const submit = (event) => { event.preventDefault(); setSent(true); };
  return (
    <section className="t36-rsvp" id="rsvp">
      <motion.form onSubmit={submit} {...reveal36('up')}>
        <h2>Xác nhận tham dự</h2>
        <label>Họ và tên<input required placeholder="Nhập tên của bạn" /></label>
        <fieldset><legend>Bạn sẽ tham dự chứ?</legend><label><input type="radio" name="attendance36" defaultChecked /> Có, tôi sẽ tham dự</label><label><input type="radio" name="attendance36" /> Tôi bận, rất tiếc không thể tham dự</label></fieldset>
        <label>Số lượng người tham dự<select defaultValue="1 người"><option>1 người</option><option>2 người</option><option>3 người</option><option>4 người</option></select></label>
        <button type="submit"><Send size={15} /> Gửi xác nhận</button>
        {sent && <span className="t36-success" role="status"><Check size={14} /> Cảm ơn bạn đã phản hồi.</span>}
      </motion.form>
    </section>
  );
}

function Gift36() {
  return (
    <section className="t36-gift" id="gift">
      <motion.div className="t36-giftFrame" {...reveal36('up')}><Gift /><h2>Nguyễn Mai Anh</h2><img loading="lazy" src={assets36.qr} alt="Mã QR mừng cưới Mai Anh" /><small>Quét mã QR để gửi lời chúc và quà mừng</small></motion.div>
      <motion.p {...reveal36('up', .12)}>Non sông một chữ duyên dài<br />Ba sinh ước hẹn, duyên này thành đôi.</motion.p>
      <motion.h3 {...reveal36('up', .2)}>THANK YOU</motion.h3>
    </section>
  );
}
