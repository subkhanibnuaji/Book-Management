"use client";

import { CATEGORIES, DOMAIN_LABELS, AI_RELEVANCE_OPTIONS, Category, ReadingStatus } from "@/lib/constants";
import { Book } from "@/data/books";

export interface Filters {
  search: string;
  categories: Category[];
  tiers: number[];
  yearRange: string;
  currency: string[];
  aiRelevance: string[];
  sortBy: string;
  readingStatus?: ReadingStatus;
}

export const defaultFilters: Filters = {
  search: "",
  categories: [],
  tiers: [],
  yearRange: "all",
  currency: [],
  aiRelevance: [],
  sortBy: "tier-asc",
  readingStatus: undefined,
};

interface FilterPanelProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  books: Book[];
  isDark: boolean;
  showMobile: boolean;
  onCloseMobile: () => void;
}

export default function FilterPanel({
  filters,
  onChange,
  books,
  isDark,
  showMobile,
  onCloseMobile,
}: FilterPanelProps) {
  const bg = isDark ? "#192734" : "#FFFFFF";
  const surface = isDark ? "#0F1419" : "#F7F9FA";
  const text = isDark ? "#E7E9EA" : "#0F1419";
  const muted = isDark ? "#71767B" : "#536471";
  const border = isDark ? "#2F3336" : "#EFF3F4";

  const categoryCounts = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = books.filter((b) => b.category === cat).length;
    return acc;
  }, {} as Record<string, number>);

  const toggleCategory = (cat: Category) => {
    const next = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    onChange({ ...filters, categories: next });
  };

  const toggleTier = (tier: number) => {
    const next = filters.tiers.includes(tier)
      ? filters.tiers.filter((t) => t !== tier)
      : [...filters.tiers, tier];
    onChange({ ...filters, tiers: next });
  };

  const toggleCurrency = (c: string) => {
    const next = filters.currency.includes(c)
      ? filters.currency.filter((x) => x !== c)
      : [...filters.currency, c];
    onChange({ ...filters, currency: next });
  };

  const toggleAiRelevance = (r: string) => {
    const next = filters.aiRelevance.includes(r)
      ? filters.aiRelevance.filter((x) => x !== r)
      : [...filters.aiRelevance, r];
    onChange({ ...filters, aiRelevance: next });
  };

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.tiers.length > 0 ||
    filters.yearRange !== "all" ||
    filters.currency.length > 0 ||
    filters.aiRelevance.length > 0 ||
    filters.readingStatus !== undefined;

  const containerClasses = showMobile
    ? "fixed inset-0 z-40 lg:static lg:z-auto"
    : "hidden lg:block";

  return (
    <div className={containerClasses}>
      {/* Mobile backdrop */}
      {showMobile && (
        <div className="fixed inset-0 bg-black/50 lg:hidden" onClick={onCloseMobile} />
      )}

      <aside
        className={`${
          showMobile ? "fixed right-0 top-0 bottom-0 w-80 z-50 overflow-y-auto lg:static lg:w-auto" : ""
        } rounded-xl p-5 space-y-5 lg:sticky lg:top-20`}
        style={{
          backgroundColor: bg,
          border: `1px solid ${border}`,
          maxHeight: showMobile ? "100vh" : "calc(100vh - 100px)",
          overflowY: "auto",
        }}
      >
        {/* Mobile close */}
        {showMobile && (
          <div className="flex items-center justify-between lg:hidden mb-2">
            <h3 className="font-bold" style={{ color: text }}>Filters</h3>
            <button onClick={onCloseMobile} className="p-2" style={{ color: text }}>✕</button>
          </div>
        )}

        {/* Search */}
        <div>
          <input
            type="text"
            placeholder="Search books, authors..."
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg text-sm"
            style={{
              backgroundColor: surface,
              color: text,
              border: `1px solid ${border}`,
            }}
          />
        </div>

        {/* Sort */}
        <div>
          <label className="text-xs font-semibold block mb-1.5" style={{ color: muted }}>
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => onChange({ ...filters, sortBy: e.target.value })}
            className="w-full px-3 py-2 rounded-lg text-sm cursor-pointer"
            style={{ backgroundColor: surface, color: text, border: `1px solid ${border}` }}
          >
            <option value="tier-asc">Tier (Essential First)</option>
            <option value="year-desc">Year (Newest First)</option>
            <option value="year-asc">Year (Oldest First)</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="authority-desc">Authority (Highest)</option>
            <option value="pages-asc">Pages (Shortest)</option>
            <option value="pages-desc">Pages (Longest)</option>
          </select>
        </div>

        {/* Domain / Category */}
        <FilterSection title="Domain" isDark={isDark}>
          {CATEGORIES.map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer py-1">
              <input
                type="checkbox"
                checked={filters.categories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="rounded"
              />
              <span className="text-sm flex-1" style={{ color: text }}>
                {DOMAIN_LABELS[cat] || cat}
              </span>
              <span className="text-xs" style={{ color: muted }}>
                {categoryCounts[cat] || 0}
              </span>
            </label>
          ))}
        </FilterSection>

        {/* Tier */}
        <FilterSection title="Tier" isDark={isDark}>
          {[1, 2, 3].map((tier) => (
            <label key={tier} className="flex items-center gap-2 cursor-pointer py-1">
              <input
                type="checkbox"
                checked={filters.tiers.includes(tier)}
                onChange={() => toggleTier(tier)}
                className="rounded"
              />
              <span className="text-sm" style={{ color: text }}>
                Tier {tier} — {["", "Essential", "Recommended", "Specialized"][tier]}
              </span>
            </label>
          ))}
        </FilterSection>

        {/* Publication Year */}
        <FilterSection title="Publication Year" isDark={isDark}>
          {[
            { key: "all", label: "All Years" },
            { key: "2020+", label: "2020+ (AI Era)" },
            { key: "2015-2019", label: "2015-2019" },
            { key: "2010-2014", label: "2010-2014" },
            { key: "pre-2010", label: "Pre-2010 (Timeless)" },
          ].map((opt) => (
            <label key={opt.key} className="flex items-center gap-2 cursor-pointer py-1">
              <input
                type="radio"
                name="yearRange"
                checked={filters.yearRange === opt.key}
                onChange={() => onChange({ ...filters, yearRange: opt.key })}
              />
              <span className="text-sm" style={{ color: text }}>{opt.label}</span>
            </label>
          ))}
        </FilterSection>

        {/* Currency */}
        <FilterSection title="Currency" isDark={isDark}>
          {["Bleeding Edge", "Recent", "Modern Classic", "Timeless"].map((c) => (
            <label key={c} className="flex items-center gap-2 cursor-pointer py-1">
              <input
                type="checkbox"
                checked={filters.currency.includes(c)}
                onChange={() => toggleCurrency(c)}
                className="rounded"
              />
              <span className="text-sm" style={{ color: text }}>
                {c === "Bleeding Edge" ? "🔥" : c === "Recent" ? "⚡" : c === "Modern Classic" ? "⭐" : "📚"} {c}
              </span>
            </label>
          ))}
        </FilterSection>

        {/* AI Relevance */}
        <FilterSection title="AI Relevance" isDark={isDark}>
          {AI_RELEVANCE_OPTIONS.map((r) => (
            <label key={r} className="flex items-center gap-2 cursor-pointer py-1">
              <input
                type="checkbox"
                checked={filters.aiRelevance.includes(r)}
                onChange={() => toggleAiRelevance(r)}
                className="rounded"
              />
              <span className="text-sm" style={{ color: text }}>{r}</span>
            </label>
          ))}
        </FilterSection>

        {/* Reading Status */}
        <FilterSection title="Reading Status" isDark={isDark}>
          {[undefined, "Not Started", "In Progress", "Completed"].map((status) => (
            <label key={status || "any"} className="flex items-center gap-2 cursor-pointer py-1">
              <input
                type="radio"
                name="readingStatus"
                checked={filters.readingStatus === status}
                onChange={() => onChange({ ...filters, readingStatus: status as ReadingStatus | undefined })}
              />
              <span className="text-sm" style={{ color: text }}>{status || "Any Status"}</span>
            </label>
          ))}
        </FilterSection>

        {/* Reset */}
        {hasActiveFilters && (
          <button
            onClick={() => onChange(defaultFilters)}
            className="w-full py-2 rounded-lg text-sm font-medium transition-colors"
            style={{
              backgroundColor: "#E74C3C18",
              color: "#E74C3C",
              border: "1px solid #E74C3C33",
            }}
          >
            ✕ Reset All Filters
          </button>
        )}
      </aside>
    </div>
  );
}

function FilterSection({
  title,
  isDark,
  children,
}: {
  title: string;
  isDark: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4
        className="text-xs font-semibold uppercase tracking-wider mb-2"
        style={{ color: isDark ? "#71767B" : "#536471" }}
      >
        {title}
      </h4>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}
