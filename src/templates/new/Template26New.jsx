import React from 'react';
import { Heart } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, WishForm, useInvitationPage } from './NewInvitationCommon.jsx';
import './template26New.css';

const a = '/assets/new-templates/thiep-cuoi-26';

export default function Template26New() {
  const count = useInvitationPage('template26new-page', '2027-08-20T12:00:00+07:00');
  return <main className="new-invitation-page t26n">
    <MusicButton className="t26n-music" />
    <section className="t26n-hero"><Reveal><small>SAVE THE DATE · THIỆP CƯỚI</small><h1>Hải Yến <i>&amp;</i> Minh Quân</h1><p>20 · 08 · 2027</p></Reveal><Reveal as="img" src={`${a}/image-1.webp`} alt="Minh họa ngày cưới Hải Yến và Minh Quân" direction="down" /></section>
    <section className="t26n-banner">NOT LEAVE WITHOUT SEEING EACH OTHER</section>
    <section className="t26n-letter"><Reveal><h2>Ngày vui của chúng mình</h2><p>Chúng mình quyết định nắm tay nhau đi qua vô số ngày đêm và gia hạn lời hẹn ước đến vô tận những khoảnh khắc bên nhau.</p><Heart fill="currentColor" /></Reveal></section>
    <section className="t26n-couple"><Reveal><img src={`${a}/image-2.webp`} alt="Cô dâu Hải Yến" /><h3>Hải Yến</h3><small>THE BRIDE</small></Reveal><Reveal><img src={`${a}/image-3.webp`} alt="Chú rể Minh Quân" /><h3>Minh Quân</h3><small>THE GROOM</small></Reveal></section>
    <section className="t26n-family"><Reveal><small>NHÀ TRAI</small><b>Ông Nguyễn Văn Hùng</b><b>Bà Trần Thị Thu</b></Reveal><Heart/><Reveal><small>NHÀ GÁI</small><b>Ông Lê Quang Minh</b><b>Bà Phạm Thị Lan</b></Reveal></section>
    <section className="t26n-photoStory"><Reveal as="img" src={`${a}/image-4.webp`} alt="Hải Yến và Minh Quân trong ngày cưới" direction="scale"/><Reveal as="p">Từ khi gặp được em, mỗi giấc mơ của anh đều có em hiện diện, mỗi câu tình trong trang sách anh đọc đều gọi về em.</Reveal><div><Reveal as="img" src={`${a}/image-5.webp`} alt="Khoảnh khắc ngày cưới" direction="right"/><Reveal as="img" src={`${a}/image-6.webp`} alt="Hải Yến và Minh Quân mỉm cười" direction="left"/></div><Reveal as="p">Gặp được em là ngẫu nhiên, thích em là tự nhiên, yêu em là kiên định, có được em là hân hoan.</Reveal></section>
    <section className="t26n-vowPage"><Reveal as="img" src={`${a}/image-6.webp`} alt="Đi cùng nhau cả đời" direction="right"/><Reveal direction="left"><small>WEDDING DAY</small><h2>Đi cùng em cả đời là điều tất yếu</h2><p>Mong rằng chuỗi hạnh phúc nhất của chúng mình sẽ có lời chúc phúc từ bạn.</p></Reveal></section>
    <section className="t26n-date"><WeddingCalendar month="AUGUST · 2027" weddingDay={20} offset={6} /><Reveal><p>Thứ Sáu ngày 20 tháng 08 năm 2027<br />12:00 · 52 Miếu Đầm, Mễ Trì, Hà Nội</p><VenueLink query="52 Mieu Dam Me Tri Ha Noi">Xem bản đồ</VenueLink></Reveal><Reveal className="t26n-schedule"><small>CHƯƠNG TRÌNH NGÀY VUI</small><div><time>11:00</time><span>Đón khách</span></div><div><time>11:30</time><span>Lễ thành hôn</span></div><div><time>12:00</time><span>Khai tiệc</span></div></Reveal><Reveal className="t26n-dress"><small>GỢI Ý TRANG PHỤC</small><h3>Dress code</h3><p>Đỏ son, hồng phấn và trắng sẽ cùng tô điểm ngày vui.</p><div aria-label="Bảng màu gợi ý"><i/><i/><i/></div></Reveal><Countdown values={count} className="t26n-count" /></section>
    <section className="t26n-end"><Reveal as="img" src={`${a}/image-4.webp`} alt="Ảnh cưới vui tươi" /><RsvpForm accent="#bd2a2a" className="t26n-rsvp" /><Reveal className="t26n-wishes"><small>GỬI MỘT LỜI THƯƠNG</small><WishForm className="t26n-wish" accent="#bd2a2a" /></Reveal><GiftNote className="t26n-gift" /><Reveal as="img" className="t26n-finalMark" src={`${a}/image-1.webp`} alt="Minh họa song hỷ" direction="scale" /><Reveal as="p" className="t26n-finalWords">Gặp được em là ngẫu nhiên, thích em là tự nhiên, yêu em là kiên định, có được em là hân hoan.</Reveal></section>
  </main>;
}
