import React from 'react';
import { Heart, Phone } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template10New.css';
import './auditFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-10';

export default function Template10New() {
  const count = useInvitationPage('template10new-page', '2027-05-21T13:00:00+07:00');
  return <main className="new-invitation-page t10n">
    <MusicButton className="t10n-music" />
    <section className="t10n-hero"><Reveal className="t10n-heading"><span>THE</span><h1>Wedding<br />Invitation</h1><p>LISA <i>&amp;</i> MONA</p></Reveal><Reveal as="img" src={`${a}/image-1.webp`} alt="Lisa và Mona" direction="up" /><Reveal className="t10n-stamp" direction="scale">21<br /><small>MAY</small></Reveal></section>
    <section className="t10n-vow"><Reveal as="p">“Dù núi cao, nước sâu muôn trùng,<br />cũng không bằng một ánh nhìn của em.”</Reveal><Heart fill="currentColor" /></section>
    <section className="t10n-welcome"><Reveal as="img" src={`${a}/image-1.webp`} alt="Chào mừng đến ngày cưới Lisa và Mona" direction="scale"/><Reveal as="h2">welcome to our wedding</Reveal><Reveal as="img" className="t10n-familyArt" src={`${a}/image-2.webp`} alt="Gia đình chúc mừng ngày cưới" direction="up"/><Reveal as="p">Nơi bình yên bên em đều rạng rỡ. Dù trời nắng, trời mưa hay trời dịu êm, chỉ cần có em, mọi thứ đều trở nên đẹp đẽ.</Reveal></section>
    <section className="t10n-portraits"><Reveal><img src={`${a}/image-5.webp`} alt="Chân dung Mona" /><h2>Mona</h2><a href="tel:0900000001"><Phone /> Liên hệ</a></Reveal><Reveal><img src={`${a}/image-6.webp`} alt="Chân dung Lisa" /><h2>Lisa</h2><a href="tel:0900000002"><Phone /> Liên hệ</a></Reveal></section>
    <section className="t10n-story"><Reveal as="small">OUR STORY</Reveal><Reveal as="h2">We grow together</Reveal><Reveal as="p">Ta cùng trưởng thành qua năm tháng, sẻ chia niềm vui và cả những nỗi buồn. Điều đẹp nhất là mỗi ngày đều nhìn thấy phiên bản tốt hơn của nhau.</Reveal><Reveal as="img" src={`${a}/image-4.webp`} alt="Câu chuyện tình yêu của Lisa và Mona" /></section>
    <section className="t10n-daylight"><Reveal as="img" src={`${a}/image-1.webp`} alt="Lisa và Mona trong ánh sáng ban mai" direction="right"/><Reveal as="small">ANOTHER DAY SUN</Reveal><Reveal as="img" src={`${a}/image-4.webp`} alt="Album cưới tối giản" direction="left"/><Reveal as="p">“Giữa đám đông, em khẽ mỉm cười với anh. Vì nụ cười ấy, anh đã chờ đợi từ lâu.”</Reveal><Reveal className="t10n-archPhoto" direction="scale"><img src={`${a}/image-4.webp`} alt="Chân dung Lisa và Mona"/></Reveal></section>
    <section className="t10n-event"><div><Reveal><small>WEDDING DAY</small><strong>21</strong><span>MAY · 2027</span></Reveal><Reveal><p>13:00 · THỨ SÁU<br />CINELOVE GARDEN, HÀ NỘI</p><VenueLink query="Cinelove Garden Hanoi">Dẫn đường</VenueLink></Reveal></div><WeddingCalendar month="MAY 2027" weddingDay={21} offset={5} /><Countdown values={count} className="t10n-count" /></section>
    <section className="t10n-end"><Reveal as="img" src={`${a}/image-5.webp`} alt="Ảnh cưới tối giản" /><RsvpForm accent="#1b1b1b" className="t10n-rsvp" /><GiftNote className="t10n-gift" title="With love" /></section>
  </main>;
}
