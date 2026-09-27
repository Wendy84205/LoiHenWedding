import React, { useState } from 'react';
import { Heart, MailOpen, MapPin } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, WeddingCalendar, WishForm, useInvitationPage } from './NewInvitationCommon.jsx';
import { useInvitationContent } from '../../commerce/CommercialInvitationContext.jsx';
import './template41New.css';


const a = '/assets/new-templates/thiep-cuoi-41';
const defaultDate = '2027-11-25T12:00:00+07:00';

export default function Template41New() {
  const [opened, setOpened] = useState(false);
  const content = useInvitationContent({
    couple: { groomName: 'Nguyễn Dương', groomFullName: 'Nguyễn Dương', brideName: 'Khánh Thy', brideFullName: 'Khánh Thy' },
    families: { groomFather: 'Ông Nguyễn Văn An', groomMother: 'Bà Trương Thị Minh', groomAddress: 'Ba Đình, Hà Nội', brideFather: 'Ông Lê Văn Nam', brideMother: 'Bà Nguyễn Thị Lan', brideAddress: 'Hoàn Kiếm, Hà Nội' },
    event: { startsAt: defaultDate, venueName: 'Tư gia nhà trai', address: 'Ba Đình, Hà Nội', mapUrl: '', lunarDate: '' },
    copy: { intro: 'Đã lâu không gặp, hẹn nhau trong ngày cưới nhé!', story: 'Trong đời mỗi người sẽ luôn có một khoảnh khắc cần kiên định với lựa chọn của chính mình. Khoảnh khắc ấy chính là hiện tại, có bạn bên cạnh.', quote: 'Anh sẽ luôn yêu em. Mỗi ngày em có thể nói anh bao nhiêu lần cũng được.' },
    media: { hero: '', couple: '', bride: '', groom: '', giftQr: '' },
  });
  const names = content.couple;
  const families = content.families;
  const event = content.event;
  const media = content.media;
  const dateValue = event.startsAt || defaultDate;
  const date = new Date(dateValue);
  const validDate = Number.isFinite(date.getTime());
  const safeDate = validDate ? date : new Date(defaultDate);
  const monthName = safeDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();
  const dateLabel = safeDate.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }).replaceAll('/', ' · ');
  const timeLabel = safeDate.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  const weekdayLabel = safeDate.toLocaleDateString('vi-VN', { weekday: 'long' }).toUpperCase();
  const count = useInvitationPage('template41new-page', validDate ? dateValue : defaultDate);
  const mapUrl = event.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([event.venueName, event.address].filter(Boolean).join(', '))}`;
  const day = safeDate.getDate();

  return <main className={`new-invitation-page t41n ${opened ? 'is-open' : ''}`}>
    <h1 className="visually-hidden">Thiệp cưới {names.brideName} và {names.groomName}</h1>
    <MusicButton className="t41n-music" />
    <section className="t41n-opening">
      <Reveal as="h2" className="t41n-coverTitle">Wedding Invitation</Reveal>
      <div className="t41n-envelope">
        <div className="t41n-back" />
        <div className="t41n-photo"><img src={media.hero || media.couple || `${a}/image-1.webp`} alt={`Ảnh cưới ${names.brideName} và ${names.groomName}`} /></div>
        <div className="t41n-flap" /><div className="t41n-front" />
        <button type="button" onClick={() => setOpened(true)} aria-label="Mở thiệp"><MailOpen /> <span>Chạm để mở thiệp</span></button>
      </div>
    </section>
    <section className="t41n-hero"><Reveal><small>SAVE THE DATE</small><h2>{names.groomName} <i>&amp;</i> {names.brideName}</h2><p>{dateLabel} · {timeLabel}</p></Reveal><Reveal as="img" src={media.couple || media.hero || `${a}/image-2.webp`} alt={`Ảnh cưới ${names.groomName} và ${names.brideName}`} direction="scale" /></section>
    <section className="t41n-family"><Reveal><small>NHÀ TRAI</small><h2>{families.groomFather}<br />{families.groomMother}</h2><p>{families.groomAddress}</p></Reveal><Heart aria-hidden="true"/><Reveal><small>NHÀ GÁI</small><h2>{families.brideFather}<br />{families.brideMother}</h2><p>{families.brideAddress}</p></Reveal></section>
    <section className="t41n-forestDate"><img src={media.venue || `${a}/image-3.webp`} alt={`Không gian ngày cưới của ${names.brideName} và ${names.groomName}`} /><Reveal className="t41n-calendarOverlay" direction="scale"><WeddingCalendar month={monthName} date={dateValue} weddingDay={day} /></Reveal><Reveal as="p">{content.copy.intro}</Reveal></section>
    <section className="t41n-invite"><Reveal><small>TRÂN TRỌNG THÔNG BÁO</small><h2>Lễ thành hôn</h2><strong>{String(day).padStart(2, '0')}</strong><p>THÁNG {String(safeDate.getMonth() + 1).padStart(2, '0')} · NĂM {safeDate.getFullYear()}<br />{timeLabel} · {weekdayLabel}</p><a className="ni-map" href={mapUrl} target="_blank" rel="noreferrer"><MapPin size={16}/>{event.venueName} · Xem đường</a><p className="t41n-address">{event.address}</p>{event.lunarDate && <small>{event.lunarDate}</small>}</Reveal><WeddingCalendar month={monthName} date={dateValue} weddingDay={day} /><Countdown values={count} className="t41n-count" /></section>
    <section className="t41n-vowStory"><Reveal as="img" src={media.groom || `${a}/image-4.webp`} alt={`Chân dung ${names.groomName}`} direction="right"/><Reveal className="t41n-sideWords" direction="right"><h2>You are<br/>the best<br/>for me</h2><p>{content.copy.quote}</p></Reveal><Reveal as="p">{content.copy.story}</Reveal><Reveal as="img" src={media.bride || `${a}/image-5.webp`} alt={`Chân dung ${names.brideName}`} direction="left"/><Reveal as="img" src={`${a}/image-6.webp`} alt={`Khoảnh khắc của ${names.brideName} và ${names.groomName}`} direction="right"/></section>
    <section className="t41n-album"><Reveal as="img" src={`${a}/image-3.webp`} alt={`Album cưới của ${names.brideName} và ${names.groomName}`} direction="right" /><Reveal as="img" src={`${a}/image-4.webp`} alt={`Ảnh cưới ${names.brideName} và ${names.groomName}`} direction="left" /></section>
    <section className="t41n-end"><RsvpForm accent="#4e765e" className="t41n-rsvp" /><WishForm accent="#4e765e" className="t41n-wish" /><GiftNote className="t41n-gift">{content.copy.thankYou}</GiftNote><Reveal as="h2">Trân trọng kính mời</Reveal></section>
  </main>;
}
