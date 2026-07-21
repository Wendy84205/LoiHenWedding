import React, { useRef, useState } from 'react';
import { ArrowLeft, Crop, Maximize2, Scan, Volume2, VolumeX } from 'lucide-react';
import { A11y, Autoplay, EffectFade, Keyboard } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProjectionTransport } from './ProjectionPlayback.jsx';
import { useSwiperProjectionPlayer } from './SwiperProjectionPlayer.jsx';
import 'swiper/css';
import 'swiper/css/effect-fade';
import './cinematicCrossfade.css';

const SCENE_DURATION = 6200;

const scenes = [
  {
    image: '/assets/template44/mountain-couple.webp',
    position: 'center 44%',
    chapter: 'CHƯƠNG I · LẦN ĐẦU GẶP GỠ',
    title: 'Khi hai hành trình gặp nhau',
    line: 'Có những cuộc gặp gỡ rất khẽ, nhưng đủ làm thay đổi cả một đời.',
  },
  {
    image: '/assets/template36-ref/wide-a.jpg',
    position: 'center 42%',
    chapter: 'CHƯƠNG II · NHỮNG NGÀY BÊN NHAU',
    title: 'Mọi bình thường đều hóa dịu dàng',
    line: 'Từ những ngày rất đỗi bình thường, chúng mình đã góp nhặt thành thương nhớ.',
  },
  {
    image: '/assets/template48-ref/lake-run.png',
    position: 'center 52%',
    chapter: 'CHƯƠNG III · CÙNG ĐI THẬT XA',
    title: 'Qua những mùa xanh',
    line: 'Chỉ cần vẫn nắm tay nhau, mọi miền xa đều trở thành nhà.',
  },
  {
    image: '/assets/template44/sea-couple.webp',
    position: 'center 48%',
    chapter: 'CHƯƠNG IV · LỜI HẸN',
    title: 'Từ hôm nay đến mãi về sau',
    line: 'Một lời hẹn được viết bằng yêu thương và được giữ bằng cả cuộc đời.',
  },
  {
    image: '/assets/new-templates/thiep-cuoi-30/image-1.jpg',
    position: 'center 46%',
    chapter: 'CHƯƠNG V · NGÀY CHUNG ĐÔI',
    title: 'Minh Quân & Khánh An',
    line: '20 · 12 · 2027  |  Cảm ơn bạn đã đến và cùng chúng mình lưu giữ ngày vui.',
  },
];

function CinematicCrossfade() {
  const [fitMode, setFitMode] = useState('cover');
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef(null);
  const { player, reducedMotion, swiperEvents } = useSwiperProjectionPlayer({
    length: scenes.length,
    sceneDuration: SCENE_DURATION,
    pageClass: 'projection-crossfade-page',
  });

  const toggleMusic = async () => {
    if (!audioRef.current) return;
    if (musicPlaying) audioRef.current.pause();
    else {
      try {
        await audioRef.current.play();
      } catch {
        return;
      }
    }
    setMusicPlaying((value) => !value);
  };

  return (
    <main className={`cinematicCrossfade projectionSurface fit-${fitMode}${player.presenting ? ' is-presenting' : ''}${player.controlsVisible ? ' show-controls' : ''}`}>
      <audio ref={audioRef} src="/assets/audio/wedding-harp.mp3" loop preload="none" />
      <Swiper
        className="cc-stage"
        modules={[A11y, Autoplay, EffectFade, Keyboard]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={reducedMotion ? 0 : 1800}
        loop
        keyboard={{ enabled: true }}
        autoplay={reducedMotion ? false : { delay: SCENE_DURATION, disableOnInteraction: false, pauseOnMouseEnter: true, waitForTransition: false }}
        a11y={{ prevSlideMessage: 'Ảnh cưới trước', nextSlideMessage: 'Ảnh cưới tiếp theo' }}
        {...swiperEvents}
      >
        {scenes.map((scene, index) => (
          <SwiperSlide key={scene.image}>
            <div className="cc-backdrop" style={{ '--cc-image': `url(${scene.image})`, '--cc-position': scene.position }} aria-hidden="true" />
            <img className="cc-image" src={scene.image} alt={`${scene.title} - ảnh ${index + 1}`} style={{ objectPosition: scene.position }} />
            <div className="cc-shade" aria-hidden="true" />
            <section className="cc-copy">
              <p>{scene.chapter}</p>
              <h1>{scene.title}</h1>
              <span>{scene.line}</span>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="cc-topbar">
        <a href="/dich-vu/trinh-chieu" aria-label="Trở về thư viện trình chiếu" title="Thư viện trình chiếu"><ArrowLeft size={19} /></a>
        <div className="cc-brand"><span>LH</span><small>WEDDING FILMS</small></div>
        <div className="cc-tools">
          <button type="button" onClick={() => setFitMode((value) => value === 'cover' ? 'contain' : 'cover')} aria-label={fitMode === 'cover' ? 'Hiện toàn bộ ảnh' : 'Lấp đầy màn hình'} title={fitMode === 'cover' ? 'Chuyển sang contain' : 'Chuyển sang cover'}>
            {fitMode === 'cover' ? <Scan size={18} /> : <Crop size={18} />}
          </button>
          <button type="button" onClick={toggleMusic} aria-label={musicPlaying ? 'Tắt nhạc' : 'Bật nhạc'} title={musicPlaying ? 'Tắt nhạc' : 'Bật nhạc nền'}>
            {musicPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
          <button type="button" onClick={player.toggleFullscreen} aria-label="Trình chiếu toàn màn hình" title="Toàn màn hình TV/LED"><Maximize2 size={18} /></button>
        </div>
      </div>

      <div className="cc-counter" aria-live="polite"><span>{String(player.activeIndex + 1).padStart(2, '0')}</span><i /><small>{String(scenes.length).padStart(2, '0')}</small></div>
      <ProjectionTransport player={player} label="Cinematic Crossfade" />
    </main>
  );
}

export default CinematicCrossfade;
