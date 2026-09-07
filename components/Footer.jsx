import { Scissors, Pin, Clock, Phone, Mail } from "./Icons";
import FadeDivider from "./FadeDivider";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <FadeDivider reverse />
      <div className="container-content pt-14 pb-10 grid sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <a href="#top" className="flex items-center gap-2 font-display text-lg">
            <Scissors />
            AB ~ CUTS
          </a>
          <p className="mt-4 text-sm text-stone-200/60 max-w-[26ch]">
            Precision barbering for Kubwa, Arab Road, and the wider Abuja area.
          </p>
        </div>

        <div>
          <p className="font-mono text-xs tracking-widest2 uppercase text-stone-400 mb-4">
            Service Area
          </p>
          <div className="flex items-start gap-3 text-sm text-stone-200/80">
            <Pin className="shrink-0 mt-0.5" />
            <span>Kubwa / Arab Road,<br />Abuja, Nigeria</span>
          </div>
          <div className="flex items-start gap-3 text-sm text-stone-200/80 mt-3">
            <Clock className="shrink-0 mt-0.5" />
            <span>Tue–Sat 9:00–19:00<br />Sun 9:00–17:00, Mon closed</span>
          </div>
        </div>

        <div>
          <p className="font-mono text-xs tracking-widest2 uppercase text-stone-400 mb-4">
            Contact
          </p>
          <div className="flex items-center gap-3 text-sm text-stone-200/80">
            <Phone className="shrink-0" />
            <a href="tel:+2349064753818" className="underline-fade">+234 906 475 3818</a>
          </div>
          <div className="flex items-center gap-3 text-sm text-stone-200/80 mt-3">
            <Mail className="shrink-0" />
            <a href="mailto:yusufabel42@gmail.com" className="underline-fade">yusufabel42@gmail.com</a>
          </div>
        </div>

        <div>
          <p className="font-mono text-xs tracking-widest2 uppercase text-stone-400 mb-4">
            Follow
          </p>
          <div className="flex flex-col gap-2 text-sm text-stone-200/80">
            <a href="#" className="underline-fade w-fit">Instagram</a>
            <a href="#" className="underline-fade w-fit">WhatsApp</a>
            <a href="#" className="underline-fade w-fit">TikTok</a>
          </div>
        </div>
      </div>

      <div className="container-content py-6 border-t border-stone-700/40 flex flex-col sm:flex-row justify-between gap-2 text-xs text-stone-400">
        <p>© {new Date().getFullYear()} AB ~ Cuts.</p>
        <p>Built by SpadesHub.</p>
      </div>
    </footer>
  );
}
