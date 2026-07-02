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
