import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { HC_CONTACT, HC_EVENT } from "@/lib/homecoming";

function HomeBadge() {
  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center">
      {/* house outline */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full text-paper/15"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M30 78 L100 28 L170 78 L170 172 L30 172 Z" />
        <path d="M16 86 L100 26 L184 86" strokeWidth="3" />
      </svg>
      <div className="relative text-center font-display font-extrabold leading-[0.95] tracking-tight text-paper/30">
        <div className="text-2xl">HIGHTHON</div>
        <div className="text-[2.6rem]">HOME</div>
        <div className="text-[2.6rem]">COMING</div>
        <div className="text-2xl">DAY</div>
      </div>
    </div>
  );
}

export function HcFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-widest text-paper/50">
                {HC_EVENT.dateFull}
              </p>
            </Reveal>
            <Reveal delay={0.04}>
              <p className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                다시 만나요,
                <br />
                <span className="text-stroke-paper">홈커밍데이.</span>
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-5 text-[15px] leading-relaxed text-paper/60">
                정원 100명 한정. 자리가 마감되기 전에 예약하세요.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/homecoming/ticket"
                  className="group inline-flex items-center gap-2 rounded-full bg-paper px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-wider text-ink transition hover:scale-[1.03] hover:bg-[#e5e5e5]"
                >
                  티켓 예약
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  href="/homecoming/ticket/check"
                  className="inline-flex items-center gap-2 rounded-full border border-paper/30 px-7 py-3.5 font-mono text-sm uppercase tracking-wider text-paper transition hover:bg-paper hover:text-ink"
                >
                  예약 조회
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-12">
                <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-paper">
                  Follow Us
                </h3>
                <a
                  href={HC_CONTACT.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-4 inline-flex items-center gap-1 font-display text-lg font-bold transition-colors hover:text-paper/70"
                >
                  {HC_CONTACT.instagramHandle}
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <HomeBadge />
          </Reveal>
        </div>

        <div className="mt-20 flex flex-col gap-2 border-t border-paper/15 pt-6 font-mono text-xs text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} HIGHTHON : HOMECOMING DAY</span>
          <Link
            href="/homecoming/sponsor"
            className="group inline-flex items-center gap-1 uppercase tracking-widest transition-colors hover:text-paper/70"
          >
            기업 후원 문의
            <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
