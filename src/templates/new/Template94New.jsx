import React from 'react';
import { Heart, Quote } from 'lucide-react';
import { Countdown, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template94New.css';
import './auditFidelity.css';
import './fontFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-94';

export default function Template94New() {
  const count = useInvitationPage('template94new-page', '2027-11-30T12:00:00+07:00');
  return <main className="new-invitation-page t94n">
    <MusicButton className="t94n-music" />
    <section className="t94n-hero"><img src={`${a}/image-4.webp`} alt="Minh Quân và Diễm My trong lễ cưới" /><Reveal className="t94n-title"><span>INVITATION</span><small>LỜI MỜI ĐÁM CƯỚI</small><h1>Minh Quân <i>&amp;</i> Diễm My</h1><p>30 NOVEMBER 2027</p></Reveal></section>
    <section className="t94n-manifesto"><Quote /><Reveal as="h2">Về cái ngày chúng ta trở thành chính mình, về anh và em.</Reveal><Reveal as="p">Tôi có rất nhiều ước muốn, nhưng được ở bên bạn là ước muốn mà tôi sẽ không bao giờ từ bỏ.</Reveal></section>
    <section className="t94n-editorial"><Reveal as="img" src={`${a}/image-2.webp`} alt="Ảnh cưới phong cách báo chí" direction="right" /><Reveal><small>LOVE / LIFE</small><h2>Hoàng hôn luôn dịu dàng</h2><p>Cuộc sống luôn lãng mạn, vì vậy mỗi ngày bên bạn đều tỏa sáng.</p></Reveal><Reveal as="img" src={`${a}/image-3.webp`} alt="Khoảnh khắc đen trắng" direction="left" /></section>
    <section className="t94n-chapel"><Reveal as="p">Những bông hoa đang kết trái, gió lay động lá cây. Chúng ta đứng đây, im lặng, và khung cảnh thật hoàn hảo.</Reveal><div><Reveal as="img" src={`${a}/image-4.webp`} alt="Cô dâu trong nhà nguyện" direction="right" /><Reveal as="img" src={`${a}/image-5.webp`} alt="Khoảnh khắc lễ cưới" direction="left" /><Reveal as="img" src={`${a}/image-6.webp`} alt="Lời hẹn ước trọn đời" direction="up" /></div><Reveal as="h2">Love</Reveal></section>
    <section className="t94n-weddingWords"><Reveal as="img" src={`${a}/image-3.webp`} alt="Minh Quân và Diễm My trong ngày cưới" direction="scale" /><Reveal><small>WEDDING</small><p>Tôi có rất nhiều ước muốn, nhưng được ở bên bạn là ước muốn mà tôi sẽ không bao giờ từ bỏ cho đến hết cuộc đời.</p></Reveal><div><Reveal as="img" src={`${a}/image-2.webp`} alt="Chú rể bên khung cửa" direction="right" /><Reveal as="img" src={`${a}/image-4.webp`} alt="Cô dâu chờ ngày thành hôn" direction="left" /></div></section>
    <section className="t94n-events"><Reveal><small>LỄ VU QUY</small><h2>30.11.2027</h2><p>12:00 · Tư gia nhà gái</p></Reveal><Reveal><small>LỄ THÀNH HÔN</small><h2>30.11.2027</h2><p>12:00 · Tư gia nhà trai</p></Reveal><VenueLink query="Hanoi">Xem chỉ đường</VenueLink></section>
    <section className="t94n-address"><Reveal as="h2">ADDRESS <small>ĐỊA CHỈ</small></Reveal><Reveal><h3>TẠI TƯ GIA NHÀ TRAI</h3><iframe title="Bản đồ tư gia nhà trai" loading="lazy" src="https://www.google.com/maps?q=Hoan+Kiem+Hanoi&output=embed" /></Reveal><Reveal><h3>TẠI TƯ GIA NHÀ GÁI</h3><iframe title="Bản đồ tư gia nhà gái" loading="lazy" src="https://www.google.com/maps?q=Ba+Dinh+Hanoi&output=embed" /></Reveal></section>
    <section className="t94n-day"><WeddingCalendar month="NOVEMBER 2027" weddingDay={30} offset={6} /><Countdown values={count} className="t94n-count" /></section>
    <section className="t94n-end"><Reveal as="p">Nếu có thời gian, hãy mang theo tâm trạng vui vẻ và đến dự đám cưới của chúng tôi nhé. Hẹn gặp bạn tại ngày vui!</Reveal><Reveal as="img" className="t94n-finalPhoto" src={`${a}/image-6.webp`} alt="Minh Quân và Diễm My trong ngày cưới" direction="scale" /><RsvpForm accent="#252525" className="t94n-rsvp" /><h2><Heart fill="currentColor" /> Thank you</h2></section>
  </main>;
}
