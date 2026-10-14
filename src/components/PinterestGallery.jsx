import { useState } from "react";
import { Sparkles, ArrowLeft } from "lucide-react";

const galleryCategories = [
  "All",
  "Events & Stage",
  "Exhibitions",
  "Commercial Production",
  "Sports & Impact",
];

// Rich catalog with all available high quality videos and imagery from the assets repository
const galleryItems = [
  {
    id: 1,
    title: "Finbridge Expo Mumbai 2026 Main Stage",
    category: "Events & Stage",
    type: "video",
    mediaUrl: "/assets/parekh/finbridge-2026-max-quality.mp4",
    poster: "/assets/parekh/portfolio/finbridge-stage.jpg",
    aspect: "aspect-[16/10]",
    tag: "LIVE BROADCAST",
    desc: "Plenary stage engineering featuring ground-stacked curved LED walls, intelligent moving head illumination, and multicam switching at NESCO Exhibition Centre.",
    venue: "NESCO, Goregaon",
  },
  {
    id: 2,
    title: "Auto Expo Dynamic Arena Staging",
    category: "Events & Stage",
    type: "video",
    mediaUrl: "/assets/parekh/autoexpo-max-quality.mp4",
    poster: "/assets/parekh/client_media/stage-lighting.jpg",
    aspect: "aspect-[4/3]",
    tag: "AV ENGINEERING",
    desc: "High-output concert audio systems, heavy aluminum box trussing, and dynamic automotive lighting for nationwide pavilion launch.",
    venue: "Auto Expo Pavilion",
  },
  {
    id: 3,
    title: "Parekh Cinema Signature Showreel",
    category: "Commercial Production",
    type: "video",
    mediaUrl: "/assets/parekh/hero-showreel-mumbai.mp4",
    poster: "/assets/parekh/portfolio/biryani-commercial.jpg",
    aspect: "aspect-[4/5]",
    tag: "SIGNATURE REEL",
    desc: "Compilation of director-led corporate brand documentaries, 4K commercial TVCs, and high-energy aftermovies shot across India.",
    venue: "Mumbai & Pan-India",
  },
  {
    id: 4,
    title: "NESCO Exhibition Ground Production",
    category: "Exhibitions",
    type: "image",
    mediaUrl: "/assets/parekh/portfolio/finbridge-crowd.jpg",
    aspect: "aspect-[16/11]",
    tag: "TRADE EXPO",
    desc: "Turnkey trade expo crowd flow management, exhibition hall sound distribution, and high-visibility digital signage rigging.",
    venue: "Hall 4, NESCO Mumbai",
  },
  {
    id: 5,
    title: "Screentex International Trade Expo Pavilions",
    category: "Exhibitions",
    type: "image",
    mediaUrl: "/assets/parekh/client_media/screentex-expo.jpg",
    aspect: "aspect-[16/10]",
    tag: "BOOTH STAGING",
    desc: "Custom modular exhibition stall fabrication with halo-lit fascias, product display counters, and VIP conference lounges.",
    venue: "Trade Expo Centre",
  },
  {
    id: 6,
    title: "Biryani Of India Hero Food Commercial",
    category: "Commercial Production",
    type: "image",
    mediaUrl: "/assets/parekh/client_media/commercial-food-1.jpg",
    aspect: "aspect-[3/4]",
    tag: "STUDIO MACRO",
    desc: "Studio culinary styling, macro aperture captures, and high-speed lighting capturing artisan food textures for national FMCG ad campaign.",
    venue: "Parekh In-House Studio",
  },
  {
    id: 7,
    title: "RCB Himalaya Grand Press Conference",
    category: "Events & Stage",
    type: "image",
    mediaUrl: "/assets/parekh/client_media/rcb-himalaya-press.jpg",
    aspect: "aspect-[16/10]",
    tag: "PRESS CORRIDOR",
    desc: "Broadcast media risers, multi-mic press distribution boxes, brand step-and-repeat backdrops, and high-CRI white stage lighting.",
    venue: "Luxury Hotel Ballroom, Mumbai",
  },
  {
    id: 8,
    title: "Concern India Sports Day Action Stills",
    category: "Sports & Impact",
    type: "image",
    mediaUrl: "/assets/parekh/client_media/sports-action-1.jpg",
    aspect: "aspect-[4/5]",
    tag: "ACTION SHUTTER",
    desc: "High-speed sports action photojournalism with telephoto lenses capturing dynamic motion, athlete emotion, and track highlights.",
    venue: "Stadium Complex, Mumbai",
  },
  {
    id: 9,
    title: "State Auditorium Keynote Lighting",
    category: "Events & Stage",
    type: "image",
    mediaUrl: "/assets/parekh/client_media/auditorium.jpg",
    aspect: "aspect-[16/10]",
    tag: "KEYNOTE HALL",
    desc: "Acoustic stage treatment, line-array front-fill calibration, and theater profile spots for 2,500-seat plenary leadership session.",
    venue: "State Convention Hall",
  },
  {
    id: 10,
    title: "Corporate Leadership Summit",
    category: "Events & Stage",
    type: "image",
    mediaUrl: "/assets/parekh/client_media/conference-hall.jpg",
    aspect: "aspect-[16/11]",
    tag: "LEADERSHIP FORUM",
    desc: "Executive conference setup with seamless ultra-wide projection, stage furniture, wireless presenter clickers, and live transcription.",
    venue: "BKC Executive Centre",
  },
  {
    id: 11,
    title: "Culinary Macro Food Styling Stills",
    category: "Commercial Production",
    type: "image",
    mediaUrl: "/assets/parekh/client_media/commercial-food-2.jpg",
    aspect: "aspect-[4/3]",
    tag: "COMMERCIAL FOOD",
    desc: "Artisan menu photography, beverage splash capture, and controlled studio illumination for premium restaurant hospitality clients.",
    venue: "Studio Culinary Kitchen",
  },
  {
    id: 12,
    title: "Annual Sports Sprint Coverage",
    category: "Sports & Impact",
    type: "image",
    mediaUrl: "/assets/parekh/client_media/sports-action-2.jpg",
    aspect: "aspect-[3/4]",
    tag: "DYNAMIC MOTION",
    desc: "Multi-photographer trackside sports documentation, real-time photo tagging, and same-day press delivery for athletic associations.",
    venue: "Athletics Arena",
  },
];

export function PinterestGallery({ onBackHome }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems =
    selectedCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <section className="py-16 sm:py-24 px-6 sm:px-12 lg:px-16 w-full max-w-[1600px] mx-auto bg-white min-h-screen">
      
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="h-2 w-2 rounded-full bg-red-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">
              Parekh Visual Archive · Autoplay Showcase
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-neutral-900 leading-tight">
            Production Reel &amp; <br />
            Visual Catalog
          </h1>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 max-w-2xl">
            Uninterrupted live visual archive. All cinematography streams play in continuous loop without intrusive popups or playback interruptions.
          </p>
        </div>

        {/* Sister Brand Callout inside Gallery */}
        <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 max-w-sm">
          <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold block mb-1">
            Luxury Weddings Division
          </span>
          <p className="text-xs text-neutral-700">
            Looking for luxury bridal cinematography? Visit our dedicated label:{" "}
            <a
              href="https://heavenlyweds.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-red-600 hover:text-black underline transition-colors"
            >
              HeavenlyWeds.com &rarr;
            </a>
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

      {/* Responsive Pinterest-Style Masonry Columns (NO MODALS, AUTOPLAYING VIDEOS IN LOOP) */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="break-inside-avoid group relative rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200/70 transition-all duration-500 hover:shadow-xl"
          >
            {item.type === "video" ? (
              /* Autoplay in loop at mute with NO popup or controls */
              <div className={`relative w-full ${item.aspect} overflow-hidden bg-black`}>
                <video
                  src={item.mediaUrl}
                  poster={item.poster}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
                
                {/* Live Stream Tag */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono font-bold text-white border border-white/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                  <span>AUTOPLAY REEL</span>
                </div>
              </div>
            ) : (
              <div className={`relative w-full ${item.aspect} overflow-hidden bg-neutral-100`}>
                <img
                  src={item.mediaUrl}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
              </div>
            )}

            {/* In-Card Metadata */}
            <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold block">
                  [{item.tag}]
                </span>
                {item.venue && (
                  <span className="text-[9px] font-mono text-neutral-300 uppercase tracking-wider bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded">
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
        ))}
      </div>

    </section>
  );
}
