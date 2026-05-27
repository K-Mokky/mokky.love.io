const APP_NAME = "내 이상형을 돌려도!";
const MAKER = "KMokky";

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

function methodNotAllowed(res, allowed = "POST") {
  res.setHeader("Allow", allowed);
  sendJson(res, 405, {
    ok: false,
    code: "method_not_allowed",
    message: `${allowed} 요청만 사용할 수 있어요.`,
  });
}

async function readJson(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string" && req.body.trim()) return JSON.parse(req.body);

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  const raw = Buffer.concat(chunks).toString("utf8").trim();
  return raw ? JSON.parse(raw) : {};
}

function cleanString(value, maxLength = 1000) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

module.exports = {
  APP_NAME,
  MAKER,
  cleanString,
  isPlainObject,
  methodNotAllowed,
  readJson,
  sendJson,
};
