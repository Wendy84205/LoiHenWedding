import React, { useState } from 'react';
import { Heart, MailOpen } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template73New.css';
import './auditFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-73';

export default function Template73New() {
  const [open, setOpen] = useState(false);
  const count = useInvitationPage('template73new-page', '2027-11-29T15:00:00+07:00');
  return <main className={`new-invitation-page t73n ${open ? 'is-open' : ''}`}>
    <MusicButton className="t73n-music" />
    <section className="t73n-cover"><div className="t73n-card"><img src={`${a}/flower-top.webp`} alt="" /><Heart fill="currentColor" /><h1>Minh Hằng<br /><i>&amp;</i><br />Đức Hiển</h1><p>29 · 11 · 2027</p><small>Kính mời<br /><b>Bạn &amp; người thương</b><br />đến dự buổi tiệc chung vui cùng gia đình</small><button type="button" onClick={() => setOpen(true)}><MailOpen /> Mở thiệp</button></div></section>
    <section className="t73n-hero"><img className="t73n-flowerTop" src={`${a}/flower-top.webp`} alt="" /><img className="t73n-flowerBottom" src={`${a}/flower-parallax.webp`} alt="" /><Reveal><small>THIỆP BÁO HỶ</small><h2>Minh Hằng <i>&amp;</i> Đức Hiển</h2><p>29 · 11 · 2027</p></Reveal><Reveal as="img" className="t73n-heroPhoto" src={`${a}/image-1.webp`} alt="Minh Hằng và Đức Hiển" direction="scale" /></section>
    <section className="t73n-family"><Reveal><small>NHÀ TRAI</small><h3>Ông Trần Văn Đạt<br />Bà Lê Hà Như</h3><p>Tam Trinh, Hà Nội</p></Reveal><Reveal><small>NHÀ GÁI</small><h3>Ông Lê Văn Đức<br />Bà Lê Thị Oanh</h3><p>Phố Huế, Hà Nội</p></Reveal></section>
    <section className="t73n-invite"><Reveal><small>TRÂN TRỌNG BÁO TIN</small><h2>Lễ thành hôn</h2><p>15:00 · Thứ Hai · 29.11.2027<br />Tại tư gia nhà gái</p><VenueLink query="Pho Hue Hanoi">Xem chỉ đường</VenueLink></Reveal><WeddingCalendar month="NOVEMBER 2027" weddingDay={29} offset={6} /><Countdown values={count} className="t73n-count" /></section>
    <section className="t73n-end"><RsvpForm accent="#3e5c48" className="t73n-rsvp" /><GiftNote className="t73n-gift" /><Reveal as="h2">Gửi quà mừng</Reveal></section>
    <section className="t73n-album"><Reveal as="img" src={`${a}/image-2.webp`} alt="Album báo hỷ" /><Reveal as="img" src={`${a}/image-3.webp`} alt="Ảnh cưới Minh Hằng và Đức Hiển" /><Reveal as="img" src={`${a}/image-4.webp`} alt="Khoảnh khắc thành hôn" /></section>
    <section className="t73n-final"><img className="t73n-finalFlowerTop" src={`${a}/flower-top.webp`} alt="" /><Reveal as="h2">Hân hạnh được đón tiếp!</Reveal><Reveal as="p">Minh Hằng &amp; Đức Hiển</Reveal><img className="t73n-finalFlowerBottom" src={`${a}/flower-parallax.webp`} alt="" /></section>
  </main>;
}
