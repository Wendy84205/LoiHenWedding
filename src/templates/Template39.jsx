import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Gift, Heart, MapPin, MessageCircle, Send } from 'lucide-react';
import WeddingMusicButton from './WeddingMusicButton.jsx';
import useWeddingCountdown from './useWeddingCountdown.js';
import { useInvitationContent, useRsvpSubmit, useWishSubmit } from '../commerce/CommercialInvitationContext.jsx';
import './template39.css';
import './new/fontFidelity.css';

const t39Assets = {
  hero: '/assets/template39/couple-red.webp',
  bride: '/assets/template39/couple-red.webp',
  groom: '/assets/template39/couple-red.webp',
  venue: '/assets/template39/couple-red-seated.webp',
  final: '/assets/template39/couple-red-seated.webp',
};

const rise = {
  initial: { opacity: 0, y: 44 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-90px' },
  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
};

function getEventDate(startsAt) {
  const date = new Date(startsAt);
  return {
    date,
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    time: date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false }),
    weekday: date.toLocaleDateString('vi-VN', { weekday: 'long' }).toUpperCase(),
  };
}

function buildCalendarCells(startsAt) {
  const { year, month } = getEventDate(startsAt);
  const offset = (new Date(year, month - 1, 1).getDay() + 6) % 7;
  const days = new Date(year, month, 0).getDate();
  return [...Array.from({ length: offset }, (_, index) => `blank-${index}`), ...Array.from({ length: days }, (_, index) => index + 1)];
}

function Template39() {
  const content = useInvitationContent();
  const [sent, setSent] = useState(false);

  return (
    <main className="template39">
      <WeddingMusicButton className="t39-music" playingClassName="active" src={content.media.music || undefined} />

      <Cover39 />
      <SaveDate39 />
      <Couple39 />
      <Story39 />
      <Families39 />
      <Venue39 />
      <Timeline39 />
      <Rsvp39 />
      <Final39 />
      <Gift39 />
      <WishDock39 sent={sent} setSent={setSent} />
    </main>
  );
}

function Cover39() {
  const { couple, media } = useInvitationContent();
  return (
    <section className="t39-cover" data-media-role="hero" style={{ '--photo': `url(${media.hero || t39Assets.hero})` }}>
      <div className="t39-heroSpark" aria-hidden="true">
        {Array.from({ length: 16 }, (_, index) => <i key={index} />)}
      </div>
      <motion.h1
        className="t39-coverTitle"
        initial={{ opacity: 0, x: -58, rotate: -3 }}
        animate={{ opacity: 1, x: 0, rotate: -3 }}
        transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
      >
        Save The Date
      </motion.h1>
      <motion.div
        className="t39-coverNames"
        initial={{ opacity: 0, y: 42 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.15, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <span data-editor-field="couple.brideName">{couple.brideName}</span>
        <b>&amp;</b>
        <span data-editor-field="couple.groomName">{couple.groomName}</span>
      </motion.div>
    </section>
  );
}

function SaveDate39() {
  const { event } = useInvitationContent();
  const eventDate = getEventDate(event.startsAt);
  const calendarCells = buildCalendarCells(event.startsAt);
  return (
    <section className="t39-section t39-save">
      <div className="t39-saveHeader">
        <p className="t39-weddingDay">
          Our wedding day
        </p>
        <h2 className="t39-monthTitle">
          Tháng {String(eventDate.month).padStart(2, '0')}
        </h2>
      </div>
      <motion.div className="t39-calendar" initial={{ opacity: 0, y: 48 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-90px' }} transition={{ duration: 1.1, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}>
        <div className="t39-week">{['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day) => <span key={day}>{day}</span>)}</div>
        <div className="t39-days">
          {calendarCells.map((day) => (
            typeof day === 'number'
              ? (
                <span key={day} className={day === eventDate.day ? 'hit' : ''}>
                  {day === eventDate.day && <FingerprintHeart />}
                  <b>{day}</b>
                </span>
              )
              : <span key={day} className="blank" />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function FingerprintHeart() {
  return (
    <svg className="t39-fingerprintHeart" viewBox="0 0 118 88" aria-hidden="true">
      <path className="fp-fill" d="M57 82C28 64 9 47 12 27 14 12 30 5 44 14c5 3 9 8 13 14 4-6 8-11 13-14 14-9 30-2 32 13 3 20-16 37-45 55Z" />
      <g className="fp-lines">
        <path d="M15 42c14-26 38-31 50-9 7 13 16 16 32 12" />
        <path d="M18 49c13-22 34-26 45-8 8 13 17 17 31 15" />
        <path d="M22 56c12-18 31-22 40-7 8 12 18 16 28 15" />
        <path d="M27 63c11-14 26-17 34-5 7 10 16 13 24 13" />
        <path d="M33 70c9-9 19-10 26-2 5 6 11 8 18 8" />
        <path d="M20 34c8-16 22-24 36-22 13 2 20 12 24 23" />
        <path d="M28 27c8-10 17-14 27-12 10 2 16 10 20 22" />
        <path d="M38 23c7-5 15-5 21 0 6 4 9 11 11 18" />
        <path d="M54 27c6 5 8 13 12 20 5 9 13 13 25 12" />
        <path d="M43 36c8 0 13 4 17 12 5 11 14 17 28 18" />
        <path d="M35 45c8-4 18-2 24 8 6 11 17 18 31 19" />
        <path d="M67 16c9-7 23-5 29 5 7 12 1 26-10 36" />
        <path d="M74 23c8-4 17-1 20 7 3 8-1 16-9 23" />
        <path d="M80 31c5-2 10 1 11 6 1 5-2 10-8 15" />
      </g>
      <circle cx="27" cy="10" r="4" fill="#e91d35" />
      <circle cx="36" cy="5" r="2.5" fill="#e91d35" />
      <circle cx="18" cy="18" r="2.8" fill="#e91d35" />
    </svg>
  );
}

function Couple39() {
  const { couple, media } = useInvitationContent();
  return (
    <section className="t39-section t39-couple">
      <div className="t39-personStack">
        <motion.article className="bride" initial={{ opacity: 0, x: -82 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-90px' }} transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}>
          <img data-media-role="bride" src={media.bride || media.hero || t39Assets.bride} alt={couple.brideName} />
          <div>
            <span>Cô dâu</span>
            <h2 data-editor-field="couple.brideName">{couple.brideName.toUpperCase()}</h2>
            <p data-editor-field="couple.brideBirthDate">{couple.brideBirthDate}</p>
          </div>
        </motion.article>
        <motion.article className="groom" initial={{ opacity: 0, x: 82 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-90px' }} transition={{ duration: 1.15, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}>
          <img data-media-role="groom" src={media.groom || media.hero || t39Assets.groom} alt={couple.groomName} />
          <div>
            <span>Chú rể</span>
            <h2 data-editor-field="couple.groomName">{couple.groomName.toUpperCase()}</h2>
            <p data-editor-field="couple.groomBirthDate">{couple.groomBirthDate}</p>
          </div>
        </motion.article>
      </div>
    </section>
  );
}

function Story39() {
  const { copy } = useInvitationContent();
  return (
    <section className="t39-story">
      <motion.div className="t39-paperStack" {...rise}>
        <div className="t39-paperSheet">
          <h2>OUR LOVE STORY</h2>
          <p data-editor-field="copy.story">{copy.story}</p>
          <strong data-editor-field="copy.quote">“{copy.quote}”</strong>
        </div>
      </motion.div>
    </section>
  );
}

function Families39() {
  const { couple, families } = useInvitationContent();
  return (
    <section className="t39-section t39-families">
      <div className="t39-familyGrid">
        <motion.article initial={{ opacity: 0, x: -56 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-90px' }} transition={{ duration: 1 }}>
          <h3>Nhà Trai</h3>
          <p data-editor-field="families.groomFather">{families.groomFather}</p>
          <p data-editor-field="families.groomMother">{families.groomMother}</p>
          <small data-editor-field="families.groomAddress">{families.groomAddress}</small>
        </motion.article>
        <motion.article initial={{ opacity: 0, x: 56 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-90px' }} transition={{ duration: 1, delay: 0.1 }}>
          <h3>Nhà Gái</h3>
          <p data-editor-field="families.brideFather">{families.brideFather}</p>
          <p data-editor-field="families.brideMother">{families.brideMother}</p>
          <small data-editor-field="families.brideAddress">{families.brideAddress}</small>
        </motion.article>
      </div>
      <motion.div className="t39-scriptNames" {...rise} transition={{ ...rise.transition, delay: 0.16 }}>
        <span data-editor-field="couple.brideName">{couple.brideName}</span>
        <b>&amp;</b>
        <span data-editor-field="couple.groomName">{couple.groomName}</span>
      </motion.div>
    </section>
  );
}

function Venue39() {
  const { event, media } = useInvitationContent();
  const eventDate = getEventDate(event.startsAt);
  return (
    <section className="t39-venue">
      <div className="t39-eventDetail">
        <motion.p {...rise}>Tiệc mừng lễ thành hôn</motion.p>
        <motion.div className="t39-eventDate" {...rise} transition={{ ...rise.transition, delay: 0.08 }}>
          <span>Tháng {String(eventDate.month).padStart(2, '0')}</span>
          <div className="t39-dateCenter">
            <em>Vào lúc {eventDate.time} {eventDate.weekday}</em>
            <strong>{eventDate.day}</strong>
          </div>
          <span>NĂM {eventDate.year}</span>
        </motion.div>
        <motion.small data-editor-field="event.lunarDate" {...rise} transition={{ ...rise.transition, delay: 0.12 }}>({event.lunarDate})</motion.small>
        <motion.h2 data-editor-field="event.venueName" {...rise} transition={{ ...rise.transition, delay: 0.16 }}>TẠI {event.venueName}</motion.h2>
        <motion.p data-editor-field="event.address" {...rise} transition={{ ...rise.transition, delay: 0.2 }}>Địa chỉ: {event.address}</motion.p>
        <motion.a
          className="t39-map"
          href={event.mapUrl}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-90px' }}
          transition={{ duration: 1, delay: 0.24 }}
        >
          <MapPin size={36} fill="currentColor" />
          <span>Xem bản đồ</span>
        </motion.a>
      </div>
      <motion.figure className="t39-venuePhoto" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-90px' }} transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}>
        <img data-media-role="venue" src={media.venue || media.couple || t39Assets.venue} alt={event.venueName} />
      </motion.figure>
    </section>
  );
}

function Timeline39() {
  const { schedule } = useInvitationContent();
  const icons = ['hands', 'ring', 'toast'];
  const items = schedule.slice(0, 3).map((item, index) => [item.time, item.label, icons[index] || 'toast']);

  return (
    <section className="t39-section t39-timeline">
      <motion.h2 {...rise}>Timeline</motion.h2>
      <div className="t39-timeList">
        {items.map(([time, label, icon], index) => (
          <motion.div key={time} initial={{ opacity: 0, x: index % 2 ? 54 : -54 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-90px' }} transition={{ duration: 0.95, delay: index * 0.08 }}>
            <span className="t39-timeIcon"><TimelineArt type={icon} /></span>
            <p>
              <strong data-editor-field={`schedule.${index}.time`}>{time}</strong>
              <span data-editor-field={`schedule.${index}.label`}>{label}</span>
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function TimelineArt({ type }) {
  if (type === 'ring') {
    return (
      <svg className="t39-timelineArt ring" viewBox="0 0 90 90" aria-hidden="true">
        <path d="M24 48 45 34 66 48 61 75H29Z" fill="#f6a993" />
        <path d="M20 39 42 24c3-2 7-2 10 0l20 15-27 17Z" fill="#fac1b0" />
        <path d="M24 48 45 62 66 48" fill="none" stroke="#e58d79" strokeWidth="3" />
        <circle cx="45" cy="50" r="10" fill="#ffe57c" stroke="#d2a431" strokeWidth="3" />
        <path d="M39 43h12l-6-9Z" fill="#72c9f4" />
        <path d="M30 75h30" stroke="#dc846f" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === 'toast') {
    return (
      <svg className="t39-timelineArt toast" viewBox="0 0 90 90" aria-hidden="true">
        <path d="M26 18h19l-3 38c-.5 6-4 10-9.5 10S23 62 22 56Z" fill="#ffd4c8" stroke="#f0a28d" strokeWidth="3" />
        <path d="M50 18h19l-4 38c-.6 6-4 10-9.5 10S46 62 46 56Z" fill="#ffe4d9" stroke="#f0a28d" strokeWidth="3" />
        <path d="M27 47h14M51 47h14" stroke="#fff" strokeWidth="3" />
        <path d="M32 66v11M56 66v11M24 78h17M48 78h17" stroke="#f0a28d" strokeWidth="3" strokeLinecap="round" />
        <path d="M30 69c-9 0-9-10 0-10 4 0 7 3 7 7" fill="none" stroke="#f4c44d" strokeWidth="3" />
        <path d="M58 69c9 0 9-10 0-10-4 0-7 3-7 7" fill="none" stroke="#62a5f2" strokeWidth="3" />
      </svg>
    );
  }

  return (
    <svg className="t39-timelineArt hands" viewBox="0 0 90 90" aria-hidden="true">
      <path d="M21 61c-5-10-5-22 0-32 2-4 8-2 7 3l-1 12 6-20c1-5 9-3 8 2l-4 20 7-17c2-5 9-2 7 3l-7 20" fill="#ffd1bf" stroke="#ff8f72" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M69 61c5-10 5-22 0-32-2-4-8-2-7 3l1 12-6-20c-1-5-9-3-8 2l4 20-7-17c-2-5-9-2-7 3l7 20" fill="#ffd1bf" stroke="#ff8f72" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M45 58c-12-8-16-14-12-21 3-6 10-5 12 0 2-5 9-6 12 0 4 7 0 13-12 21Z" fill="#ff8aa1" stroke="#dd536b" strokeWidth="3" />
      <circle cx="39" cy="43" r="2" fill="#9b3347" />
      <circle cx="51" cy="43" r="2" fill="#9b3347" />
      <path d="M40 50c3 3 7 3 10 0" fill="none" stroke="#9b3347" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Rsvp39() {
  const rsvp = useRsvpSubmit();
  const [form, setForm] = useState({ fullName: '', attendance: 'yes', partySize: 1 });
  const submit = async (event) => {
    event.preventDefault();
    await rsvp.submit({ ...form, phone: '', note: '', partySize: Number(form.partySize) });
  };
  return (
    <section className="t39-section t39-rsvp">
      <motion.div className="t39-rsvpIntro" {...rise}>
        <p>Hãy xác nhận sự có mặt của bạn để chúng mình chuẩn bị đón tiếp một cách chu đáo nhất.</p>
        <strong>Trân trọng!</strong>
      </motion.div>
      <motion.form className="t39-form" {...rise} transition={{ ...rise.transition, delay: 0.1 }} onSubmit={submit}>
        <h2>Xác nhận tham dự</h2>
        <label>Họ và tên<input placeholder="Tên của bạn" value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} required /></label>
        <fieldset>
          <legend>Bạn sẽ tham dự chứ?</legend>
          <label className="t39-radio"><input type="radio" name="attending39" value="yes" checked={form.attendance === 'yes'} onChange={(event) => setForm({ ...form, attendance: event.target.value })} /> <span>Có, tôi sẽ tham dự</span></label>
          <label className="t39-radio"><input type="radio" name="attending39" value="no" checked={form.attendance === 'no'} onChange={(event) => setForm({ ...form, attendance: event.target.value })} /> <span>Tôi bận, rất tiếc không thể tham dự</span></label>
        </fieldset>
        <label>Số lượng người tham dự<select value={form.partySize} onChange={(event) => setForm({ ...form, partySize: Number(event.target.value) })}>{Array.from({ length: 10 }, (_, index) => <option value={index + 1} key={index + 1}>{index + 1} người</option>)}</select></label>
        <button type="submit" disabled={rsvp.status === 'loading'}><Check size={17} /> {rsvp.status === 'loading' ? 'Đang gửi...' : rsvp.status === 'success' ? 'Đã xác nhận' : 'Gửi xác nhận'}</button>
        {rsvp.error && <p className="t39-formError" role="alert">{rsvp.error}</p>}
      </motion.form>
    </section>
  );
}

function Final39() {
  const { event, copy, media } = useInvitationContent();
  const countdown = useWeddingCountdown(event.startsAt);
  const countdownItems = ['ngày', 'giờ', 'phút', 'giây'].map((label, index) => [countdown[index], label]);

  return (
    <section className="t39-final" data-media-role="final" style={{ '--photo': `url(${media.final || media.couple || t39Assets.final})` }}>
      <motion.div className="t39-countdown" {...rise}>
        <span>Countdown</span>
        <div>
          {countdownItems.map(([value, label]) => (
            <b key={label}>
              <strong>{value}</strong>
              <small>{label}</small>
            </b>
          ))}
        </div>
      </motion.div>
      <motion.p data-editor-field="copy.thankYou" {...rise} transition={{ ...rise.transition, delay: 0.1 }}>
        {copy.thankYou}
      </motion.p>
    </section>
  );
}

function Gift39() {
  const { media } = useInvitationContent();
  return (
    <section className="t39-giftSection">
      <motion.div className="t39-giftIcon" {...rise} aria-hidden="true"><Gift size={86} strokeWidth={1.35} /></motion.div>
      {media.giftQr && <motion.figure className="t39-giftQr" {...rise} transition={{ ...rise.transition, delay: 0.05 }}><img data-gift-qr src={media.giftQr} alt="QR mừng cưới" /><figcaption>Quét mã gửi quà mừng</figcaption></motion.figure>}
      <motion.h2 {...rise} transition={{ ...rise.transition, delay: 0.08 }}>Hộp quà cưới</motion.h2>
      <motion.p {...rise} transition={{ ...rise.transition, delay: 0.14 }}>
        Lời chúc và sự hiện diện của bạn đã là món quà quý giá nhất với chúng mình.
      </motion.p>
    </section>
  );
}

function WishDock39({ sent, setSent }) {
  const wish = useWishSubmit();
  const [form, setForm] = useState({ fullName: '', message: '' });
  const submit = async (event) => {
    event.preventDefault();
    const success = await wish.submit(form);
    if (success) {
      setSent(true);
      setForm({ fullName: '', message: '' });
    }
  };
  return (
    <form className="t39-wishDock" onSubmit={submit}>
      <label>
        <input className="t39-wishName" aria-label="Tên người gửi" placeholder="Tên" value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} required />
        <input aria-label="Lời chúc dành cho cô dâu chú rể" placeholder="Gửi lời chúc..." value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} required minLength={2} />
        <MessageCircle size={17} />
      </label>
      <button className="t39-pill" type="button"><Heart size={15} fill="currentColor" /> Bắn tim</button>
      <button className="t39-circle" type="button" aria-label="Mở thông tin quà cưới"><Gift size={18} /></button>
      <button className="t39-circle send" type="submit" aria-label="Gửi lời chúc" disabled={wish.status === 'loading'}><Send size={18} /></button>
      {sent && <span className="t39-sent">Đã gửi</span>}
      {wish.error && <span className="t39-sent error">{wish.error}</span>}
    </form>
  );
}

export default Template39;
