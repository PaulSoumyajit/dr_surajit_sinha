"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { MotionConfig, useReducedMotion, type Transition } from "motion/react";
import { DURATION_FAST, DURATION_STANDARD, EASE_LUXE } from "@/lib/utils";

interface SafeAnimationContextValue {
  /** Whether the user prefers reduced motion (system setting) */
  prefersReducedMotion: boolean;
  /**
   * Safe transition object that collapses duration to 0 and disables
   * animation if the user prefers reduced motion.
   */
  transition: Transition;
  /** Fast transition object for micro-interactions, collapsing to 0 if reduced motion */
  fastTransition: Transition;
  /** Helper to generate customized transitions honoring reduced motion */
  getTransition: (options?: {
    duration?: number;
    delay?: number;
    ease?: readonly number[] | string;
  }) => Transition;
}

const MotionContext = createContext<SafeAnimationContextValue>({
  prefersReducedMotion: false,
  transition: {
    duration: DURATION_STANDARD,
    ease: EASE_LUXE as unknown as [number, number, number, number],
  },
  fastTransition: {
    duration: DURATION_FAST,
    ease: EASE_LUXE as unknown as [number, number, number, number],
  },
  getTransition: () => ({
    duration: DURATION_STANDARD,
    ease: EASE_LUXE as unknown as [number, number, number, number],
  }),
});

export interface MotionProviderProps {
  children: React.ReactNode;
}

/**
 * Global Motion Configuration & Accessibility Boundary
 *
 * Configures Motion for React with `reducedMotion="user"`, respecting OS-level
 * motion sensitivities. Provides `useSafeAnimation` hook for child components
 * to adapt opacity, stagger, and layout transitions.
 */
export function MotionProvider({ children }: MotionProviderProps) {
  const systemPrefersReduced = useReducedMotion();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // During SSR or before hydration, default to false safely
  const prefersReducedMotion = isClient ? Boolean(systemPrefersReduced) : false;

  const getTransition = (options?: {
    duration?: number;
    delay?: number;
    ease?: readonly number[] | string;
  }): Transition => {
    if (prefersReducedMotion) {
      return {
        duration: 0,
        delay: 0,
      };
    }

    return {
      duration: options?.duration ?? DURATION_STANDARD,
      delay: options?.delay ?? 0,
      ease: (options?.ease ?? EASE_LUXE) as unknown as [number, number, number, number],
    };
  };

  const contextValue: SafeAnimationContextValue = {
    prefersReducedMotion,
    transition: getTransition(),
    fastTransition: getTransition({ duration: DURATION_FAST }),
    getTransition,
  };

  return (
    <MotionConfig reducedMotion="user">
      <MotionContext.Provider value={contextValue}>
        {children}
      </MotionContext.Provider>
    </MotionConfig>
  );
}

/**
 * Hook to access motion safety preferences and pre-computed motion curves.
 * Ensures opacity transitions, stagger delays, and transforms gracefully degrade
 * to instant state transitions when prefers-reduced-motion is active.
 */
export function useSafeAnimation(): SafeAnimationContextValue {
  return useContext(MotionContext);
}

