"use client";

import { motion } from "motion/react";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/links";

const MARQUEE = [
  "무박 2일",
  "팀 빌딩",
  "전국 고등학생",
  "아이디어 → 코드",
  "발표 & 데모",
  "네트워킹",
  "Since 2017",
];

export function Hero() {
  const stagger = (i: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.8,
      delay: 0.1 + i * 0.09,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  });

  return (
    <section id="top" className="relative overflow-hidden">
      {/* atmosphere — monochrome grid + soft paper-gray radial */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 30%, #00000008 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-100"
          style={{
            backgroundImage:
              "linear-gradient(to right, #0000000a 1px, transparent 1px), linear-gradient(to bottom, #0000000a 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 35%, #000 40%, transparent 80%)",
          }}
        />
      </div>

      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 pb-20 pt-28 sm:px-8">
        <motion.div {...stagger(0)} className="mb-7 flex items-center gap-3">
          <span className="h-px w-10 bg-ink" />
          <span className="eyebrow">고등학생 해커톤 · Since 2017</span>
        </motion.div>

        <h1 className="font-display font-extrabold leading-[1.2] tracking-tight text-ink">
          <motion.span
            {...stagger(1)}
            className="block text-[clamp(2.6rem,9vw,7.5rem)]"
          >
            고등학생<span className="text-stroke">들만의</span>
          </motion.span>
          <motion.span
            {...stagger(2)}
            className="block text-[clamp(2.6rem,9vw,7.5rem)]"
          >
            해커톤
            <span className="ml-3 align-middle font-mono text-[clamp(0.8rem,2vw,1.3rem)] font-medium text-faint">
              / HIGHTHON
            </span>
          </motion.span>
        </h1>

        <motion.p
          {...stagger(3)}
          className="mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
        >
          고등학생에 의한, 고등학생을 위한, 고등학생들만의 해커톤.
          <br className="hidden sm:block" />
          어른 없이 학생들이 직접 기획하고 운영하는 단 하나의 무대.
        </motion.p>

        <motion.div {...stagger(4)} className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-wider text-paper transition hover:scale-[1.03] hover:bg-[#2c2c2c]"
          >
            참가 문의
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#about"
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-7 py-3.5 font-mono text-sm uppercase tracking-wider text-ink transition hover:bg-ink hover:text-paper"
          >
            하이톤이 뭐예요?
            <ArrowDown size={16} />
          </a>
        </motion.div>
      </div>

      {/* bottom marquee */}
      <div className="relative border-y border-line bg-surface py-3.5">
        <div className="flex w-max marquee-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
              {MARQUEE.map((m) => (
                <span key={m} className="flex items-center font-mono text-sm uppercase tracking-widest text-muted">
                  <span className="px-6">{m}</span>
                  <span className="text-ink">✳</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
