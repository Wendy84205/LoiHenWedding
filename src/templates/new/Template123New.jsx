import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import WeddingMusicButton from '../WeddingMusicButton.jsx';
import './template123New.css';

const a = '/assets/new-templates/thiep-cuoi-123';

const GROOM_NAME = 'Trần Đăng Khoa';
const BRIDE_NAME = 'Nguyễn Mỹ Duyên';
const GROOM_SHORT = 'Đăng Khoa';
const BRIDE_SHORT = 'Mỹ Duyên';
const WEDDING_DATE_STR = '2026-12-19T18:00:00';
const WEDDING_DAY = 19;
const WEDDING_MONTH = 12;
const WEDDING_YEAR = 2026;

const ALBUM_IMAGES = [
  `${a}/gallery-1.webp`,
  `${a}/gallery-2.webp`,
  `${a}/gallery-3.webp`,
  `${a}/gallery-4.webp`,
  `${a}/gallery-5.webp`,
  `${a}/gallery-6.webp`,
  `${a}/gallery-7.webp`,
];

const LEAVES = [
  { left: 10, size: 14, color: '#6b7b4f', dur: 22, delay: 0, sway: 15 },
  { left: 24, size: 18, color: '#cdd9bd', dur: 25, delay: -5, sway: -20 },
  { left: 38, size: 12, color: '#87a172', dur: 19, delay: -12, sway: 25 },
  { left: 52, size: 22, color: '#6b7b4f', dur: 24, delay: -3, sway: -18 },
  { left: 66, size: 16, color: '#a7bd8f', dur: 21, delay: -8, sway: 22 },
  { left: 80, size: 20, color: '#cdd9bd', dur: 26, delay: -15, sway: -14 },
  { left: 92, size: 13, color: '#87a172', dur: 20, delay: -2, sway: 18 },
  { left: 18, size: 15, color: '#6b7b4f', dur: 23, delay: -18, sway: -22 },
  { left: 45, size: 17, color: '#a7bd8f', dur: 22, delay: -9, sway: 16 },
  { left: 74, size: 14, color: '#6b7b4f', dur: 24, delay: -14, sway: -12 },
  { left: 88, size: 19, color: '#cdd9bd', dur: 20, delay: -7, sway: 20 },
  { left: 6, size: 12, color: '#87a172', dur: 25, delay: -11, sway: -16 },
];

function AmbientLeaves() {
  return (
    <div className="t123n-ambient" aria-hidden="true">
      {LEAVES.map((l, i) => (
        <span
          key={i}
          className="t123n-ambientLeaf"
          style={{
            left: `${l.left}%`,
            fontSize: `${l.size}px`,
            color: l.color,
            '--sway': `${l.sway}px`,
            animation: `t123n-fall ${l.dur}s ease-in-out ${l.delay}s infinite`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
          </svg>
        </span>
      ))}
    </div>
  );
}

function Cover({ onOpen, isOpening }) {
  return (
    <div
      className={`t123n-cover ${isOpening ? 't123n-cover--opening' : ''}`}
      dir="ltr"
      data-landing-screenshot-id="invite-envelope"
    >
      <AmbientLeaves />
      <div className="t123n-coverWrap">
        <div
          className="t123n-seal"
          aria-hidden="true"
          onClick={onOpen}
          role="button"
          tabIndex={0}
          title="Nhấn để mở thiệp"
        >
          {isOpening && <span className="t123n-sealShockwave" aria-hidden="true" />}
          <svg viewBox="0 0 24 24" className="t123n-sealHeart" aria-hidden="true">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <div className="t123n-coverCard">
          <div className="t123n-coverCardBg" aria-hidden="true">
            <img
              src={`${a}/flower-background.webp`}
              alt=""
              aria-hidden="true"
              className="t123n-flowerCornerTop"
            />
            <img
              src={`${a}/flower-background.webp`}
              alt=""
              aria-hidden="true"
              className="t123n-flowerCornerBottom"
            />
          </div>
          <div className="t123n-coverBody">
            <h1 className="t123n-coverName">
              <span>{GROOM_SHORT}</span>
              <span className="t123n-coverAmp">&amp;</span>
              <span>{BRIDE_SHORT}</span>
            </h1>
            <div className="t123n-ornament"><i /><span>❦</span><i /></div>
            <p className="t123n-coverDate">19 tháng 12, 2026</p>
            <div className="t123n-coverInviteWrap">
              <p className="t123n-coverInvite">Thân Mời</p>
            </div>
            <button
              type="button"
              className="t123n-openBtn"
              onClick={onOpen}
              disabled={isOpening}
            >
              <span>{isOpening ? 'Đang mở...' : 'Mở thiệp'}</span>
              <div className="t123n-btnShine" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AlbumCarousel3D({ onSelectImage, onSelect }) {
  const handleSelect = onSelectImage || onSelect;
  const [active, setActive] = useState(0);
  const count = ALBUM_IMAGES.length;
  const autoRef = useRef(null);

  const go = useCallback((dir) => {
    setActive((prev) => (prev + dir + count) % count);
  }, [count]);

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
    startAuto();
  };

  return (
    <div className="t123n-albumWrap">
      <div className="t123n-albumStage">
        <button
          type="button"
          aria-label="Previous photo"
          className="t123n-albumNavBtn t123n-albumNavBtn--prev"
          onClick={() => handleNav(-1)}
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          aria-label="Next photo"
          className="t123n-albumNavBtn t123n-albumNavBtn--next"
          onClick={() => handleNav(1)}
        >
          <ChevronRight size={22} />
        </button>

        <div className="t123n-album3dViewport">
          {ALBUM_IMAGES.map((src, i) => {
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
                className={`t123n-albumSlideCard ${i === active ? 't123n-albumSlideCard--active' : ''}`}
                style={style}
                onClick={() => {
                  if (i === active && handleSelect) handleSelect(i);
                  else { setActive(i); startAuto(); }
                }}
              >
                <img src={src} alt={`Ảnh cưới ${i + 1}`} loading="lazy" />
              </div>
            );
          })}
        </div>
      </div>

      <div className="t123n-albumDots">
        {ALBUM_IMAGES.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`t123n-albumDot ${i === active ? 't123n-albumDot--active' : ''}`}
            onClick={() => { setActive(i); startAuto(); }}
            aria-label={`Chuyển đến ảnh ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    function update() {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    }
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

export default function Template123New() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const [showRsvp, setShowRsvp] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [activeGiftTab, setActiveGiftTab] = useState('groom');
  const [copiedKey, setCopiedKey] = useState(null);

  const [wishes, setWishes] = useState([
    { name: 'Minh Tuấn', message: 'Chúc mừng hạnh phúc hai bạn nhé! Trăm năm hạnh phúc, sớm có tin vui!', time: '18:31:14 9/7/2026' },
    { name: 'Thu Hà', message: 'Ôi đẹp đôi quá! Chúc hai bạn mãi mãi bên nhau, yêu thương trọn đời.', time: '18:31:14 9/7/2026' },
    { name: 'Hoàng Nam', message: 'Chúc anh chị trăm năm hạnh phúc, con đàn cháu đống!', time: '18:31:14 9/7/2026' },
    { name: 'Lan Anh', message: 'Mừng đám cưới của hai bạn! Chúc luôn vui vẻ và ngập tràn yêu thương.', time: '18:31:14 9/7/2026' },
    { name: 'Đức Long', message: 'Chúc mừng Đăng Khoa & Mỹ Duyên trăm năm viên mãn!', time: '18:31:14 9/7/2026' },
  ]);
  const [guestName, setGuestName] = useState('');
  const [guestWish, setGuestWish] = useState('');

  const countdown = useCountdown(WEDDING_DATE_STR);

  const [rsvpForm, setRsvpForm] = useState({
    name: '',
    phone: '',
    guests: '1',
    side: 'groom',
    attendance: 'yes',
    note: '',
  });
  const [rsvpSent, setRsvpSent] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('open') === '1') {
      setIsOpen(true);
    }
  }, []);

  const handleOpenInvitation = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);
    setTimeout(() => {
      setIsOpen(true);
      window.scrollTo({ top: 0 });
    }, 850);
  };

  const handleSendWish = (e) => {
    e.preventDefault();
    if (!guestName.trim() || !guestWish.trim()) return;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')} ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    setWishes([
      { name: guestName.trim(), message: guestWish.trim(), time: timeStr },
      ...wishes,
    ]);
    setGuestName('');
    setGuestWish('');
  };

  const handleCopy = (text, key) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    setRsvpSent(true);
    setTimeout(() => {
      setShowRsvp(false);
      setRsvpSent(false);
      setRsvpForm({ name: '', phone: '', guests: '1', side: 'groom', attendance: 'yes', note: '' });
    }, 2000);
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent('Đám cưới Đăng Khoa & Mỹ Duyên');
    const details = encodeURIComponent('Tiệc cưới Đăng Khoa & Mỹ Duyên tại Riverside Palace, 360 Bến Vân Đồn, Quận 4, TP. HCM');
    const location = encodeURIComponent('Riverside Palace, 360 Bến Vân Đồn, Quận 4, TP. HCM');
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261219T110000Z/20261219T140000Z&details=${details}&location=${location}`;
    window.open(url, '_blank');
  };

  if (!isOpen) {
    return (
      <div className="t123n-root">
        <Cover onOpen={handleOpenInvitation} isOpening={isOpening} />
        <div className="t123n-musicFixed">
          <WeddingMusicButton />
        </div>
      </div>
    );
  }

  return (
    <div className="t123n-root t123n-mainPage" dir="ltr">
      <div className="t123n-paperTexture" aria-hidden="true" />
      <div className="t123n-musicFixed">
        <WeddingMusicButton />
      </div>

      <div className="t123n-container">
        {/* ── SECTION 1: SAVE THE DATE & ENVELOPE WITH 2 PHOTOS ── */}
        <header className="t123n-header">
          <img
            src={`${a}/flower-background.webp`}
            alt=""
            aria-hidden="true"
            className="t123n-topWatermarkFlower"
          />

          <p className="t123n-saveTheDate">Save The Date</p>
          <img
            src={`${a}/flower-line.webp`}
            alt=""
            aria-hidden="true"
            className="t123n-flowerLine"
          />

          <div className="t123n-heroEnvelope">
            <img
              src={`${a}/envelope.webp`}
              alt=""
              aria-hidden="true"
              className="t123n-envBg"
            />
            {/* Groom photo */}
            <div className="t123n-heroPhotoWrap t123n-heroPhotoWrap--groom">
              <div className="t123n-heroPhotoFrame">
                <img
                  src={`${a}/groom.webp`}
                  alt="Chú rể Đăng Khoa"
                  className="t123n-heroPhotoImg"
                />
              </div>
            </div>
            {/* Bride photo */}
            <div className="t123n-heroPhotoWrap t123n-heroPhotoWrap--bride">
              <div className="t123n-heroPhotoFrame">
                <img
                  src={`${a}/bride.webp`}
                  alt="Cô dâu Mỹ Duyên"
                  className="t123n-heroPhotoImg"
                />
              </div>
            </div>
            <img
              src={`${a}/envelope-cut.webp`}
              alt=""
              aria-hidden="true"
              className="t123n-envCut"
            />
          </div>

          <div className="t123n-namesHero">
            <p className="t123n-nameTitle">{GROOM_SHORT}</p>
            <span className="t123n-ampLarge" aria-hidden="true">&amp;</span>
            <p className="t123n-nameTitle">{BRIDE_SHORT}</p>
          </div>

          <img
            src={`${a}/flower-line.webp`}
            alt=""
            aria-hidden="true"
            className="t123n-flowerLine"
          />
        </header>

        {/* ── SECTION 2: THÔNG TIN LỄ CƯỚI (ARCHED CONTAINER) ── */}
        <section className="t123n-section t123n-ceremonySection">
          <div className="t123n-archedCard">
            <div className="t123n-archedBgColor" aria-hidden="true" />
            <div className="t123n-archedBgPaper" aria-hidden="true" />

            <div className="t123n-archedContent">
              <h2 className="t123n-ceremonyHeading">THÔNG TIN LỄ CƯỚI</h2>

              <div className="t123n-parentsGrid">
                <div className="t123n-parentCol">
                  <span className="t123n-parentRole">Ông Bà</span>
                  <span className="t123n-parentName">Trần Văn Hùng</span>
                  <span className="t123n-parentName">Lê Thị Hoa</span>
                  <p className="t123n-parentAddress">
                    Tổ dân phố 3A, thị trấn Eakar, huyện Eakar, tỉnh Đắk Lắk
                  </p>
                </div>
                <div className="t123n-parentsDivider" />
                <div className="t123n-parentCol">
                  <span className="t123n-parentRole">Ông Bà</span>
                  <span className="t123n-parentName">Nguyễn Văn Nam</span>
                  <span className="t123n-parentName">Phạm Thị Lan</span>
                  <p className="t123n-parentAddress">
                    Khối 2, thị xã Buôn Hồ, tỉnh Đắk Lắk
                  </p>
                </div>
              </div>

              <div className="t123n-announcement">
                <p className="t123n-announcementSub">TRÂN TRỌNG BÁO TIN</p>
                <p className="t123n-announcementSub">LỄ THÀNH HÔN CỦA CON CHÚNG TÔI</p>
              </div>

              <div className="t123n-coupleFullName">
                <p className="t123n-coupleNameText">{GROOM_NAME}</p>
                <span className="t123n-coupleRole">TRƯỞNG NAM</span>
                <span className="t123n-coupleAmp">&amp;</span>
                <p className="t123n-coupleNameText">{BRIDE_NAME}</p>
                <span className="t123n-coupleRole">ÚT NỮ</span>
              </div>

              <div className="t123n-ceremonyTimeBox">
                <p className="t123n-ceremonyLocation">LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI TƯ GIA VÀO LÚC</p>
                <p className="t123n-ceremonyHour">11:00</p>
                <div className="t123n-dateBadgeRow">
                  <span>THỨ BẢY</span>
                  <i className="t123n-dateSep" />
                  <span className="t123n-dateBadgeDay">19</span>
                  <i className="t123n-dateSep" />
                  <span>THÁNG 12</span>
                </div>
                <p className="t123n-dateBadgeYear">2026</p>
                <p className="t123n-lunarDate">(TỨC NGÀY 11 THÁNG 11 NĂM BÍNH NGỌ)</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: ALBUM ẢNH ── */}
        <section className="t123n-section t123n-albumSection">
          <h2 className="t123n-sectionHeading">ALBUM ẢNH</h2>
          <AlbumCarousel3D onSelectImage={(idx) => setLightboxIdx(idx)} />
        </section>

        {/* ── SECTION 4: THÔNG TIN TIỆC CƯỚI & LỊCH ── */}
        <section className="t123n-section t123n-partySection">
          <div className="t123n-partyFrame">
            <h2 className="t123n-sectionHeading">THÔNG TIN TIỆC CƯỚI</h2>

            <div className="t123n-partyTimeBox">
              <h3 className="t123n-partySubHeading">TIỆC CƯỚI SẼ DIỄN RA VÀO LÚC:</h3>
              <p className="t123n-partyHour">18:00</p>

              <div className="t123n-partyDateRow">
                <span>THỨ BẢY</span>
                <span className="t123n-partyDatePipe">|</span>
                <span className="t123n-partyDateDay">19</span>
                <span className="t123n-partyDatePipe">|</span>
                <span>THÁNG 12</span>
              </div>
              <p className="t123n-partyYear">2026</p>
              <p className="t123n-partyLunar">(TỨC NGÀY 11 THÁNG 11 NĂM BÍNH NGỌ)</p>

              <div className="t123n-khaiTiec">
                <span>KHAI TIỆC</span>
                <p>18:00</p>
              </div>

              {/* COUNTDOWN */}
              <div className="t123n-countdownBox">
                <p className="t123n-countdownTitle">Cùng đếm ngược</p>
                <p className="t123n-countdownNumbers">
                  {countdown.days} ngày {countdown.hours} giờ {countdown.minutes} phút {countdown.seconds} giây
                </p>
              </div>

              {/* CALENDAR */}
              <div className="t123n-calendarCard">
                <div className="t123n-calendarHeader">
                  <span>Tháng 12 / 2026</span>
                </div>
                <div className="t123n-calendarGrid">
                  {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((d) => (
                    <span key={d} className="t123n-calDayHeader">{d}</span>
                  ))}
                  {/* Empty cells for Dec 2026 (Dec 1 is Tuesday => 1 empty for Mon) */}
                  <span className="t123n-calDayEmpty" />
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                    const isWeddingDay = day === WEDDING_DAY;
                    return (
                      <span
                        key={day}
                        className={`t123n-calDay ${isWeddingDay ? 't123n-calDay--wedding' : ''}`}
                      >
                        {day}
                        {isWeddingDay && <span className="t123n-calHeartBadge">♥</span>}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="t123n-partyActions">
                <button
                  type="button"
                  className="t123n-btnAddToCal"
                  onClick={handleAddToCalendar}
                >
                  Thêm vào lịch
                </button>
                <button
                  type="button"
                  className="t123n-btnRsvp"
                  onClick={() => setShowRsvp(true)}
                >
                  XÁC NHẬN THAM DỰ
                </button>
              </div>

              <div className="t123n-venueInfo">
                <p className="t123n-venueTitle">TIỆC CƯỚI SẼ TỔ CHỨC TẠI</p>
                <p className="t123n-venueName">Riverside Palace, 360 Bến Vân Đồn, Quận 4, TP. HCM</p>
                <a
                  href="https://maps.google.com/?q=Riverside+Palace+360+Bến+Vân+Đồn+Quận+4+TP+HCM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="t123n-mapLink"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  <span>Chỉ đường</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 5: DRESS CODE ── */}
        <section className="t123n-section t123n-dresscodeSection">
          <h2 className="t123n-sectionHeading">DRESS CODE</h2>
          <p className="t123n-dresscodeSubtitle">Trang phục dự tiệc</p>
          <div className="t123n-dresscodePalette">
            <div className="t123n-colorSwatch" style={{ backgroundColor: '#6b7b4f' }} title="Olive đậm" />
            <div className="t123n-colorSwatch" style={{ backgroundColor: '#87a172' }} title="Xanh xô thơm" />
            <div className="t123n-colorSwatch" style={{ backgroundColor: '#cdd9bd' }} title="Xanh pastel" />
            <div className="t123n-colorSwatch" style={{ backgroundColor: '#edf3e7' }} title="Trắng kem lá" />
          </div>
        </section>

        {/* ── SECTION 6: LỊCH TRÌNH NGÀY CƯỚI (TIMELINE) ── */}
        <section className="t123n-section t123n-timelineSection">
          <div className="t123n-timelineCard">
            <div className="t123n-timelineCardBg" aria-hidden="true" />
            <div className="t123n-timelinePaperOverlay" aria-hidden="true" />

            <div className="t123n-timelineInner">
              <h2 className="t123n-timelineHeading">LỊCH TRÌNH NGÀY CƯỚI</h2>

              <div className="t123n-timelineList">
                {/* 16:00 */}
                <div className="t123n-timelineRow">
                  <span className="t123n-timelineTime">16:00</span>
                  <div className="t123n-timelineTrack">
                    <span className="t123n-timelineDot" />
                    <span className="t123n-timelineLine" />
                  </div>
                  <span className="t123n-timelineLabel">Đón khách</span>
                </div>

                {/* 17:00 */}
                <div className="t123n-timelineRow">
                  <div className="t123n-timelineTimeWithIcon">
                    <img src={`${a}/cake.webp`} alt="" className="t123n-timelineIcon" />
                    <span className="t123n-timelineTime">17:00</span>
                  </div>
                  <div className="t123n-timelineTrack">
                    <span className="t123n-timelineDot" />
                    <span className="t123n-timelineLine" />
                  </div>
                  <span className="t123n-timelineLabel">Nghi lễ thành hôn</span>
                </div>

                {/* 18:00 */}
                <div className="t123n-timelineRow">
                  <div className="t123n-timelineTimeWithIcon">
                    <img src={`${a}/home.webp`} alt="" className="t123n-timelineIcon" />
                    <span className="t123n-timelineTime">18:00</span>
                  </div>
                  <div className="t123n-timelineTrack">
                    <span className="t123n-timelineDot" />
                    <span className="t123n-timelineLine" />
                  </div>
                  <span className="t123n-timelineLabel">Khai tiệc</span>
                </div>

                {/* 19:30 */}
                <div className="t123n-timelineRow">
                  <div className="t123n-timelineTimeWithIcon">
                    <img src={`${a}/music.webp`} alt="" className="t123n-timelineIcon" />
                    <span className="t123n-timelineTime">19:30</span>
                  </div>
                  <div className="t123n-timelineTrack">
                    <span className="t123n-timelineDot" />
                    <span className="t123n-timelineLine" />
                  </div>
                  <span className="t123n-timelineLabel">Cắt bánh &amp; rót rượu</span>
                </div>

                {/* 21:00 */}
                <div className="t123n-timelineRow">
                  <span className="t123n-timelineTime">21:00</span>
                  <div className="t123n-timelineTrack">
                    <span className="t123n-timelineDot" />
                  </div>
                  <span className="t123n-timelineLabel">Kết thúc tiệc</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 7: SỔ LƯU BÚT ── */}
        <section className="t123n-section t123n-guestbookSection">
          <div className="t123n-guestbookWrapper">
            <img
              src={`${a}/guestbook-background.webp`}
              alt=""
              aria-hidden="true"
              className="t123n-guestbookBackdrop"
            />

            <div className="t123n-guestbookFormWrap">
              <h2 className="t123n-guestbookTitle">SỔ LƯU BÚT</h2>

              <form className="t123n-wishForm" onSubmit={handleSendWish}>
                <input
                  type="text"
                  placeholder="Nhập tên*"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="t123n-input"
                  required
                />
                <textarea
                  placeholder="Nhập lời chúc*"
                  value={guestWish}
                  onChange={(e) => setGuestWish(e.target.value)}
                  className="t123n-textarea"
                  rows={2}
                  required
                />
                <button type="submit" className="t123n-submitWishBtn">
                  GỬI LỜI CHÚC
                </button>
              </form>
            </div>
          </div>

          <div className="t123n-wishesFeed">
            {wishes.map((w, idx) => (
              <div key={idx} className="t123n-wishItemCard">
                <div className="t123n-wishItemHead">
                  <span className="t123n-wishAuthor">{w.name}</span>
                  <span className="t123n-wishTimestamp">{w.time}</span>
                </div>
                <p className="t123n-wishItemBody">{w.message}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 8: HỘP QUÀ MỪNG (2 PHONG BÌ XANH) ── */}
        <section className="t123n-section t123n-giftSection">
          <img
            src={`${a}/flower-background.webp`}
            alt=""
            aria-hidden="true"
            className="t123n-flowerWatermark--gift"
          />

          <h2 className="t123n-sectionHeading">HỘP QUÀ MỪNG</h2>

          <button
            type="button"
            className="t123n-ienvGroup"
            onClick={() => setShowGift(true)}
            aria-label="Mở hộp mừng cưới"
          >
            <div className="t123n-ienvStage">
              <span className="t123n-ienvSparkle t123n-ienvSparkle--1">✦</span>
              <span className="t123n-ienvSparkle t123n-ienvSparkle--2">✦</span>
              <span className="t123n-ienvSparkle t123n-ienvSparkle--3">✦</span>
              <span className="t123n-ienvSparkle t123n-ienvSparkle--4">✦</span>

              <div className="t123n-ienvBox">
                <div className="t123n-ienvShadow" />
                <img
                  src={`${a}/minimalism_green.webp`}
                  alt=""
                  aria-hidden="true"
                  className="t123n-ienvBack"
                />
                <img
                  src={`${a}/minimalism_green.webp`}
                  alt="Bao phong bì mừng cưới"
                  className="t123n-ienvCard"
                />
              </div>
            </div>
            <p className="t123n-ienvHint">
              <span>Nhấn để mở</span>
            </p>
          </button>

          <p className="t123n-footerThanks">
            Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!
          </p>
        </section>

        {/* ── FOOTER ── */}
        <footer className="t123n-footer">
          <div className="t123n-footerBrand">
            <span>♡ Lời Hẹn Wedding Studio</span>
          </div>
        </footer>
      </div>

      {/* ── MODAL: XÁC NHẬN THAM DỰ (RSVP) ── */}
      <AnimatePresence>
        {showRsvp && (
          <div className="t123n-modalOverlay" onClick={() => setShowRsvp(false)}>
            <motion.div
              className="t123n-modalDialog"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="t123n-modalHeader">
                <h3>XÁC NHẬN THAM DỰ</h3>
                <button
                  type="button"
                  className="t123n-modalClose"
                  onClick={() => setShowRsvp(false)}
                >
                  ✕
                </button>
              </div>

              {rsvpSent ? (
                <div className="t123n-rsvpSuccess">
                  <div className="t123n-successIcon">✓</div>
                  <p>Cảm ơn bạn đã gửi phản hồi!</p>
                  <span>Chúng tôi rất mong được đón tiếp bạn.</span>
                </div>
              ) : (
                <form className="t123n-rsvpForm" onSubmit={handleRsvpSubmit}>
                  <div className="t123n-formGroup">
                    <label>Họ và tên *</label>
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={rsvpForm.name}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                    />
                  </div>

                  <div className="t123n-formGroup">
                    <label>Số điện thoại *</label>
                    <input
                      type="tel"
                      required
                      placeholder="0912 345 678"
                      value={rsvpForm.phone}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, phone: e.target.value })}
                    />
                  </div>

                  <div className="t123n-formGroup">
                    <label>Khách của ai?</label>
                    <div className="t123n-radioGroup">
                      <label>
                        <input
                          type="radio"
                          name="side"
                          value="groom"
                          checked={rsvpForm.side === 'groom'}
                          onChange={() => setRsvpForm({ ...rsvpForm, side: 'groom' })}
                        />
                        Nhà trai (Chú rể)
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="side"
                          value="bride"
                          checked={rsvpForm.side === 'bride'}
                          onChange={() => setRsvpForm({ ...rsvpForm, side: 'bride' })}
                        />
                        Nhà gái (Cô dâu)
                      </label>
                    </div>
                  </div>

                  <div className="t123n-formGroup">
                    <label>Bạn sẽ tham dự chứ?</label>
                    <div className="t123n-radioGroup">
                      <label>
                        <input
                          type="radio"
                          name="att"
                          value="yes"
                          checked={rsvpForm.attendance === 'yes'}
                          onChange={() => setRsvpForm({ ...rsvpForm, attendance: 'yes' })}
                        />
                        Chắc chắn sẽ đến
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="att"
                          value="no"
                          checked={rsvpForm.attendance === 'no'}
                          onChange={() => setRsvpForm({ ...rsvpForm, attendance: 'no' })}
                        />
                        Rất tiếc không thể đến
                      </label>
                    </div>
                  </div>

                  {rsvpForm.attendance === 'yes' && (
                    <div className="t123n-formGroup">
                      <label>Số người tham dự</label>
                      <select
                        value={rsvpForm.guests}
                        onChange={(e) => setRsvpForm({ ...rsvpForm, guests: e.target.value })}
                      >
                        <option value="1">1 người</option>
                        <option value="2">2 người</option>
                        <option value="3">3 người</option>
                        <option value="4">4+ người</option>
                      </select>
                    </div>
                  )}

                  <div className="t123n-formGroup">
                    <label>Lời nhắn</label>
                    <textarea
                      rows={2}
                      placeholder="Lời nhắn gửi tới cô dâu chú rể..."
                      value={rsvpForm.note}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, note: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="t123n-modalSubmitBtn">
                    GỬI XÁC NHẬN
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── MODAL: HỘP QUÀ MỪNG (BANKING QR) ── */}
      <AnimatePresence>
        {showGift && (
          <div className="t123n-modalOverlay" onClick={() => setShowGift(false)}>
            <motion.div
              className="t123n-modalDialog t123n-giftModalDialog"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="t123n-modalHeader">
                <h3>HỘP QUÀ MỪNG</h3>
                <button
                  type="button"
                  className="t123n-modalClose"
                  onClick={() => setShowGift(false)}
                >
                  ✕
                </button>
              </div>

              <div className="t123n-giftModalBody">
                <div className="t123n-giftTabs">
                  <button
                    type="button"
                    className={`t123n-giftTabBtn ${activeGiftTab === 'groom' ? 't123n-giftTabBtn--active' : ''}`}
                    onClick={() => setActiveGiftTab('groom')}
                  >
                    Chú rể Đăng Khoa
                  </button>
                  <button
                    type="button"
                    className={`t123n-giftTabBtn ${activeGiftTab === 'bride' ? 't123n-giftTabBtn--active' : ''}`}
                    onClick={() => setActiveGiftTab('bride')}
                  >
                    Cô dâu Mỹ Duyên
                  </button>
                </div>

                {activeGiftTab === 'groom' ? (
                  <div className="t123n-giftCardContent">
                    <h4 className="t123n-giftCardTitle">MỪNG CƯỚI CHÚ RỂ</h4>
                    <p className="t123n-giftCardSubtitle">Trần Đăng Khoa</p>

                    <div className="t123n-qrBox">
                      <img
                        src="https://img.vietqr.io/image/970436-1023456789-compact.png?amount=0&addInfo=Mung%20cuoi%20Dang%20Khoa%20My%20Duyen&accountName=TRAN%20DANG%20KHOA"
                        alt="QR Mừng Cưới Chú Rể"
                        className="t123n-qrImage"
                      />
                    </div>

                    <div className="t123n-bankDetails">
                      <div className="t123n-bankRow">
                        <span className="t123n-bankLabel">Ngân hàng:</span>
                        <span className="t123n-bankValue">Vietcombank</span>
                      </div>
                      <div className="t123n-bankRow">
                        <span className="t123n-bankLabel">Số tài khoản:</span>
                        <div className="t123n-bankCopyWrap">
                          <span className="t123n-bankValue t123n-bankValue--mono">1023456789</span>
                          <button
                            type="button"
                            className="t123n-copyBtn"
                            onClick={() => handleCopy('1023456789', 'groom_stk')}
                          >
                            {copiedKey === 'groom_stk' ? '✓ Đã chép' : 'Sao chép'}
                          </button>
                        </div>
                      </div>
                      <div className="t123n-bankRow">
                        <span className="t123n-bankLabel">Chủ tài khoản:</span>
                        <span className="t123n-bankValue">TRAN DANG KHOA</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="t123n-giftCardContent">
                    <h4 className="t123n-giftCardTitle">MỪNG CƯỚI CÔ DÂU</h4>
                    <p className="t123n-giftCardSubtitle">Nguyễn Mỹ Duyên</p>

                    <div className="t123n-qrBox">
                      <img
                        src="https://img.vietqr.io/image/970407-9988776655-compact.png?amount=0&addInfo=Mung%20cuoi%20Dang%20Khoa%20My%20Duyen&accountName=NGUYEN%20MY%20DUYEN"
                        alt="QR Mừng Cưới Cô Dâu"
                        className="t123n-qrImage"
                      />
                    </div>

                    <div className="t123n-bankDetails">
                      <div className="t123n-bankRow">
                        <span className="t123n-bankLabel">Ngân hàng:</span>
                        <span className="t123n-bankValue">Techcombank</span>
                      </div>
                      <div className="t123n-bankRow">
                        <span className="t123n-bankLabel">Số tài khoản:</span>
                        <div className="t123n-bankCopyWrap">
                          <span className="t123n-bankValue t123n-bankValue--mono">9988776655</span>
                          <button
                            type="button"
                            className="t123n-copyBtn"
                            onClick={() => handleCopy('9988776655', 'bride_stk')}
                          >
                            {copiedKey === 'bride_stk' ? '✓ Đã chép' : 'Sao chép'}
                          </button>
                        </div>
                      </div>
                      <div className="t123n-bankRow">
                        <span className="t123n-bankLabel">Chủ tài khoản:</span>
                        <span className="t123n-bankValue">NGUYEN MY DUYEN</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── LIGHTBOX PHÓNG TO ẢNH ── */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <div className="t123n-lightboxOverlay" onClick={() => setLightboxIdx(null)}>
            <motion.div
              className="t123n-lightboxModal"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="t123n-lightboxClose"
                onClick={() => setLightboxIdx(null)}
              >
                ✕
              </button>
              <img
                src={ALBUM_IMAGES[lightboxIdx]}
                alt={`Ảnh ${lightboxIdx + 1}`}
                className="t123n-lightboxImg"
              />
              <div className="t123n-lightboxNav">
                <button
                  type="button"
                  onClick={() => setLightboxIdx((lightboxIdx - 1 + ALBUM_IMAGES.length) % ALBUM_IMAGES.length)}
                >
                  ‹
                </button>
                <span>{lightboxIdx + 1} / {ALBUM_IMAGES.length}</span>
                <button
                  type="button"
                  onClick={() => setLightboxIdx((lightboxIdx + 1) % ALBUM_IMAGES.length)}
                >
                  ›
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
