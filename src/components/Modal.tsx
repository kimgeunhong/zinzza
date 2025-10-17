import { FC, useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  title: string;
  content: string;
  onClose: () => void;
}

export const Modal: FC<ModalProps> = ({ title, content, onClose }) => {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-950 p-6 text-slate-100 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border border-slate-700 bg-slate-900 p-1 text-slate-300 hover:border-emerald-400 hover:text-emerald-200"
          aria-label="닫기"
        >
          <X size={18} />
        </button>
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="mt-4 max-h-[60vh] overflow-y-auto whitespace-pre-wrap rounded-lg border border-slate-800 bg-slate-900 p-4 text-sm text-slate-200">
          {content}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 shadow hover:bg-emerald-400"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};
