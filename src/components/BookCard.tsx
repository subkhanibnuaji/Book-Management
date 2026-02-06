"use client";

import { Book } from "@/data/books";
import { DOMAIN_COLORS, TIER_LABELS, TIER_COLORS, CURRENCY_ICONS, CURRENCY_COLORS, ReadingStatus } from "@/lib/constants";

interface BookCardProps {
  book: Book;
  isDark: boolean;
  readingStatus?: ReadingStatus;
  onSelect: (book: Book) => void;
  onStatusChange?: (bookId: string, status: ReadingStatus) => void;
}

export default function BookCard({ book, isDark, readingStatus, onSelect, onStatusChange }: BookCardProps) {
  const mainDomain = book.category;
  const domainColor = DOMAIN_COLORS[mainDomain] || "#4A9EFF";
  const tierColor = TIER_COLORS[book.tier];
  const currencyIcon = CURRENCY_ICONS[book.currency];
  const currencyColor = CURRENCY_COLORS[book.currency];

  const statusColors: Record<string, string> = {
    "Not Started": "var(--text-secondary)",
    "In Progress": "var(--warning)",
    "Completed": "var(--success)",
  };

  return (
    <article
      className="group relative rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer"
      style={{
        backgroundColor: "var(--surface-raised)",
        border: "1px solid var(--border)",
      }}
      onClick={() => onSelect(book)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onSelect(book)}
      aria-label={`View details for ${book.title}`}
    >
      {/* Top accent bar */}
      <div className="h-1" style={{ backgroundColor: domainColor }} />

      <div className="p-5">
        {/* Badges row */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span
            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold"
            style={{
              backgroundColor: tierColor + "22",
              color: tierColor,
              border: `1px solid ${tierColor}44`,
            }}
          >
            Tier {book.tier} {TIER_LABELS[book.tier]}
          </span>
          <span
            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
            style={{
              color: currencyColor,
            }}
          >
            {currencyIcon} {book.currency}
          </span>
          {readingStatus && readingStatus !== "Not Started" && (
            <span
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
              style={{ color: statusColors[readingStatus] }}
            >
              {readingStatus === "Completed" ? "✓" : "→"} {readingStatus}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className="font-bold text-lg leading-tight mb-1 line-clamp-2 group-hover:text-[#4A9EFF] transition-colors"
          style={{ color: "var(--text)" }}
        >
          {book.title}
        </h3>

        {/* Author */}
        <p
          className="text-sm mb-2"
          style={{ color: "var(--text-secondary)" }}
        >
          {book.authors.join(", ")}
        </p>

        {/* Meta */}
        <div
          className="flex items-center gap-2 text-xs mb-3"
          style={{ color: "var(--text-secondary)" }}
        >
          <span>{book.year}{book.updatedYear ? `/${book.updatedYear}` : ""}</span>
          <span>·</span>
          <span>{book.pages}p</span>
          <span>·</span>
          <span>{book.publisher}</span>
        </div>

        {/* Domain tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {book.domains.slice(0, 3).map((domain) => (
            <span
              key={domain}
              className="px-2 py-0.5 rounded-md text-xs font-medium"
              style={{
                backgroundColor: (DOMAIN_COLORS[book.category] || "#4A9EFF") + "18",
                color: DOMAIN_COLORS[book.category] || "#4A9EFF",
              }}
            >
              {domain}
            </span>
          ))}
          {book.domains.length > 3 && (
            <span
              className="px-2 py-0.5 rounded-md text-xs"
              style={{ color: "var(--text-secondary)" }}
            >
              +{book.domains.length - 3}
            </span>
          )}
        </div>

        {/* Summary */}
        <p
          className="text-sm leading-relaxed line-clamp-2 mb-3"
          style={{ color: "var(--text-content)" }}
        >
          {book.content.summary}
        </p>

        {/* Authority */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className="text-sm"
                style={{
                  opacity: i < book.authority.score ? 1 : 0.2,
                }}
              >
                ★
              </span>
            ))}
            <span
              className="text-xs ml-1"
              style={{ color: "var(--text-secondary)" }}
            >
              Authority
            </span>
          </div>

          {book.ratings.goodreads && (
            <span
              className="text-xs"
              style={{ color: "var(--text-secondary)" }}
            >
              GR: {book.ratings.goodreads}★
            </span>
          )}
        </div>

        {/* Quick action */}
        {onStatusChange && (
          <div className="mt-3 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
            <select
              value={readingStatus || "Not Started"}
              onChange={(e) => {
                e.stopPropagation();
                onStatusChange(book.id, e.target.value as ReadingStatus);
              }}
              onClick={(e) => e.stopPropagation()}
              className="w-full px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer"
              style={{
                backgroundColor: "var(--surface)",
                color: statusColors[readingStatus || "Not Started"],
                border: "1px solid var(--border)",
              }}
              aria-label={`Set reading status for ${book.title}`}
            >
              <option value="Not Started">☐ Not Started</option>
              <option value="In Progress">→ In Progress</option>
              <option value="Completed">✓ Completed</option>
            </select>
          </div>
        )}
      </div>
    </article>
  );
}
