import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import './template126New.css';

const a = '/assets/new-templates/thiep-cuoi-126';

const GROOM_SHORT = 'Tuấn Minh';
const BRIDE_SHORT = 'Mai Lan';
const EVENT_DATE_TEXT = '1 tháng 2, 2026';
const GUEST_NAME = 'Bạn & người thương';
const INVITE_MESSAGE = 'đến dự buổi tiệc chung vui cùng gia đình';

// 12 chữ 囍 trôi nổi (bám theo bản gốc — 3 tông màu vàng/đỏ, sway riêng).
const FLOAT_SYMBOLS = [
  { left: 6, size: 14, color: 'rgb(255, 193, 7)', sway: -18, dur: 15.2, delay: -1.2 },
  { left: 13.4, size: 22.4, color: 'rgb(255, 107, 107)', sway: 14.2, dur: 19.6, delay: 0.2 },
  { left: 21, size: 11.5, color: 'rgb(255, 215, 0)', sway: 24.5, dur: 17.4, delay: -6.5 },
  { left: 28.7, size: 18, color: 'rgb(255, 193, 7)', sway: -9.8, dur: 20.4, delay: -3.4 },
  { left: 35.2, size: 12.8, color: 'rgb(255, 107, 107)', sway: 27.3, dur: 14.6, delay: -9.1 },
  { left: 43.9, size: 23.6, color: 'rgb(255, 215, 0)', sway: -25.6, dur: 20.07, delay: -0.4 },
  { left: 50.8, size: 10.4, color: 'rgb(255, 193, 7)', sway: 11.7, dur: 16.8, delay: -12.3 },
  { left: 55.6, size: 18.5, color: 'rgb(255, 193, 7)', sway: 18.3, dur: 16.87, delay: 0.5 },
  { left: 64.9, size: 13.5, color: 'rgb(255, 107, 107)', sway: 21, dur: 21.78, delay: -0.1 },
  { left: 72.4, size: 20.2, color: 'rgb(255, 215, 0)', sway: -16.4, dur: 18.9, delay: -7.8 },
  { left: 81.6, size: 15.7, color: 'rgb(255, 193, 7)', sway: 26.1, dur: 15.9, delay: -4.6 },
  { left: 14.36, size: 23.6, color: 'rgb(255, 193, 7)', sway: 0.36, dur: 18.22, delay: 0.8 },
];

const T126N_IN = {
  up: { opacity: 0, y: 54 },
  down: { opacity: 0, y: -16 },
  left: { opacity: 0, x: 68 },
  right: { opacity: 0, x: -68 },
  scale: { opacity: 0, scale: 0.72 },
  fade: { opacity: 0 },
};

const T126N_EASE = [0.22, 1, 0.36, 1];

function T126nReveal({
  as = 'div',
  direction = 'up',
  delay = 0,
  duration = 1.2,
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
      initial={reduceMotion ? false : { ...T126N_IN[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -55px 0px' }}
      transition={reduceMotion ? { duration: 0 } : { duration, delay, ease: T126N_EASE }}
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
        transition: { duration: isOpening ? 0.55 : 0.9, ease: T126N_EASE },
      };
  const itemAnim = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: T126N_EASE },
        };

  return (
    <motion.div
      className={`t126n-coverOverlay ${isOpening ? 't126n-coverOverlay--opening' : ''}`}
      aria-label="Bìa thiệp cưới"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.12, filter: 'blur(10px)' }}
      transition={{ duration: reduce ? 0.01 : 0.65, ease: T126N_EASE }}
    >
      {/* Lớp 囍 trôi nổi */}
      <div className="t126n-floatLayer" aria-hidden="true">
        {FLOAT_SYMBOLS.map((s, i) => (
          <span
            key={i}
            className="t126n-floatSymbol"
            style={{
              left: `${s.left}%`,
              color: s.color,
              fontSize: `${s.size}px`,
              '--sway': `${s.sway}px`,
              animation: `ambient-rise ${s.dur}s ease-in-out ${s.delay}s infinite`,
            }}
          >
            囍
          </span>
        ))}
      </div>

      {/* Thẻ thiệp (frame Vườn Xuân) */}
      <div className="t126n-contentLayer">
        <motion.div
          className="t126n-frame"
          data-slr-theme="vuonxuan-green"
          {...cardAnim}
        >
          <div
            className={`t126n-seal ${isOpening ? 't126n-seal--break' : ''}`}
            aria-hidden="true"
          >
            <svg className="t126n-sealHeart" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          {isOpening && !reduce && (
            <span className="t126n-sealRing" aria-hidden="true" />
          )}

          <div className="t126n-cardShadow">
            <div className="t126n-card">
              <img
                src={`${a}/flower_top.webp`}
                alt=""
                aria-hidden="true"
                className="t126n-art t126n-flowerTop"
              />
              <img
                src={`${a}/flower_paralax.webp`}
                alt=""
                aria-hidden="true"
                className="t126n-art t126n-flowerBottom"
              />

              <div className="t126n-textWrap">
                <motion.h1 className="t126n-coupleName" {...itemAnim(0.25)}>
                  <span>{BRIDE_SHORT} </span>
                  <span className="t126n-coupleAnd">&amp;</span>
                  <span>{GROOM_SHORT}</span>
                </motion.h1>

                <motion.div className="t126n-divider" {...itemAnim(0.35)}>
                  <span className="t126n-dividerLine t126n-dividerLine--left" />
                  <span className="t126n-dividerFlower">❦</span>
                  <span className="t126n-dividerLine t126n-dividerLine--right" />
                </motion.div>

                <motion.div className="t126n-date" {...itemAnim(0.42)}>
                  <span>{EVENT_DATE_TEXT}</span>
                </motion.div>

                <motion.div className="t126n-invitation" {...itemAnim(0.5)}>
                  <p className="t126n-invitationLabel">
                    <span>Kính mời</span>
                  </p>
                  <div className="t126n-guestBadge">
                    <h2>{GUEST_NAME}</h2>
                  </div>
                  <p className="t126n-invitationText">
                    <span>{INVITE_MESSAGE}</span>
                  </p>
                </motion.div>

                <motion.button
                  type="button"
                  className="t126n-openButton"
                  onClick={onOpen}
                  disabled={isOpening}
                  aria-busy={isOpening}
                  aria-label="Mở thiệp cưới"
                  {...itemAnim(0.6)}
                >
                  <span>{isOpening ? 'Đang mở…' : 'Mở thiệp'}</span>
                  <span className="t126n-openButtonShine" aria-hidden="true" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Template126New() {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [veilGone, setVeilGone] = useState(true);
  const openTimerRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    document.documentElement.classList.add('template126new-page');
    document.body.classList.add('template126new-page');
    return () => {
      document.documentElement.classList.remove('template126new-page');
      document.body.classList.remove('template126new-page');
    };
  }, []);

  useEffect(() => {
    return () => clearTimeout(openTimerRef.current);
  }, []);

  useEffect(() => {
    if (opened) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [opened]);

  // Đấm nút seal, card bay lên rồi bìa Zoom-out để lộ thiệp chính.
  const handleOpen = () => {
    if (openTimerRef.current !== null || opened || opening) return;
    setOpening(true);
    setVeilGone(false);
    openTimerRef.current = setTimeout(
      () => {
        setOpened(true);
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            setVeilGone(true);
          });
        });
        openTimerRef.current = setTimeout(
          () => {
            setOpening(false);
            openTimerRef.current = null;
          },
          reduceMotion ? 0 : 1250,
        );
      },
      reduceMotion ? 0 : 880,
    );
  };

  return (
    <div className="t126n" data-testid="vuon-xuan-template">
      {/* Bìa mở đầu */}
      <AnimatePresence mode="wait">
        {!opened && <Cover key="cover" onOpen={handleOpen} isOpening={opening} />}
      </AnimatePresence>

      {/* Vệt sáng lóe lên khi mở */}
      {!veilGone && (
        <div className="t126n-openVeil" aria-hidden="true">
          <span className="t126n-openVeil-ring" />
          <span className="t126n-openVeil-ring t126n-openVeil-ring--late" />
          <span className="t126n-openVeil-flash" />
        </div>
      )}

      {/* Thiệp chính (nội dung chi tiết sẽ bổ sung ở bước sau) */}
      <motion.div
        className={`t126n-sheet ${opened ? 't126n-sheet--entered' : ''}`}
        aria-hidden={!opened}
        initial={false}
        animate={
          opened && !reduceMotion
            ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
            : {}
        }
        transition={{ duration: 1.05, ease: T126N_EASE }}
      >
        <main className="t126n-main">
          <header className="t126n-hero">
            <img
              src={`${a}/flower_top.webp`}
              alt=""
              aria-hidden="true"
              className="t126n-heroFlower t126n-heroFlower--top"
            />
            <img
              src={`${a}/flower_paralax.webp`}
              alt=""
              aria-hidden="true"
              className="t126n-heroFlower t126n-heroFlower--bottom"
            />
            <T126nReveal direction="fade" className="t126n-heroKicker">
              Wedding Invitation
            </T126nReveal>
            <h1 className="t126n-heroNames">
              <T126nReveal as="span" direction="left" delay={0.1}>
                {BRIDE_SHORT}
              </T126nReveal>
              <T126nReveal as="span" direction="fade" delay={0.25}>
                &amp;
              </T126nReveal>
              <T126nReveal as="span" direction="right" delay={0.4}>
                {GROOM_SHORT}
              </T126nReveal>
            </h1>
            <T126nReveal direction="up" delay={0.55} className="t126n-heroDate">
              {EVENT_DATE_TEXT}
            </T126nReveal>
          </header>

          <section className="t126n-cardSection">
            <T126nReveal direction="up" className="t126n-infoCard">
              <h2>Lễ Thành Hôn</h2>
              <div className="t126n-infoDivider">
                <span />
                ❦
                <span />
              </div>
              <p className="t126n-infoDate">{EVENT_DATE_TEXT}</p>
              <p className="t126n-infoText">
                Trân trọng kính mời {GUEST_NAME} {INVITE_MESSAGE}.
              </p>
            </T126nReveal>
          </section>

          <footer className="t126n-foot">
            <p>Happy Wedding — Mai Lan &amp; Tuấn Minh</p>
          </footer>
        </main>
      </motion.div>
    </div>
  );
}