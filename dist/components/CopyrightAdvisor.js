import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertTriangle, CheckCircle, ShieldAlert } from "lucide-react";

export const CopyrightAdvisor = ({ ratio, limit }) => {
  const status = ratio <= limit ? "safe" : ratio <= limit * 1.5 ? "warning" : "danger";

  const config =
    status === "safe"
      ? {
          icon: CheckCircle,
          description: "\ud604\uc7ac \uc778\uc6a9 \ube44\uc728\uc774 \ud15c\ud50c\ub9bf \uac00\uc774\ub4dc \ub0b4\uc5d0 \uc788\uc2b5\ub2c8\ub2e4.",
          tone: "text-emerald-300 border-emerald-500/40",
        }
      : status === "warning"
      ? {
          icon: AlertTriangle,
          description: "\uc778\uc6a9 \ube44\uc728\uc774 \uc99d\uac00\ud558\uace0 \uc788\uc2b5\ub2c8\ub2e4. \uc77c\ubd80 \uad6c\uac04\uc744 \ucd95\uc18c\ud574 \ubcf4\uc138\uc694.",
          tone: "text-amber-300 border-amber-500/40",
        }
      : {
          icon: ShieldAlert,
          description: "\uc800\uc791\uad8c \ub9ac\uc2a4\ud06c\uac00 \ub192\uc2b5\ub2c8\ub2e4. \uc778\uc6a9 \uad6c\uac04\uc744 \uacfc\uac10\ud788 \uc904\uc5ec \uc8fc\uc138\uc694.",
          tone: "text-rose-300 border-rose-500/40",
        };

  const Icon = config.icon;

  return _jsxs("section", {
    className: `rounded-xl border ${config.tone} bg-slate-900 p-4 text-sm text-slate-200`,
    children: [
      _jsxs("div", {
        className: "flex items-center gap-2 text-base font-semibold",
        children: [_jsx(Icon, { size: 18 }), " \uc800\uc791\uad8c \uc5b4\ub4dc\ubc14\uc774\uc800"],
      }),
      _jsx("p", {
        className: "mt-2 text-xs text-slate-400",
        children: `\uc778\uc6a9 \ube44\uc728: ${(ratio * 100).toFixed(1)}% · \uc81c\ud55c: ${(limit * 100).toFixed(0)}%`,
      }),
      _jsx("p", {
        className: "mt-2 text-sm text-slate-200",
        children: config.description,
      }),
    ],
  });
};
