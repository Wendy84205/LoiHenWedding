import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CalendarPlus,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  Heart,
  MapPin,
  Navigation,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import './template125New.css';

const a = '/assets/new-templates/thiep-cuoi-125';

const GROOM = 'Đặng Thái Sơn';
const BRIDE = 'Mai Lan Hương';
const GROOM_SHORT = 'Thái Sơn';
const BRIDE_SHORT = 'Lan Hương';
const VENUE = 'Trung tâm Tiệc cưới Hoa Hồng, 123 Đường ABC, Quận 1, TP.HCM';
const MAP_QUERY = 'Trung tâm Tiệc cưới Hoa Hồng, 123 Đường ABC, Quận 1, TP.HCM';
const MAP_EMBED = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.460237751918!2d106.69741167570397!3d10.77601938937279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f385570472f%3A0x119454483ac7b9bc!2zRGluaCDEkOG7mWMgTOG6rXAgLSBEaW5oIFRo4buRbmcgTmjhuqV0!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s';
const LUNAR = 'Tức ngày 12 tháng 11 năm Bính Ngọ';

const ALBUM = [
  `${a}/album-1.webp`,
  `${a}/album-2.webp`,
  `${a}/album-3.webp`,
  `${a}/album-4.webp`,
  `${a}/album-5.webp`,
  `${a}/album-6.webp`,
  `${a}/album-7.webp`,
  `${a}/album-8.webp`,
];

const SCHEDULE = [
  { time: '17:00', label: 'Đón Khách', icon: `${a}/icon-welcome.webp` },
  { time: '17:30', label: 'Làm Lễ', icon: `${a}/icon-ceremony.webp` },
  { time: '18:00', label: 'Khai Tiệc', icon: `${a}/icon-banquet.webp` },
  { time: '20:00', label: 'Chụp Ảnh Kỷ Niệm & Tiễn Khách', icon: `${a}/icon-clock.webp` },
];

const INITIAL_WISHES = [
  { name: 'Ngọc Mai', time: '09:15 20/12/2026', message: 'Chúc mừng hạnh phúc hai bạn! Chúc đôi bạn trăm năm hòa hợp, vạn sự như ý.' },
  { name: 'Thanh Tùng', time: '10:30 20/12/2026', message: 'Mẫu thiệp hoa lan xanh rêu đẹp quá! Chúc Sơn và Hương luôn ngập tràn yêu thương.' },
  { name: 'Khánh Linh', time: '11:45 20/12/2026', message: 'Chúc mừng ngày đại hỷ! Chúc hai bạn sớm có thêm thiên thần nhỏ nhé.' },
  { name: 'Hải Đăng', time: '14:20 20/12/2026', message: 'Chúc tân lang tân nương trăm năm hạnh phúc, đầu bạc răng long!' },
];

const AI_SUGGESTIONS = [
  'Chúc hai bạn trăm năm hạnh phúc, răng long đầu bạc!',
  'Mừng ngày vui của hai bạn, chúc tình yêu của đôi bạn luôn tươi mới và bền chặt như đóa phong lan!',
  'Hôn nhân là khởi đầu của hành trình ngọt ngào nhất. Chúc hai bạn luôn đồng hành và thấu hiểu nhau!',
  'Chúc cô dâu chú rể ngày cưới trọn vẹn và cuộc sống hôn nhân luôn tràn ngập tiếng cười hạnh phúc!',
];

const ORCHID_PETALS = [
  { left: 12, size: 14, color: '#8e9663', dur: 21, delay: -4, sway: -22 },
  { left: 24, size: 22, color: '#c9cfa9', dur: 24, delay: -12, sway: 26 },
  { left: 38, size: 16, color: '#ffffff', dur: 19, delay: -8, sway: -18 },
  { left: 52, size: 20, color: '#8e9663', dur: 23, delay: -15, sway: 20 },
  { left: 68, size: 25, color: '#c9cfa9', dur: 25, delay: -3, sway: -25 },
  { left: 79, size: 15, color: '#ffffff', dur: 20, delay: -18, sway: 18 },
  { left: 88, size: 21, color: '#8e9663', dur: 22, delay: -9, sway: -20 },
  { left: 94, size: 17, color: '#e6e9d8', dur: 26, delay: -1, sway: 15 },
];

function AmbientOrchids() {
  return (
    <div className="t125n-ambient" aria-hidden="true">
      {ORCHID_PETALS.map((p, i) => (
        <span
          key={i}
          className="t125n-petal"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            color: p.color,
            '--sway': `${p.sway}px`,
            animation: `t125n-fall ${p.dur}s ease-in-out ${p.delay}s infinite`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
            <g>
              <ellipse cx="12" cy="5" rx="2.2" ry="4.5" />
              <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(60 12 12)" />
              <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(120 12 12)" />
              <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(180 12 12)" />
              <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(240 12 12)" />
              <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(300 12 12)" />
            </g>
            <circle cx="12" cy="12" r="1.8" fillOpacity="0.45" />
          </svg>
        </span>
      ))}
    </div>
  );
}

export default function Template125New() {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [giftOpen, setGiftOpen] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(null);

  // Countdown timer
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Guestbook
  const [wishes, setWishes] = useState(INITIAL_WISHES);
  const [guestName, setGuestName] = useState('');
  const [guestMessage, setGuestMessage] = useState('');

  // RSVP
  const [rsvpState, setRsvpState] = useState({
    name: '',
    phone: '',
    guests: '1',
    side: 'Nhà Trai',
    note: '',
    submitted: false,
  });

  const audioRef = useRef(null);

  // Countdown calculation to 2026-12-20 17:00:00
  useEffect(() => {
    const targetDate = new Date('2026-12-20T17:00:00+07:00').getTime();
    const updateCountdown = () => {
      const now = Date.now();
      const diff = Math.max(0, targetDate - now);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  // Open invitation handler
  const handleOpen = () => {
    setOpening(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
    setTimeout(() => {
      setOpened(true);
      setOpening(false);
    }, 700);
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(key);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  const submitWish = (e) => {
    e.preventDefault();
    if (!guestName.trim() || !guestMessage.trim()) return;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    setWishes([{ name: guestName.trim(), message: guestMessage.trim(), time: timeStr }, ...wishes]);
    setGuestName('');
    setGuestMessage('');
  };

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    if (!rsvpState.name.trim()) return;
    setRsvpState((prev) => ({ ...prev, submitted: true }));
  };

  const downloadIcs = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//LoiHenWedding//WeddingInvitation//VI',
      'BEGIN:VEVENT',
      'UID:wedding-125-20261220@loihen.online',
      'DTSTAMP:20261018T000000Z',
      'DTSTART:20261220T100000Z',
      'DTEND:20261220T140000Z',
      'SUMMARY:Lễ Cưới Đặng Thái Sơn & Mai Lan Hương',
      `DESCRIPTION:Trân trọng kính mời quý khách tham dự tiệc cưới của Thái Sơn & Lan Hương tại ${VENUE}`,
      `LOCATION:${VENUE}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'wedding-thaison-lanhuong.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="t125n" data-testid="orchid-olive-template">
      {/* Background audio */}
      <audio ref={audioRef} src={`${a}/music.mp3`} loop preload="metadata" />

      {/* Floating Audio Control */}
      {opened && (
        <button
          type="button"
          onClick={toggleMusic}
          className={`t125n-audio-btn ${isPlaying ? 'playing' : ''}`}
          aria-label={isPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
        >
          {isPlaying ? <Volume2 size={22} /> : <VolumeX size={22} />}
        </button>
      )}

      {/* Ambient Orchid Petals */}
      <AmbientOrchids />

      {/* Envelope Opening Screen */}
      <AnimatePresence>
        {!opened && (
          <motion.div
            className="t125n-cover"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.7, ease: 'easeInOut' } }}
          >
            <div className="t125n-cover-card-wrapper">
              <div className="t125n-seal">
                <Heart size={26} fill="currentColor" className="t125n-seal-heart" />
              </div>

              <div className="t125n-cover-card">
                <img src={`${a}/orchid-corner.webp`} alt="" className="t125n-cover-orchid-tr" />
                <img src={`${a}/orchid-corner.webp`} alt="" className="t125n-cover-orchid-bl" />

                <h1 className="t125n-cover-title">
                  <span>{GROOM_SHORT}</span>
                  <span className="t125n-amp">&amp;</span>
                  <span>{BRIDE_SHORT}</span>
                </h1>

                <div className="t125n-cover-date">20 Tháng 12, 2026</div>
                <div className="t125n-cover-sub">Thân Mời Quý Khách</div>

                <button
                  type="button"
                  className="t125n-open-btn"
                  onClick={handleOpen}
                  disabled={opening}
                >
                  <span>{opening ? 'Đang mở…' : 'Mở thiệp'}</span>
                  <div className="t125n-btn-shine" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Invitation Content */}
      <div className="t125n-sheet">
        <div className="t125n-paper" />

        {/* 1. HERO SECTION */}
        <header className="t125n-hero">
          <img src={`${a}/hero-bg.webp`} alt="" className="t125n-hero-bg" />

          <div className="t125n-hero-card">
            <img src={`${a}/orchid-corner.webp`} alt="" className="t125n-hero-orchid-top" />
            <img src={`${a}/orchid-corner.webp`} alt="" className="t125n-hero-orchid-bottom" />

            <div className="t125n-hero-header-label">Wedding Day</div>

            <div className="t125n-hero-photo-wrapper">
              <img src={`${a}/card-frame.webp`} alt="" className="t125n-hero-photo-frame" />
              <img src={`${a}/hero-photo.webp`} alt="Wedding couple" className="t125n-hero-photo" />
            </div>

            <h2 className="t125n-hero-names">
              {GROOM_SHORT} &amp; {BRIDE_SHORT}
            </h2>

            <div className="t125n-hero-date">20 . 12 . 2026</div>
          </div>
        </header>

        {/* 2. INVITATION LETTER & PARENTS */}
        <section className="t125n-letter">
          <div className="t125n-monogram">
            <span className="t125n-monogram-line" />
            <span>S &amp; H</span>
            <span className="t125n-monogram-line right" />
          </div>

          <div className="t125n-parents-grid">
            <div className="t125n-parent-box">
              <div className="t125n-parent-tag">Nhà Trai</div>
              <div className="t125n-parent-names">
                Ông Đặng Công Sơn<br />Bà Đặng Kim Thủy
              </div>
              <div className="t125n-parent-addr">123 Đường Hoa, P. 1, Q. 1, TP.HCM</div>
            </div>

            <div className="t125n-parent-box">
              <div className="t125n-parent-tag">Nhà Gái</div>
              <div className="t125n-parent-names">
                Ông Mai Quốc Vinh<br />Bà Mai Hoài Tuyết
              </div>
              <div className="t125n-parent-addr">456 Đường Sen, P. 2, Q. 3, TP.HCM</div>
            </div>
          </div>

          <div className="t125n-invite-text-box">
            <div className="t125n-invite-subtitle">Lời Ngỏ Trân Trọng</div>
            <div className="t125n-invite-intro">
              Trân trọng kính mời quý khách đến chung vui tiệc cưới cùng gia đình chúng tôi
            </div>
          </div>

          <div className="t125n-couple-calligraphy">
            {GROOM} &amp; {BRIDE}
          </div>

          <img src={`${a}/orchid-stem.webp`} alt="" className="t125n-stem-decor" />
        </section>

        {/* 3. COUPLE PROFILES */}
        <section className="t125n-couple-section">
          <div className="t125n-sec-title">Cô Dâu &amp; Chú Rể</div>
          <div className="t125n-sec-subtitle">Groom &amp; Bride</div>

          <div className="t125n-couple-cards">
            <div className="t125n-person-card">
              <div className="t125n-person-photo-wrap">
                <img src={`${a}/groom.webp`} alt={GROOM} className="t125n-person-photo" />
              </div>
              <div className="t125n-person-role">Chú Rể</div>
              <div className="t125n-person-name">{GROOM}</div>
              <div className="t125n-person-bio">
                "Cảm ơn em đã bước vào cuộc đời anh, biến những ngày bình thường thành những ngày ngập tràn ý nghĩa."
              </div>
            </div>

            <div className="t125n-person-card">
              <div className="t125n-person-photo-wrap">
                <img src={`${a}/bride.webp`} alt={BRIDE} className="t125n-person-photo" />
              </div>
              <div className="t125n-person-role">Cô Dâu</div>
              <div className="t125n-person-name">{BRIDE}</div>
              <div className="t125n-person-bio">
                "Hạnh phúc là khi được cùng anh già đi, cùng nhau sẻ chia mọi khoảnh khắc trong cuộc sống."
              </div>
            </div>
          </div>
        </section>

        {/* 4. WEDDING PARTY & RECEPTION */}
        <section className="t125n-party">
          <div className="t125n-party-title-tag">Hôn Lễ Được Tổ Chức Vào Lúc</div>
          <div className="t125n-party-time">17:00 • CHỦ NHẬT</div>

          <div className="t125n-date-block">
            <div className="t125n-date-side">Tháng 12</div>
            <div className="t125n-date-main">20</div>
            <div className="t125n-date-side">Năm 2026</div>
          </div>

          <div className="t125n-lunar">{LUNAR}</div>

          <div className="t125n-venue-box">
            <h3 className="t125n-venue-name">Trung tâm Tiệc cưới Hoa Hồng</h3>
            <p className="t125n-venue-addr">123 Đường Hoa, Phường 1, Quận 1, TP.HCM</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="t125n-map-btn"
            >
              <Navigation size={16} />
              <span>Chỉ Đường Đến Hôn Lễ</span>
            </a>
            <iframe
              title="Bản đồ địa điểm cưới"
              src={MAP_EMBED}
              className="t125n-map-embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        {/* 5. CALENDAR SECTION */}
        <section className="t125n-calendar">
          <div className="t125n-sec-title">Lịch Cưới</div>
          <div className="t125n-sec-subtitle">Save The Date</div>

          <div className="t125n-cal-card">
            <img src={`${a}/calendar-frame.webp`} alt="" className="t125n-cal-frame" />
            <div className="t125n-cal-month">December 2026</div>

            <div className="t125n-cal-grid">
              {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((d) => (
                <div key={d} className="t125n-cal-head">{d}</div>
              ))}
              {/* December 2026 starts on Tuesday (offset 1 day) */}
              <div className="t125n-cal-day empty" />
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                <div
                  key={day}
                  className={`t125n-cal-day ${day === 20 ? 'active' : ''}`}
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="t125n-cal-actions">
              <a
                href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Đám Cưới Thái Sơn & Lan Hương')}&dates=20261220T100000Z/20261220T140000Z&details=${encodeURIComponent('Trân trọng kính mời quý khách tham dự tiệc cưới của Thái Sơn & Lan Hương.')}&location=${encodeURIComponent(VENUE)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="t125n-cal-btn primary"
              >
                <CalendarPlus size={15} />
                <span>Google Calendar</span>
              </a>
              <button
                type="button"
                onClick={downloadIcs}
                className="t125n-cal-btn outline"
              >
                <Download size={15} />
                <span>Tải File .ICS</span>
              </button>
            </div>
          </div>
        </section>

        {/* 6. TIMELINE SECTION */}
        <section className="t125n-timeline">
          <div className="t125n-sec-title">Lịch Trình Tiệc Cưới</div>
          <div className="t125n-sec-subtitle">Wedding Timeline</div>

          <div className="t125n-timeline-items">
            {SCHEDULE.map((item, idx) => (
              <div key={idx} className="t125n-timeline-card">
                <div className="t125n-tl-icon-wrap">
                  <img src={item.icon} alt={item.label} className="t125n-tl-icon-img" />
                </div>
                <div>
                  <div className="t125n-tl-time">{item.time}</div>
                  <div className="t125n-tl-label">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. DRESS CODE */}
        <section className="t125n-dress">
          <div className="t125n-sec-title">Trang Phục Tham Dự</div>
          <div className="t125n-sec-subtitle">Dress Code</div>

          <div className="t125n-dress-palette">
            {[
              { color: '#737b49', name: 'Xanh Rêu' },
              { color: '#6b8f7f', name: 'Xanh Sage' },
              { color: '#aac6cb', name: 'Bạc Hà' },
              { color: '#8d9db6', name: 'Slate Blue' },
            ].map((d, i) => (
              <div key={i} className="t125n-dress-dot-wrap">
                <span className="t125n-dress-circle" style={{ backgroundColor: d.color }} />
                <span className="t125n-dress-name">{d.name}</span>
              </div>
            ))}
          </div>

          <p className="t125n-dress-note">
            Quý khách vui lòng chọn trang phục theo bảng màu gợi ý để những khoảnh khắc kỷ niệm thêm phần hài hòa và trọn vẹn.
          </p>
        </section>

        {/* 8. COUNTDOWN TIMER */}
        <section className="t125n-countdown">
          <div className="t125n-sec-title">Hẹn Gặp Quý Khách Trong</div>
          <div className="t125n-sec-subtitle">Countdown to Big Day</div>

          <div className="t125n-cd-grid">
            <div className="t125n-cd-box">
              <div className="t125n-cd-number">{timeLeft.days}</div>
              <div className="t125n-cd-label">Ngày</div>
            </div>
            <div className="t125n-cd-box">
              <div className="t125n-cd-number">{timeLeft.hours}</div>
              <div className="t125n-cd-label">Giờ</div>
            </div>
            <div className="t125n-cd-box">
              <div className="t125n-cd-number">{timeLeft.minutes}</div>
              <div className="t125n-cd-label">Phút</div>
            </div>
            <div className="t125n-cd-box">
              <div className="t125n-cd-number">{timeLeft.seconds}</div>
              <div className="t125n-cd-label">Giây</div>
            </div>
          </div>
        </section>

        {/* 9. PHOTO GALLERY / ALBUM */}
        <section className="t125n-gallery">
          <div className="t125n-sec-title">Album Kỷ Niệm</div>
          <div className="t125n-sec-subtitle">Our Wedding Moments</div>

          <div className="t125n-album-grid">
            {ALBUM.map((src, idx) => (
              <div
                key={idx}
                className={`t125n-album-card ${idx === 0 || idx === 3 ? 'wide' : ''}`}
                onClick={() => setLightboxIndex(idx)}
              >
                <img src={src} alt={`Khoảnh khắc cưới ${idx + 1}`} className="t125n-album-img" loading="lazy" />
              </div>
            ))}
          </div>
        </section>

        {/* 10. GUESTBOOK / WISHES */}
        <section className="t125n-guestbook">
          <div className="t125n-sec-title">Sổ Lưu Bút</div>
          <div className="t125n-sec-subtitle">Gửi Lời Chúc Mừng</div>

          <div className="t125n-ai-suggestions">
            {AI_SUGGESTIONS.map((sug, i) => (
              <button
                key={i}
                type="button"
                className="t125n-ai-chip"
                onClick={() => setGuestMessage(sug)}
              >
                <Sparkles size={12} style={{ display: 'inline', marginRight: 4 }} />
                {sug.slice(0, 32)}…
              </button>
            ))}
          </div>

          <form className="t125n-wish-form" onSubmit={submitWish}>
            <input
              type="text"
              placeholder="Tên của bạn *"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="t125n-input"
              required
            />
            <textarea
              placeholder="Nhập lời chúc tốt đẹp gửi đến cô dâu chú rể… *"
              value={guestMessage}
              onChange={(e) => setGuestMessage(e.target.value)}
              className="t125n-input t125n-textarea"
              required
            />
            <button type="submit" className="t125n-submit-btn">
              Gửi Lời Chúc
            </button>
          </form>

          <div className="t125n-wishes-list">
            {wishes.map((w, idx) => (
              <div key={idx} className="t125n-wish-card">
                <div className="t125n-wish-top">
                  <span className="t125n-wish-name">{w.name}</span>
                  <span className="t125n-wish-time">{w.time}</span>
                </div>
                <p className="t125n-wish-msg">{w.message}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 11. RSVP */}
        <section className="t125n-rsvp">
          <div className="t125n-sec-title">Xác Nhận Tham Dự</div>
          <div className="t125n-sec-subtitle">R.S.V.P</div>

          <div className="t125n-rsvp-card">
            {rsvpState.submitted ? (
              <div className="t125n-rsvp-success">
                <Check size={48} style={{ margin: '0 auto 12px' }} />
                <h4 style={{ margin: '0 0 8px', fontSize: 20 }}>Cảm ơn bạn!</h4>
                <p style={{ margin: 0, fontSize: 15 }}>
                  Chúng mình đã nhận được xác nhận tham dự từ bạn. Rất mong được đón tiếp bạn trong ngày vui!
                </p>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit}>
                <input
                  type="text"
                  placeholder="Họ và tên của bạn *"
                  value={rsvpState.name}
                  onChange={(e) => setRsvpState({ ...rsvpState, name: e.target.value })}
                  className="t125n-input"
                  required
                />
                <input
                  type="tel"
                  placeholder="Số điện thoại"
                  value={rsvpState.phone}
                  onChange={(e) => setRsvpState({ ...rsvpState, phone: e.target.value })}
                  className="t125n-input"
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
                  <select
                    value={rsvpState.guests}
                    onChange={(e) => setRsvpState({ ...rsvpState, guests: e.target.value })}
                    className="t125n-input"
                    style={{ marginBottom: 0 }}
                  >
                    <option value="1">1 Người</option>
                    <option value="2">2 Người</option>
                    <option value="3">3 Người</option>
                    <option value="4+">4+ Người</option>
                  </select>
                  <select
                    value={rsvpState.side}
                    onChange={(e) => setRsvpState({ ...rsvpState, side: e.target.value })}
                    className="t125n-input"
                    style={{ marginBottom: 0 }}
                  >
                    <option value="Nhà Trai">Khách Nhà Trai</option>
                    <option value="Nhà Gái">Khách Nhà Gái</option>
                    <option value="Bạn Chung">Bạn Chung</option>
                  </select>
                </div>
                <textarea
                  placeholder="Ghi chú thêm (nếu có)…"
                  value={rsvpState.note}
                  onChange={(e) => setRsvpState({ ...rsvpState, note: e.target.value })}
                  className="t125n-input t125n-textarea"
                />
                <button type="submit" className="t125n-submit-btn">
                  Xác Nhận Tham Dự
                </button>
              </form>
            )}
          </div>
        </section>

        {/* 12. GIFT BOX / PHONG BAO MỪNG CƯỚI */}
        <section className="t125n-gift">
          <div className="t125n-sec-title">Gửi Quà Mừng Cưới</div>
          <div className="t125n-sec-subtitle">Wedding Gift Box</div>

          <button
            type="button"
            className="t125n-gift-btn-box"
            onClick={() => setGiftOpen(true)}
            aria-label="Mở phong bao mừng cưới"
          >
            <span className="t125n-gift-sparkle" style={{ top: '5%', left: '10%' }}>✦</span>
            <span className="t125n-gift-sparkle" style={{ top: '20%', right: '8%' }}>✦</span>
            <span className="t125n-gift-sparkle" style={{ bottom: '15%', left: '6%' }}>✦</span>
            <img src={`${a}/giftbox.webp`} alt="Giftbox" className="t125n-gift-img" />
          </button>

          <div>
            <button
              type="button"
              className="t125n-open-btn"
              onClick={() => setGiftOpen(true)}
            >
              <span>Nhấn Để Mừng Cưới</span>
              <div className="t125n-btn-shine" />
            </button>
          </div>
        </section>

        {/* 13. THANK YOU */}
        <section className="t125n-thanks">
          <img src={`${a}/orchid-stem.webp`} alt="" className="t125n-thanks-stem" />
          <h2 className="t125n-thanks-title">Thank You</h2>
          <p className="t125n-thanks-text">
            Sự hiện diện và lời chúc phúc của bạn là món quà ý nghĩa nhất đối với chúng mình trong ngày trọng đại này!
          </p>
        </section>

        {/* 14. FOOTER */}
        <footer className="t125n-footer">
          <a
            href="/"
            className="t125n-footer-credit"
          >
            ♡ Thiết kế bởi Lời Hẹn Wedding Studio
          </a>
        </footer>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="t125n-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            <button
              type="button"
              className="t125n-lightbox-close"
              onClick={() => setLightboxIndex(null)}
              aria-label="Đóng"
            >
              <X size={24} />
            </button>

            <button
              type="button"
              className="t125n-lightbox-prev"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev > 0 ? prev - 1 : ALBUM.length - 1));
              }}
              aria-label="Ảnh trước"
            >
              <ChevronLeft size={28} />
            </button>

            <img
              src={ALBUM[lightboxIndex]}
              alt={`Ảnh cưới ${lightboxIndex + 1}`}
              className="t125n-lightbox-img"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              type="button"
              className="t125n-lightbox-next"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev < ALBUM.length - 1 ? prev + 1 : 0));
              }}
              aria-label="Ảnh tiếp"
            >
              <ChevronRight size={28} />
            </button>

            <div className="t125n-lightbox-counter">
              {lightboxIndex + 1} / {ALBUM.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Giftbox Modal */}
      <AnimatePresence>
        {giftOpen && (
          <motion.div
            className="t125n-gift-dialog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setGiftOpen(false)}
          >
            <motion.div
              className="t125n-gift-dialog-card"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="t125n-gift-dialog-head">
                <h3 className="t125n-gift-dialog-title">Phong Bao Mừng Cưới</h3>
                <button
                  type="button"
                  className="t125n-gift-dialog-close"
                  onClick={() => setGiftOpen(false)}
                  aria-label="Đóng"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="t125n-gift-dialog-body">
                {/* Groom QR */}
                <div className="t125n-qr-box">
                  <div className="t125n-qr-title">Chú Rể - {GROOM}</div>
                  <div className="t125n-qr-img-wrap">
                    <img
                      src={`https://img.vietqr.io/image/970436-0123456789-compact2.png?accountName=${encodeURIComponent(GROOM)}`}
                      alt={`QR Chú Rể ${GROOM}`}
                      className="t125n-qr-img"
                    />
                  </div>
                  <div className="t125n-qr-details">
                    <div className="t125n-qr-bank">Vietcombank</div>
                    <div className="t125n-qr-num">0123456789</div>
                    <div className="t125n-qr-holder">{GROOM}</div>
                  </div>
                  <div className="t125n-qr-actions">
                    <button
                      type="button"
                      className="t125n-copy-btn"
                      onClick={() => copyToClipboard('0123456789', 'groom')}
                    >
                      {copiedAccount === 'groom' ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copiedAccount === 'groom' ? 'Đã sao chép' : 'Sao chép STK'}</span>
                    </button>
                    <a
                      href={`https://img.vietqr.io/image/970436-0123456789-compact2.png?accountName=${encodeURIComponent(GROOM)}`}
                      download={`qr-chu-re-${GROOM}.png`}
                      className="t125n-download-qr-btn"
                    >
                      <Download size={14} />
                      <span>Lưu QR</span>
                    </a>
                  </div>
                </div>

                {/* Bride QR */}
                <div className="t125n-qr-box">
                  <div className="t125n-qr-title">Cô Dâu - {BRIDE}</div>
                  <div className="t125n-qr-img-wrap">
                    <img
                      src={`https://img.vietqr.io/image/970422-9876543210-compact2.png?accountName=${encodeURIComponent(BRIDE)}`}
                      alt={`QR Cô Dâu ${BRIDE}`}
                      className="t125n-qr-img"
                    />
                  </div>
                  <div className="t125n-qr-details">
                    <div className="t125n-qr-bank">MBBank</div>
                    <div className="t125n-qr-num">9876543210</div>
                    <div className="t125n-qr-holder">{BRIDE}</div>
                  </div>
                  <div className="t125n-qr-actions">
                    <button
                      type="button"
                      className="t125n-copy-btn"
                      onClick={() => copyToClipboard('9876543210', 'bride')}
                    >
                      {copiedAccount === 'bride' ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copiedAccount === 'bride' ? 'Đã sao chép' : 'Sao chép STK'}</span>
                    </button>
                    <a
                      href={`https://img.vietqr.io/image/970422-9876543210-compact2.png?accountName=${encodeURIComponent(BRIDE)}`}
                      download={`qr-co-dau-${BRIDE}.png`}
                      className="t125n-download-qr-btn"
                    >
                      <Download size={14} />
                      <span>Lưu QR</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
