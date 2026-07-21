import React from 'react';
import { Heart, Scissors } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template8New.css';
import './auditFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-8';

export default function Template8New() {
  const count = useInvitationPage('template8new-page', '2027-10-24T11:30:00+07:00');
  return (
    <main className="new-invitation-page t8n">
      <h1 className="visually-hidden">Thiệp cưới online mẫu 8</h1>
      <MusicButton className="t8n-music" />
      <section className="t8n-hero">
        <Reveal as="img" className="t8n-cover" src={`${a}/preview.webp`} alt="Hoàng Nam và Minh Thư" direction="scale" />
      </section>

      <section className="t8n-letter">
        <Reveal as="h2">Khi bạn nhận được chiếc thiệp này</Reveal>
        <Reveal as="p">Chúng mình đã sẵn sàng bước vào một hành trình mới. Hãy đến để chứng kiến hai con người chọn cùng nhau viết tiếp câu chuyện đời mình.</Reveal>
        <Reveal as="img" src={`${a}/image-5.png`} alt="Ảnh cutout cô dâu chú rể" direction="left" />
      </section>

      <section className="t8n-paperStory"><Reveal className="t8n-paperNames" direction="right"><img src={`${a}/image-2.png`} alt="Cô dâu Minh Thư"/><small>CÔ DÂU</small><h2>Minh Thư</h2></Reveal><Reveal className="t8n-paperNames" direction="left"><img src={`${a}/image-3.png`} alt="Chú rể Hoàng Nam"/><small>CHÚ RỂ</small><h2>Hoàng Nam</h2></Reveal><Reveal as="p">Mưa khói tan vào nhân thế, trăng sao sáng vì em. Anh lang thang khắp núi sông biển rộng, nhưng trái tim vẫn chỉ hướng về ánh mắt và nụ cười của em.</Reveal><Reveal as="img" src={`${a}/image-4.png`} alt="Nhật ký tình yêu Hoàng Nam và Minh Thư" direction="scale"/><div><Reveal as="img" src={`${a}/image-6.png`} alt="Ảnh cưới scrapbook" direction="right"/><Reveal as="img" src={`${a}/image-7.png`} alt="Khoảnh khắc hạnh phúc" direction="left"/></div></section>

      <section className="t8n-showcase">
        <Reveal as="img" src={`${a}/image-8.jpg`} alt="Cô dâu chú rể trong khung vòm" direction="right" />
        <Reveal as="h2">We got Married</Reveal>
        <Reveal as="p">Ánh sáng nghiêng xuống, ta trao chọn nhân gian<br />Tựa mình ngân sóng núi, bỗng chạm một mùa.</Reveal>
      </section>

      <section className="t8n-locationPaper"><Reveal><h2>Thời gian tổ chức</h2><p>11:30 · Chủ Nhật, ngày 24 tháng 10 năm 2027<br/>Khách sạn La Vela Saigon</p></Reveal><Reveal><iframe title="Bản đồ La Vela Saigon" loading="lazy" src="https://www.google.com/maps?q=La+Vela+Saigon+Hotel&output=embed"/></Reveal><Reveal><WeddingCalendar month="OCTOBER 2027" weddingDay={24} offset={4}/></Reveal><Reveal className="t8n-notePaper" direction="left"><p>Anh chỉ muốn bên em. Dù là thu hay đông, dù gió lạnh hay nắng ấm, chỉ cần có em, mọi mùa đều hóa thành xuân.</p></Reveal><Reveal as="img" src={`${a}/image-8.jpg`} alt="Hoàng Nam và Minh Thư" direction="right"/></section>

      <section className="t8n-invite">
        <Reveal><Scissors /><small>WEDDING INVITATION</small><h2>Hoàng Nam &amp; Minh Thư</h2><p>Trân trọng kính mời bạn tới dự tiệc thành hôn</p></Reveal>
        <Reveal className="t8n-date" direction="scale"><span>CHỦ NHẬT<br />THÁNG 10</span><strong>24</strong><span>NĂM 2027<br />11:30</span></Reveal>
        <Reveal><h3>LA VELA SAIGON</h3><p>280 Nam Kỳ Khởi Nghĩa, Quận 3, TP. Hồ Chí Minh</p><VenueLink query="La Vela Saigon Hotel">Xem đường đi</VenueLink></Reveal>
      </section>

      <section className="t8n-calendar"><Reveal><WeddingCalendar month="October 2027" weddingDay={24} offset={4} /></Reveal><Countdown values={count} className="t8n-count" /></section>
      <section className="t8n-album"><Reveal as="h2">OUR RED DIARY</Reveal><div><Reveal as="img" direction="right" src={`${a}/image-4.png`} alt="Album collage đỏ" /><Reveal as="img" direction="left" src={`${a}/image-5.png`} alt="Album ngày cưới" /><Reveal as="img" src={`${a}/image-8.jpg`} alt="Hoàng Nam và Minh Thư" /></div></section>
      <section className="t8n-ending"><RsvpForm className="t8n-rsvp" accent="#b13b2f" /><GiftNote className="t8n-gift" /><h2><Heart fill="currentColor" /> Thank you</h2></section>
    </main>
  );
}
