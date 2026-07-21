import React from 'react';
import { Clock3, Heart, Sparkles, Utensils, Wine } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, useInvitationPage } from './NewInvitationCommon.jsx';
import './template85New.css';
import './auditFidelity.css';
import './fontFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-85';

export default function Template85New() {
  const count = useInvitationPage('template85new-page', '2027-11-29T16:30:00+07:00');
  return <main className="new-invitation-page t85n">
    <MusicButton className="t85n-music" />
    <section className="t85n-cover">
      <img src={`${a}/image-2.webp`} alt="Gia Minh và Bảo Ngọc trong lễ phục truyền thống" />
      <Reveal className="t85n-seal" direction="right">囍</Reveal>
      <Reveal className="t85n-coverCopy" direction="scale" delay={0.18}><small>THIỆP MỜI LỄ THÀNH HÔN</small><h1>Gia Minh <i>&amp;</i> Bảo Ngọc</h1><p>29 · 11 · 2027</p></Reveal>
    </section>

    <section className="t85n-hero">
      <Reveal><h2>Nhân danh tình yêu</h2><p>Hãy cùng đi hết quãng đời còn lại.<br />Từ nay trở đi, đông có nắng ấm, còn mình có nhau.</p></Reveal>
      <Reveal as="img" src={`${a}/image-5.webp`} alt="Bảo Ngọc và Gia Minh" direction="scale" />
    </section>

    <section className="t85n-story">
      <Reveal as="h2">Câu chuyện chúng mình</Reveal>
      <Reveal as="img" src={`${a}/image-6.webp`} alt="Câu chuyện tình yêu của Bảo Ngọc và Gia Minh" direction="right" />
      <Reveal as="p" direction="left">Ngày 19/11/2022, giữa những ồn ào của một buổi tối rong chơi, mình vô tình chạm ánh mắt cô ấy. Hóa ra duyên số không tìm đến lúc ta chuẩn bị kỹ càng nhất, mà đến vào lúc ta tự nhiên nhất.<br /><br />Chúng mình hợp nhau đến lạ kỳ, những câu chuyện cứ thế nối dài. Tình yêu với chúng mình đơn giản là cái nắm tay thật chặt để cùng đi hết quãng đời còn lại.</Reveal>
    </section>

    <section className="t85n-family"><Reveal direction="right"><small>NHÀ TRAI</small><h3>Ông Vũ Bá Dũng<br />Bà Lý Thị Sa</h3><p>Thành phố Hà Nội</p></Reveal><b>囍</b><Reveal direction="left"><small>NHÀ GÁI</small><h3>Ông Lê Văn An<br />Bà Nguyễn Diệu Yến</h3><p>Thành phố Hà Nội</p></Reveal></section>

    <section className="t85n-day">
      <Sparkles />
      <Reveal><small>TRÂN TRỌNG BÁO TIN</small><h2>Vũ Gia Minh <i>&amp;</i> Lê Bảo Ngọc</h2><div className="t85n-dateCard"><span>THÁNG 11</span><strong>29</strong><span>NĂM 2027</span></div><p>(Tức ngày 19 tháng 10 năm Bính Ngọ)</p></Reveal>
      <div className="t85n-schedule">
        <Reveal><Clock3 /><b>15:00</b><span>Đón khách</span></Reveal>
        <Reveal delay={0.12}><Wine /><b>16:00</b><span>Nâng ly</span></Reveal>
        <Reveal delay={0.24}><Utensils /><b>16:30</b><span>Khai tiệc</span></Reveal>
      </div>
      <Reveal className="t85n-venue"><small>TẠI NHÀ TƯ GIA NHÀ TRAI</small><p>48 LÊ VĂN LƯƠNG · HÀ NỘI</p><VenueLink query="48 Le Van Luong Hanoi">Chỉ đường</VenueLink><iframe title="Bản đồ đến tư gia nhà trai" src="https://www.google.com/maps?q=48+Le+Van+Luong+Hanoi&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></Reveal>
    </section>

    <section className="t85n-album">
      <Reveal as="h2">Album <small>CHÚNG MÌNH</small></Reveal>
      <Reveal as="img" src={`${a}/image-3.webp`} alt="Ảnh cưới truyền thống" direction="right" />
      <Reveal as="img" src={`${a}/image-6.webp`} alt="Khoảnh khắc cô dâu" direction="left" />
      <Reveal as="img" src={`${a}/image-5.webp`} alt="Khoảnh khắc thành hôn" direction="scale" />
    </section>

    <section className="t85n-end">
      <Reveal className="t85n-thanks"><small>/ Time /</small><h2>Thank You!</h2><p>Cảm ơn bạn rất nhiều vì đã gửi những lời chúc mừng tốt đẹp nhất đến đám cưới của chúng mình.</p></Reveal>
      <GiftNote className="t85n-gift" />
      <RsvpForm accent="#6a060d" className="t85n-rsvp" />
      <Countdown values={count} className="t85n-count" />
      <Reveal as="img" className="t85n-endPhoto" src={`${a}/image-2.webp`} alt="Gia Minh và Bảo Ngọc" direction="scale" />
      <Reveal as="h2"><Heart fill="currentColor" /> Hân hạnh đón tiếp</Reveal>
    </section>
  </main>;
}
