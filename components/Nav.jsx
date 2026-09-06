"use client";

import { useEffect, useState } from "react";
import { Menu, Close, Scissors } from "./Icons";

const LINKS = [
  { href: "#services", label: "Services & Pricing" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#studio", label: "The Studio" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
          scrolled ? "bg-paper/95 backdrop-blur border-b border-stone-200" : "bg-transparent"
        }`}
      >
        <div className="container-content flex items-center justify-between h-[72px]">
          <a href="#top" className="flex items-center gap-2 font-display text-lg tracking-tight text-ink">
            <Scissors className="text-ink" />
            <span>
              AB ~ CUTS
              <span className="hidden sm:inline text-stone-400 font-body text-[11px] align-super ml-1 tracking-widest2">
                ABUJA
              </span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="underline-fade text-sm text-ink-700 text-ink/80 hover:text-ink transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a
              href="#booking"
              className="inline-flex items-center rounded-full bg-ink text-paper text-sm px-5 py-2.5 hover:bg-ink-700 transition-colors"
            >
              Book Now
            </a>
          </div>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden text-ink p-1"
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-paper transition-transform duration-500 ease-blade ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="h-[72px]" />
        <nav className="container-content flex flex-col gap-1 pt-6">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-4 border-b border-stone-200 flex items-center justify-between font-display text-2xl text-ink"
            >
              <span>{l.label}</span>
              <span className="font-mono text-xs text-stone-400">0{i + 1}</span>
            </a>
          ))}
          <a
            href="#booking"
            onClick={() => setOpen(false)}
            className="mt-8 inline-flex justify-center items-center rounded-full bg-ink text-paper text-base px-6 py-4"
          >
            Book Now
          </a>
          <div className="mt-10 flex flex-col gap-2 text-sm text-stone-400 font-mono">
            <a href="tel:+2347030000000" className="underline-fade w-fit">+234 703 000 0000</a>
            <a href="mailto:hello@abcuts.ng" className="underline-fade w-fit">hello@abcuts.ng</a>
          </div>
        </nav>
      </div>
    </>
  );
}
