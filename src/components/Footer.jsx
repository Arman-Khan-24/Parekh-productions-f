import { ArrowUpRight } from "lucide-react";
import { siteContent } from "../data/siteContent";

export function Footer() {
  const { socials } = siteContent;

  return (
    <footer id="contact" className="py-20 sm:py-28 px-6 sm:px-12 lg:px-16 bg-black text-white w-full">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold block mb-3">
            [DIRECT DISPATCH // 30-MIN SLA]
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.95]">
            START A PRODUCTION <br />
            BRIEF WITH US
          </h2>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white text-black font-extrabold uppercase tracking-wider text-xs px-8 py-4 hover:bg-neutral-200 transition-all no-underline shadow-xl active:scale-95 cursor-pointer"
            >
              <span>WhatsApp Production Desk</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="mailto:contact@parekhproductions.com"
              className="inline-flex items-center gap-2 rounded-full bg-neutral-900 text-white font-extrabold uppercase tracking-wider text-xs px-8 py-4 hover:bg-neutral-800 transition-all no-underline cursor-pointer"
            >
              <span>Direct Production Inquiries</span>
            </a>
          </div>

          {/* Social Links Restored (Instagram, YouTube, Facebook, etc.) */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-xs font-mono font-semibold text-white/80 hover:bg-white hover:text-black transition-all no-underline"
              >
                <span>{s.label}</span>
                <ArrowUpRight className="h-3 w-3" />
              </a>
            ))}
          </div>
        </div>

        <div className="text-xs font-mono text-white/40 space-y-2 text-left md:text-right">
          <div className="text-white/80 font-bold">PAREKH PRODUCTIONS PRIVATE LIMITED</div>
          <div>Kandivali Western Mumbai · NESCO · BKC · Pan-India · London/UK</div>
          <div>Production Hotline: +91 98200 00000 / +91 98210 00000</div>
          <div>© {new Date().getFullYear()} All rights reserved. Zero third-party outsourcing.</div>
        </div>

      </div>
    </footer>
  );
}
