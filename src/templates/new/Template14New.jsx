import React from 'react';
import { Feather, Heart } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template14New.css';
import './auditFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-14';

export default function Template14New() {
  const count = useInvitationPage('template14new-page', '2027-06-24T11:30:00+07:00');
  return <main className="new-invitation-page t14n">
    <MusicButton className="t14n-music" />
    <section className="t14n-hero"><Reveal className="t14n-ring" direction="scale"><img src={`${a}/image-2.webp`} alt="Cặp đôi trong khung tròn" /></Reveal><Reveal className="t14n-title"><small>INVITATION</small><h1>Gia Huy <i>&amp;</i> Bảo Ngọc</h1><p>24 · 06 · 2027</p></Reveal></section>
    <section className="t14n-letter"><Reveal><Feather /><small>HELLO</small><h2>Một lời mời đầy ắp tình cảm</h2><p>Những người nhận được tấm thiệp này đều là phần quan trọng trong cuộc đời chúng mình. Mong bạn đến bên cạnh và chứng kiến ngày đặc biệt.</p></Reveal></section>
    <section className="t14n-beginning"><div><Reveal as="img" src={`${a}/image-3.webp`} alt="Khoảnh khắc dịu dàng của Gia Huy và Bảo Ngọc" direction="right"/><Reveal as="img" src={`${a}/image-4.webp`} alt="Ảnh cưới tông kem" direction="left"/></div><Reveal as="p">Tôi nghĩ đó chắc chắn là em. Chúng ta không cần lời nói, trái tim đã đủ hiểu nhau.</Reveal><Reveal as="h2">A long time ago, I was still pounding</Reveal><div><Reveal as="img" src={`${a}/image-5.webp`} alt="Chú rể Gia Huy" direction="right"/><Reveal as="img" src={`${a}/image-6.webp`} alt="Cô dâu Bảo Ngọc" direction="left"/></div></section>
    <section className="t14n-couple"><Reveal direction="right"><img src={`${a}/image-7.webp`} alt="Chú rể Gia Huy" /><span>GROOM</span><h3>Gia Huy</h3></Reveal><Reveal direction="left"><img src={`${a}/image-9.webp`} alt="Cô dâu Bảo Ngọc" /><span>BRIDE</span><h3>Bảo Ngọc</h3></Reveal></section>
    <section className="t14n-quote"><Reveal as="p">“Lần đầu gặp gỡ, trái tim đã rung động.<br />Dù bên nhau lâu dài, cảm xúc vẫn không thay đổi.”</Reveal><Heart fill="currentColor" /></section>
    <section className="t14n-reliance"><Reveal as="img" src={`${a}/image-10.webp`} alt="Gia Huy là chỗ dựa vững chắc" direction="scale"/><Reveal as="p">Em là chỗ dựa vững chắc của anh, dù có ở đâu, anh cũng luôn bên em.</Reveal><div><Reveal as="img" src={`${a}/image-11.webp`} alt="Cùng nhau đi suốt cuộc đời" direction="right"/><Reveal as="img" src={`${a}/image-12.webp`} alt="Khoảnh khắc bên nhau" direction="left"/></div><Reveal as="h2">The moment I met you, I decided to grow old together with you.</Reveal></section>
    <section className="t14n-date"><Reveal><small>HAPPY EVERY DAY, FOUR SEASONS WITH YOU</small><h2>Our wedding day</h2></Reveal><WeddingCalendar month="THÁNG 06 · 2027" weddingDay={24} offset={1} /><Countdown values={count} className="t14n-count" /><Reveal><p>11:30 · Thứ Năm<br />Khách sạn CineLove, Hà Nội</p><VenueLink query="Cinelove Hanoi">Xem bản đồ</VenueLink></Reveal></section>
    <section className="t14n-gallery"><Reveal as="img" src={`${a}/image-3.webp`} alt="Ảnh cưới cổ điển" /><div><Reveal as="img" src={`${a}/image-8.webp`} alt="Album cưới tông nâu" direction="right" /><Reveal as="img" src={`${a}/image-12.webp`} alt="Khoảnh khắc ngày cưới" direction="left" /></div></section>
    <section className="t14n-end"><RsvpForm accent="#856b45" className="t14n-rsvp" /><GiftNote className="t14n-gift" /><Reveal as="h2">Thank you</Reveal></section>
  </main>;
}
