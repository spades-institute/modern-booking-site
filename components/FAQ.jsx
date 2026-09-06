"use client";

import { useState } from "react";
import { Chevron } from "./Icons";

const FAQS = [
  {
    q: "How far do home visits cover?",
    a: "AB ~ Cuts covers the core Abuja zones around Kubwa and Arab Road. Beyond that, we add a small logistics fee so the pricing stays fair and transparent before you confirm.",
  },
  {
    q: "What do I need to provide for a home cut?",
    a: "Just a chair, a nearby power source, and decent light. A bathroom mirror or a window spot works well. We bring the cape, clippers, guards, and towels.",
  },
  {
    q: "Is a deposit required?",
    a: "First-time home bookings require a small deposit to secure the slot, and it is deducted from your final total. Studio visits and repeat clients do not need one.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Cancellations made up to 6 hours before your slot are free. Later cancellations or no-shows forfeit the deposit, where one applies.",
  },
  {
    q: "How do you handle hygiene between clients?",
    a: "All clippers, blades, and combs are cleaned and sanitized between clients. Home-visit kits are also refreshed before each route so every appointment starts clean.",
  },
  {
    q: "Can I book a specific time on Sundays?",
    a: "Yes. Sunday appointments run from 9:00 to 17:00, and peak slots fill up quickly, so it is best to reserve ahead where possible.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-20 md:py-28 border-t border-stone-200">
      <div className="container-content grid md:grid-cols-12 gap-10 md:gap-6">
        <div className="md:col-span-4">
          <p className="font-mono text-xs tracking-widest2 uppercase text-stone-400 mb-4">
            FAQ
          </p>
          <h2 className="font-display text-3xl md:text-[2.2rem] leading-tight text-ink">
            Good to know before you book.
          </h2>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q} className="border-b border-stone-200">
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display text-lg text-ink">{item.q}</span>
                  <span
                    className={`text-ink shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <Chevron />
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-blade ${
                    isOpen ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <p className="overflow-hidden text-sm text-ink-700 leading-relaxed max-w-lg">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
