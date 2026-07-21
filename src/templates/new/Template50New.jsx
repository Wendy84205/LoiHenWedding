import React from 'react';
import { Heart } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template50New.css';
import './auditFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-50';

export default function Template50New() {
  const count = useInvitationPage('template50new-page', '2027-06-20T18:00:00+07:00');
  return (
    <main className="new-invitation-page t50n">
      <MusicButton className="t50n-music" />
      <section className="t50n-hero"><Reveal as="img" src={`${a}/image-1.png`} alt="Nền ánh kim ngày cưới" direction="scale" duration={1.6}/><Reveal className="t50n-title"><small>SAVE THE DATE</small><h1>Minh Phúc <i>&amp;</i> Cẩm Vân</h1><p>20 · 06 · 2027</p><b>TRÂN TRỌNG KÍNH MỜI BẠN TUẤN</b></Reveal></section>
      <section className="t50n-family"><Reveal><small>NHÀ TRAI</small><h3>THƯ MỜI DỰ TIỆC</h3><p>Bố Nguyễn Hữu Tài<br />Mẹ Tạ Thị Linh<br /><b>Hưng Yên</b></p></Reveal><Reveal><small>NHÀ GÁI</small><h3>THƯ MỜI DỰ TIỆC</h3><p>Bố Lê Văn Long<br />Mẹ Nguyễn Hải Yến<br /><b>Hà Nội</b></p></Reveal></section>
      <section className="t50n-invite"><Reveal><h2>Trân trọng kính mời</h2><p>Bạn và Người thương đến dự lễ thành hôn của chúng mình</p></Reveal><Reveal className="t50n-date" direction="scale" duration={1.6}><span>THÁNG 06</span><strong>20</strong><span>NĂM 2027</span></Reveal><Reveal><h3>18:00 · CHỦ NHẬT</h3><p>KHÁCH SẠN VẠN HOA<br />97 Nguyễn Trường Tộ, Ba Đình, Hà Nội</p><VenueLink query="97 Nguyen Truong To Ba Dinh Ha Noi">Chỉ đường</VenueLink></Reveal></section>
      <section className="t50n-calendar"><Reveal><WeddingCalendar month="JUNE · 2027" weddingDay={20} offset={0}/></Reveal><Countdown values={count} className="t50n-count" duration={1.6}/><Reveal as="p">Gió mang hương ngọc lan bay<br/>Đưa duyên đôi lứa về chung một nhà.</Reveal></section>
      <section className="t50n-album"><Reveal as="h2">Golden memories</Reveal><div><Reveal as="img" direction="right" src={`${a}/image-6.jpg`} alt="Album cưới vàng"/><Reveal as="img" direction="left" src={`${a}/image-7.jpg`} alt="Gia Hân và Hoàng Long"/><Reveal as="img" src={`${a}/image-8.png`} alt="Kỷ niệm ngày cưới"/></div></section>
      <section className="t50n-ending"><RsvpForm className="t50n-rsvp" accent="#7b1d0e"/><GiftNote className="t50n-gift"/><Reveal as="img" className="t50n-finalPhoto" src={`${a}/image-5.jpg`} alt="Minh Phúc và Cẩm Vân"/><Reveal as="p">Cảm ơn bạn đã đến chung vui cùng chúng mình. Sự hiện diện của bạn khiến buổi tiệc trở nên trọn vẹn và ấm áp hơn.</Reveal><h2><Heart fill="currentColor"/> Thank you</h2></section>
    </main>
  );
}
