import React, { useState } from 'react';
import { Heart, MailOpen } from 'lucide-react';
import { Countdown, FallingDecor, GiftNote, MusicButton, Reveal, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template63New.css';
import './auditFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-63';

export default function Template63New() {
  const [open, setOpen] = useState(false);
  const count = useInvitationPage('template63new-page', '2027-05-22T08:00:00+07:00');
  return <main className={`new-invitation-page t63n ${open ? 'is-open' : ''}`}>
    <MusicButton className="t63n-music" />
    <section className="t63n-cover"><FallingDecor symbols={['囍', '·', '囍']} count={13} /><div className="t63n-coverCard"><img className="t63n-coverPhoenixTop" src={`${a}/phoenix-top.webp`} alt="" /><img className="t63n-coverPhoenixSide" src={`${a}/phoenix-side.webp`} alt="" /><img className="t63n-coverSeal" src={`${a}/happiness.webp`} alt="Hỷ" /><h1>Duy Nghĩa<br /><i>&amp;</i><br />Minh Anh</h1><p>22 / 05 / 2027</p><small>Kính mời<br /><b>Bạn &amp; người thương</b><br />đến dự buổi tiệc chung vui cùng gia đình</small><button type="button" onClick={() => setOpen(true)}><MailOpen /> Mở thiệp</button></div></section>
    <section className="t63n-hero"><img className="t63n-phoenixLeft" src={`${a}/phoenix-side.webp`} alt="" /><img className="t63n-phoenixRight" src={`${a}/phoenix-side.webp`} alt="" /><Reveal direction="down"><small>NGÀY CHUNG ĐÔI</small><b>22 · 05 · 2027</b><h2>Duy Nghĩa <i>&amp;</i> Minh Anh</h2></Reveal><Countdown values={count} className="t63n-heroCount" /></section>
    <section className="t63n-family"><Reveal direction="right"><small>NHÀ TRAI</small><h3>Ông Nguyễn Văn Thắng<br />Bà Trịnh Thị Viên</h3><p>Tân Mỹ, Tiên Phong, Bắc Ninh</p></Reveal><Reveal direction="left"><small>NHÀ GÁI</small><h3>Ông Nguyễn Tuấn Trung<br />Bà Nguyễn Thị May</h3><p>Phú Cát, Quốc Oai, Hà Nội</p></Reveal></section>
    <section className="t63n-invite"><Reveal><small>THƯ MỜI</small><h2>Tham dự lễ thành hôn của chúng mình</h2></Reveal><div><Reveal as="img" src={`${a}/image-2.webp`} alt="Duy Nghĩa và Minh Anh" direction="right" /><Reveal as="img" src={`${a}/image-3.webp`} alt="Lễ thành hôn" /><Reveal as="img" src={`${a}/image-4.webp`} alt="Khoảnh khắc ngày cưới" direction="left" /></div><Reveal className="t63n-inviteDate"><span>THÁNG 05<br />Thứ Bảy</span><b>22</b><span>NĂM 2027<br />08 giờ 00</span></Reveal></section>
    <section className="t63n-ceremonies"><Reveal><small>LỄ VU QUY</small><h2>21 · 05 · 2027</h2><p>16:30 · Tư gia nhà gái</p><VenueLink query="Hoan Kiem Hanoi">Chỉ đường</VenueLink></Reveal><Reveal><small>LỄ THÀNH HÔN</small><h2>22 · 05 · 2027</h2><p>08:00 · Tư gia nhà trai</p><VenueLink query="Ba Dinh Hanoi">Chỉ đường</VenueLink></Reveal></section>
    <section className="t63n-quote"><Reveal as="p">Hôn nhân là chuyện cả đời.<br />Chúng mình chọn cùng nhau viết tiếp mọi mùa.</Reveal><Heart fill="currentColor" /></section>
    <section className="t63n-day"><Reveal><small>WEDDING DAY</small><h2>Tháng Năm</h2></Reveal><WeddingCalendar month="MAY · 2027" weddingDay={22} offset={5} /><Countdown values={count} className="t63n-count" /></section>
    <section className="t63n-album"><Reveal as="img" src={`${a}/image-1.webp`} alt="Album cưới xanh vàng" /><div><Reveal as="img" src={`${a}/image-3.webp`} alt="Duy Nghĩa và Minh Anh" direction="right" /><Reveal as="img" src={`${a}/image-4.webp`} alt="Khoảnh khắc tình yêu" direction="left" /></div></section>
    <section className="t63n-end"><Reveal className="t63n-guestbook" direction="scale"><MailOpen /><h2>Sổ lưu bút</h2><p>Gửi lời chúc đến Duy Nghĩa &amp; Minh Anh</p></Reveal><GiftNote className="t63n-gift" /><Reveal as="h2">Hộp quà mừng</Reveal></section>
    <section className="t63n-final"><Reveal as="img" src={`${a}/image-1.webp`} alt="Duy Nghĩa và Minh Anh" direction="scale" /><Reveal as="p">Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình chúng mình.</Reveal></section>
  </main>;
}
