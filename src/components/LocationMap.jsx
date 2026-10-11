import { useState } from "react";
import worldMapData from "../data/worldMapData.json";
import { RotateCcw, ArrowRight } from "lucide-react";

export function LocationMap() {
  const defaultViewBox = "0 0 2000 857";

  const locations = [
    {
      id: "mumbai",
      name: "Mumbai HQ",
      subhead: "Western & Central Hub",
      role: "Corporate Head Office & Central Equipment Vault",
      detail: "Full internal inventory: Sony Cinema Line (FX6/FX3), Master G-Master primes, Novastar LED processors, and German hangar structures. Daily deployment to NESCO (Goregaon) & Jio World Centre (BKC).",
      x: 1389,
      y: 384,
      zoomViewBox: "1280 290 240 180",
      stats: "30-Min On-Ground Dispatch",
      badge: "Master Base",
      coordinates: "19°04'N, 72°52'E",
      isHQ: true,
    },
    {
      id: "pune",
      name: "Pune Corridor",
      subhead: "Automotive & Industrial Hub",
      role: "Industrial Video & Auto Expo Coverage",
      detail: "Regular on-ground production at Auto Cluster Chakan, PCMC industrial expos, and luxury destination weddings across Lonavala, Lavasa, and Pune city.",
      x: 1397,
      y: 390,
      zoomViewBox: "1320 320 180 140",
      stats: "Automotive & Expo Unit",
      badge: "Tech Corridor",
      coordinates: "18°31'N, 73°51'E",
    },
    {
      id: "pan-india",
      name: "Pan-India",
      subhead: "National Touring Crew",
      role: "Nationwide Turnkey Deployment",
      detail: "Touring production crews executing major corporate conferences and multi-city brand roadshows across Delhi NCR, Bengaluru, Hyderabad, Chennai, and Goa.",
      x: 1440,
      y: 360,
      zoomViewBox: "1300 240 320 250",
      stats: "National Mobile Unit",
      badge: "Pan-India Reach",
      coordinates: "20°35'N, 78°57'E",
    },
    {
      id: "london",
      name: "London (UK)",
      subhead: "International Division",
      role: "Global Executive Direction",
      detail: "International executive production, bilateral corporate summits, and destination wedding cinematography connecting London and Indian venues seamlessly.",
      x: 985,
      y: 172,
      zoomViewBox: "910 120 160 120",
      stats: "Direct UK Liaison",
      badge: "International",
      coordinates: "51°30'N, 0°07'W",
    },
  ];

  const [selectedLoc, setSelectedLoc] = useState(locations[0]);
  const [currentViewBox, setCurrentViewBox] = useState(selectedLoc.zoomViewBox);

  const handleSelect = (loc) => {
    setSelectedLoc(loc);
    setCurrentViewBox(loc.zoomViewBox);
  };

  const handleResetWorld = () => {
    setCurrentViewBox(defaultViewBox);
  };

  return (
    <section id="map" className="py-20 sm:py-28 px-6 sm:px-12 lg:px-16 w-full max-w-7xl mx-auto">
      
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold block mb-2">
            [GEOGRAPHIC OPERATIONAL FOOTPRINT]
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-neutral-900 leading-tight">
            MUMBAI ROOTS // <br />
            GLOBAL EXECUTION
          </h2>
        </div>

        <button
          onClick={handleResetWorld}
          className="self-start md:self-auto px-5 py-2.5 rounded-full bg-neutral-100 text-neutral-800 text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all cursor-pointer flex items-center gap-2 border border-neutral-200"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset World View</span>
        </button>
      </div>

      {/* Location Selector Pills */}
      <div className="flex flex-wrap items-center gap-2.5 mb-6">
        {locations.map((loc) => {
          const isSelected = selectedLoc.id === loc.id;
          return (
            <button
              key={loc.id}
              onClick={() => handleSelect(loc)}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
                isSelected
                  ? "bg-black text-white shadow-md"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-black border border-neutral-200/60"
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${isSelected ? "bg-red-500 animate-pulse" : "bg-neutral-400"}`} />
              {loc.name}
            </button>
          );
        })}
      </div>

      {/* Expanded Vertical Map Container with Clean Modern Light Contrast */}
      <div className="relative w-full h-[360px] sm:h-[480px] lg:h-[540px] rounded-3xl overflow-hidden bg-neutral-950 shadow-2xl">
        <svg
          viewBox={currentViewBox}
          className="w-full h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ willChange: "viewBox" }}
        >
          <g fill="#27272a" stroke="#3f3f46" strokeWidth="0.4">
            {worldMapData.map((item, idx) => {
              const isIndia = item.id === "IN" || item.name === "India";
              const isUK = item.id === "GB" || item.className === "United Kingdom";

              return (
                <path
                  key={idx}
                  d={item.d}
                  fill={isIndia ? "#52525b" : (isUK ? "#3f3f46" : "#27272a")}
                  stroke={isIndia ? "#ef4444" : "#3f3f46"}
                  strokeWidth={isIndia ? "1" : "0.4"}
                />
              );
            })}
          </g>

          {/* Route */}
          <path
            d="M 1389 384 Q 1180 230 985 172"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
            strokeDasharray="6 6"
            className="animate-pulse"
          />

          {/* Markers */}
          {locations.map((loc) => {
            const isSelected = selectedLoc.id === loc.id;
            return (
              <g
                key={loc.id}
                className="cursor-pointer group"
                onClick={() => handleSelect(loc)}
              >
                <circle
                  cx={loc.x}
                  cy={loc.y}
                  r={isSelected ? "18" : "10"}
                  fill="#ef4444"
                  opacity={isSelected ? "0.4" : "0.2"}
                  className={isSelected ? "animate-ping" : ""}
                />
                <circle
                  cx={loc.x}
                  cy={loc.y}
                  r={isSelected ? "7" : "5"}
                  fill="#ef4444"
                />
                <circle
                  cx={loc.x}
                  cy={loc.y}
                  r="2"
                  fill="#ffffff"
                />
                <text
                  x={loc.x + 10}
                  y={loc.y + 4}
                  fill={isSelected ? "#ffffff" : "#d4d4d8"}
                  fontSize={isSelected ? "12" : "10"}
                  fontWeight="800"
                  fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
                >
                  {loc.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Floating Dossier: Below Map on Mobile, Floating in Desktop */}
      <div className="mt-6 sm:mt-0 sm:absolute sm:bottom-6 sm:left-6 rounded-2xl bg-white/95 backdrop-blur-md p-6 sm:max-w-md shadow-2xl border border-neutral-100 relative z-10 text-neutral-900">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-red-600 font-bold px-3 py-1 rounded-full bg-red-50">
            {selectedLoc.badge}
          </span>
          <span className="text-xs text-neutral-400 font-mono">
            {selectedLoc.coordinates}
          </span>
        </div>

        <h4 className="text-xl font-bold text-neutral-900">
          {selectedLoc.name}
        </h4>
        <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
          {selectedLoc.detail}
        </p>

        <div className="mt-4 pt-3 flex items-center justify-between text-xs font-mono">
          <span className="text-neutral-400">{selectedLoc.stats}</span>
          <a
            href="#contact"
            className="font-bold text-red-600 hover:text-red-500 flex items-center gap-1 no-underline"
          >
            Book In {selectedLoc.name} <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

    </section>
  );
}
