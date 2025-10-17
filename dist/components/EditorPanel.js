import { useRef, useState } from "react";
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { PlusCircle } from "lucide-react";
import { SegmentCard } from "./SegmentCard.js";

export const EditorPanel = ({
  segments,
  selectedId,
  activeId,
  onSelect,
  onDelete,
  onUpdateText,
  onAddNarration,
  onAddCitation,
  onReorder,
}) => {
  const dragSourceRef = useRef(null);
  const [draggingId, setDraggingId] = useState(null);
  const [dragTargetId, setDragTargetId] = useState(null);

  const handleDragStart = (segmentId) => {
    dragSourceRef.current = segmentId;
    setDraggingId(segmentId);
    setDragTargetId(segmentId);
  };

  const handleDrop = (targetId) => {
    if (dragSourceRef.current && dragSourceRef.current !== targetId) {
      onReorder(dragSourceRef.current, targetId);
    }
    dragSourceRef.current = null;
    setDraggingId(null);
    setDragTargetId(null);
  };

  const handleDragEnter = (segmentId) => {
    if (dragSourceRef.current && dragSourceRef.current !== segmentId) {
      setDragTargetId(segmentId);
    }
  };

  const handleDragEnd = () => {
    dragSourceRef.current = null;
    setDraggingId(null);
    setDragTargetId(null);
  };

  return _jsxs("section", {
    className: "flex h-full flex-col gap-4 overflow-y-auto px-6 py-6",
    children: [
      _jsxs("div", {
        children: [
          _jsx("h2", { className: "text-lg font-semibold text-slate-100", children: "\uc2a4\ud06c\ub9bd\ud2b8 \uae30\ubc18 \ud3b8\uc9d1\uae30" }),
          _jsx("p", {
            className: "text-sm text-slate-400",
            children: "\uc138\uadf8\uba3c\ud2b8\ub97c \ub4dc\ub798\uadf8\ud558\uc5ec \uc21c\uc11c\ub97c \ubc14\uafbc \ub2e4\uc74c, \ub354\ube14\ud074\ub9ad\uc73c\ub85c \ub098\ub808\uc774\uc158\uc744 \uc218\uc815\ud558\uc138\uc694.",
          }),
        ],
      }),
      _jsx("div", {
        className: "grid gap-4",
        children: segments.map((segment) =>
          _jsx(SegmentCard, {
            segment: segment,
            isSelected: selectedId === segment.id,
            isActive: activeId === segment.id,
            onSelect: onSelect,
            onDelete: onDelete,
            onUpdateText: onUpdateText,
            onDragStart: handleDragStart,
            onDrop: handleDrop,
            onDragEnter: handleDragEnter,
            onDragEnd: handleDragEnd,
            isDragSource: draggingId === segment.id,
            isDragTarget: dragTargetId === segment.id && draggingId !== segment.id,
          },
          segment.id),
        ),
      }),
      _jsxs("div", {
        className: "mt-4 flex items-center gap-3",
        children: [
          _jsxs("button", {
            onClick: onAddNarration,
            className:
              "inline-flex items-center gap-2 rounded-lg border border-emerald-500 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-100 hover:bg-emerald-500/20",
            children: [_jsx(PlusCircle, { size: 16 }), " \ub098\ub808\uc774\uc158 \ucd94\uac00"],
          }),
          _jsxs("button", {
            onClick: onAddCitation,
            className:
              "inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 hover:border-emerald-400",
            children: [_jsx(PlusCircle, { size: 16 }), " \uc778\uc6a9 \ud074\ub9bd \ucd94\uac00"],
          }),
        ],
      }),
    ],
  });
};
