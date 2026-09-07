const IMAGES = [
  { src: "/images/portrait3.jpg", alt: "Close-up of a fresh skin fade" },
  { src: "/images/barbing_tools.jpg", alt: "Barber tools laid out on a station" },
  { src: "/images/landscape3.jpg", alt: "Client mid-cut in the studio chair" },
  { src: "/images/beard_trim.jpg", alt: "Beard trim in progress" },
  { src: "/images/landscape2.jpg", alt: "Finished cut, profile view" },
  { src: "/images/landscape1.jpg", alt: "Home visit setup in a living room" },
];

export default function Gallery() {
  return (
    <section id="work" className="py-20 md:py-28 border-t border-stone-200">
      <div className="container-content">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-mono text-xs tracking-widest2 uppercase text-stone-400 mb-4">
              Recent Work
            </p>
            <h2 className="font-display text-3xl md:text-[2.4rem] leading-tight text-ink">
              From the studio and the field.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {IMAGES.map((img, i) => (
            <div
              key={img.src}
              className={`overflow-hidden rounded-sm border border-stone-200 ${
                i % 3 === 0 ? "row-span-2 aspect-[7/9]" : "aspect-[7/5]"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover grayscale hover:scale-[1.03] transition-transform duration-700 ease-blade"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
