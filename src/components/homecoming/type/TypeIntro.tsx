"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";
import { ArrowRight } from "lucide-react";
import { HC_TYPES } from "@/lib/hcTypeTest";

// 마퀴가 끊기지 않도록 카드 배열을 2번 이어붙임(-50% 이동과 맞물림)
const MARQUEE = [...HC_TYPES, ...HC_TYPES];

export function TypeIntro() {
  return (
    <div className="flex flex-1 flex-col justify-center py-10">
      <div className="eyebrow text-paper/60">HIGHTHON HOMECOMING · 유형 테스트</div>

      <h1 className="mt-5 font-display text-[clamp(2.4rem,11vw,3.4rem)] font-extrabold leading-[1.12] tracking-tight">
        그때 우리,
        <br />
        <span className="text-stroke-paper">무슨 스타일</span>
        <br />
        이었더라?
      </h1>

      <p className="mt-5 text-sm leading-relaxed text-paper/60">
        GPT도 없던 그 시절, 밤새 해커톤 하던 당신은 어떤 팀원이었나요.
        개발자·기획자·디자이너, 16유형으로 알아보는 나의 해커톤 캐릭터.
      </p>

      <div className="mt-8 font-mono text-[11px] uppercase tracking-widest text-paper/40">
        16가지 유형 중 하나
      </div>
      <div className="mt-3 overflow-hidden">
        <div className="marquee-track flex w-max gap-2.5">
          {MARQUEE.map((t, i) => (
            <div
              key={`${t.id}-${i}`}
              className="flex h-24 w-20 shrink-0 -rotate-3 items-end rounded-xl p-2.5 text-[11px] font-bold leading-tight"
              style={{ background: t.color, color: t.textOnColor === "paper" ? "#fff" : "#0a0a0a" }}
            >
              {t.name}
            </div>
          ))}
        </div>
      </div>

      <Link
        href="/homecoming/type/quiz"
        onClick={() => track("type_test_start")}
        className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-paper px-7 py-4 font-mono text-sm font-bold uppercase tracking-wider text-ink transition hover:scale-[1.02] hover:bg-[#e5e5e5]"
      >
        테스트 시작
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
