import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { BrainCircuit, Sparkles, Wand2 } from "lucide-react";

export const AiAssistant = ({
  isLoading,
  lastResult,
  onPolish,
  onSuggestBroll,
  onCreateShorts,
  onGenerateChapters,
}) => {
  return _jsxs("section", {
    className: "rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm text-slate-100",
    children: [
      _jsxs("div", {
        className: "mb-3 flex items-center gap-2 text-base font-semibold",
        children: [_jsx(BrainCircuit, { size: 18 }), " Gemini AI \uc5b4\uc2dc\uc2a4\ud134\ud2b8"],
      }),
      _jsxs("p", {
        className: "mb-4 text-xs text-slate-400",
        children: [
          "\uc120\ud0dd\ub41c \ub098\ub808\uc774\uc158 \ub610\ub294 \uc804\uccb4 \uc2a4\ud06c\ub9bd\ud2b8\ub97c \uae30\ubc18\uc73c\ub85c \ud55c \ud074\ub9ad \uc790\ub3d9\ud654\ub97c \uc9c0\uc6d0\ud569\ub2c8\ub2e4. ",
          "\uc220\ud3ec\ubc0f \ucc55\ud130 \uc0dd\uc131\uc740 \ud31d\uc5c5\uc73c\ub85c \ud45c\uc2dc\ub429\ub2c8\ub2e4.",
        ],
      }),
      _jsxs("div", {
        className: "grid gap-2",
        children: [
          _jsxs("button", {
            onClick: onPolish,
            disabled: isLoading,
            className:
              "inline-flex items-center gap-2 rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-left hover:border-emerald-400 disabled:opacity-60",
            children: [_jsx(Sparkles, { size: 16 }), " \ub098\ub808\uc774\uc158 \ub2e8\uc74c\uae30"],
          }),
          _jsxs("button", {
            onClick: onSuggestBroll,
            disabled: isLoading,
            className:
              "inline-flex items-center gap-2 rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-left hover:border-emerald-400 disabled:opacity-60",
            children: [_jsx(Wand2, { size: 16 }), " B-roll \ucd94\ucc9c"],
          }),
          _jsxs("button", {
            onClick: onCreateShorts,
            disabled: isLoading,
            className:
              "inline-flex items-center gap-2 rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-left hover:border-emerald-400 disabled:opacity-60",
            children: ["\ud83c\udfac \uc220\ud3ec\uba74 \uc2a4\ud06c\ub9bd\ud2b8 \uc0dd\uc131"],
          }),
          _jsxs("button", {
            onClick: onGenerateChapters,
            disabled: isLoading,
            className:
              "inline-flex items-center gap-2 rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-left hover:border-emerald-400 disabled:opacity-60",
            children: ["⏱️ \uc720\ud29c\ube0c \ucc55\ud130 \uc0dd\uc131"],
          }),
        ],
      }),
      _jsx("div", {
        className: "mt-4 rounded-lg border border-slate-800 bg-slate-950 p-3 text-xs text-slate-300 whitespace-pre-wrap",
        "aria-live": "polite",
        children: isLoading ? "Gemini가 열심히 생각 중입니다..." : lastResult || "AI 결과가 여기에 표시됩니다.",
      }),
    ],
  });
};
