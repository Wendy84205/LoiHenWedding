import React, { useEffect, useMemo, useRef, useState } from 'react';
import Moveable from 'react-moveable';
import { SceneSurface } from './SceneRenderer.jsx';
import { clampSceneTransform, resolveSceneDocument } from './sceneSchema.js';

function transformValue(node) {
  return `translate(${node.x}px, ${node.y}px) rotate(${node.rotation || 0}deg)`;
}

export default function SceneEditorCanvas({
  template, patch, content, theme, zoom = 1, selectedNodeId, onSelectNode, onCommitNode,
  onDeleteNode, onDuplicateNode, onEditBinding, replayKey = 0,
}) {
  const shellRef = useRef(null);
  const rootRef = useRef(null);
  const liveRef = useRef(null);
  const [target, setTarget] = useState(null);
  const [guidelines, setGuidelines] = useState([]);
  const scene = useMemo(() => resolveSceneDocument(template, patch), [patch, template]);
  const selectedNode = scene.nodes.find((node) => node.id === selectedNodeId) || null;

  useEffect(() => {
    const nodeElements = rootRef.current
      ? [...rootRef.current.querySelectorAll('[data-scene-node]')]
      : [];
    const nextTarget = selectedNodeId
      ? nodeElements.find((element) => element.dataset.sceneNode === selectedNodeId) || null
      : null;
    setTarget(nextTarget);
    setGuidelines(nodeElements.filter((element) => element !== nextTarget));
  }, [scene, selectedNodeId]);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return undefined;
    const onKeyDown = (event) => {
      if (!selectedNode || event.target.closest('input,textarea,select,[contenteditable=true]')) return;
      if (event.key === 'Delete' || event.key === 'Backspace') {
        if (!selectedNode.locked) {
          event.preventDefault();
          onDeleteNode?.(selectedNode.id);
        }
        return;
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'd') {
        event.preventDefault();
        onDuplicateNode?.(selectedNode.id);
        return;
      }
      const direction = {
        ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1],
      }[event.key];
      if (!direction || selectedNode.locked) return;
      event.preventDefault();
      const step = event.shiftKey ? 10 : 1;
      const next = clampSceneTransform({
        ...selectedNode,
        x: selectedNode.x + direction[0] * step,
        y: selectedNode.y + direction[1] * step,
      }, scene.canvas);
      onCommitNode?.(selectedNode.id, { x: next.x, y: next.y });
    };
    shell.addEventListener('keydown', onKeyDown);
    return () => shell.removeEventListener('keydown', onKeyDown);
  }, [onCommitNode, onDeleteNode, onDuplicateNode, scene.canvas, selectedNode]);

  const commitLive = () => {
    if (!selectedNode || !liveRef.current) return;
    const next = clampSceneTransform({ ...selectedNode, ...liveRef.current }, scene.canvas);
    liveRef.current = null;
    onCommitNode?.(selectedNode.id, next);
  };

  return (
    <div className="sceneEditorShell" ref={shellRef} tabIndex="0" aria-label="Canvas thiết kế thiệp">
      <div className="sceneEditorStage" style={{ width: `${scene.canvas.width * zoom}px`, height: `${scene.canvas.height * zoom}px` }}>
        <div className="sceneEditorScale" ref={rootRef} style={{ width: `${scene.canvas.width}px`, height: `${scene.canvas.height}px`, transform: `scale(${zoom})` }}>
          <SceneSurface
            scene={scene}
            content={content}
            theme={theme}
            editor
            opened
            selectedNodeId={selectedNodeId}
            onSelectNode={onSelectNode}
            onEditNode={(node) => onEditBinding?.(node)}
            replayKey={replayKey}
          />
          {target && selectedNode && !selectedNode.locked && <Moveable
            target={target}
            container={null}
            draggable
            resizable
            rotatable
            pinchable
            snappable
            snapCenter
            snapGap
            elementGuidelines={guidelines}
            verticalGuidelines={[0, 250, 500]}
            horizontalGuidelines={[0, scene.canvas.height / 2, scene.canvas.height]}
            bounds={{ left: 0, top: 0, right: scene.canvas.width, bottom: scene.canvas.height, position: 'css' }}
            keepRatio={selectedNode.type === 'image' || selectedNode.type === 'giftQr'}
            throttleDrag={0}
            throttleResize={0}
            throttleRotate={1}
            renderDirections={['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']}
            rotationPosition="top"
            zoom={1 / Math.max(zoom, 0.01)}
            onDrag={({ target: element, beforeTranslate }) => {
              const [x, y] = beforeTranslate;
              liveRef.current = { ...(liveRef.current || {}), x, y };
              element.style.transform = `translate(${x}px, ${y}px) rotate(${liveRef.current.rotation ?? selectedNode.rotation ?? 0}deg)`;
            }}
            onDragEnd={commitLive}
            onResize={({ target: element, width, height, drag }) => {
              const [x, y] = drag.beforeTranslate;
              liveRef.current = { ...(liveRef.current || {}), x, y, width, height };
              element.style.width = `${width}px`;
              element.style.height = `${height}px`;
              element.style.transform = `translate(${x}px, ${y}px) rotate(${liveRef.current.rotation ?? selectedNode.rotation ?? 0}deg)`;
            }}
            onResizeEnd={commitLive}
            onRotate={({ target: element, beforeRotate }) => {
              liveRef.current = { ...(liveRef.current || {}), rotation: beforeRotate };
              const x = liveRef.current.x ?? selectedNode.x;
              const y = liveRef.current.y ?? selectedNode.y;
              element.style.transform = `translate(${x}px, ${y}px) rotate(${beforeRotate}deg)`;
            }}
            onRotateEnd={commitLive}
          />}
        </div>
      </div>
    </div>
  );
}

export function resetNodeElement(element, node) {
  if (!element || !node) return;
  element.style.width = `${node.width}px`;
  element.style.height = `${node.height}px`;
  element.style.transform = transformValue(node);
}
