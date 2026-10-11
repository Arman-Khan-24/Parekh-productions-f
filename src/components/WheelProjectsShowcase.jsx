import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { siteContent } from "../data/siteContent";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export function WheelProjectsShowcase({ onViewAllProjects }) {
  const projects = siteContent.clients;
  const [activeIndex, setActiveIndex] = useState(0);
  const total = projects.length;

  // 3D Canvas Ref
  const mountRef = useRef(null);
  const gearMeshRef = useRef(null);
  const targetRotationY = useRef(0);
  const currentRotationY = useRef(0);

  // Setup lightweight procedural 3D Cine-Lens Gear Wheel in Three.js (0MB external download, smooth 60fps)
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 300;
    const height = mount.clientHeight || 140;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 3.8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const redRimLight = new THREE.DirectionalLight(0xdc2626, 2.5);
    redRimLight.position.set(-2, 3, 2);
    scene.add(redRimLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 1.2);
    fillLight.position.set(3, 2, 2);
    scene.add(fillLight);

    // Build Cine-Lens Gear Rig: Cylindrical Gear with Calibrated Teeth
    const gearGroup = new THREE.Group();

    // Main Outer Ring (Anodized matte black metal)
    const ringGeo = new THREE.CylinderGeometry(2.2, 2.2, 0.35, 48, 1, true);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      metalness: 0.85,
      roughness: 0.25,
      wireframe: false,
    });
    const mainRing = new THREE.Mesh(ringGeo, ringMat);
    gearGroup.add(mainRing);

    // Inner Red Focus Ring
    const innerRingGeo = new THREE.CylinderGeometry(2.05, 2.05, 0.38, 48, 1, true);
    const innerRingMat = new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      metalness: 0.6,
      roughness: 0.3,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    gearGroup.add(innerRing);

    // Calibrated Mechanical Teeth along Circumference
    const toothGeo = new THREE.BoxGeometry(0.06, 0.4, 0.18);
    const toothMat = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8,
      metalness: 0.9,
      roughness: 0.2,
    });

    const numTeeth = 36;
    for (let i = 0; i < numTeeth; i++) {
      const angle = (i / numTeeth) * Math.PI * 2;
      const tooth = new THREE.Mesh(toothGeo, toothMat);
      tooth.position.x = Math.sin(angle) * 2.22;
      tooth.position.z = Math.cos(angle) * 2.22;
      tooth.rotation.y = angle;
      gearGroup.add(tooth);
    }

    gearGroup.position.set(0, -0.6, 0);
    scene.add(gearGroup);
    gearMeshRef.current = gearGroup;

    // Animation Loop with smooth lerping
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      currentRotationY.current += (targetRotationY.current - currentRotationY.current) * 0.08;
      if (gearMeshRef.current) {
        gearMeshRef.current.rotation.y = currentRotationY.current;
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update 3D rotation whenever active index changes
  const selectProject = (idx) => {
    const wrappedIdx = (idx + total) % total;
    setActiveIndex(wrappedIdx);
    targetRotationY.current = (wrappedIdx / total) * Math.PI * 2;
  };

  const handleNext = () => selectProject(activeIndex + 1);
  const handlePrev = () => selectProject(activeIndex - 1);

  const currentProject = projects[activeIndex];

  // Dragging / swiping around the half circle
  const isDragging = useRef(false);
  const dragStartX = useRef(0);

  const onPointerDown = (e) => {
    isDragging.current = true;
    dragStartX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  };

  const onPointerMove = (e) => {
    if (!isDragging.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const delta = clientX - dragStartX.current;
    if (Math.abs(delta) > 55) {
      if (delta > 0) {
        handlePrev();
      } else {
        handleNext();
      }
      dragStartX.current = clientX;
    }
  };

  const onPointerUp = () => {
    isDragging.current = false;
  };

  return (
    <section 
      id="clients" 
      className="relative w-full min-h-[92vh] lg:min-h-screen py-12 lg:py-16 bg-white overflow-hidden flex flex-col justify-between selection:bg-black selection:text-white"
    >
      {/* Top Header */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold">
              [CINEMA HALF-DIAL // 0{activeIndex + 1} OF 0{total}]
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-neutral-900 leading-tight">
            Selected Works <br className="hidden sm:inline" />
            &amp; Productions
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            aria-label="Previous Project"
            className="h-11 w-11 rounded-full border border-neutral-300 hover:border-black hover:bg-black hover:text-white transition-all flex items-center justify-center cursor-pointer active:scale-95 shadow-sm"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Project"
            className="h-11 w-11 rounded-full border border-neutral-300 hover:border-black hover:bg-black hover:text-white transition-all flex items-center justify-center cursor-pointer active:scale-95 shadow-sm"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          {onViewAllProjects && (
            <button
              onClick={onViewAllProjects}
              className="ml-2 px-5 py-2.5 rounded-full bg-black text-white hover:bg-neutral-800 text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-sm transition-all hover:gap-3"
            >
              <span>Explore Gallery</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Showcase Body (Media & Dossier Details) */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 my-6 lg:my-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: Active Project Media Showcase */}
        <div className="lg:col-span-7 relative group">
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-3xl overflow-hidden bg-neutral-100 shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-neutral-200">
            <img
              src={currentProject.coverImage}
              alt={currentProject.name}
              key={currentProject.id}
              className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

            {/* Top Badges */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2">
              <span className="rounded-full bg-white/95 backdrop-blur-md px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-black shadow-sm">
                {currentProject.category}
              </span>
              <span className="rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-mono uppercase tracking-wider text-white border border-white/20">
                {currentProject.scale}
              </span>
            </div>

            {/* Bottom Title on Media */}
            <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8 text-white">
              <p className="text-xs font-mono uppercase tracking-widest text-red-400 font-bold mb-1">
                LOCATION // {currentProject.location}
              </p>
              <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                {currentProject.name}
              </h3>
            </div>
          </div>
        </div>

        {/* Right: Project Dossier Specs & Narrative */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-5">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold">
              [DELIVERED BRIEF]
            </span>
            <p className="text-base sm:text-lg text-neutral-800 font-medium leading-relaxed">
              {currentProject.tagline}
            </p>
          </div>

          <p className="text-sm text-neutral-600 leading-relaxed">
            {currentProject.description}
          </p>

          {/* Key Deliverables Chips */}
          <div className="pt-2">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-2 font-bold">
              Deployment Package:
            </span>
            <div className="flex flex-wrap gap-2">
              {currentProject.deliverables?.slice(0, 3).map((item, i) => (
                <span
                  key={i}
                  className="rounded-xl bg-neutral-100 border border-neutral-200/80 px-3 py-1.5 text-xs font-semibold text-neutral-800"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3 text-xs font-mono text-neutral-500">
            <span>Swipe half-circle wheel below or use buttons</span>
          </div>
        </div>

      </div>

      {/* TRUE HALF-CIRCLE CIRCUMFERENCE WHEEL DIAL WITH 3D GEAR */}
      <div 
        className="relative w-full select-none cursor-grab active:cursor-grabbing pb-2"
        onMouseDown={onPointerDown}
        onMouseMove={onPointerMove}
        onMouseUp={onPointerUp}
        onTouchStart={onPointerDown}
        onTouchMove={onPointerMove}
        onTouchEnd={onPointerUp}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
          <span>‹ DRAG SEMI-CIRCULAR APERTURE ›</span>
          <span className="text-red-600 font-bold font-mono">3D PROCEDURAL CINE-LENS RIG</span>
        </div>

        {/* Half Circle Circumference Stage */}
        <div className="relative h-48 sm:h-56 w-full max-w-5xl mx-auto overflow-hidden flex items-end justify-center">
          
          {/* Half-Circle Arch Curve Container */}
          <div className="relative w-[680px] sm:w-[820px] h-[340px] sm:h-[410px] rounded-t-full border-t-[3px] border-neutral-300 bg-gradient-to-b from-neutral-50/80 to-transparent flex items-start justify-center shadow-[0_-15px_30px_rgba(0,0,0,0.03)]">
            
            {/* Calibrated Circumference Tick Marks */}
            <div className="absolute inset-0 rounded-t-full pointer-events-none overflow-hidden">
              <div className="w-full h-full relative">
                {Array.from({ length: 41 }).map((_, i) => {
                  const angleDeg = -90 + (i / 40) * 180;
                  return (
                    <div
                      key={i}
                      style={{
                        transform: `rotate(${angleDeg}deg) translateY(-100%)`,
                        transformOrigin: "bottom center",
                      }}
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 ${
                        i % 5 === 0 ? "h-6 bg-neutral-900" : "h-3 bg-neutral-400/70"
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Embedded 3D Cine-Lens Three.js Canvas at the center of the arc */}
            <div 
              ref={mountRef} 
              className="absolute top-14 sm:top-16 w-56 sm:w-72 h-28 sm:h-36 pointer-events-none z-0" 
            />

            {/* Circumference-Distributed Project Pill Badges along the Semi-Circle Arc */}
            <div className="absolute inset-0 pointer-events-auto">
              {projects.map((proj, idx) => {
                const isActive = idx === activeIndex;
                // Calculate position along upper half-circle arc (-70deg to +70deg relative to active)
                const offset = idx - activeIndex;
                const angleDeg = offset * 28; // Arc degree spacing
                const angleRad = (angleDeg * Math.PI) / 180;
                
                // Radius in pixels
                const radius = 290;
                const x = Math.sin(angleRad) * radius;
                const y = (1 - Math.cos(angleRad)) * radius;

                // Only render items within visible semi-circle
                const isVisible = Math.abs(angleDeg) <= 75;
                if (!isVisible) return null;

                return (
                  <button
                    key={proj.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      selectProject(idx);
                    }}
                    style={{
                      transform: `translate(calc(-50% + ${x}px), ${y}px) rotate(${angleDeg * 0.4}deg)`,
                      opacity: isActive ? 1 : Math.max(0.3, 1 - Math.abs(offset) * 0.35),
                    }}
                    className={`absolute top-2 left-1/2 flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-300 cursor-pointer shadow-md ${
                      isActive
                        ? "bg-black text-white scale-110 border-2 border-red-600 z-20 shadow-xl"
                        : "bg-white text-neutral-800 hover:bg-neutral-100 border border-neutral-200 z-10"
                    }`}
                  >
                    <span className={`h-2 w-2 rounded-full ${isActive ? "bg-red-500 animate-pulse" : "bg-neutral-400"}`} />
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider whitespace-nowrap">
                      {proj.name}
                    </span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${isActive ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-500"}`}>
                      0{idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Central Calibrated Needle */}
            <div className="absolute top-0 pointer-events-none flex flex-col items-center z-30">
              <div className="w-3.5 h-3.5 bg-red-600 rotate-45 transform translate-y-[-2px] shadow-sm" />
              <div className="w-0.5 h-8 bg-red-600" />
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
