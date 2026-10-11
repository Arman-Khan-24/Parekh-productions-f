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
    <section id="showcase" className="py-20 sm:py-28 px-6 sm:px-12 lg:px-16 w-full max-w-7xl mx-auto">
      
      {/* Header with Circular Arrows */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tight text-neutral-900 leading-[0.95]">
          A CREATIVE VIDEO <br />
          PRODUCTION STUDIO
        </h2>

        <div className="flex items-center gap-3">
          <button
            onClick={prevSlide}
            aria-label="Previous project"
            className="h-12 w-12 rounded-full bg-neutral-100 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all cursor-pointer shadow-md active:scale-95"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next project"
            className="h-12 w-12 rounded-full bg-neutral-100 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all cursor-pointer shadow-md active:scale-95"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* 100% Unobstructed Image Frame */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-3xl overflow-hidden bg-neutral-100 shadow-xl">
        <img
          src={current.image}
          alt={current.title}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-102"
        />
      </div>

      {/* Clean Editorial Caption BELOW Image (Image 100% visible, no messy overlay) */}
      <div className="mt-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4 text-black">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold block mb-1">
            [{current.category}]
          </span>
          <h3 className="text-xl sm:text-3xl font-extrabold text-neutral-900">
            {current.title}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1 font-mono">
            {current.venue} · {current.desc}
          </p>
        </div>

        <div className="text-xs font-mono text-neutral-400 tracking-widest shrink-0">
          0{currentIndex + 1} // 0{slides.length}
        </div>
      </div>

    </section>
  );
}
