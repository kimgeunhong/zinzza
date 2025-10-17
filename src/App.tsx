import { useEffect, useMemo, useRef, useState } from "react";
import type { YouTubeEvent, YouTubePlayer } from "react-youtube";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { EditorPanel } from "./components/EditorPanel";
import { PreviewPanel } from "./components/PreviewPanel";
import { InspectorPanel } from "./components/InspectorPanel";
import { AiAssistant } from "./components/AiAssistant";
import { Modal } from "./components/Modal";
import { CopyrightAdvisor } from "./components/CopyrightAdvisor";
import { PROJECT_TEMPLATES } from "./constants/templates";
import {
  CitationSegment,
  NarrationSegment,
  ProjectSettings,
  Segment,
} from "./types/segments";
import { useInterval } from "./hooks/useInterval";
import { importYoutubeTranscript } from "./services/youtubeTranscript";
import {
  createShortFormScript,
  generateYoutubeChapters,
  polishNarration,
  suggestBroll,
} from "./services/gemini";

const initialSegments: Segment[] = [
  {
    id: "narr-1",
    type: "narration",
    label: "인트로",
    text: "안녕하세요, 오늘은 화제가 된 영화의 핵심 장면을 안전하게 리뷰해 보겠습니다.",
    startTime: 0,
    endTime: 6,
    duration: 6,
    speaker: "Host",
    effects: { watermark: false, blur: false, zoom: false },
  } as NarrationSegment,
  {
    id: "clip-1",
    type: "citation",
    label: "하이라이트 클립",
    text: "주인공이 처음으로 등장하는 장면을 짧게 인용합니다.",
    startTime: 6,
    endTime: 12,
    duration: 6,
    source: { kind: "youtube", videoId: "dQw4w9WgXcQ", title: "YouTube 인용 클립" },
    effects: { watermark: true, blur: true, zoom: false },
  } as CitationSegment,
  {
    id: "narr-2",
    type: "narration",
    label: "분석",
    text: "장면 속 연출과 배우의 감정선에 대해 간결하게 분석해 보겠습니다.",
    startTime: 12,
    endTime: 18,
    duration: 6,
    speaker: "Host",
    effects: { watermark: false, blur: false, zoom: false },
  } as NarrationSegment,
];

const defaultSettings: ProjectSettings = {
  title: "AI 자동 리뷰 프로젝트",
  aspectRatio: "16:9",
  templateId: PROJECT_TEMPLATES[0]!.id,
};

export function App() {
  const [segments, setSegments] = useState<Segment[]>(initialSegments);
  const [selectedId, setSelectedId] = useState<string | null>(segments[0]?.id ?? null);
  const [activeId, setActiveId] = useState<string | null>(segments[1]?.id ?? null);
  const [settings, setSettings] = useState<ProjectSettings>(defaultSettings);
  const [isDark, setIsDark] = useState(true);
  const [isImporting, setIsImporting] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState("");
  const [modal, setModal] = useState<{ title: string; content: string } | null>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerTime, setPlayerTime] = useState(0);
  const [playerDuration, setPlayerDuration] = useState(0);

  const selectedSegment = useMemo(
    () => segments.find((segment) => segment.id === selectedId) ?? null,
    [segments, selectedId],
  );

  const templateLimit = useMemo(() => {
    const template = PROJECT_TEMPLATES.find((item) => item.id === settings.templateId);
    return template?.citationLimit ?? 0.1;
  }, [settings.templateId]);

  const citationRatio = useMemo(() => {
    const total = segments.reduce((acc, segment) => acc + segment.duration, 0);
    const citationTotal = segments
      .filter((segment): segment is CitationSegment => segment.type === "citation")
      .reduce((acc, segment) => acc + segment.duration, 0);
    return total === 0 ? 0 : citationTotal / total;
  }, [segments]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    document.body.className = isDark ? "bg-slate-950 text-slate-100" : "bg-slate-100 text-slate-900";
  }, [isDark]);

  const updateSegment = (segmentId: string, update: Partial<Segment>) => {
    setSegments((prev) =>
      prev.map((segment) =>
        segment.id === segmentId
          ? ({
              ...segment,
              ...update,
              duration:
                update.startTime !== undefined && update.endTime !== undefined
                  ? Math.max(0, update.endTime - update.startTime)
                  : update.duration ?? segment.duration,
            } as Segment)
          : segment,
      ),
    );
  };

  const updateTiming = (segmentId: string, start: number, end: number) => {
    const nextStart = Math.max(0, Math.min(start, end));
    const nextEnd = Math.max(nextStart + 0.1, end);
    updateSegment(segmentId, {
      startTime: Number(nextStart.toFixed(1)),
      endTime: Number(nextEnd.toFixed(1)),
      duration: Number((nextEnd - nextStart).toFixed(1)),
    });
  };

  const toggleEffect = (segmentId: string, effect: keyof Segment["effects"]) => {
    setSegments((prev) =>
      prev.map((segment) =>
        segment.id === segmentId
          ? ({
              ...segment,
              effects: {
                ...segment.effects,
                [effect]: !segment.effects[effect],
              },
            } as Segment)
          : segment,
      ),
    );
  };

  const handleReorder = (sourceId: string, targetId: string) => {
    setSegments((prev) => {
      const list = [...prev];
      const fromIndex = list.findIndex((segment) => segment.id === sourceId);
      const toIndex = list.findIndex((segment) => segment.id === targetId);
      if (fromIndex === -1 || toIndex === -1) return prev;
      const [moved] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, moved);
      return list;
    });
  };

  const handleDelete = (segmentId: string) => {
    setSegments((prev) => prev.filter((segment) => segment.id !== segmentId));
    if (selectedId === segmentId) {
      setSelectedId(null);
    }
  };

  const createNarration = (): NarrationSegment => ({
    id: `narr-${Date.now()}`,
    type: "narration",
    label: "새 나레이션",
    text: "여기에 나레이션을 입력하세요. 더블클릭하여 편집할 수 있습니다.",
    startTime: 0,
    endTime: 5,
    duration: 5,
    speaker: "Host",
    effects: { watermark: false, blur: false, zoom: false },
  });

  const createCitation = (): CitationSegment => ({
    id: `clip-${Date.now()}`,
    type: "citation",
    label: "새 인용 클립",
    text: "인용하려는 장면을 설명하는 텍스트를 작성하세요.",
    startTime: 0,
    endTime: 7,
    duration: 7,
    source: { kind: "youtube", videoId: "dQw4w9WgXcQ", title: "YouTube 인용 클립" },
    effects: { watermark: true, blur: false, zoom: false },
  });

  const insertSegments = (newSegments: Segment[]) => {
    setSegments((prev) => {
      const index = selectedId ? prev.findIndex((segment) => segment.id === selectedId) + 1 : prev.length;
      const next = [...prev];
      next.splice(index, 0, ...newSegments);
      return next;
    });
  };

  const handleAddNarration = () => {
    const narration = createNarration();
    insertSegments([narration]);
    setSelectedId(narration.id);
  };

  const handleAddCitation = () => {
    const citation = createCitation();
    insertSegments([citation]);
    setSelectedId(citation.id);
  };

  const handleSplit = (segmentId: string) => {
    setSegments((prev) => {
      const index = prev.findIndex((segment) => segment.id === segmentId);
      if (index === -1) return prev;
      const segment = prev[index];
      if (segment.type !== "citation") return prev;
      const midpoint = segment.startTime + segment.duration / 2;
      const first: CitationSegment = {
        ...segment,
        id: `${segment.id}-a`,
        endTime: Number(midpoint.toFixed(1)),
        duration: Number((midpoint - segment.startTime).toFixed(1)),
      };
      const second: CitationSegment = {
        ...segment,
        id: `${segment.id}-b`,
        startTime: Number(midpoint.toFixed(1)),
        duration: Number((segment.endTime - midpoint).toFixed(1)),
      };
      return [...prev.slice(0, index), first, second, ...prev.slice(index + 1)];
    });
  };

  const handleFilesSelected = async (files: FileList) => {
    const fileArray = Array.from(files);
    const created: Segment[] = [];
    for (const file of fileArray) {
      if (file.type.startsWith("text") || file.name.endsWith(".txt")) {
        const content = await file.text();
        created.push({
          ...createNarration(),
          id: `narr-${file.name}-${Date.now()}`,
          label: file.name,
          text: content.trim() || "파일에서 불러온 나레이션",
        });
      } else {
        created.push({
          ...createCitation(),
          id: `clip-${file.name}-${Date.now()}`,
          label: file.name,
          source: { kind: "upload", fileName: file.name },
        });
      }
    }
    insertSegments(created);
    if (created.length > 0) {
      setSelectedId(created[0]!.id);
    }
  };

  const handleYoutubeImport = async (url: string) => {
    setIsImporting(true);
    try {
      const imported = await importYoutubeTranscript(url);
      insertSegments(imported);
      if (imported.length > 0) {
        setSelectedId(imported[0]!.id);
      }
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setIsImporting(false);
    }
  };

  const handleSelectSegment = (segmentId: string) => {
    setSelectedId(segmentId);
    const segment = segments.find((item) => item.id === segmentId);
    if (segment && segment.type === "citation" && segment.source.kind === "youtube") {
      playerRef.current?.loadVideoById({
        videoId: segment.source.videoId,
        startSeconds: segment.startTime,
      });
      setPlayerDuration(segment.duration);
    }
  };

  const handlePlayerReady = (event: YouTubeEvent) => {
    const player = event.target;
    setPlayerDuration(player.getDuration());
    setPlayerTime(player.getCurrentTime());
  };

  const handlePlayerStateChange = (event: YouTubeEvent) => {
    const state = event.target.getPlayerState();
    setIsPlaying(state === 1);
  };

  const handleTogglePlay = () => {
    if (!playerRef.current) return;
    const state = playerRef.current.getPlayerState();
    if (state === 1) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const handleSeek = (seconds: number) => {
    if (!playerRef.current) return;
    playerRef.current.seekTo(seconds, true);
    setPlayerTime(seconds);
  };

  useInterval(() => {
    if (!playerRef.current) return;
    const current = playerRef.current.getCurrentTime();
    setPlayerTime(current);
    setPlayerDuration(playerRef.current.getDuration());
    const active = segments.find(
      (segment) => segment.type === "citation" && current >= segment.startTime && current < segment.endTime,
    );
    if (active) {
      setActiveId(active.id);
    }
  }, isPlaying ? 500 : null);

  const runAiAction = async (task: () => Promise<string>) => {
    setAiLoading(true);
    try {
      const output = await task();
      return output;
    } finally {
      setAiLoading(false);
    }
  };

  const handlePolishNarration = () => {
    const text = selectedSegment?.text ?? "";
    return runAiAction(() => polishNarration(text)).then((output) => {
      setAiResult(output);
    });
  };

  const handleSuggestBroll = () => {
    const text = selectedSegment?.text ?? segments.map((segment) => segment.text).join("\n");
    return runAiAction(() => suggestBroll(text)).then((output) => {
      setAiResult(output);
    });
  };

  const handleCreateShorts = () => {
    const script = segments.map((segment) => `- ${segment.label}: ${segment.text}`).join("\n");
    return runAiAction(() => createShortFormScript(script)).then((output) => {
      setModal({ title: "숏폼 클립 스크립트", content: output });
    });
  };

  const handleGenerateChapters = () => {
    const script = segments.map((segment) => `${segment.startTime.toFixed(1)}s ${segment.text}`).join("\n");
    return runAiAction(() => generateYoutubeChapters(script)).then((output) => {
      setModal({ title: "유튜브 챕터 제안", content: output });
    });
  };

  useEffect(() => {
    if (selectedSegment?.type === "citation") {
      setActiveId(selectedSegment.id);
    }
  }, [selectedSegment]);

  return (
    <div className="flex h-screen flex-col">
      <Header isDark={isDark} onToggleTheme={() => setIsDark((prev) => !prev)} />
      <main className="grid flex-1 grid-cols-[280px_minmax(0,1fr)_360px] bg-slate-950 text-slate-100">
        <Sidebar
          settings={settings}
          onChange={setSettings}
          templates={PROJECT_TEMPLATES}
          citationRatio={citationRatio}
          templateLimit={templateLimit}
        />
        <div className="flex h-full flex-col overflow-hidden">
          <EditorPanel
            segments={segments}
            selectedId={selectedId}
            activeId={activeId}
            onSelect={handleSelectSegment}
            onDelete={handleDelete}
            onUpdateText={(id, text) => updateSegment(id, { text })}
            onAddNarration={handleAddNarration}
            onAddCitation={handleAddCitation}
            onReorder={handleReorder}
          />
          <div className="border-t border-slate-800 bg-slate-950/60 px-6 py-4">
            <CopyrightAdvisor ratio={citationRatio} limit={templateLimit} />
          </div>
        </div>
        <div className="flex h-full flex-col">
          <PreviewPanel
            selectedSegment={selectedSegment}
            activeSegment={segments.find((segment) => segment.id === activeId) ?? null}
            currentTime={playerTime}
            duration={playerDuration}
            isPlaying={isPlaying}
            onRegister={(player) => {
              playerRef.current = player;
            }}
            onTogglePlay={handleTogglePlay}
            onSeek={handleSeek}
            onPlayerReady={handlePlayerReady}
            onPlayerStateChange={handlePlayerStateChange}
          />
          <InspectorPanel
            selectedSegment={selectedSegment}
            onUpdateTiming={updateTiming}
            onToggleEffect={toggleEffect}
            onSplit={handleSplit}
            onRequestYoutubeImport={handleYoutubeImport}
            onFilesSelected={handleFilesSelected}
            isImporting={isImporting}
            aiAssistant={
              <AiAssistant
                isLoading={aiLoading}
                lastResult={aiResult}
                onPolish={handlePolishNarration}
                onSuggestBroll={handleSuggestBroll}
                onCreateShorts={handleCreateShorts}
                onGenerateChapters={handleGenerateChapters}
              />
            }
          />
        </div>
      </main>
      {modal && (
        <Modal
          title={modal.title}
          content={modal.content}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
