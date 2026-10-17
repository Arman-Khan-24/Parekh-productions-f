import { useState, useEffect } from "react";
import { Sparkles, ArrowLeft, X, ChevronLeft, ChevronRight, Eye } from "lucide-react";

const galleryCategories = [
  "All",
  "Events & Stage",
  "Exhibitions",
  "Commercial Production",
  "Sports & Impact",
];

// Rich catalog with all unique images and videos across local & drive archives (zero duplicates)
const galleryItems = [
  {
    id: 1,
    title: "Finbridge Expo Mumbai 2026 Main Stage",
    category: "Events & Stage",
    aspect: "aspect-[16/10]",
    tag: "LIVE BROADCAST",
    desc: "Plenary stage engineering featuring ground-stacked curved LED walls, intelligent moving head illumination, and multicam switching at NESCO Exhibition Centre.",
    venue: "NESCO, Goregaon",
    slides: [
      { type: "video", src: "/assets/parekh/finbridge-2026-max-quality.mp4", poster: "/assets/parekh/portfolio/finbridge-stage.jpg", caption: "Official Mumbai Plenary Broadcast" },
      { type: "image", src: "/assets/drive_slides/finbridge-2.jpg", caption: "Indiabulls Securities Showcase Pavilion" },
      { type: "image", src: "/assets/drive_slides/finbridge-3.jpg", caption: "NESCO Exhibition Ground Floor Architecture" },
      { type: "image", src: "/assets/parekh/portfolio/finbridge-stage.jpg", caption: "Keynote Audio & Lighting Rigging" },
    ],
  },
  {
    id: 3,
    title: "Parekh Cinema Signature Showreel",
    category: "Commercial Production",
    aspect: "aspect-[4/5]",
    tag: "SIGNATURE REEL",
    desc: "Compilation of director-led corporate brand documentaries, 4K commercial TVCs, and high-energy aftermovies shot across India.",
    venue: "Mumbai & Pan-India",
    slides: [
      { type: "video", src: "/assets/parekh/hero-showreel-mumbai.mp4", poster: "/assets/parekh/client_media/commercial-food-1.jpg", caption: "Signature Showreel Cinematic Cut" },
      { type: "video", src: "/assets/parekh/hero-showreel.mp4", poster: "/assets/parekh/client_media/conference-hall.jpg", caption: "Nationwide Commercial Production Reel" },
    ],
  },
  {
    id: 4,
    title: "NESCO Exhibition Ground Production",
    category: "Exhibitions",
    aspect: "aspect-[16/11]",
    tag: "TRADE EXPO",
    desc: "Turnkey trade expo crowd flow management, exhibition hall sound distribution, and high-visibility digital signage rigging.",
    venue: "Hall 4, NESCO Mumbai",
    slides: [
      { type: "image", src: "/assets/parekh/portfolio/finbridge-crowd.jpg", caption: "NESCO Exhibition Hall 4 Crowd Flow" },
      { type: "image", src: "/assets/parekh/portfolio/expo-mumbai-2026.jpg", caption: "Trade Visitors & Commercial Corridor" },
      { type: "image", src: "/assets/parekh/client_media/expo-booth.jpg", caption: "Exhibition Pavilions & Booth Display" },
    ],
  },
  {
    id: 5,
    title: "Screentex International Trade Expo Pavilions",
    category: "Exhibitions",
    aspect: "aspect-[16/10]",
    tag: "BOOTH STAGING",
    desc: "Custom modular exhibition stall fabrication with halo-lit fascias, product display counters, and VIP conference lounges.",
    venue: "Trade Expo Centre",
    slides: [
      { type: "image", src: "/assets/drive_slides/screentex-2.jpg", caption: "Artline Modular Pavilion Booth Architecture" },
      { type: "image", src: "/assets/drive_slides/screentex-3.jpg", caption: "B2B Exhibition Visitor Showcase & Lighting" },
      { type: "image", src: "/assets/parekh/client_media/screentex-expo.jpg", caption: "Heavy Machinery Demonstration Stage" },
    ],
  },
  {
    id: 6,
    title: "Biryani Of India Hero Food Commercial",
    category: "Commercial Production",
    aspect: "aspect-[3/4]",
    tag: "STUDIO MACRO",
    desc: "Studio culinary styling, macro aperture captures, and high-speed lighting capturing artisan food textures for national FMCG ad campaign.",
    venue: "Parekh In-House Studio",
    slides: [
      { type: "image", src: "/assets/drive_slides/biryani-2.jpg", caption: "Artisan Biryani Pot & Culinary Setup" },
      { type: "image", src: "/assets/drive_slides/biryani-3.jpg", caption: "Curry, Sauces & Side Delicacies" },
      { type: "image", src: "/assets/parekh/client_media/commercial-food-1.jpg", caption: "High-Speed Studio Flare & Texture" },
      { type: "image", src: "/assets/parekh/portfolio/commercial-styling.jpg", caption: "Billboard Campaign Raw Master Asset" },
    ],
  },
  {
    id: 7,
    title: "RCB Himalaya Grand Press Conference",
    category: "Events & Stage",
    aspect: "aspect-[16/10]",
    tag: "PRESS CORRIDOR",
    desc: "Broadcast media risers, multi-mic press distribution boxes, brand step-and-repeat backdrops, and high-CRI white stage lighting.",
    venue: "Luxury Hotel Ballroom, Mumbai",
    slides: [
      { type: "image", src: "/assets/drive_slides/zeiss-2.jpg", caption: "Press Media Conference Stage Setup" },
      { type: "image", src: "/assets/drive_slides/zeiss-3.jpg", caption: "VIP Athlete & Ambassador Keynote Podium" },
      { type: "image", src: "/assets/parekh/client_media/rcb-himalaya-press.jpg", caption: "RCB Himalaya Brand Ambassador Press Room" },
    ],
  },
  {
    id: 8,
    title: "Concern India Sports Day Action Stills",
    category: "Sports & Impact",
    aspect: "aspect-[4/5]",
    tag: "ACTION SHUTTER",
    desc: "High-speed sports action photojournalism with telephoto lenses capturing dynamic motion, athlete emotion, and track highlights.",
    venue: "Stadium Complex, Mumbai",
    slides: [
      { type: "image", src: "/assets/drive_slides/concern-fresh-slide2.jpg", caption: "Differently-Abled Sports Day Ceremony & Honors" },
      { type: "image", src: "/assets/drive_slides/concern-fresh-slide3.jpg", caption: "Track & Field Sprint Highlights" },
      { type: "image", src: "/assets/parekh/client_media/sports-action-1.jpg", caption: "Annual Sports Day Participant Cheers" },
      { type: "image", src: "/assets/parekh/portfolio/sports-event.jpg", caption: "Stadium Trackside Field Coverage" },
    ],
  },
  {
    id: 9,
    title: "State Auditorium Keynote Lighting",
    category: "Events & Stage",
    aspect: "aspect-[16/10]",
    tag: "KEYNOTE HALL",
    desc: "Acoustic stage treatment, line-array front-fill calibration, and theater profile spots for 2,500-seat plenary leadership session.",
    venue: "State Convention Hall",
    slides: [
      { type: "image", src: "/assets/parekh/client_media/auditorium.jpg", caption: "State Convention Hall Acoustic Staging" },
    ],
  },
  {
    id: 10,
    title: "Corporate Leadership Summit",
    category: "Events & Stage",
    aspect: "aspect-[16/11]",
    tag: "LEADERSHIP FORUM",
    desc: "Executive conference setup with seamless ultra-wide projection, stage furniture, wireless presenter clickers, and live transcription.",
    venue: "BKC Executive Centre",
    slides: [
      { type: "image", src: "/assets/parekh/client_media/conference-hall.jpg", caption: "BKC Executive Centre Conference Setup" },
      { type: "image", src: "/assets/parekh/client_media/summit-speaker.jpg", caption: "Executive Plenary Podium & VIP Keynote" },
    ],
  },
  {
    id: 11,
    title: "Culinary Macro Food Styling Stills",
    category: "Commercial Production",
    aspect: "aspect-[4/3]",
    tag: "COMMERCIAL FOOD",
    desc: "Artisan menu photography, beverage splash capture, and controlled studio illumination for premium restaurant hospitality clients.",
    venue: "Studio Culinary Kitchen",
    slides: [
      { type: "image", src: "/assets/parekh/client_media/commercial-food-2.jpg", caption: "Sizzling Kebab Platter & Delicacies" },
      { type: "image", src: "/assets/parekh/client_media/commercial-product.jpg", caption: "Controlled Studio Splash & Beverage Macro" },
    ],
  },
  {
    id: 12,
    title: "Annual Sports Sprint Coverage",
    category: "Sports & Impact",
    aspect: "aspect-[3/4]",
    tag: "DYNAMIC MOTION",
    desc: "Multi-photographer trackside sports documentation, real-time photo tagging, and same-day press delivery for athletic associations.",
    venue: "Athletics Arena",
    slides: [
      { type: "image", src: "/assets/parekh/client_media/sports-action-2.jpg", caption: "Trackside Sports Awardees & Champions" },
      { type: "image", src: "/assets/drive_slides/concern-india-2.jpg", caption: "Podium Honours & Press Photo" },
      { type: "image", src: "/assets/drive_slides/concern-india-3.jpg", caption: "Athlete Motion & Sprint Coverage" },
    ],
  },
];

export function PinterestGallery({ onBackHome }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [modalSlideIndex, setModalSlideIndex] = useState(0);

  // Close modal with ESC key or Arrow navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveModalItem(null);
      } else if (e.key === "ArrowLeft") {
        handleModalSlidePrev();
      } else if (e.key === "ArrowRight") {
        handleModalSlideNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalItem, modalSlideIndex]);

  const openModal = (item) => {
    setActiveModalItem(item);
    setModalSlideIndex(0);
  };

  const closeModal = () => {
    setActiveModalItem(null);
    setModalSlideIndex(0);
  };

  const handleModalSlidePrev = () => {
    if (!activeModalItem?.slides?.length) return;
    setModalSlideIndex((prev) =>
      prev > 0 ? prev - 1 : activeModalItem.slides.length - 1
    );
  };

  const handleModalSlideNext = () => {
    if (!activeModalItem?.slides?.length) return;
    setModalSlideIndex((prev) =>
      prev < activeModalItem.slides.length - 1 ? prev + 1 : 0
    );
  };

  const filteredItems =
    selectedCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <section className="py-16 sm:py-24 px-6 sm:px-12 lg:px-16 w-full max-w-[1600px] mx-auto bg-white min-h-screen">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-neutral-200">
        <button
          onClick={onBackHome}
          className="group flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-black transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </button>
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">
          Curated Gallery &middot; {filteredItems.length} Productions
        </span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-red-600 mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive Media Catalog</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-neutral-900 leading-none">
            Production Archives
          </h1>
          <p className="mt-4 text-base text-neutral-600 max-w-2xl leading-relaxed">
            Explore uncompressed video aftermovies, stage fabrication records, and corporate media captures. Click any card to expand into the 3D showcase view with complete photo &amp; video slides.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-12 border-b border-neutral-200/70 pb-6">
        {galleryCategories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                isActive
                  ? "bg-black text-white shadow-md"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-black border border-neutral-200/50"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Responsive Pinterest-Style Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {filteredItems.map((item) => {
          const primarySlide = item.slides[0];
          return (
            <div
              key={item.id}
              onClick={() => openModal(item)}
              className="break-inside-avoid group relative rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-200/70 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1.5 cursor-pointer"
            >
              {primarySlide.type === "video" ? (
                <div className={`relative w-full ${item.aspect} overflow-hidden bg-black`}>
                  <video
                    src={primarySlide.src}
                    poster={primarySlide.poster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                  
                  {/* Video Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono font-bold text-white border border-white/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                    <span>AUTOPLAY REEL</span>
                  </div>
                </div>
              ) : (
                <div className={`relative w-full ${item.aspect} overflow-hidden bg-neutral-900`}>
                  <img
                    src={primarySlide.src}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                </div>
              )}

              {/* Slide Count Indicator Badge */}
              {item.slides.length > 1 && (
                <div className="absolute top-3 right-3 z-10 rounded-full bg-black/65 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono font-bold text-white border border-white/20 flex items-center gap-1">
                  <span>{item.slides.length} SLIDES</span>
                </div>
              )}

              {/* Hover 3D Popover Hint Overlay */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none z-10">
                <div className="px-4 py-2 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-2xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Eye className="h-3.5 w-3.5 text-red-600" />
                  <span>Expand 3D Showcase</span>
                </div>
              </div>

              {/* In-Card Metadata */}
              <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none z-10">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold block">
                    [{item.tag}]
                  </span>
                  {item.venue && (
                    <span className="text-[9px] font-mono text-neutral-300 uppercase tracking-wider bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded">
                      {item.venue}
                    </span>
                  )}
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white leading-snug drop-shadow-md">
                  {item.title}
                </h3>
                {item.desc && (
                  <p className="mt-1 text-[11px] text-neutral-300 line-clamp-2 leading-relaxed drop-shadow">
                    {item.desc}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Luxury Cinematic Popover Modal (Monochrome Theme + Fully Responsive) */}
      {activeModalItem && (
        <div 
          className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/80 backdrop-blur-sm animate-modal-backdrop"
          onClick={closeModal}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            aria-label="Close Preview"
            className="absolute top-3 right-3 sm:top-5 sm:right-5 z-[160] h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-neutral-900/90 hover:bg-white text-white hover:text-black border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xl hover:scale-105 active:scale-95"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Modal Container: Max 92vh, scrollable on mobile, luxury clean white container */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-[24px] sm:rounded-[36px] bg-white p-4 sm:p-6 lg:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.5)] border border-neutral-200/80 animate-popover-zoom"
          >
            {/* Responsive Compound Split System */}
            <div className="relative w-full flex flex-col lg:flex-row items-stretch justify-center gap-5 lg:gap-6">
              
              {/* Media Card (Smooth Slider with Video / Image support) */}
              <div className="relative z-20 w-full lg:w-[48%] min-h-[260px] xs:min-h-[320px] sm:min-h-[380px] lg:min-h-[460px] aspect-[4/3] xs:aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] rounded-[20px] sm:rounded-[28px] overflow-hidden bg-black shadow-lg border border-neutral-200 group/slider select-none">
                {/* Horizontal Sliding Track */}
                <div
                  className="flex h-full w-full will-change-transform"
                  style={{
                    transform: `translate3d(-${modalSlideIndex * 100}%, 0, 0)`,
                    transition: "transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  {activeModalItem.slides.map((slide, sIdx) => {
                    const isCurrent = sIdx === modalSlideIndex;
                    return (
                      <div
                        key={sIdx}
                        className="relative h-full w-full flex-shrink-0 overflow-hidden bg-black flex items-center justify-center"
                      >
                        {slide.type === "video" ? (
                          <video
                            key={`modal-vid-${activeModalItem.id}-${sIdx}-${isCurrent}`}
                            ref={(el) => {
                              if (el && isCurrent) {
                                el.currentTime = 0;
                                const playPromise = el.play();
                                if (playPromise !== undefined) {
                                  playPromise.catch(() => {
                                    el.muted = true;
                                    el.play().catch(() => {});
                                  });
                                }
                              }
                            }}
                            src={slide.src}
                            poster={slide.poster}
                            autoPlay
                            loop
                            playsInline
                            controls
                            className="h-full w-full object-cover relative z-10"
                          />
                        ) : (
                          <img
                            src={slide.src}
                            alt={slide.caption || activeModalItem.title}
                            className="h-full w-full object-cover transition-all"
                            style={{
                              transform: isCurrent ? "scale(1)" : "scale(1.05)",
                              transition: "transform 500ms cubic-bezier(0.16, 1, 0.3, 1), opacity 400ms ease",
                              opacity: isCurrent ? 1 : 0.6,
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Left / Right Slider Arrows */}
                {activeModalItem.slides.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handleModalSlidePrev}
                      aria-label="Previous Slide"
                      className="absolute left-2.5 sm:left-3.5 top-1/2 -translate-y-1/2 z-30 h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-black/60 hover:bg-black text-white border border-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                    >
                      <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleModalSlideNext}
                      aria-label="Next Slide"
                      className="absolute right-2.5 sm:right-3.5 top-1/2 -translate-y-1/2 z-30 h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-black/60 hover:bg-black text-white border border-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                    >
                      <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </>
                )}

                {/* Top Badge & Slide Count */}
                <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between z-30 pointer-events-none">
                  <span className="rounded-full bg-red-600 px-3 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white shadow-md">
                    {activeModalItem.category}
                  </span>
                  {activeModalItem.slides.length > 1 && (
                    <span className="rounded-full bg-black/75 backdrop-blur-md px-2.5 py-1 text-[10px] sm:text-[11px] font-mono font-bold text-white border border-white/20">
                      {modalSlideIndex + 1} / {activeModalItem.slides.length}
                    </span>
                  )}
                </div>

                {/* Slide Dots Indicator */}
                {activeModalItem.slides.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-30 bg-black/70 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10 pointer-events-auto">
                    {activeModalItem.slides.map((_, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => setModalSlideIndex(sIdx)}
                        aria-label={`Slide ${sIdx + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          sIdx === modalSlideIndex
                            ? "w-5 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"
                            : "w-1.5 bg-white/60 hover:bg-white"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Information Panel: Pure Dark Luxe (Theme-Aligned with Zero Slate-Blue) */}
              <div className="relative z-10 w-full lg:w-[52%] bg-neutral-950 text-white rounded-[20px] sm:rounded-[28px] p-5 sm:p-7 lg:p-9 shadow-lg border border-neutral-800 flex flex-col justify-between">
                <div>
                  {/* Category Accent Subheading with Red Indicator */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">
                      {activeModalItem.tag} &middot; {activeModalItem.venue}
                    </span>
                  </div>

                  {/* Main Event Title */}
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight text-white leading-snug mb-3 sm:mb-4">
                    {activeModalItem.title}
                  </h2>

                  {/* Narrative Body Copy */}
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal mb-4">
                    {activeModalItem.desc}
                  </p>

                  {/* Active Slide Caption Highlight */}
                  {activeModalItem.slides[modalSlideIndex]?.caption && (
                    <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 mb-4 sm:mb-6">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-red-400 font-bold">
                          Active Slide Asset {modalSlideIndex + 1}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-400 uppercase">
                          {activeModalItem.slides[modalSlideIndex].type}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-200 font-medium">
                        {activeModalItem.slides[modalSlideIndex].caption}
                      </p>
                    </div>
                  )}
                </div>

                {/* Bottom Action Footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10 mt-2">
                  <div className="flex items-center gap-2 text-[11px] text-neutral-400 font-mono">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span>{activeModalItem.slides.length} Production Assets</span>
                  </div>

                  <button
                    onClick={closeModal}
                    className="px-5 sm:px-6 py-2.5 rounded-full bg-white hover:bg-neutral-200 text-black text-xs font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer shadow-sm active:scale-95"
                  >
                    Close Showcase
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
}
