import React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { COUNSEL_PROFILE } from "@/lib/data/profile";
import type { ProfessionalAdmission } from "@/types";

export interface AdmissionsTableProps {
  admissions?: ProfessionalAdmission[];
}

/**
 * Formal Admissions & Bar Affiliations Table (P5-03)
 *
 * Implements the professional credential disclosure module:
 * - Columns: Court / Body, Enrolment Year, Standing, Jurisdiction.
 * - Strict adherence to docs/04_CONTENT_REQUIREMENTS.md:
 *   Zero invented enrolment numbers, fake dates, or fictional bar memberships.
 * - Responsive table architecture: horizontal scroll protection on small screens.
 * - Graceful conditional presentation: When verified records are provided, renders
 *   the editorial table; otherwise presents a discreet, factual regulatory standing notice
 *   without exposing internal placeholder tags.
 */
export function AdmissionsTable({
  admissions = COUNSEL_PROFILE.professional_admissions,
}: AdmissionsTableProps) {
  const verifiedAdmissions = admissions.filter(
    (item) => item.verification_status === "verified"
  );

  return (
    <section
      aria-labelledby="admissions-heading"
      className="py-16 sm:py-20 md:py-24 border-t border-border-subtle bg-surface"
    >
      <Container>
        <Reveal>
          {/* Section Header */}
          <div className="max-w-3xl mb-10 sm:mb-12">
            <Badge variant="eyebrow" className="mb-3.5">
              REGULATORY STANDING &bull; COURT ADMISSIONS
            </Badge>
            <h2
              id="admissions-heading"
              className="font-serif text-3xl sm:text-4xl font-normal text-charcoal tracking-tight leading-[1.16]"
            >
              Admissions &amp; <br />
              <span className="italic text-forest">Bar Affiliations.</span>
            </h2>
            <p className="mt-4 text-base font-sans text-charcoal/75 leading-relaxed">
              Advocates in India are enrolled under the Advocates Act, 1961, and governed
              by the statutory rules of the Bar Council of India and respective State Bar Councils.
            </p>
          </div>

          {verifiedAdmissions.length > 0 ? (
            /* Render Verified Table */
            <div className="overflow-x-auto rounded-2xl border border-border-subtle bg-surface-card shadow-xs transition-shadow duration-300 hover:shadow-md">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-border-subtle bg-stone-subtle/50 text-xs font-sans font-semibold uppercase tracking-wider text-charcoal/70">
                    <th scope="col" className="py-4 px-6">Court / Body</th>
                    <th scope="col" className="py-4 px-6">Enrolment Year</th>
                    <th scope="col" className="py-4 px-6">Standing</th>
                    <th scope="col" className="py-4 px-6">Jurisdiction</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle font-sans text-sm text-charcoal/80">
                  {verifiedAdmissions.map((admission, idx) => (
                    <tr key={idx} className="hover:bg-warm-ivory/60 transition-colors">
                      <td className="py-4 px-6 font-medium text-charcoal">
                        {admission.court_or_body}
                        {admission.enrolment_number && (
                          <span className="block text-xs font-mono text-charcoal/60 mt-0.5">
                            {admission.enrolment_number}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-charcoal/75">
                        {admission.year || "—"}
                      </td>
                      <td className="py-4 px-6 text-charcoal/75">
                        {admission.standing || "Enrolled Advocate"}
                      </td>
                      <td className="py-4 px-6 text-charcoal/75">
                        {admission.jurisdiction || "India"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* Dignified Explanatory Card (Zero Fabricated Records) with Liquid Glass status badge */
            <div className="relative overflow-hidden rounded-2xl border border-border-subtle bg-surface-card p-6 sm:p-8 md:p-10 shadow-xs transition-all duration-300 hover:shadow-md hover:border-forest/30">
              {/* Top specular reflection */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest/20 to-transparent"
                aria-hidden="true"
              />
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="space-y-3 max-w-2xl">
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-charcoal">
                    Statutory Enrolment Standing
                  </h3>
                  <p className="text-sm sm:text-base font-sans text-charcoal/75 leading-relaxed">
                    Dr. Surajit Sinha is enrolled with the statutory Bar Council under the
                    Advocates Act, 1961, and is entitled to practice law before all Courts, Tribunals,
                    and Appellate authorities across West Bengal and India, including the High Court at Calcutta.
                  </p>
                  <p className="text-xs sm:text-sm font-sans text-charcoal/60 leading-relaxed">
                    Specific State Bar Council enrolment numbers and institutional court bar association
                    admissions are documented on official court records and verified prior to entering appearances.
                  </p>
                </div>
                <div className="shrink-0 p-5 rounded-xl bg-forest-deep text-warm-ivory text-center min-w-[200px] border border-warm-ivory/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] transition-transform duration-300 hover:scale-[1.02] motion-reduce:transform-none">
                  <span className="block text-[11px] font-sans font-semibold tracking-widest uppercase text-muted-sage">
                    REGULATORY STATUS
                  </span>
                  <span className="block font-serif text-lg mt-1 font-normal text-warm-ivory">
                    Advocate on Roll
                  </span>
                  <span className="block text-[11px] font-sans text-warm-ivory/60 mt-0.5">
                    Advocates Act, 1961
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

