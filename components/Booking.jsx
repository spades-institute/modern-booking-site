"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { SERVICE_OPTIONS } from "@/lib/contact/constants.js";
import { Check, Clock, Mail, Phone } from "./Icons";

const inputClass =
  "w-full bg-transparent border-b border-stone-200 focus:border-ink py-3 text-ink placeholder:text-stone-400 outline-none transition-colors text-[15px]";

const Field = forwardRef(function Field({ label, ...props }, ref) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-xs uppercase tracking-widest2 text-stone-400">
        {label}
      </span>
      <input ref={ref} className={inputClass} {...props} />
    </label>
  );
});

function localDateString() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
}

function errorMessageFor(status) {
  if (status === 422) return "Please check the form fields and try again.";
  if (status === 429) return "Too many attempts. Please wait a few minutes and try again.";
  if (status === 403) return "This form could not verify the request. Please refresh the page.";
  return "That didn’t send. Please try again, or call +234 906 475 3818.";
}

export default function Booking() {
  const [tab, setTab] = useState("book");
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [location, setLocation] = useState("studio");
  const startedAt = useRef(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  function selectTab(nextTab) {
    if (status === "loading") return;
    setTab(nextTab);
    setStatus("idle");
    setErrorMessage("");
    setLocation("studio");
    startedAt.current = Date.now();
  }

  function resetFormState() {
    setStatus("idle");
    setErrorMessage("");
    setLocation("studio");
    startedAt.current = Date.now();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === "loading") return;

    const formElement = event.currentTarget;
    const endpoint = tab === "book" ? "/api/booking" : "/api/inquiry";
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 25_000);
    const payload = Object.fromEntries(new FormData(formElement));
    payload.startedAt = String(startedAt.current ?? Date.now());

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        referrerPolicy: "same-origin",
        signal: controller.signal,
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw Object.assign(new Error("Request failed"), { status: response.status });
      }

      setStatus("success");
      formElement.reset();
      setLocation("studio");
      startedAt.current = Date.now();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error?.name === "AbortError"
          ? "The request timed out. Please check your connection and try again."
          : errorMessageFor(error?.status),
      );
    } finally {
      window.clearTimeout(timeout);
    }
  }

  return (
    <section id="booking" className="py-20 md:py-28">
      <div className="container-content grid gap-10 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest2 text-stone-400">
            Reserve
          </p>
          <h2 className="font-display text-3xl leading-tight text-ink md:text-[2.4rem]">
            Reserve your next cut.
          </h2>
          <p className="mt-4 max-w-sm leading-relaxed text-ink-700">
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
              <a href="tel:+2349064753818" className="underline-fade text-sm text-ink">
                +234 906 475 3818
              </a>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-ink"><Mail /></span>
              <a href="mailto:yusufabel42@gmail.com" className="underline-fade text-sm text-ink">
                yusufabel42@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          <div className="mb-8 inline-flex rounded-full border border-stone-200 p-1">
            <button
              type="button"
              onClick={() => selectTab("book")}
              disabled={status === "loading"}
              aria-pressed={tab === "book"}
              className={`rounded-full px-5 py-2 text-sm transition-colors disabled:opacity-60 ${
                tab === "book" ? "bg-ink text-paper" : "text-ink-700"
              }`}
            >
              Book a cut
            </button>
            <button
              type="button"
              onClick={() => selectTab("inquire")}
              disabled={status === "loading"}
              aria-pressed={tab === "inquire"}
              className={`rounded-full px-5 py-2 text-sm transition-colors disabled:opacity-60 ${
                tab === "inquire" ? "bg-ink text-paper" : "text-ink-700"
              }`}
            >
              Ask a question
            </button>
          </div>

          {status === "success" ? (
            <div className="flex items-start gap-4 rounded-sm border border-stone-200 p-8" role="status">
              <span className="mt-1 text-ink"><Check /></span>
              <div>
                <p className="font-display text-xl text-ink">
                  {tab === "book" ? "Request sent." : "Message sent."}
                </p>
                <p className="mt-2 max-w-sm text-sm text-stone-400">
                  We&apos;ll confirm by phone or WhatsApp within a few hours. In a hurry?
                  Call +234 906 475 3818.
                </p>
                <button
                  type="button"
                  onClick={resetFormState}
                  className="underline-fade mt-4 text-sm text-ink"
                >
                  Send another
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              key={tab}
              aria-busy={status === "loading"}
            >
              <div className="absolute -left-[10000px] top-auto size-px overflow-hidden" aria-hidden="true">
                <label>
                  Company
                  <input name="company" type="text" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              {tab === "book" && (
                <>
                  <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block font-mono text-xs uppercase tracking-widest2 text-stone-400">
                        Service
                      </span>
                      <select name="service" required defaultValue="" className={inputClass}>
                        <option value="" disabled>Choose a service</option>
                        {SERVICE_OPTIONS.map((service) => (
                          <option key={service} value={service}>{service}</option>
                        ))}
                      </select>
                    </label>

                    <div>
                      <span className="mb-2 block font-mono text-xs uppercase tracking-widest2 text-stone-400">
                        Location
                      </span>
                      <div className="flex gap-2 pt-1">
                        {["studio", "home"].map((value) => (
                          <label
                            key={value}
                            className={`flex-1 cursor-pointer rounded-sm border py-2.5 text-center text-sm transition-colors ${
                              location === value
                                ? "border-ink bg-ink text-paper"
                                : "border-stone-200 text-ink-700"
                            }`}
                          >
                            <input
                              type="radio"
                              name="location"
                              value={value}
                              className="sr-only"
                              checked={location === value}
                              onChange={() => setLocation(value)}
                            />
                            {value === "studio" ? "In-Studio" : "At Home"}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
                    <Field
                      label="Preferred date"
                      type="date"
                      name="date"
                      ref={(node) => {
                        if (node) node.min = localDateString();
                      }}
                      required
                    />
                    <Field label="Preferred time" type="time" name="time" required />
                  </div>

                  {location === "home" && (
                    <Field
                      label="Address"
                      type="text"
                      name="address"
                      placeholder="Street, area, city"
                      autoComplete="street-address"
                      maxLength={240}
                      required
                    />
                  )}
                </>
              )}

              <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
                <Field
                  label="Full name"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  autoComplete="name"
                  minLength={2}
                  maxLength={100}
                  required
                />
                <Field
                  label="Phone / WhatsApp"
                  type="tel"
                  name="phone"
                  placeholder="+234..."
                  autoComplete="tel"
                  inputMode="tel"
                  minLength={7}
                  maxLength={24}
                  required
                />
              </div>

              <label className="block">
                <span className="mb-2 block font-mono text-xs uppercase tracking-widest2 text-stone-400">
                  {tab === "book" ? "Notes (optional)" : "Your question"}
                </span>
                <textarea
                  name="message"
                  rows={3}
                  maxLength={1200}
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
                className="inline-flex items-center rounded-full bg-ink px-7 py-3.5 text-sm text-paper transition-colors hover:bg-ink-700 disabled:opacity-60"
              >
                {status === "loading"
                  ? "Sending…"
                  : tab === "book"
                    ? "Send booking request"
                    : "Send question"}
              </button>

              <p aria-live="polite" className={status === "error" ? "text-sm text-ink-700" : "sr-only"}>
                {status === "error" ? errorMessage : ""}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
