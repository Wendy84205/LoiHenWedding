import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Image as ImageIcon,
  LayoutTemplate,
  Play,
  Sparkles,
} from 'lucide-react';
import { StudioFooter, StudioHeader } from './StudioChrome.jsx';
import { currentCatalogSlugs, getInvitationDisplayTitle } from '../data/invitationCatalog.js';
import { editableTemplateSlugs } from '../commerce/invitationContent.js';
import { newTemplateSlugs } from '../templates/new/NewTemplateRouter.jsx';
import { legacyTemplateSlugs } from '../templates/legacyTemplateRegistry.js';
import templateLongThumbnails from './templateLongThumbnails.json';
import './templatesDashboard.css';
import './templatesDashboardRedesign.css';

const FAVORITES_STORAGE_KEY = 'loihen-template-favorites';

const customTitles = {
  'thiep-cuoi-61': 'Nắng Mai', 'thiep-cuoi-39': 'Đỏ Nhung',
  'thiep-cuoi-47': 'Hỷ Đỏ',
  'thiep-cuoi-2': 'Lục Ảnh',
  'thiep-cuoi-38': 'Hỷ Duyên', 'thiep-cuoi-46': 'Tơ Hồng',
  'thiep-cuoi-36': 'Mai Anh', 'thiep-cuoi-40': 'Phương Nga',
  'thiep-cuoi-16': 'Thảo My', 'thiep-cuoi-48': 'Mộc Nhiên',
  'thiep-cuoi-19': 'Bảo Anh', 'thiep-cuoi-1': 'Hải Lam',
  'thiep-cuoi-56': 'Khánh Hỷ', 'thiep-cuoi-53': 'Lam Thư',
  'thiep-cuoi-5': 'Valentine Red', 'thiep-cuoi-23': 'Trăng Vườn',
  'thiep-cuoi-7': 'Ribbon Love', 'thiep-cuoi-17': 'Song Hỷ',
  'thiep-cuoi-8': 'Red Scrapbook', 'thiep-cuoi-49': 'Hỷ Vòm',
  'thiep-cuoi-11': 'Love Life', 'thiep-cuoi-28': 'Hoa Trắng',
  'thiep-bw-1': 'Black & White', 'thiep-cuoi-21': 'Hỷ Họa',
  'thiep-cuoi-57': 'Hoàng Hôn', 'thiep-cuoi-31': 'Mono Player',
  'thiep-cuoi-30': 'Sơn Ca', 'thiep-cuoi-6': 'Love on Repeat',
  'thiep-cuoi-54': 'Navy Blossom', 'thiep-cuoi-62': 'Palace Night',
  'thiep-cuoi-104': 'Ngày Vui', 'thiep-cuoi-108': 'Autumn Vow',
  'thiep-cuoi-58': 'Dolce Vita', 'thiep-cuoi-4': 'Blush Diary',
  'thiep-cuoi-10': 'Black Vow', 'thiep-cuoi-14': 'Sepia Circle',
  'thiep-cuoi-15': 'Sweet Red', 'thiep-cuoi-18': 'Crimson Profiles',
  'thiep-cuoi-20': 'Scrapbook Song', 'thiep-cuoi-24': 'Cream Letter',
  'thiep-cuoi-26': 'Happy Menu', 'thiep-cuoi-34': 'Pine Hill',
  'thiep-cuoi-37': 'Wine Editorial', 'thiep-cuoi-41': 'Green Envelope',
  'thiep-cuoi-51': 'Forest Gold',
  'thiep-cuoi-63': 'Ever & Forever', 'thiep-cuoi-64': 'Wedding Playlist',
  'thiep-cuoi-67': 'Photograph', 'thiep-cuoi-68': 'Blessing Begins',
  'thiep-cuoi-69': 'After Dark', 'thiep-cuoi-73': 'Forest Letter',
  'thiep-cuoi-81': 'Garden Formal', 'thiep-cuoi-82': 'Pastel Couple',
  'thiep-cuoi-85': 'Red Heritage', 'thiep-cuoi-91': 'Winter Garden',
  'thiep-cuoi-92': 'Forever Train', 'thiep-cuoi-94': 'Mono Manifesto',
  'thiep-cuoi-95': 'Modern Type', 'thiep-cuoi-96': 'Blush Stationery',
  'thiep-cuoi-99': 'Modern Grid', 'thiep-cuoi-105': 'Seed of Love',
  'thiep-cuoi-112': 'Burgundy Ceremony', 'thiep-cuoi-tone-xanh': 'Hỷ Xanh',
};

const allStyles = ['Lãng mạn', 'Cinematic', 'Cổ điển', 'Tối giản', 'Botanical', 'Minh hoạ'];

function getPreviewImage(slug) {
  if (templateLongThumbnails[slug]) {
    return templateLongThumbnails[slug];
  }
  if (slug === 'thiep-cuoi-2') return '/assets/template61/couple-hero.webp';
  const png = ['thiep-cuoi-tone-xanh', 'thiep-cuoi-21', 'thiep-cuoi-54', 'thiep-cuoi-104', 'thiep-cuoi-58', 'thiep-cuoi-62'];
  const jpg = [
    'thiep-bw-1', 'thiep-cuoi-56', 'thiep-cuoi-17', 'thiep-cuoi-11', 'thiep-cuoi-28', 'thiep-cuoi-49',
    'thiep-cuoi-57', 'thiep-cuoi-51', 'thiep-cuoi-55', 'thiep-cuoi-30', 'thiep-cuoi-64',
    'thiep-cuoi-67', 'thiep-cuoi-68', 'thiep-cuoi-69', 'thiep-cuoi-81', 'thiep-cuoi-82', 'thiep-cuoi-85',
    'thiep-cuoi-91', 'thiep-cuoi-92', 'thiep-cuoi-94', 'thiep-cuoi-95', 'thiep-cuoi-96', 'thiep-cuoi-99',
    'thiep-cuoi-105', 'thiep-cuoi-112', 'thiep-cuoi-31', 'thiep-cuoi-23', 'thiep-cuoi-18', 'thiep-cuoi-20',
    'thiep-cuoi-24', 'thiep-cuoi-26', 'thiep-cuoi-34', 'thiep-cuoi-37', 'thiep-cuoi-41',
    'thiep-cuoi-63', 'thiep-cuoi-73',
  ];
  if (png.includes(slug)) return `/assets/new-templates/${slug}/preview.png`;
  if (jpg.includes(slug)) return `/assets/new-templates/${slug}/preview.jpg`;
  return `/assets/new-templates/${slug}/preview.webp`;
}

function packageForTemplate(slug, editable) {
  if (slug === 'thiep-cuoi-16' || slug === 'thiep-cuoi-19' || slug === 'thiep-cuoi-5' || slug === 'thiep-cuoi-23') return 'FREE';
  return editable ? 'PREMIUM' : 'BASIC';
}

const viewableTemplateSlugs = new Set([...newTemplateSlugs, ...legacyTemplateSlugs]);
// Templates temporarily hidden from the public browsing grid.
const hiddenForEditingTemplateSlugs = new Set([]);

const allTemplates = currentCatalogSlugs
  .filter((slug) => viewableTemplateSlugs.has(slug) && !hiddenForEditingTemplateSlugs.has(slug))
  .map((slug) => {
  return {
    slug,
    title: customTitles[slug] || getInvitationDisplayTitle(slug),
    image: getPreviewImage(slug),
    editable: editableTemplateSlugs.includes(slug),
    package: packageForTemplate(slug, editableTemplateSlugs.includes(slug)),
  };
});

const displayedTemplates = allTemplates;

// Cinelove-style CSS scroll preview:
// The card clips a tall full-length preview image.
// On hover, CSS translation smoothly slides the image upwards over --scroll-duration
// so the user can preview the entire invitation from top to bottom.
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

  // Scroll duration calculated proportionally: ~130px per second for smooth, readable scrolling
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
        {/* Badge */}
        <span className={`tpl-card-package tpl-card-package-${item.package.toLowerCase()}`}>
          {item.package}
        </span>

        {/* Favorite */}
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

        {/* Long preview image */}
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

        {/* Hover overlay with button */}
        <div className="tpl-card-hover-overlay">
          <a
            className="tpl-card-btn"
            href={`/template/${item.slug}`}
            aria-label={`Xem mẫu thiệp cưới ${item.title}`}
          >
            Xem mẫu
          </a>
        </div>

        {/* Clickable transparent overlay link */}
        <a
          className="tpl-card-overlay-link"
          href={`/template/${item.slug}`}
          aria-label={`Xem thiệp cưới ${item.title}`}
        />
      </div>

      {/* Card footer: title + package */}
      <div className="tpl-card-foot">
        <p className="tpl-card-name">{item.title}</p>
        <span className={`tpl-card-foot-pkg tpl-card-foot-pkg-${item.package.toLowerCase()}`}>{item.package}</span>
      </div>
    </article>
  );
}


export default function TemplatesDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState(() => {
    try { return new Set(JSON.parse(window.localStorage.getItem(FAVORITES_STORAGE_KEY) || '[]')); }
    catch { return new Set(); }
  });

  useEffect(() => {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([...favorites]));
  }, [favorites]);

  const pageSize = 15;
  const pageCount = Math.ceil(displayedTemplates.length / pageSize);
  const visibleTemplates = displayedTemplates.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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
            <span><LayoutTemplate size={16} /> {allTemplates.length} mẫu thiệp riêng</span>
            <span><Sparkles size={16} /> {allStyles.length} phong cách</span>
            <span><ImageIcon size={16} /> Xem đẹp trên điện thoại</span>
          </div>
          <div className="tpl-hero-actions" id="cta">
            <a href="#thu-vien" className="tpl-cta-primary" aria-label="Khám phá bộ sưu tập mẫu thiệp cưới">
              <Play size={15} /> Khám phá bộ sưu tập
            </a>
            <a href="#quy-trinh" className="tpl-cta-secondary" aria-label="Xem cách chọn mẫu thiệp">
              Cách chọn mẫu <ChevronRight size={15} />
            </a>
          </div>
        </div>
        <div className="tpl-hero-art" aria-hidden="true">
          <div className="tpl-art-card tpl-art-card-one"><img src="/assets/new-templates/thiep-cuoi-57/preview.jpg" alt="" /></div>
          <div className="tpl-art-card tpl-art-card-two"><img src="/assets/template61/couple-hero.webp" alt="" /></div>
          <div className="tpl-art-orbit">LH<br /><span>STUDIO</span></div>
        </div>
      </section>

      <section className="tpl-browser" id="thu-vien" aria-label="Duyệt mẫu thiệp">
        <div className="tpl-browser-head">
           <div><span>FIND YOUR SIGNATURE STYLE</span><h2>Một thiết kế hợp với câu chuyện của hai bạn?</h2></div>
          <p>Chọn theo phong cách, mở từng mẫu thiệp thực tế và lưu lại những thiết kế làm bạn rung động nhất.</p>
        </div>
        {displayedTemplates.length ? (
          <>
            <div className="tpl-grid">
              {visibleTemplates.map((item) => <TemplateCard key={item.slug} item={item} favorite={favorites.has(item.slug)} onFavorite={toggleFavorite} />)}
            </div>
            {pageCount > 1 && <nav className="tpl-pagination" aria-label="Phân trang thiệp">
              <button type="button" aria-label="Trang trước" onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} disabled={currentPage === 1}><ChevronLeft size={16} /></button>
              {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => <button key={page} type="button" aria-label={`Trang ${page}`} aria-current={currentPage === page ? 'page' : undefined} onClick={() => setCurrentPage(page)}>{page}</button>)}
              <button type="button" aria-label="Trang sau" onClick={() => setCurrentPage((page) => Math.min(pageCount, page + 1))} disabled={currentPage === pageCount}><ChevronRight size={16} /></button>
            </nav>}
          </>
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
