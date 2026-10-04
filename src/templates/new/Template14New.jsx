import React from "react";
import {
  Countdown,
  MusicButton,
  Reveal,
  RsvpForm,
  useInvitationPage,
} from "./NewInvitationCommon.jsx";
import "./template14New.css";

const R = "/assets/template14-ref";

const NODES = [
  { id: "HXC931LFR-", kind: "photo", style: { top: "10.99886px", left: "98px", width: "322.742px", height: "177.679px", zIndex: "1" }, direction: "up", delay: 0.2, src: `${R}/t14-00-HXC931LFR-.png` },
  { id: "8fBVYP9E-F", kind: "photo", style: { top: "215.192px", left: "86.633px", width: "326.9px", height: "430.036px", zIndex: "83" }, direction: "up", delay: 0.2, src: `${R}/t14-01-8fBVYP9E-F.jpg`, mask: `${R}/mask-029.png` },
  { id: "i_e1CRXed6", kind: "blank", style: { top: "0px", left: "0px", width: "500px", height: "500px" }, direction: "up", delay: 0.2 },
  { id: "kFLdq9Geby", kind: "text", style: { top: "586px", left: "166px", width: "168px", zIndex: "5" }, direction: "up", delay: 0, cls: "t14n-tx0", lines: ["INVITATION"] },
  { id: "ndad6TOfVF", kind: "text", style: { top: "178.2px", left: "43px", width: "158px", zIndex: "6" }, direction: "right", delay: 0, cls: "t14n-tx1", lines: ["28/05 âm lịch"] },
  { id: "xoHWUokcBo", kind: "text", style: { top: "178.2px", left: "309px", width: "158px", zIndex: "7" }, direction: "left", delay: 0, cls: "t14n-tx1", lines: ["24/06/2025"] },
  { id: "xRFwc8uQgd", kind: "text", style: { top: "757px", left: "19px", width: "480px", zIndex: "8" }, direction: "up", delay: 0, cls: "t14n-tx2", lines: ["- Happy every day, four seasons with you -"] },
  { id: "5K_xlHvrdi", kind: "photo", style: { top: "830px", left: "122px", width: "356px", height: "237.333px", zIndex: "9" }, direction: "up", delay: 0.2, src: `${R}/t14-07-5K_xlHvrdi.jpg` },
  { id: "fIuE9nNQl0", kind: "photo", style: { top: "982.81px", left: "25.337px", width: "168.788px", height: "253.315px", zIndex: "22" }, direction: "right", delay: 0.2, src: `${R}/t14-08-fIuE9nNQl0.jpg` },
  { id: "0SMMwCmmJ8", kind: "blank", style: { top: "1159.53px", left: "166.331px", width: "311.7px", height: "113.249px", zIndex: "23" }, direction: "up", delay: 0.2 },
  { id: "4ZffkAWwjM", kind: "text", style: { top: "1178.19px", left: "173.9px", width: "295.1px", zIndex: "24" }, direction: "up", delay: 0, cls: "t14n-tx3", lines: ["Even if the lover is across the mountain and the sea,", "The mountain and the sea can be leavelled."] },
  { id: "hCDR6QUcSR", kind: "text", style: { top: "1322.5px", left: "19px", width: "450px", zIndex: "13" }, direction: "up", delay: 0, cls: "t14n-tx4", lines: ["\"HELLO", "Đây là một thiệp mời cưới đầy ắp tình cảm.", "Những người nhận được thiệp mời này,", "đều là phần quan trọng nhất trong cuộc đời chúng tôi.", "Vào ngày đặc biệt này,", "chúng tôi mong được có bạn bên cạnh, chứng kiến khoảnh khắc ý nghĩa.\""] },
  { id: "Ds6dfsbYl-", kind: "photo", style: { top: "1624px", left: "143.785px", width: "231.131px", height: "161.024px", zIndex: "14" }, direction: "up", delay: 0.2, src: `${R}/t14-12-Ds6dfsbYl-.png` },
  { id: "6-O_IimoLE", kind: "photo", style: { top: "1829.69px", left: "25.3685px", width: "218.6px", height: "328.073px", zIndex: "15" }, direction: "right", delay: 0.2, src: `${R}/t14-13-6-O_IimoLE.jpg` },
  { id: "V8ldHa3FBJ", kind: "photo", style: { top: "1925px", left: "259.337px", width: "218.7px", height: "328.223px", zIndex: "20" }, direction: "left", delay: 0.2, src: `${R}/t14-14-V8ldHa3FBJ.jpg` },
  { id: "Om9lYtJa5r", kind: "text", style: { top: "1841.01px", left: "259.4px", width: "201.1px", zIndex: "17" }, direction: "left", delay: 0, cls: "t14n-tx5", lines: [">>> Nếu trời có ý định"] },
  { id: "uz_5dnUkHI", kind: "text", style: { top: "1875.01px", left: "244.2px", width: "254px", zIndex: "18" }, direction: "left", delay: 0, cls: "t14n-tx6", lines: ["Trái tim yêu thương luôn hòa quyện"] },
  { id: "6qB5m8heGG", kind: "text", style: { top: "2174.38875px", left: "10px", width: "234px", zIndex: "18" }, direction: "right", delay: 0, cls: "t14n-tx5", lines: [">>>Tôi nghĩ đó chắc chắn là em"] },
  { id: "avVBTKEKPm", kind: "text", style: { top: "2205.23px", left: "42.95px", width: "193.1px", zIndex: "19" }, direction: "right", delay: 0, cls: "t14n-tx6", lines: ["Chúng ta không cần lời nói, trái tim đã đủ hiểu nhau"] },
  { id: "uwcnj2UkJZ", kind: "blank", style: { top: "1939.07px", left: "250px", width: "217px", height: "324px", zIndex: "19" }, direction: "left", delay: 0.2 },
  { id: "vP9bedBU01", kind: "blank", style: { top: "1068.02px", left: "65.4962px", width: "135.5px", height: "174.073px", zIndex: "21" }, direction: "right", delay: 0.2 },
  { id: "KClk8LQjB7", kind: "text", style: { top: "2315.48px", left: "11.8px", width: "480px", zIndex: "25" }, direction: "up", delay: 0, cls: "t14n-tx5", lines: ["Lần đầu gặp gỡ, trái tim đã rung động;", "Dù bên nhau lâu dài, cảm xúc vẫn không thay đổi."] },
  { id: "cUGSsf7zud", kind: "text", style: { top: "2382px", left: "25.4px", width: "461px", zIndex: "26" }, direction: "up", delay: 0, cls: "t14n-tx7", lines: ["- A long time ago, I was still pounding -"] },
  { id: "_fA2xYJFs9", kind: "photo", style: { top: "2461px", left: "42.995px", width: "191.3px", height: "287.1px", zIndex: "30" }, direction: "right", delay: 0.2, src: `${R}/t14-23-_fA2xYJFs9.jpg` },
  { id: "iCAOo33BCL", kind: "photo", style: { top: "2526.94px", left: "263.906px", width: "203.1px", height: "304.811px", zIndex: "28" }, direction: "left", delay: 0.2, src: `${R}/t14-24-iCAOo33BCL.jpg` },
  { id: "aBLgA0x0hX", kind: "blank", style: { top: "2560.87px", left: "26px", width: "144px", height: "202.188px", zIndex: "29" }, direction: "right", delay: 0.2 },
  { id: "rKM67IgF98", kind: "text", style: { top: "2777.13px", left: "38.6px", width: "187px", zIndex: "31" }, direction: "right", delay: 0, cls: "t14n-tx8", lines: ["BEAUTIFUL BRIDE"] },
  { id: "wr3_gb24Zf", kind: "text", style: { top: "2845.13px", left: "263.9px", width: "200.5px", zIndex: "32" }, direction: "left", delay: 0, cls: "t14n-tx8", lines: ["HANDSOME GROOM"] },
  { id: "YAIK55ziSw", kind: "text", style: { top: "2809.79px", left: "45.1px", width: "163.8px", zIndex: "33" }, direction: "right", delay: 0, cls: "t14n-tx9", lines: ["Cô dâu : Mai Anh"] },
  { id: "n7GdggpyTf", kind: "text", style: { top: "2875.79px", left: "278px", width: "163.8px", zIndex: "34" }, direction: "left", delay: 0, cls: "t14n-tx9", lines: ["Chú rể : Tuấn Anh"] },
  { id: "WqgvG2JS7d", kind: "blank", style: { top: "2852.55px", left: "63.2px", width: "130.9px", height: "37.3668px", zIndex: "35" }, direction: "right", delay: 0.2 },
  { id: "5YDvF2fBN1", kind: "text", style: { top: "2859.2px", left: "74.5px", width: "108.4px", zIndex: "37" }, direction: "right", delay: 0, cls: "t14n-tx10", lines: ["Gọi cho cô dâu"] },
  { id: "GDLd8ZuSys", kind: "text", style: { top: "2925px", left: "309.9px", width: "108.4px", zIndex: "38" }, direction: "left", delay: 0, cls: "t14n-tx10", lines: ["Gọi cho chú rể"] },
  { id: "PnKeYYGnaE", kind: "photo", style: { top: "3112.56px", left: "155.106px", width: "345.541px", height: "406.486px", zIndex: "42" }, direction: "up", delay: 0.2, src: `${R}/t14-33-PnKeYYGnaE.jpg` },
  { id: "lsr-QUEDSi", kind: "text", style: { top: "3019.47px", left: "26px", width: "372.9px", zIndex: "41" }, direction: "up", delay: 0, cls: "t14n-tx11", lines: ["You are my favorite person in my life", "Em là người tôi yêu nhất trong cuộc đời này"] },
  { id: "QCdAlo5htF", kind: "photo", style: { top: "3533px", left: "1px", width: "308px", height: "205.333px", zIndex: "45" }, direction: "up", delay: 0.2, src: `${R}/t14-35-QCdAlo5htF.jpg` },
  { id: "tRucp91GNA", kind: "blank", style: { top: "3691.74px", left: "72.4px", width: "255.5px", height: "65.4476px", zIndex: "44" }, direction: "up", delay: 0.2 },
  { id: "rK9Ept2lLt", kind: "photo", style: { top: "3795.14px", left: "98px", width: "272.723px", height: "338.426px", zIndex: "46" }, direction: "up", delay: 0.2, src: `${R}/t14-37-rK9Ept2lLt.jpg` },
  { id: "-VGV9Wd8NY", kind: "text", style: { top: "4160.12px", left: "10px", width: "480px", zIndex: "51" }, direction: "up", delay: 0, cls: "t14n-tx5", lines: ["Em là chỗ dựa vững chắc của anh, dù có ở đâu, anh cũng luôn bên em"] },
  { id: "D_pLB0RF-u", kind: "text", style: { top: "4195.54px", left: "52.3px", width: "402.4px", zIndex: "49" }, direction: "up", delay: 0, cls: "t14n-tx12", lines: ["-You are my reliance, no matter the ends of the earth-"] },
  { id: "AFsTdhWhn5", kind: "blank", style: { top: "4151.02px", left: "16.45px", width: "44.3px", height: "44.3px", zIndex: "50" }, direction: "right", delay: 0.2 },
  { id: "fewBTsQLVx", kind: "text", style: { top: "4312.95px", left: "64px", width: "367.4px", zIndex: "50" }, direction: "up", delay: 0, cls: "t14n-tx2", lines: ["Ngay từ khoảnh khắc gặp em, anh đã quyết định sẽ cùng em đi suốt cuộc đời này"] },
  { id: "Fe2Ue4RFec", kind: "photo", style: { top: "4393px", left: "23.7px", width: "222px", height: "333.176px", zIndex: "52" }, direction: "right", delay: 0.2, src: `${R}/t14-43-Fe2Ue4RFec.jpg` },
  { id: "QTo3AMcMb_", kind: "photo", style: { top: "4393px", left: "254.969px", width: "223px", height: "334.676px", zIndex: "53" }, direction: "left", delay: 0.2, src: `${R}/t14-44-QTo3AMcMb_.jpg` },
  { id: "SGrhJTolzD", kind: "text", style: { top: "4794.25px", left: "62px", width: "367.4px", zIndex: "51" }, direction: "up", delay: 0, cls: "t14n-tx13", lines: ["The moment I met you,", "I decided to grow old together with you.y"] },
  { id: "t2RvsxEB6l", kind: "text", style: { top: "4895.85px", left: "231.3px", width: "246.7px", zIndex: "54" }, direction: "left", delay: 0, cls: "t14n-tx14", lines: ["Anh yêu em Anh biết mà"] },
  { id: "oMnqoob6U2", kind: "text", style: { top: "4928.22px", left: "143.8px", width: "318px", zIndex: "55" }, direction: "up", delay: 0, cls: "t14n-tx15", lines: ["/", "Cùng nhau nương tựa, cùng nhau gìn giữ tình yêu qua năm tháng,", "Bên nhau trọn đời trọn kiếp,", "Em là câu chuyện cổ tích đẹp nhất trong cuộc đời anh"] },
  { id: "T5FsV-SyJ8", kind: "photo", style: { top: "5196.18px", left: "10.019px", width: "266.5px", height: "366.745px", zIndex: "56" }, direction: "right", delay: 0.2, src: `${R}/t14-48-T5FsV-SyJ8.jpeg` },
  { id: "a-aSppPvUs", kind: "photo", style: { top: "5195.7px", left: "286.7px", width: "196.2px", height: "294.456px", zIndex: "57" }, direction: "left", delay: 0.2, src: `${R}/t14-49-a-aSppPvUs.jpg` },
  { id: "_q-tp6gcks", kind: "text", style: { top: "5273.76px", left: "139.5px", width: "246.7px", zIndex: "85" }, direction: "up", delay: 0, cls: "t14n-tx14", lines: ["Anh yêu em Anh biết mà"] },
  { id: "4IaiNBtRq7", kind: "text", style: { top: "5596.17px", left: "84.6px", width: "395.4px", zIndex: "86" }, direction: "up", delay: 0, cls: "t14n-tx13", lines: ["Đi qua muôn ngàn sông núi, thế gian này vẫn xứng đáng"] },
  { id: "3-Tv4Ki5og", kind: "text", style: { top: "5623.02px", left: "12.5px", width: "395.4px", zIndex: "56" }, direction: "up", delay: 0, cls: "t14n-tx13", lines: ["“Traversing mountains and rivers is worth the world”"] },
  { id: "O50MYc86r8", kind: "photo", style: { top: "5937.22px", left: "109.777px", width: "389px", height: "266.879px", zIndex: "59" }, direction: "up", delay: 0.2, src: `${R}/t14-53-O50MYc86r8.jpg`, mask: `${R}/mask-015_uvy8ypx9frp.png` },
  { id: "fZRdDMYM2S", kind: "photo", style: { top: "5663.89px", left: "1px", width: "385.2px", height: "218.667px", zIndex: "60" }, direction: "up", delay: 0.2, src: `${R}/t14-54-fZRdDMYM2S.jpg`, mask: `${R}/mask-016_zd65kck1cjb.png` },
  { id: "LUHsx5ONpo", kind: "countdown", style: { top: "5654.79px", left: "418.003px", width: "62px", height: "236.904px", zIndex: "61" }, direction: "left", delay: 0.3 },
  { id: "B6XpO9ppeK", kind: "text", style: { top: "6246.66px", left: "165.14999999999998px", width: "197.7px", zIndex: "62" }, direction: "up", delay: 0, cls: "t14n-tx16", lines: ["Thiệp Mời Cưới"] },
  { id: "Su6tYxe3DL", kind: "text", style: { top: "6288.94px", left: "132.1px", width: "275.5px", zIndex: "63" }, direction: "up", delay: 0, cls: "t14n-tx17", lines: ["Wedding invitation"] },
  { id: "w8Em743LHb", kind: "text", style: { top: "6338.41px", left: "126.2px", width: "275.5px", zIndex: "64" }, direction: "up", delay: 0, cls: "t14n-tx13", lines: ["Thời gian / Time"] },
  { id: "dzDrHL_kNJ", kind: "calendar", style: { top: "6389.42px", left: "94.25px", width: "324.8px", height: "303.147px", zIndex: "65" }, direction: "up", delay: 0.3 },
  { id: "YlTNicCz_r", kind: "text", style: { top: "6716.55px", left: "75.6px", width: "362.1px", zIndex: "64" }, direction: "up", delay: 0, cls: "t14n-tx13", lines: ["Thứ 3 ngày 24 tháng 06 năm 2025"] },
  { id: "XpV-D9dUW6", kind: "text", style: { top: "6749.71px", left: "75.6px", width: "362.1px", zIndex: "65" }, direction: "up", delay: 0, cls: "t14n-tx2", lines: ["Ngày 28 tháng 05 âm lịch 12:00 PM"] },
  { id: "-BxCpa50PL", kind: "text", style: { top: "6802.3px", left: "126.2px", width: "275.5px", zIndex: "65" }, direction: "up", delay: 0, cls: "t14n-tx18", lines: ["Địa chỉ / Address"] },
  { id: "9nFGkr0OL6", kind: "photo", style: { top: "6869.44px", left: "52.294px", width: "405.4px", height: "494.179px", zIndex: "66" }, direction: "up", delay: 0.2, src: `${R}/t14-63-9nFGkr0OL6.jpg`, mask: `${R}/mask-032_kjsem5y9r4q.png` },
  { id: "txvUw8cSXL", kind: "text", style: { top: "7435.81px", left: "70.75px", width: "362.1px", zIndex: "66" }, direction: "up", delay: 0, cls: "t14n-tx2", lines: ["Khách Sạn Kim Liên, Phố Đào Duy Anh, Phuong Mai, Đống Đa, Hanoi, Vietnam"] },
  { id: "CLaYPLzfzu", kind: "photo", style: { top: "7512.1px", left: "245.668px", width: "218.7px", height: "277.286px", zIndex: "71" }, direction: "left", delay: 0.2, src: `${R}/t14-65-CLaYPLzfzu.jpg` },
  { id: "s6QmEHhr5a", kind: "photo", style: { top: "7512.25px", left: "21.706px", width: "192.5px", height: "351.671px", zIndex: "69" }, direction: "right", delay: 0.2, src: `${R}/t14-66-s6QmEHhr5a.jpg` },
  { id: "jH3jVIG5o4", kind: "blank", style: { top: "7663.59px", left: "229.8px", width: "250.2px", height: "203.012px", zIndex: "70" }, direction: "left", delay: 0.2 },
  { id: "bnFQPehHp-", kind: "text", style: { top: "7795.88px", left: "229.35px", width: "248.7px", zIndex: "72" }, direction: "left", delay: 0, cls: "t14n-tx19", lines: ["Here on earth, joy is yours."] },
  { id: "jtBnag9cMi", kind: "text", style: { top: "7896.31px", left: "67.3px", width: "362.1px", zIndex: "67" }, direction: "up", delay: 0, cls: "t14n-tx20", lines: ["Ban đầu, chúng ta là những người bạn đồng hành cùng nhau, là những đối tác sát cánh bên nhau, và cuối cùng, chúng ta là những người yêu sẽ cùng nhau chia sẻ quãng đời còn lại"] },
  { id: "EgYPeysvFD", kind: "text", style: { top: "8496.38px", left: "26px", width: "426.4px", zIndex: "68" }, direction: "up", delay: 0, cls: "t14n-tx21", lines: ["Gửi đến những người thân yêu nhất trong cuộc đời,", "Chúng mình vô cùng biết ơn vì bạn đã dành thời gian quý báu để đến chung vui trong ngày trọng đại của chúng mình.", "Với sự chứng kiến và những lời chúc phúc của bạn, khoảnh khắc này trở nên vô cùng ấm áp và trọn vẹn.", "Dù lễ cưới chỉ là một khoảnh khắc ngắn ngủi, nhưng tình nghĩa và những kỷ niệm sẽ mãi theo chúng mình suốt cuộc đời"] },
  { id: "szb24hjGjh", kind: "text", style: { top: "8859.06px", left: "153.4px", width: "193.1px", zIndex: "79" }, direction: "up", delay: 0, cls: "t14n-tx22", lines: ["THANK YOU"] },
  { id: "-tO403yixv", kind: "photo", style: { top: "8748.28px", left: "2.3px", width: "100px", height: "100px", zIndex: "80" }, direction: "right", delay: 0.2, src: `${R}/t14-72--tO403yixv.png` },
  { id: "Qatj1QEQnv", kind: "photo", style: { top: "8920.78px", left: "144.1px", width: "226.6px", height: "118.427px", zIndex: "81" }, direction: "up", delay: 0.2, src: `${R}/t14-73-Qatj1QEQnv.png` },
  { id: "c8Rs7KvhQS", kind: "blank", style: { top: "213.939px", left: "65.5px", width: "433.5px", height: "439.503px", zIndex: "82" }, direction: "up", delay: 0.2 },
  { id: "TGyMK3Tl2G", kind: "text", style: { top: "685.15px", left: "12.5px", width: "480px", zIndex: "9" }, direction: "up", delay: 0, cls: "t14n-tx23", lines: ["Ngày dài tràn ngập niềm vui, bốn mùa bên em. Thời gian như bản nhạc, tình yêu mãi không thay đổi."] },
  { id: "7Zrt1h2tPu", kind: "blank", style: { top: "2917.55px", left: "298.65px", width: "130.9px", height: "37.3668px", zIndex: "36" }, direction: "left", delay: 0.2 },
  { id: "fW5c-qNjFx", kind: "rsvp", style: { top: "8088.69px", left: "73.95px", width: "346.2px", height: "352.993px", zIndex: "84" }, direction: "up", delay: 0.3 },
  { id: "J7GONkGFm-", kind: "blank", style: { top: "0px", left: "0px", width: "500px" }, direction: "up", delay: 0 },
];

const CAL_EMPTY = ["e1", "e2", "e3", "e4", "e5", "e6"];
const CAL_DAYS = Array.from({ length: 30 }, (_, index) => index + 1);

function NodeContent({ node, count }) {
  if (node.kind === "photo") {
    const maskStyle = node.mask
      ? {
          "-webkit-mask-image": `url(${node.mask})`,
          maskImage: `url(${node.mask})`,
          "-webkit-mask-size": "100% 100%",
          maskSize: "100% 100%",
          "-webkit-mask-repeat": "no-repeat",
          maskRepeat: "no-repeat",
        }
      : undefined;
    return <div className="t14n-photo" style={{ backgroundImage: `url(${node.src})`, ...maskStyle }} />;
  }
  if (node.kind === "blank") {
    return node.id === "i_e1CRXed6" ? <div className="t14n-blank-first" /> : null;
  }
  if (node.kind === "text") {
    return (
      <div className={`t14n-textwrap ${node.cls}`}>
        {node.lines.map((line, index) => (
          <p key={`${node.id}-${index}`}>{line}</p>
        ))}
      </div>
    );
  }
  if (node.kind === "countdown") return <Countdown values={count} className="t14n-countdown" />;
  if (node.kind === "calendar") {
    return (
      <div className="t14n-cal">
        <div className="template-three">
          {CAL_EMPTY.map((key) => (
            <div key={key} className="empty"><div /></div>
          ))}
          {CAL_DAYS.map((day) => (
            <div key={day}>
              {day === 24 && <img className="heart-date" src={`${R}/calen-heart.png`} alt="" />}
              <div className={day === 24 ? "colorF" : undefined}>{day}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (node.kind === "rsvp") return <RsvpForm className="t14n-rsvp" accent="#856b45" />;
  return null;
}

export default function Template14New() {
  const count = useInvitationPage("template14new-page", "2025-06-24T12:00:00+07:00");

  return (
    <main className="new-invitation-page t14n">
      <MusicButton className="t14n-music" />

      <div className="t14n-canvas">
        {NODES.map((node) => (
          <Reveal
            key={node.id}
            direction={node.direction}
            delay={node.delay}
            duration={1.3}
            className={`t14n-node t14n-${node.kind}`}
            style={node.style}
          >
            <NodeContent node={node} count={count} />
          </Reveal>
        ))}
      </div>
    </main>
  );
}
