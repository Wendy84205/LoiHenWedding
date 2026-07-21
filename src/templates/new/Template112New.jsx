import React from 'react';
import { Heart, MapPinned } from 'lucide-react';
import { Countdown, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template112New.css';
import './auditFidelity.css';
import './fontFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-112';

export default function Template112New() {
  const count = useInvitationPage('template112new-page', '2027-08-28T11:00:00+07:00');
  const timeline = [['08:00', 'Lễ thành hôn'], ['10:00', 'Đón khách'], ['11:00', 'Khai tiệc']];
  return <main className="new-invitation-page t112n">
    <MusicButton className="t112n-music" />
    <section className="t112n-hero"><img src={`${a}/image-2.webp`} alt="Ảnh cưới đỏ sang trọng" /><Reveal className="t112n-title"><small>WEDDING INVITATION</small><h1>Minh Đức <i>&amp;</i> Yến Nhi</h1><p>28 · 08 · 2027</p></Reveal></section>
    <section className="t112n-redProfiles"><Reveal as="p">Trân trọng kính mời bạn và người thương đến chung vui trong ngày hạnh phúc nhất của chúng mình.</Reveal><Reveal className="t112n-profileCard" direction="right"><img src={`${a}/image-8.webp`} alt="Chú rể Minh Đức"/><small>CHÚ RỂ</small><h2>MINH ĐỨC</h2></Reveal><Reveal className="t112n-profileCard" direction="left"><img src={`${a}/image-9.webp`} alt="Cô dâu Yến Nhi"/><small>CÔ DÂU</small><h2>YẾN NHI</h2></Reveal></section>
    <section className="t112n-timeline"><Reveal as="h2">Lịch trình ngày cưới</Reveal>{timeline.map(([time, label]) => <Reveal key={time}><b>{time}</b><span>{label}</span></Reveal>)}</section>
    <section className="t112n-family"><Reveal><small>NHÀ TRAI</small><h3>Ông Nguyễn Văn Thắng<br />Bà Trịnh Thị Viên</h3><p>Tân Mỹ, Tiền Phong, Bắc Ninh</p></Reveal><Reveal><small>NHÀ GÁI</small><h3>Ông Nguyễn Tuấn Trung<br />Bà Nguyễn Thị May</h3><p>Phú Cát, Quốc Oai, Hà Nội</p></Reveal></section>
    <section className="t112n-invite"><Reveal><small>TRÂN TRỌNG KÍNH MỜI</small><h2>Lễ thành hôn</h2><strong>28</strong><p>THÁNG 08 · NĂM 2027<br />11:00 · THỨ BẢY · TƯ GIA NHÀ TRAI</p><VenueLink query="Tien Phong Bac Ninh">Chỉ đường</VenueLink></Reveal></section>
    <section className="t112n-paperCalendar"><Reveal className="t112n-envelope" direction="right"><span>LOVE</span><b>囍</b></Reveal><Reveal direction="left"><WeddingCalendar month="AUGUST 2027" weddingDay={28} offset={5}/></Reveal><Reveal as="img" src={`${a}/image-7.webp`} alt="Together is a beautiful plan" direction="scale"/><Reveal><h2>TOGETHER IS A</h2><p>Beautiful plan</p></Reveal></section>
    <section className="t112n-map"><Reveal as="img" src={`${a}/image-13.webp`} alt="Không gian tiệc cưới" /><Reveal><MapPinned /><h2>Tư gia nhà trai</h2><p>Tân Mỹ · Tiền Phong · Bắc Ninh</p><VenueLink query="Tan My Tien Phong Bac Ninh">Mở Google Maps</VenueLink></Reveal></section>
    <section className="t112n-countAlbum"><Reveal as="p">SOME MOMENTS STAY WITH YOU FOREVER. THEY ARE FULL OF MEANING, WARMTH, AND LOVE.</Reveal><Reveal as="h2">Countdown</Reveal><Countdown values={count} className="t112n-count" /><Reveal as="h3">ALBUM <i>Of Love</i></Reveal></section>
    <section className="t112n-album"><Reveal as="img" src={`${a}/image-5.webp`} alt="Album cưới đỏ" /><Reveal as="img" src={`${a}/image-6.webp`} alt="Khoảnh khắc thành hôn" /></section>
    <section className="t112n-end"><RsvpForm accent="#611010" className="t112n-rsvp" /><Reveal className="t112n-qr"><article><small>NGUYỄN MINH ĐỨC</small><span>MÃ QR</span></article><article><small>NGUYỄN THỊ YẾN NHI</small><span>MÃ QR</span></article></Reveal><Reveal as="img" className="t112n-endPhoto" src={`${a}/image-6.webp`} alt="Minh Đức và Yến Nhi" direction="scale" /><Reveal className="t112n-thanks"><h2><Heart fill="currentColor" /> Thank you!</h2><p>Cảm ơn bạn đã dành tình cảm cho chúng mình. Sự hiện diện của bạn chính là món quà ý nghĩa nhất.</p></Reveal></section>
  </main>;
}
