import React, { useState } from 'react';
import { CalendarHeart, Camera, GlassWater, Heart, MailOpen, Sparkles } from 'lucide-react';
import {
  Countdown,
  FallingDecor,
  GiftNote,
  MusicButton,
  Reveal,
  RsvpForm,
  VenueLink,
  WeddingCalendar,
  useInvitationPage,
} from './NewInvitationCommon.jsx';
import './sourceTemplateFamilies.css';

const monthNames = ['THÁNG 01', 'THÁNG 02', 'THÁNG 03', 'THÁNG 04', 'THÁNG 05', 'THÁNG 06', 'THÁNG 07', 'THÁNG 08', 'THÁNG 09', 'THÁNG 10', 'THÁNG 11', 'THÁNG 12'];

function image(config, index) {
  return `/assets/new-templates/${config.slug}/image-${index}.webp`;
}

function formatDate(config) {
  const date = new Date(config.date);
  return `${String(date.getDate()).padStart(2, '0')} · ${String(date.getMonth() + 1).padStart(2, '0')} · ${date.getFullYear()}`;
}

function monthLabel(config) {
  return `${monthNames[new Date(config.date).getMonth()]} · ${new Date(config.date).getFullYear()}`;
}

function IntroGate({ config, onOpen }) {
  return (
    <main className={`new-invitation-page source-template stf stf-${config.family} stf-intro`} style={{ '--stf-accent': config.accent, '--stf-paper': config.paper, '--stf-ink': config.ink, '--stf-font': config.font, '--stf-script': config.script }}>
      <FallingDecor symbols={config.symbols || ['✦', '·']} count={10} />
      <Reveal className="stf-introCard" direction="scale" duration={1.05}>
        <span>WEDDING INVITATION</span>
        <h1>{config.bride}<i>&amp;</i>{config.groom}</h1>
        <p>{formatDate(config)}</p>
        <button type="button" onClick={onOpen}><MailOpen size={18} /> Mở thiệp</button>
      </Reveal>
    </main>
  );
}

function FamilyPage({ config, children }) {
  const [opened, setOpened] = useState(!config.intro);
  const countdown = useInvitationPage(`source-${config.slug}`, config.date);

  if (!opened) return <IntroGate config={config} onOpen={() => setOpened(true)} />;

  return (
    <main className={`new-invitation-page source-template stf stf-${config.family} stf-${config.slug}`} style={{ '--stf-accent': config.accent, '--stf-paper': config.paper, '--stf-ink': config.ink, '--stf-font': config.font, '--stf-script': config.script }}>
      <MusicButton className="stf-music" />
      {children(countdown)}
    </main>
  );
}

function DatePanel({ config }) {
  const date = new Date(config.date);
  return (
    <Reveal className="stf-datePanel" direction="scale">
      <span>VÀO LÚC 10:30</span>
      <strong>{String(date.getDate()).padStart(2, '0')}</strong>
      <span>{monthNames[date.getMonth()]}<br />NĂM {date.getFullYear()}</span>
    </Reveal>
  );
}

function Timeline({ compact = false }) {
  return (
    <div className={`stf-timeline ${compact ? 'is-compact' : ''}`}>
      <Reveal><CalendarHeart /><b>10:30</b><span>Đón tiếp khách mời</span></Reveal>
      <Reveal delay={0.08}><Heart /><b>10:45</b><span>Lễ thành hôn</span></Reveal>
      <Reveal delay={0.16}><GlassWater /><b>11:00</b><span>Khai tiệc</span></Reveal>
    </div>
  );
}

export function TraditionalSplitTemplate({ config }) {
  return (
    <FamilyPage config={config}>{(countdown) => <>
      <section className="stf-tsHero">
        <FallingDecor symbols={['囍', '·', '♡']} count={12} />
        <Reveal className="stf-tsMast"><span>WE ARE GETTING MARRIED</span><b>囍</b><p>OUR WEDDING</p></Reveal>
        <Reveal as="img" direction="right" src={image(config, 1)} alt={`${config.bride} và ${config.groom}`} />
        <Reveal className="stf-tsNames" direction="left"><h1>{config.groom}<i>&amp;</i>{config.bride}</h1><p>{formatDate(config)}</p></Reveal>
      </section>
      <section className="stf-tsInvite"><Reveal><small>TRÂN TRỌNG KÍNH MỜI</small><h2>Chung vui trong ngày thành hôn</h2><p>Sự hiện diện của bạn là niềm vui và món quà ý nghĩa nhất đối với gia đình chúng mình.</p></Reveal><DatePanel config={config} /></section>
      <section className="stf-tsCouple"><Reveal as="img" direction="right" src={image(config, 2)} alt="Chân dung cô dâu chú rể" /><Reveal><span>NHÀ TRAI · NHÀ GÁI</span><h2>Hai gia đình<br />một niềm hạnh phúc</h2><VenueLink query="Hoang Mai, Ha Noi">Xem địa điểm tổ chức</VenueLink></Reveal></section>
      <section className="stf-tsCalendar"><WeddingCalendar month={monthLabel(config)} weddingDay={new Date(config.date).getDate()} offset={4} /><Timeline compact /></section>
      <section className="stf-tsGallery"><Reveal as="img" direction="left" src={image(config, 3)} alt="Album ngày cưới" /><Reveal><h2>Our love story</h2><p>Giữa rất nhiều cuộc gặp gỡ, chúng mình đã chọn ở lại và cùng nhau viết tiếp câu chuyện này.</p></Reveal></section>
      <section className="stf-tsFinish"><Countdown values={countdown} /><RsvpForm accent={config.accent} className={`${config.slug}-rsvp`} /><GiftNote title="Hộp quà yêu thương" /></section>
    </>}</FamilyPage>
  );
}

export function IllustratedPosterTemplate({ config }) {
  return (
    <FamilyPage config={config}>{(countdown) => <>
      <section className="stf-ipHero"><FallingDecor symbols={config.symbols || ['♡', '✦', '·']} count={16} /><Reveal className="stf-ipHeading"><span>HAPPY WEDDING</span><h1>{config.bride}<i>&amp;</i>{config.groom}</h1><p>{formatDate(config)}</p></Reveal><Reveal as="img" direction="scale" src={image(config, 1)} alt="Minh họa cô dâu chú rể" /></section>
      <section className="stf-ipLetter"><Reveal><Sparkles /><small>GỬI ĐẾN NHỮNG NGƯỜI THƯƠNG</small><h2>Ngày vui của chúng mình</h2><p>Mời bạn đến chứng kiến khoảnh khắc hai chúng mình chính thức về chung một nhà.</p></Reveal><DatePanel config={config} /></section>
      <section className="stf-ipComic"><Reveal as="img" direction="right" src={image(config, 2)} alt="Khoảnh khắc tình yêu" /><Reveal as="img" direction="left" src={image(config, 3)} alt="Kỷ niệm của hai người" /><Reveal as="p">YOU + ME<br /><b>FOREVER</b></Reveal></section>
      <section className="stf-ipSchedule"><Reveal as="h2">The wedding day</Reveal><Timeline /><VenueLink query="Ha Noi">Mở Google Maps</VenueLink><WeddingCalendar month={monthLabel(config)} weddingDay={new Date(config.date).getDate()} offset={4} /></section>
      <section className="stf-ipEnd"><Countdown values={countdown} /><GiftNote /><RsvpForm accent={config.accent} className={`${config.slug}-rsvp`} /><Reveal as="h2">Thank you!</Reveal></section>
    </>}</FamilyPage>
  );
}

export function DarkCinematicTemplate({ config }) {
  return (
    <FamilyPage config={config}>{(countdown) => <>
      <section className="stf-dcHero"><Reveal as="img" direction="scale" src={image(config, 1)} alt={`${config.bride} và ${config.groom}`} /><div className="stf-dcShade" /><Reveal className="stf-dcTitle"><small>AN INTIMATE WEDDING</small><h1>{config.bride}<i>&amp;</i>{config.groom}</h1><p>{formatDate(config)}</p></Reveal></section>
      <section className="stf-dcQuote"><Reveal as="span">01</Reveal><Reveal><h2>Vượt qua những ngày dài,<br />ta tìm thấy nhau.</h2><p>Không cần một câu chuyện hoàn hảo, chỉ cần có người cùng mình đi đến cuối hành trình.</p></Reveal></section>
      <section className="stf-dcFilm"><Reveal as="img" direction="right" src={image(config, 2)} alt="Khung hình cưới" /><Reveal as="img" direction="left" src={image(config, 3)} alt="Khoảnh khắc bên nhau" /><span>35 MM · OUR STORY</span></section>
      <section className="stf-dcEvent"><DatePanel config={config} /><Timeline compact /><VenueLink query="Ha Noi">Địa điểm tổ chức</VenueLink></section>
      <section className="stf-dcCountdown"><p>THE CELEBRATION BEGINS IN</p><Countdown values={countdown} /></section>
      <section className="stf-dcFinish"><WeddingCalendar month={monthLabel(config)} weddingDay={new Date(config.date).getDate()} offset={4} /><RsvpForm accent={config.accent} className={`${config.slug}-rsvp`} /><GiftNote /><h2>To the moon<br />and back.</h2></section>
    </>}</FamilyPage>
  );
}

export function ModernGridTemplate({ config }) {
  return (
    <FamilyPage config={config}>{(countdown) => <>
      <section className="stf-mgHero"><header><span>SAVE THE DATE</span><span>{formatDate(config)}</span></header><Reveal className="stf-mgTitle" direction="left"><small>WEDDING</small><h1>{config.bride}<br /><i>&amp;</i> {config.groom}</h1></Reveal><Reveal as="img" direction="right" src={image(config, 1)} alt="Ảnh cưới" /><p>We are delighted to invite you to celebrate with us.</p></section>
      <section className="stf-mgStory"><Reveal as="span">OUR<br />STORY</Reveal><Reveal as="img" direction="left" src={image(config, 2)} alt="Chuyện tình yêu" /><Reveal><h2>Every frame<br />holds a promise.</h2><p>Từ những điều bình dị, chúng mình đã xây nên một tình yêu đủ lớn để gọi là mái nhà.</p></Reveal></section>
      <section className="stf-mgDate"><DatePanel config={config} /><VenueLink query="Ha Noi">GET DIRECTIONS</VenueLink></section>
      <section className="stf-mgGallery"><Reveal as="img" src={image(config, 3)} alt="Album ảnh cưới" /><div><Camera /><span>PHOTO<br />JOURNAL</span></div></section>
      <section className="stf-mgCalendar"><Reveal as="h2">Our wedding day</Reveal><WeddingCalendar month={monthLabel(config)} weddingDay={new Date(config.date).getDate()} offset={4} /><Timeline compact /><Countdown values={countdown} /></section>
      <section className="stf-mgEnd"><RsvpForm accent={config.accent} className={`${config.slug}-rsvp`} /><GiftNote /><Reveal as="h2">See you there.</Reveal></section>
    </>}</FamilyPage>
  );
}

export function BotanicalFrameTemplate({ config }) {
  return (
    <FamilyPage config={config}>{(countdown) => <>
      <section className="stf-bfHero" style={{ '--hero': `url(${image(config, 1)})` }}><FallingDecor symbols={['❀', '·', '✦']} count={15} /><Reveal className="stf-bfCard" direction="scale"><small>SAVE THE DATE</small><h1>{config.bride}<i>&amp;</i>{config.groom}</h1><p>{formatDate(config)}</p></Reveal></section>
      <section className="stf-bfStory"><Reveal as="img" direction="right" src={image(config, 2)} alt="Khoảnh khắc tự nhiên" /><Reveal><span>OUR LOVE BLOOMS</span><h2>Hoa nở đúng mùa,<br />mình gặp đúng người.</h2><p>Chúng mình rất mong được cùng bạn chia sẻ niềm hạnh phúc trong ngày đặc biệt này.</p></Reveal></section>
      <section className="stf-bfInvite"><DatePanel config={config} /><VenueLink query="Ha Noi">Chỉ đường đến buổi lễ</VenueLink><Timeline compact /></section>
      <section className="stf-bfCalendar"><WeddingCalendar month={monthLabel(config)} weddingDay={new Date(config.date).getDate()} offset={4} /><Reveal as="img" direction="left" src={image(config, 3)} alt="Album vườn cưới" /></section>
      <section className="stf-bfEnd"><Countdown values={countdown} /><GiftNote title="Hộp quà cưới" /><RsvpForm accent={config.accent} className={`${config.slug}-rsvp`} /><Reveal as="h2">With love.</Reveal></section>
    </>}</FamilyPage>
  );
}

export function TypographicTemplate({ config }) {
  return (
    <FamilyPage config={config}>{(countdown) => <>
      <section className="stf-tyHero"><header><span>WEDDING</span><span>{formatDate(config)}</span></header><Reveal as="img" direction="scale" src={image(config, 1)} alt="Chân dung cô dâu chú rể" /><Reveal className="stf-tyNames" direction="left"><h1>{config.bride}<br /><i>&amp;</i> {config.groom}</h1><p>TOGETHER IS A BEAUTIFUL PLACE TO BE</p></Reveal></section>
      <section className="stf-tyManifesto"><Reveal as="span">LOVE</Reveal><Reveal><h2>Chúng mình chọn<br />một đời đồng hành.</h2><p>Tình yêu không nằm ở những điều xa xôi, mà ở cách hai người vẫn nắm tay nhau trong những ngày rất đỗi bình thường.</p></Reveal></section>
      <section className="stf-tyPortraits"><Reveal as="img" direction="right" src={image(config, 2)} alt="Ảnh cưới thứ hai" /><Reveal as="img" direction="left" src={image(config, 3)} alt="Ảnh cưới thứ ba" /></section>
      <section className="stf-tyEvent"><DatePanel config={config} /><WeddingCalendar month={monthLabel(config)} weddingDay={new Date(config.date).getDate()} offset={4} /><VenueLink query="Ha Noi">LOCATION</VenueLink></section>
      <section className="stf-tyEnd"><Timeline compact /><Countdown values={countdown} /><RsvpForm accent={config.accent} className={`${config.slug}-rsvp`} /><GiftNote /><h2>Forever, from here.</h2></section>
    </>}</FamilyPage>
  );
}

export function RedPopTemplate({ config }) {
  return (
    <FamilyPage config={config}>{(countdown) => <>
      <section className="stf-rpHero"><FallingDecor symbols={['♥', '✦', '囍']} count={14} /><Reveal className="stf-rpCopy" direction="left"><small>WELCOME TO OUR WEDDING</small><h1>{config.bride}<i>+</i>{config.groom}</h1><p>{formatDate(config)}</p></Reveal><Reveal as="img" direction="right" src={image(config, 1)} alt="Ảnh cưới phong cách pop" /></section>
      <section className="stf-rpCam"><Reveal as="img" direction="scale" src={image(config, 2)} alt="Khoảnh khắc ngày cưới" /><span><Camera /> REC · OUR LOVE</span></section>
      <section className="stf-rpInvite"><Reveal><span>囍</span><h2>Trân trọng kính mời</h2><p>Đến dự buổi tiệc thân mật và chia vui cùng hai gia đình.</p></Reveal><DatePanel config={config} /></section>
      <section className="stf-rpSchedule"><Timeline /><VenueLink query="Ha Noi">Xem đường đi</VenueLink><Countdown values={countdown} /></section>
      <section className="stf-rpGallery"><Reveal as="img" direction="left" src={image(config, 3)} alt="Album tình yêu" /><WeddingCalendar month={monthLabel(config)} weddingDay={new Date(config.date).getDate()} offset={4} /></section>
      <section className="stf-rpEnd"><GiftNote /><RsvpForm accent={config.accent} className={`${config.slug}-rsvp`} /><Reveal as="h2">Thank you!</Reveal></section>
    </>}</FamilyPage>
  );
}

export function CompactFormalTemplate({ config }) {
  return (
    <FamilyPage config={config}>{(countdown) => <>
      <section className="stf-cfHero"><Reveal className="stf-cfSeal" direction="scale">LH</Reveal><Reveal as="h1">{config.bride}<i>&amp;</i>{config.groom}</Reveal><p>TRÂN TRỌNG KÍNH MỜI</p><Reveal as="img" direction="up" src={image(config, 1)} alt="Chân dung ngày cưới" /></section>
      <section className="stf-cfFamilies"><Reveal><span>NHÀ TRAI</span><h2>ÔNG BÀ NGUYỄN VĂN AN</h2><p>Hà Nội</p></Reveal><Reveal><span>NHÀ GÁI</span><h2>ÔNG BÀ TRẦN MINH TÂM</h2><p>Hà Nội</p></Reveal></section>
      <section className="stf-cfEvent"><DatePanel config={config} /><VenueLink query="Ha Noi">Xem địa điểm</VenueLink><p>(Tức ngày lành tháng tốt năm Đinh Mùi)</p></section>
      <section className="stf-cfPhoto"><Reveal as="img" direction="scale" src={image(config, 2)} alt="Ảnh kỷ niệm" /><Countdown values={countdown} /></section>
      <section className="stf-cfDetails"><WeddingCalendar month={monthLabel(config)} weddingDay={new Date(config.date).getDate()} offset={4} /><Timeline compact /></section>
      <section className="stf-cfEnd"><RsvpForm accent={config.accent} compact className={`${config.slug}-rsvp`} /><GiftNote title="Gửi lời chúc" /><Reveal as="h2">Cảm ơn bạn</Reveal></section>
    </>}</FamilyPage>
  );
}
