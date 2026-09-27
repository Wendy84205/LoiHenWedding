import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gift, Heart, MapPin } from 'lucide-react';
import WeddingMusicButton from './WeddingMusicButton.jsx';
import useWeddingCountdown from './useWeddingCountdown.js';
import { RsvpForm, WishForm } from './new/NewInvitationCommon.jsx';
import { useInvitationContent } from '../commerce/CommercialInvitationContext.jsx';
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
};

const reveal36 = (direction = 'up', delay = 0) => {
  const delta = direction === 'left' ? { x: 56, y: 0 } : direction === 'right' ? { x: -56, y: 0 } : { x: 0, y: 45 };
  return { initial: { opacity: 0, ...delta }, whileInView: { opacity: 1, x: 0, y: 0 }, viewport: { once: true, margin: '-55px' }, transition: { duration: 1.3, delay, ease: 'easeOut' } };
};

export default function Template36() {
  const content = useInvitationContent({
    couple: { brideName: 'Mai Anh', groomName: 'Minh Quân' },
    families: { groomFather: 'Ông Nguyễn Văn Hùng', groomMother: 'Bà Trần Thị Thu', brideFather: 'Ông Lê Quang Minh', brideMother: 'Bà Phạm Thị Lan' },
    event: { startsAt: '2027-10-12T12:00:00+07:00', venueName: 'Trung tâm tiệc cưới Cinelove', address: 'Hà Nội' },
  });
  const dateValue = content.event.startsAt || '2027-10-12T12:00:00+07:00';
  const date = new Date(dateValue);
  const countdown = useWeddingCountdown(dateValue);

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
      <Hero36 countdown={countdown} couple={content.couple} />
      <Invitation36 content={content} date={date} />
      <About36 couple={content.couple} />
      <Families36 families={content.families} />
      <Beginning36 />
      <Freedom36 />
      <Gallery36 />
      <DateVenue36 date={date} event={content.event} />
      <Schedule36 schedule={content.schedule} />
      <Tips36 />
      <Rsvp36 />
      <Wish36 />
      <Gift36 couple={content.couple} />
    </main>
  );
}

function Hero36({ countdown, couple }) {
  return (
    <section className="t36-hero" id="hero">
      <motion.p className="t36-topQuote" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1 }}>I have three things in this world. Sun, moon and you.<br />Sun for morning, moon for night, and you forever.</motion.p>
      <motion.div className="t36-orbit" initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.35, delay: .16 }}><span>WEDDING INVITATION</span><img src={assets36.hero} alt={`${couple.brideName} và ${couple.groomName}`} fetchPriority="high" /></motion.div>
      <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: .38 }}>{couple.brideName} <i>&amp;</i> {couple.groomName}</motion.h1>
      <motion.p className="t36-married" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: .62 }}>WE ARE GETTING MARRIED</motion.p>
      <div className="t36-zeroCount">{['ngày', 'giờ', 'phút', 'giây'].map((label, index) => <span key={label}><b>{countdown[index]}</b><small>{label}</small></span>)}</div>
    </section>
  );
}

function Invitation36({ content, date }) {
  return (
    <section className="t36-invitation" id="invitation">
      <motion.div className="t36-dateStrip" {...reveal36('up')}><span>{date.toLocaleDateString('vi-VN', { weekday: 'long' })}<br /><b>{date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</b></span><strong>{String(date.getDate()).padStart(2, '0')}</strong><span>Tháng {String(date.getMonth() + 1).padStart(2, '0')}<br /><b>{date.getFullYear()}</b></span></motion.div>
      <motion.div className="t36-addressStrip" {...reveal36('up', .1)}><i>Address</i><p>{content.event.venueName}</p></motion.div>
      <motion.div className="t36-invitePhoto" {...reveal36('up', .12)}><img loading="lazy" src={assets36.couple} alt={`Ảnh cưới ${content.couple.brideName} và ${content.couple.groomName}`} /><span>INVITATION</span></motion.div>
      <motion.p className="t36-formal" {...reveal36('up')}>Trân trọng kính mời bạn đến chung vui<br />và chứng kiến ngày hạnh phúc của chúng mình.</motion.p>
    </section>
  );
}

function Families36({ families }) {
  return (
    <section className="t36-families" id="families">
      <motion.header {...reveal36('up')}><small>OUR FAMILIES</small><h2>Hai gia đình<br />trân trọng kính mời</h2></motion.header>
      <div className="t36-familyGrid">
        <motion.div {...reveal36('right')}><small>NHÀ TRAI</small><b>{families.groomFather}</b><b>{families.groomMother}</b><p>{families.groomAddress}</p></motion.div>
        <Heart aria-hidden="true" />
        <motion.div {...reveal36('left')}><small>NHÀ GÁI</small><b>{families.brideFather}</b><b>{families.brideMother}</b><p>{families.brideAddress}</p></motion.div>
      </div>
    </section>
  );
}

function About36({ couple }) {
  return (
    <section className="t36-about" id="about-us">
      <motion.div className="t36-aboutLead" {...reveal36('right')}><img loading="lazy" src={assets36.first} alt="Khoảnh khắc nắm tay" /><p>We have no idea where this story would take us,<br />but we know this chapter is ours.</p></motion.div>
      <motion.h2 {...reveal36('up')}>ABOUT US</motion.h2>
      <div className="t36-aboutCards">
        <motion.figure {...reveal36('right')}><img loading="lazy" src={assets36.bride} alt={`Cô dâu ${couple.brideName}`} /><figcaption><small>Cô dâu</small><b>{couple.brideName}</b></figcaption></motion.figure>
        <motion.figure {...reveal36('left')}><img loading="lazy" src={assets36.groom} alt={`Chú rể ${couple.groomName}`} /><figcaption><small>Chú rể</small><b>{couple.groomName}</b></figcaption></motion.figure>
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

function DateVenue36({ date, event }) {
  const offset = (new Date(date.getFullYear(), date.getMonth(), 1).getDay() + 6) % 7;
  const dayCount = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const calendar = [...Array.from({ length: offset }, (_, index) => `blank-${index}`), ...Array.from({ length: dayCount }, (_, index) => index + 1)];
  const monthLabel = date.toLocaleString('en-US', { month: 'long' });
  const dateLabel = date.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });
  return (
    <section className="t36-dateVenue" id="date">
      <motion.div className="t36-calendar" {...reveal36('up')}>
        <h2>{monthLabel} <b>{date.getFullYear()}</b></h2><div>{calendar.map((day) => typeof day === 'string' ? <span key={day} /> : <span key={day} className={day === date.getDate() ? 'is-wedding' : ''}>{day === date.getDate() && <Heart fill="currentColor" strokeWidth={0} />}<i>{day}</i></span>)}</div>
      </motion.div>
      <motion.div className="t36-timeCopy" {...reveal36('up', .1)}><span>TIME</span><p>{dateLabel}<br /><small>{event.lunarDate || 'Thân mời bạn đến chung vui cùng gia đình.'}</small></p></motion.div>
      <motion.a className="t36-map" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.address || event.venueName)}`} target="_blank" rel="noreferrer" {...reveal36('up')}><MapPin /><b>{event.venueName}</b><span>Xem chỉ đường</span></motion.a>
    </section>
  );
}

function Schedule36({ schedule = [] }) {
  const entries = schedule.length ? schedule.slice(0, 4) : [
    { time: '11:30', label: 'Đón tiếp khách mời' },
    { time: '12:00', label: 'Lễ thành hôn' },
    { time: '13:00', label: 'Khai tiệc' },
  ];
  return <section className="t36-schedule"><motion.div {...reveal36('up')}><small>THE WEDDING PROGRAM</small><h2>Chương trình ngày vui</h2>{entries.map((entry) => <p key={`${entry.time}-${entry.label}`}><time>{entry.time}</time><span>{entry.label}</span></p>)}</motion.div></section>;
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
      <motion.div className="t36-dress" {...reveal36('up')}><small>DRESS CODE</small><p>Trắng, hồng phấn và những gam màu dịu nhẹ.</p><span><i /><i /><i /></span></motion.div>
      <motion.p {...reveal36('up')}>Hẹn gặp bạn trong ngày hạnh phúc!</motion.p>
    </section>
  );
}

function Rsvp36() {
  return <section className="t36-rsvp" id="rsvp"><RsvpForm className="t36-rsvpForm" accent="#d46875" /></section>;
}

function Wish36() {
  return <section className="t36-wishes" id="wishes"><motion.div {...reveal36('up')}><small>YOUR WISHES</small><WishForm className="t36-wishForm" accent="#d46875" /></motion.div></section>;
}

function Gift36({ couple }) {
  return (
    <section className="t36-gift" id="gift">
      <motion.div className="t36-giftFrame" {...reveal36('up')}><Gift /><h2>{couple.brideName} &amp; {couple.groomName}</h2><div className="t36-giftMark" aria-hidden="true"><Heart fill="currentColor" /><span>THANK<br />YOU</span></div><small>Sự hiện diện và lời chúc của bạn là món quà quý giá nhất.</small></motion.div>
      <motion.p {...reveal36('up', .12)}>Non sông một chữ duyên dài<br />Ba sinh ước hẹn, duyên này thành đôi.</motion.p>
      <motion.h3 {...reveal36('up', .2)}>THANK YOU</motion.h3>
    </section>
  );
}
