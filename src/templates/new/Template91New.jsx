import React from 'react';
import { Heart } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template91New.css';
import './auditFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-91';

export default function Template91New() {
  const count = useInvitationPage('template91new-page', '2027-11-29T11:00:00+07:00');
  return <main className="new-invitation-page t91n">
    <MusicButton className="t91n-music" />
    <section className="t91n-hero"><img src={`${a}/image-3.webp`} alt="Đám cưới trong khu vườn" /><Reveal className="t91n-title" direction="down"><h1>WE<br />GET<br />MARRIED</h1></Reveal><Reveal className="t91n-heroMeta" direction="up"><p>29 · 11 · 2027</p><strong>Quang Huy <i>&amp;</i> Tú Anh</strong></Reveal></section>
    <section className="t91n-letter"><Heart fill="currentColor" /><Reveal><small>29 THÁNG 11 · NƠI CÂU CHUYỆN BẮT ĐẦU</small><h2>Love never fails</h2><p>Chúng mình đã dành một quãng thời gian thật dài để dọn sạch lớp tuyết trong thế giới nhỏ nơi tim mình, trồng cây và đặt thật nhiều bó hoa để nói với bạn một lời chào mừng.</p></Reveal></section>
    <section className="t91n-frames"><Reveal as="img" src={`${a}/image-2.webp`} alt="Khoảnh khắc trong khu vườn" direction="right" /><Reveal as="p">Qua ánh mắt của nhau, chúng mình tìm thấy điểm tựa và hơi ấm từ bàn tay.</Reveal><Reveal as="img" src={`${a}/image-3.webp`} alt="Ảnh cưới đêm" direction="left" /></section>
    <section className="t91n-story"><Reveal as="h2">May mắn là có tình yêu</Reveal><Reveal as="article" direction="right"><img src={`${a}/image-4.webp`} alt="Quang Huy và Tú Anh trong khu vườn" /><p>Qua ánh mắt của nhau, chúng mình tìm thấy điểm tựa, một nụ cười thấu hiểu và hơi ấm từ bàn tay. Những điều nhỏ bé ấy trở thành chi tiết cảm động nhất trong lời mở đầu.</p></Reveal><Reveal as="article" direction="left"><p>Mỗi câu chuyện từng sẻ chia đều độc đáo. Những kỷ niệm đẹp đẽ ấy, mỗi khi nhớ lại, vẫn mang đến cho trái tim một cảm giác ấm áp.</p><img src={`${a}/image-5.webp`} alt="Kỷ niệm tình yêu" /></Reveal><Reveal as="img" className="t91n-storyFinal" src={`${a}/image-6.webp`} alt="Love never fails" /></section>
    <section className="t91n-memory"><Reveal as="img" src={`${a}/image-1.webp`} alt="Quang Huy và Tú Anh" direction="right" /><Reveal><small>OUR MEMORIES</small><h2>Love is a garden</h2><p>Chúng mình tin rằng tình yêu giống như một khu vườn: được vun trồng bằng kiên nhẫn, chăm sóc bằng dịu dàng và lớn lên qua từng ngày bình thường.</p></Reveal><Reveal as="img" src={`${a}/image-6.webp`} alt="Khoảnh khắc trong khu vườn" direction="left" /></section>
    <section className="t91n-invite"><Reveal><small>WEDDING INVITATION</small><h2>Trân trọng kính mời</h2><p>11:00 · Thứ Hai · 29.11.2027<br />The Secret Garden, Sóc Sơn</p><VenueLink query="Soc Son Hanoi">Xem chỉ đường</VenueLink></Reveal><WeddingCalendar month="NOVEMBER 2027" weddingDay={29} offset={0} /><Countdown values={count} className="t91n-count" /></section>
    <section className="t91n-end"><Reveal as="img" src={`${a}/image-4.webp`} alt="Album cưới trong khu vườn" /><RsvpForm accent="#183d2d" className="t91n-rsvp" /><GiftNote className="t91n-gift" /><Reveal as="h2"><Heart fill="currentColor" /> Welcome</Reveal></section>
  </main>;
}
