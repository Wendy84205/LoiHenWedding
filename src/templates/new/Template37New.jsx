import React from 'react';
import { CalendarDays, Gem, Heart } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, WishForm, useInvitationPage } from './NewInvitationCommon.jsx';
import { useInvitationContent } from '../../commerce/CommercialInvitationContext.jsx';
import './template37New.css';

const asset = '/assets/new-templates/thiep-cuoi-37';
const fallbackDate = '2027-12-25T11:30:00+07:00';

export default function Template37New() {
  const content = useInvitationContent({
    couple: { groomName: 'Trần Minh Tiến', brideName: 'Nguyễn Trà My' },
    families: { groomFather: 'Ông Trần Văn Minh', groomMother: 'Bà Nguyễn Thị Hoa', brideFather: 'Ông Nguyễn Văn Hùng', brideMother: 'Bà Lê Thị Lan' },
    event: { startsAt: fallbackDate, venueName: 'Promes Center', address: 'Hà Nội' },
  });
  const dateValue = content.event.startsAt || fallbackDate;
  const date = new Date(dateValue);
  const dateLabel = date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const month = date.toLocaleString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();
  const count = useInvitationPage('template37new-page', dateValue);
  const schedule = content.schedule?.length ? content.schedule.slice(0, 3) : [
    { time: '11:00', label: 'Đón tiếp khách mời' },
    { time: '11:30', label: 'Lễ thành hôn' },
    { time: '12:30', label: 'Khai tiệc' },
  ];

  return <main className="new-invitation-page t37n">
    <h1 className="visually-hidden">Thiệp cưới {content.couple.brideName} và {content.couple.groomName}</h1>
    <MusicButton className="t37n-music" />
    <section className="t37n-hero"><Reveal className="t37n-word" direction="fade">WED</Reveal><Reveal as="img" src={`${asset}/image-1.webp`} alt={`${content.couple.brideName} và ${content.couple.groomName}`} direction="scale" /><Reveal className="t37n-word" direction="fade">DING</Reveal><Reveal className="t37n-meta"><span>{date.getFullYear()}</span><b>{dateLabel.slice(0, 5)}</b><span>{date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span></Reveal><Reveal className="t37n-heroNames"><small>TOGETHER WITH OUR FAMILIES</small><h2>{content.couple.brideName}<i>&amp;</i>{content.couple.groomName}</h2></Reveal></section>
    <section className="t37n-profiles"><Reveal direction="right"><small>GROOM</small><img src={`${asset}/image-4.webp`} alt={`Chú rể ${content.couple.groomName}`} /><h2>{content.couple.groomName}</h2></Reveal><Reveal direction="left"><small>BRIDE</small><img src={`${asset}/image-3.webp`} alt={`Cô dâu ${content.couple.brideName}`} /><h2>{content.couple.brideName}</h2></Reveal></section>
    <section className="t37n-about"><Reveal as="small">ABOUT US</Reveal><Reveal as="h2">To the world you may be one person.<br />To one person you may be the world.</Reveal><Gem /><Reveal as="p">Từ những ngày bình thường nhất, chúng mình đã tìm thấy một mái nhà trong nhau.</Reveal><Reveal as="img" src={`${asset}/image-5.webp`} alt="Một khoảnh khắc của đôi mình" /></section>
    <section className="t37n-families"><Reveal><small>OUR FAMILIES</small><h2>Hai gia đình<br />trân trọng kính mời</h2></Reveal><div className="t37n-familyGrid"><Reveal><small>NHÀ TRAI</small><b>{content.families.groomFather}</b><b>{content.families.groomMother}</b><p>{content.families.groomAddress}</p></Reveal><Heart/><Reveal><small>NHÀ GÁI</small><b>{content.families.brideFather}</b><b>{content.families.brideMother}</b><p>{content.families.brideAddress}</p></Reveal></div></section>
    <section className="t37n-invite"><Reveal><small>WEDDING INVITATION</small><h2>Trân trọng kính mời</h2><p>{date.toLocaleDateString('vi-VN', { weekday: 'long' })} · {dateLabel} · {date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}<br />{content.event.venueName}, {content.event.address}</p><VenueLink query={content.event.address || content.event.venueName}>Dẫn đường</VenueLink></Reveal><Countdown values={count} className="t37n-count" /></section>
    <section className="t37n-day"><Reveal className="t37n-dayTitle"><CalendarDays/><small>OUR WEDDING DAY</small><h2>Ngày mình thành đôi</h2></Reveal><WeddingCalendar month={month} date={dateValue} weddingDay={date.getDate()} /><Reveal className="t37n-schedule"><small>CHƯƠNG TRÌNH NGÀY VUI</small>{schedule.map((item) => <div key={`${item.time}-${item.label}`}><time>{item.time}</time><span>{item.label}</span></div>)}</Reveal><Reveal className="t37n-dress"><small>DRESS CODE</small><p>Đỏ rượu vang, đen hoặc những gam màu trung tính.</p><span><i/><i/><i/></span></Reveal><Reveal as="img" src={`${asset}/image-6.webp`} alt="Khoảnh khắc trong album cưới" /></section>
    <section className="t37n-end"><Reveal as="p">Khoảnh khắc đẹp nhất là khi được nắm tay người mình yêu, cùng nhau đan dệt một cuộc sống ngọt ngào.</Reveal><RsvpForm accent="#650000" className="t37n-rsvp" /><Reveal className="t37n-wishes"><small>LEAVE US A WISH</small><WishForm className="t37n-wish" accent="#650000" /></Reveal><GiftNote className="t37n-gift" /><Reveal as="h2"><Heart fill="currentColor" /> See you</Reveal></section>
  </main>;
}
