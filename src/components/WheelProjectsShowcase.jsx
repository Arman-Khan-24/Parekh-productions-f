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

  // Initialize True 3D Half-Wheel Model with Three.js on the left curved rim
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

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xdc2626, 2.5);
    rimLight.position.set(-5, 0, 3);
    scene.add(rimLight);

    // Main 3D Wheel Group (Pivot placed towards the left so half of the wheel is visible)
    const wheel = new THREE.Group();
    wheel.position.set(-2.8, 0, 0); // Position hub on the left, rim arc sweeps across the viewport

    // 1. Heavy Cine Anodized Aluminum Outer Ring
    const outerRingGeo = new THREE.TorusGeometry(3.6, 0.22, 24, 80);
    const outerRingMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      metalness: 0.9,
      roughness: 0.2,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    wheel.add(outerRing);

    // 2. High-Precision Red Calibrated Aperture Accent Ring
    const innerRingGeo = new THREE.TorusGeometry(3.2, 0.08, 16, 80);
    const innerRingMat = new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      metalness: 0.6,
      roughness: 0.25,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    wheel.add(innerRing);

    // 3. Central Mechanical Hub / Core
    const hubGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.35, 36);
    hubGeo.rotateX(Math.PI / 2);
    const hubMat = new THREE.MeshStandardMaterial({
      color: 0x27272a,
      metalness: 0.85,
      roughness: 0.25,
    });
    const hub = new THREE.Mesh(hubGeo, hubMat);
    wheel.add(hub);

    // 4. Heavy-Duty Mechanical Spokes radiating to the rim
    for (let i = 0; i < 8; i++) {
      const spokeAngle = (i / 8) * Math.PI * 2;
      const spokeGeo = new THREE.BoxGeometry(0.12, 2.3, 0.12);
      const spokeMat = new THREE.MeshStandardMaterial({
        color: 0x3f3f46,
        metalness: 0.85,
        roughness: 0.3,
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
      color: 0x71717a,
      metalness: 0.9,
      roughness: 0.2,
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
    if (Math.abs(deltaY) > 40) {
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
      className="relative w-full min-h-[95vh] py-16 lg:py-20 bg-white overflow-hidden flex flex-col justify-between selection:bg-black selection:text-white"
    >
      {/* Top Header */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold">
              [INTERACTIVE HALF-WHEEL CINEMA DIAL]
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

      {/* Main Split Showcase: Real 3D Half-Wheel Arc on Left + Project Details on Right */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 my-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Real 3D Half-Wheel Model with Arc Thumbnails (Reference 5 Style) */}
        <div 
          className="lg:col-span-6 relative h-[420px] sm:h-[520px] rounded-3xl bg-neutral-950 overflow-hidden flex items-center select-none cursor-grab active:cursor-grabbing border border-neutral-900"
          onMouseDown={onPointerDown}
          onMouseMove={onPointerMove}
          onMouseUp={onPointerUp}
          onTouchStart={onPointerDown}
          onTouchMove={onPointerMove}
          onTouchEnd={onPointerUp}
        >
          {/* 3D WebGL Canvas Rendering Real Rotating Half-Wheel */}
          <div ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 opacity-80" />

          {/* Calibrated Hub Meta */}
          <div className="absolute top-4 left-6 z-10 text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
            3D MECHANICAL FOCUS RIG // DRAG VERTICAL
          </div>

          {/* Curved Project Cards Anchored to the Wheel Arc (Reference Image 5 Alignment) */}
          <div className="absolute inset-y-0 right-4 sm:right-6 w-52 sm:w-64 flex flex-col justify-center space-y-3 z-10">
            {projects.map((proj, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={proj.id}
                  onClick={() => selectProject(idx)}
                  className={`w-full text-left p-3 rounded-2xl transition-colors cursor-pointer border ${
                    isActive
                      ? "bg-white text-black border-red-600 shadow-xl"
                      : "bg-neutral-900/80 text-neutral-400 hover:text-white hover:bg-neutral-800 border-neutral-800"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-red-500">
                      0{idx + 1} // {proj.category}
                    </span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
                    )}
                  </div>
                  <h4 className="text-xs sm:text-sm font-black uppercase tracking-tight truncate">
                    {proj.name}
                  </h4>
                </button>
              );
            })}
          </div>

          {/* Active Dial Indicator Needle */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none z-20 flex items-center">
            <div className="w-4 h-4 bg-red-600 rotate-45 transform translate-x-2" />
          </div>
        </div>

        {/* Right Column: Active Project Video & Specifications */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-5">
          {/* Media Player Container */}
          <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200">
            <img
              src={currentProject.coverImage}
              alt={currentProject.name}
              key={currentProject.id}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="rounded-full bg-white px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-black">
                {currentProject.category}
              </span>
              <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-mono uppercase tracking-wider text-white border border-white/20">
                {currentProject.scale}
              </span>
            </div>

            {/* Project Details */}
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <p className="text-xs font-mono uppercase tracking-widest text-red-400 font-bold mb-1">
                LOCATION // {currentProject.location}
              </p>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-tight">
                {currentProject.name}
              </h3>
            </div>
          </div>

          {/* Narrative Specs */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold">
              [DELIVERED BRIEF]
            </span>
            <p className="text-base text-neutral-800 font-medium leading-relaxed">
              {currentProject.tagline}
            </p>
          </div>

          <p className="text-sm text-neutral-600 leading-relaxed">
            {currentProject.description}
          </p>

          {/* Deliverables */}
          <div className="pt-2">
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
