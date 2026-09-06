import { Check } from "./Icons";

const STATS = [
  { value: "11", label: "years behind the chair" },
  { value: "3,200+", label: "cuts delivered" },
  { value: "9", label: "Abuja zones served" },
  { value: "30 min", label: "average home setup time" },
];

const POINTS = [
  "Professional hygiene standards between every client",
  "Blades sharpened and maintained to a consistent finish",
  "Clear pricing with logistics factored in up front",
  "Reliable on-location service, including tools and setup",
];

export default function Trust() {
  return (
    <section id="studio" className="border-y border-stone-200 bg-paper-dim">
      <div className="container-content py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-display text-3xl md:text-4xl text-ink">{s.value}</p>
              <p className="mt-1 text-xs md:text-sm text-stone-400 max-w-[16ch]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="container-content pb-16 md:pb-20 grid md:grid-cols-12 gap-10 md:gap-6">
        <div className="md:col-span-5">
          <p className="font-mono text-xs tracking-widest2 uppercase text-stone-400 mb-4">
            The Studio
          </p>
          <h2 className="font-display text-3xl md:text-[2.4rem] leading-tight text-ink">
            One barber, one standard, no rushed work.
          </h2>
          <p className="mt-4 text-ink-700 leading-relaxed">
            AB ~ Cuts is built for careful, consistent barbering in Abuja. That means
            fewer clients, more attention, and a finish that still looks sharp days later.
          </p>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
            {POINTS.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="mt-0.5 text-ink shrink-0">
                  <Check />
                </span>
                <span className="text-sm text-ink-700 leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
