import { FC } from "react";
import { AlertTriangle, CheckCircle, ShieldAlert } from "lucide-react";

interface CopyrightAdvisorProps {
  ratio: number;
  limit: number;
}

export const CopyrightAdvisor: FC<CopyrightAdvisorProps> = ({ ratio, limit }) => {
  const status = ratio <= limit ? "safe" : ratio <= limit * 1.5 ? "warning" : "danger";

  const { icon: Icon, label, description, tone } =
    status === "safe"
      ? {
          icon: CheckCircle,
          label: "안전",
          description: "현재 인용 비율이 템플릿 가이드 내에 있습니다.",
          tone: "text-emerald-300 border-emerald-500/40",
        }
      : status === "warning"
      ? {
          icon: AlertTriangle,
          label: "주의",
          description: "인용 비율이 증가하고 있습니다. 일부 구간을 축소해 보세요.",
          tone: "text-amber-300 border-amber-500/40",
        }
      : {
          icon: ShieldAlert,
          label: "위험",
          description: "저작권 리스크가 높습니다. 인용 구간을 과감히 줄여 주세요.",
          tone: "text-rose-300 border-rose-500/40",
        };

  return (
    <section className={`rounded-xl border ${tone} bg-slate-900 p-4 text-sm text-slate-200`}>
      <div className="flex items-center gap-2 text-base font-semibold">
        <Icon size={18} /> 저작권 어드바이저
      </div>
      <p className="mt-2 text-xs text-slate-400">인용 비율: {(ratio * 100).toFixed(1)}% · 제한: {(limit * 100).toFixed(0)}%</p>
      <p className="mt-2 text-sm text-slate-200">{description}</p>
    </section>
  );
};
