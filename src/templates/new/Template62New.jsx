import React from 'react';
import { Heart, Moon, Sparkles } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template62New.css';
import './auditFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-62';

export default function Template62New() {
  const count = useInvitationPage('template62new-page', '2027-05-24T18:00:00+07:00');
  return (
    <main className="new-invitation-page t62n">
      <MusicButton className="t62n-music" />
      <section className="t62n-hero"><img src={`${a}/preview.png`} alt="Cung điện cưới dưới bầu trời đêm"/><Reveal className="t62n-title" direction="down" duration={1.6}><Moon/><h1>Save The Date</h1><p>Nguyễn My <i>◇</i> Trọng Nhân</p></Reveal></section>
      <section className="t62n-invite"><Reveal as="h2">Thư Mời Dự Tiệc</Reveal><Reveal><small>TRÂN TRỌNG KÍNH MỜI</small><h3>Bạn và Người thương</h3><p>Tới dự ngày vui của hai chúng mình</p></Reveal><Reveal className="t62n-date" direction="scale" duration={1.6}><span>THÁNG 05</span><strong>24</strong><span>NĂM 2027</span></Reveal><Reveal><h3>GOLDEN PALACE</h3><p>Đồng Me, Mễ Trì, Nam Từ Liêm, Hà Nội</p><VenueLink query="Golden Palace Me Tri Ha Noi">Chỉ đường</VenueLink></Reveal></section>
      <section className="t62n-couple"><Reveal as="img" src={`${a}/image-1.jpg`} alt="Nguyễn My và Trọng Nhân"/><Reveal className="t62n-arch"><span>WELCOME TO OUR WEDDING</span><h2>My <i>&amp;</i> Nhân</h2><p>Hạnh phúc là khi ta tìm thấy một người để cùng nhau ngắm mọi bình minh và hoàng hôn.</p></Reveal></section>
      <section className="t62n-calendar"><Reveal><Sparkles/><WeddingCalendar month="MAY · 2027" weddingDay={24} offset={5}/></Reveal><Countdown values={count} className="t62n-count" duration={1.6}/></section>
      <section className="t62n-album"><Reveal as="h2">A fairytale of us</Reveal><div>{['image-2.jpg','image-3.jpg','image-4.jpg','image-5.jpg','image-7.jpg'].map((image,index)=><Reveal as="img" key={image} direction={index%2?'left':'right'} src={`${a}/${image}`} alt="Album cưới cổ tích"/>)}</div></section>
      <section className="t62n-ending"><RsvpForm className="t62n-rsvp" accent="#70447c"/><GiftNote className="t62n-gift"/><Reveal as="h2"><Heart fill="currentColor"/> Thank you</Reveal></section>
    </main>
  );
}
