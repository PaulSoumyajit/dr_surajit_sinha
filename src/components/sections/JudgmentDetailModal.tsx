"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EASE_LUXE, DURATION_FAST } from "@/lib/utils";
import type { Judgment } from "@/types";

export interface JudgmentDetailModalProps {
  judgment: Judgment | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Judgment Detail & Legal Ratio Modal / Drawer (P6-06)
 *
 * Implements an accessible slide-over sheet / modal for inspecting substantive judicial ratios:
 * - WAI-ARIA dialog semantics (`role="dialog"`, `aria-modal="true"`, focus management).
 * - Keyboard accessible: `Escape` key closes the dialog; focus restored to invoking trigger.
 * - Backdrop click closes dialog; background scrolling locked while open.
 * - Displays neutral citation, court bench, counsel's verified role, and legal ratio.
 * - Conforms to BCI Rule 36: Presented for informational reference only.
 */
export function JudgmentDetailModal({
  judgment,
  isOpen,
  onClose,
}: JudgmentDetailModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close on Escape key & Lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus close button on mount
    closeButtonRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && judgment && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="judgment-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-end"
        >
          {/* Backdrop Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION_FAST }}
            onClick={onClose}
            className="fixed inset-0 bg-forest-deep/60 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
          />

          {/* Slide-Over Drawer Sheet */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: EASE_LUXE }}
            className="relative z-10 w-full max-w-xl h-full bg-surface-card/95 backdrop-blur-xl border-l border-border-subtle shadow-2xl flex flex-col justify-between overflow-y-auto"
          >
            {/* Left specular edge */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-forest/20 to-transparent"
              aria-hidden="true"
            />

            {/* Drawer Header with glass blur */}
            <div className="p-6 sm:p-8 border-b border-border-subtle bg-surface-card/80 backdrop-blur-md flex items-start justify-between gap-4 sticky top-0 z-20">
              <div>
                <span className="text-xs font-mono font-semibold tracking-wider text-forest block mb-1">
                  {judgment.neutral_citation}
                </span>
                <span className="text-xs font-sans text-charcoal/60 block">
                  {judgment.court_bench}
                </span>
              </div>

              {/* Close Button with tactile hover */}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close judgment detail modal"
                className="p-2 rounded-full text-charcoal/60 hover:text-charcoal hover:bg-stone-subtle hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-forest"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Substantive Content */}
            <div className="p-6 sm:p-8 space-y-6 flex-1">
              <div>
                <h2
                  id="judgment-modal-title"
                  className="font-serif text-2xl sm:text-3xl font-normal text-charcoal leading-snug"
                >
                  {judgment.case_title}
                </h2>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <Badge variant="pill" showDot={false}>
                    {judgment.legal_subject}
                  </Badge>
                  <span className="text-xs font-sans text-charcoal/70">
                    Role: <strong className="font-medium text-charcoal">{judgment.counsel_role}</strong>
                  </span>
                </div>
              </div>

              {/* Substantive Judicial Ratio Summary */}
              <div className="space-y-3 pt-4 border-t border-border-subtle">
                <h3 className="text-xs font-sans font-semibold uppercase tracking-wider text-forest">
                  Substantive Judicial Ratio
                </h3>
                <p className="text-sm sm:text-base font-sans text-charcoal/80 leading-relaxed">
                  {judgment.ratio_summary}
                </p>
              </div>

              {/* Regulatory Notice Note */}
              <div className="p-4 rounded-xl bg-surface border border-border-subtle text-xs font-sans text-charcoal/65 leading-relaxed">
                <p>
                  &bull; This judicial ratio is summarized for legal reference from published court records.
                  Past judicial rulings do not guarantee similar outcomes in subsequent matters.
                </p>
              </div>
            </div>

            {/* Drawer Action Footer with glass blur */}
            <div className="p-6 sm:p-8 border-t border-border-subtle bg-surface/70 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 sticky bottom-0 z-20">
              {judgment.official_report_url ? (
                <Button
                  href={judgment.official_report_url}
                  variant="primary"
                  size="md"
                  showArrow={true}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Official court record
                </Button>
              ) : (
                <span className="text-xs font-sans text-charcoal/60">
                  Certified court roll citation: {judgment.neutral_citation}
                </span>
              )}

              <Button variant="outline" size="md" onClick={onClose}>
                Close
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

