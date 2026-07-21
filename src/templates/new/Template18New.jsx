import React from 'react';
import { Heart, Quote } from 'lucide-react';
import { Countdown, FallingDecor, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template18New.css';
import './auditFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-18';

export default function Template18New() {
  const count = useInvitationPage('template18new-page', '2027-08-20T12:00:00+07:00');
  return <main className="new-invitation-page t18n">
    <MusicButton className="t18n-music" />
    <section className="t18n-hero"><FallingDecor className="t18n-confetti" symbols={['·', '✦', '·']} count={18} /><Reveal className="t18n-heading" direction="down"><h1>Wedding Invitation</h1><p><b>Mai Anh</b><i>囍</i><b>Duy Khanh</b></p></Reveal><div className="t18n-heroPanels"><Reveal as="figure" direction="right"><img src={`${a}/image-2.webp`} alt="Cô dâu Mai Anh" /><figcaption><small>Xin giới thiệu</small><strong>Bà xã của Tôi</strong></figcaption></Reveal><Reveal as="figure" direction="left"><img src={`${a}/image-1.webp`} alt="Chú rể Duy Khanh" /><figcaption><small>Xin giới thiệu</small><strong>Ông xã của Tôi</strong></figcaption></Reveal></div></section>
    <section className="t18n-hello"><Reveal direction="right"><h2>Hello!</h2><p>Đây là tấm thiệp với 100% độ ngọt ngào. Trân trọng mời bạn đến chứng kiến khoảnh khắc hạnh phúc nhất của tụi mình.</p></Reveal><Reveal as="img" src={`${a}/image-2.webp`} alt="Khoảnh khắc ngọt ngào của cặp đôi" direction="left" /></section>
    <section className="t18n-couple"><Reveal><small>XIN GIỚI THIỆU</small><h2>Bà xã của tôi</h2><img src={`${a}/image-3.webp`} alt="Cô dâu Mai Anh" /><b>MAI ANH</b></Reveal><Reveal><small>XIN GIỚI THIỆU</small><h2>Ông xã của tôi</h2><img src={`${a}/image-4.webp`} alt="Chú rể Duy Khanh" /><b>DUY KHANH</b></Reveal></section>
    <section className="t18n-quote"><Quote /><Reveal as="p">Tình yêu không phải nhìn nhau, mà là cùng nhìn về một hướng và luôn chọn bước tiếp cạnh nhau.</Reveal></section>
    <section className="t18n-love"><Reveal className="t18n-loveTitle"><small>FALL IN LOVE</small><h2>I LOVE<br />YOU</h2><p>Vĩnh hằng không phải là một khoảng cách mà là một sự lựa chọn. Chúng ta lựa chọn cùng nhau sở hữu, trân trọng và gìn giữ.</p></Reveal><Reveal as="img" src={`${a}/image-5.webp`} alt="Khoảnh khắc ngọt ngào" direction="left" /><Reveal as="img" src={`${a}/image-6.webp`} alt="Mai Anh và Duy Khanh trong ngày cưới" direction="right" /><Reveal as="p" className="t18n-lovePoem">Thế gian rộng tựa mênh mông<br />Mà ta vẫn gặp giữa lòng trần gian<br />Tình yêu đến rất dịu dàng<br />Như mây với gió nhẹ nhàng ghé tim.</Reveal></section>
    <section className="t18n-albumEditorial"><Reveal as="h2">LOVE FOREVER</Reveal><Reveal className="t18n-albumLead" direction="right"><img src={`${a}/image-3.webp`} alt="Mai Anh trong ngày cưới" /><p>Tình yêu của chúng mình không cần quá ồn ào. Chỉ cần mỗi lần ngoảnh lại, người kia vẫn ở đó với nụ cười quen thuộc.</p></Reveal><Reveal className="t18n-albumPair"><img src={`${a}/image-5.webp`} alt="Khoảnh khắc bên nhau" /><img src={`${a}/image-6.webp`} alt="Ngày chung đôi" /></Reveal><Reveal as="p" className="t18n-albumQuote">Một đời một người<br /><b>Một lòng một dạ.</b></Reveal></section>
    <section className="t18n-date"><Reveal className="t18n-dateTitle"><small>WELCOME TO OUR WEDDING</small><strong>20</strong><span>THÁNG 08<br />NĂM 2027</span></Reveal><WeddingCalendar month="AUGUST" weddingDay={20} offset={6} /><Countdown values={count} className="t18n-count" /><VenueLink query="Nam Tu Liem Hanoi">52 Miếu Đầm, Nam Từ Liêm</VenueLink></section>
    <section className="t18n-end"><Reveal as="img" src={`${a}/image-3.webp`} alt="Ảnh cưới Mai Anh và Duy Khanh" /><RsvpForm accent="#9c1a15" className="t18n-rsvp" /><GiftNote className="t18n-gift" /><Reveal as="h2"><Heart fill="currentColor" /> Thank you</Reveal></section>
    <section className="t18n-final"><Reveal as="img" src={`${a}/image-6.webp`} alt="Mai Anh và Duy Khanh" direction="scale" /><Reveal><h2>Love you forever</h2><p>Hạnh phúc đón tiếp bạn trong ngày vui của chúng mình.</p></Reveal></section>
  </main>;
}
