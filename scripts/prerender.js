import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { preview } from "vite";
import puppeteer from "puppeteer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.resolve(projectRoot, "dist");

// Dedicated Route Meta Configurations for Clean Prerendering
const routes = [
  {
    path: "/",
    outFile: "index.html",
    title: "Event Management & Production Company in Mumbai | Parekh Productions",
    description: "Parekh Productions is Mumbai's premier event management, corporate event production, cinematography, sound & AV, and exhibition staging partner. 30-min on-ground dispatch across Mumbai & Pan-India.",
    keywords: "Event management company Mumbai, Corporate event management Mumbai, Event production company Mumbai, Stage setup for events, Event sound AV Mumbai, Corporate video production Mumbai, Event photography Mumbai, Brand video production Mumbai, Harish Parekh",
    canonical: "https://parekhevents.com/",
    locale: "en_IN",
    ogImage: "https://parekhevents.com/assets/parekh/parekh-og.jpg",
    schema: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://parekhevents.com/#organization",
      "name": "Parekh Productions - Mumbai HQ",
      "url": "https://parekhevents.com/",
      "logo": "https://parekhevents.com/assets/parekh/parekh-productions-logo.png",
      "image": "https://parekhevents.com/assets/parekh/parekh-og.jpg",
      "description": "Premier event management and media production company in Mumbai specializing in corporate events, plenary stage setups, line-array acoustics, and commercial cinematography.",
      "telephone": "+918657754937",
      "priceRange": "$$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Shop No 18, 1st Floor, V-Mall, Thakur Complex, Western Express Highway, Kandivali East",
        "addressLocality": "Mumbai",
        "addressRegion": "Maharashtra",
        "postalCode": "400101",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 19.2057,
        "longitude": 72.8654
      },
      "areaServed": [
        "Mumbai",
        "Navi Mumbai",
        "Thane",
        "Pune",
        "Maharashtra",
        "India"
      ],
      "sameAs": [
        "https://www.instagram.com/parekh_productions/",
        "https://www.facebook.com/parekhproductions/",
        "https://www.youtube.com/@parekhproductions",
        "https://heavenlyweds.com"
      ]
    }
  },
  {
    path: "/london",
    outFile: "london/index.html",
    title: "Event Production & Corporate Cinematography in London | Parekh Productions",
    description: "Parekh Productions London delivers executive event production, bilateral summits, stage AV engineering, and broadcast cinema film coverage across London and the UK.",
    keywords: "Event production company London, Corporate event management London, Bilateral summit production UK, Event videography London, Corporate video production London, Conference staging UK",
    canonical: "https://parekhevents.com/london",
    locale: "en_GB",
    ogImage: "https://parekhevents.com/assets/parekh/parekh-og.jpg",
    schema: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://parekhevents.com/london#organization",
      "name": "Parekh Productions - London Division",
      "url": "https://parekhevents.com/london",
      "logo": "https://parekhevents.com/assets/parekh/parekh-productions-logo.png",
      "image": "https://parekhevents.com/assets/parekh/parekh-og.jpg",
      "description": "Executive corporate event production, bilateral summits, and broadcast cinema film coverage across London and the UK.",
      "telephone": "+442081234567",
      "priceRange": "£££",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "12 Berkeley Square, Mayfair",
        "addressLocality": "London",
        "postalCode": "W1J 6BD",
        "addressCountry": "GB"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 51.5094,
        "longitude": -0.1458
      },
      "areaServed": [
        "London",
        "Greater London",
        "Birmingham",
        "Manchester",
        "United Kingdom",
        "Europe"
      ],
      "sameAs": [
        "https://www.instagram.com/parekh_productions/",
        "https://heavenlyweds.com"
      ]
    }
  },
  {
    path: "/services",
    outFile: "services/index.html",
    title: "Event Production & Media Capabilities Directory | Parekh Productions",
    description: "Explore Parekh Productions' complete turnkey services: Stage Fabrication, Concert Acoustics, Broadcast 4K/8K Cinema, Exhibition Staging, and Commercial Food Photography.",
    keywords: "Event production services, Stage setup services Mumbai, Line array concert sound, Broadcast 4K video, Exhibition stall fabrication, Commercial food photography",
    canonical: "https://parekhevents.com/services",
    locale: "en_IN",
    ogImage: "https://parekhevents.com/assets/parekh/parekh-og.jpg"
  },
  {
    path: "/gallery",
    outFile: "gallery/index.html",
    title: "Production Reel & Visual Catalog | Parekh Productions",
    description: "Browse Parekh Productions' live visual catalog and continuous autoplay portfolio of summits, trade expos, stadium acoustics, and commercial TVCs.",
    keywords: "Parekh productions portfolio, Event videos Mumbai, Expo video highlights, Corporate event photography archive",
    canonical: "https://parekhevents.com/gallery",
    locale: "en_IN",
    ogImage: "https://parekhevents.com/assets/parekh/parekh-og.jpg"
  }
];

function injectRouteHead(html, route) {
  if (route.title) {
    html = html.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);
  }

  if (route.description) {
    html = html.replace(
      /<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/i,
      `<meta name="description" content="${route.description}" />`
    );
  }

  if (route.keywords) {
    html = html.replace(
      /<meta\s+name=["']keywords["']\s+content=["'].*?["']\s*\/?>/i,
      `<meta name="keywords" content="${route.keywords}" />`
    );
  }

  if (route.canonical) {
    html = html.replace(
      /<link\s+rel=["']canonical["']\s+href=["'].*?["']\s*\/?>/i,
      `<link rel="canonical" href="${route.canonical}" />`
    );
  }

  if (route.canonical) {
    html = html.replace(
      /<meta\s+property=["']og:url["']\s+content=["'].*?["']\s*\/?>/i,
      `<meta property="og:url" content="${route.canonical}" />`
    );
  }

  if (route.title) {
    html = html.replace(
      /<meta\s+property=["']og:title["']\s+content=["'].*?["']\s*\/?>/i,
      `<meta property="og:title" content="${route.title}" />`
    );
  }

  if (route.description) {
    html = html.replace(
      /<meta\s+property=["']og:description["']\s+content=["'].*?["']\s*\/?>/i,
      `<meta property="og:description" content="${route.description}" />`
    );
  }

  if (route.locale) {
    html = html.replace(
      /<meta\s+property=["']og:locale["']\s+content=["'].*?["']\s*\/?>/i,
      `<meta property="og:locale" content="${route.locale}" />`
    );
  }

  const hreflangTags = `
    <link rel="alternate" hreflang="en-IN" href="https://parekhevents.com/" />
    <link rel="alternate" hreflang="en-GB" href="https://parekhevents.com/london" />
    <link rel="alternate" hreflang="x-default" href="https://parekhevents.com/" />`;
  
  if (!html.includes('hreflang="en-IN"')) {
    html = html.replace('</head>', `${hreflangTags}\n</head>`);
  }

  if (route.schema) {
    const schemaScript = `<script type="application/ld+json">\n${JSON.stringify(route.schema, null, 2)}\n</script>`;
    if (html.includes('type="application/ld+json"')) {
      html = html.replace(/<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>/i, schemaScript);
    } else {
      html = html.replace('</head>', `${schemaScript}\n</head>`);
    }
  }

  html = html.replace(/&amp;amp;/g, '&amp;');
  return html;
}

async function prerender() {
  console.log("🚀 Starting Puppeteer Build-Time Prerendering via Vite Preview...");

  // Launch official Vite preview server programmatically
  const previewServer = await preview({
    root: projectRoot,
    preview: {
      port: 4173,
      host: "localhost"
    }
  });

  console.log("📦 Official Vite preview server running at http://localhost:4173");

  const tmpProfileDir = path.resolve(projectRoot, `node_modules/.cache/puppeteer-profile-${Date.now()}`);
  const browser = await puppeteer.launch({
    headless: "new",
    userDataDir: tmpProfileDir,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"]
  });

  for (const route of routes) {
    console.log(`🌐 Prerendering route: ${route.path} -> dist/${route.outFile}`);
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    const url = `http://localhost:4173${route.path}`;
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });

    // Wait until root is populated with rendered HTML content
    await page.waitForFunction(
      () => document.getElementById("root") && document.getElementById("root").innerHTML.trim().length > 300,
      { timeout: 15000 }
    ).catch(() => console.warn(`⚠️ Timeout waiting for #root content on ${route.path}`));

    let content = await page.content();
    await page.close();

    content = injectRouteHead(content, route);

    const outPath = path.resolve(distDir, route.outFile);
    const outDir = path.dirname(outPath);
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    fs.writeFileSync(outPath, content, "utf8");
    console.log(`✅ Successfully wrote prerendered HTML: ${outPath} (${(content.length / 1024).toFixed(1)} KB)`);
  }

  await browser.close();
  previewServer.httpServer.close();
  console.log("🎉 Prerendering complete for all routes!");
}

prerender().catch((err) => {
  console.error("❌ Prerender failed:", err);
  process.exit(1);
});
