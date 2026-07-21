import React, { useState } from 'react';
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Expand,
  Gem,
  GlassWater,
  Heart,
} from 'lucide-react';
import {
  Countdown,
  MusicButton,
  Reveal,
  RsvpForm,
  VenueLink,
  WeddingCalendar,
  useInvitationPage,
} from './NewInvitationCommon.jsx';
import './template53New.css';
import './structureFidelity.css';

const assetRoot = '/assets/new-templates/thiep-cuoi-53';
const gallery = ['image-5.jpg', 'image-6.webp', 'image-7.webp', 'image-8.webp', 'image-4.webp'];

function EventDate({ title, time, venue, place, mapQuery }) {
  return (
    <Reveal className="t53n-eventCard">
      <h3>{title}</h3>
      <p>VÀO {time}, CHỦ NHẬT</p>
      <div className="t53n-dateLine">
        <span>THÁNG 02</span>
        <b>28</b>
        <span>NĂM 2027</span>
      </div>
      <small>(Ngày tổ chức: 28 tháng 02 năm 2027)</small>
      <h4>{venue}</h4>
      <em>{place}</em>
      <VenueLink query={mapQuery}>CHỈ ĐƯỜNG</VenueLink>
    </Reveal>
  );
}

export default function Template53New() {
  const count = useInvitationPage('template53new-page', '2027-02-28T17:30:00+07:00');
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [photo, setPhoto] = useState(0);

  const showPrevious = () => setPhoto((photo - 1 + gallery.length) % gallery.length);
  const showNext = () => setPhoto((photo + 1) % gallery.length);

  return (
    <main className="new-invitation-page t53n">
      <MusicButton className="t53n-music" />

      <section className="t53n-hero">
        <Reveal as="p" direction="down" className="t53n-ceremony">Lễ Vu Quy</Reveal>
        <Reveal as="h1" direction="scale" className="t53n-heroNames">
          <span>Tuấn Minh</span><i>&amp;</i><span>Mai Trang</span>
        </Reveal>
        <Reveal className="t53n-meta" direction="fade">
          <span>28 THÁNG 02<br /><b>2027</b></span>
          <span>17:30<br /><b>CHỦ NHẬT</b></span>
          <span>NHÀ HÀNG SEN VÀNG<br /><b>QUỐC OAI - HÀ NỘI</b></span>
        </Reveal>
        <Reveal as="img" src={`${assetRoot}/image-2.jpg`} alt="Tuấn Minh và Mai Trang" />
        <Reveal className="t53n-heroDate">
          <b>28.02.2027</b>
          <p>“Chúng ta đã cùng nhau đi qua nhiều thăng trầm, để nhận ra rằng được ở bên nhau là điều quý giá nhất.<br />Hôm nay, trước sự chứng kiến của mọi người, từ khoảnh khắc này chúng mình sẽ cùng nhau viết tiếp câu chuyện yêu thương.”</p>
        </Reveal>
      </section>

      <section className="t53n-envelopeSection" aria-label="Thiệp mời trong phong bì">
        <Reveal direction="scale" className="t53n-envelopeReveal">
          <button
            type="button"
            className={`t53n-envelopeShape ${envelopeOpen ? 'is-open' : ''}`}
            aria-expanded={envelopeOpen}
            aria-label={envelopeOpen ? 'Đóng phong bì' : 'Mở phong bì'}
            onClick={() => setEnvelopeOpen((open) => !open)}
          >
            <span className="t53n-envelopeBack" aria-hidden="true" />
            <span className="t53n-envelopeLetter" aria-hidden="true">
              <img src={`${assetRoot}/image-3.jpg`} alt="" />
              <i><Heart fill="currentColor" /></i>
            </span>
            <span className="t53n-envelopeFlap" aria-hidden="true" />
            <span className="t53n-envelopePocket" aria-hidden="true" />
            <span className="t53n-envelopeSeal" aria-hidden="true">TM</span>
          </button>
        </Reveal>

        <div className="t53n-families">
          <Reveal direction="right">
            <h2>Nhà Trai</h2>
            <p>Bố: Phùng Văn Minh<br />Mẹ: Nguyễn Thị Vân</p>
            <small>Hà Nội</small>
          </Reveal>
          <Reveal direction="left">
            <h2>Nhà Gái</h2>
            <p>Bố: Trần Văn Hải<br />Mẹ: Hoàng Yến</p>
            <small>Ninh Bình</small>
          </Reveal>
        </div>

        <Reveal as="h2" className="t53n-inviteNames" direction="scale">
          <span>Tuấn Minh</span><small>and</small><span>Mai Trang</span>
        </Reveal>
        <Reveal as="p" className="t53n-inviteLine">Trân trọng mời Bạn</Reveal>
      </section>

      <section className="t53n-event">
        <EventDate title="Dự Lễ Vu Quy" time="08:00" venue="TƯ GIA NHÀ GÁI" place="HÀ NỘI" mapQuery="Quốc Oai Hà Nội" />
        <EventDate title="Dự Bữa Tiệc Thân Mật" time="17:30" venue="NHÀ HÀNG SEN VÀNG" place="Quốc Oai - Hà Nội" mapQuery="Nhà hàng Sen Vàng Quốc Oai Hà Nội" />
      </section>

      <section className="t53n-timeline">
        <Reveal as="h2">Timeline</Reveal>
        <div className="t53n-timelineItems">
          <Reveal><Gem /><b>08:00</b><span>Lễ thành hôn</span></Reveal>
          <Reveal delay={0.12}><Camera /><b>10:30</b><span>Check-in</span></Reveal>
          <Reveal delay={0.24}><GlassWater /><b>11:00</b><span>Khai tiệc</span></Reveal>
        </div>
        <Reveal as="h3">Dresscode</Reveal>
        <Reveal className="t53n-swatches" direction="scale"><i /><i /><i /><i /></Reveal>
        <Reveal as="p" className="t53n-dressNote">Rất mong bạn có thể sắp xếp tới sớm để chụp thật nhiều ảnh kỷ niệm cùng chúng mình nhé!</Reveal>
      </section>

      <section className="t53n-story">
        <Reveal className="t53n-portraits">
          <article><img src={`${assetRoot}/image-5.jpg`} alt="Chú rể Tuấn Minh" /><i>Chú rể</i><b>Tuấn Minh</b><small>16.01.2000</small></article>
          <article><img src={`${assetRoot}/image-5.jpg`} alt="Cô dâu Mai Trang" /><i>Cô dâu</i><b>Mai Trang</b><small>28.01.2002</small></article>
          <Heart className="t53n-storyHeart" fill="currentColor" aria-hidden="true" />
        </Reveal>
        <Reveal className="t53n-storyCopy">
          <h2>Chuyện kể rằng.....</h2>
          <p><b>Minh &amp; Trang!</b><br />Chúng mình gặp nhau từ những ngày còn ngồi học chung ở cấp 3. Khi ấy chỉ là những buổi học nhóm, những câu chuyện nhỏ xíu của tuổi học trò, nhưng không ngờ lại gieo nên một tình cảm theo chúng mình đến tận hôm nay. Qua thời gian, chúng mình trưởng thành cùng nhau, đi qua nhiều thay đổi, và cuối cùng nhận ra: người mình muốn ở cạnh nhất... vẫn là người bạn học năm nào.</p>
          <p>Và hôm nay, chúng mình quyết định viết tiếp câu chuyện ấy bằng một lời hứa chung đường, chung nhà, chung tương lai.</p>
        </Reveal>
      </section>

      <section className="t53n-dateAlbum">
        <Reveal className="t53n-calendarStage">
          <span className="t53n-month">Tháng 2</span>
          <img src={`${assetRoot}/image-3.jpg`} alt="Khoảnh khắc cô dâu chú rể" />
          <WeddingCalendar month="" date="2027-02-28" weddingDay={28} />
          <em>Chỉ còn......</em>
        </Reveal>
        <Countdown values={count} className="t53n-count" duration={1.35} />

        <Reveal className="t53n-memoryTitle">
          <img src={`${assetRoot}/image-4.webp`} alt="Kỷ niệm của chúng mình" />
          <p><b>Kỷ niệm</b><small>của</small><span>Chúng mình</span></p>
        </Reveal>

        <Reveal className="t53n-slider">
          <div className="t53n-mainPhoto">
            <img src={`${assetRoot}/${gallery[photo]}`} alt={`Ảnh album cưới ${photo + 1}`} />
            <Expand aria-hidden="true" />
            <button type="button" onClick={showPrevious} aria-label="Ảnh trước"><ChevronLeft /></button>
            <button type="button" onClick={showNext} aria-label="Ảnh tiếp theo"><ChevronRight /></button>
          </div>
          <div className="t53n-thumbnails">
            {gallery.map((item, index) => (
              <button
                type="button"
                aria-label={`Xem ảnh album ${index + 1}`}
                aria-current={index === photo ? 'true' : undefined}
                className={index === photo ? 'is-active' : ''}
                onClick={() => setPhoto(index)}
                key={item}
              >
                <img src={`${assetRoot}/${item}`} alt="" />
              </button>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="t53n-ending">
        <Reveal as="p" className="t53n-rsvpNote">Đừng quên gửi xác nhận tham dự để chúng mình có thể đón tiếp được chu đáo hơn</Reveal>
        <RsvpForm className="t53n-rsvp" accent="#4870a3" />
        <Reveal className="t53n-gift" direction="scale">
          <span><Heart fill="currentColor" /></span>
          <h2>Gửi mừng cưới</h2>
        </Reveal>
        <Reveal className="t53n-thanks">
          <img src={`${assetRoot}/image-2.jpg`} alt="Lời cảm ơn của Tuấn Minh và Mai Trang" />
          <div>
            <p>Cảm ơn bạn đã dành tình cảm cho chúng mình!</p>
            <p>Sự hiện diện của bạn chính là món quà ý nghĩa nhất, và chúng mình vô cùng trân quý khi được cùng bạn chia sẻ niềm hạnh phúc trong ngày trọng đại này.</p>
            <b>Thankyou!</b>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
