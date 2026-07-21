import React from 'react';
import { Camera, Car, Heart, Leaf, Utensils } from 'lucide-react';
import { Countdown, MusicButton, Reveal, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template105New.css';
import './auditFidelity.css';
import './fontFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-105';

export default function Template105New() {
  const count = useInvitationPage('template105new-page', '2027-11-28T12:00:00+07:00');
  return <main className="new-invitation-page t105n">
    <MusicButton className="t105n-music" />
    <section className="t105n-hero">
      <Reveal className="t105n-title" direction="fade"><Leaf /><small>FIND YOU · LOVE YOU · MARRY YOU</small><h1><span>Save</span><span>The</span><span>Day</span></h1><p>TIẾN MINH &amp; YẾN CHI · 28.11.2027</p></Reveal>
      <Reveal as="img" className="t105n-flowerField" src={`${a}/image-6.webp`} alt="Vườn hoa ngày cưới" direction="up" />
      <Reveal as="img" className="t105n-walkingCouple" src={`${a}/image-7.webp`} alt="Tiến Minh và Yến Chi cùng bước về phía trước" direction="scale" delay={0.15} />
    </section>

    <section className="t105n-seed"><Reveal><h2>Chúng ta gieo mầm tình yêu</h2><p>và gặt hái hạnh phúc.</p></Reveal><Heart fill="currentColor" /></section>

    <section className="t105n-couple">
      <Reveal direction="right"><img src={`${a}/image-14.webp`} alt="Chú rể Tiến Minh" /><small>GROOM</small><h3>Tiến Minh</h3><p>Khoảnh khắc đẹp nhất trên đời là được nắm tay người mình yêu.</p></Reveal>
      <Reveal direction="left"><img src={`${a}/image-13.webp`} alt="Cô dâu Yến Chi" /><small>BRIDE</small><h3>Yến Chi</h3><p>Và quyết định cùng nhau xây dựng một cuộc đời hạnh phúc trọn đời.</p></Reveal>
    </section>

    <section className="t105n-story">
      <Reveal as="h2">Our story</Reveal>
      <Reveal as="p">Yêu em là một điều kỳ diệu biết bao. Những lời nói im lặng vẫn khuấy động cảm xúc sâu lắng, như tia sáng mặt trăng chiếu rọi trái tim.</Reveal>
      <Reveal as="img" src={`${a}/image-18.webp`} alt="Câu chuyện tình yêu giữa vườn xanh" direction="right" />
      <Reveal className="t105n-storyAside" direction="left"><p>Với tôi, bạn là người được hưởng vinh quang vô bờ bến, và cũng chính bạn là người cùng tôi đi qua mọi thăng trầm.</p><b>Tiến Minh &amp; Yến Chi</b></Reveal>
    </section>

    <section className="t105n-memories">
      <Reveal as="img" src={`${a}/image-11.webp`} alt="Khoảnh khắc cô dâu chú rể trên đồng cỏ" direction="scale" />
      <div><Reveal as="img" src={`${a}/image-8.webp`} alt="Nụ hôn trong ngày cưới" direction="right" /><Reveal as="img" src={`${a}/image-19.webp`} alt="Cặp đôi trong vườn" direction="left" /></div>
      <Reveal as="p">Chúng tôi đã quyết định cùng nhau trải qua quãng đời còn lại, trong mỗi bữa ăn, mỗi mùa và mỗi năm.</Reveal>
    </section>

    <section className="t105n-invite">
      <Reveal><small>CHÚNG TÔI TRÂN TRỌNG MỜI</small><h2>Tiến Minh <i>&amp;</i> Yến Chi</h2><p>Bạn và gia đình đến tham dự lễ cưới của chúng tôi.</p><h3>Lễ Thành Hôn</h3><p>Vào lúc 12 giờ 00<br />Chủ Nhật, ngày 28 tháng 11 năm 2027</p></Reveal>
    </section>

    <section className="t105n-timeline">
      <Reveal as="h2">Timeline</Reveal>
      <div><Reveal><Car /><b>09:30</b><span>Đón dâu</span></Reveal><Reveal delay={0.1}><Camera /><b>11:00</b><span>Check-in</span></Reveal><Reveal delay={0.2}><Heart /><b>12:06</b><span>Làm lễ</span></Reveal><Reveal delay={0.3}><Utensils /><b>12:30</b><span>Tiệc mừng</span></Reveal></div>
    </section>

    <section className="t105n-day">
      <Reveal><small>ĐỊA CHỈ TỔ CHỨC TIỆC</small><h2>Trung Tâm Tiệc Cưới CineLove</h2><p>48 Lê Văn Lương · Hà Nội</p><VenueLink query="48 Le Van Luong Hanoi">Xem chỉ đường</VenueLink></Reveal>
      <WeddingCalendar month="11 · 2027" weddingDay={28} offset={6} />
      <Countdown values={count} className="t105n-count" />
    </section>

    <section className="t105n-end">
      <Reveal as="img" src={`${a}/image-19.webp`} alt="Khoảnh khắc trong album cưới xanh sage" direction="scale" />
      <Reveal className="t105n-thanks"><h2>Thank You</h2><p>Cảm ơn bạn đã lặn lội đường xa để gửi lời chúc phúc đến chúng tôi. Hẹn gặp lại bạn ở đám cưới.</p></Reveal>
      <Reveal as="img" className="t105n-endLandscape" src={`${a}/image-11.webp`} alt="Tiến Minh và Yến Chi trên đồng cỏ" direction="up" />
      <Reveal as="h2"><Heart fill="currentColor" /> Tiến Minh &amp; Yến Chi</Reveal>
    </section>
  </main>;
}
