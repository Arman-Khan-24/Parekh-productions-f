export function ThreeColumnFeature() {
  return (
    <section id="services" className="py-20 sm:py-28 px-6 sm:px-12 lg:px-16 w-full max-w-7xl mx-auto">
      
      {/* 3-Column Grid with Horizontal 16:10 Aspect Ratios (True AMOLED #000000 Center Card) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        
        {/* Left Squarish/Horizontal Card */}
        <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-black group shadow-2xl">
          <img
            src="/assets/parekh/client_media/commercial-food-1.jpg"
            alt="Parekh Commercial Production"
            className="h-full w-full object-cover zoom-squarish"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="text-[11px] font-mono uppercase tracking-widest text-red-500 font-bold block mb-1">
              [COMMERCIAL & ADS]
            </span>
            <h3 className="text-xl sm:text-2xl font-bold">
              Brand & Tabletop Commercials
            </h3>
          </div>
        </div>

        {/* Center Card: Pure True AMOLED Pitch Black #000000 */}
        <div className="relative aspect-[16/10] rounded-3xl bg-black p-8 sm:p-12 flex flex-col justify-center items-center text-center shadow-2xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-[1.05]">
            WE MAKE <br />
            VIDEOS THAT <br />
            TURN HEADS
          </h2>
          <span className="mt-6 text-xs font-mono uppercase tracking-widest text-white/50">
            PAREKH STUDIO // 100% IN-HOUSE
          </span>
        </div>

        {/* Right Squarish/Horizontal Card */}
        <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-black group shadow-2xl">
          <img
            src="/assets/parekh/client_media/auditorium.jpg"
            alt="Parekh Concert Rigging Arena"
            className="h-full w-full object-cover zoom-squarish"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="text-[11px] font-mono uppercase tracking-widest text-red-500 font-bold block mb-1">
              [STAGE & EXPO RIGGING]
            </span>
            <h3 className="text-xl sm:text-2xl font-bold">
              Concert & Arena Rigging
            </h3>
          </div>
        </div>

      </div>
    </section>
  );
}
