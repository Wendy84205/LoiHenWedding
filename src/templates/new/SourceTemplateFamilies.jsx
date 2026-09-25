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
import { useInvitationContent } from '../../commerce/CommercialInvitationContext.jsx';
import './sourceTemplateFamilies.css';

const monthNames = ['THÁNG 01', 'THÁNG 02', 'THÁNG 03', 'THÁNG 04', 'THÁNG 05', 'THÁNG 06', 'THÁNG 07', 'THÁNG 08', 'THÁNG 09', 'THÁNG 10', 'THÁNG 11', 'THÁNG 12'];

function image(config, index) {
  return `/assets/new-templates/${config.slug}/image-${index}.webp`;
}

function imageCandidates(config, index) {
  return ['webp', 'jpg', 'jpeg', 'png', 'gif'].map((extension) => (
    `/assets/new-templates/${config.slug}/image-${index}.${extension}`
  ));
}

function handleImageError(event, config, index) {
  const candidates = imageCandidates(config, index);
  const current = event.currentTarget.dataset.sourceCandidate || '0';
  const next = Number(current) + 1;
  if (next >= candidates.length) return;
  event.currentTarget.dataset.sourceCandidate = String(next);
  event.currentTarget.src = candidates[next];
}

function sourceImageProps(config, index) {
  return {
    src: image(config, index),
    onError: (event) => handleImageError(event, config, index),
  };
}

function getContentDate(config, content) {
  return content?.event?.startsAt || config.date;
}

function formatDate(config, content) {
  const date = new Date(getContentDate(config, content));
  return `${String(date.getDate()).padStart(2, '0')} · ${String(date.getMonth() + 1).padStart(2, '0')} · ${date.getFullYear()}`;
}

function monthLabel(config, content) {
  const date = new Date(getContentDate(config, content));
  return `${monthNames[date.getMonth()]} · ${date.getFullYear()}`;
}

function IntroGate({ config, content, onOpen }) {
  const { couple } = content;
  return (
    <main className={`new-invitation-page source-template stf stf-${config.family} stf-intro`} style={{ '--stf-accent': config.accent, '--stf-paper': config.paper, '--stf-ink': config.ink, '--stf-font': config.font, '--stf-script': config.script }}>
      <FallingDecor symbols={config.symbols || ['✦', '·']} count={10} />
      <Reveal className="stf-introCard" direction="scale" duration={1.05}>
        <span>WEDDING INVITATION</span>
        <h1>{couple.brideName}<i>&amp;</i>{couple.groomName}</h1>
        <p>{formatDate(config, content)}</p>
        <button type="button" onClick={onOpen}><MailOpen size={18} /> Mở thiệp</button>
      </Reveal>
    </main>
  );
}

function FamilyPage({ config, invitation, children }) {
  const [opened, setOpened] = useState(!config.intro);
  const content = useInvitationContent(invitation?.content);
  const countdown = useInvitationPage(`source-${config.slug}`, getContentDate(config, content));

  if (!opened) return <IntroGate config={config} content={content} onOpen={() => setOpened(true)} />;

  return (
    <main className={`new-invitation-page source-template stf stf-${config.family} stf-${config.slug}`} style={{ '--stf-accent': config.accent, '--stf-paper': config.paper, '--stf-ink': config.ink, '--stf-font': config.font, '--stf-script': config.script }}>
      <MusicButton className="stf-music" />
      {children(countdown, content)}
    </main>
  );
}

function DatePanel({ config, content }) {
  const date = new Date(getContentDate(config, content));
  const startsAt = content?.event?.startsAt || config.date;
  const time = new Date(startsAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  return (
    <Reveal className="stf-datePanel" direction="scale">
      <span>VÀO LÚC {time}</span>
      <strong>{String(date.getDate()).padStart(2, '0')}</strong>
      <span>{monthNames[date.getMonth()]}<br />NĂM {date.getFullYear()}</span>
    </Reveal>
  );
}

function Timeline({ compact = false, content }) {
  const schedule = content?.schedule?.length ? content.schedule.slice(0, 3) : [
    { time: '10:30', label: 'Đón tiếp khách mời' },
    { time: '10:45', label: 'Lễ thành hôn' },
    { time: '11:00', label: 'Khai tiệc' },
  ];
  const icons = [CalendarHeart, Heart, GlassWater];
  return (
    <div className={`stf-timeline ${compact ? 'is-compact' : ''}`}>
      {schedule.map((item, index) => {
        const Icon = icons[index] || GlassWater;
        return <Reveal delay={index * 0.08} key={`${item.time}-${item.label}`}><Icon /><b>{item.time}</b><span>{item.label}</span></Reveal>;
      })}
    </div>
  );
}

export function TraditionalSplitTemplate({ config, invitation }) {
  return (
    <FamilyPage config={config} invitation={invitation}>{(countdown, content) => <>
      {(() => { const { couple, copy, event } = content; return <>
      <section className="stf-tsHero">
        <FallingDecor symbols={['囍', '·', '♡']} count={12} />
        <Reveal className="stf-tsMast"><span>WE ARE GETTING MARRIED</span><b>囍</b><p>OUR WEDDING</p></Reveal>
        <Reveal as="img" direction="right" {...sourceImageProps(config, 1)} alt={`${couple.brideName} và ${couple.groomName}`} />
        <Reveal className="stf-tsNames" direction="left"><h1>{couple.groomName}<i>&amp;</i>{couple.brideName}</h1><p>{formatDate(config, content)}</p></Reveal>
      </section>
      <section className="stf-tsInvite"><Reveal><small>TRÂN TRỌNG KÍNH MỜI</small><h2>Chung vui trong ngày thành hôn</h2><p>{copy.intro}</p></Reveal><DatePanel config={config} content={content} /></section>
      <section className="stf-tsCouple"><Reveal as="img" direction="right" {...sourceImageProps(config, 2)} alt="Chân dung cô dâu chú rể" /><Reveal><span>NHÀ TRAI · NHÀ GÁI</span><h2>Hai gia đình<br />một niềm hạnh phúc</h2><VenueLink query={event.address}>Xem địa điểm tổ chức</VenueLink></Reveal></section>
      <section className="stf-tsCalendar"><WeddingCalendar month={monthLabel(config, content)} weddingDay={new Date(getContentDate(config, content)).getDate()} offset={4} /><Timeline compact content={content} /></section>
      <section className="stf-tsGallery"><Reveal as="img" direction="left" {...sourceImageProps(config, 3)} alt="Album ngày cưới" /><Reveal><h2>Our love story</h2><p>{copy.story}</p></Reveal></section>
      <section className="stf-tsFinish"><Countdown values={countdown} /><RsvpForm accent={config.accent} className={`${config.slug}-rsvp`} /><GiftNote title="Hộp quà yêu thương" /></section>
      </> })()}
    </>}</FamilyPage>
  );
}

export function IllustratedPosterTemplate({ config, invitation }) {
  return (
    <FamilyPage config={config} invitation={invitation}>{(countdown, content) => <>
      <section className="stf-ipHero"><FallingDecor symbols={config.symbols || ['♡', '✦', '·']} count={16} /><Reveal className="stf-ipHeading"><span>HAPPY WEDDING</span><h1>{content.couple.brideName}<i>&amp;</i>{content.couple.groomName}</h1><p>{formatDate(config, content)}</p></Reveal><Reveal as="img" direction="scale" {...sourceImageProps(config, 1)} alt="Minh họa cô dâu chú rể" /></section>
      <section className="stf-ipLetter"><Reveal><Sparkles /><small>GỬI ĐẾN NHỮNG NGƯỜI THƯƠNG</small><h2>Ngày vui của chúng mình</h2><p>{content.copy.intro}</p></Reveal><DatePanel config={config} content={content} /></section>
      <section className="stf-ipComic"><Reveal as="img" direction="right" {...sourceImageProps(config, 2)} alt="Khoảnh khắc tình yêu" /><Reveal as="img" direction="left" {...sourceImageProps(config, 3)} alt="Kỷ niệm của hai người" /><Reveal as="p">YOU + ME<br /><b>FOREVER</b></Reveal></section>
      <section className="stf-ipSchedule"><Reveal as="h2">The wedding day</Reveal><Timeline content={content} /><VenueLink query={content.event.address}>Mở Google Maps</VenueLink><WeddingCalendar month={monthLabel(config, content)} weddingDay={new Date(getContentDate(config, content)).getDate()} offset={4} /></section>
      <section className="stf-ipEnd"><Countdown values={countdown} /><GiftNote /><RsvpForm accent={config.accent} className={`${config.slug}-rsvp`} /><Reveal as="h2">Thank you!</Reveal></section>
    </>}</FamilyPage>
  );
}

export function DarkCinematicTemplate({ config, invitation }) {
  return (
    <FamilyPage config={config} invitation={invitation}>{(countdown, content) => <>
      <section className="stf-dcHero"><Reveal as="img" direction="scale" {...sourceImageProps(config, 1)} alt={`${content.couple.brideName} và ${content.couple.groomName}`} /><div className="stf-dcShade" /><Reveal className="stf-dcTitle"><small>AN INTIMATE WEDDING</small><h1>{content.couple.brideName}<i>&amp;</i>{content.couple.groomName}</h1><p>{formatDate(config, content)}</p></Reveal></section>
      <section className="stf-dcQuote"><Reveal as="span">01</Reveal><Reveal><h2>Vượt qua những ngày dài,<br />ta tìm thấy nhau.</h2><p>{content.copy.story}</p></Reveal></section>
      <section className="stf-dcFilm"><Reveal as="img" direction="right" {...sourceImageProps(config, 2)} alt="Khung hình cưới" /><Reveal as="img" direction="left" {...sourceImageProps(config, 3)} alt="Khoảnh khắc bên nhau" /><span>35 MM · OUR STORY</span></section>
      <section className="stf-dcEvent"><DatePanel config={config} content={content} /><Timeline compact content={content} /><VenueLink query={content.event.address}>Địa điểm tổ chức</VenueLink></section>
      <section className="stf-dcCountdown"><p>THE CELEBRATION BEGINS IN</p><Countdown values={countdown} /></section>
      <section className="stf-dcFinish"><WeddingCalendar month={monthLabel(config, content)} weddingDay={new Date(getContentDate(config, content)).getDate()} offset={4} /><RsvpForm accent={config.accent} className={`${config.slug}-rsvp`} /><GiftNote /><h2>To the moon<br />and back.</h2></section>
    </>}</FamilyPage>
  );
}

export function ModernGridTemplate({ config, invitation }) {
  return (
    <FamilyPage config={config} invitation={invitation}>{(countdown, content) => <>
      <section className="stf-mgHero"><header><span>SAVE THE DATE</span><span>{formatDate(config, content)}</span></header><Reveal className="stf-mgTitle" direction="left"><small>WEDDING</small><h1>{content.couple.brideName}<br /><i>&amp;</i> {content.couple.groomName}</h1></Reveal><Reveal as="img" direction="right" {...sourceImageProps(config, 1)} alt="Ảnh cưới" /><p>{content.copy.intro}</p></section>
      <section className="stf-mgStory"><Reveal as="span">OUR<br />STORY</Reveal><Reveal as="img" direction="left" {...sourceImageProps(config, 2)} alt="Chuyện tình yêu" /><Reveal><h2>Every frame<br />holds a promise.</h2><p>{content.copy.story}</p></Reveal></section>
      <section className="stf-mgDate"><DatePanel config={config} content={content} /><VenueLink query={content.event.address}>GET DIRECTIONS</VenueLink></section>
      <section className="stf-mgGallery"><Reveal as="img" {...sourceImageProps(config, 3)} alt="Album ảnh cưới" /><div><Camera /><span>PHOTO<br />JOURNAL</span></div></section>
      <section className="stf-mgCalendar"><Reveal as="h2">Our wedding day</Reveal><WeddingCalendar month={monthLabel(config, content)} weddingDay={new Date(getContentDate(config, content)).getDate()} offset={4} /><Timeline compact content={content} /><Countdown values={countdown} /></section>
      <section className="stf-mgEnd"><RsvpForm accent={config.accent} className={`${config.slug}-rsvp`} /><GiftNote /><Reveal as="h2">See you there.</Reveal></section>
    </>}</FamilyPage>
  );
}

export function BotanicalFrameTemplate({ config, invitation }) {
  return (
    <FamilyPage config={config} invitation={invitation}>{(countdown, content) => <>
      <section className="stf-bfHero" style={{ '--hero': `url(${image(config, 1)})` }}><FallingDecor symbols={['❀', '·', '✦']} count={15} /><Reveal className="stf-bfCard" direction="scale"><small>SAVE THE DATE</small><h1>{content.couple.brideName}<i>&amp;</i>{content.couple.groomName}</h1><p>{formatDate(config, content)}</p></Reveal></section>
      <section className="stf-bfStory"><Reveal as="img" direction="right" {...sourceImageProps(config, 2)} alt="Khoảnh khắc tự nhiên" /><Reveal><span>OUR LOVE BLOOMS</span><h2>Hoa nở đúng mùa,<br />mình gặp đúng người.</h2><p>{content.copy.intro}</p></Reveal></section>
      <section className="stf-bfInvite"><DatePanel config={config} content={content} /><VenueLink query={content.event.address}>Chỉ đường đến buổi lễ</VenueLink><Timeline compact content={content} /></section>
      <section className="stf-bfCalendar"><WeddingCalendar month={monthLabel(config, content)} weddingDay={new Date(getContentDate(config, content)).getDate()} offset={4} /><Reveal as="img" direction="left" {...sourceImageProps(config, 3)} alt="Album vườn cưới" /></section>
      <section className="stf-bfEnd"><Countdown values={countdown} /><GiftNote title="Hộp quà cưới" /><RsvpForm accent={config.accent} className={`${config.slug}-rsvp`} /><Reveal as="h2">With love.</Reveal></section>
    </>}</FamilyPage>
  );
}

export function TypographicTemplate({ config, invitation }) {
  return (
    <FamilyPage config={config} invitation={invitation}>{(countdown, content) => <>
      <section className="stf-tyHero"><header><span>WEDDING</span><span>{formatDate(config, content)}</span></header><Reveal as="img" direction="scale" {...sourceImageProps(config, 1)} alt="Chân dung cô dâu chú rể" /><Reveal className="stf-tyNames" direction="left"><h1>{content.couple.brideName}<br /><i>&amp;</i> {content.couple.groomName}</h1><p>TOGETHER IS A BEAUTIFUL PLACE TO BE</p></Reveal></section>
      <section className="stf-tyManifesto"><Reveal as="span">LOVE</Reveal><Reveal><h2>Chúng mình chọn<br />một đời đồng hành.</h2><p>{content.copy.story}</p></Reveal></section>
      <section className="stf-tyPortraits"><Reveal as="img" direction="right" {...sourceImageProps(config, 2)} alt="Ảnh cưới thứ hai" /><Reveal as="img" direction="left" {...sourceImageProps(config, 3)} alt="Ảnh cưới thứ ba" /></section>
      <section className="stf-tyEvent"><DatePanel config={config} content={content} /><WeddingCalendar month={monthLabel(config, content)} weddingDay={new Date(getContentDate(config, content)).getDate()} offset={4} /><VenueLink query={content.event.address}>LOCATION</VenueLink></section>
      <section className="stf-tyEnd"><Timeline compact content={content} /><Countdown values={countdown} /><RsvpForm accent={config.accent} className={`${config.slug}-rsvp`} /><GiftNote /><h2>Forever, from here.</h2></section>
    </>}</FamilyPage>
  );
}

export function RedPopTemplate({ config, invitation }) {
  return (
    <FamilyPage config={config} invitation={invitation}>{(countdown, content) => <>
      <section className="stf-rpHero"><FallingDecor symbols={['♥', '✦', '囍']} count={14} /><Reveal className="stf-rpCopy" direction="left"><small>WELCOME TO OUR WEDDING</small><h1>{content.couple.brideName}<i>+</i>{content.couple.groomName}</h1><p>{formatDate(config, content)}</p></Reveal><Reveal as="img" direction="right" {...sourceImageProps(config, 1)} alt="Ảnh cưới phong cách pop" /></section>
      <section className="stf-rpCam"><Reveal as="img" direction="scale" {...sourceImageProps(config, 2)} alt="Khoảnh khắc ngày cưới" /><span><Camera /> REC · OUR LOVE</span></section>
      <section className="stf-rpInvite"><Reveal><span>囍</span><h2>Trân trọng kính mời</h2><p>{content.copy.intro}</p></Reveal><DatePanel config={config} content={content} /></section>
      <section className="stf-rpSchedule"><Timeline content={content} /><VenueLink query={content.event.address}>Xem đường đi</VenueLink><Countdown values={countdown} /></section>
      <section className="stf-rpGallery"><Reveal as="img" direction="left" {...sourceImageProps(config, 3)} alt="Album tình yêu" /><WeddingCalendar month={monthLabel(config, content)} weddingDay={new Date(getContentDate(config, content)).getDate()} offset={4} /></section>
      <section className="stf-rpEnd"><GiftNote /><RsvpForm accent={config.accent} className={`${config.slug}-rsvp`} /><Reveal as="h2">Thank you!</Reveal></section>
    </>}</FamilyPage>
  );
}

export function CompactFormalTemplate({ config, invitation }) {
  return (
    <FamilyPage config={config} invitation={invitation}>{(countdown, content) => <>
      <section className="stf-cfHero"><Reveal className="stf-cfSeal" direction="scale">LH</Reveal><Reveal as="h1">{content.couple.brideName}<i>&amp;</i>{content.couple.groomName}</Reveal><p>TRÂN TRỌNG KÍNH MỜI</p><Reveal as="img" direction="up" {...sourceImageProps(config, 1)} alt="Chân dung ngày cưới" /></section>
      <section className="stf-cfFamilies"><Reveal><span>NHÀ TRAI</span><h2>{content.families.groomFather} · {content.families.groomMother}</h2><p>{content.families.groomAddress}</p></Reveal><Reveal><span>NHÀ GÁI</span><h2>{content.families.brideFather} · {content.families.brideMother}</h2><p>{content.families.brideAddress}</p></Reveal></section>
      <section className="stf-cfEvent"><DatePanel config={config} content={content} /><VenueLink query={content.event.address}>Xem địa điểm</VenueLink><p>{content.event.lunarDate}</p></section>
      <section className="stf-cfPhoto"><Reveal as="img" direction="scale" {...sourceImageProps(config, 2)} alt="Ảnh kỷ niệm" /><Countdown values={countdown} /></section>
      <section className="stf-cfDetails"><WeddingCalendar month={monthLabel(config, content)} weddingDay={new Date(getContentDate(config, content)).getDate()} offset={4} /><Timeline compact content={content} /></section>
      <section className="stf-cfEnd"><RsvpForm accent={config.accent} compact className={`${config.slug}-rsvp`} /><GiftNote title="Gửi lời chúc" /><Reveal as="h2">Cảm ơn bạn</Reveal></section>
    </>}</FamilyPage>
  );
}
