import React from 'react';
import { Heart, MapPinned } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template17New.css';
import './auditFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-17';

export default function Template17New() {
  const count = useInvitationPage('template17new-page', '2027-11-21T11:00:00+07:00');
  return (
    <main className="new-invitation-page t17n">
      <MusicButton className="t17n-music" />
      <section className="t17n-hero">
        <img src={`${a}/image-1.jpg`} alt="Tuấn Kiệt và Lan Anh" />
        <Reveal className="t17n-heroMark" direction="scale"><small>DOUBLE HAPPINESS</small><h1>囍</h1><p>21 · 11 · 2027</p></Reveal>
      </section>

      <section className="t17n-bornFree"><Reveal as="small">BORN FREE, LOVING AND FEARLESS</Reveal><Reveal as="p">Bạn từng bảo: người xứng đáng rồi sẽ đến. Hôm nay, người ấy đang bên cạnh mình. Khi bạn mở tấm thiệp này, chúng mình đang đếm từng ngày hạnh phúc.</Reveal><Reveal as="h2">My lover</Reveal><div><Reveal as="img" src={`${a}/image-4.jpg`} alt="Chú rể Tuấn Kiệt" direction="right"/><Reveal as="img" src={`${a}/image-5.jpg`} alt="Cô dâu Lan Anh" direction="left"/></div></section>

      <section className="t17n-couple">
        <div><Reveal direction="right"><img src={`${a}/image-4.jpg`} alt="Chú rể Phạm Tuấn Kiệt" /><small>GROOM</small><h2>Phạm Tuấn Kiệt</h2></Reveal><Heart fill="currentColor" /><Reveal direction="left"><img src={`${a}/image-5.jpg`} alt="Cô dâu Nguyễn Lan Anh" /><small>BRIDE</small><h2>Nguyễn Lan Anh</h2></Reveal></div>
        <Reveal as="p">Chúng ta, hai con người nhỏ bé giữa thế gian rộng lớn, vẫn tìm thấy nhau giữa vô vàn ngã rẽ. Bước vào cuộc đời nhau như một phép nhiệm màu.</Reveal>
      </section>

      <section className="t17n-fullPhoto"><Reveal as="img" src={`${a}/image-6.jpg`} alt="Tuấn Kiệt và Lan Anh trong sắc đỏ" /><Reveal as="p">Let my love, like sunlight, surround you and give you illumined freedom.</Reveal></section>

      <section className="t17n-years"><Reveal className="t17n-yearsCopy" direction="right"><p>Tình yêu là những tháng năm cùng nhau đi hết trăm năm cuộc đời, dài như bốn mùa rong chơi, tóc xanh hóa bạc vẫn cười bên nhau.</p></Reveal><Reveal as="img" src={`${a}/image-7.jpg`} alt="Tuấn Kiệt và Lan Anh bên nhau" direction="left"/><Reveal as="img" src={`${a}/image-8.jpg`} alt="Cô dâu Lan Anh trong ngày cưới" direction="right"/><Reveal as="blockquote">You are everything when you are with me, and everything is you when you are not.</Reveal><Reveal as="img" src={`${a}/image-6.jpg`} alt="Hỷ sự Tuấn Kiệt và Lan Anh" direction="scale"/></section>

      <section className="t17n-invite">
        <Reveal><h2>LỄ THÀNH HÔN</h2><p>TRÂN TRỌNG KÍNH MỜI<br /><b>Bạn và Người thương</b><br />ĐẾN DỰ BỮA TIỆC CHUNG VUI</p></Reveal>
        <Reveal className="t17n-date" direction="scale"><span>CHỦ NHẬT<br />THÁNG 11</span><strong>21</strong><span>NĂM 2027<br />11:00</span></Reveal>
        <Reveal><h3>TƯ GIA NHÀ TRAI</h3><p>38 Nguyễn Trãi, Thanh Xuân, Hà Nội</p><VenueLink query="Nguyen Trai Thanh Xuan Ha Noi">Chỉ đường</VenueLink></Reveal>
      </section>

      <section className="t17n-calendar"><Reveal><WeddingCalendar month="THÁNG 11 · 2027" weddingDay={21} offset={0} /></Reveal><Countdown values={count} className="t17n-count" /></section>
      <section className="t17n-album"><Reveal as="h2">Hỷ sự</Reveal><div><Reveal as="img" direction="right" src={`${a}/image-7.jpg`} alt="Album hỷ sự" /><Reveal as="img" direction="left" src={`${a}/image-8.jpg`} alt="Ảnh cưới truyền thống" /></div><Reveal><MapPinned /><p>Cảm ơn bạn đã dành thời gian đến chung vui cùng gia đình chúng mình.</p></Reveal></section>
      <section className="t17n-ending"><RsvpForm className="t17n-rsvp" accent="#ad160f" /><GiftNote className="t17n-gift" title="Mừng cưới" /><Reveal as="h2">Trăm năm hạnh phúc</Reveal></section>
    </main>
  );
}
