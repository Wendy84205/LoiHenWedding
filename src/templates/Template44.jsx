import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Gift, Heart, MapPin, MessageCircle, Send } from 'lucide-react';
import WeddingMusicButton from './WeddingMusicButton.jsx';
import useWeddingCountdown from './useWeddingCountdown.js';
import { useInvitationContent, useRsvpSubmit, useWishSubmit } from '../commerce/CommercialInvitationContext.jsx';
import './template44.css';
import './new/fontFidelity.css';

const t44Assets = {
  mountain: '/assets/template44/mountain-couple.webp',
  sea: '/assets/template44/sea-couple.webp',
  sticker: '/assets/template44/couple-sticker.webp',
  fall: '/assets/template44/mountain-couple.webp',
  bride: '/assets/template44/bride-portrait.webp',
  groom: '/assets/template44/groom-portrait.webp',
  stackA: '/assets/template44/mountain-couple.webp',
  stackB: '/assets/template44/sea-couple.webp',
  stackC: '/assets/template44/mountain-couple.webp',
  soft: '/assets/template44/sea-couple.webp',
};

const rise = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-90px' },
  transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] },
};

function eventDate44(startsAt) {
  const date = new Date(startsAt);
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    time: date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false }),
    weekday: date.toLocaleDateString('vi-VN', { weekday: 'long' }),
    days: Array.from({ length: new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() }, (_, index) => index + 1),
  };
}

function Template44() {
  const content = useInvitationContent();
  const [sent, setSent] = useState(false);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('template44-page');
    document.body.classList.add('template44-page');

    return () => {
      document.documentElement.classList.remove('template44-page');
      document.body.classList.remove('template44-page');
    };
  }, []);

  return (
    <main className="template44">
      <WeddingMusicButton className="t44-music" playingClassName="active" src={content.media.music || undefined} />

      <Header44 opened={opened} onOpen={() => setOpened(true)} />
      <OpeningInvite44 />
      <FallInLove44 />
      <Couple44 />
      <Poem44 />
      <Welcome44 />
      <Forever44 />
      <Calendar44 />
      <SweetInvitation44 />
      <Gift44 />
      <Rsvp44 sent={sent} setSent={setSent} />
      <Party44 />
      <WishDock44 visible={opened} sent={sent} setSent={setSent} />
    </main>
  );
}

function Header44({ opened, onOpen }) {
  const { event } = useInvitationContent();
  const date = eventDate44(event.startsAt);
  return (
    <section className={opened ? 't44-cover is-open' : 't44-cover'}>
      <div className="t44-topWords">
        <motion.span initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>YOU ARE</motion.span>
        <motion.span initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.08 }}>THE LOVE OF</motion.span>
        <motion.span initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.16 }}>MY LIFE</motion.span>
      </div>
      <Flower44 />
      <motion.h1 className="t44-scriptTitle" initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.15, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}>
        Wedding Invitation
      </motion.h1>
      <motion.p className="t44-openHint" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.42 }}>
        Chạm để mở thiệp
      </motion.p>
      <motion.div className="t44-envelopeWrap" initial={{ opacity: 0, y: 46, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}>
        <Envelope44 opened={opened} onOpen={onOpen} />
        {opened && <HeartBurst44 />}
      </motion.div>
      <motion.h2 className="t44-inviteLead" initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.95, delay: 0.8 }}>
        TRÂN TRỌNG KÍNH MỜI
      </motion.h2>
      <motion.div className="t44-coverEvent" initial={{ opacity: 0, y: 38 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.95, delay: 0.94 }}>
        <p>ĐẾN DỰ BUỔI TIỆC CHUNG VUI</p>
        <span>CÙNG GIA ĐÌNH CHÚNG TÔI VÀO LÚC</span>
        <strong data-editor-field="event.startsAt.date">{date.time.replace(':', ' GIỜ ')} | {date.weekday.toUpperCase()} | {String(date.day).padStart(2, '0')}.{String(date.month).padStart(2, '0')}.{date.year}</strong>
        <small data-editor-field="event.lunarDate">({event.lunarDate})</small>
      </motion.div>
    </section>
  );
}

function Flower44() {
  return (
    <svg className="t44-flower" viewBox="0 0 160 170" aria-hidden="true">
      <g fill="none" stroke="#5f826d" strokeWidth="2">
        <path d="M6 166C36 118 55 79 62 26" />
        <path d="M0 150C41 112 72 73 107 34" />
        <path d="M17 160C49 127 85 99 144 75" />
        <path d="M8 129C38 113 68 103 118 98" />
      </g>
      {[
        [62, 28], [107, 36], [145, 76], [118, 99], [68, 82], [42, 116], [32, 144],
      ].map(([cx, cy], index) => (
        <g key={`${cx}-${cy}`} transform={`translate(${cx} ${cy}) rotate(${index * 18})`}>
          <circle r="7" fill="#e0a219" />
          <ellipse cx="0" cy="-15" rx="7" ry="14" fill="#fff" stroke="#d9d9d9" />
          <ellipse cx="13" cy="-6" rx="7" ry="14" fill="#fff" stroke="#d9d9d9" transform="rotate(58 13 -6)" />
          <ellipse cx="-13" cy="-6" rx="7" ry="14" fill="#fff" stroke="#d9d9d9" transform="rotate(-58 -13 -6)" />
          <ellipse cx="8" cy="11" rx="7" ry="14" fill="#fff" stroke="#d9d9d9" transform="rotate(138 8 11)" />
          <ellipse cx="-8" cy="11" rx="7" ry="14" fill="#fff" stroke="#d9d9d9" transform="rotate(-138 -8 11)" />
        </g>
      ))}
      <g fill="#7e9f87">
        <ellipse cx="83" cy="59" rx="8" ry="19" transform="rotate(35 83 59)" />
        <ellipse cx="45" cy="92" rx="7" ry="17" transform="rotate(56 45 92)" />
        <ellipse cx="124" cy="58" rx="7" ry="17" transform="rotate(44 124 58)" />
      </g>
    </svg>
  );
}

function Envelope44({ opened, onOpen }) {
  const { couple, media } = useInvitationContent();
  return (
    <button className={opened ? 't44-envelope open' : 't44-envelope'} type="button" onClick={onOpen} aria-label="Mở thiệp" aria-pressed={opened}>
      <span className="t44-envBack" />
      <span className="t44-envFlap top" />
      <span className="t44-envFlap left" />
      <span className="t44-envFlap right" />
      <span className="t44-envFlap bottom" />
      <span className="t44-envPhoto">
        <img data-media-role="hero" src={media.hero || media.couple || t44Assets.mountain} alt={`${couple.groomName} và ${couple.brideName}`} />
      </span>
      <span className="t44-envSeal">❧</span>
    </button>
  );
}

function HeartBurst44() {
  return (
    <span className="t44-heartBurst" aria-hidden="true">
      {Array.from({ length: 7 }, (_, index) => (
        <Heart key={index} style={{ '--heart-index': index }} fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  );
}

function Divider44() {
  return <div className="t44-divider" aria-hidden="true"><span /></div>;
}

function OpeningInvite44() {
  const { copy, event } = useInvitationContent();
  return (
    <section className="t44-openInvite">
      <Divider44 />
      <motion.div className="t44-openCard" {...rise} transition={{ ...rise.transition, delay: 0.08 }}>
        <p>HÔN LỄ ĐƯỢC CỬ HÀNH TẠI</p>
        <b data-editor-field="event.venueName">{event.venueName}</b>
        <em data-editor-field="event.address">{event.address}</em>
        <a href={event.mapUrl} target="_blank" rel="noreferrer">
          <MapPin size={17} />
          Xem đường đi
        </a>
      </motion.div>
      <motion.div className="t44-letter" {...rise} transition={{ ...rise.transition, delay: 0.16 }}>
        <p data-editor-field="copy.intro">{copy.intro}</p>
        <p>Những ai nhận được lời mời này đều là những người đặc biệt với bọn mình.</p>
        <p>Mong bạn và gia đình sẽ đến chung vui,</p>
        <p>Cùng chứng kiến khoảnh khắc hạnh phúc nhất của hai đứa.</p>
        <p>Cảm ơn vì luôn bên cạnh và yêu thương.</p>
        <p>Bọn mình rất mong được gặp bạn trong ngày vui này! ❤️</p>
      </motion.div>
    </section>
  );
}

function FallInLove44() {
  const { media } = useInvitationContent();
  return (
    <section className="t44-fall">
      <div className="t44-runner">
        <span>FALL IN</span>
        <strong>LOVE</strong>
        <span>WEDDING</span>
      </div>
      <motion.figure className="t44-widePhoto" {...rise}>
        <img data-media-role="hero" src={media.hero || media.couple || t44Assets.fall} alt="Khoảnh khắc cưới" />
        <figcaption>As the clouds and mist dissipate, I love you and everyone knows it</figcaption>
      </motion.figure>
    </section>
  );
}

function Couple44() {
  const { couple, media } = useInvitationContent();
  return (
    <section className="t44-coupleBlock">
      <motion.div className="t44-friends" {...rise}>
        <p>To Our Family And Friends,</p>
        <p>Thank You For Celebrating Our Special Day,</p>
        <p>Supporting Us And Sharing Our Love.</p>
      </motion.div>
      <Heart className="t44-smallHeart" size={30} fill="currentColor" strokeWidth={0} />
      <motion.h2 className="t44-loverTitle" {...rise} transition={{ ...rise.transition, delay: 0.1 }}>MY LOVER</motion.h2>
      <div className="t44-couple">
      <motion.article className="t44-person groom" initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-90px' }} transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}>
        <img data-media-role="groom" src={media.groom || media.couple || t44Assets.groom} alt={couple.groomName} />
        <div>
          <span>|</span>
          <h2 data-editor-field="couple.groomName">{couple.groomName}</h2>
        </div>
      </motion.article>
      <motion.article className="t44-person bride" initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-90px' }} transition={{ duration: 0.62, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}>
        <img data-media-role="bride" src={media.bride || media.couple || t44Assets.bride} alt={couple.brideName} />
        <div>
          <span>|</span>
          <h2 data-editor-field="couple.brideName">{couple.brideName}</h2>
        </div>
      </motion.article>
      </div>
    </section>
  );
}

function Poem44() {
  return (
    <section className="t44-poem">
      <motion.p {...rise}>
        Trái tim em,<br />
        Tựa cánh chim nhỏ giữa đồng hoang,<br />
        Đã tìm thấy bầu trời của riêng mình<br />
        Trong đôi mắt anh.
      </motion.p>
      <motion.blockquote {...rise} transition={{ ...rise.transition, delay: 0.1 }}>
        My heart, the bird of the wilderness has found its sky in your eye.
      </motion.blockquote>
    </section>
  );
}

function Welcome44() {
  const { couple, event, media } = useInvitationContent();
  const countdown = useWeddingCountdown(event.startsAt);
  const photos = media.gallery.length ? media.gallery.slice(0, 3) : [media.hero || t44Assets.stackA, media.couple || t44Assets.stackB, media.final || t44Assets.stackC];
  return (
    <section className="t44-welcome">
      <motion.div className="t44-welcomeTitle" {...rise}>
        <span>WELCOME</span>
        <em>TO</em>
        <span>WEDDING</span>
      </motion.div>
      <div className="t44-stack">
        {photos.map((photo, index) => (
          <motion.figure
            key={`${photo}-${index}`}
            className={`t44-stackPhoto p${index + 1}`}
            initial={{ opacity: 0, y: 52, rotate: index === 1 ? 2 : -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: index === 1 ? 1 : -1 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ duration: 0.95, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <img data-media-role="gallery" src={photo} alt={`Khoảnh khắc của ${couple.groomName} và ${couple.brideName} ${index + 1}`} />
            <figcaption>{['I love three things in this world.', 'Sun, moon and you.', 'You, forever.'][index]}</figcaption>
          </motion.figure>
        ))}
      </div>
      <motion.div className="t44-countdown" {...rise}>
        {['ngày', 'giờ', 'phút', 'giây'].map((label, index) => (
          <span key={label}>
            <strong>{countdown[index]}</strong>
            <em>{label}</em>
          </span>
        ))}
      </motion.div>
    </section>
  );
}

function Forever44() {
  const { media } = useInvitationContent();
  const photo = media.couple || media.hero || t44Assets.soft;
  return (
    <section className="t44-forever">
      <motion.p {...rise}>Có lẽ thế gian này có vô vàn điều tươi đẹp,<br />Nhưng trong lòng em, đẹp nhất vẫn chỉ có anh</motion.p>
      <motion.div className="t44-loveCollage" {...rise} transition={{ ...rise.transition, delay: 0.08 }}>
        <span>MY LOVE</span>
        <span>FOREVER</span>
        <figure className="t44-loveMain"><img data-media-role="couple" src={photo} alt="Tình yêu vĩnh cửu" /></figure>
        <img className="t44-stickerCouple" src={t44Assets.sticker} alt="" />
        <div className="t44-loveCaption">
          <h2>I LOVE YOU</h2>
          <p>Mong gió xuân dịu dàng với em hơn,<br />Xua tan muộn phiền,<br />Để mọi thứ chỉ còn lại dịu êm.</p>
        </div>
      </motion.div>
      <div className="t44-threeWords">
        <span>FALL IN</span>
        <span>LOVE</span>
        <span>WEDDING</span>
      </div>
      <motion.figure className="t44-foreverWide" {...rise}>
        <img data-media-role="final" src={media.final || photo} alt="Khoảnh khắc cưới" />
      </motion.figure>
    </section>
  );
}

function Calendar44() {
  const { event, media } = useInvitationContent();
  const date = eventDate44(event.startsAt);
  return (
    <section className="t44-calendarSection">
      <Heart className="t44-smallHeart" size={30} fill="currentColor" strokeWidth={0} />
      <motion.h2 className="t44-saveTitle" {...rise}>SAVE THE DATE</motion.h2>
      <motion.p className="t44-softText" {...rise} transition={{ ...rise.transition, delay: 0.08 }}>
        Đi một vòng lớn rồi vẫn gặp anh,<br />Từ đó, thế gian bỗng hóa dịu dàng.
      </motion.p>
      <motion.div className="t44-calendarFrame" {...rise} transition={{ ...rise.transition, delay: 0.14 }}>
        <img data-media-role="hero" src={media.hero || media.couple || t44Assets.stackA} alt="Ảnh lịch ngày cưới" />
        <div className="t44-calendar">
          {date.days.map((day) => (
            <span key={day} className={day === date.day ? 'selected' : ''}>
              {day === date.day && <HeartPrint44 />}
              <b>{day}</b>
            </span>
          ))}
        </div>
        <div className="t44-dateTitle">
          <h3>{date.weekday}, {String(date.day).padStart(2, '0')}/{String(date.month).padStart(2, '0')}/{date.year}</h3>
          <p data-editor-field="event.lunarDate">{event.lunarDate} | {date.time}</p>
        </div>
      </motion.div>
      <motion.p className="t44-holdHands" {...rise} transition={{ ...rise.transition, delay: 0.18 }}>
        Hạnh phúc lớn nhất chính là được nắm tay anh,<br />
        Cùng nhau đi hết cuộc đời lãng mạn này
      </motion.p>
    </section>
  );
}

function HeartPrint44() {
  return (
    <svg className="t44-heartPrint" viewBox="0 0 122 90" aria-hidden="true">
      <path d="M61 82C29 63 10 46 13 27 16 10 32 5 46 15c7 5 11 12 15 18 4-6 8-13 15-18 14-10 30-5 33 12 3 19-16 36-48 55Z" fill="#e53242" opacity="0.9" />
      <g fill="none" stroke="#ff6e76" strokeWidth="1.35" strokeLinecap="round">
        <path d="M18 43c14-25 36-29 48-8 8 14 17 17 35 13" />
        <path d="M20 51c13-20 33-24 44-6 8 13 18 17 33 15" />
        <path d="M25 60c11-16 28-18 37-4 8 12 18 16 29 15" />
        <path d="M32 68c8-10 21-12 29-2 5 7 13 10 23 10" />
        <path d="M25 33c9-15 22-22 36-19 13 3 19 14 23 26" />
        <path d="M38 25c7-6 16-7 23-2 7 5 9 13 12 20" />
        <path d="M69 18c11-8 25-4 31 7 6 12-1 25-13 36" />
        <path d="M78 28c7-4 15-1 18 7 2 7-2 14-10 20" />
      </g>
    </svg>
  );
}

function SweetInvitation44() {
  const { media } = useInvitationContent();
  return (
    <section className="t44-sweet">
      <motion.figure className="t44-sweetPhoto" {...rise}>
        <img data-media-role="final" src={media.final || media.couple || t44Assets.soft} alt="Sweet wedding invitation" />
        <div className="t44-sweetWords">
        <span>SWEET</span>
        <strong>WEDDING</strong>
        <strong>INVITATION</strong>
        </div>
      </motion.figure>
      <motion.div className="t44-quotePaper" {...rise} transition={{ ...rise.transition, delay: 0.08 }}>
        <blockquote>
          "Hết lần này đến lần khác, đem chuyện tình riêng khoe với thế gian,<br />
          Chỉ vì mỗi lần nhìn em, anh lại thấy đó là điều đáng tự hào nhất."
        </blockquote>
      </motion.div>
    </section>
  );
}

function Gift44() {
  const { media } = useInvitationContent();
  return (
    <section className="t44-gift">
      <Heart className="t44-smallHeart" size={30} fill="currentColor" strokeWidth={0} />
      <motion.div className="t44-giftIcon" {...rise}>
        <Gift size={76} strokeWidth={1.5} />
        <Heart size={34} fill="currentColor" />
      </motion.div>
      {media.giftQr && <motion.figure className="t44-giftQr" {...rise} transition={{ ...rise.transition, delay: 0.05 }}><img data-gift-qr src={media.giftQr} alt="QR mừng cưới" /><figcaption>Quét mã gửi quà mừng</figcaption></motion.figure>}
      <motion.h2 {...rise} transition={{ ...rise.transition, delay: 0.08 }}>Hộp quà cưới</motion.h2>
      <motion.p {...rise} transition={{ ...rise.transition, delay: 0.14 }}>Wedding Invitation</motion.p>
    </section>
  );
}

function Rsvp44({ sent, setSent }) {
  const rsvp = useRsvpSubmit();
  const [form, setForm] = useState({ fullName: '', attendance: 'yes', partySize: 1 });
  const submit = async (event) => {
    event.preventDefault();
    const success = await rsvp.submit({ ...form, phone: '', note: '', partySize: Number(form.partySize) });
    if (success) setSent(true);
  };
  return (
    <section className="t44-rsvp">
      <motion.h2 {...rise}>TRÂN TRỌNG KÍNH MỜI</motion.h2>
      <motion.form
        className="t44-form"
        {...rise}
        transition={{ ...rise.transition, delay: 0.08 }}
        onSubmit={submit}
      >
        <h3>Xác nhận tham dự</h3>
        <label>
          Họ và tên
          <input placeholder="Nhập tên của bạn" value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} required />
        </label>
        <fieldset>
          <legend>Bạn sẽ tham dự chứ?</legend>
          <label><input type="radio" name="join44" value="yes" checked={form.attendance === 'yes'} onChange={(event) => setForm({ ...form, attendance: event.target.value })} /> Có, tôi sẽ tham dự</label>
          <label><input type="radio" name="join44" value="no" checked={form.attendance === 'no'} onChange={(event) => setForm({ ...form, attendance: event.target.value })} /> Tôi bận, rất tiếc không thể tham dự</label>
        </fieldset>
        <label>
          Số lượng người tham dự
          <select value={form.partySize} onChange={(event) => setForm({ ...form, partySize: Number(event.target.value) })}>
            {Array.from({ length: 10 }, (_, index) => <option value={index + 1} key={index + 1}>{index + 1} người</option>)}
          </select>
        </label>
        <button type="submit" disabled={rsvp.status === 'loading'}>{sent ? <Check size={18} /> : <Send size={18} />} {rsvp.status === 'loading' ? 'Đang gửi...' : sent ? 'Đã ghi nhận' : 'Gửi xác nhận'}</button>
        {rsvp.error && <p className="t44-formError" role="alert">{rsvp.error}</p>}
      </motion.form>
    </section>
  );
}

function Party44() {
  return (
    <section className="t44-party">
      <motion.div {...rise}>
        <CoupleIllustration44 />
      </motion.div>
      <motion.h2 {...rise} transition={{ ...rise.transition, delay: 0.08 }}>Thank you</motion.h2>
    </section>
  );
}

function CoupleIllustration44() {
  return (
    <svg className="t44-coupleIllustration" viewBox="0 0 220 190" aria-hidden="true">
      <g fill="none" stroke="#161616" strokeLinecap="round" strokeLinejoin="round">
        <path d="M70 50c-17 16-25 44-23 86 11 9 31 9 43 0 2-40-4-71-20-86Z" fill="#0f0f0f" strokeWidth="2" />
        <path d="M58 67l12 31 12-31" stroke="#fff" strokeWidth="2" />
        <path d="M65 73h10M68 85h5M69 99h4" stroke="#fff" strokeWidth="1.5" />
        <circle cx="69" cy="37" r="16" fill="#f4d8c8" strokeWidth="2" />
        <path d="M53 34c7-17 27-17 35-3-8-4-19-4-35 3Z" fill="#151515" strokeWidth="2" />
        <path d="M59 39h8M72 39h8M67 48c4 3 8 3 12 0" strokeWidth="1.5" />
        <path d="M46 94c-11 16-17 29-16 44" strokeWidth="3" />
        <path d="M89 87c9 13 18 21 28 28" strokeWidth="3" />
        <path d="M115 64c-21 17-33 46-41 94 24 20 74 20 101 0-8-48-21-78-43-94Z" fill="#fff" strokeWidth="2" />
        <path d="M96 154c15 9 45 12 67 0M88 165c27 17 64 17 91 0" stroke="#b6c6c3" strokeWidth="1.5" />
        <path d="M117 70c-8 16-13 38-15 81M131 70c11 22 17 50 18 83M142 78c15 25 22 52 24 77" stroke="#8ea4a0" strokeWidth="1.2" />
        <circle cx="124" cy="51" r="15" fill="#f4d8c8" strokeWidth="2" />
        <path d="M108 50c5-18 24-21 34-5 0 0-12-8-34 5Z" fill="#151515" strokeWidth="2" />
        <path d="M113 54h7M126 54h7M120 63c4 2 8 2 12-1" strokeWidth="1.4" />
        <path d="M111 65c-6 9-8 20-7 30M138 65c8 10 12 22 14 36" strokeWidth="2" />
        <path d="M160 84c13 5 24 13 32 25" strokeWidth="3" />
        <path d="M89 97c12 3 22 8 32 17" strokeWidth="3" />
      </g>
      <g>
        <path d="M168 89c7-18 29-16 34 0-3 15-14 24-31 30-13-12-17-21-3-30Z" fill="#f7eaf0" stroke="#222" strokeWidth="1.5" />
        <path d="M176 90c3 8 8 8 12 0M171 101c8 4 17 4 25 0" fill="none" stroke="#9baea8" strokeWidth="1.3" />
        <circle cx="173" cy="84" r="4" fill="#e8a5b2" />
        <circle cx="184" cy="82" r="4" fill="#f3d2a8" />
        <circle cx="194" cy="86" r="4" fill="#e8a5b2" />
      </g>
      <g fill="none" stroke="#111" strokeLinecap="round" strokeLinejoin="round">
        <path d="M34 145c-10 8-10 21 2 26 12 6 29 0 30-13 2-16-18-23-32-13Z" fill="#fff" strokeWidth="1.7" />
        <path d="M38 144l-6-8M58 145l9-8M41 157h1M55 156h1M45 164c4 2 8 2 12 0" strokeWidth="1.4" />
      </g>
    </svg>
  );
}

function WishDock44({ visible, sent, setSent }) {
  const wish = useWishSubmit();
  const [composerOpen, setComposerOpen] = useState(false);
  const [form, setForm] = useState({ fullName: '', message: '' });
  const submit = async (event) => {
    event.preventDefault();
    const success = await wish.submit(form);
    if (success) {
      setSent(true);
      setComposerOpen(false);
      setForm({ fullName: '', message: '' });
    }
  };
  return (
    <div className={visible ? 't44-wishDock is-visible' : 't44-wishDock'} aria-hidden={!visible}>
      {composerOpen && <form className="t44-wishComposer" onSubmit={submit}><input aria-label="Tên người gửi" placeholder="Tên của bạn" value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} required /><textarea aria-label="Lời chúc" placeholder="Gửi lời chúc..." value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} required minLength={2} /><button type="submit" disabled={wish.status === 'loading'}><Send size={17} /> Gửi</button>{wish.error && <small role="alert">{wish.error}</small>}</form>}
      <button className="t44-wishToggle" type="button" onClick={() => setComposerOpen((value) => !value)} aria-label={sent ? 'Gửi thêm lời chúc' : 'Gửi lời chúc'}><MessageCircle size={18} /></button>
      <button className="t44-giftToggle" type="button" aria-label="Gửi quà"><Gift size={20} /></button>
      <button className="t44-heartToggle" type="button" aria-label="Thả tim"><Heart size={20} fill="currentColor" /></button>
    </div>
  );
}

export default Template44;
