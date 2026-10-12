import { Plus, Minus, RotateCcw } from "lucide-react";

export function WorldMapControls({ onZoomIn, onZoomOut, onReset }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onZoomIn}
        aria-label="Zoom in"
        className="p-2.5 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white transition-all border border-white/10 cursor-pointer active:scale-95 shadow-lg backdrop-blur-md"
        title="Zoom In"
      >
        <Plus className="h-4 w-4" />
      </button>
      <button
        onClick={onZoomOut}
        aria-label="Zoom out"
        className="p-2.5 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white transition-all border border-white/10 cursor-pointer active:scale-95 shadow-lg backdrop-blur-md"
        title="Zoom Out"
      >
        <Minus className="h-4 w-4" />
      </button>
      <button
        onClick={onReset}
        className="px-4 py-2.5 rounded-full bg-neutral-900/80 text-white text-xs font-bold uppercase tracking-wider hover:bg-red-600 hover:border-red-500 transition-all cursor-pointer flex items-center gap-2 border border-white/10 shadow-lg backdrop-blur-md active:scale-95"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        <span>Reset View</span>
      </button>
    </div>
  );
}
