import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TicketLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-line bg-paper/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
          <Link href="/homecoming" className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-ink" />
            <span className="font-display text-[15px] font-extrabold tracking-tight">
              HOMECOMING<span className="font-mono text-[10px] align-top"> DAY</span>
            </span>
          </Link>
          <nav className="flex items-center gap-5">
            <Link
              href="/homecoming/ticket"
              className="font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-ink"
            >
              예약
            </Link>
            <Link
              href="/homecoming/ticket/check"
              className="font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-ink"
            >
              예약 조회
            </Link>
            <Link
              href="/homecoming"
              className="group inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-faint transition-colors hover:text-ink"
            >
              <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-0.5" />
              소개
            </Link>
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
