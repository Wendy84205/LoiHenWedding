import React from 'react';
import { Camera, Clock, Heart } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template52New.css';
import './auditFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-52';

export default function Template52New() {
  const count = useInvitationPage('template52new-page', '2027-12-28T11:00:00+07:00');
  return (
    <main className="new-invitation-page t52n">
      <MusicButton className="t52n-music" />
      <section className="t52n-hero"><img src={`${a}/image-1.jpg`} alt="Công Vinh và Hải Yến" /><Reveal className="t52n-title"><small>THE WEDDING DAY</small><h1>Công Vinh <i>&amp;</i> Hải Yến</h1><p>28.12.2027</p></Reveal></section>
      <section className="t52n-profiles"><Reveal as="h2">He <i>&amp;</i> She</Reveal><div><Reveal direction="right"><img src={`${a}/image-3.jpg`} alt="Cô dâu Hải Yến" /><small>NỮ CHÍNH</small><h3>Nguyễn Hải Yến</h3><p>Cô gái dịu dàng luôn mang nắng vào những ngày bình thường.</p></Reveal><Reveal direction="left"><img src={`${a}/image-4.jpg`} alt="Chú rể Công Vinh" /><small>NAM CHÍNH</small><h3>Phạm Công Vinh</h3><p>Chàng trai chọn bình yên là được ở cạnh người mình thương.</p></Reveal></div></section>
      <section className="t52n-invite"><Reveal as="h2">Thiệp Mời</Reveal><Reveal className="t52n-triptych"><img src={`${a}/image-5.png`} alt="Ảnh cưới Công Vinh" /><img src={`${a}/image-6.png`} alt="Công Vinh và Hải Yến" /><img src={`${a}/image-7.png`} alt="Ảnh cưới Hải Yến" /></Reveal><Reveal><small>TRÂN TRỌNG KÍNH MỜI</small><h3>QUÝ KHÁCH</h3><p>Đến dự bữa tiệc thân mật cùng gia đình chúng tôi</p></Reveal><Reveal className="t52n-date" direction="scale"><span>THỨ BA<br />THÁNG 12</span><strong>28</strong><span>NĂM 2027<br />11:00</span></Reveal><Reveal><h3>TƯ GIA NHÀ TRAI</h3><p>Kiến Thụy, Hải Phòng</p><VenueLink query="Kien Thuy Hai Phong">Chỉ đường</VenueLink></Reveal></section>
      <section className="t52n-calendar"><Reveal as="img" src={`${a}/image-2.png`} alt="Công Vinh và Hải Yến" /><Reveal><WeddingCalendar month="December 2027" weddingDay={28} offset={1} /></Reveal><Countdown values={count} className="t52n-count" /><div><Reveal><Clock /><b>11:00</b><span>Thành hôn</span></Reveal><Reveal><Camera /><b>11:30</b><span>Khai tiệc</span></Reveal></div></section>
      <section className="t52n-album"><Reveal as="h2">ALBUM ẢNH CƯỚI</Reveal><div><Reveal as="img" src={`${a}/image-3.jpg`} alt="Album cưới" /><Reveal as="img" src={`${a}/image-4.jpg`} alt="Khoảnh khắc tình yêu" /><Reveal as="img" src={`${a}/image-8.png`} alt="Công Vinh và Hải Yến" /></div></section>
      <section className="t52n-ending"><RsvpForm className="t52n-rsvp" accent="#61473a" /><GiftNote className="t52n-gift" /><Reveal as="h2"><Heart fill="currentColor" /> TRÂN TRỌNG BIẾT ƠN</Reveal></section>
    </main>
  );
}
