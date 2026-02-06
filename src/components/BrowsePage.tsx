"use client";

import { useState, useMemo } from "react";
import { Book } from "@/data/books";
import { ReadingStatus, Category } from "@/lib/constants";
import { UserData } from "@/lib/store";
import { useDebounce } from "@/hooks/useDebounce";
import BookCard from "./BookCard";
import FilterPanel, { Filters, defaultFilters } from "./FilterPanel";

interface BrowsePageProps {
  books: Book[];
  isDark: boolean;
  userData: UserData;
  onSelectBook: (book: Book) => void;
  onStatusChange: (bookId: string, status: ReadingStatus) => void;
}

function applyFilters(books: Book[], filters: Filters, userData: UserData): Book[] {
  let result = [...books];

  // Search
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.authors.some((a) => a.toLowerCase().includes(q)) ||
        b.content.summary.toLowerCase().includes(q) ||
        b.domains.some((d) => d.toLowerCase().includes(q)) ||
        b.content.keyTakeaways.some((k) => k.toLowerCase().includes(q))
    );
  }

  // Categories
  if (filters.categories.length > 0) {
    result = result.filter((b) =>
      filters.categories.includes(b.category as Category)
    );
  }

  // Tiers
  if (filters.tiers.length > 0) {
    result = result.filter((b) => filters.tiers.includes(b.tier));
  }

  // Year range
  if (filters.yearRange !== "all") {
    switch (filters.yearRange) {
      case "2020+":
        result = result.filter((b) => b.year >= 2020);
        break;
      case "2015-2019":
        result = result.filter((b) => b.year >= 2015 && b.year <= 2019);
        break;
      case "2010-2014":
        result = result.filter((b) => b.year >= 2010 && b.year <= 2014);
        break;
      case "pre-2010":
        result = result.filter((b) => b.year < 2010);
        break;
    }
  }

  // Currency
  if (filters.currency.length > 0) {
    result = result.filter((b) => filters.currency.includes(b.currency));
  }

  // AI Relevance
  if (filters.aiRelevance.length > 0) {
    result = result.filter((b) => filters.aiRelevance.includes(b.aiRelevance));
  }

  // Reading Status
  if (filters.readingStatus !== undefined) {
    result = result.filter((b) => {
      const status = userData.books[b.id]?.status || "Not Started";
      return status === filters.readingStatus;
    });
  }

  // Sort
  switch (filters.sortBy) {
    case "tier-asc":
      result.sort((a, b) => a.tier - b.tier || b.authority.score - a.authority.score);
      break;
    case "year-desc":
      result.sort((a, b) => b.year - a.year);
      break;
    case "year-asc":
      result.sort((a, b) => a.year - b.year);
      break;
    case "title-asc":
      result.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "authority-desc":
      result.sort((a, b) => b.authority.score - a.authority.score);
      break;
    case "pages-asc":
      result.sort((a, b) => a.pages - b.pages);
      break;
    case "pages-desc":
      result.sort((a, b) => b.pages - a.pages);
      break;
  }

  return result;
}

export default function BrowsePage({
  books,
  isDark,
  userData,
  onSelectBook,
  onStatusChange,
}: BrowsePageProps) {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const debouncedSearch = useDebounce(filters.search, 300);

  const filteredBooks = useMemo(
    () => applyFilters(books, { ...filters, search: debouncedSearch }, userData),
    [books, filters, debouncedSearch, userData]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--text)" }}>
          Browse All Books
        </h1>
        <p
          className="text-base"
          style={{ color: "var(--text-secondary)" }}
          role="status"
          aria-live="polite"
        >
          {filteredBooks.length} of {books.length} books
          {filters.search && ` matching "${filters.search}"`}
        </p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters (Desktop) */}
        <div className="w-72 shrink-0 hidden lg:block">
          <FilterPanel
            filters={filters}
            onChange={setFilters}
            books={books}
            showMobile={false}
            onCloseMobile={() => {}}
          />
        </div>

        {/* Mobile Filter Panel */}
        <FilterPanel
          filters={filters}
          onChange={setFilters}
          books={books}
          showMobile={showMobileFilters}
          onCloseMobile={() => setShowMobileFilters(false)}
        />

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 gap-4">
            {/* Mobile search */}
            <div className="flex-1 lg:hidden">
              <input
                type="text"
                placeholder="Search books..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg text-sm"
                style={{
                  backgroundColor: "var(--surface-raised)",
                  color: "var(--text)",
                  border: "1px solid var(--border)",
                }}
              />
            </div>

            <div className="flex items-center gap-2">
              {/* Mobile filter toggle */}
              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden px-4 py-2 rounded-lg text-sm font-medium"
                style={{
                  backgroundColor: "var(--surface-raised)",
                  color: "var(--text)",
                  border: "1px solid var(--border)",
                }}
                aria-label="Open filters"
              >
                Filters
              </button>

              {/* View toggle */}
              <div
                className="flex rounded-lg overflow-hidden"
                style={{ border: "1px solid var(--border)" }}
              >
                <button
                  onClick={() => setViewMode("grid")}
                  className="px-3 py-2 text-sm transition-colors"
                  style={{
                    backgroundColor: viewMode === "grid" ? "var(--accent)" : "var(--surface-raised)",
                    color: viewMode === "grid" ? "#FFFFFF" : "var(--text-secondary)",
                  }}
                  aria-label="Grid view"
                >
                  ▦
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className="px-3 py-2 text-sm transition-colors"
                  style={{
                    backgroundColor: viewMode === "list" ? "var(--accent)" : "var(--surface-raised)",
                    color: viewMode === "list" ? "#FFFFFF" : "var(--text-secondary)",
                  }}
                  aria-label="List view"
                >
                  ☰
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters Tags */}
          {(filters.categories.length > 0 ||
            filters.tiers.length > 0 ||
            filters.currency.length > 0 ||
            filters.aiRelevance.length > 0) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {filters.categories.map((cat) => (
                <FilterTag
                  key={cat}
                  label={cat}
                  onRemove={() =>
                    setFilters({
                      ...filters,
                      categories: filters.categories.filter((c) => c !== cat),
                    })
                  }
                />
              ))}
              {filters.tiers.map((t) => (
                <FilterTag
                  key={t}
                  label={`Tier ${t}`}
                  onRemove={() =>
                    setFilters({
                      ...filters,
                      tiers: filters.tiers.filter((x) => x !== t),
                    })
                  }
                />
              ))}
              {filters.currency.map((c) => (
                <FilterTag
                  key={c}
                  label={c}
                  onRemove={() =>
                    setFilters({
                      ...filters,
                      currency: filters.currency.filter((x) => x !== c),
                    })
                  }
                />
              ))}
              {filters.aiRelevance.map((r) => (
                <FilterTag
                  key={r}
                  label={r}
                  onRemove={() =>
                    setFilters({
                      ...filters,
                      aiRelevance: filters.aiRelevance.filter((x) => x !== r),
                    })
                  }
                />
              ))}
              <button
                onClick={() => setFilters(defaultFilters)}
                className="text-xs px-2 py-1 rounded"
                style={{ color: "var(--danger)" }}
              >
                Clear All
              </button>
            </div>
          )}

          {/* Book Grid/List */}
          {filteredBooks.length === 0 ? (
            <div
              className="text-center py-16 rounded-xl"
              style={{ backgroundColor: "var(--surface-raised)", border: "1px solid var(--border)" }}
            >
              <p className="text-4xl mb-4">📚</p>
              <p className="text-lg font-medium mb-2" style={{ color: "var(--text)" }}>
                No books match your filters
              </p>
              <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => setFilters(defaultFilters)}
                className="px-4 py-2 rounded-lg text-sm font-medium"
                style={{ backgroundColor: "var(--accent)", color: "#FFFFFF" }}
              >
                Reset Filters
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  isDark={isDark}
                  readingStatus={
                    (userData.books[book.id]?.status as ReadingStatus) || "Not Started"
                  }
                  onSelect={onSelectBook}
                  onStatusChange={onStatusChange}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredBooks.map((book) => (
                <ListBookRow
                  key={book.id}
                  book={book}
                  status={(userData.books[book.id]?.status as ReadingStatus) || "Not Started"}
                  onSelect={() => onSelectBook(book)}
                  onStatusChange={onStatusChange}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterTag({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
      style={{
        backgroundColor: "var(--accent-bg)",
        color: "var(--accent)",
        border: "1px solid var(--accent-border)",
      }}
    >
      {label}
      <button onClick={onRemove} className="hover:opacity-70">
        ✕
      </button>
    </span>
  );
}

function ListBookRow({
  book,
  status,
  onSelect,
  onStatusChange,
}: {
  book: Book;
  status: ReadingStatus;
  onSelect: () => void;
  onStatusChange: (bookId: string, status: ReadingStatus) => void;
}) {
  return (
    <div
      className="flex items-center gap-4 p-4 rounded-xl cursor-pointer hover:opacity-90 transition-all"
      style={{ backgroundColor: "var(--surface-raised)", border: "1px solid var(--border)" }}
      onClick={onSelect}
    >
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm truncate" style={{ color: "var(--text)" }}>
          {book.title}
        </h3>
        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
          {book.authors.join(", ")} · {book.year} · {book.pages}p
        </p>
      </div>
      <div className="hidden sm:flex items-center gap-2">
        <span className="text-xs px-2 py-0.5 rounded-full" style={{ color: "var(--star)" }}>
          Tier {book.tier}
        </span>
        <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
          {book.category}
        </span>
      </div>
      <select
        value={status}
        onChange={(e) => {
          e.stopPropagation();
          onStatusChange(book.id, e.target.value as ReadingStatus);
        }}
        onClick={(e) => e.stopPropagation()}
        className="text-xs px-2 py-1 rounded cursor-pointer"
        style={{
          backgroundColor: "var(--surface)",
          color: "var(--text)",
          border: "1px solid var(--border)",
        }}
      >
        <option value="Not Started">Not Started</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
}
