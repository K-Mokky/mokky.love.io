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

test("Gemini copy prompt supports late-teen adults safely", () => {
  const context = loadApp();
  const prompt = vm.runInContext(
    `(() => {
      state.targetGender = "man";
      state.targetAgeRange = "teens";
      return makePrompt([{ key: "energy" }, { key: "humor" }, { key: "adventure" }]);
    })()`,
    context,
  );

  assert.match(prompt, /Korean man/);
  assert.match(prompt, /age 18 to 19/);
  assert.match(prompt, /not under 18/);
  assert.match(prompt, /not a child/);
  assert.match(prompt, /age-appropriate casual styling/);
});

test("portrait asset selection uses the winning trait and one of five WebP variants", () => {
  const context = loadApp();
  const selected = vm.runInContext(
    `(() => {
      const originalRandom = Math.random;
      Math.random = () => 0.999;
      state.targetGender = "man";
      state.targetAgeRange = "30s";
      const result = selectPortraitAsset({ top: [{ key: "adventure" }] });
      Math.random = originalRandom;
      return result;
    })()`,
    context,
  );

  assert.equal(selected.trait, "adventure");
  assert.equal(selected.gender, "man");
  assert.equal(selected.ageRange, "30s");
  assert.equal(selected.variant, 5);
  assert.equal(selected.src, "/assets/portraits-webp/adventure/man/30s/005.webp");
});

test("deployable WebP portraits cover every trait, gender, and age combination", () => {
  const manifestPath = path.join(__dirname, "..", "assets", "portraits-webp", "manifest.json");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const combinationCounts = new Map();

  assert.equal(manifest.count, 300);
  assert.equal(manifest.variantsPerCombination, 5);

  for (const file of manifest.files) {
    assert.equal(file.format, "webp");
    assert.equal(file.width, 900);
    assert.equal(file.height, 1200);
    assert.equal(path.extname(file.file), ".webp");
    assert.equal(fs.existsSync(path.join(__dirname, "..", "assets", "portraits-webp", file.file)), true);

    const key = `${file.trait}/${file.gender}/${file.ageRange}`;
    combinationCounts.set(key, (combinationCounts.get(key) || 0) + 1);
  }

  assert.equal(combinationCounts.size, 60);
  assert.equal([...combinationCounts.values()].every((count) => count === 5), true);
});

test("result screen omits visible photo information blocks", () => {
  const markup = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  const styles = fs.readFileSync(path.join(__dirname, "..", "styles.css"), "utf8");
  const source = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");

  assert.doesNotMatch(markup, /image-status|imageStatus|prompt-box|imagePrompt|copyPromptButton|PHOTO STYLE/);
  assert.doesNotMatch(styles, /\.image-status|\.prompt-box/);
  assert.doesNotMatch(source, /imagePrompt|copyPromptButton|copyPrompt|PHOTO STYLE/);
});
