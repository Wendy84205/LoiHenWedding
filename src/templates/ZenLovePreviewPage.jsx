import React from 'react';
import { ArrowLeft, ExternalLink, Image as ImageIcon, MessageCircle } from 'lucide-react';
import { getInvitationDisplayTitle } from '../data/invitationCatalog.js';
import './zenLovePreviewPage.css';

export default function ZenLovePreviewPage({ item }) {
  const title = item.name || getInvitationDisplayTitle(item.slug);

  return (
    <main className="zenlove-preview-page">
      <header className="zenlove-preview-header">
        <a href="/mau-thiep" className="zenlove-preview-back"><ArrowLeft size={16} /> Thư viện mẫu</a>
        <span className="zenlove-preview-mark">LỜI HẸN · ZENLOVE CATALOG</span>
        <a href="https://zalo.me/loihenstudio" target="_blank" rel="noreferrer" className="zenlove-preview-contact"><MessageCircle size={16} /> Liên hệ studio</a>
      </header>

      <section className="zenlove-preview-shell">
        <div className="zenlove-preview-copy">
          <span className="zenlove-preview-kicker"><ImageIcon size={14} /> LOCAL CATALOG PREVIEW</span>
          <h1>{title}</h1>
          <p className="zenlove-preview-slug">{item.slug}</p>
          <div className="zenlove-preview-notice">
            <strong>Đây là bản preview catalog, chưa phải template local có thể chỉnh sửa.</strong>
            <span>Ảnh được lưu local để đối chiếu đúng mẫu ZenLove. Khi có source/export hợp lệ, mẫu này sẽ được dựng thành scene riêng và cập nhật manifest.</span>
          </div>
          <dl className="zenlove-preview-meta">
            <div><dt>Loại catalog</dt><dd>{item.templateType?.toUpperCase() || 'ZENLOVE'}</dd></div>
            <div><dt>Trang gốc</dt><dd>{item.targetPageType || '—'}</dd></div>
            <div><dt>Trạng thái</dt><dd>CATALOG-ONLY</dd></div>
          </dl>
          <div className="zenlove-preview-actions">
            <a href="https://zalo.me/loihenstudio" target="_blank" rel="noreferrer" className="zenlove-preview-primary"><MessageCircle size={16} /> Đặt thiệp theo cảm hứng này</a>
            {item.zenlovePreviewPath && <a href={`https://zenlove.me${item.zenlovePreviewPath}`} target="_blank" rel="noreferrer" className="zenlove-preview-secondary"><ExternalLink size={16} /> Xem nguồn ZenLove</a>}
          </div>
        </div>
        <figure className="zenlove-preview-figure">
          <img src={item.localPreviewPath} alt={`Preview local ${title}`} />
          <figcaption>Preview local · không đại diện cho scene đã dựng</figcaption>
        </figure>
      </section>
    </main>
  );
}