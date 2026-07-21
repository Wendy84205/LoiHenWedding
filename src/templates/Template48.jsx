import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Check, Gem, Gift, GlassWater, Heart, MapPin, Send } from 'lucide-react';
import WeddingMusicButton from './WeddingMusicButton.jsx';
import './template48.css';

const assets48 = {
  hero: '/assets/template48-ref/hero.png',
  couple: '/assets/template48-ref/hill-run.png',
  close: '/assets/template48-ref/running.png',
  bride: '/assets/template48-ref/bride.png',
  groom: '/assets/template48-ref/groom.png',
  sea: '/assets/template48-ref/lake.png',
  first: '/assets/template48-ref/garden.png',
  second: '/assets/template48-ref/forest.png',
  third: '/assets/template48-ref/dip.png',
  fourth: '/assets/template48-ref/lake-run.png',
  hill: '/assets/template48-ref/hill.png',
  cover: '/assets/template48-ref/cover.png',
  flower: '/assets/template48-ref/flower-large.png',
  brideDark: '/assets/template48-ref/bride-dark.png',
};

const reveal48 = (direction = 'up', delay = 0) => {
  const variants = {
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 },
    up: { x: 0, y: 50 },
    scale: { x: 0, y: 0, scale: .5 },
    pop: { x: 0, y: 0, scale: .1 },
    spin: { x: 0, y: 0, rotate: -180 },
    fade: { x: 0, y: 0 },
  };
  return {
    initial: { opacity: 0, ...variants[direction] },
    whileInView: { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 },
    viewport: { once: true, margin: '-55px' },
    transition: { duration: 1.6, delay, ease: direction === 'pop' || direction === 'spin' ? [0.68, -0.55, 0.265, 1.55] : 'easeOut' },
  };
};

const calendar48 = [...Array.from({ length: 1 }, (_, i) => `blank-${i}`), ...Array.from({ length: 31 }, (_, i) => i + 1)];

function countdown48() {
  const diff = Math.max(0, new Date('2027-12-30T09:00:00+07:00').getTime() - Date.now());
  return [Math.floor(diff / 86400000), Math.floor((diff / 3600000) % 24), Math.floor((diff / 60000) % 60), Math.floor((diff / 1000) % 60)];
}

export default function Template48() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [count, setCount] = useState(countdown48);

  useEffect(() => {
    document.documentElement.classList.add('template48-page');
    document.body.classList.add('template48-page');
    const timer = window.setInterval(() => setCount(countdown48()), 1000);
    return () => {
      window.clearInterval(timer);
      document.documentElement.classList.remove('template48-page');
      document.body.classList.remove('template48-page');
    };
  }, []);

  return (
    <main className="template48">
      <WeddingMusicButton className="t48-music" />
      <Envelope48 open={open} setOpen={setOpen} />
      <Invitation48 />
      <Landscape48 />
      <Profiles48 />
      <Story48 />
      <CalendarTimeline48 count={count} />
      <Album48 />
      <Rsvp48 sent={sent} setSent={setSent} />
      <Gift48 />
    </main>
  );
}

function Envelope48({ open, setOpen }) {
  return (
    <section className="t48-envelopeIntro" id="hero">
      <motion.img className="t48-orchid t48-orchidLarge" src={assets48.flower} alt="" aria-hidden="true" initial={{ opacity: 0, x: -35, rotate: -8 }} animate={{ opacity: 1, x: 0, rotate: 0 }} transition={{ duration: 1.6 }} />
      <motion.img className="t48-orchid t48-orchidSmall" src="/assets/template48-ref/flower-small.png" alt="" aria-hidden="true" initial={{ opacity: 0, x: 35, rotate: 8 }} animate={{ opacity: 1, x: 0, rotate: 0 }} transition={{ duration: 1.6, delay: .15 }} />
      <motion.h1 initial={{ opacity: 0, y: -22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1 }}>Save our date</motion.h1>
      <motion.button className={open ? 't48-envelope is-open' : 't48-envelope'} type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Mở thiệp cưới" initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.15, delay: .2 }}>
        <span className="t48-envelopeBack" />
        <span className="t48-envelopeCard"><img src={assets48.hero} alt="Hải Đăng và Yến Nhi" /><b>Hải Đăng &amp; Yến Nhi</b><small>30 · 12 · 2027</small></span>
        <span className="t48-envelopeFlap" />
        <span className="t48-envelopeFront" />
        <span className="t48-seal" aria-hidden="true" />
      </motion.button>
      <motion.p animate={{ opacity: 1 }} transition={{ delay: .55 }}>{open ? 'Thiệp đã mở' : 'Chạm để mở thiệp'}</motion.p>
    </section>
  );
}

function Invitation48() {
  return (
    <section className="t48-invitation" id="invitation">
      <motion.img className="t48-invitePhoto" loading="lazy" src={assets48.couple} alt="Hải Đăng và Yến Nhi trên đồi cỏ" {...reveal48('up')} />
      <div className="t48-familyGrid">
        <motion.article {...reveal48('spin')}><h3>Nhà Trai</h3><p>Ông. Nguyễn Xuân Sơn<br />Bà. Đặng Thị Yến</p><small>TP. Hà Nội</small></motion.article>
        <motion.article {...reveal48('spin', .08)}><h3>Nhà Gái</h3><p>Ông. Vương Kiên<br />Bà. Nguyễn Hải Yến</p><small>TP. Hải Phòng</small></motion.article>
      </div>
      <motion.div className="t48-names" {...reveal48('up')}><span>HẢI ĐĂNG</span><i>&amp;</i><span>YẾN NHI</span></motion.div>
      <motion.p className="t48-respect" {...reveal48('up')}>TRÂN TRỌNG KÍNH MỜI<br /><b>Bạn + Nt</b><br />THAM DỰ TIỆC CHUNG VUI<br />CÙNG GIA ĐÌNH CHÚNG TÔI</motion.p>
      <motion.div className="t48-eventDate" {...reveal48('scale', .1)}><b>09:00 · THỨ TƯ</b><div><span>THÁNG 12</span><motion.strong {...reveal48('pop', .15)}>30</motion.strong><span>NĂM 2027</span></div><small>(Tức ngày 22 tháng 11 năm 2027)</small></motion.div>
      <motion.div className="t48-venue" {...reveal48('up')}><p>Hôn lễ được tổ chức tại</p><h2>TƯ GIA NHÀ TRAI</h2><span>Số 59, ngõ 119 Nguyễn Văn Xuân, Hải Phòng</span><a href="https://www.google.com/maps/search/?api=1&query=Hai%20Phong" target="_blank" rel="noreferrer"><MapPin size={16} /> CHỈ ĐƯỜNG</a></motion.div>
    </section>
  );
}

function Landscape48() {
  return (
    <section className="t48-landscape" id="all-of-you">
      <motion.img loading="lazy" src={assets48.hero} alt="Cặp đôi giữa thiên nhiên" {...reveal48('up')} />
      <motion.div {...reveal48('up', .1)}><span>All of me loves</span><b>All of you</b></motion.div>
    </section>
  );
}

function Profiles48() {
  return (
    <section className="t48-profiles" id="couple">
      <div className="t48-profile t48-groom">
        <motion.div className="t48-profileCard" {...reveal48('right')}><img loading="lazy" src={assets48.groom} alt="Chú rể Hải Đăng" /><small>Chú rể</small><h2>Hải Đăng</h2></motion.div>
        <motion.img className="t48-profileCut" loading="lazy" src={assets48.close} alt="Hải Đăng và Yến Nhi" {...reveal48('left', .12)} />
      </div>
      <div className="t48-profile t48-bride">
        <motion.img className="t48-profileCut" loading="lazy" src={assets48.first} alt="Cặp đôi hạnh phúc" {...reveal48('right')} />
        <motion.div className="t48-profileCard" {...reveal48('left', .12)}><img loading="lazy" src={assets48.bride} alt="Cô dâu Yến Nhi" /><small>Cô dâu</small><h2>Yến Nhi</h2></motion.div>
      </div>
    </section>
  );
}

function Story48() {
  return (
    <section className="t48-story" id="our-story">
      <motion.h2 {...reveal48('up')}>Our story</motion.h2>
      <motion.p {...reveal48('up', .12)}>Qua những khoảnh khắc của đời, những buổi tối em có bên nhau, chúng ta đã cùng nhau lớn lên. Tình yêu không phải điều hoàn hảo có sẵn, mà là những ngày bình thường, vui trong ánh mắt, cùng các bạn bè chứng kiến yêu của chúng tôi.</motion.p>
      <motion.img loading="lazy" src={assets48.hill} alt="Hành trình tình yêu của Hải Đăng và Yến Nhi" {...reveal48('up')} />
      <motion.span {...reveal48('left')}>Young &amp; free</motion.span>
    </section>
  );
}

function CalendarTimeline48({ count }) {
  const events = [{ icon: Camera, time: '09:30', label: 'Checkin' }, { icon: GlassWater, time: '11:00', label: 'Khai Tiệc' }, { icon: Gem, time: '12:00', label: 'Lễ Thành Hôn' }];
  return (
    <section className="t48-date" id="date">
      <motion.div className="t48-calendar" {...reveal48('up')}><h2>Tháng 12</h2><div>{calendar48.map((day) => typeof day === 'string' ? <span key={day} /> : <span key={day} className={day === 30 ? 'is-wedding' : ''}>{day === 30 && <Heart fill="currentColor" strokeWidth={0} />}<i>{day}</i></span>)}</div></motion.div>
      <motion.h2 className="t48-timelineTitle" {...reveal48('scale')}>Timeline</motion.h2>
      <div className="t48-timeline">{events.map(({ icon: Icon, time, label }, index) => <motion.article key={time} {...reveal48('up', index * .1)}><Icon /><b>{time}</b><span>{label}</span></motion.article>)}</div>
      <motion.p className="t48-memory" {...reveal48('up')}>Being with you turns ordinary moments into timeless memories.</motion.p>
      <motion.h2 className="t48-countTitle" {...reveal48('up')}>Countdown</motion.h2>
      <div className="t48-countdown">{['ngày', 'giờ', 'phút', 'giây'].map((label, index) => <motion.span key={label} {...reveal48('up', index * .08)}><b>{count[index]}</b><small>{label}</small></motion.span>)}</div>
    </section>
  );
}

function Album48() {
  return (
    <section className="t48-album" id="album">
      <motion.h2 {...reveal48('up')}><span>ALBUM</span><i>of</i><span>LOVE</span></motion.h2>
      <div className="t48-albumGrid"><motion.img loading="lazy" src={assets48.cover} alt="Album ảnh cưới trên đồi" {...reveal48('right')} /><motion.img loading="lazy" src={assets48.couple} alt="Cặp đôi nắm tay" {...reveal48('left')} /><motion.img loading="lazy" src={assets48.second} alt="Ảnh cưới lãng mạn" {...reveal48('right')} /><motion.img loading="lazy" src={assets48.third} alt="Kỷ niệm ngày cưới" {...reveal48('left')} /><motion.img loading="lazy" src={assets48.fourth} alt="Hải Đăng và Yến Nhi" {...reveal48('up')} /></div>
      <motion.p {...reveal48('up')}>Cảm ơn bạn đã đồng hành cùng chúng mình trên hành trình yêu thương.</motion.p>
    </section>
  );
}

function Rsvp48({ sent, setSent }) {
  const submit = (event) => { event.preventDefault(); setSent(true); };
  return (
    <section className="t48-rsvp" id="rsvp">
      <motion.form onSubmit={submit} {...reveal48('up')}><h2>Xác nhận tham dự</h2><label>Họ và tên<input required placeholder="Nhập tên của bạn" /></label><fieldset><legend>Bạn sẽ tham dự chứ?</legend><label><input type="radio" name="attendance48" defaultChecked /> Có, tôi sẽ tham dự</label><label><input type="radio" name="attendance48" /> Tôi bận, rất tiếc không thể tham dự</label></fieldset><label>Số lượng người tham dự<select defaultValue="1 người"><option>1 người</option><option>2 người</option><option>3 người</option><option>4 người</option></select></label><button type="submit"><Send size={15} /> Gửi xác nhận</button>{sent && <span className="t48-success" role="status"><Check size={14} /> Cảm ơn bạn đã phản hồi.</span>}</motion.form>
      <motion.p {...reveal48('up', .15)}>Blooming out</motion.p>
    </section>
  );
}

function Gift48() {
  return (
    <section className="t48-gift" id="gift">
      <motion.div {...reveal48('up')}><h2>Gửi mừng cưới</h2><Gift /><p>Cảm ơn bạn đã dành tình cảm cho chúng mình. Sự hiện diện của bạn chính là món quà ý nghĩa nhất, và chúng mình vô cùng trân quý khi được cùng bạn chia sẻ niềm hạnh phúc trong ngày trọng đại.</p></motion.div>
      <motion.img loading="lazy" src={assets48.hero} alt="Hải Đăng và Yến Nhi trong ngày hạnh phúc" {...reveal48('up')} />
      <motion.h3 {...reveal48('up')}>Thank you!</motion.h3>
    </section>
  );
}
