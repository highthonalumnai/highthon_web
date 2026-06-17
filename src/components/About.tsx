import { Reveal } from "./Reveal";

const PILLARS = [
  {
    k: "BY",
    title: "고등학생에 의한",
    body: "기획, 모집, 후원 유치, 홍보, 현장 운영까지. 어른의 손을 빌리지 않고 학생 운영진이 직접 만듭니다.",
  },
  {
    k: "FOR",
    title: "고등학생을 위한",
    body: "또래의 눈높이에서 설계된 프로그램. 처음 참가해도 부담 없이 몰입할 수 있도록 배려합니다.",
  },
  {
    k: "ONLY",
    title: "고등학생들만의",
    body: "전국의 고등학생 개발자들이 모이는 단 하나의 자리. 같은 고민을 나누는 동료를 만납니다.",
  },
];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-20 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Reveal>
              <span className="eyebrow">About — 하이톤이란</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
                밤을 새워 만든 건
                <br />
                <span className="text-stroke">코드만이 아니었다.</span>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-muted">
              하이톤은 IT에 진심인 고등학생들이 모여 짧은 시간 안에 팀을 이루고,
              주어진 주제에 맞춰 프로그램·앱·서비스를 직접 만들어 발표하는
              해커톤입니다. 2017년 첫 회를 시작으로 해마다 이어져 왔고, 무박 2일의
              밤은 누군가에겐 처음으로 ‘작동하는 것’을 만든 순간이 됩니다.
              <br />
              <br />
              무엇보다 하이톤은{" "}
              <span className="font-semibold text-ink">학생들이 직접 운영하는 행사</span>
              입니다. 참가자의 마음을 가장 잘 아는 또래가 무대를 만들기에, 등수보다
              경험을, 경쟁보다 함께 성장하는 것을 더 중요하게 생각합니다.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-5 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.k} delay={i * 0.08}>
              <div className="group h-full rounded-2xl border border-line bg-surface/60 p-7 transition-colors hover:border-line-strong">
                <span className="font-mono text-sm font-bold tracking-widest text-ink">
                  {p.k}
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold text-ink">
                  {p.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
