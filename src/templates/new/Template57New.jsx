import React from 'react';
import { Heart, Sun } from 'lucide-react';
import { Countdown, FallingDecor, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template57New.css';
import './auditFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-57';

export default function Template57New() {
  const count = useInvitationPage('template57new-page', '2027-04-22T16:00:00+07:00');
  return (
    <main className="new-invitation-page t57n">
      <MusicButton className="t57n-music" />
      <section className="t57n-hero"><FallingDecor symbols={['·', '♡']} count={13} /><img src={`${a}/image-1.jpg`} alt="Nguyễn Minh và Bùi Phượng trong hoàng hôn" /><Reveal className="t57n-title" direction="scale" duration={1.6}><small>WE GOT MARRIED</small><h1>Nguyễn Minh <i>-</i> Bùi Phượng</h1><p>22 · 04 · 2027</p></Reveal></section>
      <section className="t57n-intro"><Reveal><Sun /><h2>L.O.V.E</h2><p>Hữu duyên nên nghĩa vợ chồng, trăm năm giữ trọn tấm lòng cùng nhau.</p></Reveal><Reveal className="t57n-family"><span><b>NHÀ TRAI</b><p>Ông Nguyễn Văn Quảng<br />Bà Bùi Thị Lan Anh</p></span><span><b>NHÀ GÁI</b><p>Ông Bùi Xuân Dũng<br />Bà Đặng Thị Yến Nhi</p></span></Reveal><Reveal className="t57n-calendarArt"><img src={`${a}/image-2.jpg`} alt="Ảnh cưới hoàng hôn" /><WeddingCalendar month="APRIL · 2027" weddingDay={22} /></Reveal></section>
      <section className="t57n-events"><Reveal><small>TIỆC CƯỚI NHÀ TRAI</small><h2>22.04.2027</h2><p>THỨ NĂM · 16:00<br />KHU PHỐ XUÂN THƯỢNG, NAM SẦM SƠN</p><VenueLink query="Sam Son Thanh Hoa">Xem chỉ đường</VenueLink></Reveal><Reveal><small>TIỆC CƯỚI NHÀ GÁI</small><h2>21.04.2027</h2><p>THỨ TƯ · 18:00<br />TƯ GIA NHÀ GÁI, HƯNG YÊN</p><VenueLink query="Hung Yen">Xem chỉ đường</VenueLink></Reveal><Countdown values={count} className="t57n-count" duration={1.6} /></section>
      <section className="t57n-date"><Reveal><span>We got married</span><h2>LỄ VU QUY</h2><div><small>THÁNG 04</small><b>22</b><small>NĂM 2027</small></div><p>16:00 · TƯ GIA NHÀ TRAI</p></Reveal></section>
      <section className="t57n-album"><Reveal as="h2">Golden hour</Reveal><Reveal as="img" src={`${a}/image-2.jpg`} alt="Album hoàng hôn" /><div><Reveal as="img" direction="right" src={`${a}/image-3.jpg`} alt="Minh Khôi và Thùy Linh" /><Reveal as="img" direction="left" src={`${a}/image-7.jpg`} alt="Khoảnh khắc cưới lãng mạn" /></div></section>
      <section className="t57n-ending"><RsvpForm className="t57n-rsvp" accent="#963b3b" /><GiftNote className="t57n-gift" /><Reveal as="h2"><Heart fill="currentColor" /> Thank you</Reveal></section>
    </main>
  );
}
