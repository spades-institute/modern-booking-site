"use client";

import { useState } from "react";
import { Store, Home } from "./Icons";
import FadeDivider from "./FadeDivider";

const SERVICES = [
  {
    name: "Signature Cut",
    desc: "Consultation, precision cut, and finish styling.",
    studio: 12000,
    home: 18000,
    duration: "45 min",
  },
  {
    name: "Skin Fade",
    desc: "Sharp fade with clean blend and detailing.",
    studio: 15000,
    home: 22000,
    duration: "50 min",
  },
  {
    name: "Beard Sculpt",
    desc: "Line-up, shaping, and clean detailing.",
    studio: 6000,
    home: 9000,
    duration: "25 min",
  },
  {
    name: "Cut + Beard",
    desc: "Full haircut and beard sculpt in one session.",
    studio: 18000,
    home: 26000,
    duration: "70 min",
  },
  {
    name: "Hot Towel Shave",
    desc: "Traditional straight-razor shave with hot towels.",
    studio: 9000,
    home: 14000,
    duration: "35 min",
  },
  {
    name: "Junior Cut",
    desc: "For clients 12 and under. Same care, shorter session.",
    studio: 6000,
    home: 9000,
    duration: "30 min",
  },
];

export default function Services() {
  const [mode, setMode] = useState("studio");

  return (
    <section id="services" className="py-20 md:py-28">
      <div className="container-content">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="font-mono text-xs tracking-widest2 uppercase text-stone-400 mb-4">
              Services &amp; Pricing
            </p>
            <h2 className="font-display text-3xl md:text-[2.4rem] leading-tight text-ink max-w-lg">
              One menu, two ways to sit for it.
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Service location"
            className="inline-flex self-start rounded-full border border-stone-200 p-1 bg-paper"
          >
            <button
              role="tab"
              aria-selected={mode === "studio"}
              onClick={() => setMode("studio")}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors ${
                mode === "studio" ? "bg-ink text-paper" : "text-ink-700"
              }`}
            >
              <Store className="w-4 h-4" /> In-Studio
            </button>
            <button
              role="tab"
              aria-selected={mode === "home"}
              onClick={() => setMode("home")}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors ${
                mode === "home" ? "bg-ink text-paper" : "text-ink-700"
              }`}
            >
              <Home className="w-4 h-4" /> At Home
            </button>
          </div>
        </div>

        <FadeDivider className="mb-2" />

        <ul>
          {SERVICES.map((s, i) => (
            <li
              key={s.name}
              className="group flex items-baseline justify-between gap-4 py-5 border-b border-stone-200"
            >
              <div className="flex items-baseline gap-4 min-w-0">
                <span className="font-mono text-[11px] text-stone-400 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className="font-display text-lg md:text-xl text-ink">{s.name}</p>
                  <p className="text-sm text-stone-400 mt-0.5">{s.desc}</p>
                </div>
              </div>
              <div className="flex items-baseline gap-4 shrink-0">
                <span className="hidden sm:inline font-mono text-xs text-stone-400">
                  {s.duration}
                </span>
                <span className="font-mono text-lg text-ink">
                  ₦{(mode === "studio" ? s.studio : s.home).toLocaleString()}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-xs text-stone-400 max-w-lg">
          Home visits within Kubwa, Arab Road, and nearby Abuja zones include a
          small travel allowance in the quoted rate. Longer routes are priced with
          an additional logistics fee at booking.
        </p>
      </div>
    </section>
  );
}
