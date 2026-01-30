"use client";

import { useState, useEffect, useCallback } from "react";
import {
  UserData,
  loadUserData,
  saveUserData,
  updateBookStatus,
  updateBookRating,
  updateBookNotes,
} from "@/lib/store";
import { ReadingStatus } from "@/lib/constants";

export function useUserData() {
  const [data, setData] = useState<UserData>({
    books: {},
    theme: "light",
    customLists: {},
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const d = loadUserData();
    setData(d);
    setLoaded(true);
    // Apply theme
    if (d.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const persist = useCallback((newData: UserData) => {
    setData(newData);
    saveUserData(newData);
  }, []);

  const setBookStatus = useCallback(
    (bookId: string, status: ReadingStatus) => {
      persist(updateBookStatus(bookId, status, data));
    },
    [data, persist]
  );

  const setBookRating = useCallback(
    (bookId: string, rating: number) => {
      persist(updateBookRating(bookId, rating, data));
    },
    [data, persist]
  );

  const setBookNotes = useCallback(
    (bookId: string, notes: string) => {
      persist(updateBookNotes(bookId, notes, data));
    },
    [data, persist]
  );

  const toggleTheme = useCallback(() => {
    const newTheme = data.theme === "dark" ? "light" : "dark";
    const newData = { ...data, theme: newTheme as "light" | "dark" };
    persist(newData);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [data, persist]);

  const setActivePathway = useCallback(
    (pathwayId: string | undefined) => {
      persist({ ...data, activePathway: pathwayId });
    },
    [data, persist]
  );

  const getBookData = useCallback(
    (bookId: string) => {
      return data.books[bookId] || { status: "Not Started" as ReadingStatus };
    },
    [data]
  );

  return {
    data,
    loaded,
    setBookStatus,
    setBookRating,
    setBookNotes,
    toggleTheme,
    setActivePathway,
    getBookData,
  };
}
