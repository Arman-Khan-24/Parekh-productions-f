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
import { Destinations } from "./components/Destinations";
import { Footer } from "./components/Footer";
import { QuoteModal } from "./components/QuoteModal";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { LondonLocationPage } from "./pages/LondonLocationPage";
import { ServicesPage } from "./pages/ServicesPage";
import { ArrowLeft } from "lucide-react";

export default function App({ initialPath }) {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  // Normalize initial route from window pathname or hash or initialPath prop
  const getInitialRoute = () => {
    if (initialPath) return initialPath;
    if (typeof window === "undefined") return "/";
    const path = window.location.pathname.toLowerCase().replace(/\/$/, "");
    const hash = window.location.hash.toLowerCase();
    
    if (path === "/london" || path === "/uk" || hash === "#/london" || hash === "#/uk") {
      return "/london";
    }
    if (path === "/services" || hash === "#/services") {
      return "/services";
    }
    if (path === "/gallery" || hash === "#/gallery") {
      return "/gallery";
    }
    return "/";
  };

  const [currentRoute, setCurrentRoute] = useState(getInitialRoute);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase().replace(/\/$/, "");
      const hash = window.location.hash.toLowerCase();
      
      if (path === "/london" || path === "/uk" || hash === "#/london" || hash === "#/uk") {
        setCurrentRoute("/london");
      } else if (path === "/services" || hash === "#/services") {
        setCurrentRoute("/services");
      } else if (path === "/gallery" || hash === "#/gallery") {
        setCurrentRoute("/gallery");
      } else {
        setCurrentRoute("/");
      }
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("hashchange", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("hashchange", handlePopState);
    };
  }, []);

  const navigateTo = (route) => {
    if (typeof window !== "undefined") {
      try {
        window.history.pushState({}, "", route);
      } catch (e) {
        window.location.href = route;
        return;
      }
      window.scrollTo(0, 0);
    }
    setCurrentRoute(route);
  };

  const handleOpenQuote = () => {
    setQuoteModalOpen(true);
  };

  // Route: /london (UK Location Page)
  if (currentRoute === "/london") {
    return (
      <LondonLocationPage
        onOpenQuote={handleOpenQuote}
        onNavigate={navigateTo}
      />
    );
  }

  // Route: /services (Complete Services Directory)
  if (currentRoute === "/services") {
    return (
      <ServicesPage
        onOpenQuote={handleOpenQuote}
        onNavigate={navigateTo}
      />
    );
  }

  // Route: /gallery (Dedicated Autoplay In-Feed Visual Archive)
  if (currentRoute === "/gallery") {
    return (
      <div className="min-h-screen w-full bg-white text-black selection:bg-black selection:text-white">
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-neutral-200 px-4 sm:px-12 py-3 sm:py-4 flex items-center justify-between">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigateTo("/");
            }}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-800 hover:text-black bg-neutral-100 hover:bg-neutral-200 px-3.5 py-2 rounded-full transition-colors cursor-pointer shrink-0 no-underline"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </a>
          
          <div className="hidden xs:flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-neutral-500">
            <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
            <span className="truncate">Production Visual Archive</span>
          </div>

          <button
            onClick={handleOpenQuote}
            className="btn-satisfying-cta text-xs font-bold uppercase tracking-widest text-white bg-black rounded-full px-4 sm:px-6 py-2 cursor-pointer shrink-0"
          >
            Get A Quote
          </button>
        </header>

        <main className="w-full">
          <PinterestGallery onBackHome={() => navigateTo("/")} />
        </main>

        <Footer onQuoteClick={handleOpenQuote} onGalleryClick={() => navigateTo("/gallery")} />
        <WhatsAppButton />
        <QuoteModal open={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
      </div>
    );
  }

  // Route: / or /mumbai (India Primary Homepage)
  return (
    <div className="min-h-screen w-full bg-white text-black selection:bg-black selection:text-white overflow-x-hidden">
      <Navbar 
        onContactClick={handleOpenQuote} 
        onGalleryClick={() => navigateTo("/gallery")}
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
        <ServicesAccordion onOpenQuote={handleOpenQuote} />

        {/* Production Studio & Gear Rigging */}
        <StudioShowcase />

        {/* Interactive Rotating Half-Dial Focus Wheel Projects Section */}
        <WheelProjectsShowcase onViewAllProjects={() => navigateTo("/gallery")} />

        {/* Dynamic Leaflet 2D World Map & Operational Hubs */}
        <Destinations onContactClick={handleOpenQuote} />
      </main>

      <Footer onQuoteClick={handleOpenQuote} onGalleryClick={() => navigateTo("/gallery")} />
      
      {/* Dedicated Floating Official WhatsApp Button */}
      <WhatsAppButton />

      {/* Interactive Get A Quote Modal */}
      <QuoteModal open={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
    </div>
  );
}
