import { useState } from "react";
import { hubsData } from "./globe/hubsData";
import { WorldMap2D } from "./globe/WorldMap2D";
import { HubInfoSidebar } from "./globe/HubInfoSidebar";
import { WorldMapControls } from "./globe/WorldMapControls";

export function Destinations({ onContactClick }) {
  const [selectedHub, setSelectedHub] = useState(hubsData[0]);

  // Centered on India with visible surrounding territory
  const defaultWorldZoomBox = { minX: 1100, minY: 150, width: 620, height: 350 };

  const handleSelectHub = (hub) => {
    setSelectedHub(hub);
  };

  const handleReset = () => {
    setSelectedHub({
      ...hubsData[0],
      zoomBox: defaultWorldZoomBox,
    });
  };

  const handleZoomIn = () => {
    setSelectedHub((prev) => {
      const box = prev.zoomBox || defaultWorldZoomBox;
      const factor = 0.8;
      const newWidth = Math.max(180, box.width * factor);
      const newHeight = (newWidth / box.width) * box.height;
      const dx = (box.width - newWidth) / 2;
      const dy = (box.height - newHeight) / 2;
      return {
        ...prev,
        zoomBox: {
          minX: box.minX + dx,
          minY: box.minY + dy,
          width: newWidth,
          height: newHeight,
        },
      };
    });
  };

  const handleZoomOut = () => {
    setSelectedHub((prev) => {
      const box = prev.zoomBox || defaultWorldZoomBox;
      const factor = 1.25;
      const newWidth = Math.min(2000, box.width * factor);
      const newHeight = (newWidth / box.width) * box.height;
      const dx = (box.width - newWidth) / 2;
      const dy = (box.height - newHeight) / 2;
      return {
        ...prev,
        zoomBox: {
          minX: Math.max(0, box.minX + dx),
          minY: Math.max(0, box.minY + dy),
          width: newWidth,
          height: newHeight,
        },
      };
    });
  };

  return (
    <section id="map" className="py-20 sm:py-28 px-6 sm:px-12 lg:px-16 w-full max-w-7xl mx-auto">
      
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <p className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-neutral-400 mb-2">
            GEOGRAPHIC FOOTPRINT &middot; ACTIVE DEPLOYMENT ENGINE
          </p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-neutral-900 leading-tight">
            Operational Hubs &amp; <br />
            Global Presence
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 max-w-2xl">
            Interactive territory map with on-ground show archives. Select a hub below to inspect past mega expos, multi-camera setups, and deployment corridors.
          </p>
        </div>

        {/* Map Control Buttons */}
        <WorldMapControls
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onReset={handleReset}
        />
      </div>

      {/* Location Selector Filter Pills */}
      <div className="flex flex-wrap items-center gap-2.5 mb-6">
        {hubsData.map((hub) => {
          const isSelected = selectedHub.id === hub.id;
          return (
            <button
              key={hub.id}
              onClick={() => handleSelectHub(hub)}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
                isSelected
                  ? "bg-black text-white shadow-md scale-[1.02]"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-black border border-neutral-200/60"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isSelected ? "bg-red-500" : "bg-neutral-400"
                }`}
              />
              {hub.name}
            </button>
          );
        })}
      </div>

      {/* Interactive Map Canvas Container */}
      <div className="relative w-full h-[340px] sm:h-[500px] lg:h-[640px] rounded-3xl overflow-hidden bg-[#0a0c12] border border-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
        {/* World Vector Map Canvas */}
        <div className="w-full h-full relative z-0">
          <WorldMap2D
            hubs={hubsData}
            selectedHub={selectedHub}
            onSelectHub={handleSelectHub}
          />
        </div>

        {/* Desktop Floating HUD Card with Real Event Media */}
        <div className="hidden sm:block absolute bottom-6 left-6 w-[360px] lg:w-[390px] z-20">
          <HubInfoSidebar
            hub={selectedHub}
            onContactClick={onContactClick}
          />
        </div>
      </div>

      {/* Mobile Location Dossier Card (Stacked Cleanly Under Map) */}
      <div className="sm:hidden mt-4">
        <HubInfoSidebar
          hub={selectedHub}
          onContactClick={onContactClick}
        />
      </div>

    </section>
  );
}

export { Destinations as LocationMap };
