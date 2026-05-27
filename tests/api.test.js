const assert = require("node:assert/strict");
const { Readable } = require("node:stream");
const test = require("node:test");

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
