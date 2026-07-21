import React from 'react';
import { Gem, Heart } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template37New.css';
import './auditFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-37';

export default function Template37New() {
  const count = useInvitationPage('template37new-page', '2027-12-25T11:30:00+07:00');
  return <main className="new-invitation-page t37n">
    <h1 className="visually-hidden">Thiệp cưới online mẫu 37</h1>
    <MusicButton className="t37n-music" />
    <section className="t37n-hero"><Reveal className="t37n-word" direction="right">WED</Reveal><Reveal as="img" src={`${a}/image-1.webp`} alt="Trà My và Minh Tiến" direction="scale" /><Reveal className="t37n-word" direction="left">DING</Reveal><Reveal className="t37n-meta"><span>2027</span><b>25.12</b><span>11:30</span></Reveal></section>
    <section className="t37n-profiles"><Reveal direction="right"><small>GROOM</small><img src={`${a}/image-2.webp`} alt="Chú rể Minh Tiến" /><h2>Trần Minh Tiến</h2></Reveal><Reveal direction="left"><small>BRIDE</small><img src={`${a}/image-3.webp`} alt="Cô dâu Trà My" /><h2>Nguyễn Trà My</h2></Reveal></section>
    <section className="t37n-about"><Reveal as="small">ABOUT US</Reveal><Reveal as="h2">To the world you may be one person.<br />To one person you may be the world.</Reveal><Gem /></section>
    <section className="t37n-invite"><Reveal><small>WEDDING INVITATION</small><h2>Trân trọng kính mời</h2><p>11:30 · Thứ Bảy · 25.12.2027<br />Promes Center, Hà Nội</p><VenueLink query="Promes Center Hanoi">Dẫn đường</VenueLink></Reveal><Countdown values={count} className="t37n-count" /></section>
    <section className="t37n-day"><WeddingCalendar month="DECEMBER 2027" weddingDay={25} offset={2} /><Reveal as="img" src={`${a}/image-4.webp`} alt="Ảnh cưới tối giản" /></section>
    <section className="t37n-end"><Reveal as="p">Khoảnh khắc đẹp nhất là khi được nắm tay người mình yêu, cùng nhau đan dệt một cuộc sống ngọt ngào.</Reveal><RsvpForm accent="#650000" className="t37n-rsvp" /><GiftNote className="t37n-gift" /><Reveal as="h2"><Heart fill="currentColor" /> See you</Reveal></section>
  </main>;
}
