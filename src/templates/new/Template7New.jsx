import React from 'react';
import { Heart, Music, Wine } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template7New.css';
import './auditFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-7';

export default function Template7New() {
  const count = useInvitationPage('template7new-page', '2030-05-20T12:00:00+07:00');
  return (
    <main className="new-invitation-page t7n">
      <MusicButton className="t7n-music" />
      <section className="t7n-hero">
        <Reveal className="t7n-intro" direction="down"><p>OUR WEDDING | Thiệp Cưới Của Nam &amp; Anh</p><span>From Hanoi with love <Heart fill="currentColor" /></span><b>2030-05-20 12:00</b></Reveal>
        <i className="t7n-ribbon r1" /><i className="t7n-ribbon r2" /><i className="t7n-ribbon r3" />
        <Reveal as="img" src={`${a}/image-1.jpg`} alt="Minh Anh và Hoàng Nam" direction="scale" />
        <Reveal className="t7n-caption"><h1>WEDDING INVITATION</h1><p>Minh Anh &amp; Hoàng Nam</p></Reveal>
      </section>

      <section className="t7n-story">
        <div><Reveal as="img" src={`${a}/image-2.jpg`} alt="Minh Anh và Hoàng Nam khiêu vũ" direction="right" /><Reveal as="img" src={`${a}/image-4.jpg`} alt="Khoảnh khắc yêu thương" direction="left" /></div>
        <Reveal as="p">At this moment,<br />love and being loved happen at the same time.</Reveal>
        <Reveal as="blockquote">“Ngay giây phút này,<br />chúng ta vừa yêu, và vừa được yêu.”</Reveal>
        <Reveal as="img" src={`${a}/image-5.jpg`} alt="Cặp đôi trong studio trắng" />
      </section>

      <section className="t7n-tronVen"><Reveal className="t7n-lineArt" direction="scale"><span /></Reveal><Reveal as="small">TRỌN VẸN</Reveal><Reveal as="p">Tên của anh chỉ vỏn vẹn vài chữ, đi có rời rạc, chẳng thành câu, nhưng trong tim em luôn ấp ủ chỉ nguyện bên nhau mãi một đời.</Reveal><Reveal as="img" src={`${a}/image-4.jpg`} alt="Minh Anh và Hoàng Nam trọn vẹn bên nhau" direction="right"/><div><Reveal as="img" src={`${a}/image-5.jpg`} alt="Khoảnh khắc vui của cặp đôi" direction="right"/><Reveal as="img" src={`${a}/image-6.jpg`} alt="Nụ cười trong ngày cưới" direction="left"/></div><Reveal as="h2">Minh Anh<br/>Hoàng Nam</Reveal></section>

      <section className="t7n-mapVow"><Reveal><iframe title="Bản đồ nhà trai" loading="lazy" src="https://www.google.com/maps?q=Quan+Hoa+Cau+Giay+Ha+Noi&output=embed"/><div><small>NHÀ TRAI</small><p>Số 3 Quan Hoa, Cầu Giấy, Hà Nội</p></div></Reveal><Reveal><iframe title="Bản đồ nhà gái" loading="lazy" src="https://www.google.com/maps?q=Nguyen+Trai+Thanh+Xuan+Ha+Noi&output=embed"/><div><small>NHÀ GÁI</small><p>16A Nguyễn Trãi, Thanh Xuân, Hà Nội</p></div></Reveal><Reveal className="t7n-vowCard"><small>DÀNH CHO NHAU</small><p>Anh không phải điểm cuối của tình yêu, mà là động lực để yêu thương, vì có anh em đã yêu thế giới này hơn.</p></Reveal><Reveal as="img" src={`${a}/image-8.jpg`} alt="Dành cho nhau" direction="up"/></section>

      <section className="t7n-invite">
        <Reveal><small>TRÂN TRỌNG KÍNH MỜI</small><h2>Bạn và Người thương</h2><p>Đến dự lễ thành hôn của hai chúng mình</p></Reveal>
        <Reveal className="t7n-date" direction="scale"><span>THÁNG 05</span><strong>20</strong><span>NĂM 2030</span></Reveal>
        <Reveal><h3>12:00 · THỨ HAI</h3><p>TRUNG TÂM TIỆC CƯỚI TRỐNG ĐỒNG PALACE<br />65 Quán Sứ, Hoàn Kiếm, Hà Nội</p><VenueLink query="Trong Dong Palace Quan Su Ha Noi">Chỉ đường</VenueLink></Reveal>
      </section>

      <section className="t7n-dateSection">
        <Reveal direction="scale"><WeddingCalendar month="MAY 2030" weddingDay={20} offset={2} /></Reveal>
        <Countdown values={count} className="t7n-count" />
        <div className="t7n-timeline"><Reveal><Music /><b>11:30</b><span>Đón khách</span></Reveal><Reveal delay={0.12}><Heart /><b>12:00</b><span>Thành hôn</span></Reveal><Reveal delay={0.24}><Wine /><b>12:30</b><span>Khai tiệc</span></Reveal></div>
      </section>

      <section className="t7n-album"><Reveal as="h2">LOVE IN MOTION</Reveal><Reveal as="img" src={`${a}/image-6.jpg`} alt="Album cưới" /><div><Reveal as="img" direction="right" src={`${a}/image-7.png`} alt="Ảnh cưới Minh Anh" /><Reveal as="img" direction="left" src={`${a}/image-8.jpg`} alt="Ảnh cưới Hoàng Nam" /></div></section>
      <section className="t7n-ending"><RsvpForm className="t7n-rsvp" accent="#990400" /><GiftNote className="t7n-gift" /><Reveal as="h2">See you at our wedding</Reveal></section>
    </main>
  );
}
