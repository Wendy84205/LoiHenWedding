import React from 'react';
import { Heart, Phone } from 'lucide-react';
import { Countdown, GiftNote, MusicButton, Reveal, RsvpForm, VenueLink, WeddingCalendar, WishForm, useInvitationPage } from './NewInvitationCommon.jsx';
import './template7New.css';

const a = '/assets/new-templates/thiep-cuoi-7';

export default function Template7New() {
  const count = useInvitationPage('template7new-page', '2030-05-20T12:00:00+07:00');
  return (
    <main className="new-invitation-page t7n">
      <MusicButton className="t7n-music" />

      {/* Cover */}
      <section className="t7n-hero">
        <i className="t7n-ribbon r1" /><i className="t7n-ribbon r2" /><i className="t7n-ribbon r3" />
        <Reveal className="t7n-intro" direction="down">
          <p>OUR WEDDING | Thiệp Cưới Của Nam &amp; Anh</p>
          <span>From Hanoi with love <Heart fill="currentColor" /></span>
          <b>2030-05-20 12:00</b>
        </Reveal>
        <Reveal as="img" src={`${a}/image-1.jpg`} alt="Minh Anh và Hoàng Nam" direction="scale" />
        <Reveal className="t7n-caption"><h1>WEDDING INVITATION</h1><p>Minh Anh &amp; Hoàng Nam</p></Reveal>
      </section>

      {/* Welcome letter */}
      <section className="t7n-letter">
        <Reveal as="h2" className="t7n-letterTitle">Hiiiii</Reveal>
        <Reveal className="t7n-letterBody">
          <p>Khi bạn nhận được tấm thiệp này, ngày cưới của chúng tớ đã đến rất gần rồi. Giữa hàng vạn ngày trong đời, chúng tớ sẽ hạnh phúc biết bao khi có bạn ở bên vào khoảnh khắc đặc biệt này! 💕</p>
          <p>Lâu lắm rồi không gặp, đám cưới mình nhất định phải tới nha! ❤️</p>
        </Reveal>
      </section>

      {/* Quote */}
      <section className="t7n-quote">
        <Reveal as="blockquote">“Với xác suất gặp nhau chỉ 0.00487,<br />chúng mình đã vượt qua mọi rào cản,<br />cùng nhau bước vào hành trình phiêu lưu kéo dài trọn đời. 💕”</Reveal>
        <img className="t7n-quoteBg" src={`${a}/image-2.jpg`} alt="" aria-hidden="true" />
      </section>

      {/* 【Trọn vẹn】 */}
      <section className="t7n-tronVen">
        <Reveal as="small">【Trọn vẹn】</Reveal>
        <Reveal as="p">Tên của anh chỉ vỏn vẹn vài chữ, dù có rời rạc, chẳng thành câu, nhưng trong tim em luôn ấp ủ, chỉ nguyện bên nhau mãi một đời.</Reveal>
        <div className="t7n-duo">
          <Reveal as="img" src={`${a}/image-4.jpg`} alt="Minh Anh và Hoàng Nam trọn vẹn bên nhau" direction="right" />
          <Reveal as="img" src={`${a}/image-5.jpg`} alt="Khoảnh khắc yêu thương" direction="left" />
        </div>
        <Reveal as="img" className="t7n-wide" src={`${a}/image-6.jpg`} alt="Ngay vui của cặp đôi" direction="up" />
</section>
{/* Story */}
      <section className="t7n-story">
        <Reveal as="p">At this moment,<br />love and being loved happen at the same time.</Reveal>
        <Reveal as="blockquote">“Ngay giây phút này,<br />chúng ta vừa yêu, và vừa được yêu. 💕”</Reveal>
        <Reveal as="img" src={`${a}/image-4.jpg`} alt="Cặp đôi trong studio trắng" />
      </section>

      {/* Countdown */}
      <section className="t7n-count">
        <Countdown values={count} className="t7n-countblock" />
      </section>

      {/* 【Sau tất cả】 */}
      <section className="t7n-sauTatCa">
        <Reveal as="small">【Sau tất cả】</Reveal>
        <Reveal as="p">Không cần một ngày đặc biệt nào cả,<br />vì anh yêu em mỗi phút giây.<br />Tình yêu này chẳng đợi một dịp để bày tỏ,<br />mà luôn hiện hữu mỗi ngày. 💕</Reveal>
        <div className="t7n-duo">
          <Reveal as="img" src={`${a}/image-2.jpg`} alt="Ảnh cưới Minh Anh" direction="right" />
          <Reveal as="img" src={`${a}/image-8.jpg`} alt="Ảnh cưới Hoàng Nam" direction="left" />
        </div>
      </section>

      {/* Names */}
      <section className="t7n-names">
        <Reveal as="h2">Minh Anh<br /><span>Hoàng Nam</span></Reveal>
      </section>

      {/* Quote 2 */}
      <section className="t7n-quote t7n-quote--second">
        <Reveal as="blockquote">“Từ khi gặp em, mỗi giấc mơ của anh đều có em bên cạnh. Mỗi câu yêu thương trong sách anh đọc,<br />đều khiến anh nghĩ về em.”</Reveal>
        <img className="t7n-quoteBg" src={`${a}/image-6.jpg`} alt="" aria-hidden="true" />
      </section>

      {/* 【Dành cho nhau】 */}
      <section className="t7n-danh">
        <Reveal as="small">【Dành cho nhau】</Reveal>
        <Reveal as="p">Giữa hàng vạn người, ta gặp được người mình nên gặp. Giữa hàng vạn năm, trong cõi thời gian hoang hoải, không sớm một bước, cũng chẳng muộn một giây, chỉ vừa vặn tìm thấy nhau.</Reveal>
        <Reveal as="img" className="t7n-wide" src={`${a}/image-5.jpg`} alt="Dành cho nhau" />
      </section>

      {/* Calendar + countdown */}
      <section className="t7n-calendar">
        <WeddingCalendar month="MAY 2030" weddingDay={20} offset={2} />
        <Reveal as="h3">Đang đợi ngày này...</Reveal>
        <Countdown values={count} className="t7n-count2" />
      </section>
{/* Maps Nhà trai / Nhà gái */}
      <section className="t7n-maps">
        <div className="t7n-mapCard"><small>Nhà trai</small><p>Số 3, Quan Hoa, Cầu Giấy, Hà Nội</p><VenueLink query="Quan Hoa Cau Giay Ha Noi">Chỉ đường</VenueLink></div>
        <div className="t7n-mapCard"><small>Nhà gái</small><p>16A, Nguyễn Trãi, Thanh Xuân, Hà Nội</p><VenueLink query="Nguyen Trai Thanh Xuan Ha Noi">Chỉ đường</VenueLink></div>
      </section>

      {/* Closing vow */}
      <section className="t7n-vow">
        <Reveal as="small">【Dành cho nhau】</Reveal>
        <Reveal as="p">Anh không phải điểm cuối của tình yêu,<br />mà là động lực để yêu thương.<br />Vì có anh, em đã yêu thế giới này hơn.</Reveal>
        <Reveal as="img" className="t7n-wide" src={`${a}/image-8.jpg`} alt="Dành cho nhau" />
        <Reveal as="h2">Minh Anh <i>·</i> Hoàng Nam</Reveal>
      </section>

      {/* Message */}
      <section className="t7n-message">
        <Reveal as="h3">Bạn thân mến...</Reveal>
        <Reveal as="p">Nếu bạn đang ở một thành phố khác hoặc bận rộn công việc không thể đến dự, đừng lo, chúng mình đã nhận được lời chúc của bạn rồi nhé.</Reveal>
        <Reveal as="p">Nếu bạn có thời gian, hãy chuẩn bị một tâm trạng vui vẻ và một chiếc bụng đói, rồi thoải mái đến chung vui cùng chúng mình nhé.</Reveal>
        <Reveal as="p">Chúng mình đã chuẩn bị một chút nhạc nhẹ cho buổi lễ, kèm với vài món bánh ngọt và đồ uống. Rất mong bạn ghé qua thưởng thức.</Reveal>
        <Reveal as="p">Sẽ có những góc chụp ảnh cực đẹp tại buổi lễ, mong chờ những bức hình lung linh của bạn đó.</Reveal>
        <Reveal as="p">Hôm đó tụi mình sẽ khá bận rộn, nếu có gì sơ suát mong bạn thông cảm nha.</Reveal>
        <Reveal className="t7n-phones"><small><Phone size={14} /> SĐT cô dâu</small><small><Phone size={14} /> SĐT chú rể</small></Reveal>
      </section>

      {/* RSVP + wishes + gift */}
      <section className="t7n-rsvp">
        <Reveal className="t7n-rsvpNote">Xác nhận tham dự và gửi lời chúc — chúng mình ngọng để nghe từ bạn!</Reveal>
        <RsvpForm className="t7n-rsvp-card" accent="#990400" />
        <WishForm className="t7n-wish" accent="#990400" />
        <GiftNote className="t7n-gift" />
      </section>

      {/* Closing */}
      <section className="t7n-closing">
        <Reveal as="h2">WEDDING INVITATION</Reveal>
        <Reveal as="p">Suốt chặng đường đã qua, lòng chúng mình luôn tràn đầy biết ơn với tình yêu thương và chăm sóc của gia đình, với sự chứng kiến và đồng hàng của bạn bè. Ngày đặc biệt này, cảm ơn vì có bạn bên cạnh, cùng chúng mình bắt đầu hành trình mới.</Reveal>
        <Reveal as="h3">Thankyou!</Reveal>
      </section>
    </main>
  );
}
