import React from 'react';
import { Heart, Mail, Sparkles } from 'lucide-react';
import { GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, useInvitationPage } from './NewInvitationCommon.jsx';
import './templateToneXanh.css';

const a = '/assets/new-templates/thiep-cuoi-tone-xanh';

export default function TemplateToneXanh() {
  useInvitationPage('templateToneXanh-page', '2027-12-14T11:00:00+07:00');
  return (
    <main className="new-invitation-page txanh">
      <MusicButton className="txanh-music" />
      <section className="txanh-hero">
        <Reveal className="txanh-card" direction="scale" duration={1.5}>
          <small>TRÂN TRỌNG KÍNH MỜI</small><h1>Bạn và Người thương</h1><p>Tham dự Lễ Thành Hôn</p><h2>Ngọc Quyên <span>&amp;</span> Mạnh Quân</h2>
          <div className="txanh-date"><span>Thứ Ba</span><strong>14<small>Tháng 12<br />Năm 2027</small></strong><span>11h00</span></div>
          <p className="txanh-quote">Hơn nhân là chuyện cả đời<br />Yêu người mình muốn, cưới người mình thương</p>
        </Reveal>
        <Reveal as="img" className="txanh-cartoon" src={`${a}/preview.png`} alt="Minh hoạ cô dâu chú rể" direction="up" />
      </section>

      <section className="txanh-profiles">
        <Reveal className="txanh-profile" direction="right"><img src={`${a}/image-2.jpg`} alt="Cô dâu Ngọc Quyên" /><small>CÔ DÂU</small><h2>Lê Nguyễn Ngọc Quyên</h2></Reveal>
        <Reveal className="txanh-profile" direction="left"><img src={`${a}/image-5.jpg`} alt="Chú rể Mạnh Quân" /><small>CHÚ RỂ</small><h2>Nguyễn Mạnh Quân</h2></Reveal>
      </section>

      <section className="txanh-venues">
        <Reveal className="txanh-venue" direction="right"><i>Nhà Cô Dâu</i><small>ĐỊA ĐIỂM TIỆC CƯỚI</small><h3>DIAMOND PLACE</h3><p>15A Hồ Văn Huê, Phường Đức Nhuận, TP. Hồ Chí Minh</p><VenueLink query="Diamond Place Ho Van Hue Ho Chi Minh">Chỉ đường</VenueLink><b>11h00 | 14.12.2027 | Thứ Ba</b></Reveal>
        <Reveal className="txanh-mail" direction="left"><Mail /><span>Gửi quà mừng<br />tới Cô Dâu</span></Reveal>
        <Reveal className="txanh-venue" direction="left"><i>Nhà Chú Rể</i><small>ĐỊA ĐIỂM TIỆC CƯỚI</small><h3>TƯ GIA NHÀ TRAI</h3><p>28 Nguyễn Văn Trỗi, Phường 8, Phú Nhuận</p><VenueLink query="Nguyen Van Troi Phu Nhuan">Chỉ đường</VenueLink><b>11h00 | 14.12.2027 | Thứ Ba</b></Reveal>
      </section>

      <section className="txanh-story">
        <Reveal><Sparkles /><h2>Our sweet story</h2><p>Từ một lời chào bình thường, chúng mình đã viết nên câu chuyện có thật nhiều tiếng cười. Ngày hôm nay, câu chuyện ấy mở sang một chương mới.</p></Reveal>
        <div><Reveal as="img" direction="right" src={`${a}/image-6.jpg`} alt="Chuyện tình Ngọc Quyên và Mạnh Quân" /><Reveal as="img" direction="left" src={`${a}/image-8.jpg`} alt="Album ngày cưới" /></div>
      </section>

      <section className="txanh-rsvpSection">
        <Reveal as="h2"><Heart fill="currentColor" /> Hẹn gặp bạn trong ngày vui</Reveal>
        <RsvpForm className="txanh-rsvp" accent="#315f47" />
        <GiftNote className="txanh-gift" title="Gửi quà mừng cưới" />
        <Reveal as="h3">Thank you!</Reveal>
      </section>
    </main>
  );
}
