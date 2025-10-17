export type SegmentType = "narration" | "citation";

export interface SegmentBase {
  id: string;
  type: SegmentType;
  label: string;
  text: string;
  startTime: number;
  endTime: number;
  duration: number;
  effects: SegmentEffects;
}

export interface SegmentEffects {
  watermark: boolean;
  blur: boolean;
  zoom: boolean;
}

export interface NarrationSegment extends SegmentBase {
  type: "narration";
  speaker: string;
}

export interface CitationSegment extends SegmentBase {
  type: "citation";
  source: CitationSource;
}

export type CitationSource =
  | { kind: "youtube"; videoId: string; title: string } 
  | { kind: "upload"; fileName: string };

export type Segment = NarrationSegment | CitationSegment;

export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  bgm: string;
  citationLimit: number;
}

export interface ProjectSettings {
  title: string;
  aspectRatio: "16:9" | "9:16" | "1:1";
  templateId: string;
}
