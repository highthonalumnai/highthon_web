# 하이톤 홈커밍 웹

하이톤 홈커밍 행사 안내 · 티켓 예약 · 후원 · 관리자 페이지를 제공하는 [Next.js](https://nextjs.org) (App Router) 웹앱입니다.

## 기술 스택

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4**
- **Supabase** — 데이터/RPC (티켓·후원 로직은 `SECURITY DEFINER` RPC + RLS)
- **Nodemailer** — Gmail SMTP 메일 발송
- **Zod** — 입력 검증
- **Vitest** — 테스트

## 사전 준비

- **Node.js 20 이상** (개발 환경은 v22 사용 중)
- npm
- Supabase 프로젝트 (URL · anon 키, 티켓/후원 RPC 함수 배포)
- 메일 발송용 Gmail 계정 + [앱 비밀번호](https://support.google.com/accounts/answer/185833)

## 시작하기

```bash
# 1. 의존성 설치
npm install

# 2. 환경변수 설정 (아래 표 참고)
cp .env.example .env.local   # 파일이 없다면 직접 .env.local 생성

# 3. 개발 서버 실행
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 확인합니다.

## 환경변수

`.env.local` 파일에 아래 값을 설정합니다. (`.env*` 는 gitignore 처리되어 커밋되지 않습니다.)

| 변수 | 용도 | 필수 |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon(publishable) 키 | ✅ |
| `ADMIN_PASSWORD` | 관리자 로그인 비밀번호 | ✅ |
| `ADMIN_COOKIE_SECRET` | 관리자 세션 쿠키 서명 시크릿 | ✅ |
| `ADMIN_API_SECRET` | 관리자 RPC 인증 시크릿 (Supabase 측 bcrypt 값과 일치) | ✅ |
| `GMAIL_USER` | 발송용 Gmail 주소 | ✅ |
| `GMAIL_APP_PASSWORD` | Gmail 앱 비밀번호 | ✅ |
| `CRON_SECRET` | 크론 엔드포인트 인증용 시크릿 | 크론 사용 시 |

## 스크립트

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 빌드 결과 실행 |
| `npm run lint` | ESLint 검사 |
| `npm run test` | Vitest 테스트 실행 |

## 프로젝트 구조

```
src/
├─ app/                 # App Router 페이지 · API 라우트
│  └─ api/              # 티켓 예약, 후원, 관리자, 크론 등 서버 라우트
├─ components/          # UI 컴포넌트 (ticket, homecoming, admin …)
└─ lib/                 # 도메인 로직 · Supabase 클라이언트 · 검증 스키마 · 메일
```

참가 자격(출생 연도 상한 등) 같은 도메인 상수는 `src/lib/tickets.ts` 에 모여 있습니다.

> ⚠️ 티켓/후원 검증 로직은 프론트(zod)와 **Supabase RPC 함수 양쪽**에 존재합니다.
> 참가 자격 등 규칙을 바꿀 때는 `src/lib` 뿐 아니라 Supabase 측 RPC 함수도 함께 수정해야 합니다.

## 배포

[Vercel](https://vercel.com) 에 배포합니다. 환경변수를 프로젝트 설정에 동일하게 등록하고, 크론이 필요한 경우 `CRON_SECRET` 과 크론 스케줄을 함께 구성합니다.
