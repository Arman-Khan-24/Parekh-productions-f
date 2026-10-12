import { ArrowUpRight, MessageCircle, Mail, MapPin, Phone, ExternalLink } from "lucide-react";
import { siteContent } from "../data/siteContent";

export function Footer({ onQuoteClick, onGalleryClick }) {
  const { socials } = siteContent;

  const getSocialIcon = (label) => {
    switch (label.toLowerCase()) {
      case "instagram":
        return (
          <svg className="h-4 w-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
          </svg>
        );
      case "facebook":
        return (
          <svg className="h-4 w-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
          </svg>
        );
      case "youtube":
        return (
          <svg className="h-4 w-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
            <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/>
          </svg>
        );
      default:
        return <ArrowUpRight className="h-4 w-4" />;
    }
  };

  const getSocialHoverClass = (label) => {
    switch (label.toLowerCase()) {
      case "instagram":
        return "hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:border-transparent hover:shadow-[0_8px_20px_rgba(220,39,67,0.4)]";
      case "facebook":
        return "hover:bg-[#1877F2] hover:text-white hover:border-transparent hover:shadow-[0_8px_20px_rgba(24,119,242,0.4)]";
      case "youtube":
        return "hover:bg-[#FF0000] hover:text-white hover:border-transparent hover:shadow-[0_8px_20px_rgba(255,0,0,0.4)]";
      default:
        return "hover:bg-white hover:text-black";
    }
  };

  return (
    <footer id="contact" className="pt-20 pb-16 px-6 sm:px-12 lg:px-16 bg-neutral-950 text-white w-full rounded-t-[40px] mt-16 shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Banner Row */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 pb-16 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-red-500/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-red-400 mb-4 border border-red-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              <span>Direct Deployment · 30-Minute Priority Dispatch</span>
            </div>
            <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
              Ready to produce <br />
              your next headline?
            </h3>
            <p className="mt-4 text-sm sm:text-base text-neutral-400 max-w-xl">
              Turnkey event management, arena staging, audio-visual engineering, and cinema film coverage across Mumbai &amp; Pan-India.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onQuoteClick}
              className="btn-satisfying-cta px-8 py-3.5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-widest cursor-pointer text-center"
            >
              Get Instant Quote &rarr;
            </button>
            <a
              href="https://wa.me/918657754937"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors cursor-pointer text-center flex items-center justify-center gap-2 border border-white/20 no-underline"
            >
              <MessageCircle className="h-4 w-4 text-[#25D366]" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>

        {/* 4 Columns Row */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/10 text-sm">
          
          {/* Office Address */}
          <div>
            <div className="flex items-center gap-2 text-white font-bold uppercase tracking-wider mb-3">
              <MapPin className="h-4 w-4 text-red-500" />
              <span>Headquarters</span>
            </div>
            <p className="text-neutral-400 leading-relaxed font-sans text-xs">
              A/803 Oceanic Tower Chs Ltd,<br />
              Section 8, Charkop, Kandivali West,<br />
              Mumbai, Maharashtra 400067<br />
              Deployment: NESCO &bull; BKC &bull; Pan-India
            </p>
          </div>

          {/* Hotlines */}
          <div>
            <div className="flex items-center gap-2 text-white font-bold uppercase tracking-wider mb-3">
              <Phone className="h-4 w-4 text-red-500" />
              <span>Direct Hotlines</span>
            </div>
            <div className="space-y-1.5 text-neutral-400 text-xs">
              <a href="tel:+918657754937" className="block hover:text-white transition-colors">+91 86577 54937</a>
              <a href="tel:+919594888516" className="block hover:text-white transition-colors">+91 95948 88516</a>
              <a href="tel:+919167090539" className="block hover:text-white transition-colors">+91 91670 90539</a>
              <a href="mailto:parekhhevents@gmail.com" className="block hover:text-white transition-colors pt-1 text-neutral-300">parekhhevents@gmail.com</a>
            </div>
          </div>

          {/* Sister Brand: Heavenly Weds */}
          <div>
            <div className="text-white font-bold uppercase tracking-wider mb-3">
              Sister Brand
            </div>
            <div className="space-y-2 text-neutral-400 font-sans text-xs">
              <a
                href="https://heavenlyweds.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-red-500/50 hover:bg-white/10 transition-all text-white no-underline"
              >
                <div className="flex items-center justify-between font-bold text-red-400 text-[11px] uppercase tracking-wider mb-0.5">
                  <span>Luxury Weddings</span>
                  <ExternalLink className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="text-xs font-semibold text-white">Heavenly Weds</div>
                <div className="text-[10px] text-neutral-400 mt-0.5">Royal Destination Wedding Films &amp; Bridal Cinematography</div>
              </a>
            </div>
          </div>

          {/* Colorful Social Channels */}
          <div>
            <div className="text-white font-bold uppercase tracking-wider mb-3">
              Official Channels
            </div>
            <div className="flex flex-wrap gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3.5 py-2 text-xs font-semibold text-neutral-300 transition-all no-underline group ${getSocialHoverClass(
                    s.label
                  )}`}
                >
                  <span className="text-neutral-400 group-hover:text-current transition-colors">
                    {getSocialIcon(s.label)}
                  </span>
                  <span>{s.label}</span>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Rights Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            PAREKH PRODUCTIONS PVT LTD &bull; EST. 2021
          </div>
          <div className="flex items-center gap-6">
            <span>Mumbai &bull; London (UK)</span>
            <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
