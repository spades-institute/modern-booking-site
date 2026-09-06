import FadeDivider from "./FadeDivider";
import { Chevron } from "./Icons";

export default function Hero() {
  return (
    <section id="top" className="relative pt-[104px] pb-16 md:pt-[132px] md:pb-24 overflow-hidden">
      <div className="container-content grid md:grid-cols-12 gap-10 md:gap-6 items-center">
        <div className="md:col-span-7 lg:col-span-6">
          <p className="font-mono text-xs tracking-widest2 uppercase text-stone-400 mb-5">
            Abuja barbering — Kubwa &amp; Arab Road
          </p>
          <h1 className="font-display text-ink text-[2.6rem] leading-[1.06] sm:text-6xl md:text-[3.6rem] md:leading-[1.04]">
            Sharp cuts.
            <br />
            Clean finish.
            <br />
            <span className="italic font-normal">AB ~ Cuts</span>
          </h1>
          <p className="mt-6 text-ink-700 text-[17px] leading-relaxed max-w-md">
            Premium cuts for busy professionals, students, and regulars who want a
            clean finish without the fuss. Book in-studio or request a home visit in
            and around Abuja.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#booking"
              className="inline-flex items-center rounded-full bg-ink text-paper px-7 py-3.5 text-sm hover:bg-ink-700 transition-colors"
            >
              Book a cut
            </a>
            <a
              href="#services"
              className="underline-fade inline-flex items-center gap-1 text-sm text-ink"
            >
              See services &amp; pricing
              <Chevron className="rotate-[-90deg]" />
            </a>
          </div>

          <FadeDivider className="mt-12 max-w-xs" />
          <p className="mt-3 font-mono text-[11px] text-stone-400 tracking-widest2 uppercase">
            Precise, professional, steady work
          </p>
        </div>

        <div className="md:col-span-5 lg:col-span-6 relative">
          <div className="relative aspect-[4/5] max-w-md mx-auto md:max-w-none rounded-sm overflow-hidden border border-stone-200">
            <img
              src="/images/1.jpg"
              alt="Barber giving a precise fade haircut in a studio chair"
              className="w-full h-full object-cover grayscale contrast-[1.05]"
              loading="eager"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-ink/10" />
          </div>
          <div className="hidden lg:block absolute -bottom-6 -left-8 bg-paper border border-stone-200 rounded-sm px-5 py-4 max-w-[220px]">
            <p className="font-display italic text-2xl text-ink leading-none">4.9</p>
            <p className="mt-1 text-xs text-stone-400 font-mono">Rated by regulars across Abuja</p>
          </div>
        </div>
      </div>
    </section>
  );
}
