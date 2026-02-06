"use client";

import { Book } from "@/data/books";
import { DOMAIN_COLORS, DOMAIN_LABELS, CATEGORIES, CURRENCY_ICONS } from "@/lib/constants";
import { UserData } from "@/lib/store";

interface HomePageProps {
  books: Book[];
  isDark: boolean;
  userData: UserData;
  onNavigate: (page: string) => void;
  onSelectBook: (book: Book) => void;
}

export default function HomePage({
  books,
  isDark,
  userData,
  onNavigate,
  onSelectBook,
}: HomePageProps) {
  const aiBooks = books.filter((b) => b.category === "AI-Era");
  const completedCount = Object.values(userData.books).filter(
    (b) => b.status === "Completed"
  ).length;
  const domainCount = new Set(books.map((b) => b.category)).size;
  const tier1Books = books.filter((b) => b.tier === 1);
  const bleedingEdge = books.filter((b) => b.currency === "Bleeding Edge");

  return (
    <div>
      {/* Hero */}
      <section
        aria-labelledby="hero-heading"
        className="relative overflow-hidden"
        style={{
          background: "var(--hero-gradient)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight"
              style={{ color: "var(--text)" }}
            >
              Your World-Class Business Library{" "}
              <span style={{ color: "var(--accent)" }}>for the AI Era</span>
            </h1>
            <p
              className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {books.length}+ expertly curated books spanning AI strategy,
              functional expertise, and timeless principles. Build comprehensive
              business acumen in 6-9 months.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 max-w-3xl mx-auto">
              <StatBox
                number={aiBooks.length}
                label="AI-Era Books"
                sublabel="2020-2025"
              />
              <StatBox
                number={books.length - aiBooks.length}
                label="Functional Classics"
                sublabel="9 Domains"
              />
              <StatBox
                number={4}
                label="Reading Pathways"
                sublabel="Structured"
              />
              <StatBox
                number={domainCount}
                label="Business Domains"
                sublabel="Covered"
              />
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate("browse")}
                className="px-8 py-3.5 rounded-xl font-semibold text-white transition-transform hover:scale-105"
                style={{ backgroundColor: "var(--accent)" }}
              >
                Explore the Library
              </button>
              <button
                onClick={() => onNavigate("pathways")}
                className="px-8 py-3.5 rounded-xl font-semibold transition-transform hover:scale-105"
                style={{
                  backgroundColor: "transparent",
                  color: "var(--accent)",
                  border: "2px solid var(--accent)",
                }}
              >
                Start a Reading Pathway
              </button>
            </div>
          </div>
        </div>

        {/* Decorative dots */}
        <div className="absolute top-10 right-10 w-40 h-40 opacity-10 rounded-full"
          style={{ background: "radial-gradient(circle, var(--accent), transparent)" }}
        />
        <div className="absolute bottom-10 left-10 w-32 h-32 opacity-10 rounded-full"
          style={{ background: "radial-gradient(circle, #9B6FFF, transparent)" }}
        />
      </section>

      {/* Bleeding Edge Section */}
      <section aria-labelledby="bleeding-edge-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 id="bleeding-edge-heading" className="text-2xl font-bold" style={{ color: "var(--text)" }}>
              🔥 Bleeding Edge ({bleedingEdge.length} books)
            </h2>
            <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
              Published 2024-2025 — The latest business insights
            </p>
          </div>
          <button
            onClick={() => onNavigate("browse")}
            className="text-sm font-medium"
            style={{ color: "var(--accent)" }}
          >
            View All →
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {bleedingEdge.slice(0, 4).map((book) => (
            <MiniBookCard key={book.id} book={book} onClick={() => onSelectBook(book)} />
          ))}
        </div>
      </section>

      {/* Tier 1 Essential */}
      <section aria-labelledby="tier1-heading" style={{ backgroundColor: "var(--surface)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 id="tier1-heading" className="text-2xl font-bold" style={{ color: "var(--text)" }}>
                ⭐ Tier 1 — Essential Reading ({tier1Books.length} books)
              </h2>
              <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                The must-read books in every domain
              </p>
            </div>
            <button
              onClick={() => onNavigate("browse")}
              className="text-sm font-medium"
              style={{ color: "var(--accent)" }}
            >
              View All →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {tier1Books.slice(0, 8).map((book) => (
              <MiniBookCard key={book.id} book={book} onClick={() => onSelectBook(book)} />
            ))}
          </div>
        </div>
      </section>

      {/* Domain Overview */}
      <section aria-labelledby="domain-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 id="domain-heading" className="text-2xl font-bold mb-8" style={{ color: "var(--text)" }}>
          📂 Browse by Domain
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => {
            const count = books.filter((b) => b.category === cat).length;
            const color = DOMAIN_COLORS[cat] || "#4A9EFF";
            return (
              <button
                key={cat}
                onClick={() => onNavigate("browse")}
                className="p-5 rounded-xl text-left transition-transform hover:scale-105"
                style={{
                  backgroundColor: "var(--surface-raised)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-lg"
                  style={{ backgroundColor: color + "22", color }}
                >
                  {cat === "AI-Era" ? "🤖" : cat === "HR" ? "👥" : cat === "Marketing" ? "📣" : cat === "Sales" ? "💰" : cat === "Product Management" ? "🚀" : cat === "Corporate Finance" ? "💼" : cat === "Leadership" ? "👑" : cat === "Negotiation" ? "🤝" : cat === "Communication" ? "💬" : "📋"}
                </div>
                <h3 className="font-semibold text-sm mb-1" style={{ color: "var(--text)" }}>
                  {DOMAIN_LABELS[cat] || cat}
                </h3>
                <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                  {count} books
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Quick Start Pathways */}
      <section aria-labelledby="pathways-heading" style={{ backgroundColor: "var(--surface)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 id="pathways-heading" className="text-2xl font-bold mb-2" style={{ color: "var(--text)" }}>
            🎯 Reading Pathways
          </h2>
          <p className="text-sm mb-8" style={{ color: "var(--text-secondary)" }}>
            Structured reading programs for different goals
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: "🧰",
                name: "Consultant's Toolkit",
                duration: "6-9 months",
                desc: "Build comprehensive consulting capabilities across all major business functions.",
              },
              {
                icon: "🤖",
                name: "AI-First Business Leader",
                duration: "3 months",
                desc: "Master AI-era business strategy while building traditional foundations.",
              },
              {
                icon: "⚡",
                name: "Executive Well-Rounded",
                duration: "3 months",
                desc: "Fast-track to comprehensive business knowledge. 2 books per week.",
              },
              {
                icon: "🎯",
                name: "Product Management Expert",
                duration: "3-6 months",
                desc: "Deep product expertise plus complementary leadership and commercial skills.",
              },
            ].map((pathway) => (
              <button
                key={pathway.name}
                onClick={() => onNavigate("pathways")}
                className="p-6 rounded-xl text-left transition-transform hover:scale-[1.02]"
                style={{
                  backgroundColor: "var(--surface-raised)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{pathway.icon}</span>
                  <div>
                    <h3 className="font-bold mb-1" style={{ color: "var(--text)" }}>
                      {pathway.name}
                    </h3>
                    <p className="text-xs font-medium mb-2" style={{ color: "var(--accent)" }}>
                      {pathway.duration}
                    </p>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      {pathway.desc}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Your Progress */}
      {completedCount > 0 && (
        <section aria-labelledby="progress-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div
            className="p-8 rounded-2xl text-center"
            style={{
              backgroundColor: "var(--surface-raised)",
              border: "1px solid var(--border)",
            }}
          >
            <p className="text-4xl mb-3">📊</p>
            <h3 id="progress-heading" className="text-xl font-bold mb-1" style={{ color: "var(--text)" }}>
              You&apos;ve completed {completedCount} book{completedCount !== 1 ? "s" : ""}!
            </h3>
            <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
              Keep up the momentum — track your full progress
            </p>
            <button
              onClick={() => onNavigate("progress")}
              className="px-6 py-2.5 rounded-lg font-medium text-white"
              style={{ backgroundColor: "var(--accent)" }}
            >
              View My Progress
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

function StatBox({
  number,
  label,
  sublabel,
}: {
  number: number;
  label: string;
  sublabel: string;
}) {
  return (
    <div
      className="p-4 rounded-xl text-center"
      style={{ backgroundColor: "var(--surface-raised)", border: "1px solid var(--border)" }}
    >
      <p className="text-3xl font-extrabold" style={{ color: "var(--accent)" }}>
        {number}
      </p>
      <p
        className="text-sm font-medium"
        style={{ color: "var(--text)" }}
      >
        {label}
      </p>
      <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
        {sublabel}
      </p>
    </div>
  );
}

function MiniBookCard({
  book,
  onClick,
}: {
  book: Book;
  onClick: () => void;
}) {
  const domainColor = DOMAIN_COLORS[book.category] || "#4A9EFF";
  return (
    <article
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } }}
      className="text-left p-4 rounded-xl transition-all hover:scale-[1.02] hover:shadow-lg cursor-pointer"
      role="button"
      tabIndex={0}
      style={{
        backgroundColor: "var(--surface-raised)",
        border: "1px solid var(--border)",
      }}
    >
      <div className="h-1 rounded-full mb-3" style={{ backgroundColor: domainColor }} />
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-bold px-1.5 py-0.5 rounded"
          style={{ backgroundColor: "#FFD70022", color: "var(--star)" }}>
          T{book.tier}
        </span>
        <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
          {CURRENCY_ICONS[book.currency]} {book.year}
        </span>
      </div>
      <h4
        className="font-bold text-sm leading-snug mb-1 line-clamp-2"
        style={{ color: "var(--text)" }}
      >
        {book.title}
      </h4>
      <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
        {book.authors.join(", ")}
      </p>
    </article>
  );
}
