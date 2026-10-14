export function ThreeColumnFeature() {
  return (
    <section id="services" className="py-8 sm:py-12 px-6 sm:px-12 lg:px-16 w-full max-w-[1400px] mx-auto overflow-hidden">
      
      {/* 3-Column Grid with Horizontal 16:10 Aspect Ratios (Fluid Responsive, No Clipping or Overflow) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch w-full">
        
        {/* Left Squarish/Horizontal Card */}
        <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-neutral-900 group">
          <img
            src="/assets/parekh/client_media/commercial-food-1.jpg"
            alt="Parekh Commercial Production"
            className="h-full w-full object-cover zoom-squarish"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="text-[11px] font-mono uppercase tracking-widest text-red-400 font-bold block mb-1">
              [COMMERCIAL & ADS]
            </span>
            <h3 className="text-xl sm:text-2xl font-bold leading-tight">
              Brand & Tabletop Commercials
            </h3>
          </div>
        </div>

        {/* Center Card: Pure Crisp White matching page background exactly (Zero Shadow, Zero Border) */}
        <div className="relative aspect-[16/10] rounded-3xl bg-white p-6 sm:p-10 flex flex-col justify-center items-center text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black uppercase tracking-tight text-neutral-950 leading-[1.08]">
            WE MAKE <br />
            VIDEOS THAT <br />
            TURN HEADS
          </h2>
          <span className="mt-5 text-[11px] sm:text-xs uppercase tracking-widest text-neutral-400 font-bold">
            PAREKH STUDIO · 100% IN-HOUSE CREW
          </span>
        </div>

        {/* Right Squarish/Horizontal Card */}
        <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-neutral-900 group">
          <img
            src="/assets/parekh/client_media/auditorium.jpg"
            alt="Parekh Concert Rigging Arena"
            className="h-full w-full object-cover zoom-squarish"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="text-[11px] font-mono uppercase tracking-widest text-red-400 font-bold block mb-1">
              [STAGE & EXPO RIGGING]
            </span>
            <h3 className="text-xl sm:text-2xl font-bold leading-tight">
              Concert & Arena Rigging
            </h3>
          </div>
        </div>

      </div>
    </section>
  );
}
