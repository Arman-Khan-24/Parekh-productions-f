import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ServicesAccordion } from "../components/ServicesAccordion";
import { StudioShowcase } from "../components/StudioShowcase";
import { QuoteModal } from "../components/QuoteModal";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { ArrowRight, CheckCircle2, Star, Sparkles } from "lucide-react";

export function ServicesPage({ onOpenQuote, onNavigate }) {
  const [quoteOpen, setQuoteOpen] = useState(false);

  const handleQuote = () => {
    if (onOpenQuote) onOpenQuote();
    else setQuoteOpen(true);
  };

  return (
    <div className="min-h-screen w-full bg-white text-black selection:bg-black selection:text-white overflow-x-hidden">
      <Navbar onContactClick={handleQuote} onGalleryClick={() => onNavigate && onNavigate("/gallery")} />

      <main className="w-full pt-28 sm:pt-36">
        
        {/* Services Page Header */}
        <section className="px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto pb-12 border-b border-neutral-100">
          <p className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-neutral-400 mb-3">
            COMPLETE CAPABILITIES &middot; TECHNICAL DIRECTORY
          </p>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-neutral-900 leading-[1.05] max-w-5xl">
            Event Management, Staging &amp; Media Production Services
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-neutral-600 max-w-3xl leading-relaxed">
            From plenary LED stages and concert-grade line-array sound at NESCO and Jio World Centre to commercial food styling and broadcast 4K multicam cinema.
          </p>
        </section>

        {/* Services Detailed Accordion */}
        <ServicesAccordion onOpenQuote={handleQuote} />

        {/* Studio and Technical Gear Rigging */}
        <StudioShowcase />

        {/* Direct Quote Banner */}
        <section className="px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto my-16 p-10 rounded-3xl bg-neutral-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
              Require Custom Technical Rider or Production Quote?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2">
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
