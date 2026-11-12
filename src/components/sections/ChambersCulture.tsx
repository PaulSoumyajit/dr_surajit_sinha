import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Chambers Culture & Research Discipline Narrative (P5-07)
 *
 * Implements the editorial section on chambers scholarship and legal research standards:
 * - Asymmetrical split layout:
 *   - Left: Dignified essay on legal scholarship, doctrinal rigor, and advocacy preparation.
 *   - Right: Photographic study and library frame with architectural depth.
 * - Strict adherence to docs/04_CONTENT_REQUIREMENTS.md:
 *   Explains principles of rigorous research and professional standards in neutral editorial
 *   language without falsely claiming unverified formal mentorship programs or team sizes.
 */
export function ChambersCulture() {
  return (
    <section
      aria-labelledby="chambers-culture-heading"
      className="py-16 sm:py-20 md:py-28 border-t border-border-subtle bg-surface"
    >
      <Container>
        <Reveal>
          <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border-subtle bg-surface-card shadow-xs transition-all duration-500 hover:shadow-xl hover:border-forest/30">
            {/* Top specular reflection line */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest/20 to-transparent z-20"
              aria-hidden="true"
            />
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[500px]">
              {/* Left Column: Editorial Narrative */}
              <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-between">
                <div>
                  <Badge variant="eyebrow" className="mb-4">
                    CHAMBERS SCHOLARSHIP &bull; RESEARCH DISCIPLINE
                  </Badge>

                  <h2
                    id="chambers-culture-heading"
                    className="font-serif text-3xl sm:text-4xl md:text-[42px] font-normal text-charcoal tracking-tight leading-[1.16]"
                  >
                    Rigorous Research as the <br />
                    <span className="italic text-forest">Bedrock of Advocacy.</span>
                  </h2>

                  <div className="mt-6 space-y-4 text-base sm:text-[17px] font-sans text-charcoal/80 leading-relaxed">
                    <p>
                      In criminal trials, state prosecution, and appellate proceedings, an effective
                      argument cannot rely on superficial assertions or unexamined claims.
                      It requires an uncompromising commitment to primary source analysis:
                      scrutinizing case diaries, forensic reports, electronic trails, and binding judicial ratios.
                    </p>

                    <p>
                      The chambers approaches every brief as a rigorous inquiry. Factual records
                      are chronologically reconstructed, evidentiary admissibility under the Evidence Act is systematically
                      tested, and legal submissions are grounded in constitutional due process.
                    </p>

                    <p className="text-sm text-charcoal/70">
                      This scholarly ethos ensures that whether defending complex criminal matters,
                      evaluating cyber evidence under Section 65B, or presenting appellate petitions before the High Court,
                      the legal position is principled, resilient, and persuasive.
                    </p>
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t border-border-subtle flex flex-wrap items-center gap-4">
                  <Button href="/contact" variant="primary" size="md" showArrow={true}>
                    Contact Chambers
                  </Button>
                  <Button href="/practice-areas" variant="outline" size="md" showArrow={true}>
                    View practice areas
                  </Button>
                </div>
              </div>

              {/* Right Column: Photographic Library Frame */}
              <div className="lg:col-span-5 relative min-h-[300px] sm:min-h-[380px] lg:min-h-full bg-forest-deep overflow-hidden">
                <Image
                  src="/images/practice/process-listen.jpg"
                  alt="Chambers library archive with legal commentaries and references"
                  fill
                  priority={false}
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-forest-deep/20"
                  aria-hidden="true"
                />
                {/* Bottom Tag with Liquid Glass pill treatment */}
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-deep/80 backdrop-blur-md border border-warm-ivory/25 text-xs font-sans text-warm-ivory shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transform-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-sage" aria-hidden="true" />
                    <span>CHAMBERS RESEARCH &bull; STATUTORY SYNTHESIS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

