# Quy trình vận hành thiệp cưới online

## 1. Tiếp nhận yêu cầu tư vấn

Khách có thể gửi yêu cầu tại trang chủ hoặc `/tu-van`. Yêu cầu mới xuất hiện trong tab `Tư vấn` tại `/admin` với mã `LH-TV-*`; không dùng dữ liệu lưu cục bộ trên trình duyệt để vận hành đơn thật.

Trạng thái lead:

1. `Mới`: chưa liên hệ.
2. `Đã liên hệ`: studio đã gọi hoặc nhắn cho khách.
3. `Đủ điều kiện`: đã xác nhận nhu cầu, ngày cưới và phạm vi ngân sách.
4. `Đã thành đơn`: đã tạo đơn chính thức tại `/dat-thiep` và ghi mã đơn vào ghi chú nội bộ.
5. `Không tiếp tục`: khách từ chối hoặc không còn nhu cầu; ghi lý do ngắn gọn để thống kê.

Không chuyển lead sang `Đã thành đơn` nếu chưa có mã đơn chính thức. Số điện thoại, email, ghi chú và lịch hẹn là dữ liệu nội bộ, không đưa vào nội dung thiệp hoặc chia sẻ ra ngoài.

## 2. Tiếp nhận đơn

Khách chọn gói, mẫu, ngày cưới và địa điểm tại `/dat-thiep`. Sau khi gửi, khách nhận mã đơn và link cổng riêng. Studio lưu lại link này trong phiếu đơn nhưng không đăng công khai.

Khi Resend đã được cấu hình, hệ thống gửi email báo đơn mới cho studio và email chứa mã đơn/link quản lý ban đầu cho khách. Nếu email lỗi, đơn vẫn được lưu; quản trị viên phải lấy link trong `/admin` và gửi lại bằng kênh đã xác minh.

Trạng thái khuyến nghị:

1. `Chờ cọc`: đơn vừa tạo.
2. `Đang thiết kế`: đã xác nhận cọc và đủ tư liệu.
3. `Chờ duyệt`: đã gửi bản xem trước.
4. `Chỉnh sửa`: khách gửi yêu cầu trong số vòng của gói.
5. `Đã duyệt`: khách chốt nội dung.
6. `Đã phát hành`: link chính thức đã hoạt động.

## 3. Cọc và tư liệu

Khách tải biên nhận trong cổng đơn hàng; trạng thái cọc tự chuyển thành `Đã gửi biên nhận`. Quản trị viên đối soát tài khoản ngân hàng rồi chọn `Đã nhận`.

Tư liệu cần kiểm tra trước khi thiết kế:

- Ảnh bìa, ảnh cô dâu, chú rể, cặp đôi, địa điểm, ảnh kết và album.
- File nhạc có quyền sử dụng, định dạng MP3 hoặc MP4 audio.
- Tên hai gia đình, ngày âm lịch, giờ và địa chỉ chính xác.
- Link Google Maps mở đúng vị trí.
- QR mừng cưới chỉ thêm khi khách yêu cầu và đã xác nhận thông tin tài khoản.

Kho tệp là riêng tư; website chỉ phát URL có thời hạn. Không chép ảnh khách vào `public/assets`.

## 4. Thiết kế và duyệt

Trong `/admin/orders/:id`:

1. Điền toàn bộ nội dung và timeline.
2. Tải đúng loại ảnh; tệp mới nhất của mỗi loại được dùng khi render.
3. Nhấn `Lưu`, sau đó `Xem thiệp`. Link admin xem bản nháp hết hạn sau một giờ.
4. Gửi link cổng khách hàng để khách mở bản nháp bằng khóa riêng của họ.
5. Mỗi yêu cầu chỉnh sửa làm tăng bộ đếm; hệ thống chặn khi vượt giới hạn gói.

## 5. Phát hành

Trước khi nhấn `Phát hành thiệp`, kiểm tra:

- Tên, chính tả, ngày giờ, địa điểm, bản đồ và lịch.
- Ảnh không vỡ, không sai người, không lộ dữ liệu ngoài phạm vi.
- Nhạc phát được sau thao tác của người dùng.
- Mobile không tràn ngang; animation không che nội dung.
- RSVP và lời chúc gửi thành công.
- Slug ngắn, không dấu và chưa được dùng.
- Ngày hết hạn đúng gói 12, 18 hoặc 24 tháng.

Sau phát hành, tạo ảnh chia sẻ 1200x630, tải QR PNG và thử link trên mạng di động trước khi gửi khách.

## 6. Khách mời cá nhân hóa

Thêm từng khách trong panel `Khách mời`, gồm tên, nhóm và số người được mời. Link ký riêng hiển thị tên khách và giới hạn số người RSVP. Xuất CSV để gửi hàng loạt qua công cụ của khách; không đăng file CSV công khai.

## 7. Gói bàn giao

Mỗi đơn hoàn chỉnh gồm:

- Link thiệp chính thức.
- QR PNG độ phân giải 1200 px.
- Ảnh chia sẻ 1200x630.
- CSV danh sách khách và link cá nhân hóa nếu dùng.
- CSV RSVP tại thời điểm bàn giao và quyền xem dashboard trong thời gian hỗ trợ.
- Ngày hết hạn, số vòng chỉnh sửa và điều kiện gia hạn ghi rõ trong báo giá.

## 8. Sau sự kiện

Xuất RSVP trước khi hết hạn. Cron hằng ngày tự đóng thiệp quá hạn và dọn upload bỏ dở; nhắc gia hạn cho chủ thiệp vẫn do studio thực hiện qua kênh đã đăng ký. Khi có yêu cầu xóa hợp lệ, chỉ quản trị viên được xóa vĩnh viễn đơn bằng cách nhập đúng mã đơn; tài sản lỗi khi xóa sẽ được đưa vào hàng đợi để cron thử lại. Lưu bằng chứng đã xử lý yêu cầu trong hồ sơ vận hành nội bộ.

## 9. Kiểm tra vận hành hằng ngày

- Mở `/api/health`; production phải trả `ready: true` và `runtime.schema: true`.
- Kiểm tra email đơn/tư vấn mới, đơn chờ cọc và biên nhận mới tải lên.
- Xem log Vercel của `/api/maintenance`; xử lý nếu job dọn Storage liên tục thất bại.
- Theo dõi dung lượng Storage, Database và số lần gọi Function trên Supabase/Vercel.
- Không gửi link có token quản lý qua nhóm công khai; khi nghi bị lộ, thu hồi link trong cổng quản trị.

## 10. Sự cố

Nếu link lỗi trong thời gian diễn ra sự kiện: giữ nguyên slug, kiểm tra `/api/health`, trạng thái Vercel, Supabase và ngày hết hạn trước. Không tạo link mới hoặc in lại QR khi chưa xác định link cũ không thể phục hồi.
