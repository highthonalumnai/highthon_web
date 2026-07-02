import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function TypeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ink text-paper">
      <div className="mx-auto flex min-h-screen max-w-[600px] flex-col">
        <header className="flex items-center justify-between px-5 py-4">
          <Link href="/homecoming" className="flex items-center gap-2">
            <Image src="/homecoming/logo.png" alt="" width={28} height={28} className="h-7 w-7 object-contain invert" />
            <span className="font-display text-sm font-extrabold tracking-tight">유형 테스트</span>
          </Link>
          <Link
            href="/homecoming"
            className="group inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-paper/50 transition-colors hover:text-paper"
          >
            <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-0.5" />
            소개
          </Link>
        </header>
        <main className="flex flex-1 flex-col px-5 pb-10">{children}</main>
      </div>
    </div>
  );
}
