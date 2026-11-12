"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { motion, AnimatePresence } from "motion/react";
import { cn, EASE_LUXE, DURATION_FAST } from "@/lib/utils";
import { CAREER_MILESTONES } from "@/lib/data/career";
import type { CareerMilestone } from "@/types";

export interface CareerTimelineProps {
  milestones?: CareerMilestone[];
}

/**
 * Interactive Career Timeline Component (P5-05)
 *
 * Implements the chronological trajectory module for /career:
 * - When verified milestones exist: Renders an interactive vertical timeline
 *   with year nodes, progress spine, keyboard accessibility, and detail cards.
 * - When milestones dataset is empty (strict adherence to docs/04_CONTENT_REQUIREMENTS.md):
 *   Renders a dignified editorial monograph on counsel's professional trajectory
 *   without inventing fictional years (e.g. 2012, 2016, 2020).
 */
export function CareerTimeline({
  milestones = CAREER_MILESTONES,
}: CareerTimelineProps) {
  const verifiedMilestones = milestones.filter(
    (m) => m.verification_status === "verified"
  );

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % verifiedMilestones.length);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + verifiedMilestones.length) % verifiedMilestones.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActiveIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActiveIndex(verifiedMilestones.length - 1);
    }
  };

  return (
    <section
      aria-labelledby="career-heading"
      className="pt-8 sm:pt-12 pb-16 sm:pb-24"
    >
      <Container>
        <Reveal>
          {/* Section Eyebrow & Monumental Heading */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <Badge variant="eyebrow" className="mb-3.5">
              CAREER TRAJECTORY &bull; CHRONOLOGY OF ADVOCACY
            </Badge>
            <h1
              id="career-heading"
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal text-charcoal tracking-tight leading-[1.12]"
            >
              A Disciplined Path <br />
              <span className="italic text-forest">in Legal Practice &amp; Prosecution.</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg md:text-xl font-sans text-charcoal/75 leading-relaxed">
              A professional progression defined by criminal trial advocacy, public prosecution on behalf of the State,
              cybercrime proceedings, and civil, banking, and land revenue litigation.
            </p>
          </div>

          {verifiedMilestones.length > 0 ? (
            /* Interactive Timeline System (When Verified Records Exist) */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: Vertical Timeline Track with Year Nodes */}
              <div
                role="tablist"
                aria-label="Career Milestones"
                aria-orientation="vertical"
                className="lg:col-span-5 relative pl-6 border-l-2 border-border-subtle flex flex-col gap-6"
              >
                {verifiedMilestones.map((item, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <button
                      key={item.id}
                      role="tab"
                      id={`milestone-tab-${item.id}`}
                      aria-selected={isActive}
                      aria-controls={`milestone-panel-${item.id}`}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => setActiveIndex(idx)}
                      onKeyDown={handleKeyDown}
                      className={cn(
                        "relative text-left p-4 sm:p-5 rounded-xl border transition-all text-charcoal select-none cursor-pointer",
                        "focus-visible:outline-2 focus-visible:outline-forest focus-visible:outline-offset-2",
                        isActive
                          ? "bg-forest-deep text-warm-ivory border-forest-deep shadow-[inset_0_1px_1px_rgba(255,255,255,0.22)] scale-[1.01]"
                          : "bg-surface-card border-border-subtle hover:border-forest/40 hover:bg-stone-subtle hover:translate-x-1 active:scale-[0.99] text-charcoal"
                      )}
                    >
                      {/* Active indicator dot on the vertical spine */}
                      <span
                        className={cn(
                          "absolute -left-[31px] top-6 w-3 h-3 rounded-full border-2 transition-colors",
                          isActive
                            ? "bg-forest border-warm-ivory scale-125 shadow-xs"
                            : "bg-border-subtle border-warm-ivory"
                        )}
                        aria-hidden="true"
                      />
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span
                          className={cn(
                            "text-xs font-mono font-semibold tracking-wider",
                            isActive ? "text-muted-sage" : "text-forest"
                          )}
                        >
                          {item.year}
                        </span>
                        <span
                          className={cn(
                            "text-[11px] font-sans uppercase tracking-widest",
                            isActive ? "text-warm-ivory/60" : "text-charcoal/60"
                          )}
                        >
                          {item.category}
                        </span>
                      </div>
                      <h3
                        className={cn(
                          "font-serif text-base sm:text-lg font-medium",
                          isActive ? "text-warm-ivory" : "text-charcoal"
                        )}
                      >
                        {item.title}
                      </h3>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Active Milestone Detail Card with specular highlight */}
              <div className="relative overflow-hidden lg:col-span-7 bg-surface-card rounded-2xl border border-border-subtle p-8 sm:p-10 shadow-xs min-h-[320px] transition-all duration-300 hover:shadow-md hover:border-forest/30">
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest/20 to-transparent"
                  aria-hidden="true"
                />
                <AnimatePresence mode="wait">
                  {verifiedMilestones[activeIndex] && (
                    <motion.div
                      key={verifiedMilestones[activeIndex].id}
                      role="tabpanel"
                      id={`milestone-panel-${verifiedMilestones[activeIndex].id}`}
                      aria-labelledby={`milestone-tab-${verifiedMilestones[activeIndex].id}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: DURATION_FAST, ease: EASE_LUXE }}
                      className="space-y-4"
                    >
                      <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-forest uppercase tracking-wider">
                        <span>{verifiedMilestones[activeIndex].year}</span>
                        <span>&bull;</span>
                        <span>{verifiedMilestones[activeIndex].category}</span>
                      </div>
                      <h2 className="font-serif text-2xl sm:text-3xl font-normal text-charcoal tracking-tight">
                        {verifiedMilestones[activeIndex].title}
                      </h2>
                      <p className="text-base sm:text-lg font-sans text-charcoal/80 leading-relaxed pt-2">
                        {verifiedMilestones[activeIndex].description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            /* Restrained Professional Trajectory Overview (Zero Fictional Dates) */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="relative overflow-hidden lg:col-span-8 p-8 sm:p-10 md:p-12 rounded-2xl bg-surface-card border border-border-subtle shadow-xs transition-all duration-300 hover:shadow-md hover:border-forest/30 space-y-6">
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest/20 to-transparent"
                  aria-hidden="true"
                />
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/5 border border-forest/15 text-xs font-sans font-semibold tracking-wider uppercase text-forest">
                  <span className="w-1.5 h-1.5 rounded-full bg-forest" aria-hidden="true" />
                  <span>THE PRACTICE JOURNEY</span>
                </div>

                <p className="font-serif text-xl sm:text-2xl font-normal text-charcoal leading-snug">
                  Dr. Surajit Sinha&apos;s professional trajectory has been cultivated through focused
                  engagement in criminal trial advocacy, state public prosecution, cybercrime litigation,
                  and proceedings before the High Court and subordinate courts.
                </p>

                <p className="text-base sm:text-[17px] font-sans text-charcoal/80 leading-relaxed">
                  Beginning with rigorous trial and appellate practice, counsel developed deep subject-matter
                  familiarity across corporate governance disputes, shareholder litigation, complex commercial contracts,
                  and statutory writ proceedings. Over years of practice, the chambers has represented diverse
                  enterprises, financial institutions, and business promoters navigating critical transitions.
                </p>

                <p className="text-base sm:text-[17px] font-sans text-charcoal/80 leading-relaxed">
                  In keeping with the traditions of independent advocacy, the chambers maintains an unhurried,
                  forensic standard of work—accepting mandates where counsel can provide comprehensive personal
                  attention from initial strategy through final appellate hearing.
                </p>

                <div className="pt-6 border-t border-border-subtle flex flex-wrap items-center gap-4">
                  <Button href="/practice-areas" variant="primary" size="md" showArrow={true}>
                    Explore practice competencies
                  </Button>
                  <Button href="/contact" variant="outline" size="md" showArrow={true}>
                    Chamber consultations
                  </Button>
                </div>
              </div>

              {/* Right Column: Practice Pillars Card with Liquid Glass specular highlight */}
              <div className="relative overflow-hidden lg:col-span-4 p-6 sm:p-8 rounded-2xl bg-forest-deep text-warm-ivory shadow-lg shadow-forest-deep/15 border border-warm-ivory/15 space-y-5 transition-all duration-300 hover:shadow-xl hover:border-warm-ivory/25">
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-ivory/30 to-transparent"
                  aria-hidden="true"
                />
                <span className="text-[11px] font-sans font-semibold tracking-[0.16em] uppercase text-muted-sage block">
                  PRACTICE FOUNDATIONS
                </span>
                <h3 className="font-serif text-xl font-normal text-warm-ivory">
                  Independent Bar Tradition
                </h3>
                <p className="text-xs sm:text-sm font-sans text-warm-ivory/80 leading-relaxed">
                  Chronological records of reported judgments, public judicial appearances,
                  and statutory admissions are documented on court registries and provided during formal client engagement.
                </p>
                <div className="pt-4 border-t border-warm-ivory/15 text-xs text-warm-ivory/70 space-y-2">
                  <p>&bull; Corporate &amp; Commercial Advisory</p>
                  <p>&bull; Commercial Arbitration</p>
                  <p>&bull; Appellate Advocacy</p>
                </div>
              </div>
            </div>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
