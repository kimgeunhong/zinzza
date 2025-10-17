import { FC } from "react";
import { BookOpen, Monitor, Settings2 } from "lucide-react";
import { ProjectSettings, ProjectTemplate } from "../types/segments";

interface SidebarProps {
  settings: ProjectSettings;
  onChange: (settings: ProjectSettings) => void;
  templates: ProjectTemplate[];
  citationRatio: number;
  templateLimit: number;
}

export const Sidebar: FC<SidebarProps> = ({
  settings,
  onChange,
  templates,
  citationRatio,
  templateLimit,
}) => {
  const handleChange = (patch: Partial<ProjectSettings>) => {
    onChange({ ...settings, ...patch });
  };

  return (
    <aside className="flex h-full flex-col gap-6 overflow-y-auto border-r border-slate-800 bg-slate-950/80 p-6">
      <section>
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
          <Settings2 size={16} /> 프로젝트 설정
        </div>
        <label className="mb-4 block text-sm">
          <span className="mb-1 block text-slate-300">프로젝트 제목</span>
          <input
            value={settings.title}
            onChange={(event) => handleChange({ title: event.target.value })}
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-slate-300">화면 비율</span>
          <select
            value={settings.aspectRatio}
            onChange={(event) =>
              handleChange({ aspectRatio: event.target.value as ProjectSettings["aspectRatio"] })
            }
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
          >
            <option value="16:9">16:9 (유튜브)</option>
            <option value="9:16">9:16 (틱톡/쇼츠)</option>
            <option value="1:1">1:1 (피드)</option>
          </select>
        </label>
      </section>

      <section>
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
          <BookOpen size={16} /> 템플릿
        </div>
        <div className="grid gap-3">
          {templates.map((template) => {
            const isActive = template.id === settings.templateId;
            return (
              <button
                key={template.id}
                onClick={() => handleChange({ templateId: template.id })}
                className={`rounded-lg border px-4 py-3 text-left transition ${
                  isActive
                    ? "border-emerald-400 bg-emerald-400/10 text-emerald-100"
                    : "border-slate-800 bg-slate-900 hover:border-emerald-400/60"
                }`}
              >
                <div className="text-sm font-semibold">{template.name}</div>
                <p className="mt-1 text-xs text-slate-400">{template.description}</p>
                <p className="mt-2 text-[11px] uppercase text-slate-500">
                  BGM: {template.bgm} · 인용 한도 {(template.citationLimit * 100).toFixed(0)}%
                </p>
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
          <Monitor size={16} /> 인용 비율 현황
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-4 text-sm">
          <p className="text-slate-300">
            현재 인용 비율: <span className="font-semibold text-emerald-300">{(citationRatio * 100).toFixed(1)}%</span>
          </p>
          <p className="mt-1 text-xs text-slate-500">템플릿 허용치 {(templateLimit * 100).toFixed(0)}%</p>
        </div>
      </section>
    </aside>
  );
};
