import { Plus } from "lucide-react";
import { Reveal } from "./Reveal";
import { FAQ } from "@/lib/links";

export function Faq() {
  return (
    <section
      id="faq"
      className="relative scroll-mt-20 border-t border-line bg-surface/60 py-28 sm:py-36"
    >
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal>
          <span className="eyebrow">FAQ — 자주 묻는 질문</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            궁금한 게 있나요?
          </h2>
        </Reveal>

        <div className="mt-12 divide-y divide-line border-y border-line">
          {FAQ.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.04}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-6 [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-lg font-bold text-ink sm:text-xl">
                    {item.q}
                  </span>
                  <Plus
                    size={20}
                    className="shrink-0 text-faint transition-transform duration-300 group-open:rotate-45 group-hover:text-ink"
                  />
                </summary>
                <p className="pb-6 pr-9 text-[15px] leading-relaxed text-muted">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
