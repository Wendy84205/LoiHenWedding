import React from 'react';
import { CalendarDays, Heart, MapPin } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, WishForm, useInvitationPage } from './NewInvitationCommon.jsx';
import { useInvitationContent } from '../../commerce/CommercialInvitationContext.jsx';
import './template29New.css';

const asset = '/assets/new-templates/thiep-cuoi-29';
const fallbackDate = '2027-09-21T10:30:00+07:00';

export default function Template29New() {
  const content = useInvitationContent({ couple: { groomName: 'Minh Châu', brideName: 'Huyền Anh' }, event: { startsAt: fallbackDate, venueName: 'Không gian tiệc cưới', address: 'Thành phố Hồ Chí Minh' } });
  const dateValue = content.event.startsAt || fallbackDate;
  const date = new Date(dateValue);
  const month = date.toLocaleString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();
  const count = useInvitationPage('template29new-page', dateValue);
  const schedule = content.schedule?.length ? content.schedule.slice(0, 3) : [];

  return (
    <main className="new-invitation-page t29n">
      <h1 className="visually-hidden">Thiệp cưới {content.couple.brideName} và {content.couple.groomName}</h1>
      <MusicButton className="t29n-music" />
      <section className="t29n-cover"><Reveal as="img" src={`${asset}/preview.webp`} alt={`${content.couple.brideName} và ${content.couple.groomName}`} direction="scale"/><div className="t29n-coverVeil"/><Reveal className="t29n-coverWords"><small>AN EVENING PROMISE</small><h2>{content.couple.brideName}<i>&amp;</i>{content.couple.groomName}</h2><p>{date.toLocaleDateString('vi-VN',{day:'2-digit',month:'long',year:'numeric'})}</p></Reveal><span className="t29n-sideLabel">TWO SOULS · ONE JOURNEY</span></section>
      <section className="t29n-story"><Reveal className="t29n-storyLabel"><span>01</span><small>WHEN THE SUN SLOWED DOWN</small></Reveal><Reveal><h2>Một buổi chiều,<br/>mình tìm thấy nhau.</h2><p>{content.copy.story}</p><Heart aria-hidden="true"/></Reveal><Reveal as="img" src={`${asset}/image-2.webp`} alt="Khoảnh khắc dịu dàng của đôi mình" direction="left"/><Reveal className="t29n-quote"><p>“{content.copy.quote}”</p><small>{content.couple.groomName} &amp; {content.couple.brideName}</small></Reveal></section>
      <section className="t29n-family"><Reveal><small>FROM HIS FAMILY</small><h3>Nhà trai</h3><b>{content.families.groomFather}</b><b>{content.families.groomMother}</b><span>{content.families.groomAddress}</span></Reveal><Heart/><Reveal><small>FROM HER FAMILY</small><h3>Nhà gái</h3><b>{content.families.brideFather}</b><b>{content.families.brideMother}</b><span>{content.families.brideAddress}</span></Reveal></section>
      <section className="t29n-invitation"><Reveal className="t29n-inviteLabel"><small>02 · OUR WEDDING INVITATION</small><h2>We would love<br/>to celebrate with you.</h2><p>Trân trọng kính mời bạn cùng gia đình đến chung vui.</p></Reveal><Reveal className="t29n-date"><span>{date.toLocaleDateString('vi-VN',{weekday:'long'}).toUpperCase()}</span><strong>{String(date.getDate()).padStart(2,'0')}</strong><span>{month}</span></Reveal><Reveal className="t29n-venue"><h3>{content.event.venueName}</h3><p>{content.event.address}</p><VenueLink query={content.event.address}><MapPin size={14}/> Chỉ đường</VenueLink></Reveal></section>
      <section className="t29n-program"><Reveal className="t29n-programTitle"><CalendarDays/><small>03 · THE WEDDING DAY</small><h2>Gặp nhau dưới trời thu</h2></Reveal><WeddingCalendar month={month} weddingDay={date.getDate()} date={dateValue}/><Reveal className="t29n-schedule"><small>CHƯƠNG TRÌNH NGÀY VUI</small>{schedule.map(event=><div key={`${event.time}-${event.label}`}><time>{event.time}</time><span>{event.label}</span></div>)}</Reveal><Reveal className="t29n-dress"><small>A SOFT COLOR PALETTE</small><h3>Dress code</h3><p>Xanh trời, kem ấm hoặc nâu đất sẽ rất đẹp trong ánh chiều.</p><div aria-label="Bảng màu gợi ý"><i/><i/><i/></div></Reveal><Countdown values={count} className="t29n-count"/></section>
      <section className="t29n-gallery"><Reveal className="t29n-galleryTitle"><small>04 · OUR LITTLE WORLD</small><h2>Kept in the<br/>warmth of light.</h2></Reveal><Reveal as="img" src={`${asset}/image-3.webp`} alt="Cặp đôi dưới bầu trời xanh"/><div><Reveal as="img" src={`${asset}/image-4.webp`} alt="Nụ cười ngày cưới"/><Reveal as="img" src={`${asset}/image-5.webp`} alt="Một khoảnh khắc gần nhau"/></div><Reveal as="img" src={`${asset}/image-6.webp`} alt="Ảnh cưới trong nắng chiều"/></section>
      <section className="t29n-ending"><Reveal className="t29n-endTitle"><small>05 · HOLD A PLACE FOR US</small><h2>Hope to see you.</h2></Reveal><RsvpForm className="t29n-rsvp" accent="#d09b73"/><Reveal className="t29n-wishes"><small>LEAVE US A NOTE</small><WishForm className="t29n-wish" accent="#d09b73"/></Reveal><GiftNote className="t29n-gift" title="With gratitude"/></section>
    </main>
  );
}
