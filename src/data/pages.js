import { siteContent } from "./siteContent.js";

const sharedStats = [
  { value: "2021", label: "Founded in Mumbai" },
  { value: "6", label: "Production hubs" },
  { value: "18+", label: "Core capabilities" },
];

export const pageContent = {
  home: {
    key: "home",
    path: "/",
    title: "Event Management & Production Company in Mumbai | Parekh Productions",
    description:
      "Premier event management and media production company in Mumbai. Specialists in corporate events, conferences, exhibitions, event production, photography and videography.",
    h1: "Event Management & Media Production Company in Mumbai",
    hero: siteContent.hero,
  },
  corporateEvents: {
    key: "corporateEvents",
    path: "/corporate-events-mumbai",
    title: "Corporate Event Management Company in Mumbai | Parekh Productions",
    description:
      "End-to-end corporate event management in Mumbai. Product launches, annual summits, dealer meets, conferences and exhibitions with turnkey technical production.",
    h1: "Corporate Event Management in Mumbai",
    hero: {
      eyebrow: "Corporate Events · Mumbai & Pan-India",
      title: "Corporate Event Management in Mumbai.",
      body:
        "From high-stakes product launches and conferences to distributor meets, we engineer turnkey stage technicals, acoustic AV, and flawless show flow.",
      primaryCta: "Get Quote",
      secondaryCta: "Explore Case Studies",
      secondaryHref: "#work",
      stats: sharedStats,
    },
  },
  eventProduction: {
    key: "eventProduction",
    path: "/event-production-mumbai",
    title: "Event Production Company in Mumbai | Parekh Productions",
    description:
      "Leading technical event production company in Mumbai. Professional stage setup, line-array concert audio, intelligent lighting, trussing, and LED wall engineering.",
    h1: "Event Production Services in Mumbai",
    hero: {
      eyebrow: "Stage · Lighting · Acoustics · Rigging",
      title: "Event Production Services in Mumbai.",
      body:
        "Concert-grade sound reinforcement, intelligent beam lighting, custom stage fabrication, and on-ground show caller control across India.",
      primaryCta: "Get Quote",
      secondaryCta: "View Staging Work",
      secondaryHref: "#work",
      stats: sharedStats,
    },
  },
  photography: {
    key: "photography",
    path: "/corporate-photography-mumbai",
    title: "Event & Corporate Photography in Mumbai | Parekh Productions",
    description:
      "Professional corporate event photography, commercial product shoots, and executive summit coverage in Mumbai with high-velocity same-day delivery.",
    h1: "Event & Corporate Photography in Mumbai",
    hero: {
      eyebrow: "Commercial · Expos · Corporate Photography",
      title: "Event & Corporate Photography in Mumbai.",
      body:
        "High-definition advertising photography, expo floor coverage, same-day executive selects, and commercial brand stills that amplify your presence.",
      primaryCta: "Book Crew",
      secondaryCta: "Open Photo Archive",
      secondaryHref: "/gallery",
      stats: sharedStats,
    },
  },
  videography: {
    key: "videography",
    path: "/corporate-video-production-mumbai",
    title: "Corporate Video Production Company in Mumbai | Parekh Productions",
    description:
      "Award-winning corporate video production and event videography in Mumbai. TVCs, brand anthem films, live switchers, aftermovies, and licensed 4K drone cinematography.",
    h1: "Corporate Video Production Services in Mumbai",
    hero: {
      eyebrow: "Cinema 4K/8K · DVCs · Drone Cinematography",
      title: "Corporate Video Production Services in Mumbai.",
      body:
        "Multi-camera cinema setups (RED/ARRI), studio lighting, cinematic highlight edits, and broadcast-ready brand films engineered for maximum engagement.",
      primaryCta: "Request Reel",
      secondaryCta: "Watch Showreel",
      secondaryHref: "/gallery",
      stats: sharedStats,
    },
  },
  services: {
    key: "services",
    path: "/services",
    title: "Event Management Company in Mumbai | Parekh Productions",
    description:
      "Complete event management, stage production, films, web series, and media coverage across Mumbai, Navi Mumbai, Thane, Pune, and Pan-India.",
    h1: "Event Management Services in Mumbai",
    hero: {
      eyebrow: "Services · Events · Media · Production",
      title: "Event Management Services in Mumbai.",
      body:
        "From corporate stages and brand activations to feature films, drone coverage and luxury weddings, our production teams shape the brief from first idea to final frame.",
      primaryCta: "Book Consultation",
      secondaryCta: "See Capabilities",
      secondaryHref: "#services",
      stats: sharedStats,
    },
  },
  gallery: {
    key: "gallery",
    path: "/gallery",
    title: "Event Photography & Production Gallery | Parekh Productions",
    description:
      "View selected corporate events, brand activations, live productions, event films and luxury wedding moments produced by Parekh Productions across Mumbai and India.",
    h1: "Event Photography & Production Gallery",
    hero: {
      eyebrow: "Selected work · Live rooms · Lasting stories",
      title: "The Energy Of The Room, Kept Alive.",
      body:
        "A visual selection of stages, audiences, celebrations and production details captured by our event photography and videography teams.",
      primaryCta: "Get Quote",
      secondaryCta: "View Archive",
      secondaryHref: "/gallery",
      stats: sharedStats,
    },
  },
  contact: {
    key: "contact",
    path: "/contact",
    title: "Contact Parekh Productions | Mumbai Event Production House",
    description:
      "Contact Parekh Productions for event production, photography, videography, commercial films and luxury weddings in Mumbai (Kandivali West) and Pan-India.",
    h1: "Contact Parekh Productions",
    hero: {
      eyebrow: "Kandivali, Western Mumbai · Pan-India · London / UK",
      title: "Have A Brief In Mind? Let’s Talk.",
      body:
        "Tell us what you are planning and our senior production desk will connect directly within 30 minutes to review your requirements.",
      primaryCta: "Instant WhatsApp",
      secondaryCta: "Contact Details",
      secondaryHref: "#contact",
      stats: sharedStats,
    },
  },
};

export const staticRoutes = Object.values(pageContent).map(({ key, path }) => ({ key, path }));
