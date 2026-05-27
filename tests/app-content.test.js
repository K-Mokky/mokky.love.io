const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

function createElementStub() {
  return {
    className: "",
    dataset: {},
    disabled: false,
    innerHTML: "",
    textContent: "",
    style: { setProperty() {} },
    classList: { toggle() {}, add() {}, remove() {} },
    append() {},
    addEventListener() {},
    setAttribute() {},
    getContext() { return {}; },
    toDataURL() { return "data:image/png;base64,"; },
    toBlob(callback) { callback(new Blob([])); },
    click() {},
  };
}

function loadApp() {
  const source = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
  const context = vm.createContext({
    Blob,
    File: class File extends Blob {},
    console,
    navigator: {},
    setTimeout,
    document: {
      documentElement: { style: { setProperty() {} } },
      querySelector() {
        return createElementStub();
      },
      querySelectorAll() {
        return [];
      },
      createElement() {
        return createElementStub();
      },
    },
    getComputedStyle() {
      return { getPropertyValue: () => "" };
    },
  });

  vm.runInContext(source, context, { filename: "app.js" });
  return context;
}

test("app ships 100 distinct randomized questions", () => {
  const context = loadApp();
  const count = vm.runInContext("questionBank.length", context);
  const uniqueTexts = vm.runInContext("new Set(questionBank.map((question) => question.text)).size", context);
  const uniqueOptionLabels = vm.runInContext(
    "new Set(questionBank.flatMap((question) => question.options.map((option) => option.label))).size",
    context,
  );
  const optionCount = vm.runInContext(
    "questionBank.flatMap((question) => question.options.map((option) => option.label)).length",
    context,
  );

  assert.equal(count, 100);
  assert.equal(uniqueTexts, 100);
  assert.equal(optionCount, 300);
  assert.equal(uniqueOptionLabels, 300);
  assert.equal(vm.runInContext("questionBank.every((question) => question.options.length === 3)", context), true);
});

test("selected quiz questions are shuffled and unique per run", () => {
  const context = loadApp();
  const result = vm.runInContext(
    `(() => {
      setMode(50);
      return {
        length: state.questionOrder.length,
        unique: new Set(state.questionOrder).size,
      };
    })()`,
    context,
  );

  assert.equal(result.length, 50);
  assert.equal(result.unique, 50);
});

test("Gemini copy prompt pins a youthful 20s age range", () => {
  const context = loadApp();
  const prompt = vm.runInContext(
    `(() => {
      state.targetGender = "woman";
      state.targetAgeRange = "20s";
      return makePrompt([{ key: "warmth" }, { key: "romance" }, { key: "aesthetics" }]);
    })()`,
    context,
  );

  assert.match(prompt, /Korean woman/);
  assert.match(prompt, /age 24 to 29/);
  assert.match(prompt, /not middle-aged/);
  assert.match(prompt, /not ajumma style/);
  assert.match(prompt, /selected age range/);
  assert.doesNotMatch(prompt, /adult Korean woman/);
});
