# 내 이상형을 돌려도!

질문 20개, 50개, 80개 중 하나를 골라 답변하면 이상형 성향을 추론하고, 브라우저 canvas로 가상의 사진 스타일 이상형 이미지를 만들어주는 웹 앱입니다.

- 앱 이름: **내 이상형을 돌려도!**
- 제작자: **KMokky**
- 로고/브랜드: 핑크빛 룰렛 + 하트 무드
- GitHub 저장소: <https://github.com/K-Mokky/mokky.love.io>

## 주요 기능

- 서로 다른 80개 질문 뱅크에서 20/50/80개 모드별 랜덤 출제
- 외모 취향 문항 40개와 관계/가치관 문항 40개를 균형 있게 섞고, 사진 타입 선택은 외모 취향 75%와 관계 성향 25%를 반영
- 이상형 이미지 생성 전 성별(여성/남성)과 나이대(10대 후반/20대/30대/상관없음) 선택
- 답변별 성향 점수 계산과 Top trait 기반 이상형 설명 생성
- 브라우저 `canvas`로 가상의 사진 스타일 이상형 이미지 생성
- 검사 답변 원문과 결과 데이터는 서버/DB에 저장하지 않는 로컬 생성 구조
- 생성된 사진과 사진+결과 정보 플랜카드를 PNG로 저장하고 SNS 공유용 링크 생성
- 공유 링크는 `/share` 미리보기 페이지에 Open Graph 이미지 태그를 넣어 SNS 링크 미리보기에 사용
- 결과 만족도 설문 UI와 선택형 아쉬운 이유 입력
- Vercel 정적 페이지 + Serverless Functions 배포 구성

## 파일 구성

- `index.html`: 앱 구조
- `styles.css`: 핑크빛 로고와 반응형 UI
- `app.js`: 질문 뱅크, 성향 추론, 결과 UI, 사진 스타일 canvas 이미지와 공유 이미지 생성
- `api/health.js`: 배포 상태 확인
- `api/feedback.js`: 결과 만족도 설문 수신. 저장소 미연결 시 `stored=false`로 응답
- `api/share.js`: 공유 이미지를 Supabase Storage에 올리고 `/share` Open Graph 미리보기 HTML 생성
- `supabase/feedback.sql`: 설문 저장용 Supabase 테이블과 RLS insert 정책
- `supabase/share-storage.sql`: 공유 이미지 저장용 Supabase Storage 버킷과 RLS 정책
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
- Functions: `/api/health`, `/api/feedback`, `/api/share`

배포 후 `https://<your-vercel-domain>/api/health`에서 `imageMode`가 `browser-canvas`인지 확인하면 됩니다.

## 공유 링크 설정

결과창의 “나의 이상형 저장하기”, “내 이상형의 플랜카드 저장하기” 버튼은 PNG 파일을 바로 다운로드합니다. SNS 영역의 “나의 이상형 공유하기”, “내 이상형의 플랜카드 공유하기” 버튼은 서버에서 공유 이미지를 만들고 `/share/shares/YYYYMMDD/파일명.jpg` 형태의 짧은 링크를 공유합니다.

링크를 클릭하면 바로 테스트 메인으로 이동하지 않고, 먼저 공유 이미지가 보이는 전용 미리보기 페이지가 열립니다. 그 페이지의 `테스트하러 가기` 버튼을 누르면 앱 메인으로 이동합니다. 이 구조가 필요한 이유는 페이스북 같은 SNS 크롤러가 링크의 `og:image` 메타 태그를 읽어 미리보기 이미지를 만들기 때문입니다. 예전 긴 `/share?img=...&title=...` 링크도 계속 열 수 있지만, 새로 생성되는 링크는 짧은 경로형 링크입니다.

Supabase Storage를 쓰려면 Supabase SQL Editor에서 `supabase/share-storage.sql`을 한 번 실행하고 Vercel 환경변수에 아래 값을 추가합니다.

```text
SUPABASE_SHARE_BUCKET=ideal-type-shares
```

현재 앱은 공유 이미지 업로드에도 기존 Supabase 연결 값을 재사용합니다.

```text
SUPABASE_URL=https://vvqpajzjkcqxpvsptqvr.supabase.co
SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

`sb_publishable_...` 키를 쓸 경우 `supabase/share-storage.sql`의 public insert/read 정책이 필요합니다. 저장소가 아직 연결되지 않았거나 정책이 없으면 공유 링크 생성 대신 브라우저가 기존처럼 이미지 저장 fallback을 시도합니다.

### 공유 이미지 확인/관리

Supabase Dashboard에서 직접 볼 수 있습니다.

1. Supabase 프로젝트 `vvqpajzjkcqxpvsptqvr` 열기
2. 왼쪽 메뉴 `Storage` 선택
3. `ideal-type-shares` 버킷 선택
4. `shares/YYYYMMDD/` 폴더에서 생성된 공유 이미지 확인

공유 이미지는 링크 미리보기를 위해 Storage에 저장됩니다. 반면 검사 답변 원문과 성향 결과 데이터는 공유 API에 저장하지 않습니다.

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
