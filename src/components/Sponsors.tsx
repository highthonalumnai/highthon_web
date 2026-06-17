import { Reveal } from "./Reveal";
import { CONTACT_EMAIL, SPONSORS } from "@/lib/links";

export function Sponsors() {
  return (
    <section
      id="sponsors"
      className="relative scroll-mt-20 border-y border-line bg-surface/60 py-28 sm:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <Reveal>
              <span className="eyebrow">Sponsors — 함께한 분들</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
                학생들의 밤을
                <br />
                응원해 준 파트너.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
                여러 기업의 후원이 무대를 더 단단하게 만들어 줍니다. 일례로 제11회
                하이톤에서는 JetBrains가 IDE와 AI 라이선스를 지원해, 참가자들이 바뀐
                개발 환경을 직접 경험할 수 있었습니다.
              </p>
            </Reveal>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {SPONSORS.map((s, i) => (
                <Reveal key={s} delay={i * 0.07}>
                  <div className="flex aspect-[3/2] items-center justify-center rounded-xl border border-line bg-paper px-4 text-center transition-colors hover:border-line-strong">
                    <span className="font-display text-lg font-bold text-ink sm:text-xl">
                      {s}
                    </span>
                  </div>
                </Reveal>
              ))}
              <Reveal delay={SPONSORS.length * 0.07}>
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=하이톤 후원 문의`}
                  className="group flex aspect-[3/2] items-center justify-center rounded-xl border border-dashed border-line bg-transparent px-4 text-center transition-colors hover:border-ink"
                >
                  <span className="font-mono text-xs uppercase tracking-widest text-faint transition-colors group-hover:text-ink">
                    + 후원사 모집 중
                  </span>
                </a>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <p className="mt-5 font-mono text-xs text-faint">
                * 회차별 후원사는 매년 달라집니다. 함께하고 싶다면{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=하이톤 후원 문의`}
                  className="text-ink underline underline-offset-4"
                >
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
