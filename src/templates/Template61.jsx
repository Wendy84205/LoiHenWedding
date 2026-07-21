import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Gift, Heart, MapPin, MessageCircle, Send } from 'lucide-react';
import WeddingMusicButton from './WeddingMusicButton.jsx';
import useWeddingCountdown from './useWeddingCountdown.js';
import { useInvitationContent, useRsvpSubmit, useWishSubmit } from '../commerce/CommercialInvitationContext.jsx';
import './template61.css';

const INTRO_DURATION = 4800;

const assets = {
  hero: '/assets/template61/couple-hero.webp',
  couple: '/assets/template61/couple-close.webp',
  story: '/assets/template61/story.webp',
  final: '/assets/template61/couple-close.webp',
};

const gallery = [
  '/assets/template61/gallery-1.webp',
  '/assets/template61/gallery-2.webp',
  '/assets/template61/gallery-3.webp',
  '/assets/template61/gallery-4.webp',
  '/assets/template61/gallery-5.webp',
  '/assets/template61/gallery-6.webp',
  '/assets/template61/story.webp',
];

const reveal = {
  initial: { opacity: 0, y: 38 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-90px' },
  transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
};

function eventDate61(startsAt) {
  const date = new Date(startsAt);
  const offset = (new Date(date.getFullYear(), date.getMonth(), 1).getDay() + 6) % 7;
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    monthName: date.toLocaleDateString('en-US', { month: 'long' }),
    time: date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false }),
    weekday: date.toLocaleDateString('vi-VN', { weekday: 'long' }).toUpperCase(),
    cells: [...Array.from({ length: offset }, (_, index) => `blank-${index}`), ...Array.from({ length: new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() }, (_, index) => index + 1)],
  };
}

function Template61() {
  const content = useInvitationContent();
  const [introVisible, setIntroVisible] = useState(true);
  const [wishSent, setWishSent] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroVisible(false), INTRO_DURATION);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = introVisible ? 'hidden' : previousOverflow;
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [introVisible]);

  return (
    <main className="template61">
      <h1 className="visually-hidden">Thiệp cưới Nắng Mai</h1>
      <AnimatePresence>
        {introVisible && <Opening61 onSkip={() => setIntroVisible(false)} />}
      </AnimatePresence>

      <WeddingMusicButton className={`t61-music${introVisible ? ' is-intro' : ''}`} playingClassName="active" src={content.media.music || undefined} />

      <Hero61 />
      <Invitation61 />
      <Interview61 />
      <Gallery61 />
      <SaveDate61 />
      <Location61 />
      <Rsvp61 />
      <Gift61 />
      <Final61 />
      <WishDock61 wishSent={wishSent} setWishSent={setWishSent} />
    </main>
  );
}

function Opening61({ onSkip }) {
  const { couple, media } = useInvitationContent();
  return (
    <motion.section
      className="t61-opening"
      exit={{ opacity: 0, scale: 1.025, filter: 'blur(7px)' }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.img
        data-media-role="couple"
        src={media.couple || media.hero || assets.couple}
        alt={`${couple.groomName} và ${couple.brideName}`}
        initial={{ scale: 1.015, y: 0 }}
        animate={{ scale: 1.075, y: -8 }}
        transition={{ duration: INTRO_DURATION / 1000, ease: 'linear' }}
      />
      <div className="t61-openingShade" />
      <div className="t61-openingSparkles" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => <i key={index} />)}
      </div>
      <button className="t61-skip" type="button" onClick={onSkip}>SKIP <span>→</span></button>
      <motion.div
        className="t61-openingTitle"
        initial={{ opacity: 0, y: 34 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <strong>BLESSING</strong>
        <strong>BEGINS</strong>
      </motion.div>
      <div className="t61-openingMeta"><span>WEDDING</span><span>INVITATION</span></div>
    </motion.section>
  );
}

function Hero61() {
  const { event, media } = useInvitationContent();
  const date = eventDate61(event.startsAt);
  return (
    <section className="t61-hero" data-media-role="hero" style={{ '--photo': `url(${media.hero || media.couple || assets.hero})` }}>
      <div className="t61-heroSparkles" aria-hidden="true">
        {Array.from({ length: 18 }, (_, index) => <i key={index} />)}
      </div>
      <motion.div
        className="t61-heroWords"
        initial={{ opacity: 0, y: 34 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.25, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="t61-our">Our</span>
        <span className="t61-love">Love</span>
        <span className="t61-begins">Begins</span>
        <span className="t61-heartMark">♥</span>
        <span className="t61-heroDate">{date.day} {date.monthName} {date.year}</span>
      </motion.div>
    </section>
  );
}

function Invitation61() {
  const { copy, couple, families, media } = useInvitationContent();
  return (
    <section className="t61-section t61-invitation">
      <motion.div {...reveal} className="t61-invitationCopy">
        <p className="t61-kicker">INVITATION</p>
        <h2>TRÂN TRỌNG KÍNH MỜI</h2>
        <p data-editor-field="copy.intro">{copy.intro}</p>
      </motion.div>
      <LineDoodle61 />
      <div className="t61-familyGrid">
        <motion.article initial={{ opacity: 0, x: -58 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-90px' }} transition={{ duration: 1 }}>
          <h3>NHÀ TRAI</h3>
          <strong><span data-editor-field="families.groomFather">{families.groomFather}</span><br /><span data-editor-field="families.groomMother">{families.groomMother}</span></strong>
          <span data-editor-field="families.groomAddress">{families.groomAddress}</span>
        </motion.article>
        <motion.article initial={{ opacity: 0, x: 58 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-90px' }} transition={{ duration: 1, delay: 0.08 }}>
          <h3>NHÀ GÁI</h3>
          <strong><span data-editor-field="families.brideFather">{families.brideFather}</span><br /><span data-editor-field="families.brideMother">{families.brideMother}</span></strong>
          <span data-editor-field="families.brideAddress">{families.brideAddress}</span>
        </motion.article>
      </div>
      <div className="t61-portraitPair">
        <motion.figure initial={{ opacity: 0, x: -74 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}>
          <img data-media-role="groom" src={media.groom || media.hero || assets.hero} alt={`Chú rể ${couple.groomName}`} />
        </motion.figure>
        <motion.figure initial={{ opacity: 0, x: 74 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 1.05, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}>
          <img data-media-role="bride" src={media.bride || media.hero || assets.hero} alt={`Cô dâu ${couple.brideName}`} />
        </motion.figure>
      </div>
      <div className="t61-namePair">
        <motion.span data-editor-field="couple.groomName" initial={{ opacity: 0, x: -56 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>{couple.groomName}</motion.span>
        <motion.i initial={{ opacity: 0, scale: 0.55 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} aria-hidden="true">❀</motion.i>
        <motion.span data-editor-field="couple.brideName" initial={{ opacity: 0, x: 56 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>{couple.brideName}</motion.span>
      </div>
    </section>
  );
}

function LineDoodle61() {
  return (
    <motion.svg className="t61-doodle" viewBox="0 0 420 105" aria-hidden="true" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
      <motion.path d="M12 74C70 106 135 98 181 45 197 26 206 17 224 16" variants={{ hidden: { pathLength: 0, x: -65 }, visible: { pathLength: 1, x: 0 } }} transition={{ duration: 1.2 }} />
      <motion.path d="M224 16C243-11 274 14 253 35 236 49 231 20 260 18" variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1 } }} transition={{ duration: 0.9, delay: 0.28 }} />
      <motion.path d="M260 18C310 9 358 21 408 0" variants={{ hidden: { pathLength: 0, x: 65 }, visible: { pathLength: 1, x: 0 } }} transition={{ duration: 1.2 }} />
    </motion.svg>
  );
}

function Interview61() {
  const { copy, couple, media } = useInvitationContent();
  return (
    <section className="t61-section t61-interview">
      <motion.div {...reveal} className="t61-interviewCopy">
        <h2>Interview</h2>
        <span>Câu chuyện của chúng mình</span>
        <p data-editor-field="copy.story">{copy.story}</p>
      </motion.div>
      <motion.figure {...reveal} transition={{ ...reveal.transition, delay: 0.08 }}>
        <img data-media-role="couple" src={media.couple || media.hero || assets.couple} alt={`${couple.groomName} và ${couple.brideName} bên nhau`} />
      </motion.figure>
    </section>
  );
}

function Gallery61() {
  const { media } = useInvitationContent();
  const photos = media.gallery.length ? media.gallery : gallery;
  return (
    <section className="t61-section t61-gallery">
      <motion.h2 {...reveal}>GALLERY</motion.h2>
      <div className="t61-galleryGrid">
        {photos.map((src, index) => (
          <motion.figure
            key={src}
            className={index === photos.length - 1 ? 'wide' : ''}
            initial={{ opacity: 0, y: 36, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.85, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <img data-media-role="gallery" src={src} alt={`Khoảnh khắc cưới ${index + 1}`} loading={index > 2 ? 'lazy' : 'eager'} />
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

function SaveDate61() {
  const { event } = useInvitationContent();
  const date = eventDate61(event.startsAt);
  return (
    <section className="t61-section t61-saveDate">
      <motion.div {...reveal} className="t61-saveHeading" aria-label="Save The Date">
        <span>Save</span><em>The</em><span>Date</span>
      </motion.div>
      <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.08 }} className="t61-dateCopy">
        <p data-editor-field="event.startsAt.time">{date.time}, {date.weekday}</p>
        <strong data-editor-field="event.startsAt.date">{String(date.day).padStart(2, '0')}.{String(date.month).padStart(2, '0')}.{date.year}</strong>
        <small data-editor-field="event.lunarDate">({event.lunarDate})</small>
      </motion.div>
      <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.12 }} className="t61-calendar">
        <h3>{date.monthName} {date.year}</h3>
        <div className="t61-week">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => <span key={day}>{day}</span>)}</div>
        <div className="t61-days">
          {date.cells.map((day) => (
            typeof day === 'number'
              ? <span key={day} className={day === date.day ? 'hit' : ''}>{day === date.day && <Heart size={38} fill="currentColor" strokeWidth={0} />}<b>{day}</b></span>
              : <span key={day} className="blank" aria-hidden="true" />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function Location61() {
  const { event } = useInvitationContent();
  return (
    <section className="t61-section t61-location">
      <motion.div {...reveal}>
        <h2>LOCATION</h2>
        <p>TRUNG TÂM TIỆC CƯỚI</p>
        <strong data-editor-field="event.venueName">{event.venueName}</strong>
        <span data-editor-field="event.address">{event.address}</span>
      </motion.div>
      <motion.a
        className="t61-map"
        href={event.mapUrl}
        target="_blank"
        rel="noreferrer"
        {...reveal}
        transition={{ ...reveal.transition, delay: 0.08 }}
      >
        <MapPin size={34} fill="currentColor" />
        <span>Xem bản đồ</span>
      </motion.a>
    </section>
  );
}

function Rsvp61() {
  const rsvp = useRsvpSubmit();
  const [form, setForm] = useState({ fullName: '', phone: '', attendance: 'yes', partySize: 1, note: '' });
  const submit = async (event) => {
    event.preventDefault();
    await rsvp.submit({ ...form, partySize: Number(form.partySize) });
  };

  return (
    <section className="t61-section t61-rsvp">
      <motion.div {...reveal} className="t61-rsvpHeading"><span>PLEASE REPLY</span><h2>Xác nhận tham dự</h2><p>Phản hồi của bạn giúp chúng mình chuẩn bị buổi tiệc chu đáo hơn.</p></motion.div>
      <motion.form {...reveal} transition={{ ...reveal.transition, delay: 0.08 }} onSubmit={submit}>
        <label>Họ và tên<input required value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} placeholder="Tên của bạn" /></label>
        <label>Số điện thoại<input inputMode="tel" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder="Số điện thoại" /></label>
        <fieldset><legend>Bạn sẽ tham dự chứ?</legend><label><input type="radio" name="attendance61" checked={form.attendance === 'yes'} onChange={() => setForm({ ...form, attendance: 'yes' })} /> Có, tôi sẽ tham dự</label><label><input type="radio" name="attendance61" checked={form.attendance === 'no'} onChange={() => setForm({ ...form, attendance: 'no' })} /> Rất tiếc, tôi không thể tham dự</label></fieldset>
        <label>Số người<select value={form.partySize} onChange={(event) => setForm({ ...form, partySize: Number(event.target.value) })}>{[1, 2, 3, 4].map((value) => <option value={value} key={value}>{value} người</option>)}</select></label>
        <label>Lời nhắn<input value={form.note} onChange={(event) => setForm({ ...form, note: event.target.value })} placeholder="Lời nhắn cho cô dâu chú rể" /></label>
        <button type="submit" disabled={rsvp.status === 'loading'}><Send size={16} /> {rsvp.status === 'loading' ? 'Đang gửi...' : 'Gửi xác nhận'}</button>
        {rsvp.status === 'success' && <p className="t61-rsvpStatus"><Check size={16} /> Cảm ơn bạn đã phản hồi.</p>}
        {rsvp.error && <p className="t61-rsvpStatus error" role="alert">{rsvp.error}</p>}
      </motion.form>
    </section>
  );
}

function Gift61() {
  const { media } = useInvitationContent();
  if (!media.giftQr) return null;
  return (
    <section className="t61-section t61-gift">
      <motion.div {...reveal}><Gift size={46} strokeWidth={1.35} /><span>WEDDING GIFT</span><h2>Hộp quà cưới</h2></motion.div>
      <motion.figure className="t61-giftQr" {...reveal} transition={{ ...reveal.transition, delay: 0.08 }}><img data-gift-qr src={media.giftQr} alt="QR mừng cưới" /><figcaption>Quét mã gửi quà mừng</figcaption></motion.figure>
    </section>
  );
}

function Final61() {
  const { copy, event, media } = useInvitationContent();
  const date = eventDate61(event.startsAt);
  const countdown = useWeddingCountdown(event.startsAt);
  return (
    <section className="t61-final" data-media-role="final" style={{ '--photo': `url(${media.final || media.couple || assets.final})` }}>
      <motion.p data-editor-field="copy.thankYou" {...reveal}>“{copy.thankYou}”</motion.p>
      <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.08 }} className="t61-countdown">
        {['Ngày', 'Giờ', 'Phút', 'Giây'].map((label, index) => <span key={label}><strong>{countdown[index]}</strong><small>{label}</small></span>)}
      </motion.div>
      <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.12 }} className="t61-finalDate"><span>{date.day} {date.monthName}</span><strong>{date.year}</strong></motion.div>
    </section>
  );
}

function WishDock61({ wishSent, setWishSent }) {
  const wish = useWishSubmit();
  const [form, setForm] = useState({ fullName: '', message: '' });
  const submit = async (event) => {
    event.preventDefault();
    const success = await wish.submit(form);
    if (success) {
      setWishSent(true);
      setForm({ fullName: '', message: '' });
    }
  };
  return (
    <form className="t61-wishDock" onSubmit={submit}>
      <label><input className="t61-wishName" aria-label="Tên người gửi" placeholder="Tên" value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} required /><input aria-label="Lời chúc" placeholder="Gửi lời chúc..." value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} required minLength={2} /><MessageCircle size={17} /></label>
      <button className="t61-pill" type="button"><Heart size={15} fill="currentColor" /> Bắn tim</button>
      <button className="t61-circle" type="button" aria-label="Gửi quà"><Gift size={18} /></button>
      <button className="t61-circle send" type="submit" aria-label="Gửi lời chúc" disabled={wish.status === 'loading'}><Send size={18} /></button>
      <AnimatePresence>{wishSent && <motion.span className="t61-sent" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>Đã gửi lời chúc</motion.span>}</AnimatePresence>
      {wish.error && <span className="t61-sent error" role="alert">{wish.error}</span>}
    </form>
  );
}

export default Template61;
