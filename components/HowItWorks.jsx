const STEPS = [
  {
    n: "01",
    title: "Choose your setup",
    text: "Book in-studio or request a home visit in Kubwa, Arab Road, or nearby Abuja locations.",
  },
  {
    n: "02",
    title: "Pick a service & time",
    text: "Choose the cut you want and select a slot that suits your day. Home bookings are queued with travel time in mind.",
  },
  {
    n: "03",
    title: "Confirm by chat",
    text: "You will receive a confirmation with the exact time and, for home visits, an expected arrival window.",
  },
  {
    n: "04",
    title: "Sit back",
    text: "We bring the tools, cape, and sharp finish. You bring the time and the trust.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-ink text-paper grain">
      <div className="container-content">
        <p className="font-mono text-xs tracking-widest2 uppercase text-stone-400 mb-4">
          How Booking Works
        </p>
        <h2 className="font-display text-3xl md:text-[2.4rem] leading-tight max-w-xl">
          Four steps between now and your next cut.
        </h2>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {STEPS.map((s) => (
            <div key={s.n} className="relative pl-0">
              <p className="font-display italic text-4xl text-stone-400/70">{s.n}</p>
              <p className="mt-4 font-display text-xl">{s.title}</p>
              <p className="mt-2 text-sm text-stone-200/70 leading-relaxed max-w-[26ch]">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
