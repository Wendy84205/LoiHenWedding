# Lời Hẹn Wedding Studio

Website React/Vite cho ba dịch vụ cưới: thiệp cưới online, tráp cưới và trình chiếu ảnh cưới. Thư viện hiện có 108 mẫu xem trước và được nối vào quy trình đặt thiệp theo từng đơn.

## Chạy dự án

```bash
npm install
npm run dev
```

Kiểm tra toàn bộ:

```bash
npm run qa
```

## Khu vực thương mại

- `/dat-thiep`: khách gửi yêu cầu và nhận link đơn hàng riêng.
- `/tai-khoan`: khách đăng nhập Magic Link, quản lý nhiều đơn và nhận đơn cũ bằng link riêng.
- `/don-hang/:id?token=...`: khách tải ảnh, nhạc, biên nhận và yêu cầu chỉnh sửa.
- `/admin`: quản trị đơn, nội dung, tài sản, khách mời, RSVP và phát hành.
- `/w/:slug`: thiệp chính thức hoặc bản xem trước có token.
- `/api/health`: trạng thái cấu hình backend.

Các URL `/api/*` được gom qua một Vercel Function tại `api/router.js`; handler nghiệp vụ nằm trong `endpoints/`. Cấu trúc này giữ nguyên hợp đồng API nhưng nằm trong giới hạn function của gói Vercel hiện tại.

Ở local, hệ thống tự dùng dữ liệu demo trong trình duyệt. Production chỉ nhận đơn khi Supabase được cấu hình; thiếu khóa sẽ khóa form an toàn.

## Tài liệu

- [Thiết lập Supabase và Vercel](docs/SUPABASE_SETUP.md)
- [Quy trình vận hành đơn hàng](docs/COMMERCIAL_OPERATIONS.md)

Không đưa `SUPABASE_SERVICE_ROLE_KEY`, `DATA_HASH_SALT` hoặc link cổng khách hàng vào source code, ảnh chụp công khai hay tin nhắn nhóm.
