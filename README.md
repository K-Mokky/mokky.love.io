# 내 이상형을 돌려도!

질문 20개, 50개, 80개 중 하나를 골라 답변하면 이상형 성향을 추론하고, 브라우저 canvas로 가상의 사진 스타일 이상형 이미지를 만들어주는 웹 앱입니다.

- 앱 이름: **내 이상형을 돌려도!**
- 제작자: **KMokky**
- 로고/브랜드: 핑크빛 룰렛 + 하트 무드
- GitHub 저장소: <https://github.com/K-Mokky/mokky.love.io>

## 주요 기능

- 서로 다른 80개 질문 뱅크에서 20/50/80개 모드별 랜덤 출제
- 외모 취향 문항 40개와 관계/가치관 문항 40개를 균형 있게 섞고, 사진 타입 선택은 외모 취향 50%와 관계 성향 50%를 반영
- 이상형 이미지 생성 전 성별(여성/남성)과 나이대(10대 후반/20대/30대/상관없음) 선택
- 답변별 성향 점수 계산과 Top trait 기반 이상형 설명 생성
- 브라우저 `canvas`로 가상의 사진 스타일 이상형 이미지 생성
- 검사 답변 원문과 이미지를 서버/DB에 저장하지 않는 로컬 생성 구조
- 생성된 사진만 공유하거나 사진+결과 정보 플랜카드로 공유
- 결과 만족도 설문 UI와 선택형 아쉬운 이유 입력
- Vercel 정적 페이지 + Serverless Functions 배포 구성

## 파일 구성

- `index.html`: 앱 구조
- `styles.css`: 핑크빛 로고와 반응형 UI
- `app.js`: 질문 뱅크, 성향 추론, 결과 UI, 사진 스타일 canvas 이미지와 공유 이미지 생성
- `api/health.js`: 배포 상태 확인
- `api/feedback.js`: 결과 만족도 설문 수신. 저장소 미연결 시 `stored=false`로 응답
- `supabase/feedback.sql`: 설문 저장용 Supabase 테이블과 RLS insert 정책
- `vercel.json`: Vercel 배포/함수 설정
- `.env.example`: Vercel 환경변수 템플릿

## 로컬 실행

```bash
npm run local
```

그다음 <http://127.0.0.1:5173>을 열면 됩니다. 이미지 생성은 브라우저에서만 처리되므로 별도 이미지 API 키나 DB가 필요 없어요.

```bash
npm run preview
```

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
- Functions: `/api/health`, `/api/feedback`

배포 후 `https://<your-vercel-domain>/api/health`에서 `imageMode`가 `browser-canvas`인지 확인하면 됩니다.

## 설문 저장소 설정

결과창 설문 UI 자체는 DB 없이도 표시되고 제출할 수 있습니다. 다만 여러 사용자의 응답을 실제로 모아 분석하려면 저장소가 필요합니다.

지원 방식은 두 가지입니다.

1. `FEEDBACK_WEBHOOK_URL`: 설문 payload를 외부 webhook으로 전달
2. `SUPABASE_URL` + Supabase API key: Supabase REST API로 저장

이 프로젝트의 Supabase URL:

```text
SUPABASE_URL=https://vvqpajzjkcqxpvsptqvr.supabase.co
```

Supabase key는 아래 중 하나를 Vercel 환경변수로 설정하면 됩니다.

- `SUPABASE_PUBLISHABLE_KEY`: 공개 가능한 낮은 권한 키. RLS `insert` 정책이 필요합니다.
- `SUPABASE_SECRET_KEY`: 서버 전용 최신 secret key. 브라우저/저장소에 노출하면 안 됩니다.
- `SUPABASE_SERVICE_ROLE_KEY`: 서버 전용 legacy service role key. 브라우저/저장소에 노출하면 안 됩니다.
- `SUPABASE_ANON_KEY`: legacy anon key. RLS `insert` 정책이 필요합니다.

제공받은 `sb_publishable_...` 키를 쓸 경우 Supabase SQL Editor에서 `supabase/feedback.sql`을 실행해 테이블과 public insert 정책을 먼저 만들어야 합니다.

Supabase를 쓸 경우 기본 테이블 이름은 `ideal_type_feedback`입니다.

```sql
create table public.ideal_type_feedback (
  id uuid primary key default gen_random_uuid(),
  satisfaction text not null check (satisfaction in ('liked', 'disliked')),
  reason text,
  mode integer,
  target_gender text,
  target_age_range text,
  user_agent text,
  submitted_at timestamptz,
  created_at timestamptz not null default now()
);
```

전체 SQL은 `supabase/feedback.sql`에 들어 있습니다. `publishable` 키는 공개 가능한 키지만, 사용자 응답 조회 권한까지 열리지 않도록 `select/update/delete` 정책은 만들지 않았습니다.

### 저장된 설문 보기

Supabase Dashboard에서 직접 볼 수 있습니다.

1. Supabase 프로젝트 `vvqpajzjkcqxpvsptqvr` 열기
2. 왼쪽 메뉴 `Table Editor` 선택
3. `public` 스키마의 `ideal_type_feedback` 테이블 선택
4. 최신 응답은 `created_at` 기준으로 확인

SQL Editor에서는 아래처럼 볼 수 있습니다.

```sql
select
  created_at,
  satisfaction,
  reason,
  mode,
  target_gender,
  target_age_range
from public.ideal_type_feedback
order by created_at desc
limit 100;
```

만족/아쉬움 집계는 아래 쿼리로 확인할 수 있습니다.

```sql
select satisfaction, count(*) as responses
from public.ideal_type_feedback
group by satisfaction
order by responses desc;
```

## 검증

```bash
npm run check
npm test
```
