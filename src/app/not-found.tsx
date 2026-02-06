export default function NotFound() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="text-center max-w-md">
        <p className="text-5xl mb-4">📚</p>
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: "var(--text)" }}
        >
          Page Not Found
        </h1>
        <p
          className="text-sm mb-6 leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          The page you&apos;re looking for doesn&apos;t exist. Head back to the library
          to explore our collection.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 rounded-xl font-semibold text-white transition-transform hover:scale-105"
          style={{ backgroundColor: "var(--accent)" }}
        >
          Back to Library
        </a>
      </div>
    </main>
  );
}
