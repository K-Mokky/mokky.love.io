const {
  APP_NAME,
  MAKER,
  cleanString,
  isPlainObject,
  methodNotAllowed,
  readJson,
  sendJson,
} = require("./_utils");

const DEFAULT_TABLE = "ideal_type_results";
const ALLOWED_MODES = new Set([20, 50, 100]);

module.exports = async function saveResult(req, res) {
  if (req.method !== "POST") {
    methodNotAllowed(res);
    return;
  }

  const supabaseUrl = cleanString(process.env.SUPABASE_URL, 240).replace(/\/$/, "");
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY;
  const table = cleanString(process.env.SUPABASE_RESULTS_TABLE, 80) || DEFAULT_TABLE;

  if (!supabaseUrl || !supabaseKey) {
    sendJson(res, 503, {
      ok: false,
      code: "missing_supabase_env",
      message: "SUPABASE_URL과 Supabase 키가 Vercel 환경변수에 아직 설정되지 않았어요.",
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

  const payload = sanitizeResultPayload(body);
  if (!payload.ok) {
    sendJson(res, 400, payload);
    return;
  }

  try {
    const upstream = await fetch(`${supabaseUrl}/rest/v1/${encodeURIComponent(table)}`, {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(payload.record),
    });

    if (!upstream.ok) {
      const message = await upstream.text().catch(() => "");
      sendJson(res, upstream.status >= 500 ? 502 : upstream.status, {
        ok: false,
        code: "supabase_insert_failed",
        message: message || `Supabase 저장 실패: ${upstream.status}`,
      });
      return;
    }

    sendJson(res, 200, { ok: true });
  } catch (error) {
    sendJson(res, 502, {
      ok: false,
      code: "supabase_unreachable",
      message: error.message || "Supabase REST API에 연결할 수 없어요.",
    });
  }
};

function sanitizeResultPayload(body) {
  const mode = Number(body.mode);
  const answerCount = Number(body.answer_count);

  if (!ALLOWED_MODES.has(mode) || !Number.isInteger(answerCount) || answerCount < 1 || answerCount > 100) {
    return {
      ok: false,
      code: "invalid_result_shape",
      message: "mode는 20/50/100, answer_count는 1~100 사이여야 해요.",
    };
  }

  const answerPattern = Array.isArray(body.answer_pattern)
    ? body.answer_pattern.slice(0, 100).map((answer) => (Number.isInteger(answer) ? answer : null))
    : [];

  return {
    ok: true,
    record: {
      mode,
      answer_count: answerCount,
      answer_pattern: answerPattern,
      result_title: cleanString(body.result_title, 300),
      result_summary: cleanString(body.result_summary, 1200),
      image_prompt: cleanString(body.image_prompt, 5000),
      scores: isPlainObject(body.scores) ? body.scores : {},
      top_traits: Array.isArray(body.top_traits) ? body.top_traits.slice(0, 10) : [],
      app_name: APP_NAME,
      maker: MAKER,
    },
  };
}
