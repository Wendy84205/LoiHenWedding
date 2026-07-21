import { z } from 'zod';
import { isInvitationTextFieldKey } from '../invitationContent.js';

export const SCENE_SCHEMA_VERSION = 1;
export const SCENE_NODE_TYPES = Object.freeze([
  'text', 'image', 'shape', 'calendar', 'countdown', 'map', 'rsvp', 'wish',
  'giftQr', 'envelope', 'album', 'carousel', 'particle',
]);
export const SCENE_ENTRANCE_EFFECTS = Object.freeze(['none', 'fade', 'rise', 'left', 'right', 'zoom']);
export const SCENE_CONTINUOUS_EFFECTS = Object.freeze(['none', 'float', 'pulse', 'sway']);
export const SCENE_EASINGS = Object.freeze(['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out']);
export const SCENE_SHAPES = Object.freeze(['rectangle', 'circle', 'line', 'heart']);

const sceneId = z.string().min(1).max(64).regex(/^[a-z0-9_-]+$/i);
const color = z.string().regex(/^(?:#[0-9a-f]{6}|transparent)$/i);
const safeMedia = z.string().max(2048).refine(
  (value) => !value || value.startsWith('/') || /^https:\/\//i.test(value),
  'Đường dẫn tư liệu không hợp lệ.',
);
const safeExternalUrl = z.string().url().max(500).refine(
  (value) => /^https:\/\//i.test(value),
  'Liên kết phải sử dụng HTTPS.',
);
const safeFont = z.string().max(120).regex(/^[\w\s"',-]+$/);
const safeShadow = z.string().max(160).regex(/^[\w\s#(),.%+-]*$/);

export const sceneNodeStyleSchema = z.object({
  color: color.optional(),
  backgroundColor: color.optional(),
  fontFamily: safeFont.optional(),
  fontSize: z.number().min(8).max(160).optional(),
  fontWeight: z.number().int().min(100).max(900).optional(),
  fontStyle: z.enum(['normal', 'italic']).optional(),
  textDecoration: z.enum(['none', 'underline', 'line-through']).optional(),
  textTransform: z.enum(['none', 'uppercase', 'lowercase']).optional(),
  textAlign: z.enum(['left', 'center', 'right']).optional(),
  lineHeight: z.number().min(0.7).max(3).optional(),
  letterSpacing: z.number().min(0).max(24).optional(),
  borderRadius: z.number().min(0).max(500).optional(),
  borderWidth: z.number().min(0).max(20).optional(),
  borderColor: color.optional(),
  borderStyle: z.enum(['solid', 'dashed', 'dotted']).optional(),
  opacity: z.number().min(0).max(1).optional(),
  objectFit: z.enum(['cover', 'contain', 'fill']).optional(),
  objectPositionX: z.number().min(0).max(100).optional(),
  objectPositionY: z.number().min(0).max(100).optional(),
  boxShadow: safeShadow.optional(),
  padding: z.number().min(0).max(100).optional(),
}).strict();

export const sceneAnimationSchema = z.object({
  entrance: z.enum(SCENE_ENTRANCE_EFFECTS).default('none'),
  duration: z.number().min(0.1).max(5).default(0.8),
  delay: z.number().min(0).max(3).default(0),
  easing: z.enum(SCENE_EASINGS).default('ease-out'),
  continuous: z.enum(SCENE_CONTINUOUS_EFFECTS).default('none'),
}).strict();

export const sceneNodePropsSchema = z.object({
  text: z.string().max(4000).optional(),
  src: safeMedia.optional(),
  alt: z.string().max(200).optional(),
  shape: z.enum(SCENE_SHAPES).optional(),
  targetDate: z.string().datetime({ offset: true }).optional(),
  mapUrl: z.union([z.literal(''), safeExternalUrl]).optional(),
  buttonLabel: z.string().max(80).optional(),
  heading: z.string().max(160).optional(),
  description: z.string().max(1000).optional(),
  orientation: z.enum(['horizontal', 'vertical']).optional(),
  calendarStyle: z.enum(['minimal', 'heart', 'editorial']).optional(),
  particle: z.enum(['sparkle', 'petal', 'snow']).optional(),
  maxItems: z.number().int().min(1).max(60).optional(),
  columns: z.number().int().min(1).max(4).optional(),
  lockedUntilOpen: z.boolean().optional(),
}).strict();

const sceneBindingSchema = z.object({
  fieldPath: z.string().max(64).optional(),
  mediaRole: z.enum(['hero', 'couple', 'bride', 'groom', 'venue', 'final', 'gallery', 'giftQr']).optional(),
  format: z.enum(['plain', 'date-dot', 'date-long', 'time', 'names']).optional(),
}).strict().refine(
  (value) => !value.fieldPath || isInvitationTextFieldKey(value.fieldPath),
  'Trường nội dung không hỗ trợ.',
);

export const sceneNodeSchema = z.object({
  id: sceneId,
  type: z.enum(SCENE_NODE_TYPES),
  label: z.string().min(1).max(120),
  x: z.number().min(-500).max(1000),
  y: z.number().min(-1000).max(21000),
  width: z.number().min(1).max(1000),
  height: z.number().min(1).max(20000),
  rotation: z.number().min(-360).max(360).default(0),
  zIndex: z.number().int().min(-100).max(1000).default(0),
  locked: z.boolean().default(false),
  hidden: z.boolean().default(false),
  binding: sceneBindingSchema.optional(),
  props: sceneNodePropsSchema.default({}),
  style: sceneNodeStyleSchema.default({}),
  animation: sceneAnimationSchema.default({}),
}).strict();

const sceneNodePatchSchema = z.object({
  x: sceneNodeSchema.shape.x.optional(),
  y: sceneNodeSchema.shape.y.optional(),
  width: sceneNodeSchema.shape.width.optional(),
  height: sceneNodeSchema.shape.height.optional(),
  rotation: sceneNodeSchema.shape.rotation.optional(),
  zIndex: sceneNodeSchema.shape.zIndex.optional(),
  locked: z.boolean().optional(),
  hidden: z.boolean().optional(),
  props: sceneNodePropsSchema.partial().optional(),
  style: sceneNodeStyleSchema.partial().optional(),
  animation: sceneAnimationSchema.partial().optional(),
}).strict();

export const templateSceneSchema = z.object({
  slug: z.string().min(3).max(80),
  version: z.string().min(1).max(40),
  name: z.string().min(1).max(120),
  canvas: z.object({
    width: z.literal(500),
    height: z.number().int().min(800).max(20000),
    backgroundColor: color,
  }).strict(),
  nodes: z.array(sceneNodeSchema).min(1).max(300),
  capabilities: z.array(z.enum(SCENE_NODE_TYPES)).max(SCENE_NODE_TYPES.length).default([]),
}).strict().refine(
  (scene) => new Set(scene.nodes.map((node) => node.id)).size === scene.nodes.length,
  'ID node trong mẫu phải duy nhất.',
);

export const scenePatchSchema = z.object({
  schemaVersion: z.literal(SCENE_SCHEMA_VERSION),
  templateVersion: z.string().min(1).max(40),
  canvasOverrides: z.object({
    height: z.number().int().min(800).max(20000).optional(),
    backgroundColor: color.optional(),
  }).strict().default({}),
  nodeOverrides: z.record(sceneId, sceneNodePatchSchema).default({}),
  addedNodes: z.array(sceneNodeSchema).max(100).default([]),
  deletedNodeIds: z.array(sceneId).max(300).default([]),
  page: z.object({
    autoScroll: z.boolean().optional(),
    autoScrollSpeed: z.number().min(10).max(200).optional(),
    showToolbar: z.boolean().optional(),
    shareTitle: z.string().max(120).optional(),
    shareDescription: z.string().max(240).optional(),
  }).strict().default({}),
}).strict();

export function createScenePatch(template) {
  return {
    schemaVersion: SCENE_SCHEMA_VERSION,
    templateVersion: template.version,
    canvasOverrides: {},
    nodeOverrides: {},
    addedNodes: [],
    deletedNodeIds: [],
    page: {},
  };
}

export function normalizeScenePatch(value, template) {
  const fallback = createScenePatch(template);
  const parsed = scenePatchSchema.safeParse(value);
  if (!parsed.success || parsed.data.templateVersion !== template.version) return fallback;
  const knownIds = new Set(template.nodes.map((node) => node.id));
  parsed.data.addedNodes.forEach((node) => knownIds.add(node.id));
  return {
    ...parsed.data,
    nodeOverrides: Object.fromEntries(
      Object.entries(parsed.data.nodeOverrides).filter(([id]) => knownIds.has(id)),
    ),
    deletedNodeIds: parsed.data.deletedNodeIds.filter((id) => knownIds.has(id)),
  };
}

function mergeNode(node, patch = {}) {
  return {
    ...node,
    ...patch,
    props: { ...node.props, ...(patch.props || {}) },
    style: { ...node.style, ...(patch.style || {}) },
    animation: { ...node.animation, ...(patch.animation || {}) },
  };
}

export function resolveSceneDocument(template, value) {
  const patch = normalizeScenePatch(value, template);
  const deleted = new Set(patch.deletedNodeIds);
  const baseNodes = template.nodes
    .filter((node) => !deleted.has(node.id))
    .map((node) => mergeNode(node, patch.nodeOverrides[node.id]));
  const addedNodes = patch.addedNodes
    .filter((node) => !deleted.has(node.id))
    .map((node) => mergeNode(node, patch.nodeOverrides[node.id]));
  return {
    slug: template.slug,
    version: template.version,
    name: template.name,
    canvas: { ...template.canvas, ...patch.canvasOverrides },
    nodes: [...baseNodes, ...addedNodes].sort((left, right) => left.zIndex - right.zIndex),
    page: patch.page,
    patch,
  };
}

export function patchSceneNode(value, template, nodeId, update) {
  const patch = normalizeScenePatch(value, template);
  const addedIndex = patch.addedNodes.findIndex((node) => node.id === nodeId);
  if (addedIndex >= 0) {
    const addedNodes = [...patch.addedNodes];
    addedNodes[addedIndex] = mergeNode(addedNodes[addedIndex], update);
    return normalizeScenePatch({ ...patch, addedNodes }, template);
  }
  const current = patch.nodeOverrides[nodeId] || {};
  const next = {
    ...current,
    ...update,
    ...(update.props ? { props: { ...(current.props || {}), ...update.props } } : {}),
    ...(update.style ? { style: { ...(current.style || {}), ...update.style } } : {}),
    ...(update.animation ? { animation: { ...(current.animation || {}), ...update.animation } } : {}),
  };
  return normalizeScenePatch({
    ...patch,
    nodeOverrides: { ...patch.nodeOverrides, [nodeId]: next },
  }, template);
}

export function addSceneNode(value, template, node) {
  const patch = normalizeScenePatch(value, template);
  const parsed = sceneNodeSchema.parse(node);
  return normalizeScenePatch({ ...patch, addedNodes: [...patch.addedNodes, parsed] }, template);
}

export function deleteSceneNode(value, template, nodeId) {
  const patch = normalizeScenePatch(value, template);
  const addedNodes = patch.addedNodes.filter((node) => node.id !== nodeId);
  const nodeOverrides = { ...patch.nodeOverrides };
  delete nodeOverrides[nodeId];
  const isBase = template.nodes.some((node) => node.id === nodeId);
  return normalizeScenePatch({
    ...patch,
    addedNodes,
    nodeOverrides,
    deletedNodeIds: isBase ? [...new Set([...patch.deletedNodeIds, nodeId])] : patch.deletedNodeIds,
  }, template);
}

export function makeSceneNodeId(prefix = 'node') {
  const suffix = globalThis.crypto?.randomUUID?.().replace(/-/g, '').slice(0, 12)
    || Math.random().toString(36).slice(2, 14);
  return `${prefix}-${suffix}`;
}

export function clampSceneTransform(node, canvas) {
  const width = Math.min(Math.max(1, Number(node.width) || 1), canvas.width * 2);
  const height = Math.min(Math.max(1, Number(node.height) || 1), canvas.height);
  return {
    x: Math.round(Math.min(canvas.width - 1, Math.max(-width + 1, Number(node.x) || 0)) * 100) / 100,
    y: Math.round(Math.min(canvas.height - 1, Math.max(-height + 1, Number(node.y) || 0)) * 100) / 100,
    width: Math.round(width * 100) / 100,
    height: Math.round(height * 100) / 100,
    rotation: Math.round((((Number(node.rotation) || 0) + 360) % 360) * 100) / 100,
  };
}
