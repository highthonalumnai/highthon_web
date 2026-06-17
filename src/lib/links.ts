export const CONTACT_EMAIL = "highthonkr@gmail.com";

export const SOCIALS = {
  instagram: "https://www.instagram.com/high_thon/",
  facebook: "https://www.facebook.com/highthon/",
  velog: "https://velog.io/@highthon/posts",
  github: "https://github.com/highthon",
} as const;

export const NAV_LINKS = [
  { label: "소개", href: "#about" },
  { label: "연혁", href: "#history" },
  { label: "진행", href: "#program" },
  { label: "후원", href: "#sponsors" },
  { label: "아카이브", href: "#archive" },
  { label: "FAQ", href: "#faq" },
] as const;

/** 조사로 확인된 사실 기반 연혁 (참가자 수 등 미확인 수치는 의도적으로 제외) */
export const TIMELINE = [
  {
    year: "2017",
    title: "제1회 하이톤",
    body: "‘고등학생들만의 해커톤’이라는 생각 하나로 첫 발을 내디뎠습니다.",
  },
  {
    year: "2018–2023",
    title: "매년 이어진 무대",
    body: "해마다 전국의 고등학생 개발자들이 모여 무박 2일의 밤을 함께 새웠습니다.",
  },
  {
    year: "2024",
    title: "더 단단해진 운영",
    body: "학생 운영진이 직접 기획·모집·후원·현장 운영까지 도맡으며 규모를 키웠습니다.",
  },
  {
    year: "2025",
    title: "제11회 하이톤",
    body: "JetBrains의 IDE·AI 라이선스 지원으로 참가자들이 바뀐 개발 환경을 직접 경험했습니다.",
  },
] as const;

export const PROGRAM = [
  {
    no: "01",
    title: "팀 빌딩 & 아이스브레이킹",
    body: "처음 만난 사이도 금방 한 팀이 되도록. 가벼운 활동으로 긴장을 풀고 역할을 나눕니다.",
  },
  {
    no: "02",
    title: "무박 2일 개발",
    body: "주어진 주제 안에서 자유롭게. 잠을 미뤄둔 채 아이디어를 작동하는 프로덕트로 만듭니다.",
  },
  {
    no: "03",
    title: "발표 & 데모",
    body: "밤을 새워 만든 결과물을 무대 위에서. 만든 사람의 언어로 직접 소개합니다.",
  },
  {
    no: "04",
    title: "공정한 심사 & 네트워킹",
    body: "투명한 기준의 심사, 그리고 같은 고민을 하는 또래 개발자들과의 연결.",
  },
] as const;

/** 보도/공식 채널로 확인된 실제 후원사 */
export const SPONSORS = ["JetBrains", "베어유", "조텍코리아"] as const;

/** github.com/highthon 에 공개된 실제 팀 프로젝트 레포 */
export const ARCHIVE = [
  { name: "memewiki", stack: "TypeScript · Web", repo: "highthon_memewiki_frontend" },
  { name: "RightSide", stack: "JavaScript · Client", repo: "highthon-RightSide-client" },
  { name: "JoMO", stack: "Swift · iOS", repo: "highthon-JoMO-iOS" },
  { name: "eti-cat", stack: "Swift · iOS", repo: "eti-cat" },
  { name: "MinJae OMZ", stack: "Kotlin · Android", repo: "highthon_minjae-omz-android" },
  { name: "MacDonald", stack: "Kotlin · Android", repo: "highthon_macdonald_android" },
] as const;

export const FAQ = [
  {
    q: "누가 참가할 수 있나요?",
    a: "소프트웨어와 IT에 관심 있는 전국의 고등학생이라면 누구나 참가할 수 있습니다. 전공·경력 제한은 없습니다.",
  },
  {
    q: "혼자서도 신청할 수 있나요?",
    a: "네. 개인으로 신청하면 현장 팀 빌딩을 통해 팀을 꾸릴 수 있고, 친구들과 미리 팀을 만들어 함께 신청해도 됩니다.",
  },
  {
    q: "개발을 잘 못해도 괜찮을까요?",
    a: "하이톤은 등수보다 함께 만들고 성장하는 경험을 더 중요하게 생각합니다. 기획·디자인·개발 어느 역할이든 환영합니다.",
  },
  {
    q: "무엇을 준비해야 하나요?",
    a: "개인 노트북과 충전기, 그리고 무박 2일을 버틸 체력이면 충분합니다. 자세한 준비물은 모집 공고에서 안내합니다.",
  },
  {
    q: "다음 회차는 언제인가요?",
    a: "하이톤은 2017년부터 매년 열려왔습니다. 다음 회차 일정과 모집 소식은 인스타그램·페이스북 채널에서 가장 먼저 공지됩니다.",
  },
];
