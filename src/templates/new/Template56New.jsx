import React from 'react';
import {
  Countdown,
  GiftNote,
  MusicButton,
  Reveal,
  RsvpForm,
  WeddingCalendar,
  useInvitationPage,
} from './NewInvitationCommon.jsx';
import './template56New.css';

const a = '/assets/new-templates/thiep-cuoi-56';

export default function Template56New() {
  const count = useInvitationPage('template56new-page', '2027-12-19T10:00:00+07:00');

  return (
    <main className="new-invitation-page t56n">
      <MusicButton className="t56n-music" />

      <section className="t56n-hero">
        <img src={`${a}/image-2.jpg`} alt="Văn Anh và Minh Thư trong lễ phục cưới" />
        <Reveal className="t56n-save" direction="fade"><i>Save the date</i><b>19.12.2027</b></Reveal>
      </section>

      <section className="t56n-invitation">
        <Reveal className="t56n-bow" direction="scale" aria-hidden="true"><i /><i /></Reveal>
        <Reveal as="h1">WEDDING</Reveal>
        <Reveal className="t56n-coupleNames" direction="left"><span>Văn Anh</span><b>&amp;</b><span>Minh Thư</span></Reveal>
        <Reveal as="h2">THƯ MỜI TIỆC CƯỚI</Reveal>
        <Reveal as="p">CHỦ NHẬT - 10:00</Reveal>
        <Reveal as="strong">19.12.2027</Reveal>
      </section>

      <section className="t56n-family">
        <div className="t56n-familyText">
          <Reveal><b>NHÀ TRAI</b><p>ÔNG NGUYỄN VĂN HẢI<br />BÀ TRƯƠNG THỊ MINH</p><span>Hoàng Mai, Hà Nội</span></Reveal>
          <Reveal delay={0.12}><b>NHÀ GÁI</b><p>ÔNG LÊ MINH TÂM<br />BÀ NGUYỄN VÂN ANH</p><span>Hoàng Mai, Hà Nội</span></Reveal>
        </div>
        <div className="t56n-portraits">
          <Reveal direction="right"><img src={`${a}/image-2.jpg`} alt="Chú rể Văn Anh" /></Reveal>
          <Reveal direction="left"><img src={`${a}/image-2.jpg`} alt="Cô dâu Minh Thư" /></Reveal>
        </div>
        <Reveal className="t56n-profileLabels"><span>GROOM</span><span>BRIDE</span></Reveal>
        <Reveal className="t56n-profileNames"><span>Văn Anh</span><i>♥</i><span>Minh Thư</span></Reveal>
      </section>

      <section className="t56n-love">
        <Reveal as="h2">L . O . V . E</Reveal>
        <Reveal as="img" src={`${a}/image-5.jpg`} alt="Văn Anh đội vương miện cho Minh Thư" direction="scale" />
        <Reveal className="t56n-eventCopy"><i>We got married</i><h3>LỄ THÀNH HÔN</h3></Reveal>
        <Reveal className="t56n-date" direction="scale"><span>CHỦ NHẬT<br /><b>THÁNG 12</b></span><strong>19</strong><span>NĂM 2027<br /><b>10:00</b></span></Reveal>
        <Reveal as="small">Ngày tổ chức: 19 tháng 12 năm 2027</Reveal>
      </section>

      <section className="t56n-calendarSection">
        <Reveal as="h2">WELCOME TO OUR WEDDING</Reveal>
        <Reveal className="t56n-calendarPhoto" direction="scale">
          <img src={`${a}/image-4.jpg`} alt="Văn Anh và Minh Thư" />
          <WeddingCalendar month="" date="2027-12-19" weddingDay={19} />
        </Reveal>
        <Reveal as="p">Hữu duyên nên nghĩa vợ chồng.<br />Trăm năm giữ trọn tấm lòng cùng nhau.</Reveal>
      </section>

      <section className="t56n-address">
        <Reveal as="img" src={`${a}/image-8.jpg`} alt="Khoảnh khắc hạnh phúc" direction="right" />
        <Reveal className="t56n-addressCopy" direction="left">
          <h2>ADDRESS</h2><b>TƯ GIA NHÀ TRAI</b><p>Hoàng Mai, Hà Nội</p>
          <iframe title="Bản đồ tư gia nhà trai" src="https://www.google.com/maps?q=Ho%C3%A0ng%20Mai%20H%C3%A0%20N%E1%BB%99i&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </Reveal>
        <Countdown values={count} className="t56n-count" duration={1.15} />
      </section>

      <section className="t56n-collage">
        <Reveal as="img" src={`${a}/image-7.jpg`} alt="Album ngày cưới" direction="right" />
        <Reveal as="img" src={`${a}/image-6.jpg`} alt="Văn Anh và Minh Thư mỉm cười" direction="left" delay={0.12} />
      </section>

      <section className="t56n-rsvpSection">
        <RsvpForm className="t56n-rsvp" accent="#8d0e12" />
        <GiftNote className="t56n-gift" title="Gửi quà tới cô dâu chú rể" />
      </section>

      <section className="t56n-thanks">
        <Reveal as="img" src={`${a}/image-5.jpg`} alt="Lời cảm ơn từ cô dâu chú rể" />
        <Reveal as="h2">THANKS</Reveal>
      </section>
    </main>
  );
}
