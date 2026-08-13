import React from 'react';
import { ArrowLeft, CalendarDays, CircleCheckBig, PenLine } from 'lucide-react';
import { getInvitationDisplayTitle } from '../data/invitationCatalog.js';
import { catalogTemplateSlugs, editableTemplateSlugs } from './invitationContent.js';
import './templateCommerceBar.css';

export default function TemplateCommerceBar({ slug }) {
  const editable = editableTemplateSlugs.includes(slug);
  const available = catalogTemplateSlugs.includes(slug);
  const params = new URLSearchParams({
    service: 'Thiệp cưới Online',
    template: slug,
  });
  const action = editable
    ? {
      href: `/dat-thiep?template=${encodeURIComponent(slug)}&source=template-preview`,
      label: 'Tùy chỉnh mẫu',
      Icon: PenLine,
    }
    : {
      href: `/tu-van?${params.toString()}`,
      label: available ? 'Đặt thiết kế theo mẫu' : 'Tư vấn mẫu tương tự',
      Icon: CalendarDays,
    };

  return (
    <aside className="templateCommerceBar" aria-label="Hành động cho mẫu thiệp">
      <a className="templateCommerceBack" href="/mau-thiep" aria-label="Quay lại thư viện mẫu">
        <ArrowLeft />
      </a>
      <div className="templateCommerceIdentity">
        <small>{editable ? 'CÓ THỂ TỰ CHỈNH SỬA' : available ? 'STUDIO CÁ NHÂN HÓA' : 'MẪU THAM KHẢO'}</small>
        <strong>{getInvitationDisplayTitle(slug)}</strong>
        {editable && <span className="templateCommerceMeta"><CircleCheckBig /> Tạo nháp miễn phí · Quét QR 50.000đ khi phát hành</span>}
      </div>
      <a className="templateCommerceAction" href={action.href}>
        <action.Icon />
        <span>{action.label}</span>
      </a>
    </aside>
  );
}
