"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export interface ConsultationFeedbackProps {
  status: "success" | "error";
  errorMessage?: string | null;
  onReset?: () => void;
  className?: string;
}

/**
 * Consultation Submission Feedback State Component (P8-07)
 *
 * Implements dignified, non-promotional status messaging:
 * - Success view: Explains transmission confirmation, non-solicitation, conflict check notice.
 *   Strictly omits unverified 24-48 hour response promises.
 * - Error view: Provides clear guidance on validation, rate-limiting, or backend availability.
 * - Preserves user input for recoverable submission errors.
 */
export function ConsultationFeedback({
  status,
  errorMessage,
  onReset,
  className,
}: ConsultationFeedbackProps) {
  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className={cn(
          "relative overflow-hidden rounded-2xl sm:rounded-3xl border border-forest/30 bg-surface-card p-8 sm:p-10 md:p-12 shadow-sm text-center",
          className
        )}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest/40 to-transparent"
          aria-hidden="true"
        />

        <div className="mx-auto w-12 h-12 rounded-full bg-forest/10 border border-forest/20 flex items-center justify-center text-forest mb-6">
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-forest block mb-2">
          TRANSMISSION CONFIRMED
        </span>

        <h3 className="font-serif text-2xl sm:text-3xl font-normal text-charcoal tracking-tight">
          Enquiry Received in Chambers
        </h3>

        <div className="mt-5 max-w-lg mx-auto space-y-3.5 text-sm sm:text-base font-sans text-charcoal/80 leading-relaxed">
          <p>
            Your preliminary matter overview has been transmitted to chambers. Submissions undergo
            formal conflict checks prior to prospective client conferences.
          </p>
          <p className="text-xs sm:text-sm text-charcoal/65">
            <strong>Regulatory Notice:</strong> Receipt of this transmission does not establish an
            advocate-client relationship. Confidential, privileged, or time-sensitive legal documents
            must not be transmitted prior to formal execution of an engagement letter.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-border-subtle flex flex-wrap items-center justify-center gap-3">
          <Button href="/" variant="primary" size="md">
            Return to Chambers Foyer
          </Button>

          {onReset && (
            <Button type="button" variant="outline" size="md" onClick={onReset}>
              Submit another enquiry
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Error State
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        "relative overflow-hidden rounded-2xl sm:rounded-3xl border border-red-900/20 bg-surface-card p-6 sm:p-8 shadow-xs",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="w-9 h-9 rounded-full bg-red-100/80 border border-red-200 flex items-center justify-center text-red-800 shrink-0 mt-0.5">
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
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        <div className="space-y-1.5 flex-1">
          <h4 className="font-serif text-lg font-medium text-charcoal">
            Unable to Process Submission
          </h4>
          <p className="text-sm font-sans text-charcoal/80 leading-relaxed">
            {errorMessage ||
              "An unexpected error occurred while communicating with the chambers endpoint. Your inputs have been preserved."}
          </p>
          <p className="text-xs font-sans text-charcoal/60 pt-1">
            If the issue persists, please arrange matter conferences directly through chambers liaison.
          </p>
        </div>
      </div>
    </div>
  );
}

