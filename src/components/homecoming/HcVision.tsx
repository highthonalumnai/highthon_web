import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { HC_VISION } from "@/lib/homecoming";

export function HcVision() {
  return (
    <section
      id="vision"
      className="relative scroll-mt-20 border-y border-line bg-surface/60 py-28 sm:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <span className="eyebrow">Vision — 행사의 비전</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-2xl font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            모임이 아니라,
            <br />
            <span className="text-stroke">계속되는 커뮤니티.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {HC_VISION.map((v, i) => (
            <Reveal key={v.no} delay={i * 0.08}>
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper transition-colors hover:border-line-strong">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={v.img}
                    alt={v.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover grayscale contrast-110 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <span className="font-mono text-sm font-bold tracking-widest text-faint">
                    {v.no}
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-bold">{v.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">
                    {v.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
