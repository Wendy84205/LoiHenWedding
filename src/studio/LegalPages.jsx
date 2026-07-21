import React from 'react';
import { ArrowLeft, FileText, ShieldCheck } from 'lucide-react';
import { StudioFooter, StudioHeader } from './StudioChrome.jsx';
import './studioLegal.css';

const privacySections = [
  ['Thông tin được thu thập', 'Khi đặt thiệp, hệ thống nhận họ tên, số điện thoại, email hoặc Zalo, thông tin lễ cưới, ảnh, nhạc và biên nhận thanh toán do khách cung cấp. Khi khách mời gửi RSVP hoặc lời chúc, hệ thống lưu họ tên, số điện thoại nếu có, lựa chọn tham dự, số người đi cùng và nội dung gửi.'],
  ['Mục đích sử dụng', 'Dữ liệu chỉ được dùng để vận hành thiệp, tổng hợp khách tham dự, liên hệ tư vấn và bàn giao kết quả cho chủ thiệp. Studio không bán dữ liệu cho bên thứ ba.'],
  ['Thời gian lưu trữ', 'Dữ liệu đơn hàng và thiệp được lưu trong thời hạn 12, 18 hoặc 24 tháng tùy gói, trừ khi báo giá ghi thời hạn khác. Chủ thiệp có thể yêu cầu xuất hoặc xóa sớm; bản sao lưu kỹ thuật có thể cần thêm thời gian để được ghi đè an toàn.'],
  ['Chia sẻ và bảo mật', 'Dữ liệu được xử lý trên hạ tầng Vercel và Supabase để vận hành website, cơ sở dữ liệu và kho tệp riêng tư. Hệ thống dùng link có khóa, phiên đăng nhập quản trị, URL tệp có thời hạn và mã hóa truyền tải; chủ thiệp có trách nhiệm không đăng công khai link quản lý đơn hàng.'],
  ['Dữ liệu kỹ thuật', 'Hệ thống có thể lưu bản băm địa chỉ mạng trong thời gian giới hạn để chống spam và lạm dụng. Bản băm này không được dùng để quảng cáo hay theo dõi hành vi ngoài dịch vụ.'],
  ['Quyền của người dùng', 'Bạn có thể yêu cầu xem, sửa, xuất hoặc xóa dữ liệu cá nhân bằng kênh liên hệ ghi trên đơn hàng. Yêu cầu được xác minh trước khi thực hiện.'],
];

const termsSections = [
  ['Phạm vi dịch vụ', 'Sản phẩm bàn giao gồm các hạng mục được ghi trong báo giá: giao diện thiệp, nội dung, hình ảnh, nhạc, RSVP, lời chúc, QR, bản đồ và thời hạn lưu trữ tùy gói.'],
  ['Nội dung và bản quyền', 'Khách hàng chịu trách nhiệm bảo đảm quyền sử dụng đối với ảnh, nhạc, logo và nội dung cung cấp. Studio chỉ sử dụng các chất liệu này để thực hiện đơn hàng.'],
  ['Chỉnh sửa và nghiệm thu', 'Số vòng chỉnh sửa, thời gian phản hồi và mốc nghiệm thu được chốt trước khi triển khai. Yêu cầu ngoài phạm vi có thể được báo giá bổ sung.'],
  ['Đặt cọc và thanh toán', 'Đơn hàng bắt đầu được thiết kế sau khi tiền cọc được xác nhận. Lịch thanh toán, điều kiện hoàn cọc và chi phí phát sinh được ghi trong báo giá; biên nhận tải lên chỉ dùng để đối soát giao dịch.'],
  ['Đường link và lưu trữ', 'Link chính thức hoạt động trong thời hạn của gói. Gia hạn tên miền, lưu trữ hoặc dịch vụ dữ liệu được thông báo trước ngày hết hạn.'],
  ['RSVP và dữ liệu khách mời', 'Chủ thiệp chịu trách nhiệm về danh sách khách được nhập hoặc tải lên. Studio bàn giao dữ liệu theo định dạng thống nhất và xóa dữ liệu theo yêu cầu hợp lệ.'],
  ['Thay đổi và gián đoạn', 'Studio có thể bảo trì để bảo đảm an toàn và hiệu năng. Nếu thay đổi ảnh hưởng đáng kể đến đơn hàng đang hoạt động, chủ thiệp sẽ được thông báo theo kênh đã đăng ký.'],
  ['Bàn giao', 'Gói bàn giao có thể gồm link thiệp chính thức, QR PNG, ảnh chia sẻ 1200×630, CSV RSVP hoặc danh sách khách và quyền truy cập cổng đơn hàng trong thời hạn đã thỏa thuận.'],
];

function LegalPage({ type }) {
  const privacy = type === 'privacy';
  const Icon = privacy ? ShieldCheck : FileText;
  const title = privacy ? 'Chính sách bảo mật' : 'Điều khoản dịch vụ';
  const description = privacy
    ? 'Cách Lời Hẹn Studio tiếp nhận, sử dụng và bàn giao dữ liệu trong thiệp cưới online.'
    : 'Những nguyên tắc áp dụng khi đặt làm, nghiệm thu và sử dụng sản phẩm của Lời Hẹn Studio.';
  const sections = privacy ? privacySections : termsSections;

  return (
    <main className="studioLegalPage">
      <StudioHeader />
      <header className="studioLegalHero">
        <span><Icon size={18} /> THÔNG TIN PHÁP LÝ</span>
        <h1>{title}</h1>
        <p>{description}</p>
        <time dateTime="2026-07-15">Cập nhật ngày 15/07/2026</time>
      </header>
      <article className="studioLegalContent">
        {sections.map(([heading, body], index) => (
          <section key={heading}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div><h2>{heading}</h2><p>{body}</p></div>
          </section>
        ))}
        <p className="studioLegalContact">Thông tin liên hệ chính thức sẽ được ghi trong báo giá và link thiệp bàn giao của từng đơn hàng.</p>
      </article>
      <StudioFooter />
    </main>
  );
}

export function PrivacyPage() {
  return <LegalPage type="privacy" />;
}

export function TermsPage() {
  return <LegalPage type="terms" />;
}

export function NotFoundPage() {
  return (
    <main className="studioLegalPage studioNotFound">
      <StudioHeader />
      <section>
        <span>404</span>
        <h1>Trang bạn tìm không tồn tại.</h1>
        <p>Đường link có thể đã thay đổi hoặc mẫu thiệp đã hết thời gian lưu trữ.</p>
        <a href="/"><ArrowLeft size={17} /> Về trang chủ</a>
      </section>
      <StudioFooter />
    </main>
  );
}
