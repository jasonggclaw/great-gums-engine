export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1
          className="text-4xl font-bold mb-4"
          style={{ color: "#5B7FBF", fontFamily: "var(--font-playfair)" }}
        >
          Great Gums Landing Engine
        </h1>
        <p className="text-gray-600 mb-8">
          Generate landing pages by running:
        </p>
        <code className="bg-gray-100 px-4 py-2 rounded text-sm font-mono block">
          npx tsx generate.ts [slug]
        </code>
        <p className="text-gray-400 text-sm mt-4">
          Pages are served at <strong>/lp/[slug]</strong>
        </p>
      </div>
    </main>
  );
}
