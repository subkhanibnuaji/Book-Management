"use client";

import { useState, useEffect } from "react";
import { Book } from "@/data/books";
import {
  DOMAIN_COLORS,
  TIER_LABELS,
  TIER_COLORS,
  CURRENCY_ICONS,
  CURRENCY_COLORS,
  ReadingStatus,
} from "@/lib/constants";

interface BookDetailProps {
  book: Book;
  isDark: boolean;
  allBooks: Book[];
  readingStatus: ReadingStatus;
  userRating?: number;
  userNotes?: string;
  onClose: () => void;
  onStatusChange: (bookId: string, status: ReadingStatus) => void;
  onRatingChange: (bookId: string, rating: number) => void;
  onNotesChange: (bookId: string, notes: string) => void;
  onSelectBook: (book: Book) => void;
}

export default function BookDetail({
  book,
  isDark,
  allBooks,
  readingStatus,
  userRating,
  userNotes,
  onClose,
  onStatusChange,
  onRatingChange,
  onNotesChange,
  onSelectBook,
}: BookDetailProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "details" | "integration" | "notes">("overview");
  const [localNotes, setLocalNotes] = useState(userNotes || "");

  const tierColor = TIER_COLORS[book.tier];
  const currencyIcon = CURRENCY_ICONS[book.currency];
  const currencyColor = CURRENCY_COLORS[book.currency];
  const domainColor = DOMAIN_COLORS[book.category] || "#4A9EFF";

  const relatedBooks = book.relatedBookIds
    .map((id) => allBooks.find((b) => b.id === id))
    .filter(Boolean) as Book[];

  const tabs = [
    { key: "overview" as const, label: "Overview" },
    { key: "details" as const, label: "Details" },
    { key: "integration" as const, label: "Integration" },
    { key: "notes" as const, label: "My Notes" },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-4 sm:py-8 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 transition-opacity"
        onClick={onClose}
        role="presentation"
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-3xl rounded-2xl shadow-2xl animate-slide-up"
        style={{
          backgroundColor: "var(--surface-raised)",
          border: "1px solid var(--border)",
        }}
        role="dialog"
        aria-modal="true"
        aria-label={`Details for ${book.title}`}
      >
        {/* Top accent */}
        <div className="h-1.5 rounded-t-2xl" style={{ backgroundColor: domainColor }} />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-colors z-10"
          style={{
            backgroundColor: "var(--surface)",
            color: "var(--text)",
          }}
          aria-label="Close"
        >
          ✕
        </button>

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="mb-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold"
                style={{
                  backgroundColor: tierColor + "22",
                  color: tierColor,
                  border: `1px solid ${tierColor}44`,
                }}
              >
                Tier {book.tier} — {TIER_LABELS[book.tier]}
              </span>
              <span
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                style={{ color: currencyColor }}
              >
                {currencyIcon} {book.currency}
              </span>
              <span
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: domainColor + "18",
                  color: domainColor,
                }}
              >
                {book.category}
              </span>
              <span
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: "var(--surface)",
                  color: "var(--text-content)",
                }}
              >
                {book.aiRelevance}
              </span>
            </div>

            <h2
              className="text-2xl sm:text-3xl font-bold mb-2"
              style={{ color: "var(--text)" }}
            >
              {book.title}
            </h2>

            <p
              className="text-base mb-2"
              style={{ color: "var(--text-content)" }}
            >
              by {book.authors.join(", ")}
            </p>

            <div
              className="flex flex-wrap items-center gap-3 text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              <span>{book.year}{book.updatedYear ? ` (Updated ${book.updatedYear})` : ""}{book.month ? `, ${book.month}` : ""}</span>
              <span>·</span>
              <span>{book.publisher}</span>
              <span>·</span>
              <span>{book.pages} pages</span>
            </div>

            {/* Authority Stars */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className="text-lg"
                    style={{ color: "var(--star)", opacity: i < book.authority.score ? 1 : 0.2 }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Authority Score · {book.authority.status}
              </span>
            </div>

            {/* Ratings */}
            <div className="flex flex-wrap gap-4 mt-2">
              {book.ratings.goodreads && (
                <span className="text-sm" style={{ color: "var(--text-content)" }}>
                  Goodreads: {book.ratings.goodreads}★
                  {book.ratings.goodreadsReviews && ` (${book.ratings.goodreadsReviews.toLocaleString()} reviews)`}
                </span>
              )}
              {book.ratings.amazon && (
                <span className="text-sm" style={{ color: "var(--text-content)" }}>
                  Amazon: {book.ratings.amazon}★
                </span>
              )}
            </div>
          </div>

          {/* Status & Rating Controls */}
          <div
            className="flex flex-wrap gap-4 p-4 rounded-xl mb-6"
            style={{
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="flex-1 min-w-[180px]">
              <label className="text-xs font-medium block mb-1.5" style={{ color: "var(--text-secondary)" }}>
                Reading Status
              </label>
              <select
                value={readingStatus}
                onChange={(e) => onStatusChange(book.id, e.target.value as ReadingStatus)}
                className="w-full px-3 py-2 rounded-lg text-sm font-medium cursor-pointer"
                style={{
                  backgroundColor: "var(--surface-raised)",
                  color: "var(--text)",
                  border: "1px solid var(--border)",
                }}
              >
                <option value="Not Started">☐ Not Started</option>
                <option value="In Progress">→ In Progress</option>
                <option value="Completed">✓ Completed</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium block mb-1.5" style={{ color: "var(--text-secondary)" }}>
                My Rating
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => onRatingChange(book.id, star)}
                    className="text-xl transition-transform hover:scale-125"
                    style={{ color: star <= (userRating || 0) ? "var(--star)" : "var(--star-inactive)" }}
                    aria-label={`Rate ${star} stars`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div
            className="flex border-b mb-6"
            style={{ borderColor: "var(--border)" }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="px-4 py-2.5 text-sm font-medium transition-all relative"
                style={{
                  color: activeTab === tab.key ? "var(--accent)" : "var(--text-secondary)",
                }}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4A9EFF] rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[300px]">
            {activeTab === "overview" && (
              <div className="space-y-6 animate-fade-in">
                {/* Summary */}
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: "var(--text)" }}>
                    Summary
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-content)" }}>
                    {book.content.summary}
                  </p>
                </div>

                {/* Key Takeaways */}
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: "var(--text)" }}>
                    Key Takeaways
                  </h3>
                  <ul className="space-y-1.5">
                    {book.content.keyTakeaways.map((point, i) => (
                      <li key={i} className="flex gap-2 text-sm" style={{ color: "var(--text-content)" }}>
                        <span style={{ color: domainColor }}>→</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Why World-Class */}
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: "var(--text)" }}>
                    Why World-Class
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-content)" }}>
                    {book.content.whyWorldClass}
                  </p>
                </div>

                {/* Best For */}
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: "var(--text)" }}>
                    Best For
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {book.content.bestFor.map((audience, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: "var(--surface)",
                          color: "var(--text-content)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        {audience}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Limitations */}
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: "var(--text)" }}>
                    Limitations
                  </h3>
                  <ul className="space-y-1">
                    {book.content.limitations.map((limit, i) => (
                      <li key={i} className="text-sm" style={{ color: "var(--text-tertiary)" }}>
                        • {limit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "details" && (
              <div className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-2 gap-4">
                  <DetailItem label="Publisher" value={book.publisher} />
                  <DetailItem label="Year" value={`${book.year}${book.updatedYear ? ` (Updated ${book.updatedYear})` : ""}`} />
                  <DetailItem label="Pages" value={`${book.pages}`} />
                  <DetailItem label="AI Relevance" value={book.aiRelevance} />
                </div>

                <div>
                  <h3 className="font-semibold mb-2" style={{ color: "var(--text)" }}>
                    Authority Credentials
                  </h3>
                  <p className="text-sm" style={{ color: "var(--text-content)" }}>
                    {book.authority.credentials}
                  </p>
                  <p className="text-sm mt-1" style={{ color: "var(--text-tertiary)" }}>
                    {book.authority.validation}
                  </p>
                  {book.authority.citations && (
                    <p className="text-sm mt-1" style={{ color: "var(--text-tertiary)" }}>
                      Citations: {book.authority.citations.toLocaleString()}+
                    </p>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold mb-2" style={{ color: "var(--text)" }}>
                    Domains & Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {book.domains.map((domain, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: domainColor + "18",
                          color: domainColor,
                        }}
                      >
                        {domain}
                      </span>
                    ))}
                  </div>
                </div>

                {book.freeResources && book.freeResources.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2" style={{ color: "var(--text)" }}>
                      Free Resources
                    </h3>
                    <ul className="space-y-1">
                      {book.freeResources.map((res, i) => (
                        <li key={i} className="text-sm" style={{ color: "var(--accent)" }}>
                          → {res}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === "integration" && (
              <div className="space-y-6 animate-fade-in">
                {/* Integration Notes */}
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: "var(--text)" }}>
                    Integration Notes
                  </h3>
                  <ul className="space-y-2">
                    {book.integrationNotes.map((note, i) => (
                      <li key={i} className="flex gap-2 text-sm" style={{ color: "var(--text-content)" }}>
                        <span style={{ color: "var(--accent)" }}>💡</span>
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Reading Pathways */}
                {book.readingPathways.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2" style={{ color: "var(--text)" }}>
                      Appears in Pathways
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {book.readingPathways.map((pathway, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium"
                          style={{
                            backgroundColor: "var(--accent-bg)",
                            color: "var(--accent)",
                            border: "1px solid var(--accent-border)",
                          }}
                        >
                          🎯 {pathway}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cross-Domain */}
                {book.crossDomainApplications && book.crossDomainApplications.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2" style={{ color: "var(--text)" }}>
                      Cross-Domain Applications
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {book.crossDomainApplications.map((domain, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: (DOMAIN_COLORS[domain] || "#4A9EFF") + "18",
                            color: DOMAIN_COLORS[domain] || "#4A9EFF",
                          }}
                        >
                          {domain}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Related Books */}
                {relatedBooks.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3" style={{ color: "var(--text)" }}>
                      Related Books
                    </h3>
                    <div className="space-y-2">
                      {relatedBooks.map((rb) => (
                        <button
                          key={rb.id}
                          onClick={() => onSelectBook(rb)}
                          className="w-full text-left p-3 rounded-lg transition-colors hover:opacity-80"
                          style={{
                            backgroundColor: "var(--surface)",
                            border: "1px solid var(--border)",
                          }}
                        >
                          <span className="font-medium text-sm" style={{ color: "var(--accent)" }}>
                            {rb.title}
                          </span>
                          <span className="text-xs block" style={{ color: "var(--text-secondary)" }}>
                            {rb.authors.join(", ")} · {rb.year}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "notes" && (
              <div className="space-y-4 animate-fade-in">
                <textarea
                  value={localNotes}
                  onChange={(e) => setLocalNotes(e.target.value)}
                  onBlur={() => onNotesChange(book.id, localNotes)}
                  placeholder="Write your notes about this book..."
                  rows={8}
                  className="w-full p-4 rounded-xl text-sm resize-none"
                  style={{
                    backgroundColor: "var(--surface)",
                    color: "var(--text)",
                    border: "1px solid var(--border)",
                  }}
                />
                <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                  Notes are saved automatically when you click outside the text area.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="p-3 rounded-lg"
      style={{
        backgroundColor: "var(--surface)",
      }}
    >
      <span className="text-xs block" style={{ color: "var(--text-secondary)" }}>
        {label}
      </span>
      <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
        {value}
      </span>
    </div>
  );
}
