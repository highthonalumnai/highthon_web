import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { HC_STREAMS } from "@/lib/homecoming";

export function HcProgramDetail() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 text-paper sm:py-36">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/homecoming/vision-2.jpg"
          alt="프로그램 현장"
          fill
          sizes="100vw"
          className="object-cover opacity-20 grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <span className="eyebrow text-paper">Program Detail — 세부 프로그램</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            두 개의 스트림으로
            <br />
            <span className="text-stroke-paper">빈틈 없이.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {HC_STREAMS.map((s, i) => (
            <Reveal key={s.key} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-paper/15 bg-paper/[0.04] p-8 backdrop-blur-sm transition-colors hover:border-paper/40">
                <span className="font-mono text-sm font-bold tracking-widest text-paper/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl">
                  {s.key}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-paper/60">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
