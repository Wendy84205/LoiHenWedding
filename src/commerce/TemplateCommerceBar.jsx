import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { getInvitationDisplayTitle } from '../data/invitationCatalog.js';
import './templateCommerceBar.css';

export default function TemplateCommerceBar({ slug }) {
  const templateNumber = slug.match(/^thiep-cuoi-(\d+)$/)?.[1];
  const title = templateNumber ? `Thiệp cưới số ${templateNumber}` : getInvitationDisplayTitle(slug);
  return (
    <aside className="templateCommerceBar" aria-label="Thông tin mẫu thiệp">
      <a className="templateCommerceBack" href="/mau-thiep" aria-label="Quay lại thư viện mẫu">
        <ArrowLeft />
      </a>
      <div className="templateCommerceIdentity">
        <strong>{title}</strong>
      </div>
    </aside>
  );
}
