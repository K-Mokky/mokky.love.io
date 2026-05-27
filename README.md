# 내 이상형을 돌려도!

질문 20개, 50개, 100개 중 하나를 골라 답변하면 이상형 성향을 추론하고, 그 이상형의 이미지를 AI로 생성해서 알려주는 웹 앱입니다.

- 앱 이름: **내 이상형을 돌려도!**
- 제작자: **KMokky**
- 로고/브랜드: 핑크빛 룰렛 + 하트 무드
- GitHub 저장소: <https://github.com/K-Mokky/mokky.love.io>

## 주요 기능

- 100개 질문 뱅크에서 20/50/100개 모드 선택
- 답변별 성향 점수 계산과 Top trait 기반 이상형 설명 생성
- OpenAI 이미지 API를 통한 실제 AI 이상형 이미지 생성
- `OPENAI_API_KEY`가 없거나 API가 실패하면 브라우저 `canvas` 초상화로 자동 대체
- Supabase `ideal_type_results` 테이블에 익명 결과 저장
- Vercel 정적 페이지 + Serverless Functions 배포 구성

## 파일 구성

- `index.html`: 앱 구조
- `styles.css`: 핑크빛 로고와 반응형 UI
- `app.js`: 질문 뱅크, 성향 추론, 결과 UI, 캔버스 대체 이미지
- `api/generate-image.js`: OpenAI 이미지 생성 프록시
- `api/save-result.js`: Supabase 저장 프록시
- `api/health.js`: 배포 환경변수 상태 확인
- `supabase-schema.sql`: Supabase 테이블/RLS 정책
- `vercel.json`: Vercel 배포/함수 설정
- `.env.example`: Vercel 환경변수 템플릿

## 로컬 실행

```bash
npm run local
```

그다음 <http://127.0.0.1:5173>을 열면 됩니다. `python3 -m http.server`는 Vercel Functions를 실행하지 않으므로 OpenAI/Supabase 서버리스 연동까지 테스트하려면 Vercel CLI의 `vercel dev`가 필요해요.

```bash
npm run preview
```

## Supabase 연동

1. Supabase 프로젝트 SQL Editor에서 `supabase-schema.sql`을 실행해요.
2. Vercel 환경변수에 아래 값을 등록해요.

```bash
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=...
SUPABASE_RESULTS_TABLE=ideal_type_results
```

서비스 롤 키를 쓰지 않을 경우 `SUPABASE_ANON_KEY` 또는 `SUPABASE_PUBLISHABLE_KEY`를 설정하고, `supabase-schema.sql`의 RLS insert policy를 유지하면 됩니다.

## OpenAI 이미지 생성 연동

Vercel 환경변수에 아래 값을 등록해요.

```bash
OPENAI_API_KEY=sk-proj-...
OPENAI_IMAGE_MODEL=gpt-image-2
OPENAI_IMAGE_SIZE=1024x1536
OPENAI_IMAGE_QUALITY=low
```

`api/generate-image.js`가 브라우저 대신 서버에서 OpenAI API를 호출하므로 API 키가 클라이언트에 노출되지 않아요.

## Vercel 배포

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/K-Mokky/mokky.love.io)

```bash
npm run vercel:link
npm run vercel:env:pull
npm run deploy
```

대시보드에서 GitHub 저장소 `K-Mokky/mokky.love.io`를 Import해도 됩니다.

- Build Command: 비워두거나 `npm run vercel-build`
- Output Directory: 프로젝트 루트
- Functions: `/api/generate-image`, `/api/save-result`, `/api/health`

배포 후 `https://<your-vercel-domain>/api/health`에서 `openaiConfigured`와 `supabaseConfigured`가 `true`인지 확인하면 됩니다.

## 검증

```bash
npm run check
npm test
```
