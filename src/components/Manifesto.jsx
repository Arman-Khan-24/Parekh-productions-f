import { ExternalLink } from "lucide-react";

export function Manifesto() {
  return (
    <section id="about" className="py-20 sm:py-28 px-6 sm:px-12 max-w-[1300px] mx-auto text-left">
      {/* Editorial Marker */}
      <p className="mb-4 text-xs font-mono font-bold uppercase tracking-[0.25em] text-neutral-400">
        EVENTS &middot; PRODUCTION &middot; EXPERIENCES
      </p>

      {/* Large Scale Editorial Typography on Pure White */}
      <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-[46px] font-medium leading-[1.25] tracking-tight text-neutral-900 max-w-5xl">
        We shoot and produce everything from films to videos, with a quality you can trust. We work with businesses and creatives to create the best content possible, working around the clock to deliver results in an efficient manner.
      </h2>

      {/* Production Meta & Heavenly Weds Sister Brand Badge */}
      <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-bold tracking-wider uppercase text-neutral-500">
        <div>
          Turnkey Production · In-House Staging Fleet · NESCO &amp; Jio World Specialists
        </div>

        {/* Elegant Sister Brand Callout */}
        <a
          href="https://heavenlyweds.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-bold transition-colors no-underline self-start sm:self-auto"
        >
          <span className="text-red-600">&bull;</span>
          <span>Sister Brand: HeavenlyWeds.com</span>
          <ExternalLink className="h-3 w-3 text-neutral-500" />
        </a>
      </div>
    </section>
  );
}
