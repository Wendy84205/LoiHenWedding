import React, { useMemo, useState } from 'react';
import {
  Search,
  Eye,
  Heart,
  Copy,
  Check,
  ExternalLink,
  Home,
  ChevronRight,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { StudioFooter } from './StudioChrome.jsx';
import { currentCatalogSlugs, getInvitationDisplayTitle } from '../data/invitationCatalog.js';
import { editableTemplateSlugs } from '../commerce/invitationContent.js';
import './templatesDashboard.css';

/* ── Header ────────────────────────────────────────────────── */
function TplHeader() {
  return (
    <header className="tpl-header">
      <a className="tpl-header-brand" href="/" aria-label="Lời Hẹn Studio">
        <div className="tpl-header-brand-icon">LH</div>
        <span className="tpl-header-brand-name">
          Lời Hẹn <em>Studio</em>
        </span>
      </a>

      <nav className="tpl-header-nav" aria-label="Điều hướng chính">
        <a href="/">Trang chủ</a>
        <a href="/mau-thiep" className="active">Mẫu thiệp</a>
        <a href="/dich-vu/thiep-cuoi-online">Dịch vụ</a>
        <a href="/dich-vu/trinh-chieu">Trình chiếu</a>
        <a href="/tu-van">Liên hệ</a>
        <a href="/dat-thiep">Tạo thiệp trọn gói</a>
      </nav>

      <div className="tpl-header-actions">
        <a href="/tai-khoan" className="tpl-header-login">Đăng nhập</a>
        <a href="/dat-thiep" className="tpl-header-register">Đăng ký</a>
      </div>
    </header>
  );
}

/* ── Data ──────────────────────────────────────────────────── */
const premiumSlugs = new Set([
  'thiep-cuoi-61', 'thiep-cuoi-39', 'thiep-cuoi-44', 'thiep-cuoi-47',
  'thiep-cuoi-42', 'thiep-cuoi-2', 'thiep-cuoi-38', 'thiep-cuoi-46',
  'thiep-cuoi-36', 'thiep-cuoi-40', 'thiep-cuoi-16', 'thiep-cuoi-48',
  'thiep-cuoi-19', 'thiep-cuoi-50', 'thiep-cuoi-53', 'thiep-cuoi-56',
  'thiep-cuoi-57', 'thiep-cuoi-58', 'thiep-cuoi-60', 'thiep-cuoi-62',
  'thiep-cuoi-63', 'thiep-cuoi-64', 'thiep-cuoi-68', 'thiep-cuoi-69',
  'thiep-cuoi-108', 'thiep-cuoi-112',
]);

const freeSlugs = new Set([
  'thiep-bw-1', 'thiep-cuoi-1', 'thiep-cuoi-3', 'thiep-cuoi-5',
  'thiep-cuoi-7', 'thiep-cuoi-10', 'thiep-cuoi-11', 'thiep-cuoi-13',
  'thiep-cuoi-15', 'thiep-cuoi-21', 'thiep-cuoi-26',
]);

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

function getPreviewImage(slug) {
  const png = ['thiep-cuoi-tone-xanh', 'thiep-cuoi-21', 'thiep-cuoi-50', 'thiep-cuoi-54',
    'thiep-cuoi-104', 'thiep-cuoi-58', 'thiep-cuoi-60', 'thiep-cuoi-62'];
  const jpg = [
    'thiep-bw-1', 'thiep-cuoi-56', 'thiep-cuoi-17', 'thiep-cuoi-11', 'thiep-cuoi-28',
    'thiep-cuoi-49', 'thiep-cuoi-57', 'thiep-cuoi-51', 'thiep-cuoi-55', 'thiep-cuoi-30',
    'thiep-cuoi-6', 'thiep-cuoi-64', 'thiep-cuoi-67', 'thiep-cuoi-68', 'thiep-cuoi-69',
    'thiep-cuoi-81', 'thiep-cuoi-82', 'thiep-cuoi-85', 'thiep-cuoi-91', 'thiep-cuoi-92',
    'thiep-cuoi-94', 'thiep-cuoi-95', 'thiep-cuoi-96', 'thiep-cuoi-99', 'thiep-cuoi-105',
    'thiep-cuoi-112', 'thiep-cuoi-31', 'thiep-cuoi-23', 'thiep-cuoi-18', 'thiep-cuoi-20',
    'thiep-cuoi-24', 'thiep-cuoi-26', 'thiep-cuoi-34', 'thiep-cuoi-37', 'thiep-cuoi-41',
    'thiep-cuoi-43', 'thiep-cuoi-63', 'thiep-cuoi-73',
  ];
  if (png.includes(slug)) return `/assets/new-templates/${slug}/preview.png`;
  if (jpg.includes(slug)) return `/assets/new-templates/${slug}/preview.jpg`;
  return `/assets/new-templates/${slug}/preview.webp`;
}

const allTemplates = currentCatalogSlugs.map((slug) => {
  const n = parseInt(slug.match(/\d+/)?.[0] || '0', 10);
  const views = ((n * 187 + 600) % 24000) + 400;
  const likes = Math.floor(views / 10) + ((n * 9) % 65);
  let pkg = 'basic';
  if (premiumSlugs.has(slug)) pkg = 'premium';
  else if (freeSlugs.has(slug)) pkg = 'free';
  return {
    slug,
    title: customTitles[slug] || getInvitationDisplayTitle(slug),
    package: pkg,
    image: getPreviewImage(slug),
    views,
    likes,
    editable: editableTemplateSlugs.includes(slug),
  };
});

const CATEGORIES = [
  'Tất cả', 'Thiệp cưới', 'Thiệp sinh nhật',
  'Thiệp tốt nghiệp', 'Sự kiện', 'Kỷ niệm', 'Lời chúc', 'Khác',
];

const BADGE_LABEL = { free: 'Miễn phí', basic: 'BASIC', premium: 'PREMIUM' };

/* ── Template Card ─────────────────────────────────────────── */
function TemplateCard({ item, onCopy, copiedSlug }) {
  const previewHref = `/template/${item.slug}`;
  const orderHref = item.editable
    ? `/dat-thiep?template=${encodeURIComponent(item.slug)}&source=catalog`
    : `/tu-van?service=Thi%E1%BB%87p+c%C6%B0%E1%BB%9Bi+Online&template=${encodeURIComponent(item.slug)}`;

  return (
    <article className="tpl-card">
      {/* Image + hover overlay */}
      <div className="tpl-card-img">
        <img src={item.image} alt={`Mẫu ${item.title}`} loading="lazy" />

        {/* Package badge */}
        <span className={`tpl-badge ${item.package}`}>
          {BADGE_LABEL[item.package]}
        </span>

        {/* Hover overlay */}
        <div className="tpl-card-overlay">
          {/* Stats top-left */}
          <div className="tpl-card-stats">
            <span className="tpl-stat heart">
              <Heart fill="currentColor" /> {item.likes}
            </span>
            <span className="tpl-stat">
              <Eye /> {item.views.toLocaleString('vi-VN')}
            </span>
          </div>

          {/* Preview button center */}
          <a
            className="tpl-card-preview-btn"
            href={previewHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            Xem mẫu
          </a>

          {/* Spacer placeholder for bottom row balance */}
          <div />
        </div>

        {/* Copy link */}
        <button
          className="tpl-card-copy"
          type="button"
          title="Sao chép liên kết"
          onClick={() => onCopy(item.slug)}
        >
          {copiedSlug === item.slug
            ? <Check size={14} style={{ color: '#4ade80' }} />
            : <Copy size={14} />}
        </button>
      </div>

      {/* Footer */}
      <a className="tpl-card-footer" href={orderHref} style={{ display: 'block', textDecoration: 'none' }}>
        <div className="tpl-card-title">{item.title}</div>
        <div className="tpl-card-cat">
          {item.editable ? 'Tự chỉnh sửa' : 'Thiệp cưới'}
        </div>
      </a>
    </article>
  );
}

/* ── Main Page ─────────────────────────────────────────────── */
export default function TemplatesDashboard() {
  const [category, setCategory] = useState('Tất cả');
  const [pkg, setPkg] = useState('all');
  const [query, setQuery] = useState('');
  const [copiedSlug, setCopiedSlug] = useState(null);

  const isWedding = category === 'Tất cả' || category === 'Thiệp cưới';

  const filtered = useMemo(() => {
    if (!isWedding) return [];
    return allTemplates.filter((t) => {
      if (pkg !== 'all' && t.package !== pkg) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        if (!t.title.toLowerCase().includes(q) && !t.slug.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [category, pkg, query, isWedding]);

  const handleCopy = async (slug) => {
    const url = `${window.location.origin}/template/${slug}`;
    try { await navigator.clipboard.writeText(url); }
    catch { window.prompt('Sao chép:', url); }
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  return (
    <div className="tpl-page">
      <TplHeader />

      {/* ── Hero ── */}
      <section className="tpl-hero">
        <h1>Mẫu thiệp online đẹp</h1>
        <p>Khám phá bộ sưu tập mẫu thiệp điện tử đa dạng: cưới, sinh nhật, sự kiện, kỷ niệm từ Lời Hẹn Studio</p>
      </section>

      {/* ── Category Pills ── */}
      <div className="tpl-categories" role="tablist">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={category === cat}
            className={`tpl-cat-pill ${category === cat ? 'active' : ''}`}
            onClick={() => { setCategory(cat); setQuery(''); }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Toolbar: breadcrumb + search + filter ── */}
      <div className="tpl-toolbar">
        <div className="tpl-breadcrumb">
          <Home size={14} />
          <a href="/">Trang chủ</a>
          <ChevronRight size={13} />
          <span>Mẫu thiệp</span>
          {category !== 'Tất cả' && (
            <>
              <ChevronRight size={13} />
              <span>{category}</span>
            </>
          )}
        </div>

        <div className="tpl-toolbar-right">
          {/* Search */}
          <label className="tpl-search-wrap" htmlFor="tpl-search">
            <Search size={15} />
            <input
              id="tpl-search"
              type="text"
              placeholder="Tìm kiếm mẫu (Ví dụ: 61, Đỏ Nhung...)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={!isWedding}
            />
          </label>

          {/* Package select */}
          <select
            className="tpl-pkg-select"
            value={pkg}
            onChange={(e) => setPkg(e.target.value)}
            disabled={!isWedding}
            aria-label="Lọc theo gói"
          >
            <option value="all">Tất cả gói</option>
            <option value="free">Miễn phí</option>
            <option value="basic">Basic</option>
            <option value="premium">Premium</option>
          </select>
        </div>
      </div>

      {/* ── Gallery ── */}
      <section className="tpl-gallery">
        {filtered.length > 0 ? (
          <div className="tpl-grid">
            {filtered.map((item) => (
              <TemplateCard
                key={item.slug}
                item={item}
                onCopy={handleCopy}
                copiedSlug={copiedSlug}
              />
            ))}
          </div>
        ) : (
          <div className="tpl-empty">
            <AlertCircle size={52} />
            <h3>
              {!isWedding
                ? 'Đang cập nhật thêm mẫu'
                : 'Không tìm thấy mẫu thiệp'}
            </h3>
            <p>
              {!isWedding
                ? `Thư viện mẫu ${category.toLowerCase()} đang được hoàn thiện. Hãy đặt thiết kế riêng!`
                : 'Vui lòng thay đổi từ khoá hoặc bộ lọc gói dịch vụ.'}
            </p>
            <a href="/tu-van" className="tpl-empty-cta">
              Liên hệ Studio đặt riêng <ArrowRight size={14} />
            </a>
          </div>
        )}
      </section>

      <StudioFooter />
    </div>
  );
}
