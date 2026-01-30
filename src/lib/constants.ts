export const DOMAIN_COLORS: Record<string, string> = {
  "AI-Era": "#4A9EFF",
  "HR": "#FF8C42",
  "Organizational Behavior": "#3498DB",
  "Leadership": "#F39C12",
  "Marketing": "#9B6FFF",
  "Sales": "#2ECC71",
  "Product Management": "#1ABC9C",
  "Corporate Finance": "#2C3E50",
  "Negotiation": "#E74C3C",
  "Communication": "#FF6B9D",
};

export const DOMAIN_LABELS: Record<string, string> = {
  "AI-Era": "AI-Era Strategy",
  "HR": "HR / Talent Management",
  "Organizational Behavior": "Organizational Behavior & Culture",
  "Leadership": "Leadership Development",
  "Marketing": "Marketing (Strategy & Digital)",
  "Sales": "Sales & Revenue",
  "Product Management": "Product Management",
  "Corporate Finance": "Corporate Finance & M&A",
  "Negotiation": "Negotiation",
  "Communication": "Communication & Influence",
};

export const TIER_LABELS: Record<number, string> = {
  1: "Essential",
  2: "Recommended",
  3: "Specialized",
};

export const TIER_COLORS: Record<number, string> = {
  1: "#FFD700",
  2: "#C0C0C0",
  3: "#CD7F32",
};

export const CURRENCY_ICONS: Record<string, string> = {
  "Bleeding Edge": "🔥",
  "Recent": "⚡",
  "Modern Classic": "⭐",
  "Timeless": "📚",
};

export const CURRENCY_COLORS: Record<string, string> = {
  "Bleeding Edge": "#FF4500",
  "Recent": "#FFD700",
  "Modern Classic": "#4A9EFF",
  "Timeless": "#808080",
};

export const AI_RELEVANCE_OPTIONS = [
  "AI-Native",
  "AI-Supplemented",
  "AI-Neutral",
  "Need AI Supplement",
] as const;

export const CATEGORIES = [
  "AI-Era",
  "HR",
  "Organizational Behavior",
  "Leadership",
  "Marketing",
  "Sales",
  "Product Management",
  "Corporate Finance",
  "Negotiation",
  "Communication",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const READING_STATUSES = ["Not Started", "In Progress", "Completed"] as const;
export type ReadingStatus = (typeof READING_STATUSES)[number];
