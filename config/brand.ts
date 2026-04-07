// Great Gums Brand System
// Single source of truth — used by generate.ts to inject into the Claude prompt

export const brand = {
  name: "Great Gums",
  domain: "getgreatgums.com",

  colors: {
    primaryBlue: "#5B7FBF",       // Logo, CTAs, links, star icons
    lightBlueBg: "#DDE9F7",       // Trust/credibility section backgrounds
    lighterBlueBg: "#EEF4FB",     // Alternating sections
    white: "#FFFFFF",              // Main background, cards
    text: "#1A1A1A",               // Near-black body text
    muted: "#555555",              // Subtext, secondary copy
    gold: "#F5A623",               // Star ratings ONLY
  },

  typography: {
    displayFont: "'Playfair Display', Georgia, serif",
    bodyFont: "'Inter', sans-serif",
    notes: [
      "Playfair Display italic: emotional headlines, section titles like 'The Brutal Truth', testimonial quotes",
      "Inter: body copy, nav, stats, CTAs, ALL CAPS product names",
      "Hierarchy: Giant italic serif for emotion → ALL CAPS sans for product/CTA → regular weight sans for body",
    ],
    fontImport: `
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap", style: ["normal", "italic"] });
    `.trim(),
  },

  layout: {
    sectionAlternation: "Sections alternate between #FFFFFF and #DDE9F7",
    ctaButtons: "Pill-shaped (rounded-full), outline style on dark backgrounds, filled on light",
    cards: "White on light blue backgrounds with generous padding and subtle shadow",
    hero: "Full-bleed background image with dark overlay (bg-black/50 or bg-black/60), white text centered or left-aligned",
    responsive: "Always mobile-first, fully responsive, no horizontal scroll on mobile",
  },

  photography: {
    hero: "Dramatic macro/close-up, dark background, brand-blue tinted preferred",
    lifestyle: "Tight face crops, natural light, authentic smiles, no heavy makeup",
    product: "Clean white/grey studio backgrounds, soft shadows",
    editorial: "High contrast B&W for 'brutal truth' or fear-based sections",
    abstract: "Artistic product shots with shadows or color backgrounds",
  },

  copyRules: {
    emotionMix: "Mix serif italic for emotion and ALL CAPS sans for power/CTAs",
    leadWith: "Lead every page with the gum disease pain point before introducing the product",
    clinicalStats: [
      "75% less inflammation",
      "59% less bleeding",
      "67% better cavity protection",
      "6x deeper clean",
      "53% fresher breath",
    ],
    socialProof: "4.8 ★★★★★ Based on 5,697 reviews",
    testimonialStyle: "LARGE italic serif — hero element, not fine print",
    boldWords: "Bold/underline key differentiating words (ONLY, FIRST, etc.)",
  },

  pageStructure: [
    "a. Nav bar — minimal, Great Gums logo centered, no distracting links",
    "b. Hero — full bleed image, dark overlay, 4.8★ social proof badge top-left, main headline in large italic serif + ALL CAPS product name, subheadline, pill CTA button",
    "c. Pain section — 'The Brutal Truth' in large italic serif, 2-3 bullet stats about gum disease, dark/B&W image",
    "d. Product intro — 'Meet the first toothbrush designed to heal your gums' — explain bioelectric technology simply",
    "e. Clinical stats strip — horizontal row of 4-5 stats with large number + short label",
    "f. Testimonials — 2-3 large italic serif quote cards on light blue background, big text, blue stars",
    "g. Final CTA section — light blue background, bold headline, pill button, repeat star rating",
    "h. Minimal footer — logo + email only, no full nav",
  ],

  tailwindRules: {
    testimonialQuotes: "text-4xl or larger in italic serif",
    ctaButtons: "rounded-full px-10 py-4 uppercase tracking-wide",
    heroOverlay: "bg-black/50 or bg-black/60",
    statsNumbers: "text-5xl bold + smaller label below",
  },
};

export type Brand = typeof brand;
