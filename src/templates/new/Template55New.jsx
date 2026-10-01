import React, { useCallback, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { MusicButton, Reveal, RsvpForm, resolveWeddingCalendar, useInvitationPage } from './NewInvitationCommon.jsx';
import './template55New.css';
import './auditFidelity.css';

const a = '/assets/new-templates/thiep-cuoi-55';

const albumPhotos = Array.from(
  { length: 12 },
  (_, index) => `${a}/album-${String(index + 1).padStart(2, '0')}.jpg`,
);

const weddingDay = 28;
const weddingCalendar = resolveWeddingCalendar({ date: '2027-02-28' });
const lunarNote = 'Tức ngày 23 tháng 01 năm Đinh Mùi';

function CalendarGrid() {
  const cells = useMemo(
    () => [
      ...Array.from({ length: weddingCalendar.offset }, () => null),
      ...Array.from({ length: weddingCalendar.dayCount }, (_, index) => index + 1),
    ],
    [],
  );

  return (
    <div className="t55n-calgrid" aria-hidden="true">
      {cells.map((day, index) => (
        <span className={day === weddingDay ? 'is-wedding' : undefined} key={day ?? `blank-${index}`}>
          {day === weddingDay && <Heart fill="currentColor" strokeWidth={0} />}
          <b>{day ?? ''}</b>
        </span>
      ))}
    </div>
  );
}

function MapButton({ query, children = 'Xem chỉ đường' }) {
  return (
    <a
      className="t55n-map"
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

function InviteCard({ variant, children }) {
  return (
    <Reveal className={`t55n-card t55n-card--${variant}`} direction="up">
      <i className="t55n-cardTrim" aria-hidden="true" />
      <article className="t55n-cardBody">{children}</article>
    </Reveal>
  );
}

export default function Template55New() {
  const count = useInvitationPage('template55new-page', '2027-02-28T10:45:00+07:00');
  const [photoIndex, setPhotoIndex] = useState(0);
  const step = useCallback(
    (delta) => setPhotoIndex((current) => (current + delta + albumPhotos.length) % albumPhotos.length),
    [],
  );
  const labels = ['ngày', 'giờ', 'phút', 'giây'];

  return (
    <main className="new-invitation-page t55n">
      <MusicButton className="t55n-music" />

      <section className="t55n-cover">
        <img className="t55n-spray t55n-spray--right" src={`${a}/flowers-right.png`} alt="" aria-hidden="true" />
        <img className="t55n-envelope" src={`${a}/envelope.png`} alt="" aria-hidden="true" />
        <img className="t55n-spray t55n-spray--left" src={`${a}/flowers-left.png`} alt="" aria-hidden="true" />
        <Reveal className="t55n-guest" direction="fade">
          <small>Trân trọng mời bạn</small>
          <strong>Quý khách</strong>
        </Reveal>
        <Reveal as="img" className="t55n-couple" src={`${a}/couple.jpg`} alt="Minh Quân và Ánh Dương" direction="up" />
        <InviteCard variant="cal">
          <h2>Lễ Vu Quy</h2>
          <p className="t55n-calNames">Minh Quân&nbsp; - Ánh Dương</p>
          <CalendarGrid />
        </InviteCard>
      </section>

      <section className="t55n-first">
        <InviteCard variant="bride">
          <h3>Tham dự tiệc mừng</h3>
          <h4>Lễ Vu Quy</h4>
          <p className="t55n-weekday">Chủ Nhật</p>
          <p className="t55n-dateRow"><span>Tháng 2</span><strong>28</strong><span>2027</span></p>
          <p className="t55n-time">10:45</p>
          <p className="t55n-lunar">{lunarNote}</p>
          <h5>TẠI TƯ GIA NHÀ GÁI</h5>
          <p className="t55n-address">Mai Dịch - Hà Nội</p>
          <MapButton query="Mai Dich, Cau Giay, Ha Noi" />
        </InviteCard>

        <Reveal className="t55n-countdown" direction="fade">
          {labels.map((label, index) => (
            <span key={label}><b>{count[index]}</b><small>{label}</small></span>
          ))}
        </Reveal>

        <img className="t55n-plane" src={`${a}/plane.png`} alt="" aria-hidden="true" />
        <Reveal as="p" className="t55n-only" direction="fade">Chỉ còn...</Reveal>
      </section>


      <section className="t55n-profiles">
        <Reveal as="img" className="t55n-portrait t55n-portrait--groom" src={`${a}/groom.jpg`} alt="Chú rể Minh Quân" direction="right" />
        <InviteCard variant="groom">
          <p className="t55n-hello">Xin Trân trọng giới thiệu!</p>
          <h3>Chú rể</h3>
          <h4>Minh Quân</h4>
          <h4>27.01.2000</h4>
          <p className="t55n-home">TP. Hà Nội</p>
          <blockquote>“Người đàn ông đã độc thân rất lâu và cuối cùng cũng chịu ký vào hợp đồng hôn nhân trọn đời.”</blockquote>
        </InviteCard>
        <InviteCard variant="brideG">
          <p className="t55n-hello">Xin Trân trọng giới thiệu!</p>
          <h3>Cô dâu</h3>
          <h4>Ánh Dương</h4>
          <h4>15.08.2002</h4>
          <p className="t55n-home">TP. Hồ Chí Minh</p>
          <blockquote>“Cô gái xinh đẹp, dịu dàng và là lý do chú rể tự nguyện bỏ cuộc sống độc thân.”</blockquote>
        </InviteCard>
        <Reveal as="img" className="t55n-portrait t55n-portrait--bride" src={`${a}/bride.jpg`} alt="Cô dâu Ánh Dương" direction="left" />
      </section>

      <p className="t55n-together">
        Và hôm nay chúng mình chính thức nắm tay nhau<br />bắt đầu một hành trình mới mang tên gia đình
      </p>

      <section className="t55n-ceremony">
        <img className="t55n-sprig" src={`${a}/flowers-sprig.png`} alt="" aria-hidden="true" />
        <Reveal as="h2" className="t55n-ceremonyTitle" direction="fade">Lễ Thành Hôn</Reveal>
        <InviteCard variant="groomG">
          <p className="t55n-ceremonyLead">Được tổ chức vào</p>
          <p className="t55n-month">Tháng 2</p>
          <p className="t55n-dateRow t55n-dateRow--big"><span>12H00</span><strong>28</strong><span>2027</span></p>
          <p className="t55n-month">Chủ Nhật</p>
          <p className="t55n-lunar">{lunarNote}</p>
          <h5>TẠI TƯ GIA NHÀ TRAI</h5>
          <p className="t55n-address">79 Nguyễn Trãi, Thanh Xuân, Hà Nội</p>
          <MapButton query="79 Nguyen Trai, Thanh Xuan, Ha Noi" />
        </InviteCard>
        <img className="t55n-plane t55n-plane--groom" src={`${a}/plane.png`} alt="" aria-hidden="true" />
      </section>


      <section className="t55n-dress">
        <Reveal as="h2" direction="fade">Dress Code</Reveal>
        <div className="t55n-swatches" aria-hidden="true"><i /><i /><i /><i /></div>
      </section>

      <section className="t55n-rsvp">
        <RsvpForm className="t55n-rsvpCard" accent="#3f695d" />
      </section>

      <section className="t55n-album">
        <Reveal as="img" className="t55n-albumSmall" src={`${a}/album-06.jpg`} alt="Ảnh cưới Minh Quân và Ánh Dương" direction="right" />
        <Reveal className="t55n-albumTitle" direction="fade">
          <em>album</em>
          <i>of</i>
          <em>Love</em>
        </Reveal>
        <Reveal className="t55n-gallery" direction="up">
          <div className="t55n-stage">
            <img src={albumPhotos[photoIndex]} alt={`Album cưới Minh Quân và Ánh Dương ${photoIndex + 1}`} />
            <button type="button" className="t55n-nav t55n-nav--prev" onClick={() => step(-1)} aria-label="Ảnh trước"><ChevronLeft /></button>
            <button type="button" className="t55n-nav t55n-nav--next" onClick={() => step(1)} aria-label="Ảnh tiếp theo"><ChevronRight /></button>
          </div>
          <div className="t55n-thumbs">
            {albumPhotos.map((photo, index) => (
              <button
                type="button"
                key={photo}
                className={index === photoIndex ? 'is-active' : undefined}
                onClick={() => setPhotoIndex(index)}
                aria-label={`Xem ảnh ${index + 1}`}
              >
                <img src={photo} alt="" />
              </button>
            ))}
          </div>
        </Reveal>
        <Reveal as="img" className="t55n-albumWide" src={`${a}/album-03.jpg`} alt="Ảnh cưới Minh Quân và Ánh Dương" direction="up" />
        <div className="t55n-thanks">
          <p>Cảm ơn mọi người đã đến, đã yêu thương<br />và làm ngày hôm nay của chúng mình trọn vẹn hơn.</p>
        </div>
        <img className="t55n-bear" src={`${a}/bear.png`} alt="" aria-hidden="true" />
      </section>
    </main>
  );
}

