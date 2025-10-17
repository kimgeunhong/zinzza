import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import YouTube from "react-youtube";
import { Play, Pause, Maximize, Volume2 } from "lucide-react";

export const PreviewPanel = ({
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
  const youtubeSegment = selectedSegment && selectedSegment.type === "citation" ? selectedSegment : null;
  const effects = activeSegment ? activeSegment.effects : null;

  return _jsxs("section", {
    className: "flex h-full flex-col gap-4 overflow-y-auto border-b border-slate-800 bg-slate-950/80 p-4",
    children: [
      _jsxs("div", {
        children: [
          _jsx("h2", {
            className: "text-lg font-semibold text-slate-100",
            children: "\uc2e4\uc2dc\uac04 \uc601\uc0c1 \ubbf8\ub9ac\ubcf4\uae30",
          }),
          _jsx("p", {
            className: "text-sm text-slate-400",
            children: "\uc138\uadf8\uba3c\ud2b8\ub97c \ud074\ub9ad\ud558\uba74 \ud574\ub2f9 \uad6c\uac04\uc73c\ub85c \uc989\uc2dc \uc774\ub3d9\ud569\ub2c8\ub2e4.",
          }),
        ],
      }),
      _jsxs("div", {
        className: "relative overflow-hidden rounded-2xl border border-slate-800 bg-black shadow-xl",
        children: [
          youtubeSegment
            ? _jsx(YouTube, {
                videoId:
                  youtubeSegment.source && youtubeSegment.source.kind === "youtube"
                    ? youtubeSegment.source.videoId
                    : undefined,
                className: "aspect-video w-full",
                opts: {
                  playerVars: {
                    start: Math.floor(youtubeSegment.startTime),
                    modestbranding: 1,
                    rel: 0,
                    controls: 0,
                  },
                },
                onReady: (event) => {
                  onRegister(event.target);
                  onPlayerReady(event);
                },
                onStateChange: onPlayerStateChange,
              })
            : _jsx("div", {
                className: "flex aspect-video items-center justify-center bg-slate-900",
                children: _jsx("p", {
                  className: "text-sm text-slate-400",
                  children: "\uc778\uc6a9 \ud074\ub9bd\uc744 \uc120\ud0dd\ud558\uba74 \uc720\ud29c\ube0c \ubbf8\ub9ac\ubcf4\uae30\uac00 \ud45c\uc2dc\ub429\ub2c8\ub2e4.",
                }),
              }),
          effects
            ? _jsxs("div", {
                className: "absolute left-4 top-4 flex gap-2 text-xs uppercase",
                children: [
                  effects.watermark
                    ? _jsx("span", {
                        className: "rounded bg-black/60 px-2 py-1 text-emerald-200",
                        children: "\uc6cc\ud130\ub9c8\ud06c",
                      })
                    : null,
                  effects.blur
                    ? _jsx("span", {
                        className: "rounded bg-black/60 px-2 py-1 text-cyan-200",
                        children: "\ube14\ub7ec",
                      })
                    : null,
                  effects.zoom
                    ? _jsx("span", {
                        className: "rounded bg-black/60 px-2 py-1 text-orange-200",
                        children: "\ud655\ub300",
                      })
                    : null,
                ],
              })
            : null,
        ],
      }),
      _jsxs("div", {
        className: "flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900 p-4",
        children: [
          _jsx("button", {
            onClick: onTogglePlay,
            className: "rounded-full bg-emerald-500 p-2 text-slate-900 shadow hover:bg-emerald-400",
            children: isPlaying ? _jsx(Pause, { size: 18 }) : _jsx(Play, { size: 18 }),
          }),
          _jsx("div", {
            className: "flex-1",
            children: _jsxs("div", {
              className: "flex items-center gap-3 text-xs text-slate-400",
              children: [
                _jsx("span", { children: currentTime.toFixed(1) + "s" }),
                _jsx("input", {
                  type: "range",
                  min: 0,
                  max: Math.max(duration, currentTime, 1),
                  step: 0.1,
                  value: currentTime,
                  onChange: (event) => onSeek(parseFloat(event.target.value)),
                  className: "h-1 flex-1 cursor-pointer accent-emerald-400",
                }),
                _jsx("span", { children: duration.toFixed(1) + "s" }),
              ],
            }),
          }),
          _jsx("button", {
            className: "rounded-full border border-slate-700 p-2 text-slate-400 hover:border-emerald-400 hover:text-emerald-200",
            children: _jsx(Volume2, { size: 16 }),
          }),
          _jsx("button", {
            className: "rounded-full border border-slate-700 p-2 text-slate-400 hover:border-emerald-400 hover:text-emerald-200",
            children: _jsx(Maximize, { size: 16 }),
          }),
        ],
      }),
    ],
  });
};
