"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { HC_CANCEL_NOTICE } from "@/lib/homecoming";

/**
 * 홈커밍데이 취소 공지 모달. /homecoming 진입 시 즉시 노출되며,
 * localStorage로 억제하지 않으므로 방문할 때마다 다시 뜬다.
 * 백드롭 클릭 · 닫기 버튼 · 확인 버튼 · Escape 키로 닫을 수 있다.
 */
export function HcCancelNotice() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!open) return;
    // 모달이 열려 있는 동안 배경 스크롤을 잠근다.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="hc-cancel-title"
      onClick={() => setOpen(false)}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/60 p-5 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl border border-line-strong bg-paper px-7 py-8 text-ink shadow-2xl"
      >
        <button
          type="button"
          aria-label="닫기"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 text-faint transition-colors hover:text-ink"
        >
          <X size={20} />
        </button>

        <span className="font-mono text-xs uppercase tracking-widest text-faint">
          {HC_CANCEL_NOTICE.eyebrow}
        </span>
        <h2
          id="hc-cancel-title"
          className="mt-3 font-display text-2xl font-extrabold leading-tight tracking-tight"
        >
          {HC_CANCEL_NOTICE.title}
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">
          {HC_CANCEL_NOTICE.body}
        </p>

        <button
          type="button"
          onClick={() => setOpen(false)}
          className="mt-7 w-full rounded-full bg-ink py-3 text-center font-mono text-xs font-bold uppercase tracking-wider text-paper transition hover:bg-[#2c2c2c]"
        >
          {HC_CANCEL_NOTICE.dismiss}
        </button>
      </div>
    </div>
  );
}
