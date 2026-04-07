import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";
import { config as dotenvConfig } from "dotenv";
import { systemPrompt, userPrompt, MODEL } from "./config/prompt.js";

// Load .env.local first, then .env as fallback
const envLocalPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  dotenvConfig({ path: envLocalPath, override: false });
} else {
  dotenvConfig();
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface ImageEntry {
  file: string;
  tags: string[];
  mood: string;
  style: string;
  bestFor: string[];
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
  testimonials: { name: string; quote: string; role: string }[];
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function generate(slug: string) {
  console.log(`\n🦷 Great Gums Generator — slug: "${slug}"\n`);

  // 1. Read brief
  const briefPath = path.join(process.cwd(), "briefs", `${slug}.json`);
  if (!fs.existsSync(briefPath)) {
    console.error(`❌ No brief found at: briefs/${slug}.json`);
    process.exit(1);
  }
  const brief: Brief = JSON.parse(fs.readFileSync(briefPath, "utf-8"));
  console.log(`✅ Brief: "${brief.headline}"`);

  // 2. Pick images
  const registry = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "assets", "images.json"), "utf-8")
  );
  const heroImg = pickBestImage(brief, registry.images, "hero");
  const editImg = pickBestImage(brief, registry.images, "editorial");
  const heroPath = `/images/${heroImg?.file ?? "heroes/toothbrush-macro.jpg"}`;
  const editPath = `/images/${editImg?.file ?? "editorial/gum-disease-bw.jpg"}`;
  console.log(`✅ Hero image: ${heroPath}`);
  console.log(`✅ Editorial image: ${editPath}`);

  // 3. Call Claude
  console.log(`\n⏳ Generating with ${MODEL} (streaming)...\n`);
  const client = new Anthropic();
  let code = "";

  const stream = client.messages.stream({
    model: MODEL,
    max_tokens: 64000,
    thinking: { type: "adaptive" },
    system: systemPrompt(),
    messages: [{ role: "user", content: userPrompt(brief, heroPath, editPath) }],
  });

  stream.on("text", (delta) => {
    process.stdout.write(delta);
    code += delta;
  });

  await stream.finalMessage();
  console.log("\n");

  // 4. Save
  code = stripFences(code);
  const outDir = path.join(process.cwd(), "app", "lp", slug);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "page.tsx"), code, "utf-8");

  console.log(`✅ Saved: app/lp/${slug}/page.tsx`);
  console.log(`\n🚀 Go live:`);
  console.log(`   git add . && git commit -m "Add ${slug}" && git push\n`);
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function pickBestImage(brief: Brief, images: ImageEntry[], style: string): ImageEntry | null {
  const pool = images.filter((img) => img.style === style);
  if (!pool.length) return null;

  const terms = [brief.heroStyle, brief.adAngle, brief.colorScheme]
    .join(" ")
    .toLowerCase()
    .split(/\s+/);

  const scored = pool.map((img) => {
    let score = 0;
    for (const t of terms) {
      if (img.tags.some((tag) => tag.includes(t))) score += 2;
      if (img.bestFor.some((b) => b.includes(t))) score += 3;
      if (img.mood.includes(t)) score += 1;
    }
    if (brief.heroStyle === "dramatic" && img.tags.includes("dark-background")) score += 5;
    return { img, score };
  });

  return scored.sort((a, b) => b.score - a.score)[0].img;
}

function stripFences(code: string): string {
  return code
    .replace(/^```(?:tsx?|typescript|jsx?)?\n?/m, "")
    .replace(/\n?```\s*$/m, "")
    .trim();
}

// ─── CLI ─────────────────────────────────────────────────────────────────────

const slug = process.argv[2];
if (!slug) {
  console.error("Usage: npx tsx generate.ts <slug>");
  process.exit(1);
}

generate(slug).catch((err) => {
  console.error("❌ Failed:", err.message);
  process.exit(1);
});
