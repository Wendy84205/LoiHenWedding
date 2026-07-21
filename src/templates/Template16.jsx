import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Heart, MapPin, Send } from 'lucide-react';
import WeddingMusicButton from './WeddingMusicButton.jsx';
import './template16.css';

const assets16 = {
  hero: '/assets/template16-ref/side.png',
  couple: '/assets/template16-ref/wide.jpg',
  bride: '/assets/template16-ref/bride.png',
  groom: '/assets/template16-ref/groom.jpg',
  close: '/assets/template16-ref/close.jpg',
  story: '/assets/template16-ref/couple-full.jpg',
  first: '/assets/template16-ref/pose.jpg',
  second: '/assets/template16-ref/walking.jpg',
  third: '/assets/template16-ref/bride-full.jpg',
  lean: '/assets/template16-ref/lean.jpg',
  embrace: '/assets/template16-ref/embrace.jpg',
};

const reveal16 = (direction = 'up', delay = 0) => {
  const offset = direction === 'left' ? { x: 50, y: 0 } : direction === 'right' ? { x: -50, y: 0 } : { x: 0, y: 42 };
  return { initial: { opacity: 0, ...offset }, whileInView: { opacity: 1, x: 0, y: 0 }, viewport: { once: true, margin: '-55px' }, transition: { duration: 1.3, delay, ease: 'easeOut' } };
};

const calendar16 = [...Array.from({ length: 4 }, (_, i) => `blank-${i}`), ...Array.from({ length: 31 }, (_, i) => i + 1)];

export default function Template16() {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('template16-page');
    document.body.classList.add('template16-page');
    return () => {
      document.documentElement.classList.remove('template16-page');
      document.body.classList.remove('template16-page');
    };
  }, []);

  return (
    <main className="template16">
      <WeddingMusicButton className="t16-music" />
      <Hero16 />
      <Opening16 />
      <Profiles16 />
      <Story16 />
      <Collage16 />
      <Date16 />
      <VenueRsvp16 sent={sent} setSent={setSent} />
      <ThankYou16 />
    </main>
  );
}

function Hero16() {
  return (
    <section className="t16-hero" id="hero">
      <motion.h1 initial={{ opacity: 0, x: -45 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2 }}>WEDDING</motion.h1>
      <motion.div className="t16-arch" initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.4, delay: .12 }}><img src={assets16.hero} alt="Thảo My và Trung Quân" fetchPriority="high" /></motion.div>
      <motion.span className="t16-lineMark" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.3, delay: .45 }} />
      <motion.p className="t16-heroPoem" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.15, delay: .55 }}>Thời gian làm mối tơ hồng,<br />Thanh xuân là sính, trao lòng cho nhau</motion.p>
    </section>
  );
}

function Opening16() {
  return (
    <section className="t16-opening" id="love-story">
      <motion.blockquote {...reveal16('up')}>Gặp nhau ánh mắt đầu tiên<br />Mà tim bỗng chốc nghiêng nghiêng một phía<br />Tháng tư nắng đổ chiều vàng<br />Ta nguyện cùng nhau đi hết đời này.</motion.blockquote>
      <motion.p className="t16-chapter" {...reveal16('up', .1)}>/ Love story about us /</motion.p>
      <motion.img className="t16-wide" loading="lazy" src={assets16.couple} alt="Câu chuyện tình yêu của Thảo My và Trung Quân" {...reveal16('up')} />
      <div className="t16-openingGrid">
        <motion.div {...reveal16('right')}><strong>20 · 08 · 2027</strong><span>When you first meet someone,<br />you fall in love.</span></motion.div>
        <motion.img loading="lazy" src={assets16.close} alt="Khoảnh khắc hạnh phúc" {...reveal16('left')} />
        <motion.img loading="lazy" src={assets16.first} alt="Ảnh cưới trong nắng" {...reveal16('right')} />
      </div>
      <motion.blockquote className="t16-smallPoem" {...reveal16('up')}>Trời xanh, mây trắng, nắng trong<br />Anh mang thương nhớ đặt vào tim em.</motion.blockquote>
    </section>
  );
}

function Profiles16() {
  return (
    <section className="t16-profiles" id="couple">
      <motion.p {...reveal16('up')}>Em cười ánh mắt long lanh<br />Chú rể ngơ ngẩn tưởng tranh giữa đời.<br /><i>/ Love story about us /</i></motion.p>
      <div className="t16-profileGrid">
        <motion.figure {...reveal16('right')}><img loading="lazy" src={assets16.bride} alt="Cô dâu Nguyễn Thảo My" /><figcaption><small>BRIDE</small><b>Nguyễn Thảo My</b><a href="tel:0900000001">Liên hệ</a></figcaption></motion.figure>
        <motion.figure {...reveal16('left')}><img loading="lazy" src={assets16.groom} alt="Chú rể Đặng Trung Quân" /><figcaption><small>GROOM</small><b>Đặng Trung Quân</b><a href="tel:0900000002">Liên hệ</a></figcaption></motion.figure>
      </div>
    </section>
  );
}

function Story16() {
  return (
    <section className="t16-story" id="story">
      <motion.div className="t16-storyHero" {...reveal16('up')}><img loading="lazy" src={assets16.story} alt="Thảo My và Trung Quân trong ngày cưới" /></motion.div>
      <motion.p {...reveal16('up', .1)}>Mọi điều vĩnh hằng bắt đầu bằng một khoảnh khắc rất nhỏ. Chúng mình gặp nhau giữa những ngày bình thường, rồi bình yên trở thành điều đặc biệt nhất. Đi qua nhiều mùa nắng mưa, hai đứa vẫn chọn nắm tay, cùng sẻ chia và cùng lớn lên.</motion.p>
      <motion.blockquote {...reveal16('up')}>Bên anh mãi mãi, dài lâu trọn đời.</motion.blockquote>
      <div className="t16-storyPair"><motion.img loading="lazy" src={assets16.second} alt="Cặp đôi trao hoa" {...reveal16('right')} /><motion.img loading="lazy" src={assets16.lean} alt="Nụ cười ngày cưới" {...reveal16('left')} /></div>
    </section>
  );
}

function Collage16() {
  return (
    <section className="t16-collage" id="memories">
      <motion.blockquote {...reveal16('up')}>Hái sen em hái cả cành<br />Lấy anh em lấy cả tình thủy chung.</motion.blockquote>
      <div className="t16-collageTop"><motion.img loading="lazy" src={assets16.bride} alt="Chân dung cô dâu" {...reveal16('right')} /><motion.img loading="lazy" src={assets16.groom} alt="Chân dung chú rể" {...reveal16('left')} /></div>
      <div className="t16-collageBottom"><motion.img loading="lazy" src={assets16.embrace} alt="Ảnh cưới kỷ niệm" {...reveal16('right')} /><motion.img loading="lazy" src={assets16.first} alt="Cặp đôi trong ngày vui" {...reveal16('left')} /></div>
      <motion.p {...reveal16('up')}>Em và anh – trẻ con thôi<br />Cùng bên nhau mãi, môi cười tháng năm<br />Niềm riêng chia ngọt sẻ bùi<br />Bên trong hạnh phúc – vẹn tròn niềm thương.</motion.p>
    </section>
  );
}

function Date16() {
  return (
    <section className="t16-date" id="date">
      <motion.div className="t16-dateHeading" {...reveal16('up')}><span>Thứ 4</span><strong>20</strong><span>Tháng 08<br />Năm 2027</span></motion.div>
      <motion.div className="t16-calendar" {...reveal16('up', .1)}><h2>8.2027</h2><div>{calendar16.map((day) => typeof day === 'string' ? <span key={day} /> : <span key={day} className={day === 20 ? 'is-wedding' : ''}>{day === 20 && <Heart fill="currentColor" strokeWidth={0} />}<i>{day}</i></span>)}</div></motion.div>
      <motion.p {...reveal16('up')}>Thứ tư ngày 20 tháng 08 năm 2027<br /><small>Nhằm 26 tháng 07 âm lịch · 12:00 PM</small></motion.p>
      <motion.blockquote {...reveal16('up')}>Ý đời giản dị như mây<br />Nắm tay nhau đi hết ngày bình yên.</motion.blockquote>
    </section>
  );
}

function VenueRsvp16({ sent, setSent }) {
  const submit = (event) => { event.preventDefault(); setSent(true); };
  return (
    <section className="t16-venueRsvp" id="rsvp">
      <motion.div className="t16-venueIntro" {...reveal16('up')}><img loading="lazy" src={assets16.third} alt="Cô dâu với bó hoa" /><p>Tháng Tám nghiêng nắng qua thềm<br />Có em ngày mới dịu êm hơn nhiều.</p></motion.div>
      <motion.a className="t16-map" href="https://www.google.com/maps/search/?api=1&query=52%20Mieu%20Dam%20Me%20Tri%20Nam%20Tu%20Liem%20Ha%20Noi" target="_blank" rel="noreferrer" {...reveal16('up')}><MapPin /><b>52 Miếu Đầm, Mễ Trì, Nam Từ Liêm, Hà Nội</b><span>Xem chỉ đường</span></motion.a>
      <motion.form onSubmit={submit} {...reveal16('up', .1)}>
        <h2>Xác nhận tham dự</h2>
        <label>Họ và tên<input required placeholder="Nhập tên của bạn" /></label>
        <fieldset><legend>Bạn sẽ tham dự chứ?</legend><label><input type="radio" name="attendance16" defaultChecked /> Có, tôi sẽ tham dự</label><label><input type="radio" name="attendance16" /> Tôi bận, rất tiếc không thể tham dự</label></fieldset>
        <label>Số lượng người tham dự<select defaultValue="1 người"><option>1 người</option><option>2 người</option><option>3 người</option><option>4 người</option></select></label>
        <button type="submit"><Send size={15} /> Gửi xác nhận</button>
        {sent && <span className="t16-success" role="status"><Check size={14} /> Cảm ơn bạn đã phản hồi.</span>}
      </motion.form>
    </section>
  );
}

function ThankYou16() {
  return (
    <section className="t16-thanks" id="thanks">
      <motion.img loading="lazy" src={assets16.hero} alt="Thảo My và Trung Quân" {...reveal16('up')} />
      <motion.div {...reveal16('up', .16)}><h2>Thank you</h2><p>Hẹn gặp bạn trong ngày vui của chúng mình.</p></motion.div>
    </section>
  );
}
