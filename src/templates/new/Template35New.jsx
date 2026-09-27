import React from 'react';
import { CalendarDays, Heart, Flower2 } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, WishForm, useInvitationPage } from './NewInvitationCommon.jsx';
import { useInvitationContent } from '../../commerce/CommercialInvitationContext.jsx';
import './template35New.css';

const asset = '/assets/new-templates/thiep-cuoi-35';
const fallbackDate = '2027-11-27T10:30:00+07:00';

export default function Template35New() {
  const content = useInvitationContent({
    couple: { groomName: 'Mạnh Tùng', brideName: 'Ngọc Linh' },
    event: { startsAt: fallbackDate, venueName: 'Nhà hàng tiệc cưới', address: 'Hà Nội' },
  });
  const dateValue = content.event.startsAt || fallbackDate;
  const date = new Date(dateValue);
  const month = date.toLocaleString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();
  const dateLabel = date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const count = useInvitationPage('template35new-page', dateValue);
  const schedule = content.schedule?.length ? content.schedule.slice(0, 3) : [
    { time: '10:00', label: 'Đón tiếp khách mời' },
    { time: '10:30', label: 'Lễ thành hôn' },
    { time: '11:30', label: 'Khai tiệc' },
  ];

  return (
    <main className="new-invitation-page t35n">
      <MusicButton className="t35n-music" />
      <section className="t35n-cover">
        <header><span>WEDDING INVITATION</span><span>NO. 11 — 27</span></header>
        <Reveal className="t35n-seal" direction="scale"><span>囍</span><small>WITH LOVE</small></Reveal>
        <Reveal className="t35n-names"><small>THE WEDDING OF</small><h1><span>{content.couple.groomName}</span><i>&amp;</i><span>{content.couple.brideName}</span></h1><p>{dateLabel}</p></Reveal>
        <Reveal as="img" className="t35n-coverImage" src={`${asset}/image-1.webp`} alt={`${content.couple.groomName} và ${content.couple.brideName}`} direction="scale" />
        <div className="t35n-coverFoot"><span>ONE DAY<br />ONE PROMISE</span><span>HÀ NỘI · VIỆT NAM</span></div>
      </section>

      <section className="t35n-announce">
        <Reveal className="t35n-kicker"><Flower2 /><span>TRÂN TRỌNG BÁO TIN</span></Reveal>
        <Reveal><h2>Chúng mình<br />sắp về chung một nhà</h2><p>{content.copy.intro || 'Ngày vui của chúng mình sẽ trọn vẹn hơn khi có bạn cùng hiện diện và sẻ chia.'}</p></Reveal>
        <Reveal className="t35n-couplePhoto" as="img" src={`${asset}/image-5.webp`} alt="Chân dung cô dâu chú rể" direction="right" />
      </section>

      <section className="t35n-families">
        <Reveal className="t35n-familyHeading"><small>THE FAMILIES</small><h2>Hai gia đình<br />trân trọng kính mời</h2></Reveal>
        <div className="t35n-familyGrid">
          <Reveal><small>NHÀ TRAI</small><b>{content.families.groomFather}</b><b>{content.families.groomMother}</b><p>{content.families.groomAddress}</p></Reveal>
          <Heart aria-hidden="true" />
          <Reveal><small>NHÀ GÁI</small><b>{content.families.brideFather}</b><b>{content.families.brideMother}</b><p>{content.families.brideAddress}</p></Reveal>
        </div>
        <Reveal className="t35n-dateCard"><small>HÂN HOAN ĐÓN TIẾP BẠN</small><strong>{String(date.getDate()).padStart(2, '0')}</strong><span>{month}</span><p>{date.toLocaleDateString('vi-VN', { weekday: 'long' })}</p></Reveal>
      </section>

      <section className="t35n-story">
        <Reveal className="t35n-storyTitle"><small>OUR STORY · 01</small><h2>Một lời hẹn<br />thành trăm năm</h2><p>{content.copy.story}</p></Reveal>
        <Reveal as="img" src={`${asset}/image-2.webp`} alt="Một khoảnh khắc trong câu chuyện tình yêu" direction="left" />
        <div className="t35n-storyPair"><Reveal as="img" src={`${asset}/image-3.webp`} alt="Cô dâu chú rể bên nhau" direction="right" /><Reveal as="img" src={`${asset}/image-4.webp`} alt="Ảnh kỷ niệm trong album cưới" direction="left" /></div>
        <Reveal className="t35n-quote"><span>“</span><p>{content.copy.quote || 'Từ hôm nay, chúng mình sẽ cùng nhau viết tiếp những ngày bình yên.'}</p><small>— MẠNH TÙNG &amp; NGỌC LINH —</small></Reveal>
      </section>

      <section className="t35n-event">
        <Reveal className="t35n-eventTitle"><CalendarDays /><small>THE WEDDING DAY</small><h2>Hẹn gặp bạn<br />trong ngày vui</h2></Reveal>
        <Reveal className="t35n-venue"><small>THỜI GIAN &amp; ĐỊA ĐIỂM</small><h3>{content.event.venueName}</h3><p>{date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} · {dateLabel}</p><p>{content.event.address}</p><VenueLink query={content.event.address}>Xem đường đi</VenueLink></Reveal>
        <WeddingCalendar month={month} date={dateValue} weddingDay={date.getDate()} />
        <Reveal className="t35n-schedule"><small>CHƯƠNG TRÌNH</small>{schedule.map((item) => <div key={`${item.time}-${item.label}`}><time>{item.time}</time><span>{item.label}</span></div>)}</Reveal>
      </section>

      <section className="t35n-lastPhoto"><Reveal as="img" src={`${asset}/image-6.webp`} alt="Ngày hạnh phúc của đôi mình" direction="scale" /><Reveal><small>TOGETHER, FROM THIS DAY</small><h2>Điều đẹp nhất<br />là có bạn bên cạnh</h2></Reveal></section>
      <section className="t35n-end"><Countdown values={count} className="t35n-count" /><RsvpForm className="t35n-rsvp" accent="#b72634" /><Reveal className="t35n-wishes"><small>LEAVE US A NOTE</small><WishForm className="t35n-wish" accent="#b72634" /></Reveal><GiftNote className="t35n-gift" title="Một lời chúc thân thương" /><Reveal as="p" className="t35n-thanks">MẠNH TÙNG <i>♥</i> NGỌC LINH</Reveal></section>
    </main>
  );
}
