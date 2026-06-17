import { Reveal } from "./Reveal";
import { PROGRAM } from "@/lib/links";

export function Program() {
  return (
    <section id="program" className="relative scroll-mt-20 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <span className="eyebrow">Program — 진행 방식</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
            낯선 사이에서 시작해
            <br />
            <span className="text-stroke">하나의 프로덕트로.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2">
          {PROGRAM.map((p, i) => (
            <Reveal key={p.no} delay={i * 0.07}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-surface/60 p-8 transition-colors hover:border-line-strong">
                <div
                  className="pointer-events-none absolute -right-8 -top-10 font-display text-[9rem] font-extrabold leading-none text-line transition-colors group-hover:text-ink/[0.06]"
                  aria-hidden
                >
                  {p.no}
                </div>
                <span className="relative font-mono text-sm font-bold tracking-widest text-ink">
                  STEP {p.no}
                </span>
                <h3 className="relative mt-4 font-display text-2xl font-bold text-ink">
                  {p.title}
                </h3>
                <p className="relative mt-3 max-w-md text-[15px] leading-relaxed text-muted">
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
