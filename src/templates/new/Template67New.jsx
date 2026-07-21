import React from 'react';
import { Heart, MapPin } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template67New.css';
import './auditFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-67';

export default function Template67New() {
  const count = useInvitationPage('template67new-page', '2027-11-28T11:00:00+07:00');
  return <main className="new-invitation-page t67n">
    <h1 className="visually-hidden">Thiệp cưới online mẫu 67</h1>
    <MusicButton className="t67n-music" />
    <section className="t67n-hero"><Reveal as="img" className="t67n-weddingMark" src={`${a}/wedding-mark.png`} alt="Wedding" direction="down" /><Reveal as="img" className="t67n-illustration" src={`${a}/illustration-couple.png`} alt="Minh họa cô dâu chú rể" direction="up" /><Reveal as="img" className="t67n-welcomeMark" src={`${a}/welcome-wedding.png`} alt="Welcome to our wedding" direction="scale" /></section>
    <section className="t67n-intro"><Reveal><small>PHOTOGRAPH</small><h2>Tình yêu là hành trình</h2><p>Vượt ngàn dặm để tìm đến nhau, là lời hẹn ước vĩnh cửu như dải Möbius không điểm kết thúc.</p></Reveal><Heart fill="currentColor" /></section>
    <section className="t67n-love"><Reveal as="img" src={`${a}/image-2.webp`} alt="Hải Nam và Vân Anh" direction="up" /><Reveal><h2>Tình yêu đích thực</h2><i>-</i><p>Không có thời gian hay địa điểm. Nó đến một cách ngẫu nhiên, trong một khoảnh khắc thoáng qua, rộn ràng như nhịp tim.</p><b>Điều tuyệt vời nhất là yêu và được yêu.</b></Reveal></section>
    <section className="t67n-couple"><Reveal direction="right"><img src={`${a}/image-3.webp`} alt="Chú rể Hải Nam" /><small>/ CHÚ RỂ /</small><h3>Nguyễn Hải Nam</h3></Reveal><Reveal className="t67n-coupleQuote"><img src={`${a}/wedding-mark.png`} alt="" /><p>Giữa muôn vàn cách nở rộ của vũ trụ, chỉ mình em là điều anh nguyện gìn giữ.</p></Reveal><Reveal direction="left"><img src={`${a}/image-1.webp`} alt="Cô dâu Vân Anh" /><small>/ CÔ DÂU /</small><h3>Lê Vân Anh</h3></Reveal></section>
    <section className="t67n-story"><Reveal direction="right"><h2>In the flow of time</h2><p>Trong dòng chảy thời gian, tình yêu là điều duy nhất trường tồn. Trên hành trình dài của cuộc đời, điều quan trọng nhất luôn là người sát cánh bên mình, cùng sẻ chia niềm vui và nỗi buồn.</p></Reveal><Reveal as="img" src={`${a}/image-2.webp`} alt="Two hearts one forever" direction="left" /><Reveal as="p" className="t67n-storyEnd">Two hearts<br /><b>one forever</b></Reveal></section>
    <section className="t67n-vows"><Reveal as="h2">ONLY YOU</Reveal><Reveal className="t67n-vowRow" direction="right"><img src={`${a}/image-4.webp`} alt="Khoảnh khắc của Hải Nam và Vân Anh" /><p>Từ hôm nay, chúng mình cùng nhau viết tiếp những chương mới. Không cần lời hứa xa xôi, chỉ cần mỗi ngày đều chọn ở lại bên nhau.</p></Reveal><Reveal className="t67n-vowPair"><img src={`${a}/image-5.webp`} alt="Hải Nam trong ngày cưới" /><img src={`${a}/image-6.webp`} alt="Vân Anh trong ngày cưới" /></Reveal><Reveal as="p" className="t67n-vowEnd">Everything I love<br /><b>becomes our forever.</b></Reveal></section>
    <section className="t67n-map"><MapPin /><Reveal><small>WEDDING VENUE</small><h2>CineLove Garden</h2><p>48 Lê Văn Lương, Hà Nội<br />11:00 · Chủ Nhật</p><VenueLink query="48 Le Van Luong Hanoi">Xem bản đồ</VenueLink></Reveal></section>
    <section className="t67n-day"><WeddingCalendar month="NOVEMBER · 2027" weddingDay={28} offset={0} /><Countdown values={count} className="t67n-count" /></section>
    <section className="t67n-album"><Reveal as="img" src={`${a}/image-5.webp`} alt="Album cưới Hải Nam và Vân Anh" direction="right" /><Reveal as="img" src={`${a}/image-6.webp`} alt="Khoảnh khắc của Hải Nam và Vân Anh" direction="left" /></section>
    <section className="t67n-end"><RsvpForm accent="#881100" className="t67n-rsvp" /><GiftNote className="t67n-gift" /><Reveal as="h2">Photograph of love</Reveal></section>
  </main>;
}
