import React from 'react';
import { Heart } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template11New.css';
import './auditFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-11';

export default function Template11New() {
  const count = useInvitationPage('template11new-page', '2027-09-12T11:00:00+07:00');
  return (
    <main className="new-invitation-page t11n">
      <MusicButton className="t11n-music" />
      <section className="t11n-hero"><img src={`${a}/image-1.jpg`} alt="Quốc Bảo và Ngọc Hân" /><Reveal className="t11n-title" direction="up"><small>喜 欢 你 · LOVE LIFE</small><h1>Quốc Bảo<br /><i>&amp;</i> Ngọc Hân</h1><p>12 · 09 · 2027</p></Reveal></section>
      <section className="t11n-portraits"><Reveal as="h2">THE BEGINNING</Reveal><div><Reveal direction="right"><img src={`${a}/image-3.jpg`} alt="Chú rể Quốc Bảo" /><small>GROOM</small><h3>Quốc Bảo</h3></Reveal><Reveal direction="left"><img src={`${a}/image-4.jpg`} alt="Cô dâu Ngọc Hân" /><small>BRIDE</small><h3>Ngọc Hân</h3></Reveal></div></section>
      <section className="t11n-loveStory"><Reveal as="small">LOVE STORY</Reveal><Reveal className="t11n-storyFrame" direction="right"><img src={`${a}/image-3.jpg`} alt="Câu chuyện của Quốc Bảo và Ngọc Hân"/><span>With the wonder of your love, the sun above always shines.</span></Reveal><Reveal as="p">Bên cười, giận dỗi, muôn vàn chuyện nhỏ, và cùng nhau nhìn lại năm tháng đã qua.</Reveal><Reveal as="img" src={`${a}/image-6.jpg`} alt="Quốc Bảo và Ngọc Hân trong sắc đỏ" direction="left"/></section>
      <section className="t11n-vow"><Reveal as="img" src={`${a}/image-6.jpg`} alt="Quốc Bảo và Ngọc Hân" /><Reveal as="p">Khi tôi nói “Anh yêu em mãi mãi”<br />Không phải là mười năm, hai mươi năm,<br />mà ngay giây phút này, tình yêu dành cho em khiến anh đủ dũng khí để nói: “Mãi mãi.”</Reveal></section>
      <section className="t11n-redDiary"><Reveal as="img" src={`${a}/image-7.jpg`} alt="Nhật ký tình yêu màu đỏ" direction="scale"/><div><Reveal as="img" src={`${a}/image-3.jpg`} alt="Ngày vui Quốc Bảo và Ngọc Hân" direction="right"/><Reveal as="img" src={`${a}/image-4.jpg`} alt="Lời hẹn ước của cặp đôi" direction="left"/></div><Reveal as="p">Hạnh phúc là khi tôi yêu em và em cũng yêu tôi. Chỉ đơn giản như vậy thôi.</Reveal><Reveal as="img" className="t11n-sticker" src={`${a}/image-8.png`} alt="Trang trí ngày cưới" direction="up"/></section>
      <section className="t11n-invite"><Reveal><Heart fill="currentColor" /><h2>THIỆP MỜI THÀNH HÔN</h2><p>Trân trọng kính mời bạn tới chung vui cùng hai gia đình</p></Reveal><Reveal className="t11n-date" direction="scale"><span>CHỦ NHẬT<br />THÁNG 09</span><strong>12</strong><span>NĂM 2027<br />11:00</span></Reveal><Reveal><h3>TRUNG TÂM HỘI NGHỊ AQUARIA</h3><p>Lê Đức Thọ, Nam Từ Liêm, Hà Nội</p><VenueLink query="Aquaria Le Duc Tho Ha Noi">Chỉ đường</VenueLink></Reveal></section>
      <section className="t11n-calendar"><Reveal><WeddingCalendar month="SEPTEMBER · 2027" weddingDay={12} offset={2} /></Reveal><Countdown values={count} className="t11n-count" /></section>
      <section className="t11n-album"><Reveal as="h2">Love life</Reveal><Reveal as="img" src={`${a}/image-7.jpg`} alt="Album cưới đỏ" /><div><Reveal as="img" direction="right" src={`${a}/image-3.jpg`} alt="Khoảnh khắc hạnh phúc" /><Reveal as="img" direction="left" src={`${a}/image-4.jpg`} alt="Quốc Bảo và Ngọc Hân" /></div></section>
      <section className="t11n-ending"><RsvpForm className="t11n-rsvp" accent="#800b0b" /><GiftNote className="t11n-gift" /><Reveal as="h2">Thank you</Reveal></section>
    </main>
  );
}
