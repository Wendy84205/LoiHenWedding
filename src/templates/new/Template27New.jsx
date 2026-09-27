import React from 'react';
import { CalendarDays, Heart, MapPin } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, WishForm, useInvitationPage } from './NewInvitationCommon.jsx';
import { useInvitationContent } from '../../commerce/CommercialInvitationContext.jsx';
import './template27New.css';

const asset = '/assets/new-templates/thiep-cuoi-27';
const fallbackDate = '2027-11-19T10:30:00+07:00';

export default function Template27New() {
  const content = useInvitationContent({ couple: { groomName: 'Anh Quân', brideName: 'Như Ý' }, event: { startsAt: fallbackDate, venueName: 'Không gian tiệc cưới', address: 'Thành phố Hồ Chí Minh' } });
  const dateValue = content.event.startsAt || fallbackDate;
  const date = new Date(dateValue);
  const month = date.toLocaleString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();
  const count = useInvitationPage('template27new-page', dateValue);
  const schedule = content.schedule?.length ? content.schedule.slice(0, 3) : [];

  return (
    <main className="new-invitation-page t27n">
      <h1 className="visually-hidden">Thiệp cưới {content.couple.brideName} và {content.couple.groomName}</h1>
      <MusicButton className="t27n-music" />
      <section className="t27n-cover"><Reveal as="img" src={`${asset}/preview.webp`} alt={`${content.couple.brideName} và ${content.couple.groomName}`} direction="scale"/><Reveal className="t27n-coverTitle"><small>THE WEDDING OF</small><h2>{content.couple.brideName}<i>&amp;</i>{content.couple.groomName}</h2><p>{date.toLocaleDateString('vi-VN',{day:'2-digit',month:'2-digit',year:'numeric'})}</p></Reveal><span className="t27n-index">ISSUE Nº 01<br/>NOVEMBER · 2027</span></section>
      <section className="t27n-intro"><Reveal className="t27n-sectionMark"><span>01</span><small>A LETTER FOR YOU</small></Reveal><Reveal><h2>Hai hành trình<br/>thành một lối đi.</h2><p>{content.copy.story}</p><Heart aria-hidden="true"/></Reveal></section>
      <section className="t27n-editorial"><Reveal as="img" src={`${asset}/image-2.webp`} alt="Chân dung cô dâu" direction="right"/><Reveal className="t27n-caption"><small>THE BRIDE</small><h3>{content.couple.brideName}</h3><p>“{content.copy.quote}”</p></Reveal><Reveal as="img" src={`${asset}/image-3.webp`} alt="Chân dung chú rể" direction="left"/><Reveal className="t27n-caption t27n-captionGroom"><small>THE GROOM</small><h3>{content.couple.groomName}</h3><p>Ngày mai, mình cùng viết tiếp câu chuyện này.</p></Reveal></section>
      <section className="t27n-invitation"><Reveal className="t27n-sectionMark"><span>02</span><small>OUR FAMILIES INVITE YOU</small></Reveal><Reveal className="t27n-names"><h2>{content.couple.groomName}<i>&amp;</i>{content.couple.brideName}</h2><p>Trân trọng kính mời bạn và gia đình đến chung vui trong ngày thành hôn.</p></Reveal><div className="t27n-families"><Reveal><small>NHÀ TRAI</small><b>{content.families.groomFather}</b><b>{content.families.groomMother}</b><span>{content.families.groomAddress}</span></Reveal><Heart aria-hidden="true"/><Reveal><small>NHÀ GÁI</small><b>{content.families.brideFather}</b><b>{content.families.brideMother}</b><span>{content.families.brideAddress}</span></Reveal></div><Reveal className="t27n-venue"><span>{date.toLocaleDateString('vi-VN',{weekday:'long'}).toUpperCase()}</span><strong>{String(date.getDate()).padStart(2,'0')}</strong><span>{month}</span><h3>{content.event.venueName}</h3><p>{content.event.address}</p><VenueLink query={content.event.address}><MapPin size={14}/> Mở bản đồ</VenueLink></Reveal></section>
      <section className="t27n-program"><Reveal className="t27n-sectionMark"><span>03</span><small>THE DAY, IN ORDER</small></Reveal><Reveal className="t27n-programTitle"><CalendarDays/><h2>Ngày mình chung đôi</h2></Reveal><WeddingCalendar month={month} weddingDay={date.getDate()} date={dateValue}/><Reveal className="t27n-schedule"><small>CHƯƠNG TRÌNH NGÀY VUI</small>{schedule.map(event=><div key={`${event.time}-${event.label}`}><time>{event.time}</time><span>{event.label}</span></div>)}</Reveal><Reveal className="t27n-dress"><small>A LITTLE COLOR NOTE</small><h3>Dress code</h3><p>Đen, trắng và một sắc champagne nhẹ nhàng.</p><div aria-label="Bảng màu gợi ý"><i/><i/><i/></div></Reveal><Countdown values={count} className="t27n-count"/></section>
      <section className="t27n-photos"><Reveal className="t27n-sectionMark"><span>04</span><small>PHOTOGRAPHS · 2027</small></Reveal><Reveal as="img" src={`${asset}/image-4.webp`} alt="Ngày vui dưới mái vòm"/><div><Reveal as="img" src={`${asset}/image-5.webp`} alt="Khoảnh khắc lễ cưới"/><Reveal as="img" src={`${asset}/image-6.webp`} alt="Cô dâu chú rể bên nhau"/></div><Reveal as="img" src={`${asset}/image-7.webp`} alt="Ảnh cưới ngoài trời"/></section>
      <section className="t27n-ending"><Reveal className="t27n-endTitle"><small>05 · WE SAVED YOU A SEAT</small><h2>See you<br/>on our day.</h2></Reveal><RsvpForm className="t27n-rsvp" accent="#7c7c70"/><Reveal className="t27n-wishes"><small>YOUR WORDS, OUR KEEPSAKE</small><WishForm className="t27n-wish" accent="#7c7c70"/></Reveal><GiftNote className="t27n-gift" title="A kind gesture"/></section>
    </main>
  );
}
