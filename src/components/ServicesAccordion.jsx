import { useState } from "react";
import { CheckCircle2, ChevronRight } from "lucide-react";

export function ServicesAccordion() {
  const divisions = [
    {
      num: "01",
      category: "COMMERCIAL",
      title: "Event Management & Production",
      desc: "Turnkey stage fabrication, line-array concert audio, intelligent moving lighting, and German hangar structures across Mumbai and Pan-India.",
      subservices: [
        { name: "German Hangar & Truss Fabrication", detail: "Heavy load-tested aluminum box trussing for indoor and outdoor expo setups." },
        { name: "Line-Array Audio Systems", detail: "L-Acoustics & JBL VTX concert systems tuned for crystal speech clarity and live music dynamics." },
        { name: "Broadcast Curved LED Walls", detail: "High-refresh Novastar P2.6 and P2.9 curved screens with redundant video processors." },
      ]
    },
    {
      num: "02",
      category: "COMMERCIAL",
      title: "Commercial & Event Photography",
      desc: "Magazine-grade commercial stills, studio food styling, automotive showcase captures, and lightning-fast same-night press photo selects.",
      subservices: [
        { name: "Food & Tabletop Styling", detail: "Professional culinary food styling, macro lighting, and high-speed splash captures." },
        { name: "Corporate Summit Coverage", detail: "Multi-photographer units capturing VIP keynotes, panel discussions, and candid networking." },
        { name: "Architectural & Booth Documentation", detail: "Wide-perspective perspective-corrected documentation of luxury exhibition pavilions." },
      ]
    },
    {
      num: "03",
      category: "COMMERCIAL",
      title: "Cinematic Videography & Film",
      desc: "Multi-camera cinema packages (RED & Sony Cinema Line FX6/FX3), licensed 4K aerial drone coverage, and high-impact sizzle reels.",
      subservices: [
        { name: "8K/4K Multicam Switching", detail: "Live broadcast feeds with redundant Blackmagic ATEM 4 M/E switchers and zero latency." },
        { name: "Brand Documentaries & TVCs", detail: "High-concept corporate brand stories, founder profiles, and cinematic TV advertising." },
        { name: "Aftermovies & Showreels", detail: "Fast-turnaround cinematic recap films edited, color-graded, and sound-designed within 24 hours." },
      ]
    },
    {
      num: "04",
      category: "WEDDINGS",
      title: "Luxury Weddings (Heavenly Weds)",
      desc: "Bespoke royal destination weddings, architectural floral mandaps, celebrity live entertainment, and heirloom celebration films.",
      subservices: [
        { name: "Destination Wedding Cinematography", detail: "Udaipur, Goa, and international wedding films shot on full-frame prime cinema lenses." },
        { name: "Royal Mandap & Stage Architecture", detail: "Custom designed sets, immersive thematic illumination, and bespoke venue staging." },
        { name: "Same-Day Wedding Edit", detail: "Emotional recap film edited on-site and screened live for guests during the reception." },
      ]
    },
  ];

  const [activeTab, setActiveTab] = useState("01");

  return (
    <section className="py-20 sm:py-28 px-6 sm:px-12 lg:px-16 w-full max-w-7xl mx-auto">
      <div className="mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-100 border border-neutral-200/80 text-xs font-bold uppercase tracking-wider text-neutral-800 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600/70" />
          <span>Full-Spectrum Production · 100% In-House Fleet</span>
        </div>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-neutral-900 leading-tight">
          Production Divisions & <br />
          Technical Capabilities
        </h2>
        <p className="mt-3 text-sm sm:text-base text-neutral-600 max-w-2xl">
          Click any division below to inspect our internal gear packages, live show execution capabilities, and deliverable standards.
        </p>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {divisions.map((d) => {
          const isSelected = activeTab === d.num;
          return (
            <button
              key={d.num}
              onClick={() => setActiveTab(d.num)}
              className={`text-left p-6 sm:p-7 rounded-3xl transition-all cursor-pointer ${
                isSelected
                  ? "bg-black text-white shadow-xl scale-[1.02]"
                  : "bg-neutral-50 hover:bg-neutral-100 text-neutral-900 border border-neutral-100"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md ${
                  isSelected ? "bg-white text-black" : "bg-neutral-200 text-neutral-700"
                }`}>
                  {d.num}
                </span>
                <span className={`text-[10px] font-mono tracking-widest uppercase ${
                  isSelected ? "text-white/60" : "text-neutral-400"
                }`}>
                  {d.category}
                </span>
              </div>
              <h3 className={`text-lg font-bold mb-2 leading-snug ${isSelected ? "text-white" : "text-neutral-900"}`}>
                {d.title}
              </h3>
              <p className={`text-xs line-clamp-3 leading-relaxed ${isSelected ? "text-white/70" : "text-neutral-500"}`}>
                {d.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Subservices Detail Panel */}
      {divisions.find((d) => d.num === activeTab) && (
        <div className="rounded-3xl bg-neutral-50 border border-neutral-100 p-6 sm:p-10 shadow-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-200/70 text-xs font-bold uppercase tracking-wider text-neutral-800 mb-4">
            <span>Specialized Capabilities · {divisions.find((d) => d.num === activeTab).title}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {divisions.find((d) => d.num === activeTab).subservices.map((sub, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white border border-neutral-100 shadow-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900 mb-1">{sub.name}</h4>
                    <p className="text-xs text-neutral-600 leading-relaxed">{sub.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
