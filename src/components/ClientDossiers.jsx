import { useState } from "react";
import { siteContent } from "../data/siteContent";
import { ArrowRight, X, CheckCircle2 } from "lucide-react";

export function ClientDossiers() {
  const [activeClient, setActiveClient] = useState(null);
  const clients = siteContent.clients;

  return (
    <section id="clients" className="py-20 sm:py-28 px-6 sm:px-12 lg:px-16 w-full max-w-7xl mx-auto">
      <div className="mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-100 border border-neutral-200/80 text-xs font-bold uppercase tracking-wider text-neutral-800 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600/70" />
          <span>Client Dossier · Verified Arena Productions</span>
        </div>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-neutral-900 leading-tight">
          Our Clients & <br />
          Delivered Productions
        </h2>
        <p className="mt-3 text-sm sm:text-base text-neutral-600 max-w-2xl">
          Click any client dossier below to inspect on-ground staging, cinema coverage, and technical specifications delivered by Harish Parekh's crew.
        </p>
      </div>

      {/* 6 Client Cards Grid: Seamlessly blended with background, zero harsh shadow, smooth editorial hover transitions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {clients.map((client) => (
          <div
            key={client.id}
            onClick={() => setActiveClient(client)}
            className="cursor-pointer group flex flex-col justify-between transition-all duration-500"
          >
            {/* Image Container with Smooth Curved Corners & Zoom */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-neutral-100">
              <img
                src={client.coverImage}
                alt={client.name}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              
              {/* Top Tag */}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-neutral-900 tracking-wider uppercase">
                  {client.category}
                </span>
              </div>

              {/* Bottom In-Image Meta */}
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <span className="text-[10px] uppercase tracking-wider text-red-400 font-bold block mb-0.5">
                  {client.scale}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                  {client.name}
                </h3>
              </div>
            </div>

            {/* Below Image Details (Clean and flat with white background, zero box shadow) */}
            <div className="pt-4 px-1 flex flex-col justify-between">
              <div>
                <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                  {client.venue}
                </p>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                  {client.tagline}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-neutral-900 group-hover:text-red-600 transition-colors">
                <span className="tracking-wider uppercase text-[11px]">Inspect Project Dossier</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5 text-red-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Lightbox */}
      {activeClient && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 sm:p-8 animate-fadeIn">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white text-neutral-900 p-6 sm:p-10 shadow-2xl border border-neutral-100">
            <button
              onClick={() => setActiveClient(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-neutral-100 text-neutral-900 hover:bg-black hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-6 w-6" />
            </button>

            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-xs font-bold uppercase tracking-wider text-red-600 border border-red-200/50">
                <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                <span>Project Specifications · {activeClient.category} · {activeClient.venue}</span>
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 mt-2">
                {activeClient.name}
              </h3>
              <p className="mt-2 text-sm text-neutral-600 max-w-2xl">
                {activeClient.tagline} ({activeClient.scale})
              </p>
            </div>

            {/* Scope Highlights */}
            <div className="mt-6 pt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-red-600 mb-3">
                Verified On-Ground Deliverables
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeClient.highlights.map((item, idx) => (
                  <div key={idx} className="rounded-2xl bg-neutral-50 border border-neutral-100 p-3.5 text-xs text-neutral-800 flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Media Grid */}
            <div className="mt-8 pt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-red-600 mb-4">
                Production Media Vault · Cinema Masters
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeClient.galleryItems?.map((item, idx) => (
                  <div key={idx} className="relative rounded-2xl overflow-hidden bg-neutral-900 aspect-[16/10] group">
                    {item.type === "video" ? (
                      <video
                        src={item.src}
                        controls
                        playsInline
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <img
                        src={item.src}
                        alt={item.caption}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/assets/parekh/portfolio/finbridge-stage.jpg";
                        }}
                      />
                    )}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-4 text-xs font-medium text-white flex items-center justify-between">
                      <span>{item.caption}</span>
                      <span className="text-[10px] font-mono text-white/50 uppercase">{item.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
