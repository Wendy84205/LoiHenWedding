import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import './template127New.css';

const a = '/assets/new-templates/thiep-cuoi-127';

const GROOM = 'Quốc Đại';
const BRIDE = 'Thu Thảo';
const WEDDING_DATE_TEXT = '25 tháng 10, 2026';
const WEDDING_ISO = '2026-10-25T09:30:00+07:00';
const GUEST_NAME = 'Bạn & người thương';

const T127N_EASE = [0.22, 1, 0.36, 1];

const T127N_IN = {
  up: { opacity: 0, y: 26 },
  down: { opacity: 0, y: -18 },
  fade: { opacity: 0 },
};

function T127nReveal({
  as = 'div',
  direction = 'up',
  delay = 0,
  duration = 1,
  className,
  children,
  ...props
}) {
  const reduceMotion = useReducedMotion();
  const motionAny = motion;
  const Component = (typeof as === 'string' && motionAny[as]) || motionAny.div;

  return (
    <Component
      className={className}
      initial={reduceMotion ? false : { ...T127N_IN[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -45px 0px' }}
      transition={reduceMotion ? { duration: 0 } : { duration, delay, ease: T127N_EASE }}
      {...props}
    >
      {children}
    </Component>
  );
}

function useCountdown(iso) {
  const [left, setLeft] = useState(() => new Date(iso).getTime() - Date.now());
  useEffect(() => {
    const id = setInterval(
      () => setLeft(new Date(iso).getTime() - Date.now()),
      1000,
    );
    return () => clearInterval(id);
  }, [iso]);
  const t = Math.max(0, left);
  return {
    d: Math.floor(t / 86400000),
    h: Math.floor(t / 3600000) % 24,
    m: Math.floor(t / 60000) % 60,
    s: Math.floor(t / 1000) % 60,
  };
}

const CountdownGrid = () => {
  const { d, h, m, s } = useCountdown(WEDDING_ISO);
  return (
    <div className="t127n-countdown">
      <T127nReveal direction="up" className="t127n-countdownTitle">
        Đếm ngược đến ngày chung đôi
      </T127nReveal>
      <div className="t127n-countdownGrid">
        {[
          { value: d, label: 'Ngày' },
          { value: h, label: 'Giờ' },
          { value: m, label: 'Phút' },
          { value: s, label: 'Giây' },
        ].map(({ value, label }, i) => (
          <T127nReveal
            key={label}
            direction="up"
            delay={0.1 + i * 0.08}
            className="t127n-countCell"
          >
            <span className="t127n-countValue">{String(value).padStart(2, '0')}</span>
            <span className="t127n-countLabel">{label}</span>
          </T127nReveal>
        ))}
      </div>
      <T127nReveal direction="fade" delay={0.3} className="t127n-countdownNote">
        09:30 · Chủ Nhật, {WEDDING_DATE_TEXT}
      </T127nReveal>
    </div>
  );
};

function Cover({ onOpen, isOpening }) {
  const reduce = useReducedMotion();
  const cardAnim = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 40, scale: 0.96 },
        animate: isOpening
          ? { opacity: 1, y: -20, scale: 1.05 }
          : { opacity: 1, y: 0, scale: 1 },
        transition: { duration: isOpening ? 0.5 : 0.8, ease: T127N_EASE },
      };
  const item = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: T127N_EASE },
        };

  return (
    <motion.div
      className={`t127n-coverOverlay ${isOpening ? 't127n-coverOverlay--opening' : ''}`}
      aria-label="Bìa thiệp cưới"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.1, filter: 'blur(8px)' }}
      transition={{ duration: reduce ? 0.01 : 0.6, ease: T127N_EASE }}
    >
      <div className="t127n-contentLayer">
        <motion.div className="t127n-coverCard" {...cardAnim}>
          <img
            src={`${a}/flower_top.webp`}
            alt=""
            aria-hidden="true"
            className="t127n-coverFlower t127n-coverFlower--top"
          />
          <img
            src={`${a}/flower_paralax.webp`}
            alt=""
            aria-hidden="true"
            className="t127n-coverFlower t127n-coverFlower--bottom"
          />
          <motion.div className="t127n-coverKicker" {...item(0.15)}>
            Save the date
          </motion.div>
          <motion.div className="t127n-coverTogether" {...item(0.25)}>
            Together Forever
          </motion.div>
          <motion.h1 className="t127n-coverNames" {...item(0.35)}>
            {BRIDE} <span>&amp;</span> {GROOM}
          </motion.h1>
          <motion.div className="t127n-coverGuest" {...item(0.45)}>
            Kính mời {GUEST_NAME} — Chạm vào con dấu để mở thiệp
          </motion.div>
          <motion.button
            type="button"
            className={`t127n-seal ${isOpening ? 't127n-seal--break' : ''}`}
            onClick={onOpen}
            disabled={isOpening}
            aria-busy={isOpening}
            aria-label="Mở thiệp cưới"
            {...item(0.55)}
          >
            <span className="t127n-sealHeart" aria-hidden="true">❦</span>
            <span className="t127n-sealRing" aria-hidden="true" />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Template127New() {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const openTimerRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    document.documentElement.classList.add('template127new-page');
    document.body.classList.add('template127new-page');
    return () => {
      document.documentElement.classList.remove('template127new-page');
      document.body.classList.remove('template127new-page');
    };
  }, []);

  useEffect(() => () => clearTimeout(openTimerRef.current), []);

  useEffect(() => {
    if (opened) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [opened]);

  const handleOpen = () => {
    if (openTimerRef.current !== null || opened || opening) return;
    setOpening(true);
    openTimerRef.current = setTimeout(
      () => {
        setOpened(true);
        openTimerRef.current = setTimeout(
          () => {
            setOpening(false);
            openTimerRef.current = null;
          },
          reduceMotion ? 0 : 1000,
        );
      },
      reduceMotion ? 0 : 650,
    );
  };

  return (
    <div className="t127n" data-testid="thao-dai-template">
      <AnimatePresence mode="wait">
        {!opened && <Cover key="cover" onOpen={handleOpen} isOpening={opening} />}
      </AnimatePresence>

      <motion.div
        className={`t127n-sheet ${opened ? 't127n-sheet--entered' : ''}`}
        aria-hidden={!opened}
        initial={false}
        animate={opened && !reduceMotion ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: T127N_EASE }}
      >
        <main className="t127n-main">
          {/* Hero */}
          <header className="t127n-hero">
            <T127nReveal direction="fade" className="t127n-heroTogether">
              Together Forever
            </T127nReveal>
            <T127nReveal as="h1" direction="up" delay={0.1} className="t127n-heroNames">
              {BRIDE} <span>&amp;</span> {GROOM}
            </T127nReveal>
            <div className="t127n-couple">
              <T127nReveal direction="up" delay={0.2} className="t127n-coupleItem">
                <div className="t127n-coupleRole">Chú rể</div>
                <div className="t127n-coupleName">{GROOM}</div>
                <p className="t127n-coupleQuote">“Anh chọn em, cho hôm nay và tất cả những ngày sau.”</p>
              </T127nReveal>
              <T127nReveal direction="up" delay={0.3} className="t127n-coupleItem">
                <div className="t127n-coupleRole">Cô dâu</div>
                <div className="t127n-coupleName">{BRIDE}</div>
                <p className="t127n-coupleQuote">“Em chọn anh, để cùng nhau đi hết một đời.”</p>
              </T127nReveal>
            </div>
          </header>

          {/* Countdown */}
          <CountdownGrid />

          {/* Thông tin lễ vu quy */}
          <section className="t127n-section t127n-vuquy">
            <T127nReveal direction="up" className="t127n-sectionHead">
              <span className="t127n-sectionTitle">Thông tin lễ vu quy</span>
              <span className="t127n-sectionRule" aria-hidden="true" />
            </T127nReveal>
            <div className="t127n-familyGrid">
              <T127nReveal direction="up" delay={0.1} className="t127n-familyCard">
                <div className="t127n-familyRole">Nhà gái</div>
                <div className="t127n-familyHost">Ông Bà Trần Văn Tám — Bùi Thị Tâm</div>
                <div className="t127n-familyAddr">Thôn Vĩnh Lộc, xã Phúc Lộc, TP Hà Nội</div>
              </T127nReveal>
              <T127nReveal direction="up" delay={0.2} className="t127n-familyCard">
                <div className="t127n-familyRole">Nhà trai</div>
                <div className="t127n-familyHost">Ông Bà Đào Quốc Việt — Đặng Thị Sự</div>
                <div className="t127n-familyAddr">Đường Bãi Cháy, xã Phúc Lộc, TP Hà Nội</div>
              </T127nReveal>
            </div>
            <T127nReveal direction="up" delay={0.3} className="t127n-announce">
              <p className="t127n-announceHead">Trân trọng báo tin lễ vu quy của con chúng tôi</p>
              <p className="t127n-announceCouple">
                {BRIDE} — Thứ Nữ &amp; {GROOM} — Trưởng Nam
              </p>
              <p className="t127n-announceTime">
                Lễ vu quy được cử hành tại tư gia nhà gái vào lúc 09:30 Chủ Nhật, {WEDDING_DATE_TEXT}
                <br />(Tức ngày 16 tháng 09 năm Bính Ngọ)
              </p>
            </T127nReveal>
          </section>

          {/* Album */}
          <section className="t127n-section t127n-album">
            <T127nReveal direction="up" className="t127n-sectionHead">
              <span className="t127n-sectionTitle">Album ảnh</span>
              <span className="t127n-sectionRule" aria-hidden="true" />
            </T127nReveal>
            <div className="t127n-albumGrid">
              <T127nReveal direction="up" delay={0.1} className="t127n-albumItem">
                <img src={`${a}/flower_top.webp`} alt="" className="t127n-albumImg" />
              </T127nReveal>
              <T127nReveal direction="up" delay={0.2} className="t127n-albumItem">
                <img src={`${a}/flower_paralax.webp`} alt="" className="t127n-albumImg" />
              </T127nReveal>
            </div>
          </section>

          {/* Thông tin tiệc cưới */}
          <section className="t127n-section t127n-party">
            <T127nReveal direction="up" className="t127n-sectionHead">
              <span className="t127n-sectionTitle">Thông tin tiệc cưới</span>
              <span className="t127n-sectionRule" aria-hidden="true" />
            </T127nReveal>
            <T127nReveal direction="up" delay={0.1} className="t127n-partyTimeGrid">
              <div className="t127n-partyTimeCell">
                <span className="t127n-partyTimeLabel">Đón khách</span>
                <span className="t127n-partyTimeValue">16:00</span>
              </div>
              <div className="t127n-partyTimeCell">
                <span className="t127n-partyTimeLabel">Khai tiệc</span>
                <span className="t127n-partyTimeValue">17:00</span>
              </div>
            </T127nReveal>
            <T127nReveal direction="up" delay={0.2} className="t127n-partyVenue">
              <div className="t127n-partyVenueLabel">Tại tư gia nhà gái</div>
              <div className="t127n-partyVenueAddr">
                Số 8, Ngõ 18, Thôn Vĩnh Lộc, Xã Phúc Lộc, Thành Phố Hà Nội
              </div>
            </T127nReveal>
          </section>


          {/* Lịch trình */}
          <section className="t127n-section t127n-timeline">
            <T127nReveal direction="up" className="t127n-sectionHead">
              <span className="t127n-sectionTitle">Lịch trình lễ cưới</span>
              <span className="t127n-sectionRule" aria-hidden="true" />
            </T127nReveal>
            <div className="t127n-timelineDay">Thứ Bảy · 24.10.2026</div>
            <T127nReveal direction="up" delay={0.1} className="t127n-timelineItem">
              <span className="t127n-timelineTime">16:00</span>
              <span className="t127n-timelineDesc">Hẹn nhau tại ngày vui — Check-in &amp; chụp ảnh</span>
            </T127nReveal>
            <T127nReveal direction="up" delay={0.15} className="t127n-timelineItem">
              <span className="t127n-timelineTime">17:00</span>
              <span className="t127n-timelineDesc">Cùng nhau chung vui — Dự tiệc cùng gia đình</span>
            </T127nReveal>
            <T127nReveal direction="up" delay={0.2} className="t127n-timelineItem">
              <span className="t127n-timelineTime">20:00</span>
              <span className="t127n-timelineDesc">Chào đón nhà trai — Giao lưu cùng bạn bè chú rể</span>
            </T127nReveal>
            <div className="t127n-timelineDay">Chủ Nhật · 25.10.2026</div>
            <T127nReveal direction="up" delay={0.25} className="t127n-timelineItem">
              <span className="t127n-timelineTime">09:30</span>
              <span className="t127n-timelineDesc">Lễ Vu Quy — Thực hiện nghi thức Vu Quy tại tư gia nhà gái</span>
            </T127nReveal>
          </section>

          {/* RSVP */}
          <section className="t127n-section t127n-rsvp">
            <T127nReveal direction="up" className="t127n-sectionHead">
              <span className="t127n-sectionTitle">Xác nhận tham dự</span>
              <span className="t127n-sectionRule" aria-hidden="true" />
            </T127nReveal>
            <T127nReveal direction="up" delay={0.1} className="t127n-rsvpText">
              Tiệc cưới sẽ tổ chức tại tư gia nhà gái. Vui lòng xác nhận tham dự để gia đình chuẩn bị chu đáo.
            </T127nReveal>
            <T127nReveal direction="up" delay={0.2} className="t127n-rsvpBtns">
              <a href="https://zalo.me/" target="_blank" rel="noopener noreferrer" className="t127n-btn t127n-btn--primary">Xác nhận tham dự</a>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="t127n-btn t127n-btn--ghost">Xem chỉ đường</a>
            </T127nReveal>
          </section>

          {/* Guestbook */}
          <section className="t127n-section t127n-guestbook">
            <T127nReveal direction="up" className="t127n-sectionHead">
              <span className="t127n-sectionTitle">Sổ lưu bút</span>
              <span className="t127n-sectionRule" aria-hidden="true" />
            </T127nReveal>
            <T127nReveal direction="up" delay={0.1} className="t127n-guestbookText">
              Gợi ý: Gửi đến hai chúng tôi những lời chúc yêu thương qua Zalo.
            </T127nReveal>
            <T127nReveal direction="up" delay={0.2} className="t127n-rsvpBtns">
              <a href="https://zalo.me/" target="_blank" rel="noopener noreferrer" className="t127n-btn t127n-btn--primary">Gửi lời chúc</a>
            </T127nReveal>
          </section>

          {/* Footer */}
          <footer className="t127n-foot">
            <T127nReveal direction="fade" className="t127n-footThanks">
              Sự hiện diện và những lời chúc phúc của Quý khách là niềm vinh hạnh, đồng thời là món quà ý nghĩa đối với hai bên gia đình và chúng tôi trong ngày trọng đại này. Trân trọng cảm ơn!
            </T127nReveal>
            <p className="t127n-footNames">{BRIDE} &amp; {GROOM}</p>
            <p className="t127n-footDate">{WEDDING_DATE_TEXT}</p>
          </footer>
        </main>
      </motion.div>
    </div>
  );
}

