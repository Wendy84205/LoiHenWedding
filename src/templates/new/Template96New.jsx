import React from 'react';
import { Heart } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template96New.css';
import './auditFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-96';

export default function Template96New() {
  const count = useInvitationPage('template96new-page', '2027-11-28T12:00:00+07:00');

  return <main className="new-invitation-page t96n">
    <MusicButton className="t96n-music" />

    <section className="t96n-hero">
      <Reveal className="t96n-intro" direction="down">
        <h1>Save The Date</h1><i>/</i>
        <p><b>Hi mọi ngườiii</b> Khi bạn nhận được tấm thiệp này, là lúc ngày cưới của chúng mình đã gần kề rồi đó.</p>
      </Reveal>
      <Reveal as="img" src={`${a}/image-4.webp`} alt="Phúc và Nhi" direction="up" />
      <Reveal className="t96n-names" direction="left"><span>Phúc</span><b>&amp;</b><span>Nhi</span></Reveal>
    </section>

    <section className="t96n-photoStory">
      <Reveal as="img" src={`${a}/image-2.webp`} alt="Khoảnh khắc bên nhau" direction="right" />
      <Reveal as="img" src={`${a}/image-5.webp`} alt="Ảnh cưới Phúc và Nhi" direction="left" />
      <Reveal as="p">Chúng mình trân trọng mời bạn và người thương đến chung vui trong ngày đặc biệt này!</Reveal>
    </section>

    <section className="t96n-portrait">
      <Reveal as="img" src={`${a}/image-6.webp`} alt="Chú rể Phúc" direction="right" />
      <Reveal className="t96n-portraitName" direction="left"><span>Văn</span><span>Phúc</span><i /></Reveal>
      <Reveal as="p">Trước đây, chúng mình từng nghĩ rằng đám cưới chỉ là một thông báo chính thức. Giờ mới hiểu, đó là dịp hiếm hoi để mọi người tụ họp và ở bên nhau.</Reveal>
    </section>

    <section className="t96n-galleryLead">
      <Reveal as="img" src={`${a}/image-1.webp`} alt="Phúc và Nhi trong ngày cưới" direction="right" />
      <Reveal as="img" src={`${a}/image-3.webp`} alt="Nụ cười ngày cưới" direction="left" />
      <Reveal><h2>Phúc <i>&amp;</i> Nhi</h2><p>Chủ Nhật, 28/11/2027<br />Âm lịch: 22/10 · 12:00 PM</p></Reveal>
    </section>

    <section className="t96n-invite">
      <Reveal><small>THỜI GIAN HÔN LỄ · WEDDING TIME</small><h2>Trân trọng kính mời</h2><p>12:00 · Chủ Nhật · 28.11.2027</p></Reveal>
      <WeddingCalendar month="11 · 2027" weddingDay={28} offset={0} />
      <Reveal><small>ĐỊA CHỈ HÔN LỄ · WEDDING ADDRESS</small><p>48 Lê Văn Lương, Hà Nội</p><VenueLink query="48 Le Van Luong Hanoi">Mở bản đồ</VenueLink></Reveal>
      <Countdown values={count} className="t96n-count" />
    </section>

    <section className="t96n-memory">
      <Reveal as="h2">Cùng lưu lại kỷ niệm</Reveal>
      <Reveal className="t96n-memoryGrid">
        <img src={`${a}/image-2.webp`} alt="Album cưới Phúc và Nhi" />
        <img src={`${a}/image-3.webp`} alt="Album cưới nền đỏ" />
        <img src={`${a}/image-5.webp`} alt="Khoảnh khắc hạnh phúc" />
      </Reveal>
      <Reveal as="h3">Dành ngày đó cho chúng mình nhé!</Reveal>
    </section>

    <section className="t96n-end">
      <RsvpForm accent="#851925" className="t96n-rsvp" />
      <GiftNote className="t96n-gift" />
      <Reveal as="h2"><Heart fill="currentColor" /> Rất mong được gặp bạn</Reveal>
    </section>
    <section className="t96n-letter"><Reveal as="p">Chúng mình chân thành mời những người thân yêu, những người đã đồng hành qua bao năm tháng, cùng chứng kiến và sẻ chia khoảnh khắc ý nghĩa này.<br /><br />Nếu bạn ở xa hoặc bận rộn không thể đến, đừng lo, chúng mình đã nhận được lời chúc của bạn rồi. Còn nếu có thời gian, hãy mang theo tâm trạng vui vẻ và chiếc bụng thật đói đến chung vui cùng chúng mình nhé!<br /><br />Rất mong được gặp bạn! 💕</Reveal></section>
  </main>;
}
