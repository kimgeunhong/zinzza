import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { BookOpen, Monitor, Settings2 } from "lucide-react";

export const Sidebar = ({ settings, onChange, templates, citationRatio, templateLimit }) => {
  const handleChange = (patch) => {
    onChange({ ...settings, ...patch });
  };

  return _jsxs("aside", {
    className: "flex h-full flex-col gap-6 overflow-y-auto border-r border-slate-800 bg-slate-950/80 p-6",
    children: [
      _jsxs("section", {
        children: [
          _jsxs("div", {
            className:
              "mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-400",
            children: [_jsx(Settings2, { size: 16 }), " \ud504\ub85c\uc81d\ud2b8 \uc124\uc815"],
          }),
          _jsxs("label", {
            className: "mb-4 block text-sm",
            children: [
              _jsx("span", {
                className: "mb-1 block text-slate-300",
                children: "\ud504\ub85c\uc81d\ud2b8 \uc81c\ubaa9",
              }),
              _jsx("input", {
                value: settings.title,
                onChange: (event) => handleChange({ title: event.target.value }),
                className:
                  "w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none",
              }),
            ],
          }),
          _jsxs("label", {
            className: "block text-sm",
            children: [
              _jsx("span", {
                className: "mb-1 block text-slate-300",
                children: "\ud654\uba74 \ube44\uc728",
              }),
              _jsxs("select", {
                value: settings.aspectRatio,
                onChange: (event) => handleChange({ aspectRatio: event.target.value }),
                className:
                  "w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none",
                children: [
                  _jsx("option", { value: "16:9", children: "16:9 (\uc720\ud29c\ube0c)" }),
                  _jsx("option", { value: "9:16", children: "9:16 (\ud2f1\ud1a1/\uc1fc\uce20)" }),
                  _jsx("option", { value: "1:1", children: "1:1 (\ud53c\ub4dc)" }),
                ],
              }),
            ],
          }),
        ],
      }),
      _jsxs("section", {
        children: [
          _jsxs("div", {
            className:
              "mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-400",
            children: [_jsx(BookOpen, { size: 16 }), " \ud15c\ud50c\ub9bf"],
          }),
          _jsx("div", {
            className: "grid gap-3",
            children: templates.map((template) => {
              const isActive = template.id === settings.templateId;
              return _jsxs(
                "button",
                {
                  onClick: () => handleChange({ templateId: template.id }),
                  className:
                    "rounded-lg border px-4 py-3 text-left transition " +
                    (isActive
                      ? "border-emerald-400 bg-emerald-400/10 text-emerald-100"
                      : "border-slate-800 bg-slate-900 hover:border-emerald-400/60"),
                  children: [
                    _jsx("div", {
                      className: "text-sm font-semibold",
                      children: template.name,
                    }),
                    _jsx("p", {
                      className: "mt-1 text-xs text-slate-400",
                      children: template.description,
                    }),
                    _jsxs("p", {
                      className: "mt-2 text-[11px] uppercase text-slate-500",
                      children: [
                        "BGM: ",
                        template.bgm,
                        " \00B7 \uc778\uc6a9 \ud55c\ub3c4 ",
                        Math.round(template.citationLimit * 100),
                        "%",
                      ],
                    }),
                  ],
                },
                template.id,
              );
            }),
          }),
        ],
      }),
      _jsxs("section", {
        children: [
          _jsxs("div", {
            className:
              "mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-400",
            children: [_jsx(Monitor, { size: 16 }), " \uc778\uc6a9 \ube44\uc728 \ud604\ud669"],
          }),
          _jsxs("div", {
            className: "rounded-lg border border-slate-800 bg-slate-900 p-4 text-sm",
            children: [
              _jsxs("p", {
                className: "text-slate-300",
                children: [
                  "\ud604\uc7ac \uc778\uc6a9 \ube44\uc728: ",
                  _jsxs("span", {
                    className: "font-semibold text-emerald-300",
                    children: [(citationRatio * 100).toFixed(1), "%"],
                  }),
                ],
              }),
              _jsxs("p", {
                className: "mt-1 text-xs text-slate-500",
                children: ["\ud15c\ud50c\ub9bf \ud5c8\uc6a9\uce58 ", Math.round(templateLimit * 100), "%"],
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
