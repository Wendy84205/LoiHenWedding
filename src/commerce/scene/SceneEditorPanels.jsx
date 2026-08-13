import React, { useState } from 'react';
import {
  AlignCenter, AlignLeft, AlignRight, BringToFront, CalendarDays, Circle, Copy,
  Eye, EyeOff, GalleryHorizontal, Gift, Heart, Image, Layers3, Lock, LockOpen,
  MailOpen, MapPin, MessageSquareText, SendToBack, Sparkles, Timer, Trash2, Type, Users,
} from 'lucide-react';
import {
  makeSceneNodeId, SCENE_CONTINUOUS_EFFECTS, SCENE_EASINGS, SCENE_ENTRANCE_EFFECTS,
} from './sceneSchema.js';
import {
  DEFAULT_WEDDING_STICKER_ID, WEDDING_STICKER_CATEGORIES, getWeddingSticker,
} from './weddingStickerLibrary.js';

const fontOptions = [
  ['Cormorant Garamond, Georgia, serif', 'Cormorant Garamond'],
  ['Playfair Display, Georgia, serif', 'Playfair Display'],
  ['Great Vibes, cursive', 'Great Vibes'],
  ['Montserrat, Arial, sans-serif', 'Montserrat'],
  ['Georgia, serif', 'Georgia'],
];

const elementOptions = [
  ['text', 'Văn bản', Type], ['image', 'Hình ảnh', Image], ['shape', 'Hình khối', Circle],
  ['calendar', 'Lịch cưới', CalendarDays], ['countdown', 'Đếm ngược', Timer], ['map', 'Bản đồ', MapPin],
  ['rsvp', 'RSVP', Users], ['wish', 'Lời chúc', MessageSquareText], ['giftQr', 'QR mừng cưới', Gift],
  ['envelope', 'Phong bì', MailOpen], ['album', 'Album', GalleryHorizontal],
  ['carousel', 'Trình chiếu', GalleryHorizontal], ['particle', 'Lấp lánh', Sparkles], ['sticker', 'Nhãn dán', Heart],
];

export function createDefaultSceneNode(type, scene, options = {}) {
  const zIndex = Math.min(1000, Math.max(0, ...scene.nodes.map((node) => node.zIndex)) + 1);
  const y = Math.min(scene.canvas.height - 280, Math.max(40, options.y || 120));
  const common = {
    id: makeSceneNodeId(type), type, label: elementOptions.find((item) => item[0] === type)?.[1] || 'Thành phần',
    x: 75, y, width: 350, height: 100, rotation: 0, zIndex, locked: false, hidden: false,
    props: {}, style: { opacity: 1 },
    animation: { entrance: 'rise', duration: 0.8, delay: 0, easing: 'ease-out', continuous: 'none' },
  };
  if (type === 'text') return { ...common, props: { text: 'Nội dung mới' }, style: { ...common.style, color: '#222222', backgroundColor: 'transparent', fontFamily: fontOptions[0][0], fontSize: 30, fontWeight: 400, fontStyle: 'normal', textDecoration: 'none', textTransform: 'none', textAlign: 'center', lineHeight: 1.2, letterSpacing: 0, padding: 0, borderRadius: 0 } };
  if (type === 'image') return { ...common, height: 300, binding: { mediaRole: 'gallery' }, props: { src: options.fallbackImage || '', alt: 'Ảnh cưới' }, style: { ...common.style, backgroundColor: '#eeeeee', borderRadius: 4, borderWidth: 0, borderColor: '#ffffff', borderStyle: 'solid', objectFit: 'cover', objectPositionX: 50, objectPositionY: 50, boxShadow: '' } };
  if (type === 'shape') return { ...common, x: 125, width: 250, height: 140, props: { shape: 'rectangle' }, style: { ...common.style, backgroundColor: '#e8ddd2', borderRadius: 4, borderWidth: 0, borderColor: '#ffffff', borderStyle: 'solid', boxShadow: '' } };
  if (type === 'calendar') return { ...common, x: 40, width: 420, height: 360, props: { calendarStyle: 'heart' }, style: { ...common.style, color: '#222222', backgroundColor: '#ffffff', fontFamily: fontOptions[3][0], fontSize: 18, fontWeight: 400, textAlign: 'center', lineHeight: 1.2, letterSpacing: 0, borderRadius: 4, borderWidth: 1, borderColor: '#eeeeee', borderStyle: 'solid', padding: 12, boxShadow: '' } };
  if (type === 'countdown') return { ...common, x: 35, width: 430, height: 116, props: { orientation: 'horizontal' }, style: { ...common.style, color: '#ffffff', backgroundColor: '#222222', fontFamily: fontOptions[0][0], fontSize: 18, fontWeight: 400, textAlign: 'center', lineHeight: 1.2, letterSpacing: 0, borderRadius: 4, borderWidth: 0, borderColor: '#ffffff', borderStyle: 'solid', padding: 12, boxShadow: '' } };
  if (type === 'map') return { ...common, x: 145, width: 210, height: 56, binding: { fieldPath: 'event.mapUrl', format: 'plain' }, props: { buttonLabel: 'XEM BẢN ĐỒ', mapUrl: '' }, style: { ...common.style, color: '#ffffff', backgroundColor: '#9b7657', fontFamily: fontOptions[3][0], fontSize: 14, fontWeight: 600, textAlign: 'center', lineHeight: 1.2, letterSpacing: 0, borderRadius: 4, borderWidth: 0, borderColor: '#ffffff', borderStyle: 'solid', padding: 0, boxShadow: '' } };
  if (type === 'rsvp' || type === 'wish') return { ...common, x: 48, width: 404, height: type === 'rsvp' ? 310 : 330, props: { heading: type === 'rsvp' ? 'Xác nhận tham dự' : 'Gửi lời chúc', buttonLabel: type === 'rsvp' ? 'GỬI XÁC NHẬN' : 'GỬI LỜI CHÚC' }, style: { ...common.style, color: '#222222', backgroundColor: '#ffffff', fontFamily: fontOptions[0][0], fontSize: 18, fontWeight: 400, textAlign: 'center', lineHeight: 1.3, letterSpacing: 0, borderRadius: 4, borderWidth: 1, borderColor: '#e3ddd6', borderStyle: 'solid', padding: 24, boxShadow: '0 12px 32px #00000015' } };
  if (type === 'giftQr') return { ...common, x: 150, width: 200, height: 230, binding: { mediaRole: 'giftQr' }, props: { src: '', heading: 'QR mừng cưới' }, style: { ...common.style, color: '#222222', backgroundColor: '#ffffff', objectFit: 'contain', objectPositionX: 50, objectPositionY: 50, borderRadius: 4, borderWidth: 1, borderColor: '#eeeeee', borderStyle: 'solid', padding: 12, boxShadow: '' } };
  if (type === 'envelope') return { ...common, x: 85, width: 330, height: 210, props: { heading: 'Chạm để mở thiệp', lockedUntilOpen: true }, style: { ...common.style, color: '#2b2927', backgroundColor: '#e7ded1', fontFamily: fontOptions[0][0], fontSize: 24, fontWeight: 400, textAlign: 'center', lineHeight: 1.2, letterSpacing: 0, borderRadius: 4, borderWidth: 0, borderColor: '#ffffff', borderStyle: 'solid', boxShadow: '0 18px 35px #00000022' } };
  if (type === 'album' || type === 'carousel') return { ...common, x: 24, width: 452, height: 520, props: { maxItems: 12, columns: 3 }, style: { ...common.style, color: '#ffffff', backgroundColor: '#7b1519', borderRadius: 3, borderWidth: 0, borderColor: '#ffffff', borderStyle: 'solid', padding: 14, boxShadow: '', objectFit: 'cover', objectPositionX: 50, objectPositionY: 50 } };
  if (type === 'particle') return { ...common, x: 0, y: 0, width: 500, height: Math.min(780, scene.canvas.height), zIndex: 900, locked: true, props: { particle: 'sparkle' }, style: { ...common.style, backgroundColor: 'transparent' }, animation: { ...common.animation, entrance: 'fade' } };
  if (type === 'sticker') return { ...common, x: 190, width: 120, height: 120, label: 'Nhãn dán trái tim', props: { sticker: DEFAULT_WEDDING_STICKER_ID }, style: { ...common.style, color: '#b3184b', backgroundColor: 'transparent', fontSize: 88, borderRadius: 0, borderWidth: 0, borderColor: '#ffffff', borderStyle: 'solid', boxShadow: '' }, animation: { ...common.animation, entrance: 'zoom', continuous: 'pulse' } };
  return common;
}

function NumberField({ label, value, min, max, onChange }) {
  return <label className="sceneInspectorNumber"><span>{label}</span><input aria-label={label} type="number" value={Math.round(value * 100) / 100} min={min} max={max} onChange={(event) => onChange(Number(event.target.value))} /></label>;
}

export function SceneElementsPanel({ scene, onAdd }) {
  const [activeStickerCategory, setActiveStickerCategory] = useState(WEDDING_STICKER_CATEGORIES[0].id);
  const category = WEDDING_STICKER_CATEGORIES.find((item) => item.id === activeStickerCategory) || WEDDING_STICKER_CATEGORIES[0];
  const addSticker = (sticker) => {
    const node = createDefaultSceneNode('sticker', scene);
    onAdd({ ...node, label: `Nhãn dán ${sticker.label.toLowerCase()}`, props: { ...node.props, sticker: sticker.id }, style: { ...node.style, color: sticker.color } });
  };
  return <section className="sceneElementsPanel"><header><Sparkles /><div><small>THÀNH PHẦN</small><strong>Thêm vào thiệp</strong></div></header><div className="sceneElementGrid">{elementOptions.map(([type, label, Icon]) => <button type="button" onClick={() => onAdd(createDefaultSceneNode(type, scene))} key={type}><Icon /><span>{label}</span></button>)}</div><section className="sceneStickerShelf"><header><Heart /><span>THƯ VIỆN STICKER</span></header><div className="sceneStickerCategories" role="tablist" aria-label="Nhóm sticker cưới">{WEDDING_STICKER_CATEGORIES.map((item) => <button type="button" role="tab" aria-selected={category.id === item.id} onClick={() => setActiveStickerCategory(item.id)} key={item.id}>{item.label}</button>)}</div><p>{category.description}</p><div className="sceneStickerGrid">{category.stickers.map((sticker) => <button type="button" onClick={() => addSticker(sticker)} key={sticker.id} title={`Thêm ${sticker.label}`} aria-label={`Thêm sticker ${sticker.label}`}><b style={{ color: sticker.color }}>{sticker.glyph}</b><span>{sticker.label}</span></button>)}</div></section></section>;
}

export function SceneLayerPanel({ scene, selectedNodeId, onSelect, onPatch }) {
  return <section className="sceneLayerPanel"><header><Layers3 /><div><small>LỚP THIẾT KẾ</small><strong>{scene.nodes.length} thành phần</strong></div></header><div className="sceneLayerList">{[...scene.nodes].sort((left, right) => right.zIndex - left.zIndex).map((node) => <article className={node.id === selectedNodeId ? 'is-selected' : ''} key={node.id}><button type="button" onClick={() => onSelect(node.id)}><span className={`sceneLayerType type-${node.type}`}>{node.type === 'text' ? <Type /> : node.type === 'image' ? <Image /> : node.type === 'shape' ? <Circle /> : <Sparkles />}</span><span><strong>{node.label}</strong><small>{node.type}</small></span></button><button type="button" onClick={() => onPatch(node.id, { hidden: !node.hidden })} aria-label={node.hidden ? `Hiện ${node.label}` : `Ẩn ${node.label}`} title={node.hidden ? 'Hiện' : 'Ẩn'}>{node.hidden ? <EyeOff /> : <Eye />}</button><button type="button" onClick={() => onPatch(node.id, { locked: !node.locked })} aria-label={node.locked ? `Mở khóa ${node.label}` : `Khóa ${node.label}`} title={node.locked ? 'Mở khóa' : 'Khóa'}>{node.locked ? <Lock /> : <LockOpen />}</button></article>)}</div></section>;
}

export function SceneNodeInspector({ scene, node, onPatch, onDelete, onDuplicate, onEditBinding }) {
  if (!node) return <section className="sceneEmptyInspector"><Layers3 /><h2>Chọn một thành phần</h2><p>Bấm trực tiếp trên thiệp hoặc chọn trong danh sách lớp.</p></section>;
  const update = (value) => onPatch(node.id, value);
  const style = node.style || {};
  const animation = node.animation || {};
  const maxZ = Math.max(...scene.nodes.map((item) => item.zIndex));
  const minZ = Math.min(...scene.nodes.map((item) => item.zIndex));
  return <div className="sceneNodeInspector">
    <section><header><div><small>{node.type.toUpperCase()}</small><h2>{node.label}</h2></div><div><button type="button" onClick={() => onDuplicate(node.id)} aria-label="Nhân bản" title="Nhân bản"><Copy /></button><button type="button" onClick={() => update({ locked: !node.locked })} aria-label={node.locked ? 'Mở khóa' : 'Khóa'} title={node.locked ? 'Mở khóa' : 'Khóa'}>{node.locked ? <Lock /> : <LockOpen />}</button><button type="button" onClick={() => onDelete(node.id)} aria-label="Xóa" title="Xóa"><Trash2 /></button></div></header></section>
    <section><h3>Vị trí và kích thước</h3><div className="sceneTransformGrid"><NumberField label="X" value={node.x} min={-node.width} max={scene.canvas.width} onChange={(x) => update({ x })} /><NumberField label="Y" value={node.y} min={-node.height} max={scene.canvas.height} onChange={(y) => update({ y })} /><NumberField label="Rộng" value={node.width} min={1} max={1000} onChange={(width) => update({ width })} /><NumberField label="Cao" value={node.height} min={1} max={scene.canvas.height} onChange={(height) => update({ height })} /><NumberField label="Xoay" value={node.rotation} min={-360} max={360} onChange={(rotation) => update({ rotation })} /></div><div className="sceneLayerActions"><button type="button" onClick={() => update({ zIndex: Math.min(1000, maxZ + 1) })}><BringToFront /> Đưa lên trên</button><button type="button" onClick={() => update({ zIndex: Math.max(-100, minZ - 1) })}><SendToBack /> Đưa xuống dưới</button></div></section>
    {node.type === 'text' && <section><h3>Nội dung và kiểu chữ</h3>{node.binding?.fieldPath ? <button className="sceneBoundField" type="button" onClick={() => onEditBinding(node)}><Type /><span><strong>Nội dung liên kết</strong><small>{node.binding.fieldPath}</small></span></button> : <label><span>Nội dung</span><textarea value={node.props.text || ''} onChange={(event) => update({ props: { text: event.target.value } })} maxLength="4000" rows="4" /></label>}<label><span>Font</span><select value={style.fontFamily || fontOptions[0][0]} onChange={(event) => update({ style: { fontFamily: event.target.value } })}>{fontOptions.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label><div className="sceneStyleRow"><NumberField label="Cỡ chữ" value={style.fontSize || 24} min={8} max={160} onChange={(fontSize) => update({ style: { fontSize } })} /><label><span>Màu</span><input type="color" value={style.color || '#222222'} onChange={(event) => update({ style: { color: event.target.value } })} /></label></div><div className="sceneTextButtons"><button className={style.textAlign === 'left' ? 'is-active' : ''} type="button" onClick={() => update({ style: { textAlign: 'left' } })} title="Căn trái"><AlignLeft /></button><button className={style.textAlign === 'center' ? 'is-active' : ''} type="button" onClick={() => update({ style: { textAlign: 'center' } })} title="Căn giữa"><AlignCenter /></button><button className={style.textAlign === 'right' ? 'is-active' : ''} type="button" onClick={() => update({ style: { textAlign: 'right' } })} title="Căn phải"><AlignRight /></button><button className={style.fontWeight >= 600 ? 'is-active' : ''} type="button" onClick={() => update({ style: { fontWeight: style.fontWeight >= 600 ? 400 : 700 } })}>B</button><button className={style.fontStyle === 'italic' ? 'is-active' : ''} type="button" onClick={() => update({ style: { fontStyle: style.fontStyle === 'italic' ? 'normal' : 'italic' } })}>I</button></div></section>}
    {(node.type === 'image' || node.type === 'giftQr') && <section><h3>Hiển thị ảnh</h3><label><span>Khung ảnh</span><select value={style.objectFit || 'cover'} onChange={(event) => update({ style: { objectFit: event.target.value } })}><option value="cover">Lấp đầy</option><option value="contain">Hiện toàn bộ</option><option value="fill">Kéo vừa khung</option></select></label><label><span>Lấy nét ngang <b>{style.objectPositionX ?? 50}%</b></span><input aria-label="Lấy nét ngang" type="range" min="0" max="100" value={style.objectPositionX ?? 50} onChange={(event) => update({ style: { objectPositionX: Number(event.target.value) } })} /></label><label><span>Lấy nét dọc <b>{style.objectPositionY ?? 50}%</b></span><input aria-label="Lấy nét dọc" type="range" min="0" max="100" value={style.objectPositionY ?? 50} onChange={(event) => update({ style: { objectPositionY: Number(event.target.value) } })} /></label></section>}
    {node.type === 'shape' && <section><h3>Hình khối</h3><label><span>Kiểu</span><select value={node.props.shape || 'rectangle'} onChange={(event) => update({ props: { shape: event.target.value } })}><option value="rectangle">Chữ nhật</option><option value="circle">Tròn</option><option value="line">Đường kẻ</option><option value="heart">Trái tim</option></select></label><label><span>Màu nền</span><input type="color" value={style.backgroundColor || '#e8ddd2'} onChange={(event) => update({ style: { backgroundColor: event.target.value } })} /></label></section>}
    {node.type === 'sticker' && <section><h3>Nhãn dán</h3><label><span>Kiểu nhãn dán</span><select value={node.props.sticker || DEFAULT_WEDDING_STICKER_ID} onChange={(event) => { const sticker = getWeddingSticker(event.target.value); update({ props: { sticker: sticker.id }, style: { color: sticker.color } }); }}>{WEDDING_STICKER_CATEGORIES.map((category) => <optgroup label={category.label} key={category.id}>{category.stickers.map((sticker) => <option value={sticker.id} key={sticker.id}>{sticker.label}</option>)}</optgroup>)}</select></label><div className="sceneStyleRow"><NumberField label="Kích thước" value={style.fontSize || 88} min={24} max={160} onChange={(fontSize) => update({ style: { fontSize } })} /><label><span>Màu nhãn dán</span><input type="color" value={style.color || '#b3184b'} onChange={(event) => update({ style: { color: event.target.value } })} /></label></div></section>}
    <section><h3>Khung và độ trong suốt</h3><label><span>Trong suốt <b>{Math.round((style.opacity ?? 1) * 100)}%</b></span><input type="range" min="0" max="1" step="0.01" value={style.opacity ?? 1} onChange={(event) => update({ style: { opacity: Number(event.target.value) } })} /></label><label><span>Bo góc <b>{style.borderRadius || 0}px</b></span><input type="range" min="0" max="100" value={style.borderRadius || 0} onChange={(event) => update({ style: { borderRadius: Number(event.target.value) } })} /></label></section>
    <section><h3>Hiệu ứng</h3><label><span>Xuất hiện</span><select value={animation.entrance || 'none'} onChange={(event) => update({ animation: { entrance: event.target.value } })}>{SCENE_ENTRANCE_EFFECTS.map((value) => <option value={value} key={value}>{value}</option>)}</select></label><div className="sceneStyleRow"><NumberField label="Thời gian" value={animation.duration || 0.8} min={0.1} max={5} onChange={(duration) => update({ animation: { duration } })} /><NumberField label="Trễ" value={animation.delay || 0} min={0} max={3} onChange={(delay) => update({ animation: { delay } })} /></div><label><span>Chuyển động liên tục</span><select value={animation.continuous || 'none'} onChange={(event) => update({ animation: { continuous: event.target.value } })}>{SCENE_CONTINUOUS_EFFECTS.map((value) => <option value={value} key={value}>{value}</option>)}</select></label><label><span>Easing</span><select value={animation.easing || 'ease-out'} onChange={(event) => update({ animation: { easing: event.target.value } })}>{SCENE_EASINGS.map((value) => <option value={value} key={value}>{value}</option>)}</select></label></section>
  </div>;
}

export function SceneHeartIcon() {
  return <Heart />;
}
