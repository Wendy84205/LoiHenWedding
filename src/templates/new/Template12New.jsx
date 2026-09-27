import React from 'react';
import { CalendarDays, Heart, MapPin, Sparkles } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, WishForm, useInvitationPage } from './NewInvitationCommon.jsx';
import { useInvitationContent } from '../../commerce/CommercialInvitationContext.jsx';
import './template12New.css';

const asset = '/assets/new-templates/thiep-cuoi-12';
const dateFallback = '2027-08-22T10:30:00+07:00';

export default function Template12New() {
  const content = useInvitationContent({
    couple: { groomName: 'Quốc Thiên', brideName: 'Thanh Tú' },
    event: { startsAt: dateFallback, venueName: 'Không gian ngày vui', address: 'Thành phố Hồ Chí Minh' },
  });
  const date = new Date(content.event.startsAt || dateFallback);
  const count = useInvitationPage('template12new-page', date.toISOString());
  const month = date.toLocaleString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();
  const schedule = content.schedule?.length ? content.schedule.slice(0, 3) : [];

  return (
    <main className="new-invitation-page t12n">
      <h1 className="visually-hidden">Thiệp cưới {content.couple.groomName} và {content.couple.brideName}</h1>
      <MusicButton className="t12n-music" />
      <section className="t12n-cover">
        <Reveal className="t12n-copy"><small>LOVE IS A LITTLE PARTY</small><h2>{content.couple.brideName}<i>&amp;</i>{content.couple.groomName}</h2><span>{date.toLocaleDateString('vi-VN',{day:'2-digit',month:'2-digit',year:'numeric'})}</span></Reveal>
        <Reveal as="img" className="t12n-coverImage" src={`${asset}/image-1.webp`} alt={`${content.couple.brideName} và ${content.couple.groomName} trong ngày cưới`} direction="scale" />
        <Sparkles className="t12n-sparkle" aria-hidden="true" />
      </section>

      <section className="t12n-paperInvite">
        <Reveal className="t12n-inviteLabel"><span>01</span><small>THIỆP MỜI THÀNH HÔN</small></Reveal>
        <Reveal className="t12n-intro"><Heart fill="currentColor" /><h2>Ngày vui<br />của chúng mình</h2><p>{content.copy.intro}</p></Reveal>
        <div className="t12n-families">
          <Reveal><small>GIA ĐÌNH NHÀ TRAI</small><b>{content.families.groomFather}</b><b>{content.families.groomMother}</b><span>{content.families.groomAddress}</span></Reveal>
          <i aria-hidden="true">♡</i>
          <Reveal><small>GIA ĐÌNH NHÀ GÁI</small><b>{content.families.brideFather}</b><b>{content.families.brideMother}</b><span>{content.families.brideAddress}</span></Reveal>
        </div>
        <Reveal className="t12n-posterPortrait" direction="right"><img src={`${asset}/image-2.webp`} alt="Chân dung cô dâu trong bộ ảnh cưới" /><small>THE BRIDE · THE GROOM</small></Reveal>
      </section>

      <section className="t12n-story">
        <Reveal className="t12n-storyTitle"><small>02 · OUR STORY</small><h2>Hai trái tim<br />cùng một nhịp.</h2></Reveal>
        <Reveal as="p">{content.copy.story}</Reveal>
        <div className="t12n-stickers"><Reveal as="img" src={`${asset}/image-3.webp`} alt="Khoảnh khắc cô dâu chú rể" direction="left" /><Reveal as="img" src={`${asset}/image-4.webp`} alt="Kỷ niệm ngày cưới" direction="right" /></div>
        <Reveal className="t12n-storyPhoto"><img src={`${asset}/image-5.webp`} alt="Ảnh cưới của hai người" /><span>YOU + ME<br />FOREVER</span></Reveal>
      </section>

      <section className="t12n-event">
        <Reveal className="t12n-eventHeading"><CalendarDays /><small>03 · SAVE THE DATE</small><h2>Ngày thành hôn</h2></Reveal>
        <Reveal className="t12n-date"><span>{date.toLocaleDateString('vi-VN',{weekday:'long'}).toUpperCase()}</span><strong>{String(date.getDate()).padStart(2,'0')}</strong><span>{month}</span></Reveal>
        <Reveal className="t12n-venue"><h3>{content.event.venueName}</h3><p>{content.event.address}</p><VenueLink query={content.event.address}><MapPin size={15}/> Mở bản đồ</VenueLink></Reveal>
        <WeddingCalendar month={month} weddingDay={date.getDate()} date={content.event.startsAt || dateFallback} />
        <Reveal className="t12n-timeline"><small>TRÌNH TỰ NGÀY VUI</small>{schedule.map((item,index)=><div key={`${item.time}-${item.label}`}><time>{item.time}</time><span>{item.label}</span><i>{`0${index+1}`}</i></div>)}</Reveal>
        <Reveal className="t12n-dresscode"><small>MỘT GỢI Ý NHỎ</small><h3>Dress code</h3><p>Đỏ son, hồng phấn hoặc vàng bơ — như những mảng màu trên tấm poster ngày vui.</p><div aria-label="Bảng màu gợi ý"><i/><i/><i/></div></Reveal>
        <Countdown values={count} className="t12n-countdown" />
      </section>

      <section className="t12n-gallery"><Reveal><small>04 · MOMENTS TO KEEP</small><h2>Album ngày vui</h2></Reveal><Reveal as="img" src={`${asset}/image-6.webp`} alt="Ảnh cưới kỷ niệm" /><div><Reveal as="img" src={`${asset}/image-7.webp`} alt="Cặp đôi trong ngày cưới" /><Reveal as="img" src={`${asset}/image-8.webp`} alt="Trang trí album cưới" /></div></section>

      <section className="t12n-ending"><RsvpForm className="t12n-rsvp" accent="#b9222c" /><Reveal className="t12n-wishes"><small>GỬI MỘT LỜI THƯƠNG</small><WishForm className="t12n-wish" accent="#b9222c" /></Reveal><GiftNote className="t12n-gift" /><Reveal as="h2">Thank you<br />for celebrating with us.</Reveal></section>
    </main>
  );
}
