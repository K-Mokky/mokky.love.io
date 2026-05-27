# 내 이상형을 돌려도!

질문 20개, 50개, 100개 중 하나를 골라 답변하면 이상형 성향을 추론하고, 브라우저 canvas로 가상의 사진 스타일 이상형 이미지를 만들어주는 웹 앱입니다.

- 앱 이름: **내 이상형을 돌려도!**
- 제작자: **KMokky**
- 로고/브랜드: 핑크빛 룰렛 + 하트 무드
- GitHub 저장소: <https://github.com/K-Mokky/mokky.love.io>

## 주요 기능

- 서로 다른 100개 질문 뱅크에서 20/50/100개 모드별 랜덤 출제
- 이상형 이미지 생성 전 성별과 나이대 선택
- 답변별 성향 점수 계산과 Top trait 기반 이상형 설명 생성
- 브라우저 `canvas`로 가상의 사진 스타일 이상형 이미지 생성
- 검사 내용과 이미지를 서버/DB에 저장하지 않는 로컬 생성 구조
- 생성된 사진만 공유하거나 사진+결과 정보 플랜카드로 공유
- Vercel 정적 페이지 + Serverless Functions 배포 구성

## 파일 구성

- `index.html`: 앱 구조
- `styles.css`: 핑크빛 로고와 반응형 UI
- `app.js`: 질문 뱅크, 성향 추론, 결과 UI, 사진 스타일 canvas 이미지와 공유 이미지 생성
- `api/health.js`: 배포 상태 확인
- `vercel.json`: Vercel 배포/함수 설정
- `.env.example`: Vercel 환경변수 템플릿

## 로컬 실행

```bash
npm run local
```

그다음 <http://127.0.0.1:5173>을 열면 됩니다. 이미지 생성은 브라우저에서만 처리되므로 별도 API 키나 DB가 필요 없어요.

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
- Functions: `/api/health`

배포 후 `https://<your-vercel-domain>/api/health`에서 `imageMode`가 `browser-canvas`인지 확인하면 됩니다.

## 검증

```bash
npm run check
npm test
```
