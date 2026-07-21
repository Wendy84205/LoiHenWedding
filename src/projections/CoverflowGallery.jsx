import React from 'react';
import { ArrowLeft, Maximize2 } from 'lucide-react';
import { A11y, Autoplay, EffectCoverflow, Keyboard, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProjectionTransport } from './ProjectionPlayback.jsx';
import { useSwiperProjectionPlayer } from './SwiperProjectionPlayer.jsx';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './coverflowGallery.css';

const SCENE_DURATION = 4200;

const scenes = [
  { image: '/assets/template44/mountain-couple.webp', label: '01', title: 'The beginning' },
  { image: '/assets/template44/sea-couple.webp', label: '02', title: 'Ocean of us' },
  { image: '/assets/template61/couple-close.webp', label: '03', title: 'Closer every day' },
  { image: '/assets/template48-ref/hill-run.png', label: '04', title: 'Run into forever' },
  { image: '/assets/template36-ref/wide-b.jpg', label: '05', title: 'A quiet promise' },
  { image: '/assets/new-templates/thiep-cuoi-30/image-4.jpg', label: '06', title: 'Our next chapter' },
];

function CoverflowGallery() {
  const { player, reducedMotion, swiperEvents } = useSwiperProjectionPlayer({
    length: scenes.length,
    sceneDuration: SCENE_DURATION,
    pageClass: 'projection-coverflow-page',
  });
  const activeScene = scenes[player.activeIndex] || scenes[0];

  return (
    <main className={`coverflowGallery projectionSurface${player.presenting ? ' is-presenting' : ''}${player.controlsVisible ? ' show-controls' : ''}`}>
      <div className="cg-backdrop" style={{ '--cg-image': `url(${activeScene.image})` }} aria-hidden="true" />
      <div className="cg-shade" aria-hidden="true" />

      <header className="cg-header">
        <a href="/dich-vu/trinh-chieu" aria-label="Trở về thư viện trình chiếu" title="Thư viện trình chiếu"><ArrowLeft size={19} /></a>
        <div><span>ALBUM OF LOVE</span><small>MINH QUÂN & KHÁNH AN · 20.12.2027</small></div>
        <button type="button" onClick={player.toggleFullscreen} aria-label="Trình chiếu toàn màn hình" title="Toàn màn hình TV/LED"><Maximize2 size={19} /></button>
      </header>

      <section className="cg-intro" aria-live="polite">
        <span>{activeScene.label} / {String(scenes.length).padStart(2, '0')}</span>
        <h1>{activeScene.title}</h1>
      </section>

      <Swiper
        className="cg-stage"
        modules={[A11y, Autoplay, EffectCoverflow, Keyboard, Pagination]}
        effect="coverflow"
        centeredSlides
        grabCursor
        slidesPerView="auto"
        loop
        speed={reducedMotion ? 0 : 1100}
        keyboard={{ enabled: true }}
        pagination={{ clickable: true }}
        coverflowEffect={{ rotate: 18, stretch: -18, depth: 180, modifier: 1.15, slideShadows: true }}
        autoplay={reducedMotion ? false : { delay: SCENE_DURATION, disableOnInteraction: false, pauseOnMouseEnter: true }}
        a11y={{ prevSlideMessage: 'Ảnh cưới trước', nextSlideMessage: 'Ảnh cưới tiếp theo', paginationBulletMessage: 'Chuyển đến ảnh {{index}}' }}
        {...swiperEvents}
      >
        {scenes.map((scene) => (
          <SwiperSlide key={scene.image}>
            <figure>
              <img src={scene.image} alt={`${scene.title} - album ảnh cưới`} />
              <figcaption><span>{scene.label}</span><strong>{scene.title}</strong></figcaption>
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>

      <ProjectionTransport player={player} label="Coverflow Album of Love" />
    </main>
  );
}

export default CoverflowGallery;
