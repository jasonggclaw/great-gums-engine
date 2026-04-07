import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";
import { config as dotenvConfig } from "dotenv";
import { brand } from "./config/brand.js";

// Load .env.local first, then .env as fallback
const envLocalPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  dotenvConfig({ path: envLocalPath, override: false });
} else {
  dotenvConfig();
}

// ─── Types ──────────────────────────────────────────────────────────────────

interface Testimonial {
  name: string;
  quote: string;
  role: string;
}

interface Brief {
  slug: string;
  headline: string;
  subheadline: string;
  cta: string;
  audience: string;
  adAngle: string;
  heroStyle: string;
  colorScheme: string;
  testimonials: Testimonial[];
}

interface ImageEntry {
  file: string;
  tags: string[];
  mood: string;
  style: string;
  bestFor: string[];
}

interface ImagesRegistry {
  images: ImageEntry[];
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function generate(slug: string) {
  console.log(`\n🦷 Great Gums Generator — slug: "${slug}"\n`);

  // 1. Read brief
  const briefPath = path.join(process.cwd(), "briefs", `${slug}.json`);
  if (!fs.existsSync(briefPath)) {
    console.error(`❌ No brief found at: briefs/${slug}.json`);
    console.error(`   Create a brief JSON file first.`);
    process.exit(1);
  }
  const brief: Brief = JSON.parse(fs.readFileSync(briefPath, "utf-8"));
  console.log(`✅ Brief loaded: "${brief.headline}"`);

  // 2. Read images registry
  const imagesPath = path.join(process.cwd(), "assets", "images.json");
  const imagesRegistry: ImagesRegistry = JSON.parse(
    fs.readFileSync(imagesPath, "utf-8")
  );
  console.log(`✅ Images registry loaded: ${imagesRegistry.images.length} images`);

  // 3. Call Claude API
  console.log(`\n⏳ Calling Claude API (streaming)...\n`);
  const client = new Anthropic();

  const systemPrompt = buildSystemPrompt();
  const userPrompt = buildUserPrompt(brief, imagesRegistry);

  let generatedCode = "";

  const stream = client.messages.stream({
    model: "claude-sonnet-4-20250514",
    max_tokens: 64000,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  });

  // Stream output to console
  stream.on("text", (delta) => {
    process.stdout.write(delta);
    generatedCode += delta;
  });

  await stream.finalMessage();
  console.log("\n");

  // 4. Strip markdown code fences if present
  generatedCode = stripCodeFences(generatedCode);

  // 5. Save output
  const outputDir = path.join(process.cwd(), "app", "lp", slug);
  fs.mkdirSync(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, "page.tsx");
  fs.writeFileSync(outputPath, generatedCode, "utf-8");

  console.log(`\n✅ Page saved to: app/lp/${slug}/page.tsx`);
  console.log(`\n📋 Next steps:`);
  console.log(`   1. git add app/lp/${slug}/page.tsx`);
  console.log(`   2. git commit -m "Add landing page: ${slug}"`);
  console.log(`   3. git push   →  Vercel auto-deploys`);
  console.log(`   4. Preview: http://localhost:3000/lp/${slug}\n`);
}

// ─── Prompt Builders ────────────────────────────────────────────────────────

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

function buildUserPrompt(brief: Brief, images: ImagesRegistry): string {
  const heroImage = pickBestImage(brief, images, "hero");
  const editorialImage = pickBestImage(brief, images, "editorial");

  return `Generate a complete Next.js 14 landing page component for this brief:

BRIEF:
${JSON.stringify(brief, null, 2)}

SELECTED IMAGES:
- Hero image: /images/${heroImage?.file ?? "heroes/hero-placeholder.jpg"}
  (Use this as the hero background. If file may not exist, use CSS gradient: linear-gradient(135deg, #0a1628 0%, #1a2d5a 50%, #2d4a8a 100%) as fallback)

- Editorial/pain image: /images/${editorialImage?.file ?? "editorial/editorial-placeholder.jpg"}
  (Use in the pain/brutal truth section)

IMAGE SELECTION RATIONALE:
- Hero selected because it matches heroStyle: "${brief.heroStyle}" and adAngle: "${brief.adAngle}"
- Editorial selected for its ${editorialImage?.mood ?? "impactful"} mood fitting the pain section

BRIEF-SPECIFIC INSTRUCTIONS:
- Audience: ${brief.audience} — write copy that speaks directly to this person
- Ad angle: "${brief.adAngle}" — lead with this pain point in the hero and pain section
- The headline "${brief.headline}" should appear as LARGE italic Playfair Display in the hero
- The product line "${brief.subheadline}" — "ONLY" and "BIOELECTRIC" should be visually bold/underlined
- CTA button text: "${brief.cta}"
- Color scheme: ${brief.colorScheme}

Generate the COMPLETE page.tsx file now. Start immediately with "use client" or the import statements.`;
}

// ─── Image Picker ────────────────────────────────────────────────────────────

function pickBestImage(
  brief: Brief,
  registry: ImagesRegistry,
  style: string
): ImageEntry | null {
  const styleImages = registry.images.filter((img) => img.style === style);
  if (styleImages.length === 0) return null;

  // Score each image based on match with brief
  const scored = styleImages.map((img) => {
    let score = 0;
    const searchTerms = [
      brief.heroStyle,
      brief.adAngle,
      brief.colorScheme,
      ...brief.adAngle.toLowerCase().split(/\s+/),
    ].map((t) => t.toLowerCase());

    for (const term of searchTerms) {
      if (img.tags.some((tag) => tag.toLowerCase().includes(term))) score += 2;
      if (img.bestFor.some((b) => b.toLowerCase().includes(term))) score += 3;
      if (img.mood.toLowerCase().includes(term)) score += 1;
    }

    // Bonus for dramatic hero
    if (brief.heroStyle === "dramatic" && img.tags.includes("dark-background")) score += 5;

    return { img, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0]?.img ?? null;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function stripCodeFences(code: string): string {
  // Remove ```tsx, ```typescript, ``` fences if present
  return code
    .replace(/^```(?:tsx?|typescript|jsx?|javascript)?\n?/m, "")
    .replace(/\n?```\s*$/m, "")
    .trim();
}

// ─── CLI Entry ───────────────────────────────────────────────────────────────

const slug = process.argv[2];

if (!slug) {
  console.error("Usage: npx tsx generate.ts <slug>");
  console.error("Example: npx tsx generate.ts gum-disease-adults");
  process.exit(1);
}

generate(slug).catch((err) => {
  console.error("❌ Generation failed:", err.message);
  process.exit(1);
});
