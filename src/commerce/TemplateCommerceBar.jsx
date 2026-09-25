import React from 'react';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { getInvitationDisplayTitle } from '../data/invitationCatalog.js';
import './templateCommerceBar.css';

export default function TemplateCommerceBar({ slug }) {
  return (
    <aside className="templateCommerceBar" aria-label="Hành động cho mẫu thiệp">
      <a className="templateCommerceBack" href="/mau-thiep" aria-label="Quay lại thư viện mẫu">
        <ArrowLeft />
      </a>
      <div className="templateCommerceIdentity">
        <small>MẪU THIỆP CƯỚI ONLINE</small>
        <strong>{getInvitationDisplayTitle(slug)}</strong>
      </div>
      <a className="templateCommerceAction" href="https://zalo.me/loihenstudio" target="_blank" rel="noreferrer">
        <MessageCircle />
        <span>Liên hệ đặt qua Zalo</span>
      </a>
    </aside>
  );
}
