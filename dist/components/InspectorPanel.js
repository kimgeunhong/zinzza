import { useState } from "react";
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Film, Scissors, Youtube } from "lucide-react";

export const InspectorPanel = ({
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!youtubeUrl.trim()) return;
    setIsSubmitting(true);
    try {
      await onRequestYoutubeImport(youtubeUrl);
    } finally {
      setIsSubmitting(false);
    }
  };

  return _jsxs("aside", {
    className: "flex h-full flex-col gap-4 overflow-y-auto border-l border-slate-800 bg-slate-950/70 p-6",
    children: [
      _jsxs("section", {
        className: "space-y-3",
        children: [
          _jsxs("h2", {
            className: "flex items-center gap-2 text-lg font-semibold text-slate-100",
            children: [_jsx(Film, { size: 18 }), " \ubbf8\ub514\uc5b4 & AI \uc5b4\uc2dc\uc2a4\ud134\ud2b8"],
          }),
          _jsxs("form", {
            onSubmit: handleSubmit,
            className: "space-y-3 rounded-xl border border-slate-800 bg-slate-900 p-4",
            children: [
              _jsx("label", {
                className: "block text-xs uppercase text-slate-400",
                children: "\uc720\ud29c\ube0c \uc601\uc0c1 \uac00\uc838\uc624\uae30",
              }),
              _jsxs("div", {
                className: "flex gap-2",
                children: [
                  _jsx("input", {
                    value: youtubeUrl,
                    onChange: (event) => setYoutubeUrl(event.target.value),
                    className:
                      "flex-1 rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none",
                  }),
                  _jsxs("button", {
                    type: "submit",
                    disabled: isSubmitting || isImporting,
                    className:
                      "inline-flex items-center gap-2 rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-slate-900 shadow disabled:cursor-not-allowed disabled:opacity-60",
                    children: [
                      _jsx(Youtube, { size: 16 }),
                      " ",
                      isSubmitting || isImporting ? "\uac00\uc838\uc624\ub294 \uc911" : "\uac00\uc838\uc624\uae30",
                    ],
                  }),
                ],
              }),
              _jsx("p", {
                className: "text-xs text-slate-500",
                children: "\uc790\ub9c9\uc744 \ucd94\ucd9c\ud574 \uc778\uc6a9 \ud074\ub9bd \uc138\uadf8\uba3c\ud2b8\ub85c \uc790\ub3d9 \ucd94\uac00\ud569\ub2c8\ub2e4.",
              }),
            ],
          }),
          _jsxs("label", {
            className: "flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm text-slate-200",
            children: [
              _jsx("span", {
                className: "text-xs uppercase text-slate-400",
                children: "\ud14d\uc2a4\ud2b8/\uc601\uc0c1 \uc5c5\ub85c\ub4dc",
              }),
              _jsx("input", {
                type: "file",
                accept: ".txt,video/*",
                multiple: true,
                onChange: (event) => {
                  if (event.target.files) {
                    onFilesSelected(event.target.files);
                    event.target.value = "";
                  }
                },
                className: "block w-full cursor-pointer rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs",
              }),
              _jsx("span", {
                className: "text-[11px] text-slate-500",
                children: ".txt\ub294 \ub098\ub808\uc774\uc158, \uc601\uc0c1 \ud30c\uc77c\uc740 \uc778\uc6a9 \ud074\ub9bd\uc73c\ub85c \ucd94\uac00\ub429\ub2c8\ub2e4.",
              }),
            ],
          }),
        ],
      }),
      _jsxs("section", {
        className: "rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm text-slate-200",
        children: [
          _jsx("h3", {
            className: "mb-3 text-base font-semibold text-slate-100",
            children: "\uc778\uc6a9 \ud074\ub9bd \ud3b8\uc9d1",
          }),
          selectedSegment && selectedSegment.type === "citation"
            ? _jsxs("div", {
                className: "space-y-4",
                children: [
                  _jsxs("div", {
                    className: "grid grid-cols-2 gap-3",
                    children: [
                      _jsxs("label", {
                        className: "text-xs uppercase text-slate-400",
                        children: [
                          "\uc2dc\uc791 \uc2dc\uac04 (\ucd08)",
                          _jsx("input", {
                            type: "number",
                            min: 0,
                            step: 0.1,
                            value: selectedSegment.startTime,
                            onChange: (event) =>
                              onUpdateTiming(selectedSegment.id, parseFloat(event.target.value), selectedSegment.endTime),
                            className: "mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-2 py-2 text-sm",
                          }),
                        ],
                      }),
                      _jsxs("label", {
                        className: "text-xs uppercase text-slate-400",
                        children: [
                          "\uc885\ub8cc \uc2dc\uac04 (\ucd08)",
                          _jsx("input", {
                            type: "number",
                            min: selectedSegment.startTime,
                            step: 0.1,
                            value: selectedSegment.endTime,
                            onChange: (event) =>
                              onUpdateTiming(selectedSegment.id, selectedSegment.startTime, parseFloat(event.target.value)),
                            className: "mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-2 py-2 text-sm",
                          }),
                        ],
                      }),
                    ],
                  }),
                  _jsxs("div", {
                    className: "flex flex-wrap gap-2",
                    children: ["watermark", "blur", "zoom"].map((key) =>
                      _jsx(
                        "button",
                        {
                          onClick: () => onToggleEffect(selectedSegment.id, key),
                          className:
                            "rounded-full border px-3 py-1 text-xs transition " +
                            (selectedSegment.effects[key]
                              ? "border-emerald-400 bg-emerald-400/10 text-emerald-100"
                              : "border-slate-700 bg-slate-950 text-slate-300 hover:border-emerald-400"),
                          type: "button",
                          children:
                            key === "watermark" ? "\uc6cc\ud130\ub9c8\ud06c" : key === "blur" ? "\ube14\ub7ec" : "\ud655\ub300",
                        },
                        key,
                      ),
                    ),
                  }),
                  _jsxs("button", {
                    onClick: () => onSplit(selectedSegment.id),
                    className:
                      "inline-flex items-center gap-2 rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 hover:border-emerald-400",
                    children: [_jsx(Scissors, { size: 16 }), " \ud074\ub9bd \ubd84\ud560"],
                  }),
                ],
              })
            : _jsx("p", {
                className: "text-sm text-slate-400",
                children: "\uc778\uc6a9 \ud074\ub9bd \uc138\uadf8\uba3c\ud2b8\ub97c \uc120\ud0dd\ud558\uba74 \ud2b8\ub9ac\ubc0d \uc635\uc158\uc774 \ud45c\uc2dc\ub429\ub2c8\ub2e4.",
              }),
        ],
      }),
      aiAssistant || null,
    ],
  });
};
