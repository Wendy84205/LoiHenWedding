import React from 'react';
import { Circle, GlassWater, Heart, Utensils } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, useInvitationPage } from './NewInvitationCommon.jsx';
import './templateBW1.css';

const a = '/assets/new-templates/thiep-bw-1';

export default function TemplateBW1() {
  const count = useInvitationPage('templatebw1-page', '2027-09-18T11:30:00+07:00');
  return (
    <main className="new-invitation-page tbw">
      <MusicButton className="tbw-music" />
      <section className="tbw-hero"><Reveal className="tbw-dateStack" direction="right"><span>18</span><span>09</span><span>27</span></Reveal><Reveal className="tbw-portrait" direction="scale"><img src={`${a}/image-4.jpg`} alt="Ngọc Anh và Minh Quân" /></Reveal><Reveal className="tbw-title" direction="up"><h1>Ngọc Anh &amp;<br />Minh Quân</h1><small>Ngày Chung Đôi</small><p>18 / 09 / 2027</p></Reveal></section>
      <section className="tbw-intro"><Reveal><Circle /><h2>THƯ MỜI CƯỚI</h2><p>Nhà Trai<br />Ông Nguyễn Văn Minh · Bà Trần Thu Hà</p><p>Nhà Gái<br />Ông Lê Quốc Anh · Bà Phạm Ngọc Lan</p></Reveal><Reveal as="img" src={`${a}/image-3.jpg`} alt="Ảnh cưới đen trắng" direction="left" /></section>
      <section className="tbw-event"><Reveal as="img" src={`${a}/image-4.jpg`} alt="Ngọc Anh và Minh Quân" direction="right" /><Reveal><h2>Ngọc Anh &amp;<br />Minh Quân</h2><p>T5 · 11h30<br />18 / 09 / 2027<br />Tại tư gia Nhà Trai</p><VenueLink query="Ha Noi">Xem bản đồ</VenueLink></Reveal></section>
      <section className="tbw-quote"><Reveal as="p">WE DO NOT NEED A PERFECT LOVE.<br />WE ONLY NEED A TRUE ONE.</Reveal><Reveal as="img" src={`${a}/image-1.jpg`} alt="Nụ hôn đen trắng" /></section>
      <section className="tbw-count"><Countdown values={count} className="tbw-countdown" /><Reveal><h2>Ngày ấy, mong bạn có mặt</h2><p>Sự hiện diện của bạn là một phần đẹp trong ký ức ngày cưới của chúng mình.</p></Reveal></section>
      <section className="tbw-timeline"><Reveal as="h2">Wedding Timeline</Reveal><div><Reveal><GlassWater/><b>11h30</b><span>Bắt đầu vào bữa tiệc</span></Reveal><Reveal><Heart/><b>12h00</b><span>Làm lễ cưới</span></Reveal><Reveal><Utensils/><b>12h30</b><span>Nhập tiệc</span></Reveal></div></section>
      <section className="tbw-album"><Reveal as="h2">BLACK / WHITE / LOVE</Reveal><div><Reveal as="img" direction="right" src={`${a}/image-5.png`} alt="Album monochrome" /><Reveal as="img" direction="left" src={`${a}/image-6.png`} alt="Album cưới tối giản" /><Reveal as="img" src={`${a}/image-7.png`} alt="Khoảnh khắc tình yêu" /></div></section>
      <section className="tbw-ending"><RsvpForm className="tbw-rsvp" accent="#1b1b1b" /><GiftNote className="tbw-gift" /><Reveal as="h2"><Heart fill="currentColor" /> THANK YOU</Reveal></section>
    </main>
  );
}
