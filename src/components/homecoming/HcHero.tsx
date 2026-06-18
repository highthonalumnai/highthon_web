import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowDown, CalendarDays, MapPin } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { HC_EVENT, HC_SPONSORS, HC_LOCATION } from "@/lib/homecoming";

export function HcHero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-ink text-paper"
    >
      {/* grayscale cover photo — right half on desktop, faint full-bleed on mobile */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 md:left-1/2">
          <Image
            src="/homecoming/hero.jpg"
            alt="하이톤 홈커밍데이 세미나 현장"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover opacity-30 grayscale contrast-125 md:opacity-60"
          />
        </div>
        {/* fade the photo into the black base */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30 md:via-ink/70 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 pb-24 pt-28 sm:px-8">
        <Reveal>
          <div className="mb-7 flex items-center gap-3">
            <span className="h-px w-10 bg-paper" />
            <span className="eyebrow text-paper">HIGHTHON Alumni Meetup · 참가 신청</span>
          </div>
        </Reveal>

        <h1 className="font-display font-extrabold leading-[0.9] tracking-tight">
          <Reveal delay={0.05}>
            <span className="block text-[clamp(2.7rem,8.5vw,7rem)]">HIGHTHON :</span>
          </Reveal>
          <Reveal delay={0.12}>
            <span className="block text-[clamp(2.7rem,8.5vw,7rem)] text-stroke-paper">
              HOMECOMING
            </span>
          </Reveal>
          <Reveal delay={0.19}>
            <span className="block text-[clamp(2.7rem,8.5vw,7rem)]">DAY</span>
          </Reveal>
        </h1>

        <Reveal delay={0.22}>
          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-paper/25 px-4 py-2">
              <CalendarDays size={15} className="text-paper" />
              <span className="font-mono text-xs uppercase tracking-widest text-paper">
                {HC_EVENT.dateFull}
              </span>
            </div>
            <a
              href={HC_LOCATION.naverUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full border border-paper/25 px-4 py-2 transition-colors hover:border-paper/60"
            >
              <MapPin size={15} className="text-paper" />
              <span className="text-xs tracking-wide text-paper">{HC_LOCATION.address}</span>
              <ArrowUpRight size={13} className="text-paper/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.26}>
          <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-paper/60 sm:text-base">
            우리는 연결의 힘을 믿습니다. 고등학생이었던 하이톤 참가자들이 현업
            전문가가 되어 다시 만나는 ‘하이톤 홈커밍데이’. 비슷한 성장 배경을 가진
            100여 명의 IT 실무자들과 하루를 함께할 당신을 초대합니다.
          </p>
        </Reveal>

        <Reveal delay={0.32}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/homecoming/ticket"
              className="group inline-flex items-center gap-2 rounded-full bg-paper px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-wider text-ink transition hover:scale-[1.03] hover:bg-[#e5e5e5]"
            >
              티켓 예약
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-full border border-paper/30 px-7 py-3.5 font-mono text-sm uppercase tracking-wider text-paper transition hover:bg-paper hover:text-ink"
            >
              행사 살펴보기
              <ArrowDown size={16} />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-paper/15 pt-6">
            <span className="font-mono text-[11px] uppercase tracking-widest text-paper/40">
              Sponsored by
            </span>
            {HC_SPONSORS.map((s) => (
              <span
                key={s}
                className="font-display text-base font-bold tracking-tight text-paper/85"
              >
                {s}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
