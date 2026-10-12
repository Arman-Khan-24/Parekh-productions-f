import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function StudioShowcase() {
  const slides = [
    {
      title: "Jio World Centre & NESCO Exhibition Pavilion",
      category: "EXHIBITION ARCHITECTURE",
      image: "/assets/parekh/client_media/expo-booth.jpg",
      venue: "Jio World Convention Centre, BKC",
      desc: "Turnkey fabrication with overhead halo illumination, illuminated meeting suites, and continuous visitor flow management.",
    },
    {
      title: "Finbridge National FinTech Summit Arena",
      category: "CONCERT & STAGE RIGGING",
      image: "/assets/parekh/portfolio/finbridge-stage.jpg",
      venue: "NESCO Exhibition Centre, Goregaon",
      desc: "Massive corporate auditorium stage setup with ground-stacked curved LED screens, line-arrays, and intelligent beam arrays.",
    },
    {
      title: "Screentex India Conclave Stage",
      category: "CORPORATE CONFERENCE",
      image: "/assets/parekh/client_media/screentex-expo.jpg",
      venue: "Hitex / NESCO Halls",
      desc: "Multi-track industry conclave with broadcast-grade camera risers, redundant audio feeds, and VIP presentation stages.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const current = slides[currentIndex];

  return (
    <section id="showcase" className="min-h-screen py-10 sm:py-16 px-6 sm:px-12 lg:px-16 w-full max-w-[1400px] mx-auto flex flex-col justify-center">
      
      {/* Header with Circular Arrows */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <p className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-neutral-400 mb-2">
            MASTER GEAR VAULT &middot; HEAVY STAGING &amp; AV RIGGING
          </p>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-neutral-900 leading-[1]">
            A CREATIVE VIDEO & <br />
            STAGING STUDIO
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={prevSlide}
            aria-label="Previous project"
            className="h-11 w-11 rounded-full bg-neutral-100 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all cursor-pointer active:scale-95"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next project"
            className="h-11 w-11 rounded-full bg-neutral-100 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all cursor-pointer active:scale-95"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* 100% Unobstructed Image Frame (Contained within viewport) */}
      <div className="relative w-full h-[45vh] sm:h-[52vh] lg:h-[58vh] max-h-[620px] rounded-3xl overflow-hidden bg-neutral-900">
        <img
          src={current.image}
          alt={current.title}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-102"
        />
      </div>

      {/* Clean Editorial Caption BELOW Image */}
      <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-black">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-red-600 block">
            {current.category}
          </span>
          <h3 className="text-lg sm:text-2xl font-black text-neutral-900 mt-0.5">
            {current.title}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            {current.venue} · {current.desc}
          </p>
        </div>

        <div className="text-xs font-bold text-neutral-400 tracking-wider shrink-0">
          0{currentIndex + 1} of 0{slides.length}
        </div>
      </div>

    </section>
  );
}
