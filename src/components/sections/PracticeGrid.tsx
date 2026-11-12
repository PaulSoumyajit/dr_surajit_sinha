import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { PRACTICE_AREAS } from "@/lib/data/practice-areas";
import type { PracticeArea } from "@/types";

const PRACTICE_IMAGES: Record<string, { src: string; alt: string }> = {
  "criminal-litigation": {
    src: "/images/practice/appellate-advocacy.jpg",
    alt: "Criminal trial and appellate court architecture",
  },
  "public-prosecution": {
    src: "/images/practice/appellate-advocacy.jpg",
    alt: "Public prosecution in trial and sessions courts",
  },
  "pocso-proceedings": {
    src: "/images/practice/process-listen.jpg",
    alt: "POCSO special court child safeguarding framework",
  },
  "cyber-law": {
    src: "/images/practice/corporate-advisory.jpg",
    alt: "Cyber law and digital commerce forensics",
  },
  "civil-writ-proceedings": {
    src: "/images/practice/appellate-advocacy.jpg",
    alt: "High Court civil and constitutional writ litigation",
  },
  "banking-drt": {
    src: "/images/practice/commercial-arbitration.jpg",
    alt: "Debt Recovery Tribunal banking litigation",
  },
  "land-revenue": {
    src: "/images/practice/process-listen.jpg",
    alt: "Land revenue and tenancy proceedings in West Bengal",
  },
  "corporate-institutional": {
    src: "/images/practice/corporate-advisory.jpg",
    alt: "Corporate and institutional legal advisory",
  },
};

export interface PracticeGridProps {
  practices?: PracticeArea[];
}

/**
 * Practice Areas Overview Grid (P6-01)
 *
 * Implements the core practice directory for /practice-areas:
 * - Strictly displays the 3 confirmed disciplines:
 *   1. Corporate Advisory
 *   2. Commercial Arbitration
 *   3. Appellate Advocacy
 * - Asymmetric 3-column editorial composition with authentic architectural imagery,
 *   statutory touchpoints, and links to detailed statutory frameworks.
 * - Strict BCI Rule 36 compliance: Neutral, factual, non-solicitation language.
 */
export function PracticeGrid({ practices = PRACTICE_AREAS }: PracticeGridProps) {
  return (
    <section
      aria-labelledby="practice-grid-heading"
      className="pt-8 sm:pt-12 pb-16 sm:pb-24"
    >
      <Container>
        <Reveal>
          {/* Eyebrow & Page Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <Badge variant="eyebrow" className="mb-3.5">
              AREAS OF PRACTICE &bull; CORE DISCIPLINES
            </Badge>
            <h1
              id="practice-grid-heading"
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal text-charcoal tracking-tight leading-[1.12]"
            >
              Advocate Practice Across <br />
              <span className="italic text-forest">Core Legal Disciplines.</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg md:text-xl font-sans text-charcoal/75 leading-relaxed">
              Trial advocacy, state public prosecution, cyber jurisprudence, civil litigation, and tribunal
              representation structured around statutory rigor, evidentiary discipline, and due process.
            </p>
          </div>

          {/* 3-Column Editorial Practice Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch matte-focus-group">
            {practices.map((practice, index) => {
              const imageMeta = PRACTICE_IMAGES[practice.slug] || {
                src: "/images/practice/corporate-advisory.jpg",
                alt: practice.title,
              };

              return (
                <div
                  key={practice.id}
                  className={cn(
                    "rounded-2xl bg-surface-card border border-border-subtle overflow-hidden flex flex-col justify-between group matte-focus-item matte-glass-surface",
                    "shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.75),0_4px_16px_-2px_rgba(20,43,32,0.04)]",
                    "hover:border-forest/40 hover:-translate-y-1.5 hover:scale-[1.018]",
                    "hover:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.9),0_18px_38px_-6px_rgba(20,43,32,0.1)]",
                    "transition-all duration-350 ease-out motion-reduce:transform-none"
                  )}
                >
                  {/* Top Image Preview Frame */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-forest-deep">
                    <Image
                      src={imageMeta.src}
                      alt={imageMeta.alt}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-[1.06] transition-transform duration-600 ease-out motion-reduce:transform-none"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent"
                      aria-hidden="true"
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-block px-3 py-1 rounded-full bg-forest-deep/85 backdrop-blur-md border border-warm-ivory/25 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.3)] text-[11px] font-mono font-medium text-warm-ivory">
                        0{index + 1} &bull; DISCIPLINE
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                    <div>
                      <h2 className="font-serif text-2xl font-normal text-charcoal tracking-tight group-hover:text-forest transition-colors">
                        <Link
                          href={`/practice-areas/${practice.slug}`}
                          className="hover:underline focus-visible:outline-2 focus-visible:outline-forest"
                        >
                          {practice.title}
                        </Link>
                      </h2>

                      <p className="mt-3 text-sm sm:text-[15px] font-sans text-charcoal/75 leading-relaxed">
                        {practice.description}
                      </p>

                      {/* Verified Statutory Touchpoints */}
                      {practice.statutory_touchpoints && practice.statutory_touchpoints.length > 0 && (
                        <div className="mt-5 pt-4 border-t border-border-subtle/80">
                          <p className="text-[11px] font-sans font-semibold uppercase tracking-wider text-charcoal/55 mb-2">
                            Key Statutory Frameworks
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {practice.statutory_touchpoints.map((tp) => (
                              <Badge key={tp} variant="pill" showDot={false} className="text-[11px] py-0.5">
                                {tp}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card Action Link */}
                    <div className="mt-6 pt-5 border-t border-border-subtle flex items-center justify-between">
                      <Button
                        href={`/practice-areas/${practice.slug}`}
                        variant="editorial-text"
                        size="sm"
                        showArrow={true}
                      >
                        Explore practice scope
                      </Button>
                      <span className="text-xs font-mono text-charcoal/40" aria-hidden="true">
                        &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Ethical & Regulatory Note */}
          <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-surface border border-border-subtle text-xs font-sans text-charcoal/65 leading-relaxed flex items-start gap-3">
            <span className="text-forest text-base leading-none mt-0.5" aria-hidden="true">&bull;</span>
            <p>
              Under the rules of the Bar Council of India, an advocate is prohibited from soliciting
              work or advertising their practice. The practice areas and statutory frameworks outlined above
              are presented solely for informational purposes to describe the legal disciplines handled
              by the chambers upon formal instruction.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

