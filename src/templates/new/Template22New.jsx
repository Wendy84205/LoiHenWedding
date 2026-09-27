import React from 'react';
import { CalendarDays, Heart, MapPin } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, WishForm, useInvitationPage } from './NewInvitationCommon.jsx';
import { useInvitationContent } from '../../commerce/CommercialInvitationContext.jsx';
import './template22New.css';

const asset = '/assets/new-templates/thiep-cuoi-22';
const fallbackDate = '2027-10-14T10:30:00+07:00';

export default function Template22New() {
  const content = useInvitationContent({
    couple: { groomName: 'Trí Hưng', brideName: 'Thùy An' },
    event: { startsAt: fallbackDate, venueName: 'Không gian tiệc cưới', address: 'Thành phố Hồ Chí Minh' },
  });
  const date = new Date(content.event.startsAt || fallbackDate);
  const dateValue = content.event.startsAt || fallbackDate;
  const count = useInvitationPage('template22new-page', dateValue);
  const month = date.toLocaleString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();
  const schedule = content.schedule?.length ? content.schedule.slice(0, 4) : [];

  return (
    <main className="new-invitation-page t22n">
      <h1 className="visually-hidden">Thiệp cưới của {content.couple.brideName} và {content.couple.groomName}</h1>
      <MusicButton className="t22n-music" />
      <section className="t22n-cover">
        <Reveal as="img" src={`${asset}/image-2.webp`} alt={`${content.couple.brideName} và ${content.couple.groomName}`} direction="scale" />
        <div className="t22n-coverShade" />
        <Reveal className="t22n-coverCopy"><small>AN AUTUMN WEDDING · 2027</small><h2>{content.couple.brideName}<i>&amp;</i>{content.couple.groomName}</h2><p>{date.toLocaleDateString('vi-VN', { day: '2-digit', month: 'long', year: 'numeric' })}</p></Reveal>
        <span className="t22n-vertical">A DAY TO REMEMBER</span>
      </section>

      <section className="t22n-note">
        <Reveal className="t22n-noteMark"><span>01</span><small>A NOTE FROM US</small></Reveal>
        <Reveal className="t22n-noteCopy"><h2>Tháng năm dịu dàng<br />đưa ta về bên nhau.</h2><p>{content.copy.story}</p><Heart aria-hidden="true" /></Reveal>
        <Reveal as="img" src={`${asset}/image-3.webp`} alt="Cô dâu trong khoảnh khắc ngày vui" direction="left" />
        <Reveal className="t22n-noteQuote"><p>“{content.copy.quote}”</p><span>{content.couple.groomName} &amp; {content.couple.brideName}</span></Reveal>
      </section>

      <section className="t22n-invitation">
        <Reveal className="t22n-kicker"><span>02</span><small>THE WEDDING INVITATION</small></Reveal>
        <Reveal className="t22n-inviteTitle"><small>WITH OUR FAMILIES</small><h2>Trân trọng kính mời</h2><p>{content.copy.intro}</p></Reveal>
        <div className="t22n-families">
          <Reveal><small>GIA ĐÌNH NHÀ TRAI</small><b>{content.families.groomFather}</b><b>{content.families.groomMother}</b><span>{content.families.groomAddress}</span></Reveal>
          <Heart aria-hidden="true" />
          <Reveal><small>GIA ĐÌNH NHÀ GÁI</small><b>{content.families.brideFather}</b><b>{content.families.brideMother}</b><span>{content.families.brideAddress}</span></Reveal>
        </div>
        <Reveal className="t22n-date"><span>{date.toLocaleDateString('vi-VN', { weekday: 'long' }).toUpperCase()}</span><strong>{String(date.getDate()).padStart(2, '0')}</strong><span>{month}</span></Reveal>
        <Reveal className="t22n-venue"><h3>{content.event.venueName}</h3><p>{content.event.address}</p><VenueLink query={content.event.address}><MapPin size={15} /> Xem địa điểm</VenueLink></Reveal>
      </section>

      <section className="t22n-day">
        <Reveal className="t22n-dayHeading"><CalendarDays /><small>03 · THE CELEBRATION</small><h2>Hẹn nhau trong ngày vui</h2></Reveal>
        <WeddingCalendar month={month} weddingDay={date.getDate()} date={dateValue} />
        <Reveal className="t22n-timeline"><small>CHƯƠNG TRÌNH</small>{schedule.map((item, index) => <div key={`${item.time}-${item.label}`}><time>{item.time}</time><span>{item.label}</span><i>{`0${index + 1}`}</i></div>)}</Reveal>
        <Reveal className="t22n-dress"><small>ATTIRE NOTES</small><h3>Gợi ý trang phục</h3><p>Nâu trầm, kem và xanh olive dịu nhẹ sẽ hòa cùng sắc ảnh mùa thu.</p><div aria-label="Bảng màu gợi ý"><i /><i /><i /></div></Reveal>
        <Countdown values={count} className="t22n-count" />
      </section>

      <section className="t22n-gallery">
        <Reveal className="t22n-galleryHeading"><small>04 · LITTLE MOMENTS</small><h2>Những điều bình dị<br />thành thương nhớ.</h2></Reveal>
        <div><Reveal as="img" src={`${asset}/image-4.webp`} alt="Đôi mình dưới ánh chiều" /><Reveal as="img" src={`${asset}/image-5.webp`} alt="Ánh mắt trao nhau" /><Reveal as="img" src={`${asset}/image-6.webp`} alt="Khoảnh khắc bên nhau" /><Reveal as="img" src={`${asset}/image-7.webp`} alt="Nụ hôn ngày cưới" /><Reveal as="img" src={`${asset}/image-8.webp`} alt="Cùng nhau bước tiếp" /></div>
      </section>

      <section className="t22n-ending">
        <Reveal className="t22n-rsvpTitle"><small>05 · SAVE US A SEAT</small><h2>Chờ bạn đến chung vui</h2></Reveal>
        <RsvpForm className="t22n-rsvp" accent="#a77f70" />
        <Reveal className="t22n-wishes"><small>LEAVE A WISH</small><WishForm className="t22n-wish" accent="#a77f70" /></Reveal>
        <GiftNote className="t22n-gift" title="With love" />
        <Reveal as="p" className="t22n-thanks">Thank you for being part of our story.</Reveal>
      </section>
    </main>
  );
}
