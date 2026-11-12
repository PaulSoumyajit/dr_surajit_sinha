import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const ATTRIBUTES = [
  {
    title: "Procedural Integrity",
    caption: "Commitment to due process and statutory safeguards",
  },
  {
    title: "Evidentiary Discipline",
    caption: "Meticulous examination of physical and electronic records",
  },
  {
    title: "Institutional Duty",
    caption: "Serving the administration of justice with honesty and public welfare",
  },
];

/**
 * Editorial Perspective Section (P4-03)
 *
 * Implements the asymmetric two-column perspective layout from video frame 005:
 * - Left column: Sticky category eyebrow ("• THE SINHA PERSPECTIVE").
 * - Right column: Large serif display statement with two-column analytical prose,
 *   subtle editorial link, and three horizontal attribute indicators.
 */
export function PerspectiveSection() {
  return (
    <section
      aria-labelledby="perspective-heading"
      className="py-20 sm:py-28 lg:py-32 bg-primary-canvas border-t border-border-subtle/60"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Column: Tracked Section Eyebrow */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <Reveal>
              <Badge variant="eyebrow" showDot={true}>
                The Sinha Perspective
              </Badge>
              <p className="mt-3 text-xs font-sans text-muted-slate/85 tracking-wide max-w-xs">
                Legal responsibility, evidence &bull; Public prosecution &amp; justice
              </p>
            </Reveal>
          </div>

          {/* Right Column: Statement, Explanatory Narrative & Attributes */}
          <div className="lg:col-span-8">
            <Reveal delay={0.1}>
              <h2
                id="perspective-heading"
                className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-charcoal leading-[1.18] tracking-tight"
              >
                Justice rests on procedural fairness and thorough evidence.
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mt-8 sm:mt-10 font-sans text-sm sm:text-base text-muted-slate leading-relaxed border-t border-border-subtle/80 pt-8">
                <p>
                  Substantive legal practice demands unwavering fidelity to statutory frameworks,
                  constitutional protections, and the rules of evidence. In criminal proceedings,
                  public prosecution, and complex civil matters, every procedural step carries
                  significant legal consequences for individuals, institutions, and the rule of law.
                </p>
                <p>
                  With extensive experience spanning trial advocacy, public prosecution, and judicial
                  proceedings across the High Court and subordinate courts, the focus remains steadfast:
                  upholding professional responsibility, critically evaluating records, and presenting
                  principled legal arguments grounded in honesty, integrity, and public welfare.
                </p>
              </div>

              {/* Action Link */}
              <div className="mt-8">
                <Button
                  href="/about"
                  variant="editorial-text"
                  size="md"
                  showArrow={true}
                  className="text-forest hover:text-forest-deep font-semibold"
                >
                  View professional background &amp; credentials
                </Button>
              </div>
            </Reveal>

            {/* Three Analytical Attributes */}
            <Reveal delay={0.3}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 sm:pt-14 mt-10 sm:mt-14 border-t border-border-subtle/80">
                {ATTRIBUTES.map((attr) => (
                  <div key={attr.title} className="group p-3 -mx-3 rounded-xl transition-all duration-300 hover:bg-stone-subtle/60 hover:-translate-y-0.5 space-y-1.5 motion-reduce:transform-none">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-forest shrink-0 group-hover:scale-125 transition-transform duration-300" aria-hidden="true" />
                      <h3 className="font-serif text-base sm:text-lg font-medium text-charcoal tracking-tight group-hover:text-forest transition-colors duration-200">
                        {attr.title}
                      </h3>
                    </div>
                    <p className="font-sans text-xs text-muted-slate leading-relaxed pl-3.5">
                      {attr.caption}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

