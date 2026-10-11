import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function HeroVideo() {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section id="hero" className="relative w-full h-[100dvh] overflow-hidden bg-black flex items-center justify-center">
      
      {/* Edge-to-Edge Full-Screen Background Video Loop */}
      <video
        autoPlay
        loop
        muted={isMuted}
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
        <h1 className="text-3xl xs:text-4xl sm:text-7xl md:text-8xl lg:text-[102px] font-black tracking-tighter uppercase text-white drop-shadow-2xl leading-[1] max-w-5xl">
          PAREKH // <br />
          WE MAKE VIDEOS
        </h1>
      </div>

      {/* Bottom Floating Metadata & Sound Toggle */}
      <div className="absolute bottom-6 sm:bottom-10 inset-x-6 sm:inset-x-16 flex items-center justify-between text-[11px] sm:text-xs font-mono uppercase tracking-widest text-white/90 z-20">
        
        {/* Left Indicator Pill */}
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
          <span>MUMBAI HQ · EST. 2021</span>
        </div>

        {/* Center Indicator Dots */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="h-1.5 w-6 rounded-full bg-white" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
        </div>

        {/* Sound Toggle */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="flex items-center gap-2 rounded-full bg-black/70 backdrop-blur-md px-3.5 sm:px-4 py-1.5 sm:py-2 text-white hover:bg-white hover:text-black transition-all cursor-pointer"
        >
          {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5 text-red-500" />}
          <span className="font-bold">{isMuted ? "Unmute" : "Mute"}</span>
        </button>
      </div>

    </section>
  );
}
