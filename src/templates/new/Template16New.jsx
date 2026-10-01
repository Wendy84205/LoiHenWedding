import React from 'react';
import { Phone } from 'lucide-react';
import {
  GiftNote,
  MusicButton,
  Reveal,
  RsvpForm,
  WishForm,
  resolveWeddingCalendar,
  useInvitationPage,
} from './NewInvitationCommon.jsx';
import './template16New.css';

/* 1:1 theo https://cinelove.me/template/thiep-cuoi-16
   Canvas 500px, 61 nodes đúng thứ tự DOM / top / left / width / height /
   z-index / font / ảnh / transition của bản gốc. */
const R = '/assets/template16-ref/ref';
const A = R;
const U = R;
const MASK = `${R}/mask-arch.png`;
const CROP = `${R}/crop-flower.png`;
const HEART = `${R}/calen-heart.png`;

const ARCH_PATH =
  'M838.656 1024H192.512V330.752C192.512 152.576 337.92 8.192 516.096 8.192 694.272 8.192 839.68 152.576 839.68 331.776l-1.024 692.224z';

const WEDDING_DAY = 20;
const WEDDING_MONTH = 8;
const WEDDING_YEAR = 2025;
const ADDRESS = '52 Miếu Đầm, Mễ Trì, Nam Từ Liêm, Hà Nội';
const MAP_SRC = `https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

const REVEAL_DIRECTION = {
  'slide-up': 'up',
  'slide-right': 'right',
  'slide-left': 'left',
  'fade-in': 'fade',
};

function revealProps(anim = 'slide-up-0') {
  const match = /^([a-z-]+?)-(\d+(?:\.\d+)?)$/.exec(anim);
  return {
    direction: REVEAL_DIRECTION[match?.[1] || 'slide-up'] || 'up',
    delay: Number(match?.[2] || 0),
    duration: 1.3,
  };
}

const NODES = [
  { id: 'bgTaupe', kind: 'shape', shape: 'rect', t: 0, l: 0, w: 500, h: 500, z: 0, fill: '#b8afa0', anim: 'fade-in-0' },
  // Nhãn dán vòm kem sau ảnh hero (svg arch gốc, viewBox 1024)
  { id: 'archCream', kind: 'shape', shape: 'arch', t: 61.3793, l: 89.326, w: 410.7, h: 375.64, z: 0, fill: '#fafafa', anim: 'slide-up-0.2' },
  { id: 'heroArch', kind: 'photo', mask: true, t: 63.047, l: 166.71, w: 271.109, h: 355.106, z: 0, src: `${A}/01-hero-arch.png`, alt: 'Co dau chu re', anim: 'slide-up-0.2' },
  { id: 'wedding', kind: 'text', t: 159.5, l: 34, w: 246, z: 63, cls: 't16n-wedding', anim: 'slide-up-0', text: 'WEDDING' },
  { id: 'weddingEcho', kind: 'text', t: 159.546, l: 35.9, w: 247.5, z: 64, cls: 't16n-wedding is-echo', anim: 'slide-up-0', text: 'WEDDING' },
  { id: 'heroPoem', kind: 'text', t: 443.5, l: 12.5, w: 252, z: 62, cls: 't16n-heroPoem', anim: 'slide-right-0', lines: ['Thời gian làm mối tơ hồng, ', 'Thanh xuân là sính, trao lòng cho nhau'] },
  { id: 'opening', kind: 'text', t: 540, l: 34, w: 410, z: 0, cls: 't16n-quote24', anim: 'slide-up-0', lines: ['Gặp nhau ánh mắt đầu tiên ', 'Mà tim bỗng chốc nghiêng nghiêng nhịp hồng. ', 'Tưởng là thoáng gặp thoáng trông, ', 'Ai ngờ nên nghĩa vợ chồng từ đây'] },
  { id: 'storyIntro', kind: 'text', t: 692, l: 78, w: 311, z: 10, cls: 't16n-chapterMallong26', anim: 'slide-up-0', text: '/ Love story about us /' },
  { id: 'introWide', kind: 'photo', t: 753.953375, l: 58.15, w: 383.8, h: 254.047, z: 0, src: `${U}/236a0eb4-e3c2-49e5-9167-1571ea7cbb80.jpg`, alt: 'Khoanh khac dau tien', anim: 'slide-up-0.2' },
  { id: 'storyLeft', kind: 'photo', t: 1049, l: 77.974, w: 165, h: 209.573, z: 1, src: `${U}/9a88a217-0e7d-4225-b29e-743ece133e49.jpg`, alt: 'Ben nhau', anim: 'slide-up-0.2' },
  { id: 'storyLeftSticker', kind: 'shape', shape: 'rect', t: 1028.96, l: 58.2051, w: 140.5, h: 165.869, z: 0, fill: '#b8afa0', anim: 'slide-right-0.2' },
  { id: 'storyArch', kind: 'photo', mask: true, crop: true, t: 1039.6, l: 273.348, w: 168.648, h: 252.832, z: 2, src: `${A}/85103105-8b5e-4edb-a2d9-470c2097973c.png`, alt: 'Co dau chu re', anim: 'slide-left-0.2' },
  { id: 'startDate', kind: 'text', t: 1292.4, l: 97.15, w: 126.7, z: 3, cls: 't16n-snd22', anim: 'slide-up-0', text: '20/08/2025' },
  { id: 'startSlash', kind: 'text', t: 1323.92, l: 104.3, w: 126.7, z: 4, cls: 't16n-snd22 is-bold', anim: 'slide-up-0', text: '/' },
  { id: 'storyLine', kind: 'text', t: 1354.44, l: 97.1, w: 290.4, z: 5, cls: 't16n-story22', anim: 'slide-up-0', text: ['When you first meet someone,', 'you fall in love'] },
  { id: 'storyPoemRight', kind: 'text', t: 1466.79, l: 167.65, w: 314.9, z: 6, cls: 't16n-poem22 is-right', anim: 'slide-up-0', text: ['Trời xanh, nắng nhẹ, gió hiền,', 'Lòng em muốn viết đôi miền lặng thinh.', 'Vài dòng thủ thỉ tâm tình,', 'Chỉ anh biết nhé, đừng trình biển khơi...'] },
  { id: 'ruleStory1', kind: 'shape', shape: 'rect', t: 1460.39, l: 152.3, w: 1.42241, h: 130.708, z: 7, fill: '#000000', anim: 'slide-up-0.2' },
  { id: 'ruleStory2', kind: 'shape', shape: 'rect', t: 1475.39, l: 167.3, w: 0.7, h: 130.708, z: 8, fill: '#000000', anim: 'slide-up-0.2' },
  { id: 'storyPoemCenter', kind: 'text', t: 1664.82, l: 74.45, w: 350.9, z: 13, cls: 't16n-poem22 is-center', anim: 'slide-up-0', text: ['Em cười ánh mắt long lanh,', 'Chỉ trong một thoáng, tim thành của nhau…'] },
  { id: 'storyChapter', kind: 'text', t: 1732.56, l: 74.4, w: 350.9, z: 12, cls: 't16n-mallongChapter', anim: 'slide-up-0', text: '/ Love story about us /' },
  { id: 'storyCircleTop', kind: 'shape', shape: 'circle', t: 673.977, l: 89.3, w: 63, h: 63, z: 9, fill: '#b8afa0', anim: 'slide-right-0.2' },
  { id: 'storyCircleBottom', kind: 'shape', shape: 'circle', t: 1694.3, l: 323.5, w: 64, h: 64, z: 11, fill: '#b8afa0', anim: 'slide-left-0.2' },
  { id: 'bridePhoto', kind: 'photo', t: 1816.91, l: 77.941, w: 157.659, h: 200, z: 16, src: `${A}/04-portrait-left.jpg`, alt: 'Cô dâu Nguyễn Thảo My', anim: 'slide-up-0.2' },
  { id: 'brideSticker', kind: 'shape', shape: 'rect', t: 1797.5, l: 58.1259, w: 145.027, h: 176.268, z: 15, fill: '#b8afa0', anim: 'slide-right-0.2' },
  { id: 'brideRole', kind: 'text', t: 2029.19, l: 70.6, w: 86.2, z: 18, cls: 't16n-mallong21', anim: 'slide-right-0', text: 'BRIDE' },
  { id: 'brideName', kind: 'text', t: 2070.18, l: 70.65, w: 188.8, z: 13, cls: 't16n-name22', anim: 'slide-up-0', text: 'Nguyễn Thảo My' },
  { id: 'groomRole', kind: 'text', t: 2084.89, l: 291.2, w: 86.2, z: 19, cls: 't16n-mallong21', anim: 'slide-up-0', text: 'GROOM' },
  { id: 'groomName', kind: 'text', t: 2131.18, l: 291.15, w: 188.8, z: 14, cls: 't16n-name22', anim: 'slide-left-0', text: 'Đặng Trung Quân' },
  { id: 'bridePhone', kind: 'phone', t: 2111.2, l: 67, w: 112.775, h: 34.7, z: 20, tel: '+840912345678', label: 'Liên hệ cô dâu', anim: 'slide-right-0.3' },
  { id: 'groomPhone', kind: 'phone', t: 2170.95, l: 291.1, w: 112.775, h: 34.7, z: 21, tel: '+840987654321', label: 'Liên hệ chú rể', anim: 'slide-up-0.3' },
  { id: 'couplePhoto', kind: 'photo', t: 2273.33, l: 50, w: 394, h: 259.555, z: 24, src: `${A}/05-couple-full.jpg`, alt: 'Ngày chung đôi', anim: 'slide-up-0.2' },
  { id: 'coupleSticker', kind: 'shape', shape: 'rect', t: 2299.75, l: 98.5135, w: 369.828, h: 255.516, z: 23, fill: '#b8afa0', anim: 'slide-up-0.2' },
  { id: 'vowPoem', kind: 'text', t: 2585.16, l: 77.9, w: 381.3, z: 25, cls: 't16n-poem22 is-right is-wide', anim: 'slide-up-0', text: ['Mọi điều vĩnh hằng trên thế gian', 'đều mang dấu vết tình yêu anh dành cho em', 'như trăng khi tròn khi khuyết', 'như mặt trời luôn mọc ở phương Đông', 'như định luật I của Newton', 'và như em – mãi yêu anh.'] },
  { id: 'forever', kind: 'text', t: 2869.56, l: 64, w: 366, z: 29, cls: 't16n-mallong22Center', anim: 'slide-up-0', text: 'Bên anh mãi mãi, dài lâu trọn đời' },
  { id: 'foreverChapter', kind: 'text', t: 2906.46, l: 64, w: 366, z: 30, cls: 't16n-mallong22Center', anim: 'slide-up-0', text: '/ Love story about us /' },
  { id: 'foreverCircle', kind: 'shape', shape: 'circle', t: 2882.1, l: 127.9, w: 48.8, h: 48.8, z: 28, fill: '#b8afa0', anim: 'slide-up-0.2' },
  { id: 'ruleForever', kind: 'shape', shape: 'rect', t: 2723.45, l: 122.3, w: 1.09235, h: 130.6, z: 31, fill: '#000000', anim: 'slide-right-0.2' },
  { id: 'galleryWide', kind: 'photo', t: 2970.43, l: 23.8, w: 435.5, h: 295.15, z: 34, src: `${A}/06-gallery-wide.jpg`, alt: 'Bước bên nhau', anim: 'slide-up-0.2' },
  { id: 'gallerySticker', kind: 'shape', shape: 'rect', t: 2988.91, l: 70.6, w: 402.54, h: 289.938, z: 33, fill: '#b8afa0', anim: 'slide-up-0.2' },
  { id: 'keepsakeLeft', kind: 'photo', t: 3297.06, l: 23.939, w: 235.5, h: 262.287, z: 35, src: `${A}/08-keepsake-left.jpg`, alt: 'Bó hoa cưới', anim: 'slide-right-0.2' },
  { id: 'keepsakeRight', kind: 'photo', t: 3322.97, l: 274.439, w: 198.7, h: 283.61, z: 36, src: `${A}/09-keepsake-right.jpg`, alt: 'Kỷ niệm', anim: 'slide-left-0.2' },
  { id: 'keepsakePoem1', kind: 'text', t: 3649.98, l: 110.65, w: 361.1, z: 37, cls: 't16n-poem23 is-right', anim: 'slide-up-0', text: ['Hái sen rộng chiếc lá xanh', 'Gói trăng mang chút mong manh đem về', 'Kẹp trong trang cổ đề huê', 'Ép chung thương nhớ vụng về năm xưa…'] },
  { id: 'keepsakePoem2', kind: 'text', t: 3830.18, l: 110.65, w: 361.1, z: 38, cls: 't16n-poem23 is-right', anim: 'slide-up-0', text: ['Em và anh – trẻ con thôi', 'Cùng bên hũ mứt, mỉm cười chia nhau', 'Nếm từng chút ngọt ngào sâu', 'Xem trong tình ấy – có bao nhiêu đường…'] },
  { id: 'calendar', kind: 'calendar', t: 4023.36, l: 130, w: 300, h: 280, z: 39, anim: 'slide-up-0.3' },
  { id: 'countdown', kind: 'countdown', t: 4023.71, l: 42.5981, w: 70.7502, h: 280.057, z: 40, anim: 'slide-right-0.3' },
  { id: 'dateLine', kind: 'text', t: 4334.7, l: 106.8, w: 323.6, z: 41, cls: 't16n-signora22Center', anim: 'slide-up-0', text: 'Thứ 4 ngày 20 tháng 08 năm 2025' },
  { id: 'dateLineLunar', kind: 'text', t: 4368.16, l: 106.8, w: 323.6, z: 42, cls: 't16n-signora22Center', anim: 'slide-up-0', text: 'Ngày 26 tháng 07 âm lịch 12:00PM' },
  { id: 'simplePoem', kind: 'text', t: 4470.88, l: 60.7, w: 407.6, z: 46, cls: 't16n-poem22 is-left is-light', anim: 'slide-up-0', text: ['Ý đời giản dị thế thôi,', 'Là khi tóc trắng vẫn ngồi bên nhau.'] },
  { id: 'simpleChapter', kind: 'text', t: 4538.29, l: 57.2, w: 352.6, z: 47, cls: 't16n-chapterLight', anim: 'slide-up-0', text: '/ Love story about us /' },
  { id: 'venueCircle', kind: 'shape', shape: 'circle', t: 4501.01, l: 219.1, w: 60.9, h: 60.9, z: 45, fill: '#b8afa0', anim: 'slide-up-0.2' },
  { id: 'brideFull', kind: 'photo', t: 4682.38, l: 24.8, w: 248.5, h: 370.498, z: 48, src: `${A}/10-bride-full.png`, alt: 'Cô dâu', anim: 'slide-right-0.2' },
  { id: 'venueBottom', kind: 'photo', t: 4867.66, l: 291.2, w: 184, h: 225.41, z: 52, src: `${A}/12-venue-bottom.jpg`, alt: 'Không gian tiệc cưới', anim: 'slide-left-0.2' },
  { id: 'venueTop', kind: 'photo', t: 4617.78, l: 291.1, w: 184, h: 238.187, z: 50, src: `${A}/11-venue-top.png`, alt: 'Sảnh tiệc', anim: 'slide-left-0.2' },
  { id: 'venueSticker', kind: 'shape', shape: 'rect', t: 5061.79, l: 280.6, w: 205.407, h: 42.887, z: 51, fill: '#b8afa0', anim: 'slide-left-0.2' },
  { id: 'venuePoem', kind: 'text', t: 5127.98, l: 55.9, w: 371.4, z: 53, cls: 't16n-poem22 is-center is-wide', anim: 'slide-up-0', text: ['Tháng Tám nghiêng nắng qua thềm,', 'Gió heo may gọi êm đềm thu sang.'] },
  { id: 'mapPlace', kind: 'shape', shape: 'rect', t: 5313.04, l: 56.4, w: 386.8, h: 151.778, z: 55, fill: '#b8afa0', anim: 'slide-up-0.2' },
  { id: 'map', kind: 'map', t: 5214.77, l: 78.3, w: 344, h: 223.387, z: 65, anim: 'slide-up-0.3' },
  { id: 'address', kind: 'text', t: 5483.47, l: 66.9, w: 365.2, z: 57, cls: 't16n-signora22Center', anim: 'slide-up-0', text: ADDRESS },
  { id: 'thanks', kind: 'text', t: 5966.88, l: 132, w: 235.4, z: 58, cls: 't16n-thanks', anim: 'slide-up-0', text: 'Thank you' },
  { id: 'rsvp', kind: 'rsvp', t: 5559.86, l: 97.1, w: 300, h: 335, z: 59, anim: 'slide-up-0.3' },
  { id: 'heroArchPhoto', kind: 'photo', t: 63.018, l: 185.339, w: 258.7, h: 387.836, z: 60, src: `${A}/01-hero-arch.png`, alt: 'Cô dâu chú rể', mask: true, anim: 'slide-up-0.2' },
  { id: 'mirrorPortrait', kind: 'photo', t: 1837.81, l: 282.546, w: 170.537, h: 229.988, z: 35, src: `${A}/07-portrait-mirror.jpg`, alt: 'Chú rể Đặng Trung Quân', mirror: true, anim: 'slide-up-0.2' },
];

function NodeContent({ node, count }) {
  if (node.kind === 'photo') {
    // Ảnh vòm (hero) dùng mask arch; node crop dùng mask hoa
    const maskSrc = node.crop ? CROP : MASK;
    const maskStyle = node.mask
      ? {
        WebkitMaskImage: `url("${maskSrc}")`,
        WebkitMaskSize: '100% 100%',
        WebkitMaskRepeat: 'no-repeat',
        maskImage: `url("${maskSrc}")`,
        maskSize: '100% 100%',
        maskRepeat: 'no-repeat',
      }
      : null;
    return (
      <div
        className="t16n-photo"
        style={{
          backgroundImage: `url(${node.src})`,
          ...(node.mirror ? { transform: 'scaleX(-1)' } : null),
          ...maskStyle,
        }}
        role="img"
        aria-label={node.alt}
      />
    );
  }
  if (node.kind === 'phone') {
    return (
      <a className="t16n-phoneBtn" href={`tel:${node.tel}`}>
        <Phone size={16} />
        {node.label}
      </a>
    );
  }
  if (node.kind === 'calendar') {
    const { offset, dayCount } = resolveWeddingCalendar({
      date: `${WEDDING_YEAR}-${String(WEDDING_MONTH).padStart(2, '0')}-${WEDDING_DAY}`,
    });
    const days = [
      ...Array.from({ length: offset }, (_, index) => `blank-${index}`),
      ...Array.from({ length: dayCount }, (_, index) => index + 1),
    ];
    return (
      <div className="t16n-calBox">
        <div className="t16n-calendar">
          <div className="t16n-calBack" />
          <div className="t16n-calHead">{`${WEDDING_MONTH}.${WEDDING_YEAR}`}</div>
          <div className="t16n-calBody">
            {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day) => (
              <div className="t16n-calWeek" key={day}>{day}</div>
            ))}
            {days.map((day) => typeof day === 'string'
              ? <div className="t16n-calCell" key={day} />
              : (
                <div className="t16n-calCell" key={day}>
                  {day === WEDDING_DAY && <img className="t16n-calHeart" src={HEART} alt="" aria-hidden="true" />}
                  <div className={day === WEDDING_DAY ? 't16n-calNum is-marked' : 't16n-calNum'}>{day}</div>
                </div>
              ))}
            <div className="t16n-calYear">{WEDDING_YEAR}</div>
          </div>
        </div>
      </div>
    );
  }
  if (node.kind === 'countdown') {
    const labels = ['ngày', 'giờ', 'phút', 'giây'];
    return (
      <div className="t16n-countdown">
        {labels.map((label, index) => (
          <div className="t16n-countRow" key={label}>
            <div>{count[index]}</div>
            <div>{label}</div>
          </div>
        ))}
      </div>
    );
  }
  if (node.kind === 'map') {
    return <iframe className="t16n-map" src={MAP_SRC} title={`Bản đồ ${ADDRESS}`} loading="lazy" />;
  }
  if (node.kind === 'rsvp') {
    return (
      <RsvpForm
        className="ni-rsvp t16n-rsvpCard"
        accent="#b8afa0"
        title="Rất mong nhận được hồi âm từ bạn"
        declineLabel="Tôi bận, rất tiếc không thể tham dự"
        showPartySize={false}
      />
    );
  }
  return null;
}

function toLines(text) {
  const lines = Array.isArray(text) ? text : [text];
  return lines.map((line, index) => (
    <React.Fragment key={`${index}-${line}`}>
      {index > 0 && <br />}
      {line}
    </React.Fragment>
  ));
}

function nodeStyle(node) {
  return {
    top: node.t,
    left: node.l,
    width: node.w,
    zIndex: node.z,
    ...(node.h ? { height: node.h } : null),
  };
}

function renderNode(node, count) {
  const anim = revealProps(node.anim);
  const reveal = { duration: anim.duration, delay: anim.delay, direction: anim.direction };

  if (node.kind === 'shape') {
    if (node.shape === 'arch') {
      return (
        <Reveal key={node.id} {...reveal} className="t16n-node" style={nodeStyle(node)}>
          <svg className="t16n-arch" viewBox="0 0 1024 1024" preserveAspectRatio="none" aria-hidden="true">
            <path d={ARCH_PATH} fill={node.fill} />
          </svg>
        </Reveal>
      );
    }
    return (
      <Reveal
        key={node.id}
        {...reveal}
        className={`t16n-node t16n-shape ${node.shape === 'circle' ? 'is-circle' : ''}`}
        style={{ ...nodeStyle(node), background: node.fill }}
      />
    );
  }

  if (node.kind === 'text') {
    return (
      <Reveal key={node.id} {...reveal} className={`t16n-node t16n-text ${node.cls}`} style={nodeStyle(node)}>
        {toLines(node.lines || node.text)}
      </Reveal>
    );
  }

  return (
    <Reveal key={node.id} {...reveal} className={`t16n-node t16n-${node.kind}`} style={nodeStyle(node)}>
      <NodeContent node={node} count={count} />
    </Reveal>
  );
}

export default function Template16New() {
  const count = useInvitationPage('template16new-page', '2025-08-20T12:00:00+07:00');

  return (
    <main className="new-invitation-page t16n">
      <MusicButton className="t16n-music" />

      {/* Bản dựng 1:1 theo canvas 500 x 6087 của mẫu Cinelove */}
      <div className="t16n-canvas">{NODES.map((node) => renderNode(node, count))}</div>

      {/* Lời chúc & mừng cưới của Lời Hẹn (nằm dưới canvas mẫu) */}
      <section className="t16n-extras">
        <WishForm className="t16n-wish" accent="#b8afa0" />
        <GiftNote className="t16n-gift" />
      </section>
    </main>
  );
}

