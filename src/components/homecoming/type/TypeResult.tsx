import { HC_TYPE_MAP, type HcType } from "@/lib/hcTypeTest";
import { ShareButtons } from "./ShareButtons";

export function TypeResult({ type }: { type: HcType }) {
  const best = HC_TYPE_MAP[type.best];
  const worst = HC_TYPE_MAP[type.worst];

  return (
    <div className="flex flex-1 flex-col py-8">
      <div className="font-mono text-xs uppercase tracking-widest text-paper/50">당신의 유형은</div>

      <h1 className="mt-3 font-display text-[clamp(2rem,9vw,2.8rem)] font-extrabold leading-[1.1]">
        {type.name}
      </h1>
      <div className="mt-4 text-6xl">{type.emoji}</div>
      <p className="mt-5 text-[15px] leading-relaxed text-paper/70">{type.desc}</p>

      {/* 궁합 */}
      <div className="mt-8 font-mono text-[11px] uppercase tracking-widest text-paper/40">
        그때의 궁합
      </div>
      <div className="mt-3 flex gap-3">
        <div className="flex-1 rounded-xl bg-paper/5 p-4">
          <div className="text-sm font-bold">💘 찰떡</div>
          <div className="mt-1 text-sm text-paper/80">{best.name}</div>
        </div>
        <div className="flex-1 rounded-xl border border-paper/20 p-4">
          <div className="text-sm font-bold">💥 상극</div>
          <div className="mt-1 text-sm text-paper/80">{worst.name}</div>
        </div>
      </div>

      {/* 공유 카드 미리보기 */}
      <div className="mt-8 font-mono text-[11px] uppercase tracking-widest text-paper/40">
        공유용 카드
      </div>
      <div className="mt-3 overflow-hidden rounded-2xl border border-paper/15">
        {/* 세로 스토리 카드(1080×1350)를 그대로 미리보기 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/homecoming/type/result/${type.id}/card`}
          alt={`${type.name} 공유 카드`}
          className="w-full"
        />
      </div>

      <ShareButtons type={type} />
    </div>
  );
}
