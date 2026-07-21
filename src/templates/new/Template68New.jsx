import React from 'react';
import { Heart, Quote } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template68New.css';
import './auditFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-68';

export default function Template68New() {
  const count = useInvitationPage('template68new-page', '2027-11-28T12:00:00+07:00');
  return <main className="new-invitation-page t68n">
    <MusicButton className="t68n-music" />
    <section className="t68n-hero">
      <img src={`${a}/image-11.webp`} alt="Mai Anh và Nguyễn Tuấn trong ngày cưới" />
      <Reveal as="b" className="t68n-heroWord" direction="fade" duration={1.8}>WEDDING</Reveal>
      <Reveal className="t68n-title" direction="scale" delay={0.15}>
        <small>INVITATION · WEDDING</small>
        <h1>Love You</h1>
        <p>MAI ANH &amp; NGUYỄN TUẤN</p>
      </Reveal>
      <Reveal as="p" className="t68n-heroInvite" direction="up" delay={0.35}>Chúng tôi trân trọng kính mời bạn đến dự đám cưới</Reveal>
    </section>

    <section className="t68n-poem">
      <Reveal direction="right"><span>L<br />O<br />V<br />E</span><p>Em có rất nhiều điều ngọt ngào muốn thì thầm với anh khi gió thổi, khi mặt trời mọc, khi hoa nở và khi em lén nhìn anh từ phía sau.</p></Reveal>
      <Reveal as="blockquote" direction="left">Tình yêu đích thực không khiến ta bất an và cô đơn, mà cho ta thêm dũng khí để cùng nhau tiếp tục tiến bước.</Reveal>
    </section>

    <section className="t68n-sunlight">
      <Reveal as="img" src={`${a}/image-3.webp`} alt="Cặp đôi nắm tay trong nắng" direction="scale" />
      <Reveal as="p" direction="left">Điều tuyệt vời nhất trên đời<br />là mỗi ngày em yêu anh,<br />anh cũng yêu em lại.</Reveal>
      <i>WELCOME</i><i>TO OUR WEDDING</i>
    </section>

    <section className="t68n-photoText">
      <Reveal as="img" src={`${a}/image-8.webp`} alt="Ảnh cưới phong cách điện ảnh" direction="right" />
      <Reveal direction="left"><small>CHÂN THÀNH KÍNH MỜI</small><h2>Bạn &amp; người thương</h2><p>Đến chứng kiến và chia sẻ khoảnh khắc hạnh phúc này cùng chúng mình.</p></Reveal>
    </section>

    <section className="t68n-quote"><Quote /><Reveal as="p">Chúng ta là những hạt bụi sao và bông tuyết trong vũ trụ, tan chảy trong hơi ấm của những đường chỉ tay trên lòng bàn tay nhau.</Reveal></section>

    <section className="t68n-welcomePhoto">
      <Reveal as="img" src={`${a}/image-9.webp`} alt="Ảnh cưới giữa thiên nhiên" direction="scale" />
      <Reveal direction="up"><small>WELCOME TO OUR WEDDING</small><h2>Mai Anh &amp; Nguyễn Tuấn</h2><p>Những người thân yêu đã luôn đồng hành cùng chúng tôi, xin hãy đến và chia sẻ khoảnh khắc hạnh phúc này.</p></Reveal>
    </section>

    <section className="t68n-event">
      <Reveal><small>THE WEDDING DAY</small><h2>Chủ Nhật, 28 tháng 11 năm 2027</h2><p>(22 tháng 10 âm lịch) · 12:00<br />Khách sạn CineLove · Tòa Nhà Hạnh Phúc</p><VenueLink query="Hanoi wedding hotel">Xem đường đi</VenueLink></Reveal>
      <WeddingCalendar month="11 · 2027" weddingDay={28} offset={0} />
      <Countdown values={count} className="t68n-count" />
    </section>

    <section className="t68n-mapSection">
      <Reveal><small>ĐỊA CHỈ / ADDRESS</small><h2>Khách sạn CineLove</h2><p>Tòa Nhà Hạnh Phúc · Hà Nội</p></Reveal>
      <Reveal className="t68n-map" direction="scale"><iframe title="Bản đồ đến Khách sạn CineLove" src="https://www.google.com/maps?q=Hoan+Kiem+Hanoi&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></Reveal>
    </section>

    <section className="t68n-album">
      <Reveal as="h2">Our memories</Reveal>
      <Reveal as="img" src={`${a}/image-13.webp`} alt="Album cưới Mai Anh và Nguyễn Tuấn" direction="right" />
      <div><Reveal as="img" src={`${a}/image-5.webp`} alt="Ảnh tình yêu bên bờ biển" direction="right" /><Reveal as="img" src={`${a}/image-10.webp`} alt="Khoảnh khắc ngày cưới" direction="left" /></div>
      <Reveal as="p">Bình minh và hoàng hôn, vòng tuần hoàn của các mùa. Ngày này mang một ý nghĩa đặc biệt khi tình yêu bắt đầu một hành trình mới.</Reveal>
    </section>

    <section className="t68n-end">
      <GiftNote className="t68n-gift" />
      <RsvpForm accent="#ffcc66" className="t68n-rsvp" />
      <Reveal as="p" className="t68n-endQuote">Mùa xuân đang nở rộ, mùa hè cũng đang rực rỡ. Chúng mình mong được gặp bạn trong ngày vui này.</Reveal>
      <Reveal as="img" className="t68n-endPhoto" src={`${a}/image-14.webp`} alt="Mai Anh và Nguyễn Tuấn bên nhau" direction="scale" />
      <Reveal as="h2"><Heart fill="currentColor" /> Thank you</Reveal>
    </section>
  </main>;
}
