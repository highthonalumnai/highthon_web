import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { HC_CONTACT } from "@/lib/homecoming";

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

export function HcContact() {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <Reveal>
              <p className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                Connect with the
                <br />
                <span className="text-stroke-paper">Next Leaders.</span>
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-5 text-[15px] leading-relaxed text-paper/60">
                지금 바로, 하이톤의 파트너가 되어주세요.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-12">
                <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-paper">
                  Contact Us
                </h3>
                <dl className="mt-6 space-y-6">
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-widest text-paper/40">
                      E-mail
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={`mailto:${HC_CONTACT.email}?subject=하이톤 홈커밍데이 후원 문의`}
                        className="font-display text-lg font-bold transition-colors hover:text-paper/70"
                      >
                        {HC_CONTACT.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-widest text-paper/40">
                      Instagram
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={HC_CONTACT.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-1 font-display text-lg font-bold transition-colors hover:text-paper/70"
                      >
                        {HC_CONTACT.instagramHandle}
                        <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <a
                href={`mailto:${HC_CONTACT.email}?subject=하이톤 홈커밍데이 후원 문의`}
                className="mt-12 inline-flex items-center gap-2 rounded-full bg-paper px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-wider text-ink transition hover:scale-[1.03] hover:bg-[#e5e5e5]"
              >
                후원 제안하기
                <ArrowUpRight size={16} />
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <HomeBadge />
          </Reveal>
        </div>

        <div className="mt-20 flex flex-col gap-2 border-t border-paper/15 pt-6 font-mono text-xs text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} HIGHTHON : HOMECOMING DAY</span>
          <span className="uppercase tracking-widest">Connect · Network · Grow</span>
        </div>
      </div>
    </footer>
  );
}
