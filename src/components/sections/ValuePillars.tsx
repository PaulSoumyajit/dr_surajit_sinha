import React from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface Pillar {
  number: string;
  title: string;
  lead: string;
  description: string;
  icon: React.ReactNode;
}

const PILLARS: Pillar[] = [
  {
    number: "01",
    title: "Criminal Law & Public Prosecution",
    lead: "Factual rigor & due process.",
    description:
      "Experienced representation across trial, appellate, and public prosecution proceedings, emphasizing statutory accuracy, evidentiary discipline, and procedural fairness.",
    icon: (
      <svg
        className="w-5 h-5 text-forest"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Cybercrime & Cyber Law",
    lead: "Digital systems & electronic evidence.",
    description:
      "Specialized legal knowledge spanning cybercrime prosecution, e-commerce regulatory frameworks, digital transactions, and technical preservation of electronic evidence.",
    icon: (
      <svg
        className="w-5 h-5 text-forest"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Civil, Banking & Revenue Matters",
    lead: "Substantive advocacy & dispute resolution.",
    description:
      "Structured counsel across Debt Recovery Tribunals (DRT), civil litigation, writ jurisdiction, and land revenue administrative matters in West Bengal.",
    icon: (
      <svg
        className="w-5 h-5 text-forest"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

/**
 * Value Pillars Section (P4-02)
 *
 * Renders the three-column editorial text layout situated directly beneath the hero,
 * translating the core legal disciplines into a clean, dignified rhythm.
 */
export function ValuePillars() {
  return (
    <section aria-labelledby="pillars-title" className="pb-16 sm:pb-20">
      <Container>
        <Reveal>
          <div className="border-t border-border-subtle pt-10 sm:pt-14">
            <h2 id="pillars-title" className="sr-only">
              Advocacy Pillars &amp; Working Philosophy
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 matte-focus-group">
              {PILLARS.map((pillar) => (
                <div
                  key={pillar.number}
                  className={cn(
                    "flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-surface-card border border-border-subtle group matte-focus-item matte-glass-surface",
                    "shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_2px_8px_-1px_rgba(20,43,32,0.03)]",
                    "hover:border-forest/40 hover:-translate-y-1.5 hover:scale-[1.018]",
                    "hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_14px_30px_-4px_rgba(20,43,32,0.08)]",
                    "transition-all duration-350 ease-out motion-reduce:transform-none"
                  )}
                >
                  <div>
                    {/* Top Row: Monogram Number & Line Icon */}
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-border-subtle/60">
                      <span className="font-mono text-xs font-semibold tracking-wider text-forest">
                        {pillar.number}
                      </span>
                      <span className="p-2.5 rounded-xl bg-stone-subtle/80 group-hover:bg-forest/10 group-hover:scale-110 transition-all duration-300">
                        {pillar.icon}
                      </span>
                    </div>

                    {/* Headline & Lead Statement */}
                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-charcoal tracking-tight mb-2">
                      {pillar.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm font-semibold text-forest uppercase tracking-wider mb-3">
                      {pillar.lead}
                    </p>

                    {/* Description */}
                    <p className="font-sans text-sm text-muted-slate leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Subtle index line indicator */}
                  <div className="mt-8 pt-4 border-t border-border-subtle/40 flex items-center justify-between text-[11px] font-sans text-muted-slate/80">
                    <span>Disciplined Counsel</span>
                    <span className="text-forest">&bull;</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
