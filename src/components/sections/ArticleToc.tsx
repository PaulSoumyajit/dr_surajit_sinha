"use client";

import React, { useEffect, useState, useMemo } from "react";
import { slugifyHeading } from "@/components/ui/MarkdownRenderer";
import { useSafeAnimation } from "@/components/ui/MotionProvider";
import { cn } from "@/lib/utils";

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface ArticleTocProps {
  content: string;
  className?: string;
}

/**
 * Extracts H2 and H3 headings from raw markdown content.
 * Generates stable IDs using the identical slugifyHeading utility used in MarkdownRenderer.
 */
export function extractTocHeadings(content: string): TocItem[] {
  if (!content) return [];

  const lines = content.split(/\r?\n/);
  const headings: TocItem[] = [];
  const idCounts = new Map<string, number>();

  for (const line of lines) {
    let level: 2 | 3 | null = null;
    let text = "";

    if (line.startsWith("## ")) {
      level = 2;
      text = line.slice(3).trim();
    } else if (line.startsWith("### ")) {
      level = 3;
      text = line.slice(4).trim();
    }

    if (level && text) {
      // Remove inline markdown formatting like bold or links for clean TOC display
      const cleanText = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[*`_]/g, "");
      const baseId = slugifyHeading(cleanText);

      // Support duplicate heading titles safely with a counter
      const count = idCounts.get(baseId) || 0;
      idCounts.set(baseId, count + 1);
      const id = count === 0 ? baseId : `${baseId}-${count}`;

      headings.push({ id, text: cleanText, level });
    }
  }

  return headings;
}

/**
 * Sticky Article Table of Contents (P7-03)
 *
 * Implements a dignified, literary navigation rail:
 * - Extracts H2 and H3 headings with identical slugifyHeading targets.
 * - Tracks active reading position via IntersectionObserver.
 * - Displays on viewports >= 1280px (xl); collapses gracefully on mobile/tablet.
 * - Restrained active indicator: refined left forest marker line.
 * - Respects prefers-reduced-motion on smooth scroll.
 */
export function ArticleToc({ content, className }: ArticleTocProps) {
  const headings = useMemo(() => extractTocHeadings(content), [content]);
  const [activeId, setActiveId] = useState<string>("");
  const { prefersReducedMotion } = useSafeAnimation();

  useEffect(() => {
    if (headings.length === 0) return;

    // Default to the first heading
    setActiveId(headings[0].id);

    const observer = new IntersectionObserver(
      (entries) => {
        // Find visible heading nearest to the top
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: "-90px 0px -70% 0px",
        threshold: 0,
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  const handleHeadingClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: prefersReducedMotion ? "instant" : "smooth",
        block: "start",
      });
      setActiveId(id);
    }
  };

  return (
    <aside
      aria-label="Table of contents"
      className={cn("hidden xl:block w-64 shrink-0", className)}
    >
      <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4">
        <h3 className="font-mono text-xs font-semibold tracking-wider text-forest uppercase mb-4">
          Contents &bull; Outline
        </h3>

        <nav aria-label="Article outline">
          <ul className="space-y-1.5 border-l border-border-subtle/80 pl-3 text-xs font-sans">
            {headings.map((heading) => {
              const isActive = activeId === heading.id;

              return (
                <li
                  key={heading.id}
                  className={cn(
                    "transition-all duration-200",
                    heading.level === 3 ? "pl-3 text-charcoal/65" : "text-charcoal/80"
                  )}
                >
                  <a
                    href={`#${heading.id}`}
                    onClick={(e) => handleHeadingClick(e, heading.id)}
                    className={cn(
                      "relative block py-1 transition-colors leading-relaxed",
                      isActive
                        ? "text-forest font-medium -ml-[13px] pl-3 border-l-2 border-forest"
                        : "hover:text-forest"
                    )}
                  >
                    {heading.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

