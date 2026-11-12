"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "ss_bci_regulatory_notice_dismissed";

/**
 * Persistent Bar Council Regulatory Notice Bar
 *
 * Implements an understated, non-intrusive compliance notice:
 * - Positioned at the top of the site shell.
 * - Informs visitors of Bar Council of India Rule 36 status.
 * - Dismissible per browser tab session via sessionStorage.
 * - Safeguarded against SSR hydration mismatches and private mode storage errors.
 */
export function RegulatoryNoticeBar() {
  const [isMounted, setIsMounted] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored === "true") {
        setIsDismissed(true);
      }
    } catch {
      // Gracefully handle environments with restricted storage access
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // Storage access blocked or restricted
    }
  };

  // Prevent flash or hydration mismatch prior to client-side mount
  if (!isMounted || isDismissed) {
    return null;
  }

  return (
    <aside
      aria-label="Regulatory Notice"
      className={cn(
        "relative z-50 w-full bg-stone-subtle/85 backdrop-blur-md border-b border-border-subtle py-2 px-4 select-none",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.7)] transition-all duration-300 ease-out"
      )}
    >
      <Container className="flex items-center justify-between gap-3 text-xs font-sans text-muted-slate">
        <div className="flex-1 flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-forest shrink-0" aria-hidden="true" />
          <span>
            Advocate profile published strictly for informational purposes under Bar Council of India rules.
          </span>
          <Link
            href="/disclaimer"
            className="text-forest font-medium underline underline-offset-2 hover:text-forest-deep transition-colors ml-1"
          >
            Review regulatory disclosure &rarr;
          </Link>
        </div>

        {/* Close / Dismiss Action */}
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss regulatory notice for this session"
          className={cn(
            "p-1 -mr-1 rounded text-muted-slate hover:text-charcoal transition-colors shrink-0",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-forest"
          )}
        >
          <span className="sr-only">Dismiss notice</span>
          <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          >
            <line x1="4" y1="4" x2="12" y2="12" />
            <line x1="12" y1="4" x2="4" y2="12" />
          </svg>
        </button>
      </Container>
    </aside>
  );
}

