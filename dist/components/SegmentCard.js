import { useState } from "react";
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { GripVertical, Mic, Clapperboard, Trash2 } from "lucide-react";

export const SegmentCard = ({
  segment,
  isSelected,
  isActive,
  onSelect,
  onDelete,
  onUpdateText,
  onDragStart,
  onDrop,
  onDragEnter,
  onDragEnd,
  isDragSource,
  isDragTarget,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const Icon = segment.type === "narration" ? Mic : Clapperboard;
  const segmentLabel = segment.type === "narration" ? "\ub098\ub808\uc774\uc158" : "\uc778\uc6a9 \ud074\ub9bd";

  return _jsxs("div", {
    draggable: true,
    onDragStart: () => onDragStart(segment.id),
    onDragEnter: () => onDragEnter(segment.id),
    onDragOver: (event) => event.preventDefault(),
    onDrop: () => onDrop(segment.id),
    onDragEnd: onDragEnd,
    className:
      "group relative flex cursor-grab items-start gap-3 rounded-xl border p-4 transition " +
      (isSelected ? "border-emerald-400 bg-emerald-400/10" : "border-slate-800 bg-slate-900 hover:border-emerald-400/40") +
      (isActive ? " ring-2 ring-emerald-500" : "") +
      (isDragSource ? " opacity-60" : ""),
    onClick: () => onSelect(segment.id),
    children: [
      isDragTarget
        ? _jsx("span", {
            className: "absolute -top-2 left-0 right-0 h-1 rounded-full bg-emerald-400",
            "aria-hidden": "true",
          })
        : null,
      _jsxs("div", {
        className: "mt-1 flex flex-col items-center text-slate-500",
        children: [
          _jsx(GripVertical, { size: 16 }),
          _jsx("span", {
            className: "mt-3 text-[10px] uppercase",
            children: segmentLabel,
          }),
        ],
      }),
      _jsxs("div", {
        className: "flex-1",
        children: [
          _jsxs("div", {
            className: "mb-2 flex items-center justify-between text-xs uppercase tracking-wide text-slate-400",
            children: [
              _jsxs("div", {
                className: "flex items-center gap-2",
                children: [
                  _jsx(Icon, { size: 14, className: "text-emerald-300" }),
                  _jsx("span", { children: segment.label }),
                ],
              }),
              _jsxs("span", {
                children: [
                  segment.startTime.toFixed(1),
                  "s - ",
                  segment.endTime.toFixed(1),
                  "s \00B7 ",
                  segment.duration.toFixed(1),
                  "s",
                ],
              }),
            ],
          }),
          isEditing
            ? _jsx("textarea", {
                value: segment.text,
                onChange: (event) => onUpdateText(segment.id, event.target.value),
                onBlur: () => setIsEditing(false),
                autoFocus: true,
                className:
                  "h-24 w-full rounded-md border border-emerald-300 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring",
              })
            : _jsx("p", {
                onDoubleClick: () => setIsEditing(true),
                className: "cursor-text whitespace-pre-wrap text-sm text-slate-100",
                children: segment.text,
              }),
        ],
      }),
      _jsx("button", {
        onClick: (event) => {
          event.stopPropagation();
          onDelete(segment.id);
        },
        className:
          "rounded-full border border-transparent p-1 text-slate-500 opacity-0 transition group-hover:opacity-100 hover:border-red-500 hover:text-red-400",
        "aria-label": `${segment.label} \uc0ad\uc81c`,
        children: _jsx(Trash2, { size: 16 }),
      }),
    ],
  });
};
