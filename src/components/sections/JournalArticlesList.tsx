"use client";

import React, { useState, useMemo } from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { JOURNAL_ARTICLES } from "@/lib/data/publications";
import type { JournalArticle } from "@/types";
import { cn } from "@/lib/utils";

export interface JournalArticlesListProps {
  articles?: JournalArticle[];
}

/**
 * Journal Articles & Academic Papers List (P6-04)
 *
 * Implements the filterable law review and journal repository for /publications:
 * - When articles exist: Provides client-side topic filtering (Arbitration, Corporate, Constitutional)
 *   with accessible button controls, publication citations, and download links.
 * - When dataset is empty (Strict adherence to docs/04_CONTENT_REQUIREMENTS.md):
 *   Renders a restrained, dignified empty state without displaying dummy category tabs
 *   or fabricating sample articles.
 */
export function JournalArticlesList({
  articles = JOURNAL_ARTICLES,
}: JournalArticlesListProps) {
  const [selectedTopic, setSelectedTopic] = useState<string>("All");

  // Derive categories dynamically from actual verified articles
  const availableTopics = useMemo(() => {
    if (!articles || articles.length === 0) return [];
    const topics = Array.from(new Set(articles.map((a) => a.topic)));
    return ["All", ...topics];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    if (selectedTopic === "All") return articles;
    return articles.filter((a) => a.topic === selectedTopic);
  }, [articles, selectedTopic]);

  return (
    <section
      aria-labelledby="journal-heading"
      className="py-16 sm:py-20 md:py-24 border-t border-border-subtle bg-surface"
    >
      <Container>
        <Reveal>
          {/* Eyebrow & Section Heading */}
          <div className="max-w-3xl mb-10 sm:mb-14">
            <Badge variant="eyebrow" className="mb-3.5">
              SCHOLARLY DISCOURSE &bull; LAW REVIEW PAPERS
            </Badge>
            <h2
              id="journal-heading"
              className="font-serif text-3xl sm:text-4xl font-normal text-charcoal tracking-tight leading-[1.16]"
            >
              Journal Articles &amp; <br />
              <span className="italic text-forest">Academic Papers.</span>
            </h2>
            <p className="mt-4 text-base font-sans text-charcoal/75 leading-relaxed">
              Academic contributions examining legal jurisprudence, arbitral practice,
              and statutory interpretation published across legal journals and seminar volumes.
            </p>
          </div>

          {articles.length > 0 ? (
            /* Render Verified Articles Repository with Client-Side Filtering */
            <div>
              {/* Category Filter Pills with tactile feedback */}
              {availableTopics.length > 1 && (
                <div
                  role="group"
                  aria-label="Filter articles by legal subject"
                  className="flex flex-wrap items-center gap-2 mb-8"
                >
                  {availableTopics.map((topic) => {
                    const isSelected = selectedTopic === topic;
                    return (
                      <button
                        key={topic}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => setSelectedTopic(topic)}
                        className={cn(
                          "text-xs font-sans font-medium px-4 py-1.5 rounded-full transition-all cursor-pointer select-none",
                          "focus-visible:outline-2 focus-visible:outline-forest focus-visible:outline-offset-2",
                          isSelected
                            ? "bg-forest-deep text-warm-ivory shadow-[inset_0_1px_1px_rgba(255,255,255,0.22)] scale-105 active:scale-95"
                            : "bg-surface-card text-charcoal/80 border border-border-subtle hover:border-forest/40 hover:scale-105 active:scale-95"
                        )}
                      >
                        {topic}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Articles Listing Table / Cards with tactile hover */}
              <div className="space-y-4">
                {filteredArticles.map((article) => (
                  <div
                    key={article.id}
                    className="group relative overflow-hidden p-6 sm:p-7 rounded-2xl bg-surface-card border border-border-subtle shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-forest/40 hover:-translate-y-1 hover:shadow-md transition-all duration-300 motion-reduce:transform-none"
                  >
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      aria-hidden="true"
                    />
                    <div className="space-y-1.5 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <Badge variant="pill" showDot={false} className="text-[11px] py-0.5">
                          {article.topic}
                        </Badge>
                        <span className="text-xs font-mono text-charcoal/60">
                          {article.publication_date}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl font-normal text-charcoal">
                        {article.title}
                      </h3>
                      <p className="text-xs font-sans text-charcoal/70 italic">
                        {article.citation}
                      </p>
                      {article.summary && (
                        <p className="text-sm font-sans text-charcoal/75 leading-relaxed pt-1">
                          {article.summary}
                        </p>
                      )}
                    </div>

                    {article.download_url && (
                      <div className="shrink-0">
                        <Button
                          href={article.download_url}
                          variant="outline"
                          size="sm"
                          showArrow={true}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View publication
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Restrained Empty State (Zero Fabricated Papers) */
            <div className="relative overflow-hidden p-8 sm:p-10 rounded-2xl bg-surface-card border border-border-subtle shadow-xs transition-all duration-300 hover:shadow-md hover:border-forest/30">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest/20 to-transparent"
                aria-hidden="true"
              />
              <div className="max-w-2xl space-y-3">
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-charcoal">
                  Legal Articles &amp; Research Papers
                </h3>
                <p className="text-sm sm:text-base font-sans text-charcoal/75 leading-relaxed">
                  Dr. Surajit Sinha contributes research papers and analytical addresses
                  to law reviews, cybercrime seminars, and legal forums.
                </p>
                <p className="text-xs sm:text-sm font-sans text-charcoal/60 leading-relaxed">
                  Verified citations, journal volumes, and digital reprints are documented in this
                  repository upon formal peer publication and confirmation of indexing rights.
                </p>
              </div>
            </div>
          )}
        </Reveal>
      </Container>
    </section>
  );
}

