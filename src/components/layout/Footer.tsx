"use client";

import React from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { Container } from "@/components/ui/Container";
import { useSafeAnimation } from "@/components/ui/MotionProvider";
import { useLiquidNav, LiquidDroplet } from "@/components/ui/LiquidNav";
import { cn } from "@/lib/utils";

const FOOTER_NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Practice Areas", href: "/practice-areas" },
  { label: "Academic & Research", href: "/publications" },
  { label: "Court Experience", href: "/judgments" },
  { label: "Insights", href: "/insights" },
];

const FOOTER_LEGAL_LINKS = [
  { label: "Regulatory Disclaimer", href: "/disclaimer" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Engagement", href: "/terms" },
  { label: "Contact Details", href: "/contact" },
];

/**
 * Comprehensive Editorial Footer
 *
 * Implements a dignified, literary footer anchored by the SS brand mark,
 * comprehensive editorial navigation, strict BCI Rule 36 compliance disclosures,
 * and a smooth back-to-top interaction.
 *
 * Strict Compliance: Zero fabricated chamber addresses, telephone numbers, or awards.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();
  const { prefersReducedMotion } = useSafeAnimation();

  const navGroup = useLiquidNav({ paddingX: 10, paddingY: 3 });
  const legalGroup = useLiquidNav({ paddingX: 10, paddingY: 3 });

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "instant" : "smooth",
    });
  };

  return (
    <footer className="w-full bg-parchment border-t border-border-subtle mt-auto">
      {/* Upper Tier: Identity & Primary Editorial Sitemaps */}
      <div className="py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14">
            {/* Identity & Professional Overview */}
            <div className="md:col-span-6 lg:col-span-5 space-y-4">
              <BrandLogo size="lg" />

              <p className="font-sans text-sm text-muted-slate leading-relaxed max-w-md pt-2">
                Advocate with a professional background spanning criminal and civil proceedings,
                public prosecution, cybercrime and cyber law, banking and debt recovery, and land
                and revenue-related legal work.
              </p>

              <p className="font-sans text-xs text-muted-slate/85 leading-relaxed max-w-md">
                All credentials, reported citations, and authored works are presented strictly
                for professional informational purposes in accordance with Bar Council of India
                standards.
              </p>
            </div>

            {/* Navigation Column: Editorial Directory */}
            <div className="md:col-span-3 lg:col-span-3 lg:col-start-7">
              <h3 className="font-serif text-base font-semibold text-charcoal mb-4 tracking-tight">
                Editorial Directory
              </h3>
              <div
                ref={navGroup.containerRef}
                onMouseLeave={navGroup.handleMouseLeave}
                className="relative"
              >
                <LiquidDroplet rect={navGroup.hoveredRect} className="rounded-xl" />
                <ul className="space-y-2.5 font-sans text-sm relative z-10">
                  {FOOTER_NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onMouseEnter={navGroup.handleMouseEnter}
                        onFocus={navGroup.handleMouseEnter}
                        className="text-muted-slate hover:text-forest transition-colors duration-150 inline-block py-0.5 px-1 relative z-10"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Navigation Column: Compliance & Engagement */}
            <div className="md:col-span-3 lg:col-span-3">
              <h3 className="font-serif text-base font-semibold text-charcoal mb-4 tracking-tight">
                Chambers &amp; Compliance
              </h3>
              <div
                ref={legalGroup.containerRef}
                onMouseLeave={legalGroup.handleMouseLeave}
                className="relative"
              >
                <LiquidDroplet rect={legalGroup.hoveredRect} className="rounded-xl" />
                <ul className="space-y-2.5 font-sans text-sm relative z-10">
                  {FOOTER_LEGAL_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onMouseEnter={legalGroup.handleMouseEnter}
                        onFocus={legalGroup.handleMouseEnter}
                        className="text-muted-slate hover:text-forest transition-colors duration-150 inline-block py-0.5 px-1 relative z-10"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Regulatory BCI Rule 36 Statement Banner */}
      <div className="border-t border-border-subtle/70 bg-stone-subtle/50 py-5">
        <Container>
          <p className="font-sans text-xs text-muted-slate leading-relaxed">
            <strong className="font-semibold text-charcoal">Regulatory Declaration:</strong> As per the rules of the Bar Council of India (specifically Rule 36, Section IV, Chapter II, Part VI of the BCI Rules), advocates are prohibited from soliciting work or advertising in any manner. This website is maintained solely for informational reference and does not constitute legal solicitation, advertisement, or personal counsel.
          </p>
        </Container>
      </div>

      {/* Lower Tier: Copyright, Terms & Back to Top */}
      <div className="border-t border-border-subtle py-6 bg-parchment">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-muted-slate">
          <div>
            &copy; {currentYear} Dr. Surajit Sinha, Advocate. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/disclaimer"
              className="hover:text-forest transition-colors duration-150"
            >
              Disclaimer
            </Link>
            <Link
              href="/privacy-policy"
              className="hover:text-forest transition-colors duration-150"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-forest transition-colors duration-150"
            >
              Terms
            </Link>

            {/* Back to top semantic trigger */}
            <button
              type="button"
              onClick={handleBackToTop}
              className={cn(
                "group inline-flex items-center gap-1.5 font-medium text-charcoal hover:text-forest",
                "transition-colors duration-200 select-none ml-2",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 rounded"
              )}
              aria-label="Back to top of page"
            >
              <span>Top</span>
              <span
                className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:transform-none"
                aria-hidden="true"
              >
                ↑
              </span>
            </button>
          </div>
        </Container>
      </div>
    </footer>
  );
}

