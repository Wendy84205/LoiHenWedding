import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Gem, Gift, GlassWater, Heart, MapPin } from 'lucide-react';
import WeddingMusicButton from './WeddingMusicButton.jsx';
import { RsvpForm, WishForm, useInvitationPage } from './new/NewInvitationCommon.jsx';
import { useInvitationContent } from '../commerce/CommercialInvitationContext.jsx';
import './template40.css';

const assets40 = {
  hero: '/assets/template40-ref/hero.jpg',
  couple: '/assets/template40-ref/couple.jpg',
  close: '/assets/template40-ref/save.jpg',
  bride: '/assets/template40-ref/bride.jpg',
  groom: '/assets/template40-ref/groom.jpg',
  story: '/assets/template40-ref/hero.jpg',
  paper: '/assets/template40-ref/paper.png',
  qr: '/assets/template40-ref/qr.png',
};

const reveal40 = (direction = 'up', delay = 0) => {
  const move = direction === 'left' ? { x: 52, y: 0 } : direction === 'right' ? { x: -52, y: 0 } : { x: 0, y: 44 };
  return {
    initial: { opacity: 0, ...move },
    whileInView: { opacity: 1, x: 0, y: 0 },
    viewport: { once: true, margin: '-55px' },
    transition: { duration: 1.3, delay, ease: 'easeOut' },
  };
};

const fallbackDate = '2027-12-12T10:30:00+07:00';

export default function Template40() {
  const content = useInvitationContent({
    couple: { groomName: 'Hoàng Long', brideName: 'Phương Nga', groomBirthDate: '05 / 08 / 1995', brideBirthDate: '20 / 12 / 2001' },
    families: { groomFather: 'Ông. Phan Đình Hải', groomMother: 'Bà. Nguyễn Thị Mai', groomAddress: 'TP. Hải Phòng', brideFather: 'Ông. Đặng Thái Công', brideMother: 'Bà. Hoàng Mai Hương', brideAddress: 'TP. Hà Nội' },
    event: { startsAt: fallbackDate, venueName: 'Tư gia nhà trai', address: '12 Trần Phú, Ngô Quyền, Hải Phòng', mapUrl: '', lunarDate: '' },
    media: { hero: '', bride: '', groom: '', couple: '', giftQr: '' },
  });
  const dateValue = content.event.startsAt || fallbackDate;
  const date = new Date(dateValue);
  const countdown = useInvitationPage('template40-page-countdown', dateValue);

  useEffect(() => {
    document.documentElement.classList.add('template40-page');
    document.body.classList.add('template40-page');
    return () => {
      document.documentElement.classList.remove('template40-page');
      document.body.classList.remove('template40-page');
    };
  }, []);

  return (
    <main className="template40">
      <h1 className="visually-hidden">Thiệp cưới {content.couple.brideName} và {content.couple.groomName}</h1>
      <WeddingMusicButton className="t40-music" src={content.media.music || undefined} />
      <Hero40 countdown={countdown} content={content} date={date} />
      <SaveDate40 content={content} />
      <Invitation40 content={content} date={date} />
      <CalendarVenue40 date={date} event={content.event} />
      <Profiles40 content={content} />
      <Timeline40 schedule={content.schedule} />
      <Rsvp40 />
      <Gift40 content={content} />
    </main>
  );
}

function Hero40({ countdown, content, date }) {
  const names = content.couple;
  return (
    <section className="t40-hero" id="hero">
      <motion.div className="t40-heroImage" initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.45, ease: [0.22, 1, 0.36, 1] }}>
        <img src={content.media.hero || assets40.hero} alt={`${names.brideName} và ${names.groomName}`} fetchPriority="high" />
      </motion.div>
      <motion.p className="t40-scriptTitle" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: .2 }}>We get married!</motion.p>
      <motion.div className="t40-heroNames" initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: .42 }}>
        <span>{names.brideName.toUpperCase()}</span><i>&amp;</i><span>{names.groomName.toUpperCase()}</span><small>{date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }).replaceAll('/', '.')}</small>
      </motion.div>
      <motion.p className="t40-heroCaption" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.1, delay: .65 }}>We will become husband and wife in</motion.p>
      <div className="t40-countdown">
        {['ngày', 'giờ', 'phút', 'giây'].map((label, index) => <span key={label}><b>{countdown[index]}</b><small>{label}</small></span>)}
      </div>
    </section>
  );
}

function SaveDate40({ content }) {
  return (
    <section className="t40-save" id="save-the-date">
      <motion.figure className="t40-saveMain" {...reveal40('right')}><img loading="lazy" src={assets40.close} alt="Khoảnh khắc của cô dâu chú rể" /></motion.figure>
      <motion.figure className="t40-saveSmall" {...reveal40('left', .12)}><img loading="lazy" src={assets40.couple} alt="Ảnh cưới Phương Nga và Hoàng Long" /></motion.figure>
      <motion.h2 {...reveal40('left', .2)}><span>SAVE</span><i>the</i><span>DATE</span></motion.h2>
      <div className="t40-families">
        <motion.article {...reveal40('right')}><h3>Nhà gái</h3><p>{content.families.brideFather}<br />{content.families.brideMother}</p><small>{content.families.brideAddress}</small></motion.article>
        <motion.article {...reveal40('left')}><h3>Nhà trai</h3><p>{content.families.groomFather}<br />{content.families.groomMother}</p><small>{content.families.groomAddress}</small></motion.article>
      </div>
    </section>
  );
}

function Invitation40({ content, date }) {
  const names = content.couple;
  const lunar = content.event.lunarDate;
  return (
    <section className="t40-invitation" id="invitation">
      <motion.p {...reveal40('up')}>{content.copy.intro || 'Thân mời đến dự lễ thành hôn của chúng mình!'}</motion.p>
      <motion.div className="t40-inviteNames" {...reveal40('up', .15)}><span>{names.brideName}</span><i>&amp;</i><span>{names.groomName}</span></motion.div>
      <motion.small {...reveal40('up')}>Được tổ chức vào lúc</motion.small>
      <motion.div className="t40-timeStamp" {...reveal40('up', .15)}><b>{date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</b><strong>{date.toLocaleDateString('vi-VN', { weekday: 'long' }).toUpperCase()}</strong><b>{date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }).replaceAll('/', '.')}</b></motion.div>
      {lunar && <motion.em {...reveal40('up')}>({lunar})</motion.em>}
    </section>
  );
}

function CalendarVenue40({ date, event }) {
  const firstWeekday = (new Date(date.getFullYear(), date.getMonth(), 1).getDay() + 6) % 7;
  const dayCount = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const calendar = [...Array.from({ length: firstWeekday }, (_, index) => `blank-${index}`), ...Array.from({ length: dayCount }, (_, index) => index + 1)];
  const monthLabel = date.toLocaleDateString('vi-VN', { month: 'long' });
  const mapUrl = event.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.address || event.venueName)}`;
  return (
    <section className="t40-calendarVenue" id="calendar">
      <motion.div className="t40-paperCalendar" {...reveal40('up')}>
        <span className="t40-clip" />
        <h2>{monthLabel}</h2>
        <div className="t40-week"><b>T2</b><b>T3</b><b>T4</b><b>T5</b><b>T6</b><b>T7</b><b>CN</b></div>
        <div className="t40-days">
          {calendar.map((day) => typeof day === 'string' ? <span key={day} /> : <span key={day} className={day === date.getDate() ? 'is-wedding' : ''}>{day === date.getDate() && <Heart fill="currentColor" strokeWidth={0} />}<i>{day}</i></span>)}
        </div>
      </motion.div>
      <motion.div className="t40-venue" {...reveal40('up', .12)}>
        <h3>Địa điểm:</h3><b>{event.venueName}</b><p>{event.address}</p>
        <a href={mapUrl} target="_blank" rel="noreferrer"><MapPin size={16} /> Xem chỉ đường</a>
      </motion.div>
    </section>
  );
}

function Profiles40({ content }) {
  const { couple, media } = content;
  return (
    <section className="t40-profiles" id="couple">
      <motion.article {...reveal40('right')}><img loading="lazy" src={media.bride || assets40.bride} alt={`Cô dâu ${couple.brideName}`} /><div><small>Cô dâu</small><h2>{couple.brideName}</h2><p>{couple.brideBirthDate}</p></div></motion.article>
      <motion.article {...reveal40('left')}><div><small>Chú rể</small><h2>{couple.groomName}</h2><p>{couple.groomBirthDate}</p></div><img loading="lazy" src={media.groom || assets40.groom} alt={`Chú rể ${couple.groomName}`} /></motion.article>
    </section>
  );
}

function Timeline40({ schedule = [] }) {
  const fallbackSchedule = [
    { icon: Camera, time: '05:30', label: 'Rước dâu' },
    { icon: GlassWater, time: '10:30', label: 'Đón khách' },
    { icon: Gem, time: '12:00', label: 'Lễ thành hôn' },
    { icon: Heart, time: '13:00', label: 'Lưu niệm' },
  ];
  const icons = [Camera, GlassWater, Gem, Heart];
  const events = (schedule.length ? schedule.slice(0, 4) : fallbackSchedule).map((item, index) => ({
    icon: item.icon || icons[index], time: item.time, label: item.label,
  }));
  return (
    <section className="t40-timeline" id="timeline">
      <motion.h2 {...reveal40('up')}>TIMELINE</motion.h2>
      <div className="t40-eventLine">
        {events.map(({ icon: Icon, time, label }, index) => <motion.article key={time} {...reveal40('up', index * .08)}><Icon /><b>{time}</b><span>{label}</span></motion.article>)}
      </div>
      <motion.p {...reveal40('up', .2)}>Hãy xác nhận sự có mặt của bạn để chúng mình<br />chuẩn bị đón tiếp một cách chu đáo nhất.<br />Trân trọng!</motion.p>
    </section>
  );
}

function Rsvp40() {
  return (
    <section className="t40-rsvp" id="rsvp">
      <motion.div {...reveal40('up')}><RsvpForm className="t40-rsvpForm" accent="#7f2f42"/><WishForm className="t40-wishForm" accent="#7f2f42"/></motion.div>
    </section>
  );
}

function Gift40({ content }) {
  const qr = content.media.giftQr || content.gift.groomQr || content.gift.brideQr;
  return (
    <section className="t40-gift" id="gift">
      <motion.div {...reveal40('up')}><h2><Gift size={18} /> Hộp quà mừng</h2>{qr && <img loading="lazy" src={qr} alt="Mã QR mừng cưới" />}<b>{content.couple.brideName} &amp; {content.couple.groomName}</b><span>Lời chúc và sự hiện diện của bạn là món quà quý giá nhất.</span></motion.div>
      <motion.p {...reveal40('up', .2)}>Thank you!</motion.p>
    </section>
  );
}
