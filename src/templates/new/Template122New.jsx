import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CalendarPlus,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Heart,
  MapPin,
  Navigation,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import './template122New.css';

const a = '/assets/new-templates/thiep-cuoi-122';

const GROOM = 'Đặng Hoàng Long';
const BRIDE = 'Vũ Bảo Ngọc';
const GROOM_SHORT = 'Hoàng Long';
const BRIDE_SHORT = 'Bảo Ngọc';
const VENUE = 'Trung Tâm Hội Nghị White Palace, 194 Hoàng Văn Thụ, Phường 9, Quận Phú Nhuận, TP. Hồ Chí Minh';
const MAP_QUERY = 'Trung Tâm Hội Nghị White Palace, 194 Hoàng Văn Thụ, Phường 9, Quận Phú Nhuận, TP. Hồ Chí Minh';
const MAP_EMBED = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyAY8WQxGig6axA_jZil94btO9G6dhsFEKg&q=Trung%20T%C3%A2m%20H%E1%BB%99i%20Ngh%E1%BB%8B%20White%20Palace%2C%20194%20Ho%C3%A0ng%20V%C4%83n%20Th%E1%BB%A5%2C%20Ph%C6%B0%E1%BB%9Dng%209%2C%20Qu%E1%BA%ADn%20Ph%C3%BA%20Nhu%E1%BA%ADn%2C%20TP.%20H%E1%BB%93%20Ch%C3%AD%20Minh';
const LUNAR = 'Tức ngày 15 tháng 11 năm Ất Tỵ';

const ALBUM = [
  `${a}/album-1.webp`,
  `${a}/album-2.webp`,
  `${a}/album-3.webp`,
  `${a}/album-4.webp`,
  `${a}/album-5.webp`,
  `${a}/album-6.webp`,
  `${a}/album-7.webp`,
];

const SCHEDULE = [
  { time: '17:00', label: 'Đón khách', icon: null },
  { time: '18:00', label: 'Khai tiệc', icon: `${a}/camera.webp` },
  { time: '18:30', label: 'Nghi thức cưới', icon: `${a}/cake.webp` },
  { time: '19:00', label: 'Cắt bánh & nâng ly', icon: `${a}/cook.webp` },
  { time: '20:30', label: 'Kết thúc tiệc', icon: null },
];

const INITIAL_WISHES = [
  { name: 'Duy Khang', time: '12:30:49 26/7/2026', message: 'Chúc mừng ngày vui của hai bạn, trăm năm hạnh phúc bền lâu!' },
  { name: 'Lan Chi', time: '12:30:49 26/7/2026', message: 'Đẹp đôi quá! Chúc hai bạn sống bên nhau đầu bạc răng long.' },
  { name: 'Tuấn Anh', time: '12:30:49 26/7/2026', message: 'Mừng hạnh phúc hai bạn! Chúc gia đình nhỏ luôn đầy ắp tiếng cười.' },
  { name: 'Khánh Vy', time: '12:30:49 26/7/2026', message: 'Chúc cô dâu chú rể luôn giữ được nụ cười này mãi mãi nhé!' },
  { name: 'Gia Bảo', time: '12:30:49 26/7/2026', message: 'Nhìn thiệp là thấy tình yêu rồi. Chúc hai bạn trăm năm viên mãn!' },
  { name: 'Phương Anh', time: '12:30:49 26/7/2026', message: 'Chúc đám cưới thật trọn vẹn và ấm áp. Hạnh phúc nhé hai bạn!' },
];

const AI_SUGGESTIONS = [
  'Chúc hai bạn trăm năm hạnh phúc, răng long đầu bạc!',
  'Mừng ngày vui của hai bạn, chúc cuộc sống hôn nhân luôn ngọt ngào và tràn ngập tiếng cười!',
  'Chúc hai bạn mãi mãi yêu thương, đồng hành và thấu hiểu nhau trên mọi chặng đường tương lai!',
  'Hôn nhân là khởi đầu của một hành trình tuyệt đẹp. Chúc hai bạn luôn hạnh phúc trọn vẹn!',
];

const PETALS = [
  { left: 30.3, size: 13.2, color: '#a8323b', dur: 24.8, delay: -21.6, sway: 28 },
  { left: 17.2, size: 22.5, color: '#ece4d8', dur: 25.9, delay: -10.3, sway: 0.5 },
  { left: 70.2, size: 17.4, color: '#c9a24a', dur: 25.7, delay: -8.3, sway: -28 },
  { left: 33.5, size: 22.9, color: '#a8323b', dur: 20.1, delay: -19.6, sway: 29.6 },
  { left: 26.4, size: 23.1, color: '#c9a24a', dur: 25.5, delay: -13.4, sway: -12.8 },
  { left: 83.3, size: 22.5, color: '#c9a24a', dur: 24.9, delay: -0.1, sway: -25.8 },
  { left: 9.0, size: 18.0, color: '#a8323b', dur: 23.0, delay: -0.3, sway: 4.7 },
  { left: 69.7, size: 12.9, color: '#c9a24a', dur: 20.7, delay: -7.4, sway: 23.7 },
  { left: 18.2, size: 22.3, color: '#ece4d8', dur: 21.8, delay: -20.6, sway: 25.6 },
  { left: 51.8, size: 20.9, color: '#7a1f26', dur: 18.0, delay: -0.6, sway: -15.5 },
  { left: 25.9, size: 17.7, color: '#7a1f26', dur: 24.5, delay: -23.2, sway: 5.1 },
  { left: 91.7, size: 12.5, color: '#c9a24a', dur: 20.0, delay: -0.4, sway: -11.3 },
];

function AmbientPetals() {
  return (
    <div className="t122n-ambient" aria-hidden="true">
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="t122n-ambientPetal"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            color: p.color,
            '--sway': `${p.sway}px`,
            animation: `t122n-fall ${p.dur}s ease-in-out ${p.delay}s infinite`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </span>
      ))}
    </div>
  );
}

function Cover({ onOpen, isOpening }) {
  return (
    <div
      className={`t122n-cover ${isOpening ? 't122n-cover--opening' : ''}`}
      dir="ltr"
      data-landing-screenshot-id="invite-envelope"
    >
      <AmbientPetals />
      <div className="t122n-coverWrap">
        <div
          className="t122n-seal"
          aria-hidden="true"
          onClick={onOpen}
          role="button"
          tabIndex={0}
          title="Nhấn để mở thiệp"
        >
          {isOpening && <span className="t122n-sealShockwave" aria-hidden="true" />}
          <svg viewBox="0 0 24 24" className="t122n-sealHeart" aria-hidden="true">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <div className="t122n-coverCard">
          <div className="t122n-coverCardBg" aria-hidden="true">
            <img
              src={`${a}/flower2-decoration.webp`}
              alt=""
              aria-hidden="true"
              className="t122n-flowerCornerTop"
            />
            <img
              src={`${a}/flower2-decoration.webp`}
              alt=""
              aria-hidden="true"
              className="t122n-flowerCornerBottom"
            />
          </div>
          <div className="t122n-coverBody">
            <h1 className="t122n-coverName">
              <span>{GROOM_SHORT}</span>
              <span className="t122n-coverAmp">&amp;</span>
              <span>{BRIDE_SHORT}</span>
            </h1>
            <div className="t122n-ornament"><i /><span>❦</span><i /></div>
            <p className="t122n-coverDate">3 tháng 1, 2026</p>
            <div className="t122n-coverInviteWrap">
              <p className="t122n-coverInvite">Thân Mời</p>
            </div>
            <button
              type="button"
              className="t122n-openBtn"
              onClick={onOpen}
              disabled={isOpening}
            >
              <span>{isOpening ? 'Đang mở...' : 'Mở thiệp'}</span>
              <span className="t122n-shine" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AlbumCarousel3D({ onSelectImage }) {
  const [active, setActive] = useState(0);
  const count = ALBUM.length;
  const autoRef = useRef(null);

  const go = useCallback((dir) => {
    setActive((prev) => (prev + dir + count) % count);
  }, [count]);

  // Auto-advance every 3.5 seconds
  const startAuto = useCallback(() => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % count);
    }, 3500);
  }, [count]);

  useEffect(() => {
    startAuto();
    return () => clearInterval(autoRef.current);
  }, [startAuto]);

  const handleNav = (dir) => {
    go(dir);
    startAuto(); // reset timer on manual nav
  };

  return (
    <div className="t122n-albumWrap">
      <div className="t122n-albumStage">
        <button
          type="button"
          aria-label="Previous photo"
          className="t122n-albumNavBtn t122n-albumNavBtn--prev"
          onClick={() => handleNav(-1)}
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          aria-label="Next photo"
          className="t122n-albumNavBtn t122n-albumNavBtn--next"
          onClick={() => handleNav(1)}
        >
          <ChevronRight size={22} />
        </button>

        <div className="t122n-album3dViewport">
          {ALBUM.map((src, i) => {
            let offset = i - active;
            if (offset > count / 2) offset -= count;
            if (offset < -count / 2) offset += count;
            const abs = Math.abs(offset);
            const style = {
              transform: `translateX(${offset * 60}%) translateZ(${-abs * 150}px) rotateY(${offset * 45}deg) scale(${1 - abs * 0.15})`,
              opacity: abs > 3 ? 0 : 1 - abs * 0.25,
              zIndex: 100 - abs,
            };
            return (
              <div
                key={src}
                className={`t122n-albumSlideCard ${i === active ? 't122n-albumSlideCard--active' : ''}`}
                style={style}
                onClick={() => {
                  if (i === active && onSelectImage) onSelectImage(i);
                  else { setActive(i); startAuto(); }
                }}
              >
                <img src={src} alt={`Ảnh cưới ${i + 1}`} loading="lazy" />
              </div>
            );
          })}
        </div>
      </div>

      <div className="t122n-albumDots">
        {ALBUM.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`t122n-albumDot ${i === active ? 't122n-albumDot--active' : ''}`}
            onClick={() => { setActive(i); startAuto(); }}
            aria-label={`Chuyển đến ảnh ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Template122New() {
  const [opened, setOpened] = useState(() => new URLSearchParams(window.location.search).get('open') === '1');
  const [isOpening, setIsOpening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showRsvp, setShowRsvp] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [giftTab, setGiftTab] = useState('groom');
  const [copiedGroom, setCopiedGroom] = useState(false);
  const [copiedBride, setCopiedBride] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // RSVP Form State
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpPhone, setRsvpPhone] = useState('');
  const [rsvpGuests, setRsvpGuests] = useState('1');
  const [rsvpAttending, setRsvpAttending] = useState('yes');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // Guestbook Form State
  const [wishes, setWishes] = useState(INITIAL_WISHES);
  const [wishName, setWishName] = useState('');
  const [wishMessage, setWishMessage] = useState('');
  const [wishNotice, setWishNotice] = useState('');

  // Audio Handler
  const toggleMusic = () => {
    const audio = document.getElementById('t122n-audio-player');
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleOpenInvitation = () => {
    if (isOpening || opened) return;
    setIsOpening(true);
    // Auto-play music on interaction
    const audio = document.getElementById('t122n-audio-player');
    if (audio) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
    setTimeout(() => {
      setOpened(true);
    }, 850);
  };

  const handleCopy = (text, type) => {
    navigator.clipboard?.writeText(text);
    if (type === 'groom') {
      setCopiedGroom(true);
      setTimeout(() => setCopiedGroom(false), 2000);
    } else {
      setCopiedBride(true);
      setTimeout(() => setCopiedBride(false), 2000);
    }
  };

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;
    setRsvpSubmitted(true);
    setTimeout(() => {
      setShowRsvp(false);
      setRsvpSubmitted(false);
      setRsvpName('');
      setRsvpPhone('');
    }, 2500);
  };

  const handleWishSubmit = (e) => {
    e.preventDefault();
    if (!wishName.trim() || !wishMessage.trim()) return;
    const now = new Date();
    const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')} ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    const newWish = {
      name: wishName.trim(),
      time: timeStr,
      message: wishMessage.trim(),
    };
    setWishes([newWish, ...wishes]);
    setWishName('');
    setWishMessage('');
    setWishNotice('Cảm ơn lời chúc thân thương của bạn!');
    setTimeout(() => setWishNotice(''), 4000);
  };

  const handleAiSuggest = () => {
    const random = AI_SUGGESTIONS[Math.floor(Math.random() * AI_SUGGESTIONS.length)];
    setWishMessage(random);
  };

  const calendarHref =
    'https://www.google.com/calendar/render?action=TEMPLATE' +
    `&text=${encodeURIComponent(`Đám cưới ${GROOM} & ${BRIDE}`)}` +
    '&dates=20260103T110000Z/20260103T130000Z&ctz=Asia/Ho_Chi_Minh' +
    `&details=${encodeURIComponent(`Tiệc cưới của ${GROOM} & ${BRIDE} tại ${VENUE}`)}` +
    `&location=${encodeURIComponent(VENUE)}`;

  return (
    <div className="t122n-root" dir="ltr">
      {/* Background Audio */}
      <audio
        id="t122n-audio-player"
        src="https://cdn.chungdoi.com/music/em-dong-y-i-do.mp3"
        loop
        preload="auto"
      />

      {/* Floating Music Button */}
      <button
        type="button"
        className={`t122n-musicFloatBtn ${isPlaying ? 't122n-musicFloatBtn--playing' : ''}`}
        onClick={toggleMusic}
        aria-label={isPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>

      {/* Cover / Bìa mở đầu */}
      <AnimatePresence mode="wait">
        {!opened && (
          <Cover
            key="cover"
            onOpen={handleOpenInvitation}
            isOpening={isOpening}
          />
        )}
      </AnimatePresence>

      {/* Thiệp chính (Main Invitation) */}
      <div className="t122n-mainWrapper" aria-hidden={!opened}>
        {/* Handmade Paper Texture Background */}
        <div
          className="t122n-paperBg"
          aria-hidden="true"
          style={{ backgroundImage: `url(${a}/paper.webp)` }}
        />

        {/* ── HEADER / SAVE THE DATE ── */}
        <header className="t122n-headerSection">
          <img
            src={`${a}/castle-background.webp`}
            alt=""
            aria-hidden="true"
            className="t122n-castleWatermark"
          />

          <p className="t122n-saveTheDateTitle">SAVE THE DATE</p>

          <div className="t122n-envelopeStage">
            <div className="t122n-envelopeAspect">
              <img
                src={`${a}/envelope-background.webp`}
                alt=""
                aria-hidden="true"
                className="t122n-envBack"
              />
              <div className="t122n-envPhotoFloat">
                <div className="t122n-envPhotoCard">
                  <img src={`${a}/photo-envelope.webp`} alt="Ảnh cưới cô dâu chú rể" />
                </div>
              </div>
              <span className="t122n-envFlowerWrap" aria-hidden="true">
                <span className="t122n-envFlowerFloat">
                  <img src={`${a}/flower2-decoration.webp`} alt="" />
                </span>
              </span>
              <img
                src={`${a}/envelope-cover.webp`}
                alt=""
                aria-hidden="true"
                className="t122n-envFront"
              />
            </div>
          </div>

          <div className="t122n-namesBlock">
            <p className="t122n-groomName">{GROOM_SHORT}</p>
            <span className="t122n-ampWatermark" aria-hidden="true">&amp;</span>
            <p className="t122n-brideName">{BRIDE_SHORT}</p>
          </div>
        </header>

        {/* ── SECTION: THÔNG TIN LỄ CƯỚI ── */}
        <section className="t122n-section t122n-sectionCard">
          <span className="t122n-floatingFlowerCornerRight" aria-hidden="true">
            <img src={`${a}/flower2-decoration.webp`} alt="" />
          </span>

          <div className="t122n-burgundyCard">
            <div className="t122n-burgundyCardBg" />
            <img
              src={`${a}/paper.webp`}
              alt=""
              aria-hidden="true"
              className="t122n-cardPaperTexture"
            />

            <div className="t122n-cardInner">
              <h2 className="t122n-cardTitle">THÔNG TIN LỄ CƯỚI</h2>

              <div className="t122n-familyGrid">
                <div className="t122n-familyCol">
                  <span className="t122n-familyLabel">Ông Bà</span>
                  <span className="t122n-familyName">Đặng Văn Thắng</span>
                  <span className="t122n-familyName">Bùi Thị Mai</span>
                  <p className="t122n-familyAddr">Quận 1, TP. Hồ Chí Minh</p>
                </div>
                <div className="t122n-familyDivider" />
                <div className="t122n-familyCol">
                  <span className="t122n-familyLabel">Ông Bà</span>
                  <span className="t122n-familyName">Vũ Đức Trung</span>
                  <span className="t122n-familyName">Ngô Thị Hạnh</span>
                  <p className="t122n-familyAddr">Quận 3, TP. Hồ Chí Minh</p>
                </div>
              </div>

              <div className="t122n-announcement">
                TRÂN TRỌNG BÁO TIN<br />
                LỄ THÀNH HÔN CỦA CON CHÚNG TÔI
              </div>

              <div className="t122n-coupleNamedBlock">
                <h3 className="t122n-coupleMainName">{GROOM}</h3>
                <span className="t122n-coupleRole">Trưởng Nam</span>
                <span className="t122n-coupleAmp">&amp;</span>
                <h3 className="t122n-coupleMainName">{BRIDE}</h3>
                <span className="t122n-coupleRole">Út Nữ</span>
              </div>

              <div className="t122n-ceremonyDetails">
                <p className="t122n-ceremonyPlace">
                  LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI<br />
                  TƯ GIA
                </p>
                <div className="t122n-ceremonyTimeBar">
                  <span>VÀO LÚC 09:00</span>
                  <span>THỨ BẢY</span>
                </div>
                <div className="t122n-bigDateDisplay">
                  <span className="t122n-bigDay">03</span>
                  <div className="t122n-dateSepLine" />
                  <div className="t122n-monthYearCol">
                    <span>THÁNG 01</span>
                    <span>2026</span>
                  </div>
                </div>
                <p className="t122n-lunarText">({LUNAR})</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION: ALBUM ẢNH ── */}
        <section className="t122n-section t122n-albumSection">
          <img
            src={`${a}/castle-background.webp`}
            alt=""
            aria-hidden="true"
            className="t122n-castleWatermark t122n-castleWatermark--album"
          />
          <h2 className="t122n-sectionHeading">Album Ảnh</h2>
          <AlbumCarousel3D onSelectImage={(index) => setLightboxIndex(index)} />
        </section>

        {/* ── SECTION: THÔNG TIN TIỆC CƯỚI ── */}
        <section className="t122n-section t122n-sectionCard">
          <span className="t122n-floatingFlowerCornerLeft" aria-hidden="true">
            <img src={`${a}/flower2-decoration.webp`} alt="" />
          </span>

          <div className="t122n-burgundyCard">
            <div className="t122n-burgundyCardBg" />
            <img
              src={`${a}/paper.webp`}
              alt=""
              aria-hidden="true"
              className="t122n-cardPaperTexture"
            />

            <div className="t122n-cardInner">
              <h2 className="t122n-cardTitle">THÔNG TIN TIỆC CƯỚI</h2>

              <p className="t122n-partyIntro">Tiệc cưới sẽ diễn ra vào lúc:</p>

              <div className="t122n-ceremonyTimeBar">
                <span>18:00</span>
                <span>THỨ BẢY</span>
              </div>

              <div className="t122n-bigDateDisplay">
                <span className="t122n-bigDay">03</span>
                <div className="t122n-dateSepLine" />
                <div className="t122n-monthYearCol">
                  <span>THÁNG 01</span>
                  <span>2026</span>
                </div>
              </div>
              <p className="t122n-lunarText">({LUNAR})</p>

              <div className="t122n-receptionTimes">
                <div className="t122n-receptionTimeItem">
                  <span className="t122n-receptionLabel">ĐÓN KHÁCH</span>
                  <span className="t122n-receptionVal">17:30</span>
                </div>
                <div className="t122n-receptionTimeItem">
                  <span className="t122n-receptionLabel">KHAI TIỆC</span>
                  <span className="t122n-receptionVal">18:00</span>
                </div>
              </div>

              {/* Lịch Tháng 1 / 2026 */}
              <div className="t122n-calCard">
                <div className="t122n-calMonthTitle">Tháng 1 / 2026</div>
                <div className="t122n-calWeekdays">
                  <span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span><span>CN</span>
                </div>
                <div className="t122n-calDaysGrid">
                  <div /><div /><div />
                  <span>1</span>
                  <span>2</span>
                  <div className="t122n-calHeartDay">
                    <svg viewBox="0 0 24 22" fill="#511419">
                      <path d="M12 21C12 21 1.5 13.5 1.5 7.5C1.5 4.46 3.96 2 7 2C8.76 2 10.35 2.81 11.4 4.09L12 4.8L12.6 4.09C13.65 2.81 15.24 2 17 2C20.04 2 22.5 4.46 22.5 7.5C22.5 13.5 12 21 12 21Z" />
                    </svg>
                    <span className="t122n-calHeartDayNum">3</span>
                  </div>
                  <span>4</span>
                  <span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span>
                  <span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span>
                  <span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span>
                  <span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span>
                </div>
              </div>

              <a
                href={calendarHref}
                target="_blank"
                rel="noreferrer"
                className="t122n-addCalendarLink"
              >
                Thêm vào lịch
              </a>

              <div className="t122n-rsvpTriggerWrap">
                <button
                  type="button"
                  className="t122n-rsvpBtn"
                  onClick={() => setShowRsvp(true)}
                >
                  XÁC NHẬN THAM DỰ
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION: ĐỊA ĐIỂM TIỆC CƯỚI ── */}
        <section className="t122n-section t122n-venueSection">
          <img
            src={`${a}/castle-background.webp`}
            alt=""
            aria-hidden="true"
            className="t122n-castleWatermark t122n-castleWatermark--venue"
          />

          <h3 className="t122n-sectionHeading">TIỆC CƯỚI SẼ TỔ CHỨC TẠI</h3>
          <p className="t122n-venueAddressText">{VENUE}</p>

          <div className="t122n-mapContainer">
            <iframe
              title="Địa điểm tiệc cưới White Palace"
              src={MAP_EMBED}
              className="t122n-mapIframe"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`}
              target="_blank"
              rel="noreferrer"
              className="t122n-directionBtn"
            >
              <Navigation size={16} />
              <span>Chỉ đường</span>
            </a>
          </div>
        </section>

        {/* ── SECTION: DRESS CODE ── */}
        <section className="t122n-section t122n-dressCodeSection">
          <h2 className="t122n-sectionHeading">DRESS CODE</h2>
          <p className="t122n-dressCodeSubtitle">Trang phục dự tiệc</p>
          <div className="t122n-colorSwatches">
            <div className="t122n-colorSwatch" style={{ backgroundColor: '#511419' }} title="Đỏ mận đậm" />
            <div className="t122n-colorSwatch" style={{ backgroundColor: '#8c3a3f' }} title="Đỏ hồng" />
            <div className="t122n-colorSwatch" style={{ backgroundColor: '#c9a24a' }} title="Vàng đồng" />
            <div className="t122n-colorSwatch t122n-colorSwatch--border" style={{ backgroundColor: '#ece4d8' }} title="Trắng kem" />
          </div>
        </section>

        {/* ── SECTION: LỊCH TRÌNH NGÀY CƯỚI ── */}
        <section className="t122n-section t122n-sectionCard">
          <span className="t122n-floatingFlowerCornerRightTop" aria-hidden="true">
            <img src={`${a}/flower2-decoration.webp`} alt="" />
          </span>

          <div className="t122n-burgundyCard">
            <div className="t122n-burgundyCardBg" />
            <img
              src={`${a}/paper.webp`}
              alt=""
              aria-hidden="true"
              className="t122n-cardPaperTexture"
            />

            <div className="t122n-cardInner">
              <h2 className="t122n-cardTitle">LỊCH TRÌNH NGÀY CƯỚI</h2>

              <ol className="t122n-timelineList">
                {SCHEDULE.map((item, idx) => (
                  <li key={item.time} className="t122n-timelineItem">
                    <div className="t122n-timelineTime">
                      {item.icon && (
                        <img
                          src={item.icon}
                          alt=""
                          aria-hidden="true"
                          className="t122n-timelineIcon"
                        />
                      )}
                      <span>{item.time}</span>
                    </div>

                    <div className="t122n-timelineAxis">
                      {idx > 0 && <span className="t122n-timelineLineUp" />}
                      <span className="t122n-timelineNode" />
                      {idx < SCHEDULE.length - 1 && <span className="t122n-timelineLineDown" />}
                    </div>

                    <div className="t122n-timelineLabel">{item.label}</div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ── SECTION: SỔ LƯU BÚT ── */}
        <section className="t122n-section t122n-guestbookSection">
          <img
            src={`${a}/papernote-background.webp`}
            alt=""
            aria-hidden="true"
            className="t122n-paperNoteBg"
          />

          <div className="t122n-guestbookInner">
            <h2 className="t122n-sectionHeading">Sổ lưu bút</h2>

            <form onSubmit={handleWishSubmit} className="t122n-guestbookForm">
              <input
                type="text"
                placeholder="Nhập tên*"
                required
                maxLength={100}
                value={wishName}
                onChange={(e) => setWishName(e.target.value)}
                className="t122n-wishInput"
              />
              <textarea
                placeholder="Nhập lời chúc*"
                required
                rows={3}
                maxLength={1000}
                value={wishMessage}
                onChange={(e) => setWishMessage(e.target.value)}
                className="t122n-wishTextarea"
              />
              <div className="t122n-wishFormBottom">
                <button
                  type="button"
                  onClick={handleAiSuggest}
                  className="t122n-aiSuggestBtn"
                  title="Tạo lời chúc bằng AI"
                >
                  <Sparkles size={16} />
                  <span>Gợi ý AI</span>
                </button>
                <button type="submit" className="t122n-submitWishBtn">
                  GỬI LỜI CHÚC
                </button>
              </div>
              {wishNotice && <p className="t122n-wishSuccessAlert">{wishNotice}</p>}
            </form>

            <div className="t122n-wishesScrollList">
              {wishes.map((w, idx) => (
                <div key={idx} className="t122n-wishItemCard">
                  <div className="t122n-wishItemHead">
                    <span className="t122n-wishAuthor">{w.name}</span>
                    <span className="t122n-wishTimestamp">{w.time}</span>
                  </div>
                  <p className="t122n-wishItemBody">{w.message}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION: HỘP QUÀ MỪNG / LÌ XÌ ── */}
        <section className="t122n-section t122n-giftSection">
          <img
            src={`${a}/castle-background.webp`}
            alt=""
            aria-hidden="true"
            className="t122n-castleWatermark t122n-castleWatermark--gift"
          />

          <h2 className="t122n-sectionHeading">Hộp Quà Mừng</h2>

          <button
            type="button"
            className="t122n-ienvGroup"
            onClick={() => setShowGift(true)}
            aria-label="Mở hộp mừng cưới"
          >
            <div className="t122n-ienvStage">
              <span className="t122n-ienvSparkle t122n-ienvSparkle--1">✦</span>
              <span className="t122n-ienvSparkle t122n-ienvSparkle--2">✦</span>
              <span className="t122n-ienvSparkle t122n-ienvSparkle--3">✦</span>
              <span className="t122n-ienvSparkle t122n-ienvSparkle--4">✦</span>

              <div className="t122n-ienvBox">
                <div className="t122n-ienvShadow" />
                <img
                  src={`${a}/minimalism_darkred.webp`}
                  alt=""
                  aria-hidden="true"
                  className="t122n-ienvBack"
                />
                <img
                  src={`${a}/minimalism_darkred.webp`}
                  alt="Bao phong bì mừng cưới"
                  className="t122n-ienvCard"
                />
              </div>
            </div>
            <p className="t122n-ienvHint">
              <span>Nhấn để mở</span>
            </p>
          </button>

          <p className="t122n-footerThanks" style={{marginTop: '20px'}}>
            Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!
          </p>
        </section>




        {/* ── FOOTER ── */}
        <footer className="t122n-footer">
          <div className="t122n-footerBrand">
            <span>♡ Lời Hẹn Wedding Studio</span>
          </div>
        </footer>
      </div>

      {/* ── MODAL: XÁC NHẬN THAM DỰ (RSVP) ── */}
      <AnimatePresence>
        {showRsvp && (
          <div className="t122n-modalOverlay" onClick={() => setShowRsvp(false)}>
            <motion.div
              className="t122n-modalDialog"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="t122n-modalCloseBtn"
                onClick={() => setShowRsvp(false)}
                aria-label="Đóng"
              >
                <X size={20} />
              </button>

              <h3 className="t122n-modalTitle">Xác Nhận Tham Dự</h3>
              <p className="t122n-modalSubtitle">
                Đám cưới {GROOM} &amp; {BRIDE}
              </p>

              {rsvpSubmitted ? (
                <div className="t122n-rsvpSuccessBox">
                  <div className="t122n-rsvpSuccessIcon">
                    <Check size={28} />
                  </div>
                  <p className="t122n-rsvpSuccessMsg">
                    Cảm ơn bạn đã phản hồi! Gia đình rất mong được đón tiếp bạn trong ngày vui!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="t122n-rsvpFormContent">
                  <div className="t122n-formGroup">
                    <label>Họ và tên của bạn *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Nguyễn Văn A"
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                    />
                  </div>

                  <div className="t122n-formGroup">
                    <label>Số điện thoại</label>
                    <input
                      type="tel"
                      placeholder="Số điện thoại liên hệ"
                      value={rsvpPhone}
                      onChange={(e) => setRsvpPhone(e.target.value)}
                    />
                  </div>

                  <div className="t122n-formGroup">
                    <label>Bạn sẽ tham dự chứ? *</label>
                    <div className="t122n-radioGroup">
                      <label className="t122n-radioLabel">
                        <input
                          type="radio"
                          name="attending"
                          value="yes"
                          checked={rsvpAttending === 'yes'}
                          onChange={() => setRsvpAttending('yes')}
                        />
                        <span>Có, chắc chắn rồi!</span>
                      </label>
                      <label className="t122n-radioLabel">
                        <input
                          type="radio"
                          name="attending"
                          value="no"
                          checked={rsvpAttending === 'no'}
                          onChange={() => setRsvpAttending('no')}
                        />
                        <span>Rất tiếc, mình bận mất rồi</span>
                      </label>
                    </div>
                  </div>

                  {rsvpAttending === 'yes' && (
                    <div className="t122n-formGroup">
                      <label>Số lượng người tham dự</label>
                      <select
                        value={rsvpGuests}
                        onChange={(e) => setRsvpGuests(e.target.value)}
                      >
                        <option value="1">1 người</option>
                        <option value="2">2 người (đi cùng người thương/bạn)</option>
                        <option value="3">3 người (gia đình nhỏ)</option>
                        <option value="4">4 người trở lên</option>
                      </select>
                    </div>
                  )}

                  <button type="submit" className="t122n-modalSubmitBtn">
                    Gửi xác nhận
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── MODAL: HỘP QUÀ MỪNG CƯỚI (QR BANKING) ── */}
      <AnimatePresence>
        {showGift && (
          <div className="t122n-modalOverlay" onClick={() => setShowGift(false)}>
            <motion.div
              className="t122n-modalDialog t122n-modalDialog--gift"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="t122n-modalCloseBtn"
                onClick={() => setShowGift(false)}
                aria-label="Đóng"
              >
                <X size={20} />
              </button>

              <h3 className="t122n-modalTitle">Hộp Quà Mừng</h3>
              <p className="t122n-modalSubtitle">
                Gửi quà mừng hạnh phúc tới Cô dâu &amp; Chú rể
              </p>

              <div className="t122n-giftTabs">
                <button
                  type="button"
                  className={`t122n-giftTabBtn ${giftTab === 'groom' ? 't122n-giftTabBtn--active' : ''}`}
                  onClick={() => setGiftTab('groom')}
                >
                  Chú Rể (Hoàng Long)
                </button>
                <button
                  type="button"
                  className={`t122n-giftTabBtn ${giftTab === 'bride' ? 't122n-giftTabBtn--active' : ''}`}
                  onClick={() => setGiftTab('bride')}
                >
                  Cô Dâu (Bảo Ngọc)
                </button>
              </div>

              {giftTab === 'groom' ? (
                <div className="t122n-giftCardContent">
                  <div className="t122n-qrCodeBox">
                    <img
                      src="https://api.vietqr.io/image/970436-1023456789-QRIBFTTA.jpg?accountName=DANG%20HOANG%20LONG&amount=0"
                      alt="QR mừng cưới Chú Rể"
                      className="t122n-qrImg"
                    />
                  </div>
                  <div className="t122n-bankInfoBox">
                    <p className="t122n-bankName">Ngân hàng Vietcombank</p>
                    <p className="t122n-bankHolder">Chủ tài khoản: <b>ĐẶNG HOÀNG LONG</b></p>
                    <div className="t122n-accountNumRow">
                      <span>Số TK: <b>1023456789</b></span>
                      <button
                        type="button"
                        className="t122n-copyBtn"
                        onClick={() => handleCopy('1023456789', 'groom')}
                      >
                        {copiedGroom ? <Check size={14} /> : <Copy size={14} />}
                        <span>{copiedGroom ? 'Đã chép' : 'Sao chép'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="t122n-giftCardContent">
                  <div className="t122n-qrCodeBox">
                    <img
                      src="https://api.vietqr.io/image/970407-9988776655-QRIBFTTA.jpg?accountName=VU%20BAO%20NGOC&amount=0"
                      alt="QR mừng cưới Cô Dâu"
                      className="t122n-qrImg"
                    />
                  </div>
                  <div className="t122n-bankInfoBox">
                    <p className="t122n-bankName">Ngân hàng Techcombank</p>
                    <p className="t122n-bankHolder">Chủ tài khoản: <b>VŨ BẢO NGỌC</b></p>
                    <div className="t122n-accountNumRow">
                      <span>Số TK: <b>9988776655</b></span>
                      <button
                        type="button"
                        className="t122n-copyBtn"
                        onClick={() => handleCopy('9988776655', 'bride')}
                      >
                        {copiedBride ? <Check size={14} /> : <Copy size={14} />}
                        <span>{copiedBride ? 'Đã chép' : 'Sao chép'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── LIGHTBOX PHÓNG TO ẢNH CƯỚI ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="t122n-lightboxOverlay" onClick={() => setLightboxIndex(null)}>
            <button
              type="button"
              className="t122n-lightboxClose"
              onClick={() => setLightboxIndex(null)}
              aria-label="Đóng ảnh"
            >
              <X size={28} />
            </button>
            <div className="t122n-lightboxContent" onClick={(e) => e.stopPropagation()}>
              <img src={ALBUM[lightboxIndex]} alt="Ảnh cưới phóng to" />
              <button
                type="button"
                className="t122n-lightboxNav t122n-lightboxNav--prev"
                onClick={() => setLightboxIndex((prev) => (prev - 1 + ALBUM.length) % ALBUM.length)}
                aria-label="Ảnh trước"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                type="button"
                className="t122n-lightboxNav t122n-lightboxNav--next"
                onClick={() => setLightboxIndex((prev) => (prev + 1) % ALBUM.length)}
                aria-label="Ảnh sau"
              >
                <ChevronRight size={32} />
              </button>
              <div className="t122n-lightboxCounter">
                {lightboxIndex + 1} / {ALBUM.length}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
