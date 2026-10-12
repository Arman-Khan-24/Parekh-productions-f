import { useState, useMemo } from "react";
import { Search, ChevronRight, X, ExternalLink, Sparkles } from "lucide-react";

export function ServicesAccordion({ onOpenQuote }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  // Exact 5 core pillars tailored in masculine, high-contrast Red & Black cinematic tones
  const servicesList = [
    {
      id: "events",
      tag: "EVENTS",
      accentBg: "hover:bg-red-50/40",
      activeBg: "bg-neutral-50 border-neutral-900",
      dotColor: "bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.5)]",
      badgeBg: "bg-red-50 text-red-700 border-red-200/80",
      arrowStyle: "bg-neutral-100 text-neutral-800 group-hover:bg-red-600 group-hover:text-white",
      arrowActive: "bg-red-600 text-white rotate-90 shadow-md",
      title: "Corporate Events & Management",
      shortDesc: "End-to-end corporate event planning, staging & concert-grade technical setups",
      items: [
        "Stage & set production (German hangars, box trusses & luxury podiums)",
        "Sound & technical production (L-Acoustics & JBL VTX line-array systems)",
        "Lighting & intelligent AV (Novastar P2.6/P2.9 curved LED walls & moving heads)",
        "Logistics & hospitality management (artist concierge & V-VIP escorts)",
        "Entertainment & artist management (Bollywood performers & celebrity emcees)",
        "Employee engagement events & custom brand activations",
        "Corporate gifting & customized delegate merchandise",
        "Dealer & distributor meets with keynote teleprompting",
      ],
      types: [
        "Product launches",
        "Brand activations",
        "Exhibitions & expos",
        "Award functions",
        "Annual meetings & AGMs",
        "Conferences & seminars",
        "Corporate celebrations",
      ],
    },
    {
      id: "media",
      tag: "MEDIA SPECIALIST",
      accentBg: "hover:bg-red-50/40",
      activeBg: "bg-neutral-50 border-neutral-900",
      dotColor: "bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.5)]",
      badgeBg: "bg-red-50 text-red-700 border-red-200/80",
      arrowStyle: "bg-neutral-100 text-neutral-800 group-hover:bg-red-600 group-hover:text-white",
      arrowActive: "bg-red-600 text-white rotate-90 shadow-md",
      title: "Media Specialist (Photo & Video)",
      shortDesc: "4K/8K HDR photography, multicam cinema line feeds, live same-night edits & drones",
      items: [
        "Event photography (VIP portraits, keynote stage captures & expo floor stills)",
        "Event videography (Sony Cinema Line FX6/FX3 & RED multicam cinema)",
        "Live same-night highlight edits & instant PR distribution reels",
        "Commercial & corporate campus office shoots",
        "Pre-production & creative visual directing",
        "Post-production & DaVinci Resolve studio color grading",
        "DGCA-licensed 4K aerial drone cinematography",
      ],
    },
    {
      id: "films",
      tag: "FILMS / WEBSERIES",
      accentBg: "hover:bg-red-50/40",
      activeBg: "bg-neutral-50 border-neutral-900",
      dotColor: "bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.5)]",
      badgeBg: "bg-neutral-100 text-neutral-800 border-neutral-200",
      arrowStyle: "bg-neutral-100 text-neutral-800 group-hover:bg-red-600 group-hover:text-white",
      arrowActive: "bg-red-600 text-white rotate-90 shadow-md",
      title: "Films & Webseries Production",
      shortDesc: "Script-to-screen episodic cinema, soundstages, casting & narrative directing",
      items: [
        "Scriptwriting, concept drafting & storyboard animatics",
        "Casting pipelines & bespoke period production set design",
        "High-end cinema camera packages (ARRI / RED / Sony Venice with anamorphic glass)",
        "Principal photography, lighting gaffers & grip crew execution",
        "Sound design, Foley & 5.1/7.1 theatrical surround mastering",
        "Complete post-production, visual effects (VFX) & conforming",
      ],
    },
    {
      id: "ad_films",
      tag: "AD FILMS",
      accentBg: "hover:bg-red-50/40",
      activeBg: "bg-neutral-50 border-neutral-900",
      dotColor: "bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.5)]",
      badgeBg: "bg-red-50 text-red-700 border-red-200/80",
      arrowStyle: "bg-neutral-100 text-neutral-800 group-hover:bg-red-600 group-hover:text-white",
      arrowActive: "bg-red-600 text-white rotate-90 shadow-md",
      title: "Ad Films & Commercial TVCs",
      shortDesc: "High-converting TV commercials, vertical digital video campaigns & brand ambassador shoots",
      items: [
        "Commercial TVCs (15s, 30s & 60s broadcast specifications)",
        "Digital video ads & social media reels (optimized 9:16 vertical & 16:9)",
        "Tabletop food, culinary styling & luxury product macro capture",
        "Celebrity shoot coordination & omnichannel campaign packages",
        "Motorized turntable motion control & high-speed slow motion",
      ],
    },
    {
      id: "weddings",
      tag: "WEDDING PLANNER",
      accentBg: "hover:bg-red-50/40",
      activeBg: "bg-neutral-50 border-neutral-900",
      dotColor: "bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.5)]",
      badgeBg: "bg-neutral-100 text-neutral-800 border-neutral-200",
      arrowStyle: "bg-neutral-100 text-neutral-800 group-hover:bg-red-600 group-hover:text-white",
      arrowActive: "bg-red-600 text-white rotate-90 shadow-md",
      title: "Wedding Planning & Management",
      shortDesc: "Royal destination celebrations, architectural floral mandaps & cinema by Heavenly Weds",
      isWeddingPortal: true,
      items: [
        "Venue & vendor management (Udaipur palaces, Goa beaches, Jaipur & UK estates)",
        "Guest management & 24/7 dedicated airport VIP logistics",
        "Wedding decor, styling & architectural floral mandap designs",
        "Entertainment curation (Sufi nights, Bollywood headliners & celebrity DJs)",
        "Bespoke culinary catering & royal banquet hospitality",
        "Heirloom wedding cinematography & same-day reception edits by Heavenly Weds",
      ],
    },
  ];

  // Scoped in-section search
  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return servicesList;
    const q = searchQuery.toLowerCase().trim();
    return servicesList.filter((s) => {
      const matchTitle = s.title.toLowerCase().includes(q);
      const matchShort = s.shortDesc.toLowerCase().includes(q);
      const matchTag = s.tag.toLowerCase().includes(q);
      const matchItems = s.items.some((it) => it.toLowerCase().includes(q));
      const matchTypes = s.types?.some((ty) => ty.toLowerCase().includes(q));
      return matchTitle || matchShort || matchTag || matchItems || matchTypes;
    });
  }, [searchQuery, servicesList]);

  const toggle = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="capabilities" className="py-20 sm:py-28 px-4 sm:px-8 max-w-3xl mx-auto scroll-mt-24">
      {/* Title: Elegant Bright Scarlet-to-Soft Faint Graphite Gradient */}
      <div className="text-center mb-8">
        <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight font-display bg-gradient-to-r from-[#ff2a2a] via-[#e11d48] to-neutral-400/80 bg-clip-text text-transparent">
          Our Services
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-neutral-400 font-medium tracking-wide">
          Production Divisions &amp; Technical Capabilities &middot; Mumbai &amp; London
        </p>
      </div>

      {/* Pill Search Bar in Sleek Matte Black with Pure Crimson Red Focus Ring */}
      <div className="relative mb-8">
        <div className="flex items-center w-full bg-neutral-950 text-white rounded-full pl-5 pr-2 py-2 shadow-lg border border-neutral-800 transition-all focus-within:border-red-600 focus-within:shadow-[0_0_20px_rgba(220,38,38,0.35)]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="What can we do for you? (Stage, Line-array, Drone, TVC...)"
            className="w-full bg-transparent text-sm sm:text-base font-medium text-white placeholder:text-neutral-400 focus:outline-none py-1.5"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery("")}
              className="text-neutral-400 hover:text-white p-2 cursor-pointer transition-colors"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          ) : (
            <div className="w-9 h-9 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center shrink-0 text-white shadow-md transition-colors">
              <Search className="h-4 w-4" />
            </div>
          )}
        </div>
      </div>

      {/* Minimalist List with Strong Contrast, Red Accents & Chevron Arrows */}
      <div className="divide-y divide-neutral-200 border-y border-neutral-200">
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-sm text-neutral-500">
            No service found matching &ldquo;{searchQuery}&rdquo;.
            <button
              onClick={() => setSearchQuery("")}
              className="block mx-auto mt-2 text-xs font-bold uppercase tracking-wider text-red-600 hover:underline cursor-pointer"
            >
              Clear search
            </button>
          </div>
        ) : (
          filtered.map((service) => {
            const isExpanded = expandedId === service.id;

            return (
              <div 
                key={service.id} 
                className={`transition-colors duration-200 ${
                  isExpanded ? service.activeBg : service.accentBg
                }`}
              >
                {/* Main clean clickable row */}
                <button
                  type="button"
                  onClick={() => toggle(service.id)}
                  className="w-full py-4 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer group px-2 sm:px-3 transition-all"
                >
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                    {/* Solid Cinematic Red Bullet Dot */}
                    <span 
                      className={`w-2.5 h-2.5 rounded-full shrink-0 transition-transform duration-300 ${service.dotColor} ${
                        isExpanded ? "scale-125" : "group-hover:scale-110"
                      }`} 
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-base sm:text-lg font-bold text-neutral-900 group-hover:text-black tracking-tight truncate">
                          {service.title}
                        </span>
                        <span className={`hidden sm:inline-block text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md border font-bold ${service.badgeBg}`}>
                          {service.tag}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Clean Chevron Arrow > that rotates & turns pure red */}
                  <div className="shrink-0 flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isExpanded
                          ? service.arrowActive
                          : service.arrowStyle
                      }`}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </button>

                {/* Smooth Expandable Drawer showing authentic services with clean crimson red bullet points */}
                {isExpanded && (
                  <div className="pl-7 sm:pl-9 pr-3 pb-6 pt-1 text-neutral-700 animate-fadeIn">
                    <p className="text-xs sm:text-sm text-neutral-600 mb-3.5 font-medium leading-relaxed">
                      {service.shortDesc}
                    </p>

                    {/* Bullet list of genuine services */}
                    <ul className="space-y-2 mb-5">
                      {service.items.map((item, idx) => (
                        <li key={idx} className="text-xs sm:text-sm flex items-start gap-2.5">
                          <span className="text-red-600 font-bold mt-0.5">&bull;</span>
                          <span className="text-neutral-900 leading-relaxed font-normal">{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Events category list if applicable */}
                    {service.types && (
                      <div className="mt-4 pt-3.5 border-t border-neutral-200">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                          Specialized Formats:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {service.types.map((type, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[11px] font-medium bg-white text-neutral-900 border border-neutral-200 px-3 py-1 rounded-full shadow-2xs"
                            >
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action trigger */}
                    <div className="mt-5 pt-3.5 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3">
                      {service.isWeddingPortal ? (
                        <a
                          href="https://heavenlyweds.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 uppercase tracking-wider no-underline"
                        >
                          <Sparkles className="h-3.5 w-3.5" />
                          <span>Explore Heavenly Weds Portal</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                          100% In-House Technical Fleet
                        </span>
                      )}

                      <button
                        onClick={onOpenQuote}
                        className="btn-satisfying-cta text-xs font-bold uppercase tracking-widest text-white bg-black hover:bg-red-600 rounded-full px-5 py-2 cursor-pointer transition-colors shadow-sm ml-auto"
                      >
                        Inquire Service &rarr;
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
