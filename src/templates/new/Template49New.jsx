import React from 'react';
import { Heart, PartyPopper } from 'lucide-react';
import { Countdown, FallingDecor, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template49New.css';
import './auditFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-49';

export default function Template49New() {
  const count = useInvitationPage('template49new-page', '2027-08-20T12:00:00+07:00');
  return (
    <main className="new-invitation-page t49n">
      <MusicButton className="t49n-music" />
      <section className="t49n-hero">
        <FallingDecor symbols={['✦', '·', '♡']} count={16} />
        <h1 className="t49n-heroNames">Khánh Vân <i>&amp;</i> Tiến Luân</h1>
        <Reveal className="t49n-arch" direction="scale" duration={1.6}>
          <b>囍</b><small>WELCOME TO OUR WEDDING</small>
          <img src={`${a}/image-8.jpg`} alt="Khánh Vân và Tiến Luân" />
          <strong>20.08.2027</strong>
        </Reveal>
      </section>

      <section className="t49n-happiness">
        <Reveal as="h2">Save The Date</Reveal>
        <Reveal className="t49n-family"><span><b>NHÀ TRAI</b><p>Ông Nguyễn Văn Sang<br />Bà Trương Thị Bé</p></span><span><b>NHÀ GÁI</b><p>Ông Lê Hải Nam<br />Bà Nguyễn Thị Năm</p></span></Reveal>
        <Reveal><PartyPopper /><p>Trân trọng thông báo</p><h2>LỄ THÀNH HÔN</h2><h3>Nguyễn Tiến Luật <i>And</i> Lê Khánh Vân</h3></Reveal>
        <Reveal as="img" src={`${a}/image-2.jpg`} alt="Cô dâu chú rể cùng chữ song hỷ" direction="scale" />
      </section>

      <section className="t49n-invite">
        <Reveal><small>TRÂN TRỌNG KÍNH MỜI</small><h2>Bạn và Người thương</h2><p>Đến dự bữa tiệc chung vui cùng gia đình chúng tôi</p></Reveal>
        <Reveal className="t49n-date" direction="scale" duration={1.6}><span>THỨ SÁU<br />THÁNG 08</span><strong>20</strong><span>NĂM 2027<br />12:00</span></Reveal>
        <Reveal><h3>TƯ GIA NHÀ TRAI</h3><p>52 Miếu Đầm, Mễ Trì, Nam Từ Liêm, Hà Nội</p><VenueLink query="52 Mieu Dam Me Tri Ha Noi">Chỉ đường</VenueLink></Reveal>
      </section>

      <section className="t49n-dateSection"><Reveal><WeddingCalendar month="8 · 2027" weddingDay={20} offset={5} /></Reveal><Countdown values={count} className="t49n-count" duration={1.6} /></section>
      <section className="t49n-gallery"><Reveal as="h2">Our joyful moments</Reveal><Reveal as="p">Khi anh nói sẽ yêu em mãi mãi, đó là vì ngay khoảnh khắc này tình yêu đã đủ lớn để anh can đảm nói ra hai chữ ấy.</Reveal><div><Reveal as="img" direction="right" src={`${a}/image-6.jpg`} alt="Khoảnh khắc hạnh phúc" /><Reveal as="img" direction="left" src={`${a}/image-2.jpg`} alt="Album cưới đỏ" /><Reveal as="img" src={`${a}/preview.jpg`} alt="Khánh Vân và Tiến Luân" /></div></section>
      <section className="t49n-ending"><RsvpForm className="t49n-rsvp" accent="#8d0808" /><GiftNote className="t49n-gift" title="Gửi quà mừng tới dâu rể" /><Reveal as="h2"><Heart fill="currentColor" /> Love you forever</Reveal></section>
    </main>
  );
}
