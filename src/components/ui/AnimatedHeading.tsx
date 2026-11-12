"use client";

import React from "react";
import { motion, type Variants } from "motion/react";
import { useSafeAnimation } from "@/components/ui/MotionProvider";
import { EASE_LUXE, cn } from "@/lib/utils";

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface AnimatedHeadingProps {
  /** The text content to animate word by word */
  text: string;
  /** Semantic HTML heading level */
  as?: HeadingLevel;
  /** Additional custom classes */
  className?: string;
  /** Initial delay before stagger begins (in seconds) */
  delay?: number;
  /** Stagger interval between words (defaults to 0.045s) */
  staggerInterval?: number;
  /** Whether the reveal triggers once upon entering viewport */
  once?: boolean;
}

const STAGGER_DEFAULT = 0.045;
const DURATION_WORD = 0.7;

const wordVariants: Variants = {
  hidden: {
    y: "115%",
    opacity: 0,
  },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: DURATION_WORD,
      ease: EASE_LUXE as unknown as [number, number, number, number],
    },
  },
};

/**
 * Animated Editorial Heading
 *
 * Implements a dignified word-by-word upward reveal masked inside overflow-hidden
 * containers. Designed for Newsreader serif titles without gaudy blurs or scaling.
 *
 * Accessibility:
 * - Emits `aria-label` with the full text on the heading container.
 * - Marks the staggered word presentation with `aria-hidden="true"` to prevent
 *   stuttering screen-reader announcements.
 * - Instantly displays plain text when `prefers-reduced-motion` is active.
 */
export function AnimatedHeading({
  text,
  as: Component = "h2",
  className,
  delay = 0,
  staggerInterval = STAGGER_DEFAULT,
  once = true,
}: AnimatedHeadingProps) {
  const { prefersReducedMotion } = useSafeAnimation();

  // Clean, whitespace-preserved word splitting
  const words = text.trim().split(/\s+/);

  if (prefersReducedMotion) {
    return (
      <Component className={cn("font-serif text-charcoal", className)}>
        {text}
      </Component>
    );
  }

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerInterval,
        delayChildren: delay,
      },
    },
  };

  return (
    <Component
      aria-label={text}
      className={cn("font-serif text-charcoal tracking-tight", className)}
    >
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-10% 0px" }}
        aria-hidden="true"
        className="inline"
      >
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="inline-block overflow-hidden align-baseline pb-[0.08em] -mb-[0.08em] mr-[0.25em] last:mr-0"
          >
            <motion.span
              variants={wordVariants}
              className="inline-block will-change-transform"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Component>
  );
}

