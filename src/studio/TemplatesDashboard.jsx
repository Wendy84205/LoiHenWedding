import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Heart,
  Image as ImageIcon,
  LayoutTemplate,
  Play,
  Sparkles,
} from 'lucide-react';
import { StudioFooter, StudioHeader } from './StudioChrome.jsx';
import { currentCatalogSlugs, getInvitationDisplayTitle } from '../data/invitationCatalog.js';
import templateLongThumbnails from './templateLongThumbnails.json';
import './templatesDashboard.css';
import './templatesDashboardRedesign.css';

const FAVORITES_STORAGE_KEY = 'loihen-template-favorites';

const customTitles = {
  'thiep-cuoi-3': 'Hồng Song Hỷ',
  'thiep-cuoi-4': 'Blush Diary',
  'thiep-cuoi-7': 'Ribbon Love',
  'thiep-cuoi-10': 'Black Vow',
  'thiep-cuoi-14': 'Sepia Circle',
  'thiep-cuoi-16': 'Thảo My',
  'thiep-cuoi-27': 'Chứng Kiến Hạnh Phúc',
  'thiep-cuoi-47': 'Hỷ Đỏ',
  'thiep-cuoi-48': 'Mộc Nhiên',
  'thiep-cuoi-55': 'Lãng Mạn',
  'thiep-cuoi-56': 'Khánh Hỷ',
  'thiep-cuoi-122': 'Minimalism Đỏ Đậm',
  'thiep-cuoi-123': 'Minimalism Xanh',
  'thiep-cuoi-124': 'Thanh Diệp Xanh',
  'thiep-cuoi-125': 'Hoa Lan Xanh Rêu',
};

function getPreviewImage(slug) {
  if (templateLongThumbnails[slug]) {
    return templateLongThumbnails[slug];
  }
  if (slug === 'thiep-cuoi-55' || slug === 'thiep-cuoi-56') {
    return `/assets/new-templates/${slug}/preview.jpg`;
  }
  if (slug === 'thiep-cuoi-122') {
    return `/assets/new-templates/${slug}/preview.svg`;
  }
  return `/assets/new-templates/${slug}/preview.webp`;
}

function packageForTemplate(slug) {
  if (slug === 'thiep-cuoi-16') return 'FREE';
  return 'PREMIUM';
}

const allTemplates = currentCatalogSlugs.map((slug) => ({
  slug,
  title: customTitles[slug] || getInvitationDisplayTitle(slug),
  image: getPreviewImage(slug),
  package: packageForTemplate(slug),
}));

const displayedTemplates = allTemplates;

// Cinelove-style CSS scroll preview:
function TemplateCard({ item, favorite, onFavorite }) {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(336);
  const [scrollHeight, setScrollHeight] = useState(0);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerHeight(Math.floor(1.47 * containerRef.current.clientWidth));
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const calculateScroll = useCallback((img) => {
    if (!img || !img.naturalWidth || !img.naturalHeight) return;
    const aspect = img.naturalWidth / img.naturalHeight;
    const renderedH = img.offsetWidth / aspect;
    const delta = Math.max(0, Math.floor(renderedH - containerHeight));
    setScrollHeight(delta);
  }, [containerHeight]);

  const handleImgLoad = useCallback((e) => {
    calculateScroll(e.currentTarget);
  }, [calculateScroll]);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      calculateScroll(imgRef.current);
    }
  }, [calculateScroll, item.image, containerHeight]);

  const scrollDuration = scrollHeight > 0 ? (scrollHeight / 130).toFixed(1) : '10';

  return (
    <article className="tpl-card">
      <div
        ref={containerRef}
        className="tpl-card-media"
        style={{
          '--container-height': `${containerHeight}px`,
          '--image-scroll-height': `${scrollHeight}px`,
          '--scroll-duration': `${scrollDuration}s`,
        }}
      >
        <span className={`tpl-card-package tpl-card-package-${item.package.toLowerCase()}`}>
          {item.package}
        </span>

        <button
          type="button"
          className={`tpl-favorite ${favorite ? 'is-active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onFavorite(item.slug);
          }}
          aria-pressed={favorite}
          aria-label={favorite ? `Bỏ yêu thích mẫu ${item.title}` : `Lưu mẫu ${item.title}`}
        >
          <Heart size={16} fill={favorite ? 'currentColor' : 'none'} />
        </button>

        <div className="tpl-card-img-wrap">
          <img
            ref={imgRef}
            className="tpl-card-preview-img"
            src={item.image}
            alt={`Mẫu ${item.title}`}
            loading="lazy"
            decoding="async"
            onLoad={handleImgLoad}
          />
        </div>

        <div className="tpl-card-hover-overlay">
          <a
            className="tpl-card-btn"
            href={`/template/${item.slug}`}
            aria-label={`Xem mẫu thiệp cưới ${item.title}`}
          >
            Xem mẫu
          </a>
        </div>

        <a
          className="tpl-card-overlay-link"
          href={`/template/${item.slug}`}
          aria-label={`Xem thiệp cưới ${item.title}`}
        />
      </div>

      <div className="tpl-card-foot">
        <p className="tpl-card-name">{item.title}</p>
        <span className={`tpl-card-foot-pkg tpl-card-foot-pkg-${item.package.toLowerCase()}`}>{item.package}</span>
      </div>
    </article>
  );
}

export default function TemplatesDashboard() {
  const [favorites, setFavorites] = useState(() => {
    try { return new Set(JSON.parse(window.localStorage.getItem(FAVORITES_STORAGE_KEY) || '[]')); }
    catch { return new Set(); }
  });

  useEffect(() => {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([...favorites]));
  }, [favorites]);

  const toggleFavorite = (slug) => {
    setFavorites((current) => {
      const next = new Set(current);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  return (
    <main className="tpl-page" id="top">
      <StudioHeader />
      <section className="tpl-hero">
        <div className="tpl-hero-noise" aria-hidden="true" />
        <div className="tpl-hero-text">
          <span>LỜI HẸN STUDIO · WEDDING COLLECTION</span>
          <h1>Mẫu Thiệp Cưới</h1>
          <p>Tôn vinh câu chuyện tình yêu bằng những thiết kế thiệp cưới số chỉn chu, giàu cảm xúc và tinh tế trên mọi màn hình.</p>
          <div className="tpl-hero-points">
            <span><LayoutTemplate size={16} /> 12 mẫu thiệp tuyển chọn</span>
            <span><Sparkles size={16} /> Phong cách tinh tế</span>
            <span><ImageIcon size={16} /> Xem đẹp trên điện thoại</span>
          </div>
          <div className="tpl-hero-actions" id="cta">
            <a href="#thu-vien" className="tpl-cta-primary" aria-label="Khám phá bộ sưu tập mẫu thiệp cưới">
              <Play size={15} /> Khám phá bộ sưu tập
            </a>
          </div>
        </div>
        <div className="tpl-hero-art" aria-hidden="true">
          <div className="tpl-art-card tpl-art-card-one"><img src={templateLongThumbnails['thiep-cuoi-47']} alt="" /></div>
          <div className="tpl-art-card tpl-art-card-two"><img src={templateLongThumbnails['thiep-cuoi-16']} alt="" /></div>
          <div className="tpl-art-orbit">LH<br /><span>STUDIO</span></div>
        </div>
      </section>

      <section className="tpl-browser" id="thu-vien" aria-label="Duyệt mẫu thiệp">
        <div className="tpl-browser-head">
          <div><span>FIND YOUR SIGNATURE STYLE</span><h2>Một thiết kế hợp với câu chuyện của hai bạn?</h2></div>
          <p>Mở từng mẫu thiệp thực tế và lưu lại những thiết kế làm bạn rung động nhất.</p>
        </div>
        {displayedTemplates.length ? (
          <div className="tpl-grid">
            {displayedTemplates.map((item) => (
              <TemplateCard
                key={item.slug}
                item={item}
                favorite={favorites.has(item.slug)}
                onFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="tpl-empty"><LayoutTemplate size={38} /><h2>Chưa có mẫu thiệp</h2></div>
        )}
      </section>

      <section className="tpl-process" id="quy-trinh">
        <div><span>HOW IT WORKS</span><h2>Chọn một mẫu. <em>Phần còn lại, để studio đồng hành.</em></h2></div>
        <ol>
          <li><b>01</b><strong>Xem & chọn mẫu</strong><span>Mở bản xem live, lưu lại phong cách yêu thích và chọn mẫu phù hợp.</span></li>
          <li><b>02</b><strong>Liên hệ Zalo gửi thông tin</strong><span>Gửi tên, ngày cưới, hình ảnh và những mong muốn riêng cho studio.</span></li>
          <li><b>03</b><strong>Nhận thiệp & phát hành link</strong><span>Nhận bản thiệp hoàn thiện để gửi tới những vị khách thân yêu.</span></li>
        </ol>
      </section>
      <StudioFooter />
    </main>
  );
}
