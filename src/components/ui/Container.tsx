import React from "react";
import { cn } from "@/lib/utils";

export type ContainerVariant = "default" | "narrow" | "prose";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Layout width variant:
   * - `default`: max-w-7xl (1280px) for standard page sections and split layouts
   * - `narrow`: max-w-6xl (1152px) for structured intros, legal disclosures, and forms
   * - `prose`: max-w-prose (approx. 65-72ch) for editorial reading per 02_DESIGN_PHILOSOPHY.md
   */
  variant?: ContainerVariant;
  /** Semantic HTML element wrapper (defaults to "div") */
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<ContainerVariant, string> = {
  default: "max-w-7xl",
  narrow: "max-w-6xl",
  prose: "max-w-prose",
};

/**
 * Responsive Content Container
 *
 * Enforces editorial grid alignment and horizontal margins across all viewports.
 * Uses fluid responsive padding (px-4 on 360px mobile, px-6 on tablet, px-8 on desktop)
 * with strict centered containment up to 1920px displays.
 */
export function Container({
  variant = "default",
  as: Component = "div",
  children,
  className,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

