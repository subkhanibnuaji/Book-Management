"use client";

import { ReadingStatus } from "./constants";

export interface UserBookData {
  status: ReadingStatus;
  startDate?: string;
  finishDate?: string;
  rating?: number;
  notes?: string;
  currentPage?: number;
}

export interface UserData {
  books: Record<string, UserBookData>;
  activePathway?: string;
  theme: "light" | "dark";
  customLists: Record<string, string[]>;
}

const STORAGE_KEY = "ibnu-library-data";

const defaultData: UserData = {
  books: {},
  theme: "light",
  customLists: {},
};

export function loadUserData(): UserData {
  if (typeof window === "undefined") return defaultData;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData;
    return { ...defaultData, ...JSON.parse(raw) };
  } catch {
    return defaultData;
  }
}

export function saveUserData(data: UserData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // storage full or unavailable
  }
}

export function updateBookStatus(
  bookId: string,
  status: ReadingStatus,
  data: UserData
): UserData {
  const existing = data.books[bookId] || { status: "Not Started" };
  const updated: UserBookData = { ...existing, status };

  if (status === "In Progress" && !existing.startDate) {
    updated.startDate = new Date().toISOString().split("T")[0];
  }
  if (status === "Completed" && !existing.finishDate) {
    updated.finishDate = new Date().toISOString().split("T")[0];
  }

  return {
    ...data,
    books: { ...data.books, [bookId]: updated },
  };
}

export function updateBookRating(
  bookId: string,
  rating: number,
  data: UserData
): UserData {
  const existing = data.books[bookId] || { status: "Not Started" };
  return {
    ...data,
    books: { ...data.books, [bookId]: { ...existing, rating } },
  };
}

export function updateBookNotes(
  bookId: string,
  notes: string,
  data: UserData
): UserData {
  const existing = data.books[bookId] || { status: "Not Started" };
  return {
    ...data,
    books: { ...data.books, [bookId]: { ...existing, notes } },
  };
}

export function getBookStats(data: UserData) {
  const entries = Object.values(data.books);
  const completed = entries.filter((b) => b.status === "Completed").length;
  const inProgress = entries.filter((b) => b.status === "In Progress").length;
  const notStarted = entries.filter((b) => b.status === "Not Started").length;
  return { completed, inProgress, notStarted, total: entries.length };
}

export function exportToCSV(
  books: Array<{
    id: string;
    title: string;
    authors: string[];
    year: number;
    category: string;
    tier: number;
  }>,
  userData: UserData
): string {
  const header =
    "Title,Author,Year,Domain,Tier,Status,Date Completed,My Rating,Notes\n";
  const rows = books
    .map((book) => {
      const ud = userData.books[book.id];
      return [
        `"${book.title}"`,
        `"${book.authors.join(", ")}"`,
        book.year,
        book.category,
        `Tier ${book.tier}`,
        ud?.status || "Not Started",
        ud?.finishDate || "",
        ud?.rating || "",
        `"${(ud?.notes || "").replace(/"/g, '""')}"`,
      ].join(",");
    })
    .join("\n");
  return header + rows;
}
