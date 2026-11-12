"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { Article, Category } from "@/types";

export interface InsightsListingProps {
  articles?: Article[];
  categories?: Category[];
}

/**
 * Editorial Insights & Legal Journal Directory (P7-01)
 *
 * Implements the magazine-grade legal editorial directory:
 * - Asymmetrical layout with Featured Lead Essay when published articles exist.
 * - Dynamic category filters based strictly on categories with published content.
 * - Tactile micro-physics: Card hover lift (-translate-y-1), gentle magnification (1.015),
 *   specular edge highlights, and independent photographic zoom (1.05).
 * - Strict adherence to docs/04_CONTENT_REQUIREMENTS.md:
 *   Zero fabricated articles, dates, or author bylines when dataset is empty.
 *   Presents an intentional, dignified editorial empty state.
 */
export function InsightsListing({
  articles = [],
  categories = [],
}: InsightsListingProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Filter articles based on active category
  const filteredArticles = useMemo(() => {
    if (selectedCategory === "all") return articles;
    return articles.filter((article) => {
      if (article.category?.slug === selectedCategory) return true;
      const cat = categories.find((c) => c.slug === selectedCategory);
      return cat && article.category_id === cat.id;
    });
  }, [articles, selectedCategory, categories]);

  // Lead essay is the first article when viewing 'all'
  const isAll = selectedCategory === "all";
  const featuredArticle = isAll && filteredArticles.length > 0 ? filteredArticles[0] : null;
  const standardArticles = isAll && filteredArticles.length > 0 ? filteredArticles.slice(1) : filteredArticles;

  return (
    <section aria-labelledby="insights-heading" className="pt-8 sm:pt-12 pb-20 sm:pb-28">
      <Container>
        <Reveal>
          {/* Header Introduction */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <Badge variant="eyebrow" className="mb-3.5">
              LEGAL SCHOLARSHIP &bull; EDITORIAL MONOGRAPHS
            </Badge>
            <h1
              id="insights-heading"
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal text-charcoal tracking-tight leading-[1.12]"
            >
              Perspectives on Jurisprudence <br />
              <span className="italic text-forest">&amp; Legal Practice.</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg md:text-xl font-sans text-charcoal/75 leading-relaxed">
              Analytical essays, statutory commentaries, and procedural reflections examining
              criminal jurisprudence, public prosecution standards, electronic evidence under cyber law, and appellate remedies.
            </p>
          </div>

          {articles.length > 0 ? (
            /* Published Articles Content */
            <div>
              {/* Category Filter Pills (Only rendered when categories with published articles exist) */}
              {categories.length > 1 && (
                <div
                  role="group"
                  aria-label="Filter legal insights by discipline"
                  className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-border-subtle/80"
                >
                  <button
                    type="button"
                    aria-pressed={selectedCategory === "all"}
                    onClick={() => setSelectedCategory("all")}
                    className={cn(
                      "text-xs font-sans font-medium px-4 py-1.5 rounded-full transition-all cursor-pointer select-none",
                      "focus-visible:outline-2 focus-visible:outline-forest focus-visible:outline-offset-2",
                      selectedCategory === "all"
                        ? "bg-forest-deep text-warm-ivory shadow-[inset_0_1px_1px_rgba(255,255,255,0.22)] scale-105 active:scale-95"
                        : "bg-surface-card text-charcoal/80 border border-border-subtle hover:border-forest/40 hover:scale-105 active:scale-95"
                    )}
                  >
                    All Disciplines
                  </button>

                  {categories.map((cat) => {
                    const isSelected = selectedCategory === cat.slug;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => setSelectedCategory(cat.slug)}
                        className={cn(
                          "text-xs font-sans font-medium px-4 py-1.5 rounded-full transition-all cursor-pointer select-none",
                          "focus-visible:outline-2 focus-visible:outline-forest focus-visible:outline-offset-2",
                          isSelected
                            ? "bg-forest-deep text-warm-ivory shadow-[inset_0_1px_1px_rgba(255,255,255,0.22)] scale-105 active:scale-95"
                            : "bg-surface-card text-charcoal/80 border border-border-subtle hover:border-forest/40 hover:scale-105 active:scale-95"
                        )}
                      >
                        {cat.name}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Featured Lead Essay (Asymmetric Split Card) */}
              {featuredArticle && (
                <article
                  aria-label={`Featured essay: ${featuredArticle.title}`}
                  className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border-subtle bg-surface-card shadow-xs transition-all duration-500 hover:shadow-xl hover:border-forest/30 mb-12 sm:mb-16 motion-reduce:transform-none"
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest/20 to-transparent z-20"
                    aria-hidden="true"
                  />
                  <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[460px]">
                    {/* Left Photographic / Atmospheric Frame */}
                    <div className="lg:col-span-6 relative min-h-[280px] sm:min-h-[340px] lg:min-h-full bg-forest-deep overflow-hidden">
                      {featuredArticle.cover_image_url ? (
                        <Image
                          src={featuredArticle.cover_image_url}
                          alt=""
                          fill
                          priority
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-forest-deep via-forest to-forest-deep opacity-90" />
                      )}
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-forest-deep/30"
                        aria-hidden="true"
                      />
                      <div className="absolute top-6 left-6 z-10">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-deep/80 backdrop-blur-md border border-warm-ivory/25 text-xs font-sans font-semibold tracking-wider uppercase text-muted-sage shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]">
                          FEATURED MONOGRAPH
                        </span>
                      </div>
                    </div>

                    {/* Right Editorial Monograph Content */}
                    <div className="lg:col-span-6 p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 text-xs font-mono text-charcoal/60 mb-3">
                          {featuredArticle.category && (
                            <Badge variant="pill" showDot={false} className="text-[11px] py-0.5">
                              {featuredArticle.category.name}
                            </Badge>
                          )}
                          {featuredArticle.published_at && (
                            <span>{new Date(featuredArticle.published_at).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</span>
                          )}
                          <span>&bull;</span>
                          <span>{featuredArticle.reading_time_min} min read</span>
                        </div>

                        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-charcoal tracking-tight leading-[1.18] group-hover:text-forest transition-colors">
                          <Link href={`/insights/${featuredArticle.slug}`}>
                            {featuredArticle.title}
                          </Link>
                        </h2>

                        <p className="mt-4 text-base sm:text-[17px] font-sans text-charcoal/80 leading-relaxed">
                          {featuredArticle.excerpt}
                        </p>
                      </div>

                      <div className="mt-8 pt-6 border-t border-border-subtle/80 flex items-center justify-between gap-4">
                        <Button
                          href={`/insights/${featuredArticle.slug}`}
                          variant="secondary"
                          size="md"
                          showArrow={true}
                        >
                          Read full analysis
                        </Button>
                        <span className="text-xs font-sans text-charcoal/60">
                          By Dr. Surajit Sinha, Advocate
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              )}

              {/* Standard Articles Grid */}
              {standardArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {standardArticles.map((article) => (
                    <article
                      key={article.id}
                      className="group relative overflow-hidden rounded-2xl bg-surface-card border border-border-subtle p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:border-forest/40 hover:-translate-y-1 hover:scale-[1.015] hover:shadow-lg hover:shadow-forest/5 transition-all duration-300 motion-reduce:transform-none"
                    >
                      <div
                        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        aria-hidden="true"
                      />

                      <div>
                        {article.cover_image_url && (
                          <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-5 bg-forest-deep">
                            <Image
                              src={article.cover_image_url}
                              alt=""
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
                            />
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-xs font-mono text-charcoal/60 mb-2.5">
                          {article.category && (
                            <span className="text-forest font-semibold">
                              {article.category.name}
                            </span>
                          )}
                          <span>&bull;</span>
                          <span>{article.reading_time_min} min read</span>
                        </div>

                        <h3 className="font-serif text-xl sm:text-2xl font-normal text-charcoal tracking-tight leading-snug group-hover:text-forest transition-colors">
                          <Link href={`/insights/${article.slug}`}>
                            {article.title}
                          </Link>
                        </h3>

                        <p className="mt-3 text-sm font-sans text-charcoal/75 leading-relaxed line-clamp-3">
                          {article.excerpt}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-border-subtle/80 flex items-center justify-between text-xs text-charcoal/65">
                        <span>
                          {article.published_at
                            ? new Date(article.published_at).toLocaleDateString("en-IN", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            : "Editorial Note"}
                        </span>
                        <span className="text-forest font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                          Read essay &rarr;
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                !featuredArticle && (
                  <div className="text-center py-16 border rounded-2xl bg-surface-card border-border-subtle text-charcoal/70">
                    No articles found in this discipline.
                  </div>
                )
              )}
            </div>
          ) : (
            /* Dignified Editorial Empty State (Strict adherence to zero fabricated content) */
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border-subtle bg-surface-card p-8 sm:p-12 md:p-16 shadow-xs transition-all duration-300 hover:shadow-md hover:border-forest/30">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest/20 to-transparent"
                aria-hidden="true"
              />

              <div className="max-w-2xl space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest/5 border border-forest/15 text-xs font-sans font-semibold uppercase tracking-[0.14em] text-forest">
                  <span className="w-1.5 h-1.5 rounded-full bg-forest" aria-hidden="true" />
                  <span>SCHOLARLY DISCOURSE &bull; FORTHCOMING ESSAYS</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-charcoal tracking-tight leading-snug">
                  Editorial Monographs &amp; Legal Commentary
                </h2>

                <p className="text-base sm:text-lg font-sans text-charcoal/80 leading-relaxed">
                  Dr. Surajit Sinha maintains an active legal research focus across criminal law,
                  public prosecution procedure, electronic evidence, cyber jurisprudence, civil litigation,
                  and banking dispute resolution.
                </p>

                <p className="text-sm sm:text-base font-sans text-charcoal/70 leading-relaxed">
                  Forthcoming analytical essays, statutory case notes, and colloquium addresses will be
                  archived in this legal repository upon formal review and verification.
                  Each monograph provides in-depth statutory reasoning, neutral citations, and
                  doctrinal synthesis.
                </p>

                <div className="pt-6 border-t border-border-subtle/80 flex flex-wrap items-center gap-4">
                  <Button href="/practice-areas" variant="primary" size="md" showArrow={true}>
                    Review practice disciplines
                  </Button>
                  <Button href="/contact" variant="outline" size="md" showArrow={true}>
                    Chamber consultations
                  </Button>
                </div>

                <div className="pt-4 text-xs font-sans text-charcoal/60 leading-normal flex items-start gap-2">
                  <span className="text-forest mt-0.5" aria-hidden="true">&bull;</span>
                  <span>
                    Insights published in this folio represent academic analysis and procedural discourse.
                    They do not constitute formal legal opinion or client solicitation under Bar Council of India Rule 36.
                  </span>
                </div>
              </div>
            </div>
          )}
        </Reveal>
      </Container>
    </section>
  );
}

