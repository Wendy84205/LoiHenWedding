import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template43New.css';
import './auditFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-43';

export default function Template43New() {
  const count = useInvitationPage('template43new-page', '2027-01-05T11:00:00+07:00');
  return <main className="new-invitation-page t43n">
    <MusicButton className="t43n-music" />
    <section className="t43n-hero"><Reveal><small>THIỆP MỜI CƯỚI</small><h1>Lê Minh <i>&amp;</i> Chi Pu</h1><p>05 · 01 · 2027</p></Reveal><Reveal className="t43n-portrait" direction="scale"><img src={`${a}/image-1.webp`} alt="Lê Minh và Chi Pu" /><span>囍</span></Reveal></section>
    <section className="t43n-family"><Reveal direction="right"><small>NHÀ TRAI</small><h3>Ông Lê Văn Tiến<br />Bà Nguyễn Thị Mỹ</h3></Reveal><b>囍</b><Reveal direction="left"><small>NHÀ GÁI</small><h3>Ông Nguyễn Văn Tân<br />Bà Trịnh Mỹ Lan</h3></Reveal></section>
    <section className="t43n-addresses"><Reveal as="h2">Thân mời bạn</Reveal><Reveal className="t43n-addressRow" direction="right"><div><small>TƯ GIA NHÀ TRAI</small><p>09:30 · 05.01.2027<br/>Mai Dịch, Hà Nội</p></div><iframe title="Bản đồ tư gia nhà trai" loading="lazy" src="https://www.google.com/maps?q=Mai+Dich+Ha+Noi&output=embed"/></Reveal><Reveal className="t43n-addressRow" direction="left"><iframe title="Bản đồ tư gia nhà gái" loading="lazy" src="https://www.google.com/maps?q=Ho+Chi+Minh+City&output=embed"/><div><small>TƯ GIA NHÀ GÁI</small><p>12:00 · 11.01.2027<br/>TP. Hồ Chí Minh</p></div></Reveal></section>
    <section className="t43n-name"><Reveal as="img" src={`${a}/image-2.webp`} alt="Chân dung chú rể Lê Minh" /><Reveal><span>NHÀ CÓ</span><h2>Lê Hoàng Minh</h2><i>Trưởng nam</i></Reveal><Reveal><span>NHÀ CÓ</span><h2>Nguyễn Chi Pu</h2><i>Út nữ</i></Reveal><Reveal as="img" src={`${a}/image-3.webp`} alt="Chân dung cô dâu Chi Pu" /></section>
    <section className="t43n-redStory"><Reveal className="t43n-redPortrait" direction="right"><img src={`${a}/image-2.webp`} alt="Chú rể Lê Hoàng Minh"/><span>Groom</span><h2>Lê Hoàng Minh</h2></Reveal><Reveal className="t43n-redPortrait" direction="left"><img src={`${a}/image-3.webp`} alt="Cô dâu Nguyễn Mai Chi"/><span>Bride</span><h2>Nguyễn Mai Chi</h2></Reveal><Reveal as="p">Mong một đời hạnh phúc, một đời an vui. Từ hôm nay chúng mình cùng viết tiếp câu chuyện dưới một mái nhà.</Reveal><div><Reveal as="img" src={`${a}/image-4.webp`} alt="Ảnh cưới trang trọng" direction="right"/><Reveal as="img" src={`${a}/image-5.webp`} alt="Khoảnh khắc tình yêu" direction="left"/></div></section>
    <section className="t43n-day"><Sparkles /><Reveal><small>TRÂN TRỌNG THÔNG BÁO</small><h2>Lễ thành hôn</h2><strong>05</strong><p>THÁNG 01 · NĂM 2027<br />11:00 · THỨ BA</p></Reveal><VenueLink query="Hoan Kiem Hanoi">Xem chỉ đường</VenueLink><WeddingCalendar month="JANUARY 2027" weddingDay={5} offset={4} /><Countdown values={count} className="t43n-count" /></section>
    <section className="t43n-album"><Reveal as="img" src={`${a}/image-4.webp`} alt="Ảnh cưới truyền thống" /><Reveal as="img" src={`${a}/image-5.webp`} alt="Khoảnh khắc thành hôn" /></section>
    <section className="t43n-end"><Heart fill="currentColor" /><RsvpForm accent="#a40808" className="t43n-rsvp" /><GiftNote className="t43n-gift" /><Reveal as="h2">Hân hạnh đón tiếp</Reveal></section>
  </main>;
}
