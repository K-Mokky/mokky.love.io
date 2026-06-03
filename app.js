const traitMeta = {
  warmth: {
    label: "다정함",
    phrase: "따뜻한 눈빛",
    prompt: "warm attentive gaze, gentle closed-mouth smile, relaxed shoulders, approachable body language, soft pastel styling",
    color: "#ff6f9f",
  },
  energy: {
    label: "활기",
    phrase: "밝은 리듬",
    prompt: "bright energetic presence, lively eyes, fresh confident smile, crisp casual outfit, subtle motion in hair or posture",
    color: "#f4b63f",
  },
  humor: {
    label: "유머",
    phrase: "장난기 있는 미소",
    prompt: "playful asymmetrical smile, witty charm, expressive eyebrows, friendly teasing mood, lighthearted profile-photo energy",
    color: "#21b7a8",
  },
  intellect: {
    label: "지성",
    phrase: "차분한 집중력",
    prompt: "thoughtful focused eyes, refined intellectual mood, composed expression, minimal elegant styling, quiet depth",
    color: "#5777e8",
  },
  steadiness: {
    label: "안정감",
    phrase: "믿음직한 분위기",
    prompt: "calm composed posture, grounded presence, steady eye contact, neat timeless outfit, dependable gentle confidence",
    color: "#6abf69",
  },
  aesthetics: {
    label: "감각",
    phrase: "세련된 취향",
    prompt: "stylish details, artful outfit coordination, tasteful accessories, balanced color palette, fashion-editorial polish without looking staged",
    color: "#b56cff",
  },
  romance: {
    label: "로맨스",
    phrase: "부드러운 설렘",
    prompt: "soft romantic lighting, tender eye contact, delicate smile, warm highlights on skin and hair, dreamy but realistic atmosphere",
    color: "#ff8bbb",
  },
  independence: {
    label: "자기색",
    phrase: "선명한 자기만의 결",
    prompt: "confident unique styling, distinctive personal taste, self-possessed expression, slightly unconventional detail, modern individuality",
    color: "#2b2d42",
  },
  adventure: {
    label: "모험심",
    phrase: "가벼운 발걸음",
    prompt: "free-spirited casual style, outdoorsy ease, open curious expression, travel-ready layers, natural wind-swept texture",
    color: "#ff7a45",
  },
  sincerity: {
    label: "진정성",
    phrase: "솔직하고 깊은 태도",
    prompt: "honest expression, sincere presence, unguarded eyes, natural imperfect smile, intimate trustworthy profile-photo mood",
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

const traitResultCopy = {
  warmth: {
    core: "상대가 먼저 마음을 데워주고, 작은 배려를 행동으로 보여줄 때 빠르게 안정감을 느끼는 편이에요.",
    detail: "무심한 설렘보다 눈빛·안부·생활 속 챙김처럼 체감되는 온기를 중요하게 봐요.",
    low: "다정함을 무조건 많이 요구하기보다 다른 강점과 균형을 맞춰 보는 흐름이에요.",
  },
  energy: {
    core: "밝은 리듬과 생동감이 있는 사람에게 끌려요.",
    detail: "대화나 데이트가 정체되지 않고, 같이 있으면 하루가 조금 더 가벼워지는 타입을 선호해요.",
    low: "항상 텐션 높은 사람보다는 필요한 순간에만 에너지가 살아나는 쪽이 편할 수 있어요.",
  },
  humor: {
    core: "어색한 순간을 웃음으로 바꾸는 재치에 마음이 움직여요.",
    detail: "가벼운 농담만이 아니라 서로의 긴장을 낮추는 센스와 둘만의 코드가 중요해요.",
    low: "웃김 하나만으로 관계를 끌고 가는 타입보다는 맥락 있는 위트를 선호하는 편이에요.",
  },
  intellect: {
    core: "생각의 깊이와 대화의 밀도가 있는 사람에게 호감이 커져요.",
    detail: "질문을 잘하고, 문제를 정리하며, 취향과 가치관을 말로 설명할 수 있는 사람에게 끌려요.",
    low: "논리만 앞세우는 관계보다 감정의 온도와 함께 있을 때 더 잘 맞아요.",
  },
  steadiness: {
    core: "예측 가능한 태도와 책임감에서 큰 매력을 느껴요.",
    detail: "말과 행동이 꾸준히 맞고, 갈등이나 일정 변화에서도 중심을 잃지 않는 사람이 오래 남아요.",
    low: "안정감이 낮게 나왔다면 너무 계획적인 사람보다 여유와 즉흥성이 섞인 상대가 더 편할 수 있어요.",
  },
  aesthetics: {
    core: "취향이 보이는 외모와 분위기, 세심한 디테일에 강하게 반응해요.",
    detail: "얼굴상·스타일·사진 분위기처럼 첫인상에서 느껴지는 감각적 완성도가 결과에 크게 반영됐어요.",
    low: "겉으로 보이는 완성도보다 실제 관계에서 느껴지는 태도를 더 우선할 수 있어요.",
  },
  romance: {
    core: "일상을 장면처럼 기억하게 만드는 낭만에 마음이 열려요.",
    detail: "표현을 아끼지 않고, 사소한 순간에도 설렘을 남기는 사람에게 오래 끌려요.",
    low: "큰 이벤트보다 편안함과 현실감을 더 중시하는 쪽으로 읽혀요.",
  },
  independence: {
    core: "자기 세계가 분명하고 쉽게 휘둘리지 않는 사람에게 끌려요.",
    detail: "도도함, 선명한 스타일, 독립적인 생활 리듬처럼 ‘자기다움’이 느껴질수록 호감이 커져요.",
    low: "강한 개성보다 함께 맞춰가는 안정적인 호흡을 더 편하게 느낄 수 있어요.",
  },
  adventure: {
    core: "새로운 경험을 두려워하지 않는 가벼운 추진력에 끌려요.",
    detail: "계획 밖의 상황도 추억으로 바꾸고, 관계에 새로운 공기를 넣어주는 사람을 좋게 봐요.",
    low: "큰 변화보다 익숙하고 예측 가능한 데이트 흐름이 더 안정적으로 느껴질 수 있어요.",
  },
  sincerity: {
    core: "말의 화려함보다 진심이 보이는 태도에 마음을 줘요.",
    detail: "사과, 경청, 기억해주는 행동처럼 관계의 신뢰를 쌓는 장면을 중요하게 봐요.",
    low: "진지함만 강한 관계보다 가벼운 즐거움이나 감각적 끌림도 함께 필요해 보여요.",
  },
};

function pick(label, scores) {
  return { label, scores };
}

const appearanceCategory = "외모 취향";
const portraitAppearanceWeight = 0.5;
const targetAppearanceQuestionShare = 0.5;
const quizModes = [20, 50, 80];

const questionBlueprints = [
  {
    "category": "외모 취향",
    "text": "이상형이 얼굴상으로 보인다면, 어떤 분위기였으면 좋겠나요?",
    "options": [
      {
        "label": "여우상처럼 눈매가 길고 영리한 분위기",
        "scores": {
          "aesthetics": 3,
          "independence": 2
        }
      },
      {
        "label": "늑대상처럼 선이 또렷하고 강단 있는 분위기",
        "scores": {
          "independence": 3,
          "steadiness": 2
        }
      },
      {
        "label": "공룡상처럼 큼직하고 장난기 있는 분위기",
        "scores": {
          "energy": 3,
          "humor": 2
        }
      },
      {
        "label": "강아지상처럼 웃는 인상이 편하고 선한 분위기",
        "scores": {
          "warmth": 3,
          "sincerity": 2
        }
      }
    ]
  },
  {
    "category": "외모 취향",
    "text": "이상형과 처음 눈이 마주친다면, 어떤 눈매였으면 좋겠나요?",
    "options": [
      {
        "label": "끝선이 살짝 올라가 시크하고 또렷한 눈매",
        "scores": {
          "aesthetics": 3,
          "independence": 2
        }
      },
      {
        "label": "둥글고 맑아서 경계가 풀리는 선한 눈매",
        "scores": {
          "warmth": 3,
          "sincerity": 2
        }
      }
    ]
  },
  {
    "category": "외모 취향",
    "text": "이상형의 눈빛을 떠올린다면, 어떤 온도였으면 좋겠나요?",
    "options": [
      {
        "label": "차분하게 깊어서 생각을 읽고 싶어지는 눈빛",
        "scores": {
          "intellect": 3,
          "steadiness": 2
        }
      },
      {
        "label": "밝게 반짝여서 바로 말을 걸고 싶어지는 눈빛",
        "scores": {
          "energy": 3,
          "humor": 2
        }
      }
    ]
  },
  {
    "category": "외모 취향",
    "text": "이상형이 웃는다면, 어떤 미소였으면 좋겠나요?",
    "options": [
      {
        "label": "입꼬리가 살짝 올라가 장난스럽게 설레는 미소",
        "scores": {
          "humor": 3,
          "romance": 2
        }
      },
      {
        "label": "활짝 웃을 때 주변 공기까지 부드러워지는 미소",
        "scores": {
          "energy": 3,
          "humor": 2
        }
      }
    ]
  },
  {
    "category": "외모 취향",
    "text": "이상형의 얼굴선을 본다면, 어떤 윤곽이었으면 좋겠나요?",
    "options": [
      {
        "label": "선이 날렵해서 도시적이고 세련된 윤곽",
        "scores": {
          "aesthetics": 3,
          "intellect": 2
        }
      },
      {
        "label": "선이 부드러워 오래 볼수록 편안한 윤곽",
        "scores": {
          "warmth": 3,
          "steadiness": 2
        }
      }
    ]
  },
  {
    "category": "외모 취향",
    "text": "이상형의 첫인상을 떠올린다면, 어떤 표정이었으면 좋겠나요?",
    "options": [
      {
        "label": "조금 도도해서 쉽게 읽히지 않는 표정",
        "scores": {
          "independence": 3,
          "aesthetics": 2
        }
      },
      {
        "label": "처음부터 마음을 열어주는 순한 표정",
        "scores": {
          "warmth": 3,
          "sincerity": 2
        }
      }
    ]
  },
  {
    "category": "외모 취향",
    "text": "이상형의 피부와 인상을 함께 본다면, 어떤 결이었으면 좋겠나요?",
    "options": [
      {
        "label": "깨끗하고 단정해서 자기관리가 느껴지는 결",
        "scores": {
          "intellect": 3,
          "steadiness": 2
        }
      },
      {
        "label": "자연스럽고 생기 있어 가까이서 더 좋아지는 결",
        "scores": {
          "energy": 3,
          "romance": 2
        }
      }
    ]
  },
  {
    "category": "외모 취향",
    "text": "이상형의 헤어스타일을 고른다면, 어떤 매력이었으면 좋겠나요?",
    "options": [
      {
        "label": "정돈된 라인과 깔끔한 실루엣",
        "scores": {
          "steadiness": 3,
          "intellect": 2
        }
      },
      {
        "label": "살짝 흐트러져도 자연스러운 질감",
        "scores": {
          "romance": 3,
          "adventure": 2
        }
      }
    ]
  },
  {
    "category": "외모 취향",
    "text": "이상형의 헤어 분위기를 떠올린다면, 어떤 인상이었으면 좋겠나요?",
    "options": [
      {
        "label": "차분하고 고급스러워 분위기를 잡아주는 무드",
        "scores": {
          "aesthetics": 3,
          "steadiness": 2
        }
      },
      {
        "label": "밝고 변화가 있어 볼 때마다 새로워지는 무드",
        "scores": {
          "energy": 3,
          "independence": 2
        }
      }
    ]
  },
  {
    "category": "외모 취향",
    "text": "이상형의 옷차림을 고른다면, 어떤 무드였으면 좋겠나요?",
    "options": [
      {
        "label": "미니멀하고 단정한 셔츠·니트 계열",
        "scores": {
          "intellect": 3,
          "steadiness": 2
        }
      },
      {
        "label": "포인트가 있는 키치하거나 유니크한 계열",
        "scores": {
          "independence": 3,
          "humor": 2
        }
      },
      {
        "label": "부드러운 색감의 로맨틱한 데이트룩",
        "scores": {
          "romance": 3,
          "warmth": 2
        }
      },
      {
        "label": "활동성이 느껴지는 캐주얼·스포티 계열",
        "scores": {
          "energy": 3,
          "adventure": 2
        }
      }
    ]
  },
  {
    "category": "외모 취향",
    "text": "이상형의 옷 핏을 본다면, 어떤 느낌이었으면 좋겠나요?",
    "options": [
      {
        "label": "각이 살아 있어 단정하고 믿음직한 핏",
        "scores": {
          "intellect": 3,
          "steadiness": 2
        }
      },
      {
        "label": "편안하게 몸에 맞아 같이 걷고 싶은 핏",
        "scores": {
          "adventure": 3,
          "sincerity": 2
        }
      }
    ]
  },
  {
    "category": "외모 취향",
    "text": "이상형에게 어울리는 색을 고른다면, 어떤 색감이었으면 좋겠나요?",
    "options": [
      {
        "label": "블랙·네이비·그레이처럼 선명한 무채색",
        "scores": {
          "independence": 3,
          "intellect": 2
        }
      },
      {
        "label": "크림·핑크·브라운처럼 따뜻한 부드러운 색",
        "scores": {
          "romance": 3,
          "humor": 2
        }
      }
    ]
  },
  {
    "category": "외모 취향",
    "text": "이상형의 액세서리를 떠올린다면, 어떤 디테일이었으면 좋겠나요?",
    "options": [
      {
        "label": "거의 없지만 전체가 정돈되어 보이는 절제",
        "scores": {
          "intellect": 3,
          "sincerity": 2
        }
      },
      {
        "label": "작은 반지·안경·향처럼 기억나는 포인트",
        "scores": {
          "aesthetics": 3,
          "humor": 2
        }
      }
    ]
  },
  {
    "category": "외모 취향",
    "text": "이상형의 실루엣을 본다면, 어떤 타입이었으면 좋겠나요?",
    "options": [
      {
        "label": "가볍고 슬림해서 움직임이 민첩해 보이는 실루엣",
        "scores": {
          "adventure": 3,
          "aesthetics": 2
        }
      },
      {
        "label": "탄탄하고 안정적이라 기대고 싶어지는 실루엣",
        "scores": {
          "steadiness": 2,
          "sincerity": 3
        }
      }
    ]
  },
  {
    "category": "외모 취향",
    "text": "이상형의 체형이 주는 분위기를 고른다면, 어떤 느낌이었으면 좋겠나요?",
    "options": [
      {
        "label": "선이 길고 시원해 사진에서 바로 눈에 띄는 분위기",
        "scores": {
          "aesthetics": 3,
          "energy": 2
        }
      },
      {
        "label": "포근하고 균형 있어 실제로 보면 더 편한 분위기",
        "scores": {
          "warmth": 3,
          "steadiness": 2
        }
      }
    ]
  },
  {
    "category": "외모 취향",
    "text": "이상형의 키와 비율을 떠올린다면, 어떤 균형이었으면 좋겠나요?",
    "options": [
      {
        "label": "멀리서도 눈에 띄는 긴 비율과 존재감",
        "scores": {
          "independence": 3,
          "aesthetics": 2
        }
      },
      {
        "label": "내 옆에 섰을 때 자연스럽게 맞는 균형감",
        "scores": {
          "romance": 3,
          "warmth": 2
        }
      }
    ]
  },
  {
    "category": "외모 취향",
    "text": "이상형이 걸어오는 모습을 본다면, 어떤 자세였으면 좋겠나요?",
    "options": [
      {
        "label": "허리가 곧고 여유 있어 차분한 신뢰가 생긴다",
        "scores": {
          "intellect": 3,
          "steadiness": 2
        }
      },
      {
        "label": "걸음이 가볍고 리듬이 살아 함께 움직이고 싶다",
        "scores": {
          "energy": 3,
          "adventure": 2
        }
      }
    ]
  },
  {
    "category": "외모 취향",
    "text": "이상형의 손짓을 본다면, 어떤 제스처였으면 좋겠나요?",
    "options": [
      {
        "label": "섬세하고 조심스러워 배려가 느껴지는 움직임",
        "scores": {
          "warmth": 3,
          "sincerity": 2
        }
      },
      {
        "label": "시원시원하고 자신감 있어 분위기를 여는 움직임",
        "scores": {
          "energy": 3,
          "adventure": 2
        }
      }
    ]
  },
  {
    "category": "외모 취향",
    "text": "이상형의 목소리까지 상상한다면, 어떤 첫인상이었으면 좋겠나요?",
    "options": [
      {
        "label": "낮고 차분해서 얼굴 분위기와 안정적으로 맞는 결",
        "scores": {
          "intellect": 3,
          "steadiness": 2
        }
      },
      {
        "label": "맑고 밝아서 표정까지 더 생기 있어 보이는 결",
        "scores": {
          "energy": 3,
          "humor": 2
        }
      }
    ]
  },
  {
    "category": "외모 취향",
    "text": "이상형의 프로필 사진을 본다면, 어떤 한 장이었으면 좋겠나요?",
    "options": [
      {
        "label": "구도와 빛이 깔끔해서 완성도가 높은 사진",
        "scores": {
          "aesthetics": 3,
          "intellect": 2
        }
      },
      {
        "label": "일상 스냅처럼 자연스러워 실제 성격이 보이는 사진",
        "scores": {
          "sincerity": 3,
          "adventure": 2
        }
      }
    ]
  },
  {
    "category": "외모 취향",
    "text": "이상형의 정면 사진을 본다면, 어떤 포인트가 먼저 보였으면 좋겠나요?",
    "options": [
      {
        "label": "눈·코·입의 선이 또렷하게 잡힌 균형",
        "scores": {
          "aesthetics": 3,
          "steadiness": 2
        }
      },
      {
        "label": "표정이 부드러워 말 걸기 쉬운 분위기",
        "scores": {
          "warmth": 3,
          "romance": 2
        }
      }
    ]
  },
  {
    "category": "외모 취향",
    "text": "이상형의 옆모습을 본다면, 어떤 라인이 오래 남았으면 좋겠나요?",
    "options": [
      {
        "label": "콧대와 턱선이 이어지는 선명한 라인",
        "scores": {
          "aesthetics": 3,
          "independence": 2
        }
      },
      {
        "label": "입매와 볼선이 부드럽게 남기는 온기",
        "scores": {
          "romance": 3,
          "humor": 2
        }
      }
    ]
  },
  {
    "category": "외모 취향",
    "text": "이상형이 웃을 때를 떠올린다면, 어떤 디테일이 설렜으면 좋겠나요?",
    "options": [
      {
        "label": "눈이 먼저 웃어서 표정 전체가 풀리는 디테일",
        "scores": {
          "warmth": 3,
          "sincerity": 2
        }
      },
      {
        "label": "입꼬리와 눈썹이 같이 움직여 장난기가 도는 디테일",
        "scores": {
          "humor": 3,
          "energy": 2
        }
      }
    ]
  },
  {
    "category": "외모 취향",
    "text": "이상형의 메이크업이나 그루밍을 본다면, 어떤 방향이었으면 좋겠나요?",
    "options": [
      {
        "label": "티 나지 않게 자연스럽지만 깔끔한 방향",
        "scores": {
          "sincerity": 3,
          "intellect": 2
        }
      },
      {
        "label": "선명한 포인트로 자기 분위기를 드러내는 방향",
        "scores": {
          "independence": 3,
          "aesthetics": 2
        }
      }
    ]
  },
  {
    "category": "외모 취향",
    "text": "이상형이 안경을 쓴다면, 어떤 프레임이 어울렸으면 좋겠나요?",
    "options": [
      {
        "label": "지적인 분위기를 더해주는 얇고 단정한 프레임",
        "scores": {
          "intellect": 3,
          "aesthetics": 2
        }
      },
      {
        "label": "인상을 부드럽게 만들어주는 둥근 프레임",
        "scores": {
          "warmth": 3,
          "romance": 2
        }
      }
    ]
  },
  {
    "category": "외모 취향",
    "text": "이상형에게 향이 난다면, 어떤 이미지로 기억됐으면 좋겠나요?",
    "options": [
      {
        "label": "비누향처럼 깨끗하고 가까이 있어도 편한 이미지",
        "scores": {
          "warmth": 3,
          "steadiness": 2
        }
      },
      {
        "label": "우디향처럼 기억에 남고 취향이 선명한 이미지",
        "scores": {
          "aesthetics": 3,
          "independence": 2
        }
      }
    ]
  },
  {
    "category": "외모 취향",
    "text": "이상형의 계절감을 상상한다면, 어떤 스타일이었으면 좋겠나요?",
    "options": [
      {
        "label": "폭신한 니트가 잘 어울리는 따뜻한 겨울 분위기",
        "scores": {
          "warmth": 3,
          "romance": 2
        }
      },
      {
        "label": "가벼운 셔츠가 잘 어울리는 산뜻한 봄 분위기",
        "scores": {
          "energy": 3,
          "adventure": 2
        }
      }
    ]
  },
  {
    "category": "외모 취향",
    "text": "이상형의 데이트룩을 고른다면, 어떤 완성도였으면 좋겠나요?",
    "options": [
      {
        "label": "꾸민 듯 안 꾸민 듯 자연스럽게 좋은 완성도",
        "scores": {
          "sincerity": 3,
          "adventure": 2
        }
      },
      {
        "label": "만남을 위해 신경 쓴 티가 나는 선명한 완성도",
        "scores": {
          "romance": 3,
          "energy": 2
        }
      }
    ]
  },
  {
    "category": "외모 취향",
    "text": "이상형이 편한 복장이라면, 어떤 매력이 보였으면 좋겠나요?",
    "options": [
      {
        "label": "건강하고 활기 있어 같이 움직이고 싶은 매력",
        "scores": {
          "energy": 3,
          "adventure": 2
        }
      },
      {
        "label": "힘을 뺀 모습에서도 흐트러지지 않는 편안한 매력",
        "scores": {
          "adventure": 3,
          "sincerity": 2
        }
      }
    ]
  },
  {
    "category": "외모 취향",
    "text": "이상형이 사진을 찍는다면, 어떤 포즈였으면 좋겠나요?",
    "options": [
      {
        "label": "정면을 자연스럽게 바라보는 차분한 포즈",
        "scores": {
          "sincerity": 3,
          "intellect": 2
        }
      },
      {
        "label": "몸을 살짝 틀거나 움직임이 느껴지는 자유로운 포즈",
        "scores": {
          "adventure": 3,
          "humor": 2
        }
      }
    ]
  },
  {
    "category": "외모 취향",
    "text": "이상형이 카메라를 본다면, 어떤 시선이었으면 좋겠나요?",
    "options": [
      {
        "label": "직선적으로 바라봐 자신감이 느껴지는 시선",
        "scores": {
          "independence": 3,
          "energy": 2
        }
      },
      {
        "label": "살짝 수줍게 바라봐 여운이 남는 시선",
        "scores": {
          "romance": 3,
          "warmth": 2
        }
      }
    ]
  },
  {
    "category": "외모 취향",
    "text": "이상형이 동물이라면, 어떤 동물이었으면 좋겠나요?",
    "options": [
      {
        "label": "고양이상처럼 조용하지만 시선이 가는 분위기",
        "scores": {
          "aesthetics": 3,
          "independence": 2
        }
      },
      {
        "label": "토끼상처럼 맑고 보호본능을 자극하는 분위기",
        "scores": {
          "romance": 3,
          "humor": 2
        }
      },
      {
        "label": "곰상처럼 든든하고 포근한 분위기",
        "scores": {
          "steadiness": 2,
          "sincerity": 3
        }
      },
      {
        "label": "사슴상처럼 선하고 섬세한 분위기",
        "scores": {
          "sincerity": 3,
          "intellect": 2
        }
      }
    ]
  },
  {
    "category": "외모 취향",
    "text": "이상형의 턱선과 볼선을 본다면, 어떤 느낌이었으면 좋겠나요?",
    "options": [
      {
        "label": "턱선이 선명해서 인상이 또렷해지는 쪽",
        "scores": {
          "independence": 3,
          "aesthetics": 2
        }
      },
      {
        "label": "볼선이 부드러워 인상이 순해지는 쪽",
        "scores": {
          "warmth": 3,
          "romance": 2
        }
      }
    ]
  },
  {
    "category": "외모 취향",
    "text": "이상형의 눈썹이 인상을 만든다면, 어떤 분위기였으면 좋겠나요?",
    "options": [
      {
        "label": "진하고 선명해서 표정에 힘이 생기는 눈썹",
        "scores": {
          "energy": 3,
          "independence": 2
        }
      },
      {
        "label": "부드러운 아치로 인상을 편하게 만드는 눈썹",
        "scores": {
          "sincerity": 3,
          "intellect": 2
        }
      }
    ]
  },
  {
    "category": "외모 취향",
    "text": "이상형이 말하기 직전이라면, 어떤 입매였으면 좋겠나요?",
    "options": [
      {
        "label": "단정하게 닫혀 있어 차분함이 느껴지는 입매",
        "scores": {
          "intellect": 3,
          "sincerity": 2
        }
      },
      {
        "label": "곧 웃을 것처럼 부드럽게 풀린 입매",
        "scores": {
          "romance": 3,
          "humor": 2
        }
      }
    ]
  },
  {
    "category": "외모 취향",
    "text": "이상형의 헤어 컬러를 고른다면, 어떤 톤이었으면 좋겠나요?",
    "options": [
      {
        "label": "자연 흑갈색처럼 안정적으로 잘 어울리는 톤",
        "scores": {
          "sincerity": 3,
          "intellect": 2
        }
      },
      {
        "label": "브라운·애쉬처럼 분위기를 바꾸는 세련된 톤",
        "scores": {
          "aesthetics": 3,
          "independence": 2
        }
      }
    ]
  },
  {
    "category": "외모 취향",
    "text": "이상형을 조명 아래에서 본다면, 어떤 분위기로 보였으면 좋겠나요?",
    "options": [
      {
        "label": "대비가 선명해 이목구비가 또렷해지는 조명",
        "scores": {
          "aesthetics": 3,
          "intellect": 2
        }
      },
      {
        "label": "따뜻한 빛으로 표정의 온기가 살아나는 조명",
        "scores": {
          "warmth": 3,
          "romance": 2
        }
      }
    ]
  },
  {
    "category": "외모 취향",
    "text": "이상형의 사진 배경까지 고른다면, 어떤 이미지였으면 좋겠나요?",
    "options": [
      {
        "label": "도시적인 카페나 거리와 잘 맞는 세련된 이미지",
        "scores": {
          "aesthetics": 3,
          "independence": 2
        }
      },
      {
        "label": "공원이나 여행지와 잘 맞는 자연스러운 이미지",
        "scores": {
          "adventure": 3,
          "energy": 2
        }
      }
    ]
  },
  {
    "category": "외모 취향",
    "text": "이상형의 사진을 여러 장 본다면, 어떤 타입으로 느껴졌으면 좋겠나요?",
    "options": [
      {
        "label": "한 장만 봐도 임팩트가 강한 첫눈형",
        "scores": {
          "independence": 3,
          "aesthetics": 2
        }
      },
      {
        "label": "여러 장을 볼수록 매력이 쌓이는 볼수록형",
        "scores": {
          "sincerity": 3,
          "intellect": 2
        }
      }
    ]
  },
  {
    "category": "외모 취향",
    "text": "이상형의 외모가 기억에 남는다면, 어떤 매력이었으면 좋겠나요?",
    "options": [
      {
        "label": "한눈에 설명되는 선명한 매력",
        "scores": {
          "aesthetics": 3,
          "energy": 2
        }
      },
      {
        "label": "볼수록 마음이 가는 자연스러운 여운",
        "scores": {
          "romance": 3,
          "sincerity": 2
        }
      }
    ]
  },
  {
    "category": "첫만남",
    "text": "이상형이 약속 장소에 먼저 도착했다면, 어떤 행동을 했으면 좋겠나요?",
    "options": [
      {
        "label": "위치와 상황을 알려주며 편하게 오라고 배려한다",
        "scores": {
          "warmth": 3,
          "steadiness": 2
        }
      },
      {
        "label": "주변을 살펴 분위기 좋은 자리를 먼저 찾아둔다",
        "scores": {
          "aesthetics": 3,
          "energy": 2
        }
      }
    ]
  },
  {
    "category": "첫만남",
    "text": "이상형이 첫 대화를 시작한다면, 어떤 방식이었으면 좋겠나요?",
    "options": [
      {
        "label": "내 이야기를 자연스럽게 꺼내게 하는 질문을 건넨다",
        "scores": {
          "intellect": 3,
          "sincerity": 2
        }
      },
      {
        "label": "작은 농담으로 어색함을 빠르게 풀어준다",
        "scores": {
          "humor": 3,
          "energy": 2
        }
      }
    ]
  },
  {
    "category": "첫만남",
    "text": "이상형을 낯선 모임에서 본다면, 어떤 순간에 시선이 갔으면 좋겠나요?",
    "options": [
      {
        "label": "혼자 있는 사람을 눈치껏 챙겨 분위기를 부드럽게 한다",
        "scores": {
          "warmth": 3,
          "sincerity": 2
        }
      },
      {
        "label": "자기 의견을 조용하지만 분명하게 말해 존재감이 남는다",
        "scores": {
          "intellect": 3,
          "independence": 2
        }
      }
    ]
  },
  {
    "category": "첫만남",
    "text": "이상형과 취향이 다르다면, 어떤 반응을 보여줬으면 좋겠나요?",
    "options": [
      {
        "label": "왜 좋아하는지 진심으로 궁금해하며 들어본다",
        "scores": {
          "sincerity": 3,
          "intellect": 2
        }
      },
      {
        "label": "다름을 귀엽게 받아들이며 웃음 포인트로 만든다",
        "scores": {
          "humor": 3,
          "energy": 2
        }
      }
    ]
  },
  {
    "category": "첫만남",
    "text": "이상형과 첫 만남을 마치고 돌아간다면, 어떤 말이 오래 남았으면 좋겠나요?",
    "options": [
      {
        "label": "오늘 좋았던 장면을 구체적으로 말해준다",
        "scores": {
          "romance": 3,
          "sincerity": 2
        }
      },
      {
        "label": "도착하면 알려달라며 부담 없이 안부를 챙긴다",
        "scores": {
          "warmth": 3,
          "steadiness": 2
        }
      }
    ]
  },
  {
    "category": "대화",
    "text": "이상형이 내 고민을 듣는다면, 어떤 방식이었으면 좋겠나요?",
    "options": [
      {
        "label": "감정을 먼저 알아주고 해결책은 천천히 제안한다",
        "scores": {
          "warmth": 3,
          "sincerity": 2
        }
      },
      {
        "label": "문제를 차분히 정리해 선택지를 보여준다",
        "scores": {
          "intellect": 3,
          "steadiness": 2
        }
      }
    ]
  },
  {
    "category": "대화",
    "text": "이상형과 의견이 갈린다면, 어떤 태도였으면 좋겠나요?",
    "options": [
      {
        "label": "근거를 나누며 서로의 관점을 넓히려 한다",
        "scores": {
          "intellect": 3,
          "steadiness": 2
        }
      },
      {
        "label": "이견보다 관계의 온도를 먼저 지켜준다",
        "scores": {
          "romance": 3,
          "humor": 2
        }
      }
    ]
  },
  {
    "category": "대화",
    "text": "이상형과 침묵이 생긴다면, 어떤 사람처럼 느껴졌으면 좋겠나요?",
    "options": [
      {
        "label": "억지로 채우지 않아도 같은 공간이 편안한 사람",
        "scores": {
          "independence": 3,
          "romance": 2
        }
      },
      {
        "label": "엉뚱한 질문으로 분위기를 새롭게 열어주는 사람",
        "scores": {
          "humor": 3,
          "adventure": 2
        }
      }
    ]
  },
  {
    "category": "대화",
    "text": "이상형이 나를 칭찬한다면, 어떤 표현이었으면 좋겠나요?",
    "options": [
      {
        "label": "내가 애쓴 과정과 태도를 정확히 알아봐 준다",
        "scores": {
          "sincerity": 3,
          "intellect": 2
        }
      },
      {
        "label": "아주 작은 디테일까지 기억해 구체적으로 말해준다",
        "scores": {
          "romance": 3,
          "aesthetics": 2
        }
      }
    ]
  },
  {
    "category": "대화",
    "text": "이상형이 자기 꿈을 말한다면, 어떤 모습이었으면 좋겠나요?",
    "options": [
      {
        "label": "현실적인 계획과 책임감을 함께 보여준다",
        "scores": {
          "intellect": 3,
          "steadiness": 2
        }
      },
      {
        "label": "말하는 눈빛과 목소리에 에너지가 살아난다",
        "scores": {
          "energy": 3,
          "adventure": 2
        }
      }
    ]
  },
  {
    "category": "대화",
    "text": "이상형과 과거 이야기를 나눈다면, 어떤 태도였으면 좋겠나요?",
    "options": [
      {
        "label": "판단보다 이해하려는 마음으로 끝까지 들어준다",
        "scores": {
          "sincerity": 3,
          "intellect": 2
        }
      },
      {
        "label": "무겁지 않게 받아들이되 가볍게 소비하지 않는다",
        "scores": {
          "steadiness": 3,
          "intellect": 2
        }
      }
    ]
  },
  {
    "category": "데이트",
    "text": "이상형이 주말 데이트를 제안한다면, 어떤 계획이었으면 좋겠나요?",
    "options": [
      {
        "label": "조용한 카페에서 오래 이야기하고 산책한다",
        "scores": {
          "romance": 3,
          "warmth": 2
        }
      },
      {
        "label": "가본 적 없는 동네를 정해 가볍게 탐험한다",
        "scores": {
          "adventure": 3,
          "energy": 2
        }
      }
    ]
  },
  {
    "category": "데이트",
    "text": "이상형과의 예약이 취소된다면, 어떤 반응을 보였으면 좋겠나요?",
    "options": [
      {
        "label": "침착하게 대안을 찾고 내 기분까지 살핀다",
        "scores": {
          "steadiness": 3,
          "warmth": 2
        }
      },
      {
        "label": "오히려 새로운 발견이라며 즐겁게 방향을 바꾼다",
        "scores": {
          "adventure": 3,
          "humor": 2
        }
      }
    ]
  },
  {
    "category": "데이트",
    "text": "이상형과 함께 사진을 찍는다면, 어떤 사람이었으면 좋겠나요?",
    "options": [
      {
        "label": "자연스럽게 웃는 순간을 놓치지 않는 사람",
        "scores": {
          "energy": 3,
          "humor": 2
        }
      },
      {
        "label": "구도와 빛을 신경 써 예쁜 한 장을 만드는 사람",
        "scores": {
          "aesthetics": 3,
          "romance": 2
        }
      }
    ]
  },
  {
    "category": "데이트",
    "text": "이상형이 데이트 비용을 대한다면, 어떤 태도였으면 좋겠나요?",
    "options": [
      {
        "label": "서로 부담 없도록 균형을 먼저 맞추려 한다",
        "scores": {
          "steadiness": 3,
          "intellect": 2
        }
      },
      {
        "label": "상황에 따라 기분 좋게 번갈아 챙긴다",
        "scores": {
          "romance": 3,
          "energy": 2
        }
      }
    ]
  },
  {
    "category": "데이트",
    "text": "이상형과 하루 데이트를 마쳤다면, 어떤 말을 들었으면 좋겠나요?",
    "options": [
      {
        "label": "오늘 너랑 있어서 마음이 정말 편했어",
        "scores": {
          "warmth": 3,
          "steadiness": 2
        }
      },
      {
        "label": "오늘 그 장면이 계속 생각날 것 같아",
        "scores": {
          "romance": 3,
          "aesthetics": 2
        }
      }
    ]
  },
  {
    "category": "일상",
    "text": "이상형의 평일 루틴을 본다면, 어떤 모습이었으면 좋겠나요?",
    "options": [
      {
        "label": "약속한 일을 미루지 않고 꾸준히 해낸다",
        "scores": {
          "steadiness": 2,
          "sincerity": 3
        }
      },
      {
        "label": "갑자기 빈 시간에도 작은 재미를 찾아낸다",
        "scores": {
          "energy": 3,
          "adventure": 2
        }
      }
    ]
  },
  {
    "category": "일상",
    "text": "이상형과 집에서 쉰다면, 어떤 관계의 모습이었으면 좋겠나요?",
    "options": [
      {
        "label": "각자 쉬어도 같은 공간의 온기가 느껴진다",
        "scores": {
          "independence": 3,
          "romance": 2
        }
      },
      {
        "label": "작은 홈카페나 음악처럼 함께할 이벤트를 만든다",
        "scores": {
          "aesthetics": 3,
          "romance": 2
        }
      }
    ]
  },
  {
    "category": "일상",
    "text": "이상형과 같이 장을 본다면, 어떤 모습이 매력적이었으면 좋겠나요?",
    "options": [
      {
        "label": "필요한 것을 꼼꼼히 챙겨 생활력이 보인다",
        "scores": {
          "steadiness": 3,
          "sincerity": 2
        }
      },
      {
        "label": "내가 좋아하는 간식을 기억하고 슬쩍 담아준다",
        "scores": {
          "romance": 3,
          "humor": 2
        }
      }
    ]
  },
  {
    "category": "일상",
    "text": "이상형 앞에서 내가 지친 날이라면, 어떤 배려를 해줬으면 좋겠나요?",
    "options": [
      {
        "label": "캐묻지 않고 곁에서 편안하게 있어준다",
        "scores": {
          "independence": 3,
          "steadiness": 2
        }
      },
      {
        "label": "가벼운 농담으로 부담 없이 웃게 해준다",
        "scores": {
          "humor": 3,
          "energy": 2
        }
      }
    ]
  },
  {
    "category": "일상",
    "text": "이상형과 평일을 반복해도, 어떤 이유로 마음이 이어졌으면 좋겠나요?",
    "options": [
      {
        "label": "작은 안부와 배려가 꾸준히 이어진다",
        "scores": {
          "sincerity": 3,
          "steadiness": 2
        }
      },
      {
        "label": "각자의 성장을 응원하는 대화가 계속 있다",
        "scores": {
          "intellect": 3,
          "sincerity": 2
        }
      }
    ]
  },
  {
    "category": "연락",
    "text": "이상형과 연락한다면, 어떤 빈도와 리듬이었으면 좋겠나요?",
    "options": [
      {
        "label": "짧아도 매일 일정한 리듬으로 마음을 확인한다",
        "scores": {
          "romance": 3,
          "steadiness": 2
        }
      },
      {
        "label": "각자의 집중 시간을 존중하고 만났을 때 밀도를 높인다",
        "scores": {
          "independence": 3,
          "sincerity": 2
        }
      }
    ]
  },
  {
    "category": "연락",
    "text": "이상형의 답장이 늦어진다면, 어떤 방식으로 안심시켜줬으면 좋겠나요?",
    "options": [
      {
        "label": "늦어질 상황을 미리 알려 불필요한 불안을 줄인다",
        "scores": {
          "sincerity": 3,
          "steadiness": 2
        }
      },
      {
        "label": "나중에라도 이유와 마음을 솔직히 전한다",
        "scores": {
          "sincerity": 3,
          "romance": 2
        }
      }
    ]
  },
  {
    "category": "연락",
    "text": "이상형과 잠들기 전 연락한다면, 어떤 마지막 말이었으면 좋겠나요?",
    "options": [
      {
        "label": "오늘도 고생했다는 따뜻한 한마디",
        "scores": {
          "warmth": 3,
          "sincerity": 2
        }
      },
      {
        "label": "내일 같이 기대할 일을 떠올리게 하는 말",
        "scores": {
          "romance": 3,
          "energy": 2
        }
      }
    ]
  },
  {
    "category": "연락",
    "text": "이상형이 SNS를 한다면, 어떤 방식이었으면 좋겠나요?",
    "options": [
      {
        "label": "보여주기보다 실제 관계의 신뢰를 더 중시한다",
        "scores": {
          "sincerity": 3,
          "independence": 2
        }
      },
      {
        "label": "자기 취향과 일상을 감각적으로 기록한다",
        "scores": {
          "aesthetics": 3,
          "independence": 2
        }
      }
    ]
  },
  {
    "category": "갈등",
    "text": "이상형에게 서운함을 말한다면, 어떤 반응을 보여줬으면 좋겠나요?",
    "options": [
      {
        "label": "방어하지 않고 내 감정을 끝까지 들어준다",
        "scores": {
          "sincerity": 3,
          "intellect": 2
        }
      },
      {
        "label": "같은 문제가 반복되지 않도록 구체적인 약속을 한다",
        "scores": {
          "intellect": 3,
          "steadiness": 2
        }
      }
    ]
  },
  {
    "category": "갈등",
    "text": "이상형이 사과한다면, 어떤 부분이 느껴졌으면 좋겠나요?",
    "options": [
      {
        "label": "무엇이 미안한지 구체적으로 알고 말한다",
        "scores": {
          "sincerity": 3,
          "intellect": 2
        }
      },
      {
        "label": "말에서 끝나지 않고 다음 행동을 바꾼다",
        "scores": {
          "energy": 3,
          "steadiness": 2
        }
      }
    ]
  },
  {
    "category": "갈등",
    "text": "이상형과 질투나 불안을 마주한다면, 어떤 방식으로 안정됐으면 좋겠나요?",
    "options": [
      {
        "label": "관계의 경계를 분명히 말해 안심시킨다",
        "scores": {
          "independence": 3,
          "sincerity": 2
        }
      },
      {
        "label": "각자의 사생활과 신뢰를 균형 있게 지킨다",
        "scores": {
          "independence": 3,
          "sincerity": 2
        }
      }
    ]
  },
  {
    "category": "갈등",
    "text": "이상형이 화가 났다면, 어떤 모습이었으면 좋겠나요?",
    "options": [
      {
        "label": "큰소리보다 시간을 두고 차분히 말한다",
        "scores": {
          "intellect": 3,
          "steadiness": 2
        }
      },
      {
        "label": "감정을 숨기지 않되 상처 주는 말은 피한다",
        "scores": {
          "sincerity": 3,
          "intellect": 2
        }
      }
    ]
  },
  {
    "category": "갈등",
    "text": "이상형과 관계가 권태로워진다면, 어떤 변화가 있었으면 좋겠나요?",
    "options": [
      {
        "label": "익숙한 루틴 안에서 놓친 배려를 회복한다",
        "scores": {
          "romance": 3,
          "sincerity": 2
        }
      },
      {
        "label": "안 해본 경험으로 관계에 새 공기를 넣는다",
        "scores": {
          "adventure": 3,
          "energy": 2
        }
      }
    ]
  },
  {
    "category": "가치관",
    "text": "이상형이 돈을 쓴다면, 어떤 기준을 가졌으면 좋겠나요?",
    "options": [
      {
        "label": "중요한 곳과 아낄 곳을 현실적으로 나눈다",
        "scores": {
          "intellect": 3,
          "steadiness": 2
        }
      },
      {
        "label": "돈보다 경험의 만족도와 추억을 더 중시한다",
        "scores": {
          "adventure": 3,
          "aesthetics": 2
        }
      }
    ]
  },
  {
    "category": "가치관",
    "text": "이상형을 가족이나 친구에게 소개한다면, 어떤 점이 자랑스러웠으면 좋겠나요?",
    "options": [
      {
        "label": "사람을 편안하게 만드는 따뜻하고 예의 있는 태도",
        "scores": {
          "warmth": 3,
          "sincerity": 2
        }
      },
      {
        "label": "어디서든 자기답게 행동하는 당당한 색깔",
        "scores": {
          "independence": 3,
          "energy": 2
        }
      }
    ]
  },
  {
    "category": "가치관",
    "text": "이상형이 내 커리어를 응원한다면, 어떤 방식이었으면 좋겠나요?",
    "options": [
      {
        "label": "성과보다 노력과 방향을 먼저 인정한다",
        "scores": {
          "sincerity": 3,
          "energy": 2
        }
      },
      {
        "label": "필요한 정보와 아이디어를 함께 찾아준다",
        "scores": {
          "intellect": 3,
          "steadiness": 2
        }
      }
    ]
  },
  {
    "category": "가치관",
    "text": "이상형과 연애할 때 독립성을 생각한다면, 어떤 거리감이었으면 좋겠나요?",
    "options": [
      {
        "label": "중요한 순간에는 최대한 함께 시간을 보내는 쪽",
        "scores": {
          "romance": 3,
          "warmth": 2
        }
      },
      {
        "label": "각자의 시간과 목표가 분명히 보장되는 쪽",
        "scores": {
          "independence": 3,
          "sincerity": 2
        }
      }
    ]
  },
  {
    "category": "가치관",
    "text": "이상형이 사랑을 표현한다면, 어떤 방식이었으면 좋겠나요?",
    "options": [
      {
        "label": "말보다 행동으로 꾸준히 챙겨주는 방식",
        "scores": {
          "steadiness": 3,
          "warmth": 2
        }
      },
      {
        "label": "마음을 말과 분위기로 자주 표현하는 방식",
        "scores": {
          "romance": 3,
          "energy": 2
        }
      }
    ]
  },
  {
    "category": "미래",
    "text": "이상형과 함께 살 공간을 상상한다면, 어떤 분위기였으면 좋겠나요?",
    "options": [
      {
        "label": "돌아오면 마음이 쉬는 안정적인 집",
        "scores": {
          "romance": 3,
          "steadiness": 2
        }
      },
      {
        "label": "둘의 취향이 자연스럽게 섞인 감각적인 공간",
        "scores": {
          "aesthetics": 3,
          "romance": 2
        }
      }
    ]
  },
  {
    "category": "미래",
    "text": "이상형과 큰 결정을 내려야 한다면, 어떤 모습이었으면 좋겠나요?",
    "options": [
      {
        "label": "자료를 보고 차분히 장단점을 따진다",
        "scores": {
          "intellect": 3,
          "steadiness": 2
        }
      },
      {
        "label": "서로의 마음이 다치지 않게 속도를 맞춘다",
        "scores": {
          "romance": 3,
          "sincerity": 2
        }
      }
    ]
  },
  {
    "category": "미래",
    "text": "이상형과 힘든 시기를 지나간다면, 어떤 힘이 있었으면 좋겠나요?",
    "options": [
      {
        "label": "감정이 약해질 때도 서로를 다정하게 대하는 힘",
        "scores": {
          "warmth": 3,
          "sincerity": 2
        }
      },
      {
        "label": "문제를 작게 나누어 꾸준히 해결하는 힘",
        "scores": {
          "intellect": 3,
          "steadiness": 2
        }
      }
    ]
  },
  {
    "category": "미래",
    "text": "이상형과 첫 여행을 간다면, 어떤 사람이었으면 좋겠나요?",
    "options": [
      {
        "label": "교통과 숙소를 안정적으로 확인해 두는 사람",
        "scores": {
          "sincerity": 3,
          "steadiness": 2
        }
      },
      {
        "label": "우연한 발견을 즐기며 일정에 숨을 주는 사람",
        "scores": {
          "adventure": 3,
          "humor": 2
        }
      }
    ]
  },
  {
    "category": "미래",
    "text": "이상형과 오래 만난다면, 어떤 매력이 계속 남았으면 좋겠나요?",
    "options": [
      {
        "label": "사소한 배려가 습관처럼 남아 있는 다정함",
        "scores": {
          "romance": 3,
          "steadiness": 2
        }
      },
      {
        "label": "계속 배우고 질문하는 지적인 생동감",
        "scores": {
          "intellect": 3,
          "adventure": 2
        }
      }
    ]
  }
];

const questionBank = questionBlueprints.map((question, index) => ({
  id: `q${index + 1}`,
  ...question,
}));

const questionMap = new Map(questionBank.map((question) => [question.id, question]));
const seenQuestionStorageKey = "ideal-type-seen-question-ids";

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
  feedbackSubmitting: false,
  feedbackSubmitted: false,
  seenQuestionIds: loadSeenQuestionIds(),
};

const portraitAssets = {
  basePath: "/assets/portraits-webp",
  manifestPath: "/assets/portraits-webp/manifest.json",
  variantCount: 5,
  ageRanges: ["teens", "20s", "30s"],
  anyAgeRanges: ["20s", "30s"],
  manifestByFile: null,
  manifestPromise: null,
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
  shareInstagramStoryButton: document.querySelector("#shareInstagramStoryButton"),
  shareFacebookStoryButton: document.querySelector("#shareFacebookStoryButton"),
  storyShareStatus: document.querySelector("#storyShareStatus"),
  feedbackButtons: [...document.querySelectorAll("[data-feedback-choice]")],
  feedbackStatus: document.querySelector("#feedbackStatus"),
  feedbackModal: document.querySelector("#feedbackModal"),
  feedbackReason: document.querySelector("#feedbackReason"),
  feedbackCloseButton: document.querySelector("#feedbackCloseButton"),
  feedbackSkipReasonButton: document.querySelector("#feedbackSkipReasonButton"),
  feedbackSubmitReasonButton: document.querySelector("#feedbackSubmitReasonButton"),
  restartButton: document.querySelector("#restartButton"),
  restartTopButton: document.querySelector("#restartTopButton"),
};

function loadSeenQuestionIds() {
  if (typeof localStorage === "undefined") return new Set();
  try {
    const stored = JSON.parse(localStorage.getItem(seenQuestionStorageKey) || "[]");
    return new Set(stored.filter((id) => questionMap.has(id)));
  } catch (error) {
    console.warn("Seen question history load failed:", error);
    return new Set();
  }
}

function saveSeenQuestionIds() {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(seenQuestionStorageKey, JSON.stringify([...state.seenQuestionIds]));
  } catch (error) {
    console.warn("Seen question history save failed:", error);
  }
}

function resetSeenQuestionCycleIfComplete() {
  if (state.seenQuestionIds.size < questionBank.length) return;
  state.seenQuestionIds.clear();
  saveSeenQuestionIds();
}

function orderQuestionsByHistory(questions) {
  const unseen = [];
  const seen = [];
  questions.forEach((question) => {
    if (state.seenQuestionIds.has(question.id)) {
      seen.push(question);
    } else {
      unseen.push(question);
    }
  });
  return [...shuffleQuestions(unseen), ...shuffleQuestions(seen)];
}

function rememberCurrentQuestionOrder() {
  activeQuestions().forEach((question) => state.seenQuestionIds.add(question.id));
  saveSeenQuestionIds();
}

function activeQuestions() {
  if (state.questionOrder.length !== state.mode) {
    prepareQuestionRun();
  }

  return state.questionOrder.map((id) => questionMap.get(id)).filter(Boolean);
}

function prepareQuestionRun() {
  resetSeenQuestionCycleIfComplete();
  const appearanceQuestions = orderQuestionsByHistory(
    questionBank.filter((question) => question.category === appearanceCategory),
  );
  const nonAppearanceQuestions = orderQuestionsByHistory(
    questionBank.filter((question) => question.category !== appearanceCategory),
  );
  const appearanceTarget = Math.min(
    appearanceQuestions.length,
    Math.round(state.mode * targetAppearanceQuestionShare),
  );
  const nonAppearanceTarget = Math.min(nonAppearanceQuestions.length, state.mode - appearanceTarget);
  let selectedAppearance = appearanceQuestions.slice(0, appearanceTarget);
  let selectedNonAppearance = nonAppearanceQuestions.slice(0, nonAppearanceTarget);

  const selectedTotal = selectedAppearance.length + selectedNonAppearance.length;
  if (selectedTotal < state.mode) {
    const remainingAppearance = appearanceQuestions.slice(selectedAppearance.length);
    const remainingNonAppearance = nonAppearanceQuestions.slice(selectedNonAppearance.length);
    const fillers = [...remainingAppearance, ...remainingNonAppearance].slice(0, state.mode - selectedTotal);
    fillers.forEach((question) => {
      if (question.category === appearanceCategory) {
        selectedAppearance.push(question);
      } else {
        selectedNonAppearance.push(question);
      }
    });
  }

  state.questionOrder = interleaveQuestionPools(selectedAppearance, selectedNonAppearance)
    .slice(0, state.mode)
    .map((question) => question.id);
}

function shuffleQuestions(questions) {
  const shuffled = [...questions];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function interleaveQuestionPools(primary, secondary) {
  const result = [];
  const maxLength = Math.max(primary.length, secondary.length);
  for (let index = 0; index < maxLength; index += 1) {
    if (primary[index]) result.push(primary[index]);
    if (secondary[index]) result.push(secondary[index]);
  }
  return result;
}

function normalizeQuizMode(mode) {
  const normalized = Number(mode);
  return quizModes.includes(normalized) ? normalized : quizModes[0];
}

function showScreen(name) {
  els.startScreen.classList.toggle("hidden", name !== "start");
  els.questionScreen.classList.toggle("hidden", name !== "question");
  els.resultScreen.classList.toggle("hidden", name !== "result");
}

function setMode(mode) {
  state.mode = normalizeQuizMode(mode);
  state.current = 0;
  state.answers = [];
  prepareQuestionRun();
  state.started = false;
  state.selectedPortrait = null;
  resetFeedbackSurvey();
  setStoryShareStatus("");
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
  rememberCurrentQuestionOrder();
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
  resetFeedbackSurvey();
  setStoryShareStatus("");
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
  els.questionCount.textContent = formatQuestionCount(state.current + 1, state.mode);
  els.questionCount.setAttribute("aria-label", `${state.current + 1}번째 질문, 전체 ${state.mode}문항`);
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

function formatQuestionCount(current, total) {
  return `${current}/${total}`;
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
  return computeScoresFor(() => true);
}

function computeAppearanceScores() {
  return computeScoresFor((question) => question.category === appearanceCategory);
}

function computeNonAppearanceScores() {
  return computeScoresFor((question) => question.category !== appearanceCategory);
}

function computeScoreMaximums() {
  return computeScoreMaximumsFor(() => true);
}

function computeAppearanceScoreMaximums() {
  return computeScoreMaximumsFor((question) => question.category === appearanceCategory);
}

function computeNonAppearanceScoreMaximums() {
  return computeScoreMaximumsFor((question) => question.category !== appearanceCategory);
}

function computeScoresFor(includeQuestion) {
  const scores = Object.fromEntries(Object.keys(traitMeta).map((trait) => [trait, 0]));
  activeQuestions().forEach((question, index) => {
    if (!includeQuestion(question)) return;
    const answerIndex = state.answers[index];
    if (!Number.isInteger(answerIndex)) return;
    const selected = question.options[answerIndex];
    Object.entries(selected.scores).forEach(([trait, value]) => {
      scores[trait] += value;
    });
  });
  return scores;
}

function computeScoreMaximumsFor(includeQuestion) {
  const maximums = Object.fromEntries(Object.keys(traitMeta).map((trait) => [trait, 0]));
  activeQuestions().forEach((question) => {
    if (!includeQuestion(question)) return;
    Object.keys(traitMeta).forEach((trait) => {
      maximums[trait] += Math.max(...question.options.map((option) => option.scores[trait] || 0));
    });
  });
  return maximums;
}

function computePortraitScores() {
  const appearanceScores = computeAppearanceScores();
  const nonAppearanceScores = computeNonAppearanceScores();
  const appearanceShare = normalizeScoreShare(appearanceScores);
  const nonAppearanceShare = normalizeScoreShare(nonAppearanceScores);
  const personalityWeight = 1 - portraitAppearanceWeight;

  return Object.fromEntries(
    Object.keys(traitMeta).map((trait) => [
      trait,
      appearanceShare[trait] * portraitAppearanceWeight + nonAppearanceShare[trait] * personalityWeight,
    ]),
  );
}

function normalizeScoreShare(scores) {
  const total = Object.values(scores).reduce((sum, value) => sum + value, 0);
  if (total <= 0) {
    const fallback = 1 / Object.keys(traitMeta).length;
    return Object.fromEntries(Object.keys(traitMeta).map((trait) => [trait, fallback]));
  }

  return Object.fromEntries(Object.entries(scores).map(([trait, value]) => [trait, value / total]));
}

function getTopTraits(scores, limit = 3) {
  return Object.entries(scores)
    .map(([key, value]) => ({ key, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
}

function getNormalizedTraits(scores, maximums = computeScoreMaximums()) {
  return Object.entries(scores)
    .map(([key, value]) => ({
      key,
      value,
      max: maximums[key] || 0,
      percent: maximums[key] > 0 ? Math.round((value / maximums[key]) * 100) : 0,
    }))
    .sort((a, b) => b.percent - a.percent || b.value - a.value);
}

function getPortraitTraitShares(scores) {
  return Object.entries(scores)
    .map(([key, value]) => ({
      key,
      value,
      percent: Math.round(value * 100),
    }))
    .sort((a, b) => b.value - a.value);
}

function buildProfile() {
  const scores = computeScores();
  const appearanceScores = computeAppearanceScores();
  const nonAppearanceScores = computeNonAppearanceScores();
  const scoreMaximums = computeScoreMaximums();
  const appearanceScoreMaximums = computeAppearanceScoreMaximums();
  const nonAppearanceScoreMaximums = computeNonAppearanceScoreMaximums();
  const portraitScores = computePortraitScores();
  const top = getNormalizedTraits(scores, scoreMaximums).slice(0, 4);
  const portraitTop = getTopTraits(portraitScores, 4);
  const title = makeTitle(top);
  const profile = {
    scores,
    appearanceScores,
    nonAppearanceScores,
    scoreMaximums,
    appearanceScoreMaximums,
    nonAppearanceScoreMaximums,
    portraitScores,
    top,
    portraitTop,
    title,
  };
  const summary = makeSummary(profile);
  const prompt = makePrompt(portraitTop);
  return { ...profile, summary, prompt };
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

function makeSummary(profile) {
  const allTraits = getNormalizedTraits(profile.scores, profile.scoreMaximums);
  const topThree = allTraits.slice(0, 3);
  const [first, second, third] = topThree;
  const positiveTraits = allTraits.filter((trait) => trait.value > 0);
  const lowest = positiveTraits[positiveTraits.length - 1] || allTraits[allTraits.length - 1];
  const appearanceTop = getNormalizedTraits(profile.appearanceScores, profile.appearanceScoreMaximums)
    .filter((trait) => trait.value > 0)
    .slice(0, 2);
  const relationshipTop = getNormalizedTraits(profile.nonAppearanceScores, profile.nonAppearanceScoreMaximums)
    .filter((trait) => trait.value > 0)
    .slice(0, 2);
  const portraitTop = getPortraitTraitShares(profile.portraitScores).slice(0, 2);
  const appearanceWeight = Math.round(portraitAppearanceWeight * 100);
  const relationshipWeight = 100 - appearanceWeight;

  const firstCopy = traitResultCopy[first.key];
  const secondCopy = traitResultCopy[second.key];
  const thirdCopy = traitResultCopy[third.key];
  const lowestCopy = traitResultCopy[lowest.key];

  return [
    `각 성향 100% 기준으로는 ${formatTraitShare(first)}, ${formatTraitShare(second)}, ${formatTraitShare(third)}가 가장 높게 나왔어요. 이 비율은 해당 성향이 나올 수 있었던 최대 점수 중 실제로 얼마나 채웠는지를 뜻해요. 그래서 여러 성향이 동시에 높게 나올 수 있어요.`,
    `${firstCopy.core} ${secondCopy.detail} 여기에 ${traitMeta[third.key].label} 성향도 함께 올라와서, 단순히 한 가지 매력만 강한 사람보다 ${traitMeta[first.key].phrase}${particle(traitMeta[first.key].phrase, "과", "와")} ${traitMeta[second.key].phrase}${particle(traitMeta[second.key].phrase, "이", "가")} 동시에 느껴지는 사람에게 더 오래 끌릴 가능성이 커요.`,
    `외모 문항만 보면 ${formatTraitShareList(appearanceTop)} 쪽으로 기울었고, 관계·대화 문항에서는 ${formatTraitShareList(relationshipTop)}이 두드러졌어요. 사진 타입은 외모 취향 ${appearanceWeight}%와 관계 성향 ${relationshipWeight}%를 섞어 고르도록 설계했기 때문에, 얼굴상이나 스타일 취향이 결과 사진에 충분히 반영되면서도 실제로 오래 만났을 때 중요한 태도까지 같이 들어가요. 이번 사진 선택 축은 ${formatTraitShareList(portraitTop)}에 가까워요.`,
    `${describeTraitBalance(topThree)} 상대적으로 ${traitMeta[lowest.key].label}은 ${lowest.percent}%로 낮게 잡혔는데, 이는 그 매력이 싫다는 뜻보다는 지금 답변 패턴에서 우선순위가 낮았다는 뜻이에요. ${lowestCopy.low} 결과적으로 당신의 이상형은 첫눈에 보이는 분위기와 관계 안에서 쌓이는 신뢰가 함께 맞아야 허무하지 않게 오래 설레는 타입이에요.`,
  ].join("\n\n");
}

function formatTraitShare(trait) {
  return `${traitMeta[trait.key].label} ${trait.percent}%`;
}

function formatTraitShareList(traits) {
  if (!traits.length) return "아직 뚜렷한 성향 없음";
  return traits.map(formatTraitShare).join(" · ");
}

function describeTraitBalance(topThree) {
  const gap = topThree[0].percent - topThree[2].percent;
  if (gap <= 4) {
    return "상위 세 성향의 차이가 크지 않아, 한쪽으로 극단적인 이상형보다 상황에 따라 여러 매력이 섞인 사람을 좋아하는 편이에요.";
  }
  if (gap >= 12) {
    return `특히 ${traitMeta[topThree[0].key].label}이 뚜렷하게 앞서서, 이 성향이 없는 사람에게는 다른 장점이 있어도 호감이 오래 유지되기 어려울 수 있어요.`;
  }
  return "상위 성향이 비교적 선명하지만, 한 가지 조건만 맞는 사람보다는 두세 가지 매력이 균형 있게 보일 때 더 확신이 생기는 편이에요.";
}

function makePrompt(top) {
  const promptParts = top.map((trait) => traitMeta[trait.key].prompt);
  return [
    "Create one fictional photorealistic Korean dating-profile portrait of a non-celebrity person.",
    makeTargetPrompt(),
    `Core personality cues: ${promptParts.join("; ")}.`,
    "Composition: upper-body to head-and-shoulders portrait, centered face, relaxed natural posture, eye-level camera, 50-85mm lens look, clean framing with face and shoulders fully natural.",
    "Styling: contemporary Korean dating-app profile styling, coordinated outfit, subtle accessories, natural makeup or grooming, colors harmonized with the personality cues, polished but not over-staged.",
    "Lighting and texture: soft daylight from a large window, gentle rim light, realistic skin texture with pores, natural hair detail, clear catchlights, shallow depth of field, warm uncluttered studio or cafe-like background.",
    "Aspect ratio: preserve the source/original photo aspect ratio, do not stretch vertically, do not squeeze horizontally, keep face and shoulders naturally proportioned.",
    "The person must look exactly within the selected age range.",
    "No celebrity likeness, no real person, no readable text, no watermark, no extra people, no cartoon, no anime, no plastic skin, no glamour over-retouching, no exaggerated facial symmetry.",
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
  resetFeedbackSurvey();
  setStoryShareStatus("");
  els.resultTitle.textContent = profile.title;
  els.resultSummary.textContent = profile.summary;
  renderTraitList(profile.scores, profile.scoreMaximums);
  setPortraitActionsDisabled(true);
  setImageStatus("generating", "결과 타입에 맞는 사진 5장 중 하나를 고르는 중이에요");
  drawPortrait(profile, resultToken);
  showScreen("result");
}

function renderTraitList(scores, maximums = computeScoreMaximums()) {
  const traits = getNormalizedTraits(scores, maximums);
  els.traitList.innerHTML = "";
  traits.forEach((trait) => {
    const item = document.createElement("div");
    item.className = "trait-chip";
    item.innerHTML = `
      <span>${traitMeta[trait.key].label}</span>
      <span class="trait-meter"><span style="width: ${trait.percent}%"></span></span>
      <span class="trait-percent">${trait.percent}%</span>
    `;
    els.traitList.append(item);
  });
}

function resetFeedbackSurvey() {
  state.feedbackSubmitting = false;
  state.feedbackSubmitted = false;
  closeFeedbackModal();
  if (els.feedbackReason) {
    els.feedbackReason.value = "";
  }
  setFeedbackStatus("");
  setFeedbackButtonsDisabled(false);
  els.feedbackButtons.forEach((button) => button.classList.remove("selected"));
}

function setFeedbackStatus(message, tone = "default") {
  if (!els.feedbackStatus) return;
  els.feedbackStatus.textContent = message;
  els.feedbackStatus.dataset.tone = tone;
}

function setFeedbackButtonsDisabled(disabled) {
  els.feedbackButtons.forEach((button) => {
    button.disabled = disabled;
  });
  [els.feedbackSkipReasonButton, els.feedbackSubmitReasonButton].forEach((button) => {
    if (button) button.disabled = disabled;
  });
}

function openFeedbackModal() {
  if (!els.feedbackModal) return;
  els.feedbackModal.classList.remove("hidden");
  if (els.feedbackReason) {
    els.feedbackReason.value = "";
    setTimeout(() => els.feedbackReason.focus?.(), 0);
  }
}

function closeFeedbackModal() {
  if (!els.feedbackModal) return;
  els.feedbackModal.classList.add("hidden");
}

function handleFeedbackChoice(choice) {
  if (state.feedbackSubmitting || state.feedbackSubmitted) return;
  if (choice === "liked") {
    submitFeedback("liked");
    return;
  }
  if (choice === "disliked") {
    openFeedbackModal();
  }
}

async function submitFeedback(satisfaction, reason = "") {
  if (state.feedbackSubmitting || state.feedbackSubmitted) return;

  state.feedbackSubmitting = true;
  setFeedbackButtonsDisabled(true);
  setFeedbackStatus("설문을 제출하는 중이에요...");

  const payload = makeFeedbackPayload(satisfaction, reason);
  markFeedbackSelection(satisfaction);

  try {
    await sendFeedbackPayload(payload);
    state.feedbackSubmitted = true;
    closeFeedbackModal();
    setFeedbackStatus("설문에 참여해주셔서 감사합니다.", "success");
  } catch (error) {
    console.warn("Feedback submit failed; storing locally only:", error);
    persistFeedbackLocally(payload);
    state.feedbackSubmitted = true;
    closeFeedbackModal();
    setFeedbackStatus("설문에 참여해주셔서 감사합니다.", "success");
  } finally {
    state.feedbackSubmitting = false;
    setFeedbackButtonsDisabled(state.feedbackSubmitted);
  }
}

function markFeedbackSelection(satisfaction) {
  els.feedbackButtons.forEach((button) => {
    button.classList.toggle("selected", button.dataset.feedbackChoice === satisfaction);
  });
}

function makeFeedbackPayload(satisfaction, reason = "") {
  return {
    satisfaction,
    reason: String(reason || "").trim().slice(0, 600),
    mode: state.mode,
    targetGender: state.targetGender,
    targetAgeRange: state.targetAgeRange,
    submittedAt: new Date().toISOString(),
  };
}

async function sendFeedbackPayload(payload) {
  if (typeof fetch !== "function") {
    persistFeedbackLocally(payload);
    return { ok: true, stored: false };
  }

  const response = await fetch("/api/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.ok === false) {
    throw new Error(data.message || `Feedback request failed: ${response.status}`);
  }
  if (!data.stored) {
    persistFeedbackLocally(payload);
  }
  return data;
}

function persistFeedbackLocally(payload) {
  if (typeof localStorage === "undefined") return;
  try {
    const key = "ideal-type-feedback-drafts";
    const previous = JSON.parse(localStorage.getItem(key) || "[]");
    previous.push(payload);
    localStorage.setItem(key, JSON.stringify(previous.slice(-20)));
  } catch (error) {
    console.warn("Local feedback persistence failed:", error);
  }
}

async function drawPortrait(profile, resultToken = state.resultToken) {
  let selected = selectPortraitAsset(profile);
  state.selectedPortrait = selected;

  try {
    selected = await resolvePortraitAssetDetails(selected);
    state.selectedPortrait = selected;
    if (resultToken !== state.resultToken) return;

    const image = await loadPortraitImage(selected.src);
    if (resultToken !== state.resultToken) return;

    drawPortraitImage(image, selected);
    setImageStatus("generated");
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
  const topTrait =
    profile.portraitTop?.[0]?.key && traitMeta[profile.portraitTop[0].key]
      ? profile.portraitTop[0].key
      : profile.top?.[0]?.key && traitMeta[profile.top[0].key]
        ? profile.top[0].key
        : "warmth";
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
    file: `${topTrait}/${gender}/${ageRange}/${variantName}.webp`,
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

async function resolvePortraitAssetDetails(selected) {
  const manifestByFile = await loadPortraitManifest();
  const details = manifestByFile?.get(selected.file);
  if (!details) return selected;

  return {
    ...selected,
    sourceWidth: details.sourceWidth,
    sourceHeight: details.sourceHeight,
  };
}

async function loadPortraitManifest() {
  if (portraitAssets.manifestByFile) return portraitAssets.manifestByFile;
  if (typeof fetch !== "function") return null;

  if (!portraitAssets.manifestPromise) {
    portraitAssets.manifestPromise = fetch(portraitAssets.manifestPath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Portrait manifest request failed: ${response.status}`);
        }
        return response.json();
      })
      .then((manifest) => {
        portraitAssets.manifestByFile = new Map(
          (manifest.files || [])
            .filter((entry) => entry.file && entry.sourceWidth && entry.sourceHeight)
            .map((entry) => [entry.file, entry]),
        );
        return portraitAssets.manifestByFile;
      })
      .catch((error) => {
        console.warn("Portrait manifest failed; using encoded image ratio:", error);
        portraitAssets.manifestPromise = null;
        return null;
      });
  }

  return portraitAssets.manifestPromise;
}

function drawPortraitImage(image, selected = {}) {
  const canvas = els.portraitCanvas;
  const imageWidth = image.naturalWidth || image.width;
  const imageHeight = image.naturalHeight || image.height;
  const sourceWidth = selected.sourceWidth || imageWidth;
  const sourceHeight = selected.sourceHeight || imageHeight;
  const { width, height } = setPortraitCanvasSize(sourceWidth, sourceHeight);
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(image, 0, 0, width, height);
}

function setPortraitCanvasSize(sourceWidth, sourceHeight) {
  const canvas = els.portraitCanvas;
  const safeWidth = Number(sourceWidth) > 0 ? Number(sourceWidth) : 900;
  const safeHeight = Number(sourceHeight) > 0 ? Number(sourceHeight) : 1200;
  const scale = 1200 / Math.max(safeWidth, safeHeight);
  const width = Math.max(1, Math.round(safeWidth * scale));
  const height = Math.max(1, Math.round(safeHeight * scale));

  if (canvas.width !== width) canvas.width = width;
  if (canvas.height !== height) canvas.height = height;
  return { width, height };
}

function drawFallbackPortrait(profile) {
  const canvas = els.portraitCanvas;
  setPortraitCanvasSize(900, 1200);
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
    idle: "",
    generating: "사진을 불러오는 중이에요",
    generated: "",
    fallback: "브라우저 canvas 이미지로 보여줘요",
  };
  const message = customMessage ?? messages[status] ?? messages.idle;
  els.imageStatus.textContent = message;
  els.imageStatus.hidden = !message;
  els.imageStatus.classList.toggle("generated", status === "generated");
  els.imageStatus.classList.toggle("fallback", status === "fallback");
}

function setPortraitActionsDisabled(disabled) {
  [
    els.downloadButton,
    els.sharePortraitButton,
    els.sharePlacardButton,
    els.shareInstagramStoryButton,
    els.shareFacebookStoryButton,
  ].forEach((button) => {
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
  rememberCurrentQuestionOrder();
  state.answers = activeQuestions().map((_, index) => {
    const seed = hashAnswers(`${Date.now()}-${index}-${state.mode}`);
    const question = activeQuestions()[index];
    return Math.floor(mulberry32(seed)() * question.options.length);
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

async function shareStoryImage(target) {
  const targetMap = {
    instagram: {
      label: "인스타그램",
      button: els.shareInstagramStoryButton,
      filename: makePortraitFilename("instagram-story-ideal-type"),
    },
    facebook: {
      label: "페이스북",
      button: els.shareFacebookStoryButton,
      filename: makePortraitFilename("facebook-story-ideal-type"),
    },
  };
  const config = targetMap[target];
  if (!config) return;

  setStoryShareStatus(`${config.label} 스토리용 이미지를 준비하는 중이에요.`);
  const outcome = await shareCanvasImage({
    canvas: els.portraitCanvas,
    filename: config.filename,
    title: `${config.label} 스토리로 공유`,
    text: "공유 시트에서 스토리를 선택해 올려주세요.",
    button: config.button,
  });

  if (outcome === "shared") {
    setStoryShareStatus(`공유 시트에서 ${config.label} 스토리를 선택해 올려주세요.`);
  } else if (outcome === "downloaded") {
    setStoryShareStatus(`스토리용 이미지가 저장됐어요. ${config.label} 앱에서 스토리로 올려주세요.`);
  } else {
    setStoryShareStatus("스토리 공유가 취소됐어요.");
  }
}

function setStoryShareStatus(message) {
  if (!els.storyShareStatus) return;
  els.storyShareStatus.textContent = message;
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
    title: "내 이상형의 플랜카드",
    text: "나의 이상형 사진과 결과 정보예요.",
    button: els.sharePlacardButton,
  });
}

async function shareCanvasImage({ canvas, filename, title, text, button }) {
  const originalText = button.textContent;
  let outcome = "aborted";
  button.disabled = true;
  button.textContent = "공유 준비 중";

  try {
    const blob = await canvasToBlob(canvas);
    const file = new File([blob], filename, { type: blob.type || "image/png" });

    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], title, text });
      button.textContent = "공유 완료";
      outcome = "shared";
    } else {
      downloadCanvas(canvas, filename);
      button.textContent = "이미지 저장됨";
      outcome = "downloaded";
    }
  } catch (error) {
    if (error?.name !== "AbortError") {
      console.warn("Image share fell back to download:", error);
      downloadCanvas(canvas, filename);
      button.textContent = "이미지 저장됨";
      outcome = "downloaded";
    }
  } finally {
    setTimeout(() => {
      button.disabled = false;
      button.textContent = originalText;
    }, 1200);
  }

  return outcome;
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
  ctx.fillText("내 이상형의 플랜카드", 94, 122);

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
  ctx.fillStyle = "rgba(217,43,120,0.92)";
  ctx.font = "900 25px system-ui, sans-serif";
  ctx.fillText("이상형의 타입", 94, y);
  y += 44;

  ctx.fillStyle = "#24212b";
  ctx.font = "900 44px system-ui, sans-serif";
  y = drawWrappedText(ctx, profile.title, 94, y, width - 188, 54, 2) + 30;

  ctx.fillStyle = "rgba(36,33,43,0.72)";
  ctx.font = "700 29px system-ui, sans-serif";
  y = drawWrappedText(ctx, profile.summary, 94, y, width - 188, 42, 5) + 38;

  ctx.fillStyle = "rgba(217,43,120,0.92)";
  ctx.font = "900 25px system-ui, sans-serif";
  ctx.fillText("성향별 충족도 · 각 성향 100점 기준", 94, y);
  y += 38;

  const traits = getNormalizedTraits(profile.scores, profile.scoreMaximums).slice(0, 5);
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
    ctx.fillText(`${trait.percent}%`, x + chipW - 22, rowY + 31);
    ctx.textAlign = "left";
  });
  y += Math.ceil(traits.length / 2) * 64 + 20;

  const noteText = "검사 결과는 어디에도 저장되지 않습니다.";
  ctx.font = "800 22px system-ui, sans-serif";
  const noteTextHeight = getWrappedTextHeight(ctx, noteText, width - 240, 28, 2);
  const noteH = noteTextHeight + 48;
  const noteY = Math.min(y + 28, height - noteH - 86);
  ctx.fillStyle = "rgba(33,183,168,0.1)";
  roundedRect(ctx, 94, noteY, width - 188, noteH, 18);
  ctx.fill();
  ctx.fillStyle = "rgba(36,33,43,0.62)";
  drawWrappedText(ctx, noteText, 120, noteY + 34, width - 240, 28, 2);

  return canvas;
}

function getPreferenceSummary() {
  const gender = preferenceMeta.gender[state.targetGender] || preferenceMeta.gender.woman;
  const ageRange = preferenceMeta.ageRange[state.targetAgeRange] || preferenceMeta.ageRange["20s"];
  return `${gender.label} · ${ageRange.label} · ${state.mode}문항`;
}

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, maxLines = Number.POSITIVE_INFINITY) {
  const lines = getWrappedTextLines(ctx, text, maxWidth);
  const visibleLines = lines.slice(0, maxLines);
  visibleLines.forEach((visibleLine, index) => {
    const suffix = index === maxLines - 1 && lines.length > maxLines ? "…" : "";
    ctx.fillText(`${visibleLine}${suffix}`, x, y + index * lineHeight);
  });

  return y + visibleLines.length * lineHeight;
}

function getWrappedTextHeight(ctx, text, maxWidth, lineHeight, maxLines = Number.POSITIVE_INFINITY) {
  return Math.min(getWrappedTextLines(ctx, text, maxWidth).length, maxLines) * lineHeight;
}

function getWrappedTextLines(ctx, text, maxWidth) {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  const measure = (value) => {
    if (typeof ctx.measureText === "function") {
      return ctx.measureText(value).width;
    }
    return String(value).length * 14;
  };

  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word;
    if (measure(testLine) <= maxWidth) {
      line = testLine;
      return;
    }
    if (line) lines.push(line);
    line = word;
  });

  if (line) lines.push(line);
  return lines.length ? lines : [""];
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
els.shareInstagramStoryButton.addEventListener("click", () => shareStoryImage("instagram"));
els.shareFacebookStoryButton.addEventListener("click", () => shareStoryImage("facebook"));
els.feedbackButtons.forEach((button) => {
  button.addEventListener("click", () => handleFeedbackChoice(button.dataset.feedbackChoice));
});
els.feedbackCloseButton.addEventListener("click", closeFeedbackModal);
els.feedbackSkipReasonButton.addEventListener("click", () => submitFeedback("disliked"));
els.feedbackSubmitReasonButton.addEventListener("click", () => {
  submitFeedback("disliked", els.feedbackReason.value);
});
els.restartButton.addEventListener("click", resetQuiz);
els.restartTopButton.addEventListener("click", resetQuiz);

setMode(20);
