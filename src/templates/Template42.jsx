import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Camera, Heart, MapPin, UtensilsCrossed } from 'lucide-react';
import WeddingMusicButton from './WeddingMusicButton.jsx';
import { Countdown, RsvpForm, WishForm, useInvitationPage } from './new/NewInvitationCommon.jsx';
import { useInvitationContent } from '../commerce/CommercialInvitationContext.jsx';
import './template42.css';

const assets42 = {
  hero: '/assets/template61/couple-close.webp', couple: '/assets/template61/couple-hero.webp',
  bride: '/assets/template61/gallery-1.webp', groom: '/assets/template61/gallery-2.webp',
  wideA: '/assets/template61/gallery-1.webp', wideB: '/assets/template61/gallery-2.webp',
  wideC: '/assets/template61/gallery-4.webp', wideD: '/assets/template61/gallery-5.webp', wideE: '/assets/template61/gallery-6.webp',
};
const defaultDate42 = '2027-12-25T10:30:00+07:00';
const reveal42 = { initial: { opacity: 0, y: 34 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-70px' }, transition: { duration: .72, ease: [.22, 1, .36, 1] } };

function Template42() {
  const content = useInvitationContent({
    couple: { brideName: 'Mai Anh', brideFullName: 'Nguyễn Mai Anh', groomName: 'Quốc Huy', groomFullName: 'Phạm Quốc Huy', brideBirthDate: '12.05.2000', groomBirthDate: '05.08.1995' },
    families: { groomFather: 'Ông Phạm Quang Hải', groomMother: 'Bà Đinh Thị Mai', groomAddress: 'TP. Hà Nội', brideFather: 'Ông Nguyễn Tiến Minh', brideMother: 'Bà Lê Thị Hải Yến', brideAddress: 'TP. Điện Biên' },
    event: { startsAt: defaultDate42, venueName: 'Trống Đồng Palace', address: '18A Lý Văn Phức, P. Ô Chợ Dừa, Hà Nội', mapUrl: '', lunarDate: '' },
    copy: { intro: 'Cảm ơn bạn đã dành thời gian quý báu để cùng chúng mình chung vui trong ngày đặc biệt này.', story: 'Chúng mình vô cùng biết ơn vì luôn có sự đồng hành và thật vinh hạnh khi được chia sẻ niềm hạnh phúc cùng bạn.', quote: 'Mình rất muốn được chụp chung với bạn những tấm hình kỷ niệm, vì vậy hãy đến sớm hơn một chút bạn nhé!' },
    media: { hero: '', couple: '', bride: '', groom: '', giftQr: '' },
  });
  const [opened, setOpened] = useState(() => new URLSearchParams(window.location.search).has('preview'));
  const [opening, setOpening] = useState(false);
  const dateValue = content.event.startsAt || defaultDate42;
  const parsed = new Date(dateValue);
  const date = Number.isFinite(parsed.getTime()) ? parsed : new Date(defaultDate42);
  const dateKey = Number.isFinite(parsed.getTime()) ? dateValue : defaultDate42;
  const month = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();
  const weekday = date.toLocaleDateString('vi-VN', { weekday: 'long' }).toUpperCase();
  const dateLabel = date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }).replaceAll('/', ' · ');
  const timeLabel = date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  const count = useInvitationPage('template42-page-countdown', dateKey);

  useEffect(() => {
    document.documentElement.classList.add('template42-page');
    document.body.classList.add('template42-page');
    return () => { document.documentElement.classList.remove('template42-page'); document.body.classList.remove('template42-page'); };
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
      <h1 className="visually-hidden">Thiệp cưới {content.couple.brideName} và {content.couple.groomName}</h1>
      <AnimatePresence>{!opened && <Intro42 opening={opening} onOpen={openInvitation} content={content} />}</AnimatePresence>
      <WeddingMusicButton className="t42-music" src={content.media.music || undefined} />
      <Hero42 content={content} dateLabel={dateLabel} date={date} count={count} />
      <Invitation42 content={content} />
      <Family42 content={content} />
      <Event42 content={content} date={date} weekday={weekday} time={timeLabel} />
      <SweetStory42 content={content} />
      <About42 content={content} />
      <SaveDate42 content={content} date={date} month={month} />
      <Album42 content={content} />
      <Rsvp42 quote={content.copy.quote} />
      <Gift42 content={content} />
      <footer className="t42-footer"><span>Thank you</span><p>{content.couple.brideName.toUpperCase()} &amp; {content.couple.groomName.toUpperCase()}</p></footer>
    </main>
  );
}

function Intro42({ opening, onOpen, content }) {
  return (
    <motion.section className="t42-intro" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .48 }}>
      <div className="t42-introMark">囍</div>
      <button className={opening ? 't42-envelope is-opening' : 't42-envelope'} type="button" onClick={onOpen} aria-label="Chạm để mở thiệp">
        <span className="t42-envelopeBack" />
        <motion.img src={content.media.hero || content.media.couple || assets42.wideA} alt={`Ảnh cưới ${content.couple.brideName} và ${content.couple.groomName}`} animate={opening ? { y: -128, opacity: 1 } : { y: 34, opacity: 0 }} transition={{ duration: .75, delay: .34, ease: [.22, 1, .36, 1] }} />
        <span className="t42-envelopeLeft" /><span className="t42-envelopeRight" /><span className="t42-envelopeFront" /><span className="t42-envelopeFlap" /><i>囍</i>
      </button>
      <motion.p animate={opening ? { opacity: 0, y: 8 } : { opacity: 1, y: 0 }}>Chạm để mở thiệp</motion.p>
    </motion.section>
  );
}
function Hero42({ content, dateLabel, date, count }) {
  const { couple, media } = content;
  return (
    <section className="t42-hero" style={{ '--t42-hero': `url(${media.hero || assets42.hero})` }}>
      <div className="t42-heroShade" /><motion.p initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75 }}>WEDDING INVITATION</motion.p>
      <motion.div className="t42-heroNames" initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .95, delay: .12, ease: [.22, 1, .36, 1] }}><span>{couple.brideName}</span><i>&amp;</i><span>{couple.groomName}</span></motion.div>
      <motion.div className="t42-heroInvite" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .7, delay: .35 }}><strong>INVITATION</strong><span>{dateLabel}</span></motion.div>
      <Countdown values={count} className="t42-countdown" />
    </section>
  );
}
function Invitation42({ content }) {
  return <section className="t42-invitation" id="invitation"><motion.div className="t42-invitationFrame" {...reveal42}><span>INVITATION</span><h2>Gửi đến gia đình<br />và bạn bè thân mến,</h2><p>{content.copy.intro}</p><p>{content.copy.story}</p><strong>Trân trọng kính mời bạn đến dự lễ cưới của chúng mình</strong></motion.div></section>;
}
function Family42({ content }) {
  const { couple, families, media } = content;
  return (
    <section className="t42-family"><motion.p className="t42-scriptTitle" {...reveal42}>Lễ Thành Hôn</motion.p>
      <motion.div className="t42-familyPhoto" {...reveal42}><img loading="lazy" decoding="async" src={media.couple || assets42.couple} alt={`Ảnh cưới ${couple.brideName} và ${couple.groomName}`} /></motion.div>
      <div className="t42-familyGrid">
        <motion.article initial={{ opacity: 0, x: -38 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-70px' }} transition={{ duration: .7 }}><span>NHÀ TRAI</span><b>{families.groomFather}<br />{families.groomMother}</b><small>{families.groomAddress}</small></motion.article>
        <motion.article initial={{ opacity: 0, x: 38 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-70px' }} transition={{ duration: .7 }}><span>NHÀ GÁI</span><b>{families.brideFather}<br />{families.brideMother}</b><small>{families.brideAddress}</small></motion.article>
      </div>
      <motion.div className="t42-coupleNames" {...reveal42}><span>{couple.brideFullName || couple.brideName}</span><i>&amp;</i><span>{couple.groomFullName || couple.groomName}</span></motion.div>
    </section>
  );
}
function Event42({ content, date, weekday, time }) {
  const { event } = content;
  const mapUrl = event.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([event.venueName, event.address].filter(Boolean).join(', '))}`;
  return (
    <section className="t42-event" id="event-details"><motion.p {...reveal42}>TIỆC MỪNG LỄ THÀNH HÔN</motion.p>
      <motion.h2 {...reveal42}>Vào lúc {time} · {weekday}</motion.h2>
      <motion.div className="t42-dateStamp" {...reveal42}><span>THÁNG {String(date.getMonth() + 1).padStart(2, '0')}</span><strong>{String(date.getDate()).padStart(2, '0')}</strong><span>NĂM {date.getFullYear()}</span></motion.div>
      {event.lunarDate && <motion.small {...reveal42}>({event.lunarDate})</motion.small>}
      <motion.div className="t42-venue" {...reveal42}><span>ĐỊA ĐIỂM TỔ CHỨC</span><h3>{event.venueName}</h3><p>{event.address}</p><a href={mapUrl} target="_blank" rel="noreferrer"><MapPin size={15} /> Xem đường đi</a></motion.div>
    </section>
  );
}
function SweetStory42({ content }) {
  const { couple, copy, media } = content;
  return <section className="t42-sweet"><motion.p {...reveal42}>SWEET WEDDING</motion.p><motion.h2 {...reveal42}>MARRY<br /><em>ME?</em></motion.h2>
    <div className="t42-sweetCollage"><motion.img loading="lazy" decoding="async" src={media.bride || assets42.bride} alt={`Chân dung ${couple.brideName}`} initial={{ opacity: 0, x: -36, rotate: -4 }} whileInView={{ opacity: 1, x: 0, rotate: -2 }} viewport={{ once: true }} transition={{ duration: .75 }} /><motion.img loading="lazy" decoding="async" src={media.couple || assets42.wideC} alt={`Khoảnh khắc của ${couple.brideName} và ${couple.groomName}`} initial={{ opacity: 0, x: 36, rotate: 4 }} whileInView={{ opacity: 1, x: 0, rotate: 2 }} viewport={{ once: true }} transition={{ duration: .75, delay: .08 }} /></div>
    <motion.div className="t42-yes" {...reveal42}>{copy.quote || 'YES, I DO!'}</motion.div>
  </section>;
}
function About42({ content }) {
  const { couple, media } = content;
  return <section className="t42-about" id="about-us"><motion.p className="t42-scriptTitle" {...reveal42}>About us</motion.p>
    <div className="t42-profile bride"><motion.img loading="lazy" decoding="async" src={media.bride || assets42.bride} alt={`Ảnh cưới của cô dâu ${couple.brideName}`} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .75 }} /><motion.div {...reveal42}><span>Bride</span><h3>{couple.brideFullName || couple.brideName}</h3><p>{couple.brideBirthDate}</p></motion.div></div>
    <div className="t42-profile groom"><motion.img loading="lazy" decoding="async" src={media.groom || assets42.groom} alt={`Ảnh cưới của chú rể ${couple.groomName}`} initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .75 }} /><motion.div {...reveal42}><span>Groom</span><h3>{couple.groomFullName || couple.groomName}</h3><p>{couple.groomBirthDate}</p></motion.div></div>
  </section>;
}
function SaveDate42({ content, date, month }) {
  const schedule = content.schedule?.length ? content.schedule.slice(0, 4) : [{ time: '08:00', label: 'Đón khách' }, { time: '09:30', label: 'Lễ thành hôn' }, { time: '10:30', label: 'Khai tiệc' }];
  const icons = [Heart, Camera, UtensilsCrossed, Heart];
  const firstWeekday = (new Date(date.getFullYear(), date.getMonth(), 1).getDay() + 6) % 7;
  const dayCount = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const days = [...Array.from({ length: firstWeekday }, (_, i) => `blank-${i}`), ...Array.from({ length: dayCount }, (_, i) => i + 1)];
  return <section className="t42-saveDate" id="save-the-date"><motion.div className="t42-saveHead" {...reveal42}><span>Save the date</span><strong>{month}</strong></motion.div>
    <motion.figure {...reveal42}><img loading="lazy" decoding="async" src={content.media.couple || assets42.wideE} alt={`Ảnh cưới ${content.couple.brideName} và ${content.couple.groomName}`} /></motion.figure>
    <motion.div className="t42-calendar" {...reveal42}>{['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day) => <b key={day}>{day}</b>)}{days.map((day) => typeof day === 'string' ? <span key={day} /> : <span key={day} className={day === date.getDate() ? 'is-wedding' : ''}>{day === date.getDate() && <Heart size={30} fill="currentColor" strokeWidth={0} />}<i>{day}</i></span>)}</motion.div>
    <div className="t42-timeline">{schedule.map((item, index) => { const Icon = icons[index % icons.length]; return <motion.article key={`${item.time}-${item.label}`} initial={{ opacity: 0, x: index % 2 ? 34 : -34 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .64, delay: index * .08 }}><Icon size={21} /><b>{item.time}</b><span>{item.label}</span></motion.article>; })}</div>
  </section>;
}
function Album42({ content }) {
  const couple = content.couple;
  const images = [content.media.couple || assets42.wideA, assets42.couple, assets42.wideD, assets42.wideC];
  return <section className="t42-album" id="album-of-love"><motion.p className="t42-scriptTitle" {...reveal42}>Album of love</motion.p><div className="t42-albumGrid">{images.map((src, i) => <motion.img key={src + i} loading="lazy" decoding="async" src={src} alt={`Ảnh ${i + 1} trong album của ${couple.brideName} và ${couple.groomName}`} {...reveal42} />)}</div></section>;
}
function Rsvp42({ quote }) {
  return <section className="t42-rsvp" id="rsvp"><div className="t42-formStack"><RsvpForm accent="#a5444d" className="t42-rsvpForm"/><WishForm accent="#a5444d" className="t42-wishForm"/></div><p>{quote}</p></section>;
}
function Gift42({ content }) {
  const qr = content.media.giftQr || content.gift.groomQr || content.gift.brideQr;
  return <section className="t42-gift"><motion.div className="t42-giftHead" {...reveal42}><Heart size={28}/><span>GỬI QUÀ MỪNG</span></motion.div><motion.article {...reveal42}><div><span>Cô dâu &amp; chú rể</span><b>{content.couple.brideName} &amp; {content.couple.groomName}</b><small>Sự hiện diện và lời chúc của bạn là món quà quý giá nhất.</small></div>{qr && <img className="t42-bankQr" loading="lazy" decoding="async" src={qr} alt="Mã QR mừng cưới"/>}</motion.article></section>;
}
export default Template42;
