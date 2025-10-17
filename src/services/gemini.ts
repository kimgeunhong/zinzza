import { GoogleGenerativeAI } from "@google/genai";

const FALLBACK_RESPONSES = {
  narration: (text: string) =>
    `✅ 다듬은 문장:\n${text.replace(/(음|어|아)/g, "").replace(/\s+/g, " ")}`,
  broll: (text: string) =>
    `🎬 추천 키워드:\n- 영화 분위기 전경 샷\n- 감정 표현 클로즈업\n- ${text.slice(0, 15)} 관련 메타포`,
  shortform: () =>
    "쇼츠 스크립트:\n1) 강렬한 오프닝 한 문장\n2) 핵심 갈등 2문장\n3) 인상적인 마무리 멘트",
  chapters: () =>
    "00:00 오프닝\n00:35 줄거리 소개\n01:20 인물 분석\n02:05 총평 및 추천",
};

function resolveClient() {
  if (typeof window === "undefined") {
    return null;
  }
  const apiKey = window.__GEMINI_API_KEY__;
  if (!apiKey) {
    return null;
  }
  try {
    return new GoogleGenerativeAI(apiKey);
  } catch (error) {
    console.warn("Gemini SDK 초기화 실패", error);
    return null;
  }
}

const client = resolveClient();

async function runPrompt(prompt: string, fallback: string) {
  if (!client) {
    return fallback;
  }
  try {
    const model = client.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.warn("Gemini 호출 실패, 대체 응답 사용", error);
    return fallback;
  }
}

export async function polishNarration(text: string) {
  const prompt = `다음 나레이션을 간결하게 다듬고 군더더기를 제거해 주세요.\n\n${text}`;
  return runPrompt(prompt, FALLBACK_RESPONSES.narration(text));
}

export async function suggestBroll(text: string) {
  const prompt = `이 나레이션과 어울리는 B-roll 추천 키워드를 5개 제안해 주세요.\n\n${text}`;
  return runPrompt(prompt, FALLBACK_RESPONSES.broll(text));
}

export async function createShortFormScript(fullScript: string) {
  const prompt = `다음 스크립트를 기반으로 60초 길이의 쇼츠 스크립트를 작성해 주세요.\n\n${fullScript}`;
  return runPrompt(prompt, FALLBACK_RESPONSES.shortform());
}

export async function generateYoutubeChapters(fullScript: string) {
  const prompt = `다음 스크립트에 맞춰 유튜브 챕터 시간을 작성해 주세요.\n\n${fullScript}`;
  return runPrompt(prompt, FALLBACK_RESPONSES.chapters());
}
