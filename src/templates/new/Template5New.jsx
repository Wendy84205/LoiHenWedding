import React from 'react';
import { Heart } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template5New.css';
import './auditFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-5';

export default function Template5New() {
  const count = useInvitationPage('template5new-page', '2027-02-14T11:00:00+07:00');
  return (
    <main className="new-invitation-page t5n">
      <MusicButton className="t5n-music" />
      <section className="t5n-hero">
        <Reveal as="p" direction="down">YOU ARE MY TODAY<br />AND ALL OF MY TOMORROW</Reveal>
        <Reveal as="img" src={`${a}/image-1.jpg`} alt="Minh Khang và Thảo Vy" direction="scale" />
        <Reveal as="h1">14.2.2027</Reveal>
        <Reveal as="h2">WELCOME TO OUR WEDDING</Reveal>
      </section>

      <section className="t5n-invite">
        <Reveal><Heart /><h2>WEDDING INVITATION</h2></Reveal>
        <Reveal as="img" src={`${a}/image-2.jpg`} alt="Minh Khang và Thảo Vy trong studio đỏ" />
        <Reveal as="p">Chúng mình trân trọng kính mời bạn đến dự ngày vui và cùng gia đình chia sẻ khoảnh khắc thiêng liêng nhất.</Reveal>
        <Reveal className="t5n-date" direction="scale"><span>THÁNG 02</span><strong>14</strong><span>NĂM 2027</span></Reveal>
        <Reveal><h3>11:00 · CHỦ NHẬT</h3><b>TRUNG TÂM TIỆC CƯỚI THE RED HOUSE</b><p>88 Nguyễn Du, Quận 1, TP. Hồ Chí Minh</p><VenueLink query="Nguyen Du District 1 Ho Chi Minh">Xem bản đồ</VenueLink></Reveal>
      </section>

      <section className="t5n-love">
        <Reveal direction="right"><img src={`${a}/image-3.jpg`} alt="Cô dâu Thảo Vy" /><h2>LOVE</h2></Reveal>
        <Reveal direction="left"><img src={`${a}/image-4.jpg`} alt="Chú rể Minh Khang" /><p>I FALL FOR YOU<br />EVERY SINGLE DAY</p></Reveal>
        <Reveal as="img" src={`${a}/image-6.jpg`} alt="Cô dâu chú rể trong ngày cưới" />
      </section>

      <section className="t5n-calendarSection">
        <Reveal as="h2">Save our date</Reveal>
        <Reveal direction="scale"><WeddingCalendar month="FEBRUARY 2027" weddingDay={14} offset={0} /></Reveal>
        <Countdown values={count} className="t5n-count" />
      </section>

      <section className="t5n-gallery"><Reveal as="h2">We choose each other</Reveal><div><Reveal as="img" direction="right" src={`${a}/image-7.jpg`} alt="Album sắc đỏ" /><Reveal as="img" direction="left" src={`${a}/image-8.jpg`} alt="Album tình yêu" /></div></section>
      <section className="t5n-ending"><RsvpForm className="t5n-rsvp" accent="#9f2c1f" /><GiftNote className="t5n-gift" /><Reveal as="h2">Thank you</Reveal></section>
    </main>
  );
}
