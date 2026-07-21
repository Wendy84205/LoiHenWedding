import React from 'react';
import { Heart, Trees } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template34New.css';
import './auditFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-34';

export default function Template34New() {
  const count = useInvitationPage('template34new-page', '2027-12-28T16:00:00+07:00');
  return <main className="new-invitation-page t34n">
    <MusicButton className="t34n-music" />
    <section className="t34n-hero"><img src={`${a}/image-1.webp`} alt="Đám cưới trong rừng" /><Reveal className="t34n-title" direction="scale"><small>WE'RE MARRIED</small><h1>Minh Quân <i>&amp;</i> Mai Anh</h1><p>28.12.2027</p></Reveal></section>
    <section className="t34n-card"><Reveal><Trees /><small>WELCOME TO OUR WEDDING</small><h2>Về chung một nhà</h2><p>Mong rằng trong khoảnh khắc rực rỡ nhất của đời mình sẽ có bạn. Chúng mình đã chọn mùa đông này để mở ra một bữa tiệc ngập tràn niềm vui.</p></Reveal></section>
    <section className="t34n-storyBook"><Reveal as="img" src={`${a}/image-2.webp`} alt="Minh Quân và Mai Anh giữa khu vườn" direction="scale"/><Reveal as="p">Khi nhận được bộ ảnh cưới, chúng mình như đang đứng giữa niềm hạnh phúc và muốn gửi trọn niềm hạnh phúc này đến tất cả các bạn.</Reveal><Reveal as="img" src={`${a}/image-3.webp`} alt="Chuyện tình trong khu vườn" direction="right"/><Reveal as="p">Người ta thường nói tình yêu không chỉ là phút giây say đắm. Tình yêu còn là lựa chọn ở lại, sẻ chia và trưởng thành cùng nhau.</Reveal><div><Reveal as="img" src={`${a}/image-5.webp`} alt="Khoảnh khắc đời thường của cặp đôi" direction="right"/><Reveal as="img" src={`${a}/image-6.webp`} alt="Minh Quân và Mai Anh mỉm cười" direction="left"/></div></section>
    <section className="t34n-film"><Reveal as="img" src={`${a}/image-2.webp`} alt="Cặp đôi trong rừng" direction="right" /><Reveal as="img" src={`${a}/image-3.webp`} alt="Ảnh cưới phong cách điện ảnh" direction="left" /><Reveal as="p">FOREST · LOVE · FOREVER</Reveal></section>
    <section className="t34n-promise"><Reveal as="img" src={`${a}/image-5.webp`} alt="Lời hứa bên nhau" direction="right"/><Reveal><small>NOW AND FOREVER</small><h2>Bây giờ, chúng mình cuối cùng cũng trở thành người bạn đời</h2><p>Minh muốn cùng người mình yêu làm thật nhiều điều ý nghĩa, cùng ăn lâu nửa đêm, cùng hát karaoke và cùng nhìn tay nghề của nhau ngày càng khéo.</p></Reveal><Reveal as="img" src={`${a}/image-6.webp`} alt="Ngày vui Minh Quân và Mai Anh" direction="left"/></section>
    <section className="t34n-invite"><Reveal><small>TRÂN TRỌNG KÍNH MỜI</small><h2>Bạn và người thương</h2><p>16:00 · Thứ Ba, 28.12.2027<br />Pine Hill Wedding Garden, Ba Vì</p><VenueLink query="Ba Vi Hanoi">Xem đường đi</VenueLink></Reveal><Countdown values={count} className="t34n-count" /></section>
    <section className="t34n-calendar"><WeddingCalendar month="DECEMBER · 2027" weddingDay={28} offset={2} /><Reveal as="img" src={`${a}/image-4.webp`} alt="Khoảnh khắc ngày cưới trong rừng" /></section>
    <section className="t34n-end"><RsvpForm accent="#38523f" className="t34n-rsvp" /><GiftNote className="t34n-gift" /><Reveal as="h2"><Heart fill="currentColor" /> Thank you</Reveal></section>
  </main>;
}
