export function HeroVideo({ locationMode = "mumbai" }) {
  const isUK = locationMode === "london" || locationMode === "uk";

  return (
    <section id="hero" className="relative w-full h-[100dvh] overflow-hidden bg-black flex items-center justify-center">
      
      {/* Edge-to-Edge Full-Screen Background Video Loop (Always Muted, Smooth Playback) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover scale-[1.01]"
      >
        <source src="/assets/parekh/finbridge-2026-max-quality.mp4" type="video/mp4" />
        <source src="/assets/parekh/hero-showreel.mp4" type="video/mp4" />
      </video>

      {/* Atmospheric Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/40 pointer-events-none" />

      {/* Centered Monumental Typography */}
      <div className="relative z-10 w-full px-6 sm:px-12 text-center flex flex-col items-center justify-center">
        {isUK && (
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-[11px] font-bold uppercase tracking-widest text-white mb-4 backdrop-blur-md border border-white/20">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span>London Executive Division · UK &amp; Europe</span>
          </div>
        )}
        <h1 className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-[106px] font-black tracking-tight uppercase text-white drop-shadow-2xl leading-[1.02] max-w-5xl">
          WE MAKE IT HAPPEN
        </h1>
        <p className="mt-4 text-xs sm:text-sm uppercase tracking-[0.28em] text-neutral-300 font-bold">
          {isUK ? "LONDON · BILATERAL SUMMITS · GLOBAL CINEMA" : "EVENTS. PRODUCTION. EXPERIENCES."}
        </p>
      </div>

    </section>
  );
}
