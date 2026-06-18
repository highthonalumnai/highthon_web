import { Plus } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { HC_FAQ } from "@/lib/homecoming";

export function HcFaq() {
  return (
    <section
      id="faq"
      className="relative scroll-mt-20 border-t border-line py-28 sm:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <span className="eyebrow">FAQ — 자주 묻는 질문</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                궁금한 점,
                <br />
                <span className="text-stroke">모았습니다.</span>
              </h2>
            </Reveal>
          </div>

          <div className="divide-y divide-line border-y border-line">
            {HC_FAQ.map((item, i) => (
              <Reveal key={item.q} delay={0.04 * i}>
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-6">
                    <span className="font-display text-lg font-bold tracking-tight sm:text-xl">
                      {item.q}
                    </span>
                    <Plus
                      size={20}
                      className="shrink-0 text-faint transition-transform duration-300 group-open:rotate-45"
                    />
                  </summary>
                  <p className="pb-6 pr-8 text-[15px] leading-relaxed text-muted">
                    {item.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
