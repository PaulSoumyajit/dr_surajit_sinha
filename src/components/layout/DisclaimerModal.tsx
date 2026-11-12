"use client";

import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/Button";

const DISCLAIMER_STORAGE_KEY = "bci-disclaimer-acknowledged-v1";

/**
 * Bar Council of India Regulatory Disclaimer Entrance Modal (P8-05)
 *
 * Implements the mandatory regulatory gate:
 * - Displays exact BCI Rule 36 non-solicitation declaration.
 * - Accessible dialog semantics (role="dialog", aria-modal="true").
 * - Focus lock and body scroll lock while unacknowledged.
 * - Requires explicit user acknowledgement before dismissal.
 * - Versioned localStorage persistence (bci-disclaimer-acknowledged-v1).
 * - Client-side only rendering to prevent SSR hydration mismatch.
 */
export function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const acknowledgeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsMounted(true);
    try {
      const acknowledged = localStorage.getItem(DISCLAIMER_STORAGE_KEY);
      if (!acknowledged) {
        setIsOpen(true);
      }
    } catch {
      // If localStorage is unavailable/restricted, show disclaimer safely
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    // Lock body scrolling while disclaimer is unacknowledged
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus the acknowledge button on mount
    const timer = setTimeout(() => {
      acknowledgeButtonRef.current?.focus();
    }, 100);

    // Prevent Escape key from dismissing mandatory notice without acknowledgment
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
      } else if (e.key === "Tab") {
        // Trap focus to acknowledge button
        e.preventDefault();
        acknowledgeButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const handleAcknowledge = () => {
    try {
      localStorage.setItem(DISCLAIMER_STORAGE_KEY, "true");
    } catch {
      // Storage access blocked or restricted
    }
    setIsOpen(false);
  };

  // Prevent hydration mismatch
  if (!isMounted || !isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="bci-disclaimer-title"
      aria-describedby="bci-disclaimer-desc"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8"
    >
      {/* Blurred Opaque Backdrop Scrim (Non-clickable to prevent accidental dismissal) */}
      <div
        className="fixed inset-0 bg-forest-deep/85 backdrop-blur-md transition-opacity"
        aria-hidden="true"
      />

      {/* Editorial Disclaimer Modal Card with Liquid Glass specular highlights */}
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl sm:rounded-3xl border border-warm-ivory/20 bg-primary-canvas p-6 sm:p-8 md:p-10 shadow-2xl">
        {/* Specular top reflection line */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest/30 to-transparent"
          aria-hidden="true"
        />

        {/* Eyebrow & Headline */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/10 border border-forest/20 text-xs font-mono font-semibold uppercase tracking-wider text-forest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-forest shrink-0" aria-hidden="true" />
            <span>BAR COUNCIL OF INDIA RULE 36</span>
          </div>

          <h2
            id="bci-disclaimer-title"
            className="font-serif text-2xl sm:text-3xl font-normal text-charcoal tracking-tight"
          >
            Important Regulatory Notice
          </h2>
        </div>

        {/* Exact Approved Declaration Text */}
        <div id="bci-disclaimer-desc" className="space-y-4 text-xs sm:text-sm font-sans text-charcoal/80 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
          <p>
            Under the rules of the Bar Council of India, an advocate is prohibited from soliciting work
            or advertising their practice either directly or indirectly. By proceeding to browse this website,
            the user acknowledges the following:
          </p>

          <ol className="space-y-2.5 pl-5 list-decimal text-charcoal/85">
            <li className="pl-1">
              The user wishes to gain more information about Dr. Surajit Sinha, his practice areas,
              and his professional background solely for their own informational purposes.
            </li>
            <li className="pl-1">
              The information provided on this website is made available exclusively at the user&apos;s specific
              request and does not constitute legal advice, solicitation, or personal marketing.
            </li>
            <li className="pl-1">
              No advocate-client relationship is formed through browsing this website or submitting an exploratory
              consultation enquiry.
            </li>
            <li className="pl-1">
              The advocate is not liable for any action taken by the user based on materials or information published
              on this website.
            </li>
          </ol>
        </div>

        {/* Action Acknowledgement Button */}
        <div className="mt-8 pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[11px] font-sans text-charcoal/60 leading-tight">
            Advocate on Roll &bull; Enrolled under the Advocates Act, 1961
          </p>

          <Button
            ref={acknowledgeButtonRef}
            type="button"
            variant="primary"
            size="lg"
            showArrow={true}
            onClick={handleAcknowledge}
            className="w-full sm:w-auto"
          >
            I Acknowledge and Proceed
          </Button>
        </div>
      </div>
    </div>
  );
}

