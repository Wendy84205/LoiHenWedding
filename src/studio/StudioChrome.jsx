import React from 'react';
import './studioHome.css';

export function StudioHeader() {
  return (
    <header className="studioHeader studioCatalogHeader">
      <a className="studioBrand" href="/mau-thiep" aria-label="Lời Hẹn Wedding Studio - Kho mẫu thiệp">
        <span>LH</span>
        <strong>Lời Hẹn<small>Wedding Studio</small></strong>
      </a>
      <p className="studioCatalogTagline">Thiệp cưới online · Xem &amp; đặt mẫu</p>
      <a className="studioHeaderAction" href="https://zalo.me/loihenstudio" target="_blank" rel="noreferrer">Liên hệ Zalo</a>
    </header>
  );
}

export function StudioFooter() {
  return (
    <footer className="studioFooter studioCatalogFooter">
      <a className="studioBrand" href="/mau-thiep"><span>LH</span><strong>Lời Hẹn<small>Wedding Studio</small></strong></a>
      <p>Thiệp cưới online · Xem live từng mẫu và chọn phong cách cho ngày vui của bạn.</p>
      <div><a href="/mau-thiep">Kho mẫu thiệp</a><a href="https://zalo.me/loihenstudio" target="_blank" rel="noreferrer">Liên hệ Zalo</a></div>
    </footer>
  );
}
