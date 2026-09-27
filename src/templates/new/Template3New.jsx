import React from 'react';
import { CalendarDays, Heart, MapPin, Music2 } from 'lucide-react';
import {
  GiftNote,
  MusicButton,
  Reveal,
  RsvpForm,
  VenueLink,
  WeddingCalendar,
  WishForm,
  useInvitationPage,
} from './NewInvitationCommon.jsx';
import './template3New.css';

const asset = '/assets/new-templates/thiep-cuoi-3';
const weddingDate = '2027-12-15T10:30:00+07:00';

const photos = [
  { src: 'image-2.webp', alt: 'Khoảnh khắc bên nhau của cô dâu và chú rể' },
  { src: 'image-3.webp', alt: 'Ảnh cưới trong ngày vui' },
  { src: 'image-5.webp', alt: 'Chân dung chú rể trong bộ ảnh cưới' },
  { src: 'image-6.webp', alt: 'Chân dung cô dâu trong bộ ảnh cưới' },
];

export default function Template3New() {
  useInvitationPage('template3new-page', weddingDate);

  return (
    <main className="new-invitation-page t3h">
      <MusicButton className="t3h-music" />

      <section className="t3h-cover" aria-labelledby="t3h-cover-title">
        <div className="t3h-cover-paper" />
        <div className="t3h-cover-inner">
          <span className="t3h-kicker">WE ARE GETTING MARRIED</span>
          <span className="t3h-cover-ornament" aria-hidden="true">囍</span>
          <img className="t3h-cover-photo" src={`${asset}/image-1.webp`} alt="Cô dâu và chú rể trong ngày cưới" />
          <div className="t3h-cover-copy">
            <span>TRÂN TRỌNG KÍNH MỜI</span>
            <h1 id="t3h-cover-title">Minh Trí <i>&amp;</i> Thanh Hằng</h1>
            <p>THỨ TƯ · 15 THÁNG 12 · 2027</p>
          </div>
          <a className="t3h-scroll" href="#t3h-invitation">MỞ LỜI MỜI <span>↓</span></a>
        </div>
      </section>

      <section className="t3h-invitation t3h-section" id="t3h-invitation">
        <Reveal className="t3h-section-label"><span>01</span><span>THÔNG TIN LỄ CƯỚI</span></Reveal>
        <div className="t3h-families">
          <Reveal className="t3h-family">
            <span>ÔNG BÀ</span>
            <p>Nguyễn Văn Minh<br />Trần Thị Thu Hà</p>
            <small>NHÀ TRAI · QUẢNG NINH</small>
          </Reveal>
          <span className="t3h-family-divider" aria-hidden="true">✦</span>
          <Reveal className="t3h-family">
            <span>ÔNG BÀ</span>
            <p>Lê Quang Huy<br />Phạm Thị Mai</p>
            <small>NHÀ GÁI · HẢI PHÒNG</small>
          </Reveal>
        </div>
        <Reveal className="t3h-announcement">
          <span>TRÂN TRỌNG BÁO TIN</span>
          <p>LỄ THÀNH HÔN CỦA CON CHÚNG TÔI</p>
        </Reveal>
        <div className="t3h-couple">
          <Reveal className="t3h-person"><span>TRƯỞNG NAM</span><h2>Minh Trí</h2></Reveal>
          <Reveal className="t3h-ampersand" aria-hidden="true">&amp;</Reveal>
          <Reveal className="t3h-person"><span>ÚT NỮ</span><h2>Thanh Hằng</h2></Reveal>
        </div>
        <Reveal className="t3h-ceremony">
          <span>LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI</span>
          <strong>TƯ GIA NHÀ TRAI</strong>
          <p>VÀO LÚC 10:30 · THỨ TƯ</p>
          <div className="t3h-big-date"><b>15</b><span>THÁNG 12<br /><i>NĂM 2027</i></span></div>
        </Reveal>
      </section>

      <section className="t3h-album t3h-section">
        <Reveal className="t3h-section-label"><span>02</span><span>ALBUM ẢNH</span></Reveal>
        <Reveal className="t3h-album-heading"><span>MỘT CHÚT KỶ NIỆM</span><h2>Những ngày<br /><i>mình có nhau</i></h2></Reveal>
        <div className="t3h-photo-grid">
          {photos.map((photo, index) => (
            <Reveal key={photo.src} className={`t3h-photo t3h-photo-${index + 1}`} delay={index * 0.04}>
              <img src={`${asset}/${photo.src}`} alt={photo.alt} loading="lazy" />
              <span>0{index + 1}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="t3h-details t3h-section">
        <Reveal className="t3h-section-label"><span>03</span><span>NGÀY VUI CỦA CHÚNG MÌNH</span></Reveal>
        <div className="t3h-detail-layout">
          <Reveal className="t3h-date-card">
            <CalendarDays size={18} />
            <span>THỨ TƯ</span>
            <strong>15</strong>
            <span>THÁNG 12 · 2027</span>
            <i>Chúng mình mong được đón bạn</i>
          </Reveal>
          <div className="t3h-event-copy">
            <Reveal><span>TIỆC CƯỚI NHÀ TRAI</span><h2>Hẹn gặp bạn<br />trong ngày vui.</h2></Reveal>
            <Reveal className="t3h-event-time"><b>10:00</b><span>Đón khách</span></Reveal>
            <Reveal className="t3h-event-time"><b>10:30</b><span>Lễ thành hôn</span></Reveal>
            <Reveal className="t3h-event-time"><b>11:00</b><span>Khai tiệc</span></Reveal>
            <VenueLink className="t3h-map-link" query="Bai Chay Quang Ninh Viet Nam"><MapPin size={15} /> Xem đường đến tư gia</VenueLink>
          </div>
        </div>
        <Reveal className="t3h-calendar-wrap">
          <WeddingCalendar className="t3h-calendar" month="DECEMBER · 2027" weddingDay={15} />
        </Reveal>
      </section>

      <section className="t3h-dresscode t3h-section">
        <Reveal><span className="t3h-overline">GỢI Ý TRANG PHỤC</span><h2>Dress code</h2><p>Để khung hình ngày vui hài hòa, bạn có thể chọn những gam màu ấm và nhẹ nhàng.</p></Reveal>
        <div className="t3h-swatches" aria-label="Bảng màu trang phục gợi ý"><i /><i /><i /><i /></div>
        <span className="t3h-palette-label">KEM · ĐỎ RƯỢU · NÂU · HỒNG ĐẤT</span>
      </section>

      <section className="t3h-rsvp t3h-section">
        <Reveal><span className="t3h-overline">SỰ HIỆN DIỆN CỦA BẠN</span><h2>Là niềm vui<br />của chúng mình.</h2><p>Cho chúng mình biết bạn sẽ đến chung vui nhé.</p></Reveal>
        <RsvpForm className="t3h-rsvp-form" accent="#6b1826" />
      </section>

      <section className="t3h-wishes t3h-section">
        <Reveal className="t3h-wish-intro"><Heart size={19} /><span>GỬI LỜI CHÚC</span><h2>Gửi đôi mình<br />một lời thương.</h2></Reveal>
        <WishForm className="t3h-wish-form" accent="#6b1826" />
      </section>

      <section className="t3h-gift-section">
        <GiftNote className="t3h-gift" title="HỘP QUÀ MỪNG">Nếu bạn muốn gửi lời chúc mừng bằng một món quà nhỏ, chúng mình xin trân trọng đón nhận.</GiftNote>
        <Reveal className="t3h-thanks"><Music2 size={17} /><span>CẢM ƠN BẠN ĐÃ CÙNG CHÚNG MÌNH GHI DẤU NGÀY NÀY</span><b>Minh Trí &amp; Thanh Hằng</b></Reveal>
      </section>
    </main>
  );
}
