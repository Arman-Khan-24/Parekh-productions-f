import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { siteContent } from "../data/siteContent";
import { ArrowRight, ChevronUp, ChevronDown } from "lucide-react";

export function WheelProjectsShowcase({ onViewAllProjects }) {
  const projects = siteContent.clients;
  const [activeIndex, setActiveIndex] = useState(0);
  const total = projects.length;

  const canvasRef = useRef(null);
  const wheelGroupRef = useRef(null);
  const targetRotation = useRef(0);
  const currentRotation = useRef(0);

  const anglePerItem = (Math.PI * 2) / total;

  // Initialize True 3D Half-Wheel Model with Three.js on pure white background
  useEffect(() => {
    const mount = canvasRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 360;
    const height = mount.clientHeight || 560;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Studio Lighting for pure white background
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const redRim = new THREE.DirectionalLight(0xdc2626, 3.0);
    redRim.position.set(-5, 0, 3);
    scene.add(redRim);

    // Main 3D Wheel Group (Pivot placed hard to the left edge of container)
    const wheel = new THREE.Group();
    wheel.position.set(-3.2, 0, 0); // Stuck cleanly to the left edge

    // 1. Sleek Aluminum Outer Rim
    const outerRingGeo = new THREE.TorusGeometry(3.6, 0.22, 24, 80);
    const outerRingMat = new THREE.MeshStandardMaterial({
      color: 0x3f3f46,
      metalness: 0.85,
      roughness: 0.25,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    wheel.add(outerRing);

    // 2. High-Precision Red Calibrated Aperture Accent Ring
    const innerRingGeo = new THREE.TorusGeometry(3.2, 0.08, 16, 80);
    const innerRingMat = new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      metalness: 0.65,
      roughness: 0.2,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    wheel.add(innerRing);

    // 3. Central Mechanical Hub / Core
    const hubGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.35, 36);
    hubGeo.rotateX(Math.PI / 2);
    const hubMat = new THREE.MeshStandardMaterial({
      color: 0x52525b,
      metalness: 0.8,
      roughness: 0.3,
    });
    const hub = new THREE.Mesh(hubGeo, hubMat);
    wheel.add(hub);

    // 4. Heavy-Duty Mechanical Spokes radiating to the rim
    for (let i = 0; i < 8; i++) {
      const spokeAngle = (i / 8) * Math.PI * 2;
      const spokeGeo = new THREE.BoxGeometry(0.12, 2.3, 0.12);
      const spokeMat = new THREE.MeshStandardMaterial({
        color: 0x71717a,
        metalness: 0.85,
        roughness: 0.25,
      });
      const spoke = new THREE.Mesh(spokeGeo, spokeMat);
      spoke.position.x = Math.sin(spokeAngle) * 2.2;
      spoke.position.y = Math.cos(spokeAngle) * 2.2;
      spoke.rotation.z = -spokeAngle;
      wheel.add(spoke);
    }

    // 5. Calibrated Focus Teeth along Circumference
    const toothGeo = new THREE.BoxGeometry(0.14, 0.08, 0.26);
    const toothMat = new THREE.MeshStandardMaterial({
      color: 0xa1a1aa,
      metalness: 0.9,
      roughness: 0.15,
    });
    const totalTeeth = 48;
    for (let i = 0; i < totalTeeth; i++) {
      const toothAngle = (i / totalTeeth) * Math.PI * 2;
      const tooth = new THREE.Mesh(toothGeo, toothMat);
      tooth.position.x = Math.sin(toothAngle) * 3.75;
      tooth.position.y = Math.cos(toothAngle) * 3.75;
      tooth.rotation.z = -toothAngle;
      wheel.add(tooth);
    }

    scene.add(wheel);
    wheelGroupRef.current = wheel;

    // Smooth physics loop
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      currentRotation.current += (targetRotation.current - currentRotation.current) * 0.08;
      if (wheelGroupRef.current) {
        wheelGroupRef.current.rotation.z = currentRotation.current;
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

  const selectProject = (idx) => {
    const wrapped = (idx + total) % total;
    setActiveIndex(wrapped);
    targetRotation.current = wrapped * anglePerItem;
  };

  const handleNext = () => selectProject(activeIndex + 1);
  const handlePrev = () => selectProject(activeIndex - 1);

  // Dragging and touch rotation along vertical arc
  const isDragging = useRef(false);
  const dragStartY = useRef(0);

  const onPointerDown = (e) => {
    isDragging.current = true;
    dragStartY.current = e.clientY || (e.touches && e.touches[0].clientY) || 0;
  };

  const onPointerMove = (e) => {
    if (!isDragging.current) return;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    const deltaY = clientY - dragStartY.current;
    if (Math.abs(deltaY) > 35) {
      if (deltaY > 0) {
        handlePrev();
      } else {
        handleNext();
      }
      dragStartY.current = clientY;
    }
  };

  const onPointerUp = () => {
    isDragging.current = false;
  };

  const currentProject = projects[activeIndex];

  return (
    <section 
      id="clients" 
      className="relative w-full py-10 lg:py-14 bg-white overflow-hidden flex flex-col justify-between selection:bg-black selection:text-white"
    >
      {/* Top Header */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-neutral-400 mb-2">
            FEATURED PORTFOLIO &middot; DYNAMIC FOCUS WHEEL
          </p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-neutral-900 leading-tight">
            Selected Works <br className="hidden sm:inline" />
            &amp; Productions
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            aria-label="Previous Project"
            className="h-10 w-10 rounded-full border border-neutral-300 hover:border-black hover:bg-black hover:text-white transition-colors flex items-center justify-center cursor-pointer"
          >
            <ChevronUp className="h-4 w-4" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Project"
            className="h-10 w-10 rounded-full border border-neutral-300 hover:border-black hover:bg-black hover:text-white transition-colors flex items-center justify-center cursor-pointer"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
          {onViewAllProjects && (
            <button
              onClick={onViewAllProjects}
              className="ml-2 px-5 py-2.5 rounded-full bg-black text-white hover:bg-neutral-800 text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
            >
              <span>Explore Gallery</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Split Showcase: Pure White Theme, 3D Half-Wheel Stuck to Left, Dynamic Arc Shift on Cards */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 my-6 lg:my-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Pure White Canvas with 3D Half-Wheel stuck to screen */}
        <div 
          className="lg:col-span-5 relative h-[440px] sm:h-[520px] rounded-3xl bg-white overflow-hidden flex items-center select-none cursor-grab active:cursor-grabbing border border-neutral-100"
          onMouseDown={onPointerDown}
          onMouseMove={onPointerMove}
          onMouseUp={onPointerUp}
          onTouchStart={onPointerDown}
          onTouchMove={onPointerMove}
          onTouchEnd={onPointerUp}
        >
          {/* 3D WebGL Canvas Rendering Real Rotating Half-Wheel Stuck Hard Left */}
          <div ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

          {/* Calibrated Hub Meta */}
          <div className="absolute top-4 left-4 z-10 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
            3D APERTURE · SWIPE VERTICAL
          </div>

          {/* Option Cards (1 to 6) Dynamically Translating along the Curved Circumference */}
          <div className="absolute inset-y-0 right-2 sm:right-4 w-52 sm:w-60 flex flex-col justify-center space-y-2 z-10">
            {projects.map((proj, idx) => {
              const isActive = idx === activeIndex;
              // Angular offset relative to active project index
              const offset = idx - activeIndex;
              // Smooth dynamic translation: active card pushes out while adjacent cards curve along rim
              const translateX = isActive ? 0 : Math.min(24, Math.abs(offset) * 10);
              const scale = isActive ? 1.02 : 0.96;

              return (
                <button
                  key={proj.id}
                  onClick={() => selectProject(idx)}
                  style={{
                    transform: `translateX(${translateX}px) scale(${scale})`,
                    transition: "transform 400ms cubic-bezier(0.16, 1, 0.3, 1), background-color 250ms ease, color 250ms ease",
                  }}
                  className={`w-full text-left p-3 rounded-2xl transition-all cursor-pointer border ${
                    isActive
                      ? "bg-black text-white border-black z-20"
                      : "bg-white text-neutral-800 hover:bg-neutral-100 border-neutral-200 z-10"
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className={`text-[10px] uppercase tracking-wider font-bold ${
                      isActive ? "text-red-400" : "text-neutral-500"
                    }`}>
                      0{idx + 1} · {proj.category}
                    </span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                    )}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-tight truncate">
                    {proj.name}
                  </h4>
                </button>
              );
            })}
          </div>

          {/* Center Indicator Needle */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none z-20 flex items-center">
            <div className="w-3.5 h-3.5 bg-red-600 rotate-45 transform translate-x-1.5 shadow-sm" />
          </div>
        </div>

        {/* Right Column: Active Project Media & Specifications (Zero Shadow, Pure White Background) */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
          {/* Media Player Container - Zero Harsh Shadows */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200">
            <img
              src={currentProject.coverImage}
              alt={currentProject.name}
              key={currentProject.id}
              className="h-full w-full object-cover transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Badges */}
            <div className="absolute top-4 left-4 sm:top-5 sm:left-5 flex items-center gap-2">
              <span className="rounded-full bg-white px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-black">
                {currentProject.category}
              </span>
              <span className="rounded-full bg-black/60 px-3 py-1 text-xs uppercase tracking-wider text-white border border-white/20">
                {currentProject.scale}
              </span>
            </div>

            {/* Project Title */}
            <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 text-white">
              <p className="text-xs uppercase tracking-widest text-red-400 font-bold mb-1">
                {currentProject.location}
              </p>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-tight">
                {currentProject.name}
              </h3>
            </div>
          </div>

          {/* Narrative Specs */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">
              Delivered Executive Brief
            </span>
            <p className="text-base text-neutral-800 font-medium leading-relaxed">
              {currentProject.tagline}
            </p>
          </div>

          <p className="text-sm text-neutral-600 leading-relaxed">
            {currentProject.description}
          </p>

          {/* Deliverables */}
          <div className="pt-1">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-2 font-bold">
              Deployment Package:
            </span>
            <div className="flex flex-wrap gap-2">
              {currentProject.deliverables?.slice(0, 3).map((item, i) => (
                <span
                  key={i}
                  className="rounded-xl bg-neutral-100 border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-neutral-800"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
