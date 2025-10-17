import { FC, FormEvent, ReactNode, useState } from "react";
import { Film, Scissors, Youtube } from "lucide-react";
import { Segment } from "../types/segments";

interface InspectorPanelProps {
  selectedSegment: Segment | null;
  onUpdateTiming: (segmentId: string, start: number, end: number) => void;
  onToggleEffect: (segmentId: string, effect: keyof Segment["effects"]) => void;
  onSplit: (segmentId: string) => void;
  onRequestYoutubeImport: (url: string) => Promise<void>;
  onFilesSelected: (files: FileList) => void;
  isImporting: boolean;
  aiAssistant?: ReactNode;
}

export const InspectorPanel: FC<InspectorPanelProps> = ({
  selectedSegment,
  onUpdateTiming,
  onToggleEffect,
  onSplit,
  onRequestYoutubeImport,
  onFilesSelected,
  isImporting,
  aiAssistant,
}) => {
  const [youtubeUrl, setYoutubeUrl] = useState("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!youtubeUrl.trim()) return;
    setIsSubmitting(true);
    try {
      await onRequestYoutubeImport(youtubeUrl);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <aside className="flex h-full flex-col gap-4 overflow-y-auto border-l border-slate-800 bg-slate-950/70 p-6">
      <section className="space-y-3">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-100">
          <Film size={18} /> 미디어 & AI 어시스턴트
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3 rounded-xl border border-slate-800 bg-slate-900 p-4">
          <label className="block text-xs uppercase text-slate-400">유튜브 영상 가져오기</label>
          <div className="flex gap-2">
            <input
              value={youtubeUrl}
              onChange={(event) => setYoutubeUrl(event.target.value)}
              className="flex-1 rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isSubmitting || isImporting}
              className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-slate-900 shadow disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Youtube size={16} /> {isSubmitting || isImporting ? "가져오는 중" : "가져오기"}
            </button>
          </div>
          <p className="text-xs text-slate-500">자막을 추출해 인용 클립 세그먼트로 자동 추가합니다.</p>
        </form>

        <label className="flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm text-slate-200">
          <span className="text-xs uppercase text-slate-400">텍스트/영상 업로드</span>
          <input
            type="file"
            accept=".txt,video/*"
            multiple
            onChange={(event) => {
              if (event.target.files) {
                onFilesSelected(event.target.files);
                event.target.value = "";
              }
            }}
            className="block w-full cursor-pointer rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs"
          />
          <span className="text-[11px] text-slate-500">.txt는 나레이션, 영상 파일은 인용 클립으로 추가됩니다.</span>
        </label>
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm text-slate-200">
        <h3 className="mb-3 text-base font-semibold text-slate-100">인용 클립 편집</h3>
        {selectedSegment && selectedSegment.type === "citation" ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <label className="text-xs uppercase text-slate-400">
                시작 시간 (초)
                <input
                  type="number"
                  min={0}
                  step={0.1}
                  value={selectedSegment.startTime}
                  onChange={(event) =>
                    onUpdateTiming(
                      selectedSegment.id,
                      parseFloat(event.target.value),
                      selectedSegment.endTime,
                    )
                  }
                  className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-2 py-2 text-sm"
                />
              </label>
              <label className="text-xs uppercase text-slate-400">
                종료 시간 (초)
                <input
                  type="number"
                  min={selectedSegment.startTime}
                  step={0.1}
                  value={selectedSegment.endTime}
                  onChange={(event) =>
                    onUpdateTiming(
                      selectedSegment.id,
                      selectedSegment.startTime,
                      parseFloat(event.target.value),
                    )
                  }
                  className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-2 py-2 text-sm"
                />
              </label>
            </div>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  { key: "watermark", label: "워터마크" },
                  { key: "blur", label: "블러" },
                  { key: "zoom", label: "확대" },
                ] as const
              ).map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => onToggleEffect(selectedSegment.id, key)}
                  className={`rounded-full border px-3 py-1 text-xs transition ${
                    selectedSegment.effects[key]
                      ? "border-emerald-400 bg-emerald-400/10 text-emerald-100"
                      : "border-slate-700 bg-slate-950 text-slate-300 hover:border-emerald-400"
                  }`}
                  type="button"
                >
                  {label}
                </button>
              ))}
            </div>
            <button
              onClick={() => onSplit(selectedSegment.id)}
              className="inline-flex items-center gap-2 rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 hover:border-emerald-400"
            >
              <Scissors size={16} /> 클립 분할
            </button>
          </div>
        ) : (
          <p className="text-sm text-slate-400">인용 클립 세그먼트를 선택하면 트리밍 옵션이 표시됩니다.</p>
        )}
      </section>
      {aiAssistant}
    </aside>
  );
};
