import React, { useState } from 'react';
import { Heart, MailOpen } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template60New.css';
import './fontFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-60';

export default function Template60New() {
  const count = useInvitationPage('template60new-page', '2027-03-28T17:30:00+07:00');
  const [open, setOpen] = useState(false);
  return (
    <main className="new-invitation-page t60n">
      <MusicButton className="t60n-music" />
      <section className="t60n-opening"><Reveal as="h1" direction="down">Wedding Invitation</Reveal><button type="button" className={open ? 't60n-envelope is-open' : 't60n-envelope'} onClick={() => setOpen((value) => !value)} aria-label="Mở thiệp"><span className="t60n-card"><img src={`${a}/preview.png`} alt="Tuấn Minh và Thu An" /></span><span className="t60n-back" /><span className="t60n-flap" /><span className="t60n-front" /><i><MailOpen /></i></button><p>{open ? 'Thiệp đã mở' : 'Chạm để mở thiệp'}</p></section>
      <section className="t60n-hero"><Reveal as="img" src={`${a}/image-2.png`} alt="Tuấn Minh và Thu An" /><Reveal className="t60n-names"><small>THE WEDDING OF</small><h1>Thu An <i>&amp;</i> Tuấn Minh</h1><p>28 · 03 · 2027</p></Reveal></section>
      <section className="t60n-couple"><div><Reveal direction="right"><img src={`${a}/image-5.png`} alt="Cô dâu Thu An" /><h2>Thu An</h2></Reveal><Reveal className="t60n-pinkQuote" direction="scale"><span>Em là bình yên anh muốn giữ</span><Heart fill="currentColor" /><span>Anh là hạnh phúc em muốn trao</span></Reveal><Reveal direction="left"><img src={`${a}/image-6.png`} alt="Chú rể Tuấn Minh" /><h2>Tuấn Minh</h2></Reveal></div><div className="t60n-families"><p><b>NHÀ GÁI</b><br />Ông Nguyễn Trí Thanh<br />Bà Lê Thị Hải</p><p><b>NHÀ TRAI</b><br />Ông Nguyễn Văn Tú<br />Bà Lê Thị Mai</p></div></section>
      <section className="t60n-invite"><Reveal><small>TRÂN TRỌNG KÍNH MỜI</small><h2>Bạn và Người thương</h2><p>Đến dự bữa tiệc thân mật cùng gia đình chúng tôi</p></Reveal><Reveal className="t60n-date" direction="scale"><span>CHỦ NHẬT<br />THÁNG 03</span><strong>28</strong><span>NĂM 2027<br />17:30</span></Reveal><Reveal><h3>GEM CENTER</h3><p>8 Nguyễn Bỉnh Khiêm, Quận 1, TP. Hồ Chí Minh</p><VenueLink query="GEM Center Ho Chi Minh">Chỉ đường</VenueLink></Reveal></section>
      <section className="t60n-dateSection"><Reveal><WeddingCalendar month="MARCH · 2027" weddingDay={28} offset={0} /></Reveal><Countdown values={count} className="t60n-count" /></section>
      <section className="t60n-album"><Reveal as="h2">Our pink day</Reveal><div><Reveal as="img" direction="right" src={`${a}/image-3.png`} alt="Album cưới hồng" /><Reveal as="img" direction="left" src={`${a}/image-4.png`} alt="Ảnh cưới Tuấn Minh Thu An" /><Reveal as="img" src={`${a}/image-7.png`} alt="Khoảnh khắc ngày cưới" /></div></section>
      <section className="t60n-ending"><RsvpForm className="t60n-rsvp" accent="#b85f79" /><GiftNote className="t60n-gift" /><Reveal as="h2">Thank you</Reveal></section>
    </main>
  );
}
