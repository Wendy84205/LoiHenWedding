import React from 'react';
import { CalendarDays, Church, Flower2, Heart, PartyPopper, Utensils } from 'lucide-react';
import { Countdown, FallingDecor, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template21New.css';
import './auditFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-21';

export default function Template21New() {
  const count = useInvitationPage('template21new-page', '2027-08-20T11:30:00+07:00');
  return (
    <main className="new-invitation-page t21n">
      <MusicButton className="t21n-music" />
      <section className="t21n-hero"><FallingDecor symbols={['▪', '·', '✦']} count={14} /><Reveal as="img" src={`${a}/preview.png`} alt="Minh hoạ đám cưới Thảo My và Quốc Đăng" direction="scale" /><Reveal className="t21n-title"><small>WEDDING INVITATION</small><h1>Thảo My <i>&amp;</i> Quốc Đăng</h1><p>20 · 08 · 2027</p></Reveal></section>
      <section className="t21n-letter"><Reveal className="t21n-poem"><p>Trời xanh rơi ánh ban mai<br />Rót vào nhân thế khói bay giữa đời<br />Băng ngàn vượt núi trùng khơi<br />Chỉ mong cùng bước một thời bên em<br />Bốn mùa - cơm trắng - giấc êm<br />Chúng mình nắm lấy ấm êm mỗi ngày.</p></Reveal><Reveal className="t21n-letterCard"><p>Trước đây, chúng mình từng nghĩ đám cưới chỉ là một lời thông báo chính thức. Giờ mới hiểu, đó là một trong những dịp hiếm hoi của cuộc đời để hội ngộ, để đoàn viên. Là những chuyến đi từ nơi xa, là sự ủng hộ chẳng màng hơn thiệt.</p><h2>Nguyễn Thảo My &amp; Trịnh Quốc Đăng</h2><i>Trân trọng mời bạn và gia đình đến dự lễ cưới của chúng mình.</i></Reveal></section>
      <section className="t21n-invite"><Reveal><PartyPopper /><h2>THÔNG TIN ĐÁM CƯỚI</h2><small>WEDDING INFORMATION</small></Reveal><Countdown values={count} className="t21n-count" /><Reveal><WeddingCalendar month="THÁNG 08 · 2027" weddingDay={20} offset={6} /></Reveal><Reveal><p>11:30 · THỨ SÁU · 20.08.2027</p><h3>TRỐNG ĐỒNG PALACE</h3><p>173B Trường Chinh, Thanh Xuân, Hà Nội</p><VenueLink query="Trong Dong Palace Truong Chinh">Chỉ đường</VenueLink></Reveal></section>
      <section className="t21n-timeline"><Reveal as="h2">Quy trình tiệc cưới <small>WEDDING PROCESS</small></Reveal><div><Reveal><Church /><b>10:30</b><span>Rước dâu</span></Reveal><Reveal><CalendarDays /><b>11:30</b><span>Đón khách</span></Reveal><Reveal><Flower2 /><b>11:45</b><span>Lễ thành hôn</span></Reveal><Reveal><Utensils /><b>12:30</b><span>Dùng bữa</span></Reveal><Reveal><PartyPopper /><b>14:00</b><span>After party</span></Reveal></div></section>
      <section className="t21n-ending"><Reveal as="h2">THAM DỰ TIỆC CƯỚI <small>R · S · V · P</small></Reveal><RsvpForm className="t21n-rsvp" accent="#c98c80" /><Reveal as="p"><Heart fill="currentColor" /> Hẹn gặp bạn tại tiệc cưới của chúng mình.</Reveal></section>
    </main>
  );
}
