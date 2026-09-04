import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const translationCache = new Map<string, string>();

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#x2F;/g, "/");
}

async function fetchGoogleTranslation(text: string, targetLang: string): Promise<string | null> {
  try {
    const url = `https://translate.google.com/m?sl=auto&tl=${encodeURIComponent(
      targetLang
    )}&q=${encodeURIComponent(text)}`;

    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
      },
    });

    if (!response.ok) return null;

    const html = await response.text();
    const match = html.match(/class="result-container">([\s\S]*?)<\/div>/);
    if (match && match[1]) {
      return decodeHtmlEntities(match[1].trim());
    }
    return null;
  } catch {
    return null;
  }
}

async function fetchMyMemoryTranslation(text: string, targetLang: string): Promise<string | null> {
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      text
    )}&langpair=en|${encodeURIComponent(targetLang)}`;
    const response = await fetch(url);
    if (!response.ok) return null;
    const data = await response.json();
    if (data?.responseData?.translatedText) {
      return decodeHtmlEntities(data.responseData.translatedText);
    }
    return null;
  } catch {
    return null;
  }
}

async function translateSingle(text: string, targetLang: string): Promise<string> {
  if (!text || text.trim() === "" || targetLang === "en") return text;

  const trimmed = text.trim();
  const cacheKey = `${targetLang}:${trimmed}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }

  // 1. Google Mobile Web Translator
  let translated = await fetchGoogleTranslation(trimmed, targetLang);

  // 2. Secondary fallback: MyMemory
  if (!translated) {
    translated = await fetchMyMemoryTranslation(trimmed, targetLang);
  }

  if (translated) {
    translationCache.set(cacheKey, translated);
    return translated;
  }

  return text;
}

// Concurrently translate array of texts with pool of 10 workers
async function translateBatch(texts: string[], targetLang: string): Promise<string[]> {
  if (targetLang === "en" || texts.length === 0) return texts;

  const results: string[] = new Array(texts.length).fill("");
  const toFetch: { text: string; index: number }[] = [];

  texts.forEach((text, i) => {
    const trimmed = text ? text.trim() : "";
    if (!trimmed || /^[\d\s\-_.,#/:\\()]+$/.test(trimmed)) {
      results[i] = text;
      return;
    }
    const cacheKey = `${targetLang}:${trimmed}`;
    if (translationCache.has(cacheKey)) {
      results[i] = translationCache.get(cacheKey)!;
    } else {
      toFetch.push({ text: trimmed, index: i });
    }
  });

  if (toFetch.length === 0) {
    return results;
  }

  // Process in chunks of 15 in parallel
  const concurrency = 15;
  for (let i = 0; i < toFetch.length; i += concurrency) {
    const slice = toFetch.slice(i, i + concurrency);
    const sliceResults = await Promise.all(
      slice.map((item) => translateSingle(item.text, targetLang))
    );
    slice.forEach((item, idx) => {
      const translated = sliceResults[idx] || item.text;
      results[item.index] = translated;
      translationCache.set(`${targetLang}:${item.text}`, translated);
    });
  }

  return results;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, targetLang, texts } = body;

    if (!targetLang) {
      return NextResponse.json({ error: "targetLang is required" }, { status: 400 });
    }

    if (targetLang === "en") {
      return NextResponse.json({
        translatedText: text || "",
        translatedTexts: texts || [],
      });
    }

    // Batch translation
    if (Array.isArray(texts)) {
      const translatedTexts = await translateBatch(texts, targetLang);
      return NextResponse.json({ translatedTexts }, { status: 200 });
    }

    // Single text translation
    if (typeof text === "string") {
      const translatedText = await translateSingle(text, targetLang);
      return NextResponse.json({ translatedText }, { status: 200 });
    }

    return NextResponse.json({ error: "text or texts required" }, { status: 400 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Translation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
