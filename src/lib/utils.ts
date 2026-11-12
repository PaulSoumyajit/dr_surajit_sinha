import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names cleanly with clsx and resolves Tailwind CSS conflicts with tailwind-merge.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Premium deceleration curve used across all editorial transitions.
 * Specification: docs/02_DESIGN_PHILOSOPHY.md
 */
export const EASE_LUXE = [0.22, 1, 0.36, 1] as const;

/** Standard section reveal and layout transition duration (seconds) */
export const DURATION_STANDARD = 0.8;

/** Fast micro-interaction and hover state transition duration (seconds) */
export const DURATION_FAST = 0.35;

