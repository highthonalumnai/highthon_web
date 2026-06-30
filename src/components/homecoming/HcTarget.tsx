import Image from "next/image";
import { Reveal } from "@/components/Reveal";

export function HcTarget() {
  return (
    <section id="target" className="relative scroll-mt-20 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line">
              <Image
                src="/homecoming/target.jpg"
                alt="네트워킹 현장의 참가자들"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover grayscale contrast-110"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-ink/35 text-paper">
                <span className="font-display text-[clamp(3.5rem,10vw,7rem)] font-extrabold leading-none">
                  100+
                </span>
                <span className="mt-1 font-mono text-sm uppercase tracking-widest">
                  명의 참가자
                </span>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="eyebrow">Who Joins — 참가 대상</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                “하이톤을 기억하는
                <br />
                성인 <span className="text-stroke">(04년생 이전).”</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
                당신처럼 일찍 IT 진로를 택한 사람이라면 누구나 환영합니다.
                100명의 참가자와 10명의 운영진이 함께 만드는 하루입니다.
              </p>
            </Reveal>
            <div className="mt-10 flex gap-10 border-t border-line pt-8">
              <Reveal delay={0.14}>
                <div>
                  <div className="font-display text-3xl font-extrabold sm:text-4xl">100</div>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-faint">
                    참가자
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div>
                  <div className="font-display text-3xl font-extrabold sm:text-4xl">10</div>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-faint">
                    운영진
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
