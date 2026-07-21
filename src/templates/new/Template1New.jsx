import React from 'react';
import { Heart } from 'lucide-react';
import {
  Countdown,
  MusicButton,
  Reveal,
  VenueLink,
  WeddingCalendar,
  useInvitationPage,
} from './NewInvitationCommon.jsx';
import './template1New.css';
import './auditFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-1';

function SectionHeart() {
  return <Heart className="t1n-heart" fill="currentColor" strokeWidth={0} aria-hidden="true" />;
}

export default function Template1New() {
  const count = useInvitationPage('template1new-page', '2050-05-22T12:00:00+07:00');

  return (
    <main className="new-invitation-page t1n">
      <MusicButton className="t1n-music" />

      <section className="t1n-hero">
        <img src={`${a}/image-3.jpg`} alt="Ninh Tùng và Thanh Thúy nắm tay bên bờ biển" />
        <div className="t1n-heroShade" aria-hidden="true" />
        <Reveal className="t1n-topline" direction="fade" duration={1.1}>
          <span>YOU ARE</span><span>THE LOVE OF</span><span>MY LIFE</span>
        </Reveal>
        <Reveal className="t1n-title" direction="scale" duration={1.35}>
          <h1><span>We got</span><i>Married</i></h1>
          <p>It&apos;s been a long time, see you at the wedding!</p>
          <b>2050.05.22</b>
        </Reveal>
        <div className="t1n-heroNames">
          <Reveal direction="right"><small>GROOM</small><strong>Ninh Tùng</strong></Reveal>
          <Reveal direction="left" delay={0.12}><small>BRIDE</small><strong>Thanh Thúy</strong></Reveal>
        </div>
      </section>

      <section className="t1n-invite">
        <Reveal direction="scale"><SectionHeart /><h2>WEDDING</h2></Reveal>
        <Reveal as="h3">THIỆP MỜI CƯỚI CỦA CHÚNG MÌNH</Reveal>
        <Reveal className="t1n-wordline" direction="left"><span>FALL IN</span><span>LOVE</span><span>WEDDING</span></Reveal>
        <Reveal className="t1n-invitePhoto" direction="scale">
          <img src="/assets/template44/sea-couple.webp" alt="Khoảnh khắc cưới bên sóng biển" />
          <small>As the clouds and mist dissipate, I love you and everyone knows it.</small>
        </Reveal>
        <Reveal className="t1n-inviteCopy">
          <p>Gửi đến bạn tấm thiệp cưới đầy yêu thương.</p>
          <p>Những ai nhận được lời mời này đều là những người đặc biệt với bọn mình.<br />Mong bạn và gia đình sẽ đến chung vui, cùng chứng kiến khoảnh khắc hạnh phúc nhất của hai đứa.</p>
          <p>To Our Family And Friends,<br />Thank You For Celebrating Our Special Day,<br />Supporting Us And Sharing Our Love.</p>
        </Reveal>
      </section>

      <section className="t1n-lovers">
        <Reveal direction="scale"><SectionHeart /><h2>MY LOVER</h2></Reveal>
        <div className="t1n-loverPortraits">
          <Reveal direction="right"><img src="/assets/template44/groom-portrait.webp" alt="Chú rể Ninh Tùng" /><i /><h3>Ninh Tùng</h3></Reveal>
          <Reveal direction="left" delay={0.12}><img src="/assets/template44/bride-portrait.webp" alt="Cô dâu Thanh Thúy" /><i /><h3>Thanh Thúy</h3></Reveal>
        </div>
        <Reveal as="p">Trái tim em,<br />Tựa cánh chim nhỏ giữa đồng hoang,<br />Đã tìm thấy bầu trời của riêng mình<br />Trong đôi mắt anh.</Reveal>
        <Reveal as="p" className="t1n-english">My heart, the bird of the wilderness has found<br />its sky in your eye.</Reveal>
      </section>

      <section className="t1n-film">
        <Reveal className="t1n-wordline"><span>WELCOME</span><span>TO</span><span>WEDDING</span></Reveal>
        <div className="t1n-filmFrame">
          <Reveal className="t1n-filmShot" direction="right"><img src="/assets/template44/mountain-couple.webp" alt="Ảnh cưới trên núi" /><span>I love three things in this world.</span></Reveal>
          <Reveal className="t1n-filmShot" direction="left"><img src={`${a}/image-5.jpg`} alt="Khoảnh khắc hai người bên nhau" /><span>Sun, moon and you.</span></Reveal>
          <Reveal className="t1n-filmShot"><img src={`${a}/image-5.jpg`} alt="Cô dâu chú rể nhìn nhau" /><span>Sun for morning, moon for night, and you forever.</span></Reveal>
        </div>
        <Countdown values={count} className="t1n-count" duration={1.1} />
      </section>

      <section className="t1n-cutout">
        <Reveal as="p">Có lẽ thế gian này có vô vàn điều tươi đẹp,<br />Nhưng trong lòng em, đẹp nhất vẫn chỉ có anh</Reveal>
        <div className="t1n-cutoutStage">
          <Reveal as="img" className="t1n-cutoutPhoto" direction="right" src={`${a}/image-6.jpg`} alt="Cô dâu chú rể trước biển" />
          <Reveal as="img" className="t1n-cutoutSticker" direction="left" delay={0.18} src={`${a}/image-7.png`} alt="Cô dâu chú rể" />
          <span className="t1n-vertical one">MY LOVE</span><span className="t1n-vertical two">FOREVER</span>
        </div>
        <Reveal className="t1n-loveCopy" direction="right"><h2>I LOVE YOU</h2><p>Nong gió xuân dịu dàng với em hơn,<br />Xua tan muộn phiền,<br />Để mọi thứ chỉ còn lại dịu êm.</p></Reveal>
      </section>

      <section className="t1n-seaGallery">
        <Reveal as="img" src={`${a}/image-2.jpg`} alt="Nụ cười ngày cưới" />
        <Reveal className="t1n-wordline"><span>FALL IN</span><span>LOVE</span><span>WEDDING</span></Reveal>
        <Reveal as="img" src={`${a}/image-8.jpg`} alt="Khoảnh khắc vui bên biển" />
      </section>

      <section className="t1n-saveDate">
        <Reveal direction="scale"><SectionHeart /><h2>SAVE THE DATE</h2></Reveal>
        <Reveal as="p">Đi một vòng lớn rồi vẫn gặp anh,<br />Từ đó, thế gian bỗng hóa dịu dàng.</Reveal>
        <Reveal className="t1n-dateCard" direction="scale">
          <img src={`${a}/image-5.jpg`} alt="Ảnh cưới trong tấm lịch" />
          <WeddingCalendar month="" date="2050-05-22" weddingDay={22} />
          <div><b>Chủ Nhật, 22/05/2050</b><span>Âm lịch 22/4 | 12:00 PM</span></div>
        </Reveal>
        <Reveal as="p" className="t1n-dateQuote">Hạnh phúc lớn nhất chính là được nắm tay anh,<br />Cùng nhau đi hết cuộc đời lãng mạn này</Reveal>
      </section>

      <section className="t1n-finalPhoto">
        <Reveal as="img" src={`${a}/image-2.jpg`} alt="Ninh Tùng và Thanh Thúy bên biển" />
        <Reveal as="p">“Hết lần này đến lần khác, đem chuyện tình riêng khoe với thế gian.<br />Chỉ vì mỗi lần nhìn em, anh lại thấy đó là điều đáng tự hào nhất.”</Reveal>
      </section>

      <section className="t1n-address">
        <Reveal direction="scale"><SectionHeart /><h2>ADDRESS</h2></Reveal>
        <Reveal className="t1n-mapCard">
          <iframe title="Bản đồ địa điểm cưới" src="https://www.google.com/maps?q=Trung%20t%C3%A2m%20ti%E1%BB%87c%20c%C6%B0%E1%BB%9Bi%20H%C3%A0%20N%E1%BB%99i&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          <p>Trung tâm tiệc cưới Cinelove</p>
          <VenueLink query="Trung tâm tiệc cưới Hà Nội">Mở Google Maps</VenueLink>
        </Reveal>
        <Reveal className="t1n-coupleMark" direction="scale" aria-hidden="true"><span>♙</span><b>♥</b><span>♙</span></Reveal>
        <Reveal as="h2" className="t1n-thanks">Thank you</Reveal>
      </section>
    </main>
  );
}
