import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  Heart,
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

function AmbientOrchids({ className = 't125n-ambient' }) {
  return (
    <div className={className} aria-hidden="true">
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

const T125N_IN = {
  up: { opacity: 0, y: 54 },
  down: { opacity: 0, y: -16 },
  left: { opacity: 0, x: 68 },
  right: { opacity: 0, x: -68 },
  scale: { opacity: 0, scale: 0.72 },
  fade: { opacity: 0 },
};

const T125N_EASE = [0.22, 1, 0.36, 1];

const COVER_SPARKLES = [
  { left: '12%', top: '22%', size: 13, delay: 0, dur: 3.4 },
  { left: '20%', top: '68%', size: 10, delay: 0.9, dur: 4.1 },
  { left: '32%', top: '16%', size: 12, delay: 1.7, dur: 3.8 },
  { left: '48%', top: '30%', size: 9, delay: 0.4, dur: 3.1 },
  { left: '63%', top: '14%', size: 14, delay: 1.2, dur: 4.4 },
  { left: '72%', top: '56%', size: 10, delay: 2, dur: 3.6 },
  { left: '81%', top: '28%', size: 12, delay: 0.6, dur: 3.9 },
  { left: '88%', top: '72%', size: 11, delay: 1.4, dur: 4.2 },
];

const COVER_BURST = Array.from({ length: 22 }, (_, i) => {
  const angle = (i / 22) * Math.PI * 2 + 0.18;
  return {
    x: Math.cos(angle) * (104 + (i % 5) * 22),
    y: Math.sin(angle) * (84 + (i % 4) * 18),
    size: 8 + (i % 4) * 3,
    rotate: (i % 2 === 0 ? 1 : -1) * (90 + i * 18),
    color: i % 3 === 0 ? '#ffffff' : i % 3 === 1 ? '#dfe6c8' : '#c9cfa9',
  };
});

function T125nReveal({
  as = 'div',
  direction = 'up',
  delay = 0,
  duration = 1.5,
  className,
  children,
  ...props
}) {
  const reduceMotion = useReducedMotion();
  // Plain <img>, không bọc motion để giữ bố cục position/absolute của thư viện.
  if (as === 'img') {
    return (
      <img
        className={className}
        src={props.src}
        alt={props.alt}
        loading={props.loading}
        aria-hidden={props['aria-hidden']}
      />
    );
  }

  const motionAny = motion;
  const Component =
    (typeof as === 'string' && motionAny[as]) || motionAny.div;

  return (
    <Component
      className={className}
      initial={reduceMotion ? false : { ...T125N_IN[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -55px 0px' }}
      transition={reduceMotion ? { duration: 0 } : { duration, delay, ease: T125N_EASE }}
      {...props}
    >
      {children}
    </Component>
  );
}

function Cover({ onOpen, isOpening }) {
  const reduce = useReducedMotion();
  const cardAnim = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 54, scale: 0.94 },
        animate: isOpening
          ? { opacity: 1, y: -26, scale: 1.06 }
          : { opacity: 1, y: 0, scale: 1 },
        transition: { duration: isOpening ? 0.55 : 0.9, ease: [0.22, 1, 0.36, 1] },
      };
  const itemAnim = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
        };
  return (
    <motion.div
      className={`t125n-coverOverlay ${isOpening ? 't125n-coverOverlay--opening' : ''}`}
      aria-label="Bìa thiệp cưới"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.12, filter: 'blur(10px)' }}
      transition={{ duration: reduce ? 0.01 : 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="t125n-coverGlow" aria-hidden="true" />
      <span className="t125n-coverSparkles" aria-hidden="true">
        {COVER_SPARKLES.map((s, i) => (
          <i
            key={i}
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.dur}s`,
            }}
          />
        ))}
      </span>
      <AmbientOrchids className="t125n-coverPetals" />

      {/* Main Cover Card */}
      <motion.div className="t125n-coverCard" {...cardAnim}>
        <img
          src={`${a}/orchid-bouquet-left.webp`}
          alt=""
          aria-hidden="true"
          className="t125n-coverDecorTop"
        />
        <img
          src={`${a}/orchid-bouquet-left.webp`}
          alt=""
          aria-hidden="true"
          className="t125n-coverDecorBottom"
        />

        <motion.button
          type="button"
          className="t125n-coverHeartIcon"
          onClick={onOpen}
          disabled={isOpening}
          aria-label="Mở thiệp bằng nút trái tim"
          title="Nhấn để mở thiệp"
          {...itemAnim(0.15)}
        >
          {isOpening && <span className="t125n-heartShockwave" aria-hidden="true" />}
          <Heart size={28} fill="currentColor" strokeWidth={0} aria-hidden="true" />
        </motion.button>

        <motion.h1 className="t125n-coverNames" {...itemAnim(0.3)}>
          <span>{GROOM_SHORT}</span>
          <span className="t125n-coverAmp">&amp;</span>
          <span>{BRIDE_SHORT}</span>
        </motion.h1>

        <motion.p className="t125n-coverDateVi" {...itemAnim(0.45)}>
          20 tháng 12, 2026
        </motion.p>
        <motion.p className="t125n-coverInviteLabel" {...itemAnim(0.55)}>
          Thân Mời
        </motion.p>

        <motion.button
          type="button"
          className="t125n-coverOpenBtn"
          onClick={onOpen}
          disabled={isOpening}
          aria-busy={isOpening}
          aria-label="Mở thiệp cưới"
          {...itemAnim(0.65)}
        >
          <span>{isOpening ? 'Đang mở…' : 'Mở thiệp'}</span>
          <span className="t125n-shine" aria-hidden="true" />
        </motion.button>
      </motion.div>

      {isOpening && !reduce && (
        <span className="t125n-coverBurst" aria-hidden="true">
          {COVER_BURST.map((b, i) => (
            <i
              key={i}
              style={{
                '--bx': `${b.x}px`,
                '--by': `${b.y}px`,
                '--br': `${b.rotate}deg`,
                width: b.size,
                height: b.size,
                background: b.color,
              }}
            />
          ))}
        </span>
      )}
    </motion.div>
  );
}

export default function Template125New() {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [veilGone, setVeilGone] = useState(true);
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
  const openTimerRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    return () => clearTimeout(openTimerRef.current);
  }, []);

  useEffect(() => {
    if (opened) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [opened]);

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

  // Fade the cover away, then reveal the invitation and start its entrance animations.
  const handleOpen = () => {
    if (openTimerRef.current !== null || opened || opening) return;
    setOpening(true);
    setVeilGone(false);
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
    openTimerRef.current = setTimeout(() => {
      setOpened(true);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setVeilGone(true);
        });
      });
      openTimerRef.current = setTimeout(() => {
        setOpening(false);
        openTimerRef.current = null;
      }, reduceMotion ? 0 : 1250);
    }, reduceMotion ? 0 : 880);
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

  return (
    <div className="t125n" data-testid="orchid-olive-template">
      {/* Background audio */}
      <audio ref={audioRef} src={`${a}/music.mp3`} loop preload="metadata" />

      {/* Floating Audio Control — luôn hiển thị kể cả trên bìa */}
      <button
        type="button"
        onClick={toggleMusic}
        className={`t125n-audio-btn ${isPlaying ? 'playing' : ''}`}
        aria-label={isPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
      >
        {isPlaying ? <Volume2 size={22} /> : <VolumeX size={22} />}
      </button>

      {/* Ambient Orchid Petals */}
      {opened && <AmbientOrchids />}

      {/* Cover / Bìa mở đầu (phong bì đậy lên trên thiệp chính) */}
      <AnimatePresence mode="wait">
        {!opened && (
          <Cover
            key="cover"
            onOpen={handleOpen}
            isOpening={opening}
          />
        )}
      </AnimatePresence>

      {/* Thiệp chính (Main Invitation) */}
      {!veilGone && (
        <div className="t125n-openVeil" aria-hidden="true">
          <span className="t125n-openVeil-ring" />
          <span className="t125n-openVeil-ring t125n-openVeil-ring--late" />
          <span className="t125n-openVeil-flash" />
          <span className="t125n-openVeil-bloom">
            {Array.from({ length: 30 }).map((_, i) => {
              const angle = (i / 30) * Math.PI * 2;
              const dist = 120 + (i % 5) * 34;
              return (
                <i
                  key={i}
                  style={{
                    '--vx': `${Math.cos(angle) * dist}px`,
                    '--vy': `${Math.sin(angle) * dist}px`,
                    '--vr': `${(i % 2 === 0 ? 1 : -1) * (120 + i * 23)}deg`,
                    width: 7 + (i % 4) * 3,
                    height: 7 + ((i + 2) % 4) * 3,
                    background: i % 3 === 0 ? '#ffffff' : i % 3 === 1 ? '#dfe6c8' : '#c9cfa9',
                    animationDelay: `${(i % 10) * 0.018}s`,
                  }}
                />
              );
            })}
          </span>
        </div>
      )}
      <motion.div
        className={`t125n-sheet ${opened ? 't125n-sheet--entered' : ''}`}
        aria-hidden={!opened}
        initial={false}
        animate={opened && !reduceMotion ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : {}}
        transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="t125n-paper" />

        {/* 1. HERO SECTION */}
        <header className="t125n-hero">
          <img src={`${a}/hero-bg.webp`} alt="" className="t125n-hero-bg" />

          <T125nReveal as="div" direction="fade" duration={1.2} className="t125n-hero-card" />
          <T125nReveal as="div" direction="down" duration={1.2} className="t125n-hero-label">
            Wedding Day
          </T125nReveal>

          <T125nReveal as="div" direction="scale" duration={1.4} className="t125n-hero-photo">
            <img src={`${a}/hero-photo.webp`} alt="Wedding couple" />
          </T125nReveal>

          <h2 className="t125n-hero-names">
            <T125nReveal
              as="span"
              direction="left"
              duration={1.2}
              delay={0.15}
              className="t125n-hero-name t125n-hero-name-groom"
            >
              {GROOM_SHORT}
            </T125nReveal>
            <T125nReveal
              as="span"
              direction="fade"
              duration={1.2}
              delay={0.3}
              className="t125n-hero-name t125n-hero-name-and"
            >
              and
            </T125nReveal>
            <T125nReveal
              as="span"
              direction="right"
              duration={1.2}
              delay={0.45}
              className="t125n-hero-name t125n-hero-name-bride"
            >
              {BRIDE_SHORT}
            </T125nReveal>
          </h2>
        </header>

        {/* 2. ENVELOPE, MONOGRAM & PARENTS (demo: hlx-envelope) */}
        <section className="t125n-envelope">
          <T125nReveal as="img" direction="fade" duration={1.2} src={`${a}/orchid-bouquet-left.webp`} alt="" aria-hidden="true" className="t125n-env-abs t125n-env-bouquet-left" />
          <T125nReveal as="img" direction="up" duration={1.2} src={`${a}/envelope-back.webp`} alt="" aria-hidden="true" className="t125n-env-abs t125n-env-back" />

          {[
            { cls: 't125n-env-polaroid-1', photo: ALBUM[0] },
            { cls: 't125n-env-polaroid-2', photo: ALBUM[1] },
            { cls: 't125n-env-polaroid-3', photo: ALBUM[2] },
          ].map(({ cls, photo }, idx) => (
            <T125nReveal key={cls} direction="up" duration={1.4} delay={idx * 0.15} className={`t125n-env-polaroid ${cls}`}>
              <img
                src={`${a}/polaroid-frame.webp`}
                alt=""
                aria-hidden="true"
                className="t125n-env-pola-frame"
              />
              <div className="t125n-env-pola-photo">
                <img src={photo} alt="Ảnh cưới" loading="lazy" />
              </div>
            </T125nReveal>
          ))}

          <T125nReveal as="img" direction="up" duration={1.2} src={`${a}/envelope-front.webp`} alt="" aria-hidden="true" className="t125n-env-abs t125n-env-front" />
          <T125nReveal as="img" direction="fade" duration={1.2} src={`${a}/orchid-bouquet-right.webp`} alt="" aria-hidden="true" className="t125n-env-abs t125n-env-bouquet-right" />

          <T125nReveal direction="right" className="t125n-env-monogram">S &amp; H</T125nReveal>

          <T125nReveal direction="left" className="t125n-env-family t125n-env-family-groom">
            <div className="t125n-env-family-label">Nhà trai</div>
            <div className="t125n-env-family-parents">
              <div>Ông Đặng Công Sơn</div>
              <div>Bà Đặng Kim Thủy</div>
            </div>
            <div className="t125n-env-family-address">123 Đường Hoa, Phường 1, Quận 1, TP.HCM</div>
          </T125nReveal>

          <T125nReveal direction="right" className="t125n-env-family t125n-env-family-bride">
            <div className="t125n-env-family-label">Nhà gái</div>
            <div className="t125n-env-family-parents">
              <div>Ông Mai Quốc Vinh</div>
              <div>Bà Mai Hoài Tuyết</div>
            </div>
            <div className="t125n-env-family-address">456 Đường Sen, Phường 2, Quận 3, TP.HCM</div>
          </T125nReveal>

          <T125nReveal direction="fade" className="t125n-env-intro">
            Trân trọng kính mời<br />
            quý khách đến chung vui<br />
            tiệc cưới cùng gia đình chúng tôi
          </T125nReveal>

          <img
            src={`${a}/orchid-stem.webp`}
            alt=""
            aria-hidden="true"
            className="t125n-env-abs t125n-env-stem"
          />

          <T125nReveal
            direction="left"
            className="t125n-env-script t125n-env-name-groom"
            style={{ '--len': GROOM_SHORT.replace(/\s/g, '').length }}
          >
            {GROOM_SHORT}
          </T125nReveal>
          <T125nReveal direction="fade" className="t125n-env-script t125n-env-name-and">and</T125nReveal>
          <T125nReveal
            direction="right"
            className="t125n-env-script t125n-env-name-bride"
            style={{ '--len': BRIDE_SHORT.replace(/\s/g, '').length }}
          >
            {BRIDE_SHORT}
          </T125nReveal>
        </section>

        {/* 3. COUPLE PROFILES */}
        <section className="t125n-couple-section">
          <T125nReveal direction="down" className="t125n-sec-title">
            Cô Dâu &amp; Chú Rể
          </T125nReveal>
          <T125nReveal direction="up" className="t125n-sec-subtitle">
            Groom &amp; Bride
          </T125nReveal>

          <div className="t125n-couple-cards">
            <T125nReveal direction="up" delay={0.1} className="t125n-person-card">
              <div className="t125n-person-photo-wrap">
                <img src={`${a}/groom.webp`} alt={GROOM} className="t125n-person-photo" />
              </div>
              <div className="t125n-person-role">Chú Rể</div>
              <div className="t125n-person-name">{GROOM}</div>
              <div className="t125n-person-bio">
                "Cảm ơn em đã bước vào cuộc đời anh, biến những ngày bình thường thành những ngày ngập tràn ý nghĩa."
              </div>
            </T125nReveal>

            <T125nReveal direction="up" delay={0.3} className="t125n-person-card">
              <div className="t125n-person-photo-wrap">
                <img src={`${a}/bride.webp`} alt={BRIDE} className="t125n-person-photo" />
              </div>
              <div className="t125n-person-role">Cô Dâu</div>
              <div className="t125n-person-name">{BRIDE}</div>
              <div className="t125n-person-bio">
                "Hạnh phúc là khi được cùng anh già đi, cùng nhau sẻ chia mọi khoảnh khắc trong cuộc sống."
              </div>
            </T125nReveal>
          </div>
        </section>

        {/* 4. WEDDING PARTY & RECEPTION */}
        <section className="t125n-party">
          <T125nReveal direction="down" className="t125n-party-title-tag">
            Hôn Lễ Được Tổ Chức Vào Lúc
          </T125nReveal>
          <T125nReveal direction="up" className="t125n-party-time">
            17:00 • CHỦ NHẬT
          </T125nReveal>

          <div className="t125n-date-block">
            <T125nReveal direction="left" className="t125n-date-side">
              Tháng 12
            </T125nReveal>
            <T125nReveal direction="scale" className="t125n-date-main">
              20
            </T125nReveal>
            <T125nReveal direction="right" className="t125n-date-side">
              Năm 2026
            </T125nReveal>
          </div>

          <T125nReveal direction="up" className="t125n-lunar">
            {LUNAR}
          </T125nReveal>

          <T125nReveal direction="fade" className="t125n-venue-box">
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
          </T125nReveal>
        </section>

        {/* 5. CALENDAR (demo: hlx-calendar) */}
        <section className="t125n-calendar">
          <T125nReveal direction="up" className="t125n-cal-month" style={{ '--len': 8 }}>
            December
          </T125nReveal>
          <T125nReveal direction="up" className="t125n-cal-year">
            2026
          </T125nReveal>
          <T125nReveal direction="up" className="t125n-cal-rule t125n-cal-rule-left" />
          <T125nReveal direction="up" className="t125n-cal-rule t125n-cal-rule-right" />

          {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((d, i) => (
            <T125nReveal
              key={d}
              direction="up"
              duration={1.2}
              delay={i * 0.1}
              className="t125n-cal-cell t125n-cal-weekday"
              style={{ left: `calc(var(--k) * ${(14.75 + i * 55.7).toFixed(2)})` }}
            >
              {d}
            </T125nReveal>
          ))}

          {/* December 2026 starts on Tuesday */}
          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
            const col = day % 7;
            const row = Math.floor(day / 7);
            return (
              <T125nReveal
                key={day}
                direction="up"
                duration={1.2}
                delay={(col + row * 7) * 0.06}
                className="t125n-cal-cell"
                style={{
                  left: `calc(var(--k) * ${(14.75 + col * 55.7).toFixed(2)})`,
                  top: `calc(var(--k) * ${(208.45 + row * 44.6).toFixed(2)})`,
                }}
              >
                {day}
              </T125nReveal>
            );
          })}

          <T125nReveal direction="up" className="t125n-cal-heart">
            <img src={`${a}/heart-ring.webp`} alt="" aria-hidden="true" loading="lazy" />
          </T125nReveal>
        </section>

        {/* 6. TIMELINE (demo: hlx-timeline) */}
        <section className="t125n-timeline">
          <T125nReveal direction="down" className="t125n-tl-title" style={{ '--len': 8 }}>
            Timeline
          </T125nReveal>

          {[
            { icon: `${a}/tl-camera.webp`, time: '17:00', label: 'Đón Khách' },
            { icon: `${a}/tl-rings.webp`, time: '17:30', label: 'Làm Lễ' },
            { icon: `${a}/tl-dinner.webp`, time: '18:00', label: 'Khai Tiệc' },
          ].map((item, idx) => (
            <T125nReveal
              key={item.time}
              direction="up"
              duration={1.3}
              delay={idx * 0.2}
              className="t125n-tl-row"
            >
              <img src={item.icon} alt="" aria-hidden="true" className="t125n-tl-icon" loading="lazy" />
              <div className="t125n-tl-rule" />
              <div className="t125n-tl-text">
                {item.time}
                {'  '}
                {item.label}
              </div>
            </T125nReveal>
          ))}
        </section>

        {/* 7. DRESS CODE (demo: hlx-dress) */}
        <section className="t125n-dress">
          <div className="t125n-dress-head">
            <T125nReveal direction="down" className="t125n-dress-title" style={{ '--len': 10 }}>
              Dress Code
            </T125nReveal>
            <div className="t125n-dress-dots">
              {['#737b49', '#6b8f7f', '#aac6cb', '#8d9db6'].map((color, idx) => (
                <T125nReveal
                  key={color}
                  direction="up"
                  duration={1}
                  delay={idx * 0.15}
                  className="t125n-dress-dot"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 8. COUNTDOWN TIMER */}
        <section className="t125n-countdown">
          <T125nReveal direction="down" className="t125n-sec-title">
            Hẹn Gặp Quý Khách Trong
          </T125nReveal>
          <T125nReveal direction="up" className="t125n-sec-subtitle">
            Countdown to Big Day
          </T125nReveal>

          <div className="t125n-cd-grid">
            <T125nReveal direction="up" delay={0.2} className="t125n-cd-box">
              <div className="t125n-cd-number">{timeLeft.days}</div>
              <div className="t125n-cd-label">Ngày</div>
            </T125nReveal>
            <T125nReveal direction="up" delay={0.4} className="t125n-cd-box">
              <div className="t125n-cd-number">{timeLeft.hours}</div>
              <div className="t125n-cd-label">Giờ</div>
            </T125nReveal>
            <T125nReveal direction="up" delay={0.6} className="t125n-cd-box">
              <div className="t125n-cd-number">{timeLeft.minutes}</div>
              <div className="t125n-cd-label">Phút</div>
            </T125nReveal>
            <T125nReveal direction="up" delay={0.8} className="t125n-cd-box">
              <div className="t125n-cd-number">{timeLeft.seconds}</div>
              <div className="t125n-cd-label">Giây</div>
            </T125nReveal>
          </div>
        </section>

        {/* 9. PHOTO GALLERY / ALBUM */}
        <section className="t125n-gallery">
          <T125nReveal direction="down" className="t125n-sec-title">
            Album Kỷ Niệm
          </T125nReveal>
          <T125nReveal direction="up" className="t125n-sec-subtitle">
            Our Wedding Moments
          </T125nReveal>

          <div className="t125n-album-grid">
            {ALBUM.map((src, idx) => (
              <T125nReveal
                key={idx}
                direction="up"
                duration={1}
                delay={idx * 0.15}
                className={`t125n-album-card ${idx === 0 || idx === 3 ? 'wide' : ''}`}
                onClick={() => setLightboxIndex(idx)}
              >
                <img
                  src={src}
                  alt={`Khoảnh khắc cưới ${idx + 1}`}
                  className="t125n-album-img"
                  loading="lazy"
                />
              </T125nReveal>
            ))}
          </div>
        </section>

        {/* 10. GUESTBOOK / WISHES */}
        <section className="t125n-guestbook">
          <T125nReveal direction="down" className="t125n-sec-title">
            Sổ Lưu Bút
          </T125nReveal>
          <T125nReveal direction="up" className="t125n-sec-subtitle">
            Gửi Lời Chúc Mừng
          </T125nReveal>

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
              <T125nReveal
                key={idx}
                direction="up"
                duration={0.9}
                delay={idx * 0.1}
                className="t125n-wish-card"
              >
                <div className="t125n-wish-top">
                  <span className="t125n-wish-name">{w.name}</span>
                  <span className="t125n-wish-time">{w.time}</span>
                </div>
                <p className="t125n-wish-msg">{w.message}</p>
              </T125nReveal>
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
          <T125nReveal direction="down" className="t125n-sec-title">
            Gửi Quà Mừng Cưới
          </T125nReveal>
          <T125nReveal direction="up" className="t125n-sec-subtitle">
            Wedding Gift Box
          </T125nReveal>

          <T125nReveal
            direction="up"
            duration={1.2}
            className="t125n-gift-btn-box"
            onClick={() => setGiftOpen(true)}
            aria-label="Mở phong bao mừng cưới"
          >
            <span className="t125n-gift-sparkle" style={{ top: '5%', left: '10%' }}>
              ✦
            </span>
            <span className="t125n-gift-sparkle" style={{ top: '20%', right: '8%' }}>
              ✦
            </span>
            <span className="t125n-gift-sparkle" style={{ bottom: '15%', left: '6%' }}>
              ✦
            </span>
            <img src={`${a}/giftbox.webp`} alt="Giftbox" className="t125n-gift-img" />
          </T125nReveal>

          <T125nReveal direction="up" className="t125n-open-btn" onClick={() => setGiftOpen(true)}>
            <span>Nhấn Để Mừng Cưới</span>
            <div className="t125n-btn-shine" />
          </T125nReveal>
        </section>

        {/* 13. THANK YOU */}
        <section className="t125n-thanks">
          <T125nReveal direction="up" className="t125n-thanks-stem">
            <img src={`${a}/orchid-stem.webp`} alt="" />
          </T125nReveal>
          <T125nReveal direction="up" className="t125n-thanks-title">
            Thank You
          </T125nReveal>
          <T125nReveal direction="up" className="t125n-thanks-text">
            Sự hiện diện và lời chúc phúc của bạn là món quà ý nghĩa nhất đối với chúng mình trong ngày trọng đại này!
          </T125nReveal>
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
      </motion.div>

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
