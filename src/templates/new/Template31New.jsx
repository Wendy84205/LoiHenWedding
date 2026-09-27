import React from 'react';
import { Heart, ListMusic, Play, SkipBack, SkipForward } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, WishForm, useInvitationPage } from './NewInvitationCommon.jsx';
import './template31New.css';

const a = '/assets/new-templates/thiep-cuoi-31';

export default function Template31New() {
  const count = useInvitationPage('template31new-page', '2027-08-15T11:30:00+07:00');
  return (
    <main className="new-invitation-page t31n">
      <MusicButton className="t31n-music" />
      <section className="t31n-hero"><img src={`${a}/image-1.jpg`} alt="Duy Nam và Minh Anh" /><Reveal className="t31n-title"><small>THE WEDDING OF</small><h1>Duy Nam <i>&amp;</i> Minh Anh</h1><p>15 · 08 · 2027</p></Reveal></section>
      <section className="t31n-player"><Reveal className="t31n-controls" direction="scale"><Heart /><SkipBack /><Play /><SkipForward /><ListMusic /></Reveal><Reveal as="p">Hi~<br />Khi bạn đọc được những dòng này, điều đó có nghĩa là đám cưới của chúng mình đã bước vào giai đoạn đếm ngược rồi. Trong một năm thật đặc biệt này, chúng mình quyết định nắm tay nhau bước sang một chặng đường mới.</Reveal></section>
      <section className="t31n-profiles"><Reveal direction="right"><img src={`${a}/image-3.jpg`} alt="Chú rể Duy Nam" /><h2>Duy Nam</h2><span>Chú rể</span></Reveal><Reveal direction="left"><img src={`${a}/image-4.jpg`} alt="Cô dâu Minh Anh" /><h2>Minh Anh</h2><span>Cô dâu</span></Reveal></section>
      <section className="t31n-family"><Reveal><small>NHÀ TRAI</small><b>Ông Nguyễn Văn Hùng</b><b>Bà Trần Thị Thu</b></Reveal><Heart/><Reveal><small>NHÀ GÁI</small><b>Ông Lê Quang Minh</b><b>Bà Phạm Thị Lan</b></Reveal></section>
      <section className="t31n-event"><Reveal><h2>WEDDING DAY</h2><p>15 / 08 / 2027 · 11:30<br />TƯ GIA NHÀ TRAI<br />Hà Nội</p><VenueLink query="Ha Noi">Chỉ đường</VenueLink></Reveal><Countdown values={count} className="t31n-count" /></section>
      <section className="t31n-day"><Reveal><WeddingCalendar month="AUGUST · 2027" weddingDay={15} offset={6}/></Reveal><Reveal className="t31n-schedule"><small>CHƯƠNG TRÌNH TIỆC CƯỚI</small><div><time>10:30</time><span>Đón khách</span></div><div><time>11:00</time><span>Lễ thành hôn</span></div><div><time>11:30</time><span>Khai tiệc</span></div></Reveal><Reveal className="t31n-dress"><small>GỢI Ý TRANG PHỤC</small><h3>Dress code</h3><p>Đen, trắng và một điểm nhấn ánh kim cho buổi tiệc phong cách tối giản.</p><div aria-label="Bảng màu gợi ý"><i/><i/><i/></div></Reveal></section>
      <section className="t31n-ending"><RsvpForm className="t31n-rsvp" accent="#111" compact /><Reveal className="t31n-wishes"><small>LEAVE A WISH</small><WishForm className="t31n-wish" accent="#111"/></Reveal><GiftNote className="t31n-gift" /><Reveal as="h2">See you there <Heart fill="currentColor" /></Reveal></section>
    </main>
  );
}
