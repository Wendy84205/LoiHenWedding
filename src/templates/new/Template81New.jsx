import React from 'react';
import { MusicButton, Reveal, RsvpForm, VenueLink, useInvitationPage } from './NewInvitationCommon.jsx';
import './template81New.css';
import './auditFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-81';

export default function Template81New() {
  useInvitationPage('template81new-page', '2027-11-28T16:30:00+07:00');
  return <main className="new-invitation-page t81n">
    <MusicButton className="t81n-music" />
    <section className="t81n-hero"><img src={`${a}/image-1.webp`} alt="Hoàng Bách và Quỳnh Anh" /><Reveal className="t81n-title"><small>WEDDING INVITATION</small><h1>Hoàng Bách <i>&amp;</i> Quỳnh Anh</h1><p>28 · 11 · 2027</p></Reveal></section>
    <section className="t81n-invite"><Reveal as="img" className="t81n-bow" src={`${a}/image-3.webp`} alt="Nơ trang trí" direction="scale" /><Reveal><small>TRÂN TRỌNG KÍNH MỜI</small><h2>Quý Khách</h2><p>Đến tham dự và chung vui<br />trong lễ thành hôn của chúng tôi.</p><strong>Hoàng Bách &amp; Quỳnh Anh</strong><p>28.11.2027<br />16H30 · CHỦ NHẬT</p><small>ADDRESS</small><h3>TƯ GIA NHÀ TRAI</h3><p>48 Lê Văn Lương, Hà Nội</p><VenueLink query="48 Le Van Luong Hanoi">Xem chỉ đường</VenueLink></Reveal></section>
    <section className="t81n-end"><Reveal as="img" className="t81n-doubleJoy" src={`${a}/image-4.webp`} alt="Biểu tượng song hỷ" direction="scale" /><RsvpForm accent="#9b1717" className="t81n-rsvp" /><Reveal as="h2">Hân hạnh được đón tiếp!</Reveal></section>
  </main>;
}
