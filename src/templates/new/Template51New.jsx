import React from 'react';
import { Heart, Leaf } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template51New.css';
import './structureFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-51';

export default function Template51New() {
  const count = useInvitationPage('template51new-page', '2027-11-28T16:30:00+07:00');
  const timeline = [['15:30', 'Đón khách'], ['16:00', 'Làm lễ'], ['16:30', 'Khai tiệc']];
  return <main className="new-invitation-page t51n">
    <MusicButton className="t51n-music" />
    <section className="t51n-hero"><Reveal className="t51n-frame" direction="scale"><img src={`${a}/image-1.webp`} alt="Quang Huy và Mai Trang" /><span>H + T</span></Reveal><Reveal className="t51n-title"><small>WEDDING INVITATION</small><h1>Quang Huy <i>&amp;</i> Mai Trang</h1><p>28 · 11 · 2027</p></Reveal></section>
    <section className="t51n-invite"><Leaf /><Reveal><small>TRÂN TRỌNG KÍNH MỜI</small><h2>Đến tham dự lễ cưới của</h2><p>Trịnh Quang Huy &amp; Nguyễn Mai Trang</p></Reveal></section>
    <section className="t51n-day"><Reveal><span>THÁNG 11</span><strong>28</strong><span>NĂM 2027</span></Reveal><WeddingCalendar month="NOVEMBER" weddingDay={28} offset={0} /><Countdown values={count} className="t51n-count" /></section>
    <section className="t51n-timeline"><Reveal as="h2">Timeline</Reveal>{timeline.map(([time, label], index) => <Reveal className="t51n-step" direction={index % 2 ? 'left' : 'right'} key={time}><b>{time}</b><i /><span>{label}</span></Reveal>)}</section>
    <section className="t51n-venue"><Reveal as="img" src={`${a}/image-2.webp`} alt="Không gian tiệc cưới xanh" /><Reveal><small>WEDDING VENUE</small><h2>CineLove Garden</h2><p>48 Lê Văn Lương, Hà Nội</p><VenueLink query="48 Le Van Luong Hanoi">Xem chỉ đường</VenueLink></Reveal></section>
    <section className="t51n-album"><Reveal as="h2">Album cưới</Reveal><div><Reveal as="img" src={`${a}/image-3.webp`} alt="Album Quang Huy và Mai Trang" /><Reveal as="img" src={`${a}/image-4.webp`} alt="Ảnh cưới xanh rêu" /><Reveal as="img" src={`${a}/image-5.webp`} alt="Khoảnh khắc ngày cưới" /></div></section>
    <section className="t51n-end"><RsvpForm accent="#3f5531" className="t51n-rsvp" /><GiftNote className="t51n-gift" /><Reveal as="h2"><Heart fill="currentColor" /> Thank you</Reveal></section>
  </main>;
}
