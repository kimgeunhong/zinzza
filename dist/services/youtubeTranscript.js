const SAMPLE_TRANSCRIPTS = {
  dQw4w9WgXcQ: [
    { start: 0, end: 7, text: "\uc778\ud130\ub85c \uc7a5\uba74\uc744 \ud1b5\ud574 \uc601\uc0c1 \ubd84\uc704\uae30\ub97c \uc124\uba85\ud569\ub2c8\ub2e4." },
    { start: 7, end: 14, text: "\uac10\ub3c5\uc758 \uc5f0\ucd9c \ud3ec\uc778\ud2b8\uc640 \uc0c9\uac10\uc744 \uac15\uc870\ud569\ub2c8\ub2e4." },
    { start: 14, end: 21, text: "\uc8fc\uc694 \uce90\ub9ad\ud130\uc758 \uac10\uc815\uc120\uc744 \uc9dd\uac8c \ubd84\uc11d\ud569\ub2c8\ub2e4." },
  ],
};

function parseVideoId(url) {
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

function buildSource(videoId) {
  return {
    kind: "youtube",
    videoId,
    title: "YouTube \uc778\uc6a9 \ud074\ub9bd",
  };
}

export async function importYoutubeTranscript(url) {
  const videoId = parseVideoId(url);
  if (!videoId) {
    throw new Error("\uc62c\ubc14\ub978 \uc720\ud29c\ube0c URL\uc744 \uc785\ub825\ud574 \uc8fc\uc138\uc694.");
  }

  const transcript =
    SAMPLE_TRANSCRIPTS[videoId] || [
      { start: 0, end: 6, text: "\ud558\uc774\ub77c\uc774\ud2b8 \uc7a5\uba74\uc744 \uc18c\uac1c\ud569\ub2c8\ub2e4." },
      { start: 6, end: 12, text: "\uce90\ub9ad\ud130\uc758 \ub3d9\uae30\uc640 \uac08\ub4f1\uc744 \uc124\uba85\ud569\ub2c8\ub2e4." },
      { start: 12, end: 18, text: "\uc2a4\ud1a0\ub9ac \uc804\uac1c\uc758 \ud575\uc2ec \ud3ec\uc778\ud2b8\ub97c \uc694\uc57d\ud569\ub2c8\ub2e4." },
    ];

  return transcript.map((entry, index) => ({
    id: `${videoId}-${index}`,
    type: "citation",
    label: `\uc778\uc6a9 ${index + 1}`,
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
