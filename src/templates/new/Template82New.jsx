import React from 'react';
import { MusicButton, Reveal, RsvpForm, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template82New.css';

const a = '/assets/new-templates/thiep-cuoi-82';

export default function Template82New() {
  useInvitationPage('template82new-page', '2027-11-29T16:00:00+07:00');
  return <main className="new-invitation-page t82n">
    <MusicButton className="t82n-music" />
    <section className="t82n-hero">
      <Reveal as="h1" direction="down">OUR WEDDING</Reveal>
      <Reveal as="strong">29.11.2027</Reveal>
      <Reveal as="img" src={`${a}/image-4.webp`} alt="Minh họa cô dâu chú rể" direction="up" duration={1.8} />
    </section>
    <section className="t82n-letter">
      <Reveal as="h2">INVITATION</Reveal>
      <Reveal className="t82n-letterCard" direction="scale">
        <img src={`${a}/image-6.webp`} alt="Minh họa đôi uyên ương" />
        <p>Chúng tôi chân thành mời bạn và gia đình đến tham dự lễ cưới. Sự hiện diện cùng những lời chúc phúc của bạn sẽ là niềm vui và vinh hạnh lớn đối với chúng tôi.</p>
        <div className="t82n-couple">
          <span><img src={`${a}/image-2.webp`} alt="Chú rể Văn Nam" /><small>Chú rể</small><b>Văn Nam</b></span>
          <span><img src={`${a}/image-1.webp`} alt="Cô dâu Hà Anh" /><small>Cô dâu</small><b>Hà Anh</b></span>
        </div>
      </Reveal>
    </section>
    <section className="t82n-event">
      <Reveal as="h2">TIME/ADDRESS</Reveal>
      <Reveal className="t82n-eventCard">
        <WeddingCalendar month="29 . 11 . 2027" weddingDay={29} offset={6} />
        <iframe title="Bản đồ địa điểm tổ chức" loading="lazy" src="https://www.google.com/maps?q=48+Le+Van+Luong+Hanoi&output=embed" />
        <p>Thứ Hai ngày 29 tháng 11 năm 2027<br />Nhằm ngày 22 tháng 10 Âm lịch<br /><b>16:00 · 48 Lê Văn Lương, Hà Nội</b></p>
      </Reveal>
    </section>
    <section className="t82n-end">
      <Reveal as="h2">RSVP</Reveal>
      <Reveal className="t82n-rsvpFrame" direction="scale">
        <img src={`${a}/image-6.webp`} alt="Minh họa cô dâu chú rể" />
        <RsvpForm accent="#292929" className="t82n-rsvp" />
      </Reveal>
    </section>
  </main>;
}
