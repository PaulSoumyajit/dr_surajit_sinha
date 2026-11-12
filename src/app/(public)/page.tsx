import React from "react";
import type { Metadata } from "next";
import { HeroSplit } from "@/components/sections/HeroSplit";
import { ValuePillars } from "@/components/sections/ValuePillars";
import { PerspectiveSection } from "@/components/sections/PerspectiveSection";
import { PracticeCarousel } from "@/components/sections/PracticeCarousel";
import { ProcessAccordion } from "@/components/sections/ProcessAccordion";
import { PhotoQuoteBreak } from "@/components/sections/PhotoQuoteBreak";
import { ScenarioSwitcher } from "@/components/sections/ScenarioSwitcher";
import { ChambersCta } from "@/components/sections/ChambersCta";
import { generateLegalServiceSchema, safeJsonLd, SITE_CONFIG } from "@/lib/seo";

export const metadata: Metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: "Dr. Surajit Sinha, Advocate",
    type: "website",
    locale: "en_IN",
  },
};

/**
 * Editorial Homepage (P4-09)
 *
 * Assembles the full 8-section homepage narrative per docs/03_INFORMATION_ARCHITECTURE.md:
 * 1. Signature Split Hero (P4-01) — video frames 001/038
 * 2. Value Pillars (P4-02) — video frame 004
 * 3. Editorial Perspective Narrative (P4-03) — video frame 005
 * 4. Interactive Expertise Carousel (P4-04) — video frames 008/010
 * 5. Process Accordion (P4-05) — video frame 015
 * 6. Photographic Editorial Quote Break (P4-06) — video frame 022
 * 7. Client Scenario Selector (P4-07) — video frames 026/030
 * 8. Consultation Conversion & Chambers Section (P4-08) — video frame 034
 *
 * Injects Schema.org LegalService structured data conforming to Bar Council of India Rule 36.
 */
export default function HomePage() {
  const jsonLd = generateLegalServiceSchema();

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />

      {/* 1. Signature Split Hero */}
      <HeroSplit />

      {/* 2. Value Pillars */}
      <ValuePillars />

      {/* 3. Editorial Perspective Narrative */}
      <PerspectiveSection />

      {/* 4. Interactive Expertise Carousel */}
      <PracticeCarousel />

      {/* 5. Process Accordion */}
      <ProcessAccordion />

      {/* 6. Full-Width Photographic Quote Break */}
      <PhotoQuoteBreak />

      {/* 7. Client Scenario Selector */}
      <ScenarioSwitcher />

      {/* 8. Consultation Conversion & Chambers Section */}
      <ChambersCta />
    </>
  );
}
