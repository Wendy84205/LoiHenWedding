import React from 'react';
import { Heart, Wine } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template69New.css';
import './structureFidelity.css';
import './fontFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-69';

export default function Template69New() {
  const count = useInvitationPage('template69new-page', '2027-11-28T10:00:00+07:00');
  return <main className="new-invitation-page t69n">
    <MusicButton className="t69n-music" />
    <section className="t69n-hero"><img src={`${a}/image-1.webp`} alt="Hải Nam và Ngọc Hân" /><Reveal className="t69n-title"><small>BLESSING BEGINS</small><h1>Hải Nam <i>&amp;</i> Ngọc Hân</h1><p>28 · 11 · 2027</p></Reveal></section>
    <section className="t69n-invite"><Reveal><small>INVITATION</small><h2>Nhân danh tình yêu</h2><p>Chúng tôi trân trọng mời bạn đến tham dự sự kiện trọng đại này.</p></Reveal><Reveal className="t69n-date"><span>CHỦ NHẬT<br />10H00</span><strong>28</strong><span>THÁNG 11<br />NĂM 2027</span></Reveal></section>
    <section className="t69n-timeline"><Reveal as="h2">Wedding timeline</Reveal><Reveal><Wine /><b>10:00</b><span>Chụp ảnh cùng khách mời</span></Reveal><Reveal><Heart /><b>11:00</b><span>Lễ thành hôn</span></Reveal><Reveal><Wine /><b>12:30</b><span>Tiệc cưới</span></Reveal></section>
    <section className="t69n-day"><VenueLink query="Cinelove Hotel Hanoi">Khách sạn CineLove · Xem đường</VenueLink><WeddingCalendar month="NOVEMBER 2027" weddingDay={28} offset={6} /><Countdown values={count} className="t69n-count" /></section>
    <section className="t69n-end"><RsvpForm accent="#780b12" className="t69n-rsvp" /><GiftNote className="t69n-gift" /><Reveal as="h2">Forever starts here</Reveal></section>
  </main>;
}
