"use client";

import { useState, useCallback } from "react";
import { books, Book } from "@/data/books";
import { pathways } from "@/data/pathways";
import { collections } from "@/data/collections";
import { ReadingStatus } from "@/lib/constants";
import { useUserData } from "@/hooks/useUserData";
import Navigation from "@/components/Navigation";
import HomePage from "@/components/HomePage";
import BrowsePage from "@/components/BrowsePage";
import PathwaysPage from "@/components/PathwaysPage";
import CollectionsPage from "@/components/CollectionsPage";
import ProgressPage from "@/components/ProgressPage";
import AboutPage from "@/components/AboutPage";
import BookDetail from "@/components/BookDetail";

type Page = "home" | "browse" | "pathways" | "collections" | "progress" | "about";

export default function LibraryApp() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const {
    data: userData,
    loaded,
    setBookStatus,
    setBookRating,
    setBookNotes,
    toggleTheme,
    setActivePathway,
    getBookData,
  } = useUserData();

  const isDark = userData.theme === "dark";

  const handleNavigate = useCallback((page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSelectBook = useCallback((book: Book) => {
    setSelectedBook(book);
  }, []);

  const handleStatusChange = useCallback(
    (bookId: string, status: ReadingStatus) => {
      setBookStatus(bookId, status);
    },
    [setBookStatus]
  );

  if (!loaded) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#0F1419" }}
      >
        <div className="text-center">
          <p className="text-4xl mb-4">📚</p>
          <p className="text-lg font-medium" style={{ color: "#E7E9EA" }}>
            Loading Ibnu&apos;s Library...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <Navigation
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onToggleTheme={toggleTheme}
        isDark={isDark}
        bookCount={books.length}
      />

      <main id="main-content">
        {currentPage === "home" && (
          <HomePage
            books={books}
            isDark={isDark}
            userData={userData}
            onNavigate={handleNavigate}
            onSelectBook={handleSelectBook}
          />
        )}

        {currentPage === "browse" && (
          <BrowsePage
            books={books}
            isDark={isDark}
            userData={userData}
            onSelectBook={handleSelectBook}
            onStatusChange={handleStatusChange}
          />
        )}

        {currentPage === "pathways" && (
          <PathwaysPage
            pathways={pathways}
            books={books}
            isDark={isDark}
            userData={userData}
            onSelectBook={handleSelectBook}
            onStatusChange={handleStatusChange}
            onSetActivePathway={setActivePathway}
          />
        )}

        {currentPage === "collections" && (
          <CollectionsPage
            collections={collections}
            books={books}
            isDark={isDark}
            userData={userData}
            onSelectBook={handleSelectBook}
          />
        )}

        {currentPage === "progress" && (
          <ProgressPage
            books={books}
            pathways={pathways}
            isDark={isDark}
            userData={userData}
            onSelectBook={handleSelectBook}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === "about" && (
          <AboutPage
            isDark={isDark}
            bookCount={books.length}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Footer */}
      <footer
        className="border-t py-8 mt-16"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--bg)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            📚 Ibnu&apos;s World-Class Business Library · Curated January 2026
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--text-tertiary)" }}>
            {books.length} books · 10 domains · 4 reading pathways
          </p>
        </div>
      </footer>

      {/* Book Detail Modal */}
      {selectedBook && (
        <BookDetail
          book={selectedBook}
          isDark={isDark}
          allBooks={books}
          readingStatus={
            (getBookData(selectedBook.id).status as ReadingStatus) || "Not Started"
          }
          userRating={getBookData(selectedBook.id).rating}
          userNotes={getBookData(selectedBook.id).notes}
          onClose={() => setSelectedBook(null)}
          onStatusChange={handleStatusChange}
          onRatingChange={setBookRating}
          onNotesChange={setBookNotes}
          onSelectBook={handleSelectBook}
        />
      )}
    </div>
  );
}
