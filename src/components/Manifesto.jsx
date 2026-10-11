import { ExternalLink } from "lucide-react";

export function Manifesto() {
  return (
    <section id="about" className="py-20 sm:py-28 px-6 sm:px-12 max-w-[1300px] mx-auto text-left">
      {/* Category Marker */}
      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3.5 py-1 text-[11px] font-mono uppercase tracking-widest text-neutral-800 font-bold">
        <span>EVENT MANAGEMENT &amp; MEDIA PRODUCTION COMPANY IN MUMBAI</span>
      </div>

      {/* Large Scale Editorial Typography on Pure White */}
      <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-[46px] font-medium leading-[1.25] tracking-tight text-neutral-900 max-w-5xl">
        We shoot and produce everything from films to videos, with a quality you can trust. We work with businesses and creatives to create the best content possible, working around the clock to deliver results in an efficient manner.
      </h2>

      {/* Production Meta & Heavenly Weds Sister Brand Badge */}
      <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono tracking-wider uppercase text-neutral-500">
        <div>
          TURNKEY PRODUCTION // IN-HOUSE GEAR &amp; CREW // NESCO &amp; JIO WORLD SPECIALISTS
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
