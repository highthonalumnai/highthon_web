import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { ARCHIVE, SOCIALS } from "@/lib/links";

export function Archive() {
  return (
    <section id="archive" className="relative scroll-mt-20 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Reveal>
              <span className="eyebrow">Archive — 만들어 온 것들</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
                밤새 만든 결과물.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <a
              href={SOCIALS.github}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1.5 font-mono text-sm uppercase tracking-widest text-muted transition-colors hover:text-ink"
            >
              github.com/highthon
              <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ARCHIVE.map((p, i) => (
            <Reveal key={p.repo} delay={i * 0.05}>
              <a
                href={`${SOCIALS.github}/${p.repo}`}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-surface/60 p-6 transition-colors hover:border-line-strong hover:bg-ink"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest text-faint transition-colors group-hover:text-paper/70">
                    {p.stack}
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-faint transition-colors group-hover:text-paper"
                  />
                </div>
                <h3 className="mt-10 font-display text-2xl font-bold text-ink transition-colors group-hover:text-paper">
                  {p.name}
                </h3>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 font-mono text-xs text-faint">
            * 역대 참가 팀들이 하이톤 GitHub 조직에 공개한 실제 프로젝트입니다.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
