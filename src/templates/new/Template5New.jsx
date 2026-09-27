import React from 'react';
import { Heart } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, WishForm, useInvitationPage } from './NewInvitationCommon.jsx';
import './template5New.css';

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

      <section className="t5n-families"><Reveal><small>WITH THE BLESSINGS OF OUR FAMILIES</small><h2>Hai gia đình<br />trân trọng báo tin</h2></Reveal><div><Reveal><span>NHÀ TRAI</span><h3>Ông Nguyễn Văn Hùng<br />Bà Lê Thị Hạnh</h3><small>Gia đình Minh Khang</small></Reveal><i aria-hidden="true">&amp;</i><Reveal><span>NHÀ GÁI</span><h3>Ông Trần Quốc Bảo<br />Bà Nguyễn Thị Lan</h3><small>Gia đình Thảo Vy</small></Reveal></div></section>

      <section className="t5n-love">
        <Reveal direction="right"><img src={`${a}/image-3.jpg`} alt="Cô dâu Thảo Vy" /><h2>LOVE</h2></Reveal>
        <Reveal direction="left"><img src={`${a}/image-4.jpg`} alt="Chú rể Minh Khang" /><p>I FALL FOR YOU<br />EVERY SINGLE DAY</p></Reveal>
        <Reveal as="img" src={`${a}/image-6.jpg`} alt="Cô dâu chú rể trong ngày cưới" />
      </section>

      <section className="t5n-calendarSection" id="t5n-calendar">
        <Reveal as="h2">Save our date</Reveal>
        <Reveal direction="scale"><WeddingCalendar month="FEBRUARY 2027" weddingDay={14} offset={0} /></Reveal>
        <Countdown values={count} className="t5n-count" />
        <Reveal className="t5n-timeline" id="t5n-timeline"><small>CHỦ NHẬT · 14.02.2027</small><h3>Chương trình ngày vui</h3><div><b>10:30</b><span>Đón khách</span></div><div><b>11:00</b><span>Lễ thành hôn</span></div><div><b>11:30</b><span>Khai tiệc</span></div><div><b>13:00</b><span>Nâng ly &amp; chụp hình lưu niệm</span></div></Reveal>
        <Reveal className="t5n-dresscode" id="t5n-dresscode"><small>GỢI Ý TRANG PHỤC</small><h3>Red, rose &amp; champagne</h3><p>Hồng đất, champagne và những gam màu ấm sẽ hợp với không khí ngày Valentine. Xin dành sắc trắng cho cô dâu nhé.</p><div aria-label="Bảng màu trang phục gợi ý"><i /><i /><i /><i /></div><span>ROSE · CHAMPAGNE · BURGUNDY · GOLD</span></Reveal>
      </section>

      <section className="t5n-gallery"><Reveal as="h2">We choose each other</Reveal><div><Reveal as="img" direction="right" src={`${a}/image-7.jpg`} alt="Album sắc đỏ" /><Reveal as="img" direction="left" src={`${a}/image-8.jpg`} alt="Album tình yêu" /></div></section>
      <section className="t5n-ending"><RsvpForm className="t5n-rsvp" accent="#9f2c1f" /><div className="t5n-wishes"><Reveal><small>A NOTE TO KEEP</small><h3>Gửi đôi mình một lời chúc</h3><p>Mỗi lời chúc của bạn sẽ là một kỷ niệm ngọt ngào trong ngày chung đôi.</p></Reveal><WishForm className="t5n-wishForm" accent="#9f2c1f" /></div><GiftNote className="t5n-gift" /><Reveal as="h2">Thank you</Reveal></section>
    </main>
  );
}
