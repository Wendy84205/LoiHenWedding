import React from 'react';
import {
  Countdown,
  GiftNote,
  MusicButton,
  Reveal,
  RsvpForm,
  WishForm,
  useInvitationPage,
} from './NewInvitationCommon.jsx';
import './template10New.css';

/* Dựng 1:1 theo https://cinelove.me/template/thiep-cuoi-10
   Canvas 500 x 9250px, 62 node đúng thứ tự DOM / toạ độ / kích thước /
   z-index / font / ảnh / transition của bản gốc. */
const R = '/assets/template10-ref/ref';

const ADDRESS = '52 Miếu Đầm, Mễ Trì, Nam Từ Liêm, Hà Nội';
const MAP_SRC = `https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

const CAL_WEEK = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
const CAL_EMPTY = ['e1', 'e2', 'e3'];
const CAL_DAYS = Array.from({ length: 31 }, (_, index) => index + 1);

const NODES = [
  { id: '1e2mPbX0ng', kind: 'text', style: { top: '16.0px', left: '20.0px', width: '455.0px', height: '30px' }, cls: 't10n-tx0', lines: ["Save the date  | Đám cưới của Lisa & Mona"], direction: 'up', delay: 0.0 },
  { id: 'VEivl5myDa', kind: 'text', style: { top: '52.0px', left: '19.25px', width: '91.5px', height: '28px' }, cls: 't10n-tx1', lines: ["Thư mời"], direction: 'right', delay: 0.0 },
  { id: 'PgysPiUbgw', kind: 'text', style: { top: '89.0px', left: '20.9px', width: '363.9px', height: '25px' }, cls: 't10n-tx2', lines: ["Lisa & Mona              21/05/2025    13:00"], direction: 'up', delay: 0.0 },
  { id: 'sjfe7fQLWI', kind: 'text', style: { top: '130.0px', left: '130.6px', width: '343.0px', height: '55.19px' }, cls: 't10n-tx3', lines: ["\"Dù núi êm, nước dịu muôn trùng,", "Cũng không bằng một ánh nhìn của em.\""], direction: 'up', delay: 0.0 },
  { id: 'F1Fhp8BIu4', kind: 'photo', style: { top: '219.0px', left: '26.0px', width: '448.0px', height: '298.67px' }, src: `${R}/m10.jpeg`, direction: 'up', delay: 0.2 },
  { id: 'RhLVQ6ULlB', kind: 'photo', style: { top: '537.24px', left: '77.0px', width: '366.0px', height: '47.41px' }, src: `${R}/m21.png`, direction: 'up', delay: 0.2 },
  { id: 'c2k1fl7HZC', kind: 'photo', style: { top: '611.0px', left: '26.03px', width: '448.88px', height: '284.36px' }, src: `${R}/m13.png`, direction: 'up', delay: 0.2 },
  { id: '1MtsQ_2Xbm', kind: 'blank', style: { top: '915.74px', left: '43.94px', width: '419.35px', height: '103.26px' }, direction: 'up', delay: 0.2 },
  { id: '8hGQ7yQ0qA', kind: 'photo', style: { top: '981.85px', left: '325.8px', width: '30.9px', height: '21.97px' }, src: `${R}/m15.gif`, direction: 'up', delay: 0.2 },
  { id: 'xkcA4muDUL', kind: 'photo', style: { top: '929.55px', left: '373.94px', width: '77.91px', height: '75.55px' }, src: `${R}/m11.jpeg`, direction: 'left', delay: 0.2 },
  { id: 'FfpXBV1MAG', kind: 'text', style: { top: '944.56px', left: '60.0px', width: '213.4px', height: '25px' }, cls: 't10n-tx2', lines: ["Chúng tôi đã kết hôn"], direction: 'up', delay: 0.0 },
  { id: 'QpC0QGWPJx', kind: 'photo', style: { top: '1054.36px', left: '225.9px', width: '53.4px', height: '55.38px' }, src: `${R}/m06.png`, direction: 'up', delay: 0.2 },
  { id: 'SZBvANoMiZ', kind: 'photo', style: { top: '1145.9px', left: '70.42px', width: '354.98px', height: '10.66px' }, src: `${R}/m16.gif`, direction: 'up', delay: 0.2 },
  { id: '9XJYpFXuje', kind: 'text', style: { top: '1203.93px', left: '58.4px', width: '378.4px', height: '96px', opacity: 0.8 }, cls: 't10n-tx4', lines: ["\"Cuộc đời dài hơn ba vạn ngày,", "Nhưng hôm nay là ngày đặc biệt,", "Vì em đã đến, chỉ dành cho chúng tôi.\""], direction: 'up', delay: 0.0 },
  { id: 'rwRvoS7LCQ', kind: 'photo', style: { top: '1396.46px', left: '35.99px', width: '195.8px', height: '253.91px' }, src: `${R}/m28.jpeg`, mask: `${R}/m04.png`, direction: 'right', delay: 0.2 },
  { id: 'Dg_WF2QOJ-', kind: 'photo', style: { top: '1396.44px', left: '279.32px', width: '198.1px', height: '256.81px' }, src: `${R}/m25.jpeg`, mask: `${R}/m04.png`, direction: 'left', delay: 0.2 },
  { id: 'd0tfP6pumt', kind: 'text', style: { top: '1669.0px', left: '86.7px', width: '94.4px', height: '31px' }, cls: 't10n-tx5', lines: ["Mona"], direction: 'right', delay: 0.0 },
  { id: 'DIqzBHdDXB', kind: 'text', style: { top: '1669.0px', left: '325.8px', width: '87.3px', height: '31px' }, cls: 't10n-tx5', lines: ["Lisa"], direction: 'left', delay: 0.0 },
  { id: 'bhsE7hftyw', kind: 'svg', style: { top: '1661.18px', left: '68.4px', width: '110.9px', height: '143.74px' }, src: `${R}/seal-left.svg`, rot: 270, direction: 'right', delay: 0.2 },
  { id: 'AHOnPKACSW', kind: 'svg', style: { top: '1660.04px', left: '315.64px', width: '110.9px', height: '143.74px' }, src: `${R}/seal-right.svg`, rot: 270, direction: 'left', delay: 0.2 },
  { id: 'BFqJqd08hy', kind: 'text', style: { top: '1722.78px', left: '60.9px', width: '150.0px', height: '23px' }, cls: 't10n-tx6', lines: ["Liên hệ chú rể"], direction: 'right', delay: 0.0 },
  { id: 'JHg6wqiO7F', kind: 'text', style: { top: '1722.78px', left: '325.85px', width: '116.1px', height: '23px' }, cls: 't10n-tx6', lines: ["Liên hệ cô dâu"], direction: 'left', delay: 0.0 },
  { id: 'N4k4bH1Pms', kind: 'photo', style: { top: '1719.29px', left: '65.0px', width: '24.0px', height: '25.2px' }, src: `${R}/m09.png`, direction: 'right', delay: 0.2 },
  { id: 'bsT8vQdCS3', kind: 'photo', style: { top: '1719.29px', left: '310.0px', width: '24.0px', height: '25.2px' }, src: `${R}/m09.png`, direction: 'up', delay: 0.2 },
  { id: '2g-0rmto8k', kind: 'text', style: { top: '1806.8px', left: '7.9px', width: '480.0px', height: '169.5px', opacity: 0.81 }, cls: 't10n-tx7', lines: ["\"Ta cùng nhau trưởng thành qua năm tháng,", "Chia sẻ những niềm vui và cả những nỗi buồn.", "Dẫu có những lúc va vấp giữa đời thường,", "Nhưng nhiều hơn cả là những ký ức ngọt ngào.", "Ta đã thấy được phiên bản đẹp nhất của nhau,", "Và cũng trở thành phiên bản tuyệt vời nhất của chính mình.\""], direction: 'up', delay: 0.0 },
  { id: 't6OWeclVPj', kind: 'photo', style: { top: '2029.22px', left: '265.37px', width: '197.0px', height: '307.11px' }, src: `${R}/m27.jpeg`, mask: `${R}/m03.png`, direction: 'left', delay: 0.2 },
  { id: 't5zHx1Mnj-', kind: 'photo', style: { top: '2030.84px', left: '35.97px', width: '195.8px', height: '303.92px' }, src: `${R}/m24.jpeg`, mask: `${R}/m02.png`, direction: 'right', delay: 0.2 },
  { id: '9XnBIAMDhi', kind: 'text', style: { top: '2359.66px', left: '145.4px', width: '321.0px', height: '156.75px', opacity: 0.82 }, cls: 't10n-tx8', lines: ["\"Mọi phút giây bên em đều rạng rỡ,", "Dù trời nắng, trời mưa hay trời dịu êm,", "Chỉ cần có em, mọi thứ đều trở nên đẹp đẽ.\""], direction: 'up', delay: 0.0 },
  { id: 'N6JJEeZtoU', kind: 'photo', style: { top: '2485.76px', left: '56.4px', width: '388.2px', height: '580.68px' }, src: `${R}/m26.jpeg`, mask: `${R}/m05.png`, direction: 'up', delay: 0.2 },
  { id: 'OmZMkAaaZN', kind: 'text', style: { top: '3088.75px', left: '62.55px', width: '377.1px', height: '25px' }, cls: 't10n-tx9', lines: ["\"Niềm vui có người sẻ chia, năm tháng cùng nhau đi qua.\""], direction: 'up', delay: 0.0 },
  { id: 'HuTGemovC8', kind: 'blank', style: { top: '3230.0px', left: '69.8px', width: '324.0px', height: '324.0px', opacity: 0.6 }, direction: 'up', delay: 0.2 },
  { id: '223abjXIn2', kind: 'photo', style: { top: '3175.94px', left: '20.05px', width: '212.4px', height: '311.23px' }, src: `${R}/m19.jpeg`, direction: 'right', delay: 0.2 },
  { id: 'FX3IoyoUoN', kind: 'photo', style: { top: '3300.24px', left: '261.45px', width: '212.6px', height: '311.52px' }, src: `${R}/m08.jpeg`, direction: 'left', delay: 0.2 },
  { id: '2eby78hK9a', kind: 'text', style: { top: '3752.99px', left: '65.0px', width: '384.2px', height: '52px', opacity: 0.85 }, cls: 't10n-tx10', lines: ["''Tình yêu thực sự là khi cả hai cùng nhau vun đắp.\""], direction: 'up', delay: 0.0 },
  { id: '0OhUfaljJg', kind: 'text', style: { top: '3853.94px', left: '20.1px', width: '465.4px', height: '96px', opacity: 0.86 }, cls: 't10n-tx11', lines: ["\"Anh yêu em,", "Không chỉ vì vẻ đẹp của em,", "Mà còn vì bên em anh trở thành phiên bản tốt nhất của chính mình.\""], direction: 'up', delay: 0.0 },
  { id: 'Wn8NLdCvYB', kind: 'photo', style: { top: '4055.88px', left: '20.9px', width: '452.2px', height: '262.89px' }, src: `${R}/m22.jpeg`, direction: 'up', delay: 0.2 },
  { id: 'UnLmCmcBgk', kind: 'text', style: { top: '4332.39px', left: '151.0px', width: '198.9px', height: '64px', opacity: 0.66 }, cls: 't10n-tx12', lines: ["Another Day Sun."], direction: 'up', delay: 0.0 },
  { id: 'Jj2gjBLE3A', kind: 'photo', style: { top: '4367.72px', left: '20.9px', width: '454.0px', height: '302.67px' }, src: `${R}/m23.jpeg`, direction: 'up', delay: 0.2 },
  { id: 'TGSIHse-Td', kind: 'text', style: { top: '4694.31px', left: '43.0px', width: '428.3px', height: '88px', opacity: 0.66 }, cls: 't10n-tx12', lines: ["\"Giữa đám đông, em khẽ mỉm cười với anh,", "Vì nụ cười ấy, anh đã chờ đợi từ lâu.\""], direction: 'up', delay: 0.0 },
  { id: '5yjqGPc6LA', kind: 'photo', style: { top: '4766.0px', left: '26.0px', width: '448.0px', height: '671.64px' }, src: `${R}/m20.jpeg`, direction: 'up', delay: 0.2 },
  { id: 'r-NlXQPGR4', kind: 'text', style: { top: '5466.32px', left: '26.1px', width: '448.9px', height: '228.19px', opacity: 0.66 }, cls: 't10n-tx13', lines: ["\"Tình yêu là gì?", "Là lúc cùng em trò chuyện về thế gian khi cuộc sống bấp bênh,", "Là cùng em bước qua hành trình vô tận,", "Dù trời có tắt nắng, tình yêu vẫn vẹn nguyên như thuở ban đầu.\""], direction: 'up', delay: 0.0 },
  { id: 'qhgdM9UnWA', kind: 'photo', style: { top: '5617.86px', left: '26.0px', width: '447.1px', height: '262.05px' }, src: `${R}/m12.jpeg`, direction: 'up', delay: 0.2 },
  { id: 'IGkObA73x4', kind: 'photo', style: { top: '5879.9px', left: '26.2px', width: '446.9px', height: '261.93px' }, src: `${R}/m14.jpeg`, direction: 'up', delay: 0.2 },
  { id: 'VmRGgQqmJx', kind: 'text', style: { top: '6158.78px', left: '26.4px', width: '447.6px', height: '146.16px', opacity: 0.66 }, cls: 't10n-tx14', lines: ["\"Giờ đây, chúng ta cùng nhau quyết định cho tương lai,", "Cùng xây dựng sự nghiệp, cùng khám phá thế giới đầy bí ẩn,", "Hướng tới một cuộc sống tươi đẹp và tràn ngập hạnh phúc.\""], direction: 'up', delay: 0.0 },
  { id: '8XhrUyQABS', kind: 'photo', style: { top: '6293.15px', left: '227.5px', width: '44.3px', height: '45.94px' }, src: `${R}/m06.png`, direction: 'up', delay: 0.2 },
  { id: 'Hr10tFLvVA', kind: 'text', style: { top: '6372.52px', left: '6.9px', width: '480.0px', height: '403.19px', opacity: 0.66 }, cls: 't10n-tx14', lines: ["Trước đây, tôi từng nghĩ rằng", "Đám cưới chỉ là một thông báo chính thức,", "Nhưng sau này tôi mới hiểu,", "Đó là một cuộc hội ngộ hiếm hoi,", "Là hành trình dài đằng đẵng để đến bên nhau,", "Là sự ủng hộ không tính toán mất mát.", "Ngày hôm nay, Cùng với cha mẹ chúng tôi, xin chân thành mời bạn", "Đến tham dự đám cưới của chúng tôi,", "Hy vọng bạn sẽ là người chứng kiến khoảnh khắc quan trọng nhất trong cuộc đời chúng tôi."], direction: 'up', delay: 0.0 },
  { id: '3H5WAhj3S1', kind: 'text', style: { top: '6753.42px', left: '179.0px', width: '136.0px', height: '28px', opacity: 0.78 }, cls: 't10n-tx15', lines: ["Thời gian"], direction: 'up', delay: 0.0 },
  { id: 'Zb2xcGukqg', kind: 'text', style: { top: '6782.09px', left: '102.7px', width: '295.6px', height: '21px' }, cls: 't10n-tx16', lines: ["Thứ 7 Ngày 21 tháng 5 năm 2025"], direction: 'up', delay: 0.0 },
  { id: 'ZTaM_j1k_4', kind: 'text', style: { top: '6813.0px', left: '98.9px', width: '296.0px', height: '21px' }, cls: 't10n-tx16', lines: ["Ngày 18 tháng 4 âm lịch"], direction: 'up', delay: 0.0 },
  { id: 'J0YpmROYcv', kind: 'countdown', style: { top: '6856.31px', left: '111.5px', width: '278.0px', height: '59.57px', opacity: 0.6 }, direction: 'up', delay: 0.3 },
  { id: 'kBRj7igxp7', kind: 'calendar', style: { top: '6917.13px', left: '61.2px', width: '358.1px', height: '334.23px' }, direction: 'up', delay: 0.3 },
  { id: 'T7RuNa_wfW', kind: 'text', style: { top: '7285.38px', left: '187.7px', width: '108.4px', height: '28px', opacity: 0.69 }, cls: 't10n-tx15', lines: ["Address"], direction: 'up', delay: 0.0 },
  { id: 'OGziox80eU', kind: 'text', style: { top: '7321.97px', left: '20.5px', width: '452.8px', height: '38px', opacity: 0.69 }, cls: 't10n-tx17', lines: ["Khách sạn Hà Nội Daewoo, Phố Kim Mã, Ngọc Khánh, Ba Đình, Hanoi, Vietnam"], direction: 'up', delay: 0.0 },
  { id: 'd99KvTLfWN', kind: 'text', style: { top: '7680.89px', left: '10.5px', width: '480.0px', height: '71.81px', opacity: 0.69 }, cls: 't10n-tx18', lines: ["May mắn được yêu em, cả cuộc đời này sẽ dành trọn cho em,", "Nắm tay nhau vượt qua mọi huy hoàng, bước về phía bình yên,", "Cho đến khi thế giới này tan biến, tình yêu của chúng ta vẫn vĩnh hằng."], direction: 'up', delay: 0.0 },
  { id: 'mapNode', kind: 'map', style: { top: '7395.92px', left: '73.6px', width: '351.8px', height: '248.446px' }, direction: 'up', delay: 0.3 },
  { id: 'uwkeQCeKPy', kind: 'photo', style: { top: '7806.59px', left: '264.68px', width: '212.7px', height: '328.29px' }, src: `${R}/m07.jpeg`, direction: 'left', delay: 0.2 },
  { id: 'qWNGR6sFVz', kind: 'photo', style: { top: '7788.93px', left: '18.25px', width: '235.3px', height: '363.54px' }, src: `${R}/m18.jpeg`, direction: 'right', delay: 0.2 },
  { id: '2FGxPI2kg5', kind: 'photo', style: { top: '8171.0px', left: '20.9px', width: '456.5px', height: '149.28px' }, src: `${R}/m17.jpeg`, direction: 'up', delay: 0.2 },
  { id: 'Lv05Loeil3', kind: 'text', style: { top: '8801.86px', left: '5.5px', width: '480.0px', height: '122.38px' }, cls: 't10n-tx19', lines: ["Câu chuyện của chúng tôi chỉ mới bắt đầu,", "Cảm ơn gia đình và bạn bè đã chứng kiến sự trưởng thành của chúng tôi,", "Mong rằng tất cả những gì yêu thương đều được đón nhận,", "Và mọi ước mơ đều trở thành hiện thực."], direction: 'up', delay: 0.0 },
  { id: '5ewow06g-n', kind: 'text', style: { top: '9127.1px', left: '159.85px', width: '145.1px', height: '99.83px', opacity: 0.66 }, cls: 't10n-tx20', lines: ["-THANKS-"], direction: 'up', delay: 0.0 },
  { id: '5P4XrcgcBB', kind: 'photo', style: { top: '8976.97px', left: '184.35px', width: '103.5px', height: '114.39px' }, src: `${R}/m01.png`, direction: 'up', delay: 0.2 },
  { id: 'I_JNsV9cXc', kind: 'rsvp', style: { top: '8400.55px', left: '63.64px', width: '369.09px', height: '393.7px' }, direction: 'up', delay: 0.3 },
];

function NodeContent({ node, count }) {
  if (node.kind === 'photo') {
    return (
      <div
        className="t10n-photo"
        style={{
          backgroundImage: `url(${node.src})`,
          ...(node.mask
            ? {
                maskImage: `url(${node.mask})`,
                WebkitMaskImage: `url(${node.mask})`,
                maskSize: '100% 100%',
                WebkitMaskSize: '100% 100%',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
              }
            : {}),
        }}
      />
    );
  }
  if (node.kind === 'svg') {
    return <img className="t10n-art" src={node.src} alt="" style={{ transform: `rotate(${node.rot}deg)` }} />;
  }
  if (node.kind === 'blank') return null;
  if (node.kind === 'text') {
    return (
      <div className={`t10n-textwrap ${node.cls}`}>
        {node.lines.map((line, index) => (
          <p key={`${node.id}-${index}`}>{line}</p>
        ))}
      </div>
    );
  }
  if (node.kind === 'countdown') return <Countdown values={count} className="t10n-countdown" />;
  if (node.kind === 'calendar') {
    return (
      <div className="t10n-cal">
        <div className="t10n-cal-box">
          <div className="t10n-cal-axis"><i /><i /></div>
          <div className="t10n-cal-inner">
            <div className="t10n-cal-head">
              <div>5</div>
              <div>2025</div>
            </div>
            <div className="t10n-cal-weekrow">
              {CAL_WEEK.map((day) => <div key={day} className="t10n-cal-week">{day}</div>)}
            </div>
            <div className="t10n-cal-days">
              {CAL_EMPTY.map((key) => <div key={key} className="t10n-cal-empty"><div /></div>)}
              {CAL_DAYS.map((day) => (
                <div key={day} className="t10n-cal-cell">
                  {day === 21 && <img className="t10n-cal-heart" src={`${R}/m00.png`} alt="" />}
                  <div className={day === 21 ? 'is-wedding' : undefined}>{day}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (node.kind === 'map') {
    return (
      <div className="t10n-map">
        <iframe title="Bản đồ địa điểm cưới" width="100%" height="100%" frameBorder="0" src={MAP_SRC} allowFullScreen />
      </div>
    );
  }
  if (node.kind === 'rsvp') return <RsvpForm className="t10n-rsvp" />;
  return null;
}

export default function Template10New() {
  const count = useInvitationPage('template10new-page', '2025-05-21T13:00:00+07:00');

  return (
    <main className="new-invitation-page t10n">
      <MusicButton className="t10n-music" />

      <div className="t10n-canvas">
        {NODES.map((node) => (
          <Reveal
            key={node.id}
            direction={node.direction}
            delay={node.delay}
            duration={1.3}
            className={`t10n-node t10n-${node.kind}`}
            style={node.style}
          >
            <NodeContent node={node} count={count} />
          </Reveal>
        ))}
      </div>

      <section className="t10n-extras">
        <WishForm className="t10n-wish" accent="#b10000" />
        <GiftNote className="t10n-gift" />
      </section>
    </main>
  );
}
