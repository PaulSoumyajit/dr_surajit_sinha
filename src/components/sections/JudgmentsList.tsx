import React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { JUDGMENTS } from "@/lib/data/judgments";
import type { Judgment } from "@/types";

export interface JudgmentsListProps {
  judgments?: Judgment[];
  onSelectJudgment?: (judgment: Judgment) => void;
}

/**
 * Selected Reported Judgments Directory (P6-05)
 *
 * Implements the public judicial record repository for /judgments:
 * - Prominent BCI Rule 36 non-solicitation disclaimer banner.
 * - When verified judgments exist: Renders structured judgment cards with neutral citations,
 *   court benches, counsel roles, and links to official court repositories.
 * - Zero-record behaviour (Strict adherence to docs/04_CONTENT_REQUIREMENTS.md):
 *   Renders a dignified empty state explaining the public record repository without
 *   inventing fictional case citations (e.g. fake SCC/AIR numbers) or party names.
 */
export function JudgmentsList({
  judgments = JUDGMENTS,
  onSelectJudgment,
}: JudgmentsListProps) {
  return (
    <section
      aria-labelledby="judgments-heading"
      className="pt-8 sm:pt-12 pb-16 sm:pb-24"
    >
      <Container>
        <Reveal>
          {/* Mandatory Regulatory & BCI Rule 36 Disclosure Banner with Liquid Glass styling */}
          <div className="relative overflow-hidden p-5 sm:p-6 rounded-2xl bg-surface/85 backdrop-blur-md border border-border-subtle text-xs font-sans text-charcoal/75 leading-relaxed mb-10 sm:mb-12 shadow-xs">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest/20 to-transparent"
              aria-hidden="true"
            />
            <div className="flex items-start gap-3">
              <span className="text-forest text-base leading-none mt-0.5" aria-hidden="true">&bull;</span>
              <div className="space-y-1.5">
                <p className="font-semibold text-charcoal uppercase tracking-wider text-[11px]">
                  IMPORTANT REGULATORY NOTICE &bull; BAR COUNCIL OF INDIA COMPLIANCE
                </p>
                <p>
                  Judgments, court orders, and legal ratios documented on this website are derived solely
                  from public judicial records and presented exclusively for informational reference.
                  Past court appearances or reported judicial decisions do not constitute a representation,
                  promise, or guarantee of future outcomes in any legal matter, nor do they establish an
                  advocate-client relationship.
                </p>
              </div>
            </div>
          </div>

          {/* Eyebrow & Page Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <Badge variant="eyebrow" className="mb-3.5">
              PUBLIC JUDICIAL RECORD &bull; REPORTED DECISIONS
            </Badge>
            <h1
              id="judgments-heading"
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal text-charcoal tracking-tight leading-[1.12]"
            >
              Selected Reported Judgments &amp; <br />
              <span className="italic text-forest">Judicial Decisions.</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg md:text-xl font-sans text-charcoal/75 leading-relaxed">
              Public court decisions and reported rulings across commercial arbitration,
              contractual interpretation, and appellate litigation before Indian courts.
            </p>
          </div>

          {judgments.length > 0 ? (
            /* Render Verified Judgments List with tactile hover */
            <div className="space-y-6">
              {judgments.map((judgment) => (
                <div
                  key={judgment.id}
                  className="group relative overflow-hidden p-6 sm:p-8 rounded-2xl bg-surface-card border border-border-subtle shadow-xs hover:border-forest/40 hover:-translate-y-1 hover:shadow-md transition-all duration-300 motion-reduce:transform-none"
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-hidden="true"
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-border-subtle/80 text-xs font-mono text-charcoal/60">
                    <span className="font-semibold text-forest">
                      {judgment.neutral_citation}
                    </span>
                    <span>{judgment.court_bench}</span>
                  </div>

                  <h2 className="font-serif text-2xl font-normal text-charcoal mb-2">
                    {judgment.case_title}
                  </h2>

                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <Badge variant="pill" showDot={false} className="text-xs">
                      {judgment.legal_subject}
                    </Badge>
                    <span className="text-xs font-sans text-charcoal/70">
                      Role: <strong className="font-medium text-charcoal">{judgment.counsel_role}</strong>
                    </span>
                  </div>

                  <p className="text-sm sm:text-base font-sans text-charcoal/80 leading-relaxed mb-6">
                    {judgment.ratio_summary}
                  </p>

                  <div className="pt-4 border-t border-border-subtle flex flex-wrap items-center gap-3">
                    {onSelectJudgment && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onSelectJudgment(judgment)}
                      >
                        Inspect legal ratio
                      </Button>
                    )}
                    {judgment.official_report_url && (
                      <Button
                        href={judgment.official_report_url}
                        variant="outline"
                        size="sm"
                        showArrow={true}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Official court record
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Dignified Empty State (Zero Fabricated Cases) */
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border-subtle bg-surface-card p-8 sm:p-12 md:p-14 shadow-xs transition-all duration-300 hover:shadow-md hover:border-forest/30">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest/20 to-transparent"
                aria-hidden="true"
              />
              <div className="max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/5 border border-forest/15 text-xs font-sans font-semibold uppercase tracking-[0.14em] text-forest">
                  <span>PUBLIC JUDICIAL RECORD &bull; OFFICIAL REPOSITORY</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-charcoal">
                  Court Appearances &amp; Prosecution Record
                </h2>
                <p className="text-base font-sans text-charcoal/80 leading-relaxed">
                  Dr. Surajit Sinha appears before the High Court of Calcutta and subordinate courts
                  across criminal litigation, public prosecution matters, POCSO proceedings, and tribunal representations.
                </p>
                <p className="text-sm font-sans text-charcoal/65 leading-relaxed">
                  Verified neutral citations, reported law journal entries (SCC, AIR, High Court reports),
                  and public case repository records where counsel appeared are documented in this
                  official repository upon formal confirmation from certified court rolls.
                </p>
                <div className="pt-4 border-t border-border-subtle/80 flex items-center gap-2 text-xs font-sans text-charcoal/60">
                  <span className="text-forest" aria-hidden="true">&bull;</span>
                  <span>
                    Judicial records are indexed solely from official public court registers in compliance with BCI Rule 36.
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

