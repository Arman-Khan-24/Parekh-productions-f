# Parekh Productions

A responsive React + Tailwind CSS website for **Parekh Productions** — a photography, videography, production & event management company based in Mumbai, serving clients across India and London/UK.

## Tech Stack

- **React 18** — UI framework
- **Vite** — build tool & dev server
- **Tailwind CSS 3** — utility-first styling (preflight disabled for legacy CSS compatibility)
- **Legacy Webflow assets** — migrated from the original Webflow site; original CSS/JS vendored in `public/assets/`

## Sections

| Section | Description |
|---------|-------------|
| Hero | Full-screen headline with background video previews |
| Partners | Client/partner logo carousel (Swiper.js) |
| Intro Video | Embedded video showcase |
| About | Company overview and story |
| Services | Photography, videography, production, event management offerings |
| Destinations | Mumbai, Pan-India, London/UK locations |
| Why Parekh | Value proposition and differentiators |
| Pricing | Service packages |
| Reviews | Client testimonials (Swiper carousel) |
| CTA | Call-to-action block |
| FAQ | Accordion-style frequently asked questions |
| Footer | Contact info, links, social media |

## Getting Started

```powershell
npm install
npm run dev
```

The dev server runs on `http://localhost:5173` (or the next available port).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (exposed on `0.0.0.0`) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |

## Project Structure

```
├── index.html                  # Entry HTML with SEO meta tags + JSON-LD
├── public/
│   ├── assets/vendor/          # Vendored images, videos, fonts, JS from Webflow
│   └── legacy-body.html        # Original static page fallback
├── src/
│   ├── main.jsx                # React entry point
│   ├── App.jsx                 # Root component, Swiper init, viewport video playback
│   ├── tailwind.css            # Tailwind directives
│   ├── tailwind-compat.css     # Compat layer
│   ├── legacy-head.css         # Legacy head styles
│   └── components/
│       ├── SiteChrome.jsx      # Navbar + hamburger menu
│       ├── MainContent.jsx     # All page sections composition
│       ├── FooterSection.jsx   # Footer with contact + socials
│       └── sections/           # Individual section components
│           ├── HeroSection.jsx
│           ├── PartnersSection.jsx
│           ├── IntroVideoSection.jsx
│           ├── AboutSection.jsx
│           ├── ServicesSection.jsx
│           ├── DestinationsSection.jsx
│           ├── WhyOffsiteioSection.jsx
│           ├── PricingSection.jsx
│           ├── ReviewSection.jsx
│           ├── CTASection.jsx
│           ├── CTASection2.jsx
│           ├── FaqSection.jsx
│           └── ...
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## Features

- Responsive (mobile, tablet, desktop)
- Viewport-aware video playback (IntersectionObserver)
- Swiper.js carousels for partners and reviews
- WhatsApp floating button
- Sticky navbar with scroll-triggered CTA
- SEO: Open Graph, Twitter Card, JSON-LD structured data
- Contact: +91 86577 54937 · +91 95948 88516 · +91 91670 90539
