import { Reveal } from "./Reveal";
import { TIMELINE } from "@/lib/links";

export function Timeline() {
  return (
    <section
      id="history"
      className="relative scroll-mt-20 border-y border-line bg-surface/60 py-28 sm:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Reveal>
              <span className="eyebrow">History — 연혁</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
                2017년부터,
                <br className="sm:hidden" /> 매년 새운 밤.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-[15px] leading-relaxed text-muted">
              한 번의 이벤트가 아니라, 해마다 쌓여 온 기록. 2025년 제11회까지
              하이톤은 멈추지 않았습니다.
            </p>
          </Reveal>
        </div>

        <ol className="mt-16 space-y-0">
          {TIMELINE.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.06}>
              <li className="group grid grid-cols-[auto_1fr] gap-6 border-t border-line py-7 transition-colors hover:bg-paper sm:grid-cols-[8rem_auto_1fr] sm:gap-10 sm:px-3">
                <span className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
                  {t.year}
                </span>
                <span className="hidden self-center sm:block">
                  <span className="block h-2.5 w-2.5 rounded-full border border-line-strong bg-transparent transition-colors group-hover:bg-ink" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">
                    {t.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted">
                    {t.body}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
          <li className="border-t border-line py-7">
            <p className="font-mono text-sm uppercase tracking-widest text-faint">
              그리고 다음 회차 → <span className="text-ink">추후 공지</span>
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
}
