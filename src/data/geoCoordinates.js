// Centralized Geographic Coordinates & Coordinates Formatting
// Meta tags and Map UI both derive from this single source of truth.

export const GEO_COORDINATES = {
  mumbai: {
    lat: 19.2057,
    lng: 72.8654,
    // Formatted strictly as 19°12'N, 72°52'E for display
    displayDMS: "19°12'N, 72°52'E",
    metaPosition: "19.2057;72.8654",
    icbm: "19.2057, 72.8654",
  },
  pune: {
    lat: 18.5204,
    lng: 73.8567,
    displayDMS: "18°31'N, 73°51'E",
    metaPosition: "18.5204;73.8567",
    icbm: "18.5204, 73.8567",
  },
  panIndia: {
    lat: 20.5937,
    lng: 78.9629,
    displayDMS: "20°35'N, 78°57'E",
    metaPosition: "20.5937;78.9629",
    icbm: "20.5937, 78.9629",
  },
  london: {
    lat: 51.5074,
    lng: -0.1278,
    displayDMS: "51°30'N, 0°07'W",
    metaPosition: "51.5074;-0.1278",
    icbm: "51.5074, -0.1278",
  },
};
