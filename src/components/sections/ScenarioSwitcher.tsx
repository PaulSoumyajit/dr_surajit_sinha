"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn, EASE_LUXE } from "@/lib/utils";

interface Scenario {
  id: string;
  number: string;
  tabTitle: string;
  category: string;
  summary: string;
  imageSrc: string;
  imageAlt: string;
  headline: string;
  guidance: string;
  touchpoints: string[];
  ctaText: string;
  ctaHref: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: "criminal",
    number: "01",
    tabTitle: "Criminal Proceedings & Prosecution",
    category: "Trial & State Prosecution",
    summary: "Criminal litigation, bail, sessions trials, and public prosecution across ~19 years.",
    imageSrc: "/images/scenarios/scenario-building.jpg",
    imageAlt: "Court chamber and trial jurisdiction representing criminal proceedings",
    headline: "Procedural rigor and constitutional safeguards in criminal trials.",
    guidance:
      "Criminal practice requires exacting command over procedural codes, evidentiary standards, and constitutional guarantees. With extensive experience in state public prosecution (APP, PP, Sub-Divisional PP, and POCSO PP-in-Charge), counsel approaches criminal proceedings with strict adherence to due process, impartial evaluation of evidence, and rigorous courtroom advocacy.",
    touchpoints: [
      "CrPC / BNSS Procedure",
      "Bail & Anticipatory Bail",
      "Sessions Trials & Defense",
      "POCSO In-Camera Trials",
    ],
    ctaText: "Inquire on criminal proceedings",
    ctaHref: "/contact",
  },
  {
    id: "cyber",
    number: "02",
    tabTitle: "Cybercrime & Digital Law",
    category: "Digital Systems & E-Commerce",
    summary: "Electronic evidence, cybercrime prosecution, e-commerce, and doctoral research.",
    imageSrc: "/images/scenarios/scenario-thinking.jpg",
    imageAlt: "Digital networks and data systems representing cyber law jurisprudence",
    headline: "Bridging law, digital systems, and electronic evidence standards.",
    guidance:
      "The intersection of legal statutes and digital technology demands both doctrinal scholarship and technical comprehension. Grounded in a PhD in Cyber Law and E-commerce, technical certifications in ethical hacking and networking, and experience as District Cyber Crime Public Prosecutor, this practice focuses on electronic evidence admissibility (Section 65B), cyber offenses, and regulatory frameworks governing digital transactions.",
    touchpoints: [
      "Section 65B Certification",
      "IT Act Offenses",
      "Electronic Evidence Custody",
      "E-Commerce Regulatory Compliance",
    ],
    ctaText: "Inquire on cyber law matters",
    ctaHref: "/contact",
  },
  {
    id: "civil-land",
    number: "03",
    tabTitle: "Civil, Banking & Land Matters",
    category: "Civil, DRT & Revenue",
    summary: "Debt recovery, writ petitions, land reforms, and civil trial litigation.",
    imageSrc: "/images/scenarios/scenario-crossroads.jpg",
    imageAlt: "Institutional architecture representing civil, banking, and tribunal forums",
    headline: "Substantive representation across civil, tribunal, and revenue forums.",
    guidance:
      "Civil litigation and administrative proceedings require precision in documentary drafting and forum selection. Enriched by five years at solicitor firm Jalan & Jalan, Kolkata, practice encompasses Debt Recovery Tribunal (DRT I, II, III) proceedings under SARFAESI and the RDB Act, West Bengal land reforms (BLLRO, DLLRO, LRT), and constitutional writ petitions before the High Court.",
    touchpoints: [
      "DRT I, II & III Proceedings",
      "SARFAESI Securitization",
      "High Court Writ Jurisdiction",
      "West Bengal Land Reforms",
    ],
    ctaText: "Inquire on civil & DRT matters",
    ctaHref: "/contact",
  },
];

/**
 * Interactive Client Scenario Selector ("At a Turning Point") (P4-07)
 *
 * Implements the 3-scenario interactive switcher observed in video frames 026 and 030:
 * - Reorients legal advisory around client life/business turning points rather than static statutes.
 * - Left column: 3 interactive WAI-ARIA tabs with keyboard navigation.
 * - Center column: Vertical architectural photographic frame cross-fading smoothly with active scenario.
 * - Right column: Contextual guidance panel with Newsreader headline, strategic commentary,
 *   statutory touchpoint pills, and consultation CTA.
 */
export function ScenarioSwitcher() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeScenario = SCENARIOS[activeIndex];

  const handleCardHover = (index: number) => {
    setHoveredIndex(index);
    if (typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setActiveIndex(index);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex: number | null = null;

    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      nextIndex = (index + 1) % SCENARIOS.length;
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      nextIndex = (index - 1 + SCENARIOS.length) % SCENARIOS.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = SCENARIOS.length - 1;
    }

    if (nextIndex !== null) {
      setActiveIndex(nextIndex);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <section
      aria-labelledby="scenario-heading"
      className="py-12 sm:py-16 md:py-24 bg-surface"
    >
      <Container>
        <Reveal>
          {/* Section Header */}
          <div className="max-w-3xl mb-10 sm:mb-14">
            <Badge variant="eyebrow" className="mb-3">
              PRACTICE DIMENSIONS
            </Badge>
            <h2
              id="scenario-heading"
              className="font-serif text-3xl sm:text-4xl md:text-[44px] font-normal text-charcoal tracking-tight leading-[1.18]"
            >
              Grounding legal counsel in <br />
              <span className="italic text-forest">statutory and procedural reality.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg font-sans text-charcoal/75 leading-relaxed">
              Explore the core substantive disciplines defining Dr. Surajit Sinha&apos;s trial,
              appellate, and public prosecution practice across West Bengal and appellate courts.
            </p>
          </div>

          {/* 3-Column Scenario Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* Left Column: Interactive Scenario Tabs with Hover Activation & Matte Focus */}
            <div
              role="tablist"
              aria-orientation="vertical"
              aria-label="Client Situations and Legal Scenarios"
              onMouseLeave={() => setHoveredIndex(null)}
              className="lg:col-span-4 flex flex-col gap-3.5 matte-focus-group"
            >
              {SCENARIOS.map((scenario, index) => {
                const isActive = activeIndex === index;
                const isInactiveSibling = hoveredIndex !== null && hoveredIndex !== index;
                return (
                  <button
                    key={scenario.id}
                    ref={(el) => {
                      tabRefs.current[index] = el;
                    }}
                    role="tab"
                    id={`scenario-tab-${scenario.id}`}
                    aria-selected={isActive}
                    aria-controls={`scenario-panel-${scenario.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onMouseEnter={() => handleCardHover(index)}
                    onFocus={() => handleCardHover(index)}
                    onClick={() => setActiveIndex(index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className={cn(
                      "text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 relative group cursor-pointer select-none matte-glass-surface matte-focus-item",
                      "focus-visible:outline-2 focus-visible:outline-forest focus-visible:outline-offset-2 motion-reduce:transform-none",
                      isActive
                        ? "bg-forest-deep text-warm-ivory border-forest-deep shadow-[inset_0_1px_1px_rgba(255,255,255,0.22),0_8px_20px_-4px_rgba(20,43,32,0.2)] scale-[1.018] -translate-y-0.5 z-10"
                        : "bg-surface-card text-charcoal border-border-subtle hover:border-forest/40 hover:bg-stone-subtle hover:translate-x-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] z-0",
                      isInactiveSibling && "opacity-85 filter blur-[0.35px]"
                    )}
                  >
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span
                        className={cn(
                          "text-[11px] font-sans font-semibold tracking-[0.16em] uppercase",
                          isActive ? "text-muted-sage" : "text-forest"
                        )}
                      >
                        {scenario.number} &bull; {scenario.category}
                      </span>
                      <span
                        className={cn(
                          "w-2 h-2 rounded-full transition-transform duration-300",
                          isActive ? "bg-muted-sage scale-100" : "bg-border-subtle scale-75 group-hover:bg-forest/50"
                        )}
                        aria-hidden="true"
                      />
                    </div>

                    <h3
                      className={cn(
                        "font-serif text-lg sm:text-xl font-medium tracking-tight mb-2",
                        isActive ? "text-warm-ivory" : "text-charcoal"
                      )}
                    >
                      {scenario.tabTitle}
                    </h3>

                    <p
                      className={cn(
                        "text-xs sm:text-sm font-sans leading-relaxed",
                        isActive ? "text-warm-ivory/80" : "text-charcoal/70"
                      )}
                    >
                      {scenario.summary}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Center Column: Cross-Fading Architectural Frame with Optical Focus */}
            <div className="lg:col-span-4 relative rounded-2xl overflow-hidden border border-border-subtle bg-forest-deep min-h-[360px] sm:min-h-[420px] lg:min-h-0 shadow-xs">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScenario.id}
                  initial={{ opacity: 0, filter: "blur(6px)", scale: 1.02 }}
                  animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                  exit={{ opacity: 0, filter: "blur(4px)", scale: 0.98 }}
                  transition={{ duration: 0.42, ease: EASE_LUXE }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeScenario.imageSrc}
                    alt={activeScenario.imageAlt}
                    fill
                    priority={false}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover object-center"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-forest-deep/85 via-transparent to-forest-deep/20"
                    aria-hidden="true"
                  />
                  {/* Bottom Caption Pill */}
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-deep/80 backdrop-blur-xs border border-warm-ivory/20 text-[11px] font-sans text-warm-ivory">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-sage" aria-hidden="true" />
                      <span>{activeScenario.number} / 03 &bull; {activeScenario.category}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: Dynamic Advisory Guidance Panel */}
            <div
              role="tabpanel"
              id={`scenario-panel-${activeScenario.id}`}
              aria-labelledby={`scenario-tab-${activeScenario.id}`}
              className="lg:col-span-4 bg-surface-card rounded-2xl border border-border-subtle p-6 sm:p-8 flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_4px_16px_-2px_rgba(20,43,32,0.05)]"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScenario.id}
                  initial={{ opacity: 0, y: 8, filter: "blur(2px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -6, filter: "blur(2px)" }}
                  transition={{ duration: 0.35, ease: EASE_LUXE }}
                  className="flex flex-col h-full justify-between"
                >
                  <div>
                    {/* Eyebrow */}
                    <div className="inline-flex items-center gap-2 text-[11px] font-sans font-semibold tracking-[0.14em] uppercase text-forest mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-forest shrink-0" aria-hidden="true" />
                      <span>STRATEGIC ORIENTATION</span>
                    </div>

                    {/* Headline */}
                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-charcoal tracking-tight leading-snug mb-4">
                      {activeScenario.headline}
                    </h3>

                    {/* Body */}
                    <p className="text-sm font-sans text-charcoal/75 leading-relaxed mb-6">
                      {activeScenario.guidance}
                    </p>

                    {/* Key Touchpoint Pills */}
                    <div className="mb-8">
                      <p className="text-[11px] font-sans font-semibold uppercase tracking-wider text-charcoal/55 mb-2.5">
                        Key Advisory Touchpoints
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {activeScenario.touchpoints.map((tp) => (
                          <Badge key={tp} variant="pill" showDot={false}>
                            {tp}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Panel Action Footer */}
                  <div className="pt-6 border-t border-border-subtle flex flex-col gap-3">
                    <Button
                      href={activeScenario.ctaHref}
                      variant="primary"
                      size="md"
                      showArrow={true}
                    >
                      {activeScenario.ctaText}
                    </Button>
                    <p className="text-[11px] font-sans text-charcoal/55">
                      Confidential preliminary inquiry &bull; Direct consultation by appointment
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

