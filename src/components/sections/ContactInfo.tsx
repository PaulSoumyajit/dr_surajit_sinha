import React from "react";
import { Badge } from "@/components/ui/Badge";
import { COUNSEL_PROFILE } from "@/lib/data/profile";
import { cn } from "@/lib/utils";

export interface ContactInfoProps {
  className?: string;
}

/**
 * Chambers Information & Intake Protocol (P8-01)
 *
 * Strict Compliance Guard (docs/04_CONTENT_REQUIREMENTS.md):
 * - Renders exclusively confirmed lawyer facts.
 * - Conditionally omits unverified chamber street addresses, telephone numbers,
 *   and clerk names without leaving raw placeholders or empty boxes.
 * - Outlines formal consultation procedures, conflict clearance protocols,
 *   and briefing formats under Bar Council of India Rule 36.
 */
export function ContactInfo({ className }: ContactInfoProps) {
  const profile = COUNSEL_PROFILE;

  return (
    <div
      aria-label="Chambers Contact Information and Intake Protocol"
      className={cn(
        "relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border-subtle bg-surface-card p-6 sm:p-8 md:p-10 shadow-xs flex flex-col justify-between",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest/20 to-transparent"
        aria-hidden="true"
      />

      <div className="space-y-6">
        <div>
          <Badge variant="eyebrow" className="mb-3">
            CHAMBERS LIAISON &bull; INTAKE PROTOCOL
          </Badge>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-charcoal tracking-tight">
            Consultation &amp; Matter Briefing
          </h2>
          <p className="mt-3 text-sm sm:text-base font-sans text-charcoal/75 leading-relaxed">
            Dr. Surajit Sinha maintains an independent counsel practice across criminal litigation,
            public prosecution proceedings, cyber law, civil litigation, and banking dispute resolution.
            Preliminary conferences are arranged for matter briefing, legal evaluation, and court representation.
          </p>
        </div>

        {/* Verified Counsel Credentials Snapshot */}
        <div className="pt-6 border-t border-border-subtle/80 space-y-3">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-forest block">
            PRACTICE JURISDICTION &bull; ADMISSION
          </span>
          <div className="space-y-1.5 text-sm font-sans text-charcoal/80">
            <p>
              <strong className="font-medium text-charcoal">Counsel:</strong> {profile.name}
            </p>
            <p>
              <strong className="font-medium text-charcoal">Designation:</strong> {profile.title}
            </p>
            <p>
              <strong className="font-medium text-charcoal">Bar Standing:</strong> Enrolled Advocate, Advocates Act, 1961
            </p>
            <p>
              <strong className="font-medium text-charcoal">Primary Venues:</strong> High Court of Calcutta &amp; Subordinate Courts (Sessions, Special POCSO, Cyber &amp; DRT)
            </p>
          </div>
        </div>

        {/* Verified Core Disciplines */}
        <div className="pt-6 border-t border-border-subtle/80 space-y-3">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-forest block">
            CORE PRACTICE DOMAINS
          </span>
          <div className="flex flex-wrap gap-2">
            {profile.core_disciplines.map((d) => (
              <Badge key={d} variant="pill" showDot={false}>
                {d}
              </Badge>
            ))}
          </div>
        </div>

        {/* Matter Intake Protocol */}
        <div className="pt-6 border-t border-border-subtle/80 space-y-3">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-forest block">
            CHAMBERS PROTOCOL &bull; CONFLICT VERIFICATION
          </span>
          <div className="space-y-2.5 text-xs sm:text-sm font-sans text-charcoal/75 leading-relaxed">
            <p className="flex items-start gap-2">
              <span className="text-forest mt-0.5" aria-hidden="true">&bull;</span>
              <span>
                <strong>Conflict Clearance:</strong> Every inquiry is screened for institutional and
                adversarial conflicts of interest prior to substantive briefing.
              </span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-forest mt-0.5" aria-hidden="true">&bull;</span>
              <span>
                <strong>Conference Formats:</strong> Matter conferences are arranged by appointment at
                chambers or conducted via secure communication channels.
              </span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-forest mt-0.5" aria-hidden="true">&bull;</span>
              <span>
                <strong>Urgent Applications &amp; Bail:</strong> For time-sensitive criminal proceedings,
                bail petitions under Section 439, anticipatory bail under Section 438, or urgent court listings,
                please indicate statutory urgency in your submission overview.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Regulatory Reassurance Footer */}
      <div className="mt-8 pt-6 border-t border-border-subtle text-xs font-sans text-charcoal/60 leading-normal">
        <p>
          Consultation requests are processed exclusively for preliminary assessment and informational
          purposes under Bar Council of India Rule 36.
        </p>
      </div>
    </div>
  );
}

