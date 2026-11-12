import React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { DOCTORAL_AND_DEGREES, RESEARCH_THEMES } from "@/lib/data/academic";

/**
 * Academic Background & Doctoral Research Showcase
 * Dr. Surajit Sinha — Advocate, High Court & Lower Courts
 *
 * Implements the scholarly and postgraduate profile:
 * - Highlights Doctor of Philosophy (PhD) in Cyber Law and E-commerce (confirmed awarded).
 * - Master of Laws (LL.M.), MCA, M.Com., LL.B., and B.Com. (Honours).
 * - Key research themes examining electronic evidence, cyber jurisprudence, and criminal procedure.
 * - Strictly preserves the approved visual design, typography scale, and card styling.
 */
export function AcademicShowcase() {
  return (
    <section
      aria-labelledby="academic-heading"
      className="pt-8 sm:pt-12 pb-16 sm:pb-20"
    >
      <Container>
        <Reveal>
          {/* Eyebrow & Page Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <Badge variant="eyebrow" className="mb-3.5">
              ACADEMIC FOUNDATIONS &bull; DOCTORAL RESEARCH
            </Badge>
            <h1
              id="academic-heading"
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal text-charcoal tracking-tight leading-[1.12]"
            >
              Academic Background &amp; <br />
              <span className="italic text-forest">Legal Research.</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg md:text-xl font-sans text-charcoal/75 leading-relaxed">
              Doctoral scholarship in cyber law and electronic commerce, postgraduate degrees across
              law, computing, and commerce, and technical qualifications underpinning digital litigation.
            </p>
          </div>

          {/* Academic Degrees Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {DOCTORAL_AND_DEGREES.map((qual, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl bg-surface-card border border-border-subtle p-6 sm:p-8 flex flex-col justify-between shadow-xs transition-all duration-300 hover:shadow-xl hover:border-forest/40 hover:-translate-y-1 motion-reduce:transform-none"
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-hidden="true"
                />

                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-charcoal/60 mb-2">
                    <span className="font-semibold text-forest uppercase tracking-wider">
                      {qual.honors || "Postgraduate Degree"}
                    </span>
                    <span>&bull;</span>
                    <span className="capitalize">{qual.verification_status} Record</span>
                  </div>

                  <h2 className="font-serif text-2xl font-normal text-charcoal leading-snug">
                    {qual.degree}
                  </h2>

                  {qual.specialisation && (
                    <p className="text-sm font-sans italic text-charcoal/70 mt-1.5">
                      {qual.specialisation}
                    </p>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-border-subtle/80 flex items-center justify-between text-xs font-sans text-charcoal/60">
                  <span className="text-forest font-medium">Dr. Surajit Sinha</span>
                  <span>Advocate — High Court &amp; Lower Courts</span>
                </div>
              </div>
            ))}
          </div>

          {/* Research Themes Banner Card */}
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border-subtle bg-surface-card p-8 sm:p-12 md:p-14 shadow-xs transition-all duration-300 hover:shadow-md hover:border-forest/30">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest/20 to-transparent"
              aria-hidden="true"
            />
            <div className="max-w-3xl space-y-4 mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/5 border border-forest/15 text-xs font-sans font-semibold uppercase tracking-[0.14em] text-forest">
                <span>DOCTORAL JURISPRUDENCE &bull; RESEARCH FOCUS</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-charcoal">
                Core Research Themes &amp; Doctrinal Synthesis
              </h2>
              <p className="text-base font-sans text-charcoal/80 leading-relaxed">
                The confluence of law, computing, and commerce informs Dr. Sinha&apos;s research into
                electronic evidence admissibility, e-commerce legal governance, and procedural safeguards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {RESEARCH_THEMES.map((theme) => (
                <div
                  key={theme.id}
                  className="p-5 rounded-xl bg-surface border border-border-subtle/70 space-y-2 hover:border-forest/30 transition-colors"
                >
                  <h3 className="font-serif text-lg font-medium text-charcoal">
                    {theme.title}
                  </h3>
                  <p className="text-sm font-sans text-charcoal/75 leading-relaxed">
                    {theme.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-border-subtle/80 flex items-center gap-2 text-xs font-sans text-charcoal/60">
              <span className="text-forest" aria-hidden="true">&bull;</span>
              <span>
                Academic research credentials and doctoral specialization documented in compliance with Bar Council of India Rule 36.
              </span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

