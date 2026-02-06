"use client";

interface AboutPageProps {
  isDark: boolean;
  bookCount: number;
  onNavigate: (page: string) => void;
}

export default function AboutPage({ isDark, bookCount, onNavigate }: AboutPageProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-4" style={{ color: "var(--text)" }}>
          About This Library
        </h1>
      </div>

      <article className="prose-like space-y-8">
        {/* Why */}
        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: "var(--text)" }}>
            Why This Library Exists
          </h2>
          <div className="space-y-4 text-sm leading-relaxed" style={{ color: "var(--text-content)" }}>
            <p>
              Most business book recommendations were published before 2020 — before
              ChatGPT, before widespread AI adoption, before the fundamental shift in
              how business works.
            </p>
            <p>
              I&apos;m Ibnu, a consultant and business professional from Indonesia. I built
              this library to solve a problem I kept encountering:{" "}
              <strong style={{ color: "var(--text)" }}>
                how do you build comprehensive business expertise that&apos;s relevant for
                the AI era?
              </strong>
            </p>
            <p>This library is my answer. It combines two essential elements:</p>
          </div>
        </section>

        {/* Two Elements */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            className="p-5 rounded-xl"
            style={{ backgroundColor: "var(--surface-raised)", border: "1px solid var(--border)" }}
          >
            <div className="text-2xl mb-2">🤖</div>
            <h3 className="font-bold mb-2" style={{ color: "var(--text)" }}>
              1. AI-Era Strategy (2020-2025)
            </h3>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              15 bleeding-edge books specifically addressing how AI changes business
              strategy, transformation, leadership, and business models. Written by AI
              leaders, researchers, and practitioners who understand the post-ChatGPT
              reality.
            </p>
          </div>
          <div
            className="p-5 rounded-xl"
            style={{ backgroundColor: "var(--surface-raised)", border: "1px solid var(--border)" }}
          >
            <div className="text-2xl mb-2">📚</div>
            <h3 className="font-bold mb-2" style={{ color: "var(--text)" }}>
              2. Comprehensive Functional Expertise
            </h3>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              {bookCount - 15}+ world-class books across 9 functional domains — from HR
              to finance to product management. Each book verified for authority,
              relevance, and practical applicability.
            </p>
          </div>
        </div>

        {/* Result */}
        <section
          className="p-6 rounded-xl"
          style={{
            backgroundColor: "var(--accent-bg)",
            border: "1px solid var(--accent-bg)",
          }}
        >
          <h3 className="font-bold mb-2" style={{ color: "var(--accent)" }}>
            The Result
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-content)" }}>
            A complete business education that prepares you for both enduring
            principles AND AI-era disruption. Whether you&apos;re a consultant building
            broad expertise, a functional leader going deep in your domain, or an
            executive needing comprehensive knowledge fast — there&apos;s a pathway for
            you.
          </p>
        </section>

        {/* How to Use */}
        <section>
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text)" }}>
            How to Use This Library
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                icon: "📚",
                title: "Browse by Domain",
                desc: "Find books in your area of interest across 9 functional domains",
              },
              {
                icon: "🎯",
                title: "Follow a Reading Pathway",
                desc: "Structured 3-9 month programs for different professional goals",
              },
              {
                icon: "📈",
                title: "Track Your Progress",
                desc: "Mark books as read and monitor your development over time",
              },
              {
                icon: "🔗",
                title: "See Connections",
                desc: "Discover how books integrate and complement each other across domains",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-4 rounded-xl"
                style={{ backgroundColor: "var(--surface-raised)", border: "1px solid var(--border)" }}
              >
                <span className="text-xl">{item.icon}</span>
                <h4 className="font-semibold text-sm mt-2 mb-1" style={{ color: "var(--text)" }}>
                  {item.title}
                </h4>
                <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Curation */}
        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: "var(--text)" }}>
            Curation Methodology
          </h2>
          <div className="text-sm leading-relaxed space-y-3" style={{ color: "var(--text-content)" }}>
            <p>
              Every book has been personally researched and verified. Every
              recommendation comes with context: why it&apos;s world-class, who it&apos;s best
              for, what its limitations are, and how it connects to other books.
            </p>
            <p>
              Books are classified using a <strong style={{ color: "var(--text)" }}>3-tier system</strong>:
            </p>
            <ul className="space-y-2 ml-4">
              <li>
                <strong style={{ color: "#FFD700" }}>Tier 1 — Essential:</strong> Must-read
                books in their domain. Start here.
              </li>
              <li>
                <strong style={{ color: "#C0C0C0" }}>Tier 2 — Recommended:</strong> Important
                books that deepen understanding. Read after Tier 1.
              </li>
              <li>
                <strong style={{ color: "#CD7F32" }}>Tier 3 — Specialized:</strong> Advanced
                or niche books for deep specialization.
              </li>
            </ul>
          </div>
        </section>

        {/* Sign off */}
        <section className="pt-4" style={{ borderTop: "1px solid var(--border)" }}>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Start exploring. Build world-class expertise.
          </p>
          <p className="text-sm font-semibold mt-2" style={{ color: "var(--text)" }}>
            — Ibnu
          </p>
          <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
            January 2026
          </p>
        </section>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            onClick={() => onNavigate("browse")}
            className="px-6 py-2.5 rounded-lg font-medium text-white"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Browse All Books
          </button>
          <button
            onClick={() => onNavigate("pathways")}
            className="px-6 py-2.5 rounded-lg font-medium"
            style={{
              color: "var(--accent)",
              border: "2px solid var(--accent)",
              backgroundColor: "transparent",
            }}
          >
            View Reading Pathways
          </button>
        </div>
      </article>
    </div>
  );
}
