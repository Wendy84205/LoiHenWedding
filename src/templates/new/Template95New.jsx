import React from 'react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template95New.css';
import './auditFidelity.css';
import './fontFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-95';

export default function Template95New() {
  const count = useInvitationPage('template95new-page', '2027-11-29T15:15:00+07:00');

  return <main className="new-invitation-page t95n">
    <MusicButton className="t95n-music" />

    <section className="t95n-hero">
      <Reveal className="t95n-heading" direction="down">
        <small>WEDDING INVITATION</small><i />
        <h1><span>GIA HUY</span><b>&amp;</b><span>BẢO NGỌC</span></h1><i />
        <p>OUR WEDDING DAY</p><strong>2027&nbsp;&nbsp;11&nbsp;&nbsp;29 <em>|</em> MON <em>|</em> 3:15PM</strong>
      </Reveal>
      <Reveal as="img" src={`${a}/image-1.webp`} alt="Gia Huy và Bảo Ngọc" direction="up" />
    </section>

    <section className="t95n-monogram">
      <Reveal><h2>HUY <i>&amp;</i> NGỌC</h2><p>29.11.2027</p><span>Trân trọng kính mời</span></Reveal>
      <Reveal className="t95n-double" direction="left">囍</Reveal>
    </section>

    <section className="t95n-invite">
      <Reveal><small>KÍNH MỜI QUÝ KHÁCH</small><h2>Đến dự tiệc mừng lễ thành hôn của chúng tôi</h2><p>Vào hồi 15h15 · Thứ Hai · 29.11.2027</p></Reveal>
      <Reveal as="img" src={`${a}/image-2.webp`} alt="Ảnh cưới Gia Huy và Bảo Ngọc" direction="scale" />
      <Countdown values={count} className="t95n-count" />
    </section>

    <section className="t95n-location">
      <Reveal><small>THE CEREMONY</small><h2>Promes Center</h2><p>48 Lê Văn Lương, Hà Nội</p><VenueLink query="48 Le Van Luong Hanoi">Xem chỉ đường</VenueLink></Reveal>
      <Reveal className="t95n-families"><span>NHÀ TRAI<br /><b>HÀ NỘI</b></span><i /><span>NHÀ GÁI<br /><b>QUỐC OAI</b></span></Reveal>
    </section>

    <section className="t95n-day">
      <WeddingCalendar month="THÁNG 11 · 2027" weddingDay={29} offset={0} />
      <Reveal as="img" src={`${a}/image-3.webp`} alt="Ảnh cưới nghệ thuật" direction="scale" />
      <Reveal><small>WE ARE</small><h2>GETTING MARRIED</h2><p>29.11.2027</p></Reveal>
    </section>

    <section className="t95n-collage">
      <Reveal as="img" src={`${a}/image-4.webp`} alt="Bảo Ngọc trong ngày cưới" direction="right" />
      <Reveal as="img" src={`${a}/image-5.webp`} alt="Khoảnh khắc bên nhau" direction="down" />
      <Reveal as="img" src={`${a}/image-6.webp`} alt="Ảnh cưới Gia Huy và Bảo Ngọc" direction="left" />
      <Reveal><h2>WE ARE<br />GETTING MARRIED</h2></Reveal>
    </section>

    <section className="t95n-end"><RsvpForm accent="#111" className="t95n-rsvp" /><GiftNote className="t95n-gift" /><Reveal className="t95n-thankPhoto"><img src={`${a}/image-1.webp`} alt="Gia Huy và Bảo Ngọc" /><span>Thank You,<br /><b>See you soon!</b></span></Reveal></section>
  </main>;
}
