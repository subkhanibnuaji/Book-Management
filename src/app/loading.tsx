export default function Loading() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      {/* Navigation skeleton */}
      <div
        className="h-16 border-b"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--surface-raised)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-full gap-4">
          <div className="skeleton h-8 w-8 rounded-lg" />
          <div className="skeleton h-5 w-32 hidden sm:block" />
          <div className="flex-1" />
          <div className="hidden md:flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton h-8 w-20 rounded-lg" />
            ))}
          </div>
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="skeleton h-12 w-3/4 mx-auto mb-4" />
        <div className="skeleton h-6 w-1/2 mx-auto mb-8" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton h-24 rounded-xl" />
          ))}
        </div>
        <div className="flex gap-4 justify-center">
          <div className="skeleton h-12 w-40 rounded-xl" />
          <div className="skeleton h-12 w-48 rounded-xl" />
        </div>
      </div>

      {/* Book cards skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="skeleton h-8 w-64 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="skeleton h-48 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
