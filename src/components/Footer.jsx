import { ArrowUpRight, MessageCircle, Mail, MapPin, Phone } from "lucide-react";
import { siteContent } from "../data/siteContent";

export function Footer() {
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

  return (
    <footer id="contact" className="pt-24 pb-16 px-6 sm:px-12 lg:px-16 bg-neutral-950 text-white w-full rounded-t-[40px] mt-16 shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Banner Row */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 pb-16 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-red-500/10 px-3.5 py-1 text-[11px] font-mono uppercase tracking-widest text-red-400 font-bold mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>DIRECT DISPATCH // 30-MIN ON-GROUND SLA</span>
            </div>
            
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.95] text-white">
              START A PRODUCTION <br />
              BRIEF WITH US
            </h2>
            <p className="mt-4 text-sm sm:text-base text-neutral-400 max-w-xl font-light">
              From NESCO and Jio World Centre to nationwide concert rigging and cinema sets — let's execute your next flagship production with 100% in-house precision.
            </p>
          </div>

          {/* Quick Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto shrink-0">
            <a
              href="https://wa.me/918657754937"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-white text-neutral-950 font-extrabold uppercase tracking-wider text-xs px-8 py-4 hover:bg-neutral-200 transition-all no-underline shadow-xl active:scale-95 cursor-pointer"
            >
              <MessageCircle className="h-4 w-4 text-green-600 fill-green-600/20" />
              <span>WhatsApp Desk</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="mailto:parekhevents@gmail.com"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-white/10 text-white font-extrabold uppercase tracking-wider text-xs px-8 py-4 hover:bg-white hover:text-black transition-all no-underline cursor-pointer backdrop-blur-md active:scale-95"
            >
              <Mail className="h-4 w-4" />
              <span>Direct Inquiries</span>
            </a>
          </div>
        </div>

        {/* Middle Metadata & Social Links */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-white/10 text-xs font-mono">
          
          {/* Office Address */}
          <div>
            <div className="flex items-center gap-2 text-white font-bold uppercase tracking-wider mb-3">
              <MapPin className="h-4 w-4 text-red-500" />
              <span>Headquarters</span>
            </div>
            <p className="text-neutral-400 leading-relaxed font-sans text-xs">
              Kandivali (West), Western Suburbs,<br />
              Mumbai, Maharashtra 400067<br />
              Deployment: NESCO · BKC · Pan-India
            </p>
          </div>

          {/* Hotlines */}
          <div>
            <div className="flex items-center gap-2 text-white font-bold uppercase tracking-wider mb-3">
              <Phone className="h-4 w-4 text-red-500" />
              <span>Direct Hotlines</span>
            </div>
            <div className="space-y-1.5 text-neutral-400">
              <a href="tel:+918657754937" className="block hover:text-white transition-colors">+91 86577 54937</a>
              <a href="tel:+919594888516" className="block hover:text-white transition-colors">+91 95948 88516</a>
              <a href="tel:+919167090539" className="block hover:text-white transition-colors">+91 91670 90539</a>
            </div>
          </div>

          {/* Special Divisions */}
          <div>
            <div className="text-white font-bold uppercase tracking-wider mb-3">
              Key Divisions
            </div>
            <div className="space-y-1.5 text-neutral-400 font-sans text-xs">
              <div>• Heavenly Weds (Royal Weddings)</div>
              <div>• Parekh Rigging & German Hangars</div>
              <div>• Cinema FX6/FX3 Multicam Units</div>
            </div>
          </div>

          {/* Unique Interactive Social Chips */}
          <div>
            <div className="text-white font-bold uppercase tracking-wider mb-3">
              Connect Channels
            </div>
            <div className="flex flex-wrap gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/5 hover:bg-white hover:text-black border border-white/10 px-3.5 py-2 text-xs font-semibold text-neutral-300 transition-all no-underline group"
                >
                  <span className="text-neutral-400 group-hover:text-black transition-colors">
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
            PAREKH PRODUCTIONS PRIVATE LIMITED · EST. 2021
          </div>
          <div className="flex items-center gap-6">
            <span>Mumbai · London (UK)</span>
            <span>© {new Date().getFullYear()} All rights reserved.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
