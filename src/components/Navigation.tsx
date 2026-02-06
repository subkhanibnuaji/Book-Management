"use client";

import { useState } from "react";

type Page =
  | "home"
  | "browse"
  | "pathways"
  | "collections"
  | "progress"
  | "about";

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onToggleTheme: () => void;
  isDark: boolean;
  bookCount: number;
}

export default function Navigation({
  currentPage,
  onNavigate,
  onToggleTheme,
  isDark,
  bookCount,
}: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems: { key: Page; label: string; icon: string }[] = [
    { key: "home", label: "Home", icon: "🏠" },
    { key: "browse", label: `All Books (${bookCount})`, icon: "📚" },
    { key: "pathways", label: "Reading Pathways", icon: "🎯" },
    { key: "collections", label: "Collections", icon: "🌟" },
    { key: "progress", label: "My Progress", icon: "📊" },
    { key: "about", label: "About", icon: "ℹ️" },
  ];

  const handleNav = (page: Page) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 glass border-b transition-colors duration-300"
      style={{
        backgroundColor: "var(--nav-bg)",
        borderColor: "var(--border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleNav("home")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            aria-label="Go to homepage"
          >
            <span className="text-2xl">📚</span>
            <span className="font-bold text-lg hidden sm:inline"
              style={{ color: "var(--text)" }}
            >
              Ibnu&apos;s Library
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNav(item.key)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === item.key
                    ? "text-white"
                    : "hover:opacity-80"
                }`}
                style={{
                  backgroundColor:
                    currentPage === item.key ? "var(--accent)" : "transparent",
                  color:
                    currentPage === item.key
                      ? "#FFFFFF"
                      : "var(--text-secondary)",
                }}
              >
                <span className="mr-1.5">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg transition-colors duration-200 hover:opacity-80"
              style={{
                backgroundColor: "var(--control-bg)",
                color: "var(--text)",
              }}
              aria-label="Toggle theme"
            >
              {isDark ? "☀️" : "🌙"}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{
                backgroundColor: "var(--control-bg)",
                color: "var(--text)",
              }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div
          className="md:hidden border-t transition-colors duration-300"
          style={{
            backgroundColor: "var(--bg)",
            borderColor: "var(--border)",
          }}
        >
          <nav className="px-4 py-2 space-y-1" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNav(item.key)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2`}
                style={{
                  backgroundColor:
                    currentPage === item.key
                      ? "var(--nav-active-bg)"
                      : "transparent",
                  color:
                    currentPage === item.key
                      ? "var(--accent)"
                      : "var(--text-secondary)",
                }}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
