export function Ticker() {
  const items = [
    "CORPORATE EVENTS & CONFERENCES",
    "EXHIBITIONS & INDUSTRY EXPOS",
    "PRODUCT LAUNCHES & BRAND ACTIVATIONS",
    "COMMERCIAL & FOOD PHOTOGRAPHY",
    "CINEMATIC VIDEOGRAPHY & AFTERMOVIES",
    "TV COMMERCIALS & DIGITAL AD FILMS",
    "4K AERIAL DRONE CINEMATOGRAPHY",
    "STAGE FABRICATION & LIGHTING RIGGING",
    "CONCERT ACOUSTICS & LINE-ARRAY SOUND",
    "TURNKEY SHOW CALLING",
    "LUXURY DESTINATION WEDDINGS",
  ];

  return (
    <div className="py-12 bg-neutral-50/60 border-y border-neutral-100 overflow-hidden select-none w-full">
      <div className="flex w-max items-center animate-ticker whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center mx-5 sm:mx-8">
            <span className="text-sm sm:text-base font-black uppercase tracking-widest text-neutral-900">
              {item}
            </span>
            <span className="h-2 w-2 rounded-full bg-red-600 mx-5 sm:mx-8 shadow-[0_0_8px_rgba(220,38,38,0.5)]" />
          </div>
        ))}
      </div>
    </div>
  );
}
