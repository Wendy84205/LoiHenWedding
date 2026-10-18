import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  Sparkles,
  X,
  VolumeX,
  Check
} from 'lucide-react';
import './template124New.css';

const ASSET_PATH = '/assets/new-templates/thiep-cuoi-124';

const GROOM = 'Nguyễn Văn Toàn';
const GROOM_SHORT = 'Văn Toàn';
const BRIDE = 'Trần Thanh Diệp';
const BRIDE_SHORT = 'Thanh Diệp';

const ALBUM_IMAGES = [
  `${ASSET_PATH}/gallery-1.webp`,
  `${ASSET_PATH}/gallery-2.webp`,
  `${ASSET_PATH}/gallery-3.webp`,
  `${ASSET_PATH}/gallery-4.webp`,
  `${ASSET_PATH}/gallery-5.webp`,
  `${ASSET_PATH}/gallery-6.webp`,
  `${ASSET_PATH}/gallery-7.webp`,
  `${ASSET_PATH}/gallery-8.webp`,
  `${ASSET_PATH}/gallery-9.webp`,
  `${ASSET_PATH}/gallery-10.webp`,
];

// Cover Phong Bì Component
function CoverEnvelope({ onOpen, guestName, isOpening }) {
  const leaves = [
    { left: '10%', delay: '0s', dur: '9s', size: 28 },
    { left: '25%', delay: '2.5s', dur: '11s', size: 22 },
    { left: '45%', delay: '1s', dur: '8.5s', size: 26 },
    { left: '65%', delay: '3.5s', dur: '10s', size: 24 },
    { left: '80%', delay: '0.5s', dur: '12s', size: 30 },
    { left: '92%', delay: '4s', dur: '9.5s', size: 20 },
  ];

  return (
    <div className={`t124n-coverOverlay ${isOpening ? 't124n-coverOverlay--opening' : ''}`}>
      {/* Animated falling leaves background */}
      <div className="t124n-fallingLeaves" aria-hidden="true">
        {leaves.map((l, idx) => (
          <img
            key={idx}
            src={`${ASSET_PATH}/la1.webp`}
            alt=""
            className="t124n-fallingLeaf"
            style={{
              left: l.left,
              animationDelay: l.delay,
              animationDuration: l.dur,
              width: `${l.size}px`,
              height: `${l.size}px`,
            }}
          />
        ))}
      </div>

      {/* Main Cover Card */}
      <div className="t124n-coverCard">
        <img
          src={`${ASSET_PATH}/la2.webp`}
          alt=""
          aria-hidden="true"
          className="t124n-coverDecorTop"
        />
        <img
          src={`${ASSET_PATH}/la1.webp`}
          alt=""
          aria-hidden="true"
          className="t124n-coverDecorBottom"
        />

        <div
          className="t124n-coverHeartIcon"
          aria-hidden="true"
          onClick={onOpen}
          role="button"
          tabIndex={0}
          title="Nhấn để mở thiệp"
        >
          {isOpening && <span className="t124n-heartShockwave" aria-hidden="true" />}
          <Heart size={26} fill="#ffffff" />
        </div>

        <h1 className="t124n-coverNames">
          <span>{GROOM_SHORT}</span>
          <span className="t124n-coverAmp">&amp;</span>
          <span>{BRIDE_SHORT}</span>
        </h1>

        <div className="t124n-coverDivider">
          <span>❦</span>
        </div>

        <p className="t124n-coverDateVi">11 tháng 5, 2026</p>
        <p className="t124n-coverDateEn">May 11, 2026</p>

        <p className="t124n-coverInviteLabel">Thân Mời / Cordially Invites</p>

        <div className="t124n-coverGuestPill">
          {guestName || 'Anh Chị Minh - Thanh'}
        </div>

        <p className="t124n-coverInviteSub">
          đến dự buổi tiệc chung vui cùng gia đình<br />
          <span>to celebrate with our family</span>
        </p>

        <button
          type="button"
          className="t124n-coverOpenBtn"
          onClick={onOpen}
          disabled={isOpening}
          aria-label="Mở thiệp cưới"
        >
          <span>{isOpening ? 'Đang mở...' : 'Mở thiệp / Open'}</span>
          <div className="t124n-shine" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

// 3D Coverflow Carousel (Exact Logic and Physics as Template 122)
function AlbumCarousel3D({ onSelectImage }) {
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
    <div className="t124n-albumWrap">
      <div className="t124n-albumStage">
        <button
          type="button"
          aria-label="Previous photo"
          className="t124n-albumNavBtn t124n-albumNavBtn--prev"
          onClick={() => handleNav(-1)}
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          aria-label="Next photo"
          className="t124n-albumNavBtn t124n-albumNavBtn--next"
          onClick={() => handleNav(1)}
        >
          <ChevronRight size={22} />
        </button>

        <div className="t124n-album3dViewport">
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
                className={`t124n-albumSlideCard ${i === active ? 't124n-albumSlideCard--active' : ''}`}
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

      <div className="t124n-albumDots">
        {ALBUM_IMAGES.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`t124n-albumDot ${i === active ? 't124n-albumDot--active' : ''}`}
            onClick={() => { setActive(i); startAuto(); }}
            aria-label={`Chuyển đến ảnh ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Template124New() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const [showRsvp, setShowRsvp] = useState(false);
  const [showLixi, setShowLixi] = useState(false);
  const [lixiTab, setLixiTab] = useState('groom');
  const [copiedBank, setCopiedBank] = useState(false);

  // Guestbook State
  const [wishes, setWishes] = useState([
    {
      id: 1,
      name: 'Lương Ánh Linh',
      time: '18:49:53 23/1/2026',
      content: 'Mong rằng cuộc sống hôn nhân sẽ là hành trình tuyệt vời nhất của hai bạn.',
    },
    {
      id: 2,
      name: 'Chú Minh',
      time: '6:40:36 9/1/2026',
      content: 'Hy vọng tổ ấm nhỏ này sẽ sớm rộn rã tiếng cười con trẻ và hạnh phúc viên mãn.',
    },
    {
      id: 3,
      name: 'Em Tùng - Hà Nội',
      time: '6:40:15 9/1/2026',
      content: 'Chúc anh Toàn và chị Diệp mãi mãi yêu thương, đồng hành bên nhau suốt đời!',
    },
  ]);
  const [authorName, setAuthorName] = useState('');
  const [wishText, setWishText] = useState('');

  // RSVP Form State
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpPhone, setRsvpPhone] = useState('');
  const [rsvpCount, setRsvpCount] = useState('1');
  const [rsvpSide, setRsvpSide] = useState('groom');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  const audioRef = useRef(null);

  // Check query params for open=1
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('open') === '1') {
      setIsOpen(true);
    }
  }, []);

  // Music toggle
  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleOpenInvitation = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
    setTimeout(() => {
      setIsOpen(true);
      window.scrollTo({ top: 0 });
    }, 850);
  };

  const handleAddWish = (e) => {
    e.preventDefault();
    if (!authorName.trim() || !wishText.trim()) return;
    const now = new Date();
    const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')} ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    const newWish = {
      id: Date.now(),
      name: authorName.trim(),
      time: timeStr,
      content: wishText.trim(),
    };
    setWishes([newWish, ...wishes]);
    setAuthorName('');
    setWishText('');
  };

  const handleCopyAccount = (acc) => {
    navigator.clipboard.writeText(acc);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const handleAddCalendar = () => {
    const event = {
      title: 'Lễ Cưới Văn Toàn & Thanh Diệp',
      details: 'Tiệc cưới diễn ra tại Metropole Wedding Center, 216 Lý Chính Thắng, Phường 9, Quận 3, TP.HCM',
      location: 'Metropole Wedding Center, 216 Lý Chính Thắng, Phường 9, Quận 3, TP. Hồ Chí Minh',
      start: '20260511T110000Z',
      end: '20260511T143000Z',
    };
    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&details=${encodeURIComponent(event.details)}&location=${encodeURIComponent(event.location)}`;
    window.open(googleUrl, '_blank');
  };

  return (
    <div className="t124n-root">
      {/* Background Audio */}
      <audio
        ref={audioRef}
        src={`${ASSET_PATH}/music.mp3`}
        loop
        preload="auto"
      />

      {/* ── COVER OVERLAY (PHONG BÌ MỞ ĐẦU) ── */}
      {!isOpen && (
        <CoverEnvelope
          onOpen={handleOpenInvitation}
          guestName="Anh Chị Minh - Thanh"
          isOpening={isOpening}
        />
      )}

      {/* ── FLOATING MUSIC BUTTON ── */}
      {isOpen && (
        <button
          type="button"
          className="t124n-musicBtn"
          onClick={toggleMusic}
          aria-label={isPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
        >
          {isPlaying ? (
            <div className="t124n-musicBars">
              <span className="t124n-musicBar" />
              <span className="t124n-musicBar" />
              <span className="t124n-musicBar" />
            </div>
          ) : (
            <VolumeX size={20} />
          )}
        </button>
      )}

      {/* ── MAIN INVITATION CONTENT ── */}
      {isOpen && (
        <main className="t124n-main">
          {/* ── SECTION 1: THE STORY OF LOVE & POLAROIDS ── */}
          <section className="t124n-heroSection">
            <img
              src={`${ASSET_PATH}/la2.webp`}
              alt=""
              aria-hidden="true"
              className="t124n-leafDecorHeroTop"
            />
            <img
              src={`${ASSET_PATH}/la1.webp`}
              alt=""
              aria-hidden="true"
              className="t124n-leafDecorHeroBottom"
            />

            <h2 className="t124n-heroSubTitle">
              THE STORY <span>of</span> LOVE
            </h2>

            <div className="t124n-polaroidsWrap">
              {/* Groom Polaroid */}
              <div className="t124n-polaroidGroom">
                <img
                  src={`${ASSET_PATH}/groom.webp`}
                  alt="Chú rể Văn Toàn"
                  className="t124n-polaroidGroomImg"
                />
              </div>
              <div className="t124n-polaroidGroomMeta">
                <p className="t124n-polaroidRole">Trưởng Nam / Groom</p>
                <h3 className="t124n-polaroidName">{GROOM_SHORT}</h3>
              </div>

              {/* Bride Polaroid */}
              <div className="t124n-polaroidBride">
                <img
                  src={`${ASSET_PATH}/bride.webp`}
                  alt="Cô dâu Thanh Diệp"
                  className="t124n-polaroidBrideImg"
                />
              </div>
              <div className="t124n-polaroidBrideMeta">
                <p className="t124n-polaroidRole">Út Nữ / Bride</p>
                <h3 className="t124n-polaroidName">{BRIDE_SHORT}</h3>
              </div>
            </div>
          </section>

          {/* ── SECTION 2: ALBUM ẢNH (3D COVERFLOW CHUẨN MẪU 122) ── */}
          <section className="t124n-albumSection">
            <h2 className="t124n-albumTitle">ALBUM ẢNH</h2>
            <p className="t124n-albumSubtitle">PHOTO GALLERY</p>

            <AlbumCarousel3D onSelectImage={(idx) => setLightboxIdx(idx)} />
          </section>

          {/* ── SECTION 3: DARK GREEN CEREMONY & PARTY INFO ── */}
          <section className="t124n-darkSection">
            <img
              src={`${ASSET_PATH}/la3.webp`}
              alt=""
              aria-hidden="true"
              className="t124n-darkLeafDecor1"
            />
            <img
              src={`${ASSET_PATH}/la4.webp`}
              alt=""
              aria-hidden="true"
              className="t124n-darkLeafDecor2"
            />

            <div className="t124n-darkContent">
              <h2 className="t124n-darkHeading">
                THÔNG TIN LỄ CƯỚI / CEREMONY INFO
              </h2>

              {/* Family Grid */}
              <div className="t124n-familyGrid">
                <div className="t124n-familyCol">
                  <p className="t124n-familyLabel">Ông Bà / Mr. &amp; Mrs.</p>
                  <p className="t124n-familyName">Nguyễn Hoàng Nam</p>
                  <p className="t124n-familyName">Lê Thị Phượng</p>
                  <p className="t124n-familyAddr">123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</p>
                </div>
                <div className="t124n-familyCol">
                  <p className="t124n-familyLabel">Ông Bà / Mr. &amp; Mrs.</p>
                  <p className="t124n-familyName">Trần Văn Mạnh</p>
                  <p className="t124n-familyName">Phạm Thị Kim Oanh</p>
                  <p className="t124n-familyAddr">456 Lê Lợi, Quận 3, TP. Hồ Chí Minh</p>
                </div>
              </div>

              {/* Announcement */}
              <div className="t124n-announcementBlock">
                <p className="t124n-announceVi">
                  TRÂN TRỌNG BÁO TIN<br />
                  LỄ THÀNH HÔN CỦA CON CHÚNG TÔI
                </p>
                <p className="t124n-announceEn">
                  WE JOYFULLY ANNOUNCE THE WEDDING OF OUR CHILDREN
                </p>
              </div>

              {/* Couple Main Names */}
              <div className="t124n-mainCoupleNames">
                <h3 className="t124n-mainName">{GROOM}</h3>
                <p className="t124n-mainRole">TRƯỞNG NAM / GROOM</p>
                <div className="t124n-mainAmp">&amp;</div>
                <h3 className="t124n-mainName">{BRIDE}</h3>
                <p className="t124n-mainRole">ÚT NỮ / BRIDE</p>
              </div>

              {/* Ceremony Event */}
              <div className="t124n-ceremonyDetails">
                <p className="t124n-eventTitleVi">
                  LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI TƯ GIA
                </p>
                <p className="t124n-eventTitleEn">
                  WEDDING CEREMONY AT FAMILY HOME
                </p>
                <p className="t124n-eventTitleVi">VÀO LÚC / AT</p>
                <p className="t124n-eventHour">09:00</p>

                <div className="t124n-dateTriple">
                  <div className="t124n-dateCol">
                    <p className="t124n-dateColLabel">THỨ HAI</p>
                    <p className="t124n-dateColSub">MONDAY</p>
                  </div>
                  <span className="t124n-datePipe">|</span>
                  <div className="t124n-dateCol">
                    <span className="t124n-dateDayNum">11</span>
                  </div>
                  <span className="t124n-datePipe">|</span>
                  <div className="t124n-dateCol">
                    <p className="t124n-dateColLabel">THÁNG 05</p>
                    <p className="t124n-dateColSub">MAY</p>
                  </div>
                </div>

                <p className="t124n-dateYearNum">2026</p>
                <p className="t124n-lunarNotice">
                  (TỨC NGÀY 25 THÁNG 3 NĂM BÍNH NGỌ)
                </p>
              </div>

              {/* Reception Party Info */}
              <div className="t124n-ceremonyDetails">
                <h2 className="t124n-darkHeading" style={{ marginBottom: '14px' }}>
                  THÔNG TIN TIỆC CƯỚI / RECEPTION INFO
                </h2>
                <p className="t124n-eventTitleVi">
                  TIỆC CƯỚI SẼ DIỄN RA VÀO LÚC:
                </p>
                <p className="t124n-eventTitleEn">
                  THE RECEPTION WILL TAKE PLACE AT:
                </p>
                <p className="t124n-eventHour">18:00</p>

                <div className="t124n-dateTriple">
                  <div className="t124n-dateCol">
                    <p className="t124n-dateColLabel">THỨ HAI</p>
                    <p className="t124n-dateColSub">MONDAY</p>
                  </div>
                  <span className="t124n-datePipe">|</span>
                  <div className="t124n-dateCol">
                    <span className="t124n-dateDayNum">11</span>
                  </div>
                  <span className="t124n-datePipe">|</span>
                  <div className="t124n-dateCol">
                    <p className="t124n-dateColLabel">THÁNG 05</p>
                    <p className="t124n-dateColSub">MAY</p>
                  </div>
                </div>

                <p className="t124n-dateYearNum">2026</p>
                <p className="t124n-lunarNotice">
                  (TỨC NGÀY 25 THÁNG 3 NĂM BÍNH NGỌ)
                </p>

                <div className="t124n-receptionTimeRow">
                  <div>
                    <p className="t124n-recItemTitle">ĐÓN KHÁCH</p>
                    <p className="t124n-recItemSub">GUEST RECEPTION</p>
                    <p className="t124n-recItemHour">17:00</p>
                  </div>
                  <div>
                    <p className="t124n-recItemTitle">KHAI TIỆC</p>
                    <p className="t124n-recItemSub">RECEPTION</p>
                    <p className="t124n-recItemHour">18:00</p>
                  </div>
                </div>

                {/* Calendar Grid Box */}
                <div className="t124n-calendarFrame">
                  <p className="t124n-calendarTitle">Tháng 5 / 2026</p>
                  <div className="t124n-calendarGrid">
                    {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((d) => (
                      <div key={d} className="t124n-calDayHeader">{d}</div>
                    ))}
                    {/* Padding for May 2026 (Starts on Friday, so 4 empty days in standard Mon-Sun) */}
                    <div className="t124n-calCell" />
                    <div className="t124n-calCell" />
                    <div className="t124n-calCell" />
                    <div className="t124n-calCell" />
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                      <div
                        key={day}
                        className={`t124n-calCell ${day === 11 ? 't124n-calCell--active' : ''}`}
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    className="t124n-addCalendarLink"
                    onClick={handleAddCalendar}
                  >
                    Thêm vào lịch / Add to Calendar
                  </button>
                </div>

                <button
                  type="button"
                  className="t124n-rsvpBtn"
                  onClick={() => setShowRsvp(true)}
                >
                  XÁC NHẬN / CONFIRM
                </button>
              </div>

              {/* Venue Block */}
              <div className="t124n-venueBlock">
                <h3 className="t124n-venueHeading">TIỆC CƯỚI SẼ TỔ CHỨC TẠI</h3>
                <p className="t124n-venueSubHeading">WEDDING RECEPTION VENUE</p>
                <p className="t124n-venueAddr">
                  Metropole Wedding Center, 216 Lý Chính Thắng, Phường 9, Quận 3, Thành phố Hồ Chí Minh
                </p>

                <a
                  href="https://maps.google.com/?q=Metropole+Wedding+Center+216+Ly+Chinh+Thang+Quan+3+TPHCM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="t124n-mapBtn"
                >
                  <MapPin size={16} />
                  <span>Chỉ đường</span>
                </a>
              </div>

              {/* Dress Code */}
              <div className="t124n-dresscodeBlock">
                <p className="t124n-dresscodeTitle">DRESS CODE</p>
                <p className="t124n-dresscodeSub">Trang phục dự tiệc / Party Attire</p>
                <div className="t124n-dresscodePalette">
                  <div className="t124n-dressSwatch" style={{ background: '#274e30' }} title="Forest Green" />
                  <div className="t124n-dressSwatch" style={{ background: '#5c7b64' }} title="Olive Sage" />
                  <div className="t124n-dressSwatch" style={{ background: '#bcd4c3' }} title="Soft Mint" />
                </div>
              </div>

              {/* Timeline Schedule */}
              <div className="t124n-timelineBlock">
                <h3 className="t124n-venueHeading">LỊCH TRÌNH NGÀY CƯỚI</h3>
                <p className="t124n-venueSubHeading">WEDDING DAY SCHEDULE</p>

                <div className="t124n-timelineList">
                  <div className="t124n-timelineItem">
                    <span className="t124n-timelineHour">17:30</span>
                    <span className="t124n-timelineDot" />
                    <div className="t124n-timelineText">
                      <p className="t124n-timelineTitle">Đón khách</p>
                      <p className="t124n-timelineSub">Welcome</p>
                    </div>
                  </div>

                  <div className="t124n-timelineItem">
                    <span className="t124n-timelineHour">18:30</span>
                    <span className="t124n-timelineDot" />
                    <div className="t124n-timelineText">
                      <p className="t124n-timelineTitle">Khai tiệc</p>
                      <p className="t124n-timelineSub">Reception</p>
                    </div>
                  </div>

                  <div className="t124n-timelineItem">
                    <span className="t124n-timelineHour">18:45</span>
                    <span className="t124n-timelineDot" />
                    <div className="t124n-timelineText">
                      <p className="t124n-timelineTitle">Rót rượu, cắt bánh</p>
                      <p className="t124n-timelineSub">Toasts &amp; Cake</p>
                    </div>
                  </div>

                  <div className="t124n-timelineItem">
                    <span className="t124n-timelineHour">19:00</span>
                    <span className="t124n-timelineDot" />
                    <div className="t124n-timelineText">
                      <p className="t124n-timelineTitle">Phục vụ món chính</p>
                      <p className="t124n-timelineSub">Main Course</p>
                    </div>
                  </div>

                  <div className="t124n-timelineItem">
                    <span className="t124n-timelineHour">21:00</span>
                    <span className="t124n-timelineDot" />
                    <div className="t124n-timelineText">
                      <p className="t124n-timelineTitle">Kết thúc tiệc</p>
                      <p className="t124n-timelineSub">Farewell</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── SECTION 4: GUESTBOOK / SỔ LƯU BÚT ── */}
          <section className="t124n-guestbookSection">
            <h2 className="t124n-guestbookHeading">SỔ LƯU BÚT / GUESTBOOK</h2>

            {/* Wish Form */}
            <form onSubmit={handleAddWish} className="t124n-guestbookFormCard">
              <input
                type="text"
                placeholder="Tên của bạn / Your name*"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="t124n-inputName"
                required
              />
              <textarea
                placeholder="Nhập lời chúc của bạn* / Enter your wishes*"
                value={wishText}
                onChange={(e) => setWishText(e.target.value)}
                className="t124n-inputTextarea"
                required
              />
              <button type="submit" className="t124n-sendWishBtn">
                GỬI LỜI CHÚC / SEND WISH
              </button>
            </form>

            {/* Wishes List */}
            <div className="t124n-wishList">
              {wishes.map((w) => (
                <div key={w.id} className="t124n-wishCard">
                  <div className="t124n-wishHeader">
                    <span className="t124n-wishAuthor">{w.name}</span>
                    <span className="t124n-wishTime">{w.time}</span>
                  </div>
                  <p className="t124n-wishContent">{w.content}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── SECTION 5: HỘP QUÀ MỪNG (LÌ XÌ & BANKING) ── */}
          <section className="t124n-giftboxSection">
            <h2 className="t124n-giftboxHeading">HỘP QUÀ MỪNG</h2>
            <p className="t124n-giftboxSub">GIFT BOX</p>

            <button
              type="button"
              className="t124n-lixiTrigger"
              onClick={() => setShowLixi(true)}
              aria-label="Mở hộp quà mừng lì xì"
            >
              <img
                src={`${ASSET_PATH}/giftbox.webp`}
                alt="Hộp quà mừng"
                className="t124n-lixiBoxImg"
              />
              <span className="t124n-lixiTriggerLabel">
                <Sparkles size={16} />
                <span>Nhấn để mở / Tap to open</span>
                <Sparkles size={16} />
              </span>
              <span className="t124n-lixiTriggerHint">
                Gửi quà cưới hoặc lì xì chúc phúc cô dâu &amp; chú rể
              </span>
            </button>

            {/* Footer Blessings */}
            <div className="t124n-footerNote">
              <p className="t124n-footerTextVi">
                Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!
              </p>
              <p className="t124n-footerTextEn">
                Your presence would be the greatest gift we could receive!
              </p>
            </div>
          </section>

          {/* ── MODAL: RSVP (XÁC NHẬN THAM DỰ) ── */}
          {showRsvp && (
            <div className="t124n-modalOverlay" onClick={() => setShowRsvp(false)}>
              <div className="t124n-modalCard" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  className="t124n-modalCloseBtn"
                  onClick={() => setShowRsvp(false)}
                >
                  <X size={18} />
                </button>

                <h3 className="t124n-modalTitle">Xác Nhận Tham Dự</h3>

                {rsvpSubmitted ? (
                  <div style={{ padding: '20px 0' }}>
                    <div style={{ color: '#274e30', marginBottom: '10px' }}>
                      <Check size={48} style={{ margin: '0 auto' }} />
                    </div>
                    <p style={{ fontWeight: 600, fontSize: '16px' }}>Cảm ơn bạn đã phản hồi!</p>
                    <p style={{ fontSize: '13px', color: '#555' }}>
                      Chúng tôi rất mong chờ được đón tiếp bạn trong ngày trọng đại.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setRsvpSubmitted(true);
                    }}
                    style={{ textAlign: 'left' }}
                  >
                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                        Họ và tên của bạn:
                      </label>
                      <input
                        type="text"
                        required
                        value={rsvpName}
                        onChange={(e) => setRsvpName(e.target.value)}
                        placeholder="Nhập họ tên"
                        className="t124n-inputName"
                      />
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                        Số điện thoại:
                      </label>
                      <input
                        type="tel"
                        value={rsvpPhone}
                        onChange={(e) => setRsvpPhone(e.target.value)}
                        placeholder="Số điện thoại của bạn"
                        className="t124n-inputName"
                      />
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                        Khách mời của:
                      </label>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <input
                            type="radio"
                            name="rsvpSide"
                            value="groom"
                            checked={rsvpSide === 'groom'}
                            onChange={() => setRsvpSide('groom')}
                          />
                          Nhà Trai (Văn Toàn)
                        </label>
                        <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <input
                            type="radio"
                            name="rsvpSide"
                            value="bride"
                            checked={rsvpSide === 'bride'}
                            onChange={() => setRsvpSide('bride')}
                          />
                          Nhà Gái (Thanh Diệp)
                        </label>
                      </div>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                        Số người tham dự:
                      </label>
                      <select
                        value={rsvpCount}
                        onChange={(e) => setRsvpCount(e.target.value)}
                        className="t124n-inputName"
                      >
                        <option value="1">1 người</option>
                        <option value="2">2 người</option>
                        <option value="3">3 người</option>
                        <option value="4">4+ người</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="t124n-sendWishBtn"
                      style={{ width: '100%', padding: '12px', fontSize: '14px' }}
                    >
                      GỬI PHẢN HỒI
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* ── MODAL: LÌ XÌ & MÃ QR CHUYỂN KHOẢN ── */}
          {showLixi && (
            <div className="t124n-modalOverlay" onClick={() => setShowLixi(false)}>
              <div className="t124n-modalCard" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  className="t124n-modalCloseBtn"
                  onClick={() => setShowLixi(false)}
                >
                  <X size={18} />
                </button>

                <h3 className="t124n-modalTitle">Mừng Cưới / Lì Xì</h3>

                {/* Tab switch */}
                <div className="t124n-qrTabs">
                  <button
                    type="button"
                    className={`t124n-qrTab ${lixiTab === 'groom' ? 't124n-qrTab--active' : ''}`}
                    onClick={() => setLixiTab('groom')}
                  >
                    Chú Rể (Văn Toàn)
                  </button>
                  <button
                    type="button"
                    className={`t124n-qrTab ${lixiTab === 'bride' ? 't124n-qrTab--active' : ''}`}
                    onClick={() => setLixiTab('bride')}
                  >
                    Cô Dâu (Thanh Diệp)
                  </button>
                </div>

                {lixiTab === 'groom' ? (
                  <div className="t124n-qrBox">
                    <img
                      src="https://api.vietqr.io/image/970436-000000000002-8QRIBFT.jpg?accountName=NGUYEN%20VAN%20TOAN&amount=0"
                      alt="QR Chú Rể"
                      className="t124n-qrImg"
                    />
                    <p className="t124n-qrInfoItem"><strong>Ngân hàng:</strong> Vietcombank</p>
                    <p className="t124n-qrInfoItem"><strong>Chủ tài khoản:</strong> NGUYEN VAN TOAN</p>
                    <p className="t124n-qrInfoItem">
                      <strong>Số tài khoản:</strong> 1012345678
                      <button
                        type="button"
                        className="t124n-copyBtn"
                        onClick={() => handleCopyAccount('1012345678')}
                      >
                        {copiedBank ? 'Đã sao chép!' : 'Sao chép'}
                      </button>
                    </p>
                  </div>
                ) : (
                  <div className="t124n-qrBox">
                    <img
                      src="https://api.vietqr.io/image/970418-999999999990-8QRIBFT.jpg?accountName=TRAN%20THANH%20DIEP&amount=0"
                      alt="QR Cô Dâu"
                      className="t124n-qrImg"
                    />
                    <p className="t124n-qrInfoItem"><strong>Ngân hàng:</strong> BIDV</p>
                    <p className="t124n-qrInfoItem"><strong>Chủ tài khoản:</strong> TRAN THANH DIEP</p>
                    <p className="t124n-qrInfoItem">
                      <strong>Số tài khoản:</strong> 999999999990
                      <button
                        type="button"
                        className="t124n-copyBtn"
                        onClick={() => handleCopyAccount('999999999990')}
                      >
                        {copiedBank ? 'Đã sao chép!' : 'Sao chép'}
                      </button>
                    </p>
                  </div>
                )}

                <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
                  Cảm ơn tình cảm và lời chúc phúc của quý khách dành cho hai vợ chồng!
                </p>
              </div>
            </div>
          )}

          {/* ── MODAL: LIGHTBOX PHÓNG TO ẢNH ── */}
          {lightboxIdx !== null && (
            <div
              className="t124n-lightboxOverlay"
              onClick={() => setLightboxIdx(null)}
            >
              <div
                className="t124n-lightboxModal"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className="t124n-lightboxClose"
                  onClick={() => setLightboxIdx(null)}
                  aria-label="Đóng ảnh"
                >
                  <X size={24} />
                </button>
                <img
                  src={ALBUM_IMAGES[lightboxIdx]}
                  alt={`Ảnh cưới ${lightboxIdx + 1}`}
                  className="t124n-lightboxImg"
                />
                <div className="t124n-lightboxNav">
                  <button
                    type="button"
                    className="t124n-lightboxArrow"
                    onClick={() =>
                      setLightboxIdx(
                        (lightboxIdx - 1 + ALBUM_IMAGES.length) %
                          ALBUM_IMAGES.length
                      )
                    }
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span>
                    {lightboxIdx + 1} / {ALBUM_IMAGES.length}
                  </span>
                  <button
                    type="button"
                    className="t124n-lightboxArrow"
                    onClick={() =>
                      setLightboxIdx((lightboxIdx + 1) % ALBUM_IMAGES.length)
                    }
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      )}
    </div>
  );
}
