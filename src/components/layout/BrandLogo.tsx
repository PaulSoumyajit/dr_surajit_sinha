import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface BrandLogoProps {
  /** Size variant: "sm" (32px emblem, mobile), "md" (36px emblem, header default), "lg" (44px emblem, footer) */
  size?: "sm" | "md" | "lg";
  /** Whether to render only the vector monogram without the wordmark */
  monogramOnly?: boolean;
  /** Whether to stack wordmark vertically beneath emblem (e.g. for footer columns) */
  stacked?: boolean;
  /** Additional custom classes */
  className?: string;
}

/**
 * Custom Vector Monogram Emblem ("SS")
 *
 * Interlocking dual-S serif letterforms set within a refined forest green cartouche.
 * Engineered for razor-sharp vector rendering at 32px, 36px, and 48px sizes
 * without relying on external raster assets or cliché legal scales.
 */
export function MonogramEmblem({
  size = 36,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0 select-none", className)}
      aria-hidden="true"
    >
      {/* Outer cartouche with subtle 1px border */}
      <rect
        x="1.5"
        y="1.5"
        width="45"
        height="45"
        rx="10"
        className="fill-forest stroke-forest-deep"
        strokeWidth="1.5"
      />

      {/* Primary Left S Serif Letterform */}
      <path
        d="M23 15.5C21.8 14.5 20.2 14 18.5 14C15.2 14 13 16 13 18.8C13 23 23 23.2 23 28.5C23 32 20 34 16.5 34C14.2 34 12.2 33 11 31.5M23 15.5V13.5M11 31.5V33.8"
        stroke="#F8F6F0"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Secondary Interlocking Right S Serif Letterform */}
      <path
        d="M37 15.5C35.8 14.5 34.2 14 32.5 14C29.2 14 27 16 27 18.8C27 23 37 23.2 37 28.5C37 32 34 34 30.5 34C28.2 34 26.2 33 25 31.5M37 15.5V13.5M25 31.5V33.8"
        stroke="#F8F6F0"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Center Serif Flourish Accent / Balance Line */}
      <circle cx="24" cy="24" r="1.25" fill="#D3DDD6" />
    </svg>
  );
}

const sizeConfig = {
  sm: {
    emblemSize: 30,
    titleClass: "text-base tracking-tight leading-none",
    subtitleClass: "text-[9px] tracking-[0.16em] leading-none mt-1",
  },
  md: {
    emblemSize: 36,
    titleClass: "text-lg sm:text-xl tracking-tight leading-none",
    subtitleClass: "text-[10px] tracking-[0.18em] leading-none mt-1.5",
  },
  lg: {
    emblemSize: 44,
    titleClass: "text-xl sm:text-2xl tracking-tight leading-none",
    subtitleClass: "text-[11px] tracking-[0.2em] leading-none mt-2",
  },
};

/**
 * Editorial Brand Lockup
 *
 * Integrates the SS monogram emblem with the Newsreader serif wordmark
 * ("DR. SURAJIT SINHA") and Plus Jakarta Sans subtitle ("ADVOCATE & LEGAL COUNSEL").
 */
export function BrandLogo({
  size = "md",
  monogramOnly = false,
  stacked = false,
  className,
}: BrandLogoProps) {
  const config = sizeConfig[size];

  return (
    <Link
      href="/"
      aria-label="Dr. Surajit Sinha — Advocate — Return to Homepage"
      className={cn(
        "group inline-flex items-center gap-3 transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-primary-canvas rounded-lg",
        stacked && "flex-col items-start gap-2.5",
        className
      )}
    >
      <MonogramEmblem size={config.emblemSize} />

      {!monogramOnly && (
        <span className="flex flex-col text-left select-none">
          <span
            className={cn(
              "font-serif font-medium text-charcoal group-hover:text-forest transition-colors duration-200",
              config.titleClass
            )}
          >
            DR. SURAJIT SINHA
          </span>
          <span
            className={cn(
              "font-sans font-semibold uppercase text-muted-slate group-hover:text-forest/80 transition-colors duration-200",
              config.subtitleClass
            )}
          >
            ADVOCATE &amp; LEGAL COUNSEL
          </span>
        </span>
      )}
    </Link>
  );
}

