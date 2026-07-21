import React from 'react';
import { Heart, Quote } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template99New.css';
import './auditFidelity.css';
import './fontFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-99';

export default function Template99New() {
  const count = useInvitationPage('template99new-page', '2027-11-29T11:00:00+07:00');
  return <main className="new-invitation-page t99n">
    <MusicButton className="t99n-music" />
    <section className="t99n-hero"><Reveal as="small">SAVE THE DATE</Reveal><Reveal as="h1">ANNA <i>&amp;</i> KEN</Reveal><Reveal className="t99n-grid" direction="scale"><img src={`${a}/image-1.webp`} alt="Anna và Ken" /><img src={`${a}/image-2.webp`} alt="Ảnh cưới dạng lưới" /><img src={`${a}/image-3.webp`} alt="Khoảnh khắc của cặp đôi" /></Reveal><Reveal as="p">29 · 11 · 2027</Reveal></section>
    <section className="t99n-story"><Reveal as="small">CHUYỆN CHÚNG MÌNH</Reveal><Reveal as="h2">A modern love story</Reveal><Reveal as="p">Tình yêu bắt đầu từ những cái nhìn đầu tiên, lớn lên qua từng ngày và trở nên vững chắc khi hai người cùng vượt qua mọi thử thách.</Reveal><Quote /></section>
    <section className="t99n-modernStory"><Reveal className="t99n-layered" direction="scale"><img src={`${a}/image-4.webp`} alt="Anna và Ken trong câu chuyện tình yêu"/><img src={`${a}/image-5.webp`} alt="Chuyện của cô dâu chú rể"/><img src={`${a}/image-6.webp`} alt="Khoảnh khắc đẹp trong cuộc sống"/></Reveal><Reveal><small>CHUYỆN CỦA CÔ DÂU</small><h2>Love grows stronger</h2><p>Tình yêu giữa Ken và Anna bắt đầu từ những cái nhìn đầu tiên. Họ hiểu và yêu thương nhau nhiều hơn qua từng ngày, cùng vượt qua mọi khó khăn và thử thách.</p></Reveal></section>
    <section className="t99n-profiles"><Reveal><img src={`${a}/image-4.webp`} alt="Chân dung Anna" /><span>CÔ DÂU</span><h3>ANNA</h3></Reveal><Reveal><img src={`${a}/image-5.webp`} alt="Chân dung Ken" /><span>CHÚ RỂ</span><h3>KEN</h3></Reveal></section>
    <section className="t99n-mapCard"><Reveal as="h2">PROMES CENTER</Reveal><Reveal as="p">122 - 124, Đ. Xuân Thủy, Dịch Vọng Hậu, Cầu Giấy, Hà Nội</Reveal><Reveal><iframe title="Bản đồ Promes Center" loading="lazy" src="https://www.google.com/maps?q=Promes+Center+Hanoi&output=embed"/></Reveal><Reveal className="t99n-timeCard"><span>VÀO LÚC</span><strong>15:30</strong><p>29.11.2027</p></Reveal></section>
    <section className="t99n-event"><Reveal className="t99n-date"><span>THỨ HAI</span><strong>29</strong><span>THÁNG 11</span></Reveal><Reveal><h2>PROMES CENTER</h2><p>11:00 · Hà Nội</p><VenueLink query="Promes Center Hanoi">Xem đường đi</VenueLink></Reveal><Countdown values={count} className="t99n-count" /></section>
    <section className="t99n-calendar"><WeddingCalendar month="NOVEMBER · 2027" weddingDay={29} offset={0} /></section>
    <section className="t99n-end"><RsvpForm accent="#262626" className="t99n-rsvp" /><GiftNote className="t99n-gift" /><Reveal as="h2"><Heart fill="currentColor" /> THANK YOU!</Reveal></section>
  </main>;
}
