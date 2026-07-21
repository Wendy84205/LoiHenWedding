import React from 'react';
import { Heart, Leaf } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template108New.css';
import './auditFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-108';

export default function Template108New() {
  const count = useInvitationPage('template108new-page', '2027-11-28T11:00:00+07:00');
  return (
    <main className="new-invitation-page t108n">
      <MusicButton className="t108n-music" />
      <section className="t108n-hero"><Reveal><small>WEDDING INVITATION · FOREVER LOVE</small><b>囍</b><h1>We&apos;re married!</h1><p>Nguyễn Quốc Long &amp; Phạm Lê Hải Yến</p><span>11:00 · 28.11.2027<br/>TRUNG TÂM TIỆC CƯỚI THE AUTUMN</span></Reveal></section>
      <section className="t108n-autumn"><Reveal as="img" src={`${a}/image-1.jpg`} alt="Quốc Long và Hải Yến giữa rừng thu"/><div><Reveal as="img" direction="right" src={`${a}/image-2.jpg`} alt="Album cưới mùa thu"/><Reveal as="img" direction="left" src={`${a}/image-3.jpg`} alt="Quốc Long và Hải Yến"/></div><Reveal as="p">Chúng tôi rất may mắn được gặp nhau và chúng tôi hợp nhau một cách hoàn hảo.</Reveal></section>
      <section className="t108n-coupleStory"><Reveal className="t108n-person" direction="right"><img src={`${a}/image-1.jpg`} alt="Chú rể Nguyễn Long"/><small>THE GROOM</small><h2>Nguyễn Long</h2><p>Anh sẽ ở bên em cho đến khi chúng ta già đi, và chúng ta sẽ cùng nhau chia sẻ nhiều khoảnh khắc tuyệt vời.</p></Reveal><Reveal className="t108n-person" direction="left"><img src={`${a}/image-2.jpg`} alt="Cô dâu Hải Yến"/><small>THE BRIDE</small><h2>Hải Yến</h2><p>Nếu ai đó hỏi tại sao tôi yêu bạn, câu trả lời chỉ có thể là: vì đó là bạn, vì đó là tôi.</p></Reveal><div className="t108n-miniatures"><Reveal as="img" src={`${a}/image-4.jpg`} alt="Ảnh cưới rừng thu" direction="right"/><Reveal as="img" src={`${a}/image-5.jpg`} alt="Khoảnh khắc mùa thu" direction="up"/><Reveal as="img" src={`${a}/image-6.jpg`} alt="Lễ cưới mùa thu" direction="left"/></div></section>
      <section className="t108n-poem"><Reveal as="img" src={`${a}/image-8.jpg`} alt="Hải Yến trong rừng metasequoia" direction="scale"/><Reveal><p>Bạn giống như những bài thơ của Bắc Đảo, thư pháp của Cố Thành và lời ca của Lý Tông Thịnh, chạm thẳng vào trái tim.</p></Reveal><Reveal as="img" src={`${a}/image-3.jpg`} alt="Quốc Long và Hải Yến giữa sắc thu" direction="right"/><Reveal as="img" src={`${a}/image-4.jpg`} alt="Chặng đường bên nhau" direction="left"/></section>
      <section className="t108n-invite"><Reveal><Leaf/><h2>Trân trọng kính mời</h2><p>Bạn và Người thương tới dự bữa tiệc thân mật</p></Reveal><Reveal className="t108n-date" direction="scale"><span>CHỦ NHẬT<br/>THÁNG 11</span><strong>28</strong><span>NĂM 2027<br/>11:00</span></Reveal><Reveal><h3>THE AUTUMN PALACE</h3><p>48 Lê Văn Lương, Hà Nội</p><VenueLink query="Le Van Luong Ha Noi">Chỉ đường</VenueLink></Reveal></section>
      <section className="t108n-calendar"><Reveal><WeddingCalendar month="NOVEMBER · 2027" weddingDay={28} offset={0}/></Reveal><Countdown values={count} className="t108n-count"/></section>
      <section className="t108n-album"><Reveal as="h2">FLOWER METASEQUOIA</Reveal><div>{['image-4.jpg','image-5.jpg','image-6.jpg','image-8.jpg'].map((image,index)=><Reveal as="img" key={image} direction={index%2?'left':'right'} src={`${a}/${image}`} alt="Album cưới mùa thu"/>)}</div></section>
      <section className="t108n-married"><Reveal as="img" src={`${a}/image-5.jpg`} alt="Chúng mình kết hôn rồi" direction="right"/><Reveal direction="left"><small>WE&apos;RE MARRIED</small><h2>Một phòng, hai người, ba bữa ăn, bốn mùa</h2><p>Cô dâu: Hải Yến<br/>Chú rể: Nguyễn Long</p></Reveal><Reveal as="p">Chúng mình hẹn bạn trong ngày thu đẹp nhất để cùng chứng kiến lời hứa trọn đời.</Reveal></section>
      <section className="t108n-ending"><RsvpForm className="t108n-rsvp" accent="#7b321c"/><GiftNote className="t108n-gift"/><Reveal as="h2"><Heart fill="currentColor"/> Thank you</Reveal></section>
    </main>
  );
}
