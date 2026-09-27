import React from 'react';
import { CalendarDays, Heart, MapPin } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, WishForm, useInvitationPage } from './NewInvitationCommon.jsx';
import { useInvitationContent } from '../../commerce/CommercialInvitationContext.jsx';
import './template32New.css';

const asset='/assets/new-templates/thiep-cuoi-32';
const fallbackDate='2027-08-24T10:30:00+07:00';

export default function Template32New(){
  const content=useInvitationContent({couple:{groomName:'Đức Minh',brideName:'Hải Yến'},event:{startsAt:fallbackDate,venueName:'Không gian ngày vui',address:'Thành phố Hồ Chí Minh'}});
  const dateValue=content.event.startsAt||fallbackDate;const date=new Date(dateValue);const month=date.toLocaleString('en-US',{month:'long',year:'numeric'}).toUpperCase();const count=useInvitationPage('template32new-page',dateValue);const schedule=content.schedule?.length?content.schedule.slice(0,3):[];
  return <main className="new-invitation-page t32n">
    <h1 className="visually-hidden">Thiệp cưới {content.couple.brideName} và {content.couple.groomName}</h1><MusicButton className="t32n-music"/>
    <section className="t32n-cover"><Reveal as="img" src={`${asset}/preview.webp`} alt={`${content.couple.brideName} và ${content.couple.groomName}`} direction="scale"/><Reveal className="t32n-coverNote"><small>TOGETHER, ALWAYS</small><h2>{content.couple.brideName}<i>&amp;</i>{content.couple.groomName}</h2><p>{date.toLocaleDateString('vi-VN',{day:'2-digit',month:'2-digit',year:'numeric'})}</p></Reveal></section>
    <section className="t32n-note"><Reveal className="t32n-index"><b>01</b><small>A LITTLE NOTE</small></Reveal><Reveal><h2>Chúng mình đã chọn<br/>một đời bên nhau.</h2><p>{content.copy.story}</p><Heart/></Reveal></section>
    <section className="t32n-photoStory"><Reveal as="img" src={`${asset}/image-2.webp`} alt="Ngày vui của cô dâu chú rể"/><Reveal className="t32n-photoCaption"><small>AN ORDINARY DAY, MADE GOLDEN</small><p>“{content.copy.quote}”</p></Reveal><div><Reveal as="img" src={`${asset}/image-3.webp`} alt="Khoảnh khắc trao nhau lời hẹn"/><Reveal as="img" src={`${asset}/image-4.webp`} alt="Nụ cười trong ngày cưới"/></div></section>
    <section className="t32n-family"><Reveal><small>NHÀ TRAI</small><b>{content.families.groomFather}</b><b>{content.families.groomMother}</b><span>{content.families.groomAddress}</span></Reveal><Heart/><Reveal><small>NHÀ GÁI</small><b>{content.families.brideFather}</b><b>{content.families.brideMother}</b><span>{content.families.brideAddress}</span></Reveal></section>
    <section className="t32n-event"><Reveal className="t32n-eventTitle"><small>02 · PLEASE JOIN US</small><h2>Ngày mình chung đôi</h2><p>Gia đình hai bên trân trọng kính mời bạn và gia đình.</p></Reveal><Reveal className="t32n-date"><span>{date.toLocaleDateString('vi-VN',{weekday:'long'}).toUpperCase()}</span><strong>{String(date.getDate()).padStart(2,'0')}</strong><span>{month}</span></Reveal><Reveal className="t32n-venue"><h3>{content.event.venueName}</h3><p>{content.event.address}</p><VenueLink query={content.event.address}><MapPin size={14}/> Mở bản đồ</VenueLink></Reveal><Reveal><CalendarDays/><WeddingCalendar month={month} weddingDay={date.getDate()} date={dateValue}/></Reveal><Reveal className="t32n-schedule"><small>CHƯƠNG TRÌNH</small>{schedule.map(item=><div key={`${item.time}-${item.label}`}><time>{item.time}</time><span>{item.label}</span></div>)}</Reveal><Reveal className="t32n-dress"><small>A WARM COLOR NOTE</small><h3>Dress code</h3><p>Cam đất, champagne và kem ấm sẽ hòa cùng ánh vàng của ngày vui.</p><div aria-label="Bảng màu gợi ý"><i/><i/><i/></div></Reveal><Countdown values={count} className="t32n-count"/></section>
    <section className="t32n-gallery"><Reveal as="h2">Small moments,<br/>big love.</Reveal><div><Reveal as="img" src={`${asset}/image-5.webp`} alt="Ảnh cưới đôi mình"/><Reveal as="img" src={`${asset}/image-6.webp`} alt="Cô dâu trong ánh nắng"/><Reveal as="img" src={`${asset}/image-7.webp`} alt="Khoảnh khắc hạnh phúc"/><Reveal as="img" src={`${asset}/image-8.webp`} alt="Album cưới"/></div></section>
    <section className="t32n-ending"><RsvpForm className="t32n-rsvp" accent="#b55231"/><Reveal className="t32n-wishes"><small>LEAVE US A LITTLE LOVE</small><WishForm className="t32n-wish" accent="#b55231"/></Reveal><GiftNote className="t32n-gift" title="With thanks"/><Reveal as="h2">Thank you</Reveal></section>
  </main>;
}
