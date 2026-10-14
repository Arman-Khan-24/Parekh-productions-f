import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { StudioShowcase } from "../components/StudioShowcase";
import { QuoteModal } from "../components/QuoteModal";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Camera, 
  Film, 
  Calendar, 
  CheckCircle2, 
  ExternalLink,
  ArrowRight,
  Sparkles,
  Layers,
  Music,
  Video,
  Heart
} from "lucide-react";

export function ServicesPage({ onOpenQuote, onNavigate }) {
  const [quoteOpen, setQuoteOpen] = useState(false);

  const handleQuote = () => {
    if (onOpenQuote) onOpenQuote();
    else setQuoteOpen(true);
  };

  const detailedServices = [
    {
      id: "corporate-events",
      tag: "FLAGSHIP CAPABILITY",
      category: "CORPORATE PRODUCTION",
      title: "Corporate Event Management & Turnkey Staging",
      desc: "End-to-end execution of national conferences, shareholder meetings, annual general meetings (AGMs), award galas, and tech summits across Mumbai and Pan-India. We handle floor plan approvals, structural rigging, artist hospitality, and technical cue control.",
      highlights: [
        "Plenary stage architecture and custom speaker podium fabrication",
        "Seamless live multi-track presentation switching and cue automation",
        "VIP lounge design, brand step-and-repeat backdrops, and registration zoning",
        "Regular venue deployment: NESCO (Goregaon), Jio World Convention Centre (BKC), Taj Lands End"
      ],
      deliverables: "Turnkey Show Direction • Stage Crew • Safety Compliance & Licenses"
    },
    {
      id: "sound-av-staging",
      tag: "ACOUSTIC ENGINEERING",
      category: "TECHNICAL SOUND & AV",
      title: "Concert Sound Systems, Line-Arrays & Curved LED Displays",
      desc: "Concert-grade acoustics and high-definition visual engineering calibrated for crystal speech intelligibility and high-dynamic music impact. We deploy premium line-array speaker systems and high-refresh indoor/outdoor LED screens.",
      highlights: [
        "L-Acoustics & JBL VTX series line-array towers with digital signal processors",
        "Novastar P2.6 / P2.9 high-refresh curved and flat LED video walls with 4K scalers",
        "Intelligent moving heads, profile beam spots, architectural wash lighting, and DMX console programming",
        "Redundant digital audio networks (Dante) with wireless microphone RF frequency coordination"
      ],
      deliverables: "Acoustic Venue Calibration • Video Wall Processors • Audio Engineers"
    },
    {
      id: "wedding-films",
      tag: "LUXURY CELEBRATIONS",
      category: "WEDDINGS // HEAVENLY WEDS",
      title: "Luxury Wedding Cinematography & Candid Photography",
      desc: "Through our dedicated couture division, Heavenly Weds, we document royal destination weddings, multi-day celebrations, and heirloom bridal portraits with an emotional, director-led cinematic style.",
      highlights: [
        "Full-frame prime cinema packages (Sony FX6/FX3) with 10-bit 4:2:2 color profiles",
        "Candid bridal photojournalism capturing unposed, authentic emotional interactions",
        "Same-Day Edit (SDE) teaser films edited on-location and screened live at the reception gala",
        "Destination wedding coverage across Udaipur, Jaipur, Goa, Mumbai, and international venues"
      ],
      deliverables: "Feature-Length Celebration Film • 3-Min Cinematic Teaser • Curated Photo Album Box",
      link: "https://heavenlyweds.com"
    },
    {
      id: "pre-wedding-shoots",
      tag: "CONCEPT VISUALS",
      category: "PRE-WEDDING & PORTRAITURE",
      title: "Concept Pre-Wedding Films & Fashion Couple Shoots",
      desc: "Story-driven narrative films and magazine-grade couple sessions conceptualized with creative directors, moodboards, custom wardrobe styling, and drone cinematography.",
      highlights: [
        "Cinematic narrative scriptwriting highlighting the couple’s personal journey",
        "Licensed 4K drone aerial shots over dramatic landscapes and heritage properties",
        "Creative editorial lighting setups tailored for sunset golden-hour and nighttime glow aesthetics",
        "Multi-platform optimized social teasers and 9:16 vertical reels for Instagram"
      ],
      deliverables: "High-Resolution Color Graded Stills • 4K Narrative Couple Film • Social Cutdowns"
    },
    {
      id: "commercial-food",
      tag: "ADVERTISING & TVC",
      category: "COMMERCIAL MEDIA",
      title: "Commercial Food Styling, Product Stills & Brand TVCs",
      desc: "High-speed macro cinematography, commercial food tabletop styling, culinary photography, and advertising video campaigns tailored for F&B brands, FMCG conglomerates, and luxury hospitality.",
      highlights: [
        "Professional tabletop food styling with dedicated food stylists and props library",
        "High-frame-rate slow-motion captures (120fps/240fps) for sizzling textures and fluid pours",
        "Macro lenses for crisp culinary detail, artisan confectionery, and premium packaging",
        "Broadcast TVC production with complete color grading (DaVinci Resolve) and licensing"
      ],
      deliverables: "Print-Ready Raw/TIFF Assets • Broadcast 4K TVC Masters • Digital Campaign Formats"
    },
    {
      id: "trade-exhibitions",
      tag: "SPATIAL ARCHITECTURE",
      category: "EXHIBITIONS & PAVILIONS",
      title: "Exhibition Stall Fabrication & Custom Pavilion Staging",
      desc: "Bespoke booth design and rapid fabrication for domestic and international trade expos. We translate brand identity into architectural spaces featuring illuminated halo fascias, demo counters, and interactive touchscreen displays.",
      highlights: [
        "Custom wooden, metal, and tension-fabric modular booth fabrication",
        "Overhead trussing, branded hanging banners, and focused spotlighting",
        "Interactive display integrations, touch kiosks, and product display podiums",
        "Seamless overnight booth setup, exhibition management, and post-event dismantling"
      ],
      deliverables: "3D CAD Stall Renderings • Turnkey On-Site Fabrication • Electrical & Lighting Setup"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-white text-black selection:bg-black selection:text-white overflow-x-hidden">
      <Navbar onContactClick={handleQuote} onGalleryClick={() => onNavigate && onNavigate("/gallery")} />

      <main className="w-full pt-28 sm:pt-36">
        
        {/* Services Page Header */}
        <section className="px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto pb-10 border-b border-neutral-100">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold">
              [PAREKH PRODUCTIONS // COMPLETE CAPABILITIES DIRECTORY]
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-neutral-900 leading-[1.05] max-w-5xl">
            Event Management, Staging &amp; Media Production Services
          </h1>

          <p className="mt-4 text-base sm:text-lg text-neutral-600 max-w-3xl leading-relaxed">
            From concert-grade line-array sound and plenary LED stages at NESCO and Jio World Centre to royal wedding cinematography and broadcast commercial TVCs. All services backed by in-house equipment and experienced production directors.
          </p>
        </section>

        {/* Detailed Services Deep-Dive */}
        <section className="px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto py-12">
          <div className="space-y-12">
            {detailedServices.map((service, index) => (
              <div 
                key={service.id}
                id={service.id}
                className="p-6 sm:p-10 rounded-3xl bg-neutral-50/70 border border-neutral-200/80 hover:border-neutral-300 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-neutral-900 text-white">
                      0{index + 1}
                    </span>
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold">
                      {service.category}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-red-600 font-bold bg-red-50 px-3 py-1 rounded-full border border-red-100">
                    {service.tag}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-neutral-900 mb-4">
                  {service.title}
                </h2>

                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-4xl mb-6">
                  {service.desc}
                </p>

                {/* Key Deliverable Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 pt-6 border-t border-neutral-200/60">
                  {service.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700">
                      <CheckCircle2 className="h-4 w-4 text-neutral-900 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom Spec & CTA Bar */}
                <div className="pt-4 border-t border-neutral-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs font-mono text-neutral-500">
                    <strong className="text-neutral-800">Standard Deliverable: </strong>
                    {service.deliverables}
                  </div>

                  <div className="flex items-center gap-3">
                    {service.link && (
                      <a
                        href={service.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-neutral-800 hover:text-red-600 transition-colors inline-flex items-center gap-1"
                      >
                        <span>Visit HeavenlyWeds.com</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                    <button
                      onClick={handleQuote}
                      className="px-5 py-2 rounded-full bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Inquire Capability &rarr;
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Studio and Technical Gear Rigging Showcase */}
        <StudioShowcase />

        {/* Direct Quote Banner */}
        <section className="px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto my-12 p-8 sm:p-12 rounded-3xl bg-neutral-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-red-400 font-bold block mb-1">
              [DIRECT TECHNICAL ESTIMATES]
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
              Require Custom Technical Rider or Production Quote?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-xl">
              Our technical directors evaluate stage dimensions, acoustic specs, and cinema requirements within 2 hours.
            </p>
          </div>
          <button
            onClick={handleQuote}
            className="btn-satisfying-cta px-8 py-3.5 rounded-full bg-white text-black text-xs font-bold uppercase tracking-widest cursor-pointer whitespace-nowrap"
          >
            Request Rate Card &rarr;
          </button>
        </section>

      </main>

      <Footer onQuoteClick={handleQuote} onGalleryClick={() => onNavigate && onNavigate("/gallery")} />
      <WhatsAppButton />
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}
