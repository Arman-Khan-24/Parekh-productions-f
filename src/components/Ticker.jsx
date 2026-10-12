export function Ticker() {
  const items = [
    "EVENTS & CONFERENCES",
    "STAGE & SET PRODUCTION",
    "SOUND & TECHNICAL PRODUCTION",
    "LIGHTING & AV RIGGING",
    "MEDIA SPECIALIST",
    "EVENT PHOTOGRAPHY & VIDEOGRAPHY",
    "LIVE EDITS & SIZZLE REELS",
    "FILMS / WEBSERIES",
    "AD FILMS & COMMERCIAL PRODUCTION",
    "DRONE & AERIAL CINEMATOGRAPHY",
    "EXHIBITIONS & INDUSTRY EXPOS",
    "PRODUCT LAUNCHES & BRAND ACTIVATIONS",
    "WEDDING PLANNER & LUXURY CINEMA",
  ];

  return (
    <div className="py-10 bg-white border-y border-neutral-100 overflow-hidden select-none w-full">
      <div className="flex w-max items-center animate-ticker whitespace-nowrap">
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center mx-4 sm:mx-6">
            <span className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-neutral-900">
              {item}
            </span>
            <span className="text-neutral-300 mx-4 sm:mx-6 font-mono text-xs select-none">/</span>
          </div>
        ))}
      </div>
    </div>
  );
}
