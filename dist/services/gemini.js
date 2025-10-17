import { GoogleGenerativeAI } from "@google/genai";

const FALLBACK_RESPONSES = {
  narration: (text) => `✅ \ub2e8\uc74c\uc740 \ubb38\uc7a5:\n${text.replace(/(\uc74c|\uc5b4|\uc544)/g, "").replace(/\s+/g, " ")}`,
  broll: (text) =>
    `🎬 \ucd94\ucc9c \ud0a4\uc6cc\ub4dc:\n- \uc601\ud654 \ubd84\uc704\uae30 \uc804\uac04 \uc0f7\n- \uac10\uc815 \ud45c\ud604 \ud074\ub85c\uc988\uc5c5\n- ${text.slice(0, 15)} \uad00\ub828 \uba54\ud0c0\ud3ec`,
  shortform: () =>
    "\uc1fc\uce20 \uc2a4\ud06c\ub9bd\ud2b8:\n1) \uac15\ub82c\ud55c \uc624\ud504\ub2dd \ud55c \ubb38\uc7a5\n2) \ud575\uc2ec \uac08\ub4f1 2\ubb38\uc7a5\n3) \uc778\c0c1\uc801\uc778 \ub9c8\ubb34\ub9ac \uba58\ud2b8",
  chapters: () => "00:00 \uc624\ud504\ub2dd\n00:35 \uc904\uac70\ub9ac \uc18c\uac1c\n01:20 \uc778\ubb3c \ubd84\uc11d\n02:05 \ucd1d\ud3c9 \ubc0f \ucd94\ucc9c",
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
    console.warn("Gemini SDK \ucd08\uae30\ud654 \uc2e4\ud328", error);
    return null;
  }
}

const client = resolveClient();

async function runPrompt(prompt, fallback) {
  if (!client) {
    return fallback;
  }
  try {
    const model = client.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.warn("Gemini \ud638\ucd9c \uc2e4\ud328, \ub300\uccb4 \uc751\ub2f5 \uc0ac\uc6a9", error);
    return fallback;
  }
}

export async function polishNarration(text) {
  const prompt = `\ub2e4\uc74c \ub098\ub808\uc774\uc158\uc744 \uac04\uaca9\ud558\uac8c \ub2e8\uc74c\ud558\uace0 \uad70\ub4dc\ub3c4\uae30\ub97c \uc81c\uac70\ud574 \uc8fc\uc138\uc694.\n\n${text}`;
  return runPrompt(prompt, FALLBACK_RESPONSES.narration(text));
}

export async function suggestBroll(text) {
  const prompt = `\uc774 \ub098\ub808\uc774\uc158\uacfc \uc5b4\uc6b8\ub9ac\ub294 B-roll \ucd94\ucc9c \ud0a4\uc6cc\ub4dc\ub97c 5\uac1c \uc81c\uc548\ud574 \uc8fc\uc138\uc694.\n\n${text}`;
  return runPrompt(prompt, FALLBACK_RESPONSES.broll(text));
}

export async function createShortFormScript(fullScript) {
  const prompt = `\ub2e4\uc74c \uc2a4\ud06c\ub9bd\ud2b8\ub97c \uae30\ubc18\uc73c\ub85c 60\ucd08 \uae38\uc774\uc758 \uc1fc\uce20 \uc2a4\ud06c\ub9bd\ud2b8\ub97c \uc791\uc131\ud574 \uc8fc\uc138\uc694.\n\n${fullScript}`;
  return runPrompt(prompt, FALLBACK_RESPONSES.shortform());
}

export async function generateYoutubeChapters(fullScript) {
  const prompt = `\ub2e4\uc74c \uc2a4\ud06c\ub9bd\ud2b8\uc5d0 \ub9de\ucdb0 \uc720\ud29c\ube0c \ucc55\ud130 \uc2dc\uac04\uc744 \uc791\uc131\ud574 \uc8fc\uc138\uc694.\n\n${fullScript}`;
  return runPrompt(prompt, FALLBACK_RESPONSES.chapters());
}
