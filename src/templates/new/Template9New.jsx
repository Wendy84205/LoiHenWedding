import React from 'react';
import { CalendarDays, Camera, Heart, MapPin } from 'lucide-react';
import {
  Countdown,
  GiftNote,
  MusicButton,
  Reveal,
  RsvpForm,
  VenueLink,
  WeddingCalendar,
  WishForm,
  useInvitationPage,
} from './NewInvitationCommon.jsx';
import { useInvitationContent } from '../../commerce/CommercialInvitationContext.jsx';
import './template9New.css';

const asset = '/assets/new-templates/thiep-cuoi-9';
const baseDate = '2027-09-19T10:30:00+07:00';

export default function Template9New() {
  const content = useInvitationContent({
    couple: { groomName: 'Tuấn Kiệt', brideName: 'Gia Vy' },
    event: { startsAt: baseDate, venueName: 'Không gian tiệc cưới', address: 'Thành phố Hồ Chí Minh' },
  });
  const eventDate = content.event.startsAt || baseDate;
  const date = new Date(eventDate);
  const count = useInvitationPage('template9new-page', eventDate);
  const month = date.toLocaleString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();
  const timeline = content.schedule?.length ? content.schedule.slice(0, 4) : [];

  return (
    <main className="new-invitation-page t9n">
      <h1 className="visually-hidden">Thiệp cưới của {content.couple.brideName} và {content.couple.groomName}</h1>
      <MusicButton className="t9n-music" />
      <section className="t9n-cover">
        <Reveal as="img" className="t9n-coverImage" src={`${asset}/image-1.webp`} alt={`${content.couple.brideName} và ${content.couple.groomName}`} direction="scale" />
        <div className="t9n-coverShade" />
        <Reveal className="t9n-coverTitle" direction="up">
          <small>AN INTIMATE WEDDING</small>
          <h2>{content.couple.brideName}<i>&amp;</i>{content.couple.groomName}</h2>
          <p>{date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
        </Reveal>
        <a className="t9n-scroll" href="#t9n-invitation">SCROLL TO OUR DAY <span>↓</span></a>
      </section>

      <section className="t9n-story">
        <Reveal className="t9n-storyMark"><span>01</span><span>OUR STORY · 35 MM</span></Reveal>
        <Reveal className="t9n-quote"><h2>Vượt qua những ngày dài,<br />ta tìm thấy nhau.</h2><p>{content.copy.story}</p></Reveal>
        <div className="t9n-filmstrip">
          <Reveal as="img" src={`${asset}/image-2.webp`} alt="Một khung hình trong câu chuyện tình yêu" direction="right" />
          <Reveal as="img" src={`${asset}/image-3.webp`} alt="Khoảnh khắc của cô dâu chú rể" direction="left" />
        </div>
        <Reveal className="t9n-pullquote"><Heart size={18} /><p>“{content.copy.quote}”</p></Reveal>
      </section>

      <section className="t9n-invitation" id="t9n-invitation">
        <Reveal className="t9n-kicker"><span>02</span><small>THE WEDDING INVITATION</small></Reveal>
        <Reveal className="t9n-coupleNames"><h2>{content.couple.groomName}<i>&amp;</i>{content.couple.brideName}</h2><p>{content.copy.intro}</p></Reveal>
        <div className="t9n-families">
          <Reveal><small>GIA ĐÌNH NHÀ TRAI</small><b>{content.families.groomFather}</b><b>{content.families.groomMother}</b><span>{content.families.groomAddress}</span></Reveal>
          <Heart aria-hidden="true" />
          <Reveal><small>GIA ĐÌNH NHÀ GÁI</small><b>{content.families.brideFather}</b><b>{content.families.brideMother}</b><span>{content.families.brideAddress}</span></Reveal>
        </div>
        <Reveal className="t9n-eventDate" direction="scale"><span>{date.toLocaleDateString('vi-VN', { weekday: 'long' }).toUpperCase()}</span><strong>{String(date.getDate()).padStart(2, '0')}</strong><span>{month}</span></Reveal>
        <Reveal className="t9n-venue"><h3>{content.event.venueName}</h3><p>{content.event.address}</p><VenueLink query={content.event.address}><MapPin size={15} /> Xem địa điểm</VenueLink></Reveal>
      </section>

      <section className="t9n-schedule">
        <Reveal className="t9n-sectionTitle"><CalendarDays /><small>03 · THE CELEBRATION</small><h2>Ngày mình chung đôi</h2></Reveal>
        <WeddingCalendar month={month} weddingDay={date.getDate()} date={eventDate} />
        <div className="t9n-timeline">{timeline.map((item, index) => <Reveal key={`${item.time}-${item.label}`}><time>{item.time}</time><span>{item.label}</span><i>{index === 0 ? '01' : `0${index + 1}`}</i></Reveal>)}</div>
        <Reveal className="t9n-dresscode"><small>PLEASE DRESS IN</small><h3>Đen · Champagne · Hồng khói</h3><div aria-label="Màu trang phục gợi ý"><i /><i /><i /></div></Reveal>
        <Countdown values={count} className="t9n-countdown" />
      </section>

      <section className="t9n-gallery">
        <Reveal className="t9n-sectionTitle"><Camera /><small>04 · THE FILM ROLL</small><h2>Những khung hình<br />còn ở lại</h2></Reveal>
        <div><Reveal as="img" src={`${asset}/image-4.webp`} alt="Ảnh cưới trong ánh sáng dịu" direction="right" /><Reveal as="img" src={`${asset}/image-5.webp`} alt="Chân dung cưới" direction="left" /><Reveal as="img" src={`${asset}/image-6.webp`} alt="Khoảnh khắc hạnh phúc ngày cưới" /><Reveal as="img" src={`${asset}/image-7.webp`} alt="Ảnh cưới kỷ niệm" /></div>
      </section>

      <section className="t9n-ending">
        <RsvpForm className="t9n-rsvp" accent="#c58a92" />
        <Reveal className="t9n-wishes"><small>LEAVE US A NOTE</small><WishForm className="t9n-wish" accent="#c58a92" /></Reveal>
        <GiftNote className="t9n-gift" title="A little gesture" />
        <Reveal as="h2">To the moon<br />and back.</Reveal>
      </section>
    </main>
  );
}
