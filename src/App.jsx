import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HeroVideo } from "./components/HeroVideo";
import { FannedCardsShowcase } from "./components/FannedCardsShowcase";
import { Manifesto } from "./components/Manifesto";
import { ThreeColumnFeature } from "./components/ThreeColumnFeature";
import { Ticker } from "./components/Ticker";
import { ServicesAccordion } from "./components/ServicesAccordion";
import { StudioShowcase } from "./components/StudioShowcase";
import { WheelProjectsShowcase } from "./components/WheelProjectsShowcase";
import { PinterestGallery } from "./components/PinterestGallery";
import { LocationMap } from "./components/LocationMap";
import { Footer } from "./components/Footer";
import { QuoteModal } from "./components/QuoteModal";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { ArrowLeft } from "lucide-react";

export default function App() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState(
    window.location.hash === "#/gallery" ? "gallery" : "home"
  );

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#/gallery") {
        setCurrentRoute("gallery");
        window.scrollTo(0, 0);
      } else {
        setCurrentRoute("home");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigateToGallery = () => {
    window.location.hash = "#/gallery";
    setCurrentRoute("gallery");
    window.scrollTo(0, 0);
  };

  const navigateToHome = () => {
    window.location.hash = "";
    setCurrentRoute("home");
    window.scrollTo(0, 0);
  };

  const handleOpenQuote = () => {
    setQuoteModalOpen(true);
  };

  // Dedicated /gallery full page view
  if (currentRoute === "gallery") {
    return (
      <div className="min-h-screen w-full bg-white text-black selection:bg-black selection:text-white">
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-neutral-200 px-6 sm:px-12 py-4 flex items-center justify-between">
          <button
            onClick={navigateToHome}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-800 hover:text-black bg-neutral-100 hover:bg-neutral-200 px-4 py-2 rounded-full transition-all cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </button>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-red-600">
              [PAREKH ARCHIVE // PINTEREST CURATION]
            </span>
            <button
              onClick={handleOpenQuote}
              className="text-xs font-bold uppercase tracking-widest text-white bg-black rounded-full px-5 py-2 hover:bg-neutral-800 transition-all cursor-pointer"
            >
              Get A Quote
            </button>
          </div>
        </header>

        <main className="w-full">
          <PinterestGallery />
        </main>

        <Footer onQuoteClick={handleOpenQuote} />
        <WhatsAppButton />
        <QuoteModal open={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
      </div>
    );
  }

  // Primary Homepage View
  return (
    <div className="min-h-screen w-full bg-white text-black selection:bg-black selection:text-white overflow-x-hidden">
      <Navbar 
        onContactClick={handleOpenQuote} 
        onGalleryClick={navigateToGallery}
      />
      <main className="w-full">
        {/* Hero Cinema Stream */}
        <HeroVideo />

        {/* 3-Card Fanned Scroll Showcase placed directly between Hero Video and Manifesto */}
        <FannedCardsShowcase />

        {/* Brand Manifesto */}
        <Manifesto />

        {/* 3-Column Editorial Feature with pure white background */}
        <ThreeColumnFeature />

        {/* Smooth 55s Marquee Ticker */}
        <Ticker />

        {/* Services Accordion */}
        <ServicesAccordion />

        {/* Production Studio & Gear Rigging */}
        <StudioShowcase />

        {/* Interactive Rotating Half-Dial Focus Wheel Projects Section */}
        <WheelProjectsShowcase onViewAllProjects={navigateToGallery} />


        {/* Draggable & Zoomable Operational Hubs World Map */}
        <LocationMap />
      </main>

      <Footer onQuoteClick={handleOpenQuote} onGalleryClick={navigateToGallery} />
      
      {/* Dedicated Floating Official WhatsApp Button with Pulse Ring */}
      <WhatsAppButton />

      {/* Interactive Get A Quote Modal */}
      <QuoteModal open={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
    </div>
  );
}
