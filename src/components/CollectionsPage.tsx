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
  const text = isDark ? "#E7E9EA" : "#0F1419";
  const muted = isDark ? "#71767B" : "#536471";
  const surface = isDark ? "#192734" : "#FFFFFF";
  const border = isDark ? "#2F3336" : "#EFF3F4";
  const bg2 = isDark ? "#0F1419" : "#F7F9FA";

  const findBook = (id: string) => books.find((b) => b.id === id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: text }}>
          🌟 Special Collections
        </h1>
        <p className="text-base" style={{ color: muted }}>
          Curated groupings for specific goals and reading strategies
        </p>
      </div>

      <div className="space-y-12">
        {collections.map((collection) => (
          <section
            key={collection.id}
            className="rounded-2xl overflow-hidden"
            style={{
              backgroundColor: surface,
              border: `1px solid ${border}`,
            }}
          >
            {/* Collection Header */}
            <div className="p-6 sm:p-8" style={{ borderBottom: `1px solid ${border}` }}>
              <div className="flex items-start gap-4">
                <span className="text-4xl">{collection.icon}</span>
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-2" style={{ color: text }}>
                    {collection.name}
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: muted }}>
                    {collection.description}
                  </p>
                  {collection.estimatedReadingTime && (
                    <p className="text-xs mt-2" style={{ color: "#4A9EFF" }}>
                      ⏱ Estimated: {collection.estimatedReadingTime}
                    </p>
                  )}
                  {collection.recommendedSequence && (
                    <p className="text-xs mt-1" style={{ color: muted }}>
                      📖 Sequence: {collection.recommendedSequence}
                    </p>
                  )}
                  {collection.recommendedFor && (
                    <p className="text-xs mt-1" style={{ color: muted }}>
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
                    <div
                      key={cb.bookId}
                      className="flex items-start gap-4 p-4 rounded-xl cursor-pointer hover:opacity-90 transition-all"
                      style={{ backgroundColor: bg2, border: `1px solid ${border}` }}
                      onClick={() => onSelectBook(book)}
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                        style={{
                          backgroundColor:
                            status === "Completed"
                              ? "#2ECC7122"
                              : "#4A9EFF22",
                          color:
                            status === "Completed" ? "#2ECC71" : "#4A9EFF",
                        }}
                      >
                        {status === "Completed" ? "✓" : idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm mb-0.5" style={{ color: text }}>
                          {book.title}
                        </h4>
                        <p className="text-xs mb-1" style={{ color: muted }}>
                          {book.authors.join(", ")} · {book.year} ·{" "}
                          {CURRENCY_ICONS[book.currency]} {book.currency}
                        </p>
                        <p className="text-xs" style={{ color: isDark ? "#A0A8B0" : "#4A5568" }}>
                          {cb.reason}
                        </p>
                      </div>
                      <div
                        className="px-2 py-0.5 rounded text-xs shrink-0"
                        style={{
                          color:
                            status === "Completed"
                              ? "#2ECC71"
                              : status === "In Progress"
                              ? "#F39C12"
                              : muted,
                        }}
                      >
                        {status}
                      </div>
                    </div>
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
                      style={{ backgroundColor: bg2, border: `1px solid ${border}` }}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Classic */}
                        <div
                          className="p-3 rounded-lg cursor-pointer hover:opacity-90 transition-all"
                          style={{
                            backgroundColor: surface,
                            border: `1px solid ${border}`,
                          }}
                          onClick={() => classicBook && onSelectBook(classicBook)}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm">📚</span>
                            <span className="text-xs font-semibold" style={{ color: "#808080" }}>
                              TIMELESS CLASSIC
                            </span>
                          </div>
                          {classicBook && (
                            <>
                              <h4 className="font-semibold text-sm mb-1" style={{ color: text }}>
                                {classicBook.title}
                              </h4>
                              <p className="text-xs" style={{ color: muted }}>
                                {classicBook.authors.join(", ")} · {classicBook.year}
                              </p>
                            </>
                          )}
                          <p className="text-xs mt-2" style={{ color: isDark ? "#A0A8B0" : "#4A5568" }}>
                            {pairing.classicWhyTimeless}
                          </p>
                        </div>

                        {/* Supplement */}
                        <div
                          className="p-3 rounded-lg cursor-pointer hover:opacity-90 transition-all"
                          style={{
                            backgroundColor: surface,
                            border: `1px solid #4A9EFF33`,
                          }}
                          onClick={() => supplementBook && onSelectBook(supplementBook)}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm">🔥</span>
                            <span className="text-xs font-semibold" style={{ color: "#4A9EFF" }}>
                              AI-ERA SUPPLEMENT
                            </span>
                          </div>
                          {supplementBook && (
                            <>
                              <h4 className="font-semibold text-sm mb-1" style={{ color: text }}>
                                {supplementBook.title}
                              </h4>
                              <p className="text-xs" style={{ color: muted }}>
                                {supplementBook.authors.join(", ")} · {supplementBook.year}
                              </p>
                            </>
                          )}
                          <p className="text-xs mt-2" style={{ color: isDark ? "#A0A8B0" : "#4A5568" }}>
                            {pairing.supplementWhatAdds}
                          </p>
                        </div>
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
