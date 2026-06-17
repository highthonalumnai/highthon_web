import Link from "next/link";
import { ArrowUpRight, Ticket } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { HC_EVENT } from "@/lib/homecoming";

export function HcTicketCta() {
  return (
    <section id="ticket" className="relative scroll-mt-20 bg-ink py-24 text-paper sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-paper">
                <Ticket size={15} /> Ticket · {HC_EVENT.dateFull}
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
                지금, 자리를
                <br />
                <span className="text-stroke-paper">예약하세요.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-paper/60">
                회원가입 없이 이메일·전화번호만으로 예약 → 4자리 번호로 무통장 입금.
                정원 100명 한정입니다.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="flex flex-wrap gap-3">
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
        </div>
      </div>
    </section>
  );
}
