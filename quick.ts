/**
 * Quick generation — no brief file needed.
 *
 * Usage:
 *   npx tsx quick.ts <slug> "<headline>" "<angle>"
 *
 * Example:
 *   npx tsx quick.ts whitening-women "Your Smile Is the First Thing People Notice" "embarrassment: yellow teeth making you hide your smile"
 */

import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";
import { config as dotenvConfig } from "dotenv";
import { systemPrompt, userPrompt, MODEL } from "./config/prompt.js";

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

// Save brief for future editing
const briefPath = path.join(process.cwd(), "briefs", `${slug}.json`);
if (!fs.existsSync(briefPath)) {
  fs.writeFileSync(briefPath, JSON.stringify(brief, null, 2), "utf-8");
  console.log(`📄 Brief saved to briefs/${slug}.json`);
}

// ─── Generate ────────────────────────────────────────────────────────────────

console.log(`\n🦷 Quick Generate — "${headline}"\n`);
console.log(`⏳ Generating with ${MODEL}...\n`);

const client = new Anthropic();
let code = "";

const stream = client.messages.stream({
  model: MODEL,
  max_tokens: 64000,
  thinking: { type: "adaptive" },
  system: systemPrompt(),
  messages: [{
    role: "user",
    content: userPrompt(
      brief,
      "/images/heroes/toothbrush-macro.jpg",
      "/images/editorial/gum-disease-bw.jpg"
    ),
  }],
});

stream.on("text", (delta) => {
  process.stdout.write(delta);
  code += delta;
});

await stream.finalMessage();

code = code.replace(/^```(?:tsx?|typescript|jsx?)?\n?/m, "").replace(/\n?```\s*$/m, "").trim();

const outDir = path.join(process.cwd(), "app", "lp", slug);
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "page.tsx"), code, "utf-8");

console.log(`\n\n✅ Done! app/lp/${slug}/page.tsx`);
console.log(`\n🚀 Push live:`);
console.log(`   git add . && git commit -m "Add ${slug}" && git push\n`);
