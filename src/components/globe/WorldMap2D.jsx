import { useState, useRef, useEffect } from "react";
import worldMapData from "../../data/worldMapData.json";
import { Move } from "lucide-react";

export function WorldMap2D({ hubs, selectedHub, onSelectHub }) {
  const defaultViewBox = { minX: 700, minY: 80, width: 950, height: 420 };

  const [viewBox, setViewBox] = useState(() => {
    return selectedHub?.zoomBox || defaultViewBox;
  });

  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const initialViewBox = useRef(viewBox);
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const animationFrameRef = useRef(null);
  const currentBoxRef = useRef(viewBox);

  // Keep currentBoxRef updated whenever viewBox changes
  useEffect(() => {
    currentBoxRef.current = viewBox;
  }, [viewBox]);

  // "Water-Smooth" Organic Quintic Ease-Out curve with momentum dampening
  // Begins with fluid acceleration and lands like water settling into place
  const easeFluidWater = (t) => {
    return 1 - Math.pow(1 - t, 5);
  };

  // Ultra-fluid camera flight gliding across the globe like water
  useEffect(() => {
    if (!selectedHub || !selectedHub.zoomBox) return;

    const start = { ...currentBoxRef.current };
    const target = selectedHub.zoomBox;

    const isSame =
      Math.abs(start.minX - target.minX) < 0.5 &&
      Math.abs(start.minY - target.minY) < 0.5 &&
      Math.abs(start.width - target.width) < 0.5;

    if (isSame) return;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    // 1450ms luxurious cinematic glide time for fluid water-like motion
    const duration = 1450;
    const startTime = performance.now();

    const animateFlight = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const ease = easeFluidWater(progress);

      const nextViewBox = {
        minX: start.minX + (target.minX - start.minX) * ease,
        minY: start.minY + (target.minY - start.minY) * ease,
        width: start.width + (target.width - start.width) * ease,
        height: start.height + (target.height - start.height) * ease,
      };

      setViewBox(nextViewBox);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animateFlight);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animateFlight);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [selectedHub]);

  // Fluid Mouse Wheel Zooming with Momentum Interpolation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let targetBox = { ...currentBoxRef.current };
    let wheelAnimId = null;

    const smoothWheelStep = () => {
      const current = currentBoxRef.current;
      // Damped lerp (water glide factor 0.14)
      const factor = 0.14;

      const diffMinX = targetBox.minX - current.minX;
      const diffMinY = targetBox.minY - current.minY;
      const diffWidth = targetBox.width - current.width;
      const diffHeight = targetBox.height - current.height;

      if (
        Math.abs(diffMinX) < 0.1 &&
        Math.abs(diffMinY) < 0.1 &&
        Math.abs(diffWidth) < 0.1
      ) {
        setViewBox(targetBox);
        wheelAnimId = null;
        return;
      }

      setViewBox({
        minX: current.minX + diffMinX * factor,
        minY: current.minY + diffMinY * factor,
        width: current.width + diffWidth * factor,
        height: current.height + diffHeight * factor,
      });

      wheelAnimId = requestAnimationFrame(smoothWheelStep);
    };

    const handleWheel = (e) => {
      e.preventDefault();

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      const zoomFactor = e.deltaY > 0 ? 1.09 : 0.91;
      const svg = svgRef.current;
      if (!svg) return;

      const rect = svg.getBoundingClientRect();
      const mouseXRatio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const mouseYRatio = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

      const newWidth = Math.max(140, Math.min(2200, targetBox.width * zoomFactor));
      const newHeight = (newWidth / targetBox.width) * targetBox.height;

      const deltaWidth = targetBox.width - newWidth;
      const deltaHeight = targetBox.height - newHeight;

      targetBox = {
        minX: targetBox.minX + deltaWidth * mouseXRatio,
        minY: targetBox.minY + deltaHeight * mouseYRatio,
        width: newWidth,
        height: newHeight,
      };

      if (!wheelAnimId) {
        wheelAnimId = requestAnimationFrame(smoothWheelStep);
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
      if (wheelAnimId) cancelAnimationFrame(wheelAnimId);
    };
  }, []);

  // Pointer drag events for desktop mouse and mobile touch
  const handlePointerDown = (e) => {
    if (e.button && e.button !== 0) return;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
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
    <div
      ref={containerRef}
      className="relative w-full h-full cursor-grab active:cursor-grabbing select-none overflow-hidden bg-[#0a0c12]"
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
    >
      {/* Precision Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a2e3d15_1px,transparent_1px),linear-gradient(to_bottom,#2a2e3d15_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none z-0" />

      {/* Floating Drag & Scroll Cue */}
      <div className="absolute top-4 right-4 pointer-events-none z-20 flex items-center gap-2 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-[11px] font-mono text-neutral-300 shadow-lg">
        <Move className="h-3 w-3 text-red-500" />
        <span>DRAG TO PAN · SCROLL TO ZOOM</span>
      </div>

      <svg
        ref={svgRef}
        viewBox={viewBoxString}
        className="w-full h-full relative z-10 will-change-transform"
      >
        <defs>
          <filter id="hub-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#ef4444" floodOpacity="0.8" />
          </filter>
          <radialGradient id="ocean-radial" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#0f1118" />
            <stop offset="100%" stopColor="#08090d" />
          </radialGradient>
        </defs>

        {/* Ocean Background */}
        <rect x="0" y="0" width="2000" height="857" fill="url(#ocean-radial)" />

        {/* World Geometries with Defined Landmass Borders */}
        <g strokeLinejoin="round" strokeLinecap="round">
          {worldMapData.map((item, idx) => {
            const isIndia = item.id === "IN" || item.name === "India";
            const isUK =
              item.id === "GB" ||
              item.className === "United Kingdom" ||
              item.name === "United Kingdom";

            return (
              <path
                key={idx}
                d={item.d}
                fill={isIndia ? "#232634" : isUK ? "#1e212b" : "#13151d"}
                stroke={isIndia ? "#dc2626" : isUK ? "#ef4444" : "#2e3240"}
                strokeWidth={isIndia ? "1.4" : isUK ? "1.1" : "0.55"}
                className="transition-colors duration-300 hover:fill-[#2a2e3d]"
              />
            );
          })}
        </g>

        {/* Static Architectural Route Line (Mumbai to London) */}
        <path
          d="M 1386 382 Q 1180 230 985 172"
          fill="none"
          stroke="#ef4444"
          strokeWidth="2.2"
          strokeDasharray="6 6"
          opacity="0.75"
        />

        {/* Solid, 100% Constant Stationary Location Markers */}
        {hubs.map((hub) => {
          const isSelected = selectedHub && selectedHub.id === hub.id;

          const labelOffsetX = hub.id === "mumbai" ? -88 : 15;
          const labelOffsetY = hub.id === "pune" ? 15 : 4;

          return (
            <g
              key={hub.id}
              className="cursor-pointer group"
              onClick={(e) => {
                e.stopPropagation();
                onSelectHub(hub);
              }}
            >
              {/* Constant Solid Outer Glow Circle */}
              <circle
                cx={hub.x}
                cy={hub.y}
                r={isSelected ? "11" : "8"}
                fill="#dc2626"
                opacity={isSelected ? "0.4" : "0.25"}
              />

              {/* Constant Red Pin with White Border */}
              <circle
                cx={hub.x}
                cy={hub.y}
                r={isSelected ? "6.5" : "5"}
                fill="#dc2626"
                stroke="#ffffff"
                strokeWidth={isSelected ? "2" : "1.5"}
                filter="url(#hub-glow)"
              />

              {/* Constant Solid White Center Point */}
              <circle
                cx={hub.x}
                cy={hub.y}
                r={isSelected ? "2.6" : "2"}
                fill="#ffffff"
              />

              {/* Clear Typography Label */}
              <text
                x={hub.x + labelOffsetX}
                y={hub.y + labelOffsetY}
                fill={isSelected ? "#ffffff" : "#cbd5e1"}
                fontSize={isSelected ? "13.5" : "11"}
                fontWeight="800"
                letterSpacing="0.04em"
                fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
                className="select-none filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.95)]"
              >
                {hub.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
