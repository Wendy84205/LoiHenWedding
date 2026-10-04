import React from 'react';
import { MusicButton, Reveal, useInvitationPage } from './NewInvitationCommon.jsx';
import './template5New.css';

/* Dựng 1:1 theo https://cinelove.me/template/thiep-cuoi-5
   Canvas 500 x 7116px, 61 node đúng thứ tự DOM / toạ độ / kích thước /
   z-index / font / ảnh / transition của bản gốc. */
const REF = '/assets/template5-ref';

const MAP_SRC = 'https://maps.google.com/maps?q=52%20Mi%E1%BA%BFu%20%C4%90%E1%BA%A7m%2C%20M%E1%BB%85%20Tr%C3%AC%2C%20Nam%20T%E1%BB%AB%20Li%C3%AAm%2C%20H%C3%A0%20N%E1%BB%99i&t=&z=14&ie=UTF8&iwloc=&output=embed';

const CAL_WEEK = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
const CAL_EMPTY = ['e1', 'e2', 'e3', 'e4', 'e5'];
const CAL_DAYS = Array.from({ length: 28 }, (_, i) => i + 1);

const NODES = [
  { id: "Bgy14pParS", kind: "text", style: { top: '16.0039px', left: '170.25px', width: '175.5px', zIndex: '1' }, cls: "t5n-tBgy14pParS", lines: ["WEDDING"], direction: "up", delay: 0.0 },
  { id: "gxCZXMNlsq", kind: "text", style: { top: '81px', left: '150.5px', width: '200px', zIndex: '1' }, cls: "t5n-tgxCZXMNlsq", lines: ["YOU ARE MY TODAY", "AND ALL OF MY TOMOROW"], direction: "up", delay: 0.0 },
  { id: "iPrsY-C-LB", kind: "text", style: { top: '453.813px', left: '188px', width: '134px', zIndex: '1' }, cls: "t5n-tiPrsY_C_LB", lines: ["14.2.2025"], direction: "up", delay: 0.0 },
  { id: "BDwlSOt2JR", kind: "text", style: { top: '541.615px', left: '72px', width: '354px', zIndex: '1' }, cls: "t5n-tBDwlSOt2JR", lines: ["WELCOME TO OUR WEDDING"], direction: "up", delay: 0.0 },
  { id: "SitPNP-OeK", kind: "text", style: { top: '714.677px', left: '149.25px', width: '202.5px' }, cls: "t5n-tSitPNP_OeK", lines: ["WEDDING INVITATION"], direction: "up", delay: 0.0 },
  { id: "TZGPVBI1Ev", kind: "text", style: { top: '938.19px', left: '96.5px', width: '307px' }, cls: "t5n-tTZGPVBI1Ev", lines: ["Hôm nay anh học toán hình,", "Tròn vuông chẳng có, toàn hình bóng em"], direction: "up", delay: 0.0 },
  { id: "4WTIvTs5Ea", kind: "text", style: { top: '1034.16px', left: '228px', width: '44px' }, cls: "t5n-t4WTIvTs5Ea", lines: [". . ."], direction: "up", delay: 0.0 },
  { id: "t8LdIx3R2l", kind: "text", style: { top: '1281.41px', left: '238.2px', width: '122px' }, cls: "t5n-tt8LdIx3R2l", lines: ["2025.2"], direction: "up", delay: 0.0 },
  { id: "qkpdc2XBmZ", kind: "text", style: { top: '1283px', left: '374px', width: '92px' }, cls: "t5n-tqkpdc2XBmZ", lines: ["14"], direction: "left", delay: 0.0 },
  { id: "KaTfNTY66u", kind: "text", style: { top: '1322px', left: '258px', width: '93px' }, cls: "t5n-tKaTfNTY66u", lines: ["Friday"], direction: "up", delay: 0.0 },
  { id: "Ok3IlinN9M", kind: "text", style: { top: '1450px', left: '65.8px', width: '80px', zIndex: '1' }, cls: "t5n-tOk3IlinN9M", lines: ["YÊU"], direction: "right", delay: 0.0 },
  { id: "-eoq08AXG9", kind: "text", style: { top: '1656.4px', left: '318px', width: '165px', zIndex: '1' }, cls: "t5n-t_eoq08AXG9", lines: ["THƯƠNG"], direction: "left", delay: 0.0 },
  { id: "wlK1xFFvo4", kind: "text", style: { top: '1790.87px', left: '36px', width: '194px' }, cls: "t5n-twlK1xFFvo4", lines: ["Fall in", "love", "with", "you"], direction: "right", delay: 0.0 },
  { id: "jM3N3XAfju", kind: "text", style: { top: '1933.02px', left: '83.5px', width: '335px' }, cls: "t5n-tjM3N3XAfju", lines: ["Thương anh mấy núi cũng trèo,", "Mấy sông cũng lội, mấy đèo cũng qua.", "Thương anh không quản chi xa,", "Đá vàng cũng quyết, phong ba cũng liều."], direction: "up", delay: 0.0 },
  { id: "h_Gd9YuoJd", kind: "text", style: { top: '2212px', left: '338px', width: '106px', zIndex: '1' }, cls: "t5n-th_Gd9YuoJd", lines: ["LOVE"], direction: "left", delay: 0.0 },
  { id: "npOIy2AsN8", kind: "text", style: { top: '2945px', left: '36px', width: '200px' }, cls: "t5n-tnpOIy2AsN8", lines: ["FALL IN                           LOVE                   WITH YOU"], direction: "right", delay: 0.0 },
  { id: "iCB_OkhAks", kind: "text", style: { top: '3040.75px', left: '37px', width: '200px' }, cls: "t5n-tiCB_OkhAks", lines: ["WEDDING", "&", "LOVE"], direction: "right", delay: 0.0 },
  { id: "GHNlrT9Sn8", kind: "photo", style: { top: '3045px', left: '272px', width: '195px', height: '195px' }, src: "/assets/template5-ref/9723b4ba0216410a8d80bd207490ba7c.gif", direction: "left", delay: 0.2 },
  { id: "yfuSKPBmKn", kind: "photo", style: { top: '3161px', left: '37px', width: '201px', height: '201px' }, src: "/assets/template5-ref/2f232ba500524ccf8dacdcbf14ea0a18.gif", direction: "right", delay: 0.2 },
  { id: "KGFr0Z3TYb", kind: "text", style: { top: '3397.89px', left: '104px', width: '283px' }, cls: "t5n-tKGFr0Z3TYb", lines: ["\"Môi hôn ngọt ngào, như hoa nở,", "Trái tim rộn ràng, nhịp yêu vương.\""], direction: "up", delay: 0.0 },
  { id: "PZXehNDnTB", kind: "photo", style: { top: '3362px', left: '358px', width: '99px', height: '69px' }, src: "/assets/template5-ref/58abbe9f3ea045b1803e15ce41258f83.png", direction: "left", delay: 0.2 },
  { id: "bITmedQsYe", kind: "text", style: { top: '4097.02px', left: '54px', width: '201px', zIndex: '1' }, cls: "t5n-tbITmedQsYe", lines: ["FOREVER LOVE"], direction: "up", delay: 0.0 },
  { id: "kCTq_HIb2w", kind: "text", style: { top: '4195.39px', left: '54px', width: '200px', zIndex: '1' }, cls: "t5n-tkCTq_HIb2w", lines: ["You're the missing piece", "I've been looking for"], direction: "up", delay: 0.0 },
  { id: "Rekt5kD0gk", kind: "text", style: { top: '4746.54px', left: '369px', width: '49px', zIndex: '1' }, cls: "t5n-tRekt5kD0gk", lines: ["30", "/", "11"], direction: "left", delay: 0.0 },
  { id: "lmzvg3HXim", kind: "text", style: { top: '4575px', left: '387px', width: '22px', zIndex: '1' }, cls: "t5n-tlmzvg3HXim", lines: ["L", "o", "v", "e"], direction: "left", delay: 0.0 },
  { id: "2xikVEefdE", kind: "text", style: { top: '4678.12px', left: '366px', width: '117px', zIndex: '1' }, cls: "t5n-t2xikVEefdE", lines: ["b  gan"], direction: "left", delay: 0.0 },
  { id: "5f7cLGohKa", kind: "text", style: { top: '5731.5px', left: '100px', width: '300px' }, cls: "t5n-t5f7cLGohKa", lines: ["WEDDING INVITATION"], direction: "up", delay: 0.0 },
  { id: "NNzc25blWZ", kind: "text", style: { top: '5799px', left: '46.4px', width: '409.3px' }, cls: "t5n-tNNzc25blWZ", lines: ["Thời gian: 09 giờ 00", "Thứ 6, ngày 14 tháng 2 năm 2025", "Tại trung tâm tiệc cưới Cinelove"], direction: "up", delay: 0.0 },
  { id: "t6UV_tKBQX", kind: "blank", style: { top: '5876px', left: '138px', width: '200px' }, direction: "up", delay: 0.0 },
  { id: "CUa3u8tTQd", kind: "text", style: { top: '6257px', left: '162px', width: '174px' }, cls: "t5n-tCUa3u8tTQd", lines: ["WEDDING TIME"], direction: "up", delay: 0.0 },
  { id: "ZIS42RQzMO", kind: "calendar", style: { top: '6318px', left: '94px', width: '328px', height: '306px' }, direction: "up", delay: 0.3 },
  { id: "fYsxgIig6e", kind: "photo", style: { top: '6685px', left: '160px', width: '203px', height: '127px' }, src: "/assets/template5-ref/9c392fb8755f4d0c8b3a51c8ec3d83c0.png", direction: "up", delay: 0.2 },
  { id: "J62ZcIclO6", kind: "photo", style: { top: '7020px', left: '215.5px', width: '60px', height: '52px' }, src: "/assets/template5-ref/7bb34aeccf8744ca8b886050ee5d9172.png", direction: "up", delay: 0.2 },
  { id: "scO2EBKEFE", kind: "photo", style: { top: '6957px', left: '192.5px', width: '111px', height: '43px' }, src: "/assets/template5-ref/9bf504decd5a4d2b98aacd6fd9fcad2b.png", direction: "up", delay: 0.2 },
  { id: "01Hmyqi9m9", kind: "text", style: { top: '6842.75px', left: '137px', width: '226px' }, cls: "t5n-t01Hmyqi9m9", lines: ["Rất hi vọng cậu sẽ có mặt", "trong ngày trọng đại này của tớ nha"], direction: "up", delay: 0.0 },
  { id: "Tw8uJYs43V", kind: "photo", style: { top: '6916px', left: '115px', width: '268px', height: '21px' }, src: "/assets/template5-ref/d40125b6604243c59965d302ba5a01fa.png", direction: "up", delay: 0.2 },
  { id: "hLpuBs6Wuv", kind: "photo", style: { top: '4322.99px', left: '311.5px', width: '151px', height: '168px' }, src: "/assets/template5-ref/l2jo7lxookcsnvrts7ap9.png", direction: "left", delay: 0.2 },
  { id: "_40QAABuzU", kind: "photo", style: { top: '4376.96px', left: '132px', width: '167.2px', height: '167.2px' }, src: "/assets/template5-ref/q7j7fdbewu8o975g6btq9g.png", direction: "up", delay: 0.2 },
  { id: "Or2O4KdMwt", kind: "photo", style: { top: '4422.82px', left: '31.5208px', width: '68.5px', height: '58.3066px' }, src: "/assets/template5-ref/arar3caywelbj2jble8i3n.png", direction: "right", delay: 0.2 },
  { id: "tmSTTzid78", kind: "photo", style: { top: '165.445px', left: '70.1495px', width: '361.701px', height: '240.531px', zIndex: '1' }, src: "/assets/template5-ref/a13e90b7-89b9-465e-9c76-d95665bc26cd.jpg", direction: "up", delay: 0.2 },
  { id: "chUMQnpe27", kind: "photo", style: { top: '756.805px', left: '123px', width: '255px', height: '169.575px' }, src: "/assets/template5-ref/b14df7e5-bf8c-49ef-bffa-63496a486d51.jpg", direction: "up", delay: 0.2 },
  { id: "_qAVbvg6Qr", kind: "photo", style: { top: '1078px', left: '17.5px', width: '195px', height: '293.476px' }, src: "/assets/template5-ref/3707925b-cd45-4cb9-b67b-aa2ee1274417.jpg", direction: "right", delay: 0.2 },
  { id: "8pe8bZ7eul", kind: "photo", style: { top: '1078.02px', left: '234px', width: '249px', height: '168.075px' }, src: "/assets/template5-ref/25e418c5-b25c-4e77-8e37-c49c4e3cc71a.jpg", direction: "left", delay: 0.2 },
  { id: "cSrjTpuCZt", kind: "photo", style: { top: '1389.71px', left: '196.6px', width: '304.6px', height: '170.621px' }, src: "/assets/template5-ref/b4171b50-bea9-4032-803d-e8b97c7fbbd6.jpg", direction: "up", delay: 0.2 },
  { id: "KVIF9N-IRQ", kind: "photo", style: { top: '1593.65px', left: '1px', width: '299.2px', height: '175.596px' }, src: "/assets/template5-ref/4b70d8be-063d-4014-b52d-9cd8832f8618.jpg", direction: "up", delay: 0.2 },
  { id: "vs0sqJYJUT", kind: "photo", style: { top: '2106.11px', left: '21px', width: '249px', height: '397.155px', zIndex: '1' }, src: "/assets/template5-ref/5e24d70b-aa38-47c6-a6f8-cd7b89c897ef.jpg", direction: "right", delay: 0.2 },
  { id: "QogpavGL_I", kind: "photo", style: { top: '2278.92px', left: '315.433px', width: '151.6px', height: '224.368px', zIndex: '1' }, src: "/assets/template5-ref/8f1b6318-28e7-4b9e-b4d8-60162fbc838a.jpg", direction: "left", delay: 0.2 },
  { id: "JkZ4KnoqlF", kind: "photo", style: { top: '2564.25px', left: '0px', width: '500px', height: '340px' }, src: "/assets/template5-ref/12fe5bfe-b4bb-480a-9c46-46916ad33575.jpg", direction: "up", delay: 0.2 },
  { id: "siW6b9koP7", kind: "photo", style: { top: '3487.68px', left: '54px', width: '416px', height: '584.479px', zIndex: '1' }, src: "/assets/template5-ref/06d0f309-bed0-4780-97e4-284f9514c54a.jpg", direction: "up", delay: 0.2 },
  { id: "s97GLrNHXS", kind: "photo", style: { top: '4558.41px', left: '0.25px', width: '275.5px', height: '380.189px' }, src: "/assets/template5-ref/1a8cb247-6ef5-40b6-aed4-04a0e18a0ac0.jpg", direction: "right", delay: 0.2 },
  { id: "_nIAUTkmdN", kind: "photo", style: { top: '4963.32px', left: '0.3px', width: '500px', height: '292.501px' }, src: "/assets/template5-ref/74b6ece7-2c65-491a-8a7e-098432b32ff6.jpg", direction: "up", delay: 0.2 },
  { id: "b8rA3y1s77", kind: "photo", style: { top: '5286.09px', left: '0.2715px', width: '238.2px', height: '346.581px' }, src: "/assets/template5-ref/1ba63425-d25d-4550-86ff-306fe1925c1d.jpg", direction: "right", delay: 0.2 },
  { id: "mDLDHiBG0g", kind: "photo", style: { top: '5285.69px', left: '262px', width: '238px', height: '346.29px' }, src: "/assets/template5-ref/c0fa773f-85c8-40a0-b88c-3090f8e8d1bf.jpg", direction: "left", delay: 0.2 },
  { id: "BEnqclflTA", kind: "svg", style: { top: '-0.454983px', left: '0.3px', width: '499.9px', height: '639.923px' }, src: "/assets/template5-ref/svg/BEnqclflTA.svg", direction: "up", delay: 0.2 },
  { id: "JVywaf_IkF", kind: "svg", style: { top: '1390.12px', left: '2.26975px', width: '194.358px', height: '170.155px' }, src: "/assets/template5-ref/svg/JVywaf_IkF.svg", direction: "right", delay: 0.2 },
  { id: "Gs3K592idb", kind: "svg", style: { top: '1593.62px', left: '294.226px', width: '204.7px', height: '175.895px' }, src: "/assets/template5-ref/svg/Gs3K592idb.svg", direction: "left", delay: 0.2 },
  { id: "vF60pYJsl8", kind: "svg", style: { top: '2186.08px', left: '0.442959px', width: '498.7px', height: '339.641px' }, src: "/assets/template5-ref/svg/vF60pYJsl8.svg", direction: "up", delay: 0.2 },
  { id: "Elcwi4gslV", kind: "svg", style: { top: '3695.69px', left: '0.243px', width: '392.8px', height: '564.851px' }, src: "/assets/template5-ref/svg/Elcwi4gslV.svg", direction: "up", delay: 0.2 },
  { id: "OdFJMOO9OC", kind: "svg", style: { top: '4558.44px', left: '304.472px', width: '195.8px', height: '380.133px' }, src: "/assets/template5-ref/svg/OdFJMOO9OC.svg", direction: "left", delay: 0.2 },
  { id: "wpLNJFs4ZG", kind: "svg", style: { top: '5661px', left: '222.8px', width: '53px', height: '53px', zIndex: '2' }, src: "/assets/template5-ref/svg/wpLNJFs4ZG.svg", direction: "up", delay: 0.2 },
  { id: "71cdymtG-Y", kind: "svg", style: { top: '649.1px', left: '225.4px', width: '51.3px', height: '51.3px', zIndex: '3' }, src: "/assets/template5-ref/svg/71cdymtG-Y.svg", direction: "up", delay: 0.2 },];

function NodeContent({ node }) {
  if (node.kind === 'photo') {
    return (
      <div
        className="t5n-photo"
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
  if (node.kind === 'svg') return <img className="t5n-art" src={node.src} alt="" />;
  if (node.kind === 'shape') return <div className="t5n-shape" style={{ background: node.fill }} />;
  if (node.kind === 'text') {
    return (
      <div className={`t5n-textwrap ${node.cls}`}>
        {node.lines.map((line, index) => (
          <p key={`${node.id}-${index}`}>{line}</p>
        ))}
      </div>
    );
  }
  // node chữ rỗng ở bản gốc chỉ chứa <br>, vẫn giữ một dòng trống có chiều cao
  if (node.kind === 'blank') {
    return <div className="t5n-blank"><br /></div>;
  }
  if (node.kind === 'calendar') {
    return (
      <div className="t5n-cal">
        <div className="t5n-cal-back" />
        <div className="t5n-cal-head">2.2025</div>
        <div className="t5n-cal-body">
          {CAL_WEEK.map((day) => <div key={day} className="t5n-cal-week">{day}</div>)}
          {CAL_EMPTY.map((key) => <div key={key} className="t5n-cal-empty"><div /></div>)}
          {CAL_DAYS.map((day) => (
            <div key={day}>
              {day === 14 && <img className="t5n-cal-heart" src={`${REF}/calen_heart_1.png`} alt="" />}
              <div className={day === 14 ? 't5n-cal-wedding' : undefined}>{day}</div>
            </div>
          ))}
          <div className="t5n-cal-year">2025</div>
        </div>
      </div>
    );
  }
  return null;
}

export default function Template5New() {
  useInvitationPage('template5new-page', '2025-02-14T09:00:00+07:00');

  return (
    <main className="new-invitation-page t5n">
      <MusicButton className="t5n-music" />

      <div className="t5n-canvas">
        <Reveal
          direction="up"
          delay={0.3}
          duration={1.3}
          className="t5n-node t5n-map"
          style={{ top: '5967.09px', left: '51.5px', width: '393px', height: '289.72px' }}
        >
          <div className="t5n-map-frame">
            <iframe title="Bản đồ địa điểm cưới" src={MAP_SRC} frameBorder="0" allowFullScreen="" />
          </div>
        </Reveal>

        {NODES.map((node) => (
          <Reveal
            key={node.id}
            direction={node.direction}
            delay={node.delay}
            duration={1.3}
            className={`t5n-node t5n-${node.kind}`}
            style={node.style}
          >
            <NodeContent node={node} />
          </Reveal>
        ))}
      </div>
    </main>
  );
}

