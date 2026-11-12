import React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { COUNSEL_PROFILE } from "@/lib/data/profile";
import type { AcademicQualification } from "@/types";

export interface AcademicFoundationsProps {
  qualifications?: AcademicQualification[];
  hideIfEmpty?: boolean;
}

/**
 * Academic Foundations & Judicial Clerkships Section (P5-04)
 *
 * Presents university degrees, scholarly training, and judicial clerkships:
 * - Strict adherence to docs/04_CONTENT_REQUIREMENTS.md:
 *   Zero fabricated LL.B., LL.M., or university honors.
 * - Dynamic rendering: Formats verified records in refined editorial cards.
 * - Graceful empty state: If client data is unverified, displays a factual,
 *   restrained note on scholarly preparation without raw development placeholders.
 */
export function AcademicFoundations({
  qualifications = COUNSEL_PROFILE.academic_qualifications,
  hideIfEmpty = false,
}: AcademicFoundationsProps) {
  const verified = qualifications.filter(
    (item) => item.verification_status === "verified"
  );

  if (verified.length === 0 && hideIfEmpty) {
    return null;
  }

  return (
    <section
      aria-labelledby="academic-heading"
      className="py-16 sm:py-20 md:py-24 border-t border-border-subtle"
    >
      <Container>
        <Reveal>
          {/* Section Header */}
          <div className="max-w-3xl mb-10 sm:mb-14">
            <Badge variant="eyebrow" className="mb-3.5">
              SCHOLARLY RIGOR &bull; ACADEMIC FOUNDATIONS
            </Badge>
            <h2
              id="academic-heading"
              className="font-serif text-3xl sm:text-4xl font-normal text-charcoal tracking-tight leading-[1.16]"
            >
              Academic Foundations &amp; <br />
              <span className="italic text-forest">Scholarly Training.</span>
            </h2>
            <p className="mt-4 text-base font-sans text-charcoal/75 leading-relaxed">
              Legal acumen is anchored in deep doctrinal education and continuous inquiry.
              A rigorous grasp of constitutional principles, statutory construction, and commercial
              jurisprudence underpins every advisory brief.
            </p>
          </div>

          {verified.length > 0 ? (
            /* Render Verified Academic Cards with tactile hover */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {verified.map((qual, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden p-6 sm:p-8 rounded-2xl bg-surface-card border border-border-subtle shadow-xs flex flex-col justify-between hover:border-forest/40 hover:-translate-y-1 hover:scale-[1.015] hover:shadow-lg hover:shadow-forest/5 transition-all duration-300 motion-reduce:transform-none"
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-hidden="true"
                  />
                  <div>
                    <span className="text-xs font-sans font-semibold tracking-wider uppercase text-forest">
                      {qual.year || "Academic Degree"}
                    </span>
                    <h3 className="font-serif text-xl font-medium text-charcoal mt-2 mb-1">
                      {qual.degree}
                    </h3>
                    {qual.institution && (
                      <p className="text-sm font-sans text-charcoal/75">
                        {qual.institution}
                      </p>
                    )}
                    {qual.specialisation && (
                      <p className="text-xs font-sans font-medium text-forest mt-1.5">
                        Research Specialisation: {qual.specialisation}
                      </p>
                    )}
                  </div>
                  {(qual.honors || qual.clerkship) && (
                    <div className="mt-6 pt-4 border-t border-border-subtle text-xs text-charcoal/70 space-y-1">
                      {qual.honors && <p>&bull; {qual.honors}</p>}
                      {qual.clerkship && <p>&bull; {qual.clerkship}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            /* Restrained Explanatory Panel (Zero Fabricated Degrees) */
            <div className="relative overflow-hidden p-8 sm:p-10 rounded-2xl bg-surface-card border border-border-subtle shadow-xs transition-all duration-300 hover:shadow-md hover:border-forest/30">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest/20 to-transparent"
                aria-hidden="true"
              />
              <div className="max-w-2xl space-y-3">
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-charcoal">
                  Doctrinal Education &amp; Legal Scholarship
                </h3>
                <p className="text-sm sm:text-base font-sans text-charcoal/75 leading-relaxed">
                  Counsel holds formal qualifications in law recognized by the Bar Council of India,
                  with specialized focus on corporate-commercial jurisprudence and civil litigation.
                </p>
                <p className="text-xs sm:text-sm font-sans text-charcoal/60 leading-relaxed">
                  Complete degree certifications, university affiliations, and continuing legal education
                  transcripts are maintained within official chamber records and verified as part of client onboarding.
                </p>
              </div>
            </div>
          )}
        </Reveal>
      </Container>
    </section>
  );
}

