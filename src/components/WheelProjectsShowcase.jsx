import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { siteContent } from "../data/siteContent";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export function WheelProjectsShowcase({ onViewAllProjects }) {
  const projects = siteContent.clients;
  const [activeIndex, setActiveIndex] = useState(0);
  const total = projects.length;

  const mountRef = useRef(null);
  const gearMeshRef = useRef(null);
  const targetRotationZ = useRef(0);
  const currentRotationZ = useRef(0);

  // Setup 3D Cine-Lens Gear Wheel in Three.js (Facing front directly inside the circular gauge)
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 280;
    const height = mount.clientHeight || 140;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(0, 3, 3);
    scene.add(directionalLight);

    const redLight = new THREE.DirectionalLight(0xdc2626, 2.0);
    redLight.position.set(0, -2, 2);
    scene.add(redLight);

    // Build Circular Focus Wheel Mesh
    const gearGroup = new THREE.Group();

    // Outer Gear Rim
    const outerTorusGeo = new THREE.TorusGeometry(1.6, 0.14, 16, 64);
    const outerTorusMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      metalness: 0.85,
      roughness: 0.2,
    });
    const outerTorus = new THREE.Mesh(outerTorusGeo, outerTorusMat);
    gearGroup.add(outerTorus);

    // Inner Red Aperture Accent Ring
    const innerTorusGeo = new THREE.TorusGeometry(1.35, 0.06, 16, 64);
    const innerTorusMat = new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      metalness: 0.6,
      roughness: 0.25,
    });
    const innerTorus = new THREE.Mesh(innerTorusGeo, innerTorusMat);
    gearGroup.add(innerTorus);

    // Central Precision Hub
    const hubGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.12, 32);
    hubGeo.rotateX(Math.PI / 2);
    const hubMat = new THREE.MeshStandardMaterial({
      color: 0x27272a,
      metalness: 0.9,
      roughness: 0.2,
    });
    const hubMesh = new THREE.Mesh(hubGeo, hubMat);
    gearGroup.add(hubMesh);

    // Mechanical Teeth along outer perimeter
    const toothGeo = new THREE.BoxGeometry(0.12, 0.05, 0.12);
    const toothMat = new THREE.MeshStandardMaterial({
      color: 0xa1a1aa,
      metalness: 0.9,
      roughness: 0.15,
    });

    const numTeeth = 32;
    for (let i = 0; i < numTeeth; i++) {
      const angle = (i / numTeeth) * Math.PI * 2;
      const tooth = new THREE.Mesh(toothGeo, toothMat);
      tooth.position.x = Math.sin(angle) * 1.68;
      tooth.position.y = Math.cos(angle) * 1.68;
      tooth.rotation.z = -angle;
      gearGroup.add(tooth);
    }

    scene.add(gearGroup);
    gearMeshRef.current = gearGroup;

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      currentRotationZ.current += (targetRotationZ.current - currentRotationZ.current) * 0.1;
      if (gearMeshRef.current) {
        gearMeshRef.current.rotation.z = currentRotationZ.current;
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
    targetRotationZ.current = -(wrapped / total) * Math.PI * 2;
  };

  const handleNext = () => selectProject(activeIndex + 1);
  const handlePrev = () => selectProject(activeIndex - 1);

  const currentProject = projects[activeIndex];

  return (
    <section 
      id="clients" 
      className="relative w-full py-16 lg:py-20 bg-white overflow-hidden flex flex-col justify-between selection:bg-black selection:text-white"
    >
      {/* Top Header */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold">
              [CINEMA DIAL // 0{activeIndex + 1} OF 0{total}]
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
            className="h-11 w-11 rounded-full border border-neutral-300 hover:border-black hover:bg-black hover:text-white transition-colors flex items-center justify-center cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Project"
            className="h-11 w-11 rounded-full border border-neutral-300 hover:border-black hover:bg-black hover:text-white transition-colors flex items-center justify-center cursor-pointer"
          >
            <ChevronRight className="h-5 w-5" />
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

      {/* Main Showcase Body (Media & Dossier Details) */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 my-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: Active Project Media Showcase */}
        <div className="lg:col-span-7 relative group">
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200">
            <img
              src={currentProject.coverImage}
              alt={currentProject.name}
              key={currentProject.id}
              className="h-full w-full object-cover transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

            {/* Top Badges */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2">
              <span className="rounded-full bg-white px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-black">
                {currentProject.category}
              </span>
              <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-mono uppercase tracking-wider text-white border border-white/20">
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
                  className="rounded-xl bg-neutral-100 border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-neutral-800"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3 text-xs font-mono text-neutral-500">
            <span>Select any project below or use next/prev arrows</span>
          </div>
        </div>

      </div>

      {/* CLEAN HALF-CIRCLE DIAL BAR WITH 3D WHEEL & SELECTOR CHIPS */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 pt-4 pb-2">
        <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-4 border-b border-neutral-100 pb-2">
          <span>‹ CALIBRATED PROJECT APERTURE DIAL ›</span>
          <span className="text-red-600 font-bold font-mono">0{activeIndex + 1} // {projects[activeIndex].name.toUpperCase()}</span>
        </div>

        {/* Dial & Project Selector Strip */}
        <div className="relative w-full rounded-2xl bg-neutral-50 border border-neutral-200/80 p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: 3D Procedural Lens Gear Stage */}
          <div className="flex items-center gap-4">
            <div 
              ref={mountRef} 
              className="w-28 h-28 rounded-2xl bg-white border border-neutral-200 flex-shrink-0 flex items-center justify-center shadow-sm overflow-hidden" 
            />
            <div>
              <span className="text-[10px] font-mono text-red-600 uppercase font-bold block mb-1">
                CINEMA RIG ANGLE
              </span>
              <p className="text-sm font-bold text-neutral-900">
                {currentProject.name}
              </p>
              <span className="text-xs text-neutral-500 font-mono">
                {currentProject.category} &bull; {currentProject.scale}
              </span>
            </div>
          </div>

          {/* Right: Clean Interactive Project Selection Pills */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2.5 max-w-2xl">
            {projects.map((proj, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={proj.id}
                  onClick={() => selectProject(idx)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    isActive
                      ? "bg-black text-white"
                      : "bg-white text-neutral-700 hover:bg-neutral-200 border border-neutral-200"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-red-500" : "bg-neutral-300"}`} />
                  <span>{proj.name}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${isActive ? "bg-white/20 text-white" : "text-neutral-400"}`}>
                    0{idx + 1}
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

    </section>
  );
}
