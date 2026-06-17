"use client";

import { useEffect, useState } from "react";

function remainingMs(target: string): number {
  return new Date(target).getTime() - Date.now();
}

function fmt(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(s / 60);
  const ss = s % 60;
  return `${String(m).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
}

export function Countdown({
  expiresAt,
  onExpire,
}: {
  expiresAt: string;
  onExpire?: () => void;
}) {
  const [ms, setMs] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const left = remainingMs(expiresAt);
      setMs(left);
      if (left <= 0) onExpire?.();
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [expiresAt, onExpire]);

  if (ms === null) return <span className="tabular-nums">--:--</span>;
  if (ms <= 0) return <span className="tabular-nums text-faint">00:00 (만료)</span>;
  return <span className="tabular-nums">{fmt(ms)}</span>;
}
