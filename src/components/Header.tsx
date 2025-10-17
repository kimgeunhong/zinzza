import { FC } from "react";
import { Sun, MoonStar } from "lucide-react";

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Header: FC<HeaderProps> = ({ isDark, onToggleTheme }) => {
  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900/70 px-6 py-4 backdrop-blur">
      <div>
        <h1 className="text-xl font-semibold">자동 리뷰 스튜디오</h1>
        <p className="text-sm text-slate-400">
          텍스트 편집만으로 저작권 안전한 리뷰 영상을 완성하세요
        </p>
      </div>
      <button
        onClick={onToggleTheme}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-medium text-slate-100 shadow hover:bg-slate-700"
      >
        {isDark ? <Sun size={16} /> : <MoonStar size={16} />}
        <span>{isDark ? "라이트 모드" : "다크 모드"}</span>
      </button>
    </header>
  );
};
