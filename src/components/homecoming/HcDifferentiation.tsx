import { Reveal } from "@/components/Reveal";
import { HC_DIFFERENTIATION } from "@/lib/homecoming";

export function HcDifferentiation() {
  return (
    <section className="relative bg-ink py-28 text-paper sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <span className="eyebrow text-paper">Differentiation — 행사의 차별점</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            왜 이 네트워크가
            <br />
            <span className="text-stroke-paper">특별한가.</span>
          </h2>
        </Reveal>

        <ol className="mt-16">
          {HC_DIFFERENTIATION.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.05}>
              <li className="group grid grid-cols-1 gap-3 border-t border-paper/15 py-7 transition-colors hover:bg-paper/[0.03] sm:grid-cols-[3rem_1fr_1.2fr] sm:gap-8 sm:px-3">
                <span className="font-mono text-sm text-paper/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl font-bold sm:text-2xl">
                  {d.title}
                </h3>
                <p className="max-w-xl text-[15px] leading-relaxed text-paper/55">
                  {d.body}
                </p>
              </li>
            </Reveal>
          ))}
          <li className="border-t border-paper/15" />
        </ol>
      </div>
    </section>
  );
}
