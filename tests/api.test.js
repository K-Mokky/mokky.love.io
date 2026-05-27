const assert = require("node:assert/strict");
const { Readable } = require("node:stream");
const test = require("node:test");

const generateImage = require("../api/generate-image");
const health = require("../api/health");
const saveResult = require("../api/save-result");

test("health reports app identity and env readiness flags", async () => {
  const res = createRes();
  health(createReq("GET"), res);

  const body = res.json();
  assert.equal(res.statusCode, 200);
  assert.equal(body.ok, true);
  assert.equal(body.appName, "내 이상형을 돌려도!");
  assert.equal(body.maker, "KMokky");
  assert.equal(typeof body.openaiConfigured, "boolean");
  assert.equal(typeof body.supabaseConfigured, "boolean");
});

test("generate-image falls back cleanly when OPENAI_API_KEY is missing", async () => {
  const original = process.env.OPENAI_API_KEY;
  delete process.env.OPENAI_API_KEY;

  try {
    const res = createRes();
    await generateImage(createReq("POST", { prompt: "warm portrait" }), res);

    const body = res.json();
    assert.equal(res.statusCode, 503);
    assert.equal(body.ok, false);
    assert.equal(body.code, "missing_openai_key");
  } finally {
    restoreEnv("OPENAI_API_KEY", original);
  }
});

test("generate-image proxies prompt to OpenAI without exposing the key", async () => {
  const originals = snapshotEnv(["OPENAI_API_KEY", "OPENAI_IMAGE_MODEL", "OPENAI_IMAGE_SIZE", "OPENAI_IMAGE_QUALITY"]);
  const originalFetch = global.fetch;
  process.env.OPENAI_API_KEY = "sk-test";
  delete process.env.OPENAI_IMAGE_MODEL;
  delete process.env.OPENAI_IMAGE_SIZE;
  delete process.env.OPENAI_IMAGE_QUALITY;

  try {
    global.fetch = async (url, options) => {
      const body = JSON.parse(options.body);
      assert.equal(url, "https://api.openai.com/v1/images/generations");
      assert.equal(options.headers.Authorization, "Bearer sk-test");
      assert.equal(body.model, "gpt-image-2");
      assert.equal(body.size, "1024x1536");
      assert.equal(body.quality, "low");
      assert.match(body.prompt, /fictional adult ideal-type portrait/);
      assert.match(body.prompt, /warm portrait/);

      return new Response(JSON.stringify({ data: [{ b64_json: "ZmFrZS1wbmc=" }] }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    };

    const res = createRes();
    await generateImage(createReq("POST", { prompt: "warm portrait", title: "테스트", traits: ["다정함"] }), res);

    const body = res.json();
    assert.equal(res.statusCode, 200);
    assert.equal(body.ok, true);
    assert.equal(body.model, "gpt-image-2");
    assert.equal(body.imageDataUrl, "data:image/png;base64,ZmFrZS1wbmc=");
  } finally {
    global.fetch = originalFetch;
    restoreEnvSnapshot(originals);
  }
});

test("save-result reports missing Supabase env without throwing", async () => {
  const originals = snapshotEnv(["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_ANON_KEY", "SUPABASE_PUBLISHABLE_KEY"]);
  delete process.env.SUPABASE_URL;
  delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  delete process.env.SUPABASE_ANON_KEY;
  delete process.env.SUPABASE_PUBLISHABLE_KEY;

  try {
    const res = createRes();
    await saveResult(
      createReq("POST", {
        mode: 20,
        answer_count: 20,
        answer_pattern: [0, 1, 2],
        result_title: "테스트",
        result_summary: "테스트 요약",
        image_prompt: "test prompt",
        scores: { warmth: 1 },
        top_traits: [{ key: "warmth", label: "다정함", score: 1 }],
      }),
      res,
    );

    const body = res.json();
    assert.equal(res.statusCode, 503);
    assert.equal(body.ok, false);
    assert.equal(body.code, "missing_supabase_env");
  } finally {
    restoreEnvSnapshot(originals);
  }
});

test("save-result inserts sanitized anonymous records into Supabase REST", async () => {
  const originals = snapshotEnv(["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_ANON_KEY", "SUPABASE_PUBLISHABLE_KEY", "SUPABASE_RESULTS_TABLE"]);
  const originalFetch = global.fetch;
  process.env.SUPABASE_URL = "https://example.supabase.co/";
  process.env.SUPABASE_SERVICE_ROLE_KEY = "service-test";
  delete process.env.SUPABASE_ANON_KEY;
  delete process.env.SUPABASE_PUBLISHABLE_KEY;
  delete process.env.SUPABASE_RESULTS_TABLE;

  try {
    global.fetch = async (url, options) => {
      const body = JSON.parse(options.body);
      assert.equal(url, "https://example.supabase.co/rest/v1/ideal_type_results");
      assert.equal(options.headers.apikey, "service-test");
      assert.equal(body.mode, 50);
      assert.equal(body.app_name, "내 이상형을 돌려도!");
      assert.equal(body.maker, "KMokky");
      assert.deepEqual(body.answer_pattern, [0, null, 2]);

      return new Response("", { status: 201 });
    };

    const res = createRes();
    await saveResult(
      createReq("POST", {
        mode: 50,
        answer_count: 3,
        answer_pattern: [0, "bad", 2],
        result_title: "테스트",
        result_summary: "테스트 요약",
        image_prompt: "test prompt",
        scores: { warmth: 1 },
        top_traits: [{ key: "warmth", label: "다정함", score: 1 }],
      }),
      res,
    );

    assert.equal(res.statusCode, 200);
    assert.equal(res.json().ok, true);
  } finally {
    global.fetch = originalFetch;
    restoreEnvSnapshot(originals);
  }
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

function snapshotEnv(keys) {
  return Object.fromEntries(keys.map((key) => [key, process.env[key]]));
}

function restoreEnvSnapshot(snapshot) {
  Object.entries(snapshot).forEach(([key, value]) => restoreEnv(key, value));
}

function restoreEnv(key, value) {
  if (value === undefined) {
    delete process.env[key];
  } else {
    process.env[key] = value;
  }
}
