"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export interface NavRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface UseLiquidNavOptions {
  paddingX?: number;
  paddingY?: number;
}

/**
 * Custom Hook for Liquid Glass Droplet Navigation
 *
 * Tracks the hovered navigation target relative to its container rail and calculates
 * exact coordinates for a single morphing liquid-glass surface.
 */
export function useLiquidNav(options: UseLiquidNavOptions = {}) {
  const { paddingX = 12, paddingY = 5 } = options;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredRect, setHoveredRect] = useState<NavRect | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(media.matches);

    const listener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLElement> | React.FocusEvent<HTMLElement>) => {
      if (isReducedMotion) return;
      const target = e.currentTarget;
      const container = containerRef.current;
      if (!target || !container) return;

      const cRect = container.getBoundingClientRect();
      const tRect = target.getBoundingClientRect();

      setHoveredRect({
        x: tRect.left - cRect.left - paddingX,
        y: tRect.top - cRect.top - paddingY,
        width: tRect.width + paddingX * 2,
        height: tRect.height + paddingY * 2,
      });
    },
    [isReducedMotion, paddingX, paddingY]
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredRect(null);
  }, []);

  return {
    containerRef,
    hoveredRect,
    handleMouseEnter,
    handleMouseLeave,
    isReducedMotion,
  };
}

/**
 * Liquid Glass Morphing Droplet Indicator Component
 *
 * Renders a single travelling liquid glass surface that glides, organically morphs
 * dimensions, and settles with refined specular highlights across navigation links.
 */
export function LiquidDroplet({
  rect,
  className,
}: {
  rect: NavRect | null;
  className?: string;
}) {
  if (!rect) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="fluid-liquid-glass-indicator"
        initial={{
          opacity: 0,
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          scale: 0.96,
          transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
        }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 27,
          mass: 0.68,
        }}
        className={cn(
          "absolute pointer-events-none rounded-full z-0 overflow-hidden",
          // iOS-inspired dynamic translucency, saturation & high-depth blur
          "bg-warm-ivory/78 backdrop-blur-xl saturate-[155%]",
          "border border-white/65",
          "shadow-[0_4px_20px_-2px_rgba(20,43,32,0.08),0_1px_3px_0_rgba(20,43,32,0.04),inset_0_1.5px_2px_0_rgba(255,255,255,0.98),inset_0_-1px_1.5px_0_rgba(20,43,32,0.05)]",
          className
        )}
      >
        {/* Upper Specular Glass Glaze (Curved reflection) */}
        <div
          className="absolute inset-x-0 top-0 h-[48%] rounded-t-full pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0.16) 60%, transparent 100%)",
          }}
        />

        {/* Lower Refractive Bottom Edge (Simulates curved glass thickness) */}
        <div className="absolute inset-x-3 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/45 to-transparent pointer-events-none" />

        {/* Inner Specular Bevel Edge */}
        <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/65 pointer-events-none" />
      </motion.div>
    </AnimatePresence>
  );
}
