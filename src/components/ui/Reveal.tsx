"use client";

import React from "react";
import { motion, type TargetAndTransition } from "motion/react";
import { useSafeAnimation } from "@/components/ui/MotionProvider";
import { DURATION_STANDARD, EASE_LUXE, cn } from "@/lib/utils";

export interface RevealProps {
  children: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
  /** Delay before animation triggers (in seconds) */
  delay?: number;
  /** Custom duration (in seconds, defaults to 0.8s) */
  duration?: number;
  /** Initial vertical translation offset in pixels (defaults to 18px) */
  yOffset?: number;
  /** Whether the animation triggers only once when entering viewport */
  once?: boolean;
  /** Viewport margin threshold (defaults to "-10% 0px") */
  margin?: `${number}${"px" | "%"} ${number}${"px" | "%"}` | string;
}

/**
 * Viewport Reveal Component
 *
 * Provides a dignified, calm editorial upward reveal for editorial columns,
 * cards, and photographic elements upon entering the viewport.
 *
 * Strict Design Principles:
 * - Zero blur filters (avoids GPU compositing lag on mobile devices).
 * - Restrained 18px translation using EASE_LUXE curve over 0.8s.
 * - Immediately renders content with 0 translation/duration when
 *   prefers-reduced-motion is active.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = DURATION_STANDARD,
  yOffset = 18,
  once = true,
  margin = "-10% 0px",
}: RevealProps) {
  const { prefersReducedMotion } = useSafeAnimation();

  if (prefersReducedMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  const initial: TargetAndTransition = {
    opacity: 0,
    y: yOffset,
  };

  const whileInView: TargetAndTransition = {
    opacity: 1,
    y: 0,
  };

  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      viewport={{ once, margin }}
      transition={{
        duration,
        delay,
        ease: EASE_LUXE as unknown as [number, number, number, number],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
