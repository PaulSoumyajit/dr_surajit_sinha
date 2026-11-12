import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Consultation Conversion & Chambers Section (P4-08)
 *
 * Implements the closing editorial consultation section from video frame 034:
 * - Asymmetrical split container:
 *   - Left: Architectural photography of private legal chambers interior.
 *   - Right: Warm parchment card featuring Newsreader headline, dignified body copy,
 *     primary consultation action button, and transparent regulatory reassurance.
 * - Strict BCI Rule 36 compliance: Transparent, non-solicitation, professional dignity.
 */
export function ChambersCta() {
  return (
    <section
      aria-labelledby="chambers-cta-heading"
      className="py-14 sm:py-20 md:py-28"
    >
      <Container>
        <Reveal>
          <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border-subtle bg-surface-card shadow-xs transition-all duration-500 hover:shadow-xl hover:shadow-forest/5 hover:border-forest/25">
            {/* Top specular reflection line */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest/25 to-transparent z-20"
              aria-hidden="true"
            />
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[520px]">
              {/* Left Column: Chambers Interior Photography */}
              <div className="lg:col-span-6 relative min-h-[320px] sm:min-h-[400px] lg:min-h-full bg-forest-deep overflow-hidden">
                <Image
                  src="/images/chambers/chambers-consultation.jpg"
                  alt="Modern private legal chambers consultation library"
                  fill
                  priority={false}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-forest-deep/30"
                  aria-hidden="true"
                />

                {/* Corner Chambers Monogram / Badge with Liquid Glass treatment */}
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-deep/80 backdrop-blur-md border border-warm-ivory/25 text-xs font-sans text-warm-ivory shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transform-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-sage" aria-hidden="true" />
                    <span>CHAMBERS &bull; HIGH COURT &amp; SESSIONS</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Editorial Consultation Card */}
              <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-between bg-surface-card">
                <div>
                  {/* Category Eyebrow */}
                  <div className="mb-4">
                    <Badge variant="eyebrow">
                      PROFESSIONAL LIAISON &bull; CHAMBERS INQUIRY
                    </Badge>
                  </div>

                  {/* Newsreader Headline */}
                  <h2
                    id="chambers-cta-heading"
                    className="font-serif text-3xl sm:text-4xl md:text-[42px] font-normal text-charcoal tracking-tight leading-[1.16]"
                  >
                    Professional Background. <br />
                    <span className="italic text-forest">Areas of Practice. Contact Details.</span>
                  </h2>

                  {/* Body Prose */}
                  <p className="mt-5 text-base sm:text-lg font-sans text-charcoal/80 leading-relaxed max-w-xl">
                    Understand Dr. Surajit Sinha&apos;s professional journey, public prosecution service,
                    and core practice disciplines across criminal law, cyber law, civil litigation, and tribunal proceedings.
                  </p>

                  <p className="mt-4 text-xs sm:text-sm font-sans text-charcoal/65 leading-relaxed max-w-xl">
                    For legitimate professional inquiries, court briefs, or consultation availability,
                    preliminary communication is conducted directly through the verified inquiry channel.
                    Every inquiry is screened for conflict clearance under Bar Council of India standards.
                  </p>
                </div>

                {/* Call to Action and Ethical Reassurance */}
                <div className="pt-8 sm:pt-10 mt-8 border-t border-border-subtle flex flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      href="/contact"
                      variant="primary"
                      size="lg"
                      showArrow={true}
                    >
                      Contact Chambers
                    </Button>
                    <Button
                      href="/practice-areas"
                      variant="outline"
                      size="lg"
                      showArrow={true}
                    >
                      Review practice areas
                    </Button>
                  </div>

                  {/* Ethical Compliance Reassurance Note */}
                  <p className="text-xs font-sans text-charcoal/60 leading-normal flex items-start gap-2 pt-1">
                    <span className="text-forest shrink-0 mt-0.5" aria-hidden="true">&bull;</span>
                    <span>
                      Direct dialogue with counsel. Initial consultation by appointment. Inquiries received
                      solely for informational and professional briefing purposes under BCI Rule 36.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

