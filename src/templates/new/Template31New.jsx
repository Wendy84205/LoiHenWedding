import React from 'react';
import { Heart, ListMusic, Play, SkipBack, SkipForward } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, useInvitationPage } from './NewInvitationCommon.jsx';
import './template31New.css';

const a = '/assets/new-templates/thiep-cuoi-31';

export default function Template31New() {
  const count = useInvitationPage('template31new-page', '2027-08-15T11:30:00+07:00');
  return (
    <main className="new-invitation-page t31n">
      <MusicButton className="t31n-music" />
      <section className="t31n-hero"><img src={`${a}/image-1.jpg`} alt="Duy Nam và Minh Anh" /><Reveal className="t31n-title"><small>THE WEDDING OF</small><h1>Duy Nam <i>&amp;</i> Minh Anh</h1><p>15 · 08 · 2027</p></Reveal></section>
      <section className="t31n-player"><Reveal className="t31n-controls" direction="scale"><Heart /><SkipBack /><Play /><SkipForward /><ListMusic /></Reveal><Reveal as="p">Hi~<br />Khi bạn đọc được những dòng này, điều đó có nghĩa là đám cưới của chúng mình đã bước vào giai đoạn đếm ngược rồi. Trong một năm thật đặc biệt này, chúng mình quyết định nắm tay nhau bước sang một chặng đường mới.</Reveal></section>
      <section className="t31n-profiles"><Reveal direction="right"><img src={`${a}/image-3.jpg`} alt="Chú rể Duy Nam" /><h2>Duy Nam</h2><span>Chú rể</span></Reveal><Reveal direction="left"><img src={`${a}/image-4.jpg`} alt="Cô dâu Minh Anh" /><h2>Minh Anh</h2><span>Cô dâu</span></Reveal></section>
      <section className="t31n-event"><Reveal><h2>WEDDING DAY</h2><p>15 / 08 / 2027 · 11:30<br />TƯ GIA NHÀ TRAI<br />Hà Nội</p><VenueLink query="Ha Noi">Chỉ đường</VenueLink></Reveal><Countdown values={count} className="t31n-count" /></section>
      <section className="t31n-ending"><RsvpForm className="t31n-rsvp" accent="#111" compact /><GiftNote className="t31n-gift" /><Reveal as="h2">See you there <Heart fill="currentColor" /></Reveal></section>
    </main>
  );
}
