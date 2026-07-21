import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { Countdown, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template15New.css';
import './auditFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-15';

export default function Template15New() {
  const count = useInvitationPage('template15new-page', '2027-08-20T12:00:00+07:00');
  return <main className="new-invitation-page t15n">
    <MusicButton className="t15n-music" />
    <section className="t15n-hero"><Reveal className="t15n-top" direction="down"><small>LOVE AND FREEDOM, YOU AND GENTLENESS</small><h1>Hẹn nhau ở đám cưới</h1><b>20/08/2027</b></Reveal><Reveal as="img" src={`${a}/image-2.webp`} alt="Đức Duy và Trà My" direction="scale" /><Reveal className="t15n-names"><small>LOVE · YOU · FOREVER</small><h2>Đức Duy <i>&amp;</i> Trà My</h2></Reveal></section>
    <section className="t15n-marquee"><span>OUR SWEET DAY · OUR SWEET DAY · OUR SWEET DAY</span></section>
    <section className="t15n-note"><Reveal><Sparkles /><h2>Khi bạn nhận được tấm thiệp này</h2><p>Chúng mình đã bắt đầu đếm ngược từng ngày, mong chờ được gặp bạn trong khoảnh khắc ý nghĩa ấy.</p></Reveal></section>
    <section className="t15n-invite"><Reveal as="img" src={`${a}/image-3.webp`} alt="Ảnh cưới phong cách editorial" direction="right" /><Reveal className="t15n-card" direction="left"><small>TRÂN TRỌNG KÍNH MỜI</small><h2>Bạn &amp; người thương</h2><p>Thứ Sáu · 12:00<br /><b>20 THÁNG 08 NĂM 2027</b></p><p>Khách sạn Vạn Phúc<br />Mễ Trì, Nam Từ Liêm, Hà Nội</p><VenueLink query="Me Tri Nam Tu Liem Ha Noi">Xem chỉ đường</VenueLink></Reveal></section>
    <section className="t15n-day"><WeddingCalendar month="AUGUST · 2027" weddingDay={20} offset={6} /><Countdown values={count} className="t15n-count" /></section>
    <section className="t15n-poem"><Reveal as="h2">It&apos;s romantic to meet you</Reveal><Reveal as="p">Cho ngày bình dị thêm thơ, tình yêu nhẹ bước đến bờ bình yên. Ánh nhìn ta gặp đầu tiên, lưu trong ký ức dịu êm ngọt ngào. Từ nay ta sẽ bên nhau, gom từng khoảnh khắc nhiệm màu bình yên.</Reveal></section>
    <section className="t15n-film"><Reveal as="img" src={`${a}/image-8.webp`} alt="Khoảnh khắc cưới đỏ trắng" /><div><Reveal as="img" src={`${a}/image-9.webp`} alt="Album Đức Duy và Trà My" direction="right" /><Reveal as="img" src={`${a}/image-6.webp`} alt="Album ngày vui" direction="left" /></div></section>
    <section className="t15n-end"><Heart fill="currentColor" /><RsvpForm accent="#b7182b" className="t15n-rsvp" /><Reveal as="h2">See you soon</Reveal></section>
  </main>;
}
