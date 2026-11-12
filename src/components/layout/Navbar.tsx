"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useLiquidNav, LiquidDroplet } from "@/components/ui/LiquidNav";
import { cn } from "@/lib/utils";

export interface NavItem {
  label: string;
  href: string;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Practice Areas", href: "/practice-areas" },
  { label: "Academic & Research", href: "/publications" },
  { label: "Court Experience", href: "/judgments" },
  { label: "Insights", href: "/insights" },
];

/**
 * Desktop Sticky Navigation Bar
 *
 * Implements the primary editorial header:
 * - BrandLogo lockup on left.
 * - Central semantic navigation with active route indication.
 * - Dignified, BCI Rule 36 compliant contact CTA on right ("Contact details ↗").
 * - Translucent warm ivory surface with subtle scroll-activated border definition.
 */
export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const { containerRef, hoveredRect, handleMouseEnter, handleMouseLeave } = useLiquidNav({
    paddingX: 14,
    paddingY: 6,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    // Check initial scroll state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isRouteActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300 ease-out",
        "backdrop-blur-xl",
        isScrolled
          ? "bg-primary-canvas/88 border-b border-border-subtle/80 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.75),0_8px_24px_-4px_rgba(20,43,32,0.06)] py-3.5"
          : "bg-primary-canvas/75 border-b border-border-subtle/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5)] py-5"
      )}
    >
      <Container className="flex items-center justify-between">
        {/* Brand Lockup */}
        <BrandLogo size="md" />

        {/* Central Editorial Navigation Links (Desktop: md/lg and above) */}
        <nav
          ref={containerRef}
          onMouseLeave={handleMouseLeave}
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-6 lg:gap-8 relative py-1"
        >
          {/* Single Travelling Liquid Glass Droplet */}
          <LiquidDroplet rect={hoveredRect} />

          {MAIN_NAV_ITEMS.map((item) => {
            const active = isRouteActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onMouseEnter={handleMouseEnter}
                onFocus={handleMouseEnter}
                className={cn(
                  "relative z-10 font-sans text-sm tracking-tight transition-colors duration-200 select-none py-1.5 px-2.5 rounded-full group",
                  active
                    ? "text-forest-deep font-semibold"
                    : "text-charcoal/85 hover:text-forest font-medium"
                )}
              >
                <span className="relative z-10">{item.label}</span>

                {/* Subtle active underline indicator */}
                {active && (
                  <span
                    className="absolute -bottom-0.5 left-2.5 right-2.5 h-0.5 bg-forest rounded-full"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action: Neutral Contact Inquiry CTA */}
        <div className="hidden md:flex items-center">
          <Button
            href="/contact"
            variant="primary"
            size="sm"
            showArrow={true}
            className="tracking-tight"
          >
            Contact details
          </Button>
        </div>
      </Container>
    </header>
  );
}

