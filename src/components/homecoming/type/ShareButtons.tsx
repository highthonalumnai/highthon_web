"use client";

import { useState } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { Download, Link2, Check, ArrowRight } from "lucide-react";
import type { HcType } from "@/lib/hcTypeTest";

export function ShareButtons({ type }: { type: HcType }) {
  const [copied, setCopied] = useState(false);

  async function saveImage() {
    track("type_test_share", { method: "image", type: type.id });
    const res = await fetch(`/homecoming/type/result/${type.id}/card`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `highthon-${type.id}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function copyLink() {
    track("type_test_share", { method: "link", type: type.id });
    const url = `${window.location.origin}/homecoming/type/result/${type.id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard 차단 환경 무시 */
    }
  }

  return (
    <div className="mt-8 flex flex-col gap-3">
      <div className="flex gap-3">
        <button
          type="button"
          onClick={saveImage}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-paper px-5 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-ink transition hover:bg-[#e5e5e5]"
        >
          <Download size={15} /> 이미지 저장
        </button>
        <button
          type="button"
          onClick={copyLink}
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-paper/30 px-5 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-paper transition hover:bg-paper/10"
        >
          {copied ? <Check size={15} /> : <Link2 size={15} />}
          {copied ? "복사됨" : "링크 복사"}
        </button>
      </div>
      <Link
        href="/homecoming/ticket"
        onClick={() => track("type_test_reserve_click", { type: type.id })}
        className="group flex items-center justify-center gap-2 rounded-full px-6 py-4 font-mono text-sm font-bold uppercase tracking-wider text-ink transition hover:brightness-95"
        style={{ background: type.color, color: type.textOnColor === "paper" ? "#fff" : "#0a0a0a" }}
      >
        이 유형들 실제로 만나러 가기
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
