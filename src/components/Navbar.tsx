"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, CONTACT_EMAIL } from "@/lib/links";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-line bg-paper/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-ink transition-transform group-hover:rotate-45" />
          <span className="font-display text-lg font-extrabold tracking-tight text-ink">
            HIGHTHON
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              href="/homecoming"
              className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-ink transition-colors hover:text-muted"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-ink" />
              Homecoming
            </Link>
          </li>
        </ul>

        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="hidden rounded-full bg-ink px-5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-paper transition hover:bg-[#2c2c2c] md:inline-block"
        >
          참가 문의
        </a>

        <button
          aria-label="메뉴 열기"
          className="text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-paper/95 backdrop-blur-xl md:hidden">
          <ul className="flex flex-col px-5 py-3">
            {NAV_LINKS.map((l) => (
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
                href="/homecoming"
                onClick={() => setOpen(false)}
                className="block py-3 font-mono text-sm uppercase tracking-widest text-ink"
              >
                Homecoming →
              </Link>
            </li>
            <li>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-full bg-ink py-3 text-center font-mono text-sm font-bold uppercase tracking-wider text-paper"
              >
                참가 문의
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
