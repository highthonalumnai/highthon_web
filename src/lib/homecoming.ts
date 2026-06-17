// HIGHTHON : HOMECOMING DAY — 후원제안서 콘텐츠 (HHCD_후원제안서.pdf 원문 기반)

export const HC_EVENT = {
  dateFull: "2026. 07. 25 (토)",
  dateShort: "2026.07.25",
} as const;

export const HC_CONTACT = {
  email: "highthon.alumnai@gmail.com",
  instagram: "https://www.instagram.com/highthon_homecomingday/",
  instagramHandle: "@highthon_homecomingday",
} as const;

export const HC_NAV = [
  { label: "소개", href: "#about" },
  { label: "비전", href: "#vision" },
  { label: "타겟", href: "#target" },
  { label: "일정", href: "#schedule" },
  { label: "후원", href: "#benefits" },
] as const;

export const HC_VISION = [
  {
    no: "01",
    title: "다양한 교류",
    body: "다양한 커리어와 삶의 방향성을 나누고 함께 고민합니다.",
    img: "/homecoming/vision-1.jpg",
  },
  {
    no: "02",
    title: "시너지 창출",
    body: "참가자들 간의 네트워킹을 통해 새로운 시너지를 기대합니다.",
    img: "/homecoming/vision-2.jpg",
  },
  {
    no: "03",
    title: "지속적 성장",
    body: "단순한 일회성 행사가 아닌, 지속적으로 교류하고 함께 성장하는 커뮤니티를 지향합니다.",
    img: "/homecoming/vision-3.jpg",
  },
] as const;

export const HC_DIFFERENTIATION = [
  {
    title: "다양한 커리어 스펙트럼",
    body: "유망 스타트업부터 글로벌 대기업에 이르기까지, 다양한 환경의 개발자·기획자·디자이너들이 한데 모입니다.",
  },
  {
    title: "유사한 백그라운드",
    body: "비슷한 추억과 관점을 공유하여 더 빠르고 깊이 있는 네트워킹이 가능합니다.",
  },
  {
    title: "다양한 경험 공유",
    body: "일찍 IT로 진로를 결정했지만 다양한 선택과 경험을 하게 된 사람들이 모여 더 풍부한 행사가 됩니다.",
  },
  {
    title: "솔직한 고민 나눔",
    body: "주요 흐름과 다른 선택을 한 참가자들이 많아, 현업의 실제 고민들을 나눌 수 있습니다.",
  },
  {
    title: "전문성",
    body: "주니어보다 미들·시니어 현업 종사자 비율이 높을 것으로 예상됩니다.",
  },
] as const;

export const HC_SCHEDULE = [
  { time: "12:15 – 01:00", program: "참가자 신청 등록", detail: "등록, 착석, 서브스트림 관람" },
  { time: "01:00 – 01:20", program: "키노트", detail: "행사 소개, CoC 안내, 후원사 소개" },
  { time: "01:20 – 01:40", program: "아이스브레이킹 (전체)", detail: "Kahoot 퀴즈, 빙고 등" },
  { time: "01:40 – 02:10", program: "아이스브레이킹 (조별)", detail: "자기소개, 진실 혹은 거짓" },
  { time: "02:10 – 02:30", program: "쉬는 시간", detail: "(후원사 및 서브 스트림 확인 가능)", muted: true },
  { time: "02:30 – 04:10", program: "라이트닝 토크", detail: "참가자 5–10분 발표 및 조별 토크" },
  { time: "04:10 – 04:30", program: "쉬는 시간", detail: "(후원사 및 서브 스트림 확인 가능)", muted: true },
  { time: "04:30 – 05:30", program: "자유 네트워킹", detail: "자유로운 소통 및 그룹 형성" },
  { time: "05:30 – 05:50", program: "경품 세션", detail: "후원사 경품 등 경품 추첨을 통해 증정" },
  { time: "05:50 – 06:00", program: "행사 마무리", detail: "단체 사진, 만족도 설문" },
  { time: "06:00 –", program: "뒷풀이", detail: "사전 신청자 대상" },
] as const;

export const HC_STREAMS = [
  {
    key: "MAIN STREAM",
    body: "키노트, 아이스브레이킹, 라이트닝 토크, 자유 네트워킹 등 행사의 핵심 세션입니다.",
  },
  {
    key: "SUB STREAM",
    body: "포토월, 히스토리존, 방명록, 스탬프 랠리 등 참가자들이 자유롭게 즐길 수 있는 부가 프로그램입니다.",
  },
] as const;

export const HC_BENEFITS = [
  "키노트 세션 내 후원사 소개",
  "행사 홍보물 내 로고 노출",
  "(요청 시) 후원사 부스 운영",
  "참가자 대상 기업 홍보",
] as const;

export const HC_SPONSOR_ROOM = [
  { label: "기업 참여 부스", note: "all-time" },
  { label: "라이트닝 토크", note: "10분 (2:50–4:30 내)" },
  { label: "경품 세션", note: "20분 (5:30–5:50 내)" },
] as const;
