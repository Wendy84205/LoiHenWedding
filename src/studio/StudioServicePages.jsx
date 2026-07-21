import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  CalendarDays,
  Check,
  ChevronRight,
  CircleCheck,
  Copy,
  ExternalLink,
  Gift,
  Mail,
  MonitorPlay,
  PenLine,
  Send,
  Sparkles,
} from 'lucide-react';
import { StudioFooter, StudioHeader } from './StudioChrome.jsx';
import { additionalInvitationItems, currentCatalogSlugs, getInvitationDisplayTitle } from '../data/invitationCatalog.js';
import { commerceAvailable, createConsultation } from '../commerce/commerceApi.js';
import { editableTemplateSlugs } from '../commerce/invitationContent.js';
import './studioServices.css';

const libraryContent = {
  invitations: {
    eyebrow: 'THƯ VIỆN THIỆP CƯỚI ONLINE',
    consultationService: 'Thiệp cưới Online',
    heading: 'Chọn một giao diện,',
    script: 'kể một câu chuyện riêng.',
    description: 'Các mẫu dưới đây đều là trang React độc lập, có animation và trải nghiệm xem tốt trên điện thoại.',
    serviceHero: {
      eyebrow: 'DỊCH VỤ THIỆP CƯỚI ONLINE TRỌN GÓI',
      heading: 'Hai bạn gửi chất liệu,',
      script: 'studio lo phần còn lại.',
      description: 'Từ chọn concept, xử lý ảnh và nội dung đến dựng animation, RSVP, link chính thức và QR bàn giao: mọi hạng mục được thực hiện trong một quy trình thống nhất.',
    },
    package: {
      eyebrow: 'MỘT GÓI, ĐỦ ĐỂ GỬI THIỆP',
      heading: 'Không chỉ mua một mẫu có sẵn.',
      script: 'Hai bạn nhận một thiệp đã hoàn thiện.',
      description: 'Mẫu trong thư viện là điểm bắt đầu. Studio thay toàn bộ ảnh, nội dung, ngày giờ, địa điểm, màu sắc và nhịp chuyển động để thiệp thực sự thuộc về hai bạn.',
      steps: [
        ['Chốt concept', 'Chọn mẫu, bảng màu và mức độ cá nhân hóa phù hợp với phong cách lễ cưới.'],
        ['Chuẩn hóa chất liệu', 'Biên tập nội dung, chọn ảnh, xử lý kích thước và sắp xếp câu chuyện theo đúng nhịp xem trên điện thoại.'],
        ['Dựng thiệp hoàn chỉnh', 'Thay thông tin, ảnh, nhạc, animation, bản đồ, RSVP, lời chúc và QR mừng cưới theo phạm vi đã chốt.'],
        ['Kiểm tra và bàn giao', 'Kiểm tra trên điện thoại, xuất bản link chính thức, tạo QR và hỗ trợ chỉnh sửa theo gói.'],
      ],
      deliverablesTitle: 'Bàn giao để hai bạn có thể gửi ngay',
      deliverables: [
        'Link thiệp chính thức và thời hạn lưu trữ ghi rõ',
        'File QR PNG dùng cho thiệp giấy hoặc tin nhắn',
        'Ảnh bìa 1200 × 630 cho Zalo và Facebook',
        'RSVP, lời chúc và danh sách khách theo gói đã chọn',
        'Bản kiểm tra mobile và số vòng chỉnh sửa đã thống nhất',
      ],
    },
    fullPackage: {
      eyebrow: 'BỘ BÀN GIAO THIỆP CƯỚI TRỌN GÓI',
      heading: 'Một link để gửi khách,',
      script: 'một hệ thống để theo dõi ngày vui.',
      description: 'Gói được thiết kế cho hai bạn muốn nhận sản phẩm hoàn chỉnh thay vì tự sửa template. Mọi thông tin bàn giao, thời hạn và số vòng chỉnh sửa đều được chốt trước khi bắt đầu.',
      included: [
        ['01', 'Thiệp đã cá nhân hóa', 'Thay toàn bộ ảnh, tên, ngày giờ, địa điểm, nội dung, màu sắc, nhạc và chuyển động theo concept đã duyệt.'],
        ['02', 'Link chính thức và QR', 'Một đường dẫn dễ gửi qua Zalo, Messenger; kèm QR PNG độ phân giải cao để dùng trên thiệp giấy và bảng đón khách.'],
        ['03', 'RSVP và lời chúc', 'Form xác nhận tham dự, số người đi cùng, lời chúc và trang quản lý dữ liệu được cấu hình khi triển khai đơn hàng thật.'],
        ['04', 'Album, bản đồ và mừng cưới', 'Album ảnh tối ưu mobile, nút mở Google Maps và QR mừng cưới theo thông tin hai bạn cung cấp.'],
        ['05', 'Bộ chia sẻ mạng xã hội', 'Ảnh bìa 1200 × 630, tiêu đề và mô tả hiển thị khi chia sẻ link trên Zalo hoặc Facebook.'],
        ['06', 'Dữ liệu và bản dự phòng', 'CSV danh sách khách, link cá nhân hóa nếu chọn, cùng bản sao cấu hình để studio có thể phục hồi khi cần.'],
      ],
      terms: [
        ['Thời gian lưu trữ', '12 tháng tính từ ngày xuất bản chính thức; có thể gia hạn theo nhu cầu.'],
        ['Phạm vi chỉnh sửa', '02 vòng chỉnh sửa nội dung và hình ảnh sau bản duyệt đầu tiên.'],
        ['Thời gian hoàn thiện', 'Chốt theo số lượng ảnh và mức cá nhân hóa sau khi nhận đủ chất liệu.'],
        ['Quyền riêng tư', 'Dữ liệu RSVP chỉ dùng để phục vụ đơn hàng và được bàn giao cho khách hàng.'],
      ],
    },
    library: {
      eyebrow: '108 MẪU LÀM ĐIỂM BẮT ĐẦU',
      heading: 'Chọn phong cách',
      script: 'hợp với câu chuyện của hai bạn.',
      description: 'Mỗi mẫu là một hướng nghệ thuật, không phải sản phẩm bàn giao cuối. Studio sẽ cá nhân hóa toàn bộ chất liệu sau khi hai bạn chọn được phong cách phù hợp.',
    },
    icon: Mail,
    hero: '/assets/template39/couple-red-seated.webp',
    tone: 'rose',
    categories: ['Tất cả', 'Editorial', 'Romantic red', 'Traditional', 'Botanical', 'Envelope', 'Seaside', 'Cinematic', 'Illustration', 'Monochrome', 'Destination'],
    items: [
      {
        title: 'Nắng Mai',
        category: 'Editorial',
        subtitle: 'Mẫu 61 · cream & gold',
        image: '/assets/template61/couple-hero.webp',
        details: ['Intro mở thiệp', 'Gallery 3-3-1', 'Lịch ngày cưới'],
        path: '/template/thiep-cuoi-61',
      },
      {
        title: 'Đỏ Nhung',
        category: 'Romantic red',
        subtitle: 'Mẫu 39 · red editorial',
        image: '/assets/template39/couple-red.webp',
        details: ['Love Story giấy', 'Timeline sticker', 'RSVP & countdown'],
        path: '/template/thiep-cuoi-39',
      },
      {
        title: 'Thiên Thanh',
        category: 'Cinematic',
        subtitle: 'Mẫu 44 · cinematic frame',
        image: '/assets/template44/mountain-couple.webp',
        details: ['Envelope opening', 'Photo narrative', 'Lịch & hộp quà'],
        path: '/template/thiep-cuoi-44',
      },
      {
        title: 'Hỷ Đỏ',
        category: 'Traditional',
        subtitle: 'Mẫu 47 · burgundy ceremony',
        image: '/assets/template39/couple-red.webp',
        details: ['Lịch ngày cưới', 'Countdown & RSVP', 'Hiệu ứng trái tim rơi'],
        path: '/template/thiep-cuoi-47',
      },
      {
        title: 'Hồng Thư',
        category: 'Envelope',
        subtitle: 'Mẫu 42 · blush invitation',
        image: '/assets/template61/couple-close.webp',
        details: ['Phong bì đỏ mở thiệp', 'Lịch, timeline & RSVP', 'QR mừng cưới'],
        path: '/template/thiep-cuoi-42',
      },
      {
        title: 'Lục Ảnh',
        category: 'Cinematic',
        subtitle: 'Mẫu 2 · green editorial',
        image: '/assets/template61/gallery-4.webp',
        details: ['Love Story dạng tạp chí', 'Lịch & countdown', 'Địa điểm, bản đồ & RSVP'],
        path: '/template/thiep-cuoi-2',
      },
      {
        title: 'Hỷ Duyên',
        category: 'Romantic red',
        subtitle: 'Mẫu 38 · wine red collage',
        image: '/assets/template39/couple-red-seated.webp',
        details: ['Hero song hỷ', 'Lịch, bản đồ & RSVP', 'Collage ảnh chuyển động'],
        path: '/template/thiep-cuoi-38',
      },
      {
        title: 'Tơ Hồng',
        category: 'Romantic red',
        subtitle: 'Mẫu 46 · burgundy modern',
        image: '/assets/template44/couple-sticker.webp',
        details: ['Hero ảnh vòm', 'Hai lịch tiệc & countdown', 'RSVP và hộp quà'],
        path: '/template/thiep-cuoi-46',
      },
      {
        title: 'Mai Anh',
        category: 'Editorial',
        subtitle: 'Mẫu 36 · soft pink editorial',
        image: '/assets/template61/couple-close.webp',
        details: ['Bố cục tạp chí dài', 'Lịch, bản đồ & lời nhắn', 'RSVP và QR mừng cưới'],
        path: '/template/thiep-cuoi-36',
      },
      {
        title: 'Phương Nga',
        category: 'Romantic red',
        subtitle: 'Mẫu 40 · white & muted rose',
        image: '/assets/template44/couple-sticker.webp',
        details: ['Countdown trên hero', 'Lịch giấy & timeline', 'RSVP và hộp quà'],
        path: '/template/thiep-cuoi-40',
      },
      {
        title: 'Thảo My',
        category: 'Editorial',
        subtitle: 'Mẫu 16 · sepia keepsake',
        image: '/assets/template39/couple-red-seated.webp',
        details: ['Ảnh vòm cổ điển', 'Collage chuyện tình', 'Ngày cưới, bản đồ & RSVP'],
        path: '/template/thiep-cuoi-16',
      },
      {
        title: 'Mộc Nhiên',
        category: 'Botanical',
        subtitle: 'Mẫu 48 · botanical green',
        image: '/assets/template44/mountain-couple.webp',
        details: ['Phong bì tương tác', 'Timeline & countdown', 'Album ảnh dài & RSVP'],
        path: '/template/thiep-cuoi-48',
      },
      {
        title: 'Bảo Anh',
        category: 'Editorial',
        subtitle: 'Mẫu 19 · cream minimal',
        image: '/assets/template39/couple-red-seated.webp',
        details: ['Hero váy cưới', 'Love story tạp chí', 'Liên hệ, bản đồ & RSVP'],
        path: '/template/thiep-cuoi-19',
      },
      {
        title: 'Hải Lam', category: 'Seaside', subtitle: 'Mẫu 1 · blue seaside',
        image: '/assets/new-templates/thiep-cuoi-1/preview.webp', details: ['Hero toàn màn hình', 'Film frame & album biển', 'Lịch, timeline & RSVP'], path: '/template/thiep-cuoi-1',
      },
      {
        title: 'Khánh Hỷ Studio', category: 'Editorial', subtitle: 'Mẫu 56 · studio classic',
        image: '/assets/new-templates/thiep-cuoi-56/preview.jpg', details: ['Ảnh studio trang trọng', 'Ngày cưới đỏ cổ điển', 'Countdown & album'], path: '/template/thiep-cuoi-56',
      },
      {
        title: 'Hỷ Xanh', category: 'Traditional', subtitle: 'Mẫu Tone Xanh · mint invitation',
        image: '/assets/new-templates/thiep-cuoi-tone-xanh/preview.png', details: ['Thiệp xanh truyền thống', 'Hai địa điểm gia đình', 'Minh hoạ & RSVP'], path: '/template/thiep-cuoi-tone-xanh',
      },
      {
        title: 'Lam Thư', category: 'Envelope', subtitle: 'Mẫu 53 · cobalt envelope',
        image: '/assets/new-templates/thiep-cuoi-53/preview.webp', details: ['Phong bì xanh', 'Timeline & dresscode', 'Album chọn ảnh'], path: '/template/thiep-cuoi-53',
      },
      {
        title: 'Valentine Red', category: 'Romantic red', subtitle: 'Mẫu 5 · deep red minimal',
        image: '/assets/new-templates/thiep-cuoi-5/preview.webp', details: ['Red minimal editorial', 'Ảnh cặp đôi đối xứng', 'Calendar & RSVP'], path: '/template/thiep-cuoi-5',
      },
      {
        title: 'Trăng Vườn', category: 'Botanical', subtitle: 'Mẫu 23 · moon garden',
        image: '/assets/new-templates/thiep-cuoi-23/preview.jpg', details: ['Vườn cưới film grain', 'Thơ trăng & collage', 'Lịch, timeline & album'], path: '/template/thiep-cuoi-23',
      },
      {
        title: 'Ribbon Love', category: 'Editorial', subtitle: 'Mẫu 7 · white red ribbon',
        image: '/assets/new-templates/thiep-cuoi-7/preview.webp', details: ['Editorial ribbon đỏ', 'Ảnh kể chuyện', 'Timeline & album'], path: '/template/thiep-cuoi-7',
      },
      {
        title: 'Song Hỷ', category: 'Traditional', subtitle: 'Mẫu 17 · classic red',
        image: '/assets/new-templates/thiep-cuoi-17/preview.jpg', details: ['Hero song hỷ', 'Chân dung cô dâu chú rể', 'Lịch & hộp quà'], path: '/template/thiep-cuoi-17',
      },
      {
        title: 'Red Scrapbook', category: 'Editorial', subtitle: 'Mẫu 8 · torn paper collage',
        image: '/assets/new-templates/thiep-cuoi-8/preview.webp', details: ['Ảnh cutout', 'Hiệu ứng giấy xé', 'Album collage'], path: '/template/thiep-cuoi-8',
      },
      {
        title: 'Hỷ Vòm', category: 'Romantic red', subtitle: 'Mẫu 49 · festive arch',
        image: '/assets/new-templates/thiep-cuoi-49/preview.jpg', details: ['Hero vòm đỏ', 'Confetti & song hỷ', 'Album & RSVP'], path: '/template/thiep-cuoi-49',
      },
      {
        title: 'Love Life', category: 'Traditional', subtitle: 'Mẫu 11 · red classic',
        image: '/assets/new-templates/thiep-cuoi-11/preview.jpg', details: ['Red portrait classic', 'Lời thề tình yêu', 'Lịch & album'], path: '/template/thiep-cuoi-11',
      },
      {
        title: 'Hoa Trắng', category: 'Botanical', subtitle: 'Mẫu 28 · white botanical',
        image: '/assets/new-templates/thiep-cuoi-28/preview.jpg', details: ['Hero hoa trắng', 'Chân dung bo vòm', 'Album blooming'], path: '/template/thiep-cuoi-28',
      },
      {
        title: 'Nắng Đất', category: 'Editorial', subtitle: 'Mẫu 52 · warm earth',
        image: '/assets/new-templates/thiep-cuoi-52/preview.webp', details: ['Warm editorial', 'Triptych invitation', 'Album lưới ảnh'], path: '/template/thiep-cuoi-52',
      },
      {
        title: 'Hồng Phấn', category: 'Envelope', subtitle: 'Mẫu 60 · pink envelope',
        image: '/assets/new-templates/thiep-cuoi-60/preview.png', details: ['Phong bì mở tương tác', 'Pink profile layout', 'Calendar & album'], path: '/template/thiep-cuoi-60',
      },
      {
        title: 'Black & White', category: 'Monochrome', subtitle: 'Mẫu BW 1 · monochrome',
        image: '/assets/new-templates/thiep-bw-1/preview.jpg', details: ['Ảnh đen trắng', 'Typography tối giản', 'RSVP compact'], path: '/template/thiep-bw-1',
      },
      {
        title: 'Hỷ Họa', category: 'Illustration', subtitle: 'Mẫu 21 · illustrated traditional',
        image: '/assets/new-templates/thiep-cuoi-21/preview.png', details: ['Minh hoạ song hỷ', 'Thư mời viết tay', 'Họa tiết chuyển động'], path: '/template/thiep-cuoi-21',
      },
      {
        title: 'Hoàng Hôn', category: 'Cinematic', subtitle: 'Mẫu 57 · sunset gold',
        image: '/assets/new-templates/thiep-cuoi-57/preview.jpg', details: ['Hero hoàng hôn', 'Hai tiệc gia đình', 'Golden hour album'], path: '/template/thiep-cuoi-57',
      },
      {
        title: 'Mono Player', category: 'Monochrome', subtitle: 'Mẫu 31 · compact music',
        image: '/assets/new-templates/thiep-cuoi-31/preview.jpg', details: ['Trình phát nhạc', 'Profile tròn', 'Thiệp ngắn tối giản'], path: '/template/thiep-cuoi-31',
      },
      {
        title: 'Mộc Trắng', category: 'Botanical', subtitle: 'Mẫu 55 · green portrait',
        image: '/assets/new-templates/thiep-cuoi-55/preview.jpg', details: ['Profile dạng hồ sơ', 'Xanh mộc & hoa trắng', 'Album dài'], path: '/template/thiep-cuoi-55',
      },
      {
        title: 'Kim Thư', category: 'Envelope', subtitle: 'Mẫu 50 · golden envelope',
        image: '/assets/new-templates/thiep-cuoi-50/preview.png', details: ['Phong bì vàng mở thật', 'Lịch ánh kim', 'Album & RSVP'], path: '/template/thiep-cuoi-50',
      },
      {
        title: 'Sơn Ca', category: 'Destination', subtitle: 'Mẫu 30 · mountain green',
        image: '/assets/new-templates/thiep-cuoi-30/preview.jpg', details: ['Ảnh cưới núi rừng', 'Green editorial', 'Destination wedding'], path: '/template/thiep-cuoi-30',
      },
      {
        title: 'Love on Repeat', category: 'Cinematic', subtitle: 'Mẫu 6 · black music player',
        image: '/assets/new-templates/thiep-cuoi-6/preview.webp', details: ['Dark album player', 'Ảnh cutout neon', 'Countdown & RSVP'], path: '/template/thiep-cuoi-6',
      },
      {
        title: 'Navy Blossom', category: 'Illustration', subtitle: 'Mẫu 54 · navy & pink',
        image: '/assets/new-templates/thiep-cuoi-54/preview.png', details: ['Navy family panels', 'Sticker minh hoạ', 'Pink floral accent'], path: '/template/thiep-cuoi-54',
      },
      {
        title: 'Palace Night', category: 'Illustration', subtitle: 'Mẫu 62 · watercolor palace',
        image: '/assets/new-templates/thiep-cuoi-62/preview.png', details: ['Cung điện màu nước', 'Lavender fairytale', 'Album cổ tích'], path: '/template/thiep-cuoi-62',
      },
      {
        title: 'Ngày Vui', category: 'Illustration', subtitle: 'Mẫu 104 · playful drawing',
        image: '/assets/new-templates/thiep-cuoi-104/preview.png', details: ['Minh hoạ trẻ trung', 'Màu sắc vui nhộn', 'Sticker album'], path: '/template/thiep-cuoi-104',
      },
      {
        title: 'Autumn Vow', category: 'Editorial', subtitle: 'Mẫu 108 · warm autumn',
        image: '/assets/new-templates/thiep-cuoi-108/preview.png', details: ['Intro đỏ lấp lánh', 'Album rừng thu', 'Beige invitation'], path: '/template/thiep-cuoi-108',
      },
      {
        title: 'Dolce Vita', category: 'Destination', subtitle: 'Mẫu 58 · Italian watercolor',
        image: '/assets/new-templates/thiep-cuoi-58/preview.png', details: ['Biệt thự cổ Italy', 'Watercolor ceremony', 'Destination RSVP'], path: '/template/thiep-cuoi-58',
      },
      {
        title: 'Blush Diary', category: 'Editorial', subtitle: 'Mẫu 4 · blush diary',
        image: '/assets/new-templates/thiep-cuoi-4/preview.webp', details: ['Hero dạng nhật ký', 'Music card & profile đôi', 'Lịch, album & RSVP'], path: '/template/thiep-cuoi-4',
      },
      {
        title: 'Black Vow', category: 'Monochrome', subtitle: 'Mẫu 10 · minimal portrait',
        image: '/assets/new-templates/thiep-cuoi-10/preview.webp', details: ['Typography đen trắng', 'Chân dung đối xứng', 'Story, lịch & RSVP'], path: '/template/thiep-cuoi-10',
      },
      {
        title: 'Sepia Circle', category: 'Editorial', subtitle: 'Mẫu 14 · sepia circle',
        image: '/assets/new-templates/thiep-cuoi-14/preview.webp', details: ['Hero khung tròn', 'Thư mời cổ điển', 'Album tone nâu'], path: '/template/thiep-cuoi-14',
      },
      {
        title: 'Sweet Red', category: 'Editorial', subtitle: 'Mẫu 15 · red white editorial',
        image: '/assets/new-templates/thiep-cuoi-15/preview.webp', details: ['Marquee ngày cưới', 'Ảnh tạp chí đỏ trắng', 'Lịch & countdown'], path: '/template/thiep-cuoi-15',
      },
      {
        title: 'Crimson Profiles', category: 'Romantic red', subtitle: 'Mẫu 18 · crimson profiles',
        image: '/assets/new-templates/thiep-cuoi-18/preview.webp', details: ['Hero đỏ chia khối', 'Profile cô dâu chú rể', 'Album & RSVP'], path: '/template/thiep-cuoi-18',
      },
      {
        title: 'Scrapbook Song', category: 'Editorial', subtitle: 'Mẫu 20 · music scrapbook',
        image: '/assets/new-templates/thiep-cuoi-20/preview.webp', details: ['Polaroid xếp lớp', 'Music player', 'Collage chuyển động'], path: '/template/thiep-cuoi-20',
      },
      {
        title: 'Cream Letter', category: 'Editorial', subtitle: 'Mẫu 24 · cream invitation',
        image: '/assets/new-templates/thiep-cuoi-24/preview.webp', details: ['Hero chữ dọc', 'Ảnh xếp lớp có seal', 'Lịch & RSVP'], path: '/template/thiep-cuoi-24',
      },
      {
        title: 'Happy Menu', category: 'Illustration', subtitle: 'Mẫu 26 · playful red',
        image: '/assets/new-templates/thiep-cuoi-26/preview.webp', details: ['Minh hoạ vui tươi', 'Timeline dạng menu', 'Profile tròn & lịch'], path: '/template/thiep-cuoi-26',
      },
      {
        title: 'Pine Hill', category: 'Destination', subtitle: 'Mẫu 34 · forest cinematic',
        image: '/assets/new-templates/thiep-cuoi-34/preview.webp', details: ['Hero rừng toàn màn hình', 'Film frame', 'Destination RSVP'], path: '/template/thiep-cuoi-34',
      },
      {
        title: 'Wine Editorial', category: 'Monochrome', subtitle: 'Mẫu 37 · clean profiles',
        image: '/assets/new-templates/thiep-cuoi-37/preview.webp', details: ['Typography tạp chí', 'Profile hai cột', 'Lịch tối giản'], path: '/template/thiep-cuoi-37',
      },
      {
        title: 'Green Envelope', category: 'Envelope', subtitle: 'Mẫu 41 · green opening',
        image: '/assets/new-templates/thiep-cuoi-41/preview.webp', details: ['Phong bì mở tương tác', 'Thông tin hai gia đình', 'Lịch & countdown'], path: '/template/thiep-cuoi-41',
      },
      {
        title: 'Đại Hỷ', category: 'Traditional', subtitle: 'Mẫu 43 · red family invitation',
        image: '/assets/new-templates/thiep-cuoi-43/preview.webp', details: ['Hero đỏ truyền thống', 'Hai gia đình', 'Song hỷ & album'], path: '/template/thiep-cuoi-43',
      },
      {
        title: 'Forest Gold', category: 'Botanical', subtitle: 'Mẫu 51 · dark green gold',
        image: '/assets/new-templates/thiep-cuoi-51/preview.webp', details: ['Khung vòm xanh vàng', 'Timeline ngày cưới', 'Album xanh rêu'], path: '/template/thiep-cuoi-51',
      },
      {
        title: 'Ever & Forever', category: 'Traditional', subtitle: 'Mẫu 63 · emerald classic',
        image: '/assets/new-templates/thiep-cuoi-63/preview.webp', details: ['Xanh lục ánh kim', 'Hai nghi lễ', 'Lịch & album'], path: '/template/thiep-cuoi-63',
      },
      {
        title: 'Wedding Playlist', category: 'Cinematic', subtitle: 'Mẫu 64 · playful music story',
        image: '/assets/new-templates/thiep-cuoi-64/preview.webp', details: ['Music player lớn', 'Love story dạng track', 'Album & lịch'], path: '/template/thiep-cuoi-64',
      },
      {
        title: 'Photograph', category: 'Illustration', subtitle: 'Mẫu 67 · illustrated journey',
        image: '/assets/new-templates/thiep-cuoi-67/preview.webp', details: ['Minh hoạ cô dâu chú rể', 'Profile giấy', 'Địa điểm & RSVP'], path: '/template/thiep-cuoi-67',
      },
      {
        title: 'Blessing Begins', category: 'Cinematic', subtitle: 'Mẫu 68 · natural cinematic',
        image: '/assets/new-templates/thiep-cuoi-68/preview.webp', details: ['Hero điện ảnh', 'Thơ tình chữ dọc', 'Gallery & RSVP'], path: '/template/thiep-cuoi-68',
      },
      {
        title: 'After Dark', category: 'Cinematic', subtitle: 'Mẫu 69 · dark burgundy',
        image: '/assets/new-templates/thiep-cuoi-69/preview.webp', details: ['Hero tối điện ảnh', 'Timeline đỏ rượu', 'Film strip & countdown'], path: '/template/thiep-cuoi-69',
      },
      {
        title: 'Forest Letter', category: 'Envelope', subtitle: 'Mẫu 73 · forest card',
        image: '/assets/new-templates/thiep-cuoi-73/preview.webp', details: ['Cover mở thiệp xanh', 'Hai gia đình', 'Album & RSVP'], path: '/template/thiep-cuoi-73',
      },
      {
        title: 'Garden Formal', category: 'Botanical', subtitle: 'Mẫu 81 · clean garden',
        image: '/assets/new-templates/thiep-cuoi-81/preview.webp', details: ['Hero vườn tối giản', 'Thiệp mời trang trọng', 'Lịch & địa điểm'], path: '/template/thiep-cuoi-81',
      },
      {
        title: 'Pastel Couple', category: 'Illustration', subtitle: 'Mẫu 82 · pastel drawing',
        image: '/assets/new-templates/thiep-cuoi-82/preview.webp', details: ['Minh hoạ pastel', 'Profile bo tròn', 'Album & RSVP'], path: '/template/thiep-cuoi-82',
      },
      {
        title: 'Red Heritage', category: 'Traditional', subtitle: 'Mẫu 85 · ornate red',
        image: '/assets/new-templates/thiep-cuoi-85/preview.webp', details: ['Cover song hỷ', 'Câu chuyện tình yêu', 'Lịch đỏ truyền thống'], path: '/template/thiep-cuoi-85',
      },
      {
        title: 'Winter Garden', category: 'Cinematic', subtitle: 'Mẫu 91 · dark garden',
        image: '/assets/new-templates/thiep-cuoi-91/preview.webp', details: ['Khu vườn tối', 'Khung ảnh điện ảnh', 'Lịch & RSVP'], path: '/template/thiep-cuoi-91',
      },
      {
        title: 'Forever Train', category: 'Monochrome', subtitle: 'Mẫu 92 · nostalgic station',
        image: '/assets/new-templates/thiep-cuoi-92/preview.webp', details: ['Ảnh hoài niệm', 'Thơ tình và lịch trình', 'Lịch tối giản'], path: '/template/thiep-cuoi-92',
      },
      {
        title: 'Mono Manifesto', category: 'Monochrome', subtitle: 'Mẫu 94 · black white editorial',
        image: '/assets/new-templates/thiep-cuoi-94/preview.webp', details: ['Hero đen trắng', 'Manifesto tình yêu', 'Hai lễ gia đình'], path: '/template/thiep-cuoi-94',
      },
      {
        title: 'Modern Type', category: 'Editorial', subtitle: 'Mẫu 95 · modern minimal',
        image: '/assets/new-templates/thiep-cuoi-95/preview.webp', details: ['Typography tối giản', 'Bố cục số lớn', 'Calendar & RSVP'], path: '/template/thiep-cuoi-95',
      },
      {
        title: 'Blush Stationery', category: 'Editorial', subtitle: 'Mẫu 96 · blush paper',
        image: '/assets/new-templates/thiep-cuoi-96/preview.webp', details: ['Thiệp giấy xếp lớp', 'Chân dung bo vòm', 'Gallery & RSVP'], path: '/template/thiep-cuoi-96',
      },
      {
        title: 'Modern Grid', category: 'Editorial', subtitle: 'Mẫu 99 · modern collage',
        image: '/assets/new-templates/thiep-cuoi-99/preview.webp', details: ['Hero lưới ảnh', 'Typography chữ mảnh', 'Profile & countdown'], path: '/template/thiep-cuoi-99',
      },
      {
        title: 'Seed of Love', category: 'Botanical', subtitle: 'Mẫu 105 · sage botanical',
        image: '/assets/new-templates/thiep-cuoi-105/preview.webp', details: ['Hero xanh sage', 'Love story botanical', 'Lịch & RSVP'], path: '/template/thiep-cuoi-105',
      },
      {
        title: 'Burgundy Ceremony', category: 'Traditional', subtitle: 'Mẫu 112 · deep red formal',
        image: '/assets/new-templates/thiep-cuoi-112/preview.webp', details: ['Hero đỏ sang trọng', 'Timeline thành hôn', 'Bản đồ & album'], path: '/template/thiep-cuoi-112',
      },
      ...additionalInvitationItems,
    ],
  },
  trays: {
    eyebrow: 'THƯ VIỆN TRÁP CƯỚI',
    consultationService: 'Tráp cưới',
    heading: 'Tráp cưới theo',
    script: 'một bảng màu chung.',
    description: 'Mỗi set được chọn như một phần của không gian lễ: hoa, màu quả, phụ kiện và cách bày có cùng nhịp với concept cưới.',
    icon: Gift,
    hero: '/assets/template61/gallery-5.webp',
    tone: 'moss',
    categories: ['Tất cả', 'Lễ gia tiên', 'Tối giản', 'Sắc đỏ'],
    items: [
      {
        title: 'Mộc Lan',
        category: 'Tối giản',
        subtitle: 'Set 5 tráp · thuê hoặc đặt mua',
        image: '/assets/template61/gallery-1.webp',
        details: ['Tone kem & xanh lá', 'Tráp hoa, trà, quả', 'Phối backdrop tại gia'],
      },
      {
        title: 'Nhung Đỏ',
        category: 'Sắc đỏ',
        subtitle: 'Set 7 tráp · lễ đậm màu',
        image: '/assets/template39/couple-red-seated.webp',
        details: ['Đỏ rượu & champagne', 'Hoa điểm nhấn', 'Bày tráp đối xứng'],
      },
      {
        title: 'Sớm Mai',
        category: 'Lễ gia tiên',
        subtitle: 'Set 9 tráp · đủ nghi thức',
        image: '/assets/template61/gallery-6.webp',
        details: ['Danh sách lễ đầy đủ', 'Có tư vấn số lượng', 'Hỗ trợ vận chuyển'],
      },
      {
        title: 'Mây Trắng',
        category: 'Tối giản',
        subtitle: 'Set 5 tráp · gọn hiện đại',
        image: '/assets/template61/story.webp',
        details: ['Hoa trắng nhẹ nhàng', 'Chất liệu mộc', 'Phù hợp tiệc nhỏ'],
      },
    ],
  },
  projection: {
    eyebrow: 'DỊCH VỤ TRÌNH CHIẾU ẢNH CƯỚI TRỌN GÓI',
    consultationService: 'Trình chiếu sự kiện',
    heading: 'Từ album ảnh đến',
    script: 'file sẵn phát trên sân khấu.',
    description: 'Studio chọn ảnh, dựng nhịp, xử lý nhạc và xuất đúng thông số để video chạy ổn định trên TV, máy chiếu hoặc màn LED lớn trong ngày cưới.',
    package: {
      eyebrow: 'TỪ KHÂU CHỌN ẢNH ĐẾN FILE PHÁT',
      heading: 'Một quy trình dựng trọn gói.',
      script: 'Không để gia đình tự ghép slide.',
      description: 'Hai bạn chỉ cần gửi album và thông tin buổi lễ. Studio chịu trách nhiệm biên tập câu chuyện, dựng chuyển động, cân nhạc và chuẩn bị đúng phiên bản cho thiết bị tại địa điểm tổ chức.',
      steps: [
        ['Nhận kịch bản sân khấu', 'Xác nhận thời lượng, thời điểm phát, tỷ lệ màn hình và yêu cầu kỹ thuật từ nhà hàng hoặc đơn vị LED.'],
        ['Chọn ảnh và nhạc', 'Lọc ảnh theo từng chương, cân nhịp cảm xúc và thống nhất bài nhạc phù hợp với không gian buổi lễ.'],
        ['Dựng video và motion', 'Dựng album tự chạy, intro tên, countdown hoặc background lặp theo concept đã chọn.'],
        ['Xuất file và kiểm tra', 'Xuất đúng độ phân giải, codec, tỷ lệ; bàn giao thêm bản dự phòng để hạn chế sự cố khi phát.'],
      ],
      deliverablesTitle: 'Bộ file sẵn sàng cho TV, máy chiếu và LED',
      deliverables: [
        'File MP4 master Full HD hoặc 4K theo thiết bị',
        'Phiên bản 16:9 tối ưu cho màn hình tại địa điểm',
        'Nhạc nền, intro tên và chuyển cảnh đã cân nhịp',
        'Background motion lặp cho dạm ngõ hoặc ăn hỏi khi chọn',
        'Link duyệt trước và một file phát dự phòng',
      ],
    },
    library: {
      eyebrow: '12 HƯỚNG TRÌNH CHIẾU THAM KHẢO',
      heading: 'Chọn nhịp hình ảnh',
      script: 'phù hợp với không gian buổi lễ.',
      description: 'Mỗi mẫu thể hiện một cách kể chuyện và chuyển cảnh. Ảnh, tên, thời lượng, âm nhạc và tỷ lệ xuất sẽ được dựng lại theo đơn hàng thực tế.',
    },
    icon: MonitorPlay,
    hero: '/assets/template44/mountain-couple.webp',
    tone: 'blue',
    categories: ['Tất cả', 'Video album', 'Background TV', 'Sang trọng', 'Hiện đại', 'Tối giản', 'Lãng mạn', 'Hoài niệm'],
    items: [
      {
        title: 'Royal Symphony',
        kind: 'Video album',
        category: 'Sang trọng',
        subtitle: 'Hoàng gia · cinematic toàn màn hình',
        image: '/assets/template44/mountain-couple.webp',
        details: ['Fade xuyên thấu 2 giây', 'Ken Burns và bokeh vàng', 'Tối ưu LED/TV 16:9'],
        path: '/trinh-chieu/opening-frame',
      },
      {
        title: 'White Palace Elegance',
        kind: 'Video album',
        category: 'Sang trọng',
        subtitle: 'Cung điện trắng · tinh khôi',
        image: '/assets/new-templates/thiep-cuoi-56/image-1.jpg',
        details: ['Khung trắng viền kép', 'Nền ảnh blur và bụi bạc', 'Crossfade dịch ngang 1.8 giây'],
        path: '/trinh-chieu/white-palace',
      },
      {
        title: 'Velvet Rose',
        kind: 'Video album',
        category: 'Lãng mạn',
        subtitle: 'Hồng nhung · tình ca đỏ trầm',
        image: '/assets/new-templates/thiep-cuoi-112/image-2.webp',
        details: ['Pan chậm trái sang phải', 'Cánh hoa rơi xoay 3D', 'Tên đôi uyên ương góc phải'],
        path: '/trinh-chieu/love-countdown',
      },
      {
        title: 'Editorial Minimalist',
        kind: 'Video album',
        category: 'Tối giản',
        subtitle: 'Tạp chí cưới · bố cục 6:4',
        image: '/assets/new-templates/thiep-cuoi-37/image-1.webp',
        details: ['Ảnh và khoảng thở tách biệt', 'Parallax trượt ngang', 'Typography kiểu bìa tạp chí'],
        path: '/trinh-chieu/sea-of-us',
      },
      {
        title: 'Polaroid Memories',
        kind: 'Video album',
        category: 'Hoài niệm',
        subtitle: 'Thước phim kỷ niệm · lật 3D',
        image: '/assets/new-templates/thiep-cuoi-20/image-1.webp',
        details: ['Phôi Polaroid viền trắng', 'Lật ảnh 3D từng trang', 'Nền mặt bàn và hạt phim cũ'],
        path: '/trinh-chieu/polaroid-memories',
      },
      {
        title: 'Vintage Cinema VHS',
        kind: 'Video album',
        category: 'Hoài niệm',
        subtitle: 'Băng VHS · màn hình 4:3',
        image: '/assets/new-templates/thiep-cuoi-20/image-3.webp',
        details: ['Khung TV 4:3 và viền đen', 'Glitch cut, scanline, rung nhẹ', 'PLAY và timecode phong cách VHS'],
        path: '/trinh-chieu/film-strip',
      },
      {
        title: 'Cinematic Crossfade',
        kind: 'Video album',
        category: 'Hiện đại',
        subtitle: 'Ảnh cưới toàn màn hình · tự chạy theo chương',
        image: '/assets/template36-ref/wide-a.jpg',
        details: ['Swiper fade 1.8 giây và Ken Burns', 'Cover/contain với điểm crop từng ảnh', 'Nhạc, bàn phím và fullscreen TV/LED'],
        path: '/trinh-chieu/cinematic-crossfade',
      },
      {
        title: 'Album of Love 3D',
        kind: 'Video album',
        category: 'Sang trọng',
        subtitle: 'Coverflow · gallery ảnh cưới 3D',
        image: '/assets/template44/sea-couple.webp',
        details: ['Coverflow chiều sâu tự động', 'Vuốt, bàn phím và điều hướng nhanh', 'Responsive từ điện thoại đến màn LED 4K'],
        path: '/trinh-chieu/coverflow-gallery',
      },
      {
        title: 'Love Cinema',
        kind: 'Video album',
        category: 'Lãng mạn',
        subtitle: 'Khung vòm · nền blur · tên đôi lớn',
        image: '/assets/template44/mountain-couple.webp',
        details: ['Khung ảnh vòm điện ảnh', 'Bokeh vàng & blur nền', 'Tên đôi Playfair + chữ ký'],
        path: '/trinh-chieu/love-cinema',
      },
      {
        title: 'Dạm Ngõ Hồng Hỷ',
        kind: 'Background TV',
        category: 'Lễ dạm ngõ',
        subtitle: 'Background TV · đỏ son & ánh kim',
        image: '/assets/template39/couple-red-seated.webp',
        details: ['Motion nền lặp liên tục', 'Tên, ngày lễ đọc rõ từ xa', 'Tối ưu TV/LED ngang 16:9'],
        path: '/trinh-chieu/background-dam-ngo',
      },
      {
        title: 'Ăn Hỏi Hồng Liên',
        kind: 'Background TV',
        category: 'Lễ ăn hỏi',
        subtitle: 'Background TV · sen hồng & chữ Hỷ',
        image: '/assets/projections/background-an-hoi.jpg',
        details: ['Hoa sen nở theo nhịp lặp', 'Tên và ngày lễ đọc rõ từ xa', 'Tối ưu TV/LED ngang 16:9'],
        path: '/trinh-chieu/background-an-hoi',
      },
      {
        title: 'Đính Hôn Botanical',
        kind: 'Background TV',
        category: 'Lễ đính hôn',
        subtitle: 'Background TV · trắng xanh hiện đại',
        image: '/assets/new-templates/thiep-cuoi-63/preview.webp',
        details: ['Ảnh đôi pan chậm 20 giây', 'Hoa botanical chuyển động nhẹ', 'Tối ưu TV/LED ngang 16:9'],
        path: '/trinh-chieu/background-dinh-hon',
      },
    ],
  },
};

const rise = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-70px' },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
};

function ServicePackage({ content, consultationService }) {
  const consultationUrl = `/tu-van?service=${encodeURIComponent(consultationService)}`;

  return (
    <section className="studioPackage" aria-labelledby="studio-package-title">
      <motion.div {...rise} className="studioPackageIntro">
        <span>{content.eyebrow}</span>
        <h2 id="studio-package-title">{content.heading}<br /><em>{content.script}</em></h2>
        <p>{content.description}</p>
        <a className="studioButton primary" href={consultationUrl}>Nhận tư vấn trọn gói <ChevronRight size={17} /></a>
      </motion.div>

      <ol className="studioPackageSteps">
        {content.steps.map(([title, description], index) => (
          <motion.li key={title} initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-70px' }} transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div><h3>{title}</h3><p>{description}</p></div>
          </motion.li>
        ))}
      </ol>

      <motion.div {...rise} className="studioPackageDeliverables">
        <div><Sparkles size={21} /><span>HẠNG MỤC BÀN GIAO</span><h3>{content.deliverablesTitle}</h3></div>
        <ul>{content.deliverables.map((item) => <li key={item}><CircleCheck size={17} /> <span>{item}</span></li>)}</ul>
      </motion.div>
    </section>
  );
}

function InvitationFullPackage({ content, consultationService }) {
  const consultationUrl = `/tu-van?service=${encodeURIComponent(consultationService)}`;

  return (
    <section className="studioFullPackage" aria-labelledby="studio-full-package-title">
      <motion.header {...rise} className="studioFullPackageHead">
        <div><span>{content.eyebrow}</span><h2 id="studio-full-package-title">{content.heading}<br /><em>{content.script}</em></h2></div>
        <div><p>{content.description}</p><a className="studioButton primary" href={consultationUrl}>Nhận phạm vi và báo giá <ChevronRight size={17} /></a></div>
      </motion.header>

      <div className="studioFullPackageItems">
        {content.included.map(([number, title, description], index) => (
          <motion.article key={title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5, delay: index * 0.05 }}>
            <span>{number}</span><h3>{title}</h3><p>{description}</p>
          </motion.article>
        ))}
      </div>

      <motion.div {...rise} className="studioFullPackageTerms">
        <div><Sparkles size={20} /><span>ĐIỀU KIỆN BÀN GIAO MẶC ĐỊNH</span></div>
        <dl>{content.terms.map(([term, description]) => <div key={term}><dt>{term}</dt><dd>{description}</dd></div>)}</dl>
      </motion.div>
    </section>
  );
}

function ServicePage({ type, view = 'service' }) {
  const content = libraryContent[type];
  const libraryOnly = type === 'invitations' && view === 'library';
  const heroContent = libraryOnly ? content : (content.serviceHero || content);
  const packageContent = libraryOnly ? null : content.package;
  const consultationUrl = `/tu-van?service=${encodeURIComponent(content.consultationService)}`;
  const libraryCopy = content.library || {
    eyebrow: `${content.items.length.toString().padStart(2, '0')} MẪU MỞ ĐẦU`,
    heading: 'Chọn phong cách',
    script: 'phù hợp với ngày cưới.',
    description: 'Thư viện sẽ được mở rộng theo từng dịch vụ. Bạn có thể xem mẫu trước, sau đó đặt lịch để nhận báo giá và phương án phù hợp.',
  };
  const finalCta = libraryOnly
    ? {
        eyebrow: 'ĐÃ CHỌN ĐƯỢC PHONG CÁCH?',
        heading: 'Xem studio hoàn thiện một gói thiệp từ mẫu đến link chính thức.',
        href: '/dich-vu/thiep-cuoi-online',
        label: 'Xem dịch vụ trọn gói',
      }
    : {
        eyebrow: 'SẴN SÀNG BẮT ĐẦU?',
        heading: 'Studio sẽ đề xuất phạm vi và phương án trọn gói phù hợp với ngày cưới.',
        href: consultationUrl,
        label: 'Đặt lịch trao đổi',
      };
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const Icon = content.icon;
  const sellableItems = type === 'invitations'
    ? content.items.filter((item) => currentCatalogSlugs.includes(item.path?.match(/^\/template\/(.+)$/)?.[1]))
    : content.items;
  const visibleItems = activeCategory === 'Tất cả'
    ? sellableItems
    : sellableItems.filter((item) => item.category === activeCategory || item.kind === activeCategory);

  const copyLink = async (item) => {
    if (!item.path) return;
    const url = `${window.location.origin}${item.path}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      window.prompt('Sao chép link xem mẫu:', url);
    }
  };

  return (
    <main className={`studioServicePage ${content.tone}`}>
      <StudioHeader />
      <section className="studioServiceHero" style={{ '--hero-image': `url(${content.hero})` }}>
        <div className="studioServiceHeroInner">
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.56 }}><Icon size={17} /> {heroContent.eyebrow}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.76, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}>{heroContent.heading}<br /><em>{heroContent.script}</em></motion.h1>
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.16 }}>{heroContent.description}</motion.span>
          {packageContent && <motion.div className="studioServiceHeroActions" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.62, delay: 0.24 }}><a className="studioButton primary" href={consultationUrl}><CalendarDays size={16} /> Nhận tư vấn gói</a><a className="studioButton secondary" href="#thu-vien">Xem mẫu tham khảo</a></motion.div>}
        </div>
      </section>

      {packageContent && <ServicePackage content={packageContent} consultationService={content.consultationService} />}
      {content.fullPackage && !libraryOnly && <InvitationFullPackage content={content.fullPackage} consultationService={content.consultationService} />}

      <section className="studioLibrary" id="thu-vien" aria-label={content.eyebrow}>
        <motion.div {...rise} className="studioLibraryHead">
          <div><span>{libraryCopy.eyebrow}</span><h2>{libraryCopy.heading}<br /><em>{libraryCopy.script}</em></h2></div>
          <p>{libraryCopy.description}</p>
        </motion.div>
        <div className="studioLibraryFilters" role="tablist" aria-label="Lọc thư viện">
          {content.categories.map((category) => <button key={category} type="button" role="tab" aria-selected={activeCategory === category} className={activeCategory === category ? 'is-active' : ''} onClick={() => setActiveCategory(category)}>{category}</button>)}
        </div>
        <div className={`studioLibraryGrid${type === 'projection' ? ' is-projection' : ''}`}>
          {visibleItems.map((item, index) => {
            const templateSlug = item.path?.match(/^\/template\/(.+)$/)?.[1] || '';
            const editable = type === 'invitations' && editableTemplateSlugs.includes(templateSlug);
            const consultationParams = new URLSearchParams({ service: content.consultationService, template: templateSlug });
            return (
              <motion.article key={item.title} className="studioLibraryCard" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.52, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}>
                <div className="studioLibraryImage">
                  <img src={item.image} alt={`${item.title} - ${content.eyebrow.toLowerCase()}`} />
                  <span>{item.category}</span>
                  {editable && <b className="studioEditableBadge"><PenLine /> Tự chỉnh sửa</b>}
                </div>
                <div className="studioLibraryBody">
                  <p>{item.subtitle}</p><h3>{item.title}</h3>
                  <ul>{item.details.map((detail) => <li key={detail}><CircleCheck size={15} /> {detail}</li>)}</ul>
                  <div className="studioLibraryActions">
                    {item.path && <a className="is-preview" href={item.path}><ExternalLink size={15} /> Mở mẫu</a>}
                    {editable
                      ? <a className="is-purchase" href={`/dat-thiep?template=${encodeURIComponent(templateSlug)}&source=catalog`}><PenLine size={15} /> Tùy chỉnh</a>
                      : <a className="is-purchase" href={`/tu-van?${consultationParams.toString()}`}><CalendarDays size={15} /> {item.path ? 'Đặt theo mẫu' : 'Nhận báo giá'}</a>}
                    {item.path && <button className="is-icon" type="button" onClick={() => copyLink(item)} aria-label={`Sao chép link ${item.title}`} title="Sao chép link"><Copy size={15} /></button>}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="studioServiceCTA">
        <div><Sparkles size={22} /><span>{finalCta.eyebrow}</span><h2>{finalCta.heading}</h2></div>
        <a className="studioButton primary" href={finalCta.href}>{finalCta.label} <ChevronRight size={17} /></a>
      </section>
      <StudioFooter />
    </main>
  );
}

export function ConsultationPage() {
  const query = useMemo(() => new URLSearchParams(window.location.search), []);
  const queryService = query.get('service') || 'Thiệp cưới Online';
  const queryTemplate = query.get('template') || '';
  const selectedTemplate = currentCatalogSlugs.includes(queryTemplate) ? queryTemplate : '';
  const [submission, setSubmission] = useState({ loading: false, error: '', result: null });
  const [booking, setBooking] = useState({
    fullName: '', phone: '', email: '', service: queryService, templateSlug: selectedTemplate,
    preferredDate: '', preferredTime: '09:00', note: '', consent: false, website: '',
  });
  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const submit = async (event) => {
    event.preventDefault();
    setSubmission({ loading: true, error: '', result: null });
    try {
      const result = await createConsultation(booking);
      setSubmission({ loading: false, error: '', result });
    } catch (error) {
      setSubmission({ loading: false, error: error.message, result: null });
    }
  };

  return (
    <main className="studioServicePage studioConsultationPage gold">
      <StudioHeader />
      <section className="studioConsultHero" style={{ '--hero-image': 'url(/assets/template61/couple-close.webp)' }}>
        <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}>
          <p><CalendarDays size={17} /> ĐẶT LỊCH TƯ VẤN</p>
          <h1>Một cuộc hẹn ngắn,<br /><em>một concept rõ ràng.</em></h1>
          <span>Chọn thời gian bạn thuận tiện. Studio sẽ dùng thông tin này để chuẩn bị đề xuất trước khi trò chuyện.</span>
        </motion.div>
      </section>
      <section className="studioBookingSection">
        <div className="studioBookingNotes">
          <span>QUY TRÌNH TƯ VẤN</span>
          <h2>Gọn gàng từ<br /><em>cuộc hẹn đầu tiên.</em></h2>
          <ol><li><b>01</b> Chọn dịch vụ và giờ phù hợp.</li><li><b>02</b> Studio đọc nhu cầu, ảnh và ngày cưới.</li><li><b>03</b> Nhận phương án concept và báo giá.</li></ol>
        </div>
        <form className="studioBookingForm" onSubmit={submit}>
          <h2>Đặt lịch cùng studio</h2>
          {booking.templateSlug && <div className="studioBookingTemplate"><span>Mẫu đã chọn</span><strong>{getInvitationDisplayTitle(booking.templateSlug)}</strong><a href={`/template/${booking.templateSlug}`} target="_blank" rel="noreferrer">Xem lại mẫu <ExternalLink /></a></div>}
          <label>Họ và tên<input required value={booking.fullName} onChange={(event) => setBooking({ ...booking, fullName: event.target.value })} placeholder="Nhập tên của bạn" /></label>
          <label>Số điện thoại<input required type="tel" value={booking.phone} onChange={(event) => setBooking({ ...booking, phone: event.target.value })} placeholder="Ví dụ: 09xx xxx xxx" /></label>
          <label>Email<input type="email" value={booking.email} onChange={(event) => setBooking({ ...booking, email: event.target.value })} placeholder="email@example.com" /></label>
          <div className="studioBookingSplit"><label>Ngày tư vấn<input required min={minDate} type="date" value={booking.preferredDate} onChange={(event) => setBooking({ ...booking, preferredDate: event.target.value })} /></label><label>Khung giờ<select value={booking.preferredTime} onChange={(event) => setBooking({ ...booking, preferredTime: event.target.value })}><option>09:00</option><option>11:00</option><option>14:00</option><option>16:00</option><option>19:00</option></select></label></div>
          <label>Dịch vụ quan tâm<select value={booking.service} onChange={(event) => setBooking({ ...booking, service: event.target.value })}><option>Thiệp cưới Online</option><option>Tráp cưới</option><option>Trình chiếu sự kiện</option><option>Gói dịch vụ trọn bộ</option></select></label>
          <label>Nhu cầu cần trao đổi<textarea rows="3" value={booking.note} onChange={(event) => setBooking({ ...booking, note: event.target.value })} placeholder="Ngày cưới, số lượng khách hoặc phong cách mong muốn..." /></label>
          <label className="studioBookingConsent"><input type="checkbox" checked={booking.consent} onChange={(event) => setBooking({ ...booking, consent: event.target.checked })} required /><span>Tôi đồng ý để Lời Hẹn Studio sử dụng thông tin này nhằm liên hệ tư vấn theo <a href="/chinh-sach-bao-mat">chính sách bảo mật</a>.</span></label>
          <label className="studioBookingHoneypot" aria-hidden="true">Website<input tabIndex="-1" autoComplete="off" value={booking.website} onChange={(event) => setBooking({ ...booking, website: event.target.value })} /></label>
          <button className="studioButton primary" type="submit" disabled={submission.loading || !commerceAvailable}><Send size={16} /> {submission.loading ? 'Đang gửi...' : 'Gửi yêu cầu tư vấn'}</button>
          {!commerceAvailable && <p className="studioBookingError" role="alert">Hệ thống tiếp nhận đang được cấu hình. Vui lòng quay lại sau hoặc liên hệ studio qua kênh công bố.</p>}
          {submission.error && <p className="studioBookingError" role="alert">{submission.error}</p>}
          {submission.result && <p className="studioBookingSuccess" role="status"><Check size={17} /> Đã tiếp nhận yêu cầu {submission.result.public_id || submission.result.publicId}. Studio sẽ liên hệ theo lịch đã chọn.</p>}
        </form>
      </section>
      <StudioFooter />
    </main>
  );
}

export default ServicePage;
