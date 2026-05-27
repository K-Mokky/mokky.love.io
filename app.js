const traitMeta = {
  warmth: {
    label: "다정함",
    phrase: "따뜻한 눈빛",
    prompt: "warm gaze, gentle smile",
    color: "#ff6f9f",
  },
  energy: {
    label: "활기",
    phrase: "밝은 리듬",
    prompt: "bright energetic presence",
    color: "#f4b63f",
  },
  humor: {
    label: "유머",
    phrase: "장난기 있는 미소",
    prompt: "playful smile, witty charm",
    color: "#21b7a8",
  },
  intellect: {
    label: "지성",
    phrase: "차분한 집중력",
    prompt: "thoughtful eyes, refined intellectual mood",
    color: "#5777e8",
  },
  steadiness: {
    label: "안정감",
    phrase: "믿음직한 분위기",
    prompt: "calm composed posture",
    color: "#6abf69",
  },
  aesthetics: {
    label: "감각",
    phrase: "세련된 취향",
    prompt: "stylish details, artful outfit",
    color: "#b56cff",
  },
  romance: {
    label: "로맨스",
    phrase: "부드러운 설렘",
    prompt: "soft romantic lighting",
    color: "#ff8bbb",
  },
  independence: {
    label: "자기색",
    phrase: "선명한 자기만의 결",
    prompt: "confident unique styling",
    color: "#2b2d42",
  },
  adventure: {
    label: "모험심",
    phrase: "가벼운 발걸음",
    prompt: "free-spirited casual style",
    color: "#ff7a45",
  },
  sincerity: {
    label: "진정성",
    phrase: "솔직하고 깊은 태도",
    prompt: "honest expression, sincere presence",
    color: "#8d6e63",
  },
};

const preferenceMeta = {
  gender: {
    woman: {
      label: "여성",
      prompt: "adult Korean woman",
    },
    man: {
      label: "남성",
      prompt: "adult Korean man",
    },
    any: {
      label: "성별 상관없음",
      prompt: "gender-neutral Korean adult",
    },
  },
  ageRange: {
    "20s": {
      label: "20대",
      prompt: "in their 20s",
    },
    "30s": {
      label: "30대",
      prompt: "in their 30s",
    },
    "40s": {
      label: "40대",
      prompt: "in their 40s",
    },
    "50s": {
      label: "50대 이상",
      prompt: "in their 50s or older",
    },
    any: {
      label: "나이대 상관없음",
      prompt: "",
    },
  },
};

const optionSets = {
  warmth: [
    {
      label: "말을 천천히 듣고 표정으로 안심시켜주는 사람",
      scores: { warmth: 4, sincerity: 2, steadiness: 1 },
    },
    {
      label: "처음부터 편하게 웃으며 분위기를 열어주는 사람",
      scores: { warmth: 2, energy: 2, humor: 2 },
    },
    {
      label: "티 내지 않고 필요한 순간을 챙겨주는 사람",
      scores: { warmth: 2, steadiness: 3, sincerity: 2 },
    },
  ],
  energy: [
    {
      label: "함께 있으면 하루의 속도가 산뜻해지는 사람",
      scores: { energy: 4, humor: 1, adventure: 2 },
    },
    {
      label: "흥분보다 균형을 지키며 오래 가는 사람",
      scores: { steadiness: 3, sincerity: 2, energy: 1 },
    },
    {
      label: "갑자기 떠오른 일을 즐겁게 실행하는 사람",
      scores: { energy: 3, adventure: 3, independence: 1 },
    },
  ],
  humor: [
    {
      label: "센스 있는 농담으로 긴장을 풀어주는 사람",
      scores: { humor: 4, warmth: 2, energy: 1 },
    },
    {
      label: "말수는 적어도 타이밍이 정확한 사람",
      scores: { humor: 2, intellect: 2, sincerity: 2 },
    },
    {
      label: "서로의 이상한 취향까지 귀엽게 받아주는 사람",
      scores: { humor: 3, romance: 2, independence: 2 },
    },
  ],
  intellect: [
    {
      label: "대화가 깊어질수록 더 매력적인 사람",
      scores: { intellect: 4, sincerity: 2, steadiness: 1 },
    },
    {
      label: "호기심이 많고 새로운 관점을 자주 던지는 사람",
      scores: { intellect: 3, adventure: 2, independence: 2 },
    },
    {
      label: "생각을 또렷하게 정리해서 말하는 사람",
      scores: { intellect: 3, steadiness: 2, aesthetics: 1 },
    },
  ],
  steadiness: [
    {
      label: "약속과 생활 리듬이 믿을 수 있는 사람",
      scores: { steadiness: 4, sincerity: 2, warmth: 1 },
    },
    {
      label: "변수가 생겨도 차분히 방향을 잡는 사람",
      scores: { steadiness: 3, intellect: 2, independence: 1 },
    },
    {
      label: "감정 표현은 조용하지만 오래 곁을 지키는 사람",
      scores: { steadiness: 3, romance: 1, sincerity: 3 },
    },
  ],
  aesthetics: [
    {
      label: "옷차림과 공간에서 자기 취향이 보이는 사람",
      scores: { aesthetics: 4, independence: 2, romance: 1 },
    },
    {
      label: "화려함보다 정돈된 디테일이 예쁜 사람",
      scores: { aesthetics: 3, steadiness: 2, intellect: 1 },
    },
    {
      label: "평범한 날도 작은 장면처럼 만드는 사람",
      scores: { aesthetics: 3, warmth: 1, romance: 3 },
    },
  ],
  romance: [
    {
      label: "사소한 순간을 오래 기억해주는 사람",
      scores: { romance: 4, warmth: 2, sincerity: 2 },
    },
    {
      label: "과한 말보다 행동으로 설렘을 쌓는 사람",
      scores: { romance: 3, steadiness: 2, sincerity: 2 },
    },
    {
      label: "함께 있으면 영화의 한 장면처럼 느껴지는 사람",
      scores: { romance: 4, aesthetics: 2, energy: 1 },
    },
  ],
  independence: [
    {
      label: "혼자서도 자기 시간을 멋지게 채우는 사람",
      scores: { independence: 4, aesthetics: 1, intellect: 2 },
    },
    {
      label: "관계 안에서도 서로의 세계를 존중하는 사람",
      scores: { independence: 3, sincerity: 2, steadiness: 2 },
    },
    {
      label: "분명한 취향과 기준이 매력적인 사람",
      scores: { independence: 4, aesthetics: 2, adventure: 1 },
    },
  ],
  adventure: [
    {
      label: "새로운 장소와 경험에 먼저 마음이 열리는 사람",
      scores: { adventure: 4, energy: 2, independence: 1 },
    },
    {
      label: "계획 안에서도 작은 변주를 즐기는 사람",
      scores: { adventure: 3, intellect: 1, humor: 2 },
    },
    {
      label: "낯선 상황에서도 금방 자기 리듬을 찾는 사람",
      scores: { adventure: 3, steadiness: 2, energy: 2 },
    },
  ],
  sincerity: [
    {
      label: "말과 행동의 결이 같아서 믿음이 가는 사람",
      scores: { sincerity: 4, steadiness: 2, warmth: 1 },
    },
    {
      label: "감정을 숨기기보다 정확하게 나누려는 사람",
      scores: { sincerity: 4, romance: 2, intellect: 1 },
    },
    {
      label: "화려하지 않아도 오래 생각나는 사람",
      scores: { sincerity: 3, warmth: 2, aesthetics: 1 },
    },
  ],
};

const questionBlueprints = [
  ["warmth", "첫인상", "처음 만났을 때 가장 먼저 마음이 기우는 분위기는?"],
  ["energy", "첫인상", "첫 만남의 공기가 좋아지는 순간은 언제인가요?"],
  ["humor", "첫인상", "어색함이 풀리는 방식으로 가장 끌리는 것은?"],
  ["intellect", "첫인상", "짧은 대화 안에서 매력적으로 느껴지는 지점은?"],
  ["steadiness", "첫인상", "처음부터 신뢰감이 생기는 사람은 어떤 쪽인가요?"],
  ["aesthetics", "첫인상", "시선이 한 번 더 가는 취향의 결은 무엇인가요?"],
  ["romance", "첫인상", "첫 만남에 설렘이 생기는 포인트는?"],
  ["independence", "첫인상", "자기 색이 느껴지는 사람에게 끌릴 때는?"],
  ["adventure", "첫인상", "처음 만났는데도 함께 해보고 싶은 일이 떠오르는 사람은?"],
  ["sincerity", "첫인상", "첫인상에서 진심이 느껴지는 순간은?"],

  ["warmth", "대화", "긴 하루 끝에 어떤 대화를 나누고 싶나요?"],
  ["energy", "대화", "대화의 텐션은 어느 정도가 가장 편한가요?"],
  ["humor", "대화", "둘만의 농담이 생긴다면 어떤 느낌이 좋나요?"],
  ["intellect", "대화", "깊은 대화에서 가장 설레는 순간은?"],
  ["steadiness", "대화", "서로 의견이 다를 때 마음이 놓이는 태도는?"],
  ["aesthetics", "대화", "취향 이야기를 할 때 끌리는 방식은?"],
  ["romance", "대화", "말에서 설렘이 느껴지는 순간은 언제인가요?"],
  ["independence", "대화", "서로의 생각이 다를 때 매력적으로 느껴지는 모습은?"],
  ["adventure", "대화", "대화가 새로운 계획으로 이어진다면 어떤 흐름이 좋나요?"],
  ["sincerity", "대화", "가장 믿음이 가는 말투는 어떤 쪽인가요?"],

  ["warmth", "데이트", "평범한 데이트에서 가장 좋게 남는 순간은?"],
  ["energy", "데이트", "데이트 코스의 속도감은 어떻게 흘렀으면 하나요?"],
  ["humor", "데이트", "함께 웃게 되는 상황으로 가장 좋은 것은?"],
  ["intellect", "데이트", "데이트 중 대화가 오래 기억나는 이유는?"],
  ["steadiness", "데이트", "약속을 함께 보낼 때 편안한 사람은?"],
  ["aesthetics", "데이트", "데이트 장소를 고르는 감각으로 끌리는 것은?"],
  ["romance", "데이트", "데이트에서 설렘이 가장 커지는 장면은?"],
  ["independence", "데이트", "각자의 취향을 데이트에 섞는 방식은?"],
  ["adventure", "데이트", "가끔은 어떤 데이트가 마음을 움직이나요?"],
  ["sincerity", "데이트", "데이트 후 가장 오래 남는 마음은?"],

  ["warmth", "일상", "매일의 작은 순간에서 끌리는 모습은?"],
  ["energy", "일상", "함께 사소한 일을 할 때 좋은 리듬은?"],
  ["humor", "일상", "일상 속 웃음 포인트는 어떤 쪽이 좋은가요?"],
  ["intellect", "일상", "일상에서도 멋있게 느껴지는 생각의 방식은?"],
  ["steadiness", "일상", "생활감에서 안정적으로 느껴지는 모습은?"],
  ["aesthetics", "일상", "아무 날도 예쁘게 느껴지는 디테일은?"],
  ["romance", "일상", "일상에서 설렘이 유지되는 방식은?"],
  ["independence", "일상", "각자의 루틴을 가진 사람에게 끌리는 순간은?"],
  ["adventure", "일상", "평범한 하루에 작은 변화를 만든다면?"],
  ["sincerity", "일상", "반복되는 날들 속 믿음이 생기는 행동은?"],

  ["warmth", "관계", "관계에서 가장 받고 싶은 온도는?"],
  ["energy", "관계", "관계의 활기는 어떤 방식이 좋나요?"],
  ["humor", "관계", "둘 사이의 장난은 어느 정도가 편한가요?"],
  ["intellect", "관계", "함께 성장한다는 느낌이 드는 순간은?"],
  ["steadiness", "관계", "관계가 안정적으로 느껴지는 기준은?"],
  ["aesthetics", "관계", "둘만의 취향을 쌓는다면 어떤 모습인가요?"],
  ["romance", "관계", "오래 갈수록 더 설레는 관계의 모습은?"],
  ["independence", "관계", "관계 안의 독립성은 어떻게 유지되면 좋나요?"],
  ["adventure", "관계", "둘의 세계가 넓어진다고 느끼는 때는?"],
  ["sincerity", "관계", "관계에서 가장 중요한 진심의 표현은?"],

  ["warmth", "취향", "좋아하는 음악을 공유할 때 끌리는 모습은?"],
  ["energy", "취향", "함께 취미를 즐긴다면 어떤 에너지가 좋나요?"],
  ["humor", "취향", "취향 차이를 웃으며 넘기는 방식은?"],
  ["intellect", "취향", "취향 이야기가 깊어질 때 매력적인 사람은?"],
  ["steadiness", "취향", "취미 생활에서 안정적으로 보이는 태도는?"],
  ["aesthetics", "취향", "가장 마음이 가는 스타일 감각은?"],
  ["romance", "취향", "서로의 취향이 로맨틱하게 느껴지는 순간은?"],
  ["independence", "취향", "강한 취향을 가진 사람에게 끌리는 이유는?"],
  ["adventure", "취향", "새 취향을 함께 발견한다면 어떤 사람이 좋나요?"],
  ["sincerity", "취향", "취향을 대하는 태도에서 진심이 보이는 순간은?"],

  ["warmth", "갈등", "서운한 일이 있을 때 가장 바라는 태도는?"],
  ["energy", "갈등", "분위기가 가라앉았을 때 회복하는 방식은?"],
  ["humor", "갈등", "화해의 분위기를 만드는 데 좋은 방식은?"],
  ["intellect", "갈등", "문제를 풀 때 끌리는 사고방식은?"],
  ["steadiness", "갈등", "갈등 중에도 안정감을 주는 사람은?"],
  ["aesthetics", "갈등", "감정 표현이 예쁘다고 느껴지는 방식은?"],
  ["romance", "갈등", "화해 후 설렘이 돌아오는 순간은?"],
  ["independence", "갈등", "갈등 속에서도 존중받는다고 느끼는 태도는?"],
  ["adventure", "갈등", "관계를 새롭게 바꾸는 용기는 어떤 모습인가요?"],
  ["sincerity", "갈등", "사과와 대화에서 가장 중요한 것은?"],

  ["warmth", "성장", "서로에게 좋은 사람이 된다고 느끼는 순간은?"],
  ["energy", "성장", "함께 목표를 향해 갈 때 좋은 에너지는?"],
  ["humor", "성장", "어려운 시기를 견디는 유머는 어떤 느낌인가요?"],
  ["intellect", "성장", "서로 배우게 되는 관계의 매력은?"],
  ["steadiness", "성장", "오래 성장할 수 있는 사람의 특징은?"],
  ["aesthetics", "성장", "성장 과정에서도 잃지 않았으면 하는 감각은?"],
  ["romance", "성장", "시간이 지나도 설레는 이유는 무엇일까요?"],
  ["independence", "성장", "각자 더 멋있어지는 관계는 어떤 모습인가요?"],
  ["adventure", "성장", "새로운 도전을 함께한다면 어떤 사람이 좋나요?"],
  ["sincerity", "성장", "성장의 방향에서 가장 믿음이 가는 사람은?"],

  ["warmth", "리듬", "연락의 온도는 어느 쪽이 가장 편한가요?"],
  ["energy", "리듬", "만나는 빈도와 텐션은 어떤 쪽이 좋나요?"],
  ["humor", "리듬", "연락 중 웃음이 생기는 방식은?"],
  ["intellect", "리듬", "혼자 있는 시간 뒤 나누고 싶은 이야기는?"],
  ["steadiness", "리듬", "관계의 페이스에서 안정적인 느낌은?"],
  ["aesthetics", "리듬", "둘만의 리듬이 예쁘게 느껴지는 순간은?"],
  ["romance", "리듬", "매일의 작은 설렘은 어떻게 오면 좋나요?"],
  ["independence", "리듬", "서로의 시간을 지켜주는 방식은?"],
  ["adventure", "리듬", "갑작스러운 제안이 반가운 순간은?"],
  ["sincerity", "리듬", "연락과 만남에서 진심이 느껴지는 기준은?"],

  ["warmth", "미래", "함께 미래를 상상할 때 가장 먼저 떠오르는 감정은?"],
  ["energy", "미래", "미래의 일상에 있으면 좋을 활기는?"],
  ["humor", "미래", "오래 함께 웃는다면 어떤 모습일까요?"],
  ["intellect", "미래", "미래를 계획할 때 끌리는 사람은?"],
  ["steadiness", "미래", "오래 곁에 두고 싶은 안정감은?"],
  ["aesthetics", "미래", "둘의 미래에 남기고 싶은 취향은?"],
  ["romance", "미래", "시간이 지나도 간직하고 싶은 설렘은?"],
  ["independence", "미래", "미래에도 각자의 세계가 빛나는 모습은?"],
  ["adventure", "미래", "함께 넓혀가고 싶은 세계는?"],
  ["sincerity", "미래", "마지막까지 가장 중요하게 남을 진심은?"],
];

const questionBank = questionBlueprints.map(([axis, category, text], index) => ({
  id: `q${index + 1}`,
  axis,
  category,
  text,
  options: optionSets[axis],
}));

const state = {
  mode: 20,
  current: 0,
  answers: [],
  started: false,
  resultToken: 0,
  targetGender: "any",
  targetAgeRange: "20s",
};

const els = {
  startScreen: document.querySelector("#startScreen"),
  questionScreen: document.querySelector("#questionScreen"),
  resultScreen: document.querySelector("#resultScreen"),
  modeButtons: [...document.querySelectorAll(".mode-button")],
  preferenceButtons: [...document.querySelectorAll(".preference-button")],
  startButton: document.querySelector("#startButton"),
  sampleButton: document.querySelector("#sampleButton"),
  questionCategory: document.querySelector("#questionCategory"),
  questionText: document.querySelector("#questionText"),
  questionCount: document.querySelector("#questionCount"),
  options: document.querySelector("#options"),
  backButton: document.querySelector("#backButton"),
  resetButton: document.querySelector("#resetButton"),
  progressNumber: document.querySelector("#progressNumber"),
  progressText: document.querySelector("#progressText"),
  traitTeaser: document.querySelector("#traitTeaser"),
  answerDots: document.querySelector("#answerDots"),
  resultTitle: document.querySelector("#resultTitle"),
  resultSummary: document.querySelector("#resultSummary"),
  traitList: document.querySelector("#traitList"),
  imagePrompt: document.querySelector("#imagePrompt"),
  imageStatus: document.querySelector("#imageStatus"),
  portraitCanvas: document.querySelector("#portraitCanvas"),
  downloadButton: document.querySelector("#downloadButton"),
  sharePortraitButton: document.querySelector("#sharePortraitButton"),
  sharePlacardButton: document.querySelector("#sharePlacardButton"),
  restartButton: document.querySelector("#restartButton"),
  restartTopButton: document.querySelector("#restartTopButton"),
  copyPromptButton: document.querySelector("#copyPromptButton"),
};

function activeQuestions() {
  return questionBank.slice(0, state.mode);
}

function showScreen(name) {
  els.startScreen.classList.toggle("hidden", name !== "start");
  els.questionScreen.classList.toggle("hidden", name !== "question");
  els.resultScreen.classList.toggle("hidden", name !== "result");
}

function setMode(mode) {
  state.mode = mode;
  state.current = 0;
  state.answers = [];
  state.started = false;
  state.resultToken += 1;
  setImageStatus("idle");
  els.modeButtons.forEach((button) => {
    const active = Number(button.dataset.mode) === mode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-checked", String(active));
  });
  showScreen("start");
  renderProgress();
}

function setPreference(preference, value) {
  if (preference === "gender" && preferenceMeta.gender[value]) {
    state.targetGender = value;
  }
  if (preference === "ageRange" && preferenceMeta.ageRange[value]) {
    state.targetAgeRange = value;
  }

  els.preferenceButtons
    .filter((button) => button.dataset.preference === preference)
    .forEach((button) => {
      const active = button.dataset.value === value;
      button.classList.toggle("active", active);
      button.setAttribute("aria-checked", String(active));
    });
}

function startQuiz() {
  state.started = true;
  state.current = Math.min(state.current, state.mode - 1);
  showScreen("question");
  renderQuestion();
  renderProgress();
}

function resetQuiz() {
  state.current = 0;
  state.answers = [];
  state.started = false;
  state.resultToken += 1;
  setImageStatus("idle");
  showScreen("start");
  renderProgress();
}

function renderQuestion() {
  const questions = activeQuestions();
  const question = questions[state.current];
  els.questionCategory.textContent = question.category;
  els.questionText.textContent = question.text;
  els.questionCount.textContent = `${state.current + 1} / ${state.mode}`;
  els.options.innerHTML = "";

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "option-button";
    button.type = "button";
    button.classList.toggle("selected", state.answers[state.current] === index);
    button.innerHTML = `
      <span class="option-key">${String.fromCharCode(65 + index)}</span>
      <strong>${option.label}</strong>
    `;
    button.addEventListener("click", () => selectAnswer(index));
    els.options.append(button);
  });

  els.backButton.disabled = state.current === 0;
}

function selectAnswer(optionIndex) {
  state.answers[state.current] = optionIndex;
  if (state.current < state.mode - 1) {
    state.current += 1;
    renderQuestion();
    renderProgress();
    return;
  }
  renderProgress();
  showResult();
}

function goBack() {
  if (state.current === 0) return;
  state.current -= 1;
  renderQuestion();
  renderProgress();
}

function clearCurrentAnswer() {
  state.answers[state.current] = undefined;
  renderQuestion();
  renderProgress();
}

function renderProgress() {
  const answered = state.answers.filter((answer) => Number.isInteger(answer)).length;
  const percent = state.mode ? Math.round((answered / state.mode) * 100) : 0;
  document.documentElement.style.setProperty("--progress", `${percent}%`);
  els.progressNumber.textContent = `${percent}`;
  els.progressText.textContent = state.started ? `${answered} / ${state.mode} 답변` : "시작 전";

  const teaserTraits = getTopTraits(computeScores(), 2)
    .map((trait) => traitMeta[trait.key].label)
    .join(" · ");
  els.traitTeaser.textContent = teaserTraits || "질문을 돌리면 취향의 윤곽이 잡혀요.";
  renderDots();
}

function renderDots() {
  els.answerDots.innerHTML = "";
  activeQuestions().forEach((_, index) => {
    const dot = document.createElement("span");
    dot.className = "answer-dot";
    dot.classList.toggle("answered", Number.isInteger(state.answers[index]));
    dot.classList.toggle("current", state.started && index === state.current);
    els.answerDots.append(dot);
  });
}

function computeScores() {
  const scores = Object.fromEntries(Object.keys(traitMeta).map((trait) => [trait, 0]));
  activeQuestions().forEach((question, index) => {
    const answerIndex = state.answers[index];
    if (!Number.isInteger(answerIndex)) return;
    const selected = question.options[answerIndex];
    Object.entries(selected.scores).forEach(([trait, value]) => {
      scores[trait] += value;
    });
  });
  return scores;
}

function getTopTraits(scores, limit = 3) {
  return Object.entries(scores)
    .map(([key, value]) => ({ key, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
}

function getNormalizedTraits(scores) {
  const max = Math.max(...Object.values(scores), 1);
  return Object.entries(scores)
    .map(([key, value]) => ({
      key,
      value,
      percent: Math.round((value / max) * 100),
    }))
    .sort((a, b) => b.value - a.value);
}

function buildProfile() {
  const scores = computeScores();
  const top = getTopTraits(scores, 4);
  const title = makeTitle(top);
  const summary = makeSummary(top);
  const prompt = makePrompt(top);
  return { scores, top, title, summary, prompt };
}

function makeTitle(top) {
  const [first, second] = top;
  const firstLabel = traitMeta[first.key].phrase;
  const secondLabel = traitMeta[second.key].phrase;
  const endings = {
    warmth: "햇살형 로맨티스트",
    energy: "스파클링 무드메이커",
    humor: "위트 있는 설렘 장인",
    intellect: "깊은 대화의 큐레이터",
    steadiness: "잔잔한 신뢰의 사람",
    aesthetics: "취향이 선명한 뮤즈",
    romance: "장면을 남기는 낭만가",
    independence: "자기 세계가 빛나는 사람",
    adventure: "새 계절을 여는 탐험가",
    sincerity: "오래 남는 진심형",
  };
  return `${firstLabel}${particle(firstLabel, "과", "와")} ${secondLabel}${particle(secondLabel, "을", "를")} 가진 ${endings[first.key]}`;
}

function makeSummary(top) {
  const labels = top.map((trait) => traitMeta[trait.key].label);
  return `당신의 이상형은 ${labels[0]}, ${labels[1]}, ${labels[2]}의 점수가 높게 나왔어요. 첫눈에 강렬한 자극만 주는 사람보다, 함께 있을수록 표정과 말투의 결이 선명해지는 타입에 마음이 기울 가능성이 커요.`;
}

function makePrompt(top) {
  const promptParts = top.map((trait) => traitMeta[trait.key].prompt);
  return `fictional ${makeTargetPrompt()}, photorealistic Korean studio portrait, ${promptParts.join(", ")}, natural facial proportions, realistic skin texture, tasteful fashion styling, soft daylight, shallow depth of field, no readable text, synthetic person`;
}

function makeTargetPrompt() {
  const gender = preferenceMeta.gender[state.targetGender] || preferenceMeta.gender.any;
  const ageRange = preferenceMeta.ageRange[state.targetAgeRange] || preferenceMeta.ageRange["20s"];
  return [gender.prompt, ageRange.prompt].filter(Boolean).join(" ");
}

function showResult() {
  state.resultToken += 1;
  const profile = buildProfile();
  els.resultTitle.textContent = profile.title;
  els.resultSummary.textContent = profile.summary;
  els.imagePrompt.textContent = profile.prompt;
  renderTraitList(profile.scores);
  drawPortrait(profile);
  showScreen("result");
  setImageStatus("generated", "추가 과금 없이 브라우저에서 가상의 성인 사진 스타일 이미지를 만들었어요.");
}

function renderTraitList(scores) {
  const traits = getNormalizedTraits(scores).slice(0, 5);
  els.traitList.innerHTML = "";
  traits.forEach((trait) => {
    const item = document.createElement("div");
    item.className = "trait-chip";
    item.innerHTML = `
      <span>${traitMeta[trait.key].label}</span>
      <span class="trait-meter"><span style="width: ${trait.percent}%"></span></span>
      <span>${trait.percent}</span>
    `;
    els.traitList.append(item);
  });
}

function drawPortrait(profile) {
  const canvas = els.portraitCanvas;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const scores = profile.scores;
  const topKeys = profile.top.map((trait) => trait.key);
  const seed = hashAnswers(
    `${state.answers.join("-")}-${topKeys.join("-")}-${state.targetGender}-${state.targetAgeRange}`,
  );
  const rand = mulberry32(seed);
  const primary = traitMeta[topKeys[0]].color;
  const secondary = traitMeta[topKeys[1]].color;
  const accent = traitMeta[topKeys[2]].color;

  ctx.clearRect(0, 0, width, height);
  const bg = ctx.createLinearGradient(0, 0, width, height);
  bg.addColorStop(0, mix("#f7f2ef", primary, 0.08));
  bg.addColorStop(0.52, "#ede6e2");
  bg.addColorStop(1, mix("#d8d0cc", secondary, 0.08));
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  drawBackdrop(ctx, width, height, primary, secondary, accent, rand);

  const centerX = width / 2;
  const faceY = 416;
  const warmth = scores.warmth;
  const humor = scores.humor;
  const intellect = scores.intellect;
  const steadiness = scores.steadiness;
  const aesthetics = scores.aesthetics;
  const romance = scores.romance;
  const independence = scores.independence;
  const adventure = scores.adventure;
  const energy = scores.energy;
  const sincerity = scores.sincerity;

  const skinPalette = ["#f1c2a5", "#e5ad8f", "#d89b78", "#c98768", "#f0d0b8"];
  const skin = mix(skinPalette[Math.floor(rand() * skinPalette.length)], "#fff4ea", Math.min(0.26, warmth / 110));
  const hairPalette = [
    "#171314",
    "#2a1f1c",
    "#3c2922",
    "#53342a",
    "#1f2430",
    "#684438",
  ];
  const hairColor = hairPalette[Math.floor(rand() * hairPalette.length)];
  const outfitColor = mix(mix(primary, "#24212b", 0.5), secondary, 0.18);
  const outfitAccent = mix("#ffffff", accent, 0.18);
  const genderFaceOffset = state.targetGender === "man" ? 18 : state.targetGender === "woman" ? -8 : 0;
  const genderHairOffset = state.targetGender === "woman" ? 42 : state.targetGender === "man" ? -32 : 0;
  const ageMaturity = {
    "20s": 0,
    "30s": 10,
    "40s": 20,
    "50s": 30,
    any: 6,
  }[state.targetAgeRange] ?? 0;
  const faceWidth = 230 + genderFaceOffset + Math.min(28, steadiness * 1.05) - Math.min(14, adventure * 0.55);
  const faceHeight = 318 + ageMaturity * 0.3 + Math.min(20, sincerity * 0.65);
  const hairLength = 72 + genderHairOffset + Math.min(92, aesthetics * 1.25 + romance * 1.05) - Math.min(34, energy + adventure);
  const smile = Math.min(1, (warmth + humor + romance) / 84);
  const eyeLift = Math.min(18, humor * 0.7 + energy * 0.45);
  const browCalm = Math.min(14, steadiness * 0.45 + intellect * 0.35);

  drawShoulders(ctx, centerX, 812, outfitColor, outfitAccent, topKeys);
  drawNeck(ctx, centerX, 640, skin);
  drawHair(ctx, centerX, faceY, faceWidth, faceHeight, hairLength, hairColor, topKeys, rand);
  drawEars(ctx, centerX, faceY + 28, faceWidth, skin, aesthetics, romance);
  drawFace(ctx, centerX, faceY, faceWidth, faceHeight, skin, ageMaturity, rand);
  drawEyes(ctx, centerX, faceY, eyeLift, browCalm, hairColor, intellect, sincerity, rand);
  drawNose(ctx, centerX, faceY + 60, skin);
  drawMouth(ctx, centerX, faceY + 128, smile, primary);
  drawCheeks(ctx, centerX, faceY + 82, warmth, romance);

  if (intellect > 11 || topKeys.includes("intellect")) {
    drawGlasses(ctx, centerX, faceY + 34, secondary);
  }
  if (aesthetics > 13 || topKeys.includes("aesthetics")) {
    drawAccessory(ctx, centerX, faceY, faceWidth, primary, accent);
  }
  if (romance > 14 || topKeys.includes("romance")) {
    drawScarf(ctx, centerX, 770, mix("#ffffff", primary, 0.28), primary);
  }
  if (independence > 14 || topKeys.includes("independence")) {
    drawCollarPin(ctx, centerX + 96, 822, accent);
  }

  drawPhotoFinish(ctx, width, height, rand);
}

function drawBackdrop(ctx, width, height, primary, secondary, accent, rand) {
  ctx.save();
  const glow = ctx.createRadialGradient(width * 0.34, height * 0.22, 80, width * 0.4, height * 0.3, 620);
  glow.addColorStop(0, "rgba(255,255,255,0.72)");
  glow.addColorStop(0.38, "rgba(255,255,255,0.28)");
  glow.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < 22; i += 1) {
    const radius = 18 + rand() * 74;
    const x = rand() * width;
    const y = 70 + rand() * (height - 190);
    const bokeh = ctx.createRadialGradient(x, y, 0, x, y, radius);
    bokeh.addColorStop(0, mix(primary, "#ffffff", 0.72));
    bokeh.addColorStop(1, "rgba(255,255,255,0)");
    ctx.globalAlpha = 0.08 + rand() * 0.08;
    ctx.fillStyle = bokeh;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 0.14;
  ctx.strokeStyle = mix(secondary, accent, 0.45);
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 9; i += 1) {
    ctx.beginPath();
    ctx.moveTo(76 + i * 96, 0);
    ctx.lineTo(16 + i * 96, height);
    ctx.stroke();
  }
  ctx.restore();
}

function drawShoulders(ctx, x, y, color, accent, topKeys) {
  ctx.save();
  const jacket = ctx.createLinearGradient(x - 310, y - 90, x + 310, y + 250);
  jacket.addColorStop(0, mix(color, "#ffffff", 0.16));
  jacket.addColorStop(0.52, color);
  jacket.addColorStop(1, mix(color, "#111111", 0.24));
  ctx.fillStyle = jacket;
  ctx.beginPath();
  ctx.moveTo(x - 285, y + 210);
  ctx.bezierCurveTo(x - 235, y - 20, x - 115, y - 72, x, y - 72);
  ctx.bezierCurveTo(x + 115, y - 72, x + 235, y - 20, x + 285, y + 210);
  ctx.closePath();
  ctx.fill();

  const shirt = ctx.createLinearGradient(x, y - 90, x, y + 90);
  shirt.addColorStop(0, "rgba(255,255,255,0.94)");
  shirt.addColorStop(1, accent);
  ctx.fillStyle = shirt;
  ctx.beginPath();
  ctx.moveTo(x - 96, y - 68);
  ctx.lineTo(x, y + 34);
  ctx.lineTo(x + 96, y - 68);
  ctx.quadraticCurveTo(x, y - 26, x - 96, y - 68);
  ctx.fill();

  ctx.strokeStyle = "rgba(255,255,255,0.22)";
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(x - 220, y + 42);
  ctx.quadraticCurveTo(x - 112, y + 16, x - 32, y + 76);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x + 220, y + 42);
  ctx.quadraticCurveTo(x + 112, y + 16, x + 32, y + 76);
  ctx.stroke();

  if (topKeys.includes("adventure") || topKeys.includes("energy")) {
    ctx.strokeStyle = "rgba(255,255,255,0.52)";
    ctx.lineWidth = 3;
    for (let i = 0; i < 5; i += 1) {
      ctx.beginPath();
      ctx.moveTo(x - 210 + i * 42, y + 110);
      ctx.lineTo(x - 184 + i * 42, y + 134);
      ctx.stroke();
    }
  }
  ctx.restore();
}

function drawNeck(ctx, x, y, skin) {
  ctx.save();
  ctx.fillStyle = "rgba(63,36,31,0.12)";
  ctx.beginPath();
  ctx.ellipse(x, y - 36, 86, 36, 0, 0, Math.PI * 2);
  ctx.fill();

  const grad = ctx.createLinearGradient(x - 72, y - 40, x + 72, y + 122);
  grad.addColorStop(0, mix(skin, "#ffffff", 0.08));
  grad.addColorStop(0.52, skin);
  grad.addColorStop(1, mix(skin, "#9b584a", 0.16));
  ctx.fillStyle = grad;
  roundedRect(ctx, x - 64, y - 76, 128, 180, 54);
  ctx.fill();
  ctx.restore();
}

function drawHair(ctx, x, y, faceWidth, faceHeight, length, color, topKeys, rand) {
  ctx.save();
  const hairGrad = ctx.createLinearGradient(x - faceWidth, y - faceHeight, x + faceWidth, y + faceHeight + length);
  hairGrad.addColorStop(0, mix(color, "#ffffff", 0.08));
  hairGrad.addColorStop(0.42, color);
  hairGrad.addColorStop(1, mix(color, "#000000", 0.28));
  ctx.fillStyle = hairGrad;
  ctx.beginPath();
  ctx.moveTo(x - faceWidth * 0.52, y - faceHeight * 0.34);
  ctx.bezierCurveTo(x - faceWidth * 0.66, y - faceHeight * 0.62, x - faceWidth * 0.23, y - faceHeight * 0.88, x + 8, y - faceHeight * 0.78);
  ctx.bezierCurveTo(x + faceWidth * 0.5, y - faceHeight * 0.83, x + faceWidth * 0.65, y - faceHeight * 0.38, x + faceWidth * 0.52, y + faceHeight * 0.24 + length);
  ctx.bezierCurveTo(x + faceWidth * 0.28, y + faceHeight * 0.5 + length, x - faceWidth * 0.34, y + faceHeight * 0.48 + length, x - faceWidth * 0.54, y + faceHeight * 0.22 + length);
  ctx.bezierCurveTo(x - faceWidth * 0.68, y + faceHeight * 0.02, x - faceWidth * 0.7, y - faceHeight * 0.12, x - faceWidth * 0.52, y - faceHeight * 0.34);
  ctx.fill();

  ctx.fillStyle = mix(color, "#ffffff", 0.1);
  ctx.beginPath();
  ctx.moveTo(x - 116, y - 130);
  ctx.bezierCurveTo(x - 34, y - 202, x + 74, y - 186, x + 130, y - 74);
  ctx.bezierCurveTo(x + 58, y - 98, x - 12, y - 72, x - 88, y - 18);
  ctx.bezierCurveTo(x - 132, y - 58, x - 154, y - 92, x - 116, y - 130);
  ctx.fill();

  ctx.lineCap = "round";
  for (let i = 0; i < 70; i += 1) {
    const side = rand() > 0.5 ? 1 : -1;
    const startX = x + side * (28 + rand() * faceWidth * 0.46);
    const startY = y - faceHeight * (0.58 + rand() * 0.2);
    const endX = startX + side * (16 + rand() * 42);
    const endY = y + rand() * (faceHeight * 0.42 + length);
    ctx.globalAlpha = 0.16 + rand() * 0.18;
    ctx.strokeStyle = rand() > 0.6 ? mix(color, "#ffffff", 0.22) : mix(color, "#000000", 0.12);
    ctx.lineWidth = 1 + rand() * 2.2;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.bezierCurveTo(startX + side * 12, startY + 90, endX - side * 20, endY - 90, endX, endY);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  if (topKeys.includes("independence")) {
    ctx.fillStyle = mix(color, "#ffffff", 0.24);
    ctx.beginPath();
    ctx.moveTo(x + 32, y - 178);
    ctx.bezierCurveTo(x + 128, y - 116, x + 148, y - 28, x + 88, y + 80);
    ctx.bezierCurveTo(x + 70, y - 14, x + 40, y - 80, x + 32, y - 178);
    ctx.fill();
  }
  ctx.restore();
}

function drawEars(ctx, x, y, faceWidth, skin, aesthetics, romance) {
  ctx.save();
  ctx.fillStyle = mix(skin, "#e5a18f", 0.13);
  ctx.beginPath();
  ctx.ellipse(x - faceWidth * 0.49, y + 18, 30, 48, -0.12, 0, Math.PI * 2);
  ctx.ellipse(x + faceWidth * 0.49, y + 18, 30, 48, 0.12, 0, Math.PI * 2);
  ctx.fill();
  if (aesthetics + romance > 18) {
    ctx.fillStyle = "#fff7f9";
    ctx.beginPath();
    ctx.arc(x - faceWidth * 0.52, y + 60, 8, 0, Math.PI * 2);
    ctx.arc(x + faceWidth * 0.52, y + 60, 8, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawFace(ctx, x, y, faceWidth, faceHeight, skin, ageMaturity, rand) {
  ctx.save();
  ctx.shadowColor = "rgba(54,32,27,0.18)";
  ctx.shadowBlur = 32;
  ctx.shadowOffsetY = 18;
  const grad = ctx.createRadialGradient(x - faceWidth * 0.2, y - faceHeight * 0.2, 12, x, y + 28, faceHeight * 0.58);
  grad.addColorStop(0, mix(skin, "#ffffff", 0.28));
  grad.addColorStop(0.58, skin);
  grad.addColorStop(1, mix(skin, "#8f4e43", 0.18));
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.ellipse(x, y + 24, faceWidth / 2, faceHeight / 2, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.shadowColor = "transparent";
  ctx.globalAlpha = 0.15;
  ctx.fillStyle = mix(skin, "#ffffff", 0.45);
  ctx.beginPath();
  ctx.ellipse(x - faceWidth * 0.16, y - 18, faceWidth * 0.18, faceHeight * 0.34, -0.28, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = 0.12;
  ctx.fillStyle = mix(skin, "#6b342d", 0.22);
  ctx.beginPath();
  ctx.ellipse(x + faceWidth * 0.28, y + 42, faceWidth * 0.13, faceHeight * 0.3, 0.18, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = 0.16;
  ctx.strokeStyle = mix(skin, "#8b493e", 0.18);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x - faceWidth * 0.22, y + faceHeight * 0.37);
  ctx.quadraticCurveTo(x, y + faceHeight * 0.47, x + faceWidth * 0.22, y + faceHeight * 0.37);
  ctx.stroke();

  if (ageMaturity > 8) {
    ctx.globalAlpha = Math.min(0.16, ageMaturity / 180);
    ctx.strokeStyle = mix(skin, "#7b4339", 0.3);
    ctx.lineWidth = 1.4;
    for (let i = 0; i < Math.floor(ageMaturity / 8); i += 1) {
      const offset = i * 10;
      ctx.beginPath();
      ctx.moveTo(x - 78 + rand() * 16, y - 58 + offset);
      ctx.quadraticCurveTo(x - 42, y - 64 + offset, x - 12, y - 56 + offset);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x + 14, y - 56 + offset);
      ctx.quadraticCurveTo(x + 48, y - 64 + offset, x + 82 - rand() * 16, y - 58 + offset);
      ctx.stroke();
    }
  }

  ctx.globalAlpha = 0.08;
  for (let i = 0; i < 520; i += 1) {
    const px = x - faceWidth * 0.43 + rand() * faceWidth * 0.86;
    const py = y - faceHeight * 0.34 + rand() * faceHeight * 0.72;
    const dx = (px - x) / (faceWidth / 2);
    const dy = (py - (y + 24)) / (faceHeight / 2);
    if (dx * dx + dy * dy > 0.88) continue;
    ctx.fillStyle = rand() > 0.5 ? "rgba(90,50,42,0.34)" : "rgba(255,255,255,0.42)";
    ctx.fillRect(px, py, 1.4, 1.4);
  }
  ctx.restore();
}

function drawEyes(ctx, x, y, lift, calm, hairColor, intellect, sincerity, rand) {
  ctx.save();
  const eyeY = y + 12 - lift * 0.08;
  const eyeGap = 66;
  const irisColors = ["#3a2b24", "#4b3428", "#283241", "#2f3b32"];
  const iris = irisColors[Math.floor(rand() * irisColors.length)];

  ctx.strokeStyle = mix(hairColor, "#000000", 0.08);
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x - eyeGap - 44, eyeY - 48);
  ctx.quadraticCurveTo(x - eyeGap, eyeY - 66 - calm * 0.6, x - eyeGap + 44, eyeY - 48);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + eyeGap - 44, eyeY - 48);
  ctx.quadraticCurveTo(x + eyeGap, eyeY - 66 - calm * 0.6, x + eyeGap + 44, eyeY - 48);
  ctx.stroke();

  [-1, 1].forEach((side) => {
    const cx = x + side * eyeGap;
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.beginPath();
    ctx.ellipse(cx, eyeY + 8, 42, 17, side * -0.03, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(60,38,34,0.42)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(cx - 44, eyeY + 8);
    ctx.quadraticCurveTo(cx, eyeY - 12, cx + 44, eyeY + 8);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx - 38, eyeY + 12);
    ctx.quadraticCurveTo(cx, eyeY + 25, cx + 38, eyeY + 12);
    ctx.stroke();

    const irisGrad = ctx.createRadialGradient(cx - 4, eyeY + 3, 2, cx, eyeY + 8, 18);
    irisGrad.addColorStop(0, mix(iris, "#ffffff", 0.38));
    irisGrad.addColorStop(0.62, iris);
    irisGrad.addColorStop(1, "#121114");
    ctx.fillStyle = irisGrad;
    ctx.beginPath();
    ctx.arc(cx, eyeY + 8, 16, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#09080a";
    ctx.beginPath();
    ctx.arc(cx, eyeY + 8, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(255,255,255,0.88)";
    ctx.beginPath();
    ctx.arc(cx + 6, eyeY + 1, 4.2, 0, Math.PI * 2);
    ctx.fill();
  });

  if (sincerity > 12 || intellect > 12) {
    ctx.globalAlpha = 0.14;
    ctx.fillStyle = "rgba(255,255,255,0.65)";
    ctx.beginPath();
    ctx.ellipse(x - eyeGap, eyeY + 4, 48, 24, 0, 0, Math.PI * 2);
    ctx.ellipse(x + eyeGap, eyeY + 4, 48, 24, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawNose(ctx, x, y, skin) {
  ctx.save();
  const shadow = mix(skin, "#733a32", 0.28);
  ctx.strokeStyle = shadow;
  ctx.lineWidth = 3.5;
  ctx.lineCap = "round";
  ctx.globalAlpha = 0.72;
  ctx.beginPath();
  ctx.moveTo(x + 7, y - 26);
  ctx.quadraticCurveTo(x + 24, y + 20, x - 6, y + 45);
  ctx.stroke();
  ctx.globalAlpha = 0.34;
  ctx.fillStyle = shadow;
  ctx.beginPath();
  ctx.ellipse(x - 18, y + 50, 9, 4, -0.2, 0, Math.PI * 2);
  ctx.ellipse(x + 18, y + 50, 9, 4, 0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 0.28;
  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.beginPath();
  ctx.ellipse(x - 8, y + 6, 9, 34, 0.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawMouth(ctx, x, y, smile, color) {
  ctx.save();
  const lip = mix("#b65b63", color, 0.18);
  ctx.fillStyle = mix(lip, "#ffffff", 0.12);
  ctx.beginPath();
  ctx.moveTo(x - 48, y);
  ctx.bezierCurveTo(x - 18, y - 18 + smile * 8, x + 18, y - 18 + smile * 8, x + 48, y);
  ctx.bezierCurveTo(x + 18, y + 22 + smile * 12, x - 18, y + 22 + smile * 12, x - 48, y);
  ctx.fill();

  ctx.strokeStyle = mix(lip, "#4a1f25", 0.34);
  ctx.lineWidth = 3.2;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x - 42, y + 2);
  ctx.quadraticCurveTo(x, y + 12 + smile * 22, x + 42, y + 2);
  ctx.stroke();

  if (smile > 0.55) {
    ctx.strokeStyle = "rgba(255,255,255,0.36)";
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(x - 26, y + 11);
    ctx.quadraticCurveTo(x, y + 20, x + 26, y + 11);
    ctx.stroke();
  }
  ctx.restore();
}

function drawCheeks(ctx, x, y, warmth, romance) {
  ctx.save();
  ctx.globalAlpha = Math.min(0.18, 0.05 + (warmth + romance) / 220);
  ctx.fillStyle = "#c95d66";
  ctx.beginPath();
  ctx.ellipse(x - 94, y, 48, 23, -0.08, 0, Math.PI * 2);
  ctx.ellipse(x + 94, y, 48, 23, 0.08, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawGlasses(ctx, x, y, color) {
  ctx.save();
  ctx.strokeStyle = mix(color, "#1e1d25", 0.35);
  ctx.lineWidth = 6;
  roundedRect(ctx, x - 128, y - 10, 92, 58, 20);
  ctx.stroke();
  roundedRect(ctx, x + 36, y - 10, 92, 58, 20);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x - 36, y + 16);
  ctx.lineTo(x + 36, y + 16);
  ctx.stroke();
  ctx.restore();
}

function drawAccessory(ctx, x, y, faceWidth, primary, accent) {
  ctx.save();
  const ax = x + faceWidth * 0.48;
  const ay = y + 92;
  ctx.fillStyle = mix("#ffffff", primary, 0.2);
  ctx.beginPath();
  ctx.arc(ax, ay, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.arc(ax, ay + 24, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawScarf(ctx, x, y, color, accent) {
  ctx.save();
  ctx.fillStyle = color;
  roundedRect(ctx, x - 118, y - 22, 236, 48, 24);
  ctx.fill();
  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.moveTo(x + 42, y + 12);
  ctx.quadraticCurveTo(x + 104, y + 48, x + 78, y + 128);
  ctx.lineTo(x + 22, y + 88);
  ctx.quadraticCurveTo(x + 54, y + 40, x + 42, y + 12);
  ctx.fill();
  ctx.restore();
}

function drawCollarPin(ctx, x, y, color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y - 18);
  ctx.lineTo(x + 18, y);
  ctx.lineTo(x, y + 18);
  ctx.lineTo(x - 18, y);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.beginPath();
  ctx.arc(x, y, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawPhotoFinish(ctx, width, height, rand) {
  ctx.save();

  const highlight = ctx.createRadialGradient(width * 0.32, height * 0.2, 10, width * 0.36, height * 0.26, 520);
  highlight.addColorStop(0, "rgba(255,255,255,0.28)");
  highlight.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = highlight;
  ctx.fillRect(0, 0, width, height);

  const vignette = ctx.createRadialGradient(width / 2, height * 0.45, height * 0.2, width / 2, height * 0.48, height * 0.72);
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(1, "rgba(38,25,32,0.22)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, width, height);

  ctx.globalAlpha = 0.055;
  for (let i = 0; i < 4200; i += 1) {
    const shade = Math.floor(70 + rand() * 120);
    ctx.fillStyle = `rgb(${shade}, ${shade}, ${shade})`;
    ctx.fillRect(rand() * width, rand() * height, 1, 1);
  }

  ctx.globalAlpha = 0.08;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

function setImageStatus(status, customMessage) {
  if (!els.imageStatus) return;
  const messages = {
    idle: "사진 스타일 이미지 준비",
    generating: "브라우저에서 사진 스타일 이미지를 만드는 중이에요",
    generated: "사진 스타일 이미지 생성 완료",
    fallback: "브라우저 canvas 이미지로 보여줘요",
  };
  els.imageStatus.textContent = customMessage || messages[status] || messages.idle;
  els.imageStatus.classList.toggle("generated", status === "generated");
  els.imageStatus.classList.toggle("fallback", status === "fallback");
}

function roundedRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function mix(hexA, hexB, amount) {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  const mixed = {
    r: Math.round(a.r + (b.r - a.r) * amount),
    g: Math.round(a.g + (b.g - a.g) * amount),
    b: Math.round(a.b + (b.b - a.b) * amount),
  };
  return `rgb(${mixed.r}, ${mixed.g}, ${mixed.b})`;
}

function hexToRgb(hex) {
  if (hex.startsWith("rgb")) {
    const [r, g, b] = hex.match(/\d+(\.\d+)?/g).map(Number);
    return { r, g, b };
  }
  const normalized = hex.replace("#", "");
  const value = Number.parseInt(normalized, 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function hashAnswers(value) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed) {
  return function next() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function particle(text, consonantParticle, vowelParticle) {
  const last = text.trim().charCodeAt(text.trim().length - 1);
  const hangulBase = last - 0xac00;
  const hasFinalConsonant = hangulBase >= 0 && hangulBase <= 11171 && hangulBase % 28 !== 0;
  return hasFinalConsonant ? consonantParticle : vowelParticle;
}

function randomSample() {
  state.answers = activeQuestions().map((_, index) => {
    const seed = hashAnswers(`${Date.now()}-${index}-${state.mode}`);
    return Math.floor(mulberry32(seed)() * 3);
  });
  state.current = state.mode - 1;
  state.started = true;
  renderProgress();
  showResult();
}

function downloadPortrait() {
  downloadCanvas(els.portraitCanvas, "ideal-type-kmokky.png");
}

function downloadCanvas(canvas, filename) {
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

async function sharePortrait() {
  await shareCanvasImage({
    canvas: els.portraitCanvas,
    filename: "my-ideal-type-photo.png",
    title: "나의 이상형",
    text: "나의 이상형 사진이에요.",
    button: els.sharePortraitButton,
  });
}

async function sharePlacard() {
  const placardCanvas = createPlacardCanvas(buildProfile());
  await shareCanvasImage({
    canvas: placardCanvas,
    filename: "my-ideal-type-placard.png",
    title: "나의 이상형 플랜카드",
    text: "나의 이상형 사진과 결과 정보예요.",
    button: els.sharePlacardButton,
  });
}

async function shareCanvasImage({ canvas, filename, title, text, button }) {
  const originalText = button.textContent;
  button.disabled = true;
  button.textContent = "공유 준비 중";

  try {
    const blob = await canvasToBlob(canvas);
    const file = new File([blob], filename, { type: blob.type || "image/png" });

    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], title, text });
      button.textContent = "공유 완료";
    } else {
      downloadCanvas(canvas, filename);
      button.textContent = "이미지 저장됨";
    }
  } catch (error) {
    if (error?.name !== "AbortError") {
      console.warn("Image share fell back to download:", error);
      downloadCanvas(canvas, filename);
      button.textContent = "이미지 저장됨";
    }
  } finally {
    setTimeout(() => {
      button.disabled = false;
      button.textContent = originalText;
    }, 1200);
  }
}

function canvasToBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
        return;
      }
      reject(new Error("공유 이미지를 만들 수 없어요."));
    }, "image/png");
  });
}

function createPlacardCanvas(profile) {
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 2200;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const primary = traitMeta[profile.top[0].key].color;
  const secondary = traitMeta[profile.top[1].key].color;
  const accent = traitMeta[profile.top[2].key].color;

  const bg = ctx.createLinearGradient(0, 0, width, height);
  bg.addColorStop(0, mix("#ffffff", primary, 0.18));
  bg.addColorStop(0.56, "#fff9fc");
  bg.addColorStop(1, mix("#ffffff", secondary, 0.2));
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "rgba(255,255,255,0.82)";
  roundedRect(ctx, 52, 52, width - 104, height - 104, 34);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,79,155,0.22)";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = varColor("--pink-deep", "#d92b78");
  ctx.font = "900 38px system-ui, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("나의 이상형 플랜카드", 94, 122);

  ctx.fillStyle = "rgba(36,33,43,0.54)";
  ctx.font = "800 24px system-ui, sans-serif";
  ctx.fillText(getPreferenceSummary(), 94, 164);

  const photoX = 250;
  const photoY = 205;
  const photoW = 700;
  const photoH = Math.round(photoW * (els.portraitCanvas.height / els.portraitCanvas.width));
  ctx.save();
  roundedRect(ctx, photoX, photoY, photoW, photoH, 26);
  ctx.clip();
  ctx.drawImage(els.portraitCanvas, photoX, photoY, photoW, photoH);
  ctx.restore();
  ctx.strokeStyle = "rgba(36,33,43,0.12)";
  ctx.lineWidth = 2;
  roundedRect(ctx, photoX, photoY, photoW, photoH, 26);
  ctx.stroke();

  let y = photoY + photoH + 72;
  ctx.fillStyle = "#24212b";
  ctx.font = "900 44px system-ui, sans-serif";
  y = drawWrappedText(ctx, profile.title, 94, y, width - 188, 54, 2) + 20;

  ctx.fillStyle = "rgba(36,33,43,0.72)";
  ctx.font = "700 29px system-ui, sans-serif";
  y = drawWrappedText(ctx, profile.summary, 94, y, width - 188, 42, 5) + 26;

  ctx.fillStyle = "rgba(217,43,120,0.92)";
  ctx.font = "900 25px system-ui, sans-serif";
  ctx.fillText("TOP TRAITS", 94, y);
  y += 28;

  const traits = getNormalizedTraits(profile.scores).slice(0, 5);
  traits.forEach((trait, index) => {
    const x = 94 + (index % 2) * 506;
    const rowY = y + Math.floor(index / 2) * 64;
    const chipW = index === 4 ? 492 : 470;
    ctx.fillStyle = index % 2 === 0 ? "rgba(255,79,155,0.1)" : "rgba(33,183,168,0.1)";
    roundedRect(ctx, x, rowY, chipW, 48, 24);
    ctx.fill();
    ctx.fillStyle = "#24212b";
    ctx.font = "900 24px system-ui, sans-serif";
    ctx.fillText(traitMeta[trait.key].label, x + 22, rowY + 31);
    ctx.fillStyle = "rgba(36,33,43,0.56)";
    ctx.textAlign = "right";
    ctx.fillText(`${trait.percent}`, x + chipW - 22, rowY + 31);
    ctx.textAlign = "left";
  });
  y += 220;

  ctx.fillStyle = "rgba(217,43,120,0.92)";
  ctx.font = "900 23px system-ui, sans-serif";
  ctx.fillText("PHOTO STYLE", 94, y);
  y += 34;

  ctx.fillStyle = "rgba(36,33,43,0.58)";
  ctx.font = "700 21px system-ui, sans-serif";
  y = drawWrappedText(ctx, profile.prompt, 94, y, width - 188, 31, 4) + 28;

  ctx.fillStyle = "rgba(33,183,168,0.1)";
  roundedRect(ctx, 94, height - 150, width - 188, 64, 18);
  ctx.fill();
  ctx.fillStyle = "rgba(36,33,43,0.62)";
  ctx.font = "800 22px system-ui, sans-serif";
  drawWrappedText(ctx, "검사 내용은 어디에도 저장되지 않고 결과 표시 후 파기돼요. 결과 저장용 DB 자체도 존재하지 않아요.", 120, height - 110, width - 240, 28, 2);

  return canvas;
}

function getPreferenceSummary() {
  const gender = preferenceMeta.gender[state.targetGender] || preferenceMeta.gender.any;
  const ageRange = preferenceMeta.ageRange[state.targetAgeRange] || preferenceMeta.ageRange["20s"];
  return `${gender.label} · ${ageRange.label} · ${state.mode}문항`;
}

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, maxLines = Number.POSITIVE_INFINITY) {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";

  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width <= maxWidth) {
      line = testLine;
      return;
    }
    if (line) lines.push(line);
    line = word;
  });

  if (line) lines.push(line);

  const visibleLines = lines.slice(0, maxLines);
  visibleLines.forEach((visibleLine, index) => {
    const suffix = index === maxLines - 1 && lines.length > maxLines ? "…" : "";
    ctx.fillText(`${visibleLine}${suffix}`, x, y + index * lineHeight);
  });

  return y + Math.max(visibleLines.length - 1, 0) * lineHeight;
}

function varColor(name, fallback) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

async function copyPrompt() {
  const text = els.imagePrompt.textContent;
  try {
    await navigator.clipboard.writeText(text);
    els.copyPromptButton.textContent = "✓";
    setTimeout(() => {
      els.copyPromptButton.textContent = "⧉";
    }, 1100);
  } catch {
    els.copyPromptButton.textContent = "!";
    setTimeout(() => {
      els.copyPromptButton.textContent = "⧉";
    }, 1100);
  }
}

els.modeButtons.forEach((button) => {
  button.addEventListener("click", () => setMode(Number(button.dataset.mode)));
});

els.preferenceButtons.forEach((button) => {
  button.addEventListener("click", () => setPreference(button.dataset.preference, button.dataset.value));
});

els.startButton.addEventListener("click", startQuiz);
els.sampleButton.addEventListener("click", randomSample);
els.backButton.addEventListener("click", goBack);
els.resetButton.addEventListener("click", clearCurrentAnswer);
els.downloadButton.addEventListener("click", downloadPortrait);
els.sharePortraitButton.addEventListener("click", sharePortrait);
els.sharePlacardButton.addEventListener("click", sharePlacard);
els.restartButton.addEventListener("click", resetQuiz);
els.restartTopButton.addEventListener("click", resetQuiz);
els.copyPromptButton.addEventListener("click", copyPrompt);

setMode(20);
