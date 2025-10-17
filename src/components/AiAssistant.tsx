import { FC } from "react";
import { BrainCircuit, Sparkles, Wand2 } from "lucide-react";

interface AiAssistantProps {
  isLoading: boolean;
  lastResult: string;
  onPolish: () => Promise<void>;
  onSuggestBroll: () => Promise<void>;
  onCreateShorts: () => Promise<void>;
  onGenerateChapters: () => Promise<void>;
}

export const AiAssistant: FC<AiAssistantProps> = ({
  isLoading,
  lastResult,
  onPolish,
  onSuggestBroll,
  onCreateShorts,
  onGenerateChapters,
}) => {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm text-slate-100">
      <div className="mb-3 flex items-center gap-2 text-base font-semibold">
        <BrainCircuit size={18} /> Gemini AI 어시스턴트
      </div>
      <p className="mb-4 text-xs text-slate-400">
        선택된 나레이션 또는 전체 스크립트를 기반으로 한 클릭 자동화를 지원합니다. 숏폼과 챕터 생성은 팝업으로
        표시됩니다.
      </p>
      <div className="grid gap-2">
        <button
          onClick={onPolish}
          disabled={isLoading}
          className="inline-flex items-center gap-2 rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-left hover:border-emerald-400 disabled:opacity-60"
        >
          <Sparkles size={16} /> 나레이션 다듬기
        </button>
        <button
          onClick={onSuggestBroll}
          disabled={isLoading}
          className="inline-flex items-center gap-2 rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-left hover:border-emerald-400 disabled:opacity-60"
        >
          <Wand2 size={16} /> B-roll 추천
        </button>
        <button
          onClick={onCreateShorts}
          disabled={isLoading}
          className="inline-flex items-center gap-2 rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-left hover:border-emerald-400 disabled:opacity-60"
        >
          🎬 숏폼 스크립트 생성
        </button>
        <button
          onClick={onGenerateChapters}
          disabled={isLoading}
          className="inline-flex items-center gap-2 rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-left hover:border-emerald-400 disabled:opacity-60"
        >
          ⏱️ 유튜브 챕터 생성
        </button>
      </div>
      <div
        className="mt-4 rounded-lg border border-slate-800 bg-slate-950 p-3 text-xs text-slate-300 whitespace-pre-wrap"
        aria-live="polite"
      >
        {isLoading ? "Gemini가 열심히 생각 중입니다..." : lastResult || "AI 결과가 여기에 표시됩니다."}
      </div>
    </section>
  );
};
