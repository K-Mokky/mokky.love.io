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

test("feedback stores through Supabase publishable key without bearer auth", async () => {
  const res = createRes();
  const calls = [];

  await withFeedbackEnvironment(
    {
      SUPABASE_URL: "https://example.supabase.co",
      SUPABASE_PUBLISHABLE_KEY: "sb_publishable_test",
    },
    async () => {
      global.fetch = async (url, options) => {
        calls.push({ url, options });
        return { ok: true };
      };

      await feedback(
        createReq("POST", {
          satisfaction: "disliked",
          reason: "",
          mode: 50,
          targetGender: "man",
          targetAgeRange: "30s",
          resultTitle: "테스트 결과",
          topTraits: [{ key: "clarity", label: "명확함", percent: 101 }],
        }),
        res,
      );
    },
  );

  const body = res.json();
  const inserted = JSON.parse(calls[0].options.body);
  assert.equal(res.statusCode, 200);
  assert.equal(body.ok, true);
  assert.equal(body.stored, true);
  assert.equal(body.destination, "supabase");
  assert.equal(calls[0].url, "https://example.supabase.co/rest/v1/ideal_type_feedback");
  assert.equal(calls[0].options.headers.apikey, "sb_publishable_test");
  assert.equal(calls[0].options.headers.Authorization, undefined);
  assert.equal(inserted.reason, null);
  assert.deepEqual(inserted.top_traits, [{ key: "clarity", label: "명확함", percent: 100 }]);
});

test("feedback emails a notification through Resend when configured", async () => {
  const res = createRes();
  const calls = [];

  await withFeedbackEnvironment(
    {
      SUPABASE_URL: "https://example.supabase.co",
      SUPABASE_PUBLISHABLE_KEY: "sb_publishable_test",
      RESEND_API_KEY: "re_test",
      FEEDBACK_EMAIL_TO: "mokky@mokky.store",
      FEEDBACK_EMAIL_FROM: "Love Feedback <feedback@mokky.store>",
    },
    async () => {
      global.fetch = async (url, options) => {
        calls.push({ url, options });
        if (String(url).includes("api.resend.com")) {
          return { ok: true, json: async () => ({ id: "email_123" }) };
        }
        return { ok: true };
      };

      await feedback(
        createReq("POST", {
          satisfaction: "disliked",
          reason: "사진 분위기가 <취향>과 달랐어요",
          mode: 80,
          targetGender: "woman",
          targetAgeRange: "20s",
          resultTitle: "맑은 다정함",
          topTraits: [{ key: "warmth", label: "다정함", percent: 77 }],
          submittedAt: "2026-06-03T12:00:00.000Z",
        }),
        res,
      );
    },
  );

  const body = res.json();
  const emailCall = calls.find((call) => call.url === "https://api.resend.com/emails");
  const emailPayload = JSON.parse(emailCall.options.body);

  assert.equal(res.statusCode, 200);
  assert.equal(body.notification.sent, true);
  assert.equal(body.notification.provider, "resend");
  assert.equal(body.notification.id, "email_123");
  assert.equal(emailCall.options.headers.Authorization, "Bearer re_test");
  assert.equal(emailPayload.from, "Love Feedback <feedback@mokky.store>");
  assert.deepEqual(emailPayload.to, ["mokky@mokky.store"]);
  assert.match(emailPayload.subject, /아쉬워요/);
  assert.match(emailPayload.text, /사진 분위기가 <취향>과 달랐어요/);
  assert.match(emailPayload.html, /사진 분위기가 &lt;취향&gt;과 달랐어요/);
});

test("feedback email failures do not fail accepted survey submissions", async () => {
  const res = createRes();
  const previousConsoleError = console.error;
  console.error = () => {};

  try {
    await withFeedbackEnvironment(
      {
        RESEND_API_KEY: "re_test",
        FEEDBACK_EMAIL_TO: "mokky@mokky.store",
      },
      async () => {
        global.fetch = async () => ({ ok: false, status: 500, text: async () => "send failed" });
        await feedback(createReq("POST", { satisfaction: "liked", mode: 20 }), res);
      },
    );
  } finally {
    console.error = previousConsoleError;
  }

  const body = res.json();
  assert.equal(res.statusCode, 202);
  assert.equal(body.ok, true);
  assert.equal(body.stored, false);
  assert.deepEqual(body.notification, { sent: false, provider: "resend", code: "email_failed" });
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
  return withFeedbackEnvironment({}, callback);
}

async function withFeedbackEnvironment(nextEnv, callback) {
  const envKeys = [
    "FEEDBACK_WEBHOOK_URL",
    "SUPABASE_URL",
    "SUPABASE_SECRET_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "SUPABASE_PUBLISHABLE_KEY",
    "SUPABASE_ANON_KEY",
    "SUPABASE_FEEDBACK_TABLE",
    "RESEND_API_KEY",
    "FEEDBACK_EMAIL_TO",
    "FEEDBACK_EMAIL_FROM",
  ];
  const previousEnv = Object.fromEntries(envKeys.map((key) => [key, process.env[key]]));
  const previousFetch = global.fetch;

  envKeys.forEach((key) => delete process.env[key]);
  Object.assign(process.env, nextEnv);

  try {
    return await callback();
  } finally {
    Object.entries(previousEnv).forEach(([key, value]) => {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    });
    global.fetch = previousFetch;
  }
}
