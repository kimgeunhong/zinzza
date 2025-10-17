import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Sun, MoonStar } from "lucide-react";

export const Header = ({ isDark, onToggleTheme }) => {
  return _jsxs("header", {
    className: "flex items-center justify-between border-b border-slate-800 bg-slate-900/70 px-6 py-4 backdrop-blur",
    children: [
      _jsxs("div", {
        children: [
          _jsx("h1", {
            className: "text-xl font-semibold",
            children: "\uc790\ub3d9 \ub9ac\ubdf0 \uc2a4\ud29c\ub514\uc624",
          }),
          _jsx("p", {
            className: "text-sm text-slate-400",
            children: "\ud14d\uc2a4\ud2b8 \ud3b8\uc9d1\ub9cc\uc73c\ub85c \uc800\uc791\uad8c \uc548\uc804\ud55c \ub9ac\ubdf0 \uc601\uc0c1\uc744 \uc644\uc131\ud558\uc138\uc694",
          }),
        ],
      }),
      _jsxs("button", {
        onClick: onToggleTheme,
        className:
          "inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-medium text-slate-100 shadow hover:bg-slate-700",
        children: [
          isDark ? _jsx(Sun, { size: 16 }) : _jsx(MoonStar, { size: 16 }),
          _jsx("span", {
            children: isDark ? "\ub77c\uc774\ud2b8 \ubaa8\ub4dc" : "\ub2e4\ud06c \ubaa8\ub4dc",
          }),
        ],
      }),
    ],
  });
};
