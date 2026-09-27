import React from 'react';
import { Heart, Leaf } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, WishForm, useInvitationPage } from './NewInvitationCommon.jsx';
import './template28New.css';

const a = '/assets/new-templates/thiep-cuoi-28';

export default function Template28New() {
  const count = useInvitationPage('template28new-page', '2027-03-28T10:30:00+07:00');
  return (
    <main className="new-invitation-page t28n">
      <MusicButton className="t28n-music" />
      <section className="t28n-hero"><img src={`${a}/image-1.jpg`} alt="Hải Đăng và Yến Nhi" /><Reveal className="t28n-title" direction="down"><small>THE WEDDING OF</small><h1>Hải Đăng <i>&amp;</i> Yến Nhi</h1><p>28 · 03 · 2027</p></Reveal></section>
      <section className="t28n-couple"><Reveal as="p">Love makes every ordinary day feel like spring.</Reveal><div><Reveal direction="right"><img src={`${a}/image-3.jpg`} alt="Chú rể Hải Đăng" /><small>Chú rể</small><h2>Hải Đăng</h2></Reveal><Reveal direction="left"><img src={`${a}/image-4.jpg`} alt="Cô dâu Yến Nhi" /><small>Cô dâu</small><h2>Yến Nhi</h2></Reveal></div></section>
      <section className="t28n-green"><Reveal as="img" src={`${a}/image-2.jpg`} alt="Hải Đăng và Yến Nhi dưới hoa trắng" /><Reveal><Leaf /><h2>Trân trọng kính mời</h2><p>Bạn và Người thương đến dự ngày vui của chúng mình</p></Reveal></section>
      <section className="t28n-family"><Reveal><small>GIA ĐÌNH NHÀ TRAI</small><b>Ông Nguyễn Văn Hùng</b><b>Bà Trần Thị Thu</b></Reveal><Heart/><Reveal><small>GIA ĐÌNH NHÀ GÁI</small><b>Ông Lê Quang Minh</b><b>Bà Phạm Thị Lan</b></Reveal></section>
      <section className="t28n-invite"><Reveal className="t28n-date" direction="scale"><span>CHỦ NHẬT<br />THÁNG 03</span><strong>28</strong><span>NĂM 2027<br />10:30</span></Reveal><Reveal><h3>TRUNG TÂM TIỆC CƯỚI SOFT WATER</h3><p>42 An Dương, Tây Hồ, Hà Nội</p><VenueLink query="Soft Water Tay Ho Ha Noi">Xem đường đi</VenueLink></Reveal></section>
      <section className="t28n-dateSection"><Reveal><WeddingCalendar month="MARCH · 2027" weddingDay={28} offset={0} /></Reveal><Reveal className="t28n-schedule"><small>CHƯƠNG TRÌNH NGÀY VUI</small><div><time>10:00</time><span>Đón khách</span></div><div><time>10:30</time><span>Lễ thành hôn</span></div><div><time>11:00</time><span>Khai tiệc</span></div></Reveal><Reveal className="t28n-dress"><small>GỢI Ý TRANG PHỤC</small><h3>Dress code</h3><p>Xanh olive, kem và hồng phấn — sắc màu dịu dàng của mùa xuân.</p><div aria-label="Bảng màu gợi ý"><i/><i/><i/></div></Reveal><Countdown values={count} className="t28n-count" /></section>
      <section className="t28n-album"><Reveal as="h2">Blooming together</Reveal><div><Reveal as="img" direction="right" src={`${a}/image-5.jpg`} alt="Album botanical" /><Reveal as="img" direction="left" src={`${a}/image-6.jpg`} alt="Album hoa trắng" /><Reveal as="img" src={`${a}/image-7.jpg`} alt="Hải Đăng và Yến Nhi" /><Reveal as="img" src={`${a}/image-8.jpg`} alt="Kỷ niệm ngày cưới" /></div></section>
      <section className="t28n-ending"><RsvpForm className="t28n-rsvp" accent="#61765c" /><Reveal className="t28n-wishes"><small>GỬI LỜI CHÚC</small><WishForm className="t28n-wish" accent="#61765c" /></Reveal><GiftNote className="t28n-gift" /><Reveal as="h2"><Heart fill="currentColor" /> Thank you</Reveal></section>
    </main>
  );
}
