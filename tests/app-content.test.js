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
    value: "",
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

test("app ships 80 distinct redesigned questions", () => {
  const context = loadApp();
  const result = vm.runInContext(
    `(() => {
      const optionLabels = questionBank.flatMap((question) => question.options.map((option) => option.label));
      return {
        count: questionBank.length,
        appearanceCount: questionBank.filter((question) => question.category === appearanceCategory).length,
        uniqueTexts: new Set(questionBank.map((question) => question.text)).size,
        optionCount: optionLabels.length,
        uniqueOptionLabels: new Set(optionLabels).size,
        twoChoiceCount: questionBank.filter((question) => question.options.length === 2).length,
        fourChoiceCount: questionBank.filter((question) => question.options.length === 4).length,
        unsupportedChoiceCount: questionBank.filter((question) => ![2, 4].includes(question.options.length)).length,
        averageQuestionLength: questionBank.reduce((sum, question) => sum + question.text.length, 0) / questionBank.length,
      };
    })()`,
    context,
  );

  assert.equal(result.count, 80);
  assert.equal(result.appearanceCount, 40);
  assert.equal(result.uniqueTexts, 80);
  assert.equal(result.optionCount, 166);
  assert.equal(result.uniqueOptionLabels, 166);
  assert.equal(result.twoChoiceCount, 77);
  assert.equal(result.fourChoiceCount, 3);
  assert.equal(result.unsupportedChoiceCount, 0);
  assert.equal(result.averageQuestionLength > 28, true);
});

test("appearance preference questions cover concrete face and style types", () => {
  const context = loadApp();
  const result = vm.runInContext(
    `(() => ({
      categories: questionBank.filter((question) => question.category === appearanceCategory).map((question) => question.category),
      copy: questionBank.filter((question) => question.category === appearanceCategory).flatMap((question) => [
        question.text,
        ...question.options.map((option) => option.label),
      ]).join(" "),
    }))()`,
    context,
  );

  assert.equal(result.categories.every((category) => category === "외모 취향"), true);
  assert.match(result.copy, /여우/);
  assert.match(result.copy, /늑대/);
  assert.match(result.copy, /공룡/);
  assert.match(result.copy, /강아지/);
  assert.match(result.copy, /미니멀/);
  assert.match(result.copy, /키치/);
});

test("question copy uses natural ideal-type preference phrasing", () => {
  const context = loadApp();
  const result = vm.runInContext(
    `(() => ({
      texts: questionBank.map((question) => question.text),
      animalQuestion: questionBank.find((question) => question.text.includes("동물이라면"))?.text,
    }))()`,
    context,
  );

  assert.equal(result.texts.length, 80);
  assert.equal(result.texts.every((text) => text.includes("이상형")), true);
  assert.equal(result.texts.every((text) => text.endsWith("좋겠나요?")), true);
  assert.equal(result.animalQuestion, "이상형이 동물이라면, 어떤 동물이었으면 좋겠나요?");
  assert.equal(result.texts.some((text) => /동물상으로 다시 고른다면|어떤 분위기가 궁금한가요/.test(text)), false);
});

test("selected quiz questions stay unique and keep a 50% appearance ratio", () => {
  const context = loadApp();
  const result = vm.runInContext(
    `(() => {
      setMode(80);
      const order80 = state.questionOrder.map((id) => questionMap.get(id));
      setMode(50);
      const order50 = state.questionOrder.map((id) => questionMap.get(id));
      setMode(20);
      const order20 = state.questionOrder.map((id) => questionMap.get(id));
      return {
        order80Length: order80.length,
        order80Unique: new Set(order80.map((question) => question.id)).size,
        order80Appearance: order80.filter((question) => question.category === appearanceCategory).length,
        order50Length: order50.length,
        order50Unique: new Set(order50.map((question) => question.id)).size,
        order50Appearance: order50.filter((question) => question.category === appearanceCategory).length,
        order20Length: order20.length,
        order20Unique: new Set(order20.map((question) => question.id)).size,
        order20Appearance: order20.filter((question) => question.category === appearanceCategory).length,
      };
    })()`,
    context,
  );

  assert.equal(result.order80Length, 80);
  assert.equal(result.order80Unique, 80);
  assert.equal(result.order80Appearance, 40);
  assert.equal(result.order50Length, 50);
  assert.equal(result.order50Unique, 50);
  assert.equal(result.order50Appearance, 25);
  assert.equal(result.order20Length, 20);
  assert.equal(result.order20Unique, 20);
  assert.equal(result.order20Appearance, 10);
});

test("question history avoids repeat prompts until the full bank is used", () => {
  const context = loadApp();
  const result = vm.runInContext(
    `(() => {
      state.mode = 20;
      state.seenQuestionIds = new Set();
      const runs = [];
      for (let index = 0; index < 4; index += 1) {
        prepareQuestionRun();
        rememberCurrentQuestionOrder();
        runs.push([...state.questionOrder]);
      }
      const flat = runs.flat();
      return {
        runLengths: runs.map((run) => run.length),
        uniquePerRun: runs.map((run) => new Set(run).size),
        totalCount: flat.length,
        totalUnique: new Set(flat).size,
        seenCount: state.seenQuestionIds.size,
      };
    })()`,
    context,
  );

  assert.equal(result.runLengths.join(","), "20,20,20,20");
  assert.equal(result.uniquePerRun.join(","), "20,20,20,20");
  assert.equal(result.totalCount, 80);
  assert.equal(result.totalUnique, 80);
  assert.equal(result.seenCount, 80);
});

test("active quiz questions recover from duplicate order entries", () => {
  const context = loadApp();
  const result = vm.runInContext(
    `(() => {
      setMode(20);
      state.questionOrder = [state.questionOrder[0], ...state.questionOrder.slice(0, 19)];
      const questions = activeQuestions();
      return {
        length: questions.length,
        uniqueIds: new Set(questions.map((question) => question.id)).size,
        uniqueTexts: new Set(questions.map((question) => question.text)).size,
      };
    })()`,
    context,
  );

  assert.equal(result.length, 20);
  assert.equal(result.uniqueIds, 20);
  assert.equal(result.uniqueTexts, 20);
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

test("portrait scoring blends appearance answers at 75% and relationship answers at 25%", () => {
  const context = loadApp();
  const result = vm.runInContext(
    `(() => {
      const appearanceQuestion = questionBank.find((question) =>
        question.category === appearanceCategory &&
        question.options.some((option) => option.scores.aesthetics === 3 && option.scores.independence === 2)
      );
      const relationshipQuestion = questionBank.find((question) =>
        question.category !== appearanceCategory &&
        question.options.some((option) => option.scores.warmth === 3 && option.scores.steadiness === 2)
      );
      const appearanceIndex = appearanceQuestion.options.findIndex((option) => option.scores.aesthetics === 3);
      const relationshipIndex = relationshipQuestion.options.findIndex((option) => option.scores.warmth === 3);
      state.questionOrder = [appearanceQuestion.id, relationshipQuestion.id];
      state.mode = 2;
      state.answers = [appearanceIndex, relationshipIndex];
      const profile = buildProfile();
      return {
        weight: portraitAppearanceWeight,
        aesthetics: profile.portraitScores.aesthetics,
        independence: profile.portraitScores.independence,
        warmth: profile.portraitScores.warmth,
        steadiness: profile.portraitScores.steadiness,
      };
    })()`,
    context,
  );

  assert.equal(result.weight, 0.75);
  assert.equal(Number(result.aesthetics.toFixed(2)), 0.45);
  assert.equal(Number(result.independence.toFixed(2)), 0.3);
  assert.equal(Number(result.warmth.toFixed(2)), 0.15);
  assert.equal(Number(result.steadiness.toFixed(2)), 0.1);
});

test("result copy and trait meters use per-trait 100-point percentages", () => {
  const context = loadApp();
  const result = vm.runInContext(
    `(() => {
      const normalized = getNormalizedTraits({
        warmth: 10,
        energy: 5,
        humor: 0,
        intellect: 0,
        steadiness: 0,
        aesthetics: 0,
        romance: 0,
        independence: 0,
        adventure: 0,
        sincerity: 0,
      }, {
        warmth: 20,
        energy: 5,
        humor: 10,
        intellect: 10,
        steadiness: 10,
        aesthetics: 10,
        romance: 10,
        independence: 10,
        adventure: 10,
        sincerity: 10,
      });
      state.answers = activeQuestions().map((question) => 0);
      const profile = buildProfile();
      return {
        warmthPercent: normalized.find((trait) => trait.key === "warmth").percent,
        energyPercent: normalized.find((trait) => trait.key === "energy").percent,
        percentSum: normalized.reduce((sum, trait) => sum + trait.percent, 0),
        renderedTraitCount: getNormalizedTraits(profile.scores, profile.scoreMaximums).length,
        summary: profile.summary,
      };
    })()`,
    context,
  );

  assert.equal(result.warmthPercent, 50);
  assert.equal(result.energyPercent, 100);
  assert.equal(result.percentSum > 100, true);
  assert.equal(result.renderedTraitCount, 10);
  assert.equal(result.summary.length > 650, true);
  assert.match(result.summary, /외모 취향 75%/);
  assert.match(result.summary, /관계 성향 25%/);
  assert.match(result.summary, /각 성향 100% 기준/);
  assert.doesNotMatch(result.summary, /서로 더해 100%가 되지 않아도 정상/);
  assert.doesNotMatch(result.summary, /모든 성향을 합쳐 100%/);
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

test("feedback survey is visible on result screen but excluded from placard canvas", () => {
  const markup = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  const source = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
  const context = loadApp();
  const placardFunctionSource = vm.runInContext("createPlacardCanvas.toString()", context);

  assert.match(markup, /id="feedbackPanel"/);
  assert.match(markup, /결과가 마음에 드시나요/);
  assert.match(markup, /id="feedbackModal"/);
  assert.match(markup, /이유 없이 제출/);
  assert.match(markup, /검사 결과는 어디에도 저장되지 않습니다/);
  assert.match(source, /설문에 참여해주셔서 감사합니다/);
  assert.match(source, /satisfaction/);
  assert.doesNotMatch(placardFunctionSource, /feedback|설문|만족|아쉬웠던 이유|결과가 마음에 드시나요/);
});

test("result actions separate PNG saving from SNS link sharing", () => {
  const markup = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  const source = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
  const context = loadApp();
  const placardFunctionSource = vm.runInContext("createPlacardCanvas.toString()", context);
  const placardLayoutSource = vm.runInContext("measurePlacardLayout.toString()", context);

  assert.match(markup, /id="restartButton"[^>]*>다시 테스트하러 가기</);
  assert.doesNotMatch(markup, /id="downloadButton"|>이미지 저장<|>다시 돌리기</);
  assert.match(markup, /나의 이상형 저장하기/);
  assert.match(markup, /내 이상형의 플랜카드 저장하기/);
  assert.match(markup, /SNS에 공유하고 싶다면, 아래 버튼을 눌러 공유 링크를 생성하여 주세요!/);
  assert.match(markup, /id="sharePortraitLinkButton"[^>]*>나의 이상형 공유하기</);
  assert.match(markup, /id="sharePlacardLinkButton"[^>]*>내 이상형의 플랜카드 공유하기</);
  assert.doesNotMatch(markup, /인스타그램 스토리|페이스북 스토리|shareInstagramStoryButton|shareFacebookStoryButton/);
  assert.match(source, /savePortrait/);
  assert.match(source, /savePlacard/);
  assert.match(source, /sharePortraitLink/);
  assert.match(source, /sharePlacardLink/);
  assert.match(source, /shareCanvasLink/);
  assert.match(source, /fetch\("\/api\/share"/);
  assert.match(source, /image\/jpeg/);
  assert.match(source, /toDataURL\("image\/png"\)/);
  assert.match(source, /navigator\.clipboard\.writeText\(shareUrl\)/);
  assert.doesNotMatch(source, /navigator\.share/);
  assert.doesNotMatch(source, /shareStoryImage|shareInstagramStoryButton|shareFacebookStoryButton/);
  assert.match(placardFunctionSource, /내 이상형의 플랜카드/);
  assert.match(placardFunctionSource, /이상형의 타입/);
  assert.match(placardFunctionSource, /성향별 충족도 · 각 성향 100점 기준/);
  assert.match(placardFunctionSource, /measurePlacardLayout/);
  assert.match(placardLayoutSource, /height:\s*Math\.ceil/);
  assert.doesNotMatch(placardFunctionSource, /canvas\.height\s*=\s*2200/);
  assert.doesNotMatch(placardFunctionSource, /검사 결과는 어디에도 저장되지 않습니다/);
});

test("link sharing copies only the generated URL to the clipboard", async () => {
  const context = loadApp();
  const result = await vm.runInContext(
    `(async () => {
      const copied = [];
      const requests = [];
      navigator.share = async () => {
        throw new Error("native share sheet should not be used for link-only copy");
      };
      navigator.clipboard = {
        writeText: async (value) => copied.push(value),
      };
      globalThis.fetch = async (url, options) => {
        requests.push({ url, body: JSON.parse(options.body) });
        return {
          ok: true,
          json: async () => ({
            ok: true,
            shareUrl: "https://love.mokky.store/share/shares/20260608/p1234567890abcdef12345678.jpg",
          }),
        };
      };
      globalThis.FileReader = class {
        addEventListener(name, handler) {
          this[name] = handler;
        }
        readAsDataURL() {
          this.result = "data:image/jpeg;base64,AA==";
          this.load();
        }
      };
      const button = { textContent: "나의 이상형 공유하기", disabled: false };
      const canvas = {
        toBlob(callback) {
          callback(new Blob(["share"], { type: "image/jpeg" }));
        },
      };

      const outcome = await shareCanvasLink({
        canvas,
        fallbackFilename: "fallback.png",
        title: "나의 이상형",
        text: "내 이상형 사진을 확인하고 직접 테스트해보세요.",
        kind: "portrait",
        button,
      });

      return { outcome, copiedText: copied.join("\\n"), requestBody: requests[0].body };
    })()`,
    context,
  );

  assert.equal(result.outcome, "copied");
  assert.equal(result.copiedText, "https://love.mokky.store/share/shares/20260608/p1234567890abcdef12345678.jpg");
  assert.doesNotMatch(result.copiedText, /나의 이상형|테스트|확인|찾아/);
  assert.equal(result.requestBody.title, "나의 이상형");
  assert.equal(result.requestBody.description, "내 이상형 사진을 확인하고 직접 테스트해보세요.");
});

test("start notice blocks the quiz until the user confirms", () => {
  const markup = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  const source = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");

  assert.match(markup, /id="startNoticeModal"/);
  assert.match(markup, /결과로 나오는 이상형의 사진은 실존하지 않으니 유의하세요!/);
  assert.match(markup, /id="startNoticeYesButton"[^>]*>네</);
  assert.match(markup, /id="startNoticeNoButton"[^>]*>아니요</);
  assert.match(source, /function startQuiz\(\)\s*{\s*openStartNotice\(beginQuiz\)/s);
  assert.match(source, /function confirmStartNotice/);
  assert.match(source, /function cancelStartNotice/);
});

test("question count is compact and non-wrapping", () => {
  const context = loadApp();
  const label = vm.runInContext("formatQuestionCount(2, 20)", context);
  const markup = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  const styles = fs.readFileSync(path.join(__dirname, "..", "styles.css"), "utf8");

  assert.equal(label, "2/20");
  assert.match(markup, /data-mode="80"/);
  assert.match(markup, /성향별 충족도 · 각 성향 100점 기준/);
  assert.doesNotMatch(markup, /data-mode="100"/);
  assert.doesNotMatch(label, /\s/);
  assert.match(styles, /#questionCount\s*{[^}]*white-space:\s*nowrap;/s);
  assert.match(styles, /#resultSummary\s*{[^}]*white-space:\s*pre-line;/s);
});

test("trait percentages stay on one line", () => {
  const context = loadApp();
  const styles = fs.readFileSync(path.join(__dirname, "..", "styles.css"), "utf8");
  const renderSource = vm.runInContext("renderTraitList.toString()", context);

  assert.match(renderSource, /class="trait-percent"/);
  assert.match(styles, /\.trait-percent\s*{[^}]*white-space:\s*nowrap;/s);
  assert.match(styles, /\.trait-percent\s*{[^}]*word-break:\s*keep-all;/s);
  assert.match(styles, /\.trait-percent\s*{[^}]*text-wrap:\s*nowrap;/s);
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
