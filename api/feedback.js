const {
  cleanString,
  isPlainObject,
  methodNotAllowed,
  readJson,
  sendJson,
} = require("./_utils");

const VALID_SATISFACTIONS = new Set(["liked", "disliked"]);
const DEFAULT_FEEDBACK_TABLE = "ideal_type_feedback";
const SUPABASE_KEY_NAMES = [
  "SUPABASE_SECRET_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "SUPABASE_PUBLISHABLE_KEY",
  "SUPABASE_ANON_KEY",
];

module.exports = async function feedback(req, res) {
  if (req.method !== "POST") {
    methodNotAllowed(res, "POST");
    return;
  }

  try {
    const body = await readJson(req);
    const payload = normalizeFeedback(body, req);
    if (!payload) {
      sendJson(res, 400, {
        ok: false,
        code: "invalid_feedback",
        message: "만족도 선택 값이 올바르지 않아요.",
      });
      return;
    }

    const storage = await storeFeedback(payload);
    sendJson(res, storage.stored ? 200 : 202, {
      ok: true,
      stored: storage.stored,
      destination: storage.destination,
      message: storage.stored
        ? "설문이 저장됐어요."
        : "저장소가 연결되지 않아 서버에는 저장하지 않았어요.",
    });
  } catch (error) {
    console.error("Feedback API failed:", error);
    sendJson(res, 500, {
      ok: false,
      code: "feedback_failed",
      message: "설문 처리 중 오류가 발생했어요.",
    });
  }
};

function normalizeFeedback(body, req) {
  if (!isPlainObject(body)) return null;

  const satisfaction = cleanString(body.satisfaction, 20);
  if (!VALID_SATISFACTIONS.has(satisfaction)) return null;

  return {
    satisfaction,
    reason: cleanString(body.reason, 600),
    mode: normalizeMode(body.mode),
    targetGender: cleanString(body.targetGender, 20),
    targetAgeRange: cleanString(body.targetAgeRange, 20),
    userAgent: cleanString(req.headers?.["user-agent"], 300),
    submittedAt: cleanString(body.submittedAt, 40) || new Date().toISOString(),
  };
}

function normalizeMode(value) {
  const mode = Number(value);
  return [20, 50, 80].includes(mode) ? mode : null;
}

async function storeFeedback(payload) {
  if (process.env.FEEDBACK_WEBHOOK_URL) {
    await postWebhook(payload);
    return { stored: true, destination: "webhook" };
  }

  if (process.env.SUPABASE_URL && getSupabaseApiKey()) {
    await insertSupabaseFeedback(payload);
    return { stored: true, destination: "supabase" };
  }

  return { stored: false, destination: "none" };
}

async function postWebhook(payload) {
  const response = await fetch(process.env.FEEDBACK_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`Feedback webhook failed: ${response.status}`);
  }
}

async function insertSupabaseFeedback(payload) {
  const baseUrl = process.env.SUPABASE_URL.replace(/\/+$/, "");
  const table = cleanString(process.env.SUPABASE_FEEDBACK_TABLE, 80) || DEFAULT_FEEDBACK_TABLE;
  const apiKey = getSupabaseApiKey();
  const response = await fetch(`${baseUrl}/rest/v1/${encodeURIComponent(table)}`, {
    method: "POST",
    headers: buildSupabaseHeaders(apiKey),
    body: JSON.stringify({
      satisfaction: payload.satisfaction,
      reason: payload.reason || null,
      mode: payload.mode,
      target_gender: payload.targetGender || null,
      target_age_range: payload.targetAgeRange || null,
      user_agent: payload.userAgent || null,
      submitted_at: payload.submittedAt,
    }),
  });
  if (!response.ok) {
    const message = await response.text().catch(() => "");
    throw new Error(`Supabase feedback insert failed: ${response.status} ${message}`.trim());
  }
}

function getSupabaseApiKey() {
  return SUPABASE_KEY_NAMES.map((name) => cleanString(process.env[name], 500)).find(Boolean) || "";
}

function buildSupabaseHeaders(apiKey) {
  const headers = {
    "Content-Type": "application/json",
    Prefer: "return=minimal",
    apikey: apiKey,
  };

  if (!apiKey.startsWith("sb_")) {
    headers.Authorization = `Bearer ${apiKey}`;
  }

  return headers;
}
