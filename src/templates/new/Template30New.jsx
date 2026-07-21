import React from 'react';
import { Heart, Mountain, Trees } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template30New.css';
import './auditFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-30';

export default function Template30New() {
  const count = useInvitationPage('template30new-page', '2027-10-30T10:30:00+07:00');
  return (
    <main className="new-invitation-page t30n">
      <MusicButton className="t30n-music" />
      <section className="t30n-hero"><img src={`${a}/image-1.jpg`} alt="Mai Anh và Minh Quân giữa núi"/><Reveal className="t30n-title" direction="scale"><small>WELCOME TO OUR WEDDING</small><h1>Mai Anh <i>&amp;</i> Minh Quân</h1><p>30 · 10 · 2027</p></Reveal></section>
      <section className="t30n-welcome"><Reveal as="img" src={`${a}/image-2.jpg`} alt="Đức Anh và Bảo Châu tạo hình trái tim"/><Reveal><p>Cùng nhau theo đuổi mộng đời,<br/>Tương lai gói trọn trong người mình thương.</p><span>You are<br/>my end and<br/>my beginning</span><h2>Welcome</h2><small>Trân trọng kính mời bạn đến dự lễ cưới của chúng mình</small></Reveal></section>
      <section className="t30n-profiles"><Reveal direction="right"><img src={`${a}/image-5.jpg`} alt="Chú rể Minh Quân"/><small>CHÚ RỂ</small><h2>Minh Quân</h2></Reveal><Reveal direction="left"><img src={`${a}/image-6.jpg`} alt="Cô dâu Mai Anh"/><small>CÔ DÂU</small><h2>Mai Anh</h2></Reveal></section>
      <section className="t30n-invite"><Reveal><Mountain/><h2>Save the date</h2></Reveal><Reveal className="t30n-date" direction="scale"><span>THỨ BẢY<br/>THÁNG 10</span><strong>30</strong><span>NĂM 2027<br/>10:30</span></Reveal><Reveal><h3>FLAMINGO ĐẠI LẢI RESORT</h3><p>Ngọc Thanh, Phúc Yên, Vĩnh Phúc</p><VenueLink query="Flamingo Dai Lai Resort">Chỉ đường</VenueLink></Reveal></section>
      <section className="t30n-dateSection"><Reveal><WeddingCalendar month="OCTOBER · 2027" weddingDay={30} offset={4}/></Reveal><Countdown values={count} className="t30n-count"/><Reveal><Trees/><p>Ngày vui giữa núi rừng, mong bạn có mặt để cùng chúng mình lưu lại một ký ức thật xanh.</p></Reveal></section>
      <section className="t30n-album"><Reveal as="h2">Mountain love</Reveal><div><Reveal as="img" direction="right" src={`${a}/image-3.jpg`} alt="Album cưới trên núi"/><Reveal as="img" direction="left" src={`${a}/image-4.jpg`} alt="Đức Anh và Bảo Châu"/><Reveal as="img" src={`${a}/image-7.png`} alt="Khoảnh khắc tình yêu"/><Reveal as="img" src={`${a}/image-8.jpg`} alt="Album thiên nhiên"/></div></section>
      <section className="t30n-letterEnd"><Reveal as="p">Khoảnh khắc quan trọng nhất của đời người chính là khi nghi thức trao cho nó ý nghĩa vĩnh cửu. Với chúng mình, nghi thức thiêng liêng nhất trong đời chính là lễ cưới. Xin chân thành cảm ơn!</Reveal></section>
      <section className="t30n-ending"><RsvpForm className="t30n-rsvp" accent="#5d7545"/><GiftNote className="t30n-gift"/><Reveal as="h2"><Heart fill="currentColor"/> Thank you</Reveal></section>
    </main>
  );
}
