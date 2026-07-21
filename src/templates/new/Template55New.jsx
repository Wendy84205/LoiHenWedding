import React from 'react';
import { Leaf } from 'lucide-react';
import { Countdown, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template55New.css';
import './auditFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-55';

export default function Template55New() {
  const count = useInvitationPage('template55new-page', '2027-02-28T12:00:00+07:00');
  return (
    <main className="new-invitation-page t55n">
      <MusicButton className="t55n-music" />
      <section className="t55n-hero"><Reveal className="t55n-envelope" direction="scale"><img src={`${a}/preview.jpg`} alt="Minh Quân và Ánh Dương" /><article><small>Trân trọng mời bạn</small><strong>Minh Quân<br />&amp; Ánh Dương</strong><span>28 · 02 · 2027</span></article><i aria-hidden="true">♡</i></Reveal><Reveal className="t55n-title" direction="up"><small>THE WEDDING OF</small><h1>Minh Quân <i>&amp;</i> Ánh Dương</h1></Reveal></section>
      <section className="t55n-profiles"><Reveal direction="right"><img src={`${a}/image-2.webp`} alt="Chú rể Minh Quân" /><article><small>XIN TRÂN TRỌNG GIỚI THIỆU</small><h2>Minh Quân</h2><p>“Người đàn ông đã độc thân rất lâu và cuối cùng cũng chịu ký vào hợp đồng hôn nhân trọn đời.”</p></article></Reveal><Reveal direction="left"><article><small>XIN TRÂN TRỌNG GIỚI THIỆU</small><h2>Ánh Dương</h2><p>“Cô gái xinh đẹp, dịu dàng và là lý do chú rể tự nguyện bỏ cuộc sống độc thân.”</p></article><img src={`${a}/image-3.webp`} alt="Cô dâu Ánh Dương" /></Reveal><Reveal as="p">Và hôm nay chúng mình chính thức nắm tay nhau bắt đầu một hành trình mới mang tên gia đình.</Reveal></section>
      <section className="t55n-invite"><Reveal><Leaf /><h2>Lễ Thành Hôn</h2><p>ĐƯỢC TỔ CHỨC VÀO</p></Reveal><Reveal className="t55n-date" direction="scale"><span>THÁNG 02</span><strong>28</strong><span>NĂM 2027</span></Reveal><Reveal><h3>12:00 · CHỦ NHẬT</h3><p>KHÁCH SẠN VẠN HOA<br />79 Nguyễn Trãi, Thanh Xuân, Hà Nội</p><VenueLink query="Nguyen Trai Thanh Xuan Ha Noi">Chỉ đường</VenueLink></Reveal></section>
      <section className="t55n-calendar"><Reveal><WeddingCalendar month="FEBRUARY · 2027" weddingDay={28} offset={0} /></Reveal><Countdown values={count} className="t55n-count" /><Reveal as="p">Gió mang hương ngọc lan bay,<br />Đưa duyên đôi lứa về chung một nhà.</Reveal></section>
      <section className="t55n-dress"><Reveal as="h2">Dress Code</Reveal><Reveal as="p">Một chút xanh lá, trắng và đen cho ngày vui của chúng mình.</Reveal><Reveal><i/><i/><i/><i/></Reveal></section>
      <section className="t55n-ending"><RsvpForm className="t55n-rsvp" accent="#3f6e60" /></section>
      <section className="t55n-album"><Reveal as="h2">Our green album</Reveal><div>{['image-4.webp','image-5.webp','image-6.webp','image-7.webp','image-8.webp'].map((image,index)=><Reveal as="img" key={image} direction={index%2?'left':'right'} src={`${a}/${image}`} alt="Album cưới Minh Quân và Ánh Dương" />)}</div></section>
    </main>
  );
}
