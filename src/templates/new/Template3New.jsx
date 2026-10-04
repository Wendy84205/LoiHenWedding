import React from "react";
import {
  Countdown,
  GiftNote,
  MusicButton,
  Reveal,
  WishForm,
  useInvitationPage,
} from "./NewInvitationCommon.jsx";
import "./template3New.css";

const R = "/assets/template3-ref";

const CAL_EMPTY = ["e1", "e2", "e3", "e4", "e5"];
const CAL_DAYS = Array.from({ length: 31 }, (_, index) => index + 1);

const NODES = [
  { id: "In9KY-FsJo", kind: "text", style: { top: "230.823px", left: "21.55px", width: "184.5px" }, direction: "right", delay: 0, cls: "t3n-tx0", lines: ["OUR WEDDING"] },
  { id: "dVQKREXYXU", kind: "photo", style: { top: "62.793px", left: "30.1px", width: "168px", height: "168px" }, direction: "right", delay: 0.2, src: `${R}/t3-01-dVQKREXYXU.png` },
  { id: "k8qf-A67EK", kind: "text", style: { top: "233.037px", left: "222.9px", width: "255.5px" }, direction: "left", delay: 0, cls: "t3n-tx1", lines: ["Trân trọng kính mời bạn đến dự buổi tiệc cưới của chúng mình"] },
  { id: "o-LuJ5q_rO", kind: "text", style: { top: "289.027px", left: "216.4px", width: "262px" }, direction: "up", delay: 0, cls: "t3n-tx2", lines: ["Hoàng & Anh"] },
  { id: "jhK2AHETe-", kind: "text", style: { top: "342.987px", left: "256.5px", width: "217px" }, direction: "left", delay: 0, cls: "t3n-tx3", lines: ["2025-03-20 16:00"] },
  { id: "zjM53ssbtr", kind: "text", style: { top: "1101.03px", left: "59.15px", width: "383.5px" }, direction: "up", delay: 0, cls: "t3n-tx4", lines: ["\"Life has more than 30,000 days,", "and I’m truly happy that today,", "you came just for us.\""] },
  { id: "ABXTWha94V", kind: "photo", style: { top: "398px", left: "19.4555px", width: "461.06px", height: "655.57px" }, direction: "up", delay: 0.2, src: `${R}/t3-10-ABXTWha94V.jpg` },
  { id: "DCpHr_ENY-", kind: "photo", style: { top: "1220.54px", left: "206.533px", width: "273px", height: "190.148px" }, direction: "up", delay: 0.2, src: `${R}/t3-13-DCpHr_ENY-.jpg` },
  { id: "5DdIZcwTCI", kind: "photo", style: { top: "1422.92px", left: "206.077px", width: "274px", height: "190.717px" }, direction: "up", delay: 0.2, src: `${R}/t3-25-5DdIZcwTCI.jpg` },
  { id: "VuKRAjnKM5", kind: "photo", style: { top: "1530.09px", left: "30.15px", width: "232.15px", height: "167.203px" }, direction: "right", delay: 0.2, src: `${R}/t3-05-VuKRAjnKM5.png` },
  { id: "A78TVq0JhR", kind: "blank", style: { top: "1745.8px", left: "32.45px", width: "433.1px", height: "113.546px" }, direction: "up", delay: 0.2 },
  { id: "c4IbKbonIm", kind: "text", style: { top: "1769.7px", left: "46px", width: "271px" }, direction: "up", delay: 0, cls: "t3n-tx5", lines: ["\"This is the bravest moment of my life.\""] },
  { id: "WKOj2g1GeE", kind: "text", style: { top: "1804.15px", left: "50.5px", width: "85px" }, direction: "right", delay: 0, cls: "t3n-tx6", lines: ["- U & I -"] },
  { id: "uUSs1PoUtm", kind: "photo", style: { top: "1759.87px", left: "359.8px", width: "84.8px", height: "84.8px" }, direction: "left", delay: 0.2, src: `${R}/t3-15-uUSs1PoUtm.jpg` },
  { id: "CBwchX24IF", kind: "text", style: { top: "2002.67px", left: "51.7px", width: "403.3px" }, direction: "up", delay: 0, cls: "t3n-tx7", lines: ["I want to spend the rest of my life with you"] },
  { id: "RufFHxUbSB", kind: "photo", style: { top: "2147px", left: "43px", width: "146.3px", height: "146.3px" }, direction: "right", delay: 0.2, src: `${R}/t3-22-RufFHxUbSB.jpg` },
  { id: "BuP1fps6uK", kind: "photo", style: { top: "2146.96px", left: "311.2px", width: "146.3px", height: "146.3px" }, direction: "left", delay: 0.2, src: `${R}/t3-08-BuP1fps6uK.jpg` },
  { id: "ZmgI5kHNRz", kind: "text", style: { top: "2317.36px", left: "70.3px", width: "90.9px" }, direction: "right", delay: 0, cls: "t3n-tx8", lines: ["Chú rể"] },
  { id: "_FXqDOJg8J", kind: "text", style: { top: "2368.03px", left: "273.9px", width: "222.3px" }, direction: "left", delay: 0, cls: "t3n-tx9", lines: ["Diệp Anh"] },
  { id: "nzXyiaaO6l", kind: "text", style: { top: "2316.98px", left: "323.8px", width: "121px" }, direction: "left", delay: 0, cls: "t3n-tx8", lines: ["Cô dâu"] },
  { id: "sagpCWrtph", kind: "text", style: { top: "2368px", left: "4.1px", width: "220px" }, direction: "right", delay: 0, cls: "t3n-tx9", lines: ["Nhật Hoàng"] },
  { id: "IbP--3vFId", kind: "blank", style: { top: "2451.36px", left: "-0.5px", width: "500.5px", height: "5.663px" }, direction: "up", delay: 0.2 },
  { id: "6hjPjbaHch", kind: "text", style: { top: "2490px", left: "10px", width: "480px" }, direction: "up", delay: 0, cls: "t3n-tx10", lines: ["Chapter One"] },
  { id: "7TWCUhJPos", kind: "text", style: { top: "2576px", left: "134px", width: "232px" }, direction: "up", delay: 0, cls: "t3n-tx11", lines: ["\"You had me at hello\""] },
  { id: "6WKl1gIyDU", kind: "text", style: { top: "2641.34px", left: "28.000000000000007px", width: "447.5px" }, direction: "up", delay: 0, cls: "t3n-tx12", lines: ["Hạnh phúc lớn nhất chính là có thể đặt tay mình vào tay em.", "Cùng em đi hết cuộc đời lãng mạn này."] },
  { id: "Q4DSxnxCrj", kind: "photo", style: { top: "2743px", left: "129.253px", width: "347.135px", height: "452.541px" }, direction: "up", delay: 0.2, src: `${R}/t3-09-Q4DSxnxCrj.png` },
  { id: "3mSkKCT-dJ", kind: "text", style: { top: "2893.5px", left: "33.3px", width: "135.3px" }, direction: "right", delay: 0, cls: "t3n-tx13", lines: ["Hoàng"] },
  { id: "2tUx7iUM3B", kind: "text", style: { top: "2975.3px", left: "38.3px", width: "104.5px" }, direction: "right", delay: 0, cls: "t3n-tx14", lines: ["&"] },
  { id: "Eiu-nTqMR4", kind: "text", style: { top: "3049.04px", left: "48.008px", width: "150.1px" }, direction: "right", delay: 0, cls: "t3n-tx15", lines: ["Anh"] },
  { id: "w6oFoXwJW4", kind: "text", style: { top: "3267.19px", left: "10px", width: "479.992px" }, direction: "up", delay: 0, cls: "t3n-tx16", lines: ["- Meeting and Falling in Love -"] },
  { id: "Hm8FDh43eS", kind: "text", style: { top: "3341.08px", left: "63.308px", width: "398px" }, direction: "up", delay: 0, cls: "t3n-tx17", lines: ["Em không phải là điểm cuối của tình yêu, mà là động lực nguyên sơ của nó.", "Vì em, anh đã yêu thế giới này."] },
  { id: "inp8tp_JMj", kind: "photo", style: { top: "3493.2px", left: "28.35px", width: "440.7px", height: "247.656px" }, direction: "up", delay: 0.2, src: `${R}/t3-18-inp8tp_JMj.png` },
  { id: "Tgod-fHgCO", kind: "photo", style: { top: "3756.55px", left: "27.4px", width: "441.6px", height: "248.172px" }, direction: "up", delay: 0.2, src: `${R}/t3-20-Tgod-fHgCO.png` },
  { id: "akwvWD-4ml", kind: "text", style: { top: "4043.67px", left: "318px", width: "151.5px" }, direction: "left", delay: 0, cls: "t3n-tx10", lines: ["Chapter Three"] },
  { id: "En8BhJ_DUW", kind: "text", style: { top: "4119.62px", left: "160.7px", width: "308.8px" }, direction: "up", delay: 0, cls: "t3n-tx18", lines: ["\"Người dành cho em rồi sẽ đến bên em\""] },
  { id: "QIvbB1Rh8G", kind: "text", style: { top: "4189.41px", left: "51.024px", width: "421.392px" }, direction: "up", delay: 0, cls: "t3n-tx19", lines: ["Anh nói rằng trên đời này chẳng hề có duyên phận,", "Nhưng em không tin điều đó.", "Nếu không, làm sao chúng ta có thể gặp nhau", "Đúng vào khoảnh khắc ấy?"] },
  { id: "9gVZCoT4Vm", kind: "photo", style: { top: "4328.34px", left: "17.5555px", width: "462.9px", height: "490.129px" }, direction: "up", delay: 0.2, src: `${R}/t3-16-9gVZCoT4Vm.jpg` },
  { id: "kGl6FVoc-7", kind: "text", style: { top: "4686.26px", left: "93.004px", width: "327px" }, direction: "up", delay: 0, cls: "t3n-tx20", lines: ["Forever love"] },
  { id: "dNoo4EfpZs", kind: "text", style: { top: "4873.23px", left: "41.72px", width: "410.992px" }, direction: "up", delay: 0, cls: "t3n-tx21", lines: ["\"Nếu mặt trời có mọc từ phía Tây,", "trái tim em vẫn không đổi thay – yêu anh mãi mãi.\""] },
  { id: "R5jJqQ3Eb8", kind: "photo", style: { top: "4976px", left: "17.6px", width: "462.9px", height: "220.929px" }, direction: "up", delay: 0.2, src: `${R}/t3-12-R5jJqQ3Eb8.jpg` },
  { id: "O63nPdK4FC", kind: "photo", style: { top: "5201.86px", left: "17.8px", width: "462.6px", height: "220.786px" }, direction: "up", delay: 0.2, src: `${R}/t3-23-O63nPdK4FC.jpg` },
  { id: "aFzxTsY4wU", kind: "photo", style: { top: "5427.59px", left: "17.95px", width: "460.5px", height: "219.083px" }, direction: "up", delay: 0.2, src: `${R}/t3-11-aFzxTsY4wU.jpg` },
  { id: "0uYVFA9RCE", kind: "text", style: { top: "5286.69px", left: "38.304px", width: "400px" }, direction: "up", delay: 0, cls: "t3n-tx22", lines: ["No one but you"] },
  { id: "axriQesPd6", kind: "text", style: { top: "5688.72px", left: "39.962px", width: "416.5px" }, direction: "up", delay: 0, cls: "t3n-tx4", lines: ["Every question I ask is about you.", "Every step I take leads to you.", "You are everywhere,", "Where my voice reaches, where my eyes land."] },
  { id: "M1wMMgx882", kind: "text", style: { top: "5834.93px", left: "33.304px", width: "143.1px" }, direction: "right", delay: 0, cls: "t3n-tx23", lines: ["Chapter Four"] },
  { id: "lFQe5nzAd5", kind: "text", style: { top: "5916.12px", left: "30.104px", width: "415.2px" }, direction: "up", delay: 0, cls: "t3n-tx24", lines: ["\"Giữa thế gian huyên náo, em là điều duy nhất đáng giá.\""] },
  { id: "on5kyGJNLi", kind: "photo", style: { top: "5980.01px", left: "22.8px", width: "457.7px", height: "246.945px" }, direction: "up", delay: 0.2, src: `${R}/t3-21-on5kyGJNLi.jpg` },
  { id: "u29lqzkdYn", kind: "text", style: { top: "6255.25px", left: "46.1px", width: "407.3px" }, direction: "up", delay: 0, cls: "t3n-tx25", lines: ["Ba năm qua, mọi trải nghiệm đã mang đến cho chúng ta những cảm xúc khác biệt.", "Chúng ta đã đồng hành cùng nhau, cùng trưởng thành,", "Chia sẻ niềm vui lẫn nỗi buồn.", "Chúng ta đã nhìn thấy phiên bản đẹp nhất của nhau,", "Và cũng trở thành phiên bản tốt nhất của chính mình."] },
  { id: "9m31Nrvm9o", kind: "photo", style: { top: "6452.1px", left: "19.4px", width: "210.6px", height: "276.719px" }, direction: "right", delay: 0.2, src: `${R}/t3-17-9m31Nrvm9o.jpg` },
  { id: "tM5G4v41Eh", kind: "photo", style: { top: "6452.06px", left: "241.029px", width: "237.585px", height: "400.026px" }, direction: "left", delay: 0.2, src: `${R}/t3-14-tM5G4v41Eh.jpg` },
  { id: "77puA7tg7T", kind: "text", style: { top: "6703.41px", left: "49.3663px", width: "335.792px" }, direction: "up", delay: 0, cls: "t3n-tx26", lines: ["For you", "a thousand times over"] },
  { id: "qgLDuColPG", kind: "text", style: { top: "6911.58px", left: "56.7px", width: "419.7px" }, direction: "up", delay: 0, cls: "t3n-tx27", lines: ["Tình yêu tựa đóa hoa trong cơn gió nhẹ, rung rinh khẽ lay,", "Lúc thăng lúc trầm, đêm dài chẳng còn lê thê.", "Mỗi vì sao, mỗi cánh hoa đều trở nên dịu dàng hơn.", "Gặp được em, mọi thứ đều trở nên tươi đẹp."] },
  { id: "hvrs_5ceOo", kind: "photo", style: { top: "7031.98px", left: "176.4px", width: "129.3px", height: "64.65px" }, direction: "up", delay: 0.2, src: `${R}/t3-06-hvrs_5ceOo.png` },
  { id: "hQNFlz8JD3", kind: "text", style: { top: "7105.97px", left: "79.9px", width: "333.1px" }, direction: "up", delay: 0, cls: "t3n-tx28", lines: ["welcome to our wedding"] },
  { id: "f8VoclQ_XD", kind: "text", style: { top: "7220.97px", left: "145.5px", width: "205.2px" }, direction: "up", delay: 0, cls: "t3n-tx29", lines: ["【 Đám cưới 】"] },
  { id: "FBNEghmmV5", kind: "text", style: { top: "7275.29px", left: "8.2px", width: "480px" }, direction: "up", delay: 0, cls: "t3n-tx30", lines: ["Đó là một cuộc hội ngộ trong đời mang danh nghĩa của tình yêu,", "Thật hạnh phúc biết bao trong ngày này,", "Em đến vì chúng ta,", "Hy vọng chúng ta may mắn có được vinh dự,", "Mời từng người thân yêu nhận được thiệp hồng,", "Cùng chứng kiến quyết định quan trọng nhất đời của đôi uyên ương."] },
  { id: "CoZzzPNd11", kind: "countdown", style: { top: "7534.25px", left: "46px", width: "405.882px", height: "101.471px" }, direction: "up", delay: 0.3 },
  { id: "SScDhzJ_y2", kind: "photo", style: { top: "7704.92px", left: "20px", width: "458.6px", height: "220.772px" }, direction: "up", delay: 0.2, src: `${R}/t3-19-SScDhzJ_y2.png` },
  { id: "vOiE_aGTaz", kind: "photo", style: { top: "7934px", left: "20px", width: "275.3px", height: "439.685px" }, direction: "up", delay: 0.2, src: `${R}/t3-07-vOiE_aGTaz.jpg` },
  { id: "quEu9EW1xf", kind: "photo", style: { top: "7968.03px", left: "318.041px", width: "151px", height: "328.655px" }, direction: "left", delay: 0.2, src: `${R}/t3-04-quEu9EW1xf.png` },
  { id: "UXCDB6PWRE", kind: "text", style: { top: "8491.09px", left: "23.25px", width: "454.1px" }, direction: "up", delay: 0, cls: "t3n-tx31", lines: ["Những vì sao là lá thư tình Ngân Hà gửi đến Mặt Trăng,", "Còn em là món quà tuyệt diệu mà thế gian dành tặng cho anh."] },
  { id: "wE-BHZyrxb", kind: "text", style: { top: "8426.08px", left: "42.3px", width: "412.8px" }, direction: "up", delay: 0, cls: "t3n-tx32", lines: ["Stars are love letters from the Milky way to the Moon", "you are a gift from the world to me."] },
  { id: "pVPtedu78D", kind: "photo", style: { top: "8586px", left: "20px", width: "458.6px", height: "685.055px" }, direction: "up", delay: 0.2, src: `${R}/t3-24-pVPtedu78D.jpg` },
  { id: "ZRkNlFV8FZ", kind: "text", style: { top: "8594px", left: "30.1px", width: "159.8px" }, direction: "right", delay: 0, cls: "t3n-tx33", lines: ["2025/03/25", "Thời gian: 16:00"] },
  { id: "Io7t7NrL5Z", kind: "calendar", style: { top: "8960.36px", left: "161.2px", width: "300px", height: "280px" }, direction: "up", delay: 0.3 },
  { id: "cdqub8qRgh", kind: "text", style: { top: "9299.42px", left: "50.504px", width: "404.5px" }, direction: "up", delay: 0, cls: "t3n-tx34", lines: ["\"Gặp được em là điều may mắn nhất", "Nguyện dành trọn đời này chỉ để yêu em\""] },
  { id: "KfV4u6pHMD", kind: "text", style: { top: "9432.93px", left: "164.204px", width: "175px" }, direction: "up", delay: 0, cls: "t3n-tx35", lines: ["Địa điểm"] },
  { id: "-azS9asokz", kind: "photo", style: { top: "9816.39px", left: "0.15px", width: "499.9px", height: "575.695px" }, direction: "up", delay: 0.2, src: `${R}/t3-26--azS9asokz.jpg` },
  { id: "dgGJ3qXzHx", kind: "text", style: { top: "10509.7px", left: "10px", width: "479.992px" }, direction: "up", delay: 0, cls: "t3n-tx36", lines: ["Nếu có thời gian, hãy chuẩn bị một tâm trạng thật vui vẻ và một chiếc bụng thật đói, rồi đến chung vui cùng chúng tớ nha!"] },
  { id: "Us0EcWv6kG", kind: "text", style: { top: "10597.1px", left: "10px", width: "479.992px" }, direction: "up", delay: 0, cls: "t3n-tx36", lines: ["Lễ cưới chắc chắn sẽ rất bận rộn, nếu có điều gì tiếp đón chưa chu đáo, mong bạn thông cảm. Dù vậy, chỉ cần có bạn ở đây, ngày vui của chúng tớ sẽ càng thêm trọn vẹn."] },
  { id: "OV8yqY-7IC", kind: "text", style: { top: "10710px", left: "9.012px", width: "479.992px" }, direction: "up", delay: 0, cls: "t3n-tx36", lines: ["Còn nếu bạn đang ở xa hoặc bận rộn không thể đến dự, cũng đừng lo! Chúng tớ đã nhận được những lời chúc phúc ấm áp từ bạn rồi. Chúc bạn vạn sự như ý, và mong rằng sớm có dịp gặp lại!"] },
  { id: "jf4gb28Vip", kind: "text", style: { top: "10858.6px", left: "16.2px", width: "479.992px" }, direction: "up", delay: 0, cls: "t3n-tx37", lines: ["Hẹn gặp bạn trong ngày cưới nha~ ❤️"] },
  { id: "rTEv19qpO9", kind: "text", style: { top: "10933.1px", left: "157.2px", width: "188.8px" }, direction: "up", delay: 0, cls: "t3n-tx38", lines: ["Thankyou"] },
  { id: "2sS9X9N4-W", kind: "photo", style: { top: "10425px", left: "166px", width: "168px", height: "46px" }, direction: "up", delay: 0.2, src: `${R}/t3-03-2sS9X9N4-W.png` },
  { id: "o_EZXAmy-_", kind: "text", style: { top: "17.3635px", left: "12.804px", width: "317.8px" }, direction: "up", delay: 0, cls: "t3n-tx39", lines: ["We're getting married! ! !"] },
  { id: "eJj9pJrLAL", kind: "text", style: { top: "1257.94px", left: "16.25px", width: "173.6px" }, direction: "right", delay: 0, cls: "t3n-tx40", lines: ["\"Tình yêu khẽ đến mà chẳng biết từ đâu,", "Nhưng mỗi ngày một đậm sâu,", "mà chẳng có điểm dừng.\""] },
  { id: "u-lAgDLoKM", kind: "text", style: { top: "9494.44px", left: "48.1px", width: "410px" }, direction: "up", delay: 0, cls: "t3n-tx41", lines: ["Cinelove Palace, Tay Ho, Hanoi"] },
  { id: "2OWXzY8AiX", kind: "photo", style: { top: "1885.2px", left: "210.1px", width: "95.6px", height: "91.6167px" }, direction: "up", delay: 0.2, src: `${R}/t3-00-2OWXzY8AiX.png` },
  { id: "mCP2RekQvD", kind: "photo", style: { top: "2202.93px", left: "233.9px", width: "48px", height: "44.8571px" }, direction: "up", delay: 0.2, src: `${R}/t3-02-mCP2RekQvD.png` },
  { id: "HCeIO6cJ8I", kind: "map", style: { top: "9530.33px", left: "28.4px", width: "449.6px", height: "275.505px" }, direction: "up", delay: 0.3 },
];
const MAP_SRC = "https://maps.google.com/maps?q=52%20Mi%E1%BA%BFu%20%C4%90%E1%BA%A7m%2C%20M%E1%BB%85%20Tr%C3%AC%2C%20Nam%20T%E1%BB%AB%20Li%C3%AAm%2C%20H%C3%A0%20N%E1%BB%99i&t=&z=14&ie=UTF8&iwloc=&output=embed";

function NodeContent({ node, count }) {
  if (node.kind === "photo") {
    return (
      <div className="t3n-photo" style={{ backgroundImage: `url(${node.src})` }} />
    );
  }
  if (node.kind === "blank") return null;
  if (node.kind === "text") {
    return (
      <div className={`t3n-textwrap ${node.cls}`}>
        {node.lines.map((line, index) => (
          <p key={`${node.id}-${index}`}>{line}</p>
        ))}
      </div>
    );
  }
  if (node.kind === "countdown") return <Countdown values={count} className="t3n-countdown" />;
  if (node.kind === "calendar") {
    return (
      <div className="t3n-cal">
        <div className="template-three">
          {CAL_EMPTY.map((key) => (
            <div key={key} className="empty"><div /></div>
          ))}
          {CAL_DAYS.map((day) => (
            <div key={day}>
              {day === 25 && <img className="heart-date" src="/assets/template3-ref/calen-heart.png" alt="" />}
              <div className={day === 25 ? "colorF" : undefined}>{day}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (node.kind === "map") {
    return (
      <div className="t3n-map">
        <iframe title="map" width="100%" height="100%" frameBorder="0" src={MAP_SRC} allowFullScreen />
      </div>
    );
  }
  return null;
}

export default function Template3New() {
  const count = useInvitationPage("template3new-page", "2025-03-25T16:00:00+07:00");

  return (
    <main className="new-invitation-page t3n">
      <MusicButton className="t3n-music" />

      <div className="t3n-canvas">
        {NODES.map((node) => (
          <Reveal
            key={node.id}
            direction={node.direction}
            delay={node.delay}
            duration={1.3}
            className={`t3n-node t3n-${node.kind}`}
            style={node.style}
          >
            <NodeContent node={node} count={count} />
          </Reveal>
        ))}
      </div>

      <section className="t3n-extras">
        <WishForm className="t3n-wish" accent="#7b2121" />
        <GiftNote className="t3n-gift" />
      </section>
    </main>
  );
}
