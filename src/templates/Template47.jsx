import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Maximize2, MessageCircle, Send, X, Check } from 'lucide-react';
import WeddingMusicButton from './WeddingMusicButton.jsx';
import { useCommercialInvitation, useInvitationContent, useRsvpSubmit, useWishSubmit } from './invitationContext.js';
import './template47.css';
import './new/auditFidelity.css';

const t47Assets = {
  cover: '/assets/template47-ref/cover-b1f9e370.jpeg',
  photo: '/assets/template47-ref/photo-c8135150.jpeg',
  story: '/assets/template47-ref/story-4c5cc0c8.jpeg',
  love: '/assets/template47-ref/love-b3548f69.jpeg',
  you: '/assets/template47-ref/you-b05ac3fe.jpeg',
  gallery: '/assets/template47-ref/gallery-4616e740.jpeg',
  rsvp: '/assets/template47-ref/rsvpbg-968fd388.jpeg',
  final: '/assets/template47-ref/final-f2c9a769.jpeg',
  lantern: '/assets/template47-ref/lantern-3i1sx.png',
  road: '/assets/template47-ref/road-a37d1bf5.png',
  lips: '/assets/template47-ref/lips-calen-heart.png',
  giftbox: '/assets/template47-ref/giftbox-bc7ro23.png',
  sparkle: '/assets/template47-ref/sparkle-2dd69166.png',
};
const WEEKDAYS_47 = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-70px' },
  transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
};

function capitalize47(text) {
  const value = String(text || '');
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function date47(startsAt) {
  const date = new Date(startsAt);
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDow = (new Date(year, month, 1).getDay() + 6) % 7;
  const totalDays = new Date(year, month + 1, 0).getDate();
  return {
    day: date.getDate(),
    month: month + 1,
    year,
    time: `${String(date.getHours()).padStart(2, '0')} : ${String(date.getMinutes()).padStart(2, '0')}`,
    timeTight: `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`,
    weekday: capitalize47(date.toLocaleDateString('vi-VN', { weekday: 'long' })),
    cells: [...Array(firstDow).fill(null), ...Array.from({ length: totalDays }, (_, index) => index + 1)],
  };
}

function countDown(startsAt) {
  const target = new Date(startsAt).getTime();
  const remaining = Math.max(0, target - Date.now());
  const totalSeconds = Math.floor(remaining / 1000);
  return [
    [Math.floor(totalSeconds / 86400), 'ngày'],
    [Math.floor((totalSeconds % 86400) / 3600), 'giờ'],
    [Math.floor((totalSeconds % 3600) / 60), 'phút'],
    [totalSeconds % 60, 'giây'],
  ];
}

function Template47() {
  const content = useInvitationContent();
  const [rsvpSent, setRsvpSent] = useState(false);
  const [wishSent, setWishSent] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('template47-page');
    document.body.classList.add('template47-page');
    return () => {
      document.documentElement.classList.remove('template47-page');
      document.body.classList.remove('template47-page');
    };
  }, []);

  return (
    <main className="template47">
      <h1 className="visually-hidden">Thiệp cưới online mẫu 47</h1>
      <WeddingMusicButton className="t47-music" src={content.media.music || undefined} />
      <Cover47 />
      <Family47 />
      <Invitation47 />
      <Ceremony47 />
      <Story47 />
      <LoveYou47 />
      <Rsvp47 sent={rsvpSent} setSent={setRsvpSent} />
      <Gift47 />
      <Album47 />
      <FinalWish47 sent={wishSent} setSent={setWishSent} />
    </main>
  );
}

function Cover47() {
  const { couple, event, media } = useInvitationContent();
  const date = date47(event.startsAt);
  const stamp = `${String(date.day).padStart(2, '0')}.${String(date.month).padStart(2, '0')}.${date.year}`;
  return (
    <section className="t47-cover" data-media-role="hero" style={{ '--t47-cover': `url(${media.hero || media.couple || t47Assets.cover})` }}>
      <div className="t47-coverSeal" aria-hidden="true"><img src={t47Assets.lips} alt="" /></div>
      <motion.div className="t47-coverNames" initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <span data-editor-field="couple.groomName">{couple.groomName}</span>
        <i aria-hidden="true"><Heart size={16} fill="currentColor" strokeWidth={0} /></i>
        <span data-editor-field="couple.brideName">{couple.brideName}</span>
      </motion.div>
      <motion.div className="t47-coverSchedule" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.86, delay: 0.18 }}>
        <p>THƯ MỜI TIỆC CƯỚI</p>
        <span>{date.weekday} - {date.time}</span>
        <strong>{stamp}</strong>
        <em aria-hidden="true" />
        <p>LỄ THÀNH HÔN</p>
        <span>{date.weekday} - {date.time}</span>
        <strong>{stamp}</strong>
      </motion.div>
      <div className="t47-coverScript" aria-hidden="true"><span>Nhà</span></div>
    </section>
  );
}

function Family47() {
  const { couple, families, media } = useInvitationContent();
  return (
    <section className="t47-family">
      <div className="t47-familyScript" aria-hidden="true"><span>Nhà</span><span>Có</span><span>Hỷ</span></div>
      <div className="t47-familyTag" aria-hidden="true"><img src={t47Assets.lantern} alt="" /></div>
      <motion.div className="t47-familyBlocks" {...reveal}>
        <article>
          <h3>NHÀ TRAI</h3>
          <p><span data-editor-field="families.groomFather">{families.groomFather}</span> <span data-editor-field="families.groomMother">{families.groomMother}</span></p>
          <small data-editor-field="families.groomAddress">{families.groomAddress}</small>
        </article>
        <article>
          <h3>NHÀ GÁI</h3>
          <p><span data-editor-field="families.brideFather">{families.brideFather}</span> <span data-editor-field="families.brideMother">{families.brideMother}</span></p>
          <small data-editor-field="families.brideAddress">{families.brideAddress}</small>
        </article>
      </motion.div>
      <motion.p className="t47-familyLead" {...reveal}>TRÂN TRỌNG BÁO TIN LỄ THÀNH HÔN CỦA</motion.p>
      <motion.div className="t47-familyNames" {...reveal} transition={{ ...reveal.transition, delay: 0.08 }}>
        <span data-editor-field="couple.groomName">{couple.groomName}</span>
        <em>&amp;</em>
        <span data-editor-field="couple.brideName">{couple.brideName}</span>
      </motion.div>
      <motion.figure className="t47-familyPortrait" {...reveal} transition={{ ...reveal.transition, delay: 0.12 }}>
        <img data-media-role="couple" src={media.couple || media.hero || t47Assets.photo} alt={`Khoảnh khắc của ${couple.groomName} và ${couple.brideName}`} />
      </motion.figure>
    </section>
  );
}

function Invitation47() {
  const { event, families, schedule } = useInvitationContent();
  const date = date47(event.startsAt);
  const stamp = `${String(date.day).padStart(2, '0')} . ${String(date.month).padStart(2, '0')} . ${date.year}`;
  const morning = schedule[0]?.time || date.timeTight;
  const evening = schedule[2]?.time || date.timeTight;
  return (
    <section className="t47-invitation">
      <motion.h2 className="t47-inviteTitle" {...reveal}>THƯ MỜI THAM DỰ</motion.h2>
      <motion.article className="t47-inviteCard" {...reveal}>
        <h3 data-editor-field="event.venueName">TIỆC CƯỜI NHÀ TRAI</h3>
        <p className="t47-cardTime">{date.weekday} - {morning}</p>
        <strong className="t47-cardDate" data-editor-field="event.startsAt.date">{stamp}</strong>
        <span className="t47-cardLunar" data-editor-field="event.lunarDate">{event.lunarDate}</span>
        <h4>TẠI TƯ GIA NHÀ TRAI</h4>
        <p className="t47-cardAddr" data-editor-field="families.groomAddress">{families.groomAddress}</p>
        <a href={event.mapUrl} target="_blank" rel="noreferrer">Xem chỉ đường</a>
      </motion.article>
      <motion.article className="t47-inviteCard" {...reveal} transition={{ ...reveal.transition, delay: 0.08 }}>
        <h3>TIỆC CƯỜI NHÀ GÁI</h3>
        <p className="t47-cardTime">{date.weekday} - {evening}</p>
        <strong className="t47-cardDate" data-editor-field="event.startsAt.date">{stamp}</strong>
        <span className="t47-cardLunar" data-editor-field="event.lunarDate">{event.lunarDate}</span>
        <h4 data-editor-field="event.venueName">{event.venueName.toUpperCase()}</h4>
        <p className="t47-cardAddr" data-editor-field="event.address">{event.address}</p>
        <a href={event.mapUrl} target="_blank" rel="noreferrer">Xem chỉ đường</a>
      </motion.article>
    </section>
  );
}

function Ceremony47() {
  const { event, families, schedule } = useInvitationContent();
  const date = date47(event.startsAt);
  const morning = schedule[0]?.time || date.timeTight;
  return (
    <section className="t47-ceremony">
      <motion.h2 className="t47-cereTitle" {...reveal}>LỄ VU QUY</motion.h2>
      <motion.p className="t47-cereTime" {...reveal}>VÀO {date.weekday.toUpperCase()} - {morning.replace(/\s/g, '')}</motion.p>
      <motion.div className="t47-cereDate" {...reveal} transition={{ ...reveal.transition, delay: 0.06 }}>
        <span>THÁNG {String(date.month).padStart(2, '0')}</span>
        <strong data-editor-field="event.startsAt.date">{date.day}</strong>
        <span>NĂM {date.year}</span>
      </motion.div>
      <motion.p className="t47-cereLunar" data-editor-field="event.lunarDate" {...reveal}>{event.lunarDate}</motion.p>
      <motion.p className="t47-cereVenue" {...reveal}>TẠI TƯ GIA NHÀ GÁI</motion.p>
      <motion.p className="t47-cereAddr" data-editor-field="families.brideAddress" {...reveal}>{families.brideAddress}</motion.p>

      <motion.div className="t47-road" {...reveal} transition={{ ...reveal.transition, delay: 0.1 }}>
        <img className="t47-roadImg" src={t47Assets.road} alt="" aria-hidden="true" />
        <a className="t47-roadBtn gai" href={event.mapUrl} target="_blank" rel="noreferrer">CHỈ ĐƯỜNG</a>
        <a className="t47-roadBtn trai" href={event.mapUrl} target="_blank" rel="noreferrer">CHỈ ĐƯỜNG</a>
      </motion.div>

      <Ceremony47Second />
    </section>
  );
}

function Ceremony47Second() {
  const { event, schedule } = useInvitationContent();
  const date = date47(event.startsAt);
  const evening = schedule[2]?.time || date.timeTight;
  return (
    <>
      <motion.h2 className="t47-cereTitle" {...reveal}>LỄ THÀNH HÔN</motion.h2>
      <motion.p className="t47-cereTime" {...reveal}>VÀO {date.weekday.toUpperCase()} - {evening.replace(/\s/g, '')}</motion.p>
      <motion.div className="t47-cereDate" {...reveal} transition={{ ...reveal.transition, delay: 0.06 }}>
        <span>THÁNG {String(date.month).padStart(2, '0')}</span>
        <strong data-editor-field="event.startsAt.date">{date.day}</strong>
        <span>NĂM {date.year}</span>
      </motion.div>
      <motion.p className="t47-cereLunar" data-editor-field="event.lunarDate" {...reveal}>{event.lunarDate}</motion.p>
      <motion.p className="t47-cereVenue" {...reveal} data-editor-field="event.venueName">{event.venueName.toUpperCase()}</motion.p>
      <motion.p className="t47-cereAddr" data-editor-field="event.address" {...reveal}>{event.address}</motion.p>
      <Calendar47 />
    </>
  );
}

function Calendar47() {
  const { event } = useInvitationContent();
  const date = date47(event.startsAt);
  return (
    <motion.div className="t47-calendar" {...reveal}>
      <div className="t47-calHead"><span>Tháng {String(date.month).padStart(2, '0')}</span></div>
      <div className="t47-calGrid">
        {WEEKDAYS_47.map((day) => <span key={day} className="t47-calDow">{day}</span>)}
        {date.cells.map((day, index) => (
          <span key={day == null ? `e${index}` : `d${day}`} className={day === date.day ? 't47-calDay marked' : 't47-calDay'}>
            {day === date.day && <img className="t47-calLips" src={t47Assets.lips} alt="" aria-hidden="true" />}
            {day}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function Countdown47() {
  const { event } = useInvitationContent();
  const [time, setTime] = useState(() => countDown(event.startsAt));
  useEffect(() => {
    setTime(countDown(event.startsAt));
    const timer = window.setInterval(() => setTime(countDown(event.startsAt)), 1000);
    return () => window.clearInterval(timer);
  }, [event.startsAt]);
  return (
    <div className="t47-countdown">
      {time.map(([value, label]) => (
        <span key={label}><b>{String(value).padStart(2, '0')}</b><em>{label}</em></span>
      ))}
    </div>
  );
}

function Story47() {
  const { couple, copy, media } = useInvitationContent();
  return (
    <section className="t47-story" data-media-role="couple" style={{ '--t47-story': `url(${media.couple || media.hero || t47Assets.story})` }}>
      <motion.div className="t47-storyPaper" {...reveal}>
        <h3>INVITATION</h3>
        <p className="t47-storyNames" data-editor-field="couple.groomName">
          {couple.groomName} - {couple.brideName}
        </p>
        <p className="t47-storyText" data-editor-field="copy.story">{copy.story}</p>
      </motion.div>
      <Countdown47 />
    </section>
  );
}

function LoveYou47() {
  const { copy, media } = useInvitationContent();
  return (
    <section className="t47-loveyou">
      <motion.figure {...reveal}>
        <img data-media-role="gallery" src={media.couple || t47Assets.love} alt="Khoảnh khắc yêu thương" />
        <span className="t47-lyLabel left">Love</span>
      </motion.figure>
      <motion.figure {...reveal} transition={{ ...reveal.transition, delay: 0.06 }}>
        <img data-media-role="gallery" src={media.couple || t47Assets.you} alt="Khoảnh khắc yêu thương" />
        <img className="t47-sparkle" src={t47Assets.sparkle} alt="" aria-hidden="true" />
        <span className="t47-lyLabel right">You</span>
      </motion.figure>
      <motion.p className="t47-lyQuote" data-editor-field="copy.quote" {...reveal}>{copy.quote}</motion.p>
    </section>
  );
}

function Rsvp47({ sent, setSent }) {
  const { media } = useInvitationContent();
  const rsvp = useRsvpSubmit();
  const [form, setForm] = useState({ fullName: '', attendance: 'yes', partySize: 1, note: '' });
  const update = (key) => (event) => setForm({ ...form, [key]: event.target.value });
  const submit = async (event) => {
    event.preventDefault();
    const success = await rsvp.submit({ ...form, phone: '', partySize: Number(form.partySize) });
    if (success) setSent(true);
  };

  return (
    <section className="t47-rsvp" data-media-role="hero" style={{ '--t47-rsvp': `url(${media.hero || media.couple || t47Assets.rsvp})` }}>
      <motion.form className="t47-rsvpCard" onSubmit={submit} {...reveal}>
        <h2>Xác nhận tham dự</h2>
        <label>Họ và tên
          <input required placeholder="Nhập tên của bạn" value={form.fullName} onChange={update('fullName')} />
        </label>
        <fieldset>
          <legend>Bạn sẽ tham dự chứ?</legend>
          <label className={form.attendance === 'yes' ? 't47-radio on' : 't47-radio'}>
            <input type="radio" name="attendance47" value="yes" checked={form.attendance === 'yes'} onChange={update('attendance')} /> Có, tôi sẽ tham dự
          </label>
          <label className={form.attendance === 'no' ? 't47-radio on' : 't47-radio'}>
            <input type="radio" name="attendance47" value="no" checked={form.attendance === 'no'} onChange={update('attendance')} /> Tôi bận, rất tiếc không thể tham dự
          </label>
        </fieldset>
        <label>Số lượng người tham dự
          <select value={form.partySize} onChange={update('partySize')}>
            <option value="1">1 người</option>
            <option value="2">2 người</option>
            <option value="3">3 người</option>
            <option value="4">4 người</option>
          </select>
        </label>
        <fieldset>
          <legend>Bạn là khách của ai?</legend>
          <label className={form.note === 'Khách nhà trai' ? 't47-radio on' : 't47-radio'}>
            <input type="radio" name="guest47" value="Khách nhà trai" checked={form.note === 'Khách nhà trai'} onChange={update('note')} /> Nhà trai
          </label>
          <label className={form.note === 'Khách nhà gái' ? 't47-radio on' : 't47-radio'}>
            <input type="radio" name="guest47" value="Khách nhà gái" checked={form.note === 'Khách nhà gái'} onChange={update('note')} /> Nhà gái
          </label>
        </fieldset>
        <button type="submit" disabled={rsvp.status === 'loading'}>{rsvp.status === 'loading' ? 'Đang gửi...' : 'Gửi xác nhận'}</button>
        {sent && <p className="t47-formSuccess" role="status"><Check size={15} /> Cảm ơn bạn, xác nhận đã được ghi nhận.</p>}
        {rsvp.error && <p className="t47-formError" role="alert">{rsvp.error}</p>}
      </motion.form>
    </section>
  );
}

function Gift47() {
  const { couple, media } = useInvitationContent();
  return (
    <section className="t47-gift">
      <motion.div className="t47-giftInner" {...reveal}>
        <img className="t47-giftBox" src={t47Assets.giftbox} alt="" aria-hidden="true" />
        <h2 data-editor-field="couple.groomName">Gửi quà mừng tới Cô Dâu - Chú Rể</h2>
        {media.giftQr && (
          <figure className="t47-giftQr">
            <img data-gift-qr src={media.giftQr} alt="QR mừng cưới" />
            <figcaption>Quét mã gửi quà mừng</figcaption>
          </figure>
        )}
        <p className="t47-giftNames"><span data-editor-field="couple.groomName">{couple.groomName}</span> ♥ <span data-editor-field="couple.brideName">{couple.brideName}</span></p>
      </motion.div>
    </section>
  );
}

function Album47() {
  const { couple, media } = useInvitationContent();
  const sources = media.gallery.length
    ? media.gallery
    : [media.couple || t47Assets.gallery, media.hero || t47Assets.cover, media.couple || t47Assets.love, media.couple || t47Assets.you, media.final || t47Assets.story];
  const photos = sources.map((src, index) => ({ src, alt: `Khoảnh khắc của ${couple.groomName} và ${couple.brideName} ${index + 1}` }));
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const photo = photos[active] || photos[0];
  const go = (delta) => setActive((index) => (index + delta + photos.length) % photos.length);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
      if (event.key === 'ArrowLeft') go(-1);
      if (event.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <section className="t47-album">
      <motion.div className="t47-albumTitle" {...reveal}>
        <span>ALBUM</span><i>of</i><strong>LOVE</strong>
      </motion.div>
      <motion.div className="t47-albumStage" {...reveal}>
        <img data-media-role="gallery" src={photo.src} alt={photo.alt} />
        <button className="t47-albumExpand" type="button" onClick={() => setOpen(true)} aria-label="Xem ảnh lớn" title="Xem ảnh lớn"><Maximize2 size={17} /></button>
        <button className="t47-albumArrow prev" type="button" onClick={() => go(-1)} aria-label="Ảnh trước" title="Ảnh trước"><ChevronLeft size={22} /></button>
        <button className="t47-albumArrow next" type="button" onClick={() => go(1)} aria-label="Ảnh tiếp theo" title="Ảnh tiếp theo"><ChevronRight size={22} /></button>
      </motion.div>
      <div className="t47-albumThumbs">
        {photos.map((item, index) => (
          <button key={item.src + index} type="button" className={index === active ? 'on' : ''} onClick={() => setActive(index)} aria-label={`Chọn ảnh ${index + 1}`}>
            <img src={item.src} alt="" />
          </button>
        ))}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div className="t47-lightbox" role="dialog" aria-modal="true" aria-label="Xem ảnh cưới lớn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className="t47-lightboxClose" type="button" onClick={() => setOpen(false)} aria-label="Đóng ảnh lớn" title="Đóng"><X size={24} /></button>
            <button className="t47-lightboxArrow previous" type="button" onClick={() => go(-1)} aria-label="Ảnh trước" title="Ảnh trước"><ChevronLeft size={32} /></button>
            <AnimatePresence mode="wait">
              <motion.img key={photo.src} src={photo.src} alt={photo.alt} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} transition={{ duration: 0.24 }} />
            </AnimatePresence>
            <button className="t47-lightboxArrow next" type="button" onClick={() => go(1)} aria-label="Ảnh tiếp theo" title="Ảnh tiếp theo"><ChevronRight size={32} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function FinalWish47({ sent, setSent }) {
  const commerce = useCommercialInvitation();
  const wish = useWishSubmit();
  const { copy, media } = useInvitationContent();
  const sampleWishes = [
    { full_name: 'Hà', message: 'Tân hôn hạnh phúc, trăm năm bên nhau!' },
    { full_name: 'Khải', message: 'Đồng tâm đồng lòng, xây đắp tổ ấm thịnh vượng!' },
    { full_name: 'Thu', message: 'Mong tình yêu của hai bạn mãi vĩnh cửu!' },
  ];
  const visibleWishes = commerce ? commerce.wishes.slice(0, 3) : sampleWishes;
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
    <section className="t47-final" data-media-role="final" style={{ '--t47-final': `url(${media.final || t47Assets.final})` }}>
      <div className="t47-finalShade" />
      <div className="t47-finalInner">
        <motion.p className="t47-wishHeading" {...reveal}><MessageCircle size={18} /> LỜI NHẮN GỬI TỚI CÔ DÂU &amp; CHÚ RỂ</motion.p>
        <motion.div className="t47-wishList" {...reveal} transition={{ ...reveal.transition, delay: 0.06 }}>
          {visibleWishes.length
            ? visibleWishes.map((item) => <p key={`${item.full_name}-${item.message}`}><b>{item.full_name}:</b> {item.message}</p>)
            : <p>Hãy là người đầu tiên gửi lời chúc đến cô dâu chú rể.</p>}
        </motion.div>
        <motion.form className="t47-wishForm" onSubmit={submit} {...reveal} transition={{ ...reveal.transition, delay: 0.1 }}>
          <input required aria-label="Tên người gửi" placeholder="Tên của bạn" value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} />
          <input required minLength={2} aria-label="Lời chúc dành cho cô dâu chú rể" placeholder="Gửi lời chúc đến cô dâu chú rể" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} />
          <button type="submit" aria-label="Gửi lời chúc" disabled={wish.status === 'loading'}><Send size={16} /></button>
        </motion.form>
        {sent && <p className="t47-wishSuccess" role="status">Lời chúc đã được gửi và đang chờ duyệt. ♥</p>}
        {wish.error && <p className="t47-wishSuccess error" role="alert">{wish.error}</p>}
        <motion.p className="t47-thank" data-editor-field="copy.thankYou" {...reveal}>{copy.thankYou || 'Thank you'}</motion.p>
      </div>
    </section>
  );
}

export default Template47;
