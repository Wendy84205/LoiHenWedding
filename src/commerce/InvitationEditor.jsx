import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import {
  AlignCenter, AlignLeft, AlignRight, ArrowLeft, Bold, CalendarDays, Check, Cloud,
  ExternalLink, Eye, FileText, Image, Italic,
  History as HistoryIcon, Images, Layers3, LayoutTemplate, Monitor, Music2, Plus, Redo2, RefreshCw,
  Palette, Pause, Play, RotateCcw, Send, Smartphone, Sparkles, Trash2, Type, Undo2, Upload, Users,
  VolumeX, ZoomIn, ZoomOut,
} from 'lucide-react';
import {
  deleteOrderAsset, getOrder, getOrderPreviewUrl, saveInvitationDraft,
  listInvitationVersions, restoreInvitationVersion, submitInvitationReview,
  switchInvitationTemplate, updateOrderAssetKind, uploadOrderAsset,
} from './commerceApi.js';
import { getEditorManifest } from './editorTemplateManifests.js';
import {
  commercialTemplateSlugs, invitationFontPresets, invitationPalettePresets,
  normalizeInvitationContent, normalizeInvitationTheme, resolveInvitationPalette,
} from './invitationContent.js';
import {
  getActiveInvitationMusic, getInvitationMusicAssetId, invitationMusicAssetValue,
  invitationMusicLibrary, INVITATION_MUSIC_DISABLED,
} from './invitationMusic.js';
import SceneEditorCanvas from './scene/SceneEditorCanvas.jsx';
import { SceneElementsPanel, SceneLayerPanel, SceneNodeInspector } from './scene/SceneEditorPanels.jsx';
import {
  addSceneNode, createScenePatch, deleteSceneNode, makeSceneNodeId, normalizeScenePatch,
  patchSceneNode, resolveSceneDocument,
} from './scene/sceneSchema.js';
import { getSceneTemplate } from './scene/sceneTemplates.js';
import './editor.css';

const editorTools = [
  ['elements', 'Thành phần', Plus],
  ['layers', 'Lớp', Layers3],
  ['couple', 'Văn bản', Type],
  ['media', 'Hình ảnh', Images],
  ['music', 'Âm nhạc', Music2],
  ['design', 'Phong cách', Palette],
  ['effects', 'Hiệu ứng', Sparkles],
  ['templates', 'Mẫu', LayoutTemplate],
  ['families', 'Gia đình', Users],
  ['event', 'Sự kiện', CalendarDays],
  ['story', 'Nội dung', FileText],
  ['versions', 'Lịch sử', HistoryIcon],
];

const standaloneInspectorTabs = new Set(['elements', 'layers', 'versions', 'design', 'effects', 'templates', 'music']);

const layerEffectPresets = [
  ['original', 'Nguyên bản', 'Giữ chuyển động của mẫu'],
  ['fade', 'Hiện dần', 'Nhẹ và tối giản'],
  ['rise', 'Đi lên', 'Xuất hiện từ dưới'],
  ['left', 'Từ trái', 'Trượt ngang vào khung'],
  ['right', 'Từ phải', 'Trượt ngang vào khung'],
  ['zoom', 'Thu phóng', 'Mở rộng nhẹ vào vị trí'],
];

const quickImageRoles = [
  ['hero', 'Mở đầu'], ['couple', 'Cặp đôi'], ['bride', 'Cô dâu'], ['groom', 'Chú rể'],
  ['venue', 'Địa điểm'], ['final', 'Ảnh kết'], ['gallery', 'Album'], ['gift_qr', 'QR mừng cưới'],
];

const editorFieldMeta = {
  'couple.groomName': { tab: 'couple', label: 'Tên chú rể' },
  'couple.groomFullName': { tab: 'couple', label: 'Họ tên chú rể' },
  'couple.groomBirthDate': { tab: 'couple', label: 'Ngày sinh chú rể' },
  'couple.brideName': { tab: 'couple', label: 'Tên cô dâu' },
  'couple.brideFullName': { tab: 'couple', label: 'Họ tên cô dâu' },
  'couple.brideBirthDate': { tab: 'couple', label: 'Ngày sinh cô dâu' },
  'families.groomFather': { tab: 'families', label: 'Cha chú rể' },
  'families.groomMother': { tab: 'families', label: 'Mẹ chú rể' },
  'families.groomAddress': { tab: 'families', label: 'Địa chỉ nhà trai' },
  'families.brideFather': { tab: 'families', label: 'Cha cô dâu' },
  'families.brideMother': { tab: 'families', label: 'Mẹ cô dâu' },
  'families.brideAddress': { tab: 'families', label: 'Địa chỉ nhà gái' },
  'event.startsAt.date': { tab: 'event', label: 'Ngày cưới' },
  'event.startsAt.time': { tab: 'event', label: 'Giờ cưới' },
  'event.lunarDate': { tab: 'event', label: 'Ngày âm lịch' },
  'event.venueName': { tab: 'event', label: 'Tên địa điểm' },
  'event.address': { tab: 'event', label: 'Địa chỉ tổ chức' },
  'event.mapUrl': { tab: 'event', label: 'Google Maps' },
  'copy.intro': { tab: 'story', label: 'Lời mời' },
  'copy.story': { tab: 'story', label: 'Câu chuyện' },
  'copy.quote': { tab: 'story', label: 'Trích dẫn' },
  'copy.thankYou': { tab: 'story', label: 'Lời cảm ơn' },
};

function getEditorFieldMeta(fieldPath) {
  if (editorFieldMeta[fieldPath]) return editorFieldMeta[fieldPath];
  const schedule = /^schedule\.(\d+)\.(time|label)$/.exec(fieldPath || '');
  if (!schedule) return null;
  return {
    tab: 'event',
    label: schedule[2] === 'time' ? `Giờ mốc ${Number(schedule[1]) + 1}` : `Nội dung mốc ${Number(schedule[1]) + 1}`,
  };
}

function Field({ label, value, onChange, textarea = false, type = 'text', maxLength, placeholder = '', fieldPath = '' }) {
  const id = useId();
  const control = {
    id,
    value: value || '',
    onChange: (event) => onChange(event.target.value),
    maxLength,
    placeholder,
    ...(fieldPath ? { 'data-editor-field-input': fieldPath } : {}),
  };
  return <label className="editorField" htmlFor={id}><span>{label}</span>{textarea ? <textarea {...control} rows="4" /> : <input {...control} type={type} />}</label>;
}

function EditorSection({ title, children }) {
  return <section className="editorSection"><h2>{title}</h2><div className="editorFields">{children}</div></section>;
}

function TextSizeControl({ value, onChange }) {
  const [draft, setDraft] = useState(value ? String(value) : '');

  useEffect(() => {
    setDraft(value ? String(value) : '');
  }, [value]);

  const update = (next) => {
    setDraft(next);
    if (!next) {
      onChange('');
      return;
    }
    const size = Number(next);
    if (Number.isFinite(size) && size >= 10 && size <= 96) onChange(Math.round(size));
  };

  const commit = () => {
    if (!draft) {
      onChange('');
      return;
    }
    const size = Math.round(Math.min(96, Math.max(10, Number(draft) || 10)));
    setDraft(String(size));
    onChange(size);
  };

  return <label className="editorTextSize"><span>Cỡ chữ</span><span><input aria-label="Cỡ chữ riêng" type="number" min="10" max="96" step="1" inputMode="numeric" placeholder="Theo mẫu" value={draft} onChange={(event) => update(event.target.value)} onBlur={commit} onKeyDown={(event) => { if (event.key === 'Enter') event.currentTarget.blur(); }} /><b>px</b></span></label>;
}

function statusLabel(status) {
  return {
    idle: 'Đã lưu', pending: 'Chờ lưu', saving: 'Đang lưu', error: 'Lỗi lưu',
    conflict: 'Xung đột', loading: 'Đang tải',
  }[status] || status;
}

function formatVersionDate(value) {
  if (!value) return '';
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
  }).format(new Date(value));
}

function versionAuthor(value) {
  return value === 'staff' ? 'Studio' : 'Khách hàng';
}

export default function InvitationEditor({ orderId }) {
  const queryToken = useMemo(() => new URLSearchParams(window.location.search).get('token') || '', []);
  const [token] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(`loi-hen-order-${orderId}`) || '{}');
      return queryToken || saved.accessToken || '';
    } catch {
      return queryToken;
    }
  });
  const [order, setOrder] = useState(null);
  const [history, setHistory] = useState({ past: [], present: null, future: [] });
  const [sceneHistory, setSceneHistory] = useState({ past: [], present: null, future: [] });
  const [activeTab, setActiveTab] = useState('media');
  const [selectedLayer, setSelectedLayer] = useState('cover');
  const [zoom, setZoom] = useState(95);
  const [previewMode, setPreviewMode] = useState('mobile');
  const [mobilePane, setMobilePane] = useState('edit');
  const [previewUrl, setPreviewUrl] = useState('');
  const [version, setVersion] = useState(1);
  const [selectedAssetId, setSelectedAssetId] = useState('');
  const [activeMediaRole, setActiveMediaRole] = useState('hero');
  const [selectedFieldPath, setSelectedFieldPath] = useState('');
  const [selectedSceneNodeId, setSelectedSceneNodeId] = useState('');
  const [sceneReplayKey, setSceneReplayKey] = useState(0);
  const [musicPreview, setMusicPreview] = useState({ src: '', playing: false });
  const [versionHistory, setVersionHistory] = useState({ loading: false, items: [] });
  const [theme, setTheme] = useState(() => normalizeInvitationTheme());
  const [ui, setUi] = useState({ loading: true, saveStatus: 'loading', busy: '', error: '', success: '' });
  const musicPreviewRef = useRef(null);
  const versionRef = useRef(1);
  const latestDraftRef = useRef(null);
  const latestThemeRef = useRef(normalizeInvitationTheme());
  const latestDesignRef = useRef(null);
  const lastSavedRef = useRef('');
  const saveQueueRef = useRef(Promise.resolve(true));
  const initializedRef = useRef(false);

  const content = history.present;
  const design = sceneHistory.present;
  const manifest = getEditorManifest(order?.template_slug);
  const sceneTemplate = getSceneTemplate(order?.template_slug);
  const resolvedScene = useMemo(
    () => (sceneTemplate && design ? resolveSceneDocument(sceneTemplate, design) : null),
    [design, sceneTemplate],
  );

  useEffect(() => {
    if (!queryToken) return;
    localStorage.setItem(`loi-hen-order-${orderId}`, JSON.stringify({ accessToken: token, previewToken: token }));
    const cleanUrl = new URL(window.location.href);
    cleanUrl.searchParams.delete('token');
    window.history.replaceState({}, '', `${cleanUrl.pathname}${cleanUrl.search}${cleanUrl.hash}`);
  }, [orderId, queryToken, token]);

  const load = useCallback(async () => {
    setUi((current) => ({ ...current, loading: true, error: '' }));
    try {
      const [loadedOrder, draftPreviewUrl] = await Promise.all([
        getOrder(orderId, token),
        getOrderPreviewUrl(orderId, token),
      ]);
      const draft = normalizeInvitationContent(loadedOrder.invitation.content);
      const draftTheme = normalizeInvitationTheme(loadedOrder.invitation.theme);
      const loadedSceneTemplate = getSceneTemplate(loadedOrder.template_slug);
      const draftDesign = loadedSceneTemplate
        ? normalizeScenePatch(loadedOrder.invitation.design, loadedSceneTemplate)
        : null;
      const draftVersion = loadedOrder.invitation.draft_version || 1;
      setOrder(loadedOrder);
      setHistory({ past: [], present: draft, future: [] });
      setSceneHistory({ past: [], present: draftDesign, future: [] });
      setTheme(draftTheme);
      setPreviewUrl(draftPreviewUrl);
      setVersion(draftVersion);
      versionRef.current = draftVersion;
      latestDraftRef.current = draft;
      latestThemeRef.current = draftTheme;
      latestDesignRef.current = draftDesign;
      lastSavedRef.current = JSON.stringify({ content: draft, theme: draftTheme, design: draftDesign });
      initializedRef.current = true;
      document.title = `Chỉnh thiệp ${loadedOrder.public_id} | Lời Hẹn Studio`;
      setUi({ loading: false, saveStatus: 'idle', busy: '', error: '', success: '' });
    } catch (error) {
      setUi({ loading: false, saveStatus: 'error', busy: '', error: error.message, success: '' });
    }
  }, [orderId, token]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { latestDraftRef.current = content; }, [content]);
  useEffect(() => { latestThemeRef.current = theme; }, [theme]);
  useEffect(() => { latestDesignRef.current = design; }, [design]);

  const flushSave = useCallback((force = false) => {
    const operation = async () => {
      const draft = latestDraftRef.current;
      const draftTheme = latestThemeRef.current;
      const draftDesign = latestDesignRef.current;
      if (!draft || !draftDesign || !initializedRef.current) return true;
      const serialized = JSON.stringify({ content: draft, theme: draftTheme, design: draftDesign });
      if (serialized === lastSavedRef.current) return true;
      if (!force && !serialized) return true;

      setUi((current) => ({ ...current, saveStatus: 'saving', error: '' }));
      try {
        const result = await saveInvitationDraft(orderId, token, draft, draftTheme, draftDesign, versionRef.current);
        versionRef.current = result.version;
        setVersion(result.version);
        lastSavedRef.current = serialized;
        setUi((current) => ({ ...current, saveStatus: 'idle', error: '' }));
        return true;
      } catch (error) {
        const conflict = /tab khác|xung đột/i.test(error.message);
        setUi((current) => ({ ...current, saveStatus: conflict ? 'conflict' : 'error', error: error.message }));
        return false;
      }
    };

    const queued = saveQueueRef.current.then(operation, operation);
    saveQueueRef.current = queued.catch(() => false);
    return queued;
  }, [orderId, token]);

  useEffect(() => {
    if (!content || !design || !initializedRef.current || JSON.stringify({ content, theme, design }) === lastSavedRef.current) return undefined;
    setUi((current) => ({ ...current, saveStatus: current.saveStatus === 'saving' ? 'saving' : 'pending' }));
    const timer = window.setTimeout(() => flushSave(), 900);
    return () => window.clearTimeout(timer);
  }, [content, design, flushSave, theme]);

  const refreshVersionHistory = useCallback(async (saveFirst = false) => {
    setVersionHistory((current) => ({ ...current, loading: true }));
    try {
      if (saveFirst && !await flushSave(true)) throw new Error('Hãy xử lý lỗi lưu trước khi mở lịch sử.');
      const result = await listInvitationVersions(orderId, token);
      setVersionHistory({ loading: false, items: result.versions || [] });
    } catch (error) {
      setVersionHistory((current) => ({ ...current, loading: false }));
      setUi((current) => ({ ...current, error: error.message }));
    }
  }, [flushSave, orderId, token]);

  useEffect(() => {
    if (activeTab === 'versions') void refreshVersionHistory(true);
  }, [activeTab, refreshVersionHistory]);

  const mutate = (producer) => {
    setHistory((current) => {
      if (!current.present) return current;
      const next = structuredClone(current.present);
      producer(next);
      return { past: [...current.past, current.present].slice(-60), present: next, future: [] };
    });
  };
  const mutateScene = (producer) => {
    if (!sceneTemplate) return;
    setSceneHistory((current) => {
      if (!current.present) return current;
      const next = producer(current.present);
      if (!next || JSON.stringify(next) === JSON.stringify(current.present)) return current;
      return { past: [...current.past, current.present].slice(-60), present: next, future: [] };
    });
  };
  const updateSceneNode = (nodeId, update) => mutateScene(
    (current) => patchSceneNode(current, sceneTemplate, nodeId, update),
  );
  const addSceneElement = (node) => {
    mutateScene((current) => addSceneNode(current, sceneTemplate, node));
    setSelectedSceneNodeId(node.id);
    setActiveTab('layers');
  };
  const removeSceneNode = (nodeId) => {
    mutateScene((current) => deleteSceneNode(current, sceneTemplate, nodeId));
    if (selectedSceneNodeId === nodeId) setSelectedSceneNodeId('');
  };
  const duplicateSceneNode = (nodeId) => {
    const source = resolvedScene?.nodes.find((node) => node.id === nodeId);
    if (!source) return;
    const clone = {
      ...structuredClone(source),
      id: makeSceneNodeId(source.type),
      label: `${source.label} bản sao`,
      x: Math.min(sceneTemplate.canvas.width - 1, source.x + 16),
      y: Math.min(sceneTemplate.canvas.height - 1, source.y + 16),
      zIndex: Math.min(1000, source.zIndex + 1),
      locked: false,
    };
    mutateScene((current) => addSceneNode(current, sceneTemplate, clone));
    setSelectedSceneNodeId(clone.id);
    setActiveTab('layers');
  };
  const setNested = (section, key, value) => mutate((draft) => { draft[section][key] = value; });
  const setSchedule = (index, key, value) => mutate((draft) => { draft.schedule[index][key] = value; });
  const addSchedule = () => mutate((draft) => { if (draft.schedule.length < 8) draft.schedule.push({ time: '12:00', label: 'Nội dung sự kiện' }); });
  const removeSchedule = (index) => mutate((draft) => { if (draft.schedule.length > 1) draft.schedule.splice(index, 1); });
  const undo = () => {
    if (sceneHistory.past.length) {
      setSceneHistory((current) => ({ past: current.past.slice(0, -1), present: current.past.at(-1), future: [current.present, ...current.future] }));
      return;
    }
    setHistory((current) => current.past.length ? { past: current.past.slice(0, -1), present: current.past.at(-1), future: [current.present, ...current.future] } : current);
  };
  const redo = () => {
    if (sceneHistory.future.length) {
      setSceneHistory((current) => ({ past: [...current.past, current.present], present: current.future[0], future: current.future.slice(1) }));
      return;
    }
    setHistory((current) => current.future.length ? { past: [...current.past, current.present], present: current.future[0], future: current.future.slice(1) } : current);
  };

  const selectPalette = (palette) => setTheme((current) => ({
    ...current,
    palette,
    colors: { surface: '', ink: '', accent: '' },
  }));

  const selectFont = (font) => setTheme((current) => ({ ...current, font }));

  const updateThemeColor = (key, value) => setTheme((current) => {
    const resolved = resolveInvitationPalette(current, manifest?.accent);
    return {
      ...current,
      palette: 'custom',
      colors: { ...resolved, [key]: value },
    };
  });

  const resetAppearance = () => setTheme((current) => ({
    ...current,
    palette: 'original',
    font: 'original',
    colors: { surface: '', ink: '', accent: '' },
  }));

  const updateMediaPosition = (axis, value) => setTheme((current) => {
    const currentPosition = current.mediaPositions?.[activeMediaRole] || { x: 50, y: 50 };
    return {
      ...current,
      mediaPositions: {
        ...current.mediaPositions,
        [activeMediaRole]: { ...currentPosition, [axis]: Number(value) },
      },
    };
  });

  const resetMediaPosition = () => setTheme((current) => {
    const mediaPositions = { ...current.mediaPositions };
    delete mediaPositions[activeMediaRole];
    return { ...current, mediaPositions };
  });

  const selectLayerEffect = (effect) => setTheme((current) => {
    const layerEffects = { ...current.layerEffects };
    if (effect === 'original') delete layerEffects[selectedLayer];
    else layerEffects[selectedLayer] = effect;
    return { ...current, layerEffects };
  });

  const updateSelectedTextStyle = (key, value) => {
    const fieldPath = selectedFieldPath;
    if (!getEditorFieldMeta(fieldPath)) return;
    setTheme((current) => {
      const textStyles = { ...current.textStyles };
      const style = { ...(textStyles[fieldPath] || {}) };
      const remove = value === '' || value === undefined || value === false || value === 'original';
      if (remove) delete style[key];
      else style[key] = value;
      if (Object.keys(style).length) textStyles[fieldPath] = style;
      else delete textStyles[fieldPath];
      return { ...current, textStyles };
    });
  };

  const resetSelectedTextStyle = () => {
    const fieldPath = selectedFieldPath;
    if (!getEditorFieldMeta(fieldPath)) return;
    setTheme((current) => {
      const textStyles = { ...current.textStyles };
      delete textStyles[fieldPath];
      return { ...current, textStyles };
    });
  };

  const updateEventDateTime = (part, value) => mutate((draft) => {
    const current = draft.event.startsAt || '2027-12-15T10:30:00+07:00';
    const date = part === 'date' ? value : current.slice(0, 10);
    const time = part === 'time' ? value : current.slice(11, 16);
    draft.event.startsAt = `${date}T${time}:00+07:00`;
  });

  const refreshAfterAssets = async (nextMusicSource) => {
    const loadedOrder = await getOrder(orderId, token);
    const persistedContent = normalizeInvitationContent(loadedOrder.invitation.content);
    const nextContent = structuredClone(persistedContent);
    const selectedMusicAssetId = getInvitationMusicAssetId(nextContent.media.music);
    if (selectedMusicAssetId && !loadedOrder.assets.some((asset) => asset.id === selectedMusicAssetId)) nextContent.media.music = '';
    if (nextMusicSource !== undefined) nextContent.media.music = nextMusicSource;
    const nextTheme = normalizeInvitationTheme(loadedOrder.invitation.theme);
    const loadedSceneTemplate = getSceneTemplate(loadedOrder.template_slug);
    const nextDesign = loadedSceneTemplate
      ? normalizeScenePatch(loadedOrder.invitation.design, loadedSceneTemplate)
      : null;
    setOrder(loadedOrder);
    setHistory({ past: [], present: nextContent, future: [] });
    setSceneHistory({ past: [], present: nextDesign, future: [] });
    setTheme(nextTheme);
    latestDraftRef.current = nextContent;
    latestThemeRef.current = nextTheme;
    latestDesignRef.current = nextDesign;
    lastSavedRef.current = JSON.stringify({ content: persistedContent, theme: nextTheme, design: nextDesign });
    versionRef.current = loadedOrder.invitation.draft_version || versionRef.current;
    setVersion(versionRef.current);
  };

  const upload = async (event, kind) => {
    const files = [...(event.target.files || [])];
    if (!files.length) return;
    setUi((current) => ({ ...current, busy: `upload-${kind}`, error: '', success: '' }));
    try {
      if (!await flushSave(true)) throw new Error('Hãy xử lý lỗi lưu trước khi tải tư liệu.');
      const uploadedAssets = [];
      for (const file of files) uploadedAssets.push(await uploadOrderAsset(orderId, token, file, kind));
      const nextMusicSource = kind === 'music' ? invitationMusicAssetValue(uploadedAssets.at(-1)?.id) : undefined;
      await refreshAfterAssets(nextMusicSource);
      setUi((current) => ({ ...current, busy: '', success: 'Đã cập nhật tư liệu.' }));
    } catch (error) {
      setUi((current) => ({ ...current, busy: '', error: error.message }));
    } finally {
      event.target.value = '';
    }
  };

  const removeAsset = async (assetId) => {
    setUi((current) => ({ ...current, busy: `delete-${assetId}`, error: '', success: '' }));
    try {
      await deleteOrderAsset(orderId, token, assetId);
      if (selectedAssetId === assetId) setSelectedAssetId('');
      await refreshAfterAssets();
      setUi((current) => ({ ...current, busy: '', success: 'Đã xóa tư liệu.' }));
    } catch (error) {
      setUi((current) => ({ ...current, busy: '', error: error.message }));
    }
  };

  const assignSelectedAsset = async (kind) => {
    if (!selectedAssetId) return;
    if (manifest?.mediaRoles.includes(kind)) setActiveMediaRole(kind);
    setUi((current) => ({ ...current, busy: `assign-${selectedAssetId}`, error: '', success: '' }));
    try {
      await updateOrderAssetKind(orderId, token, selectedAssetId, kind);
      await refreshAfterAssets();
      setUi((current) => ({ ...current, busy: '', success: `Đã dùng ảnh cho ${quickImageRoles.find((item) => item[0] === kind)?.[1] || kind}.` }));
    } catch (error) {
      setUi((current) => ({ ...current, busy: '', error: error.message }));
    }
  };

  const toggleMusicPreview = async (src, label) => {
    const audio = musicPreviewRef.current;
    if (!audio || !src) return;
    if (musicPreview.src === src && !audio.paused) {
      audio.pause();
      return;
    }
    if (musicPreview.src !== src) {
      audio.src = new URL(src, window.location.href).href;
      audio.currentTime = 0;
      setMusicPreview({ src, playing: false });
    }
    try {
      await audio.play();
    } catch {
      setUi((current) => ({ ...current, error: `Không thể nghe thử ${label}.` }));
    }
  };

  const selectMusic = (source, label) => {
    setNested('media', 'music', source);
    if (source === INVITATION_MUSIC_DISABLED) musicPreviewRef.current?.pause();
    setUi((current) => ({ ...current, success: source === INVITATION_MUSIC_DISABLED ? 'Đã tắt nhạc nền.' : `Đã chọn ${label}.` }));
  };

  const submitReview = async () => {
    setUi((current) => ({ ...current, busy: 'review', error: '', success: '' }));
    try {
      if (!await flushSave(true)) throw new Error('Không thể gửi duyệt khi bản nháp chưa được lưu.');
      await submitInvitationReview(orderId, token);
      setOrder((current) => ({ ...current, status: 'customer_review' }));
      setUi((current) => ({ ...current, busy: '', success: 'Bản thiệp đã được gửi studio duyệt.' }));
    } catch (error) {
      setUi((current) => ({ ...current, busy: '', error: error.message }));
    }
  };

  const switchTemplate = async (templateSlug) => {
    if (templateSlug === order.template_slug) return;
    setUi((current) => ({ ...current, busy: `template-${templateSlug}`, error: '', success: '' }));
    try {
      if (!await flushSave(true)) throw new Error('Hãy xử lý lỗi lưu trước khi đổi mẫu.');
      await switchInvitationTemplate(orderId, token, templateSlug);
      await load();
      setSelectedSceneNodeId('');
      setSelectedLayer('cover');
      setActiveMediaRole('hero');
      setUi((current) => ({ ...current, busy: '', success: `Đã đổi sang ${getEditorManifest(templateSlug)?.name || templateSlug}.` }));
    } catch (error) {
      setUi((current) => ({ ...current, busy: '', error: error.message }));
    }
  };

  const restoreVersion = async (targetVersion) => {
    if (!window.confirm(`Khôi phục nội dung từ bản ${targetVersion}? Bản hiện tại vẫn được giữ trong lịch sử.`)) return;
    setUi((current) => ({ ...current, busy: `restore-${targetVersion}`, error: '', success: '' }));
    try {
      if (!await flushSave(true)) throw new Error('Hãy xử lý lỗi lưu trước khi khôi phục.');
      const result = await restoreInvitationVersion(orderId, token, targetVersion);
      const restoredContent = normalizeInvitationContent(result.content);
      const restoredTheme = normalizeInvitationTheme(result.theme);
      const restoredTemplate = getSceneTemplate(result.templateSlug || order.template_slug);
      const restoredDesign = restoredTemplate
        ? normalizeScenePatch(result.design, restoredTemplate)
        : sceneTemplate ? createScenePatch(sceneTemplate) : null;
      latestDraftRef.current = restoredContent;
      latestThemeRef.current = restoredTheme;
      latestDesignRef.current = restoredDesign;
      lastSavedRef.current = JSON.stringify({ content: restoredContent, theme: restoredTheme, design: restoredDesign });
      versionRef.current = result.version;
      setHistory({ past: [], present: restoredContent, future: [] });
      setSceneHistory({ past: [], present: restoredDesign, future: [] });
      setTheme(restoredTheme);
      setVersion(result.version);
      if (result.templateSlug) {
        setOrder((current) => ({
          ...current,
          template_slug: result.templateSlug,
          invitation: { ...current.invitation, template_slug: result.templateSlug },
        }));
        setSelectedLayer('cover');
        setActiveMediaRole('hero');
      }
      setSelectedSceneNodeId('');
      const versionsResult = await listInvitationVersions(orderId, token);
      setVersionHistory({ loading: false, items: versionsResult.versions || [] });
      setUi((current) => ({ ...current, busy: '', saveStatus: 'idle', success: `Đã khôi phục bản ${targetVersion} thành bản ${result.version}.` }));
    } catch (error) {
      setUi((current) => ({ ...current, busy: '', error: error.message }));
    }
  };

  const focusEditorField = useCallback((fieldPath) => {
    window.setTimeout(() => {
      const input = document.querySelector(`[data-editor-field-input="${fieldPath}"]`);
      input?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      input?.focus({ preventScroll: true });
    }, 70);
  }, []);

  const selectCanvasField = useCallback((fieldPath, layerKey = '') => {
    const field = getEditorFieldMeta(fieldPath);
    if (!field) return;
    if (layerKey) setSelectedLayer(layerKey);
    setSelectedFieldPath(fieldPath);
    setActiveTab(field.tab);
    setMobilePane('edit');
    focusEditorField(fieldPath);
  }, [focusEditorField]);

  const selectSceneNode = useCallback((nodeId) => {
    setSelectedSceneNodeId(nodeId);
    if (nodeId) setActiveTab('layers');
    setMobilePane('edit');
  }, []);

  const editSceneBinding = useCallback((node) => {
    const fieldPath = node?.binding?.fieldPath;
    if (!getEditorFieldMeta(fieldPath)) return;
    selectCanvasField(fieldPath);
  }, [selectCanvasField]);

  const selectCanvasLayer = useCallback((layerKey) => {
    const layer = manifest?.layers.find((item) => item.key === layerKey);
    if (!layer) return;
    setSelectedFieldPath('');
    setSelectedLayer(layer.key);
    setActiveTab((current) => current === 'effects' ? 'effects' : layer.tab);
    setMobilePane('edit');
  }, [manifest]);

  const selectEffectLayer = (layerKey) => {
    const layer = manifest?.layers.find((item) => item.key === layerKey);
    if (!layer) return;
    setSelectedFieldPath('');
    setSelectedLayer(layer.key);
    setActiveTab('effects');
  };

  const chooseTool = (tabKey) => {
    setSelectedFieldPath('');
    setActiveTab(tabKey);
    const layer = manifest?.layers.find((item) => item.tab === tabKey);
    if (layer) setSelectedLayer(layer.key);
  };

  const selectMediaRole = useCallback((role) => {
    if (!manifest?.mediaRoles.includes(role)) return;
    setSelectedFieldPath('');
    setActiveMediaRole(role);
    setActiveTab('media');
    setMobilePane('edit');
  }, [manifest]);

  const toggleSelectedLayer = () => {
    setTheme((current) => {
      const hidden = new Set(current.hiddenLayers);
      if (hidden.has(selectedLayer)) hidden.delete(selectedLayer);
      else hidden.add(selectedLayer);
      return { ...current, hiddenLayers: [...hidden] };
    });
  };

  useEffect(() => {
    if (activeTab !== 'music') musicPreviewRef.current?.pause();
  }, [activeTab]);
  useEffect(() => () => {
    musicPreviewRef.current?.pause();
  }, []);

  if (ui.loading) return <main className="editorState"><RefreshCw className="is-spinning" /><p>Đang tải trình chỉnh sửa...</p></main>;
  if (!order || !content || !manifest || !sceneTemplate || !design || !resolvedScene) return <main className="editorState"><h1>Không thể mở trình chỉnh sửa</h1><p>{ui.error || 'Mẫu này chưa hỗ trợ scene editor.'}</p><a href={`/don-hang/${orderId}`}>Quay lại đơn hàng</a></main>;

  const visibleAssets = order.assets.filter((asset) => asset.kind !== 'payment_proof');
  const selectedLayerInfo = manifest.layers.find((item) => item.key === selectedLayer) || manifest.layers[0];
  const selectedLayerVisible = !theme.hiddenLayers.includes(selectedLayerInfo.key);
  const resolvedPalette = resolveInvitationPalette(theme, manifest.accent);
  const selectedFieldInfo = getEditorFieldMeta(selectedFieldPath);
  const selectedTextStyle = theme.textStyles[selectedFieldPath] || {};
  const hasSelectedTextStyle = Object.keys(selectedTextStyle).length > 0;
  const selectedSceneNode = resolvedScene.nodes.find((node) => node.id === selectedSceneNodeId) || null;
  const inspectorTitle = activeTab === 'elements' ? 'Thêm thành phần'
    : activeTab === 'layers' ? selectedSceneNode?.label || 'Lớp thiết kế'
    : selectedFieldInfo?.tab === activeTab
    ? selectedFieldInfo.label
    : activeTab === 'versions'
    ? 'Lịch sử phiên bản'
    : activeTab === 'design' ? 'Phong cách thiệp'
      : activeTab === 'effects' ? 'Hiệu ứng khu vực'
        : activeTab === 'templates' ? 'Đổi mẫu thiệp'
          : activeTab === 'music' ? 'Âm nhạc' : selectedLayerInfo.label;
  const audioAssets = visibleAssets.filter((asset) => String(asset.content_type || '').startsWith('audio/'));
  const imageAssets = visibleAssets.filter((asset) => !String(asset.content_type || '').startsWith('audio/'));
  const activeMusicSource = getActiveInvitationMusic(content.media.music, audioAssets);
  const activeMusicAssetId = getInvitationMusicAssetId(activeMusicSource);
  const visualSources = [
    ...imageAssets.filter((asset) => asset.signed_url).map((asset) => ({ key: asset.id, assetId: asset.id, src: asset.signed_url, label: asset.original_name })),
    ...[content.media.hero, content.media.couple, content.media.bride, content.media.groom, content.media.giftQr, ...content.media.gallery]
      .filter(Boolean)
      .map((src, index) => ({ key: `content-${index}`, src, label: `Ảnh ${index + 1}` })),
  ];
  const mediaItems = [...visualSources.reduce((items, item) => {
    if (!items.has(item.src)) items.set(item.src, item);
    return items;
  }, new Map()).values()];
  if (!mediaItems.length) mediaItems.push({ key: 'sample', src: `/social/${order.template_slug}.jpg`, label: 'Ảnh mẫu' });
  const scale = zoom / 100;
  const selectedAsset = visibleAssets.find((asset) => asset.id === selectedAssetId);
  const supportedMediaRoles = quickImageRoles.filter(([role]) => manifest.mediaRoles.includes(role));
  const activeMediaPosition = theme.mediaPositions[activeMediaRole] || { x: 50, y: 50 };
  const activeMediaLabel = quickImageRoles.find(([role]) => role === activeMediaRole)?.[1] || activeMediaRole;
  const activeMediaValue = activeMediaRole === 'gallery' ? content.media.gallery[0] : content.media[activeMediaRole];
  const activeMediaPreview = activeMediaValue
    || (selectedAsset?.kind === activeMediaRole ? selectedAsset.signed_url : '')
    || content.media.couple || content.media.hero || `/social/${order.template_slug}.jpg`;
  const hasMediaPositionOverride = Boolean(theme.mediaPositions[activeMediaRole]);
  const selectedLayerEffect = theme.layerEffects[selectedLayer] || 'original';

  return (
    <div className={`invitationEditor pane-${mobilePane}`} style={{ '--editor-accent': manifest.accent }}>
      <header className="editorTopbar">
        <a className="editorBack" href={`/don-hang/${orderId}`} aria-label="Quay lại đơn hàng" title="Quay lại đơn hàng"><ArrowLeft /></a>
        <a className="editorBrand" href="/" title="Lời Hẹn Studio"><span>LH</span><strong>Lời Hẹn</strong></a>
        <div className="editorIdentity"><strong>{order.public_id}</strong><span>{manifest.name} · bản {version}</span></div>
        <div className="editorHistory">
          <button type="button" onClick={undo} disabled={!history.past.length && !sceneHistory.past.length} aria-label="Hoàn tác" title="Hoàn tác"><Undo2 /></button>
          <button type="button" onClick={redo} disabled={!history.future.length && !sceneHistory.future.length} aria-label="Làm lại" title="Làm lại"><Redo2 /></button>
        </div>
        <button className={`editorSaveState state-${ui.saveStatus}`} type="button" onClick={() => flushSave(true)} title="Lưu bản nháp"><Cloud /><span>{statusLabel(ui.saveStatus)}</span></button>
        <a className="editorOpenPreview" href={previewUrl} target="_blank" rel="noreferrer"><Eye /> Xem trước</a>
        <button className="editorReviewButton" type="button" onClick={submitReview} disabled={ui.busy === 'review' || ui.saveStatus === 'conflict'}><Send /> {ui.busy === 'review' ? 'Đang gửi' : 'Gửi duyệt'}</button>
      </header>

      <div className="editorMobileSwitch">
        <button className={mobilePane === 'edit' ? 'is-active' : ''} type="button" onClick={() => setMobilePane('edit')}>Chỉnh sửa</button>
        <button className={mobilePane === 'preview' ? 'is-active' : ''} type="button" onClick={() => { setMobilePane('preview'); if (window.innerWidth <= 900) setZoom(68); }}>Xem trước</button>
      </div>

      <div className="editorStudio">
        <nav className="editorToolRail" aria-label="Công cụ chỉnh sửa">
          {editorTools.map(([key, label, Icon]) => <button className={activeTab === key ? 'is-active' : ''} type="button" onClick={() => chooseTool(key)} key={key} title={label}><Icon /><span>{label}</span></button>)}
        </nav>

        <main className="editorCanvas">
          <div className="editorCanvasToolbar">
            <strong>{selectedSceneNode?.label || resolvedScene.name}</strong>
            <div className="editorViewport" aria-label="Kích thước xem trước">
              <button className={previewMode === 'mobile' ? 'is-active' : ''} type="button" onClick={() => { setPreviewMode('mobile'); setZoom(75); }} aria-label="Xem trên điện thoại" title="Điện thoại"><Smartphone /></button>
              <button className={previewMode === 'desktop' ? 'is-active' : ''} type="button" onClick={() => { setPreviewMode('desktop'); setZoom(100); }} aria-label="Xem trên máy tính" title="Máy tính"><Monitor /></button>
            </div>
            <div className="editorZoom">
              <button type="button" onClick={() => setZoom((value) => Math.max(50, value - 10))} aria-label="Thu nhỏ" title="Thu nhỏ"><ZoomOut /></button>
              <span>{zoom}%</span>
              <button type="button" onClick={() => setZoom((value) => Math.min(120, value + 10))} aria-label="Phóng to" title="Phóng to"><ZoomIn /></button>
            </div>
            <button type="button" onClick={() => setSceneReplayKey((current) => current + 1)} aria-label="Phát lại hiệu ứng" title="Phát lại hiệu ứng"><RefreshCw /></button>
            <a href={previewUrl} target="_blank" rel="noreferrer" aria-label="Mở preview trong tab mới" title="Mở trong tab mới"><ExternalLink /></a>
          </div>
          <div className="editorCanvasViewport">
            <div className="editorCanvasStage" style={{ width: `${resolvedScene.canvas.width * scale}px`, height: `${resolvedScene.canvas.height * scale}px` }}>
              <SceneEditorCanvas
                template={sceneTemplate}
                patch={design}
                content={content}
                theme={theme}
                zoom={scale}
                selectedNodeId={selectedSceneNodeId}
                onSelectNode={selectSceneNode}
                onCommitNode={updateSceneNode}
                onDeleteNode={removeSceneNode}
                onDuplicateNode={duplicateSceneNode}
                onEditBinding={editSceneBinding}
                replayKey={sceneReplayKey}
              />
            </div>
          </div>
          <section className="editorAssetTray" aria-label="Dải ảnh">
            <label className="editorTrayUpload"><Upload /><span>Thêm ảnh</span><input type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple onChange={(event) => upload(event, 'gallery')} /></label>
            <div className="editorTrayScroll">
              {mediaItems.map((item) => <button className={item.assetId === selectedAssetId ? 'is-selected' : ''} type="button" onClick={() => {
                chooseTool('media');
                setSelectedAssetId(item.assetId || '');
                const role = imageAssets.find((asset) => asset.id === item.assetId)?.kind;
                if (manifest.mediaRoles.includes(role)) setActiveMediaRole(role);
              }} aria-pressed={item.assetId ? item.assetId === selectedAssetId : undefined} key={item.key} title={item.label}><img src={item.src} alt="" /><span>{item.label}</span></button>)}
            </div>
          </section>
        </main>

        <aside className="editorControls">
          <header className={`editorInspectorHeader ${standaloneInspectorTabs.has(activeTab) ? 'is-history' : ''}`}>
            <div><small>{activeTab === 'versions' ? 'BẢN NHÁP' : 'TÙY CHỈNH'}</small><strong>{inspectorTitle}</strong></div>
            {!standaloneInspectorTabs.has(activeTab) && <label><span className="visually-hidden">Chọn khu vực</span><select value={selectedLayerInfo.key} onChange={(event) => selectCanvasLayer(event.target.value)}>{manifest.layers.map((layer) => <option value={layer.key} key={layer.key}>{layer.label}</option>)}</select></label>}
          </header>
          <div className="editorScroll" onFocusCapture={(event) => {
            const fieldPath = event.target.dataset.editorFieldInput;
            const field = getEditorFieldMeta(fieldPath);
            if (field?.tab === activeTab) setSelectedFieldPath(fieldPath);
          }}>
            {activeTab === 'elements' && <SceneElementsPanel scene={resolvedScene} onAdd={addSceneElement} />}
            {activeTab === 'layers' && <>
              <SceneLayerPanel
                scene={resolvedScene}
                selectedNodeId={selectedSceneNodeId}
                onSelect={selectSceneNode}
                onPatch={updateSceneNode}
              />
              <SceneNodeInspector
                scene={resolvedScene}
                node={selectedSceneNode}
                onPatch={updateSceneNode}
                onDelete={removeSceneNode}
                onDuplicate={duplicateSceneNode}
                onEditBinding={editSceneBinding}
              />
            </>}
            {!standaloneInspectorTabs.has(activeTab) && <div className="editorLayerOptions">
              <label><input type="checkbox" checked={selectedLayerVisible} onChange={toggleSelectedLayer} /><span>Hiển thị khu vực</span></label>
              <label><span>Chuyển động</span><select value={theme.motion} onChange={(event) => setTheme((current) => ({ ...current, motion: event.target.value }))}><option value="full">Đầy đủ</option><option value="reduced">Tối giản</option></select></label>
            </div>}
            {selectedFieldInfo?.tab === activeTab && <EditorSection title="Định dạng chữ">
              <div className="editorTextFormat">
                <label className="editorTextFont"><span>Kiểu chữ</span><select aria-label="Kiểu chữ riêng" value={selectedTextStyle.font || 'original'} onChange={(event) => updateSelectedTextStyle('font', event.target.value)}>
                  {Object.entries(invitationFontPresets).map(([key, preset]) => <option value={key} key={key}>{preset.name}</option>)}
                </select></label>
                <TextSizeControl value={selectedTextStyle.fontSize} onChange={(value) => updateSelectedTextStyle('fontSize', value)} />
                <label className="editorTextColor"><span>Màu chữ</span><span><input aria-label="Màu chữ riêng" type="color" value={selectedTextStyle.color || resolvedPalette.ink} onChange={(event) => updateSelectedTextStyle('color', event.target.value)} /><code>{selectedTextStyle.color || 'Theo mẫu'}</code><button type="button" onClick={() => updateSelectedTextStyle('color', '')} disabled={!selectedTextStyle.color} aria-label="Dùng màu chữ nguyên bản" title="Dùng màu chữ nguyên bản"><RotateCcw /></button></span></label>
                <div className="editorTextFormatRow">
                  <div className="editorTextAlign" role="group" aria-label="Căn chữ">
                    <button className={!selectedTextStyle.align ? 'is-active' : ''} type="button" onClick={() => updateSelectedTextStyle('align', 'original')} aria-pressed={!selectedTextStyle.align} aria-label="Căn theo mẫu" title="Căn theo mẫu"><RotateCcw /></button>
                    <button className={selectedTextStyle.align === 'left' ? 'is-active' : ''} type="button" onClick={() => updateSelectedTextStyle('align', 'left')} aria-pressed={selectedTextStyle.align === 'left'} aria-label="Căn trái" title="Căn trái"><AlignLeft /></button>
                    <button className={selectedTextStyle.align === 'center' ? 'is-active' : ''} type="button" onClick={() => updateSelectedTextStyle('align', 'center')} aria-pressed={selectedTextStyle.align === 'center'} aria-label="Căn giữa" title="Căn giữa"><AlignCenter /></button>
                    <button className={selectedTextStyle.align === 'right' ? 'is-active' : ''} type="button" onClick={() => updateSelectedTextStyle('align', 'right')} aria-pressed={selectedTextStyle.align === 'right'} aria-label="Căn phải" title="Căn phải"><AlignRight /></button>
                  </div>
                  <div className="editorTextEmphasis" role="group" aria-label="Kiểu nhấn chữ">
                    <button className={selectedTextStyle.bold ? 'is-active' : ''} type="button" onClick={() => updateSelectedTextStyle('bold', !selectedTextStyle.bold)} aria-pressed={Boolean(selectedTextStyle.bold)} aria-label="Chữ đậm" title="Chữ đậm"><Bold /></button>
                    <button className={selectedTextStyle.italic ? 'is-active' : ''} type="button" onClick={() => updateSelectedTextStyle('italic', !selectedTextStyle.italic)} aria-pressed={Boolean(selectedTextStyle.italic)} aria-label="Chữ nghiêng" title="Chữ nghiêng"><Italic /></button>
                  </div>
                </div>
                <button className="editorResetTextStyle" type="button" onClick={resetSelectedTextStyle} disabled={!hasSelectedTextStyle}><RotateCcw /> Khôi phục chữ nguyên bản</button>
              </div>
            </EditorSection>}
            {activeTab === 'design' && <>
              <EditorSection title="Bảng màu">
                <div className="editorPaletteGrid">
                  {Object.entries(invitationPalettePresets).map(([key, preset]) => <button className={theme.palette === key ? 'is-active' : ''} type="button" onClick={() => selectPalette(key)} aria-pressed={theme.palette === key} key={key}>
                    <span className="editorPaletteSwatches" aria-hidden="true"><i style={{ background: preset.surface || '#ffffff' }} /><i style={{ background: preset.ink || '#242424' }} /><i style={{ background: preset.accent || manifest.accent }} /></span>
                    <strong>{preset.name}</strong><small>{preset.description}</small>
                  </button>)}
                </div>
              </EditorSection>
              <EditorSection title="Màu tùy chỉnh">
                <div className="editorColorFields">
                  {[['surface', 'Màu nền'], ['ink', 'Màu chữ'], ['accent', 'Màu nhấn']].map(([key, label]) => <label key={key}><span>{label}</span><span><input type="color" value={resolvedPalette[key]} onChange={(event) => updateThemeColor(key, event.target.value)} aria-label={label} /><code>{resolvedPalette[key]}</code></span></label>)}
                </div>
              </EditorSection>
              <EditorSection title="Bộ chữ">
                <div className="editorFontList">
                  {Object.entries(invitationFontPresets).map(([key, preset]) => <button className={theme.font === key ? 'is-active' : ''} type="button" onClick={() => selectFont(key)} aria-pressed={theme.font === key} key={key}>
                    <span style={{ fontFamily: preset.heading || undefined }}>Aa</span><span><strong>{preset.name}</strong><small>{preset.description}</small></span>
                  </button>)}
                </div>
              </EditorSection>
              <EditorSection title="Hiệu ứng">
                <label className="editorMotionControl"><span>Chuyển động khi xem thiệp</span><select value={theme.motion} onChange={(event) => setTheme((current) => ({ ...current, motion: event.target.value }))}><option value="full">Đầy đủ</option><option value="reduced">Tối giản</option></select></label>
                <button className="editorResetAppearance" type="button" onClick={resetAppearance}><RotateCcw /> Khôi phục phong cách nguyên bản</button>
              </EditorSection>
            </>}
            {activeTab === 'effects' && <>
              <EditorSection title="Khu vực áp dụng">
                <label className="editorEffectLayer"><span>Chọn khu vực</span><select value={selectedLayerInfo.key} onChange={(event) => selectEffectLayer(event.target.value)} aria-label="Khu vực áp dụng hiệu ứng">{manifest.layers.map((layer) => <option value={layer.key} key={layer.key}>{layer.label}</option>)}</select></label>
              </EditorSection>
              <EditorSection title="Kiểu xuất hiện">
                <div className="editorEffectGrid">
                  {layerEffectPresets.map(([key, name, description]) => <button className={selectedLayerEffect === key ? 'is-active' : ''} data-effect={key} type="button" onClick={() => selectLayerEffect(key)} aria-pressed={selectedLayerEffect === key} key={key}>
                    <span className="editorEffectGlyph" aria-hidden="true"><i /></span>
                    <span><strong>{name}</strong><small>{description}</small></span>
                    {selectedLayerEffect === key && <Check />}
                  </button>)}
                </div>
                {theme.motion === 'reduced' && <p className="editorEffectNotice">Chuyển động tối giản đang bật.</p>}
                <button className="editorReplayEffect" type="button" onClick={() => flushSave(true)}><Play /> Phát lại hiệu ứng</button>
              </EditorSection>
            </>}
            {activeTab === 'templates' && <EditorSection title="Mẫu có thể tự chỉnh sửa">
              <div className="editorTemplateGrid">
                {commercialTemplateSlugs.map((templateSlug) => {
                  const templateManifest = getEditorManifest(templateSlug);
                  const selected = order.template_slug === templateSlug;
                  return <button className={selected ? 'is-active' : ''} type="button" onClick={() => switchTemplate(templateSlug)} disabled={selected || ui.busy === `template-${templateSlug}`} aria-label={`Chọn mẫu ${templateManifest.name}`} aria-pressed={selected} key={templateSlug}>
                    <img src={`/social/${templateSlug}.jpg`} alt="" />
                    <span><strong>{templateManifest.name}</strong><small>{templateSlug.replace('thiep-cuoi-', 'Mẫu ')}</small></span>
                    {selected && <Check />}
                  </button>;
                })}
              </div>
              <p className="editorTemplateNote">Nội dung, ảnh, RSVP và lời chúc được giữ nguyên khi đổi bố cục.</p>
            </EditorSection>}
            {activeTab === 'music' && <>
              <audio
                ref={musicPreviewRef}
                preload="metadata"
                hidden
                onPlay={() => setMusicPreview((current) => ({ ...current, playing: true }))}
                onPause={() => setMusicPreview((current) => ({ ...current, playing: false }))}
                onEnded={() => setMusicPreview((current) => ({ ...current, playing: false }))}
              />
              <EditorSection title="Nhạc nền">
                <button className={`editorMusicOff ${activeMusicSource === INVITATION_MUSIC_DISABLED ? 'is-active' : ''}`} type="button" onClick={() => selectMusic(INVITATION_MUSIC_DISABLED, 'Không dùng nhạc')} aria-pressed={activeMusicSource === INVITATION_MUSIC_DISABLED}>
                  <VolumeX /><span><strong>Không dùng nhạc</strong><small>Ẩn nút phát nhạc trên thiệp</small></span>{activeMusicSource === INVITATION_MUSIC_DISABLED && <Check />}
                </button>
              </EditorSection>
              <EditorSection title="Thư viện nhạc cưới">
                <div className="editorMusicList">
                  {invitationMusicLibrary.map((track) => {
                    const selected = activeMusicSource === track.src;
                    const previewing = musicPreview.src === track.src && musicPreview.playing;
                    return <article className={selected ? 'is-selected' : ''} key={track.id}>
                      <button className="editorMusicPlay" type="button" onClick={() => toggleMusicPreview(track.src, track.name)} aria-label={`${previewing ? 'Dừng' : 'Nghe thử'} ${track.name}`} title={`${previewing ? 'Dừng' : 'Nghe thử'} ${track.name}`}>{previewing ? <Pause /> : <Play />}</button>
                      <div><strong>{track.name}</strong><small>{track.artist}</small><small>{track.mood} · {track.duration}</small></div>
                      <button className="editorMusicSelect" type="button" onClick={() => selectMusic(track.src, track.name)} aria-label={`Chọn nhạc ${track.name}`} aria-pressed={selected} title={`Chọn ${track.name}`}>{selected ? <Check /> : <Plus />}</button>
                    </article>;
                  })}
                </div>
                <a className="editorMusicLicense" href="https://mixkit.co/license/#musicFree" target="_blank" rel="noreferrer">Mixkit Stock Music Free License</a>
              </EditorSection>
              <EditorSection title="Nhạc của bạn">
                <label className="editorMusicUpload"><Upload /><span><strong>{ui.busy === 'upload-music' ? 'Đang tải nhạc...' : 'Tải bài hát'}</strong><small>MP3 hoặc M4A · tối đa 15 MB</small></span><input type="file" accept="audio/mpeg,audio/mp4" onChange={(event) => upload(event, 'music')} disabled={ui.busy === 'upload-music'} /></label>
                <div className="editorMusicList is-uploaded">
                  {audioAssets.map((asset) => {
                    const source = invitationMusicAssetValue(asset.id);
                    const selected = activeMusicAssetId === asset.id;
                    const previewing = musicPreview.src === asset.signed_url && musicPreview.playing;
                    return <article className={selected ? 'is-selected' : ''} key={asset.id}>
                      <button className="editorMusicPlay" type="button" onClick={() => toggleMusicPreview(asset.signed_url, asset.original_name)} aria-label={`${previewing ? 'Dừng' : 'Nghe thử'} ${asset.original_name}`} title={`${previewing ? 'Dừng' : 'Nghe thử'} ${asset.original_name}`}>{previewing ? <Pause /> : <Play />}</button>
                      <div><strong>{asset.original_name}</strong><small>{Math.ceil((asset.byte_size || 0) / 1024)} KB</small></div>
                      <button className="editorMusicSelect" type="button" onClick={() => selectMusic(source, asset.original_name)} aria-label={`Chọn nhạc ${asset.original_name}`} aria-pressed={selected} title={`Chọn ${asset.original_name}`}>{selected ? <Check /> : <Plus />}</button>
                      <button className="editorMusicDelete" type="button" onClick={() => removeAsset(asset.id)} disabled={ui.busy === `delete-${asset.id}`} aria-label={`Xóa ${asset.original_name}`} title={`Xóa ${asset.original_name}`}><Trash2 /></button>
                    </article>;
                  })}
                  {!audioAssets.length && <p>Chưa có bài hát tải lên.</p>}
                </div>
              </EditorSection>
            </>}
            {activeTab === 'versions' && <EditorSection title="Các bản đã lưu">
              <div className="editorVersionList">
                {versionHistory.loading && <p className="editorVersionState"><RefreshCw className="is-spinning" /> Đang tải lịch sử...</p>}
                {!versionHistory.loading && versionHistory.items.map((item) => <article className={item.version === version ? 'is-current' : ''} key={item.id}>
                  <div><strong>Bản {item.version}</strong>{item.version === version && <span>Hiện tại</span>}<small>{formatVersionDate(item.created_at)} · {versionAuthor(item.created_by)} · {getEditorManifest(item.template_slug)?.name || 'Mẫu hiện tại'}</small></div>
                  <button type="button" onClick={() => restoreVersion(item.version)} disabled={item.version === version || ui.busy === `restore-${item.version}`} title={`Khôi phục bản ${item.version}`}><RotateCcw /><span>Khôi phục</span></button>
                </article>)}
                {!versionHistory.loading && !versionHistory.items.length && <p className="editorVersionState">Chưa có phiên bản đã lưu.</p>}
              </div>
            </EditorSection>}
            {activeTab === 'couple' && <>
              <EditorSection title="Chú rể">
                <Field fieldPath="couple.groomName" label="Tên hiển thị" value={content.couple.groomName} onChange={(value) => setNested('couple', 'groomName', value)} maxLength={80} />
                <Field fieldPath="couple.groomFullName" label="Họ và tên" value={content.couple.groomFullName} onChange={(value) => setNested('couple', 'groomFullName', value)} maxLength={120} />
                <Field fieldPath="couple.groomBirthDate" label="Ngày sinh" value={content.couple.groomBirthDate} onChange={(value) => setNested('couple', 'groomBirthDate', value)} maxLength={40} />
              </EditorSection>
              <EditorSection title="Cô dâu">
                <Field fieldPath="couple.brideName" label="Tên hiển thị" value={content.couple.brideName} onChange={(value) => setNested('couple', 'brideName', value)} maxLength={80} />
                <Field fieldPath="couple.brideFullName" label="Họ và tên" value={content.couple.brideFullName} onChange={(value) => setNested('couple', 'brideFullName', value)} maxLength={120} />
                <Field fieldPath="couple.brideBirthDate" label="Ngày sinh" value={content.couple.brideBirthDate} onChange={(value) => setNested('couple', 'brideBirthDate', value)} maxLength={40} />
              </EditorSection>
            </>}

            {activeTab === 'event' && <>
              <EditorSection title="Ngày cưới">
                <Field fieldPath="event.startsAt.date" label="Ngày" type="date" value={content.event.startsAt.slice(0, 10)} onChange={(value) => updateEventDateTime('date', value)} />
                <Field fieldPath="event.startsAt.time" label="Giờ" type="time" value={content.event.startsAt.slice(11, 16)} onChange={(value) => updateEventDateTime('time', value)} />
                <Field fieldPath="event.lunarDate" label="Ngày âm lịch" value={content.event.lunarDate} onChange={(value) => setNested('event', 'lunarDate', value)} maxLength={160} />
              </EditorSection>
              <EditorSection title="Địa điểm">
                <Field fieldPath="event.venueName" label="Tên địa điểm" value={content.event.venueName} onChange={(value) => setNested('event', 'venueName', value)} maxLength={180} />
                <Field fieldPath="event.address" label="Địa chỉ" value={content.event.address} onChange={(value) => setNested('event', 'address', value)} maxLength={300} />
                <Field fieldPath="event.mapUrl" label="Google Maps" type="url" value={content.event.mapUrl} onChange={(value) => setNested('event', 'mapUrl', value)} maxLength={500} />
              </EditorSection>
              <EditorSection title="Lịch trình">
                <div className="editorSchedule">
                  {content.schedule.map((item, index) => <div key={`${index}-${item.time}`}><input data-editor-field-input={`schedule.${index}.time`} aria-label={`Giờ mốc ${index + 1}`} type="time" value={item.time} onChange={(event) => setSchedule(index, 'time', event.target.value)} /><input data-editor-field-input={`schedule.${index}.label`} aria-label={`Nội dung mốc ${index + 1}`} value={item.label} maxLength="160" onChange={(event) => setSchedule(index, 'label', event.target.value)} /><button type="button" onClick={() => removeSchedule(index)} disabled={content.schedule.length === 1} aria-label={`Xóa mốc ${index + 1}`} title="Xóa"><Trash2 /></button></div>)}
                </div>
                <button className="editorTextButton" type="button" onClick={addSchedule} disabled={content.schedule.length >= 8}><Plus /> Thêm mốc</button>
              </EditorSection>
            </>}

            {activeTab === 'families' && <>
              <EditorSection title="Nhà trai">
                <Field fieldPath="families.groomFather" label="Tên cha" value={content.families.groomFather} onChange={(value) => setNested('families', 'groomFather', value)} maxLength={120} />
                <Field fieldPath="families.groomMother" label="Tên mẹ" value={content.families.groomMother} onChange={(value) => setNested('families', 'groomMother', value)} maxLength={120} />
                <Field fieldPath="families.groomAddress" label="Địa chỉ" value={content.families.groomAddress} onChange={(value) => setNested('families', 'groomAddress', value)} maxLength={240} />
              </EditorSection>
              <EditorSection title="Nhà gái">
                <Field fieldPath="families.brideFather" label="Tên cha" value={content.families.brideFather} onChange={(value) => setNested('families', 'brideFather', value)} maxLength={120} />
                <Field fieldPath="families.brideMother" label="Tên mẹ" value={content.families.brideMother} onChange={(value) => setNested('families', 'brideMother', value)} maxLength={120} />
                <Field fieldPath="families.brideAddress" label="Địa chỉ" value={content.families.brideAddress} onChange={(value) => setNested('families', 'brideAddress', value)} maxLength={240} />
              </EditorSection>
            </>}

            {activeTab === 'story' && <EditorSection title="Nội dung thiệp">
              <Field fieldPath="copy.intro" label="Lời mời" textarea value={content.copy.intro} onChange={(value) => setNested('copy', 'intro', value)} maxLength={1000} />
              <Field fieldPath="copy.story" label="Câu chuyện" textarea value={content.copy.story} onChange={(value) => setNested('copy', 'story', value)} maxLength={4000} />
              <Field fieldPath="copy.quote" label="Trích dẫn" textarea value={content.copy.quote} onChange={(value) => setNested('copy', 'quote', value)} maxLength={1000} />
              <Field fieldPath="copy.thankYou" label="Lời cảm ơn" textarea value={content.copy.thankYou} onChange={(value) => setNested('copy', 'thankYou', value)} maxLength={1500} />
            </EditorSection>}

            {activeTab === 'media' && <>
              <EditorSection title="Khung ảnh">
                <div className="editorFocalControl">
                  <div className="editorMediaRoleTabs" role="group" aria-label="Chọn khung ảnh cần căn">
                    {supportedMediaRoles.map(([role, label]) => <button className={activeMediaRole === role ? 'is-active' : ''} type="button" onClick={() => selectMediaRole(role)} aria-pressed={activeMediaRole === role} key={role}>{label}</button>)}
                  </div>
                  <div className="editorFocalPreview" aria-label={`Xem trước khung ${activeMediaLabel}`}>
                    <img src={activeMediaPreview} alt="" style={{ objectPosition: `${activeMediaPosition.x}% ${activeMediaPosition.y}%` }} />
                    <span style={{ left: `${activeMediaPosition.x}%`, top: `${activeMediaPosition.y}%` }} aria-hidden="true" />
                    <small>{activeMediaLabel}</small>
                  </div>
                  <div className="editorHorizontalPresets" role="group" aria-label="Căn ảnh theo chiều ngang">
                    {[['Trái', 20], ['Giữa', 50], ['Phải', 80]].map(([label, value]) => <button className={activeMediaPosition.x === value ? 'is-active' : ''} type="button" onClick={() => updateMediaPosition('x', value)} aria-pressed={activeMediaPosition.x === value} key={label}>{label}</button>)}
                  </div>
                  <label className="editorFocalRange"><span>Điểm lấy nét ngang <b>{activeMediaPosition.x}%</b></span><input type="range" min="0" max="100" step="1" value={activeMediaPosition.x} onChange={(event) => updateMediaPosition('x', event.target.value)} aria-label="Điểm lấy nét ngang" /></label>
                  <label className="editorFocalRange"><span>Điểm lấy nét dọc <b>{activeMediaPosition.y}%</b></span><input type="range" min="0" max="100" step="1" value={activeMediaPosition.y} onChange={(event) => updateMediaPosition('y', event.target.value)} aria-label="Điểm lấy nét dọc" /></label>
                  <button className="editorResetFocal" type="button" onClick={resetMediaPosition} disabled={!hasMediaPositionOverride}><RotateCcw /> Đặt lại khung ảnh</button>
                </div>
              </EditorSection>
              {selectedAsset && !String(selectedAsset.content_type || '').startsWith('audio/') && <EditorSection title="Thay ảnh nhanh">
                <div className="editorQuickAsset">
                  <div><img src={selectedAsset.signed_url} alt="" /><span><strong>{selectedAsset.original_name}</strong><small>Đang dùng: {quickImageRoles.find((item) => item[0] === selectedAsset.kind)?.[1] || selectedAsset.kind}</small></span></div>
                  <div>{quickImageRoles.map(([kind, label]) => <button className={selectedAsset.kind === kind ? 'is-active' : ''} type="button" onClick={() => assignSelectedAsset(kind)} disabled={ui.busy === `assign-${selectedAsset.id}`} key={kind}>{label}</button>)}</div>
                </div>
              </EditorSection>}
              <EditorSection title="Tải tư liệu">
                <div className="editorAssetSlots">
                  {manifest.slots.filter((slot) => slot.kind !== 'music').map((slot) => <label className="editorAssetSlot" key={slot.kind}><span><Image /></span><strong>{slot.label}</strong><small>15 MB</small><Upload /><input type="file" accept={slot.accept} multiple={slot.multiple} onChange={(event) => upload(event, slot.kind)} disabled={ui.busy === `upload-${slot.kind}`} /></label>)}
                </div>
              </EditorSection>
              <EditorSection title={`Tư liệu đã tải (${imageAssets.length})`}>
                <div className="editorAssetList">
                  {imageAssets.map((asset) => <article className={asset.id === selectedAssetId ? 'is-selected' : ''} key={asset.id}><button className="editorAssetSelect" type="button" onClick={() => {
                    setSelectedAssetId(asset.id);
                    if (manifest.mediaRoles.includes(asset.kind)) setActiveMediaRole(asset.kind);
                  }} aria-label={`Chọn ${asset.original_name}`} aria-pressed={asset.id === selectedAssetId}>{asset.signed_url ? <img src={asset.signed_url} alt="" /> : <Image />}</button><div><strong>{asset.original_name}</strong><small>{asset.kind}</small></div><button type="button" onClick={() => removeAsset(asset.id)} disabled={ui.busy === `delete-${asset.id}`} aria-label={`Xóa ${asset.original_name}`} title="Xóa"><Trash2 /></button></article>)}
                  {!imageAssets.length && <p>Chưa có tư liệu được tải lên.</p>}
                </div>
              </EditorSection>
            </>}
          </div>
        </aside>
      </div>

      {(ui.error || ui.success) && <div className={`editorToast ${ui.error ? 'is-error' : 'is-success'}`} role={ui.error ? 'alert' : 'status'}>{ui.error ? <RefreshCw /> : <Check />}<span>{ui.error || ui.success}</span>{ui.saveStatus === 'conflict' && <button type="button" onClick={load}>Tải lại</button>}</div>}
    </div>
  );
}
