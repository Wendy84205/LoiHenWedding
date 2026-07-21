import React from 'react';
import { Disc3, Heart } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template4New.css';
import './auditFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-4';

export default function Template4New() {
  const count = useInvitationPage('template4new-page', '2027-05-20T12:00:00+07:00');
  return <main className="new-invitation-page t4n">
    <h1 className="visually-hidden">Thiệp cưới Đức Anh và Mai Chi</h1>
    <MusicButton className="t4n-music" />
    <section className="t4n-hero">
      <Reveal className="t4n-date" direction="down"><strong>Save The Date | Chúng mình kết hôn rồi !!!</strong><span>20.05.2027 · 12:00</span></Reveal>
      <Reveal className="t4n-openingNote" direction="left"><i>/</i><p>Hi mọi ngườiii<br />Khi bạn nhận được tấm thiệp này,<br />là lúc ngày cưới của chúng mình đã gần kề rồi đó.</p></Reveal>
      <Reveal as="h2" className="t4n-welcome" direction="right">welcome to our wedding</Reveal>
      <Reveal as="figure" className="t4n-portrait" direction="up"><img src={`${a}/image-1.webp`} alt="Đức Anh và Mai Chi" /><figcaption>You make me<br />want to<br />be a better person</figcaption></Reveal>
    </section>
    <section className="t4n-letter"><Reveal direction="left"><Heart fill="currentColor" /><h2>Hi mọi ngườiii</h2><p>Khi bạn nhận được tấm thiệp này, ngày cưới của chúng mình đã gần kề. Chúng mình mong được gặp bạn trong khoảnh khắc ý nghĩa nhất.</p></Reveal><Reveal className="t4n-player" direction="right"><Disc3 /><div><small>NOW PLAYING</small><b>Lucky Me · Jake Miller</b></div></Reveal></section>
    <section className="t4n-vow"><Reveal as="img" src={`${a}/image-2.webp`} alt="Khoảnh khắc của Đức Anh và Mai Chi" direction="right" /><Reveal direction="left"><small>YOU ARE THE ONE</small><h2>Đức Anh <i>&amp;</i> Mai Chi</h2><p>Giữa dòng người tấp nập, chúng mình gặp nhau vào một mùa hè, hẹn ước vào mùa xuân, và hôm nay quyết định nắm tay nhau trọn đời.</p></Reveal><Reveal as="img" src={`${a}/image-3.webp`} alt="Chân dung ngày cưới" direction="up" /></section>
    <section className="t4n-story"><Reveal as="h2">Our love story</Reveal><Reveal as="article" direction="right"><img src={`${a}/image-4.webp`} alt="Lần đầu gặp gỡ" /><div><small>05 · 10 · 2018</small><h3>Lần đầu gặp gỡ</h3><p>Ở độ tuổi đôi mươi, chúng ta luôn tin rằng sẽ có một người mang theo ánh sao đến bên mình. Từ một buổi chiều trò chuyện không dứt, câu chuyện của hai đứa bắt đầu.</p></div></Reveal><Reveal as="article" direction="left"><img src={`${a}/image-5.webp`} alt="Chuyến đi đầu tiên" /><div><small>20 · 05 · 2019</small><h3>Chuyến đi đầu tiên</h3><p>Chuyến đi không có đích đến, vậy mà ta lại tìm thấy tình yêu. Gió lướt qua núi đồi, tình yêu đến chẳng sớm, chẳng muộn, vừa vặn dành cho chúng mình.</p></div></Reveal><Reveal as="article" className="t4n-storyWide"><img src={`${a}/image-6.webp`} alt="Lời cầu hôn" /><div><small>20 · 05 · 2023</small><h3>Anh cầu hôn em</h3><p>Bên bờ biển, dưới ánh bình minh, khoảnh khắc anh cầm bó hoa tiến về phía em đã trở thành lời mở đầu cho một chương mới.</p></div></Reveal></section>
    <section className="t4n-albumEditorial"><Reveal><small>OUR LITTLE MOMENTS</small><h2>Chuyện dài thành đôi</h2></Reveal><Reveal as="img" src={`${a}/image-3.webp`} alt="Đức Anh và Mai Chi" direction="right" /><Reveal as="p" direction="left">Chúng mình đã đi qua những ngày rất đỗi bình thường, để nhận ra hạnh phúc đôi khi chỉ là có một người cùng sẻ chia bữa cơm, câu chuyện và mọi kế hoạch phía trước.</Reveal><div><Reveal as="img" src={`${a}/image-4.webp`} alt="Album ngày cưới" direction="right" /><Reveal as="img" src={`${a}/image-5.webp`} alt="Khoảnh khắc của chúng mình" direction="left" /></div><Reveal as="h3">You make me want to be a better person.</Reveal></section>
    <section className="t4n-day"><Reveal><small>OUR WEDDING DAY</small><h2>Tháng 05</h2></Reveal><WeddingCalendar month="MAY · 2027" weddingDay={20} offset={5} /><Countdown values={count} className="t4n-count" /><Reveal><p>12:00 · Thứ Năm<br />Grand Ballroom, Hà Nội</p><VenueLink query="Grand Ballroom Hanoi">Xem chỉ đường</VenueLink></Reveal></section>
    <section className="t4n-end"><RsvpForm accent="#a96166" className="t4n-rsvp" /><GiftNote className="t4n-gift" /><Reveal as="h2">See you at our wedding!</Reveal></section>
    <section className="t4n-final"><Reveal as="img" src={`${a}/image-1.webp`} alt="Đức Anh và Mai Chi" direction="scale" /><Reveal as="p">Cảm ơn bạn đã dành tình cảm cho chúng mình.<br />Hẹn gặp bạn trong ngày chung đôi!</Reveal></section>
  </main>;
}
