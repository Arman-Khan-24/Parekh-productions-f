import { useState } from "react";
import { Menu, X, ArrowRight, ExternalLink, Globe } from "lucide-react";

export function Navbar({ onContactClick, onGalleryClick }) {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-[0_2px_20px_rgba(0,0,0,0.04)] border-b border-neutral-100">
      <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between px-6 sm:px-12 py-4 sm:py-5">
        
        {/* Brand */}
        <a href="/" className="flex items-center gap-3 no-underline group">
          <img
            src="/assets/parekh/parekh-productions-logo-cropped.png"
            alt="Parekh Productions"
            className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-black tracking-wider text-black uppercase font-display hidden xs:inline leading-none">
              PAREKH PRODUCTIONS
            </span>
            <span className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase hidden xs:inline mt-0.5">
              MUMBAI &bull; LONDON
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold tracking-widest uppercase text-neutral-600">
          <a href="/#about" className="hover:text-black transition-colors no-underline">About</a>
          <a href="/services" className="hover:text-black transition-colors no-underline">Services</a>
          <a href="/#clients" className="hover:text-black transition-colors no-underline">Clients</a>
          <a href="/#showcase" className="hover:text-black transition-colors no-underline">Work</a>
          <a 
            href="/gallery" 
            onClick={(e) => {
              if (onGalleryClick) {
                e.preventDefault();
                onGalleryClick();
              }
            }} 
            className="hover:text-black transition-colors no-underline font-extrabold text-neutral-900"
          >
            Gallery
          </a>
          
          {/* Location Split Links */}
          <a href="/#map" className="hover:text-black transition-colors no-underline">Mumbai</a>
          <a 
            href="/london" 
            className="hover:text-blue-600 transition-colors no-underline flex items-center gap-1 font-bold text-neutral-700"
          >
            <span>London</span>
            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-neutral-100 text-neutral-600 border border-neutral-200">UK</span>
          </a>

          <a href="/#contact" className="hover:text-black transition-colors no-underline">Contact</a>
        </nav>

        {/* Main CTA Button: Get A Quote */}
        <div className="hidden md:flex items-center">
          <button
            onClick={onContactClick}
            className="btn-satisfying-cta text-xs font-bold uppercase tracking-widest text-white bg-black rounded-full px-6 py-2.5 cursor-pointer flex items-center gap-2"
          >
            <span>Get A Quote</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="md:hidden relative flex items-center justify-center h-10 w-10 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-900 shadow-sm transition-colors active:scale-95 cursor-pointer z-50"
          aria-label="Toggle mobile navigation menu"
        >
          {mobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenu && (
        <div className="md:hidden fixed inset-0 top-[68px] bg-white text-black px-7 py-8 flex flex-col justify-between text-base font-bold uppercase tracking-widest z-[9999] shadow-2xl overflow-y-auto border-t border-neutral-200">
          <div className="flex flex-col gap-3">
            <a href="/#about" onClick={() => setMobileMenu(false)} className="text-neutral-800 hover:text-black py-2 border-b border-neutral-100">About</a>
            <a href="/services" onClick={() => setMobileMenu(false)} className="text-neutral-800 hover:text-black py-2 border-b border-neutral-100">Services Directory</a>
            <a href="/#clients" onClick={() => setMobileMenu(false)} className="text-neutral-800 hover:text-black py-2 border-b border-neutral-100">Clients</a>
            <a href="/#showcase" onClick={() => setMobileMenu(false)} className="text-neutral-800 hover:text-black py-2 border-b border-neutral-100">Work</a>
            <a 
              href="/gallery" 
              onClick={() => {
                setMobileMenu(false);
                if (onGalleryClick) onGalleryClick();
              }} 
              className="text-red-600 font-extrabold flex items-center justify-between py-2 border-b border-neutral-100"
            >
              <span>Gallery Catalog</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-50 text-red-600">NEW</span>
            </a>
            
            {/* Dedicated Location Routes in Mobile Menu */}
            <div className="py-2 border-b border-neutral-100 flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400">REGIONS:</span>
              <div className="flex items-center gap-2">
                <a href="/" onClick={() => setMobileMenu(false)} className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-xs font-bold">Mumbai (IN)</a>
                <a href="/london" onClick={() => setMobileMenu(false)} className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">London (UK)</a>
              </div>
            </div>

            <a href="/#contact" onClick={() => setMobileMenu(false)} className="text-neutral-800 hover:text-black py-2 border-b border-neutral-100">Contact</a>
            
            {/* Sister Brand Callout */}
            <div className="mt-2 p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200">
              <span className="text-[10px] font-mono text-neutral-400 block mb-1">SISTER BRAND:</span>
              <a 
                href="https://heavenlyweds.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-bold text-neutral-900 flex items-center justify-between normal-case tracking-normal"
              >
                <span>Luxury Wedding Cinematography</span>
                <ExternalLink className="h-3.5 w-3.5 text-red-600" />
              </a>
            </div>
          </div>

          <div className="pt-4 pb-4">
            <button
              onClick={() => {
                setMobileMenu(false);
                onContactClick();
              }}
              className="btn-satisfying-cta w-full text-center py-3.5 rounded-full bg-black text-white text-xs font-bold uppercase tracking-widest cursor-pointer shadow-md"
            >
              Get A Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
