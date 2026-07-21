import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CarFront, Check, ChevronLeft, ChevronRight, Gift, Heart, House, MapPin, Maximize2, MessageCircle, Send, X } from 'lucide-react';
import WeddingMusicButton from './WeddingMusicButton.jsx';
import { useCommercialInvitation, useInvitationContent, useRsvpSubmit, useWishSubmit } from '../commerce/CommercialInvitationContext.jsx';
import './template47.css';
import './new/auditFidelity.css';

const t47Assets = {
  cover: '/assets/template61/couple-hero.webp',
  close: '/assets/template61/couple-close.webp',
  portrait: '/assets/template44/sea-couple.webp',
  celebration: '/assets/template44/mountain-couple.webp',
  detail: '/assets/template39/couple-red-seated.webp',
  galleryA: '/assets/template61/gallery-2.webp',
  galleryB: '/assets/template61/gallery-4.webp',
  galleryC: '/assets/template61/story.webp',
  galleryD: '/assets/template44/couple-sticker.webp',
};

const reveal = {
  initial: { opacity: 0, y: 34 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.76, ease: [0.22, 1, 0.36, 1] },
};

function date47(startsAt) {
  const date = new Date(startsAt);
  const offset = (new Date(date.getFullYear(), date.getMonth(), 1).getDay() + 6) % 7;
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    time: date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false }),
    weekday: date.toLocaleDateString('vi-VN', { weekday: 'long' }).toUpperCase(),
    cells: [...Array.from({ length: offset }, (_, index) => `empty-${index}`), ...Array.from({ length: new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() }, (_, index) => index + 1)],
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
      <FloatingHearts47 />
      <WeddingMusicButton className="t47-music" src={content.media.music || undefined} />

      <Cover47 />
      <Family47 />
      <Invitation47 />
      <Date47 />
      <Story47 />
      <CountdownBand47 />
      <Rsvp47 sent={rsvpSent} setSent={setRsvpSent} />
      <Album47 />
      <Gift47 />
      <Wish47 sent={wishSent} setSent={setWishSent} />
    </main>
  );
}

function FloatingHearts47() {
  return (
    <div className="t47-hearts" aria-hidden="true">
      {Array.from({ length: 14 }, (_, index) => <span key={index}>♥</span>)}
    </div>
  );
}

function Cover47() {
  const { couple, event, media } = useInvitationContent();
  const date = date47(event.startsAt);
  return (
    <section className="t47-cover" data-media-role="hero" style={{ '--cover-image': `url(${media.hero || media.couple || t47Assets.cover})` }}>
      <div className="t47-coverShade" />
      <motion.p className="t47-coverKicker" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72 }}>
        WEDDING INVITATION
      </motion.p>
      <motion.div className="t47-coverNames" initial={{ opacity: 0, y: 42 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.05, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}>
        <span data-editor-field="couple.groomName">{couple.groomName}</span><b>♥</b><span data-editor-field="couple.brideName">{couple.brideName}</span>
      </motion.div>
      <motion.div className="t47-coverDetails" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.84, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}>
        <span>THƯ MỜI TIỆC CƯỚI</span>
        <strong>{String(date.day).padStart(2, '0')}.{String(date.month).padStart(2, '0')}.{date.year}</strong>
        <em>{date.weekday} · {date.time}</em><i>LỄ THÀNH HÔN</i>
      </motion.div>
    </section>
  );
}

function Family47() {
  const { couple, families, media } = useInvitationContent();
  return (
    <section className="t47-section t47-family">
      <motion.p className="t47-eyebrow" {...reveal}>NHÀ CÓ HỶ</motion.p>
      <motion.h2 {...reveal} transition={{ ...reveal.transition, delay: 0.06 }}>Trân trọng báo tin<br />lễ thành hôn của</motion.h2>
      <motion.div className="t47-nameLine" {...reveal} transition={{ ...reveal.transition, delay: 0.12 }}>
        <span data-editor-field="couple.groomName">{couple.groomName}</span><i>♥</i><span data-editor-field="couple.brideName">{couple.brideName}</span>
      </motion.div>
      <motion.figure className="t47-familyPortrait" {...reveal} transition={{ ...reveal.transition, delay: 0.16 }}>
        <img data-media-role="couple" src={media.couple || media.hero || t47Assets.close} alt={`Khoảnh khắc của ${couple.groomName} và ${couple.brideName}`} />
      </motion.figure>
      <div className="t47-familyGrid">
        <motion.article initial={{ opacity: 0, x: -38 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <p>NHÀ TRAI</p>
          <strong><span data-editor-field="families.groomFather">{families.groomFather}</span><br /><span data-editor-field="families.groomMother">{families.groomMother}</span></strong>
          <span data-editor-field="families.groomAddress">{families.groomAddress}</span>
        </motion.article>
        <motion.article initial={{ opacity: 0, x: 38 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}>
          <p>NHÀ GÁI</p>
          <strong><span data-editor-field="families.brideFather">{families.brideFather}</span><br /><span data-editor-field="families.brideMother">{families.brideMother}</span></strong>
          <span data-editor-field="families.brideAddress">{families.brideAddress}</span>
        </motion.article>
      </div>
    </section>
  );
}

function EventCard47({ title, day, time, location, address, href, lunarDate, locationField = '', addressField = '' }) {
  return (
    <motion.article className="t47-eventCard" {...reveal}>
      <p>{title}</p><span>{time}</span><strong>{day}</strong><small>{lunarDate}</small>
      <h3 data-editor-field={locationField || undefined}>{location}</h3><em data-editor-field={addressField || undefined}>{address}</em>
      <a href={href} target="_blank" rel="noreferrer"><MapPin size={14} /> Xem chỉ đường</a>
    </motion.article>
  );
}

function Invitation47() {
  const { event, families, schedule } = useInvitationContent();
  const date = date47(event.startsAt);
  const displayDate = `${String(date.day).padStart(2, '0')} . ${String(date.month).padStart(2, '0')} . ${date.year}`;
  return (
    <section className="t47-section t47-invitation">
      <motion.div className="t47-sectionTitle" {...reveal}><span>THƯ MỜI THAM DỰ</span><h2>Ngày vui của<br /><em>chúng mình.</em></h2></motion.div>
      <div className="t47-eventStack">
        <EventCard47 title="LỄ THÀNH HÔN" time={`${date.weekday} · ${date.time}`} day={displayDate} location={event.venueName.toUpperCase()} address={event.address} href={event.mapUrl} lunarDate={event.lunarDate} locationField="event.venueName" addressField="event.address" />
        <EventCard47 title="TIỆC MỪNG" time={`${date.weekday} · ${schedule[2]?.time || date.time}`} day={displayDate} location="CÙNG HAI GIA ĐÌNH" address={`${families.groomAddress} · ${families.brideAddress}`} href={event.mapUrl} lunarDate={event.lunarDate} />
      </div>
    </section>
  );
}

function Date47() {
  const { event, families } = useInvitationContent();
  const date = date47(event.startsAt);
  return (
    <section className="t47-date">
      <div className="t47-dateShade" />
      <motion.div className="t47-dateIntro" {...reveal}><span>LỄ VU QUY</span><p>Vào {date.weekday} · {date.time}</p></motion.div>
      <motion.div className="t47-dateStamp" {...reveal} transition={{ ...reveal.transition, delay: 0.08 }}>
        <span>THÁNG {String(date.month).padStart(2, '0')}</span><strong>{date.day}</strong><span>NĂM {date.year}</span>
      </motion.div>
      <motion.p className="t47-dateLunar" data-editor-field="event.lunarDate" {...reveal} transition={{ ...reveal.transition, delay: 0.13 }}>{event.lunarDate}</motion.p>
      <motion.div className="t47-route" {...reveal} transition={{ ...reveal.transition, delay: 0.16 }}>
        <div className="t47-routeStop"><House size={22} /><span>NHÀ GÁI</span><small data-editor-field="families.brideAddress">{families.brideAddress}</small></div>
        <div className="t47-routeRoad"><i /><CarFront size={26} /><i /></div>
        <div className="t47-routeStop"><House size={22} /><span>NHÀ TRAI</span><small data-editor-field="families.groomAddress">{families.groomAddress}</small></div>
      </motion.div>
      <motion.div className="t47-dateSecond" {...reveal} transition={{ ...reveal.transition, delay: 0.19 }}><span>LỄ THÀNH HÔN</span><p>Vào {date.weekday} · {date.time}</p><strong data-editor-field="event.venueName">{event.venueName.toUpperCase()}</strong></motion.div>
      <motion.div className="t47-calendar47" {...reveal} transition={{ ...reveal.transition, delay: 0.18 }}>
        {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day) => <span className="weekday" key={day}>{day}</span>)}
        {date.cells.map((day) => (
          typeof day === 'number'
            ? <span key={day} className={day === date.day ? 'marked' : ''}>{day === date.day && <Heart size={19} fill="currentColor" strokeWidth={0} />}<b>{day}</b></span>
            : <span key={day} aria-hidden="true" />
        ))}
      </motion.div>
    </section>
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

  return <div className="t47-countdown">{time.map(([value, label]) => <span key={label}><b>{String(value).padStart(2, '0')}</b><em>{label}</em></span>)}</div>;
}

function Story47() {
  const { couple, copy, media } = useInvitationContent();
  return (
    <section className="t47-story" data-media-role="couple" style={{ '--story-image': `url(${media.couple || media.hero || t47Assets.close})` }}>
      <div className="t47-storyShade" />
      <motion.div className="t47-storyPaper" {...reveal}>
        <p>INVITATION</p><h2><span data-editor-field="couple.groomName">{couple.groomName}</span> <i>&amp;</i> <span data-editor-field="couple.brideName">{couple.brideName}</span></h2>
        <span data-editor-field="copy.story">{copy.story}</span>
        <span data-editor-field="copy.quote">{copy.quote}</span>
        <span data-editor-field="copy.intro">{copy.intro}</span>
      </motion.div>
    </section>
  );
}

function CountdownBand47() {
  return (
    <section className="t47-countdownBand">
      <motion.div {...reveal}><Heart size={22} fill="currentColor" strokeWidth={0} /><p>ĐẾM NGƯỢC TỚI NGÀY VUI</p><Countdown47 /></motion.div>
    </section>
  );
}

function Rsvp47({ sent, setSent }) {
  const { media } = useInvitationContent();
  const rsvp = useRsvpSubmit();
  const [form, setForm] = useState({ fullName: '', attendance: 'yes', partySize: 1, note: '' });
  const submit = async (event) => {
    event.preventDefault();
    const success = await rsvp.submit({ ...form, phone: '', partySize: Number(form.partySize) });
    if (success) setSent(true);
  };

  return (
    <section className="t47-rsvp" data-media-role="hero" style={{ '--rsvp-image': `url(${media.hero || media.couple || t47Assets.cover})` }}>
      <div className="t47-rsvpShade" />
      <motion.form className="t47-rsvpForm" onSubmit={submit} {...reveal}>
        <Heart size={22} fill="currentColor" strokeWidth={0} /><h2>Xác nhận tham dự</h2>
        <label>Họ và tên<input required placeholder="Nhập tên của bạn" value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} /></label>
        <fieldset><legend>Bạn sẽ tham dự chứ?</legend><label><input type="radio" name="attendance47" value="yes" checked={form.attendance === 'yes'} onChange={(event) => setForm({ ...form, attendance: event.target.value })} /> Có, tôi sẽ tham dự</label><label><input type="radio" name="attendance47" value="no" checked={form.attendance === 'no'} onChange={(event) => setForm({ ...form, attendance: event.target.value })} /> Tôi bận, rất tiếc không thể tham dự</label></fieldset>
        <label>Số lượng người tham dự<select value={form.partySize} onChange={(event) => setForm({ ...form, partySize: Number(event.target.value) })}><option value="1">1 người</option><option value="2">2 người</option><option value="3">3 người</option><option value="4">4 người</option></select></label>
        <label>Bạn là khách của ai?<select value={form.note} onChange={(event) => setForm({ ...form, note: event.target.value })}><option value="">Chọn gia đình</option><option value="Khách nhà trai">Nhà trai</option><option value="Khách nhà gái">Nhà gái</option></select></label>
        <button type="submit" disabled={rsvp.status === 'loading'}><Send size={16} /> {rsvp.status === 'loading' ? 'Đang gửi...' : 'Gửi xác nhận'}</button>
        {sent && <p className="t47-formSuccess" role="status"><Check size={16} /> Cảm ơn bạn. Xác nhận đã được ghi nhận.</p>}
        {rsvp.error && <p className="t47-formError" role="alert">{rsvp.error}</p>}
      </motion.form>
    </section>
  );
}

function Album47() {
  const { couple, media } = useInvitationContent();
  const sources = media.gallery.length ? media.gallery : [media.couple || t47Assets.close, media.hero || t47Assets.cover, media.final || t47Assets.detail, media.venue || t47Assets.celebration];
  const photos = sources.map((src, index) => ({ src, alt: `Khoảnh khắc của ${couple.groomName} và ${couple.brideName} ${index + 1}` }));
  const [activePhoto, setActivePhoto] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const photo = photos[activePhoto] || photos[0];
  const previous = () => setActivePhoto((index) => (index - 1 + photos.length) % photos.length);
  const next = () => setActivePhoto((index) => (index + 1) % photos.length);

  return (
    <section className="t47-section t47-album">
      <motion.div className="t47-albumTitle" {...reveal}>
        <span>ALBUM</span><i>of</i><strong>LOVE</strong>
      </motion.div>
      <motion.div className="t47-albumCarousel" {...reveal}>
        <div className="t47-carouselMain">
          <AnimatePresence mode="wait">
            <motion.img data-media-role="gallery" key={photo.src} src={photo.src} alt={photo.alt} initial={{ opacity: 0, scale: 1.035 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.985 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} />
          </AnimatePresence>
          <button className="t47-carouselArrow previous" type="button" onClick={previous} aria-label="Ảnh trước" title="Ảnh trước"><ChevronLeft size={31} strokeWidth={2.25} /></button>
          <button className="t47-carouselArrow next" type="button" onClick={next} aria-label="Ảnh tiếp theo" title="Ảnh tiếp theo"><ChevronRight size={31} strokeWidth={2.25} /></button>
          <button className="t47-carouselExpand" type="button" onClick={() => setFullscreen(true)} aria-label="Xem ảnh lớn" title="Xem ảnh lớn"><Maximize2 size={21} strokeWidth={2.4} /></button>
          <Heart className="t47-carouselHeart" size={28} fill="currentColor" strokeWidth={0} aria-hidden="true" />
        </div>
        <div className="t47-carouselThumbs" role="group" aria-label="Danh sách ảnh cưới">
          {photos.map((item, index) => (
            <button key={item.src} className={index === activePhoto ? 'is-active' : ''} type="button" onClick={() => setActivePhoto(index)} aria-label={`Xem ảnh ${index + 1}`} aria-current={index === activePhoto ? 'true' : undefined}>
              <img data-media-role="gallery" src={item.src} alt="" />
            </button>
          ))}
        </div>
      </motion.div>
      <AnimatePresence>
        {fullscreen && <AlbumLightbox47 photo={photo} onClose={() => setFullscreen(false)} onPrevious={previous} onNext={next} />}
      </AnimatePresence>
    </section>
  );
}

function AlbumLightbox47({ photo, onClose, onPrevious, onNext }) {
  return (
    <motion.div className="t47-lightbox" role="dialog" aria-modal="true" aria-label="Xem ảnh cưới lớn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <button className="t47-lightboxClose" type="button" onClick={onClose} aria-label="Đóng ảnh lớn" title="Đóng"><X size={24} /></button>
      <button className="t47-lightboxArrow previous" type="button" onClick={onPrevious} aria-label="Ảnh trước" title="Ảnh trước"><ChevronLeft size={32} /></button>
      <AnimatePresence mode="wait"><motion.img data-media-role="gallery" key={photo.src} src={photo.src} alt={photo.alt} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} transition={{ duration: 0.24 }} /></AnimatePresence>
      <button className="t47-lightboxArrow next" type="button" onClick={onNext} aria-label="Ảnh tiếp theo" title="Ảnh tiếp theo"><ChevronRight size={32} /></button>
    </motion.div>
  );
}

function Gift47() {
  const { couple, media } = useInvitationContent();
  return (
    <section className="t47-gift">
      <motion.div {...reveal}><Gift size={34} /><p>GỬI QUÀ MỪNG TỚI<br />CÔ DÂU - CHÚ RỂ</p><span>Chia sẻ niềm vui cùng chúng mình</span>{media.giftQr && <figure className="t47-giftQr"><img data-gift-qr src={media.giftQr} alt="QR mừng cưới" /><figcaption>Quét mã gửi quà mừng</figcaption></figure>}</motion.div>
      <motion.div className="t47-giftNames" {...reveal} transition={{ ...reveal.transition, delay: 0.1 }}><span data-editor-field="couple.groomName">{couple.groomName}</span> <i>♥</i> <span data-editor-field="couple.brideName">{couple.brideName}</span></motion.div>
    </section>
  );
}

function Wish47({ sent, setSent }) {
  const commerce = useCommercialInvitation();
  const wish = useWishSubmit();
  const sampleWishes = [{ full_name: 'Hà', message: 'Tân hôn hạnh phúc, trăm năm bên nhau!' }, { full_name: 'Khải', message: 'Đồng tâm đồng lòng, xây đắp tổ ấm thịnh vượng!' }, { full_name: 'Thu', message: 'Mong tình yêu của hai bạn mãi vĩnh cửu!' }];
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
    <section className="t47-wish">
      <motion.div className="t47-wishHeading" {...reveal}><MessageCircle size={20} /><span>GỬI LỜI CHÚC</span></motion.div>
      <motion.div className="t47-wishList" {...reveal} transition={{ ...reveal.transition, delay: 0.06 }}>
        {visibleWishes.length ? visibleWishes.map((item) => <p key={`${item.full_name}-${item.message}`}><b>{item.full_name}:</b> {item.message}</p>) : <p>Hãy là người đầu tiên gửi lời chúc đến cô dâu chú rể.</p>}
      </motion.div>
      <form onSubmit={submit}><input className="t47-wishName" required aria-label="Tên người gửi" placeholder="Tên của bạn" value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} /><input required minLength={2} aria-label="Lời chúc dành cho cô dâu chú rể" placeholder="Gửi lời chúc đến cô dâu chú rể" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} /><button type="submit" aria-label="Gửi lời chúc" disabled={wish.status === 'loading'}><Send size={17} /></button></form>
      {sent && <p className="t47-wishSuccess" role="status">Lời chúc đã được gửi và đang chờ duyệt. ♥</p>}
      {wish.error && <p className="t47-wishSuccess error" role="alert">{wish.error}</p>}
      <p className="t47-thank">Thank you</p>
    </section>
  );
}

export default Template47;
