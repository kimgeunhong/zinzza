import { FC, useRef, useState } from "react";
import { PlusCircle } from "lucide-react";
import { Segment } from "../types/segments";
import { SegmentCard } from "./SegmentCard";

interface EditorPanelProps {
  segments: Segment[];
  selectedId: string | null;
  activeId: string | null;
  onSelect: (segmentId: string) => void;
  onDelete: (segmentId: string) => void;
  onUpdateText: (segmentId: string, text: string) => void;
  onAddNarration: () => void;
  onAddCitation: () => void;
  onReorder: (sourceId: string, targetId: string) => void;
}

export const EditorPanel: FC<EditorPanelProps> = ({
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
  const dragSourceRef = useRef<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragTargetId, setDragTargetId] = useState<string | null>(null);

  const handleDragStart = (segmentId: string) => {
    dragSourceRef.current = segmentId;
    setDraggingId(segmentId);
    setDragTargetId(segmentId);
  };

  const handleDrop = (targetId: string) => {
    if (dragSourceRef.current && dragSourceRef.current !== targetId) {
      onReorder(dragSourceRef.current, targetId);
    }
    dragSourceRef.current = null;
    setDraggingId(null);
    setDragTargetId(null);
  };

  const handleDragEnter = (segmentId: string) => {
    if (dragSourceRef.current && dragSourceRef.current !== segmentId) {
      setDragTargetId(segmentId);
    }
  };

  const handleDragEnd = () => {
    dragSourceRef.current = null;
    setDraggingId(null);
    setDragTargetId(null);
  };

  return (
    <section className="flex h-full flex-col gap-4 overflow-y-auto px-6 py-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-100">스크립트 기반 편집기</h2>
        <p className="text-sm text-slate-400">
          세그먼트를 드래그하여 순서를 바꾸고, 더블클릭으로 나레이션을 수정하세요.
        </p>
      </div>
      <div className="grid gap-4">
        {segments.map((segment) => (
          <SegmentCard
            key={segment.id}
            segment={segment}
            isSelected={selectedId === segment.id}
            isActive={activeId === segment.id}
            onSelect={onSelect}
            onDelete={onDelete}
            onUpdateText={onUpdateText}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            onDragEnter={handleDragEnter}
            onDragEnd={handleDragEnd}
            isDragSource={draggingId === segment.id}
            isDragTarget={dragTargetId === segment.id && draggingId !== segment.id}
          />
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={onAddNarration}
          className="inline-flex items-center gap-2 rounded-lg border border-emerald-500 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-100 hover:bg-emerald-500/20"
        >
          <PlusCircle size={16} /> 나레이션 추가
        </button>
        <button
          onClick={onAddCitation}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 hover:border-emerald-400"
        >
          <PlusCircle size={16} /> 인용 클립 추가
        </button>
      </div>
    </section>
  );
};
