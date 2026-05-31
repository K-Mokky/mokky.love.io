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
    hidden: false,
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

test("app ships 110 distinct randomized questions", () => {
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

  assert.equal(count, 110);
  assert.equal(uniqueTexts, 110);
  assert.equal(optionCount, 330);
  assert.equal(uniqueOptionLabels, 330);
  assert.equal(vm.runInContext("questionBank.every((question) => question.options.length === 3)", context), true);
});

test("appearance preference questions are placed at the front", () => {
  const context = loadApp();
  const result = vm.runInContext(
    `(() => ({
      categories: questionBank.slice(0, 10).map((question) => question.category),
      copy: questionBank.slice(0, 10).flatMap((question) => [
        question.text,
        ...question.options.map((option) => option.label),
      ]).join(" "),
    }))()`,
    context,
  );

  assert.equal(result.categories.every((category) => category === "외모 취향"), true);
  assert.match(result.copy, /여우/);
  assert.match(result.copy, /강아지/);
  assert.match(result.copy, /원숭이/);
});

test("selected quiz questions are shuffled and unique per run", () => {
  const context = loadApp();
  const result = vm.runInContext(
    `(() => {
      setMode(50);
      return {
        length: state.questionOrder.length,
        unique: new Set(state.questionOrder).size,
        openingCategories: state.questionOrder
          .slice(0, 10)
          .map((id) => questionMap.get(id).category),
      };
    })()`,
    context,
  );

  assert.equal(result.length, 50);
  assert.equal(result.unique, 50);
  assert.equal(result.openingCategories.every((category) => category === "외모 취향"), true);
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
  assert.match(prompt, /Core personality cues/);
  assert.match(prompt, /preserve the source\/original photo aspect ratio/);
  assert.match(prompt, /do not stretch vertically/);
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
  assert.equal(selected.file, "adventure/man/30s/005.webp");
  assert.equal(selected.src, "/assets/portraits-webp/adventure/man/30s/005.webp");
});

test("portrait selection is driven primarily by opening appearance answers", () => {
  const context = loadApp();
  const result = vm.runInContext(
    `(() => {
      state.questionOrder = questionBank.slice(0, 20).map((question) => question.id);
      state.mode = 20;
      state.answers = Array(20).fill(0);
      const profile = buildProfile();
      return {
        appearanceTop: getTopTraits(computeAppearanceScores(), 1)[0].key,
        portraitTop: profile.portraitTop[0].key,
        selectedTrait: selectPortraitAsset(profile).trait,
      };
    })()`,
    context,
  );

  assert.equal(result.appearanceTop, "aesthetics");
  assert.equal(result.portraitTop, "aesthetics");
  assert.equal(result.selectedTrait, "aesthetics");
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
    assert.equal(Number.isInteger(file.sourceWidth), true);
    assert.equal(Number.isInteger(file.sourceHeight), true);
    assert.equal(file.sourceWidth > 0, true);
    assert.equal(file.sourceHeight > 0, true);
    assert.equal(file.sourceAspectRatio, Number((file.sourceWidth / file.sourceHeight).toFixed(6)));
    assert.equal(path.extname(file.file), ".webp");
    assert.equal(fs.existsSync(path.join(__dirname, "..", "assets", "portraits-webp", file.file)), true);

    const key = `${file.trait}/${file.gender}/${file.ageRange}`;
    combinationCounts.set(key, (combinationCounts.get(key) || 0) + 1);
  }

  assert.equal(combinationCounts.size, 60);
  assert.equal([...combinationCounts.values()].every((count) => count === 5), true);
});

test("portrait canvas preserves the selected source photo ratio", () => {
  const context = loadApp();
  const result = vm.runInContext(
    `(() => {
      const calls = [];
      const canvas = {
        width: 900,
        height: 1200,
        getContext() {
          return {
            clearRect: (...args) => calls.push(["clearRect", ...args]),
            drawImage: (...args) => calls.push(["drawImage", ...args]),
          };
        },
      };
      els.portraitCanvas = canvas;
      drawPortraitImage(
        { naturalWidth: 900, naturalHeight: 1200 },
        { sourceWidth: 1536, sourceHeight: 1024 },
      );
      return {
        width: canvas.width,
        height: canvas.height,
        drawArgs: calls.find((call) => call[0] === "drawImage").slice(2),
      };
    })()`,
    context,
  );

  assert.equal(result.width, 1200);
  assert.equal(result.height, 800);
  assert.deepEqual(Array.from(result.drawArgs), [0, 0, 1200, 800]);
});

test("generated portrait status hides asset variant details", () => {
  const context = loadApp();
  const status = vm.runInContext(
    `(() => {
      els.imageStatus = {
        hidden: false,
        textContent: "다정함 · 여성 · 20대 사진 004/005",
        classList: { toggle() {} },
      };
      setImageStatus("generated");
      return { hidden: els.imageStatus.hidden, textContent: els.imageStatus.textContent };
    })()`,
    context,
  );

  assert.equal(status.hidden, true);
  assert.equal(status.textContent, "");
});

test("result screen omits visible photo information blocks", () => {
  const markup = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  const styles = fs.readFileSync(path.join(__dirname, "..", "styles.css"), "utf8");
  const source = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");

  assert.doesNotMatch(markup, /image-status|imageStatus|prompt-box|imagePrompt|copyPromptButton|PHOTO STYLE/);
  assert.doesNotMatch(styles, /\.image-status|\.prompt-box/);
  assert.doesNotMatch(source, /imagePrompt|copyPromptButton|copyPrompt|PHOTO STYLE/);
});

test("question count is compact and non-wrapping", () => {
  const context = loadApp();
  const label = vm.runInContext("formatQuestionCount(2, 20)", context);
  const styles = fs.readFileSync(path.join(__dirname, "..", "styles.css"), "utf8");

  assert.equal(label, "2/20");
  assert.doesNotMatch(label, /\s/);
  assert.match(styles, /#questionCount\s*{[^}]*white-space:\s*nowrap;/s);
});


test("brand exposes KMokky contact email", () => {
  const markup = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  const styles = fs.readFileSync(path.join(__dirname, "..", "styles.css"), "utf8");

  assert.match(markup, /Made by KMokky/);
  assert.match(markup, /mailto:mokky@mokky\.store/);
  assert.match(markup, /mokky@mokky\.store/);
  assert.match(styles, /\.brand-email/);
});


test("wrapped canvas text returns the next safe baseline", () => {
  const context = loadApp();
  const result = vm.runInContext(
    `(() => {
      const drawn = [];
      const ctx = {
        measureText(value) { return { width: String(value).length * 10 }; },
        fillText(...args) { drawn.push(args); },
      };
      const nextY = drawWrappedText(ctx, "alpha beta gamma delta", 0, 100, 95, 30, 3);
      return { nextY, drawnY: Array.from(drawn.map((entry) => entry[2])) };
    })()`,
    context,
  );

  assert.equal(result.drawnY.length, 3);
  assert.deepEqual(Array.from(result.drawnY), [100, 130, 160]);
  assert.equal(result.nextY, 190);
});
