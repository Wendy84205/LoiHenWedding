import React from 'react';
import { Heart, Quote } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template24New.css';
import './auditFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-24';

export default function Template24New() {
  const count = useInvitationPage('template24new-page', '2027-09-25T11:00:00+07:00');
  return <main className="new-invitation-page t24n">
    <MusicButton className="t24n-music" />
    <section className="t24n-hero"><Reveal as="span" direction="right">WEDDING</Reveal><Reveal as="img" src={`${a}/image-2.webp`} alt="Trà My và Quốc Trường" direction="scale" /><Reveal as="span" direction="left">INVITATION</Reveal><Reveal className="t24n-title"><h1>Trà My <i>&amp;</i> Quốc Trường</h1><p>25 · 09</p></Reveal></section>
    <section className="t24n-note"><Reveal><small>CHÚNG MÌNH Ở ĐÂY</small><h2>At this moment, love and being loved happen at the same time.</h2><p>Giữa biển người mênh mông, chúng mình đã gặp nhau, hiểu nhau và yêu nhau. Xin mời bạn đến dự bữa tiệc ngập tràn yêu thương.</p></Reveal></section>
    <section className="t24n-portraitDiary"><div><Reveal as="img" src={`${a}/image-1.webp`} alt="Cô dâu Trà My" direction="right"/><Reveal as="img" src={`${a}/image-3.webp`} alt="Chân dung ngày cưới" direction="left"/></div><Countdown values={count} className="t24n-count t24n-earlyCount" /><Reveal as="p">Cảm ơn em đã xuất hiện trong cuộc đời anh, để anh hiểu rằng yêu và được yêu là điều hạnh phúc biết bao.</Reveal><Reveal as="img" src={`${a}/image-5.webp`} alt="Quốc Trường và Trà My bên nhau" direction="scale"/><Reveal as="p">Nguyện nắm tay nhau, cùng đi qua bốn mùa thay lá, ngắm trọn nhân gian tươi đẹp và chậm rãi già đi cùng em.</Reveal><div><Reveal as="img" src={`${a}/image-6.webp`} alt="Khoảnh khắc dịu dàng" direction="right"/><Reveal as="img" src={`${a}/image-7.webp`} alt="Cô dâu trong chiều nắng" direction="left"/></div></section>
    <section className="t24n-quote"><Quote /><Reveal as="p">“Giây phút này, chúng mình là của nhau.”</Reveal></section>
    <section className="t24n-stack"><Reveal as="img" src={`${a}/image-9.webp`} alt="Ảnh cưới Quốc Trường và Trà My" rotate={-5} direction="right" /><Reveal as="img" src={`${a}/image-11.webp`} alt="Khoảnh khắc lễ cưới" rotate={5} direction="left" /><Reveal className="t24n-seal" direction="scale"><Heart fill="currentColor" /></Reveal></section>
    <section className="t24n-address"><Reveal as="h2">WEDDING ADDRESS</Reveal><Reveal as="p">52 Miếu Đầm, Mễ Trì, Nam Từ Liêm, Hà Nội</Reveal><Reveal><iframe title="Bản đồ địa điểm tổ chức lễ cưới" loading="lazy" src="https://www.google.com/maps?q=52+Mieu+Dam+Me+Tri+Ha+Noi&output=embed"/></Reveal><Reveal as="img" src={`${a}/image-14.webp`} alt="Địa điểm ngày cưới" direction="up"/></section>
    <section className="t24n-event"><Reveal><small>TRÂN TRỌNG KÍNH MỜI</small><h2>Tiệc mừng lễ thành hôn</h2><strong>25</strong><p>THÁNG 09 · NĂM 2027<br />11:00 · THỨ BẢY</p><VenueLink query="Hanoi wedding center">Xem chỉ đường</VenueLink></Reveal><WeddingCalendar month="SEPTEMBER" weddingDay={25} offset={3} /></section>
    <section className="t24n-end"><Reveal as="img" src={`${a}/image-4.webp`} alt="Album cưới tông kem" /><RsvpForm accent="#a91919" className="t24n-rsvp" /><GiftNote className="t24n-gift" /><h2>With love</h2></section>
  </main>;
}
