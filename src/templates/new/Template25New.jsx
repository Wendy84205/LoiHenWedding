import React from 'react';
import { Heart, MapPin, PartyPopper } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, WishForm, useInvitationPage } from './NewInvitationCommon.jsx';
import { useInvitationContent } from '../../commerce/CommercialInvitationContext.jsx';
import './template25New.css';

const asset = '/assets/new-templates/thiep-cuoi-25';
const fallbackDate = '2027-09-17T10:30:00+07:00';

export default function Template25New() {
  const content = useInvitationContent({
    couple: { groomName: 'Duy Anh', brideName: 'Hồng Ngọc' },
    event: { startsAt: fallbackDate, venueName: 'Không gian ngày vui', address: 'Thành phố Hồ Chí Minh' },
  });
  const dateValue = content.event.startsAt || fallbackDate;
  const date = new Date(dateValue);
  const count = useInvitationPage('template25new-page', dateValue);
  const month = date.toLocaleString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();
  const schedule = content.schedule?.length ? content.schedule.slice(0, 3) : [];

  return (
    <main className="new-invitation-page t25n">
      <h1 className="visually-hidden">Thiệp cưới {content.couple.groomName} và {content.couple.brideName}</h1>
      <MusicButton className="t25n-music" />
      <section className="t25n-hero">
        <span className="t25n-stamp t25n-stampTop">SAVE<br />THE<br />DATE</span>
        <Reveal className="t25n-heroWords"><small>HERE COMES</small><h2>our<br />favorite<br />day!</h2><p>{date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p></Reveal>
        <Reveal as="img" className="t25n-cutout" src={`${asset}/preview.webp`} alt={`${content.couple.groomName} và ${content.couple.brideName}`} direction="scale" />
        <span className="t25n-stamp t25n-stampBottom">HAPPY<br />TOGETHER</span>
      </section>
      <section className="t25n-letter">
        <Reveal><small>WE’RE GETTING MARRIED</small><h2>{content.couple.groomName}<i>&amp;</i>{content.couple.brideName}</h2><p>{content.copy.intro}</p><Heart fill="currentColor" /></Reveal>
      </section>
      <section className="t25n-gallery">
        <Reveal as="img" src={`${asset}/image-3.webp`} alt="Hai chúng mình trong trang phục cưới" direction="right" />
        <Reveal className="t25n-polaroid"><img src={`${asset}/image-4.webp`} alt="Chân dung chú rể"/><small>THE GROOM</small></Reveal>
        <Reveal className="t25n-polaroid"><img src={`${asset}/image-5.webp`} alt="Chân dung cô dâu"/><small>THE BRIDE</small></Reveal>
        <Reveal as="img" src={`${asset}/image-6.webp`} alt="Nụ cười trong ngày cưới" direction="left" />
        <Reveal className="t25n-noteTag">BEST<br />DAY<br />EVER</Reveal>
      </section>
      <section className="t25n-family"><Reveal><small>NHÀ TRAI</small><b>{content.families.groomFather}</b><b>{content.families.groomMother}</b><span>{content.families.groomAddress}</span></Reveal><Heart /><Reveal><small>NHÀ GÁI</small><b>{content.families.brideFather}</b><b>{content.families.brideMother}</b><span>{content.families.brideAddress}</span></Reveal></section>
      <section className="t25n-event">
        <Reveal className="t25n-eventTitle"><PartyPopper /><small>COME CELEBRATE WITH US</small><h2>Ngày vui của chúng mình</h2></Reveal>
        <Reveal className="t25n-date"><span>{date.toLocaleDateString('vi-VN', { weekday: 'long' }).toUpperCase()}</span><strong>{String(date.getDate()).padStart(2, '0')}</strong><span>{month}</span></Reveal>
        <Reveal className="t25n-venue"><h3>{content.event.venueName}</h3><p>{content.event.address}</p><VenueLink query={content.event.address}><MapPin size={15}/> Xem địa điểm</VenueLink></Reveal>
        <WeddingCalendar month={month} weddingDay={date.getDate()} date={dateValue} />
        <Reveal className="t25n-schedule"><small>CHƯƠNG TRÌNH NGÀY VUI</small>{schedule.map(item=><div key={`${item.time}-${item.label}`}><time>{item.time}</time><span>{item.label}</span></div>)}</Reveal>
        <Reveal className="t25n-dress"><small>WHAT TO WEAR</small><h3>Dress code</h3><p>Hồng đào, kem và sắc đỏ gạch là những màu yêu thích cho ngày hôm ấy.</p><div aria-label="Bảng màu gợi ý"><i/><i/><i/></div></Reveal>
        <Countdown values={count} className="t25n-count" />
      </section>
      <section className="t25n-ending"><Reveal as="h2">See you there!</Reveal><RsvpForm className="t25n-rsvp" accent="#ef8d82"/><Reveal className="t25n-wishes"><small>LEAVE A LITTLE LOVE</small><WishForm className="t25n-wish" accent="#c9504a"/></Reveal><GiftNote className="t25n-gift" title="A little gift"/></section>
    </main>
  );
}
