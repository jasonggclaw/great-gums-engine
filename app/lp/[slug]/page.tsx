// This is the fallback page for slugs that have not yet been generated.
// Once you run `npx tsx generate.ts [slug]`, a specific page.tsx will be
// created at app/lp/[slug]/page.tsx and Next.js will serve that instead.

export default function FallbackPage({ params }: { params: { slug: string } }) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center max-w-md mx-auto px-6">
        <h1
          className="text-3xl font-bold mb-4"
          style={{ color: "#5B7FBF", fontFamily: "var(--font-playfair)" }}
        >
          Page Not Generated Yet
        </h1>
        <p className="text-gray-600 mb-6">
          No landing page exists for <strong>{params.slug}</strong>.
        </p>
        <p className="text-gray-500 text-sm mb-4">Run the following to generate it:</p>
        <code className="bg-gray-100 px-4 py-2 rounded text-sm font-mono block">
          npx tsx generate.ts {params.slug}
        </code>
        <p className="text-gray-400 text-xs mt-4">
          Make sure a brief exists at{" "}
          <code className="text-xs">briefs/{params.slug}.json</code>
        </p>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  return [];
}
