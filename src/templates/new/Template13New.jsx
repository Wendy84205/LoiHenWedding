import React from 'react';
import { CalendarDays, Heart, MapPin, Sparkles } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, WishForm, useInvitationPage } from './NewInvitationCommon.jsx';
import { useInvitationContent } from '../../commerce/CommercialInvitationContext.jsx';
import './template13New.css';

const asset = '/assets/new-templates/thiep-cuoi-13';
const dateFallback = '2027-09-23T10:30:00+07:00';

export default function Template13New() {
  const content = useInvitationContent({
    couple: { groomName: 'Minh Khang', brideName: 'Hà My' },
    event: { startsAt: dateFallback, venueName: 'Không gian tiệc cưới', address: 'Thành phố Hồ Chí Minh' },
  });
  const date = new Date(content.event.startsAt || dateFallback);
  const count = useInvitationPage('template13new-page', date.toISOString());
  const month = date.toLocaleString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();
  const schedule = content.schedule?.length ? content.schedule.slice(0, 3) : [];

  return (
    <main className="new-invitation-page t13n">
      <h1 className="visually-hidden">Thiệp cưới {content.couple.brideName} và {content.couple.groomName}</h1>
      <MusicButton className="t13n-music" />
      <section className="t13n-cover">
        <Reveal className="t13n-topline"><span>AN AUTUMN CELEBRATION</span><Sparkles size={17}/></Reveal>
        <Reveal className="t13n-names"><h2>{content.couple.brideName}<i>&amp;</i>{content.couple.groomName}</h2><p>WHEN TWO STORIES BECOME ONE</p></Reveal>
        <Reveal as="img" src={`${asset}/image-1.webp`} alt={`${content.couple.brideName} và ${content.couple.groomName}`} direction="scale" />
        <span className="t13n-dateSeal">{String(date.getDate()).padStart(2,'0')}<small>{month.split(' ')[0]}</small></span>
      </section>

      <section className="t13n-familyPage">
        <Reveal className="t13n-intro"><small>WITH OUR FAMILIES</small><h2>Một lời hẹn<br />thành đôi.</h2><p>{content.copy.intro}</p></Reveal>
        <div className="t13n-familyCards">
          <Reveal><span>NHÀ TRAI</span><b>{content.families.groomFather}</b><b>{content.families.groomMother}</b><small>{content.families.groomAddress}</small></Reveal>
          <Reveal><span>NHÀ GÁI</span><b>{content.families.brideFather}</b><b>{content.families.brideMother}</b><small>{content.families.brideAddress}</small></Reveal>
        </div>
        <Reveal className="t13n-frame" direction="left"><img src={`${asset}/image-2.webp`} alt="Chân dung ngày cưới"/><span>THE DAY WE CHOSE FOREVER</span></Reveal>
      </section>

      <section className="t13n-story">
        <Reveal className="t13n-storyHeader"><small>OUR LITTLE UNIVERSE · 01</small><h2>{content.copy.quote}</h2></Reveal>
        <Reveal as="p">{content.copy.story}</Reveal>
        <div><Reveal as="img" src={`${asset}/image-3.webp`} alt="Kỷ niệm của cô dâu chú rể" direction="right"/><Reveal as="img" src={`${asset}/image-4.webp`} alt="Một ngày bên nhau" direction="left"/></div>
        <Reveal className="t13n-storyStamp"><Heart fill="currentColor"/><span>LOVE<br/>GROWS HERE</span></Reveal>
      </section>

      <section className="t13n-details">
        <Reveal className="t13n-detailHeading"><CalendarDays/><small>02 · MARK YOUR CALENDAR</small><h2>Ngày mình về chung một nhà</h2></Reveal>
        <Reveal className="t13n-dateCard"><span>{date.toLocaleDateString('vi-VN',{weekday:'long'}).toUpperCase()}</span><strong>{String(date.getDate()).padStart(2,'0')}</strong><span>{month}</span></Reveal>
        <Reveal className="t13n-venue"><h3>{content.event.venueName}</h3><p>{content.event.address}</p><VenueLink query={content.event.address}><MapPin size={14}/> Xem bản đồ</VenueLink></Reveal>
        <WeddingCalendar month={month} date={content.event.startsAt || dateFallback} weddingDay={date.getDate()} />
        <Reveal className="t13n-schedule"><small>THE WEDDING DAY</small>{schedule.map((event,index)=><div key={`${event.time}-${event.label}`}><time>{event.time}</time><span>{event.label}</span><b>{`0${index+1}`}</b></div>)}</Reveal>
        <Reveal className="t13n-dresscode"><small>ATTIRE NOTES</small><h3>Dress code</h3><p>Sắc mật ong, kem và xanh olive sẽ rất hợp với buổi tiệc mùa thu.</p><div aria-label="Bảng màu gợi ý"><i/><i/><i/></div></Reveal>
        <Countdown values={count} className="t13n-countdown"/>
      </section>

      <section className="t13n-gallery"><Reveal><small>03 · COLLECTED MOMENTS</small><h2>Chuyện chúng mình</h2></Reveal><Reveal as="img" src={`${asset}/image-5.webp`} alt="Ảnh cưới kỷ niệm"/><div><Reveal as="img" src={`${asset}/image-6.webp`} alt="Cặp đôi ngày cưới"/><Reveal as="img" src={`${asset}/image-7.webp`} alt="Khoảnh khắc hạnh phúc"/></div></section>
      <section className="t13n-ending"><RsvpForm className="t13n-rsvp" accent="#b66b20"/><Reveal className="t13n-wishes"><small>LEAVE A LITTLE WISH</small><WishForm className="t13n-wish" accent="#b66b20"/></Reveal><GiftNote className="t13n-gift"/><Reveal as="h2">And so, we begin.</Reveal></section>
    </main>
  );
}
