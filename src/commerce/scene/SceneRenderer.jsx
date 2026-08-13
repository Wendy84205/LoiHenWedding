import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CalendarDays, Check, ChevronLeft, ChevronRight, MapPin, Music2, Pause, Send } from 'lucide-react';
import {
  invitationFontPresets, normalizeInvitationContent, normalizeInvitationTheme, resolveInvitationPalette,
} from '../invitationContent.js';
import { useRsvpSubmit, useWishSubmit } from '../CommercialInvitationContext.jsx';
import { getSceneTemplate } from './sceneTemplates.js';
import { resolveSceneDocument } from './sceneSchema.js';
import { getWeddingSticker } from './weddingStickerLibrary.js';
import './scene.css';

function getPathValue(content, path) {
  if (!path) return '';
  if (path === 'event.startsAt.date') return content.event.startsAt.slice(0, 10);
  if (path === 'event.startsAt.time') return content.event.startsAt.slice(11, 16);
  return path.split('.').reduce((value, key) => value?.[key], content) ?? '';
}

function formatDate(value, format) {
  const date = new Date(String(value).length === 10 ? `${value}T12:00:00+07:00` : value);
  if (Number.isNaN(date.getTime())) return String(value || '');
  if (format === 'date-dot') {
    return new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
      .format(date).replaceAll('/', '.');
  }
  if (format === 'date-long') {
    return new Intl.DateTimeFormat('vi-VN', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' }).format(date);
  }
  return String(value || '');
}

export function resolveSceneNodeValue(node, content) {
  if (!node.binding?.fieldPath) return node.props.text || '';
  const value = getPathValue(content, node.binding.fieldPath);
  if (node.binding.format?.startsWith('date-')) return formatDate(value, node.binding.format);
  if (node.binding.format === 'time') return String(value || '').slice(0, 5);
  return String(value ?? '');
}

function resolveSceneMedia(node, content) {
  const role = node.binding?.mediaRole;
  if (!role) return node.props.src || '';
  if (role === 'gallery') return content.media.gallery?.[0] || node.props.src || '';
  return content.media[role] || node.props.src || '';
}

function nodeVisualStyle(node, scene, rawTheme) {
  const style = node.style || {};
  const theme = normalizeInvitationTheme(rawTheme);
  const fieldStyle = node.binding?.fieldPath ? theme.textStyles[node.binding.fieldPath] || {} : {};
  const nodeOverride = scene.patch.nodeOverrides[node.id]?.style
    || (scene.patch.addedNodes.some((item) => item.id === node.id) ? style : {});
  const paletteIsCustom = theme.palette !== 'original' || Object.values(theme.colors).some(Boolean);
  const palette = resolveInvitationPalette(theme, style.color || '#9b7657');
  const globalFont = theme.font !== 'original' ? invitationFontPresets[theme.font]?.body : '';
  const fieldFont = fieldStyle.font ? invitationFontPresets[fieldStyle.font]?.heading : '';
  return {
    color: nodeOverride.color || fieldStyle.color || (paletteIsCustom ? palette.ink : style.color),
    backgroundColor: style.backgroundColor,
    fontFamily: nodeOverride.fontFamily || fieldFont || globalFont || style.fontFamily,
    fontSize: nodeOverride.fontSize ? `${nodeOverride.fontSize}px` : fieldStyle.fontSize ? `${fieldStyle.fontSize}px` : style.fontSize ? `${style.fontSize}px` : undefined,
    fontWeight: nodeOverride.fontWeight || (fieldStyle.bold ? 700 : style.fontWeight),
    fontStyle: nodeOverride.fontStyle || (fieldStyle.italic ? 'italic' : style.fontStyle),
    textDecoration: style.textDecoration,
    textTransform: style.textTransform,
    textAlign: nodeOverride.textAlign || fieldStyle.align || style.textAlign,
    lineHeight: style.lineHeight,
    letterSpacing: style.letterSpacing !== undefined ? `${style.letterSpacing}px` : undefined,
    borderRadius: style.borderRadius !== undefined ? `${style.borderRadius}px` : undefined,
    borderWidth: style.borderWidth !== undefined ? `${style.borderWidth}px` : undefined,
    borderColor: style.borderColor,
    borderStyle: style.borderStyle,
    opacity: style.opacity,
    boxShadow: style.boxShadow || undefined,
    padding: style.padding !== undefined ? `${style.padding}px` : undefined,
  };
}

function useCountdown(target) {
  const calculate = () => {
    const distance = Math.max(0, new Date(target).getTime() - Date.now());
    return {
      days: Math.floor(distance / 86400000),
      hours: Math.floor((distance / 3600000) % 24),
      minutes: Math.floor((distance / 60000) % 60),
      seconds: Math.floor((distance / 1000) % 60),
    };
  };
  const [value, setValue] = useState(() => calculate());
  useEffect(() => {
    const calculateCurrent = () => {
      const distance = Math.max(0, new Date(target).getTime() - Date.now());
      return {
        days: Math.floor(distance / 86400000),
        hours: Math.floor((distance / 3600000) % 24),
        minutes: Math.floor((distance / 60000) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      };
    };
    setValue(calculateCurrent());
    const timer = window.setInterval(() => setValue(calculateCurrent()), 1000);
    return () => window.clearInterval(timer);
  }, [target]);
  return value;
}

function SceneCalendar({ content, node }) {
  const eventDate = new Date(content.event.startsAt);
  const year = eventDate.getFullYear();
  const month = eventDate.getMonth();
  const weddingDay = eventDate.getDate();
  const days = new Date(year, month + 1, 0).getDate();
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
  const cells = [...Array(firstDay).fill(null), ...Array.from({ length: days }, (_, index) => index + 1)];
  return (
    <div className={`sceneCalendar style-${node.props.calendarStyle || 'minimal'}`}>
      <header><CalendarDays /><strong>{new Intl.DateTimeFormat('vi-VN', { month: 'long', year: 'numeric' }).format(eventDate)}</strong></header>
      <div className="sceneCalendarWeek">{['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day) => <span key={day}>{day}</span>)}</div>
      <div className="sceneCalendarGrid">{cells.map((day, index) => <span className={day === weddingDay ? 'is-wedding-day' : ''} key={`${day || 'blank'}-${index}`}>{day || ''}</span>)}</div>
    </div>
  );
}

function SceneCountdown({ content, node }) {
  const value = useCountdown(node.props.targetDate || content.event.startsAt);
  const items = [['days', 'ngày'], ['hours', 'giờ'], ['minutes', 'phút'], ['seconds', 'giây']];
  return <div className={`sceneCountdown is-${node.props.orientation || 'horizontal'}`}>{items.map(([key, label]) => <span key={key}><strong>{value[key]}</strong><small>{label}</small></span>)}</div>;
}

function SceneAlbum({ content, node, carousel = false }) {
  const sources = [content.media.couple, ...(content.media.gallery || []), content.media.bride, content.media.groom].filter(Boolean);
  const fallback = node.props.src || content.media.hero || '';
  const images = sources.length ? [...new Set(sources)].slice(0, node.props.maxItems || 12) : [fallback].filter(Boolean);
  const [active, setActive] = useState(0);
  const select = (next) => setActive((next + images.length) % images.length);
  if (!images.length) return <div className="sceneEmptyMedia">Thêm ảnh vào album</div>;
  return (
    <div className={`sceneAlbum ${carousel ? 'is-carousel' : ''}`}>
      <div className="sceneAlbumMain">
        <img src={images[active]} alt="Ảnh cưới trong album" />
        {images.length > 1 && <>
          <button type="button" onClick={(event) => { event.stopPropagation(); select(active - 1); }} aria-label="Ảnh trước"><ChevronLeft /></button>
          <button type="button" onClick={(event) => { event.stopPropagation(); select(active + 1); }} aria-label="Ảnh tiếp"><ChevronRight /></button>
        </>}
      </div>
      <div className="sceneAlbumThumbs">{images.slice(0, 6).map((src, index) => <button className={active === index ? 'is-active' : ''} type="button" onClick={(event) => { event.stopPropagation(); setActive(index); }} key={`${src}-${index}`}><img src={src} alt="" /></button>)}</div>
    </div>
  );
}

function SceneRsvp({ node, editor }) {
  const rsvp = useRsvpSubmit();
  const [form, setForm] = useState({ fullName: '', phone: '', attendance: 'yes', partySize: 1, note: '' });
  const submit = async (event) => {
    event.preventDefault();
    if (editor) return;
    await rsvp.submit(form);
  };
  return (
    <form className="sceneRsvp" onSubmit={submit} onClick={(event) => editor && event.preventDefault()}>
      <h3>{node.props.heading || 'Xác nhận tham dự'}</h3>
      {rsvp.status === 'success' ? <p className="sceneFormSuccess"><Check /> Cảm ơn bạn đã xác nhận.</p> : <>
        <input aria-label="Họ và tên" placeholder="Họ và tên" value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} required />
        <div><select aria-label="Khả năng tham dự" value={form.attendance} onChange={(event) => setForm({ ...form, attendance: event.target.value })}><option value="yes">Sẽ tham dự</option><option value="no">Không thể tham dự</option><option value="unsure">Chưa chắc chắn</option></select><input aria-label="Số người" type="number" min="0" max="20" value={form.partySize} onChange={(event) => setForm({ ...form, partySize: Number(event.target.value) })} /></div>
        <button type="submit" disabled={editor || rsvp.status === 'loading'}><Send /> {node.props.buttonLabel || 'Gửi xác nhận'}</button>
        {rsvp.error && <small role="alert">{rsvp.error}</small>}
      </>}
    </form>
  );
}

function SceneWish({ node, editor }) {
  const wish = useWishSubmit();
  const [form, setForm] = useState({ fullName: '', message: '' });
  const submit = async (event) => {
    event.preventDefault();
    if (!editor) await wish.submit(form);
  };
  return <form className="sceneRsvp sceneWish" onSubmit={submit}><h3>{node.props.heading || 'Gửi lời chúc'}</h3>{wish.status === 'success' ? <p className="sceneFormSuccess"><Check /> Lời chúc đã được gửi.</p> : <><input aria-label="Họ và tên" placeholder="Tên của bạn" value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} required /><textarea aria-label="Lời chúc" placeholder="Lời chúc" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} required /><button type="submit" disabled={editor || wish.status === 'loading'}><Send /> {node.props.buttonLabel || 'Gửi lời chúc'}</button>{wish.error && <small role="alert">{wish.error}</small>}</>}</form>;
}

function SceneParticles({ variant = 'sparkle' }) {
  return <div className={`sceneParticles is-${variant}`} aria-hidden="true">{Array.from({ length: 18 }, (_, index) => <i style={{ '--particle-index': index }} key={index} />)}</div>;
}

function SceneSticker({ node }) {
  const sticker = getWeddingSticker(node.props.sticker);
  return <span className={`sceneSticker sticker-${sticker.id}`} aria-label={node.label || sticker.label}>{sticker.glyph}</span>;
}

function SceneEnvelope({ node, content, opened, onOpen, editor }) {
  const letterImage = content.media.couple || content.media.hero || node.props.src || '';
  return (
    <button className={`sceneEnvelope ${opened ? 'is-open' : ''}`} type="button" onClick={(event) => { event.stopPropagation(); if (!editor) onOpen(); }} aria-label={node.props.heading || 'Mở thiệp'}>
      <span className="sceneEnvelopeBack" /><span className="sceneEnvelopeLetter">{letterImage ? <img src={letterImage} alt="Ảnh cặp đôi trong thiệp" /> : <b>{node.props.heading || 'Chạm để mở thiệp'}</b>}</span><span className="sceneEnvelopeFlap" /><span className="sceneEnvelopeFront" /><i>LH</i>
    </button>
  );
}

function SceneNodeContent({ node, content, editor, envelopeState }) {
  if (node.type === 'text') return <div className="sceneTextValue">{resolveSceneNodeValue(node, content)}</div>;
  if (node.type === 'image') {
    const src = resolveSceneMedia(node, content);
    return src ? <img src={src} alt={node.props.alt || ''} style={{ objectFit: node.style.objectFit || 'cover', objectPosition: `${node.style.objectPositionX ?? 50}% ${node.style.objectPositionY ?? 50}%` }} /> : <div className="sceneEmptyMedia">Thêm ảnh</div>;
  }
  if (node.type === 'shape') return node.props.shape === 'heart' ? <span className="sceneHeartShape">♥</span> : null;
  if (node.type === 'calendar') return <SceneCalendar content={content} node={node} />;
  if (node.type === 'countdown') return <SceneCountdown content={content} node={node} />;
  if (node.type === 'map') {
    const href = getPathValue(content, node.binding?.fieldPath) || node.props.mapUrl || '#';
    return <a className="sceneMapButton" href={editor ? undefined : href} target="_blank" rel="noreferrer"><MapPin />{node.props.buttonLabel || 'Xem bản đồ'}</a>;
  }
  if (node.type === 'rsvp') return <SceneRsvp node={node} editor={editor} />;
  if (node.type === 'wish') return <SceneWish node={node} editor={editor} />;
  if (node.type === 'giftQr') {
    const src = content.media.giftQr || content.gift.groomQr || node.props.src;
    return src ? <img src={src} alt="QR mừng cưới" /> : <div className="sceneEmptyMedia">QR mừng cưới</div>;
  }
  if (node.type === 'album') return <SceneAlbum content={content} node={node} />;
  if (node.type === 'carousel') return <SceneAlbum content={content} node={node} carousel />;
  if (node.type === 'particle') return <SceneParticles variant={node.props.particle} />;
  if (node.type === 'sticker') return <SceneSticker node={node} />;
  if (node.type === 'envelope') return <SceneEnvelope node={node} content={content} editor={editor} {...envelopeState} />;
  return null;
}

export function SceneSurface({
  scene, content: rawContent, editor = false, selectedNodeId = '', onSelectNode, onEditNode,
  opened = true, onOpen = () => {}, replayKey = 0, theme: rawTheme,
}) {
  const content = useMemo(() => normalizeInvitationContent(rawContent), [rawContent]);
  const theme = useMemo(() => normalizeInvitationTheme(rawTheme), [rawTheme]);
  const palette = useMemo(() => resolveInvitationPalette(theme, '#9b7657'), [theme]);
  const useThemeSurface = theme.palette !== 'original' || Object.values(theme.colors).some(Boolean);
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const nodes = [...root.querySelectorAll('[data-scene-animate]')];
    if (editor || !('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return undefined;
    }
    nodes.forEach((node) => node.classList.remove('is-visible'));
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [editor, replayKey, scene]);

  return (
    <div className={`sceneSurface ${editor ? 'is-editor' : 'is-public'} ${opened ? 'is-opened' : 'is-closed'}`} ref={rootRef} style={{ width: `${scene.canvas.width}px`, height: `${scene.canvas.height}px`, backgroundColor: useThemeSurface && !scene.patch.canvasOverrides.backgroundColor ? palette.surface : scene.canvas.backgroundColor }} onPointerDown={(event) => {
      if (editor && event.target === event.currentTarget) onSelectNode?.('');
    }}>
      {scene.nodes.map((node) => {
        if (node.hidden || (!opened && node.type !== 'envelope' && node.y > 1080)) return null;
        const animation = node.animation || {};
        const transform = `translate(${node.x}px, ${node.y}px) rotate(${node.rotation || 0}deg)`;
        return (
          <div
            className={`sceneNode sceneNode-${node.type} ${selectedNodeId === node.id ? 'is-selected' : ''} continuous-${animation.continuous || 'none'}`}
            data-scene-node={node.id}
            data-scene-animate={animation.entrance || 'none'}
            data-node-type={node.type}
            key={node.id}
            style={{
              width: `${node.width}px`, height: `${node.height}px`, transform, zIndex: node.zIndex,
              '--scene-duration': `${animation.duration || 0.8}s`, '--scene-delay': `${animation.delay || 0}s`,
              '--scene-easing': animation.easing || 'ease-out', pointerEvents: node.type === 'particle' ? 'none' : undefined,
            }}
            onPointerDown={(event) => {
              if (!editor || node.locked) return;
              event.stopPropagation();
              onSelectNode?.(node.id);
            }}
            onDoubleClick={(event) => {
              if (!editor || node.locked) return;
              event.stopPropagation();
              onEditNode?.(node);
            }}
          >
            <div className="sceneNodeContent" style={nodeVisualStyle(node, scene, theme)}>
              <SceneNodeContent node={node} content={content} editor={editor} envelopeState={{ opened, onOpen }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SceneMusicButton({ src }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  if (!src || src === 'none') return null;
  const toggle = async () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      try { await audioRef.current.play(); } catch { return; }
    } else audioRef.current.pause();
  };
  return <><audio ref={audioRef} src={src} loop preload="metadata" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} /><button className="sceneMusicButton" type="button" onClick={toggle} aria-label={playing ? 'Tạm dừng nhạc' : 'Phát nhạc'}>{playing ? <Pause /> : <Music2 />}</button></>;
}

export function ResponsiveSceneRenderer({ template, patch, content, theme, replayKey = 0 }) {
  const scene = useMemo(() => resolveSceneDocument(template, patch), [patch, template]);
  const frameRef = useRef(null);
  const [scale, setScale] = useState(1);
  const hasEnvelope = scene.nodes.some((node) => node.type === 'envelope');
  const [opened, setOpened] = useState(!hasEnvelope);
  const visibleHeight = opened ? scene.canvas.height : Math.min(1120, scene.canvas.height);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return undefined;
    const update = () => {
      const availableWidth = frame.getBoundingClientRect().width
        || Math.min(window.innerWidth || scene.canvas.width, scene.canvas.width);
      setScale(Math.min(1, Math.max(0.1, availableWidth / scene.canvas.width)));
    };
    update();
    window.addEventListener('resize', update);
    const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(update) : null;
    observer?.observe(frame);
    return () => {
      window.removeEventListener('resize', update);
      observer?.disconnect();
    };
  }, [scene.canvas.width]);

  return (
    <main className="sceneInvitation" ref={frameRef} style={{ height: `${visibleHeight * scale}px` }}>
      <div className="sceneScaledCanvas" style={{ width: `${scene.canvas.width}px`, height: `${visibleHeight}px`, transform: `scale(${scale})` }}>
        <SceneSurface scene={scene} content={content} theme={theme} opened={opened} onOpen={() => setOpened(true)} replayKey={replayKey} />
      </div>
      <SceneMusicButton src={content.media?.music} />
    </main>
  );
}

export default function SceneInvitationRenderer({ invitation }) {
  const template = getSceneTemplate(invitation.templateSlug);
  if (!template) return null;
  return <ResponsiveSceneRenderer template={template} patch={invitation.design} content={invitation.content} theme={invitation.theme} />;
}
