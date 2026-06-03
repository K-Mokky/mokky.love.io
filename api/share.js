const crypto = require("node:crypto");

const {
  APP_NAME,
  cleanString,
  isPlainObject,
  methodNotAllowed,
  readJson,
  sendJson,
} = require("./_utils");

const DEFAULT_SHARE_BUCKET = "ideal-type-shares";
const MAX_SHARE_IMAGE_BYTES = 5 * 1024 * 1024;
const SUPABASE_KEY_NAMES = [
  "SUPABASE_SECRET_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "SUPABASE_PUBLISHABLE_KEY",
  "SUPABASE_ANON_KEY",
];
const SHARE_KINDS = new Set(["portrait", "placard", "instagram", "facebook", "story", "result"]);
const SHARE_KIND_PREFIX = {
  portrait: "p",
  placard: "c",
  instagram: "i",
  facebook: "f",
  story: "s",
  result: "r",
};
const MIME_TO_EXTENSION = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

module.exports = async function share(req, res) {
  if (req.method === "GET") {
    sendSharePage(req, res);
    return;
  }

  if (req.method !== "POST") {
    methodNotAllowed(res, "GET, POST");
    return;
  }

  try {
    const body = await readJson(req);
    const payload = normalizeSharePayload(body);
    if (!payload) {
      sendJson(res, 400, {
        ok: false,
        code: "invalid_share_image",
        message: "공유할 이미지 데이터가 올바르지 않아요.",
      });
      return;
    }

    const upload = await uploadShareImage(payload);
    const shareUrl = makeShareUrl(req, upload.path);

    sendJson(res, 200, {
      ok: true,
      shareUrl,
      imageUrl: upload.publicUrl,
      path: upload.path,
      message: "공유 링크가 만들어졌어요.",
    });
  } catch (error) {
    const isConfigurationError = error?.code === "share_storage_unconfigured";
    if (!isConfigurationError) {
      console.error("Share API failed:", error);
    }
    sendJson(res, isConfigurationError ? 503 : 500, {
      ok: false,
      code: error?.code || "share_failed",
      message: isConfigurationError
        ? "공유 이미지 저장소가 아직 연결되지 않았어요."
        : "공유 링크 생성 중 오류가 발생했어요.",
    });
  }
};

function normalizeSharePayload(body) {
  if (!isPlainObject(body)) return null;

  const match = String(body.imageData || "").match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=\s]+)$/);
  if (!match) return null;

  const mimeType = match[1];
  const base64 = match[2].replace(/\s+/g, "");
  const buffer = Buffer.from(base64, "base64");
  if (!buffer.length || buffer.length > MAX_SHARE_IMAGE_BYTES) return null;

  return {
    buffer,
    mimeType,
    extension: MIME_TO_EXTENSION[mimeType],
    kind: normalizeShareKind(body.kind),
    title: cleanString(body.title, 80) || APP_NAME,
    description:
      cleanString(body.description, 180) ||
      "내 이상형 테스트 결과를 확인하고 직접 테스트해보세요.",
  };
}

function normalizeShareKind(value) {
  const kind = cleanString(value, 40);
  return SHARE_KINDS.has(kind) ? kind : "result";
}

async function uploadShareImage(payload) {
  if (!process.env.SUPABASE_URL || !getSupabaseApiKey()) {
    const error = new Error("Supabase share storage is not configured.");
    error.code = "share_storage_unconfigured";
    throw error;
  }

  const baseUrl = process.env.SUPABASE_URL.replace(/\/+$/, "");
  const bucket = getShareBucket();
  const path = makeObjectPath(payload);
  const uploadUrl = `${baseUrl}/storage/v1/object/${encodePathSegment(bucket)}/${encodeObjectPath(path)}`;
  const response = await fetch(uploadUrl, {
    method: "POST",
    headers: buildSupabaseStorageHeaders(getSupabaseApiKey(), payload.mimeType),
    body: payload.buffer,
  });

  if (!response.ok) {
    const message = await response.text().catch(() => "");
    throw new Error(`Supabase share upload failed: ${response.status} ${message}`.trim());
  }

  return {
    path,
    publicUrl: `${baseUrl}/storage/v1/object/public/${encodePathSegment(bucket)}/${encodeObjectPath(path)}`,
  };
}

function makeObjectPath(payload) {
  const day = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const prefix = SHARE_KIND_PREFIX[payload.kind] || SHARE_KIND_PREFIX.result;
  const id = crypto.randomBytes(12).toString("hex");
  return `shares/${day}/${prefix}${id}.${payload.extension}`;
}

function getShareBucket() {
  return cleanString(process.env.SUPABASE_SHARE_BUCKET, 80) || DEFAULT_SHARE_BUCKET;
}

function getSupabaseApiKey() {
  return SUPABASE_KEY_NAMES.map((name) => cleanString(process.env[name], 500)).find(Boolean) || "";
}

function buildSupabaseStorageHeaders(apiKey, mimeType) {
  const headers = {
    "Content-Type": mimeType,
    "Cache-Control": "31536000",
    "x-upsert": "false",
    apikey: apiKey,
  };

  if (!apiKey.startsWith("sb_")) {
    headers.Authorization = `Bearer ${apiKey}`;
  }

  return headers;
}

function makeShareUrl(req, objectPath) {
  const origin = getOrigin(req);
  return `${origin}/share/${encodeObjectPath(objectPath)}`;
}

function sendSharePage(req, res) {
  const page = getSharePageData(req);

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=300, stale-while-revalidate=86400");
  res.end(renderSharePage(page));
}

function getSharePageData(req) {
  const origin = getOrigin(req);
  const url = new URL(req.url || "/share", origin);
  const objectPath = normalizeShareObjectPath(url.searchParams.get("path") || getPathFromShareUrl(url));
  const meta = getShareMeta(objectPath);
  const imageUrl = objectPath ? makePublicImageUrl(objectPath) : normalizeShareImageUrl(url.searchParams.get("img"));
  const title = cleanString(url.searchParams.get("title"), 80) || meta.title;
  const description = cleanString(url.searchParams.get("desc"), 180) || meta.description;
  const canonicalUrl = objectPath ? `${origin}/share/${encodeObjectPath(objectPath)}` : makeLegacyCanonicalUrl(origin, imageUrl, title, description);

  return {
    origin,
    title,
    description,
    imageUrl,
    canonicalUrl,
  };
}

function getPathFromShareUrl(url) {
  if (!url.pathname.startsWith("/share/")) return "";
  return url.pathname.replace(/^\/share\/+/, "");
}

function normalizeShareObjectPath(value) {
  if (!value) return "";

  try {
    const decoded = decodeURIComponent(String(value)).replace(/^\/+/, "");
    if (!/^shares\/\d{8}\/[a-z0-9_-]+\.(?:jpg|png|webp)$/i.test(decoded)) return "";
    return decoded;
  } catch (error) {
    return "";
  }
}

function getShareMeta(objectPath) {
  const filename = objectPath.split("/").pop() || "";
  if (filename.startsWith("c") || filename.startsWith("placard")) {
    return {
      title: "내 이상형의 플랜카드",
      description: "나의 이상형 사진과 결과 정보를 확인하고 직접 테스트해보세요.",
    };
  }

  return {
    title: "나의 이상형",
    description: "내 이상형 사진을 확인하고 직접 테스트해보세요.",
  };
}

function makePublicImageUrl(objectPath) {
  const supabaseUrl = cleanString(process.env.SUPABASE_URL, 500);
  if (!supabaseUrl) return "";

  const baseUrl = supabaseUrl.replace(/\/+$/, "");
  return `${baseUrl}/storage/v1/object/public/${encodePathSegment(getShareBucket())}/${encodeObjectPath(objectPath)}`;
}

function makeLegacyCanonicalUrl(origin, imageUrl, title, description) {
  const params = new URLSearchParams();
  if (imageUrl) params.set("img", imageUrl);
  params.set("title", title);
  params.set("desc", description);
  return `${origin}/share?${params.toString()}`;
}

function normalizeShareImageUrl(value) {
  if (!value) return "";

  try {
    const imageUrl = new URL(value);
    if (!["https:", "http:"].includes(imageUrl.protocol)) return "";

    const supabaseUrl = cleanString(process.env.SUPABASE_URL, 500);
    if (supabaseUrl) {
      const allowedHost = new URL(supabaseUrl).host;
      if (imageUrl.host !== allowedHost) return "";
    }

    return imageUrl.toString();
  } catch (error) {
    return "";
  }
}

function getOrigin(req) {
  const forwardedProto = cleanHeader(req.headers?.["x-forwarded-proto"]);
  const forwardedHost = cleanHeader(req.headers?.["x-forwarded-host"]);
  const host = forwardedHost || cleanHeader(req.headers?.host) || "localhost:3000";
  const proto = forwardedProto || (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

function cleanHeader(value) {
  return cleanString(Array.isArray(value) ? value[0] : String(value || "").split(",")[0], 200);
}

function renderSharePage(page) {
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);
  const imageUrl = escapeHtml(page.imageUrl);
  const canonicalUrl = escapeHtml(page.canonicalUrl);
  const mainUrl = escapeHtml(page.origin);
  const imageMarkup = page.imageUrl
    ? `<img src="${imageUrl}" alt="공유된 이상형 결과 이미지" />`
    : `<div class="empty-image">공유 이미지가 만료되었거나 올바르지 않아요.</div>`;
  const ogImageTags = page.imageUrl
    ? `
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:image:secure_url" content="${imageUrl}" />
    <meta name="twitter:image" content="${imageUrl}" />`
    : "";

  return `<!doctype html>
<html lang="ko" prefix="og: https://ogp.me/ns#">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonicalUrl}" />${ogImageTags}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <style>
      :root {
        color-scheme: light;
        --pink: #ff4f9b;
        --pink-deep: #d92b78;
        --ink: #24212b;
        --muted: rgba(36, 33, 43, 0.66);
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 28px 16px;
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        color: var(--ink);
        background:
          radial-gradient(circle at 18% 12%, rgba(255, 79, 155, 0.18), transparent 32%),
          radial-gradient(circle at 82% 0%, rgba(33, 183, 168, 0.16), transparent 30%),
          linear-gradient(135deg, #fff6fb 0%, #fff 52%, #fff5f9 100%);
      }
      main {
        width: min(100%, 560px);
        border: 1px solid rgba(255, 79, 155, 0.2);
        border-radius: 32px;
        padding: 22px;
        background: rgba(255, 255, 255, 0.88);
        box-shadow: 0 28px 80px rgba(217, 43, 120, 0.16);
        text-align: center;
      }
      img, .empty-image {
        width: 100%;
        max-height: 68vh;
        object-fit: contain;
        border-radius: 24px;
        background: #fff;
        box-shadow: inset 0 0 0 1px rgba(36, 33, 43, 0.08);
      }
      .empty-image {
        min-height: 260px;
        display: grid;
        place-items: center;
        padding: 24px;
        color: var(--muted);
        font-weight: 800;
      }
      h1 {
        margin: 22px 0 8px;
        font-size: clamp(1.7rem, 6vw, 2.4rem);
        line-height: 1.12;
      }
      p {
        margin: 0 auto 22px;
        max-width: 34rem;
        color: var(--muted);
        font-weight: 700;
        line-height: 1.65;
        word-break: keep-all;
      }
      a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 52px;
        padding: 0 24px;
        border-radius: 999px;
        color: #fff;
        background: linear-gradient(135deg, var(--pink), var(--pink-deep));
        font-weight: 900;
        text-decoration: none;
        box-shadow: 0 14px 30px rgba(217, 43, 120, 0.22);
      }
    </style>
  </head>
  <body>
    <main>
      ${imageMarkup}
      <h1>${title}</h1>
      <p>${description}</p>
      <a href="${mainUrl}">테스트하러 가기</a>
    </main>
  </body>
</html>`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const replacements = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return replacements[char];
  });
}

function encodePathSegment(value) {
  return encodeURIComponent(value);
}

function encodeObjectPath(value) {
  return value.split("/").map(encodeURIComponent).join("/");
}
