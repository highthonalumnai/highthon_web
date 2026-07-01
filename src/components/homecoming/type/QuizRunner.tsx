"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { track } from "@vercel/analytics";
import { HC_QUESTIONS, scoreAnswers } from "@/lib/hcTypeTest";

export function QuizRunner() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const total = HC_QUESTIONS.length;
  const question = HC_QUESTIONS[step];

  function choose(choiceIdx: number) {
    const next = [...answers];
    next[step] = choiceIdx;
    setAnswers(next);

    if (step + 1 < total) {
      setStep(step + 1);
      return;
    }
    const typeId = scoreAnswers(next);
    track("type_test_complete", { type: typeId });
    router.push(`/homecoming/type/result/${typeId}`);
  }

  return (
    <div className="flex flex-1 flex-col py-8">
      {/* 진행바 */}
      <div className="flex gap-1">
        {HC_QUESTIONS.map((q, i) => (
          <span
            key={q.id}
            className={`h-1 flex-1 rounded-full ${i <= step ? "bg-paper" : "bg-paper/20"}`}
          />
        ))}
      </div>
      <div className="mt-4 font-mono text-xs uppercase tracking-widest text-paper/50">
        Q{step + 1} / {total}
      </div>

      <h2 className="mt-6 font-display text-2xl font-extrabold leading-snug sm:text-[28px]">
        {question.prompt}
      </h2>

      <div className="mt-7 flex flex-col gap-2.5">
        {question.choices.map((choice, i) => (
          <button
            key={i}
            type="button"
            onClick={() => choose(i)}
            className="rounded-xl border border-paper/25 px-4 py-4 text-left text-[15px] leading-relaxed text-paper/90 transition hover:border-paper hover:bg-paper/5 active:scale-[0.99]"
          >
            {choice.label}
          </button>
        ))}
      </div>

      <p className="mt-auto pt-8 text-center font-mono text-[11px] text-paper/40">
        선택하면 바로 다음 문항으로 넘어가요
      </p>
    </div>
  );
}
