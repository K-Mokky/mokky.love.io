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
      prompt: "Korean woman",
    },
    man: {
      label: "남성",
      prompt: "Korean man",
    },
  },
  ageRange: {
    teens: {
      label: "10대 후반",
      prompt: "age 18 to 19, clearly a late-teen young adult",
      guard: "not under 18, not a child, not middle-aged, not elderly, not ajumma style, not ajusshi style, no gray hair, no deep wrinkles, age-appropriate casual styling",
    },
    "20s": {
      label: "20대",
      prompt: "age 24 to 29, clearly a young adult in their 20s",
      guard: "not middle-aged, not elderly, not ajumma style, not ajusshi style, not auntie-like, not uncle-like, no gray hair, no deep wrinkles",
    },
    "30s": {
      label: "30대",
      prompt: "age 30 to 36, clearly in their early-to-mid 30s",
      guard: "not elderly, not ajumma style, not ajusshi style, not auntie-like, not uncle-like, no gray hair, no deep wrinkles",
    },
    any: {
      label: "나이대 상관없음",
      prompt: "age 25 to 39, contemporary adult look",
      guard: "not elderly, not ajumma style, not ajusshi style, not auntie-like, not uncle-like, no gray hair, no deep wrinkles",
    },
  },
};

function pick(label, scores) {
  return { label, scores };
}

const questionBlueprints = [
  {
    category: "첫만남",
    text: "약속 장소에 먼저 도착한 상대가 어떻게 기다리고 있으면 끌리나요?",
    options: [
      pick("메시지로 위치를 알려주며 편하게 오라고 말한다", { warmth: 4, steadiness: 1 }),
      pick("근처 분위기 좋은 자리를 즉석에서 찾아둔다", { aesthetics: 3, energy: 2 }),
      pick("기다리는 동안 떠오른 이야기를 자연스럽게 꺼낸다", { intellect: 3, sincerity: 2 }),
    ],
  },
  {
    category: "첫만남",
    text: "처음 악수하거나 인사할 때 가장 매력적인 태도는 무엇인가요?",
    options: [
      pick("눈을 맞추고 부드럽게 웃으며 이름을 불러준다", { warmth: 3, romance: 2 }),
      pick("담백하지만 자신감 있게 분위기를 열어준다", { independence: 3, energy: 2 }),
      pick("과하지 않은 예의와 차분한 말투를 지킨다", { steadiness: 3, sincerity: 2 }),
    ],
  },
  {
    category: "첫만남",
    text: "낯선 모임에서 상대에게 시선이 가는 순간은 언제인가요?",
    options: [
      pick("혼자 있는 사람을 자연스럽게 챙겨준다", { warmth: 4, sincerity: 1 }),
      pick("재치 있는 말로 모두의 긴장을 가볍게 만든다", { humor: 4, energy: 1 }),
      pick("자기 의견을 조용하지만 선명하게 말한다", { intellect: 3, independence: 2 }),
    ],
  },
  {
    category: "첫만남",
    text: "상대의 옷차림에서 가장 먼저 호감이 생기는 지점은 무엇인가요?",
    options: [
      pick("깔끔하고 편안해 보여 오래 함께 걷고 싶다", { steadiness: 3, warmth: 2 }),
      pick("작은 액세서리나 색감에서 취향이 느껴진다", { aesthetics: 4, independence: 1 }),
      pick("예상 밖의 조합을 자기답게 소화한다", { independence: 3, adventure: 2 }),
    ],
  },
  {
    category: "첫만남",
    text: "첫 대화가 5분 만에 편해지는 이유로 가장 좋은 것은?",
    options: [
      pick("내 말을 끊지 않고 표정으로 따라와 준다", { warmth: 4, sincerity: 1 }),
      pick("질문 하나로 대화의 깊이를 만들어낸다", { intellect: 4, romance: 1 }),
      pick("작은 실수를 웃음으로 바꿔 어색함을 없앤다", { humor: 4, energy: 1 }),
    ],
  },
  {
    category: "첫만남",
    text: "처음 만난 사람이 약간 늦었을 때 어떤 반응이 더 끌리나요?",
    options: [
      pick("이유를 솔직히 말하고 바로 사과한다", { sincerity: 4, steadiness: 1 }),
      pick("기다린 시간을 배려해 다음 일정을 세심히 맞춘다", { warmth: 3, steadiness: 2 }),
      pick("분위기가 무거워지지 않게 가볍게 웃겨준다", { humor: 3, energy: 2 }),
    ],
  },
  {
    category: "첫만남",
    text: "처음 보는 장소에서 상대가 길을 찾는 방식 중 매력적인 것은?",
    options: [
      pick("빠르게 방향을 정하고 먼저 움직인다", { energy: 3, adventure: 2 }),
      pick("지도를 차분히 확인하며 불안하지 않게 설명한다", { steadiness: 4, intellect: 1 }),
      pick("길을 헤매는 상황도 작은 추억처럼 즐긴다", { adventure: 3, humor: 2 }),
    ],
  },
  {
    category: "첫만남",
    text: "첫 만남 후 집에 가는 길에 가장 오래 남는 장면은?",
    options: [
      pick("헤어질 때 오늘 좋았던 점을 구체적으로 말해준다", { romance: 3, sincerity: 2 }),
      pick("무사히 도착했는지 부담 없이 확인해준다", { warmth: 3, steadiness: 2 }),
      pick("짧은 만남에서도 자기 세계가 선명하게 보였다", { independence: 4, aesthetics: 1 }),
    ],
  },
  {
    category: "첫만남",
    text: "상대의 목소리에서 가장 끌리는 느낌은 무엇인가요?",
    options: [
      pick("낮고 안정적이라 마음이 가라앉는다", { steadiness: 4, sincerity: 1 }),
      pick("밝고 생동감 있어 주변 공기가 살아난다", { energy: 4, warmth: 1 }),
      pick("조용하지만 문장마다 생각의 결이 느껴진다", { intellect: 4, aesthetics: 1 }),
    ],
  },
  {
    category: "첫만남",
    text: "처음부터 다시 만나고 싶다는 생각이 드는 결정적 이유는?",
    options: [
      pick("짧은 시간에도 나를 존중받는 사람처럼 느끼게 한다", { sincerity: 3, warmth: 2 }),
      pick("다음에 같이 해볼 일이 자연스럽게 떠오른다", { adventure: 3, energy: 2 }),
      pick("평범한 대화도 장면처럼 기억되게 만든다", { romance: 3, aesthetics: 2 }),
    ],
  },

  {
    category: "대화",
    text: "밤늦게 긴 통화를 한다면 어떤 흐름이 가장 좋나요?",
    options: [
      pick("오늘 힘들었던 마음을 천천히 풀어놓을 수 있다", { warmth: 4, sincerity: 1 }),
      pick("한 주제에서 다른 주제로 지적인 호기심이 이어진다", { intellect: 4, adventure: 1 }),
      pick("사소한 농담이 계속 쌓여 둘만의 코드가 된다", { humor: 4, romance: 1 }),
    ],
  },
  {
    category: "대화",
    text: "상대가 내 고민을 들을 때 어떤 방식이면 믿음이 가나요?",
    options: [
      pick("먼저 감정을 알아주고 해결책은 나중에 제안한다", { warmth: 4, sincerity: 1 }),
      pick("문제를 구조적으로 정리해 선택지를 보여준다", { intellect: 4, steadiness: 1 }),
      pick("내가 스스로 결정하도록 옆에서 기다려준다", { independence: 3, steadiness: 2 }),
    ],
  },
  {
    category: "대화",
    text: "취향이 정반대라는 걸 알았을 때 더 끌리는 반응은?",
    options: [
      pick("왜 좋아하는지 궁금해하며 진심으로 들어본다", { sincerity: 3, intellect: 2 }),
      pick("차이를 놀림거리로 만들지 않고 귀엽게 받아준다", { warmth: 3, humor: 2 }),
      pick("서로의 취향을 섞은 새로운 시도를 제안한다", { adventure: 3, aesthetics: 2 }),
    ],
  },
  {
    category: "대화",
    text: "말수가 적은 상대라면 어떤 순간에 매력을 느끼나요?",
    options: [
      pick("필요한 순간에 정확한 한마디를 건넨다", { intellect: 3, sincerity: 2 }),
      pick("표정과 행동으로 꾸준히 마음을 보여준다", { steadiness: 3, warmth: 2 }),
      pick("혼자만의 시간을 존중해도 거리감이 차갑지 않다", { independence: 3, sincerity: 2 }),
    ],
  },
  {
    category: "대화",
    text: "함께 뉴스를 보다가 의견이 갈렸을 때 좋은 태도는?",
    options: [
      pick("근거를 차분히 나누며 서로의 관점을 넓힌다", { intellect: 4, steadiness: 1 }),
      pick("이견보다 관계의 온도를 먼저 지켜준다", { warmth: 3, romance: 2 }),
      pick("자기 입장을 숨기지 않되 상대를 깎아내리지 않는다", { independence: 3, sincerity: 2 }),
    ],
  },
  {
    category: "대화",
    text: "칭찬을 들을 때 어떤 표현이 가장 설레나요?",
    options: [
      pick("겉모습보다 내가 애쓴 과정을 알아봐 준다", { sincerity: 4, warmth: 1 }),
      pick("아주 구체적인 디테일을 기억해서 말해준다", { romance: 3, aesthetics: 2 }),
      pick("재치 있게 말해 민망함까지 웃게 만든다", { humor: 3, energy: 2 }),
    ],
  },
  {
    category: "대화",
    text: "상대가 자기 꿈을 말할 때 어떤 모습이 멋있나요?",
    options: [
      pick("현실적인 계획과 책임감을 함께 보여준다", { steadiness: 3, intellect: 2 }),
      pick("눈빛이 살아나고 에너지가 주변으로 번진다", { energy: 4, adventure: 1 }),
      pick("남과 비교하지 않는 자기만의 기준이 있다", { independence: 4, sincerity: 1 }),
    ],
  },
  {
    category: "대화",
    text: "침묵이 생겼을 때 더 편하게 느껴지는 사람은?",
    options: [
      pick("억지로 채우지 않아도 온기가 느껴진다", { warmth: 3, steadiness: 2 }),
      pick("창밖 풍경 같은 작은 소재로 부드럽게 이어간다", { aesthetics: 3, romance: 2 }),
      pick("갑자기 엉뚱한 질문을 던져 분위기를 바꾼다", { humor: 3, adventure: 2 }),
    ],
  },
  {
    category: "대화",
    text: "메신저 말투에서 가장 호감이 가는 특징은?",
    options: [
      pick("짧아도 맥락과 배려가 빠지지 않는다", { sincerity: 3, steadiness: 2 }),
      pick("이모티콘과 표현이 밝아 기분이 좋아진다", { energy: 3, warmth: 2 }),
      pick("가끔 예상 못 한 문장으로 웃음을 준다", { humor: 4, independence: 1 }),
    ],
  },
  {
    category: "대화",
    text: "서로의 과거 이야기를 나눌 때 가장 중요한 것은?",
    options: [
      pick("판단보다 이해하려는 태도를 보인다", { warmth: 3, sincerity: 2 }),
      pick("무겁지 않게 받아들이되 가볍게 소비하지 않는다", { steadiness: 3, intellect: 2 }),
      pick("상처까지도 앞으로의 방향으로 연결해 말한다", { adventure: 2, sincerity: 3 }),
    ],
  },

  {
    category: "데이트",
    text: "주말 오후 데이트를 정한다면 가장 끌리는 제안은?",
    options: [
      pick("조용한 카페에서 오래 이야기하고 함께 산책한다", { warmth: 3, romance: 2 }),
      pick("전시나 편집숍을 돌며 서로의 취향을 발견한다", { aesthetics: 4, intellect: 1 }),
      pick("당일에 끌리는 동네로 가볍게 떠나본다", { adventure: 4, energy: 1 }),
    ],
  },
  {
    category: "데이트",
    text: "식당 예약이 갑자기 취소됐을 때 좋은 상대의 모습은?",
    options: [
      pick("침착하게 근처 대안을 찾고 내 기분을 살핀다", { steadiness: 3, warmth: 2 }),
      pick("오히려 새로운 맛집 탐험이라며 즐겁게 바꾼다", { adventure: 3, energy: 2 }),
      pick("상황을 웃긴 에피소드로 만들어 긴장을 풀어준다", { humor: 4, romance: 1 }),
    ],
  },
  {
    category: "데이트",
    text: "영화를 보고 나오는 길에 어떤 대화가 좋나요?",
    options: [
      pick("좋았던 장면을 감정 중심으로 나눈다", { romance: 3, warmth: 2 }),
      pick("연출과 메시지를 깊게 해석해본다", { intellect: 4, aesthetics: 1 }),
      pick("명대사를 장난스럽게 따라 하며 웃는다", { humor: 3, energy: 2 }),
    ],
  },
  {
    category: "데이트",
    text: "함께 사진을 찍는다면 어떤 스타일이 더 마음에 드나요?",
    options: [
      pick("자연스럽게 웃는 순간을 놓치지 않는다", { warmth: 3, energy: 2 }),
      pick("구도와 빛을 신경 써 예쁜 한 장을 만든다", { aesthetics: 4, romance: 1 }),
      pick("남들이 안 찍는 엉뚱한 장면을 남긴다", { independence: 3, humor: 2 }),
    ],
  },
  {
    category: "데이트",
    text: "데이트 비용을 다룰 때 어떤 태도가 편한가요?",
    options: [
      pick("서로 부담 없도록 먼저 균형을 맞추려 한다", { steadiness: 3, sincerity: 2 }),
      pick("상황에 따라 기분 좋게 번갈아 챙긴다", { warmth: 3, romance: 2 }),
      pick("돈보다 경험의 만족도를 더 중요하게 본다", { adventure: 2, aesthetics: 3 }),
    ],
  },
  {
    category: "데이트",
    text: "비 오는 날 데이트에서 가장 기억에 남을 행동은?",
    options: [
      pick("우산을 자연스럽게 내 쪽으로 기울여준다", { warmth: 4, romance: 1 }),
      pick("젖은 길도 분위기 있다며 사진 찍을 곳을 찾는다", { aesthetics: 3, adventure: 2 }),
      pick("실내 동선을 빠르게 정리해 불편함을 줄인다", { steadiness: 4, intellect: 1 }),
    ],
  },
  {
    category: "데이트",
    text: "긴 줄을 기다려야 하는 상황에서 어떤 사람이 좋나요?",
    options: [
      pick("기다림도 대화 시간처럼 편안하게 만든다", { warmth: 3, sincerity: 2 }),
      pick("게임이나 장난으로 지루함을 없앤다", { humor: 3, energy: 2 }),
      pick("대기 시간을 계산해 더 효율적인 선택을 제안한다", { intellect: 3, steadiness: 2 }),
    ],
  },
  {
    category: "데이트",
    text: "상대가 데이트 코스를 준비했다면 어떤 부분이 감동인가요?",
    options: [
      pick("내가 좋아한다고 말한 것을 기억해 반영했다", { sincerity: 4, romance: 1 }),
      pick("익숙한 장소도 새롭게 느끼게 구성했다", { aesthetics: 3, adventure: 2 }),
      pick("무리 없는 시간표로 편안함을 챙겼다", { steadiness: 4, warmth: 1 }),
    ],
  },
  {
    category: "데이트",
    text: "함께 걷다가 예쁜 골목을 발견했을 때 좋은 반응은?",
    options: [
      pick("잠깐 돌아가도 괜찮다며 내 호기심을 따라와 준다", { warmth: 3, adventure: 2 }),
      pick("그 골목의 분위기를 자기만의 말로 표현한다", { aesthetics: 3, intellect: 2 }),
      pick("다음 데이트에 이 동네를 더 탐험하자고 한다", { adventure: 4, romance: 1 }),
    ],
  },
  {
    category: "데이트",
    text: "하루 데이트가 끝난 뒤 가장 듣고 싶은 말은?",
    options: [
      pick("오늘 너랑 있어서 마음이 편했어", { warmth: 4, steadiness: 1 }),
      pick("오늘 장면 중에 이 순간이 계속 생각나", { romance: 4, aesthetics: 1 }),
      pick("다음엔 우리가 안 해본 걸 해보자", { adventure: 3, energy: 2 }),
    ],
  },

  {
    category: "일상",
    text: "같이 장을 보러 갔을 때 어떤 모습이 매력적인가요?",
    options: [
      pick("필요한 것을 꼼꼼히 챙겨 생활력이 보인다", { steadiness: 4, sincerity: 1 }),
      pick("새로운 재료를 보고 즉석 요리를 제안한다", { adventure: 3, energy: 2 }),
      pick("내가 좋아하는 간식을 기억하고 담아준다", { warmth: 3, romance: 2 }),
    ],
  },
  {
    category: "일상",
    text: "집에서 쉬는 날 상대가 어떤 시간을 보내면 좋나요?",
    options: [
      pick("각자 쉬어도 같은 공간의 온기가 느껴진다", { warmth: 3, independence: 2 }),
      pick("읽고 보던 것에 대해 깊은 이야기를 꺼낸다", { intellect: 4, sincerity: 1 }),
      pick("갑자기 작은 홈카페나 음악회를 연다", { aesthetics: 3, romance: 2 }),
    ],
  },
  {
    category: "일상",
    text: "아침 인사에서 가장 기분 좋아지는 방식은?",
    options: [
      pick("오늘 일정 힘내라는 짧은 응원을 보낸다", { warmth: 3, energy: 2 }),
      pick("날씨나 컨디션을 살피며 무리하지 말라고 한다", { steadiness: 3, sincerity: 2 }),
      pick("뜬금없는 귀여운 농담으로 하루를 열어준다", { humor: 4, romance: 1 }),
    ],
  },
  {
    category: "일상",
    text: "함께 청소를 한다면 어떤 파트너가 좋은가요?",
    options: [
      pick("말없이도 역할을 나누고 꾸준히 해낸다", { steadiness: 4, sincerity: 1 }),
      pick("음악을 틀고 분위기를 살려 지루하지 않게 한다", { energy: 3, humor: 2 }),
      pick("공간의 배치와 디테일까지 예쁘게 정리한다", { aesthetics: 4, intellect: 1 }),
    ],
  },
  {
    category: "일상",
    text: "피곤해서 말수가 줄어든 날 상대에게 바라는 것은?",
    options: [
      pick("캐묻지 않고 곁에서 편안하게 있어준다", { warmth: 3, steadiness: 2 }),
      pick("필요한 것만 묻고 혼자 있을 시간을 존중한다", { independence: 3, sincerity: 2 }),
      pick("가벼운 농담으로 부담 없이 웃게 해준다", { humor: 3, energy: 2 }),
    ],
  },
  {
    category: "일상",
    text: "평범한 저녁 식사가 특별해지는 이유는?",
    options: [
      pick("서로의 하루를 진심으로 궁금해한다", { sincerity: 3, warmth: 2 }),
      pick("플레이팅이나 음악처럼 작은 분위기를 챙긴다", { aesthetics: 4, romance: 1 }),
      pick("새 메뉴에 도전하며 실패까지 즐긴다", { adventure: 3, humor: 2 }),
    ],
  },
  {
    category: "일상",
    text: "상대의 생활 습관 중 가장 호감인 것은?",
    options: [
      pick("약속한 일을 미루지 않고 책임진다", { steadiness: 4, sincerity: 1 }),
      pick("자기 루틴을 지키며 스스로를 돌본다", { independence: 4, intellect: 1 }),
      pick("주변 사람들에게 작은 친절을 습관처럼 건넨다", { warmth: 4, sincerity: 1 }),
    ],
  },
  {
    category: "일상",
    text: "같이 대중교통을 탈 때 끌리는 모습은?",
    options: [
      pick("사람이 많아도 내 동선을 자연스럽게 배려한다", { warmth: 4, steadiness: 1 }),
      pick("창밖을 보며 재미있는 상상을 이야기한다", { humor: 3, aesthetics: 2 }),
      pick("노선과 시간을 빠르게 파악해 안내한다", { intellect: 3, steadiness: 2 }),
    ],
  },
  {
    category: "일상",
    text: "갑자기 시간이 빈 오후에 어떤 제안이 반가운가요?",
    options: [
      pick("동네를 천천히 걸으며 쉬자고 한다", { warmth: 3, steadiness: 2 }),
      pick("근처에서 열리는 작은 행사를 찾아낸다", { adventure: 3, energy: 2 }),
      pick("각자 하고 싶던 일을 하다가 저녁에 만나자고 한다", { independence: 4, sincerity: 1 }),
    ],
  },
  {
    category: "일상",
    text: "반복되는 평일에도 마음이 식지 않는 이유는?",
    options: [
      pick("작은 안부와 배려가 꾸준히 이어진다", { warmth: 3, steadiness: 2 }),
      pick("매일 한 가지씩 웃을 일을 만들어준다", { humor: 3, energy: 2 }),
      pick("각자의 성장을 응원하는 대화가 있다", { intellect: 3, sincerity: 2 }),
    ],
  },

  {
    category: "취향",
    text: "플레이리스트를 공유한다면 어떤 상대가 끌리나요?",
    options: [
      pick("내 감정에 맞는 노래를 골라 보내준다", { romance: 3, warmth: 2 }),
      pick("새로운 장르를 소개하며 세계를 넓혀준다", { adventure: 3, intellect: 2 }),
      pick("곡 순서와 분위기까지 자기 취향으로 완성한다", { aesthetics: 4, independence: 1 }),
    ],
  },
  {
    category: "취향",
    text: "상대의 책장이나 작업 공간을 봤을 때 매력적인 점은?",
    options: [
      pick("관심사가 깊고 오래 쌓인 흔적이 보인다", { intellect: 4, sincerity: 1 }),
      pick("정돈 방식에서 차분한 생활감이 느껴진다", { steadiness: 3, aesthetics: 2 }),
      pick("남들이 잘 모르는 물건에 자기 이야기가 담겨 있다", { independence: 4, romance: 1 }),
    ],
  },
  {
    category: "취향",
    text: "패션 취향이 다를 때 어떤 사람이 더 좋나요?",
    options: [
      pick("내 스타일을 바꾸려 하지 않고 존중한다", { independence: 3, sincerity: 2 }),
      pick("서로 어울리는 포인트를 찾아 즐겁게 제안한다", { aesthetics: 3, warmth: 2 }),
      pick("다름을 장난스럽게 받아들이며 웃는다", { humor: 3, energy: 2 }),
    ],
  },
  {
    category: "취향",
    text: "맛집을 고를 때 가장 마음이 가는 기준은?",
    options: [
      pick("내가 편하게 먹을 수 있는지를 먼저 생각한다", { warmth: 3, steadiness: 2 }),
      pick("분위기와 메뉴의 조화를 세심하게 본다", { aesthetics: 4, romance: 1 }),
      pick("한 번도 안 먹어본 메뉴에 도전한다", { adventure: 4, energy: 1 }),
    ],
  },
  {
    category: "취향",
    text: "전시회에서 상대와 함께라면 어떤 시간이 좋나요?",
    options: [
      pick("작품 앞에서 각자의 해석을 차분히 나눈다", { intellect: 4, aesthetics: 1 }),
      pick("마음에 든 색과 장면을 사진처럼 기억한다", { aesthetics: 4, romance: 1 }),
      pick("어려운 작품도 가볍게 웃으며 접근한다", { humor: 3, adventure: 2 }),
    ],
  },
  {
    category: "취향",
    text: "상대가 오래 해온 취미를 소개할 때 끌리는 모습은?",
    options: [
      pick("잘난 척보다 좋아하는 마음이 먼저 보인다", { sincerity: 4, warmth: 1 }),
      pick("초보자인 나도 즐길 수 있게 쉽게 알려준다", { warmth: 3, intellect: 2 }),
      pick("자기만의 방식과 철학이 뚜렷하다", { independence: 4, aesthetics: 1 }),
    ],
  },
  {
    category: "취향",
    text: "둘만의 취향을 새로 만든다면 무엇이 좋나요?",
    options: [
      pick("매달 한 번 새로운 동네를 탐험하는 약속", { adventure: 4, energy: 1 }),
      pick("서로에게 어울리는 노래와 문장을 모으는 습관", { romance: 3, aesthetics: 2 }),
      pick("함께 배운 것을 기록하고 발전시키는 루틴", { intellect: 3, steadiness: 2 }),
    ],
  },
  {
    category: "취향",
    text: "상대가 좋아하는 영화를 강하게 추천한다면 어떤 방식이 좋나요?",
    options: [
      pick("왜 자신에게 소중한지 솔직히 설명한다", { sincerity: 4, romance: 1 }),
      pick("내 취향과 맞을 지점을 섬세하게 짚어준다", { intellect: 3, warmth: 2 }),
      pick("추천 실패도 웃어넘길 수 있게 가볍게 권한다", { humor: 3, steadiness: 2 }),
    ],
  },
  {
    category: "취향",
    text: "인테리어 취향에서 가장 매력적으로 느껴지는 것은?",
    options: [
      pick("편안하고 오래 머물고 싶은 온도가 있다", { warmth: 3, steadiness: 2 }),
      pick("색감과 조명이 자기답게 정돈되어 있다", { aesthetics: 4, independence: 1 }),
      pick("여행과 경험의 흔적이 공간 곳곳에 있다", { adventure: 3, sincerity: 2 }),
    ],
  },
  {
    category: "취향",
    text: "새로운 취미를 같이 시작할 때 기대되는 상대는?",
    options: [
      pick("서툰 과정을 함께 웃으며 즐긴다", { humor: 3, warmth: 2 }),
      pick("배우는 방법을 찾아 꾸준히 실력이 는다", { intellect: 3, steadiness: 2 }),
      pick("결과보다 해보는 용기를 먼저 낸다", { adventure: 4, energy: 1 }),
    ],
  },

  {
    category: "갈등",
    text: "서운함을 말했을 때 가장 안심되는 반응은?",
    options: [
      pick("방어하지 않고 내 감정을 끝까지 들어준다", { warmth: 4, sincerity: 1 }),
      pick("문제가 반복되지 않도록 구체적인 약속을 한다", { steadiness: 4, sincerity: 1 }),
      pick("감정과 사실을 나누어 차분히 정리한다", { intellect: 4, steadiness: 1 }),
    ],
  },
  {
    category: "갈등",
    text: "의견 충돌 후 화해하는 과정에서 중요한 것은?",
    options: [
      pick("먼저 손을 내밀어 관계의 온도를 회복한다", { warmth: 3, romance: 2 }),
      pick("서로의 책임을 정확히 인정한다", { sincerity: 4, steadiness: 1 }),
      pick("다음에는 다른 방식으로 시도해보자고 제안한다", { adventure: 3, intellect: 2 }),
    ],
  },
  {
    category: "갈등",
    text: "상대가 화가 났을 때 어떤 모습이면 믿음이 가나요?",
    options: [
      pick("큰소리보다 시간을 두고 차분히 말한다", { steadiness: 4, sincerity: 1 }),
      pick("상처 주는 농담을 하지 않고 선을 지킨다", { sincerity: 3, warmth: 2 }),
      pick("감정이 가라앉은 뒤 해결책을 함께 찾는다", { intellect: 3, steadiness: 2 }),
    ],
  },
  {
    category: "갈등",
    text: "내 실수로 분위기가 어색해졌을 때 바라는 상대는?",
    options: [
      pick("괜찮다고 말하며 다시 시도할 여유를 준다", { warmth: 4, steadiness: 1 }),
      pick("실수를 가볍게 웃음으로 바꿔준다", { humor: 4, energy: 1 }),
      pick("무엇을 고치면 좋을지 솔직하지만 다정하게 말한다", { sincerity: 3, intellect: 2 }),
    ],
  },
  {
    category: "갈등",
    text: "약속 방식이 서로 다르다는 걸 알았을 때 좋은 태도는?",
    options: [
      pick("서로의 기준을 물어보고 중간 지점을 찾는다", { sincerity: 3, steadiness: 2 }),
      pick("내 방식을 강요하지 않고 각자의 리듬을 인정한다", { independence: 4, warmth: 1 }),
      pick("불편함을 줄이는 새로운 규칙을 같이 만든다", { intellect: 3, adventure: 2 }),
    ],
  },
  {
    category: "갈등",
    text: "질투나 불안이 생겼을 때 어떤 사람이 안정감을 주나요?",
    options: [
      pick("숨기지 않고 관계의 경계를 분명히 말한다", { sincerity: 4, steadiness: 1 }),
      pick("불안을 민망하게 만들지 않고 안심시켜준다", { warmth: 4, romance: 1 }),
      pick("각자의 사생활과 신뢰를 균형 있게 지킨다", { independence: 3, steadiness: 2 }),
    ],
  },
  {
    category: "갈등",
    text: "서로 바쁜 시기에 갈등이 생기면 어떤 해결이 좋나요?",
    options: [
      pick("짧게라도 시간을 정해 진심을 확인한다", { sincerity: 3, romance: 2 }),
      pick("당장 해결할 것과 나중에 볼 것을 나눈다", { intellect: 3, steadiness: 2 }),
      pick("잠깐의 웃음으로 숨 쉴 틈을 만든다", { humor: 3, warmth: 2 }),
    ],
  },
  {
    category: "갈등",
    text: "상대가 사과할 때 가장 중요하게 느끼는 것은?",
    options: [
      pick("구체적으로 무엇이 미안한지 알고 있다", { sincerity: 4, intellect: 1 }),
      pick("내 마음이 풀릴 때까지 재촉하지 않는다", { warmth: 3, steadiness: 2 }),
      pick("같은 일이 반복되지 않게 행동을 바꾼다", { steadiness: 4, sincerity: 1 }),
    ],
  },
  {
    category: "갈등",
    text: "관계에서 선을 정해야 할 때 끌리는 방식은?",
    options: [
      pick("부드럽지만 분명하게 자신의 기준을 말한다", { independence: 4, sincerity: 1 }),
      pick("상대가 상처받지 않도록 말의 온도를 조절한다", { warmth: 3, aesthetics: 2 }),
      pick("왜 그 선이 필요한지 논리적으로 설명한다", { intellect: 4, steadiness: 1 }),
    ],
  },
  {
    category: "갈등",
    text: "갈등을 지나고도 더 가까워졌다고 느끼는 이유는?",
    options: [
      pick("서로의 약한 부분을 더 조심히 대하게 됐다", { warmth: 3, sincerity: 2 }),
      pick("문제 해결 방식이 한층 단단해졌다", { steadiness: 3, intellect: 2 }),
      pick("위기를 계기로 새로운 관계 방식을 만들었다", { adventure: 3, romance: 2 }),
    ],
  },

  {
    category: "연락",
    text: "하루 중 연락이 가장 기분 좋게 느껴지는 순간은?",
    options: [
      pick("바쁜 중에도 짧게 내 안부를 챙긴다", { warmth: 3, sincerity: 2 }),
      pick("재미있는 사진이나 문장으로 웃게 만든다", { humor: 3, energy: 2 }),
      pick("오늘의 중요한 일을 기억하고 응원해준다", { steadiness: 3, romance: 2 }),
    ],
  },
  {
    category: "연락",
    text: "답장이 늦어질 때 어떤 설명이 가장 편한가요?",
    options: [
      pick("늦어질 상황을 미리 알려 불안하지 않게 한다", { steadiness: 4, warmth: 1 }),
      pick("나중에라도 이유와 마음을 솔직히 전한다", { sincerity: 4, romance: 1 }),
      pick("각자의 집중 시간을 자연스럽게 존중한다", { independence: 4, intellect: 1 }),
    ],
  },
  {
    category: "연락",
    text: "연락 빈도가 맞지 않을 때 이상적인 조율은?",
    options: [
      pick("서로 부담 없는 최소한의 약속을 정한다", { steadiness: 3, sincerity: 2 }),
      pick("연락보다 만났을 때의 밀도를 더 중요하게 둔다", { romance: 3, independence: 2 }),
      pick("새로운 방식의 짧은 체크인을 함께 실험한다", { adventure: 3, intellect: 2 }),
    ],
  },
  {
    category: "연락",
    text: "갑자기 보고 싶다는 말을 들을 때 어떤 뉘앙스가 좋나요?",
    options: [
      pick("부담 주지 않고 마음만 다정하게 전한다", { warmth: 4, romance: 1 }),
      pick("장난스럽게 말해도 진심이 느껴진다", { humor: 3, sincerity: 2 }),
      pick("바로 볼 수 있는 현실적인 방법을 제안한다", { energy: 3, steadiness: 2 }),
    ],
  },
  {
    category: "연락",
    text: "긴 문자를 받는다면 어떤 내용이 가장 좋나요?",
    options: [
      pick("내가 해준 말과 행동을 오래 기억해 적어준다", { romance: 4, sincerity: 1 }),
      pick("요즘 고민을 솔직하게 공유하며 가까워진다", { sincerity: 4, warmth: 1 }),
      pick("생각을 정리한 문장들이 배울 점을 준다", { intellect: 4, aesthetics: 1 }),
    ],
  },
  {
    category: "연락",
    text: "음성 메시지를 보낸다면 어떤 분위기가 끌리나요?",
    options: [
      pick("낮은 목소리로 오늘 하루를 차분히 들려준다", { steadiness: 3, romance: 2 }),
      pick("웃음 섞인 목소리로 생생한 에너지를 전한다", { energy: 3, humor: 2 }),
      pick("짧지만 마음을 정확히 표현한다", { sincerity: 4, warmth: 1 }),
    ],
  },
  {
    category: "연락",
    text: "연락에서 가장 피하고 싶은 불안이 사라지는 순간은?",
    options: [
      pick("말과 행동의 패턴이 꾸준히 맞아떨어진다", { steadiness: 4, sincerity: 1 }),
      pick("모호한 표현보다 분명한 마음을 보여준다", { sincerity: 4, romance: 1 }),
      pick("내가 묻지 않아도 필요한 맥락을 알려준다", { warmth: 3, intellect: 2 }),
    ],
  },
  {
    category: "연락",
    text: "둘만의 연락 습관을 만든다면 어떤 것이 좋나요?",
    options: [
      pick("하루에 좋았던 일을 하나씩 나눈다", { warmth: 3, romance: 2 }),
      pick("새로 알게 된 것을 짧게 공유한다", { intellect: 3, adventure: 2 }),
      pick("웃긴 순간을 모아 둘만의 밈으로 만든다", { humor: 4, energy: 1 }),
    ],
  },
  {
    category: "연락",
    text: "상대가 SNS를 대하는 방식 중 호감인 것은?",
    options: [
      pick("보여주기보다 실제 관계의 신뢰를 더 중시한다", { sincerity: 3, steadiness: 2 }),
      pick("자기 취향과 일상을 감각적으로 기록한다", { aesthetics: 4, independence: 1 }),
      pick("온라인에서도 상대를 배려하는 선을 지킨다", { warmth: 3, independence: 2 }),
    ],
  },
  {
    category: "연락",
    text: "잠들기 전 마지막 연락으로 가장 좋은 것은?",
    options: [
      pick("오늘도 고생했다는 따뜻한 한마디", { warmth: 4, sincerity: 1 }),
      pick("내일 기대되는 일을 함께 떠올리는 말", { energy: 3, adventure: 2 }),
      pick("짧지만 로맨틱하게 마음을 남기는 문장", { romance: 4, aesthetics: 1 }),
    ],
  },

  {
    category: "미래",
    text: "1년 뒤의 관계를 상상할 때 가장 바라는 모습은?",
    options: [
      pick("서로의 일상을 믿고 맡길 만큼 편안하다", { steadiness: 4, warmth: 1 }),
      pick("함께 해본 경험이 많아 세계가 넓어졌다", { adventure: 4, energy: 1 }),
      pick("처음보다 서로를 더 정확히 이해한다", { sincerity: 3, intellect: 2 }),
    ],
  },
  {
    category: "미래",
    text: "장기적인 계획을 이야기할 때 끌리는 사람은?",
    options: [
      pick("현실적인 숫자와 책임을 피하지 않는다", { steadiness: 4, intellect: 1 }),
      pick("꿈을 말할 때 눈빛과 에너지가 살아난다", { energy: 3, romance: 2 }),
      pick("각자의 목표를 존중하는 구조를 함께 찾는다", { independence: 3, sincerity: 2 }),
    ],
  },
  {
    category: "미래",
    text: "함께 살 공간을 상상한다면 가장 중요한 분위기는?",
    options: [
      pick("돌아오면 마음이 쉬는 안정적인 집", { steadiness: 3, warmth: 2 }),
      pick("둘의 취향이 자연스럽게 섞인 감각적인 공간", { aesthetics: 4, romance: 1 }),
      pick("각자의 작업과 휴식이 존중되는 구조", { independence: 4, intellect: 1 }),
    ],
  },
  {
    category: "미래",
    text: "힘든 시기를 오래 함께 통과하려면 무엇이 필요할까요?",
    options: [
      pick("감정이 약해질 때도 서로를 다정하게 대하는 힘", { warmth: 4, sincerity: 1 }),
      pick("문제를 작게 나누어 꾸준히 해결하는 힘", { steadiness: 4, intellect: 1 }),
      pick("상황을 다르게 보는 유연함과 용기", { adventure: 3, humor: 2 }),
    ],
  },
  {
    category: "미래",
    text: "서로의 커리어를 응원하는 방식으로 가장 좋은 것은?",
    options: [
      pick("성과보다 노력과 방향을 먼저 인정한다", { sincerity: 3, warmth: 2 }),
      pick("필요한 정보와 아이디어를 함께 찾아준다", { intellect: 3, steadiness: 2 }),
      pick("새로운 도전을 무서워하지 않게 북돋운다", { energy: 3, adventure: 2 }),
    ],
  },
  {
    category: "미래",
    text: "나이가 들어도 유지됐으면 하는 매력은?",
    options: [
      pick("사소한 배려가 습관처럼 남아 있는 다정함", { warmth: 4, steadiness: 1 }),
      pick("계속 배우고 질문하는 지적인 생동감", { intellect: 4, adventure: 1 }),
      pick("자기다운 스타일을 잃지 않는 선명함", { independence: 3, aesthetics: 2 }),
    ],
  },
  {
    category: "미래",
    text: "둘이 큰 결정을 내려야 할 때 이상적인 모습은?",
    options: [
      pick("자료를 보고 차분히 장단점을 따진다", { intellect: 4, steadiness: 1 }),
      pick("서로의 마음이 다치지 않게 속도를 맞춘다", { warmth: 3, romance: 2 }),
      pick("결정 후에는 함께 책임지고 움직인다", { sincerity: 3, energy: 2 }),
    ],
  },
  {
    category: "미래",
    text: "관계가 오래될수록 더 좋아졌으면 하는 부분은?",
    options: [
      pick("말하지 않아도 필요한 배려를 알아차린다", { warmth: 3, steadiness: 2 }),
      pick("새로운 주제와 경험으로 대화가 늙지 않는다", { intellect: 3, adventure: 2 }),
      pick("익숙함 속에서도 설레는 표현을 잊지 않는다", { romance: 4, aesthetics: 1 }),
    ],
  },
  {
    category: "미래",
    text: "가족이나 친구에게 소개할 때 자랑하고 싶은 점은?",
    options: [
      pick("사람을 편안하게 만드는 따뜻한 태도", { warmth: 4, sincerity: 1 }),
      pick("어디서든 자기답게 행동하는 당당함", { independence: 4, energy: 1 }),
      pick("말과 행동이 한결같아 믿을 수 있는 점", { steadiness: 4, sincerity: 1 }),
    ],
  },
  {
    category: "미래",
    text: "함께 늦은 밤 미래를 상상한다면 어떤 이야기가 좋나요?",
    options: [
      pick("우리가 지키고 싶은 일상의 온도를 말한다", { warmth: 3, romance: 2 }),
      pick("가보고 싶은 곳과 해보고 싶은 일을 그린다", { adventure: 4, energy: 1 }),
      pick("각자의 꿈이 서로에게 어떤 의미인지 나눈다", { sincerity: 3, intellect: 2 }),
    ],
  },

  {
    category: "여행",
    text: "첫 여행지를 고른다면 어떤 사람이 더 끌리나요?",
    options: [
      pick("교통과 숙소를 안정적으로 확인해 둔다", { steadiness: 4, sincerity: 1 }),
      pick("현지 분위기와 골목의 감각을 중요하게 본다", { aesthetics: 3, adventure: 2 }),
      pick("일단 떠나서 우연한 발견을 즐기자고 한다", { adventure: 4, energy: 1 }),
    ],
  },
  {
    category: "여행",
    text: "여행 중 길을 잃었을 때 가장 좋은 반응은?",
    options: [
      pick("침착하게 현재 위치를 확인하고 안심시킨다", { steadiness: 4, warmth: 1 }),
      pick("예상 밖의 길도 여행의 일부라며 웃는다", { adventure: 3, humor: 2 }),
      pick("현지 사람에게 정중히 물어보며 해결한다", { sincerity: 3, energy: 2 }),
    ],
  },
  {
    category: "여행",
    text: "숙소에서 쉬는 시간에 상대가 무엇을 하면 좋나요?",
    options: [
      pick("서로 피곤한 정도를 살피며 일정을 조절한다", { warmth: 3, steadiness: 2 }),
      pick("오늘 본 풍경을 사진과 글로 정리한다", { aesthetics: 3, sincerity: 2 }),
      pick("내일 해볼 즉흥 코스를 찾아본다", { adventure: 3, energy: 2 }),
    ],
  },
  {
    category: "여행",
    text: "여행 사진을 고를 때 가장 마음에 드는 기준은?",
    options: [
      pick("둘이 자연스럽게 웃는 순간이 담겼다", { warmth: 3, romance: 2 }),
      pick("빛과 배경이 영화처럼 예쁘다", { aesthetics: 4, romance: 1 }),
      pick("실수와 장난까지 보여주는 생생한 장면이다", { humor: 3, adventure: 2 }),
    ],
  },
  {
    category: "여행",
    text: "현지 음식이 낯설 때 어떤 상대가 좋나요?",
    options: [
      pick("내 입맛과 컨디션을 먼저 배려한다", { warmth: 4, steadiness: 1 }),
      pick("조금씩 나눠 먹으며 경험을 넓혀준다", { adventure: 3, romance: 2 }),
      pick("음식의 배경이나 문화를 궁금해한다", { intellect: 3, sincerity: 2 }),
    ],
  },
  {
    category: "여행",
    text: "예산을 정해 여행할 때 끌리는 태도는?",
    options: [
      pick("중요한 곳과 아낄 곳을 현실적으로 나눈다", { steadiness: 4, intellect: 1 }),
      pick("작은 돈으로도 특별한 경험을 찾아낸다", { adventure: 3, aesthetics: 2 }),
      pick("서로 부담되지 않게 솔직히 이야기한다", { sincerity: 4, warmth: 1 }),
    ],
  },
  {
    category: "여행",
    text: "여행 일정이 너무 빡빡해졌을 때 좋은 선택은?",
    options: [
      pick("과감히 줄이고 몸과 마음의 여유를 만든다", { steadiness: 3, warmth: 2 }),
      pick("가장 설레는 하나만 남겨 집중해서 즐긴다", { romance: 3, independence: 2 }),
      pick("즉흥적으로 동선을 바꿔 새로운 재미를 찾는다", { adventure: 4, energy: 1 }),
    ],
  },
  {
    category: "여행",
    text: "공항이나 역에서 기다리는 시간에 끌리는 모습은?",
    options: [
      pick("필요한 서류와 시간을 꼼꼼히 챙긴다", { steadiness: 4, sincerity: 1 }),
      pick("기다림을 작은 데이트처럼 만들어준다", { romance: 3, humor: 2 }),
      pick("낯선 사람과 공간을 관찰하며 이야깃거리를 만든다", { intellect: 3, aesthetics: 2 }),
    ],
  },
  {
    category: "여행",
    text: "돌아오는 길에 어떤 사람이 더 오래 기억될까요?",
    options: [
      pick("여행 내내 내 컨디션을 세심하게 살폈다", { warmth: 4, sincerity: 1 }),
      pick("예상 못 한 순간마다 즐거운 용기를 냈다", { adventure: 4, energy: 1 }),
      pick("여행의 의미를 함께 정리해 깊이를 남겼다", { intellect: 3, romance: 2 }),
    ],
  },
  {
    category: "여행",
    text: "다음 여행을 또 함께 가고 싶어지는 이유는?",
    options: [
      pick("계획과 즉흥의 균형이 편안했다", { steadiness: 3, adventure: 2 }),
      pick("평범한 풍경도 둘만의 장면으로 만들었다", { aesthetics: 3, romance: 2 }),
      pick("어려운 순간에도 서로를 탓하지 않았다", { sincerity: 4, warmth: 1 }),
    ],
  },

  {
    category: "위기",
    text: "내가 갑자기 몸이 안 좋을 때 어떤 사람이 좋나요?",
    options: [
      pick("필요한 약과 휴식을 조용히 챙겨준다", { warmth: 4, steadiness: 1 }),
      pick("병원이나 이동 동선을 빠르게 정리한다", { steadiness: 4, intellect: 1 }),
      pick("불안하지 않게 곁에서 솔직히 상황을 공유한다", { sincerity: 3, warmth: 2 }),
    ],
  },
  {
    category: "위기",
    text: "갑자기 돈이나 일정 문제가 생겼을 때 끌리는 태도는?",
    options: [
      pick("감정적으로 몰아붙이지 않고 사실을 확인한다", { intellect: 3, steadiness: 2 }),
      pick("책임질 부분을 피하지 않고 바로 나선다", { sincerity: 4, energy: 1 }),
      pick("위기 속에서도 서로의 자존심을 지켜준다", { warmth: 3, independence: 2 }),
    ],
  },
  {
    category: "위기",
    text: "내가 큰 실망을 겪은 날 상대에게 가장 바라는 것은?",
    options: [
      pick("조언보다 먼저 내 편이라는 느낌을 준다", { warmth: 4, romance: 1 }),
      pick("상황을 객관적으로 보며 다음 선택을 돕는다", { intellect: 3, steadiness: 2 }),
      pick("다시 움직일 힘이 생기도록 밝은 기운을 준다", { energy: 3, sincerity: 2 }),
    ],
  },
  {
    category: "위기",
    text: "둘 다 지쳐 예민한 날 관계를 지키는 방법은?",
    options: [
      pick("상처 줄 말을 멈추고 잠깐 쉬어간다", { steadiness: 4, warmth: 1 }),
      pick("지금 힘든 이유를 솔직하게 인정한다", { sincerity: 4, intellect: 1 }),
      pick("작은 웃음으로 긴장을 낮춘 뒤 대화한다", { humor: 3, romance: 2 }),
    ],
  },
  {
    category: "위기",
    text: "상대가 실패를 겪었을 때 어떤 모습이 멋있나요?",
    options: [
      pick("남 탓보다 배운 점을 먼저 찾는다", { intellect: 3, sincerity: 2 }),
      pick("무너져도 다시 해보려는 에너지가 있다", { energy: 4, adventure: 1 }),
      pick("약한 모습을 숨기지 않고 나눌 줄 안다", { sincerity: 3, warmth: 2 }),
    ],
  },
  {
    category: "위기",
    text: "중요한 선택 앞에서 내가 흔들릴 때 필요한 상대는?",
    options: [
      pick("내가 진짜 원하는 것을 다시 묻게 해준다", { intellect: 3, sincerity: 2 }),
      pick("실패해도 곁에 있겠다는 안정감을 준다", { warmth: 4, steadiness: 1 }),
      pick("새로운 가능성을 두려워하지 않게 한다", { adventure: 3, energy: 2 }),
    ],
  },
  {
    category: "위기",
    text: "갑작스러운 변화가 생겼을 때 더 믿음직한 사람은?",
    options: [
      pick("우선순위를 정하고 차근차근 처리한다", { steadiness: 4, intellect: 1 }),
      pick("변화를 새로운 기회로 해석한다", { adventure: 4, independence: 1 }),
      pick("사람들의 마음을 살피며 분위기를 안정시킨다", { warmth: 3, sincerity: 2 }),
    ],
  },
  {
    category: "위기",
    text: "내가 자존감이 낮아진 날 듣고 싶은 말은?",
    options: [
      pick("네가 버틴 시간을 내가 알고 있어", { warmth: 4, sincerity: 1 }),
      pick("지금의 결과가 네 가능성 전체는 아니야", { intellect: 3, steadiness: 2 }),
      pick("오늘은 내가 즐겁게 해줄게", { humor: 3, romance: 2 }),
    ],
  },
  {
    category: "위기",
    text: "관계가 권태로워졌다고 느낄 때 필요한 변화는?",
    options: [
      pick("익숙한 루틴 안에서 놓친 배려를 회복한다", { warmth: 3, steadiness: 2 }),
      pick("안 해본 경험으로 관계에 새 공기를 넣는다", { adventure: 4, energy: 1 }),
      pick("서로의 진짜 욕구를 솔직히 다시 묻는다", { sincerity: 3, intellect: 2 }),
    ],
  },
  {
    category: "위기",
    text: "어려운 시간을 지나고 상대에게 더 깊이 끌리는 이유는?",
    options: [
      pick("힘들 때 더 다정해지는 사람이라는 걸 봤다", { warmth: 4, sincerity: 1 }),
      pick("흔들려도 중심을 잃지 않는 태도를 봤다", { steadiness: 4, independence: 1 }),
      pick("위기에서도 웃을 수 있는 여유를 봤다", { humor: 3, energy: 2 }),
    ],
  },
];

const questionBank = questionBlueprints.map((question, index) => ({
  id: `q${index + 1}`,
  ...question,
}));

const questionMap = new Map(questionBank.map((question) => [question.id, question]));

const state = {
  mode: 20,
  current: 0,
  answers: [],
  questionOrder: [],
  started: false,
  resultToken: 0,
  targetGender: "woman",
  targetAgeRange: "20s",
  selectedPortrait: null,
};

const portraitAssets = {
  basePath: "/assets/portraits-webp",
  variantCount: 5,
  ageRanges: ["teens", "20s", "30s"],
  anyAgeRanges: ["20s", "30s"],
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
  imageStatus: document.querySelector("#imageStatus"),
  portraitCanvas: document.querySelector("#portraitCanvas"),
  downloadButton: document.querySelector("#downloadButton"),
  sharePortraitButton: document.querySelector("#sharePortraitButton"),
  sharePlacardButton: document.querySelector("#sharePlacardButton"),
  restartButton: document.querySelector("#restartButton"),
  restartTopButton: document.querySelector("#restartTopButton"),
};

function activeQuestions() {
  if (state.questionOrder.length !== state.mode) {
    prepareQuestionRun();
  }

  return state.questionOrder.map((id) => questionMap.get(id)).filter(Boolean);
}

function prepareQuestionRun() {
  const questions = [...questionBank];
  for (let index = questions.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [questions[index], questions[swapIndex]] = [questions[swapIndex], questions[index]];
  }
  state.questionOrder = questions.slice(0, state.mode).map((question) => question.id);
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
  prepareQuestionRun();
  state.started = false;
  state.selectedPortrait = null;
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
  prepareQuestionRun();
  state.answers = [];
  state.selectedPortrait = null;
  state.started = true;
  state.current = 0;
  showScreen("question");
  renderQuestion();
  renderProgress();
}

function resetQuiz() {
  state.current = 0;
  state.answers = [];
  prepareQuestionRun();
  state.started = false;
  state.selectedPortrait = null;
  state.resultToken += 1;
  setPortraitActionsDisabled(false);
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
  return [
    "Create one fictional photorealistic Korean dating-profile portrait.",
    makeTargetPrompt(),
    promptParts.join(", "),
    "head-and-shoulders studio portrait, modern Korean styling, natural facial proportions, realistic skin texture, soft daylight, shallow depth of field, tasteful fashion styling",
    "The person must look exactly within the selected age range.",
    "No celebrity likeness, no real person, no readable text, no watermark, no extra people, no cartoon, no anime, no glamour over-retouching.",
  ]
    .filter(Boolean)
    .join(" ");
}

function makeTargetPrompt() {
  const gender = preferenceMeta.gender[state.targetGender] || preferenceMeta.gender.woman;
  const ageRange = preferenceMeta.ageRange[state.targetAgeRange] || preferenceMeta.ageRange["20s"];
  return [gender.prompt, ageRange.prompt, ageRange.guard].filter(Boolean).join(", ");
}

function showResult() {
  state.resultToken += 1;
  const resultToken = state.resultToken;
  const profile = buildProfile();
  els.resultTitle.textContent = profile.title;
  els.resultSummary.textContent = profile.summary;
  renderTraitList(profile.scores);
  setPortraitActionsDisabled(true);
  setImageStatus("generating", "결과 타입에 맞는 사진 5장 중 하나를 고르는 중이에요");
  drawPortrait(profile, resultToken);
  showScreen("result");
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

async function drawPortrait(profile, resultToken = state.resultToken) {
  const selected = selectPortraitAsset(profile);
  state.selectedPortrait = selected;

  try {
    const image = await loadPortraitImage(selected.src);
    if (resultToken !== state.resultToken) return;

    drawPortraitImage(image);
    setImageStatus("generated", makePortraitStatus(selected));
  } catch (error) {
    console.warn("Portrait asset failed; using canvas fallback:", selected, error);
    if (resultToken !== state.resultToken) return;

    drawFallbackPortrait(profile);
    setImageStatus("fallback", "사진 파일을 불러오지 못해 브라우저 canvas 이미지로 보여줘요");
  } finally {
    if (resultToken === state.resultToken) {
      setPortraitActionsDisabled(false);
    }
  }
}

function selectPortraitAsset(profile) {
  const topTrait = profile.top?.[0]?.key && traitMeta[profile.top[0].key] ? profile.top[0].key : "warmth";
  const gender = preferenceMeta.gender[state.targetGender] ? state.targetGender : "woman";
  const ageRange = selectPortraitAgeRange();
  const variant = Math.floor(Math.random() * portraitAssets.variantCount) + 1;
  const variantName = String(variant).padStart(3, "0");

  return {
    trait: topTrait,
    gender,
    ageRange,
    variant,
    variantName,
    src: `${portraitAssets.basePath}/${topTrait}/${gender}/${ageRange}/${variantName}.webp`,
  };
}

function selectPortraitAgeRange() {
  if (portraitAssets.ageRanges.includes(state.targetAgeRange)) {
    return state.targetAgeRange;
  }

  const candidates = state.targetAgeRange === "any" ? portraitAssets.anyAgeRanges : portraitAssets.ageRanges;
  return candidates[Math.floor(Math.random() * candidates.length)] || "20s";
}

function loadPortraitImage(src) {
  return new Promise((resolve, reject) => {
    if (typeof Image === "undefined") {
      reject(new Error("Image API is unavailable."));
      return;
    }

    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Failed to load portrait asset: ${src}`));
    image.src = src;
  });
}

function drawPortraitImage(image) {
  const canvas = els.portraitCanvas;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const imageWidth = image.naturalWidth || image.width;
  const imageHeight = image.naturalHeight || image.height;
  const scale = Math.max(width / imageWidth, height / imageHeight);
  const drawWidth = imageWidth * scale;
  const drawHeight = imageHeight * scale;
  const x = (width - drawWidth) / 2;
  const y = (height - drawHeight) / 2;

  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(image, x, y, drawWidth, drawHeight);
}

function makePortraitStatus(selected) {
  const trait = traitMeta[selected.trait]?.label || selected.trait;
  const gender = preferenceMeta.gender[selected.gender]?.label || selected.gender;
  const ageRange = preferenceMeta.ageRange[selected.ageRange]?.label || selected.ageRange;
  return `${trait} · ${gender} · ${ageRange} 사진 ${selected.variantName}/005`;
}

function drawFallbackPortrait(profile) {
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
    teens: -4,
    "20s": 0,
    "30s": 10,
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

function setPortraitActionsDisabled(disabled) {
  [els.downloadButton, els.sharePortraitButton, els.sharePlacardButton].forEach((button) => {
    if (button) {
      button.disabled = disabled;
    }
  });
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
  prepareQuestionRun();
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
  downloadCanvas(els.portraitCanvas, makePortraitFilename("ideal-type"));
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
    filename: makePortraitFilename("my-ideal-type-photo"),
    title: "나의 이상형",
    text: "나의 이상형 사진이에요.",
    button: els.sharePortraitButton,
  });
}

function makePortraitFilename(prefix) {
  const selected = state.selectedPortrait;
  if (!selected) {
    return `${prefix}.png`;
  }
  return `${prefix}-${selected.trait}-${selected.gender}-${selected.ageRange}-${selected.variantName}.png`;
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

  const noteY = Math.min(y + 28, height - 150);
  ctx.fillStyle = "rgba(33,183,168,0.1)";
  roundedRect(ctx, 94, noteY, width - 188, 64, 18);
  ctx.fill();
  ctx.fillStyle = "rgba(36,33,43,0.62)";
  ctx.font = "800 22px system-ui, sans-serif";
  drawWrappedText(ctx, "검사 내용은 어디에도 저장되지 않고 결과 표시 후 파기돼요. 결과 저장용 DB 자체도 존재하지 않아요.", 120, noteY + 40, width - 240, 28, 2);

  return canvas;
}

function getPreferenceSummary() {
  const gender = preferenceMeta.gender[state.targetGender] || preferenceMeta.gender.woman;
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

setMode(20);
