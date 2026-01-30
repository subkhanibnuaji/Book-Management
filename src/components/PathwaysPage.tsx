"use client";

import { useState } from "react";
import { Book } from "@/data/books";
import { ReadingPathway } from "@/data/pathways";
import { UserData } from "@/lib/store";
import { ReadingStatus } from "@/lib/constants";

interface PathwaysPageProps {
  pathways: ReadingPathway[];
  books: Book[];
  isDark: boolean;
  userData: UserData;
  onSelectBook: (book: Book) => void;
  onStatusChange: (bookId: string, status: ReadingStatus) => void;
  onSetActivePathway: (id: string | undefined) => void;
}

export default function PathwaysPage({
  pathways,
  books,
  isDark,
  userData,
  onSelectBook,
  onStatusChange,
  onSetActivePathway,
}: PathwaysPageProps) {
  const [selectedPathway, setSelectedPathway] = useState<string | null>(
    userData.activePathway || null
  );

  const text = isDark ? "#E7E9EA" : "#0F1419";
  const muted = isDark ? "#71767B" : "#536471";
  const surface = isDark ? "#192734" : "#FFFFFF";
  const border = isDark ? "#2F3336" : "#EFF3F4";
  const bg2 = isDark ? "#0F1419" : "#F7F9FA";

  const activePathway = pathways.find((p) => p.id === selectedPathway);

  const getPathwayProgress = (pathway: ReadingPathway) => {
    const allBookIds = pathway.phases.flatMap((p) => p.books.map((b) => b.bookId));
    const completed = allBookIds.filter(
      (id) => userData.books[id]?.status === "Completed"
    ).length;
    return { completed, total: allBookIds.length };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: text }}>
          🎯 Reading Pathways
        </h1>
        <p className="text-base" style={{ color: muted }}>
          Structured reading programs designed for different goals and timelines
        </p>
      </div>

      {/* Pathway Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        {pathways.map((pathway) => {
          const { completed, total } = getPathwayProgress(pathway);
          const pct = total > 0 ? (completed / total) * 100 : 0;
          const isActive = selectedPathway === pathway.id;

          return (
            <button
              key={pathway.id}
              onClick={() => {
                setSelectedPathway(isActive ? null : pathway.id);
              }}
              className={`text-left p-6 rounded-2xl transition-all hover:shadow-lg ${
                isActive ? "ring-2 ring-[#4A9EFF]" : ""
              }`}
              style={{
                backgroundColor: surface,
                border: `1px solid ${isActive ? "#4A9EFF" : border}`,
              }}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">{pathway.icon}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1" style={{ color: text }}>
                    {pathway.name}
                  </h3>
                  <p className="text-sm font-medium mb-2" style={{ color: "#4A9EFF" }}>
                    {pathway.duration}
                  </p>
                  <p className="text-sm mb-4" style={{ color: muted }}>
                    {pathway.description}
                  </p>

                  {/* Target Audience */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {pathway.targetAudience.map((audience, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-full text-xs"
                        style={{
                          backgroundColor: bg2,
                          color: muted,
                          border: `1px solid ${border}`,
                        }}
                      >
                        {audience}
                      </span>
                    ))}
                  </div>

                  {/* Progress */}
                  <div className="mb-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span style={{ color: muted }}>
                        {completed}/{total} books completed
                      </span>
                      <span style={{ color: "#4A9EFF" }}>{Math.round(pct)}%</span>
                    </div>
                    <div
                      className="h-2 rounded-full overflow-hidden"
                      style={{ backgroundColor: bg2 }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: "#4A9EFF",
                        }}
                      />
                    </div>
                  </div>

                  <p className="text-xs" style={{ color: muted }}>
                    {pathway.phases.length} phases · {total} books total
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Pathway Details */}
      {activePathway && (
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold" style={{ color: text }}>
              {activePathway.icon} {activePathway.name}
            </h2>
            {userData.activePathway !== activePathway.id ? (
              <button
                onClick={() => onSetActivePathway(activePathway.id)}
                className="px-6 py-2.5 rounded-lg font-medium text-white"
                style={{ backgroundColor: "#4A9EFF" }}
              >
                Set as Active Pathway
              </button>
            ) : (
              <span
                className="px-4 py-2 rounded-lg text-sm font-medium"
                style={{
                  backgroundColor: "#2ECC7122",
                  color: "#2ECC71",
                  border: "1px solid #2ECC7144",
                }}
              >
                ✓ Active Pathway
              </span>
            )}
          </div>

          <p className="text-sm mb-2" style={{ color: muted }}>
            {activePathway.result}
          </p>

          {/* Phases */}
          <div className="space-y-8 mt-8">
            {activePathway.phases.map((phase, phaseIdx) => {
              const phaseCompleted = phase.books.filter(
                (b) => userData.books[b.bookId]?.status === "Completed"
              ).length;
              const phasePct =
                phase.books.length > 0
                  ? (phaseCompleted / phase.books.length) * 100
                  : 0;

              return (
                <div key={phaseIdx}>
                  {/* Phase header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                      style={{
                        backgroundColor: phasePct === 100 ? "#2ECC71" : "#4A9EFF",
                        color: "#FFFFFF",
                      }}
                    >
                      {phasePct === 100 ? "✓" : phaseIdx + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold" style={{ color: text }}>
                        {phase.name}
                      </h3>
                      <p className="text-xs" style={{ color: muted }}>
                        {phase.duration} · {phaseCompleted}/{phase.books.length}{" "}
                        complete
                      </p>
                    </div>
                    <div className="w-24">
                      <div
                        className="h-2 rounded-full overflow-hidden"
                        style={{ backgroundColor: bg2 }}
                      >
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${phasePct}%`,
                            backgroundColor:
                              phasePct === 100 ? "#2ECC71" : "#4A9EFF",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Books in phase */}
                  <div className="ml-5 pl-8 space-y-3" style={{ borderLeft: `2px solid ${border}` }}>
                    {phase.books.map((pb) => {
                      const book = books.find((b) => b.id === pb.bookId);
                      if (!book) return null;
                      const status =
                        (userData.books[book.id]?.status as ReadingStatus) ||
                        "Not Started";

                      return (
                        <div
                          key={pb.bookId}
                          className="flex items-center gap-4 p-3 rounded-xl transition-colors hover:opacity-90 cursor-pointer"
                          style={{
                            backgroundColor: surface,
                            border: `1px solid ${border}`,
                          }}
                          onClick={() => onSelectBook(book)}
                        >
                          {/* Status icon */}
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0"
                            style={{
                              backgroundColor:
                                status === "Completed"
                                  ? "#2ECC7122"
                                  : status === "In Progress"
                                  ? "#F39C1222"
                                  : bg2,
                              color:
                                status === "Completed"
                                  ? "#2ECC71"
                                  : status === "In Progress"
                                  ? "#F39C12"
                                  : muted,
                            }}
                          >
                            {status === "Completed"
                              ? "✓"
                              : status === "In Progress"
                              ? "→"
                              : "☐"}
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4
                              className="font-semibold text-sm truncate"
                              style={{ color: text }}
                            >
                              {book.title}
                            </h4>
                            <p className="text-xs" style={{ color: muted }}>
                              {book.authors.join(", ")} · {book.year}
                              {pb.note && ` · ${pb.note}`}
                            </p>
                          </div>

                          <select
                            value={status}
                            onChange={(e) => {
                              e.stopPropagation();
                              onStatusChange(
                                book.id,
                                e.target.value as ReadingStatus
                              );
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs px-2 py-1 rounded cursor-pointer shrink-0"
                            style={{
                              backgroundColor: bg2,
                              color: text,
                              border: `1px solid ${border}`,
                            }}
                          >
                            <option value="Not Started">Not Started</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
