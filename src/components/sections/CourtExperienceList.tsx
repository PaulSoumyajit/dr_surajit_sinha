import React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { COURT_EXPERIENCE_ITEMS } from "@/lib/data/court-experience";

/**
 * Court & Prosecution Experience Repository
 * Dr. Surajit Sinha — Advocate, High Court & Lower Courts
 *
 * Implements the verified court practice portfolio:
 * - Prominent BCI Rule 36 non-solicitation disclaimer banner.
 * - Structured records of public prosecution appointments (APP, PP, POCSO in-charge, Cyber SPP).
 * - Criminal trial litigation (~19 years), DRT proceedings, High Court writ jurisdiction, and land revenue matters.
 * - Documented senior counsel collaborations without outcome or victory guarantees.
 * - Strictly preserves the approved visual design, typography scale, and card styling.
 */
export function CourtExperienceList() {
  return (
    <section
      aria-labelledby="court-experience-heading"
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
                  Professional court appearances, prosecution tenures, and tribunal proceedings documented on this
                  website are derived from verified professional records and presented exclusively for informational
                  reference. Past court engagements or state appointments do not constitute a representation,
                  promise, or guarantee of future outcomes in any legal matter, nor do they establish an
                  advocate-client relationship.
                </p>
              </div>
            </div>
          </div>

          {/* Eyebrow & Page Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <Badge variant="eyebrow" className="mb-3.5">
              COURT PRACTICE &bull; PUBLIC PROSECUTION
            </Badge>
            <h1
              id="court-experience-heading"
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal text-charcoal tracking-tight leading-[1.12]"
            >
              Court &amp; Prosecution <br />
              <span className="italic text-forest">Experience.</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg md:text-xl font-sans text-charcoal/75 leading-relaxed">
              Extensive trial practice and public prosecution appointments across criminal law,
              POCSO proceedings, cybercrime prosecution, Debt Recovery Tribunals, and High Court writ jurisdiction.
            </p>
          </div>

          {/* Court Experience Cards */}
          <div className="space-y-6">
            {COURT_EXPERIENCE_ITEMS.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden p-6 sm:p-8 rounded-2xl bg-surface-card border border-border-subtle shadow-xs hover:border-forest/40 hover:-translate-y-1 hover:shadow-md transition-all duration-300 motion-reduce:transform-none"
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-hidden="true"
                />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-border-subtle/80 text-xs font-mono text-charcoal/60">
                  <span className="font-semibold text-forest">
                    {item.forum}
                  </span>
                  {item.tenure && <span>{item.tenure}</span>}
                </div>

                <h2 className="font-serif text-2xl font-normal text-charcoal mb-2">
                  {item.title}
                </h2>

                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Badge variant="pill" showDot={false} className="text-xs">
                    {item.role}
                  </Badge>
                </div>

                <p className="text-sm sm:text-base font-sans text-charcoal/80 leading-relaxed mb-6">
                  {item.description}
                </p>

                {item.statutory_basis && item.statutory_basis.length > 0 && (
                  <div className="pt-4 border-t border-border-subtle/70">
                    <span className="text-xs font-mono font-medium text-charcoal/60 uppercase tracking-wider block mb-2">
                      Key Statutory Touchpoints:
                    </span>
                    <ul className="flex flex-wrap gap-2 text-xs font-sans text-charcoal/75">
                      {item.statutory_basis.map((statute, sIdx) => (
                        <li
                          key={sIdx}
                          className="px-2.5 py-1 rounded-md bg-surface border border-border-subtle text-charcoal/75 font-mono text-[11px]"
                        >
                          {statute}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer Notice Card */}
          <div className="mt-12 p-6 rounded-2xl bg-surface border border-border-subtle text-xs font-sans text-charcoal/65 leading-relaxed">
            <p>
              &bull; <strong>Judicial Record Compliance:</strong> Historical prosecution tenures and court
              appearances are published in strict compliance with the Bar Council of India Rules.
              Client confidentiality and statutory protections governing sensitive proceedings (including POCSO matters)
              are rigorously safeguarded. No identifying victim or case specifics are published.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

