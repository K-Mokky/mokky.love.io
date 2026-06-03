const assert = require("node:assert/strict");
const { Readable } = require("node:stream");
const test = require("node:test");

const feedback = require("../api/feedback");
const health = require("../api/health");

test("health reports app identity and browser image mode", async () => {
  const res = createRes();
  health(createReq("GET"), res);

  const body = res.json();
  assert.equal(res.statusCode, 200);
  assert.equal(body.ok, true);
  assert.equal(body.appName, "내 이상형을 돌려도!");
  assert.equal(body.maker, "KMokky");
  assert.equal(body.imageMode, "browser-canvas");
  assert.deepEqual(Object.keys(body).sort(), ["appName", "imageMode", "maker", "ok"].sort());
});

test("feedback accepts liked survey without configured storage", async () => {
  const res = createRes();
  await withNoFeedbackStorage(() =>
    feedback(
      createReq("POST", {
        satisfaction: "liked",
        reason: "",
        mode: 80,
        targetGender: "woman",
        targetAgeRange: "20s",
        resultTitle: "테스트 결과",
        topTraits: [{ key: "warmth", label: "다정함", percent: 72 }],
        submittedAt: "2026-06-03T12:00:00.000Z",
      }),
      res,
    ),
  );

  const body = res.json();
  assert.equal(res.statusCode, 202);
  assert.equal(body.ok, true);
  assert.equal(body.stored, false);
  assert.equal(body.destination, "none");
});

test("feedback accepts disliked survey without a reason", async () => {
  const res = createRes();
  await withNoFeedbackStorage(() => feedback(createReq("POST", { satisfaction: "disliked", mode: 20 }), res));

  const body = res.json();
  assert.equal(res.statusCode, 202);
  assert.equal(body.ok, true);
  assert.equal(body.stored, false);
});

test("feedback rejects invalid satisfaction values", async () => {
  const res = createRes();
  await feedback(createReq("POST", { satisfaction: "maybe" }), res);

  const body = res.json();
  assert.equal(res.statusCode, 400);
  assert.equal(body.ok, false);
  assert.equal(body.code, "invalid_feedback");
});

test("feedback only allows POST", async () => {
  const res = createRes();
  await feedback(createReq("GET"), res);

  const body = res.json();
  assert.equal(res.statusCode, 405);
  assert.equal(body.ok, false);
  assert.equal(res.headers.allow, "POST");
});

function createReq(method, body) {
  const raw = body ? JSON.stringify(body) : "";
  const req = Readable.from(raw ? [raw] : []);
  req.method = method;
  req.headers = { "content-type": "application/json" };
  return req;
}

function createRes() {
  const chunks = [];
  return {
    statusCode: 200,
    headers: {},
    setHeader(key, value) {
      this.headers[key.toLowerCase()] = value;
    },
    end(chunk) {
      if (chunk) chunks.push(Buffer.from(chunk));
      this.finished = true;
    },
    text() {
      return Buffer.concat(chunks).toString("utf8");
    },
    json() {
      return JSON.parse(this.text());
    },
  };
}

async function withNoFeedbackStorage(callback) {
  const previous = {
    FEEDBACK_WEBHOOK_URL: process.env.FEEDBACK_WEBHOOK_URL,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  };
  delete process.env.FEEDBACK_WEBHOOK_URL;
  delete process.env.SUPABASE_URL;
  delete process.env.SUPABASE_SERVICE_ROLE_KEY;

  try {
    return await callback();
  } finally {
    Object.entries(previous).forEach(([key, value]) => {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    });
  }
}
