/**
 * Quick generation — no brief file needed.
 *
 * Usage:
 *   npx tsx quick.ts <slug> "<headline>" "<angle>"
 *
 * Example:
 *   npx tsx quick.ts whitening-women "Your Smile Is the First Thing People Notice" "embarrassment: yellow teeth making you hide your smile"
 *
 * All other fields are filled with smart defaults.
 * A brief JSON is also saved to /briefs/ so you can refine it later.
 */

import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";
import { config as dotenvConfig } from "dotenv";
import { brand } from "./config/brand.js";

// Load env
const envLocalPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  dotenvConfig({ path: envLocalPath, override: false });
} else {
  dotenvConfig();
}

// ─── CLI args ────────────────────────────────────────────────────────────────

const [slug, headline, angle] = process.argv.slice(2);

if (!slug || !headline || !angle) {
  console.error(`
Usage:
  npx tsx quick.ts <slug> "<headline>" "<angle>"

Example:
  npx tsx quick.ts whitening-women "Your Smile Is the First Thing People Notice" "embarrassment: yellow teeth making you hide your smile"
`);
  process.exit(1);
}

// ─── Build default brief ─────────────────────────────────────────────────────

const brief = {
  slug,
  headline,
  subheadline: "The world's ONLY bioelectric toothbrush that heals while you brush",
  cta: "GET GREAT GUMS NOW",
  audience: "adults 35+ concerned about their oral health",
  adAngle: angle,
  heroStyle: "dramatic",
  colorScheme: "light and clinical",
  testimonials: [
    { name: "Matt F.", quote: "My dentist even pointed out the improvement.", role: "Verified Buyer" },
    { name: "Sarah J.", quote: "Within days I noticed less irritation around my gums.", role: "Verified Buyer" },
    { name: "David R.", quote: "I was skeptical but after 30 days my gums stopped bleeding completely.", role: "Verified Buyer" },
  ],
};

// ─── Save brief for future editing ───────────────────────────────────────────

const briefPath = path.join(process.cwd(), "briefs", `${slug}.json`);
if (!fs.existsSync(briefPath)) {
  fs.writeFileSync(briefPath, JSON.stringify(brief, null, 2), "utf-8");
  console.log(`📄 Brief saved to briefs/${slug}.json (edit to refine)`);
} else {
  console.log(`📄 Using existing brief at briefs/${slug}.json`);
}

// ─── Load images ──────────────────────────────────────────────────────────────

const imagesRegistry = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "assets", "images.json"), "utf-8")
);

// ─── Prompts (same as generate.ts) ──────────────────────────────────────────

function buildSystemPrompt(): string {
  return `You are an expert Next.js developer and conversion copywriter for Great Gums (getgreatgums.com).

Your job is to generate COMPLETE, PRODUCTION-READY Next.js 14 App Router page components (TypeScript/TSX) for landing pages.

BRAND SYSTEM:
${JSON.stringify(brand, null, 2)}

ABSOLUTE RULES:
1. Return ONLY the complete .tsx file contents — no markdown, no explanation, no code fences
2. The file must be immediately runnable with Next.js 14 App Router
3. Import Playfair Display and Inter from next/font/google within the component file
4. Use Tailwind CSS for ALL layout and spacing
5. Use inline style={{}} only for exact brand hex colors not available in Tailwind
6. The page must be fully responsive and mobile-first
7. NO horizontal scroll on mobile
8. Use "use client" directive at the top since the page may use useState for interactions

REQUIRED PAGE SECTIONS (in this exact order):
a. NAV — Great Gums logo (text-based, brand blue, Playfair italic), centered, minimal, no links
b. HERO — Full-bleed background (use CSS gradient if no image, or next/image if path given), dark overlay, 4.8★ social proof badge top-left, large italic serif headline + ALL CAPS sans product line, subheadline, pill CTA button
c. PAIN SECTION — "The Brutal Truth" heading in large italic serif, 2-3 impactful gum disease stats/bullets, dark section feel
d. PRODUCT INTRO — "Meet the first toothbrush designed to heal your gums" — explain bioelectric technology in simple human terms
e. STATS STRIP — horizontal row (wraps on mobile) of 5 clinical stats: large bold number (text-5xl) + short label. Stats: 75% Less Inflammation, 59% Less Bleeding, 67% Better Cavity Protection, 6x Deeper Clean, 53% Fresher Breath
f. TESTIMONIALS — 2-3 quote cards on #DDE9F7 background. Quotes MUST be text-4xl italic serif. Include name, role (Verified Buyer), and ★★★★★ in brand blue
g. FINAL CTA — #DDE9F7 background, bold italic serif headline, pill button, repeat 4.8★ review count
h. FOOTER — Logo (Playfair italic, brand blue) + "hello@getgreatgums.com" only, no nav links

STYLE SPECIFICS:
- CTA buttons: rounded-full px-10 py-4 uppercase tracking-widest font-bold text-sm
- On white backgrounds: filled button with bg-[#5B7FBF] text-white
- On dark/hero backgrounds: border-2 border-white text-white hover:bg-white hover:text-[#1A1A1A]
- Section padding: py-20 md:py-28
- Max content width: max-w-6xl mx-auto px-6
- Testimonial cards: bg-white rounded-2xl p-8 md:p-10 shadow-sm
- Stars use color #F5A623 (gold) for review star ratings, #5B7FBF (brand blue) for testimonial stars
- All text: #1A1A1A for headings, #555555 for body copy`;
}

function buildUserPrompt(): string {
  return `Generate a complete Next.js 14 landing page component for this brief:

BRIEF:
${JSON.stringify(brief, null, 2)}

AVAILABLE IMAGES:
/images/heroes/toothbrush-macro.jpg — dramatic dark macro, best for: gum disease, fear-based
/images/editorial/gum-disease-bw.jpg — high contrast B&W, best for: pain/brutal truth section

Use CSS gradient fallback for hero: linear-gradient(135deg, #0a1628 0%, #1a2d5a 50%, #2d4a8a 100%)

KEY INSTRUCTIONS:
- Lead with the angle: "${angle}"
- Headline "${headline}" must appear as LARGE italic Playfair Display in the hero
- Write copy specifically for: ${brief.audience}
- Adapt the pain section bullets to match this angle

Generate the COMPLETE page.tsx now. Start immediately with "use client" or the import statements.`;
}

// ─── Run ─────────────────────────────────────────────────────────────────────

console.log(`\n🦷 Quick Generate — "${headline}"\n`);
console.log(`⏳ Calling Claude API...\n`);

const client = new Anthropic();
let code = "";

const stream = client.messages.stream({
  model: "claude-sonnet-4-20250514",
  max_tokens: 64000,
  system: buildSystemPrompt(),
  messages: [{ role: "user", content: buildUserPrompt() }],
});

stream.on("text", (delta) => {
  process.stdout.write(delta);
  code += delta;
});

await stream.finalMessage();

// Strip code fences
code = code.replace(/^```(?:tsx?|typescript|jsx?)?\n?/m, "").replace(/\n?```\s*$/m, "").trim();

// Save
const outputDir = path.join(process.cwd(), "app", "lp", slug);
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, "page.tsx"), code, "utf-8");

console.log(`\n\n✅ Done! app/lp/${slug}/page.tsx`);
console.log(`\n🚀 Push live:`);
console.log(`   git add . && git commit -m "Add ${slug}" && git push\n`);
