"use client";

import { useState } from "react";
import { Check, Clock, Phone, Mail } from "./Icons";

const SERVICE_OPTIONS = [
  "Signature Cut",
  "Skin Fade",
  "Beard Sculpt",
  "Cut + Beard",
  "Hot Towel Shave",
  "Junior Cut",
];

const inputClass =
  "w-full bg-transparent border-b border-stone-200 focus:border-ink py-3 text-ink placeholder:text-stone-400 outline-none transition-colors text-[15px]";

function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="block text-xs font-mono uppercase tracking-widest2 text-stone-400 mb-2">
        {label}
      </span>
      <input className={inputClass} {...props} />
    </label>
  );
}

export default function Booking() {
  const [tab, setTab] = useState("book");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [location, setLocation] = useState("studio");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.target);
    const endpoint = tab === "book" ? "/api/booking" : "/api/inquiry";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form.entries())),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      e.target.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="booking" className="py-20 md:py-28">
      <div className="container-content grid md:grid-cols-12 gap-10 md:gap-16">
        <div className="md:col-span-5">
          <p className="font-mono text-xs tracking-widest2 uppercase text-stone-400 mb-4">
            Reserve
          </p>
          <h2 className="font-display text-3xl md:text-[2.4rem] leading-tight text-ink">
            Reserve your next cut.
          </h2>
          <p className="mt-4 text-ink-700 leading-relaxed max-w-sm">
            We confirm bookings by WhatsApp or phone within a few hours. If you want
            a recommendation or a home visit quote, use the inquiry option.
          </p>

          <div className="mt-10 space-y-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-ink"><Clock /></span>
              <div className="text-sm">
                <p className="text-ink">Tue – Sun, 9:00 – 19:00</p>
                <p className="text-stone-400">Closed Mondays</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-ink"><Phone /></span>
              <a href="tel:+2347030000000" className="underline-fade text-sm text-ink">
                +234 906 475 3818
              </a>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-ink"><Mail /></span>
              <a href="mailto:hello@abcuts.ng" className="underline-fade text-sm text-ink">
                hello@abcuts.ng
              </a>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          <div className="inline-flex rounded-full border border-stone-200 p-1 mb-8">
            <button
              onClick={() => setTab("book")}
              className={`rounded-full px-5 py-2 text-sm transition-colors ${
                tab === "book" ? "bg-ink text-paper" : "text-ink-700"
              }`}
            >
              Book a cut
            </button>
            <button
              onClick={() => setTab("inquire")}
              className={`rounded-full px-5 py-2 text-sm transition-colors ${
                tab === "inquire" ? "bg-ink text-paper" : "text-ink-700"
              }`}
            >
              Ask a question
            </button>
          </div>

          {status === "success" ? (
            <div className="border border-stone-200 rounded-sm p-8 flex items-start gap-4">
              <span className="mt-1 text-ink"><Check /></span>
              <div>
                <p className="font-display text-xl text-ink">
                  {tab === "book" ? "Request sent." : "Message sent."}
                </p>
                <p className="mt-2 text-sm text-stone-400 max-w-sm">
                  We&apos;ll confirm by phone or WhatsApp within a few hours. In a hurry?
                  Call +234 906 475 3818.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="underline-fade mt-4 text-sm text-ink"
                >
                  Send another
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" key={tab}>
              {tab === "book" && (
                <>
                  <div className="grid sm:grid-cols-2 gap-x-6 gap-y-6">
                    <label className="block">
                      <span className="block text-xs font-mono uppercase tracking-widest2 text-stone-400 mb-2">
                        Service
                      </span>
                      <select name="service" required defaultValue="" className={inputClass}>
                        <option value="" disabled>
                          Choose a service
                        </option>
                        {SERVICE_OPTIONS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </label>

                    <div>
                      <span className="block text-xs font-mono uppercase tracking-widest2 text-stone-400 mb-2">
                        Location
                      </span>
                      <div className="flex gap-2 pt-1">
                        {["studio", "home"].map((v) => (
                          <label
                            key={v}
                            className={`flex-1 text-center border rounded-sm py-2.5 text-sm cursor-pointer transition-colors ${
                              location === v
                                ? "border-ink bg-ink text-paper"
                                : "border-stone-200 text-ink-700"
                            }`}
                          >
                            <input
                              type="radio"
                              name="location"
                              value={v}
                              className="sr-only"
                              checked={location === v}
                              onChange={() => setLocation(v)}
                            />
                            {v === "studio" ? "In-Studio" : "At Home"}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-x-6 gap-y-6">
                    <Field label="Preferred date" type="date" name="date" required />
                    <Field label="Preferred time" type="time" name="time" required />
                  </div>

                  {location === "home" && (
                    <Field
                      label="Address"
                      type="text"
                      name="address"
                      placeholder="Street, area, city"
                      required
                    />
                  )}
                </>
              )}

              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-6">
                <Field label="Full name" type="text" name="name" placeholder="Your name" required />
                <Field label="Phone / WhatsApp" type="tel" name="phone" placeholder="+234..." required />
              </div>

              <label className="block">
                <span className="block text-xs font-mono uppercase tracking-widest2 text-stone-400 mb-2">
                  {tab === "book" ? "Notes (optional)" : "Your question"}
                </span>
                <textarea
                  name="message"
                  rows={3}
                  required={tab === "inquire"}
                  placeholder={
                    tab === "book"
                      ? "Anything we should know before we arrive?"
                      : "Ask about pricing, availability, or anything else."
                  }
                  className={`${inputClass} resize-none`}
                />
              </label>

              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center rounded-full bg-ink text-paper px-7 py-3.5 text-sm hover:bg-ink-700 transition-colors disabled:opacity-60"
              >
                {status === "loading"
                  ? "Sending…"
                  : tab === "book"
                  ? "Send booking request"
                  : "Send question"}
              </button>

              {status === "error" && (
                <p className="text-sm text-ink-700">
                  That didn&apos;t send. Try again, or call +234 703 000 0000.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
