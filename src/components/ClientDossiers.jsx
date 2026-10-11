import { useState } from "react";
import { siteContent } from "../data/siteContent";
import { ArrowRight, X, CheckCircle2 } from "lucide-react";

export function ClientDossiers() {
  const [activeClient, setActiveClient] = useState(null);
  const clients = siteContent.clients;

  return (
    <section id="clients" className="py-20 sm:py-28 px-6 sm:px-12 lg:px-16 w-full max-w-7xl mx-auto">
      <div className="mb-10 sm:mb-14">
        <span className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold block mb-2">
          [CLIENT DOSSIER // VERIFIED PRODUCTIONS]
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-neutral-900 leading-tight">
          Our Clients & <br />
          Delivered Productions
        </h2>
        <p className="mt-3 text-sm sm:text-base text-neutral-600 max-w-2xl">
          Click any client dossier below to inspect on-ground staging, cinema coverage, and technical specifications delivered by Harish Parekh's crew.
        </p>
      </div>

      {/* 6 Client Cards Grid in Horizontal 16:10 format */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <div
            key={client.id}
            onClick={() => setActiveClient(client)}
            className="cursor-pointer rounded-3xl bg-neutral-50 overflow-hidden transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between group shadow-lg hover:shadow-2xl"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
              <img
                src={client.coverImage}
                alt={client.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-neutral-900 shadow-sm">
                  {client.category}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-mono uppercase tracking-wider text-red-400 font-bold block">
                  [SCALE // {client.scale}]
                </span>
                <h3 className="text-xl sm:text-2xl font-bold mt-0.5 text-white">
                  {client.name}
                </h3>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between bg-neutral-50">
              <div>
                <p className="text-xs font-mono text-neutral-400 mb-1">
                  {client.venue}
                </p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {client.tagline}
                </p>
              </div>

              <div className="mt-6 pt-4 flex items-center justify-between text-xs font-bold text-neutral-900 group-hover:text-red-600 transition-colors">
                <span>Inspect Project Dossier</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-red-600" />
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
              <span className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
                [PROJECT SPEC // {activeClient.category} · {activeClient.venue}]
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 mt-1">
                {activeClient.name}
              </h3>
              <p className="mt-2 text-sm text-neutral-600 max-w-2xl">
                {activeClient.tagline} ({activeClient.scale})
              </p>
            </div>

            {/* Scope Highlights */}
            <div className="mt-6 pt-6">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-red-600 mb-3">
                [VERIFIED ON-GROUND DELIVERABLES]
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
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-red-600 mb-4">
                [PRODUCTION MEDIA FOOTAGE // 4K LOG]
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeClient.galleryItems?.map((item, idx) => (
                  <div key={idx} className="relative rounded-2xl overflow-hidden bg-neutral-100 aspect-[16/10]">
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
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-xs text-white">
                      {item.caption}
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
