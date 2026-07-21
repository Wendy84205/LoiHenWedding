import React, { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, Gift, Heart, MapPin, Send } from 'lucide-react';
import WeddingMusicButton from '../WeddingMusicButton.jsx';
import { useCommercialInvitation, useRsvpSubmit, useWishSubmit } from '../../commerce/CommercialInvitationContext.jsx';
import './newInvitationCommon.css';

const directions = {
  up: { y: 54 },
  // Keep above-the-fold labels intersecting the viewport so whileInView can start.
  down: { y: -16 },
  left: { x: 68 },
  right: { x: -68 },
  scale: { scale: 0.72 },
  fade: {},
};

export function Reveal({
  as = 'div',
  direction = 'up',
  delay = 0,
  duration = 1.5,
  rotate = 0,
  className,
  children,
  ...props
}) {
  const Component = motion[as] || motion.div;
  const reduceMotion = useReducedMotion();
  return (
    <Component
      className={className}
      initial={reduceMotion ? false : { opacity: 0, rotate, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: '0px 0px -55px 0px' }}
      transition={reduceMotion ? { duration: 0 } : { duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </Component>
  );
}

function getCountdown(targetDate) {
  const difference = Math.max(0, new Date(targetDate).getTime() - Date.now());
  return [
    Math.floor(difference / 86400000),
    Math.floor((difference / 3600000) % 24),
    Math.floor((difference / 60000) % 60),
    Math.floor((difference / 1000) % 60),
  ];
}

export function useInvitationPage(pageClass, targetDate = '2027-01-24T11:00:00+07:00') {
  const [countdown, setCountdown] = useState(() => getCountdown(targetDate));

  useEffect(() => {
    document.documentElement.classList.add('new-invitation-page');
    document.body.classList.add('new-invitation-page');
    document.documentElement.classList.add(pageClass);
    document.body.classList.add(pageClass);
    const timer = window.setInterval(() => setCountdown(getCountdown(targetDate)), 1000);
    return () => {
      window.clearInterval(timer);
      document.documentElement.classList.remove('new-invitation-page');
      document.body.classList.remove('new-invitation-page');
      document.documentElement.classList.remove(pageClass);
      document.body.classList.remove(pageClass);
    };
  }, [pageClass, targetDate]);

  return countdown;
}

export function MusicButton({ className = '' }) {
  const commerce = useCommercialInvitation();
  return <WeddingMusicButton className={`ni-music ${className}`.trim()} src={commerce?.content.media.music || undefined} />;
}

export function Countdown({ values, className = '', duration = 1.5 }) {
  const labels = ['ngày', 'giờ', 'phút', 'giây'];
  return (
    <div className={`ni-countdown ${className}`}>
      {labels.map((label, index) => (
        <Reveal as="span" key={label} delay={index * 0.08} duration={duration}>
          <b>{values[index]}</b>
          <small>{label}</small>
        </Reveal>
      ))}
    </div>
  );
}

const calendarMonthNames = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER',
];

export function resolveWeddingCalendar({ month = '', date = '', offset = 4, dayCount = 31 }) {
  let year;
  let monthNumber;
  const explicitDate = /^(\d{4})-(\d{1,2})-(\d{1,2})/.exec(String(date));
  if (explicitDate) {
    year = Number(explicitDate[1]);
    monthNumber = Number(explicitDate[2]);
  } else {
    const label = String(month).trim().toUpperCase();
    const fullNumericDate = /(?:^|\D)(\d{1,2})\s*[./-]\s*(\d{1,2})\s*[./-]\s*(20\d{2})(?:\D|$)/.exec(label);
    if (fullNumericDate) {
      monthNumber = Number(fullNumericDate[2]);
      year = Number(fullNumericDate[3]);
    } else {
      const numericMonth = /(?:THÁNG\s*)?(\d{1,2})\s*(?:[·./-]\s*(20\d{2}))?/.exec(label);
      const namedMonth = calendarMonthNames.findIndex((name) => new RegExp(`\\b${name}\\b`).test(label));
      if (namedMonth >= 0) monthNumber = namedMonth + 1;
      else if (numericMonth) monthNumber = Number(numericMonth[1]);
      year = Number(numericMonth?.[2] || label.match(/\b20\d{2}\b/)?.[0] || 2027);
    }
  }

  if (Number.isInteger(year) && Number.isInteger(monthNumber) && monthNumber >= 1 && monthNumber <= 12) {
    const firstWeekday = new Date(year, monthNumber - 1, 1).getDay();
    return {
      offset: (firstWeekday + 6) % 7,
      dayCount: new Date(year, monthNumber, 0).getDate(),
    };
  }
  return { offset, dayCount };
}

export function WeddingCalendar({ month = 'Tháng 01', date = '', weddingDay = 24, offset = 4, dayCount = 31, className = '' }) {
  const calendar = useMemo(
    () => resolveWeddingCalendar({ month, date, offset, dayCount }),
    [date, dayCount, month, offset],
  );
  const days = useMemo(() => [
    ...Array.from({ length: calendar.offset }, (_, index) => `blank-${index}`),
    ...Array.from({ length: calendar.dayCount }, (_, index) => index + 1),
  ], [calendar.dayCount, calendar.offset]);

  return (
    <div className={`ni-calendar ${className}`}>
      <h3>{month}</h3>
      <div className="ni-weekdays">{['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day) => <span key={day}>{day}</span>)}</div>
      <div className="ni-days">
        {days.map((day) => typeof day === 'string'
          ? <span key={day} />
          : (
            <span className={day === weddingDay ? 'is-wedding' : ''} key={day}>
              {day === weddingDay && <Heart fill="currentColor" strokeWidth={0} />}
              <i>{day}</i>
            </span>
          ))}
      </div>
    </div>
  );
}

export function VenueLink({ query = 'Ha Noi', children = 'Xem bản đồ', className = '' }) {
  return (
    <a
      className={`ni-map ${className}`}
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`}
      target="_blank"
      rel="noreferrer"
    >
      <MapPin size={16} /> {children}
    </a>
  );
}

export function RsvpForm({ className = '', accent = '#9b5c5c', compact = false }) {
  const commerce = useCommercialInvitation();
  const rsvp = useRsvpSubmit();
  const [form, setForm] = useState({ fullName: '', phone: '', attendance: 'yes', partySize: 1, note: '' });
  const submit = async (event) => {
    event.preventDefault();
    await rsvp.submit(form);
  };

  return (
    <form className={`ni-rsvp ${compact ? 'is-compact' : ''} ${className}`} style={{ '--rsvp-accent': accent }} onSubmit={submit}>
      <h3>Xác nhận tham dự</h3>
      <label>Họ và tên<input required placeholder="Nhập tên của bạn" value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} /></label>
      {commerce && <label>Số điện thoại<input inputMode="tel" placeholder="Số điện thoại" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} /></label>}
      <fieldset>
        <legend>Bạn sẽ tham dự chứ?</legend>
        <label><input type="radio" name={`attendance-${className}`} checked={form.attendance === 'yes'} onChange={() => setForm({ ...form, attendance: 'yes' })} /> Có, tôi sẽ tham dự</label>
        <label><input type="radio" name={`attendance-${className}`} checked={form.attendance === 'no'} onChange={() => setForm({ ...form, attendance: 'no' })} /> Rất tiếc, tôi không thể tham dự</label>
      </fieldset>
      <label>Số người tham dự<select value={form.partySize} onChange={(event) => setForm({ ...form, partySize: Number(event.target.value) })}><option value="1">1 người</option><option value="2">2 người</option><option value="3">3 người</option><option value="4">4 người</option></select></label>
      {commerce && <label>Lời nhắn<input placeholder="Lời nhắn cho cô dâu chú rể" value={form.note} onChange={(event) => setForm({ ...form, note: event.target.value })} /></label>}
      <button type="submit" disabled={rsvp.status === 'loading'}><Send size={15} /> {rsvp.status === 'loading' ? 'Đang gửi...' : 'Gửi xác nhận'}</button>
      {rsvp.status === 'success' && <span className="ni-rsvpSuccess" role="status"><Check size={14} /> Cảm ơn bạn đã phản hồi.</span>}
      {rsvp.status === 'error' && <span className="ni-rsvpError" role="alert">{rsvp.error}</span>}
    </form>
  );
}

export function WishForm({ className = '', accent = '#9b5c5c' }) {
  const wish = useWishSubmit();
  const [form, setForm] = useState({ fullName: '', message: '' });
  const submit = async (event) => {
    event.preventDefault();
    const success = await wish.submit(form);
    if (success) setForm({ fullName: '', message: '' });
  };

  return (
    <form className={`ni-wish ${className}`} style={{ '--wish-accent': accent }} onSubmit={submit}>
      <h3>Gửi lời chúc</h3>
      <label>Họ và tên<input required placeholder="Tên của bạn" value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} /></label>
      <label>Lời chúc<textarea required minLength={2} maxLength={500} rows="3" placeholder="Lời chúc dành cho cô dâu chú rể" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} /></label>
      <button type="submit" disabled={wish.status === 'loading'}><Send size={15} /> {wish.status === 'loading' ? 'Đang gửi...' : 'Gửi lời chúc'}</button>
      {wish.status === 'success' && <span className="ni-rsvpSuccess" role="status"><Check size={14} /> Lời chúc đã được gửi và đang chờ cô dâu chú rể duyệt.</span>}
      {wish.status === 'error' && <span className="ni-rsvpError" role="alert">{wish.error}</span>}
    </form>
  );
}

export function GiftNote({ className = '', title = 'Hộp quà cưới', children }) {
  return (
    <Reveal className={`ni-gift ${className}`} direction="scale" duration={1.5}>
      <Gift aria-hidden="true" />
      <h3>{title}</h3>
      <p>{children || 'Sự hiện diện và lời chúc của bạn là món quà ý nghĩa nhất đối với chúng mình.'}</p>
    </Reveal>
  );
}

export function FallingDecor({ symbols = ['✦', '♡', '·'], count = 12, className = '' }) {
  return (
    <div className={`ni-falling ${className}`} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <i
          key={`${symbols[index % symbols.length]}-${index}`}
          style={{
            '--fall-left': `${(index * 37) % 100}%`,
            '--fall-delay': `${(index % 6) * -1.1}s`,
            '--fall-duration': `${7 + (index % 5)}s`,
          }}
        >
          {symbols[index % symbols.length]}
        </i>
      ))}
    </div>
  );
}
