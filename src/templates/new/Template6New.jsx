import React from 'react';
import { Heart, Pause, Radio, SkipBack, SkipForward } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, WishForm, useInvitationPage } from './NewInvitationCommon.jsx';
import './template6New.css';

const a = '/assets/new-templates/thiep-cuoi-6';

export default function Template6New() {
  const count = useInvitationPage('template6new-page', '2027-11-11T19:00:00+07:00');
  return (
    <main className="new-invitation-page t6n">
      <h1 className="visually-hidden">Thiệp cưới online mẫu 6</h1>
      <MusicButton className="t6n-music" />
      <section className="t6n-hero"><Reveal className="t6n-label" direction="down">WEDDING<br/>DAY</Reveal><Reveal as="img" src={`${a}/image-1.jpg`} alt="Hoàng Duy và Khánh Linh" direction="scale"/><Reveal className="t6n-player"><img src={`${a}/image-4.jpg`} alt="Bìa nhạc tình yêu"/><div><b>I will love you</b><span>Valentine · Kina Grannis</span></div><small>5:20 ━━━━━ 13:14</small><footer><SkipBack/><Pause/><SkipForward/><Radio/></footer></Reveal></section>
      <section className="t6n-cutout"><img src={`${a}/image-2.jpg`} alt="Nền ảnh Hoàng Duy và Khánh Linh"/><Reveal as="img" src={`${a}/image-5.png`} alt="Cô dâu chú rể cutout" direction="left"/><Reveal as="p" direction="right">“There is nothing I want more for myself than a future with you.”</Reveal></section>
      <section className="t6n-loveLetter"><Reveal as="p">Hôm nay là một ngày đẹp, nếu chẳng phải mơ.</Reveal><Reveal as="img" src={`${a}/image-3.jpg`} alt="Love letter của Hoàng Duy và Khánh Linh" direction="right"/><Reveal as="h2">Love Letter</Reveal><Reveal as="small">WE ARE MARRIED</Reveal><Reveal as="img" src={`${a}/image-4.jpg`} alt="Hoàng Duy và Khánh Linh" direction="left"/><Reveal as="p">Phương xa vạn dặm vẫn là em, tán đỏ suy tình, mùa hạ người em yêu cùng cả con tim.</Reveal></section>
      <section className="t6n-darkDiary"><Reveal className="t6n-darkPair" direction="scale"><img src={`${a}/image-6.jpg`} alt="Chú rể Hoàng Duy"/><img src={`${a}/image-8.png`} alt="Cô dâu Khánh Linh"/></Reveal><Reveal as="h2">We got married</Reveal><Reveal as="img" src={`${a}/image-3.jpg`} alt="Nhật ký ngày cưới" direction="right"/><Reveal as="p">Anh giấu đóa hồng sau lưng, mong chờ khoảnh khắc gặp em bất ngờ.</Reveal></section>
      <section className="t6n-invite"><Reveal><small>THE WEDDING OF</small><h2>Hoàng Duy <i>&amp;</i> Khánh Linh</h2><p>Trân trọng kính mời bạn đến dự ngày vui</p></Reveal><div className="t6n-families"><Reveal className="t6n-family"><small>NHÀ TRAI</small><b>Ông Nguyễn Văn Hùng</b><b>Bà Trần Thị Thu</b></Reveal><span aria-hidden="true">✦</span><Reveal className="t6n-family"><small>NHÀ GÁI</small><b>Ông Lê Quang Minh</b><b>Bà Phạm Thị Lan</b></Reveal></div><Reveal className="t6n-date" direction="scale"><span>THỨ NĂM<br/>THÁNG 11</span><strong>11</strong><span>NĂM 2027<br/>19:00</span></Reveal><Reveal><h3>THE ADORA CENTER</h3><p>431 Hoàng Văn Thụ, Tân Bình, TP. Hồ Chí Minh</p><VenueLink query="The Adora Center Hoang Van Thu">Chỉ đường</VenueLink></Reveal><Countdown values={count} className="t6n-count"/></section>
      <section className="t6n-calendar"><Reveal><WeddingCalendar month="NOVEMBER · 2027" weddingDay={11}/></Reveal><Reveal as="p">Save the date<br/>and play our memories.</Reveal><Reveal className="t6n-timeline"><h3>THE WEDDING SCHEDULE</h3><div><time>17:30</time><span>Đón khách</span></div><div><time>18:30</time><span>Lễ thành hôn</span></div><div><time>19:00</time><span>Khai tiệc</span></div></Reveal><Reveal className="t6n-dresscode"><small>GỢI Ý TRANG PHỤC</small><h3>Dress code</h3><p>Đen, hồng phấn và ánh bạc — cùng tông màu trong câu chuyện tình của chúng mình.</p><div aria-label="Bảng màu gợi ý"><i/><i/><i/></div></Reveal></section>
      <section className="t6n-gallery"><Reveal as="h2">PLAY OUR MEMORIES</Reveal><div><Reveal as="img" direction="right" src={`${a}/image-3.jpg`} alt="Album cưới"/><Reveal as="img" direction="left" src={`${a}/image-6.jpg`} alt="Ảnh cưới Hoàng Duy"/><Reveal as="img" src={`${a}/image-7.png`} alt="Khoảnh khắc vui"/></div></section>
      <section className="t6n-ending"><RsvpForm className="t6n-rsvp" accent="#e24682"/><Reveal className="t6n-wishes"><h3>A NOTE FOR THE COUPLE</h3><WishForm className="t6n-wish" accent="#e24682"/></Reveal><GiftNote className="t6n-gift"/><Reveal as="h2"><Heart fill="currentColor"/> LOVE ON REPEAT</Reveal></section>
    </main>
  );
}
