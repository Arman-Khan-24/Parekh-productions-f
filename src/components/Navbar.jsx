import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar({ onContactClick }) {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-2xl">
      <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between px-6 sm:px-12 py-5">
        
        {/* Brand */}
        <a href="#hero" className="flex items-center gap-3 no-underline group">
          <img
            src="/assets/parekh/parekh-productions-logo-cropped.png"
            alt="Parekh Productions"
            className="h-8 sm:h-9 w-auto object-contain brightness-0 invert transition-transform duration-300 group-hover:scale-105"
          />
          <span className="text-sm sm:text-base font-black tracking-wider text-white uppercase font-display hidden xs:inline">
            PAREKH PRODUCTIONS
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest uppercase text-white/70">
          <a href="#about" className="hover:text-white transition-colors no-underline">About</a>
          <a href="#services" className="hover:text-white transition-colors no-underline">Services</a>
          <a href="#clients" className="hover:text-white transition-colors no-underline">Clients</a>
          <a href="#showcase" className="hover:text-white transition-colors no-underline">Work</a>
          <a href="#map" className="hover:text-white transition-colors no-underline">Locations</a>
          <a href="#contact" className="hover:text-white transition-colors no-underline">Contact</a>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center">
          <button
            onClick={onContactClick}
            className="text-xs font-bold uppercase tracking-widest text-black bg-white rounded-full px-6 py-2.5 hover:bg-neutral-200 transition-all cursor-pointer shadow-lg active:scale-95"
          >
            Get In Touch
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="md:hidden text-white p-2 rounded-full bg-white/10 backdrop-blur-md"
          aria-label="Toggle menu"
        >
          {mobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenu && (
        <div className="md:hidden fixed inset-0 top-[72px] bg-black/95 backdrop-blur-3xl px-8 py-10 flex flex-col justify-between text-base font-bold uppercase tracking-widest z-50">
          <div className="flex flex-col gap-6">
            <a href="#about" onClick={() => setMobileMenu(false)} className="text-white/80 hover:text-white">About</a>
            <a href="#services" onClick={() => setMobileMenu(false)} className="text-white/80 hover:text-white">Services</a>
            <a href="#clients" onClick={() => setMobileMenu(false)} className="text-white/80 hover:text-white">Clients</a>
            <a href="#showcase" onClick={() => setMobileMenu(false)} className="text-white/80 hover:text-white">Work</a>
            <a href="#map" onClick={() => setMobileMenu(false)} className="text-white/80 hover:text-white">Locations</a>
            <a href="#contact" onClick={() => setMobileMenu(false)} className="text-white/80 hover:text-white">Contact</a>
          </div>

          <button
            onClick={() => {
              setMobileMenu(false);
              onContactClick();
            }}
            className="w-full text-center py-4 bg-white text-black rounded-full font-bold uppercase tracking-wider text-sm shadow-xl"
          >
            Get In Touch
          </button>
        </div>
      )}
    </header>
  );
}
