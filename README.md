# 내 이상형을 돌려도!

질문 20개, 50개, 100개 중 하나를 골라 답변하면 이상형 성향을 추론하고, 브라우저 `canvas`로 AI 스타일 초상 이미지를 생성하는 정적 웹 앱입니다.

## 실행

`index.html`을 브라우저에서 바로 열면 됩니다.

## 구성

- `index.html`: 앱 구조
- `styles.css`: 핑크빛 로고와 반응형 UI
- `app.js`: 질문 뱅크, 성향 추론, 이미지 생성 로직
- `supabase-schema.sql`: 익명 결과 저장용 Supabase 테이블/RLS 정책

## Supabase 저장

앱은 결과가 생성될 때 `ideal_type_results` 테이블에 익명 결과를 저장합니다. Supabase SQL Editor에서 `supabase-schema.sql`을 먼저 실행하면 저장이 활성화됩니다.

테이블이 없거나 RLS 정책이 다르면 앱 자체는 계속 작동하고, 결과 화면에 저장 확인 메시지만 표시됩니다.

## Vercel 배포

이 프로젝트는 Vercel 정적 사이트로 바로 배포할 수 있습니다.

```bash
npm run local
npm run preview
npm run deploy
```

- `vercel.json`: 정적 배포, clean URL, 기본 보안 헤더
- `.vercelignore`: 배포에 필요 없는 로컬/OMX 파일 제외
- `package.json`: 로컬 실행, Vercel preview/prod 배포 명령

Vercel 대시보드에서 Git 저장소를 Import해도 동일하게 배포됩니다. Build Command는 비워두거나 `npm run vercel-build`를 사용하고, Output Directory는 프로젝트 루트 그대로 두면 됩니다.
