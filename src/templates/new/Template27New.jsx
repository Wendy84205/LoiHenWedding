/* Thiệp cưới mẫu 27 - dựng 1:1 theo cinelove.me/template/thiep-cuoi-27.
   Dữ liệu node sinh bởi scripts/t27-live-extract.mjs -> /tmp/t27_live.json và scripts/gen27data.py. */
import React from "react";
import {
  Countdown,
  MusicButton,
  Reveal,
  RsvpForm,
  useInvitationPage,
} from "./NewInvitationCommon.jsx";
import "./template27New.css";

const R = "/assets/template27-ref";
const MAP_SRC = "https://maps.google.com/maps?q=52%20Mi%E1%BA%BFu%20%C4%90%E1%BA%A7m%2C%20M%E1%BB%85%20Tr%C3%AC%2C%20Nam%20T%E1%BB%AB%20Li%C3%AAm%2C%20H%C3%A0%20N%E1%BB%99i&t=&z=14&ie=UTF8&iwloc=&output=embed";

const NODES = [
  { id: "yxUt9Bx8Cw", kind: "svg", style: { top: "0px", left: "0px", width: "500px", height: "720px" }, direction: "up", delay: 0.2, fill: "#fefcfe", viewBox: "0 0 100 100", d: "M100,100H0V0h100V100z" },
  { id: "Sym2h898KJ", kind: "photo", style: { top: "30px", left: "89px", width: "292.311px", height: "103.771px" }, direction: "up", delay: 0.2, src: `${R}/t27-01-Sym2h898KJ.png` },
  { id: "pOLWHCKxbx", kind: "photo", style: { top: "163.395px", left: "62.9893px", width: "67.9047px", height: "69.6022px" }, direction: "right", delay: 0.2, src: `${R}/t27-02-pOLWHCKxbx.jpg` },
  { id: "7IJNKdyaZ4", kind: "text", style: { top: "131.453px", left: "60.35px", width: "194.1px" }, direction: "up", delay: 0, cls: "t27n-tx0", lines: ["Anh Quân & An Nhiên"] },
  { id: "YvYRmGighn", kind: "text", style: { top: "185.908px", left: "160.9px", width: "293.1px" }, direction: "up", delay: 0, cls: "t27n-tx1", lines: ["Ai rồi cũng sẽ gặp được người thương vào khoảnh khắc thích hợp nhất >>"] },
  { id: "9amCQuakB2", kind: "photo", style: { top: "208.382px", left: "227.702px", width: "223.8px", height: "303.235px" }, direction: "up", delay: 0.2, src: `${R}/t27-05-9amCQuakB2.gif` },
  { id: "6oZ4K8J3Zf", kind: "photo", style: { top: "280.008px", left: "61.349px", width: "123.865px", height: "128.2px" }, direction: "right", delay: 0.2, src: `${R}/t27-06-6oZ4K8J3Zf.jpg` },
  { id: "4BtmeimhtZ", kind: "photo", style: { top: "414.412px", left: "63px", width: "122.2px", height: "126.478px" }, direction: "right", delay: 0.2, src: `${R}/t27-07-4BtmeimhtZ.jpg` },
  { id: "mAi71QBu4i", kind: "photo", style: { top: "550.204px", left: "328.015px", width: "122.2px", height: "131.976px", zIndex: "1" }, direction: "left", delay: 0.2, src: `${R}/t27-08-mAi71QBu4i.png` },
  { id: "wXiXjQ7gpM", kind: "photo", style: { top: "550.2px", left: "193.381px", width: "127.536px", height: "132px", zIndex: "2" }, direction: "up", delay: 0.2, src: `${R}/t27-09-wXiXjQ7gpM.jpg` },
  { id: "bINui4lMJ_", kind: "photo", style: { top: "550.2px", left: "61.3px", width: "123.8px", height: "128.133px", zIndex: "3" }, direction: "right", delay: 0.2, src: `${R}/t27-10-bINui4lMJ_.jpg` },
  { id: "8xW0fp63D5", kind: "svg", style: { top: "652.497px", left: "43.4px", width: "420px", height: "112.925px" }, direction: "up", delay: 0.2, fill: "#e2dace", viewBox: "0 0 100 100", d: "M100,100H0V0h100V100z" },
  { id: "yya2CYFH3B", kind: "svg", style: { top: "734px", left: "192.98px", width: "99.5941px", height: "3.85727px", zIndex: "5" }, direction: "up", delay: 0.2, fill: "#fefcfe", viewBox: "0 0 100 100", d: "M100,100H0V0h100V100z" },
  { id: "1CDkyzDpNg", kind: "text", style: { top: "701.9px", left: "107.3px", width: "274px", zIndex: "4" }, direction: "up", delay: 0, cls: "t27n-tx2", lines: ["WEDDING"] },
  { id: "ihV4VI0lxu", kind: "text", style: { top: "785.667px", left: "160.15px", width: "194.1px" }, direction: "up", delay: 0, cls: "t27n-tx3", lines: ["Anh Quân & An Nhiên"] },
  { id: "Zs5UCOOhUs", kind: "text", style: { top: "820.313px", left: "160.15px", width: "194.1px" }, direction: "up", delay: 0, cls: "t27n-tx3", lines: ["20.09.2025"] },
  { id: "Cyrnd2_5rX", kind: "text", style: { top: "894.2px", left: "61.3px", width: "164.3px", zIndex: "5" }, direction: "right", delay: 0, cls: "t27n-tx4", lines: ["WELCOME TO"] },
  { id: "su7XKP7bLp", kind: "text", style: { top: "894.167px", left: "305.35px", width: "185.3px", zIndex: "6" }, direction: "left", delay: 0, cls: "t27n-tx4", lines: ["OUR WEDDING"] },
  { id: "tXCXdeYTgk", kind: "photo", style: { top: "869.451px", left: "234.109px", width: "46px", height: "72.2243px", zIndex: "7" }, direction: "up", delay: 0.2, src: `${R}/t27-18-tXCXdeYTgk.png` },
  { id: "nrNPHcpZzE", kind: "text", style: { top: "1043.72px", left: "30.75px", width: "239.1px", zIndex: "6" }, direction: "up", delay: 0, cls: "t27n-tx5", lines: ["BRIDE&GROOM"] },
  { id: "sz_ld7jOnw", kind: "text", style: { top: "1091.05px", left: "30.75px", width: "239.1px", zIndex: "7" }, direction: "up", delay: 0, cls: "t27n-tx6", lines: ["We fell in love and got married"] },
  { id: "TFR7z7bNqa", kind: "photo", style: { top: "1166.37px", left: "30.8px", width: "226.4px", height: "339.601px", zIndex: "8" }, direction: "right", delay: 0.2, src: `${R}/t27-21-TFR7z7bNqa.jpg` },
  { id: "F2KXxGMQ1M", kind: "photo", style: { top: "1237.77px", left: "269.8px", width: "193.6px", height: "136.237px", zIndex: "9" }, direction: "left", delay: 0.2, src: `${R}/t27-22-F2KXxGMQ1M.jpg` },
  { id: "oqtr9Ff-Sl", kind: "photo", style: { top: "1432.3px", left: "272.8px", width: "190.6px", height: "108.076px", zIndex: "10" }, direction: "left", delay: 0.2, src: `${R}/t27-23-oqtr9Ff-Sl.png` },
  { id: "SkACYLgbOe", kind: "svg", style: { top: "1105.48px", left: "374.02px", width: "83.2525px", height: "3.95253px", zIndex: "11" }, direction: "left", delay: 0.2, fill: "#720f0f", viewBox: "0 0 100 100", d: "M100,100H0V0h100V100z" },
  { id: "41RUFZ-xto", kind: "text", style: { top: "1592.68px", left: "38px", width: "423px" }, direction: "up", delay: 0, cls: "t27n-tx7", lines: ["Mọi cảm xúc của em đều bắt nguồn từ anh,", "nhưng sự dịu dàng nhất, em chỉ dành riêng cho anh thôi."] },
  { id: "cQBEo4hbvG", kind: "svg", style: { top: "1771.88px", left: "63.25px", width: "372.9px", height: "231.587px", zIndex: "12" }, direction: "up", delay: 0.2, fill: "#e4d8ce", viewBox: "0 0 100 100", d: "M100,100H0V0h100V100z" },
  { id: "WnCtSUl6sI", kind: "photo", style: { top: "1709.9px", left: "123.156px", width: "112px", height: "177.901px", zIndex: "14" }, direction: "up", delay: 0.2, src: `${R}/t27-27-WnCtSUl6sI.jpg` },
  { id: "zn-k_fJ2Em", kind: "text", style: { top: "1927.3px", left: "133.2px", width: "230.5px", zIndex: "13" }, direction: "up", delay: 0, cls: "t27n-tx8", lines: ["WE ARE MARRIED"] },
  { id: "Qoo9LPK-0N", kind: "photo", style: { top: "1709.9px", left: "254.5px", width: "114.3px", height: "179.882px", zIndex: "15" }, direction: "up", delay: 0.2, src: `${R}/t27-29-Qoo9LPK-0N.jpg` },
  { id: "nyinONImkI", kind: "svg", style: { top: "1804px", left: "234px", width: "22.1px", height: "22.1px", zIndex: "16" }, direction: "up", delay: 0.2, fill: "#720f0f", viewBox: "0 0 100 100", d: "M70.7,71.3c-10.6,7.5-19.6,17.9-20.7,22.2c-1.3-4.3-9.4-14.5-20.8-22 C17.5,63.8-0.1,56.6,0,37.4c0.2-35,37-42,50-11.9C62.3-3.4,99.8,2.1,100,37.2C100.1,56.4,82.3,63.1,70.7,71.3L70.7,71.3z" },
  { id: "FZh7ThzHCR", kind: "phone", style: { top: "1837.87px", left: "122.528px", width: "113.3px", height: "51.8881px", zIndex: "17" }, direction: "up", delay: 0.3, label: "LH Chú rể" },
  { id: "Iq7T0OLmp7", kind: "phone", style: { top: "1839.5px", left: "253.428px", width: "114.7px", height: "52.2319px", zIndex: "18" }, direction: "up", delay: 0.3, label: "LH Cô dâu" },
  { id: "_prph2MYF_", kind: "text", style: { top: "2073.68px", left: "34.3px", width: "423px" }, direction: "up", delay: 0, cls: "t27n-tx9", lines: ["Xin chào,", "Đây là một tấm thiệp cưới chứa đựng trọn vẹn tấm lòng của chúng mình.", "Những ai nhận được thiệp này đều là những người quan trọng nhất trong cuộc đời chúng mình.", "Trong ngày đặc biệt ấy, chúng mình hy vọng sẽ có sự chứng kiến và sự hiện diện của bạn"] },
  { id: "PvlNtDnXAk", kind: "svg", style: { top: "2453.53px", left: "22.9px", width: "433.8px", height: "433.8px", zIndex: "22" }, direction: "up", delay: 0.2, fill: "#fefcfe", viewBox: "0 0 1024 1024", d: "M838.656 1024H192.512V330.752C192.512 152.576 337.92 8.192 516.096 8.192 694.272 8.192 839.68 152.576 839.68 331.776l-1.024 692.224z" },
  { id: "zcpgYtTRPZ", kind: "svg", style: { top: "2449.37px", left: "35.95px", width: "438.9px", height: "438.9px", zIndex: "20" }, direction: "up", delay: 0.2, fill: "#e2dace", viewBox: "0 0 1024 1024", d: "M838.656 1024H192.512V330.752C192.512 152.576 337.92 8.192 516.096 8.192 694.272 8.192 839.68 152.576 839.68 331.776l-1.024 692.224z" },
  { id: "vVgkgl5Csl", kind: "photo", style: { top: "2455.35px", left: "70.355px", width: "287.5px", height: "432.537px", zIndex: "23" }, direction: "up", delay: 0.2, src: `${R}/t27-36-vVgkgl5Csl.jpg` },
  { id: "2YABkEEB5I", kind: "text", style: { top: "2945.41px", left: "38.2px", width: "423px" }, direction: "up", delay: 0, cls: "t27n-tx9", lines: ["Từ quen thành kẻ yêu thương,", "Tặng nhau quà nhỏ, vấn vương nụ cười.", "Niềm vui, bất ngờ trao nhau,", "Ấm êm, lãng mạn dài lâu chẳng tàn."] },
  { id: "nmfIdqqNyV", kind: "photo", style: { top: "3162.27px", left: "174.7px", width: "157.4px", height: "157.4px", zIndex: "24" }, direction: "up", delay: 0.2, src: `${R}/t27-38-nmfIdqqNyV.gif` },
  { id: "kWd_JSh8v5", kind: "text", style: { top: "3412.43px", left: "105.8px", width: "274px", zIndex: "5" }, direction: "up", delay: 0, cls: "t27n-tx2", lines: ["SAVE THE DATE"] },
  { id: "B-sbKI_tow", kind: "text", style: { top: "3471.81px", left: "38.35px", width: "411.9px", zIndex: "8" }, direction: "up", delay: 0, cls: "t27n-tx10", lines: ["To have life henceforth,the poem of new joys"] },
  { id: "8Uv-1lqVQG", kind: "photo", style: { top: "3540.14px", left: "22.35px", width: "456.363px", height: "303.481px", zIndex: "25" }, direction: "up", delay: 0.2, src: `${R}/t27-41-8Uv-1lqVQG.jpg` },
  { id: "uenrqHMs67", kind: "svg", style: { top: "4017.98px", left: "5.8px", width: "286.8px", height: "231.8px", zIndex: "26" }, direction: "right", delay: 0.2, fill: "#e4d8ce", viewBox: "0 0 1024 1024", d: "M838.656 1024H192.512V330.752C192.512 152.576 337.92 8.192 516.096 8.192 694.272 8.192 839.68 152.576 839.68 331.776l-1.024 692.224z" },
  { id: "YUV0ibCiwb", kind: "text", style: { top: "3861.41px", left: "126.4px", width: "370.6px" }, direction: "up", delay: 0, cls: "t27n-tx11", lines: ["Câu trả lời rất dài,", "anh phải dùng cả đời để nói với em.", "Em đã sẵn sàng để nghe anh nói chưa?”"] },
  { id: "H-ZolOT21L", kind: "text", style: { top: "4077.33px", left: "3.2px", width: "222.4px", zIndex: "30" }, direction: "right", delay: 0, cls: "t27n-tx12", lines: ["I promise to love you", "every moment forever."] },
  { id: "6HuFoR2Nlm", kind: "photo", style: { top: "4085px", left: "208.3px", width: "255.1px", height: "383.927px", zIndex: "28" }, direction: "up", delay: 0.2, src: `${R}/t27-45-6HuFoR2Nlm.jpg` },
  { id: "UYsgk-qERA", kind: "photo", style: { top: "4325px", left: "63.043px", width: "217.1px", height: "303.94px", zIndex: "29" }, direction: "up", delay: 0.2, src: `${R}/t27-46-UYsgk-qERA.png` },
  { id: "nofyRNY1pk", kind: "text", style: { top: "4570.85px", left: "299.1px", width: "187.4px", zIndex: "31" }, direction: "left", delay: 0, cls: "t27n-tx13", lines: ["//", "Bên nhau ngày tháng bình yên,", "Hạnh phúc như thể nối liền năm sau"] },
  { id: "5JOW8UalrR", kind: "photo", style: { top: "4483px", left: "364.75px", width: "47.1px", height: "73.9514px", zIndex: "32" }, direction: "left", delay: 0.2, src: `${R}/t27-48-5JOW8UalrR.png` },
  { id: "IypHn4E7xV", kind: "text", style: { top: "4779.57px", left: "74.95px", width: "359.1px", zIndex: "6" }, direction: "up", delay: 0, cls: "t27n-tx2", lines: ["WITNESS HAPPINESS"] },
  { id: "7HBHTHAE-M", kind: "text", style: { top: "4822.2px", left: "35.85px", width: "442.7px", zIndex: "9" }, direction: "up", delay: 0, cls: "t27n-tx14", lines: ["To have life henceforth,the poem of new joys"] },
  { id: "GPqbEfod7u", kind: "photo", style: { top: "4891px", left: "26.3px", width: "456.4px", height: "303.506px", zIndex: "33" }, direction: "up", delay: 0.2, src: `${R}/t27-51-GPqbEfod7u.jpg` },
  { id: "0h-5z3IYDU", kind: "text", style: { top: "5231.15px", left: "34.3px", width: "428.4px", zIndex: "32" }, direction: "up", delay: 0, cls: "t27n-tx15", lines: ["Pháo hoa ngân hà rạng ngời,", "Một đời có đôi, sánh đôi ngọt lành.", "Tháng năm vội vã mong manh,", "Cũng không e ngại gập ghềnh phong sương.", "Bởi luôn có bóng người thương,", "Bên nhau hạnh phúc trọn đường dài lâu."] },
  { id: "5pmk91UYRd", kind: "photo", style: { top: "5487px", left: "90.216px", width: "321.6px", height: "413.256px", zIndex: "34" }, direction: "up", delay: 0.2, src: `${R}/t27-53-5pmk91UYRd.jpg` },
  { id: "Av8Mpj2u8V", kind: "photo", style: { top: "5963.23px", left: "26.4298px", width: "183.79px", height: "276.605px", zIndex: "35" }, direction: "right", delay: 0.2, src: `${R}/t27-54-Av8Mpj2u8V.jpg` },
  { id: "ZbDQO0IGTQ", kind: "photo", style: { top: "5819.12px", left: "227.72px", width: "223.361px", height: "288.185px", zIndex: "43" }, direction: "up", delay: 0.2, src: `${R}/t27-55-ZbDQO0IGTQ.png` },
  { id: "Dhuu3EfE2d", kind: "svg", style: { top: "5807.73px", left: "149.239px", width: "380.239px", height: "290.7px", zIndex: "42" }, direction: "up", delay: 0.2, fill: "#fefcfe", viewBox: "0 0 1024 1024", d: "M838.656 1024H192.512V330.752C192.512 152.576 337.92 8.192 516.096 8.192 694.272 8.192 839.68 152.576 839.68 331.776l-1.024 692.224z" },
  { id: "GNN8JdXGDC", kind: "svg", style: { top: "5797.75px", left: "171.5px", width: "370.949px", height: "281.921px", zIndex: "41" }, direction: "left", delay: 0.2, fill: "#e2dace", viewBox: "0 0 1024 1024", d: "M838.656 1024H192.512V330.752C192.512 152.576 337.92 8.192 516.096 8.192 694.272 8.192 839.68 152.576 839.68 331.776l-1.024 692.224z" },
  { id: "EVVchpXiD0", kind: "text", style: { top: "6157.94px", left: "235.2px", width: "222.6px", zIndex: "32" }, direction: "up", delay: 0, cls: "t27n-tx16", lines: ["//", "Gặp gỡ là điều đẹp đẽ", "Nice to meet"] },
  { id: "X7NbFNWNwT", kind: "photo", style: { top: "6356px", left: "27.7px", width: "443.887px", height: "295.185px", zIndex: "44" }, direction: "up", delay: 0.2, src: `${R}/t27-59-X7NbFNWNwT.jpg` },
  { id: "2zwShLgNl-", kind: "text", style: { top: "6679.14px", left: "32.6px", width: "428.4px", zIndex: "58" }, direction: "up", delay: 0, cls: "t27n-tx15", lines: ["Chúng mình, gặp nhau như một điều bất ngờ, mọi thứ, đều là vừa vặn. Hình dáng dịu dàng của em In", "trong ánh mắt thương yêu của anh", "Từ đó, năm tháng trở nên dịu êm", "Câu chuyện cũng vì chúng mình mà trọn vẹn"] },
  { id: "j-d7N_snl3", kind: "photo", style: { top: "6859.21px", left: "65.71px", width: "190.4px", height: "286.553px", zIndex: "52" }, direction: "up", delay: 0.2, src: `${R}/t27-61-j-d7N_snl3.jpg` },
  { id: "Gmysyoa6fT", kind: "svg", style: { top: "6893.77px", left: "272.8px", width: "101.8px", height: "101.8px", zIndex: "46" }, direction: "up", delay: 0.2, fill: "#d7cec1", viewBox: "0 0 1024 1024", d: "M838.656 1024H192.512V330.752C192.512 152.576 337.92 8.192 516.096 8.192 694.272 8.192 839.68 152.576 839.68 331.776l-1.024 692.224z" },
  { id: "VHR0UeCVXQ", kind: "photo", style: { top: "7011.55px", left: "269.85px", width: "147.5px", height: "134.225px", zIndex: "53" }, direction: "up", delay: 0.2, src: `${R}/t27-63-VHR0UeCVXQ.jpg` },
  { id: "l3QiMuCsnM", kind: "text", style: { top: "6908.77px", left: "271.2px", width: "93.6px", zIndex: "55" }, direction: "up", delay: 0, cls: "t27n-tx17", lines: ["Love"] },
  { id: "XsdfqlQ4CS", kind: "text", style: { top: "6944.67px", left: "285.3px", width: "93.6px", zIndex: "54" }, direction: "up", delay: 0, cls: "t27n-tx17", lines: ["You"] },
  { id: "pCR4kUkkce", kind: "text", style: { top: "6944.67px", left: "381.3px", width: "93.6px", zIndex: "57" }, direction: "left", delay: 0, cls: "t27n-tx18", lines: ["20/09"] },
  { id: "OTzIo3pgn4", kind: "text", style: { top: "6902.88px", left: "381.3px", width: "93.6px", zIndex: "56" }, direction: "left", delay: 0, cls: "t27n-tx18", lines: ["2025"] },
  { id: "zLmuazPRTN", kind: "svg", style: { top: "6618.34px", left: "25.2px", width: "448.6px", height: "566.6px", zIndex: "51" }, direction: "up", delay: 0.2, opacity: 0.55, fill: "#e2dace", viewBox: "0 0 100 100", d: "M100,100H0V0h100V100z" },
  { id: "vmyDrYXX_h", kind: "text", style: { top: "7220.94px", left: "129.3px", width: "353.4px", zIndex: "59" }, direction: "up", delay: 0, cls: "t27n-tx19", lines: ["//", "Trân trọng kính mời", "Bạn đến chung vui ngày cưới", "Cùng chứng kiến sự gắn kết sinh ra từ tình yêu"] },
  { id: "TlrYQSVvkw", kind: "photo", style: { top: "7257.27px", left: "66.05px", width: "48.3px", height: "75.8355px", zIndex: "60" }, direction: "right", delay: 0.2, src: `${R}/t27-70-TlrYQSVvkw.png` },
  { id: "ZMrkP-Wz08", kind: "text", style: { top: "7390.15px", left: "215.9px", width: "246.9px", zIndex: "7" }, direction: "up", delay: 0, cls: "t27n-tx20", lines: ["WEDDING", "INVITATION"] },
  { id: "jmyFbbEHbE", kind: "svg", style: { top: "7423.94px", left: "470.8px", width: "4.8px", height: "77.8846px", zIndex: "61" }, direction: "left", delay: 0.2, fill: "#e4d8ce", viewBox: "0 0 100 100", d: "M100,100H0V0h100V100z" },
  { id: "QFObYkjInz", kind: "photo", style: { top: "7473px", left: "300.2px", width: "162.2px", height: "162.2px", zIndex: "62" }, direction: "left", delay: 0.2, src: `${R}/t27-73-QFObYkjInz.gif` },
  { id: "0gFmceW1G9", kind: "svg", style: { top: "7578.9px", left: "63.5px", width: "58px", height: "58px", zIndex: "63" }, direction: "right", delay: 0.2, fill: "#e2dace", viewBox: "0 0 100 100", d: "M50,100C22.4,100,0,77.6,0,50S22.4,0,50,0s50,22.4,50,50S77.6,100,50,100z" },
  { id: "4k-42RA90f", kind: "text", style: { top: "7593.4px", left: "68px", width: "93.6px", zIndex: "64" }, direction: "right", delay: 0, cls: "t27n-tx17", lines: ["Time"] },
  { id: "A7ITXxpDon", kind: "text", style: { top: "7655.62px", left: "121.5px", width: "353.4px", zIndex: "60" }, direction: "up", delay: 0, cls: "t27n-tx21", lines: ["Thứ 2 Ngày 20 tháng 09 năm 2025"] },
  { id: "NzlaKvBb9J", kind: "text", style: { top: "7692.65px", left: "121.5px", width: "353.4px", zIndex: "61" }, direction: "up", delay: 0, cls: "t27n-tx21", lines: ["Ngày 02 tháng 08 âm lịch 12:00 PM"] },
  { id: "DFEQchcIf9", kind: "countdown", style: { top: "7767.88px", left: "134.3px", width: "252.6px", height: "54.2842px", zIndex: "65" }, direction: "up", delay: 0.3 },
  { id: "WiLJA5c1zk", kind: "calendar", style: { top: "7829.77px", left: "107.1px", width: "300px", height: "280px", zIndex: "66" }, direction: "up", delay: 0.3 },
  { id: "mFBtFxf-Lp", kind: "text", style: { top: "8162.8px", left: "63px", width: "93.6px", zIndex: "65" }, direction: "right", delay: 0, cls: "t27n-tx17", lines: ["Address"] },
  { id: "4ZNbl4qYYf", kind: "svg", style: { top: "8153.48px", left: "56.3px", width: "58px", height: "58px", zIndex: "64" }, direction: "right", delay: 0.2, fill: "#e2dace", viewBox: "0 0 100 100", d: "M50,100C22.4,100,0,77.6,0,50S22.4,0,50,0s50,22.4,50,50S77.6,100,50,100z" },
  { id: "22oA6eRwZG", kind: "text", style: { top: "8244.5px", left: "97.7px", width: "353.4px", zIndex: "62" }, direction: "up", delay: 0, cls: "t27n-tx21", lines: ["52 Miếu Đầm, Mễ Trì, Nam Từ Liêm, Hà Nội"] },
  { id: "vnPph5GcZX", kind: "map", style: { top: "8341px", left: "64px", width: "371px", height: "185px" }, direction: "up", delay: 0.3 },
  { id: "dAefYES8EY", kind: "text", style: { top: "8523.88px", left: "66px", width: "121.9px", zIndex: "66" }, direction: "right", delay: 0, cls: "t27n-tx17", lines: ["PROCESS"] },
  { id: "0AVsAuCbaf", kind: "svg", style: { top: "8515.42px", left: "56.3px", width: "58px", height: "58px", zIndex: "65" }, direction: "right", delay: 0.2, fill: "#e2dace", viewBox: "0 0 100 100", d: "M50,100C22.4,100,0,77.6,0,50S22.4,0,50,0s50,22.4,50,50S77.6,100,50,100z" },
  { id: "-ZKkcjMgNY", kind: "photo", style: { top: "8666.02px", left: "24.3px", width: "448.9px", height: "444.411px", zIndex: "68" }, direction: "up", delay: 0.2, src: `${R}/t27-86--ZKkcjMgNY.jpg` },
  { id: "dfJNUwHFni", kind: "svg", style: { top: "8585.01px", left: "181px", width: "216.5px", height: "229.603px", zIndex: "69" }, direction: "up", delay: 0.2, opacity: 0.71, fill: "#fefcfe", viewBox: "0 0 100 100", d: "M100,100H0V0h100V100z" },
  { id: "R02ED21u93", kind: "svg", style: { top: "8608.75px", left: "186.95px", width: "36.8px", height: "36.8px", zIndex: "70" }, direction: "up", delay: 0.2, fill: "#720f0f", viewBox: "0 0 100 100", d: "M70.7,71.3c-10.6,7.5-19.6,17.9-20.7,22.2c-1.3-4.3-9.4-14.5-20.8-22 C17.5,63.8-0.1,56.6,0,37.4c0.2-35,37-42,50-11.9C62.3-3.4,99.8,2.1,100,37.2C100.1,56.4,82.3,63.1,70.7,71.3L70.7,71.3z" },
  { id: "eohifp6Zyw", kind: "svg", style: { top: "8607.2px", left: "234.8px", width: "4px", height: "42px", zIndex: "71" }, direction: "up", delay: 0.2, fill: "#e4d8ce", viewBox: "0 0 100 100", d: "M100,100H0V0h100V100z" },
  { id: "PkIwUz5OCH", kind: "text", style: { top: "8603.23px", left: "242.1px", width: "147.9px", zIndex: "72" }, direction: "up", delay: 0, cls: "t27n-tx22", lines: ["09:00", "chụp hình lưu niệm"] },
  { id: "PAsfOgTKiV", kind: "svg", style: { top: "8679.75px", left: "187.95px", width: "36.8px", height: "36.8px", zIndex: "71" }, direction: "up", delay: 0.2, fill: "#720f0f", viewBox: "0 0 100 100", d: "M70.7,71.3c-10.6,7.5-19.6,17.9-20.7,22.2c-1.3-4.3-9.4-14.5-20.8-22 C17.5,63.8-0.1,56.6,0,37.4c0.2-35,37-42,50-11.9C62.3-3.4,99.8,2.1,100,37.2C100.1,56.4,82.3,63.1,70.7,71.3L70.7,71.3z" },
  { id: "tpVO4ImTrm", kind: "svg", style: { top: "8671.2px", left: "233.8px", width: "4px", height: "42px", zIndex: "72" }, direction: "up", delay: 0.2, fill: "#e4d8ce", viewBox: "0 0 100 100", d: "M100,100H0V0h100V100z" },
  { id: "0USJYnkQHu", kind: "text", style: { top: "8672.23px", left: "244.05px", width: "147.9px", zIndex: "73" }, direction: "up", delay: 0, cls: "t27n-tx23", lines: ["10:00", "Lễ Thành Hôn"] },
  { id: "vQeLfwLuU7", kind: "svg", style: { top: "8742.81px", left: "186.95px", width: "36.8px", height: "36.8px", zIndex: "72" }, direction: "up", delay: 0.2, fill: "#720f0f", viewBox: "0 0 100 100", d: "M70.7,71.3c-10.6,7.5-19.6,17.9-20.7,22.2c-1.3-4.3-9.4-14.5-20.8-22 C17.5,63.8-0.1,56.6,0,37.4c0.2-35,37-42,50-11.9C62.3-3.4,99.8,2.1,100,37.2C100.1,56.4,82.3,63.1,70.7,71.3L70.7,71.3z" },
  { id: "YJa0VpWQY5", kind: "text", style: { top: "8730.24px", left: "248.75px", width: "147.9px", zIndex: "74" }, direction: "up", delay: 0, cls: "t27n-tx24", lines: ["10:00", "Tiệc cưới bắt đầu"] },
  { id: "LvzQNtMfm2", kind: "svg", style: { top: "8730.2px", left: "235.8px", width: "4px", height: "42px", zIndex: "73" }, direction: "up", delay: 0.2, fill: "#e4d8ce", viewBox: "0 0 100 100", d: "M100,100H0V0h100V100z" },
  { id: "NWgqmrg4t8", kind: "text", style: { top: "9143.85px", left: "51px", width: "353.4px", zIndex: "63" }, direction: "up", delay: 0, cls: "t27n-tx25", lines: ["Gió mát khẽ lay, mây hồng ghé núi", "Câu chuyện của chúng mình chỉ vừa bắt đầu", "Cảm ơn bạn đã không quản đường xa đến đây", "Cùng chia sẻ ngày tươi đẹp và ý nghĩa này", "Hẹn gặp bạn tại lễ cưới của chúng mình nhé!"] },
  { id: "RN49wrd-3n", kind: "photo", style: { top: "9383.81px", left: "25.2px", width: "445.6px", height: "329.744px", zIndex: "75" }, direction: "up", delay: 0.2, src: `${R}/t27-98-RN49wrd-3n.jpg` },
  { id: "YP6UgBKF9X", kind: "svg", style: { top: "9326.33px", left: "227.7px", width: "46.7px", height: "46.7px", zIndex: "76" }, direction: "up", delay: 0.2, fill: "#e2dace", viewBox: "0 0 100 100", d: "M70.7,71.3c-10.6,7.5-19.6,17.9-20.7,22.2c-1.3-4.3-9.4-14.5-20.8-22 C17.5,63.8-0.1,56.6,0,37.4c0.2-35,37-42,50-11.9C62.3-3.4,99.8,2.1,100,37.2C100.1,56.4,82.3,63.1,70.7,71.3L70.7,71.3z" },
  { id: "eHZVVUM7qX", kind: "rsvp", style: { top: "9764px", left: "100px", width: "300px", height: "320px", zIndex: "77" }, direction: "up", delay: 0.3 },
  { id: "SNh4UW1cN8", kind: "photo", style: { top: "10158.2px", left: "163.6px", width: "161.3px", height: "161.3px", zIndex: "78" }, direction: "up", delay: 0.2, src: `${R}/t27-101-SNh4UW1cN8.gif` },
];

const CAL_WEEKS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
const CAL_DAYS = Array.from({ length: 30 }, (_, index) => index + 1);
const PHONE_ICON =
  "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z";

function NodeContent({ node, count }) {
  if (node.kind === "photo") {
    return <div className="t27n-photo" style={{ backgroundImage: `url(${node.src})`, opacity: node.opacity }} />;
  }
  if (node.kind === "svg") {
    return (
      <svg className="t27n-art" viewBox={node.viewBox} preserveAspectRatio="none" style={{ opacity: node.opacity }} aria-hidden="true" focusable="false">
        <path d={node.d} fill={node.fill} />
      </svg>
    );
  }
  if (node.kind === "text") {
    return (
      <div className={`t27n-textwrap ${node.cls}`}>
        {node.lines.map((line, index) => (
          <p key={`${node.id}-${index}`}>{line}</p>
        ))}
      </div>
    );
  }
  if (node.kind === "phone") {
    return (
      <button type="button" className="t27n-phoneBtn" aria-label={node.label}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
          <path d={PHONE_ICON} stroke="#720f0f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {node.label}
      </button>
    );
  }
  if (node.kind === "countdown") return <Countdown values={count} className="t27n-count" />;
  if (node.kind === "calendar") {
    return (
      <div className="t27n-cal">
        <div className="template-two">
          <div className="two-back" />
          <div className="two-body">
            <div className="body-axis">
              <div />
              <div />
            </div>
            <div className="body-box">
              <div className="two-head">
                <div>9</div>
                <div>2025</div>
              </div>
              <div className="two-date">
                {CAL_WEEKS.map((week) => (
                  <div key={week} className="body-week">
                    {week}
                  </div>
                ))}
                {CAL_DAYS.map((day) => (
                  <div key={day}>
                    {day === 20 && <img className="heart-date" src={`${R}/calen-heart.png`} alt="" />}
                    <div className={day === 20 ? "colorF" : undefined}>{day}</div>
                  </div>
                ))}
                <div className="cal-shadow" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (node.kind === "map") {
    return (
      <div className="t27n-mapBox">
        <iframe title="Bản đồ địa điểm cưới" width="100%" height="100%" frameBorder="0" src={MAP_SRC} allowFullScreen />
      </div>
    );
  }
  if (node.kind === "rsvp") {
    return <RsvpForm className="t27n-rsvpBox" accent="#720f0f" declineLabel="Tôi bận, rất tiếc không thể tham dự" showPartySize={false} />;
  }
  return null;
}

export default function Template27New() {
  const count = useInvitationPage("template27new-page", "2025-09-20T12:00:00+07:00");

  return (
    <main className="new-invitation-page t27n">
      <MusicButton className="t27n-music" />

      <div className="t27n-canvas">
        {NODES.map((node) => (
          <Reveal
            key={node.id}
            direction={node.direction}
            delay={node.delay}
            duration={1.3}
            className={`t27n-node t27n-${node.kind}`}
            style={node.style}
          >
            <NodeContent node={node} count={count} />
          </Reveal>
        ))}
      </div>
    </main>
  );
}
