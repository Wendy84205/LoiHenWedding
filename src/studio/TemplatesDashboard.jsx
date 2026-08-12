import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Check,
  ExternalLink,
  Heart,
  Image as ImageIcon,
  LayoutTemplate,
  Search,
  SlidersHorizontal,
  Sparkles,
  WandSparkles,
  X,
} from 'lucide-react';
import { StudioFooter, StudioHeader } from './StudioChrome.jsx';
import { currentCatalogSlugs, getInvitationDisplayTitle } from '../data/invitationCatalog.js';
import { editableTemplateSlugs } from '../commerce/invitationContent.js';
import './templatesDashboard.css';

const FAVORITES_STORAGE_KEY = 'loihen-template-favorites';

const customTitles = {
  'thiep-cuoi-61': 'Nắng Mai', 'thiep-cuoi-39': 'Đỏ Nhung',
  'thiep-cuoi-44': 'Thiên Thanh', 'thiep-cuoi-47': 'Hỷ Đỏ',
  'thiep-cuoi-42': 'Hồng Thư', 'thiep-cuoi-2': 'Lục Ảnh',
  'thiep-cuoi-38': 'Hỷ Duyên', 'thiep-cuoi-46': 'Tơ Hồng',
  'thiep-cuoi-36': 'Mai Anh', 'thiep-cuoi-40': 'Phương Nga',
  'thiep-cuoi-16': 'Thảo My', 'thiep-cuoi-48': 'Mộc Nhiên',
  'thiep-cuoi-19': 'Bảo Anh', 'thiep-cuoi-1': 'Hải Lam',
  'thiep-cuoi-56': 'Khánh Hỷ', 'thiep-cuoi-53': 'Lam Thư',
  'thiep-cuoi-5': 'Valentine Red', 'thiep-cuoi-23': 'Trăng Vườn',
  'thiep-cuoi-7': 'Ribbon Love', 'thiep-cuoi-17': 'Song Hỷ',
  'thiep-cuoi-8': 'Red Scrapbook', 'thiep-cuoi-49': 'Hỷ Vòm',
  'thiep-cuoi-11': 'Love Life', 'thiep-cuoi-28': 'Hoa Trắng',
  'thiep-cuoi-52': 'Nắng Đất', 'thiep-cuoi-60': 'Hồng Phấn',
  'thiep-bw-1': 'Black & White', 'thiep-cuoi-21': 'Hỷ Họa',
  'thiep-cuoi-57': 'Hoàng Hôn', 'thiep-cuoi-31': 'Mono Player',
  'thiep-cuoi-55': 'Mộc Trắng', 'thiep-cuoi-50': 'Kim Thư',
  'thiep-cuoi-30': 'Sơn Ca', 'thiep-cuoi-6': 'Love on Repeat',
  'thiep-cuoi-54': 'Navy Blossom', 'thiep-cuoi-62': 'Palace Night',
  'thiep-cuoi-104': 'Ngày Vui', 'thiep-cuoi-108': 'Autumn Vow',
  'thiep-cuoi-58': 'Dolce Vita', 'thiep-cuoi-4': 'Blush Diary',
  'thiep-cuoi-10': 'Black Vow', 'thiep-cuoi-14': 'Sepia Circle',
  'thiep-cuoi-15': 'Sweet Red', 'thiep-cuoi-18': 'Crimson Profiles',
  'thiep-cuoi-20': 'Scrapbook Song', 'thiep-cuoi-24': 'Cream Letter',
  'thiep-cuoi-26': 'Happy Menu', 'thiep-cuoi-34': 'Pine Hill',
  'thiep-cuoi-37': 'Wine Editorial', 'thiep-cuoi-41': 'Green Envelope',
  'thiep-cuoi-43': 'Đại Hỷ', 'thiep-cuoi-51': 'Forest Gold',
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

const styleSeeds = {
  'Lãng mạn': ['thiep-cuoi-39', 'thiep-cuoi-38', 'thiep-cuoi-46', 'thiep-cuoi-47', 'thiep-cuoi-49', 'thiep-cuoi-57', 'thiep-cuoi-112'],
  'Cinematic': ['thiep-cuoi-44', 'thiep-cuoi-2', 'thiep-cuoi-6', 'thiep-cuoi-30', 'thiep-cuoi-34', 'thiep-cuoi-58', 'thiep-cuoi-67'],
  'Cổ điển': ['thiep-cuoi-11', 'thiep-cuoi-17', 'thiep-cuoi-21', 'thiep-cuoi-42', 'thiep-cuoi-43', 'thiep-cuoi-85', 'thiep-cuoi-tone-xanh'],
  'Tối giản': ['thiep-bw-1', 'thiep-cuoi-10', 'thiep-cuoi-19', 'thiep-cuoi-31', 'thiep-cuoi-37', 'thiep-cuoi-94', 'thiep-cuoi-95', 'thiep-cuoi-99'],
  'Botanical': ['thiep-cuoi-23', 'thiep-cuoi-28', 'thiep-cuoi-48', 'thiep-cuoi-51', 'thiep-cuoi-55', 'thiep-cuoi-73', 'thiep-cuoi-81', 'thiep-cuoi-91', 'thiep-cuoi-105'],
  'Minh hoạ': ['thiep-cuoi-26', 'thiep-cuoi-54', 'thiep-cuoi-62', 'thiep-cuoi-63', 'thiep-cuoi-82', 'thiep-cuoi-104'],
};

const allStyles = ['Lãng mạn', 'Cinematic', 'Cổ điển', 'Tối giản', 'Botanical', 'Minh hoạ'];
const styleBySlug = Object.fromEntries(Object.entries(styleSeeds).flatMap(([style, slugs]) => slugs.map((slug) => [slug, style])));

function getPreviewImage(slug) {
  const png = ['thiep-cuoi-tone-xanh', 'thiep-cuoi-21', 'thiep-cuoi-50', 'thiep-cuoi-54', 'thiep-cuoi-104', 'thiep-cuoi-58', 'thiep-cuoi-60', 'thiep-cuoi-62'];
  const jpg = [
    'thiep-bw-1', 'thiep-cuoi-56', 'thiep-cuoi-17', 'thiep-cuoi-11', 'thiep-cuoi-28', 'thiep-cuoi-49',
    'thiep-cuoi-57', 'thiep-cuoi-51', 'thiep-cuoi-55', 'thiep-cuoi-30', 'thiep-cuoi-6', 'thiep-cuoi-64',
    'thiep-cuoi-67', 'thiep-cuoi-68', 'thiep-cuoi-69', 'thiep-cuoi-81', 'thiep-cuoi-82', 'thiep-cuoi-85',
    'thiep-cuoi-91', 'thiep-cuoi-92', 'thiep-cuoi-94', 'thiep-cuoi-95', 'thiep-cuoi-96', 'thiep-cuoi-99',
    'thiep-cuoi-105', 'thiep-cuoi-112', 'thiep-cuoi-31', 'thiep-cuoi-23', 'thiep-cuoi-18', 'thiep-cuoi-20',
    'thiep-cuoi-24', 'thiep-cuoi-26', 'thiep-cuoi-34', 'thiep-cuoi-37', 'thiep-cuoi-41', 'thiep-cuoi-43',
    'thiep-cuoi-63', 'thiep-cuoi-73',
  ];
  if (png.includes(slug)) return `/assets/new-templates/${slug}/preview.png`;
  if (jpg.includes(slug)) return `/assets/new-templates/${slug}/preview.jpg`;
  return `/assets/new-templates/${slug}/preview.webp`;
}

function styleForSlug(slug) {
  if (styleBySlug[slug]) return styleBySlug[slug];
  const number = Number.parseInt(slug.match(/\d+/)?.[0] || '0', 10);
  return allStyles[number % allStyles.length];
}

function featuresForStyle(style) {
  const defaults = {
    'Lãng mạn': ['Mở thiệp có cảm xúc', 'Album ảnh & lời chúc', 'Lịch cưới và RSVP'],
    Cinematic: ['Hero ảnh toàn màn hình', 'Kể chuyện theo chương', 'Nhạc nền và countdown'],
    'Cổ điển': ['Họa tiết trang trọng', 'Hai lễ & bản đồ', 'QR mừng cưới'],
    'Tối giản': ['Typography rõ ràng', 'Bố cục nhẹ, dễ đọc', 'Tối ưu điện thoại'],
    Botanical: ['Bảng màu thiên nhiên', 'Album nhịp chậm', 'RSVP & chỉ đường'],
    'Minh hoạ': ['Điểm nhấn đồ họa', 'Chuyển động vui tươi', 'Cá nhân hóa linh hoạt'],
  };
  return defaults[style] || defaults.Cinematic;
}

const allTemplates = currentCatalogSlugs.map((slug) => {
  const style = styleForSlug(slug);
  return {
    slug,
    title: customTitles[slug] || getInvitationDisplayTitle(slug),
    style,
    image: getPreviewImage(slug),
    editable: editableTemplateSlugs.includes(slug),
    features: featuresForStyle(style),
  };
});

function TemplateCard({ item, favorite, onFavorite, onQuickView }) {
  const orderHref = item.editable
    ? `/dat-thiep?template=${encodeURIComponent(item.slug)}&source=template-library`
    : `/tu-van?service=Thi%E1%BB%87p+c%C6%B0%E1%BB%9Bi+Online&template=${encodeURIComponent(item.slug)}`;

  return (
    <article className="tpl-card">
      <div className="tpl-card-media">
        <img src={item.image} alt={`Mẫu thiệp ${item.title}`} loading="lazy" />
        <div className="tpl-card-wash" />
        <div className="tpl-card-topline">
          <span className="tpl-card-price">50.000đ</span>
          <button
            type="button"
            className={`tpl-favorite ${favorite ? 'is-active' : ''}`}
            onClick={() => onFavorite(item.slug)}
            aria-pressed={favorite}
            aria-label={favorite ? `Bỏ yêu thích mẫu ${item.title}` : `Lưu mẫu ${item.title}`}
          >
            <Heart size={16} fill={favorite ? 'currentColor' : 'none'} />
          </button>
        </div>
        <div className="tpl-card-actions">
          <button type="button" className="tpl-secondary-action" onClick={() => onQuickView(item)}>
            Xem nhanh
          </button>
          <a href={orderHref} className="tpl-primary-action">
            {item.editable ? 'Dùng mẫu này' : 'Yêu cầu mẫu'} <ArrowRight size={15} />
          </a>
        </div>
      </div>
      <div className="tpl-card-copy">
        <div>
          <span className="tpl-card-style">{item.style}</span>
          <h2>{item.title}</h2>
          <p>{item.editable ? 'Có thể tự chỉnh sửa' : 'Studio hỗ trợ tùy biến'}</p>
        </div>
        <a href={`/template/${item.slug}`} target="_blank" rel="noopener noreferrer" aria-label={`Mở mẫu ${item.title} ở tab mới`} className="tpl-card-preview-link">
          <ExternalLink size={16} />
        </a>
      </div>
    </article>
  );
}

function TemplateQuickView({ item, onClose, favorite, onFavorite }) {
  if (!item) return null;
  const orderHref = item.editable
    ? `/dat-thiep?template=${encodeURIComponent(item.slug)}&source=template-quick-view`
    : `/tu-van?service=Thi%E1%BB%87p+c%C6%B0%E1%BB%9Bi+Online&template=${encodeURIComponent(item.slug)}`;

  return (
    <div className="tpl-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="tpl-modal" role="dialog" aria-modal="true" aria-labelledby="tpl-quick-view-title" onMouseDown={(event) => event.stopPropagation()}>
        <button type="button" className="tpl-modal-close" onClick={onClose} aria-label="Đóng xem nhanh"><X size={20} /></button>
        <div className="tpl-modal-preview"><img src={item.image} alt={`Xem trước mẫu ${item.title}`} /></div>
        <div className="tpl-modal-copy">
          <div className="tpl-modal-eyebrow"><span>50.000đ / mẫu</span><span>{item.style}</span></div>
          <h2 id="tpl-quick-view-title">{item.title}</h2>
          <p>Khởi tạo từ mẫu này rồi thay ảnh, tên, thời gian, địa điểm, bảng màu và các chi tiết riêng cho ngày vui của hai bạn.</p>
          <ul>{item.features.map((feature) => <li key={feature}><Check size={16} /> {feature}</li>)}</ul>
          <div className="tpl-modal-buttons">
            <a href={`/template/${item.slug}`} target="_blank" rel="noopener noreferrer" className="tpl-modal-preview-link"><ExternalLink size={16} /> Xem thiệp mẫu</a>
            <a href={orderHref} className="tpl-modal-create-link"><WandSparkles size={16} /> {item.editable ? 'Bắt đầu tùy chỉnh' : 'Nhận tư vấn thiết kế'}</a>
          </div>
          <button type="button" className={`tpl-modal-save ${favorite ? 'is-active' : ''}`} onClick={() => onFavorite(item.slug)}>
            <Heart size={16} fill={favorite ? 'currentColor' : 'none'} /> {favorite ? 'Đã lưu vào yêu thích' : 'Lưu mẫu để xem lại'}
          </button>
        </div>
      </section>
    </div>
  );
}

export default function TemplatesDashboard() {
  const [activeStyle, setActiveStyle] = useState('Tất cả');
  const [query, setQuery] = useState('');
  const [favoriteOnly, setFavoriteOnly] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    try { return new Set(JSON.parse(window.localStorage.getItem(FAVORITES_STORAGE_KEY) || '[]')); }
    catch { return new Set(); }
  });
  const [quickView, setQuickView] = useState(null);

  useEffect(() => {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([...favorites]));
  }, [favorites]);

  useEffect(() => {
    const closeOnEscape = (event) => { if (event.key === 'Escape') setQuickView(null); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  const filteredTemplates = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('vi-VN');
    return allTemplates.filter((item) => {
      if (activeStyle !== 'Tất cả' && item.style !== activeStyle) return false;
      if (favoriteOnly && !favorites.has(item.slug)) return false;
      if (!normalized) return true;
      return `${item.title} ${item.slug} ${item.style}`.toLocaleLowerCase('vi-VN').includes(normalized);
    });
  }, [activeStyle, favoriteOnly, favorites, query]);

  const toggleFavorite = (slug) => {
    setFavorites((current) => {
      const next = new Set(current);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const clearFilters = () => {
    setActiveStyle('Tất cả');
    setQuery('');
    setFavoriteOnly(false);
  };

  return (
    <main className="tpl-page" id="top">
      <StudioHeader />
      <section className="tpl-hero">
        <div className="tpl-hero-text">
          <span><Sparkles size={15} /> THƯ VIỆN THIỆP CƯỚI ONLINE</span>
          <h1>Tìm một khung hình<br /><em>đúng với câu chuyện của hai bạn.</em></h1>
          <p>Khám phá {allTemplates.length} mẫu thiệp được thiết kế để xem đẹp trên điện thoại. Chọn mẫu, xem trước, rồi cá nhân hóa từng chi tiết theo ngày vui của bạn.</p>
          <div className="tpl-hero-points"><span><LayoutTemplate size={16} /> {allTemplates.length} mẫu có sẵn</span><span><WandSparkles size={16} /> 50.000đ cho mọi mẫu</span><span><ImageIcon size={16} /> Ảnh, nhạc & RSVP</span></div>
        </div>
        <div className="tpl-hero-art" aria-hidden="true">
          <div className="tpl-art-card tpl-art-card-one"><img src="/assets/new-templates/thiep-cuoi-57/preview.jpg" alt="" /></div>
          <div className="tpl-art-card tpl-art-card-two"><img src="/assets/template61/couple-hero.webp" alt="" /></div>
          <div className="tpl-art-orbit">LH<br /><span>STUDIO</span></div>
        </div>
      </section>

      <section className="tpl-browser" aria-label="Duyệt mẫu thiệp">
        <div className="tpl-browser-head">
          <div><span>CHỌN THEO GU CỦA BẠN</span><h2>Mẫu nào làm bạn dừng lại lâu hơn?</h2></div>
          <p>Mở mẫu để cảm nhận hiệu ứng. Khi đã sẵn sàng, bạn có thể bắt đầu bằng nội dung và hình ảnh của riêng mình.</p>
        </div>
        <div className="tpl-filter-panel">
          <label className="tpl-search" htmlFor="template-search"><Search size={18} /><input id="template-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm theo tên hoặc số mẫu..." /><span>{filteredTemplates.length} mẫu</span></label>
          <div className="tpl-filter-row">
            <div className="tpl-filter-group" aria-label="Lọc theo phong cách"><SlidersHorizontal size={16} /><div>{['Tất cả', ...allStyles].map((style) => <button key={style} type="button" onClick={() => setActiveStyle(style)} className={activeStyle === style ? 'is-active' : ''}>{style}</button>)}</div></div>
            <button type="button" className={`tpl-favorite-filter ${favoriteOnly ? 'is-active' : ''}`} onClick={() => setFavoriteOnly((current) => !current)} aria-pressed={favoriteOnly}><Heart size={16} fill={favoriteOnly ? 'currentColor' : 'none'} /> Đã lưu{favorites.size ? ` (${favorites.size})` : ''}</button>
          </div>
        </div>

        {filteredTemplates.length ? (
          <div className="tpl-grid">
            {filteredTemplates.map((item) => <TemplateCard key={item.slug} item={item} favorite={favorites.has(item.slug)} onFavorite={toggleFavorite} onQuickView={setQuickView} />)}
          </div>
        ) : (
          <div className="tpl-empty"><LayoutTemplate size={38} /><h2>Chưa tìm thấy mẫu phù hợp</h2><p>Thử đổi từ khóa, phong cách hoặc bộ lọc gói để xem thêm lựa chọn.</p><button type="button" onClick={clearFilters}>Xóa bộ lọc</button></div>
        )}
      </section>

      <section className="tpl-process">
        <div><span>QUY TRÌNH BẮT ĐẦU</span><h2>Chọn một mẫu. <em>Rồi biến nó thành của hai bạn.</em></h2></div>
        <ol>
          <li><b>01</b><strong>Xem & chọn mẫu</strong><span>Mở bản mẫu, lưu phong cách yêu thích và quyết định mẫu phù hợp.</span></li>
          <li><b>02</b><strong>Tự chỉnh sửa</strong><span>Đăng nhập để thay ảnh, chữ, nhạc, QR và RSVP; bạn luôn có thể xem trước trên điện thoại.</span></li>
          <li><b>03</b><strong>Quét QR & xuất bản</strong><span>Khi thiệp đã hoàn thiện, quét QR thanh toán 50.000đ để mở nút phát hành và gửi link khách mời.</span></li>
        </ol>
      </section>
      <StudioFooter />
      <TemplateQuickView item={quickView} onClose={() => setQuickView(null)} favorite={quickView ? favorites.has(quickView.slug) : false} onFavorite={toggleFavorite} />
    </main>
  );
}
