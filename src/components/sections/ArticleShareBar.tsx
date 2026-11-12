"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/seo";
import { cn } from "@/lib/utils";
import type { Article } from "@/types";

export interface ArticleShareBarProps {
  article: Article;
  className?: string;
}

/**
 * Article Sharing & Academic Citation Generator (P7-05)
 *
 * Implements a dignified, non-promotional utility bar:
 * - Direct URL copy with clipboard feedback.
 * - Web Share API integration when available on modern mobile/desktop browsers.
 * - Citation generation formatted purely from verified metadata:
 *   "[Author], '[Title]' ([Date]), Dr. Surajit Sinha Legal Folio, [URL]."
 * - Zero fabricated volumes, OSCOLA labels, or invented journal issues.
 * - Refined Liquid Glass styling with specular edge and tactile press feedback.
 */
export function ArticleShareBar({ article, className }: ArticleShareBarProps) {
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const articleUrl = typeof window !== "undefined"
    ? `${window.location.origin}/insights/${article.slug}`
    : `${SITE_CONFIG.url}/insights/${article.slug}`;

  // Formulate citation only if minimum required fields exist
  const formattedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const authorName = "Dr. Surajit Sinha"; // Verified counsel identity

  // Citation text (honest, non-fabricated neutral format)
  const citationText = formattedDate
    ? `${authorName}, '${article.title}' (${formattedDate}), Dr. Surajit Sinha Legal Folio, ${articleUrl}.`
    : `${authorName}, '${article.title}', Dr. Surajit Sinha Legal Folio, ${articleUrl}.`;

  const showFeedback = (msg: string) => {
    setCopyFeedback(msg);
    setTimeout(() => {
      setCopyFeedback(null);
    }, 2800);
  };

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(articleUrl);
        showFeedback("Article URL copied to clipboard");
      }
    } catch {
      showFeedback("Unable to copy to clipboard");
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: articleUrl,
        });
      } catch (err) {
        // User aborted share or share failed
        if ((err as Error).name !== "AbortError") {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyCitation = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(citationText);
        showFeedback("Academic citation copied to clipboard");
      }
    } catch {
      showFeedback("Unable to copy citation");
    }
  };

  return (
    <div
      aria-label="Article utilities and citation tools"
      className={cn(
        "relative rounded-2xl border border-border-subtle bg-surface-card/85 backdrop-blur-md p-4 sm:p-5 shadow-xs",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest/20 to-transparent"
        aria-hidden="true"
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-forest block">
            Academic Reference &bull; Share
          </span>
          <span className="text-xs font-sans text-charcoal/65 block mt-0.5">
            Cite this monograph in submissions or share with counsel
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleNativeShare}
            className="text-xs bg-warm-ivory/60 hover:bg-warm-ivory"
          >
            <svg
              className="w-3.5 h-3.5 mr-1.5 text-forest"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            Share
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCopyLink}
            className="text-xs bg-warm-ivory/60 hover:bg-warm-ivory"
          >
            <svg
              className="w-3.5 h-3.5 mr-1.5 text-forest"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            Copy link
          </Button>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleCopyCitation}
            className="text-xs"
          >
            <svg
              className="w-3.5 h-3.5 mr-1.5 text-forest"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            Copy citation
          </Button>
        </div>
      </div>

      {/* Confirmation Feedback Toast */}
      {copyFeedback && (
        <div
          role="status"
          aria-live="polite"
          className="mt-3 pt-3 border-t border-border-subtle/80 flex items-center gap-2 text-xs font-sans text-forest font-medium animate-in fade-in duration-200"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-forest shrink-0" aria-hidden="true" />
          <span>{copyFeedback}</span>
        </div>
      )}
    </div>
  );
}

