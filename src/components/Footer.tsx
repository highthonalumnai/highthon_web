import { ArrowUpRight, Mail } from "lucide-react";
import { CONTACT_EMAIL, SOCIALS } from "@/lib/links";

const CHANNELS = [
  { label: "Instagram", href: SOCIALS.instagram, handle: "@high_thon" },
  { label: "Facebook", href: SOCIALS.facebook, handle: "/highthon" },
  { label: "Velog", href: SOCIALS.velog, handle: "@highthon" },
  { label: "GitHub", href: SOCIALS.github, handle: "/highthon" },
];

export function Footer() {
  return (
    <footer className="relative">
      {/* CTA band — inverted black block */}
      <div className="relative overflow-hidden bg-ink py-24 text-paper sm:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              maskImage:
                "radial-gradient(ellipse 70% 70% at 50% 50%, #000 30%, transparent 75%)",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 text-center sm:px-8">
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
            올해의 밤,
            <br />
            <span className="text-stroke-paper">함께 새워볼래요?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-paper/60">
            참가·후원·제휴 그 무엇이든. 다음 회차 소식은 SNS 채널에서 가장 먼저
            전해드립니다.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-paper px-8 py-4 font-mono text-sm font-bold uppercase tracking-wider text-ink transition hover:scale-[1.03] hover:bg-[#e5e5e5]"
          >
            <Mail size={16} /> {CONTACT_EMAIL}
          </a>
        </div>
      </div>

      {/* bottom bar */}
      <div className="bg-paper">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1fr_auto]">
          <div>
            <a href="#top" className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-ink" />
              <span className="font-display text-xl font-extrabold tracking-tight text-ink">
                HIGHTHON
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              고등학생에 의한, 고등학생을 위한, 고등학생들만의 해커톤.
            </p>
          </div>

          <ul className="grid grid-cols-2 gap-x-10 gap-y-3 sm:flex sm:gap-8">
            {CHANNELS.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex flex-col"
                >
                  <span className="inline-flex items-center gap-1 font-mono text-sm uppercase tracking-widest text-ink transition-colors group-hover:text-muted">
                    {c.label}
                    <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                  <span className="font-mono text-xs text-faint">{c.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-line">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <span className="font-mono">© {new Date().getFullYear()} HIGHTHON</span>
            <span className="font-mono uppercase tracking-widest">
              Made by high schoolers, for high schoolers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
