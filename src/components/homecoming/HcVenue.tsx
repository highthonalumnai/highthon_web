import { ArrowUpRight, MapPin } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { HC_LOCATION } from "@/lib/homecoming";

export function HcVenue() {
  return (
    <section id="venue" className="relative scroll-mt-20 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Reveal>
              <span className="eyebrow">Venue — 오시는 길</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                테헤란로에서
                <br />
                <span className="text-stroke">만나요.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-7 flex items-start gap-3">
                <MapPin size={22} className="mt-0.5 shrink-0 text-ink" />
                <p className="font-display text-xl font-bold tracking-tight sm:text-2xl">
                  {HC_LOCATION.address}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={HC_LOCATION.naverUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider text-paper transition hover:bg-[#2c2c2c]"
                >
                  네이버지도
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href={HC_LOCATION.kakaoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 font-mono text-sm uppercase tracking-wider text-ink transition hover:bg-ink hover:text-paper"
                >
                  카카오지도
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <a
              href={HC_LOCATION.naverUrl}
              target="_blank"
              rel="noreferrer"
              className="group relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-line bg-surface/60"
            >
              <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,var(--color-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-line)_1px,transparent_1px)] [background-size:36px_36px] opacity-60" />
              <div className="relative flex flex-col items-center text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-paper transition-transform group-hover:scale-105">
                  <MapPin size={26} />
                </span>
                <span className="mt-4 font-display text-lg font-bold tracking-tight">
                  {HC_LOCATION.address}
                </span>
                <span className="mt-2 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-faint transition-colors group-hover:text-ink">
                  지도에서 보기
                  <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
