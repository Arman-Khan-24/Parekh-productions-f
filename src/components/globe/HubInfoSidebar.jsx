import { ArrowRight, ExternalLink, MapPin, Sparkles } from "lucide-react";

export function HubInfoSidebar({ hub, onContactClick }) {
  if (!hub) return null;

  return (
    <div className="rounded-2xl bg-[#0d0f17]/95 backdrop-blur-2xl border border-white/15 text-white shadow-2xl pointer-events-auto overflow-hidden transition-all duration-300">
      
      {/* Featured Location Event Media Card */}
      {hub.image && (
        <div className="relative w-full h-36 sm:h-40 overflow-hidden bg-neutral-900 group">
          <img
            src={hub.image}
            alt={hub.eventTitle || hub.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f17] via-[#0d0f17]/30 to-black/40" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
            <span className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-red-500/30">
              {hub.badge}
            </span>
            <span className="text-[11px] text-white/90 font-mono px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
              {hub.coordinates}
            </span>
          </div>

          {/* Event title overlay */}
          <div className="absolute bottom-2.5 left-3 right-3 z-10">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-red-400 font-semibold mb-0.5">
              <Sparkles className="h-3 w-3 text-red-400" />
              <span>LIVE SHOW ON-GROUND</span>
            </div>
            <div className="text-sm font-bold text-white line-clamp-1 drop-shadow-md">
              {hub.eventTitle}
            </div>
          </div>
        </div>
      )}

      {/* Details & Specs Body */}
      <div className="p-4 sm:p-5">
        <div className="flex items-baseline justify-between gap-2">
          <h4 className="text-lg sm:text-xl font-black text-white tracking-tight">
            {hub.name}
          </h4>
          <span className="text-[11px] text-neutral-400 font-medium">
            {hub.subhead}
          </span>
        </div>

        {/* Venue tag */}
        {hub.venue && (
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-300 font-medium mt-1">
            <MapPin className="h-3 w-3 text-red-500 shrink-0" />
            <span className="line-clamp-1">{hub.venue}</span>
          </div>
        )}

        {/* Narrative Description */}
        <p className="text-xs text-neutral-300 mt-2 leading-relaxed font-light line-clamp-3">
          {hub.detail}
        </p>

        {/* Metric pills */}
        {hub.metrics && (
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/10">
            {hub.metrics.map((metric, i) => (
              <span
                key={i}
                className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-neutral-300"
              >
                {metric}
              </span>
            ))}
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
          <span className="text-neutral-400 text-[11px]">{hub.stats}</span>
          <div className="flex items-center gap-3">
            {hub.googleMapsUrl && (
              <a
                href={hub.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white flex items-center gap-1 no-underline transition-colors text-[11px]"
                title="Open Venue in Google Maps"
              >
                <span>Venue Maps</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
            <a
              href="#contact"
              onClick={onContactClick}
              className="font-bold text-red-400 hover:text-white flex items-center gap-1 no-underline transition-colors"
            >
              <span>Dispatch</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
