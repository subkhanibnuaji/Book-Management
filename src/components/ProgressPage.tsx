"use client";

import { Book } from "@/data/books";
import { ReadingPathway } from "@/data/pathways";
import { CATEGORIES, DOMAIN_COLORS, DOMAIN_LABELS, ReadingStatus } from "@/lib/constants";
import { UserData, exportToCSV } from "@/lib/store";

interface ProgressPageProps {
  books: Book[];
  pathways: ReadingPathway[];
  isDark: boolean;
  userData: UserData;
  onSelectBook: (book: Book) => void;
  onNavigate: (page: string) => void;
}

export default function ProgressPage({
  books,
  pathways,
  isDark,
  userData,
  onSelectBook,
  onNavigate,
}: ProgressPageProps) {
  const completedBooks = books.filter(
    (b) => userData.books[b.id]?.status === "Completed"
  );
  const inProgressBooks = books.filter(
    (b) => userData.books[b.id]?.status === "In Progress"
  );
  const totalTracked = Object.keys(userData.books).length;

  // Domain stats
  const domainStats = CATEGORIES.map((cat) => {
    const domainBooks = books.filter((b) => b.category === cat);
    const completed = domainBooks.filter(
      (b) => userData.books[b.id]?.status === "Completed"
    ).length;
    return {
      category: cat,
      total: domainBooks.length,
      completed,
      pct: domainBooks.length > 0 ? (completed / domainBooks.length) * 100 : 0,
    };
  });

  // Tier stats
  const tierStats = [1, 2, 3].map((tier) => {
    const tierBooks = books.filter((b) => b.tier === tier);
    const completed = tierBooks.filter(
      (b) => userData.books[b.id]?.status === "Completed"
    ).length;
    return {
      tier,
      total: tierBooks.length,
      completed,
      pct: tierBooks.length > 0 ? (completed / tierBooks.length) * 100 : 0,
    };
  });

  // Active pathway
  const activePathway = pathways.find((p) => p.id === userData.activePathway);
  const pathwayProgress = activePathway
    ? (() => {
        const allIds = activePathway.phases.flatMap((p) =>
          p.books.map((b) => b.bookId)
        );
        const completed = allIds.filter(
          (id) => userData.books[id]?.status === "Completed"
        ).length;
        return { completed, total: allIds.length };
      })()
    : null;

  // Recent completions
  const recentCompleted = completedBooks
    .filter((b) => userData.books[b.id]?.finishDate)
    .sort((a, b) => {
      const dateA = userData.books[a.id]?.finishDate || "";
      const dateB = userData.books[b.id]?.finishDate || "";
      return dateB.localeCompare(dateA);
    })
    .slice(0, 5);

  const handleExport = () => {
    const csv = exportToCSV(books, userData);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ibnu-library-progress.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const overallPct =
    books.length > 0 ? (completedBooks.length / books.length) * 100 : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--text)" }}>
            📊 My Progress
          </h1>
          <p className="text-base" style={{ color: "var(--text-secondary)" }}>
            Track your reading journey across the library
          </p>
        </div>
        <button
          onClick={handleExport}
          className="px-4 py-2 rounded-lg text-sm font-medium"
          style={{
            backgroundColor: "var(--surface-raised)",
            color: "var(--text)",
            border: "1px solid var(--border)",
          }}
        >
          📥 Export CSV
        </button>
      </div>

      {/* Overview Stats */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <StatCard
          number={completedBooks.length}
          label="Completed"
          color="var(--success)"
        />
        <StatCard
          number={inProgressBooks.length}
          label="In Progress"
          color="var(--warning)"
        />
        <StatCard
          number={books.length - totalTracked + Object.values(userData.books).filter(b => b.status === "Not Started").length}
          label="Not Started"
          color="var(--text-secondary)"
        />
        <StatCard
          number={books.length}
          label="Total Library"
          color="var(--accent)"
        />
      </section>

      {/* Overall Progress */}
      <section
        className="p-6 rounded-2xl mb-10"
        style={{ backgroundColor: "var(--surface-raised)", border: "1px solid var(--border)" }}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold" style={{ color: "var(--text)" }}>
            Overall Progress
          </h3>
          <span className="text-sm font-medium" style={{ color: "var(--accent)" }}>
            {Math.round(overallPct)}%
          </span>
        </div>
        <div className="h-4 rounded-full overflow-hidden" style={{ backgroundColor: "var(--surface)" }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${overallPct}%`, backgroundColor: "var(--accent)" }}
          />
        </div>
        <p className="text-xs mt-2" style={{ color: "var(--text-secondary)" }}>
          {completedBooks.length} of {books.length} books completed
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Domain Progress */}
        <section
          className="p-6 rounded-2xl"
          style={{ backgroundColor: "var(--surface-raised)", border: "1px solid var(--border)" }}
        >
          <h3 className="font-bold mb-4" style={{ color: "var(--text)" }}>
            Progress by Domain
          </h3>
          <div className="space-y-4">
            {domainStats.map((ds) => (
              <div key={ds.category}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
                    {DOMAIN_LABELS[ds.category] || ds.category}
                  </span>
                  <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    {ds.completed}/{ds.total}
                  </span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "var(--surface)" }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${ds.pct}%`,
                      backgroundColor: DOMAIN_COLORS[ds.category] || "var(--accent)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tier Progress */}
        <div className="space-y-8">
          <section
            className="p-6 rounded-2xl"
            style={{ backgroundColor: "var(--surface-raised)", border: "1px solid var(--border)" }}
          >
            <h3 className="font-bold mb-4" style={{ color: "var(--text)" }}>
              Progress by Tier
            </h3>
            <div className="space-y-4">
              {tierStats.map((ts) => (
                <div key={ts.tier}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
                      Tier {ts.tier} — {["", "Essential", "Recommended", "Specialized"][ts.tier]}
                    </span>
                    <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                      {ts.completed}/{ts.total}
                    </span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "var(--surface)" }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${ts.pct}%`,
                        backgroundColor: ["", "#FFD700", "#C0C0C0", "#CD7F32"][ts.tier],
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Active Pathway */}
          {activePathway && pathwayProgress && (
            <section
              className="p-6 rounded-2xl"
              style={{ backgroundColor: "var(--surface-raised)", border: "1px solid var(--border)" }}
            >
              <h3 className="font-bold mb-2" style={{ color: "var(--text)" }}>
                Active Pathway
              </h3>
              <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
                {activePathway.icon} {activePathway.name}
              </p>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                  {pathwayProgress.completed}/{pathwayProgress.total} books
                </span>
                <span className="text-xs font-medium" style={{ color: "var(--accent)" }}>
                  {Math.round(
                    (pathwayProgress.completed / pathwayProgress.total) * 100
                  )}
                  %
                </span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "var(--surface)" }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${
                      (pathwayProgress.completed / pathwayProgress.total) * 100
                    }%`,
                    backgroundColor: "var(--accent)",
                  }}
                />
              </div>
              <button
                onClick={() => onNavigate("pathways")}
                className="mt-3 text-xs font-medium"
                style={{ color: "var(--accent)" }}
              >
                View Pathway Details →
              </button>
            </section>
          )}
        </div>
      </div>

      {/* Currently Reading */}
      {inProgressBooks.length > 0 && (
        <section className="mt-10">
          <h3 className="text-xl font-bold mb-4" style={{ color: "var(--text)" }}>
            📖 Currently Reading
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {inProgressBooks.map((book) => (
              <article
                key={book.id}
                className="p-4 rounded-xl cursor-pointer hover:opacity-90 transition-all"
                style={{
                  backgroundColor: "var(--surface-raised)",
                  border: "1px solid var(--border)",
                }}
                onClick={() => onSelectBook(book)}
              >
                <div
                  className="h-1 rounded-full mb-3"
                  style={{ backgroundColor: DOMAIN_COLORS[book.category] || "var(--accent)" }}
                />
                <h4 className="font-semibold text-sm mb-1" style={{ color: "var(--text)" }}>
                  {book.title}
                </h4>
                <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                  {book.authors.join(", ")} · Started{" "}
                  {userData.books[book.id]?.startDate || "recently"}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Recently Completed */}
      {recentCompleted.length > 0 && (
        <section className="mt-10">
          <h3 className="text-xl font-bold mb-4" style={{ color: "var(--text)" }}>
            ✅ Recently Completed
          </h3>
          <div className="space-y-2">
            {recentCompleted.map((book) => (
              <article
                key={book.id}
                className="flex items-center gap-4 p-3 rounded-xl cursor-pointer hover:opacity-90"
                style={{
                  backgroundColor: "var(--surface-raised)",
                  border: "1px solid var(--border)",
                }}
                onClick={() => onSelectBook(book)}
              >
                <span className="text-lg">✅</span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm truncate" style={{ color: "var(--text)" }}>
                    {book.title}
                  </h4>
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    {book.authors.join(", ")}
                  </p>
                </div>
                <span className="text-xs shrink-0" style={{ color: "var(--text-secondary)" }}>
                  {userData.books[book.id]?.finishDate}
                </span>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {completedBooks.length === 0 && inProgressBooks.length === 0 && (
        <section
          className="text-center py-16 rounded-2xl mt-10"
          style={{ backgroundColor: "var(--surface-raised)", border: "1px solid var(--border)" }}
        >
          <p className="text-5xl mb-4">📚</p>
          <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text)" }}>
            Start Your Reading Journey
          </h3>
          <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: "var(--text-secondary)" }}>
            Browse the library and start marking books as &quot;In Progress&quot; or
            &quot;Completed&quot; to track your progress here.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onNavigate("browse")}
              className="px-6 py-2.5 rounded-lg font-medium text-white"
              style={{ backgroundColor: "var(--accent)" }}
            >
              Browse Library
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
              Start a Pathway
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

function StatCard({
  number,
  label,
  color,
}: {
  number: number;
  label: string;
  color: string;
}) {
  return (
    <div
      className="p-5 rounded-xl text-center"
      style={{ backgroundColor: "var(--surface-raised)", border: "1px solid var(--border)" }}
    >
      <p className="text-3xl font-extrabold mb-1" style={{ color }}>
        {number}
      </p>
      <p
        className="text-xs font-medium"
        style={{ color: "var(--text-secondary)" }}
      >
        {label}
      </p>
    </div>
  );
}
