# Thiết lập Supabase và Vercel

## 1. Tạo database

1. Tạo một dự án Supabase dùng riêng cho website.
2. Mở SQL Editor và chạy theo thứ tự:
   - `supabase/migrations/202607150001_commerce.sql`
   - `supabase/migrations/202607150002_customer_accounts.sql`
   - `supabase/migrations/202607150003_template_switching.sql`
   - `supabase/migrations/202607160004_scene_design.sql`
   - `supabase/migrations/202607160005_scene_legacy_compat.sql`
   - `supabase/migrations/202607160006_consultation_leads.sql`
   - `supabase/migrations/202607160007_expand_editable_templates.sql`
   - `supabase/migrations/202607160008_production_hardening.sql`
   - `supabase/migrations/202607160009_atomic_publish.sql`
   - `supabase/migrations/202607160010_asset_cleanup_jobs.sql`
3. Kiểm tra các bảng `orders`, `invitations`, `assets`, `asset_upload_reservations`, `asset_cleanup_jobs`, `guests`, `rsvps`, `wishes`, `consultations` và bucket riêng tư `order-assets` đã xuất hiện.

Migration bật RLS và thu hồi toàn bộ quyền đọc bảng thương mại từ `anon`/`authenticated`. Trình duyệt không được đọc trực tiếp dữ liệu đơn hàng; các thao tác đi qua Vercel Functions và service role. Tệp được tải bằng signed upload URL nhưng phải khớp một reservation có thời hạn trước khi được ghi nhận vào đơn.

## 2. Tạo tài khoản quản trị

1. Trong Supabase Authentication, tạo user bằng email và mật khẩu mạnh.
2. Lấy UUID của user.
3. Chạy câu lệnh sau, thay UUID và tên hiển thị:

```sql
insert into public.profiles (id, display_name, role)
values ('UUID-CUA-USER', 'Quản trị Lời Hẹn', 'admin');
```

Tài khoản nhân viên có thể dùng role `staff`. Không chia sẻ chung một tài khoản giữa nhiều người.

## 3. Cấu hình đăng nhập khách hàng

1. Trong Supabase Authentication > URL Configuration, đặt Site URL là tên miền production.
2. Thêm `https://ten-mien-chinh-thuc.vn/tai-khoan` và URL preview cần dùng vào Redirect URLs.
3. Bật Email provider và mẫu email Magic Link.
4. Gửi thử link đăng nhập, mở `/tai-khoan`, tạo một đơn khi đã đăng nhập và kiểm tra đơn tự xuất hiện trong tài khoản.

### Đăng nhập bằng Google

1. Trong Google Auth Platform, tạo OAuth Client loại **Web application**.
2. Thêm origin production, ví dụ `https://ten-mien-chinh-thuc.vn`, vào **Authorized JavaScript origins**. Khi kiểm thử local có thể thêm `http://127.0.0.1:5173`.
3. Thêm callback của dự án Supabase vào **Authorized redirect URIs**: `https://PROJECT.supabase.co/auth/v1/callback`.
4. Trong Supabase Authentication > Providers > Google, bật provider rồi nhập Client ID và Client Secret vừa tạo.
5. Trong Supabase Authentication > URL Configuration, thêm các URL sau vào Redirect URLs:
   - `https://ten-mien-chinh-thuc.vn/tai-khoan`
   - `https://*-ten-du-an.vercel.app/tai-khoan` nếu cần thử deployment preview
   - `http://127.0.0.1:5173/tai-khoan` cho local
6. Mở `/tai-khoan`, bấm **Đăng nhập bằng Google** và xác nhận phiên đăng nhập vẫn còn sau khi tải lại trang.

Trong Supabase Auth nên bật CAPTCHA và giới hạn tần suất gửi Magic Link trước khi mở đăng ký công khai. Ở production chỉ giữ redirect URL chính xác; không dùng wildcard rộng hơn phạm vi preview cần thiết.

Chỉ yêu cầu ba scope cơ bản `openid`, `email` và `profile`. Không đưa Google Client Secret vào biến `VITE_*`; secret chỉ được lưu trong cấu hình provider của Supabase.

Khách đã đặt trước đó có thể dán link quản lý riêng tại `/tai-khoan` để nhận đơn vào tài khoản. Thao tác này yêu cầu đúng token đơn hàng và không thể chuyển một đơn đã thuộc tài khoản khác.

## 4. Cấu hình biến môi trường

Trong Vercel Project Settings > Environment Variables, thêm cho Production và Preview:

```text
VITE_SUPABASE_URL=https://PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=...
SUPABASE_URL=https://PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=...
DATA_HASH_SALT=...
GOOGLE_OAUTH_ENABLED=true
CRON_SECRET=...
RESEND_API_KEY=re_...
EMAIL_FROM=Loi Hen Studio <hello@ten-mien-chinh-thuc.vn>
STUDIO_NOTIFICATION_EMAIL=studio@ten-mien-chinh-thuc.vn
PUBLIC_SITE_URL=https://ten-mien-chinh-thuc.vn
VITE_PUBLIC_SITE_URL=https://ten-mien-chinh-thuc.vn
VITE_COMMERCE_DEMO=false
VITE_BANK_NAME=...
VITE_BANK_ACCOUNT=...
VITE_BANK_OWNER=...
```

Tạo `DATA_HASH_SALT` bằng:

```bash
openssl rand -base64 48
```

Tạo `CRON_SECRET` bằng lệnh tương tự. Vercel sẽ tự gửi khóa này trong header cho `/api/maintenance`; tác vụ chạy mỗi ngày để đóng thiệp hết hạn và dọn upload bỏ dở.

Xác minh tên miền gửi trong Resend rồi đặt `EMAIL_FROM` bằng địa chỉ thuộc tên miền đó. Hệ thống gửi thông báo đơn/tư vấn mới cho studio và email bàn giao link quản lý ban đầu cho khách; lỗi gửi mail không làm mất đơn đã lưu.

`SUPABASE_SERVICE_ROLE_KEY` và `DATA_HASH_SALT` là bí mật phía server. Tuyệt đối không đổi tên chúng thành biến bắt đầu bằng `VITE_`.

Để chạy production stack ở local, tạo `.env.local` từ `.env.example`; file này không được commit.

## 5. Deploy và kiểm tra

Sau khi thêm biến môi trường, redeploy bản Production. Kiểm tra:

1. `/api/health` trả `status: "ready"`, `ready: true`, `runtime.schema: true` và không còn mục nào trong `missing`. Chỉ đặt `GOOGLE_OAUTH_ENABLED=true` sau khi đã đăng nhập Google thành công ở cả preview và production.
2. Gửi một yêu cầu ở `/tu-van`, sau đó đăng nhập `/admin`, mở tab `Tư vấn` và cập nhật trạng thái lead.
3. Tạo một đơn thử ở `/dat-thiep`.
4. Đăng nhập `/admin`, xác nhận đơn xuất hiện.
5. Đăng nhập `/tai-khoan` bằng Magic Link và mở cổng khách không có token trong URL.
6. Tải một ảnh nhỏ, một file nhạc và biên nhận thử; xác nhận hạn mức gói hiển thị đúng.
7. Sửa nội dung, đổi sang một bố cục khác, khôi phục phiên bản trước và xác nhận cả nội dung lẫn bố cục đều trở lại đúng trạng thái đã lưu.
8. Mở bản nháp, phát hành và mở `/w/:slug` ở cửa sổ ẩn danh.
9. Gửi RSVP, lời chúc, tải QR và hai file CSV.
10. Kiểm tra ảnh chia sẻ bằng trình debug link của nền tảng sẽ sử dụng.

Vercel chỉ nhận một function `api/router.js`; các route công khai như `/api/orders` và `/api/publish` được rewrite nội bộ đến router. Không chuyển các file trong `endpoints/` trở lại `api/`, vì mỗi file ở đó sẽ bị tính thành một Serverless Function riêng.

## 6. Cấu hình chưa tự động hóa

- Thanh toán hiện dùng chuyển khoản và quản trị viên xác nhận thủ công.
- Email đơn hàng và yêu cầu tư vấn mới đã được gửi tự động qua Resend. Zalo, thông báo RSVP và nhắc gia hạn vẫn cần quy trình vận hành riêng.
- Cần bật backup và theo dõi chi phí trong tài khoản Supabase/Vercel của chủ dự án.
- Cần gắn tên miền chính thức trước khi in QR cho khách.
