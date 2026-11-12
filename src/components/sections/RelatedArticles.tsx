import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { getRelatedArticles } from "@/lib/data/articles";
import { cn } from "@/lib/utils";
import type { Article } from "@/types";

export interface RelatedArticlesProps {
  currentArticle: Article;
  limit?: number;
  className?: string;
}

/**
 * Related Insights Recommendation Module (P7-06)
 *
 * Implements editorial recommendations at the base of long-form articles:
 * - Deterministic matching: Recommends published articles sharing the same category.
 * - Strictly excludes the current article.
 * - Graceful empty state: Returns null if no genuine published related articles exist.
 * - Tactile hover card lifts and specular edge highlights.
 */
export function RelatedArticles({
  currentArticle,
  limit = 2,
  className,
}: RelatedArticlesProps) {
  const related = getRelatedArticles(currentArticle, limit);

  if (related.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="related-insights-heading"
      className={cn("pt-12 sm:pt-16 mt-12 sm:mt-16 border-t border-border-subtle", className)}
    >
      <div className="mb-8">
        <Badge variant="eyebrow" className="mb-2">
          CONTINUED INQUIRY &bull; RELATED FOLIOS
        </Badge>
        <h2
          id="related-insights-heading"
          className="font-serif text-2xl sm:text-3xl font-normal text-charcoal tracking-tight"
        >
          Related Monographs in this Discipline
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {related.map((article) => (
          <article
            key={article.id}
            className="group relative overflow-hidden rounded-2xl bg-surface-card border border-border-subtle p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:border-forest/40 hover:-translate-y-1 hover:scale-[1.015] hover:shadow-lg hover:shadow-forest/5 transition-all duration-300 motion-reduce:transform-none"
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-hidden="true"
            />

            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-charcoal/60 mb-2.5">
                {article.category && (
                  <span className="text-forest font-semibold">
                    {article.category.name}
                  </span>
                )}
                <span>&bull;</span>
                <span>{article.reading_time_min} min read</span>
              </div>

              <h3 className="font-serif text-xl font-normal text-charcoal tracking-tight leading-snug group-hover:text-forest transition-colors">
                <Link href={`/insights/${article.slug}`}>
                  {article.title}
                </Link>
              </h3>

              <p className="mt-3 text-sm font-sans text-charcoal/75 leading-relaxed line-clamp-2">
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
                  : "Editorial Monograph"}
              </span>
              <span className="text-forest font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Read monograph &rarr;
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

