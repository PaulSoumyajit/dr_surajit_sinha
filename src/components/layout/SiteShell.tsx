import React from "react";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { Navbar } from "@/components/layout/Navbar";
import { RegulatoryNoticeBar } from "@/components/layout/RegulatoryNoticeBar";
import { DisclaimerModal } from "@/components/layout/DisclaimerModal";
import { cn } from "@/lib/utils";

export interface SiteShellProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Global SiteShell Wrapper
 *
 * Encloses all public-facing pages within the unified editorial framework:
 * - Accessible Skip-to-Content keyboard trigger.
 * - Persistent Bar Council Regulatory Notice Bar.
 * - Responsive navigation system (Desktop Sticky Navbar + Mobile Drawer).
 * - Semantic `<main id="main-content">` landmark.
 * - Comprehensive editorial Footer.
 */
export function SiteShell({ children, className }: SiteShellProps) {
  return (
    <div className={cn("min-h-screen flex flex-col bg-primary-canvas text-charcoal antialiased", className)}>
      {/* Accessible Skip-to-Content link for keyboard / screen-reader navigation */}
      <a
        href="#main-content"
        className={cn(
          "sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50",
          "bg-forest text-warm-ivory px-4 py-2 text-xs font-sans font-semibold rounded-md",
          "shadow-md ring-2 ring-forest-deep focus:outline-none"
        )}
      >
        Skip to main legal content
      </a>

      {/* Persistent Bar Council Regulatory Notice */}
      <RegulatoryNoticeBar />

      {/* Desktop Sticky Header */}
      <Navbar />

      {/* Mobile Sticky Header & Slide Drawer */}
      <MobileNav />

      {/* Main Page Landmark */}
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Bar Council of India Regulatory Disclaimer Entrance Modal */}
      <DisclaimerModal />
    </div>
  );
}

