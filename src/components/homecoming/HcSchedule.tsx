import { Reveal } from "@/components/Reveal";
import { HC_SCHEDULE, HC_EVENT } from "@/lib/homecoming";

export function HcSchedule() {
  return (
    <section
      id="schedule"
      className="relative scroll-mt-20 border-y border-line bg-surface/60 py-28 sm:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <Reveal>
              <span className="eyebrow">Main Schedule — 행사 주요 일정</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                12시부터
                <br />
                밤까지, 한 흐름.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-paper">
                {HC_EVENT.dateFull}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-muted">
                등록부터 키노트, 라이트닝 토크, 자유 네트워킹, 경품 세션까지 — 하루
                전체가 연결을 위해 설계되어 있습니다.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="overflow-hidden rounded-2xl border border-line bg-paper">
              {/* header (desktop) */}
              <div className="hidden grid-cols-[10rem_1fr_1.2fr] gap-4 border-b border-line bg-ink px-6 py-4 font-mono text-xs uppercase tracking-widest text-paper sm:grid">
                <span>시간</span>
                <span>프로그램</span>
                <span>세부 내용</span>
              </div>
              <ul className="divide-y divide-line">
                {HC_SCHEDULE.map((row, i) => (
                  <li
                    key={i}
                    className={`grid grid-cols-1 gap-1 px-6 py-4 sm:grid-cols-[10rem_1fr_1.2fr] sm:gap-4 sm:py-4 ${
                      i % 2 === 1 ? "bg-surface/50" : ""
                    }`}
                  >
                    <span className="font-mono text-sm text-ink">{row.time}</span>
                    <span className="font-display text-[15px] font-bold">
                      {row.program}
                    </span>
                    <span
                      className={`text-sm ${
                        "muted" in row && row.muted ? "text-faint" : "text-muted"
                      }`}
                    >
                      {row.detail}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
