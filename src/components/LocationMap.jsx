import { useState, useRef } from "react";
import worldMapData from "../data/worldMapData.json";
import { GEO_COORDINATES } from "../data/geoCoordinates";
import { RotateCcw, ArrowRight, ZoomIn, ZoomOut, Move } from "lucide-react";

export function LocationMap() {
  const defaultViewBox = { minX: 0, minY: 0, width: 2000, height: 857 };

  const locations = [
    {
      id: "mumbai",
      name: "Mumbai HQ",
      subhead: "Western & Central Hub",
      role: "Corporate Head Office & Central Equipment Vault",
      detail: "Full internal inventory: Sony Cinema Line (FX6/FX3), Master G-Master primes, Novastar LED processors, and German hangar structures. Daily deployment to NESCO (Goregaon) & Jio World Centre (BKC).",
      x: 1389,
      y: 384,
      zoomBox: { minX: 1280, minY: 290, width: 240, height: 180 },
      stats: "30-Min On-Ground Dispatch",
      badge: "Master Base",
      coordinates: GEO_COORDINATES.mumbai.displayDMS,
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
      zoomBox: { minX: 1320, minY: 320, width: 180, height: 140 },
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
      zoomBox: { minX: 1300, minY: 240, width: 320, height: 250 },
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
      zoomBox: { minX: 910, minY: 120, width: 160, height: 120 },
      stats: "Direct UK Liaison",
      badge: "International",
      coordinates: "51°30'N, 0°07'W",
    },
  ];

  const [selectedLoc, setSelectedLoc] = useState(locations[0]);
  const [viewBox, setViewBox] = useState(locations[0].zoomBox);
  
  // Dragging and pan physics state
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const initialViewBox = useRef(viewBox);
  const svgRef = useRef(null);

  const handleSelect = (loc) => {
    setSelectedLoc(loc);
    setViewBox(loc.zoomBox);
  };

  const handleResetWorld = () => {
    setViewBox(defaultViewBox);
  };

  const handleZoom = (factor) => {
    setViewBox((prev) => {
      const newWidth = Math.max(100, Math.min(2400, prev.width * factor));
      const newHeight = (newWidth / 2000) * 857;
      const dx = (prev.width - newWidth) / 2;
      const dy = (prev.height - newHeight) / 2;
      return {
        minX: prev.minX + dx,
        minY: prev.minY + dy,
        width: newWidth,
        height: newHeight,
      };
    });
  };

  // Pointer drag events for desktop & touch
  const handlePointerDown = (e) => {
    isDragging.current = true;
    dragStart.current = {
      x: e.clientX || (e.touches && e.touches[0].clientX) || 0,
      y: e.clientY || (e.touches && e.touches[0].clientY) || 0,
    };
    initialViewBox.current = { ...viewBox };
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current || !svgRef.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    const deltaX = clientX - dragStart.current.x;
    const deltaY = clientY - dragStart.current.y;

    const svgRect = svgRef.current.getBoundingClientRect();
    const scaleX = initialViewBox.current.width / svgRect.width;
    const scaleY = initialViewBox.current.height / svgRect.height;

    setViewBox({
      minX: initialViewBox.current.minX - deltaX * scaleX,
      minY: initialViewBox.current.minY - deltaY * scaleY,
      width: initialViewBox.current.width,
      height: initialViewBox.current.height,
    });
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const viewBoxString = `${viewBox.minX} ${viewBox.minY} ${viewBox.width} ${viewBox.height}`;

  return (
    <section id="map" className="py-20 sm:py-28 px-6 sm:px-12 lg:px-16 w-full max-w-7xl mx-auto">
      
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold block mb-2">
            [GEOGRAPHICAL FOOTPRINT // LIVE DEPLOYMENT ENGINE]
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-neutral-900 leading-tight">
            Operational Hubs & <br />
            Global Presence
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 max-w-2xl">
            Interactive territory map. Click hubs below, or drag/pan directly anywhere on the map to inspect our deployment corridors.
          </p>
        </div>

        {/* Map Control Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleZoom(0.75)}
            aria-label="Zoom in"
            className="p-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-all border border-neutral-200 cursor-pointer active:scale-95"
            title="Zoom In"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleZoom(1.33)}
            aria-label="Zoom out"
            className="p-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-all border border-neutral-200 cursor-pointer active:scale-95"
            title="Zoom Out"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <button
            onClick={handleResetWorld}
            className="px-4 py-2.5 rounded-full bg-neutral-100 text-neutral-800 text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all cursor-pointer flex items-center gap-2 border border-neutral-200"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset World</span>
          </button>
        </div>
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

      {/* Expanded Interactive Map Container (Fully Draggable & Smooth) */}
      <div 
        className="relative w-full h-[420px] sm:h-[520px] lg:h-[580px] rounded-3xl overflow-hidden bg-[#090a0f] border border-neutral-200/20 cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
      >
        {/* Subtle Cyber Grid Backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        {/* Floating Pan Cue */}
        <div className="absolute top-4 right-4 pointer-events-none z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[11px] font-mono text-neutral-400">
          <Move className="h-3 w-3 text-red-500" />
          <span>DRAG MAP TO PAN</span>
        </div>

        <svg
          ref={svgRef}
          viewBox={viewBoxString}
          className="w-full h-full transition-all duration-300 ease-out"
        >
          {/* World Geometries */}
          <g fill="#18181b" stroke="#27272a" strokeWidth="0.4">
            {worldMapData.map((item, idx) => {
              const isIndia = item.id === "IN" || item.name === "India";
              const isUK = item.id === "GB" || item.className === "United Kingdom";

              return (
                <path
                  key={idx}
                  d={item.d}
                  fill={isIndia ? "#27272a" : (isUK ? "#202024" : "#121215")}
                  stroke={isIndia ? "#dc2626" : "#27272a"}
                  strokeWidth={isIndia ? "1.2" : "0.4"}
                  className="transition-colors duration-500"
                />
              );
            })}
          </g>

          {/* Glowing Transcontinental Flight Route (Mumbai to London) */}
          <path
            d="M 1389 384 Q 1180 230 985 172"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2.5"
            strokeDasharray="8 6"
            className="animate-pulse opacity-80"
          />

          {/* Interactive Radar Markers */}
          {locations.map((loc) => {
            const isSelected = selectedLoc.id === loc.id;
            return (
              <g
                key={loc.id}
                className="cursor-pointer group"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(loc);
                }}
              >
                {/* Outer Radar Wave */}
                <circle
                  cx={loc.x}
                  cy={loc.y}
                  r={isSelected ? "22" : "12"}
                  fill="#ef4444"
                  opacity={isSelected ? "0.35" : "0.15"}
                  className={isSelected ? "animate-ping" : ""}
                />
                
                {/* Core Glowing Dot */}
                <circle
                  cx={loc.x}
                  cy={loc.y}
                  r={isSelected ? "7" : "5"}
                  fill="#ef4444"
                  className="transition-all duration-300 group-hover:scale-125"
                />
                <circle
                  cx={loc.x}
                  cy={loc.y}
                  r="2.5"
                  fill="#ffffff"
                />

                {/* Typography Tag */}
                <text
                  x={loc.x + 12}
                  y={loc.y + 4}
                  fill={isSelected ? "#ffffff" : "#a1a1aa"}
                  fontSize={isSelected ? "13" : "11"}
                  fontWeight="800"
                  letterSpacing="0.05em"
                  fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
                  className="select-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                >
                  {loc.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating Dossier: Translucent Glass HUD on Desktop */}
        <div className="hidden sm:block absolute bottom-6 left-6 rounded-2xl bg-black/85 backdrop-blur-xl p-6 max-w-sm border border-white/10 z-10 text-white shadow-2xl pointer-events-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold px-3 py-1 rounded-full bg-red-950/60 border border-red-800/40">
              {selectedLoc.badge}
            </span>
            <span className="text-xs text-neutral-400 font-mono">
              {selectedLoc.coordinates}
            </span>
          </div>

          <h4 className="text-xl font-black text-white mt-1">
            {selectedLoc.name}
          </h4>
          <p className="text-xs text-neutral-300 mt-1.5 leading-relaxed font-light">
            {selectedLoc.detail}
          </p>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
            <span className="text-neutral-400">{selectedLoc.stats}</span>
            <a
              href="#contact"
              className="font-bold text-red-400 hover:text-white flex items-center gap-1 no-underline transition-colors"
            >
              Dispatch In {selectedLoc.name} <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

      </div>

      {/* Mobile Location Dossier (Cleanly stacked below map, unblocking map touch navigation) */}
      <div className="sm:hidden mt-4 rounded-2xl bg-neutral-900 p-5 text-white border border-neutral-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold px-2.5 py-0.5 rounded-full bg-red-950/60">
            {selectedLoc.badge}
          </span>
          <span className="text-[11px] text-neutral-400 font-mono">
            {selectedLoc.coordinates}
          </span>
        </div>
        <h4 className="text-lg font-bold text-white">{selectedLoc.name}</h4>
        <p className="text-xs text-neutral-300 mt-1 leading-relaxed">{selectedLoc.detail}</p>
        <div className="mt-3 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs font-mono">
          <span className="text-neutral-400">{selectedLoc.stats}</span>
          <a href="#contact" className="font-bold text-red-400 flex items-center gap-1">
            Dispatch <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>

    </section>
  );
}
