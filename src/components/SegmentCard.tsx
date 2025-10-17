import { FC, useState } from "react";
import { GripVertical, Mic, Clapperboard, Trash2 } from "lucide-react";
import { Segment } from "../types/segments";

interface SegmentCardProps {
  segment: Segment;
  isSelected: boolean;
  isActive: boolean;
  onSelect: (segmentId: string) => void;
  onDelete: (segmentId: string) => void;
  onUpdateText: (segmentId: string, text: string) => void;
  onDragStart: (segmentId: string) => void;
  onDrop: (segmentId: string) => void;
  onDragEnter: (segmentId: string) => void;
  onDragEnd: () => void;
  isDragSource: boolean;
  isDragTarget: boolean;
}

export const SegmentCard: FC<SegmentCardProps> = ({
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
  const segmentLabel = segment.type === "narration" ? "나레이션" : "인용 클립";

  return (
    <div
      draggable
      onDragStart={() => onDragStart(segment.id)}
      onDragEnter={() => onDragEnter(segment.id)}
      onDragOver={(event) => event.preventDefault()}
      onDrop={() => onDrop(segment.id)}
      onDragEnd={onDragEnd}
      className={`group relative flex cursor-grab items-start gap-3 rounded-xl border p-4 transition ${
        isSelected
          ? "border-emerald-400 bg-emerald-400/10"
          : "border-slate-800 bg-slate-900 hover:border-emerald-400/40"
      } ${isActive ? "ring-2 ring-emerald-500" : ""} ${isDragSource ? "opacity-60" : ""}`}
      onClick={() => onSelect(segment.id)}
    >
      {isDragTarget && (
        <span className="absolute -top-2 left-0 right-0 h-1 rounded-full bg-emerald-400" aria-hidden="true" />
      )}
      <div className="mt-1 flex flex-col items-center text-slate-500">
        <GripVertical size={16} />
        <span className="mt-3 text-[10px] uppercase">{segmentLabel}</span>
      </div>
      <div className="flex-1">
        <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-wide text-slate-400">
          <div className="flex items-center gap-2">
            <Icon size={14} className="text-emerald-300" />
            <span>{segment.label}</span>
          </div>
          <span>
            {segment.startTime.toFixed(1)}s - {segment.endTime.toFixed(1)}s · {segment.duration.toFixed(1)}s
          </span>
        </div>
        {isEditing ? (
          <textarea
            value={segment.text}
            onChange={(event) => onUpdateText(segment.id, event.target.value)}
            onBlur={() => setIsEditing(false)}
            autoFocus
            className="h-24 w-full rounded-md border border-emerald-300 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring"
          />
        ) : (
          <p
            onDoubleClick={() => setIsEditing(true)}
            className="cursor-text whitespace-pre-wrap text-sm text-slate-100"
          >
            {segment.text}
          </p>
        )}
      </div>
      <button
        onClick={(event) => {
          event.stopPropagation();
          onDelete(segment.id);
        }}
        className="rounded-full border border-transparent p-1 text-slate-500 opacity-0 transition group-hover:opacity-100 hover:border-red-500 hover:text-red-400"
        aria-label={`${segment.label} 삭제`}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};
