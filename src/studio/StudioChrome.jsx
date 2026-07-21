import React from 'react';
import { CalendarDays } from 'lucide-react';
import './studioHome.css';

export function StudioHeader() {
  return (
    <header className="studioHeader">
      <a className="studioBrand" href="/" aria-label="Lời Hẹn Studio - Trang chủ">
        <span>LH</span>
        <strong>Lời Hẹn<small>Wedding Studio</small></strong>
      </a>
      <nav className="studioNav" aria-label="Điều hướng chính">
        <a href="/#dich-vu">Dịch vụ</a>
        <a href="/mau-thiep">Mẫu thiệp</a>
        <a href="/dich-vu/trinh-chieu">Trình chiếu</a>
        <a href="/dat-thiep">Đặt thiệp</a>
        <a href="/tai-khoan">Đăng nhập</a>
      </nav>
      <a className="studioHeaderAction" href="/tu-van"><CalendarDays size={16} /> Đặt lịch</a>
    </header>
  );
}

export function StudioFooter() {
  return (
    <footer className="studioFooter">
      <a className="studioBrand" href="/"><span>LH</span><strong>Lời Hẹn<small>Wedding Studio</small></strong></a>
      <p>Thiệp cưới online, tráp cưới và trình chiếu được kể trong cùng một câu chuyện.</p>
      <div><a href="/mau-thiep">Mẫu thiệp</a><a href="/tai-khoan">Tài khoản</a><a href="/tu-van">Tư vấn</a><a href="/chinh-sach-bao-mat">Bảo mật</a><a href="/dieu-khoan-dich-vu">Điều khoản</a></div>
    </footer>
  );
}
