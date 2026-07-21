import React from 'react';
import { Disc3, Heart, Play } from 'lucide-react';
import { Countdown, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template20New.css';
import './auditFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-20';

export default function Template20New() {
  const count = useInvitationPage('template20new-page', '2027-08-20T11:00:00+07:00');
  return <main className="new-invitation-page t20n">
    <MusicButton className="t20n-music" />
    <section className="t20n-hero"><Reveal className="t20n-heading"><small>INVITATION</small><h1>Tiến Đạt <i>&amp;</i> Ngọc Hân</h1><p>Thiệp mời đám cưới</p><b>20 / 08 / 2027</b><span>Chúng mình cưới rồi!</span></Reveal></section>
    <section className="t20n-player"><img src={`${a}/image-1.webp`} alt="Tiến Đạt và Ngọc Hân" /><Disc3 /><div><small>NOW PLAYING</small><b>Lucky Me</b><span>Jake Miller</span></div><button type="button" aria-label="Phát nhạc"><Play fill="currentColor" /></button></section>
    <section className="t20n-letter"><Reveal><h2>Chúng mình cưới rồi!</h2><p>Bạn từng nói người tuyệt vời nhất rồi sẽ đến. Khi nhận được tấm thiệp này, chúng mình đang đếm từng ngày và mong được gặp bạn.</p><Heart fill="currentColor" /></Reveal></section>
    <section className="t20n-scrap"><Reveal as="img" src={`${a}/image-2.webp`} alt="Ảnh cưới dạng polaroid" direction="right" rotate={3} /><Reveal as="img" src={`${a}/image-3.webp`} alt="Kỷ niệm của cặp đôi" direction="left" rotate={-3} /><Reveal className="t20n-tape">LOVE IS<br />EVERYWHERE</Reveal><Reveal as="img" src={`${a}/image-4.webp`} alt="Khoảnh khắc vui của cặp đôi" direction="up" rotate={2} /></section>
    <section className="t20n-seasons"><Reveal className="t20n-seasonCopy" direction="right"><small>LOVE YOU</small><h2>Chốn nhân gian lãng mạn</h2><p>Chiều tà và hoa hồng cùng vẽ nên điều dịu dàng nhất. Chờ ngày tường vi nở rộ, nhân gian dịu dàng cũng hóa thành thơ.</p></Reveal><Reveal as="img" src={`${a}/image-4.webp`} alt="Câu chuyện tình yêu mùa hạ" direction="left" /><Reveal as="img" src={`${a}/image-5.webp`} alt="Tiến Đạt và Ngọc Hân bên nhau" direction="right" /><Reveal className="t20n-seasonQuote" direction="left"><h2>You are the love of my life.</h2><p>Xuân qua hạ tới, thu gặt đông cất, chúng mình còn cả một đời dài phía trước.</p></Reveal></section>
    <section className="t20n-forever"><Reveal as="img" src={`${a}/image-6.webp`} alt="Album cưới Tiến Đạt và Ngọc Hân" direction="scale" /><Reveal><small>I WILL LOVE YOU FOREVER</small><h2>Gió chiều hoàng hôn, sớm tối có nhau</h2><p>Khi sương mù tan biến, tình yêu của anh dành cho em sẽ được mọi người biết đến.</p></Reveal><div><Reveal as="img" src={`${a}/image-3.webp`} alt="Khoảnh khắc ngày cưới" direction="right" /><Reveal as="img" src={`${a}/image-2.webp`} alt="Kỷ niệm hạnh phúc" direction="left" /></div></section>
    <section className="t20n-invite"><Reveal><small>WEDDING INVITATION</small><h2>Trân trọng kính mời</h2><p>11:00 · Thứ Sáu · 20.08.2027<br />52 Miếu Đầm, Mễ Trì, Nam Từ Liêm, Hà Nội</p><VenueLink query="52 Mieu Dam Me Tri Ha Noi">Mở bản đồ</VenueLink></Reveal><WeddingCalendar month="AUGUST 2027" weddingDay={20} offset={6} /><Reveal><iframe className="t20n-map" title="Bản đồ địa điểm tổ chức" loading="lazy" src="https://www.google.com/maps?q=52+Mieu+Dam+Me+Tri+Ha+Noi&output=embed" /></Reveal><Countdown values={count} className="t20n-count" /></section>
    <section className="t20n-end"><Reveal as="img" src={`${a}/image-5.webp`} alt="Album ngày cưới" /><RsvpForm accent="#c77474" className="t20n-rsvp" /><Reveal as="h2">Thank you, dear friend!</Reveal></section>
  </main>;
}
