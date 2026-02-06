"use client";

import { Book } from "@/data/books";
import { SpecialCollection } from "@/data/collections";
import { DOMAIN_COLORS, CURRENCY_ICONS, ReadingStatus } from "@/lib/constants";
import { UserData } from "@/lib/store";

interface CollectionsPageProps {
  collections: SpecialCollection[];
  books: Book[];
  isDark: boolean;
  userData: UserData;
  onSelectBook: (book: Book) => void;
}

export default function CollectionsPage({
  collections,
  books,
  isDark,
  userData,
  onSelectBook,
}: CollectionsPageProps) {
  const findBook = (id: string) => books.find((b) => b.id === id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--text)" }}>
          🌟 Special Collections
        </h1>
        <p className="text-base" style={{ color: "var(--text-secondary)" }}>
          Curated groupings for specific goals and reading strategies
        </p>
      </div>

      <div className="space-y-12">
        {collections.map((collection) => (
          <section
            key={collection.id}
            className="rounded-2xl overflow-hidden"
            style={{
              backgroundColor: "var(--surface-raised)",
              border: "1px solid var(--border)",
            }}
          >
            {/* Collection Header */}
            <div className="p-6 sm:p-8" style={{ borderBottom: "1px solid var(--border)" }}>
              <div className="flex items-start gap-4">
                <span className="text-4xl">{collection.icon}</span>
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-2" style={{ color: "var(--text)" }}>
                    {collection.name}
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {collection.description}
                  </p>
                  {collection.estimatedReadingTime && (
                    <p className="text-xs mt-2" style={{ color: "var(--accent)" }}>
                      ⏱ Estimated: {collection.estimatedReadingTime}
                    </p>
                  )}
                  {collection.recommendedSequence && (
                    <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
                      📖 Sequence: {collection.recommendedSequence}
                    </p>
                  )}
                  {collection.recommendedFor && (
                    <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
                      👤 {collection.recommendedFor}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Books */}
            {collection.books && (
              <div className="p-4 sm:p-6 space-y-3">
                {collection.books.map((cb, idx) => {
                  const book = findBook(cb.bookId);
                  if (!book) return null;
                  const status =
                    (userData.books[book.id]?.status as ReadingStatus) || "Not Started";

                  return (
                    <article
                      key={cb.bookId}
                      className="flex items-start gap-4 p-4 rounded-xl cursor-pointer hover:opacity-90 transition-all"
                      style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
                      onClick={() => onSelectBook(book)}
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                        style={{
                          backgroundColor:
                            status === "Completed"
                              ? "var(--success-bg)"
                              : "var(--accent-bg)",
                          color:
                            status === "Completed" ? "var(--success)" : "var(--accent)",
                        }}
                      >
                        {status === "Completed" ? "✓" : idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm mb-0.5" style={{ color: "var(--text)" }}>
                          {book.title}
                        </h4>
                        <p className="text-xs mb-1" style={{ color: "var(--text-secondary)" }}>
                          {book.authors.join(", ")} · {book.year} ·{" "}
                          {CURRENCY_ICONS[book.currency]} {book.currency}
                        </p>
                        <p className="text-xs" style={{ color: "var(--text-content)" }}>
                          {cb.reason}
                        </p>
                      </div>
                      <div
                        className="px-2 py-0.5 rounded text-xs shrink-0"
                        style={{
                          color:
                            status === "Completed"
                              ? "var(--success)"
                              : status === "In Progress"
                              ? "var(--warning)"
                              : "var(--text-secondary)",
                        }}
                      >
                        {status}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {/* Pairings */}
            {collection.pairings && (
              <div className="p-4 sm:p-6 space-y-4">
                {collection.pairings.map((pairing, idx) => {
                  const classicBook = findBook(pairing.classicBookId);
                  const supplementBook = findBook(pairing.supplementBookId);

                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl"
                      style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Classic */}
                        <article
                          className="p-3 rounded-lg cursor-pointer hover:opacity-90 transition-all"
                          style={{
                            backgroundColor: "var(--surface-raised)",
                            border: "1px solid var(--border)",
                          }}
                          onClick={() => classicBook && onSelectBook(classicBook)}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm">📚</span>
                            <span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
                              TIMELESS CLASSIC
                            </span>
                          </div>
                          {classicBook && (
                            <>
                              <h4 className="font-semibold text-sm mb-1" style={{ color: "var(--text)" }}>
                                {classicBook.title}
                              </h4>
                              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                                {classicBook.authors.join(", ")} · {classicBook.year}
                              </p>
                            </>
                          )}
                          <p className="text-xs mt-2" style={{ color: "var(--text-content)" }}>
                            {pairing.classicWhyTimeless}
                          </p>
                        </article>

                        {/* Supplement */}
                        <article
                          className="p-3 rounded-lg cursor-pointer hover:opacity-90 transition-all"
                          style={{
                            backgroundColor: "var(--surface-raised)",
                            border: `1px solid #4A9EFF33`,
                          }}
                          onClick={() => supplementBook && onSelectBook(supplementBook)}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm">🔥</span>
                            <span className="text-xs font-semibold" style={{ color: "var(--accent)" }}>
                              AI-ERA SUPPLEMENT
                            </span>
                          </div>
                          {supplementBook && (
                            <>
                              <h4 className="font-semibold text-sm mb-1" style={{ color: "var(--text)" }}>
                                {supplementBook.title}
                              </h4>
                              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                                {supplementBook.authors.join(", ")} · {supplementBook.year}
                              </p>
                            </>
                          )}
                          <p className="text-xs mt-2" style={{ color: "var(--text-content)" }}>
                            {pairing.supplementWhatAdds}
                          </p>
                        </article>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
