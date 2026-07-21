import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  CircleCheck,
  Clapperboard,
  Gift,
  Heart,
  Images,
  Mail,
  MapPin,
  MessageCircle,
  MonitorPlay,
  Phone,
  QrCode,
  Send,
  Sparkles,
  UsersRound,
} from 'lucide-react';
import { commerceAvailable, createConsultation } from '../commerce/commerceApi.js';
import { currentCatalogSlugs } from '../data/invitationCatalog.js';
import { StudioFooter, StudioHeader } from './StudioChrome.jsx';
import './studioHome.css';

const invitationTemplateCount = currentCatalogSlugs.length;

const services = [
  {
    id: 'thiep-online',
    number: '01',
    path: '/dich-vu/thiep-cuoi-online',
    icon: Mail,
    tone: 'rose',
    title: 'Thiệp cưới Online',
    description: 'Studio hoàn thiện từ concept, nội dung và ảnh đến đường link sẵn sàng gửi khách mời.',
    items: [`Cá nhân hóa trọn gói từ ${invitationTemplateCount} mẫu`, 'Link, QR và ảnh bìa bàn giao', 'RSVP, lời chúc, album và QR mừng cưới'],
    image: '/assets/template39/couple-red.webp',
  },
  {
    id: 'trap-cuoi',
    number: '02',
    path: '/dich-vu/trap-cuoi',
    icon: Gift,
    tone: 'moss',
    title: 'Tráp cưới',
    description: 'Lựa chọn tráp đồng điệu với concept buổi lễ, từ thuê đến đặt mua trọn bộ.',
    items: ['Danh sách mẫu tráp và báo giá', 'Album tham khảo thực tế', 'Đặt thuê hoặc đặt mua linh hoạt'],
    image: '/assets/template61/gallery-5.webp',
  },
  {
    id: 'trinh-chieu',
    number: '03',
    path: '/dich-vu/trinh-chieu',
    icon: MonitorPlay,
    tone: 'blue',
    title: 'Trình chiếu sự kiện',
    description: 'Studio nhận ảnh, dựng nhịp, xử lý nhạc và bàn giao file sẵn phát tại địa điểm tổ chức.',
    items: ['Video album ảnh cưới dựng trọn gói', 'Background TV dạm ngõ & ăn hỏi', 'File tối ưu cho TV, máy chiếu và màn LED'],
    image: '/assets/template44/mountain-couple.webp',
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-70px' },
  transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] },
};

function StudioHome() {
  const [submission, setSubmission] = useState({ loading: false, error: '', result: null });
  const [booking, setBooking] = useState({
    name: '',
    phone: '',
    service: 'Thiệp cưới Online',
    date: '',
    time: '09:00',
    consent: false,
    website: '',
  });

  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const submitBooking = async (event) => {
    event.preventDefault();
    setSubmission({ loading: true, error: '', result: null });
    try {
      const result = await createConsultation({
        fullName: booking.name,
        phone: booking.phone,
        email: '',
        service: booking.service,
        templateSlug: '',
        preferredDate: booking.date,
        preferredTime: booking.time,
        note: 'Yêu cầu tư vấn nhanh gửi từ trang chủ.',
        consent: booking.consent,
        website: booking.website,
      });
      setSubmission({ loading: false, error: '', result });
    } catch (error) {
      setSubmission({ loading: false, error: error.message, result: null });
    }
  };

  return (
    <main className="studioSite" id="top">
      <StudioHeader />

      <section className="studioHero" aria-labelledby="studio-hero-title">
        <div className="studioHeroImage" />
        <div className="studioHeroContent">
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>WEDDING STORYTELLING STUDIO</motion.p>
          <motion.h1 id="studio-hero-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}>
            Lời Hẹn<br /><em>cho ngày đẹp nhất</em>
          </motion.h1>
          <motion.div className="studioHeroCopy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}>
            <p>Studio nhận làm trọn gói thiệp cưới online, trình chiếu ảnh cưới và tráp cưới trong cùng một concept thống nhất.</p>
            <div className="studioHeroActions">
              <a className="studioButton primary" href="/dich-vu/thiep-cuoi-online">Xem dịch vụ trọn gói <ChevronRight size={17} /></a>
              <a className="studioButton ghost" href="/mau-thiep">Khám phá {invitationTemplateCount} mẫu</a>
            </div>
          </motion.div>
        </div>
        <div className="studioHeroNotes" aria-label="Dịch vụ nổi bật">
          <span><Heart size={15} fill="currentColor" /> Thiệp có cảm xúc</span>
          <span><Sparkles size={15} /> Concept đồng bộ</span>
          <span><Send size={15} /> Gửi link trong một chạm</span>
        </div>
      </section>

      <section className="studioIntro" id="dich-vu">
        <motion.div {...fadeUp} className="studioSectionLead">
          <span>03 DỊCH VỤ CHÍNH</span>
          <h2>Ba dịch vụ, <em>một mạch câu chuyện.</em></h2>
          <p>Từ lúc nhận ảnh và thông tin đến khi bàn giao link, QR, video và file phát sân khấu, studio phụ trách trọn quy trình theo concept của hai bạn.</p>
        </motion.div>
        <div className="studioServiceRail">
          {services.map(({ id, number, path, icon: Icon, tone, title, description, items, image }, index) => (
            <motion.a key={id} className={`studioServiceFeature ${tone}`} href={path} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.62, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }} aria-label={`Khám phá ${title}`}>
              <span className="studioServiceIndex">{number}</span>
              <div className="studioServiceCopy">
                <span><Icon size={17} /> DỊCH VỤ</span><h3>{title}</h3><p>{description}</p>
              </div>
              <div className="studioServicePoints">{items.map((item) => <span key={item}><CircleCheck size={14} /> {item}</span>)}</div>
              <div className="studioServiceVisual"><img src={image} alt="" loading="lazy" /></div>
              <span className="studioServiceArrow" aria-hidden="true"><ChevronRight size={23} /></span>
            </motion.a>
          ))}
        </div>
      </section>

      <section className="studioProcess" aria-labelledby="studio-process-title">
        <motion.div {...fadeUp} className="studioProcessHead">
          <span><UsersRound size={16} /> LÀM VIỆC CÙNG STUDIO</span>
          <h2>Từ ý tưởng đến<br /><em>đường link và sân khấu.</em></h2>
        </motion.div>
        <div className="studioProcessGrid">
          {[
            ['01', 'Chọn dịch vụ', 'Xem thư viện, chọn mood và cho studio biết ngày cưới.'],
            ['02', 'Gửi chất liệu', 'Ảnh, tên, lịch trình và những chi tiết hai bạn muốn giữ lại.'],
            ['03', 'Dựng concept', 'Studio phối hình ảnh, màu sắc, chuyển động và trải nghiệm khách mời.'],
            ['04', 'Bàn giao', 'Nhận link/QR, file trình chiếu hoặc lịch giao tráp theo đúng thời điểm.'],
          ].map(([number, title, description], index) => (
            <motion.article key={number} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}>
              <span>{number}</span><h3>{title}</h3><p>{description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="studioOnline" id="thiep-online">
        <motion.div {...fadeUp} className="studioOnlineMedia">
          <div className="studioPhoneMock">
            <img src="/assets/template39/couple-red.webp" alt="Mẫu thiệp cưới online trên điện thoại" />
            <span className="studioPhoneBadge">RSVP<br />ready</span>
          </div>
        </motion.div>
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }} className="studioOnlineCopy">
          <span className="studioEyebrow"><Mail size={16} /> THIỆP CƯỚI ONLINE</span>
          <h2>Đẹp khi mở,<br /><em>tiện khi gửi.</em></h2>
          <p>Hai bạn chọn phong cách và gửi chất liệu. Studio biên tập nội dung, xử lý ảnh, dựng animation, cấu hình tính năng rồi bàn giao link và QR có thể gửi ngay.</p>
          <div className="studioFeatureList">
            <span><QrCode size={20} /> QR và link chia sẻ</span>
            <span><MessageCircle size={20} /> Lời chúc & RSVP</span>
            <span><Images size={20} /> Album ảnh cưới</span>
            <span><Gift size={20} /> QR mừng cưới</span>
          </div>
          <a className="studioTextLink" href="/dich-vu/thiep-cuoi-online">Xem phạm vi gói thiệp trọn gói <ChevronRight size={17} /></a>
        </motion.div>
      </section>

      <section className="studioTemplateTeaser">
        <motion.div {...fadeUp} className="studioTemplateTeaserCopy">
          <span className="studioEyebrow"><Mail size={16} /> THƯ VIỆN MẪU THIỆP</span>
          <h2>Chọn layout trước,<br /><em>rồi kể câu chuyện của hai bạn.</em></h2>
          <p>Mỗi mẫu là một trang React độc lập với bố cục, typography và animation riêng. Thư viện hiện có {invitationTemplateCount} mẫu đang phục vụ để xem trực tiếp trên điện thoại.</p>
          <a className="studioButton primary" href="/mau-thiep">Xem {invitationTemplateCount} mẫu thiệp <ChevronRight size={17} /></a>
        </motion.div>
        <motion.a {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }} className="studioTemplateTeaserVisual" href="/mau-thiep" aria-label="Mở thư viện mẫu thiệp">
          <img className="first" src="/assets/template39/couple-red.webp" alt="" loading="lazy" />
          <img className="second" src="/assets/new-templates/thiep-cuoi-1/preview.webp" alt="" loading="lazy" />
          <img className="third" src="/assets/new-templates/thiep-cuoi-58/preview.png" alt="" loading="lazy" />
          <span>{invitationTemplateCount}<br />MẪU</span>
        </motion.a>
      </section>

      <section className="studioCraft" id="trap-cuoi">
        <motion.div {...fadeUp} className="studioCraftCopy">
          <span className="studioEyebrow"><Gift size={16} /> TRÁP CƯỚI</span>
          <h2>Đặt tráp theo<br /><em>một bảng màu chung.</em></h2>
          <p>Studio hỗ trợ chọn tráp, hoa, tone vải và cách bày theo không gian lễ. Bạn có thể xem album tham khảo, nhận báo giá rồi chọn thuê hoặc đặt mua.</p>
          <a className="studioButton dark" href="/dich-vu/trap-cuoi">Xem thư viện tráp <ChevronRight size={17} /></a>
        </motion.div>
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="studioCraftArt" aria-label="Minh họa tráp cưới">
          <div className="studioCraftImage" />
          <span className="studioCraftLabel one">TRÁP HOA</span>
          <span className="studioCraftLabel two">TRÁP QUẢ</span>
          <span className="studioCraftLabel three">TRÁP TRÀ</span>
        </motion.div>
      </section>

      <section className="studioProjection" id="trinh-chieu">
        <motion.div {...fadeUp} className="studioProjectionVisual">
          <div className="studioScreen">
            <img src="/assets/template44/mountain-couple.webp" alt="Minh họa trình chiếu ảnh cưới" loading="lazy" />
            <span>YOUR STORY<br /><b>IN MOTION</b></span>
          </div>
          <div className="studioProjectionCounter"><Clapperboard size={20} /><span>INTRO<br />00:32</span></div>
        </motion.div>
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="studioProjectionCopy">
          <span className="studioEyebrow"><MonitorPlay size={16} /> TRÌNH CHIẾU SỰ KIỆN</span>
          <h2>Không chỉ là slide,<br /><em>đó là nhịp mở màn.</em></h2>
          <p>Studio nhận album ảnh, chọn nhịp kể, dựng motion, xử lý nhạc và xuất đúng thông số để phát ổn định trên TV, máy chiếu hoặc màn LED lớn.</p>
          <div className="studioProjectionList"><span>Video album ảnh cưới</span><span>Background TV dạm ngõ & ăn hỏi</span><span>Countdown & motion graphic</span></div>
          <a className="studioTextLink" href="/dich-vu/trinh-chieu">Xem gói trình chiếu trọn gói <ChevronRight size={17} /></a>
        </motion.div>
      </section>

      <section className="studioConsult" id="tu-van">
        <motion.div {...fadeUp} className="studioConsultCopy">
          <span>ĐẶT LỊCH TƯ VẤN</span>
          <h2>Hãy bắt đầu từ<br /><em>một cuộc hẹn ngắn.</em></h2>
          <p>Chọn ngày và giờ phù hợp. Studio sẽ dùng thông tin này để chuẩn bị gợi ý concept trước khi trao đổi cùng bạn.</p>
          <div className="studioContactLine"><Phone size={18} /><span>Studio xác nhận lịch hẹn qua số điện thoại hoặc email bạn đăng ký.</span></div>
          <div className="studioContactLine"><MapPin size={18} /><span>Làm việc trực tuyến và hẹn gặp theo lịch.</span></div>
        </motion.div>
        <motion.form {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="studioConsultForm" onSubmit={submitBooking}>
          <label>Họ và tên<input required value={booking.name} onChange={(event) => setBooking({ ...booking, name: event.target.value })} placeholder="Nhập tên của bạn" /></label>
          <label>Số điện thoại<input required type="tel" value={booking.phone} onChange={(event) => setBooking({ ...booking, phone: event.target.value })} placeholder="Ví dụ: 09xx xxx xxx" /></label>
          <div className="studioFormSplit">
            <label>Ngày tư vấn<input required min={minDate} type="date" value={booking.date} onChange={(event) => setBooking({ ...booking, date: event.target.value })} /></label>
            <label>Khung giờ<select value={booking.time} onChange={(event) => setBooking({ ...booking, time: event.target.value })}><option>09:00</option><option>11:00</option><option>14:00</option><option>16:00</option><option>19:00</option></select></label>
          </div>
          <label>Dịch vụ quan tâm<select value={booking.service} onChange={(event) => setBooking({ ...booking, service: event.target.value })}>{services.map((service) => <option key={service.id}>{service.title}</option>)}</select></label>
          <label className="studioHomeConsent"><input type="checkbox" checked={booking.consent} onChange={(event) => setBooking({ ...booking, consent: event.target.checked })} required /><span>Tôi đồng ý để Lời Hẹn Studio liên hệ tư vấn theo <a href="/chinh-sach-bao-mat">chính sách bảo mật</a>.</span></label>
          <label className="studioHomeHoneypot" aria-hidden="true">Website<input tabIndex="-1" autoComplete="off" value={booking.website} onChange={(event) => setBooking({ ...booking, website: event.target.value })} /></label>
          <button className="studioButton primary" type="submit" disabled={submission.loading || !commerceAvailable}><Send size={16} /> {submission.loading ? 'Đang gửi...' : 'Gửi yêu cầu tư vấn'}</button>
          {!commerceAvailable && <p className="studioFormError" role="alert">Hệ thống tiếp nhận đang được cấu hình. Vui lòng mở trang tư vấn để xem các kênh liên hệ hiện có.</p>}
          {submission.error && <p className="studioFormError" role="alert">{submission.error}</p>}
          {submission.result && <p className="studioFormSuccess" role="status"><CircleCheck size={17} /> Đã tiếp nhận yêu cầu {submission.result.public_id || submission.result.publicId}.</p>}
        </motion.form>
      </section>

      <StudioFooter />
    </main>
  );
}

export default StudioHome;
