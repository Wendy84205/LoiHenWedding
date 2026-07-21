import React from 'react';
import { Camera, Church, GlassWater, Heart, Sparkles } from 'lucide-react';
import { MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template54New.css';
import './auditFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-54';

export default function Template54New() {
  useInvitationPage('template54new-page', '2027-02-28T10:00:00+07:00');
  return (
    <main className="new-invitation-page t54n">
      <MusicButton className="t54n-music" />
      <section className="t54n-hero"><Reveal as="img" src={`${a}/image-1.jpg`} alt="Minh Tiến và Hải Yến" direction="scale" duration={1.6}/><Reveal className="t54n-title"><small>SAVE OUR DATE</small><h1>Minh Tiến <i>&amp;</i> Hải Yến</h1><p>28 · 02 · 2027</p></Reveal></section>
      <section className="t54n-families"><Reveal direction="right"><h2>Nhà Trai</h2><p>Ông Nguyễn Văn Minh<br/>Bà Nguyễn Thị Thảo<br/><i>Phố Tây Sơn, Hà Nội</i></p><small>Trưởng nam</small><b>Nguyễn Minh Tiến</b></Reveal><Reveal direction="left"><h2>Nhà Gái</h2><p>Ông Trịnh Văn Tuấn<br/>Bà Nguyễn Thị Vân<br/><i>Phố Hàng Mã, Hà Nội</i></p><small>Út nữ</small><b>Trịnh Hải Yến</b></Reveal></section>
      <section className="t54n-invite"><Reveal><Sparkles/><h2>TRÂN TRỌNG KÍNH MỜI</h2><h3>QUÝ KHÁCH</h3><p>DỰ BỮA TIỆC THÂN MẬT<br/>CHUNG VUI CÙNG GIA ĐÌNH CHÚNG TÔI</p></Reveal><Reveal className="t54n-date" direction="scale"><span>THÁNG 02</span><strong>28</strong><span>NĂM 2027</span></Reveal><Reveal><h3>10:00 · CHỦ NHẬT</h3><p>TRUNG TÂM TIỆC CƯỚI ALMAZ<br/>Long Biên, Hà Nội</p><VenueLink query="Almaz Long Bien Ha Noi">Chỉ đường</VenueLink></Reveal></section>
      <section className="t54n-plan"><Reveal><WeddingCalendar month="FEBRUARY · 2027" weddingDay={28} offset={0}/></Reveal><Reveal className="t54n-dress"><h2>Dress code</h2><div><i/><i/><i/><i/></div></Reveal><Reveal as="h2">Timeline</Reveal><div className="t54n-timeline"><Reveal><Camera/><b>08:00</b><span>Đón tiếp khách</span></Reveal><Reveal><Church/><b>08:45</b><span>Thánh hôn phối</span></Reveal><Reveal><Heart/><b>09:30</b><span>Đón khách</span></Reveal><Reveal><GlassWater/><b>10:00</b><span>Khai tiệc</span></Reveal></div></section>
      <section className="t54n-ending"><RsvpForm className="t54n-rsvp" accent="#193f5c"/></section>
      <section className="t54n-illustration"><Reveal as="img" direction="right" src={`${a}/image-2.png`} alt="Cô dâu chú rể minh hoạ"/><Reveal as="img" direction="left" src={`${a}/image-3.png`} alt="Minh hoạ hoa cưới"/><Reveal as="p">Trân trọng<br/><i>and</i><br/>biết ơn!</Reveal></section>
    </main>
  );
}
