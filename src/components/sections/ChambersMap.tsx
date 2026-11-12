import React from "react";
import { COUNSEL_PROFILE } from "@/lib/data/profile";
import { cn } from "@/lib/utils";

export interface ChambersMapProps {
  address?: string | null;
  courtComplex?: string | null;
  mapUrl?: string | null;
  className?: string;
}

/**
 * Chambers Location Card & Map Link (P8-04)
 *
 * Strict Compliance Guard (docs/04_CONTENT_REQUIREMENTS.md):
 * - Never guesses coordinates, gate numbers, or Google Maps destinations.
 * - Conditionally returns null when address information is unverified.
 * - When verified coordinates or formal address are supplied, renders an
 *   editorial static location card with safe outbound navigation.
 */
export function ChambersMap({
  address = COUNSEL_PROFILE.chamber_address,
  courtComplex = COUNSEL_PROFILE.court_chambers,
  mapUrl,
  className,
}: ChambersMapProps) {
  // Conditionally hide when no verified location exists (zero fabricated maps)
  if (!address && !courtComplex && !mapUrl) {
    return null;
  }

  return (
    <div
      aria-label="Chambers Location"
      className={cn(
        "relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border-subtle bg-surface-card p-6 sm:p-8 shadow-xs",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest/20 to-transparent"
        aria-hidden="true"
      />

      <div className="space-y-4">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-forest block">
          PHYSICAL LOCATION &bull; CHAMBERS
        </span>

        {address && (
          <div>
            <span className="text-xs text-charcoal/60 uppercase font-sans font-medium block">
              Principal Chambers
            </span>
            <p className="font-serif text-lg text-charcoal mt-1 leading-snug">
              {address}
            </p>
          </div>
        )}

        {courtComplex && (
          <div className="pt-3 border-t border-border-subtle/80">
            <span className="text-xs text-charcoal/60 uppercase font-sans font-medium block">
              Court Complex Study
            </span>
            <p className="font-serif text-base text-charcoal mt-1 leading-snug">
              {courtComplex}
            </p>
          </div>
        )}

        {mapUrl && (
          <div className="pt-4 border-t border-border-subtle">
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-forest hover:text-forest-deep hover:underline"
            >
              <span>Open in Maps</span>
              <span aria-hidden="true">&nearr;</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

