import React from 'react';
import { CalendarDays, Heart, MapPin } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, WishForm, useInvitationPage } from './NewInvitationCommon.jsx';
import { useInvitationContent } from '../../commerce/CommercialInvitationContext.jsx';
import './template33New.css';

const asset = '/assets/new-templates/thiep-cuoi-33';
const fallbackDate = '2027-09-25T10:30:00+07:00';

export default function Template33New() {
  const content = useInvitationContent({ couple: { groomName: 'Minh Trí', brideName: 'Bảo Anh' }, event: { startsAt: fallbackDate, venueName: 'Không gian tiệc cưới', address: 'Thành phố Hồ Chí Minh' } });
  const dateValue = content.event.startsAt || fallbackDate;
  const date = new Date(dateValue);
  const month = date.toLocaleString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();
  const count = useInvitationPage('template33new-page', dateValue);
  const schedule = content.schedule?.length ? content.schedule.slice(0, 3) : [];

  return (
    <main className="new-invitation-page t33n">
      <h1 className="visually-hidden">Thiệp cưới {content.couple.brideName} và {content.couple.groomName}</h1>
      <MusicButton className="t33n-music" />
      <section className="t33n-cover">
        <Reveal as="img" src={`${asset}/preview.webp`} alt={`${content.couple.brideName} và ${content.couple.groomName}`} direction="scale" />
        <Reveal className="t33n-coverTitle"><small>WEDDING ANNOUNCEMENT · 2027</small><h2>{content.couple.brideName}<i>&amp;</i>{content.couple.groomName}</h2><p>{date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p></Reveal>
        <span className="t33n-coverIndex">A NEW CHAPTER<br />NO. 01</span>
      </section>
      <section className="t33n-intro">
        <Reveal className="t33n-label"><span>01</span><small>A NOTE FROM US</small></Reveal>
        <Reveal><h2>Trong một thế giới rộng lớn,<br />mình đã tìm thấy nhau.</h2><p>{content.copy.story}</p><Heart /></Reveal>
      </section>
      <section className="t33n-story">
        <Reveal as="img" src={`${asset}/image-2.webp`} alt="Cô dâu và chú rể trong ngày vui" direction="right" />
        <Reveal className="t33n-pullQuote"><small>A PROMISE TO KEEP</small><p>“{content.copy.quote}”</p></Reveal>
        <div><Reveal as="img" src={`${asset}/image-3.webp`} alt="Khoảnh khắc hai người bên nhau"/><Reveal as="img" src={`${asset}/image-4.webp`} alt="Một khung hình trong album cưới"/></div>
      </section>
      <section className="t33n-invitation">
        <Reveal className="t33n-label"><span>02</span><small>OUR FAMILIES INVITE YOU</small></Reveal>
        <Reveal className="t33n-inviteTitle"><small>TRÂN TRỌNG KÍNH MỜI</small><h2>Bạn và gia đình<br />đến chung vui cùng chúng mình.</h2></Reveal>
        <div className="t33n-families"><Reveal><small>NHÀ TRAI</small><b>{content.families.groomFather}</b><b>{content.families.groomMother}</b><span>{content.families.groomAddress}</span></Reveal><Heart/><Reveal><small>NHÀ GÁI</small><b>{content.families.brideFather}</b><b>{content.families.brideMother}</b><span>{content.families.brideAddress}</span></Reveal></div>
        <Reveal className="t33n-date"><span>{date.toLocaleDateString('vi-VN', { weekday: 'long' }).toUpperCase()}</span><strong>{String(date.getDate()).padStart(2, '0')}</strong><span>{month}</span></Reveal>
        <Reveal className="t33n-venue"><h3>{content.event.venueName}</h3><p>{content.event.address}</p><VenueLink query={content.event.address}><MapPin size={14}/> Chỉ đường</VenueLink></Reveal>
      </section>
      <section className="t33n-program">
        <Reveal className="t33n-programTitle"><CalendarDays/><small>03 · OUR WEDDING DAY</small><h2>Ngày mình thành đôi</h2></Reveal>
        <WeddingCalendar month={month} weddingDay={date.getDate()} date={dateValue}/>
        <Reveal className="t33n-schedule"><small>CHƯƠNG TRÌNH NGÀY VUI</small>{schedule.map(item=><div key={`${item.time}-${item.label}`}><time>{item.time}</time><span>{item.label}</span></div>)}</Reveal>
        <Reveal className="t33n-dress"><small>ATTIRE SUGGESTION</small><h3>Dress code</h3><p>Trắng, đen và một chấm đỏ nhẹ nhàng, đúng tinh thần của tấm thiệp.</p><div aria-label="Bảng màu gợi ý"><i/><i/><i/></div></Reveal>
        <Countdown values={count} className="t33n-count"/>
      </section>
      <section className="t33n-gallery"><Reveal className="t33n-galleryTitle"><small>04 · MOMENTS TO KEEP</small><h2>We found home<br />in each other.</h2></Reveal><Reveal as="img" src={`${asset}/image-5.webp`} alt="Chân dung đôi mình"/><div><Reveal as="img" src={`${asset}/image-6.webp`} alt="Ảnh cưới trong ánh sáng mềm"/><Reveal as="img" src={`${asset}/image-7.webp`} alt="Cặp đôi trong ngày cưới"/></div><Reveal as="img" src={`${asset}/image-8.webp`} alt="Một kỷ niệm trong album"/></section>
      <section className="t33n-ending"><Reveal className="t33n-endTitle"><small>05 · SAVE A DATE FOR US</small><h2>We can't wait<br />to see you.</h2></Reveal><RsvpForm className="t33n-rsvp" accent="#a43842"/><Reveal className="t33n-wishes"><small>YOUR WISHES MEAN A LOT</small><WishForm className="t33n-wish" accent="#a43842"/></Reveal><GiftNote className="t33n-gift" title="With love"/></section>
    </main>
  );
}
