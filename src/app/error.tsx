"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main
      role="alert"
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="text-center max-w-md">
        <p className="text-5xl mb-4">⚠️</p>
        <h1
          className="text-2xl font-bold mb-2"
          style={{ color: "var(--text)" }}
        >
          Something went wrong
        </h1>
        <p
          className="text-sm mb-6 leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {error.message || "An unexpected error occurred while loading the library."}
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 rounded-xl font-semibold text-white transition-transform hover:scale-105"
          style={{ backgroundColor: "var(--accent)" }}
        >
          Try Again
        </button>
      </div>
    </main>
  );
}
