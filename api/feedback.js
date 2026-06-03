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
const DEFAULT_FEEDBACK_EMAIL_FROM = "Love Feedback <feedback@mokky.store>";
const RESEND_EMAIL_ENDPOINT = "https://api.resend.com/emails";

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
    const notification = await notifyFeedback(payload, storage);
    sendJson(res, storage.stored ? 200 : 202, {
      ok: true,
      stored: storage.stored,
      destination: storage.destination,
      notification,
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
    resultTitle: cleanString(body.resultTitle, 180),
    topTraits: normalizeTopTraits(body.topTraits),
    userAgent: cleanString(req.headers?.["user-agent"], 300),
    submittedAt: cleanString(body.submittedAt, 40) || new Date().toISOString(),
  };
}

function normalizeMode(value) {
  const mode = Number(value);
  return [20, 50, 80].includes(mode) ? mode : null;
}

function normalizeTopTraits(value) {
  if (!Array.isArray(value)) return [];
  return value
    .slice(0, 5)
    .map((trait) => {
      if (!isPlainObject(trait)) return null;
      const percent = Math.round(Number(trait.percent));
      return {
        key: cleanString(trait.key, 40),
        label: cleanString(trait.label, 40),
        percent: Number.isFinite(percent) ? Math.max(0, Math.min(100, percent)) : 0,
      };
    })
    .filter((trait) => trait && trait.key && trait.label);
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
      result_title: payload.resultTitle || null,
      top_traits: payload.topTraits,
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

async function notifyFeedback(payload, storage) {
  const config = getFeedbackEmailConfig();
  if (!config) {
    return { sent: false, provider: "none" };
  }

  try {
    const email = buildFeedbackEmail(payload, storage, config);
    const response = await fetch(RESEND_EMAIL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify(email),
    });

    if (!response.ok) {
      const message = await response.text().catch(() => "");
      throw new Error(`Resend feedback email failed: ${response.status} ${message}`.trim());
    }

    const result = await response.json().catch(() => ({}));
    return {
      sent: true,
      provider: "resend",
      id: cleanString(result.id, 120) || null,
    };
  } catch (error) {
    console.error("Feedback email notification failed:", error);
    return { sent: false, provider: "resend", code: "email_failed" };
  }
}

function getFeedbackEmailConfig() {
  const apiKey = cleanString(process.env.RESEND_API_KEY, 500);
  const recipients = splitEmailList(process.env.FEEDBACK_EMAIL_TO);
  if (!apiKey || recipients.length === 0) return null;

  return {
    apiKey,
    from: cleanString(process.env.FEEDBACK_EMAIL_FROM, 200) || DEFAULT_FEEDBACK_EMAIL_FROM,
    to: recipients,
  };
}

function splitEmailList(value) {
  return String(value || "")
    .split(",")
    .map((email) => cleanString(email, 120))
    .filter(Boolean)
    .slice(0, 50);
}

function buildFeedbackEmail(payload, storage, config) {
  const satisfactionLabel = payload.satisfaction === "liked" ? "마음에 들어요" : "아쉬워요";
  const reason = payload.reason || "작성 안 함";
  const traitsText =
    payload.topTraits.map((trait) => `${trait.label} ${trait.percent}%`).join(", ") || "없음";
  const storageText = storage.stored ? `저장 완료 (${storage.destination})` : "서버 저장 안 됨";
  const submittedAt = payload.submittedAt || new Date().toISOString();
  const subject = `[내 이상형을 돌려도!] 새 설문 응답: ${satisfactionLabel}`;
  const textLines = [
    "새 결과 만족도 설문이 들어왔어요.",
    "",
    `만족도: ${satisfactionLabel}`,
    `이유: ${reason}`,
    `검사 모드: ${payload.mode || "미상"}문항`,
    `선택 성별: ${payload.targetGender || "미상"}`,
    `선택 나이대: ${payload.targetAgeRange || "미상"}`,
    `결과 제목: ${payload.resultTitle || "미상"}`,
    `상위 성향: ${traitsText}`,
    `저장 상태: ${storageText}`,
    `제출 시각: ${submittedAt}`,
    "",
    "검사 답변 원문과 결과 이미지는 이 메일에 포함되지 않아요.",
  ];

  const rows = [
    ["만족도", satisfactionLabel],
    ["이유", reason],
    ["검사 모드", payload.mode ? `${payload.mode}문항` : "미상"],
    ["선택 성별", payload.targetGender || "미상"],
    ["선택 나이대", payload.targetAgeRange || "미상"],
    ["결과 제목", payload.resultTitle || "미상"],
    ["상위 성향", traitsText],
    ["저장 상태", storageText],
    ["제출 시각", submittedAt],
  ];

  return {
    from: config.from,
    to: config.to,
    subject,
    text: textLines.join("\n"),
    html: `
      <div style="font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#24212b;line-height:1.6;">
        <h2 style="margin:0 0 16px;">새 결과 만족도 설문이 들어왔어요.</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tbody>
            ${rows
              .map(
                ([label, value]) => `
                  <tr>
                    <th style="width:130px;text-align:left;vertical-align:top;padding:8px;border-bottom:1px solid #f0dce6;color:#d92b78;">${escapeHtml(label)}</th>
                    <td style="padding:8px;border-bottom:1px solid #f0dce6;">${escapeHtml(value)}</td>
                  </tr>
                `,
              )
              .join("")}
          </tbody>
        </table>
        <p style="margin-top:16px;color:#6f6570;">검사 답변 원문과 결과 이미지는 이 메일에 포함되지 않아요.</p>
      </div>
    `,
  };
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
