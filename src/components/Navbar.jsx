import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar({ onContactClick }) {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/75 backdrop-blur-2xl shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
      <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between px-6 sm:px-12 py-5">
        
        {/* Brand */}
        <a href="#hero" className="flex items-center gap-3 no-underline group">
          <img
            src="/assets/parekh/parekh-productions-logo-cropped.png"
            alt="Parekh Productions"
            className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="text-sm sm:text-base font-black tracking-wider text-black uppercase font-display hidden xs:inline">
            PAREKH PRODUCTIONS
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest uppercase text-neutral-600">
          <a href="#about" className="hover:text-black transition-colors no-underline">About</a>
          <a href="#services" className="hover:text-black transition-colors no-underline">Services</a>
          <a href="#clients" className="hover:text-black transition-colors no-underline">Clients</a>
          <a href="#showcase" className="hover:text-black transition-colors no-underline">Work</a>
          <a href="#map" className="hover:text-black transition-colors no-underline">Locations</a>
          <a href="#contact" className="hover:text-black transition-colors no-underline">Contact</a>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center">
          <button
            onClick={onContactClick}
            className="text-xs font-bold uppercase tracking-widest text-white bg-black rounded-full px-6 py-2.5 hover:bg-neutral-800 transition-all cursor-pointer shadow-md active:scale-95"
          >
            Get In Touch
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="md:hidden text-black p-2 rounded-full bg-black/5 backdrop-blur-md"
          aria-label="Toggle menu"
        >
          {mobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenu && (
        <div className="md:hidden fixed inset-0 top-[72px] bg-white/95 backdrop-blur-3xl px-8 py-10 flex flex-col justify-between text-base font-bold uppercase tracking-widest z-50">
          <div className="flex flex-col gap-6">
            <a href="#about" onClick={() => setMobileMenu(false)} className="text-neutral-700 hover:text-black">About</a>
            <a href="#services" onClick={() => setMobileMenu(false)} className="text-neutral-700 hover:text-black">Services</a>
            <a href="#clients" onClick={() => setMobileMenu(false)} className="text-neutral-700 hover:text-black">Clients</a>
            <a href="#showcase" onClick={() => setMobileMenu(false)} className="text-neutral-700 hover:text-black">Work</a>
            <a href="#map" onClick={() => setMobileMenu(false)} className="text-neutral-700 hover:text-black">Locations</a>
            <a href="#contact" onClick={() => setMobileMenu(false)} className="text-neutral-700 hover:text-black">Contact</a>
          </div>

          <button
            onClick={() => {
              setMobileMenu(false);
              onContactClick();
            }}
            className="w-full text-center py-4 bg-black text-white rounded-full font-bold uppercase tracking-wider text-sm shadow-xl"
          >
            Get In Touch
          </button>
        </div>
      )}
    </header>
  );
}
