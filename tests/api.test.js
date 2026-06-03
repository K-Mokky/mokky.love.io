const assert = require("node:assert/strict");
const { Readable } = require("node:stream");
const test = require("node:test");

const feedback = require("../api/feedback");
const health = require("../api/health");
const share = require("../api/share");

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
          // Result fields are intentionally ignored by the API so 검사 결과 is not stored.
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
  assert.equal("result_title" in inserted, false);
  assert.equal("top_traits" in inserted, false);
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

test("share preview page exposes Open Graph image and main-test CTA", async () => {
  const res = createRes();
  const objectPath = "shares/20260603/c1234567890abcdef12345678.jpg";
  const imageUrl = `https://example.supabase.co/storage/v1/object/public/ideal-type-shares/${objectPath}`;

  await withShareEnvironment(
    {
      SUPABASE_URL: "https://example.supabase.co",
    },
    async () => {
      await share(
        createReq(
          "GET",
          null,
          {
            host: "love.mokky.store",
            "x-forwarded-proto": "https",
          },
          `/share/${objectPath}`,
        ),
        res,
      );
    },
  );

  const html = res.text();
  assert.equal(res.statusCode, 200);
  assert.equal(res.headers["content-type"], "text/html; charset=utf-8");
  assert.match(html, /property="og:image"/);
  assert.match(html, /meta name="twitter:card" content="summary_large_image"/);
  assert.match(html, /내 이상형의 플랜카드/);
  assert.match(html, /나의 이상형 사진과 결과 정보를 확인하고 직접 테스트해보세요/);
  assert.match(html, /테스트하러 가기/);
  assert.match(html, /href="https:\/\/love\.mokky\.store"/);
  assert.match(html, new RegExp(escapeRegExp(imageUrl)));
  assert.match(html, /href="https:\/\/love\.mokky\.store\/share\/shares\/20260603\/c1234567890abcdef12345678\.jpg"/);
});

test("share uploads generated image to Supabase storage and returns a share URL", async () => {
  const res = createRes();
  const calls = [];
  const imageData = `data:image/jpeg;base64,${Buffer.from("share-image").toString("base64")}`;

  await withShareEnvironment(
    {
      SUPABASE_URL: "https://example.supabase.co",
      SUPABASE_PUBLISHABLE_KEY: "sb_publishable_test",
      SUPABASE_SHARE_BUCKET: "ideal-type-shares",
    },
    async () => {
      global.fetch = async (url, options) => {
        calls.push({ url, options });
        return { ok: true, text: async () => "" };
      };

      await share(
        createReq(
          "POST",
          {
            imageData,
            title: "내 이상형",
            description: "내 이상형 사진을 확인해보세요.",
            kind: "portrait",
          },
          {
            host: "love.mokky.store",
            "x-forwarded-proto": "https",
          },
        ),
        res,
      );
    },
  );

  const body = res.json();
  assert.equal(res.statusCode, 200);
  assert.equal(body.ok, true);
  assert.equal(body.shareUrl.startsWith("https://love.mokky.store/share/shares/"), true);
  assert.equal(body.shareUrl.length < 100, true);
  assert.equal(body.imageUrl.startsWith("https://example.supabase.co/storage/v1/object/public/ideal-type-shares/shares/"), true);
  assert.equal(calls.length, 1);
  assert.match(calls[0].url, /^https:\/\/example\.supabase\.co\/storage\/v1\/object\/ideal-type-shares\/shares\/\d{8}\/p[0-9a-f]{24}\.jpg$/);
  assert.equal(calls[0].options.method, "POST");
  assert.equal(calls[0].options.headers["Content-Type"], "image/jpeg");
  assert.equal(calls[0].options.headers.apikey, "sb_publishable_test");
  assert.equal(calls[0].options.headers.Authorization, undefined);
  assert.equal(Buffer.isBuffer(calls[0].options.body), true);
});

test("share reports a clear fallback error without Supabase storage", async () => {
  const res = createRes();
  const imageData = `data:image/jpeg;base64,${Buffer.from("share-image").toString("base64")}`;

  await withShareEnvironment({}, async () => {
    await share(createReq("POST", { imageData, title: "내 이상형", kind: "portrait" }), res);
  });

  const body = res.json();
  assert.equal(res.statusCode, 503);
  assert.equal(body.ok, false);
  assert.equal(body.code, "share_storage_unconfigured");
});

function createReq(method, body, headers = {}, url = "/api/test") {
  const raw = body ? JSON.stringify(body) : "";
  const req = Readable.from(raw ? [raw] : []);
  req.method = method;
  req.url = url;
  req.headers = { "content-type": "application/json", ...headers };
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

async function withShareEnvironment(nextEnv, callback) {
  const envKeys = [
    "SUPABASE_URL",
    "SUPABASE_SECRET_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "SUPABASE_PUBLISHABLE_KEY",
    "SUPABASE_ANON_KEY",
    "SUPABASE_SHARE_BUCKET",
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

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
