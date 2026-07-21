import React from 'react';
import { Camera, GlassWater, Heart } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template23New.css';
import './auditFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-23';

export default function Template23New() {
  const count = useInvitationPage('template23new-page', '2027-09-18T10:30:00+07:00');
  return (
    <main className="new-invitation-page t23n">
      <MusicButton className="t23n-music" />
      <section className="t23n-hero">
        <img src={`${a}/image-1.jpg`} alt="Trường Phong và An Nhiên trong khu vườn" />
        <Reveal className="t23n-heroText" direction="scale"><small>OUR WEDDING</small><h1>Trường Phong<br /><i>&amp;</i> An Nhiên</h1><p>18 · 09 · 2027</p></Reveal>
      </section>

      <section className="t23n-moon">
        <Reveal as="img" src={`${a}/image-2.jpg`} alt="Trăng và bầu trời đêm" />
        <Reveal><p>Vầng trăng soi buổi chào đời<br />Giữa muôn vũ trụ, duyên trời trao nhau<br />Ngẫu nhiên may mắn nhiệm màu<br />Gặp nhau lãng mạn tựa sao giữa trời.</p><h2>Trường Phong</h2></Reveal>
      </section>

      <section className="t23n-invite">
        <Reveal direction="right"><small>NHÀ TRAI</small><p>Ông Trương Văn Nam<br />Bà Nguyễn Thu Hà</p></Reveal><Reveal direction="left"><small>NHÀ GÁI</small><p>Ông Lê Minh Sơn<br />Bà Phạm Thanh Mai</p></Reveal>
        <Reveal className="t23n-inviteText"><span>TRÂN TRỌNG KÍNH MỜI</span><h2>Bạn và Người thương</h2><p>Tới dự tiệc thành hôn của hai chúng mình</p></Reveal>
        <Reveal className="t23n-date" direction="scale"><span>THÁNG 09</span><b>18</b><span>NĂM 2027</span></Reveal>
        <Reveal><h3>GARDEN PALACE</h3><p>65 Hoàng Cầu, Đống Đa, Hà Nội</p><VenueLink query="Hoang Cau Dong Da Ha Noi">Xem đường đi</VenueLink></Reveal>
      </section>

      <section className="t23n-collage">
        <Reveal as="img" src={`${a}/image-3.jpg`} alt="Khu vườn ngày cưới" direction="right" rotate={-4} />
        <Reveal as="img" src={`${a}/image-4.jpg`} alt="Nụ hôn ngày cưới" direction="left" rotate={5} />
        <Reveal as="p">Our love grows here</Reveal>
      </section>

      <section className="t23n-dateSection">
        <Reveal><WeddingCalendar month="September 2027" weddingDay={18} offset={2} /></Reveal>
        <div className="t23n-timeline"><Reveal><Camera /><b>10:30</b><span>Đón khách</span></Reveal><Reveal delay={0.12}><Heart /><b>11:00</b><span>Thành hôn</span></Reveal><Reveal delay={0.24}><GlassWater /><b>11:30</b><span>Khai tiệc</span></Reveal></div>
        <Countdown values={count} className="t23n-count" />
      </section>

      <section className="t23n-album"><Reveal as="h2">Garden memories</Reveal><Reveal as="img" src={`${a}/image-5.jpg`} alt="Album cưới ngoài trời" /><div><Reveal as="img" direction="right" src={`${a}/image-6.jpg`} alt="Kỷ niệm trong vườn" /><Reveal as="img" direction="left" src={`${a}/image-7.jpg`} alt="Cặp đôi hạnh phúc" /></div></section>
      <section className="t23n-ending"><RsvpForm className="t23n-rsvp" accent="#4b603b" /><GiftNote className="t23n-gift" /><Reveal as="h2">With love, thank you</Reveal></section>
    </main>
  );
}
