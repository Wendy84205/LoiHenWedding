import React, { useEffect, useState } from 'react';
import { Heart, PartyPopper, Smile } from 'lucide-react';
import { Countdown, FallingDecor, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WishForm, useInvitationPage } from './NewInvitationCommon.jsx';
import { useInvitationContent } from '../../commerce/CommercialInvitationContext.jsx';
import './template104New.css';
import './structureFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-104';

export default function Template104New({ invitation }) {
  const content = useInvitationContent(invitation?.content);
  const { couple, event, copy, media, schedule } = content;
  const count = useInvitationPage('template104new-page', event.startsAt);
  const [showIntro, setShowIntro] = useState(true);
  const eventDate = new Date(event.startsAt);
  const dateParts = {
    day: String(eventDate.getDate()).padStart(2, '0'),
    month: String(eventDate.getMonth() + 1).padStart(2, '0'),
    year: eventDate.getFullYear(),
    time: eventDate.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    weekday: eventDate.toLocaleDateString('vi-VN', { weekday: 'long' }).toUpperCase(),
  };

  useEffect(() => {
    const timer = window.setTimeout(() => setShowIntro(false), 2400);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="new-invitation-page t104n">
      <MusicButton className="t104n-music" />
      {showIntro && <section className="t104n-intro" aria-label="Mở thiệp cưới"><FallingDecor symbols={['·','✦']} count={18}/><Reveal as="h2" direction="down">Wedding Day</Reveal><Reveal as="img" src={`${a}/opening-couple.gif`} alt="Cô dâu chú rể chào khách" direction="scale"/><Reveal as="p" direction="up">Xin mời xem thiệp cưới của chúng mình nha</Reveal><button type="button" onClick={() => setShowIntro(false)}>Chạm để mở thiệp</button></section>}
      <section className="t104n-hero"><FallingDecor symbols={['✦','·','♡']} count={16}/><Reveal as="img" data-media-role="hero" src={media.hero || media.couple || `${a}/image-2.png`} alt={`${couple.groomName} và ${couple.brideName}`} direction="scale" duration={1.3}/><Reveal className="t104n-title"><small>WE ARE GETTING MARRIED</small><h1><span data-editor-field="couple.groomName">{couple.groomName}</span> <i>&amp;</i> <span data-editor-field="couple.brideName">{couple.brideName}</span></h1><p data-editor-field="event.startsAt.date">{dateParts.day} · {dateParts.month} · {dateParts.year}</p></Reveal></section>
      <section className="t104n-note"><Reveal><Smile/><h2>Hey, we have news!</h2><p data-editor-field="copy.intro">{copy.intro}</p></Reveal></section>
      <section className="t104n-invite"><Reveal><PartyPopper/><small>TRÂN TRỌNG KÍNH MỜI</small><h2>Bạn và Người thương</h2><p>Tới tham dự ngày vui của chúng mình</p></Reveal><Reveal className="t104n-date" direction="scale"><span>{dateParts.weekday}<br/>THÁNG {dateParts.month}</span><strong data-editor-field="event.startsAt.date">{dateParts.day}</strong><span>NĂM {dateParts.year}<br/>{dateParts.time}</span></Reveal><Reveal><h3 data-editor-field="event.venueName">{event.venueName.toUpperCase()}</h3><p data-editor-field="event.address">{event.address}</p><VenueLink query={event.address}>Chỉ đường</VenueLink></Reveal><Countdown values={count} className="t104n-count"/></section>
      <section className="t104n-timeline"><Reveal as="h2">Timeline ngày cưới</Reveal><Reveal className="t104n-path"><img data-media-role="venue" src={media.venue || `${a}/image-3.png`} alt="Lịch trình ngày cưới"/>{schedule.slice(0,4).map((item, index) => <span data-editor-field={`schedule.${index}.label`} key={`${item.time}-${item.label}`}><b>{item.time}</b> {item.label}</span>)}</Reveal></section>
      <section className="t104n-ending"><RsvpForm className="t104n-rsvp" accent="#ef624d"/><WishForm className="t104n-wish" accent="#ef624d"/><GiftNote className="t104n-gift" title="Quà nhỏ, niềm vui to"/>{media.giftQr && <Reveal as="figure" className="t104n-giftQr"><img data-gift-qr src={media.giftQr} alt="QR mừng cưới"/><figcaption>Quét mã gửi quà mừng</figcaption></Reveal>}<Reveal as="h2"><Heart fill="currentColor"/> THANK YOU</Reveal></section>
    </main>
  );
}
