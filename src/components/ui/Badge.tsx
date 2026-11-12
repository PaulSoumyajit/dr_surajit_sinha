import React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "eyebrow" | "pill";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Visual display style */
  variant?: BadgeVariant;
  /** Whether to display the small leading circular indicator */
  showDot?: boolean;
  /** Custom dot color class override (defaults to current accent color) */
  dotClassName?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Editorial Badge & Eyebrow Primitive
 *
 * Used for section category markers (e.g. "• THE SINHA PERSPECTIVE"),
 * status indicators, and article taxonomy tags.
 *
 * Typography: Plus Jakarta Sans, 11-12px, 0.12em letter spacing, uppercase.
 */
export function Badge({
  variant = "eyebrow",
  showDot = variant === "eyebrow",
  dotClassName,
  children,
  className,
  ...props
}: BadgeProps) {
  const isEyebrow = variant === "eyebrow";

  return (
    <span
      className={cn(
        "inline-flex items-center font-sans select-none",
        isEyebrow
          ? "text-[11px] sm:text-xs font-semibold tracking-[0.12em] uppercase text-forest"
          : "text-xs font-medium tracking-wide text-forest bg-muted-sage/35 border border-forest/15 px-3 py-1 rounded-full",
        className
      )}
      {...props}
    >
      {showDot && (
        <span
          className={cn(
            "inline-block rounded-full shrink-0 mr-2",
            isEyebrow ? "w-1.5 h-1.5 bg-forest" : "w-1.5 h-1.5 bg-forest/80",
            dotClassName
          )}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
}

