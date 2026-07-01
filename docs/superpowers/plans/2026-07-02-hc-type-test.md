# 하이톤 유형 테스트 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 등록 없이 누구나 푸는 "하이톤 시절 유형 테스트"(16유형·10문항)를 만들어, 결과를 유형별 공유 카드로 뿌려 행사 정보를 바이럴 확산시킨다.

**Architecture:** 순수 클라이언트 채점(DB 없음) → 결과를 URL 경로(`/homecoming/type/result/[typeId]`)로 표현 → 그 경로의 `next/og` 이미지가 유형별 공유 카드(가로 OG + 세로 스토리)를 생성. 데이터·채점은 상수 파일 하나에 격리하고, 화면은 다크 모바일 UI(최대 너비 600)로 통일한다.

**Tech Stack:** Next.js 16.2.9 (App Router), React 19, TypeScript strict, Tailwind CSS v4, `next/og` `ImageResponse`, `@vercel/analytics`, Vitest(신규, 채점 로직 단위 테스트용).

## Global Constraints

- **Next.js 16**: `params`는 **Promise**다 — 서버 컴포넌트/OG/route에서 `await params`, 클라이언트에서 `use(params)` 또는 `useParams()`. (학습 데이터의 동기 `params`와 다름.)
- **동적 라우트 프리렌더**: `result/[typeId]`는 `generateStaticParams`로 16개 id를 빌드 타임 프리렌더. 미존재 id는 `notFound()`.
- **경로 별칭**: `@/*` → `src/*`.
- **디자인 토큰(globals.css)**: `bg-ink`(#0a0a0a)·`text-paper`(#fff)·`text-muted`·`text-faint`·`border-line`·`font-display`·`font-mono`·`eyebrow`·`text-stroke-paper`. 신규 색 하드코딩 대신 유형별 `color`는 상수 데이터로 관리.
- **마퀴**: globals.css에 `@keyframes marquee` + `.marquee-track`(28s linear infinite, `prefers-reduced-motion`시 정지)이 **이미 존재** — 인트로 카드 마퀴에 재사용.
- **UI 규칙**: 모바일 퍼스트. 데스크탑도 동일 UI, 컨테이너 `max-w-[600px] mx-auto`. 인트로·문항·결과 모두 다크(`bg-ink text-paper`).
- **문항 UX**: 선택 즉시 다음 문항(별도 '다음' 버튼 없음). 진행바 10칸.
- **개인정보**: 응답·결과를 서버에 저장하지 않는다. `any` 금지, union 유지, 재할당 없으면 `const`.
- **TypeScript**: `any` 금지, strict 유지.
- **커밋**: 각 태스크 끝에서 커밋. 브랜치 `feat/hc-type-test`(이미 체크아웃됨).

---

## File Structure

```
src/lib/hcTypeTest.ts            # 타입 정의 + HC_TYPES(16) + HC_QUESTIONS(10) + scoreAnswers/유효성 (JSX 없음)
src/lib/hcTypeTest.test.ts       # Vitest: 채점·타이브레이크·데이터 무결성
src/lib/hcTypeCardImage.tsx      # typeCardImageResponse(): OG/스토리 공유 이미지 JSX (next/og 전용)
src/app/homecoming/type/
  layout.tsx                     # 다크 컨테이너(max-w-600) + 미니 헤더
  page.tsx                       # 인트로(서버) → <TypeIntro/>
  quiz/page.tsx                  # 문항 셸(서버) → <QuizRunner/>
  result/[typeId]/
    page.tsx                     # 결과(서버): generateStaticParams·generateMetadata·notFound → <TypeResult/>
    opengraph-image.tsx          # 가로 1200×630 유형별 OG(링크 프리뷰)
    card/route.ts                # GET → 세로 1080×1350 스토리 카드(PNG 다운로드)
src/components/homecoming/type/
  TypeIntro.tsx                  # 인트로 UI(클라 — 카드 마퀴)
  QuizRunner.tsx                 # 문항 진행(클라 상태) → 완료 시 결과로 push
  TypeResult.tsx                 # 결과 UI(프레젠테이션)
  ShareButtons.tsx               # 이미지 저장·링크 복사·예약 CTA (클라 + analytics)
```

기존 진입점(`HcHero`/`HcNavbar` 등)에서 테스트로 유도하는 링크는 Task 6에서 추가.

---

### Task 1: 데이터 모델 + 채점 엔진 (+ Vitest 셋업)

**Files:**
- Create: `src/lib/hcTypeTest.ts`
- Create: `src/lib/hcTypeTest.test.ts`
- Modify: `package.json` (devDep `vitest`, script `"test"`)

**Interfaces:**
- Produces:
  - `type HcJob = "dev" | "design" | "plan" | "all"`
  - `type HcTypeId`(16개 리터럴 union, 아래 데이터의 `id`들)
  - `interface HcType { id: HcTypeId; name: string; job: HcJob; emoji: string; color: string; textOnColor: "ink" | "paper"; oneLiner: string; desc: string; best: HcTypeId; worst: HcTypeId }`
  - `interface HcChoice { label: string; weights: Partial<Record<HcTypeId, number>> }`
  - `interface HcQuestion { id: number; prompt: string; choices: HcChoice[] }`
  - `const HC_TYPES: HcType[]` (16개, 선언 순서 = 타이브레이크 우선순위)
  - `const HC_QUESTIONS: HcQuestion[]` (10개)
  - `const HC_TYPE_MAP: Record<HcTypeId, HcType>`
  - `function getType(id: string): HcType | null`
  - `function isValidTypeId(id: string): id is HcTypeId`
  - `function scoreAnswers(answers: number[]): HcTypeId`

- [ ] **Step 1: Vitest 설치**

Run:
```bash
cd /Users/nick/devspace/panleeee/highthon_web
npm i -D vitest
```
Expected: `vitest` devDependencies에 추가, 설치 성공.

- [ ] **Step 2: test 스크립트 추가**

`package.json`의 `"scripts"`에 한 줄 추가(기존 항목 유지):
```json
    "lint": "eslint",
    "test": "vitest run"
```

- [ ] **Step 3: 데이터 파일 작성** — `src/lib/hcTypeTest.ts`

```ts
// 하이톤 유형 테스트 — 유형/문항 데이터 + 클라이언트 채점 (DB 없음)
// 카피는 초안. 가중치는 튜닝 가능. HC_TYPES 선언 순서가 동점 시 우선순위.

export type HcJob = "dev" | "design" | "plan" | "all";

export type HcTypeId =
  | "so_pilgrim" | "mock_master" | "motor_hands" | "must_work"
  | "pixel_smith" | "brand_world" | "slide_artist" | "mascot_fairy"
  | "scope_boom" | "cpr_pitch" | "idea_fountain" | "team_captain"
  | "lol_break" | "next_team_insider" | "deadline_alchemist" | "allnighter";

export interface HcType {
  id: HcTypeId;
  name: string;
  job: HcJob;
  emoji: string;
  /** 카드 배경색 (hex) */
  color: string;
  /** 배경색 위 텍스트 색 */
  textOnColor: "ink" | "paper";
  oneLiner: string;
  desc: string;
  best: HcTypeId;
  worst: HcTypeId;
}

export interface HcChoice {
  label: string;
  weights: Partial<Record<HcTypeId, number>>;
}

export interface HcQuestion {
  id: number;
  prompt: string;
  choices: HcChoice[];
}

export const HC_TYPES: HcType[] = [
  { id: "so_pilgrim", name: "스택오버플로우 순례자", job: "dev", emoji: "🧭", color: "#ffe14d", textOnColor: "ink",
    oneLiner: "GPT 없던 시절, 영어 질문글 다섯 탭 복붙 조합으로 기어이 굴리던 사람",
    desc: "검색력이 곧 실력이던 시대의 생존자. 에러 메시지를 통째로 복사해 붙이는 손이 누구보다 빨랐다.",
    best: "must_work", worst: "lol_break" },
  { id: "mock_master", name: "하드코딩 목업 장인", job: "dev", emoji: "🎭", color: "#5b8cff", textOnColor: "paper",
    oneLiner: "백엔드 없이 값 다 박아서 데모만큼은 완벽하게 '돌아가는 척' 시키던 사람",
    desc: "심사 시간 5분만 버티면 된다. 실제 로직은 없어도 시연은 완벽했다.",
    best: "cpr_pitch", worst: "pixel_smith" },
  { id: "motor_hands", name: "모터 손 타건왕", job: "dev", emoji: "⌨️", color: "#3ddc97", textOnColor: "ink",
    oneLiner: "생각보다 손이 먼저 나가는, 키보드 소리로 팀 사기 올리던 타이핑 머신",
    desc: "고민은 짧고 커밋은 많다. 일단 치고 본다.",
    best: "scope_boom", worst: "brand_world" },
  { id: "must_work", name: "작동 강박 완결러", job: "dev", emoji: "✅", color: "#2ec4b6", textOnColor: "ink",
    oneLiner: "눈속임 데모 못 참고 진짜 end-to-end 돌아가야 직성 풀리던 원칙주의자",
    desc: "'되는 척'은 용납 못 한다. 새벽까지 진짜 되게 만들고서야 잠들었다.",
    best: "so_pilgrim", worst: "cpr_pitch" },
  { id: "pixel_smith", name: "1px 픽셀 장인", job: "design", emoji: "📐", color: "#ff9db1", textOnColor: "ink",
    oneLiner: "남들 못 보는 1px 어긋남에 잠 못 자던 사람",
    desc: "정렬이 곧 자존심. 마감 직전에도 여백을 다시 쟀다.",
    best: "brand_world", worst: "mock_master" },
  { id: "brand_world", name: "세계관 브랜딩러", job: "design", emoji: "🌐", color: "#c8a2ff", textOnColor: "ink",
    oneLiner: "기능보다 먼저 로고·컬러·톤으로 세계관부터 세우던 사람",
    desc: "제품 이름과 무드보드가 나와야 손이 움직였다.",
    best: "pixel_smith", worst: "motor_hands" },
  { id: "slide_artist", name: "슬라이드 예술가", job: "design", emoji: "🎨", color: "#ffb84d", textOnColor: "ink",
    oneLiner: "발표 자료가 그 자체로 작품, 심사위원 눈을 홀리던 사람",
    desc: "내용이 좀 부족해도 장표가 예술이면 용서됐다.",
    best: "cpr_pitch", worst: "lol_break" },
  { id: "mascot_fairy", name: "손그림 마스코트 요정", job: "design", emoji: "🧚", color: "#ffd1e8", textOnColor: "ink",
    oneLiner: "앱에 캐릭터·이모티콘 그려 넣어 심사위원 미소 짓게 하던 사람",
    desc: "귀여움은 전략이다. 마스코트 하나로 분위기를 바꿨다.",
    best: "next_team_insider", worst: "must_work" },
  { id: "scope_boom", name: "“그거 좋다” 스코프 폭발러", job: "plan", emoji: "💡", color: "#ffd93d", textOnColor: "ink",
    oneLiner: "회의 때 뭘 들어도 '오 그것도 넣자'로 기능을 불려버리던 욕심 수집가",
    desc: "아이디어는 늘 넘쳤고, 마감은 늘 촉박했다.",
    best: "motor_hands", worst: "must_work" },
  { id: "cpr_pitch", name: "발표 심폐소생술사", job: "plan", emoji: "🎤", color: "#ff6b6b", textOnColor: "paper",
    oneLiner: "밤새 망한 프로젝트도 발표 5분 말빨·스토리로 살려내던 사람",
    desc: "코드가 안 돌아가도 발표가 돌아가면 됐다.",
    best: "mock_master", worst: "must_work" },
  { id: "idea_fountain", name: "아이디어 분수", job: "plan", emoji: "⛲", color: "#4ecdc4", textOnColor: "ink",
    oneLiner: "회의실 브레인스토밍 폭죽, 기획서 술술 뽑던 발상형",
    desc: "발상은 내가, 실현은 팀이. 화이트보드를 가장 사랑했다.",
    best: "team_captain", worst: "scope_boom" },
  { id: "team_captain", name: "팀의 반장", job: "plan", emoji: "📋", color: "#45b7d1", textOnColor: "paper",
    oneLiner: "코드보다 사람을 굴려 판을 완성시키던 리더/PM형",
    desc: "역할을 나누고 일정을 챙겼다. 팀이 굴러가면 그걸로 만족.",
    best: "idea_fountain", worst: "lol_break" },
  { id: "lol_break", name: "“머리 식히러” 롤 한 판러", job: "all", emoji: "🎮", color: "#a0a0ff", textOnColor: "ink",
    oneLiner: "막히면 '잠깐 식히고 온다'며 한 판 하고 오던 중간 이탈자",
    desc: "리프레시가 곧 생산성이라 믿었다. 가끔 두 판이 되기도 했다.",
    best: "next_team_insider", worst: "so_pilgrim" },
  { id: "next_team_insider", name: "옆 팀까지 친해지는 인싸", job: "all", emoji: "🤝", color: "#ffd93d", textOnColor: "ink",
    oneLiner: "우리 팀보다 옆 팀·다른 팀과 더 친해져 나오던 새벽 네트워킹 천재",
    desc: "해커톤의 진짜 수확은 인맥. 뒤풀이의 주인공이었다.",
    best: "mascot_fairy", worst: "allnighter" },
  { id: "deadline_alchemist", name: "마감의 연금술사", job: "all", emoji: "⚗️", color: "#b388ff", textOnColor: "paper",
    oneLiner: "데모 3분 전 다 갈아엎고 기어이 살려내는 사람",
    desc: "위기에서 각성한다. 마감이 다가올수록 눈이 맑아졌다.",
    best: "motor_hands", worst: "pixel_smith" },
  { id: "allnighter", name: "밤샘 몰입러", job: "all", emoji: "🌙", color: "#2c3e50", textOnColor: "paper",
    oneLiner: "존 들어가면 해 뜨는 줄 모르던 에너지드링크 스택형",
    desc: "집중의 화신. 시간 감각은 잃었지만 결과물은 남았다.",
    best: "so_pilgrim", worst: "next_team_insider" },
];

export const HC_TYPE_MAP: Record<HcTypeId, HcType> = HC_TYPES.reduce(
  (acc, t) => { acc[t.id] = t; return acc; },
  {} as Record<HcTypeId, HcType>,
);

export const HC_QUESTIONS: HcQuestion[] = [
  { id: 1, prompt: "해커톤 첫날, 팀에서 내 포지션은?", choices: [
    { label: "일단 코드부터 잡는다", weights: { motor_hands: 1, so_pilgrim: 1 } },
    { label: "컨셉·비주얼부터 잡는다", weights: { brand_world: 1, pixel_smith: 1 } },
    { label: "아이디어·기획을 정리한다", weights: { idea_fountain: 1, team_captain: 1 } },
    { label: "분위기 메이커를 맡는다", weights: { next_team_insider: 1, mascot_fairy: 1 } },
  ]},
  { id: 2, prompt: "에러가 터졌다. 그때 나는?", choices: [
    { label: "스택오버플로우 정독", weights: { so_pilgrim: 2 } },
    { label: "일단 다 지우고 재작성", weights: { deadline_alchemist: 1, motor_hands: 1 } },
    { label: "옆자리 붙잡고 물어봄", weights: { next_team_insider: 1, team_captain: 1 } },
    { label: "일단 print문 도배", weights: { allnighter: 1, deadline_alchemist: 1 } },
  ]},
  { id: 3, prompt: "데모 30분 전, 우리 팀 상태는?", choices: [
    { label: "안 되면 갈아엎는 중", weights: { deadline_alchemist: 2 } },
    { label: "하드코딩으로 돌아가는 척 세팅", weights: { mock_master: 2 } },
    { label: "발표 대본 다듬는 중", weights: { cpr_pitch: 1, slide_artist: 1 } },
    { label: "픽셀·정렬 마지막 손질", weights: { pixel_smith: 1, brand_world: 1 } },
  ]},
  { id: 4, prompt: "발표를 맡게 됐다. 내 무기는?", choices: [
    { label: "말빨·스토리텔링", weights: { cpr_pitch: 2 } },
    { label: "예술 같은 슬라이드", weights: { slide_artist: 2 } },
    { label: "귀여운 데모·캐릭터", weights: { mascot_fairy: 1, brand_world: 1 } },
    { label: "진짜 되는 데모 시연", weights: { must_work: 1, mock_master: 1 } },
  ]},
  { id: 5, prompt: "새벽 3시, 나는?", choices: [
    { label: "아직 존 속, 해 뜨는 줄 모름", weights: { allnighter: 2 } },
    { label: "잠깐 롤 한 판 하고 옴", weights: { lol_break: 2 } },
    { label: "옆 팀 구경하며 친해지는 중", weights: { next_team_insider: 2 } },
    { label: "커밋 정리·머지 충돌 수습", weights: { motor_hands: 1, so_pilgrim: 1 } },
  ]},
  { id: 6, prompt: "아이디어 회의에서 내 역할은?", choices: [
    { label: "아이디어를 뿜어낸다", weights: { idea_fountain: 2 } },
    { label: "다 좋아서 다 넣자고 한다", weights: { scope_boom: 2 } },
    { label: "판을 정리하고 역할 분배", weights: { team_captain: 2 } },
    { label: "실현 가능성부터 따진다", weights: { must_work: 1, motor_hands: 1 } },
  ]},
  { id: 7, prompt: "내가 제일 못 참는 순간은?", choices: [
    { label: "1px 어긋난 정렬", weights: { pixel_smith: 2 } },
    { label: "통일 안 된 톤·컬러", weights: { brand_world: 2 } },
    { label: "안 되는데 되는 척하는 데모", weights: { must_work: 2 } },
    { label: "아무도 아이디어 안 낼 때", weights: { idea_fountain: 1, scope_boom: 1 } },
  ]},
  { id: 8, prompt: "막힐 때 나의 돌파법은?", choices: [
    { label: "검색 또 검색 (영어글 정독)", weights: { so_pilgrim: 2 } },
    { label: "손이 먼저 나감, 일단 친다", weights: { motor_hands: 2 } },
    { label: "잠깐 게임하며 리프레시", weights: { lol_break: 2 } },
    { label: "사람 모아 브레인스토밍", weights: { idea_fountain: 1, team_captain: 1 } },
  ]},
  { id: 9, prompt: "결과물의 첫인상을 책임진다면?", choices: [
    { label: "로고·세계관·톤", weights: { brand_world: 2 } },
    { label: "마스코트·일러스트", weights: { mascot_fairy: 2 } },
    { label: "발표 자료 비주얼", weights: { slide_artist: 2 } },
    { label: "일단 진짜 작동하는 기능", weights: { must_work: 1, mock_master: 1 } },
  ]},
  { id: 10, prompt: "해커톤 끝나고 나는?", choices: [
    { label: "옆 팀들이랑 다 친해져서 나옴", weights: { next_team_insider: 2 } },
    { label: "기절, 에너지드링크값 정산", weights: { allnighter: 2 } },
    { label: "다음 아이디어 벌써 구상 중", weights: { idea_fountain: 1, scope_boom: 1 } },
    { label: "코드 마무리·리팩터", weights: { must_work: 1, pixel_smith: 1 } },
  ]},
];

export function isValidTypeId(id: string): id is HcTypeId {
  return Object.prototype.hasOwnProperty.call(HC_TYPE_MAP, id);
}

export function getType(id: string): HcType | null {
  return isValidTypeId(id) ? HC_TYPE_MAP[id] : null;
}

/**
 * answers[i] = i번째 문항에서 고른 선택지 index. 가중치를 합산해 최고점 유형 id 반환.
 * 동점이면 HC_TYPES 선언 순서상 먼저 나오는 유형(결정론적).
 */
export function scoreAnswers(answers: number[]): HcTypeId {
  const scores: Record<HcTypeId, number> = HC_TYPES.reduce(
    (acc, t) => { acc[t.id] = 0; return acc; },
    {} as Record<HcTypeId, number>,
  );

  answers.forEach((choiceIdx, qIdx) => {
    const choice = HC_QUESTIONS[qIdx]?.choices[choiceIdx];
    if (!choice) return;
    for (const [id, w] of Object.entries(choice.weights)) {
      if (isValidTypeId(id)) scores[id] += w ?? 0;
    }
  });

  let best: HcType = HC_TYPES[0];
  for (const t of HC_TYPES) {
    if (scores[t.id] > scores[best.id]) best = t;
  }
  return best.id;
}
```

- [ ] **Step 4: 실패하는 테스트 작성** — `src/lib/hcTypeTest.test.ts`

```ts
import { describe, it, expect } from "vitest";
import {
  HC_TYPES, HC_QUESTIONS, scoreAnswers, isValidTypeId, getType, type HcTypeId,
} from "./hcTypeTest";

describe("hcTypeTest 데이터 무결성", () => {
  it("유형은 정확히 16개, id 중복 없음", () => {
    expect(HC_TYPES).toHaveLength(16);
    expect(new Set(HC_TYPES.map((t) => t.id)).size).toBe(16);
  });

  it("문항은 10개, 각 4지선다", () => {
    expect(HC_QUESTIONS).toHaveLength(10);
    for (const q of HC_QUESTIONS) expect(q.choices).toHaveLength(4);
  });

  it("모든 유형은 최소 한 선택지에서 가중치를 받는다 (도달 가능)", () => {
    const weighted = new Set<string>();
    for (const q of HC_QUESTIONS)
      for (const c of q.choices)
        for (const id of Object.keys(c.weights)) weighted.add(id);
    for (const t of HC_TYPES) expect(weighted.has(t.id)).toBe(true);
  });

  it("best/worst는 유효한 유형 id를 가리킨다", () => {
    for (const t of HC_TYPES) {
      expect(isValidTypeId(t.best)).toBe(true);
      expect(isValidTypeId(t.worst)).toBe(true);
    }
  });
});

describe("scoreAnswers", () => {
  it("so_pilgrim을 정조준한 응답은 so_pilgrim을 반환", () => {
    // Q2:A(+2 so), Q5:D(+1 so), Q8:A(+2 so) 나머지는 임의(0에 가깝게)
    const answers = [0, 0, 0, 0, 3, 3, 3, 0, 3, 3];
    expect(scoreAnswers(answers)).toBe<HcTypeId>("so_pilgrim");
  });

  it("동점이면 HC_TYPES 선언 순서상 먼저인 유형을 반환 (결정론적)", () => {
    // 빈 응답 → 전원 0점 동점 → 첫 유형
    expect(scoreAnswers([])).toBe(HC_TYPES[0].id);
  });

  it("잘못된 선택지 index가 있어도 throw 없이 유효한 유형 반환", () => {
    const result = scoreAnswers([99, -1, 2, 0]);
    expect(isValidTypeId(result)).toBe(true);
  });
});

describe("getType", () => {
  it("존재하는 id는 유형, 없는 id는 null", () => {
    expect(getType("so_pilgrim")?.name).toBe("스택오버플로우 순례자");
    expect(getType("nope")).toBeNull();
  });
});
```

- [ ] **Step 5: 테스트 실행 — 통과 확인**

Run: `npm test`
Expected: 모든 테스트 PASS. (만약 `so_pilgrim` 케이스가 실패하면 가중치 튜닝: 해당 응답이 다른 유형과 동점/역전되지 않는지 점수를 손으로 확인 후 문항 가중치 조정. 데이터 조정은 허용된 범위.)

- [ ] **Step 6: 커밋**

```bash
git add package.json package-lock.json src/lib/hcTypeTest.ts src/lib/hcTypeTest.test.ts
git commit -m "feat: hc type-test data model + client scoring engine with tests"
```

---

### Task 2: 공유 이미지 (OG 가로 + 스토리 세로)

**Files:**
- Create: `src/lib/hcTypeCardImage.tsx`
- Create: `src/app/homecoming/type/result/[typeId]/opengraph-image.tsx`
- Create: `src/app/homecoming/type/result/[typeId]/card/route.ts`

**Interfaces:**
- Consumes: `getType`, `HC_TYPE_MAP`, `HcType` (Task 1)
- Produces:
  - `const HC_CARD_CONFIG` — 카드 브랜드 문구·날짜·핸들·직군 라벨·사이즈(`ogSize`/`storySize`). 변경 용이성을 위한 단일 설정점.
  - `async function typeCardImageResponse(type: HcType, size: { width: number; height: number }): Promise<ImageResponse>` — `next/og`로 유형별 카드 렌더. OG(1200×630)·스토리(1080×1350) 공용.

> 참고 패턴: 기존 `src/app/homecoming/opengraph-image.tsx`가 `ImageResponse` + `readFile`로 로고를 base64 임베드한다. 동일 방식 사용. ImageResponse JSX는 Tailwind가 아니라 **인라인 style**만 지원.

> **변경 용이성(OG easy-to-change) 원칙**: 카드의 브랜드 문구·날짜·핸들·크기 등 "자주 바꾸는 값"은 파일 상단 `HC_CARD_CONFIG` 한 곳에 모은다. 레이아웃 JSX는 이 상수만 참조하므로, 문구·색·크기 수정 시 JSX를 헤집지 않고 config만 고치면 된다. OG(가로)·스토리(세로) 사이즈도 여기서 export 해 라우트가 재사용한다.

- [ ] **Step 1: 공유 카드 이미지 헬퍼** — `src/lib/hcTypeCardImage.tsx`

```tsx
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { HC_TYPE_MAP, type HcType } from "./hcTypeTest";

/**
 * 카드에서 자주 바꾸는 값은 전부 여기 모음 (레이아웃 JSX는 이 값만 참조).
 * 문구/날짜/핸들/크기 변경 시 이 객체만 수정하면 됨.
 */
export const HC_CARD_CONFIG = {
  brand: "HIGHTHON : HOMECOMING DAY",
  eyebrow: "그때 우리 팀의",
  eventDate: "2026.07.25 SAT",
  handle: "@highthon_homecomingday",
  jobLabel: { dev: "개발자", design: "디자이너", plan: "기획자", all: "공용" } as Record<HcType["job"], string>,
  /** 공유 이미지 사이즈 — 라우트가 재사용 */
  ogSize: { width: 1200, height: 630 },
  storySize: { width: 1080, height: 1350 },
} as const;

export async function typeCardImageResponse(
  type: HcType,
  size: { width: number; height: number },
): Promise<ImageResponse> {
  const cfg = HC_CARD_CONFIG;
  const logo = await readFile(join(process.cwd(), "public/homecoming/logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const fg = type.textOnColor === "paper" ? "#ffffff" : "#0a0a0a";
  const best = HC_TYPE_MAP[type.best];
  const worst = HC_TYPE_MAP[type.worst];
  const isPortrait = size.height > size.width;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column",
          background: type.color, color: fg, padding: isPortrait ? 80 : 64,
          justifyContent: "space-between", fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 26, fontWeight: 700, opacity: 0.8 }}>
          <span>{cfg.brand}</span>
          <span style={{ background: fg, color: type.color, padding: "6px 20px", borderRadius: 999, fontSize: 24 }}>
            {cfg.jobLabel[type.job]}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: isPortrait ? 180 : 130 }}>{type.emoji}</div>
          <div style={{ fontSize: 30, fontWeight: 600, opacity: 0.7 }}>{cfg.eyebrow}</div>
          <div style={{ fontSize: isPortrait ? 88 : 74, fontWeight: 800, textAlign: "center", lineHeight: 1.1 }}>
            {type.name}
          </div>
          <div style={{ fontSize: 30, textAlign: "center", opacity: 0.85, maxWidth: isPortrait ? 820 : 940, lineHeight: 1.4 }}>
            {type.oneLiner}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", flex: 1, background: fg, color: type.color, borderRadius: 20, padding: "18px 24px", fontSize: 26 }}>
              <span style={{ fontWeight: 800 }}>💘 찰떡</span>
              <span>{best.name}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", flex: 1, border: `3px solid ${fg}`, borderRadius: 20, padding: "18px 24px", fontSize: 26 }}>
              <span style={{ fontWeight: 800 }}>💥 상극</span>
              <span>{worst.name}</span>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, fontWeight: 700, opacity: 0.85 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <img src={logoSrc} width={44} height={44} alt="" />
              <span>{cfg.eventDate}</span>
            </div>
            <span>{cfg.handle}</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
```

- [ ] **Step 2: 유형별 OG 이미지(가로)** — `src/app/homecoming/type/result/[typeId]/opengraph-image.tsx`

```tsx
import { getType, HC_TYPES } from "@/lib/hcTypeTest";
import { typeCardImageResponse, HC_CARD_CONFIG } from "@/lib/hcTypeCardImage";

export const alt = "HIGHTHON : HOMECOMING DAY — 나의 하이톤 유형";
export const size = HC_CARD_CONFIG.ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return HC_TYPES.map((t) => ({ typeId: t.id }));
}

export default async function Image({ params }: { params: Promise<{ typeId: string }> }) {
  const { typeId } = await params;
  const type = getType(typeId) ?? HC_TYPES[0];
  return typeCardImageResponse(type, size);
}
```

- [ ] **Step 3: 스토리 카드(세로) route handler** — `src/app/homecoming/type/result/[typeId]/card/route.ts`

```ts
import { getType } from "@/lib/hcTypeTest";
import { typeCardImageResponse, HC_CARD_CONFIG } from "@/lib/hcTypeCardImage";

// GET /homecoming/type/result/[typeId]/card → 세로 스토리 카드 PNG
export async function GET(
  _req: Request,
  ctx: { params: Promise<{ typeId: string }> },
) {
  const { typeId } = await ctx.params;
  const type = getType(typeId);
  if (!type) return new Response("Not found", { status: 404 });
  return typeCardImageResponse(type, HC_CARD_CONFIG.storySize);
}
```

- [ ] **Step 4: 빌드로 이미지 라우트 검증**

Run: `npm run build`
Expected: 빌드 성공. 출력에 `/homecoming/type/result/[typeId]` OG 및 `/card` 라우트가 나타남(에러 없음). 타입 에러 없이 통과.

- [ ] **Step 5: 런타임 육안 확인**

Run: `npm run dev` 후 브라우저에서 확인:
- `http://localhost:3000/homecoming/type/result/so_pilgrim/opengraph-image` → 가로 노란 카드
- `http://localhost:3000/homecoming/type/result/so_pilgrim/card` → 세로 카드
- `http://localhost:3000/homecoming/type/result/pixel_smith/card` → 핑크 세로 카드(색 바뀜 확인)
Expected: 유형별 색·이모지·이름·궁합이 정확히 렌더. (확인 후 dev 종료)

- [ ] **Step 6: 커밋**

```bash
git add src/lib/hcTypeCardImage.tsx "src/app/homecoming/type/result/[typeId]/opengraph-image.tsx" "src/app/homecoming/type/result/[typeId]/card/route.ts"
git commit -m "feat: per-type share images (landscape OG + portrait story card)"
```

---

### Task 3: 타입 섹션 레이아웃 + 인트로 화면

**Files:**
- Create: `src/app/homecoming/type/layout.tsx`
- Create: `src/app/homecoming/type/page.tsx`
- Create: `src/components/homecoming/type/TypeIntro.tsx`

**Interfaces:**
- Consumes: `HC_TYPES` (Task 1)
- Produces: 라우트 `/homecoming/type`(인트로), 다크 `max-w-[600px]` 컨테이너 레이아웃.

- [ ] **Step 1: 레이아웃** — `src/app/homecoming/type/layout.tsx`

```tsx
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function TypeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ink text-paper">
      <div className="mx-auto flex min-h-screen max-w-[600px] flex-col">
        <header className="flex items-center justify-between px-5 py-4">
          <Link href="/homecoming" className="flex items-center gap-2">
            <Image src="/homecoming/logo.png" alt="" width={28} height={28} className="h-7 w-7 object-contain invert" />
            <span className="font-display text-sm font-extrabold tracking-tight">유형 테스트</span>
          </Link>
          <Link
            href="/homecoming"
            className="group inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-paper/50 transition-colors hover:text-paper"
          >
            <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-0.5" />
            소개
          </Link>
        </header>
        <main className="flex flex-1 flex-col px-5 pb-10">{children}</main>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 인트로 컴포넌트** — `src/components/homecoming/type/TypeIntro.tsx`

```tsx
"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";
import { ArrowRight } from "lucide-react";
import { HC_TYPES } from "@/lib/hcTypeTest";

// 마퀴가 끊기지 않도록 카드 배열을 2번 이어붙임(-50% 이동과 맞물림)
const MARQUEE = [...HC_TYPES, ...HC_TYPES];

export function TypeIntro() {
  return (
    <div className="flex flex-1 flex-col justify-center py-10">
      <div className="eyebrow text-paper/60">HIGHTHON HOMECOMING · 유형 테스트</div>

      <h1 className="mt-5 font-display text-[clamp(2.4rem,11vw,3.4rem)] font-extrabold leading-[1.12] tracking-tight">
        그때 우리,
        <br />
        <span className="text-stroke-paper">무슨 스타일</span>
        <br />
        이었더라?
      </h1>

      <p className="mt-5 text-sm leading-relaxed text-paper/60">
        GPT도 없던 그 시절, 밤새 해커톤 하던 당신은 어떤 팀원이었나요.
        개발자·기획자·디자이너, 16유형으로 알아보는 나의 해커톤 캐릭터.
      </p>

      <div className="mt-8 font-mono text-[11px] uppercase tracking-widest text-paper/40">
        16가지 유형 중 하나
      </div>
      <div className="mt-3 overflow-hidden">
        <div className="marquee-track flex w-max gap-2.5">
          {MARQUEE.map((t, i) => (
            <div
              key={`${t.id}-${i}`}
              className="flex h-24 w-20 shrink-0 -rotate-3 items-end rounded-xl p-2.5 text-[11px] font-bold leading-tight"
              style={{ background: t.color, color: t.textOnColor === "paper" ? "#fff" : "#0a0a0a" }}
            >
              {t.name}
            </div>
          ))}
        </div>
      </div>

      <Link
        href="/homecoming/type/quiz"
        onClick={() => track("type_test_start")}
        className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-paper px-7 py-4 font-mono text-sm font-bold uppercase tracking-wider text-ink transition hover:scale-[1.02] hover:bg-[#e5e5e5]"
      >
        테스트 시작
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
```

- [ ] **Step 3: 인트로 페이지** — `src/app/homecoming/type/page.tsx`

```tsx
import type { Metadata } from "next";
import { TypeIntro } from "@/components/homecoming/type/TypeIntro";

export const metadata: Metadata = {
  title: "그때 우리, 무슨 스타일이었더라? — 하이톤 유형 테스트",
  description: "개발자·기획자·디자이너, 16유형으로 알아보는 나의 해커톤 캐릭터. GPT도 없던 그 시절의 나는?",
};

export default function TypeTestPage() {
  return <TypeIntro />;
}
```

- [ ] **Step 4: 육안 확인**

Run: `npm run dev` → `http://localhost:3000/homecoming/type`
Expected: 다크 배경, 최대 너비 600 중앙 정렬, 큰 타이포("무슨 스타일" 반전 강조), 컬러 카드가 좌로 흐르는 마퀴, "테스트 시작" 버튼. 모바일 폭(375)과 데스크탑 모두 동일 UI. (확인 후 dev 종료)

- [ ] **Step 5: 커밋**

```bash
git add src/app/homecoming/type/layout.tsx src/app/homecoming/type/page.tsx src/components/homecoming/type/TypeIntro.tsx
git commit -m "feat: type-test intro screen + dark 600px section layout"
```

---

### Task 4: 문항 진행 화면 (QuizRunner)

**Files:**
- Create: `src/app/homecoming/type/quiz/page.tsx`
- Create: `src/components/homecoming/type/QuizRunner.tsx`

**Interfaces:**
- Consumes: `HC_QUESTIONS`, `scoreAnswers` (Task 1)
- Produces: 라우트 `/homecoming/type/quiz`. 완료 시 `/homecoming/type/result/{typeId}`로 이동.

- [ ] **Step 1: QuizRunner** — `src/components/homecoming/type/QuizRunner.tsx`

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { track } from "@vercel/analytics";
import { HC_QUESTIONS, scoreAnswers } from "@/lib/hcTypeTest";

export function QuizRunner() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const total = HC_QUESTIONS.length;
  const question = HC_QUESTIONS[step];

  function choose(choiceIdx: number) {
    const next = [...answers];
    next[step] = choiceIdx;
    setAnswers(next);

    if (step + 1 < total) {
      setStep(step + 1);
      return;
    }
    const typeId = scoreAnswers(next);
    track("type_test_complete", { type: typeId });
    router.push(`/homecoming/type/result/${typeId}`);
  }

  return (
    <div className="flex flex-1 flex-col py-8">
      {/* 진행바 */}
      <div className="flex gap-1">
        {HC_QUESTIONS.map((q, i) => (
          <span
            key={q.id}
            className={`h-1 flex-1 rounded-full ${i <= step ? "bg-paper" : "bg-paper/20"}`}
          />
        ))}
      </div>
      <div className="mt-4 font-mono text-xs uppercase tracking-widest text-paper/50">
        Q{step + 1} / {total}
      </div>

      <h2 className="mt-6 font-display text-2xl font-extrabold leading-snug sm:text-[28px]">
        {question.prompt}
      </h2>

      <div className="mt-7 flex flex-col gap-2.5">
        {question.choices.map((choice, i) => (
          <button
            key={i}
            type="button"
            onClick={() => choose(i)}
            className="rounded-xl border border-paper/25 px-4 py-4 text-left text-[15px] leading-relaxed text-paper/90 transition hover:border-paper hover:bg-paper/5 active:scale-[0.99]"
          >
            {choice.label}
          </button>
        ))}
      </div>

      <p className="mt-auto pt-8 text-center font-mono text-[11px] text-paper/40">
        선택하면 바로 다음 문항으로 넘어가요
      </p>
    </div>
  );
}
```

- [ ] **Step 2: 문항 페이지** — `src/app/homecoming/type/quiz/page.tsx`

```tsx
import { QuizRunner } from "@/components/homecoming/type/QuizRunner";

export default function QuizPage() {
  return <QuizRunner />;
}
```

- [ ] **Step 3: 육안 확인 (플로우)**

Run: `npm run dev` → `/homecoming/type` → "테스트 시작" → 10문항 선택
Expected: 각 선택 즉시 다음 문항, 진행바 채워짐, `Q1/10`~`Q10/10`, 마지막 선택 후 `/homecoming/type/result/{어떤유형}`로 이동(다음 태스크 전이라 결과 페이지는 아직 미완성일 수 있음 — URL이 result로 바뀌는지만 확인). (확인 후 dev 종료)

- [ ] **Step 4: 커밋**

```bash
git add src/app/homecoming/type/quiz/page.tsx src/components/homecoming/type/QuizRunner.tsx
git commit -m "feat: quiz runner — 10 questions, tap-to-advance, score → result route"
```

---

### Task 5: 결과 화면 + 공유 버튼

**Files:**
- Create: `src/app/homecoming/type/result/[typeId]/page.tsx`
- Create: `src/components/homecoming/type/TypeResult.tsx`
- Create: `src/components/homecoming/type/ShareButtons.tsx`

**Interfaces:**
- Consumes: `getType`, `HC_TYPES`, `HC_TYPE_MAP`, `HcType` (Task 1); `/card` 이미지 라우트 (Task 2)
- Produces: 라우트 `/homecoming/type/result/[typeId]`(서버, 프리렌더), 결과 UI + 공유/CTA.

- [ ] **Step 1: 공유 버튼(클라)** — `src/components/homecoming/type/ShareButtons.tsx`

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { Download, Link2, Check, ArrowRight } from "lucide-react";
import type { HcType } from "@/lib/hcTypeTest";

export function ShareButtons({ type }: { type: HcType }) {
  const [copied, setCopied] = useState(false);

  async function saveImage() {
    track("type_test_share", { method: "image", type: type.id });
    const res = await fetch(`/homecoming/type/result/${type.id}/card`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `highthon-${type.id}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function copyLink() {
    track("type_test_share", { method: "link", type: type.id });
    const url = `${window.location.origin}/homecoming/type/result/${type.id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard 차단 환경 무시 */
    }
  }

  return (
    <div className="mt-8 flex flex-col gap-3">
      <div className="flex gap-3">
        <button
          type="button"
          onClick={saveImage}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-paper px-5 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-ink transition hover:bg-[#e5e5e5]"
        >
          <Download size={15} /> 이미지 저장
        </button>
        <button
          type="button"
          onClick={copyLink}
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-paper/30 px-5 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-paper transition hover:bg-paper/10"
        >
          {copied ? <Check size={15} /> : <Link2 size={15} />}
          {copied ? "복사됨" : "링크 복사"}
        </button>
      </div>
      <Link
        href="/homecoming/ticket"
        onClick={() => track("type_test_reserve_click", { type: type.id })}
        className="group flex items-center justify-center gap-2 rounded-full px-6 py-4 font-mono text-sm font-bold uppercase tracking-wider text-ink transition hover:brightness-95"
        style={{ background: type.color, color: type.textOnColor === "paper" ? "#fff" : "#0a0a0a" }}
      >
        이 유형들 실제로 만나러 가기
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
```

- [ ] **Step 2: 결과 UI(프레젠테이션)** — `src/components/homecoming/type/TypeResult.tsx`

```tsx
import { HC_TYPE_MAP, type HcType } from "@/lib/hcTypeTest";
import { ShareButtons } from "./ShareButtons";

export function TypeResult({ type }: { type: HcType }) {
  const best = HC_TYPE_MAP[type.best];
  const worst = HC_TYPE_MAP[type.worst];

  return (
    <div className="flex flex-1 flex-col py-8">
      <div className="font-mono text-xs uppercase tracking-widest text-paper/50">당신의 유형은</div>

      <h1 className="mt-3 font-display text-[clamp(2rem,9vw,2.8rem)] font-extrabold leading-[1.1]">
        {type.name}
      </h1>
      <div className="mt-4 text-6xl">{type.emoji}</div>
      <p className="mt-5 text-[15px] leading-relaxed text-paper/70">{type.desc}</p>

      {/* 궁합 */}
      <div className="mt-8 font-mono text-[11px] uppercase tracking-widest text-paper/40">
        그때의 궁합
      </div>
      <div className="mt-3 flex gap-3">
        <div className="flex-1 rounded-xl bg-paper/5 p-4">
          <div className="text-sm font-bold">💘 찰떡</div>
          <div className="mt-1 text-sm text-paper/80">{best.name}</div>
        </div>
        <div className="flex-1 rounded-xl border border-paper/20 p-4">
          <div className="text-sm font-bold">💥 상극</div>
          <div className="mt-1 text-sm text-paper/80">{worst.name}</div>
        </div>
      </div>

      {/* 공유 카드 미리보기 */}
      <div className="mt-8 font-mono text-[11px] uppercase tracking-widest text-paper/40">
        공유용 카드
      </div>
      <div className="mt-3 overflow-hidden rounded-2xl border border-paper/15">
        {/* 세로 스토리 카드(1080×1350)를 그대로 미리보기 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/homecoming/type/result/${type.id}/card`}
          alt={`${type.name} 공유 카드`}
          className="w-full"
        />
      </div>

      <ShareButtons type={type} />
    </div>
  );
}
```

- [ ] **Step 3: 결과 페이지(서버)** — `src/app/homecoming/type/result/[typeId]/page.tsx`

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getType, HC_TYPES } from "@/lib/hcTypeTest";
import { TypeResult } from "@/components/homecoming/type/TypeResult";

export function generateStaticParams() {
  return HC_TYPES.map((t) => ({ typeId: t.id }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ typeId: string }> },
): Promise<Metadata> {
  const { typeId } = await params;
  const type = getType(typeId);
  if (!type) return { title: "하이톤 유형 테스트" };
  return {
    title: `나는 '${type.name}' — 하이톤 유형 테스트`,
    description: type.oneLiner,
  };
}

export default async function ResultPage(
  { params }: { params: Promise<{ typeId: string }> },
) {
  const { typeId } = await params;
  const type = getType(typeId);
  if (!type) notFound();
  return <TypeResult type={type} />;
}
```

- [ ] **Step 4: 빌드 + 플로우 검증**

Run: `npm run build`
Expected: 성공. `/homecoming/type/result/[typeId]`가 16개 정적 프리렌더로 생성(빌드 로그에 SSG 표시). 타입 에러 없음.

Run: `npm run dev` → 테스트 완주 → 결과 화면
Expected: 유형명·이모지·설명·궁합·세로 카드 미리보기 표시. "이미지 저장" → PNG 다운로드. "링크 복사" → 복사됨 표시. "만나러 가기" → `/homecoming/ticket` 이동. 잘못된 URL(`/homecoming/type/result/xxx`) → 404. (확인 후 dev 종료)

- [ ] **Step 5: 커밋**

```bash
git add "src/app/homecoming/type/result/[typeId]/page.tsx" src/components/homecoming/type/TypeResult.tsx src/components/homecoming/type/ShareButtons.tsx
git commit -m "feat: type-test result screen with share card, 궁합, and reserve CTA"
```

---

### Task 6: 진입점 연결 + 최종 검증

**Files:**
- Modify: `src/components/homecoming/HcHero.tsx` (히어로에 유형 테스트 진입 버튼 추가)

**Interfaces:**
- Consumes: 라우트 `/homecoming/type` (Task 3)

- [ ] **Step 1: 히어로에 테스트 진입 버튼 추가**

`src/components/homecoming/HcHero.tsx`에서 기존 "행사 살펴보기" 링크(약 92–99행, `<a href="#about">…행사 살펴보기…</a>`) **바로 아래**에 유형 테스트 링크를 추가한다(`TrackedLink`는 이미 import되어 있음):

```tsx
            <TrackedLink
              href="/homecoming/type"
              event="type_test_start"
              eventData={{ location: "hc_hero" }}
              className="group inline-flex items-center gap-2 rounded-full border border-paper/30 px-7 py-3.5 font-mono text-sm uppercase tracking-wider text-paper transition hover:bg-paper hover:text-ink"
            >
              내 유형 테스트
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </TrackedLink>
```

> `ArrowUpRight`는 파일 상단에 이미 import되어 있으니 추가 import 불필요.

- [ ] **Step 2: 전체 검증 (테스트 + 린트 + 빌드)**

Run:
```bash
npm test && npm run lint && npm run build
```
Expected: 테스트 PASS, 린트 통과(경고 0 목표), 빌드 성공.

- [ ] **Step 3: 육안 최종 확인**

Run: `npm run dev`
- `/homecoming` 히어로에 "내 유형 테스트" 버튼 → 클릭 → 인트로
- 인트로 → 문항 10개 → 결과 → 이미지 저장/링크 복사/예약 CTA 모두 동작
- 서로 다른 응답으로 2회 실행 시 다른 유형이 나오는지(채점 반영) 확인
Expected: 전체 바이럴 루프가 끊김 없이 동작. (확인 후 dev 종료)

- [ ] **Step 4: 커밋**

```bash
git add src/components/homecoming/HcHero.tsx
git commit -m "feat: link type-test from homecoming hero"
```

---

## Self-Review (작성자 체크 완료)

**Spec coverage**
- 16유형·직군 4/4/4/4 → Task 1 데이터 ✓
- 10문항 클라이언트 채점, DB 없음 → Task 1 `scoreAnswers`, 서버 저장 없음 ✓
- URL 결과 공유 `/result/[typeId]` → Task 5 `generateStaticParams`+`notFound` ✓
- 공유 이미지 2종(가로 OG + 세로 스토리) → Task 2 ✓
- 다크 모바일 UI, max-w-600 → Task 3 layout ✓
- 인트로 다크+카드 마퀴 → Task 3(`marquee-track` 재사용) ✓
- 문항 다크 심플, 탭 즉시 다음 → Task 4 ✓
- 결과 리빌+섹션 + 궁합 + 공유/CTA → Task 5 ✓
- analytics 이벤트(`type_test_start/complete/share/reserve_click`) → Task 3/4/5 ✓
- 진입점 → Task 6 ✓

**Placeholder scan**: 모든 스텝에 실제 코드/명령/기대 출력 포함. TBD 없음.

**Type consistency**: `HcTypeId`·`HcType`·`scoreAnswers(number[])→HcTypeId`·`getType(string)→HcType|null`·`typeCardImageResponse(HcType,{width,height})`가 Task 1/2/5 전반에서 일치. `params: Promise<{ typeId: string }>` (Next 16) 전 라우트 통일.

**열린 질문(구현 중 판단)**: 세로 카드 1080×1350 채택(피드/스토리 겸용). `so_pilgrim` 채점 테스트가 실패하면 가중치 미세조정 허용(데이터 튜닝).
