import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
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
  Globe,
  Award,
  ShieldCheck,
  Clock
} from "lucide-react";

export function LondonLocationPage({ onOpenQuote, onNavigate }) {
  const [quoteOpen, setQuoteOpen] = useState(false);

  const handleQuote = () => {
    if (onOpenQuote) onOpenQuote();
    else setQuoteOpen(true);
  };

  const londonServices = [
    {
      title: "Bilateral Corporate Summits & Forums",
      desc: "Turnkey executive production connecting London and Indian enterprise headquarters. High-level panel staging, live streaming to global hubs, and multi-camera broadcast.",
      specs: "Central London Venues (ExCeL, Olympia, QEII Centre, Mayfair)"
    },
    {
      title: "Global Brand Activations & Luxury Showcases",
      desc: "Architectural lighting, premium LED walls, brand pavilions, and high-impact experiential environments crafted for European market launches.",
      specs: "Bespoke Fabrications & AV Engineering"
    },
    {
      title: "Executive Cinema & Commercial Videography",
      desc: "Director-led cinema units deploying Sony Cinema Line FX6/FX3 and ARRI packages for corporate documentaries, CEO keynotes, and commercial brand narratives.",
      specs: "Broadcast 4K / 8K Master Deliverables"
    },
    {
      title: "International Destination Wedding Cinematography",
      desc: "Through our dedicated label Heavenly Weds, capturing luxury UK-Indian destination celebrations across London estates, the English countryside, and Europe.",
      specs: "Sister Brand: HeavenlyWeds.com"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-white text-black selection:bg-black selection:text-white overflow-x-hidden">
      <Navbar onContactClick={handleQuote} onGalleryClick={() => onNavigate && onNavigate("/gallery")} />

      <main className="w-full pt-28 sm:pt-36">
        
        {/* UK Hero Section */}
        <section className="px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto pb-16 border-b border-neutral-100">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-neutral-800">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              <span>United Kingdom · London Executive Division</span>
            </span>
            <span className="text-xs text-neutral-400 font-medium">
              UK Incorporated · Harish Parekh Direction
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-neutral-900 leading-[1.05] max-w-5xl">
            Event Production &amp; Corporate Cinematography in London
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-neutral-600 max-w-3xl leading-relaxed">
            Parekh Productions delivers premium corporate event production, bilateral summits, stage audio-visual engineering, and broadcast cinema film coverage for enterprises across London and the UK.
          </p>

          {/* Quick Stats Grid */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-neutral-100">
            <div>
              <span className="block text-2xl sm:text-3xl font-black text-neutral-900">London</span>
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Liaison Office</span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-black text-neutral-900">+44</span>
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">UK Direct Hotline</span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-black text-neutral-900">100%</span>
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Turnkey Production</span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-black text-neutral-900">4K/8K</span>
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Cinema Standard</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={handleQuote}
              className="btn-satisfying-cta px-8 py-3.5 rounded-full bg-black text-white text-xs font-bold uppercase tracking-widest cursor-pointer shadow-sm"
            >
              Inquire UK Production &rarr;
            </button>
            <a
              href="mailto:parekhhevents@gmail.com"
              className="px-6 py-3.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 no-underline"
            >
              <Mail className="h-4 w-4 text-red-600" />
              <span>Email parekhhevents@gmail.com</span>
            </a>
            <a
              href="/"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate("/");
                }
              }}
              className="px-6 py-3.5 rounded-full bg-white hover:bg-neutral-100 text-neutral-700 text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 border border-neutral-200 no-underline"
            >
              <Globe className="h-4 w-4 text-red-600" />
              <span>Switch to Mumbai (India) Base</span>
            </a>
          </div>
        </section>

        {/* UK Core Capabilities */}
        <section className="px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto py-20">
          <div className="mb-12">
            <span className="text-xs uppercase tracking-wider text-red-600 font-bold block mb-2">
              UK Production Capabilities · Direct Deployment
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-neutral-900">
              Corporate Staging &amp; Media Services in the UK
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-600 max-w-2xl">
              Engineered for seamless cross-border execution. Whether hosting an Indo-UK bilateral conference or a brand gala in Mayfair, our technical crew ensures flawless execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {londonServices.map((service, idx) => (
              <div 
                key={idx}
                className="p-8 rounded-3xl bg-neutral-50/70 border border-neutral-200 flex flex-col justify-between hover:border-neutral-300 transition-colors"
              >
                <div>
                  <span className="text-xs text-red-600 font-bold uppercase tracking-wider block mb-2">
                    0{idx + 1} · UK Service
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-neutral-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                    {service.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-neutral-200/60 flex items-center justify-between text-xs text-neutral-500 font-medium">
                  <span>{service.specs}</span>
                  <ArrowRight className="h-4 w-4 text-neutral-400" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* London Office & Contact Information */}
        <section className="px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto py-16 bg-neutral-900 text-white rounded-3xl mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-wider text-red-400 font-bold block">
                UK Liaison &amp; Client Services
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                Connect with our London Executive Team
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl">
                Planning an executive conference, global summit, or commercial shoot in the UK? Our European production desk operates on GMT hours to support fast turnarounds and direct venue site surveys.
              </p>

              <div className="space-y-3 pt-2 text-sm text-neutral-300 font-sans">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Serviced Region:</strong>
                    <span>London &amp; Greater London (UK &amp; European Event Deliveries)</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Central Hotlines:</strong>
                    <div className="space-x-2">
                      <a href="tel:+918657754937" className="text-white hover:text-red-400 transition-colors">+91 86577 54937</a>
                      <span>&bull;</span>
                      <a href="tel:+919594888516" className="text-white hover:text-red-400 transition-colors">+91 95948 88516</a>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Inquiries Email:</strong>
                    <a href="mailto:parekhhevents@gmail.com" className="text-white hover:text-red-400 transition-colors">parekhhevents@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-neutral-800/80 p-8 rounded-2xl border border-neutral-700 space-y-5">
              <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                Request UK Event Proposal
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Receive our comprehensive UK production portfolio and venue rate card within 24 hours.
              </p>
              <button
                onClick={handleQuote}
                className="btn-satisfying-cta w-full py-3.5 rounded-full bg-white text-black text-xs font-bold uppercase tracking-widest cursor-pointer text-center"
              >
                Launch UK Brief &rarr;
              </button>
              <div className="text-[11px] font-mono text-neutral-400 text-center">
                Operating across London &bull; Birmingham &bull; Manchester &bull; Europe
              </div>
            </div>

          </div>
        </section>

      </main>

      <Footer onQuoteClick={handleQuote} onGalleryClick={() => onNavigate && onNavigate("/gallery")} />
      <WhatsAppButton />
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}
