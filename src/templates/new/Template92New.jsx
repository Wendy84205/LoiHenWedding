import React from 'react';
import { Heart, Train } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template92New.css';
import './auditFidelity.css';
import './fontFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-92';

export default function Template92New() {
  const count = useInvitationPage('template92new-page', '2027-11-28T16:15:00+07:00');

  return <main className="new-invitation-page t92n">
    <MusicButton className="t92n-music" />

    <section className="t92n-hero">
      <Reveal as="img" src={`${a}/image-5.webp`} alt="Hoàng Nam và Thanh Vy" direction="scale" />
      <Reveal className="t92n-title" direction="down">
        <small>WEDDING INVITATION</small>
        <h1>HOÀNG NAM <i>&amp;</i> THANH VY</h1>
      </Reveal>
      <Reveal className="t92n-heroInvite" direction="up">
        <b>TRÂN TRỌNG KÍNH MỜI</b>
        <span>Bạn cùng Người thương</span>
      </Reveal>
    </section>

    <section className="t92n-poem">
      <Train />
      <Reveal as="p">Muốn giữ lại tiếng còi tàu và tia chớp<br />Giữ cả bình minh lẫn hoàng hôn<br />Và giữ mãi khoảnh khắc ấy<br />Khi tim tôi lỡ nhịp vì người</Reveal>
    </section>

    <section className="t92n-storyLead">
      <Reveal as="p" direction="right"><em>You are the best thing<br />I never planned.</em><br /><span>Em là sự tình cờ tuyệt vời nhất trong cuộc đời anh.</span></Reveal>
      <Reveal as="img" src={`${a}/image-7.webp`} alt="Khoảnh khắc hạnh phúc" direction="left" />
      <Reveal className="t92n-storyLeadCopy"><b>Từ làn gió hè và hoàng hôn rực rỡ</b><span>Đến lời hứa gắn kết trăm năm. Chúng mình viết chương đầu hạnh phúc và mong bạn cùng sẻ chia khoảnh khắc này.</span></Reveal>
    </section>

    <section className="t92n-couple">
      <Reveal direction="right"><img src={`${a}/image-3.webp`} alt="Cô dâu Thanh Vy" /><small>CÔ DÂU</small><h2>Lê Thanh Vy</h2></Reveal>
      <Reveal direction="left"><img src={`${a}/image-8.webp`} alt="Chú rể Hoàng Nam" /><small>CHÚ RỂ</small><h2>Nguyễn Hoàng Nam</h2></Reveal>
    </section>

    <section className="t92n-collage">
      <Reveal className="t92n-yes" direction="right">Yes,<br />I do.</Reveal>
      <Reveal as="img" className="t92n-collageTall" src={`${a}/image-6.webp`} alt="Ảnh cưới dưới khăn voan" direction="left" />
      <Reveal as="img" className="t92n-collageSmall" src={`${a}/image-9.webp`} alt="Nụ cười ngày cưới" direction="right" />
      <Reveal as="p" direction="left">Không cần lời hứa xa xôi<br />Chỉ cần hơi ấm tay người tôi thương<br />Cùng nhau đi hết đoạn đường<br />Những ngày bình dị, phi thường có nhau</Reveal>
    </section>

    <section className="t92n-schedule">
      <Reveal><b>13h00</b><span>Khách đến</span></Reveal><i />
      <Reveal><b>14h15</b><span>Lễ thành hôn</span></Reveal><i />
      <Reveal><b>16h15</b><span>Ăn tiệc</span></Reveal>
    </section>

    <section className="t92n-day">
      <Reveal><small>WEDDING INVITATION</small><h2>28 · 11 · 2027</h2><p>(Tức ngày 20 tháng 10 năm Bính Ngọ)</p><h3>Address</h3><p>48 Lê Văn Lương, Hà Nội</p><VenueLink query="48 Le Van Luong Hanoi">Xem chỉ đường</VenueLink></Reveal>
      <WeddingCalendar month="THÁNG 11 · 2027" weddingDay={28} offset={0} />
      <Countdown values={count} className="t92n-count" />
    </section>

    <section className="t92n-memory">
      <Reveal as="img" src={`${a}/image-10.webp`} alt="Ảnh cưới Hoàng Nam và Thanh Vy" direction="scale" />
      <Reveal><small>WE GOT MARRIED</small><h2>Chúng ta có hẹn<br />vào ngày đó nhé!</h2></Reveal>
    </section>

    <section className="t92n-end">
      <Reveal as="img" src={`${a}/image-11.webp`} alt="Ảnh cưới hoài niệm" />
      <Reveal className="t92n-endCopy"><h2>We got married</h2><p>Cùng lưu lại khoảnh khắc đáng nhớ của chúng mình.</p></Reveal>
      <RsvpForm accent="#9f2f35" className="t92n-rsvp" />
      <GiftNote className="t92n-gift" />
      <Reveal as="h2" className="t92n-thanks"><Heart fill="currentColor" /> Thanks</Reveal>
    </section>
  </main>;
}
