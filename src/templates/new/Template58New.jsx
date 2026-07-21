import React from 'react';
import { Camera, Church, GlassWater, Heart, Landmark, Users } from 'lucide-react';
import { Countdown, FallingDecor, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template58New.css';

const a = '/assets/new-templates/thiep-cuoi-58';

export default function Template58New() {
  const count = useInvitationPage('template58new-page', '2027-05-10T17:00:00+07:00');
  return (
    <main className="new-invitation-page t58n">
      <h1 className="visually-hidden">Thiệp cưới online mẫu 58</h1>
      <MusicButton className="t58n-music" />
      <section className="t58n-hero"><FallingDecor symbols={['·','✦']} count={12}/><Reveal as="img" src={`${a}/preview.png`} alt="Lễ cưới Minh Anh và Đăng Phúc tại biệt thự cổ" direction="scale" duration={1.6}/></section>
      <section className="t58n-story"><Reveal as="h2">Our Love Story</Reveal><Reveal as="p">Chúng mình chính thức về chung một nhà. Một câu chuyện bắt đầu từ những lần tình cờ gặp gỡ, rồi đi qua thật nhiều thành phố trước khi dừng lại ở lời hứa hôm nay.</Reveal><div><Reveal as="img" direction="right" src={`${a}/image-3.webp`} alt="Cô dâu Minh Anh"/><Reveal as="img" direction="left" src={`${a}/image-1.webp`} alt="Minh Anh và Đăng Phúc"/></div><div className="t58n-profiles"><span>Cô dâu<h3>Minh Anh</h3></span><span>Chú rể<h3>Đăng Phúc</h3></span></div></section>
      <section className="t58n-invite"><Reveal><Landmark/><h2>Wedding Ceremony</h2></Reveal><Reveal className="t58n-date" direction="scale" duration={1.6}><span>THỨ HAI<br/>THÁNG 05</span><strong>10</strong><span>NĂM 2027<br/>17:00</span></Reveal><Reveal><h3>VILLA DEL BALBIANELLO</h3><p>Lake Como, Italy</p><VenueLink query="Villa del Balbianello Italy">Chỉ đường</VenueLink></Reveal></section>
      <section className="t58n-calendar"><Reveal><WeddingCalendar month="MAY · 2027" weddingDay={10} offset={5}/></Reveal><Countdown values={count} className="t58n-count" duration={1.6}/></section>
      <section className="t58n-timeline"><Reveal as="h2">Time Line</Reveal><div><Reveal><Users/><b>04:30</b><span>Lễ rước dâu</span></Reveal><Reveal><Church/><b>09:30</b><span>Thánh lễ hôn phối</span></Reveal><Reveal><Camera/><b>11:00</b><span>Đón khách</span></Reveal><Reveal><GlassWater/><b>11:30</b><span>Khai tiệc</span></Reveal></div></section>
      <section className="t58n-album"><Reveal as="h2">Album Ảnh Cưới</Reveal><div>{['image-1.webp','image-3.webp','image-8.webp','image-1.webp','image-8.webp'].map((image,index)=><Reveal as="img" key={`${image}-${index}`} direction={index%2?'left':'right'} src={`${a}/${image}`} alt="Album cưới phong cách Italy"/>)}</div></section>
      <section className="t58n-ending"><RsvpForm className="t58n-rsvp" accent="#9b6c28"/><GiftNote className="t58n-gift"/><Reveal as="h2"><Heart fill="currentColor"/> Grazie</Reveal></section>
    </main>
  );
}
