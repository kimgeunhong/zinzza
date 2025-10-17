import { FC } from "react";
import YouTube, { YouTubeEvent, YouTubePlayer } from "react-youtube";
import { Play, Pause, Maximize, Volume2 } from "lucide-react";
import { Segment } from "../types/segments";

interface PreviewPanelProps {
  selectedSegment: Segment | null;
  activeSegment: Segment | null;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  onRegister: (player: YouTubePlayer) => void;
  onTogglePlay: () => void;
  onSeek: (seconds: number) => void;
  onPlayerReady: (event: YouTubeEvent) => void;
  onPlayerStateChange: (event: YouTubeEvent) => void;
}

export const PreviewPanel: FC<PreviewPanelProps> = ({
  selectedSegment,
  activeSegment,
  currentTime,
  duration,
  isPlaying,
  onRegister,
  onTogglePlay,
  onSeek,
  onPlayerReady,
  onPlayerStateChange,
}) => {
  const youtubeSegment = selectedSegment?.type === "citation" ? selectedSegment : null;
  const effects = activeSegment?.effects;

  return (
    <section className="flex h-full flex-col gap-4 overflow-y-auto border-b border-slate-800 bg-slate-950/80 p-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-100">실시간 영상 미리보기</h2>
        <p className="text-sm text-slate-400">
          세그먼트를 클릭하면 해당 구간으로 즉시 이동합니다.
        </p>
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-black shadow-xl">
        {youtubeSegment ? (
          <YouTube
            videoId={youtubeSegment.source.kind === "youtube" ? youtubeSegment.source.videoId : undefined}
            className="aspect-video w-full"
            opts={{
              playerVars: {
                start: Math.floor(youtubeSegment.startTime),
                modestbranding: 1,
                rel: 0,
                controls: 0,
              },
            }}
            onReady={(event) => {
              onRegister(event.target);
              onPlayerReady(event);
            }}
            onStateChange={onPlayerStateChange}
          />
        ) : (
          <div className="flex aspect-video items-center justify-center bg-slate-900">
            <p className="text-sm text-slate-400">
              인용 클립을 선택하면 유튜브 미리보기가 표시됩니다.
            </p>
          </div>
        )}
        {effects && (
          <div className="absolute left-4 top-4 flex gap-2 text-xs uppercase">
            {effects.watermark && (
              <span className="rounded bg-black/60 px-2 py-1 text-emerald-200">워터마크</span>
            )}
            {effects.blur && (
              <span className="rounded bg-black/60 px-2 py-1 text-cyan-200">블러</span>
            )}
            {effects.zoom && (
              <span className="rounded bg-black/60 px-2 py-1 text-orange-200">확대</span>
            )}
          </div>
        )}
      </div>
      <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900 p-4">
        <button
          onClick={onTogglePlay}
          className="rounded-full bg-emerald-500 p-2 text-slate-900 shadow hover:bg-emerald-400"
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span>{currentTime.toFixed(1)}s</span>
            <input
              type="range"
              min={0}
              max={Math.max(duration, currentTime, 1)}
              step={0.1}
              value={currentTime}
              onChange={(event) => onSeek(parseFloat(event.target.value))}
              className="h-1 flex-1 cursor-pointer accent-emerald-400"
            />
            <span>{duration.toFixed(1)}s</span>
          </div>
        </div>
        <button className="rounded-full border border-slate-700 p-2 text-slate-400 hover:border-emerald-400 hover:text-emerald-200">
          <Volume2 size={16} />
        </button>
        <button className="rounded-full border border-slate-700 p-2 text-slate-400 hover:border-emerald-400 hover:text-emerald-200">
          <Maximize size={16} />
        </button>
      </div>
    </section>
  );
};
