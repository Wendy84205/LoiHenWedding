import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Heart, MapPin, Phone, Send } from 'lucide-react';
import WeddingMusicButton from './WeddingMusicButton.jsx';
import './template19.css';

const assets19 = {
  hero: '/assets/template19-ref/hero.jpg',
  couple: '/assets/template19-ref/couple.jpg',
  bride: '/assets/template19-ref/bride-profile.png',
  groom: '/assets/template19-ref/groom-profile.jpg',
  close: '/assets/template19-ref/close.png',
  story: '/assets/template19-ref/kiss.png',
  first: '/assets/template19-ref/embrace.png',
  second: '/assets/template19-ref/wide.jpg',
  third: '/assets/template19-ref/proposal.png',
  pose: '/assets/template19-ref/pose.png',
  full: '/assets/template19-ref/full.png',
};

const reveal19 = (direction = 'up', delay = 0) => {
  const offset = direction === 'left' ? { x: 52, y: 0 } : direction === 'right' ? { x: -52, y: 0 } : { x: 0, y: 44 };
  return { initial: { opacity: 0, ...offset }, whileInView: { opacity: 1, x: 0, y: 0 }, viewport: { once: true, margin: '-55px' }, transition: { duration: 1.3, delay, ease: 'easeOut' } };
};

export default function Template19() {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('template19-page');
    document.body.classList.add('template19-page');
    return () => {
      document.documentElement.classList.remove('template19-page');
      document.body.classList.remove('template19-page');
    };
  }, []);

  return (
    <main className="template19">
      <WeddingMusicButton className="t19-music" />
      <Hero19 />
      <OurStory19 />
      <Love19 />
      <Married19 />
      <Poetry19 />
      <Invitation19 />
      <Contact19 />
      <Rsvp19 sent={sent} setSent={setSent} />
      <ThankYou19 />
    </main>
  );
}

function Hero19() {
  return (
    <section className="t19-hero" id="hero">
      <motion.p className="t19-meet" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.05 }}>HẸN NHAU TẠI LỄ CƯỚI</motion.p>
      <motion.div className="t19-welcome" initial={{ opacity: 0, x: -38 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2 }}><span>WELCOME</span><i>TO</i><span>OUR WEDDING</span><small>Chúng mình kết hôn rồi!</small></motion.div>
      <motion.img src={assets19.hero} alt="Minh Quân và Bảo Anh" fetchPriority="high" initial={{ opacity: 0, y: 45 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.35, delay: .16 }} />
      <motion.div className="t19-cornerNames" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: .5 }}><span>GROOM / Minh Quân</span><span>BRIDE / Bảo Anh</span></motion.div>
    </section>
  );
}

function OurStory19() {
  return (
    <section className="t19-ourStory" id="our-story">
      <motion.div className="t19-storyNames" {...reveal19('up')}><span>GROOM / Minh Quân</span><span>BRIDE / Bảo Anh</span></motion.div>
      <motion.h1 {...reveal19('up')}>OUR STORY</motion.h1>
      <motion.p {...reveal19('up', .1)}>Chúng mình tin rằng trên thế gian này, có những cuộc tương phùng là không thể ngẫu nhiên. Từ ngày ấy, hai đứa dần trở thành một phần cuộc sống của nhau. Có vui, có buồn, có những lần im lặng, nhưng sau tất cả vẫn là lựa chọn nắm tay. Chúng mình đi vào một mùa yêu rất dài, trưởng thành trong sự dịu dàng và hiểu rằng: tình yêu là cùng nhau trở về, sau mỗi ngày.</motion.p>
      <motion.div className="t19-nameLine" {...reveal19('up')}><span>Minh Quân</span><Heart fill="currentColor" /><span>Bảo Anh</span></motion.div>
      <motion.img loading="lazy" src={assets19.close} alt="Khoảnh khắc của Minh Quân và Bảo Anh" {...reveal19('up')} />
    </section>
  );
}

function Love19() {
  return (
    <section className="t19-love" id="love">
      <motion.figure className="t19-lovePortrait" {...reveal19('right')}><img loading="lazy" src={assets19.story} alt="Cặp đôi bên nhau" /><figcaption><span>love</span><p>Every time I think of you,<br />I find myself smiling without reasons.</p></figcaption></motion.figure>
      <motion.p className="t19-longText" {...reveal19('up')}>Yêu thương người là một hành trình rất dịu dàng. Mỗi khoảnh khắc bên nhau, mỗi câu chuyện và từng lần sẻ chia đều giúp chúng mình hiểu nhau hơn. Nếu hạnh phúc có hình dáng, có lẽ đó là những buổi sáng bình thường, khi cả hai vẫn còn bên nhau và tin vào ngày mai.</motion.p>
      <motion.img className="t19-coupleWide" loading="lazy" src={assets19.pose} alt="Minh Quân và Bảo Anh trong ngày cưới" {...reveal19('left')} />
    </section>
  );
}

function Married19() {
  return (
    <section className="t19-married" id="married">
      <motion.p {...reveal19('up')}>cũng gần như mây gặp trời xanh<br />tim ta cứ thế chẳng thể rời xa</motion.p>
      <motion.img loading="lazy" src={assets19.couple} alt="Cặp đôi hạnh phúc" {...reveal19('up', .1)} />
      <motion.h2 {...reveal19('up')}>WE GET MARRIED</motion.h2>
      <motion.blockquote {...reveal19('up')}>Sao trời rực rỡ, đôi ta dịu êm nhất.<br />Ta mong bình yên đi cùng tháng năm,<br />giữa mọi đổi thay vẫn ở bên nhau.</motion.blockquote>
    </section>
  );
}

function Poetry19() {
  return (
    <section className="t19-poetry" id="memories">
      <motion.blockquote {...reveal19('up')}>Lá thư tình viết bằng hơi thở<br />Ta cầm đôi tay và đi tới tương lai.</motion.blockquote>
      <div className="t19-photoColumns"><motion.img loading="lazy" src={assets19.first} alt="Cặp đôi trao nhau ánh mắt" {...reveal19('right')} /><motion.img loading="lazy" src={assets19.bride} alt="Cô dâu Bảo Anh" {...reveal19('left')} /></div>
      <motion.p {...reveal19('up')}>Chúng mình luôn tin rằng yêu là điều cần được chăm sóc từng ngày. Không phải những lời quá lớn lao, mà là cùng nhau lắng nghe, cùng nhau lớn lên, và cùng giữ lời hứa bình yên trong những năm tháng tới.</motion.p>
      <motion.div className="t19-stacked" {...reveal19('up')}><img loading="lazy" src={assets19.second} alt="Ảnh cưới kỷ niệm" /><img loading="lazy" src={assets19.third} alt="Khoảnh khắc ngày cưới" /></motion.div>
      <motion.blockquote className="t19-galaxy" {...reveal19('up')}>Of countless times and starry skies,<br />you are the brightest light in my eyes.</motion.blockquote>
      <motion.h3 {...reveal19('up')}>I LOVE YOU FOR YOU</motion.h3>
    </section>
  );
}

function Invitation19() {
  return (
    <section className="t19-invitation" id="invitation">
      <motion.img loading="lazy" src={assets19.third} alt="Thiệp mời cưới Minh Quân và Bảo Anh" {...reveal19('up')} />
      <motion.div className="t19-inviteOverlay" {...reveal19('up', .12)}><small>Thời gian (Time)</small><h2>Thư <i>Mời</i></h2><strong>WEDNESDAY · 20 / 08 / 2027</strong><span>Ngày 26 tháng 07 âm lịch · 12:00 PM</span></motion.div>
      <motion.blockquote {...reveal19('up')}>Tháng Tám nghiêng nắng qua thềm<br />Hôm nay ta hẹn bên nhau một đời.</motion.blockquote>
    </section>
  );
}

function Contact19() {
  return (
    <section className="t19-contact" id="contact">
      <div className="t19-contactGrid">
        <motion.article {...reveal19('right')}><img loading="lazy" src={assets19.bride} alt="Cô dâu Bảo Anh" /><b>Bảo Anh</b><a href="tel:0900000001"><Phone size={14} /> Liên hệ cô dâu</a></motion.article>
        <motion.article {...reveal19('left')}><img loading="lazy" src={assets19.groom} alt="Chú rể Minh Quân" /><b>Minh Quân</b><a href="tel:0900000002"><Phone size={14} /> Liên hệ chú rể</a></motion.article>
      </div>
      <motion.p {...reveal19('up')}>Từ những lời hẹn rất nhỏ của hai người, giờ đây một ngày vui đang đến. Hãy đến và cùng chúng mình lưu giữ những khoảnh khắc đẹp nhất.</motion.p>
      <motion.h2 {...reveal19('up')}>Địa chỉ (address)</motion.h2>
      <motion.a className="t19-map" href="https://www.google.com/maps/search/?api=1&query=52%20Mieu%20Dam%20Me%20Tri%20Nam%20Tu%20Liem%20Ha%20Noi" target="_blank" rel="noreferrer" {...reveal19('up')}><MapPin /><b>52 Miếu Đầm, Mễ Trì, Nam Từ Liêm, Hà Nội</b><span>Xem chỉ đường</span></motion.a>
    </section>
  );
}

function Rsvp19({ sent, setSent }) {
  const submit = (event) => { event.preventDefault(); setSent(true); };
  return (
    <section className="t19-rsvp" id="rsvp">
      <motion.form onSubmit={submit} {...reveal19('up')}><h2>Xác nhận tham dự</h2><label>Họ và tên<input required placeholder="Nhập tên của bạn" /></label><fieldset><legend>Bạn sẽ tham dự chứ?</legend><label><input type="radio" name="attendance19" defaultChecked /> Có, tôi sẽ tham dự</label><label><input type="radio" name="attendance19" /> Tôi bận, rất tiếc không thể tham dự</label></fieldset><label>Số lượng người tham dự<select defaultValue="1 người"><option>1 người</option><option>2 người</option><option>3 người</option><option>4 người</option></select></label><button type="submit"><Send size={15} /> Gửi xác nhận</button>{sent && <span className="t19-success" role="status"><Check size={14} /> Cảm ơn bạn đã phản hồi.</span>}</motion.form>
    </section>
  );
}

function ThankYou19() {
  return (
    <section className="t19-thanks" id="thanks">
      <motion.img loading="lazy" src={assets19.full} alt="Minh Quân và Bảo Anh" {...reveal19('up')} />
      <motion.div {...reveal19('up', .15)}><h2>THANK YOU</h2><strong>20.08</strong><p>Hẹn gặp bạn trong ngày vui của chúng mình.</p></motion.div>
    </section>
  );
}
