import { Reveal } from "@/components/Reveal";
import { HC_BENEFITS, HC_SPONSOR_ROOM } from "@/lib/homecoming";

export function HcBenefits() {
  return (
    <section
      id="benefits"
      className="relative scroll-mt-20 border-t border-line py-28 sm:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* left — pitch */}
          <div>
            <Reveal>
              <span className="eyebrow">Sponsor Benefits — 후원사 혜택</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                귀사의 브랜드를
                <br />
                <span className="text-stroke">각인시킬 기회.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
                하이톤 홈커밍데이는 귀사의 브랜드를{" "}
                <span className="font-semibold text-ink">
                  100+ 명의 IT 전문가 및 잠재적 인재
                </span>
                들에게 각인시킬 기회입니다.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-faint">
                후원 혜택은 본 제안에 없는 것도 가능합니다. 제안 주시면 조율을 통해
                준비하겠습니다. (단, 타 후원사가 들어오면 후원 혜택이 조정될 수도
                있습니다.)
              </p>
            </Reveal>
          </div>

          {/* right — black benefit panel */}
          <Reveal delay={0.12}>
            <div className="rounded-2xl bg-ink p-8 text-paper sm:p-10">
              <div>
                <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-paper/70">
                  제공 혜택
                </h3>
                <ul className="mt-5 space-y-3">
                  {HC_BENEFITS.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-[15px]">
                      <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 bg-paper" />
                      <span className="text-paper/85">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-9 border-t border-paper/15 pt-8">
                <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-paper/70">
                  후원룸
                </h3>
                <ul className="mt-5 space-y-3">
                  {HC_SPONSOR_ROOM.map((r) => (
                    <li
                      key={r.label}
                      className="flex items-baseline justify-between gap-4 text-[15px]"
                    >
                      <span className="text-paper/85">{r.label}</span>
                      <span className="font-mono text-xs text-paper/45">{r.note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
