import { ProjectTemplate } from "../types/segments";

export const PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    id: "film-review",
    name: "영화 리뷰",
    description: "저작권 안전에 최적화된 시네마틱 리뷰 템플릿",
    bgm: "Cinematic Ambient",
    citationLimit: 0.1,
  },
  {
    id: "game-explain",
    name: "게임 해설",
    description: "게임 플레이 하이라이트와 빠른 나레이션 중심",
    bgm: "Electro Pulse",
    citationLimit: 0.08,
  },
  {
    id: "product-unboxing",
    name: "제품 언박싱",
    description: "제품 촬영과 설명을 비디오로 정리한 템플릿",
    bgm: "Minimal Lo-Fi",
    citationLimit: 0.05,
  },
];
