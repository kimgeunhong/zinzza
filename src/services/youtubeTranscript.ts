import { CitationSource, Segment } from "../types/segments";

const SAMPLE_TRANSCRIPTS: Record<string, Array<{ start: number; end: number; text: string }>> = {
  dQw4w9WgXcQ: [
    { start: 0, end: 7, text: "인트로 장면을 통해 영상 분위기를 설명합니다." },
    { start: 7, end: 14, text: "감독의 연출 포인트와 색감을 강조합니다." },
    { start: 14, end: 21, text: "주요 캐릭터의 감정선을 짧게 분석합니다." }
  ],
};

function parseVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.slice(1);
    }
    if (parsed.hostname.includes("youtube.com")) {
      return parsed.searchParams.get("v");
    }
    return null;
  } catch (error) {
    return null;
  }
}

function buildSource(videoId: string): CitationSource {
  return {
    kind: "youtube",
    videoId,
    title: "YouTube 인용 클립",
  };
}

export async function importYoutubeTranscript(url: string): Promise<Segment[]> {
  const videoId = parseVideoId(url);
  if (!videoId) {
    throw new Error("올바른 유튜브 URL을 입력해 주세요.");
  }

  const transcript =
    SAMPLE_TRANSCRIPTS[videoId] ?? [
      { start: 0, end: 6, text: "하이라이트 장면을 소개합니다." },
      { start: 6, end: 12, text: "캐릭터의 동기와 갈등을 설명합니다." },
      { start: 12, end: 18, text: "스토리 전개의 핵심 포인트를 요약합니다." }
    ];

  return transcript.map((entry, index) => ({
    id: `${videoId}-${index}`,
    type: "citation" as const,
    label: `인용 ${index + 1}`,
    text: entry.text,
    startTime: entry.start,
    endTime: entry.end,
    duration: entry.end - entry.start,
    source: buildSource(videoId),
    effects: {
      watermark: true,
      blur: index % 2 === 0,
      zoom: false,
    },
  }));
}
