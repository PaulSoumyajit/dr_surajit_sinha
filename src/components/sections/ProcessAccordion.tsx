"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useSafeAnimation } from "@/components/ui/MotionProvider";
import { DURATION_FAST, EASE_LUXE, cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

interface ProcessStage {
  step: string;
  title: string;
  lead: string;
  description: string;
  imageSrc: string;
}

const STAGES: ProcessStage[] = [
  {
    step: "01",
    title: "Criminal Law & Prosecution",
    lead: "Trial Defense & Public Prosecution",
    description:
      "Approximately 19 years of criminal legal practice alongside a decade of state public prosecution (APP, PP, Sub-Divisional PP, POCSO PP-in-Charge), emphasizing procedural accuracy, statutory defenses, and evidentiary rigor.",
    imageSrc: "/images/practice/appellate-advocacy.jpg",
  },
  {
    step: "02",
    title: "Cybercrime & Cyber Law",
    lead: "Electronic Evidence & Digital Commerce",
    description:
      "Specialized domain bridging technical systems and the law, grounded in a PhD in Cyber Law and E-commerce, ethical hacking training, and service as District Cyber Crime Public Prosecutor under the IT Act.",
    imageSrc: "/images/practice/corporate-advisory.jpg",
  },
  {
    step: "03",
    title: "Civil & Writ Proceedings",
    lead: "Substantive Suits & High Court Writs",
    description:
      "Brief preparation and representation across original civil suits, statutory appeals, injunction applications, and constitutional writ petitions under Articles 226 and 227 before the High Court.",
    imageSrc: "/images/practice/commercial-arbitration.jpg",
  },
  {
    step: "04",
    title: "Banking, DRT & Land Matters",
    lead: "Debt Recovery & Land Reforms",
    description:
      "Tribunal advocacy before Debt Recovery Tribunals (DRT I, II & III) under SARFAESI and the RDB Act, complemented by five years at solicitor firm Jalan & Jalan and West Bengal land revenue proceedings (BLLRO, DLLRO, LRT).",
    imageSrc: "/images/practice/process-listen.jpg",
  },
];

/**
 * Process Accordion Section (P4-05)
 *
 * Implements the 4-stage horizontal expandable panel from video frame 015:
 * - Desktop (>=1024px): Fluid horizontal expanding columns (1 expanded, 3 collapsed).
 * - Mobile (<1024px): Accessible vertical expandable accordion.
 * - Non-promotional, informational stages describing typical legal workflows.
 */
export function ProcessAccordion() {
  const [activeStage, setActiveStage] = useState(0);
  const { prefersReducedMotion } = useSafeAnimation();

  const handleDesktopKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      setActiveStage((index + 1) % STAGES.length);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      setActiveStage((index - 1 + STAGES.length) % STAGES.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActiveStage(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActiveStage(STAGES.length - 1);
    }
  };

  return (
    <section
      aria-labelledby="process-section-title"
      className="py-20 sm:py-28 lg:py-32 bg-primary-canvas border-t border-border-subtle"
    >
      <Container>
        {/* Section Heading Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <Badge variant="eyebrow" showDot={true}>
            CORE PRACTICE FIELDS
          </Badge>
          <h2
            id="process-section-title"
            className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-charcoal tracking-tight leading-[1.15]"
          >
            Comprehensive advocacy. <br />
            <span className="italic text-forest">Across essential jurisdictions.</span>
          </h2>
          <p className="mt-4 font-sans text-sm sm:text-base text-muted-slate leading-relaxed">
            A structured overview of the advocate&apos;s primary areas of courtroom practice, state prosecution, digital jurisprudence, and tribunal proceedings.
          </p>
        </div>

        {/* Desktop Layout: Horizontal Expanding Multi-Panel with Hover Interaction (>=1024px) */}
        <div
          role="tablist"
          aria-label="Working Methodology Stages"
          className="hidden lg:flex gap-4 min-h-[480px] items-stretch"
        >
          {STAGES.map((stage, index) => {
            const isActive = index === activeStage;

            return (
              <button
                key={stage.step}
                type="button"
                role="tab"
                id={`methodology-tab-${stage.step}`}
                aria-selected={isActive}
                aria-controls={`methodology-panel-${stage.step}`}
                aria-label={`Stage ${stage.step}: ${stage.title} — ${stage.lead}`}
                tabIndex={0}
                onMouseEnter={() => setActiveStage(index)}
                onFocus={() => setActiveStage(index)}
                onClick={() => setActiveStage(index)}
                onKeyDown={(e) => handleDesktopKeyDown(e, index)}
                className={cn(
                  "group relative rounded-2xl overflow-hidden text-left select-none cursor-pointer",
                  "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2",
                  "motion-reduce:transform-none motion-reduce:transition-none",
                  isActive
                    ? "flex-[3.5] bg-forest-deep -translate-y-[4px] scale-[1.012] border border-forest/40 shadow-xl shadow-forest-deep/20 z-10 cursor-default"
                    : "flex-1 bg-surface-card border border-border-subtle hover:border-forest/40 hover:bg-stone-subtle/50 translate-y-0 scale-100 shadow-xs z-0"
                )}
              >
                {/* Background Photographic Image with Atmospheric Wash */}
                <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
                  <Image
                    src={stage.imageSrc}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className={cn(
                      "object-cover transition-all duration-700 ease-out motion-reduce:transform-none",
                      isActive
                        ? "scale-105 opacity-38"
                        : "scale-100 opacity-0"
                    )}
                  />
                  {/* Reduced Scrim Gradient (8-12 percentage points lighter than previous) */}
                  <div
                    className={cn(
                      "absolute inset-0 transition-opacity duration-500",
                      isActive
                        ? "bg-gradient-to-t from-forest-deep/88 via-forest-deep/70 to-forest-deep/48 opacity-100"
                        : "opacity-0"
                    )}
                  />
                </div>

                {/* Top specular reflection line on active floating tile */}
                {isActive && (
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-ivory/30 to-transparent z-20"
                    aria-hidden="true"
                  />
                )}

                {/* Card Content (Animated Transition between Expanded & Collapsed) */}
                <AnimatePresence mode="wait">
                  {isActive ? (
                    <motion.div
                      key={`expanded-${stage.step}`}
                      id={`methodology-panel-${stage.step}`}
                      role="tabpanel"
                      aria-labelledby={`methodology-tab-${stage.step}`}
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.3,
                        ease: EASE_LUXE as unknown as [number, number, number, number],
                        delay: prefersReducedMotion ? 0 : 0.08,
                      }}
                      className="relative z-10 h-full flex flex-col justify-between p-8 sm:p-10 text-warm-ivory w-full min-w-[320px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.18)]"
                    >
                      {/* Top Row: Step Tag in Liquid Glass pill */}
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold tracking-wider text-muted-sage bg-forest/80 backdrop-blur-md border border-muted-sage/30 px-3.5 py-1 rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                          STAGE {stage.step}
                        </span>
                        <span className="w-8 h-8 rounded-full border border-warm-ivory/20 bg-forest-deep/40 backdrop-blur-xs flex items-center justify-center text-warm-ivory text-sm">
                          &bull;
                        </span>
                      </div>

                      {/* Middle / Bottom Content */}
                      <div className="relative z-10 mt-auto pt-14">
                        <h3 className="font-serif text-3xl sm:text-4xl font-normal text-warm-ivory tracking-tight mb-2">
                          {stage.title}
                        </h3>
                        <p className="font-sans text-xs uppercase tracking-widest text-muted-sage font-semibold mb-4">
                          {stage.lead}
                        </p>
                        <p className="font-sans text-sm sm:text-[15px] text-warm-ivory/90 leading-relaxed max-w-xl">
                          {stage.description}
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`collapsed-${stage.step}`}
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.25,
                        ease: EASE_LUXE as unknown as [number, number, number, number],
                      }}
                      className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-8 w-full"
                    >
                      <span className="font-mono text-xs font-semibold text-muted-slate tracking-wider">
                        {stage.step}
                      </span>

                      <div className="my-auto py-12">
                        <span className="font-serif text-2xl font-normal text-charcoal tracking-tight block">
                          {stage.title}
                        </span>
                        <span className="text-[11px] font-sans text-muted-slate block mt-1">
                          Explore stage
                        </span>
                      </div>

                      <span className="w-8 h-8 rounded-full border border-border-subtle bg-white/80 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_6px_rgba(20,43,32,0.04)] flex items-center justify-center text-charcoal text-sm group-hover:scale-110 group-hover:border-forest/40 transition-all">
                        +
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>

        {/* Mobile & Tablet Layout: Vertical Expandable Accordion (<1024px) */}
        <div className="lg:hidden space-y-4">
          {STAGES.map((stage, index) => {
            const isActive = index === activeStage;

            return (
              <div
                key={stage.step}
                className={cn(
                  "rounded-xl border overflow-hidden transition-colors duration-200",
                  isActive
                    ? "bg-forest-deep text-warm-ivory border-forest"
                    : "bg-surface-card border-border-subtle"
                )}
              >
                <button
                  type="button"
                  aria-expanded={isActive}
                  onClick={() => setActiveStage(isActive ? -1 : index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={cn(
                        "font-mono text-xs font-semibold tracking-wider px-2 py-0.5 rounded",
                        isActive
                          ? "bg-forest text-muted-sage"
                          : "bg-stone-subtle text-muted-slate"
                      )}
                    >
                      {stage.step}
                    </span>
                    <span
                      className={cn(
                        "font-serif text-xl sm:text-2xl font-normal tracking-tight",
                        isActive ? "text-warm-ivory" : "text-charcoal"
                      )}
                    >
                      {stage.title}
                    </span>
                  </div>

                  <span
                    className={cn(
                      "w-7 h-7 rounded-full border flex items-center justify-center text-xs shrink-0 transition-transform duration-200",
                      isActive
                        ? "border-warm-ivory/30 text-warm-ivory rotate-45"
                        : "border-border-subtle text-charcoal"
                    )}
                  >
                    +
                  </span>
                </button>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={prefersReducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : DURATION_FAST,
                        ease: EASE_LUXE as unknown as [number, number, number, number],
                      }}
                      className="overflow-hidden px-5 sm:px-6 pb-6 pt-1 text-sm font-sans leading-relaxed text-warm-ivory/85 border-t border-warm-ivory/15"
                    >
                      <p className="font-sans text-xs uppercase tracking-widest text-muted-sage font-semibold mb-2">
                        {stage.lead}
                      </p>
                      <p>{stage.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Section Footer Attribution Action */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs sm:text-sm font-sans text-muted-slate">
            Every legal matter requires disciplined engagement from initial instruction to resolution.
          </p>

          <Button
            href="/contact"
            variant="editorial-text"
            size="md"
            showArrow={true}
            className="text-forest hover:text-forest-deep font-semibold"
          >
            Initiate consultation enquiry
          </Button>
        </div>
      </Container>
    </section>
  );
}

