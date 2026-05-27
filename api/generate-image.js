const { cleanString, methodNotAllowed, readJson, sendJson } = require("./_utils");

const OPENAI_IMAGE_URL = "https://api.openai.com/v1/images/generations";
const DEFAULT_MODEL = "gpt-image-2";
const DEFAULT_SIZE = "1024x1536";
const DEFAULT_QUALITY = "low";
const ALLOWED_SIZES = new Set(["1024x1024", "1024x1536", "1536x1024", "auto"]);
const ALLOWED_QUALITIES = new Set(["low", "medium", "high", "auto"]);

module.exports = async function generateImage(req, res) {
  if (req.method !== "POST") {
    methodNotAllowed(res);
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    sendJson(res, 503, {
      ok: false,
      code: "missing_openai_key",
      message: "OPENAI_API_KEY가 Vercel 환경변수에 아직 설정되지 않아 캔버스 이미지로 대체돼요.",
    });
    return;
  }

  let body;
  try {
    body = await readJson(req);
  } catch {
    sendJson(res, 400, {
      ok: false,
      code: "invalid_json",
      message: "요청 JSON을 읽을 수 없어요.",
    });
    return;
  }

  const prompt = cleanString(body.prompt, 3200);
  if (!prompt) {
    sendJson(res, 400, {
      ok: false,
      code: "missing_prompt",
      message: "이미지 프롬프트가 필요해요.",
    });
    return;
  }

  const model = cleanString(process.env.OPENAI_IMAGE_MODEL, 64) || DEFAULT_MODEL;
  const size = ALLOWED_SIZES.has(process.env.OPENAI_IMAGE_SIZE)
    ? process.env.OPENAI_IMAGE_SIZE
    : DEFAULT_SIZE;
  const quality = ALLOWED_QUALITIES.has(process.env.OPENAI_IMAGE_QUALITY)
    ? process.env.OPENAI_IMAGE_QUALITY
    : DEFAULT_QUALITY;

  const traits = Array.isArray(body.traits)
    ? body.traits.map((trait) => cleanString(trait, 40)).filter(Boolean).slice(0, 5)
    : [];
  const title = cleanString(body.title, 140);
  const finalPrompt = buildFinalPrompt({ prompt, title, traits });

  try {
    const upstream = await fetch(OPENAI_IMAGE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        prompt: finalPrompt,
        size,
        quality,
        output_format: "png",
        background: "opaque",
      }),
    });

    const data = await upstream.json().catch(async () => ({
      error: { message: await upstream.text().catch(() => "") },
    }));

    if (!upstream.ok) {
      const status = upstream.status >= 500 ? 502 : upstream.status;
      sendJson(res, status, {
        ok: false,
        code: "openai_image_error",
        message: data?.error?.message || "OpenAI 이미지 생성 요청이 실패했어요.",
      });
      return;
    }

    const imageBase64 = data?.data?.[0]?.b64_json;
    if (!imageBase64) {
      sendJson(res, 502, {
        ok: false,
        code: "missing_image",
        message: "OpenAI 응답에 이미지 데이터가 없어요.",
      });
      return;
    }

    sendJson(res, 200, {
      ok: true,
      model,
      imageDataUrl: `data:image/png;base64,${imageBase64}`,
      revisedPrompt: data?.data?.[0]?.revised_prompt || null,
      usage: data?.usage || null,
    });
  } catch (error) {
    sendJson(res, 502, {
      ok: false,
      code: "openai_unreachable",
      message: error.message || "OpenAI 이미지 API에 연결할 수 없어요.",
    });
  }
};

function buildFinalPrompt({ prompt, title, traits }) {
  const traitText = traits.length ? `Top inferred traits: ${traits.join(", ")}.` : "";
  const titleText = title ? `Result title: ${title}.` : "";

  return [
    "Create one original fictional adult ideal-type portrait for a Korean web app.",
    "Do not depict a real person, celebrity, or minor.",
    "Style: polished Korean webtoon editorial illustration, warm pink brand mood, charming but non-explicit.",
    "Composition: upper-body portrait, expressive eyes, tasteful fashion styling, soft daylight, clean background.",
    "Brand details may include subtle pink roulette/heart accents, but avoid readable text except simple decorative marks.",
    titleText,
    traitText,
    `User preference prompt: ${prompt}`,
  ]
    .filter(Boolean)
    .join(" ");
}
