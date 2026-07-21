import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowRight, BarChart2, CalendarDays, ChevronRight,
  ExternalLink, FileImage, Gift, Globe, Headphones, Heart,
  Layout, Link2, LogOut, Mail, MessageSquare, PenLine, Play, RefreshCw,
  Rocket, Star, User, Users, X, Smile, Zap, Check,
  Camera, Eye, Image, CreditCard, Sparkles, ShieldCheck, QrCode
} from 'lucide-react';
import { StudioHeader, StudioFooter } from '../studio/StudioChrome.jsx';
import {
  browserSupabase, claimCustomerOrder, commerceConfigured, commerceDemoMode,
  getCustomerAccount, getCustomerSession, signInCustomer, signInCustomerWithGoogle, signOutCustomer,
} from './commerceApi.js';
import { formatCurrency } from './invitationContent.js';
import { formatStorage, getPackageUsage } from './packageLimits.js';
import { currentCatalogSlugs, getInvitationDisplayTitle } from '../data/invitationCatalog.js';
import './account.css';

const statusLabels = {
  new: 'Đơn mới', awaiting_deposit: 'Chờ cọc', in_progress: 'Đang thiết kế',
  customer_review: 'Chờ duyệt', revision: 'Đang chỉnh sửa', approved: 'Đã duyệt',
  published: 'Đã phát hành', expired: 'Hết hạn', cancelled: 'Đã hủy',
};

function parsePrivateOrderLink(value) {
  try {
    const url = new URL(value, window.location.origin);
    return {
      orderId: url.pathname.match(/^\/don-hang\/([^/]+)$/)?.[1] || '',
      accessToken: url.searchParams.get('token') || '',
    };
  } catch {
    return { orderId: '', accessToken: '' };
  }
}

/* ── Login Page (Premium Shadcn / Aceternity Style) ────────── */
function AccountLogin({ onSession }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState({ busy: '', sent: false, error: '' });

  const submit = async (event) => {
    event.preventDefault();
    setState({ busy: 'email', sent: false, error: '' });
    try {
      const result = await signInCustomer(email);
      if (commerceDemoMode) onSession(result);
      else setState({ busy: '', sent: false, error: 'Đã gửi link đăng nhập. Vui lòng kiểm tra hộp thư của bạn.' });
    } catch (error) {
      setState({ busy: '', sent: false, error: error.message });
    }
  };

  const signInWithGoogle = async () => {
    setState({ busy: 'google', sent: false, error: '' });
    try {
      const result = await signInCustomerWithGoogle();
      if (commerceDemoMode) onSession(result);
    } catch (error) {
      setState({ busy: '', sent: false, error: error.message });
    }
  };

  return (
    <div className="accountPage premium-login-theme">
      <div className="login-grid-pattern"></div>
      <div className="login-glow-orb-1"></div>
      <div className="login-glow-orb-2"></div>

      <StudioHeader />

      <main className="accountLogin">
        <div className="login-hero-section">
          <span className="login-eyebrow">
            <SparklesIcon /> KHÔNG GIAN SÁNG TẠO
          </span>
          <h1 className="login-title">
            Quản lý mọi thiệp cưới <br />
            <span className="text-gradient">trong một nơi</span>
          </h1>
          <p className="login-desc">
            Trải nghiệm nền tảng tự tạo thiệp mời cưới online thông minh, chuyên nghiệp và đầy cảm hứng.
          </p>
        </div>

        <form onSubmit={submit} className="login-card-form">
          <div className="login-card-header">
            <h2>Chào mừng quay trở lại</h2>
            <p>Đăng nhập nhanh để tiếp tục thiết kế</p>
          </div>

          <button className="accountGoogleButton" type="button" onClick={signInWithGoogle} disabled={Boolean(state.busy)}>
            <svg className="google-icon-svg" viewBox="0 0 24 24" width="18" height="18">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            {state.busy === 'google' ? 'Đang mở Google...' : 'Đăng nhập bằng Google'}
          </button>

          <div className="accountLoginDivider">
            <span>hoặc dùng email</span>
          </div>

          <label className="login-input-label">
            Email của bạn
            <div className="input-with-icon">
              <Mail className="input-icon" size={16} />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="ten-cua-ban@example.com"
                required={!commerceDemoMode}
              />
            </div>
          </label>

          <button className="login-submit-btn" type="submit" disabled={Boolean(state.busy)}>
            {state.busy === 'email' ? (
              <RefreshCw className="is-spinning" size={16} />
            ) : commerceDemoMode ? (
              'Mở tài khoản demo'
            ) : (
              <>
                Gửi liên kết đăng nhập <ArrowRight size={16} />
              </>
            )}
          </button>

          {state.error && (
            <p className={state.error.startsWith('Đã gửi') ? 'accountSuccess' : 'commerceError'} role="alert">
              {state.error}
            </p>
          )}
          {!commerceConfigured && commerceDemoMode && <small className="login-demo-helper">Chế độ demo lưu dữ liệu trong trình duyệt hiện tại.</small>}
        </form>
      </main>
      <StudioFooter />
    </div>
  );
}

function SparklesIcon() {
  return (
    <svg className="sparkle-icon" viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

/* ── Unified Fixed Dashboard Sidebar ─────────────────────────── */
function DashSidebar({ activeTab, onTab, onSignOut }) {
  const navSections = [
    {
      section: 'HOME',
      items: [
        { id: 'overview', icon: BarChart2, label: 'Tổng quan' },
        { id: 'plan', icon: Zap, label: 'Gói dịch vụ của tôi' },
        { id: 'create', icon: PenLine, label: 'Tạo thiết kế' },
      ],
    },
    {
      section: 'THIẾT KẾ CỦA TÔI',
      items: [
        { id: 'invitations', icon: Mail, label: 'Thiệp online' },
        { id: 'websites', icon: Layout, label: 'Website khác' },
      ],
    },
    {
      section: 'QUÀ TẶNG & LỜI CHÚC',
      items: [
        { id: 'wishes', icon: MessageSquare, label: 'Lời chúc' },
        { id: 'gifts', icon: Gift, label: 'Quà tặng' },
        { id: 'rsvp', icon: Users, label: 'Xác nhận tham dự' },
      ],
    },
    {
      section: 'TÀI KHOẢN',
      items: [
        { id: 'profile', icon: User, label: 'Thông tin cá nhân' },
      ],
    },
    {
      section: 'HỖ TRỢ',
      items: [
        { id: 'feedback', icon: Headphones, label: 'Đóng góp ý kiến' },
      ],
    },
  ];

  return (
    <aside className="dash-sidebar">
      <a href="/" className="dash-sidebar-brand">
        <div className="dash-sidebar-brand-icon">LH</div>
        <span>Lời Hẹn <em>Studio</em></span>
      </a>

      <nav className="dash-sidebar-nav">
        {navSections.map(({ section, items }) => (
          <div key={section} className="dash-nav-section">
            <span className="dash-nav-label">{section}</span>
            {items.map(({ id, icon: Icon, label }) => (
              <button key={id} type="button"
                className={`dash-nav-item ${activeTab === id ? 'active' : ''}`}
                onClick={() => onTab(id)}
              >
                <Icon size={17} /> {label}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <button className="dash-sidebar-signout" type="button" onClick={onSignOut}>
        <LogOut size={16} /> Đăng xuất
      </button>
    </aside>
  );
}

/* ── Overview Tab ────────────────────────────────────────────── */
function OverviewTab({ account, metrics, onTab }) {
  const email = account?.user?.email || '';
  const name = account?.customer?.full_name || 'Khách hàng';
  const initials = name.split(' ').map(w => w[0]).slice(-2).join('').toUpperCase();

  const [showCappy, setShowCappy] = useState(true);
  const [showPartner, setShowPartner] = useState(true);

  const quickTools = [
    { icon: <Globe size={20} />, label: 'Trang chủ', color: 'orange', onClick: () => window.location.href = '/' },
    { icon: <Layout size={20} />, label: 'Mẫu thiết kế', color: 'purple', onClick: () => onTab('create') },
    { icon: <Heart size={20} />, label: 'Mẫu yêu thích', color: 'red', onClick: () => onTab('create') },
    { icon: <Mail size={20} />, label: 'Thiệp thực tế', color: 'violet', onClick: () => onTab('invitations') },
    { icon: <Star size={20} />, label: 'Dịch vụ của tôi', color: 'gold', onClick: () => onTab('plan') },
    { icon: <Gift size={20} />, label: 'Chương trình quà tặng', color: 'pink', onClick: () => onTab('gifts') },
    { icon: <Smile size={20} />, label: 'Website khác', color: 'teal', onClick: () => onTab('websites') },
    { icon: <Rocket size={20} />, label: 'Gói dịch vụ', color: 'blue-violet', onClick: () => onTab('plan') },
    { icon: <Headphones size={20} />, label: 'Hỗ trợ', color: 'blue', onClick: () => onTab('feedback') },
    { icon: <MessageSquare size={20} />, label: 'Đóng góp ý kiến', color: 'green', onClick: () => onTab('feedback') },
    { icon: <Play size={20} />, label: 'Hướng dẫn', color: 'red-pink', onClick: () => onTab('create') },
    { icon: <User size={20} />, label: 'Tài khoản', color: 'indigo', onClick: () => onTab('profile') },
  ];

  return (
    <div className="dash-overview">
      {/* Dimissible Cappy Banner */}
      {showCappy && (
        <div className="dash-banner-cappy">
          <button className="dash-banner-close" onClick={() => setShowCappy(false)} aria-label="Đóng banner">
            <X size={16} />
          </button>
          <div className="dash-banner-cappy-body">
            <div className="dash-banner-cappy-icon">
              <Camera size={22} color="#fff" />
            </div>
            <div className="dash-banner-cappy-text">
              <div className="dash-banner-tag">
                <Star size={10} fill="currentColor" /> MỚI
              </div>
              <span className="dash-banner-author">từ đội ngũ Lời Hẹn</span>
              <h3>Cappy.me - Ghi lại mọi góc nhìn trong ngày lễ của bạn</h3>
              <p>Tạo sự kiện, chia sẻ mã QR và thu thập ảnh từ mọi người. Tất cả trong một album đẹp mắt.</p>
              <div className="dash-banner-pills">
                <span>📷 QR & link chia sẻ</span>
                <span>👥 Khách tải ảnh dễ dàng</span>
                <span>✨ Album chung đẹp mắt</span>
              </div>
            </div>
            <div className="dash-banner-cappy-actions">
              <button className="dash-banner-btn-secondary" onClick={() => setShowCappy(false)}>Để sau</button>
              <button className="dash-banner-btn-primary" onClick={() => onTab('create')}>Khám phá Cappy <ArrowRight size={14} /></button>
            </div>
          </div>
        </div>
      )}

      {/* Dimissible Partner Program Banner */}
      {showPartner && (
        <div className="dash-banner-partner">
          <button className="dash-banner-close text-white" onClick={() => setShowPartner(false)} aria-label="Đóng banner">
            <X size={16} />
          </button>
          <div className="dash-banner-partner-body">
            <div className="dash-banner-tag bg-yellow text-indigo">
              <Star size={10} fill="currentColor" /> MỚI
            </div>
            <h3>CineLove Partner Program</h3>
            <p>Chương trình đối tác dành cho studio, công ty sự kiện hoặc đại lý. Tạo nhiều thiệp với giới hạn cao hơn, quản lý khách hàng chuyên nghiệp.</p>
            <div className="dash-banner-pills text-white">
              <span>✨ Giới hạn cao hơn</span>
              <span>👥 Quản lý khách hàng</span>
              <span>🎨 Tùy chỉnh branding</span>
            </div>
            <div className="dash-banner-partner-actions">
              <button className="dash-banner-btn-secondary-white" onClick={() => setShowPartner(false)}>Bỏ qua</button>
              <button className="dash-banner-btn-primary-white" onClick={() => onTab('plan')}>Tìm hiểu <ArrowRight size={14} /></button>
            </div>
          </div>
        </div>
      )}

      {/* User profile card */}
      <div className="dash-user-card">
        <div className="dash-user-avatar">{initials || '?'}</div>
        <div className="dash-user-info">
          <h2>{name}</h2>
          <p>{email}</p>
          <div className="dash-user-badges">
            <span className="dash-user-badge">Free</span>
            <button className="dash-user-upgrade-link" onClick={() => onTab('plan')}>Nâng cấp →</button>
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div className="dash-section-header">
        <BarChart2 size={18} />
        <h2>Thống kê sử dụng</h2>
      </div>
      <div className="dash-stats-grid">
        <div className="dash-stat-card">
          <div className="dash-stat-top">
            <div className="dash-stat-icon-wrapper globe">
              <Globe size={18} />
            </div>
            <span className="dash-stat-title">Website</span>
          </div>
          <strong className="dash-stat-value">{metrics.total} / 1</strong>
          <div className="dash-stat-bar">
            <div style={{ width: `${Math.min(metrics.total * 100, 100)}%` }} />
          </div>
          <span className="dash-stat-limit">Giới hạn: 1 trang</span>
        </div>

        <div className="dash-stat-card">
          <div className="dash-stat-top">
            <div className="dash-stat-icon-wrapper image">
              <Image size={18} />
            </div>
            <span className="dash-stat-title">Hình ảnh</span>
          </div>
          <strong className="dash-stat-value">0 / 10</strong>
          <div className="dash-stat-bar">
            <div style={{ width: '0%' }} />
          </div>
          <span className="dash-stat-limit">Giới hạn: 10 hình ảnh</span>
        </div>

        <div className="dash-stat-card">
          <div className="dash-stat-top">
            <div className="dash-stat-icon-wrapper view">
              <Eye size={18} />
            </div>
            <span className="dash-stat-title">Lượt xem</span>
          </div>
          <strong className="dash-stat-value">0 / 300</strong>
          <div className="dash-stat-bar">
            <div style={{ width: '0%' }} />
          </div>
          <span className="dash-stat-limit">Giới hạn: 300 lượt xem</span>
        </div>
      </div>

      {/* Upgrade bar */}
      <div className="dash-upgrade-bar-item" onClick={() => onTab('plan')}>
        <div className="dash-upgrade-icon"><Rocket size={18} /></div>
        <div className="dash-upgrade-text">
          <h3>Nâng cấp giới hạn</h3>
          <p>Mở rộng giới hạn sử dụng của bạn</p>
        </div>
        <ChevronRight size={16} className="dash-upgrade-chevron" />
      </div>

      {/* Quick tools panel */}
      <div className="dash-tools-panel">
        <h3 className="dash-panel-title">Công cụ phổ biến</h3>
        <div className="dash-tools-grid">
          {quickTools.map(({ icon, label, color, onClick }) => (
            <button key={label} type="button" onClick={onClick} className="dash-tool-item">
              <div className={`dash-tool-icon-bg ${color}`}>
                {icon}
              </div>
              <span className="dash-tool-label">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Full Dashboard Plan/Packages Tab ────────────────────────── */
function PlanTab({ onTab }) {
  const packages = [
    {
      code: 'FREE',
      name: 'Gói Miễn Phí',
      price: '0đ',
      desc: 'Trải nghiệm tạo thiệp mời cơ bản trọn đời',
      badge: 'Miễn phí',
      color: 'gray',
      features: [
        '1 Website thiệp mời',
        'Tối đa 10 hình ảnh',
        '300 Lượt xem thiệp',
        'Mẫu thiết kế Free cơ bản',
        'Hỗ trợ qua email'
      ]
    },
    {
      code: 'BASIC',
      name: 'Gói Basic',
      price: '99.000đ',
      desc: 'Cho đám cưới ấm cúng với đầy đủ tính năng',
      badge: 'Phổ biến',
      color: 'pink',
      popular: true,
      features: [
        '1 Website thiệp mời cao cấp',
        'Tối đa 30 hình ảnh HD',
        '1.000 Lượt xem thiệp',
        'Mở khóa kho mẫu Basic',
        'Nhạc nền tùy chọn',
        'Hệ thống RSVP xác nhận tham dự',
        'Sổ lưu bút nhận lời chúc'
      ]
    },
    {
      code: 'PREMIUM',
      name: 'Gói Premium',
      price: '199.000đ',
      desc: 'Đầy đủ hiệu ứng, nhạc nền & không giới hạn lượt xem',
      badge: 'Khuyên dùng',
      color: 'purple',
      features: [
        'Không giới hạn lượt xem thiệp',
        'Không giới hạn tải hình ảnh HD',
        'Tất cả mẫu Premium đặc biệt',
        'Album ảnh cưới Cappy.me',
        'Mã QR mừng cưới tiện lợi',
        'Xuất dữ liệu RSVP sang Excel',
        'Hỗ trợ ưu tiên 24/7'
      ]
    }
  ];

  return (
    <div className="dash-plan-tab">
      <div className="dash-tab-header">
        <h2>Gói dịch vụ của bạn</h2>
        <p>Lựa chọn gói dịch vụ phù hợp với nhu cầu ngày cưới của hai bạn</p>
      </div>

      <div className="dash-plan-grid">
        {packages.map(p => (
          <div key={p.code} className={`dash-plan-card ${p.popular ? 'popular' : ''}`}>
            {p.popular && <span className="dash-plan-badge-top">BÁN CHẠY NHẤT</span>}
            <div className="dash-plan-card-header">
              <h3>{p.name}</h3>
              <p className="dash-plan-desc">{p.desc}</p>
              <div className="dash-plan-price">
                <span className="amount">{p.price}</span>
                <span className="unit">/ thiệp</span>
              </div>
            </div>

            <ul className="dash-plan-features">
              {p.features.map(f => (
                <li key={f}>
                  <Check size={16} className="text-pink" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <button type="button" className={`dash-plan-btn ${p.popular ? 'primary' : 'secondary'}`} onClick={() => onTab('create')}>
              {p.code === 'FREE' ? 'Đang sử dụng' : 'Nâng cấp ngay'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Create / Catalog Tab ────────────────────────────────────── */
function CreateTab() {
  const premiumSlugs = new Set(['thiep-cuoi-61', 'thiep-cuoi-39', 'thiep-cuoi-44', 'thiep-cuoi-47', 'thiep-cuoi-42']);
  const freeSlugs = new Set(['thiep-bw-1', 'thiep-cuoi-1', 'thiep-cuoi-3']);

  const list = currentCatalogSlugs.slice(0, 12).map(slug => {
    let pkg = 'Basic';
    if (premiumSlugs.has(slug)) pkg = 'Premium';
    else if (freeSlugs.has(slug)) pkg = 'Free';
    return {
      slug,
      title: getInvitationDisplayTitle(slug),
      package: pkg,
      image: `/assets/new-templates/${slug}/preview.webp`
    };
  });

  return (
    <div className="dash-create-tab">
      <div className="dash-tab-header">
        <h2>Chọn mẫu thiết kế của bạn</h2>
        <p>Bắt đầu tạo thiệp online trong vài giây từ thư viện mẫu</p>
      </div>
      <div className="dash-catalog-grid">
        {list.map(item => (
          <div key={item.slug} className="dash-catalog-card">
            <div className="dash-catalog-img-wrap">
              <img src={item.image} alt={item.title} onError={(e) => { e.target.src = '/assets/template39/couple-red.webp'; }} />
              <span className={`dash-catalog-badge ${item.package.toLowerCase()}`}>{item.package}</span>
            </div>
            <div className="dash-catalog-info">
              <h3>{item.title}</h3>
              <a href={`/dat-thiep?template=${encodeURIComponent(item.slug)}&source=catalog`} className="dash-catalog-btn">
                Sử dụng mẫu <ArrowRight size={13} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Websites Tab ────────────────────────────────────────────── */
function WebsitesTab({ onTab }) {
  return (
    <div className="dash-websites-tab">
      <div className="dash-tab-header">
        <h2>Website sự kiện khác</h2>
        <p>Quản lý các trang website sự kiện phụ hoặc thiệp mời kỷ niệm</p>
      </div>
      <div className="dash-empty-card">
        <div className="dash-empty-icon"><Globe size={32} /></div>
        <h3>Chưa có website sự kiện phụ nào</h3>
        <p>Tạo thêm trang website thông báo lễ dạm ngõ, ăn hỏi hoặc tiệc báo hỷ.</p>
        <button type="button" className="dash-cta-btn" onClick={() => onTab('create')}>
          <PenLine size={15} /> Tạo thiết kế mới
        </button>
      </div>
    </div>
  );
}

/* ── Wishes / Guestbook Tab ──────────────────────────────────── */
function WishesTab() {
  const mockWishes = [
    { id: 1, name: 'Nguyễn Văn Nam', relation: 'Bạn chú rể', message: 'Chúc hai bạn trăm năm hạnh phúc, sớm đầu bạc răng long nhé!', date: '20-07-2026' },
    { id: 2, name: 'Trần Thị Thuỷ', relation: 'Đồng nghiệp cô dâu', message: 'Đám cưới đẹp quá! Chúc gia đình nhỏ luôn ngập tràn tiếng cười và niềm vui.', date: '19-07-2026' },
  ];

  return (
    <div className="dash-wishes-tab">
      <div className="dash-tab-header">
        <h2>Lời chúc từ khách mời</h2>
        <p>Những lời chúc gửi đến ngày vui của hai bạn</p>
      </div>
      <div className="dash-wishes-list">
        {mockWishes.map(wish => (
          <div key={wish.id} className="dash-wish-card">
            <div className="dash-wish-header">
              <strong>{wish.name}</strong>
              <span>{wish.relation} · {wish.date}</span>
            </div>
            <p>{wish.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Gifts / Registry Tab ────────────────────────────────────── */
function GiftsTab() {
  return (
    <div className="dash-gifts-tab">
      <div className="dash-tab-header">
        <h2>Quản lý Quà tặng & Mã QR Mừng Cưới</h2>
        <p>Thiết lập tài khoản nhận mừng cưới và hộp mừng đám cưới online</p>
      </div>

      <div className="dash-gifts-grid">
        <div className="dash-gift-box-card">
          <div className="dash-gift-icon-wrapper"><QrCode size={24} /></div>
          <h3>Mã QR Ngân Hàng Mừng Cưới</h3>
          <p>Tự động tạo mã QR VietQR nhận tiền mừng cưới trực tiếp về tài khoản chú rể / cô dâu.</p>
          <button type="button" className="dash-btn-outline">Thiết lập tài khoản →</button>
        </div>

        <div className="dash-gift-box-card">
          <div className="dash-gift-icon-wrapper"><Gift size={24} /></div>
          <h3>Danh sách Quà ước nguyện (Registry)</h3>
          <p>Tạo danh sách các món quà kỷ niệm mong muốn để bạn bè dễ dàng lựa chọn tặng.</p>
          <button type="button" className="dash-btn-outline">Thêm quà ước nguyện →</button>
        </div>
      </div>
    </div>
  );
}

/* ── RSVP Tab ────────────────────────────────────────────────── */
function RsvpTab() {
  const mockRsvps = [
    { id: 1, name: 'Phạm Minh Đức', phone: '0912345678', count: 2, attending: true, diet: 'Không ăn cay' },
    { id: 2, name: 'Lê Hoàng Yến', phone: '0987654321', count: 1, attending: true, diet: 'Ăn chay' },
  ];

  return (
    <div className="dash-rsvp-tab">
      <div className="dash-tab-header">
        <h2>Danh sách xác nhận tham dự (RSVP)</h2>
        <p>Theo dõi số lượng khách dự cưới và các yêu cầu đi kèm</p>
      </div>
      <div className="dash-rsvp-table-wrapper">
        <table className="dash-rsvp-table">
          <thead>
            <tr>
              <th>Họ tên</th>
              <th>Điện thoại</th>
              <th>Số người</th>
              <th>Tham gia</th>
              <th>Yêu cầu đặc biệt</th>
            </tr>
          </thead>
          <tbody>
            {mockRsvps.map(r => (
              <tr key={r.id}>
                <td><strong>{r.name}</strong></td>
                <td>{r.phone}</td>
                <td>{r.count}</td>
                <td><span className="dash-badge-attending">✓ Tham gia</span></td>
                <td>{r.diet || 'Không có'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Feedback Tab ────────────────────────────────────────────── */
function FeedbackTab() {
  const [msg, setMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setMsg('');
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="dash-feedback-tab">
      <div className="dash-tab-header">
        <h2>Đóng góp ý kiến & Hỗ trợ</h2>
        <p>Gửi câu hỏi hoặc phản hồi của bạn để Lời Hẹn phục vụ tốt hơn</p>
      </div>
      <form onSubmit={handleSubmit} className="dash-feedback-form">
        <label>
          Nội dung liên hệ / góp ý
          <textarea value={msg} onChange={e => setMsg(e.target.value)} required rows={6} placeholder="Nhập tin nhắn của bạn..." />
        </label>
        <button type="submit">Gửi thông tin</button>
        {success && <p className="dash-success-msg">✓ Gửi phản hồi thành công! Cảm ơn bạn.</p>}
      </form>
    </div>
  );
}

/* ── Invitations Tab ─────────────────────────────────────────── */
function InvitationsTab({ orders, onTab }) {
  if (!orders.length) {
    return (
      <div className="dash-empty-card">
        <div className="dash-empty-icon"><Mail size={32} /></div>
        <h3>Chưa có thiệp nào</h3>
        <p>Tạo đơn mới để bắt đầu thiết kế thiệp cưới của bạn</p>
        <button type="button" className="dash-cta-btn" onClick={() => onTab('create')}>
          <PenLine size={15} /> Tạo thiết kế ngay
        </button>
      </div>
    );
  }

  return (
    <div className="dash-orders">
      <div className="dash-orders-header">
        <h2>Thiệp online của bạn</h2>
      </div>
      <div className="dash-order-list">
        {orders.map((order) => {
          const usage = getPackageUsage(order.package_code, order.assets || [], order.guest_count || 0);
          const content = order.invitation?.content || {};
          const couple = content.couple
            ? `${content.couple.groomName} & ${content.couple.brideName}`
            : `Mẫu ${order.template_slug.replace('thiep-cuoi-', '')}`;
          return (
            <div key={order.id} className="dash-order-card">
              <img src={`/social/${order.template_slug}.jpg`} alt="" className="dash-order-img" onError={(e) => { e.target.src = '/assets/template39/couple-red.webp'; }} />
              <div className="dash-order-body">
                <div className="dash-order-header">
                  <div>
                    <div className="dash-order-id">{order.public_id} · {usage.packageInfo.name}</div>
                    <h3 className="dash-order-name">{couple}</h3>
                  </div>
                  <span className={`dash-status status-${order.status}`}>{statusLabels[order.status] || order.status}</span>
                </div>
                <div className="dash-order-stats">
                  <div><FileImage size={12} />{usage.assets}/{usage.packageInfo.limits.assets} tư liệu</div>
                  <div><Users size={12} />{usage.guests}/{usage.packageInfo.limits.guests} khách</div>
                  <div><CalendarDays size={12} />{formatStorage(usage.storageBytes)}</div>
                  <div>💰 {formatCurrency(order.amount_total)}</div>
                </div>
                <div className="dash-order-actions">
                  <a href={`/don-hang/${order.id}`} className="dash-order-btn primary">Quản lý đơn <ArrowRight size={13} /></a>
                  <a href={`/chinh-sua-thiep/${order.id}`} className="dash-order-btn"><PenLine size={13} /> Chỉnh thiệp</a>
                  {order.invitation?.status === 'published' && (
                    <a href={`/w/${order.invitation.slug}`} target="_blank" rel="noreferrer" className="dash-order-btn">
                      <ExternalLink size={13} /> Mở thiệp
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Profile Tab ─────────────────────────────────────────────── */
function ProfileTab({ account, onSignOut }) {
  const email = account?.user?.email || '';
  const name = account?.customer?.full_name || 'Khách hàng';
  const initials = name.split(' ').map(w => w[0]).slice(-2).join('').toUpperCase();

  const [claimLink, setClaimLink] = useState('');
  const [claimState, setClaimState] = useState({ busy: false, error: '', success: '' });

  const claim = async (e) => {
    e.preventDefault();
    const parsed = parsePrivateOrderLink(claimLink);
    if (!parsed.orderId || !parsed.accessToken) {
      setClaimState({ busy: false, error: 'Hãy dán đầy đủ link quản lý đơn hàng.', success: '' });
      return;
    }
    setClaimState({ busy: true, error: '', success: '' });
    try {
      await claimCustomerOrder(parsed.orderId, parsed.accessToken);
      setClaimLink('');
      setClaimState({ busy: false, error: '', success: 'Đã thêm đơn hàng vào tài khoản.' });
    } catch (err) {
      setClaimState({ busy: false, error: err.message, success: '' });
    }
  };

  return (
    <div className="dash-profile-tab">
      <div className="dash-profile-hero">
        <div className="dash-profile-avatar-lg">{initials || '?'}</div>
        <div>
          <h2>{name}</h2>
          <p>{email}</p>
          <span className="dash-badge free">Gói Free</span>
        </div>
        <button className="dash-signout-btn" type="button" onClick={onSignOut}>
          <LogOut size={15} /> Đăng xuất
        </button>
      </div>

      <div className="dash-claim-section">
        <h3>Thêm đơn hàng cũ</h3>
        <p>Dán link quản lý đơn hàng riêng để thêm vào tài khoản này.</p>
        <form onSubmit={claim} className="dash-claim-form">
          <input value={claimLink} onChange={(e) => setClaimLink(e.target.value)}
            placeholder="Dán link quản lý đơn hàng..." />
          <button type="submit" disabled={claimState.busy}>
            <Link2 size={14} /> {claimState.busy ? 'Đang thêm...' : 'Thêm đơn'}
          </button>
        </form>
        {claimState.error && <p className="dash-error-msg">{claimState.error}</p>}
        {claimState.success && <p className="dash-success-msg">{claimState.success}</p>}
      </div>
    </div>
  );
}

/* ── Main AccountPage ────────────────────────────────────────── */
export default function AccountPage() {
  const [session, setSession] = useState(null);
  const [account, setAccount] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (new URLSearchParams(window.location.search).get('demo') === 'true') {
      const demoSession = { demo: true, user: { id: 'demo-customer', email: 'demo@loihen.local' } };
      localStorage.setItem('loi-hen-demo-customer-session', JSON.stringify(demoSession));
    }
    setLoading(true);
    try {
      const currentSession = await getCustomerSession();
      setSession(currentSession);
      if (currentSession) setAccount(await getCustomerAccount());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    if (!browserSupabase) return undefined;
    const { data } = browserSupabase.auth.onAuthStateChange(() => window.setTimeout(load, 0));
    return () => data.subscription.unsubscribe();
  }, [load]);

  const metrics = useMemo(() => {
    const orders = account?.orders || [];
    return {
      total: orders.length,
      published: orders.filter(o => o.status === 'published').length,
      active: orders.filter(o => !['published', 'expired', 'cancelled'].includes(o.status)).length,
    };
  }, [account]);

  const signOut = async () => {
    await signOutCustomer();
    setSession(null);
    setAccount(null);
  };

  if (loading) {
    return (
      <div className="dash-loading">
        <RefreshCw className="dash-spinner" size={28} />
        <p>Đang mở tài khoản...</p>
      </div>
    );
  }

  if (!session) return <AccountLogin onSession={load} />;

  const orders = account?.orders || [];

  return (
    <div className="dash-layout">
      {/* 100% Fixed Sidebar across all tabs */}
      <DashSidebar activeTab={activeTab} onTab={setActiveTab} onSignOut={signOut} />

      <main className="dash-main">
        {/* Top bar */}
        <header className="dash-topbar">
          <div className="dash-topbar-inner">
            <div className="dash-topbar-title">
              {activeTab === 'overview' && 'Tổng quan'}
              {activeTab === 'plan' && 'Gói dịch vụ'}
              {activeTab === 'create' && 'Mẫu thiết kế'}
              {activeTab === 'invitations' && 'Thiệp online'}
              {activeTab === 'websites' && 'Website khác'}
              {activeTab === 'wishes' && 'Lời chúc'}
              {activeTab === 'gifts' && 'Quà tặng'}
              {activeTab === 'rsvp' && 'Xác nhận tham dự'}
              {activeTab === 'profile' && 'Thông tin cá nhân'}
              {activeTab === 'feedback' && 'Liên hệ hỗ trợ'}
            </div>
            <div className="dash-topbar-actions">
              <button type="button" onClick={load} className="dash-topbar-btn" title="Làm mới">
                <RefreshCw size={16} />
              </button>
              <div className="dash-topbar-avatar">
                {(account?.customer?.full_name || '?').split(' ').map(w => w[0]).slice(-2).join('').toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="dash-content">
          {commerceDemoMode && (
            <div className="dash-demo-banner">
              ⚠️ Tài khoản demo — dữ liệu chỉ lưu trong trình duyệt hiện tại.
            </div>
          )}

          {activeTab === 'overview' && <OverviewTab account={account} metrics={metrics} onTab={setActiveTab} />}
          {activeTab === 'plan' && <PlanTab onTab={setActiveTab} />}
          {activeTab === 'create' && <CreateTab />}
          {activeTab === 'invitations' && <InvitationsTab orders={orders} onTab={setActiveTab} />}
          {activeTab === 'websites' && <WebsitesTab onTab={setActiveTab} />}
          {activeTab === 'wishes' && <WishesTab />}
          {activeTab === 'gifts' && <GiftsTab />}
          {activeTab === 'rsvp' && <RsvpTab />}
          {activeTab === 'profile' && <ProfileTab account={account} onSignOut={signOut} />}
          {activeTab === 'feedback' && <FeedbackTab />}
        </div>
      </main>
    </div>
  );
}
