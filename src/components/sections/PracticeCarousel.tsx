"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useSafeAnimation } from "@/components/ui/MotionProvider";
import { PRACTICE_AREAS } from "@/lib/data/practice-areas";
import { DURATION_FAST, EASE_LUXE, cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

interface PracticeSlideData {
  imageSrc: string;
  imageAlt: string;
  tagline: string;
}

const SLIDE_METADATA: Record<string, PracticeSlideData> = {
  "criminal-litigation": {
    imageSrc: "/images/practice/appellate-advocacy.jpg",
    imageAlt: "Criminal court trial and appellate litigation",
    tagline: "Rigorous trial advocacy, statutory defense & due process.",
  },
  "public-prosecution": {
    imageSrc: "/images/practice/appellate-advocacy.jpg",
    imageAlt: "Public prosecution in trial and sessions courts",
    tagline: "A decade of state prosecution service across trial & special courts.",
  },
  "pocso-proceedings": {
    imageSrc: "/images/practice/process-listen.jpg",
    imageAlt: "POCSO special court child safeguarding framework",
    tagline: "Specialized in-camera prosecution & child protection safeguards.",
  },
  "cyber-law": {
    imageSrc: "/images/practice/corporate-advisory.jpg",
    imageAlt: "Cyber law, electronic evidence and digital commerce",
    tagline: "Doctoral research in cyber law, e-commerce & electronic evidence.",
  },
  "civil-writ-proceedings": {
    imageSrc: "/images/practice/appellate-advocacy.jpg",
    imageAlt: "High Court civil and constitutional writ litigation",
    tagline: "Substantive civil briefcraft & constitutional writ petitions.",
  },
  "banking-drt": {
    imageSrc: "/images/practice/commercial-arbitration.jpg",
    imageAlt: "Debt Recovery Tribunal banking litigation",
    tagline: "Specialized tribunal advocacy before DRT I, II & III.",
  },
  "land-revenue": {
    imageSrc: "/images/practice/process-listen.jpg",
    imageAlt: "Land revenue and tenancy proceedings in West Bengal",
    tagline: "Administrative and appellate representation in land reforms.",
  },
  "corporate-institutional": {
    imageSrc: "/images/practice/corporate-advisory.jpg",
    imageAlt: "Corporate and institutional legal advisory",
    tagline: "Commercial contracts, ROC filings & institutional governance.",
  },
};

/**
 * Interactive Practice Areas Carousel (P4-04)
 *
 * Implements the asymmetric carousel observed in video frame 010:
 * - Shows the verified practice disciplines across criminal, prosecution, cyber, civil, DRT and land.
 * - Segmented progress track with direct segment clicking.
 * - Previous/Next circular controls with keyboard (ArrowLeft/ArrowRight) & touch swipe support.
 * - Smooth cross-fade transitions via Motion for React.
 */
export function PracticeCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const carouselItems = PRACTICE_AREAS.filter((p) =>
    [
      "criminal-litigation",
      "pocso-proceedings",
      "cyber-law",
      "civil-writ-proceedings",
      "banking-drt",
      "land-revenue",
    ].includes(p.slug)
  );

  const totalSlides = carouselItems.length > 0 ? carouselItems.length : PRACTICE_AREAS.length;
  const currentArea = carouselItems[activeIndex] || PRACTICE_AREAS[activeIndex];
  const currentMeta = SLIDE_METADATA[currentArea.slug] ?? {
    imageSrc: "/images/hero/hero-architecture.jpg",
    imageAlt: currentArea.title,
    tagline: "Independent legal counsel and strategic guidance.",
  };

  const { prefersReducedMotion } = useSafeAnimation();

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Keyboard navigation listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    const threshold = 50;

    if (diff > threshold) {
      handleNext();
    } else if (diff < -threshold) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  return (
    <section
      aria-labelledby="practice-carousel-title"
      className="py-20 sm:py-24 lg:py-28 bg-parchment/60 border-t border-border-subtle"
    >
      <Container>
        {/* Top Header: Eyebrow + Title & Slide Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <Badge variant="eyebrow" showDot={true}>
              Areas of Practice
            </Badge>
            <h2
              id="practice-carousel-title"
              className="mt-3 font-serif text-3xl sm:text-4xl lg:text-4xl font-normal text-charcoal tracking-tight"
            >
              Disciplined counsel across verified disciplines.
            </h2>
          </div>

          {/* Numeric Pagination & Navigation Buttons */}
          <div className="flex items-center gap-4 shrink-0">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-forest select-none">
              {String(activeIndex + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
            </span>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous practice discipline"
                className={cn(
                  "w-10 h-10 rounded-full border border-border-subtle/80 bg-white/75 backdrop-blur-md flex items-center justify-center cursor-pointer",
                  "shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_8px_-1px_rgba(20,43,32,0.06)]",
                  "text-charcoal hover:border-forest/40 hover:text-forest hover:bg-white hover:scale-105 active:scale-95 transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest motion-reduce:transform-none"
                )}
              >
                <span className="sr-only">Previous slide</span>
                <svg className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M10 12L6 8L10 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next practice discipline"
                className={cn(
                  "w-10 h-10 rounded-full border border-border-subtle/80 bg-white/75 backdrop-blur-md flex items-center justify-center cursor-pointer",
                  "shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_8px_-1px_rgba(20,43,32,0.06)]",
                  "text-charcoal hover:border-forest/40 hover:text-forest hover:bg-white hover:scale-105 active:scale-95 transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest motion-reduce:transform-none"
                )}
              >
                <span className="sr-only">Next slide</span>
                <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M6 4L10 8L6 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Slide Card Container */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border-subtle bg-surface-card shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.7),0_8px_24px_-4px_rgba(20,43,32,0.05)] min-h-[480px]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentArea.id}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : DURATION_FAST,
                ease: EASE_LUXE as unknown as [number, number, number, number],
              }}
              className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]"
            >
              {/* Left Column: Practice Domain Information */}
              <div className="lg:col-span-6 p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="inline-block text-[11px] font-sans font-semibold tracking-[0.16em] uppercase text-forest bg-muted-sage/35 border border-forest/15 px-3 py-1 rounded-full mb-6">
                    Practice Discipline {String(activeIndex + 1).padStart(2, "0")}
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-charcoal tracking-tight">
                    {currentArea.title}
                  </h3>

                  <p className="mt-2 font-serif text-base sm:text-lg italic text-forest font-normal">
                    {currentMeta.tagline}
                  </p>

                  <p className="mt-5 font-sans text-sm sm:text-base text-muted-slate leading-relaxed">
                    {currentArea.description}
                  </p>

                  {/* Statutory Touchpoints / Focus Tags */}
                  {currentArea.statutory_touchpoints && currentArea.statutory_touchpoints.length > 0 && (
                    <div className="mt-6 pt-5 border-t border-border-subtle/80">
                      <p className="text-[11px] font-sans font-semibold uppercase tracking-wider text-charcoal/70 mb-2.5">
                        Statutory Touchpoints &bull; Subject Matters
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {currentArea.statutory_touchpoints.map((statute) => (
                          <span
                            key={statute}
                            className="text-xs font-sans text-muted-slate bg-stone-subtle/80 px-2.5 py-1 rounded-md border border-border-subtle/70"
                          >
                            {statute}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Action */}
                <div className="mt-8 pt-6 border-t border-border-subtle/60">
                  <Button
                    href="/practice-areas"
                    variant="editorial-text"
                    size="md"
                    showArrow={true}
                    className="text-forest hover:text-forest-deep font-semibold"
                  >
                    View practice discipline overview
                  </Button>
                </div>
              </div>

              {/* Right Column: Architectural Photography Panel */}
              <div className="lg:col-span-6 relative min-h-[300px] sm:min-h-[380px] lg:min-h-full overflow-hidden bg-forest">
                <Image
                  src={currentMeta.imageSrc}
                  alt={currentMeta.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 via-transparent to-transparent pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Segmented Progress Track */}
        <div
          role="tablist"
          aria-label="Practice areas slide indicator"
          className="mt-6 flex gap-2"
        >
          {carouselItems.map((area, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={area.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Jump to slide ${index + 1}: ${area.title}`}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "flex-1 h-1.5 rounded-full transition-all duration-300",
                  isActive
                    ? "bg-forest"
                    : "bg-border-subtle hover:bg-muted-slate/50"
                )}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
}
