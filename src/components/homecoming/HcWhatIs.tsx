import Image from "next/image";
import { Reveal } from "@/components/Reveal";

const STATS = [
  { value: "2017", label: "Since · 학생 주도" },
  { value: "11회", label: "누적 행사 운영" },
  { value: "900+", label: "누적 참가자" },
];

export function HcWhatIs() {
  return (
    <section id="about" className="relative scroll-mt-20 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Reveal>
              <span className="eyebrow">What is — 하이톤이란</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                학생이 만들고,
                <br />
                <span className="text-stroke">학생이 키운 7년.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
                하이톤은 특정 기업의 지속 후원이 아닌,{" "}
                <span className="font-semibold text-ink">
                  고등학교 재학생 운영진이 직접 후원을 유치하여 운영해 온 단체
                </span>
                입니다. 2017년 시작해 11회의 해커톤을 거치며 누적 900여 명의 IT
                인재를 배출한, 국내 유일의 학생 주도 커뮤니티입니다.
              </p>
            </Reveal>

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-8">
              {STATS.map((s, i) => (
                <Reveal key={s.value} delay={0.12 + i * 0.06}>
                  <div>
                    <div className="font-display text-3xl font-extrabold sm:text-4xl">
                      {s.value}
                    </div>
                    <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-faint">
                      {s.label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.15}>
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-line">
              <Image
                src="/homecoming/group.jpg"
                alt="역대 하이톤 단체 사진"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover grayscale contrast-110"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
