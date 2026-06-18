import { Reveal } from "@/components/Reveal";
import { HC_PARTICIPANT_BENEFITS } from "@/lib/homecoming";

export function HcWhy() {
  return (
    <section className="relative scroll-mt-20 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <span className="eyebrow">Why Join — 참가 혜택</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              왜 다시
              <br />
              <span className="text-stroke">모일까.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              하이톤 홈커밍데이는 단순한 행사가 아니라, 같은 길을 먼저 걷기 시작한
              사람들이 다시 연결되는 자리입니다. 당신이 얻어 갈 것들.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {HC_PARTICIPANT_BENEFITS.map((b, i) => (
            <Reveal key={b.no} delay={0.05 * i}>
              <div className="flex h-full flex-col bg-paper p-8 sm:p-10">
                <span className="font-mono text-sm tracking-widest text-faint">
                  {b.no}
                </span>
                <h3 className="mt-5 font-display text-xl font-extrabold tracking-tight sm:text-2xl">
                  {b.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  {b.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
