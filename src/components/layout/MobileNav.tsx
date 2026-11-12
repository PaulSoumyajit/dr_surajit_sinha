"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { Button } from "@/components/ui/Button";
import { useSafeAnimation } from "@/components/ui/MotionProvider";
import { COUNSEL_PROFILE } from "@/lib/data/profile";
import { DURATION_FAST, EASE_LUXE, cn } from "@/lib/utils";

export interface MobileNavItem {
  label: string;
  href: string;
  description?: string;
}

const MOBILE_NAV_ITEMS: MobileNavItem[] = [
  { label: "About", href: "/about", description: "Background, admissions & philosophy" },
  { label: "Practice Areas", href: "/practice-areas", description: "Criminal, prosecution, cyber law & civil litigation" },
  { label: "Academic & Research", href: "/publications", description: "PhD specialisation & academic credentials" },
  { label: "Court Experience", href: "/judgments", description: "Public prosecution & litigation practice" },
  { label: "Insights", href: "/insights", description: "Legal journal & statutory analyses" },
  { label: "Contact", href: "/contact", description: "Professional details & chambers inquiry" },
];

/**
 * Accessible Mobile Navigation Drawer
 *
 * Provides a full-screen editorial drawer for mobile and tablet viewports (<768px).
 *
 * Accessibility Highlights:
 * - WAI-ARIA Modal Dialog Pattern (`role="dialog"`, `aria-modal="true"`).
 * - Full focus trap restricting Tab / Shift+Tab navigation to drawer elements.
 * - Escape key dismissal with focus restoration to hamburger trigger.
 * - Dynamic document body scroll locking.
 * - Closes automatically upon route selection.
 */
export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLAnchorElement>(null);

  const { prefersReducedMotion } = useSafeAnimation();

  // Close drawer whenever pathname changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Handle Escape key and focus management
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
        return;
      }

      // Focus trap logic
      if (event.key === "Tab" && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Shift focus to the first focusable element inside the drawer
    const timer = setTimeout(() => {
      firstFocusableRef.current?.focus();
    }, 50);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen]);

  const toggleDrawer = () => {
    const next = !isOpen;
    setIsOpen(next);
    if (!next) {
      triggerRef.current?.focus();
    }
  };

  return (
    <div className="md:hidden">
      {/* Mobile Top Header Strip */}
      <div className="flex items-center justify-between px-4 py-3.5 bg-primary-canvas/90 backdrop-blur-md border-b border-border-subtle/80 sticky top-0 z-40">
        <BrandLogo size="sm" />

        {/* Morphing Hamburger / Close Trigger Button */}
        <button
          ref={triggerRef}
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-nav-drawer"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={toggleDrawer}
          className={cn(
            "relative w-11 h-11 flex flex-col items-center justify-center rounded-lg select-none",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-primary-canvas",
            "text-charcoal hover:text-forest transition-colors duration-200"
          )}
        >
          <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
          <span
            className={cn(
              "w-5 h-0.5 bg-current rounded-full transition-all duration-300 ease-out",
              isOpen ? "rotate-45 translate-y-1.5" : "-translate-y-1"
            )}
            aria-hidden="true"
          />
          <span
            className={cn(
              "w-5 h-0.5 bg-current rounded-full transition-opacity duration-200 ease-out",
              isOpen ? "opacity-0" : "opacity-100"
            )}
            aria-hidden="true"
          />
          <span
            className={cn(
              "w-5 h-0.5 bg-current rounded-full transition-all duration-300 ease-out",
              isOpen ? "-rotate-45 -translate-y-1.5" : "translate-y-1"
            )}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Full-Screen Drawer Overlay & Panel */}
      <AnimatePresence>
        {isOpen && (
          <div
            id="mobile-nav-drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-nav-title"
            className="fixed inset-0 top-[59px] z-50 flex flex-col bg-primary-canvas/96 backdrop-blur-2xl overflow-y-auto shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.7)]"
          >
            {/* Backdrop / Content Panel */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{
                duration: prefersReducedMotion ? 0 : DURATION_FAST,
                ease: EASE_LUXE as unknown as [number, number, number, number],
              }}
              className="flex-1 flex flex-col justify-between px-6 py-8"
            >
              <div>
                <h2 id="mobile-nav-title" className="sr-only">
                  Mobile Navigation
                </h2>

                {/* Primary Editorial Navigation Links */}
                <nav aria-label="Mobile Navigation Links" className="space-y-2">
                  {MOBILE_NAV_ITEMS.map((item, index) => {
                    const isActive =
                      item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href);

                    return (
                      <div
                        key={item.href}
                        className="border-b border-border-subtle/50 pb-3"
                      >
                        <Link
                          ref={index === 0 ? firstFocusableRef : undefined}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "group flex items-baseline justify-between p-2 rounded-xl transition-all duration-200",
                            "hover:translate-x-1 hover:bg-stone-subtle/40 motion-reduce:transform-none",
                            isActive
                              ? "text-forest font-semibold"
                              : "text-charcoal hover:text-forest"
                          )}
                        >
                          <div>
                            <span className="font-serif text-2xl sm:text-3xl font-medium tracking-tight block">
                              {item.label}
                            </span>
                            {item.description && (
                              <span className="font-sans text-xs text-muted-slate block mt-0.5">
                                {item.description}
                              </span>
                            )}
                          </div>
                          <span
                            className={cn(
                              "text-xs font-sans font-medium px-2 py-0.5 rounded-full border transition-all duration-200",
                              isActive
                                ? "bg-forest text-warm-ivory border-forest"
                                : "text-muted-slate border-border-subtle group-hover:border-forest/40 group-hover:translate-x-0.5"
                            )}
                          >
                            ↗
                          </span>
                        </Link>
                      </div>
                    );
                  })}
                </nav>

                {/* Direct Action Link */}
                <div className="mt-8">
                  <Button
                    href="/contact"
                    variant="primary"
                    size="lg"
                    showArrow={true}
                    className="w-full tracking-tight"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact details
                  </Button>
                </div>
              </div>

              {/* Verified Identity & Regulatory Link (No fabricated phone/email) */}
              <div className="mt-10 pt-6 border-t border-border-subtle text-xs text-muted-slate space-y-2">
                <p className="font-sans font-medium text-charcoal">
                  {COUNSEL_PROFILE.name} — {COUNSEL_PROFILE.title}
                </p>
                <p className="font-sans leading-relaxed">
                  Published strictly for informational purposes under Bar Council of
                  India guidelines.
                </p>
                <div className="pt-2">
                  <Link
                    href="/disclaimer"
                    onClick={() => setIsOpen(false)}
                    className="text-forest underline underline-offset-4 hover:text-forest-deep"
                  >
                    Regulatory Non-Solicitation Disclaimer
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

