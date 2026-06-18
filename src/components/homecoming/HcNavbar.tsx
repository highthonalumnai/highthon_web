"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Menu, X } from "lucide-react";
import { HC_NAV } from "@/lib/homecoming";

export function HcNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Over the dark hero the bar is transparent with light text; once scrolled it
  // flips to the paper theme.
  const light = !scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-line bg-paper/80 text-ink backdrop-blur-xl"
          : "border-b border-transparent text-paper"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-2">
          <span
            className={`inline-block h-2.5 w-2.5 rounded-sm transition ${
              light ? "bg-paper" : "bg-ink"
            }`}
          />
          <span className="font-display text-[15px] font-extrabold tracking-tight">
            HOMECOMING<span className="font-mono text-[10px] align-top"> DAY</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {HC_NAV.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`font-mono text-xs uppercase tracking-widest transition-colors ${
                  light ? "text-paper/70 hover:text-paper" : "text-muted hover:text-ink"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-5 md:flex">
          <Link
            href="/"
            className={`group inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest transition-colors ${
              light ? "text-paper/60 hover:text-paper" : "text-faint hover:text-ink"
            }`}
          >
            <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-0.5" />
            HIGHTHON
          </Link>
          <Link
            href="/homecoming/sponsor"
            className={`font-mono text-xs uppercase tracking-widest transition-colors ${
              light ? "text-paper/60 hover:text-paper" : "text-faint hover:text-ink"
            }`}
          >
            기업 후원
          </Link>
          <Link
            href="/homecoming/ticket"
            className={`rounded-full px-5 py-2 font-mono text-xs font-bold uppercase tracking-wider transition hover:opacity-80 ${
              light ? "bg-paper text-ink" : "bg-ink text-paper"
            }`}
          >
            티켓 예약
          </Link>
        </div>

        <button
          aria-label="메뉴 열기"
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-paper/95 text-ink backdrop-blur-xl md:hidden">
          <ul className="flex flex-col px-5 py-3">
            {HC_NAV.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-mono text-sm uppercase tracking-widest text-muted"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="block py-3 font-mono text-sm uppercase tracking-widest text-faint"
              >
                ← HIGHTHON
              </Link>
            </li>
            <li>
              <Link
                href="/homecoming/sponsor"
                onClick={() => setOpen(false)}
                className="block py-3 font-mono text-sm uppercase tracking-widest text-muted"
              >
                기업 후원
              </Link>
            </li>
            <li>
              <Link
                href="/homecoming/ticket"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-full bg-ink py-3 text-center font-mono text-sm font-bold uppercase tracking-wider text-paper"
              >
                티켓 예약
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
