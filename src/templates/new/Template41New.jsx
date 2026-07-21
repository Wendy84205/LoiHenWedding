import React, { useState } from 'react';
import { Heart, MailOpen } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template41New.css';
import './auditFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-41';

export default function Template41New() {
  const [opened, setOpened] = useState(false);
  const count = useInvitationPage('template41new-page', '2027-11-25T12:00:00+07:00');
  return <main className={`new-invitation-page t41n ${opened ? 'is-open' : ''}`}>
    <MusicButton className="t41n-music" />
    <section className="t41n-opening"><Reveal as="h1">Wedding Invitation</Reveal><div className="t41n-envelope"><div className="t41n-back" /><div className="t41n-photo"><img src={`${a}/image-1.webp`} alt="Nguyễn Dương và Khánh Thy" /></div><div className="t41n-flap" /><div className="t41n-front" /><button type="button" onClick={() => setOpened(true)} aria-label="Mở thiệp"><MailOpen /> <span>Chạm để mở thiệp</span></button></div></section>
    <section className="t41n-hero"><Reveal><small>SAVE THE DATE</small><h1>Nguyễn Dương <i>&amp;</i> Khánh Thy</h1><p>25 · 11 · 2027 · 12:00</p></Reveal><Reveal as="img" src={`${a}/image-2.webp`} alt="Ảnh cưới Nguyễn Dương và Khánh Thy" direction="scale" /></section>
    <section className="t41n-family"><Reveal><small>NHÀ TRAI</small><h2>Ông Nguyễn Văn An<br />Bà Trương Thị Minh</h2><p>Ba Đình, Hà Nội</p></Reveal><Heart /><Reveal><small>NHÀ GÁI</small><h2>Ông Lê Văn Nam<br />Bà Nguyễn Thị Lan</h2><p>Hoàn Kiếm, Hà Nội</p></Reveal></section>
    <section className="t41n-forestDate"><img src={`${a}/image-3.webp`} alt="Ngày cưới bên hồ xanh"/><Reveal className="t41n-calendarOverlay" direction="scale"><WeddingCalendar month="NOVEMBER 2027" weddingDay={25} offset={0}/></Reveal><Reveal as="p">Đã lâu không gặp, hẹn nhau trong ngày cưới nhé!</Reveal></section>
    <section className="t41n-invite"><Reveal><small>TRÂN TRỌNG THÔNG BÁO</small><h2>Lễ thành hôn</h2><strong>25</strong><p>THÁNG 11 · NĂM 2027<br />12:00 · THỨ NĂM</p><VenueLink query="Ba Dinh Hanoi">Tư gia nhà trai · Xem đường</VenueLink></Reveal><WeddingCalendar month="NOVEMBER 2027" weddingDay={25} offset={0} /><Countdown values={count} className="t41n-count" /></section>
    <section className="t41n-vowStory"><Reveal as="img" src={`${a}/image-4.webp`} alt="Nguyễn Dương và Khánh Thy bên hồ" direction="right"/><Reveal className="t41n-sideWords" direction="left"><h2>You are<br/>the best<br/>for me</h2><p>Anh sẽ luôn yêu em. Mỗi ngày em có thể nói anh bao nhiêu lần cũng được.</p></Reveal><Reveal as="p">Trong đời mỗi người sẽ luôn có một khoảnh khắc cần kiên định với lựa chọn của chính mình. Khoảnh khắc ấy chính là hiện tại, có bạn bên cạnh.</Reveal><Reveal as="img" src={`${a}/image-5.webp`} alt="Khoảnh khắc hạnh phúc bên nhau" direction="left"/><Reveal as="img" src={`${a}/image-6.webp`} alt="Chân dung cô dâu chú rể" direction="right"/></section>
    <section className="t41n-album"><Reveal as="img" src={`${a}/image-3.webp`} alt="Khoảnh khắc ngày cưới" direction="right" /><Reveal as="img" src={`${a}/image-4.webp`} alt="Album cưới xanh" direction="left" /></section>
    <section className="t41n-end"><RsvpForm accent="#4e765e" className="t41n-rsvp" /><GiftNote className="t41n-gift" /><Reveal as="h2">Trân trọng kính mời</Reveal></section>
  </main>;
}
