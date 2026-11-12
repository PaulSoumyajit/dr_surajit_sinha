"use client";

import React, { useId, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useSafeAnimation } from "@/components/ui/MotionProvider";
import { DURATION_FAST, EASE_LUXE, cn } from "@/lib/utils";

export interface AccordionItemProps {
  /** Unique identifier for the item (generated automatically if omitted) */
  id?: string;
  /** Header title or trigger element */
  title: React.ReactNode;
  /** Expandable panel content */
  children: React.ReactNode;
  /** Whether the item is expanded by default */
  defaultOpen?: boolean;
  /** Controlled open state */
  isOpen?: boolean;
  /** Callback fired when toggle is clicked */
  onToggle?: (isOpen: boolean) => void;
  /** Optional heading level for semantic document hierarchy */
  headingLevel?: "h2" | "h3" | "h4" | "h5" | "h6";
  /** Additional custom class names */
  className?: string;
}

/**
 * Expandable Accordion Item Primitive
 *
 * Implements accessible accordion semantics (WAI-ARIA Accordion Pattern):
 * - Native `<button>` trigger with Enter/Space activation.
 * - Dynamic `aria-expanded` and `aria-controls` attributes linked to unique panel ID.
 * - Smooth height and opacity transitions via Motion for React.
 * - Degrades to instant transitions when `prefers-reduced-motion` is enabled.
 */
export function AccordionItem({
  id: explicitId,
  title,
  children,
  defaultOpen = false,
  isOpen: controlledIsOpen,
  onToggle,
  headingLevel: Heading = "h3",
  className,
}: AccordionItemProps) {
  const generatedId = useId();
  const id = explicitId ?? generatedId;
  const buttonId = `accordion-btn-${id}`;
  const panelId = `accordion-panel-${id}`;

  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(defaultOpen);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;

  const { prefersReducedMotion } = useSafeAnimation();

  const handleToggle = () => {
    const nextState = !isOpen;
    if (!isControlled) {
      setUncontrolledIsOpen(nextState);
    }
    onToggle?.(nextState);
  };

  return (
    <div
      className={cn(
        "border border-border-subtle bg-surface-card rounded-xl overflow-hidden transition-colors duration-200",
        isOpen && "border-forest/25 shadow-xs",
        className
      )}
    >
      <Heading className="m-0 text-base font-normal">
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={handleToggle}
          className={cn(
            "w-full flex items-center justify-between text-left px-5 py-4 sm:px-6 sm:py-5",
            "font-serif text-charcoal text-lg sm:text-xl font-medium tracking-tight",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-primary-canvas",
            "transition-colors duration-150 hover:text-forest"
          )}
        >
          <span className="pr-4">{title}</span>
          <span
            className={cn(
              "inline-flex items-center justify-center w-7 h-7 rounded-full border border-border-subtle shrink-0",
              "text-charcoal bg-parchment transition-transform duration-300 ease-out",
              isOpen ? "rotate-45 bg-forest text-warm-ivory border-forest" : "group-hover:border-forest"
            )}
            aria-hidden="true"
          >
            {/* Editorial Thin Plus Icon */}
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            >
              <line x1="8" y1="3" x2="8" y2="13" />
              <line x1="3" y1="8" x2="13" y2="8" />
            </svg>
          </span>
        </button>
      </Heading>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={
              prefersReducedMotion
                ? { height: "auto", opacity: 1 }
                : { height: 0, opacity: 0 }
            }
            animate={{
              height: "auto",
              opacity: 1,
              transition: prefersReducedMotion
                ? { duration: 0 }
                : {
                    height: { duration: DURATION_FAST, ease: EASE_LUXE as unknown as [number, number, number, number] },
                    opacity: { duration: DURATION_FAST * 0.75, delay: 0.05 },
                  },
            }}
            exit={
              prefersReducedMotion
                ? { height: 0, opacity: 0, transition: { duration: 0 } }
                : {
                    height: 0,
                    opacity: 0,
                    transition: {
                      height: { duration: DURATION_FAST, ease: EASE_LUXE as unknown as [number, number, number, number] },
                      opacity: { duration: DURATION_FAST * 0.5 },
                    },
                  }
            }
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 text-sm sm:text-base text-muted-slate leading-relaxed font-sans border-t border-border-subtle/50">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export interface AccordionProps {
  /** Array of items to render */
  items: Array<{
    id: string;
    title: React.ReactNode;
    content: React.ReactNode;
    defaultOpen?: boolean;
  }>;
  /** Whether multiple items can be open concurrently (default false) */
  allowMultiple?: boolean;
  /** Heading level for item triggers */
  headingLevel?: "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
}

/**
 * Accordion Group Primitive
 *
 * Coordinates single-expanded or multi-expanded states across a collection of AccordionItems.
 */
export function Accordion({
  items,
  allowMultiple = false,
  headingLevel = "h3",
  className,
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(() =>
    items.filter((item) => item.defaultOpen).map((item) => item.id)
  );

  const handleToggle = (id: string, nextOpen: boolean) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        nextOpen ? [...prev, id] : prev.filter((item) => item !== id)
      );
    } else {
      setOpenIds(nextOpen ? [id] : []);
    }
  };

  return (
    <div className={cn("space-y-3 sm:space-y-4", className)}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          title={item.title}
          isOpen={openIds.includes(item.id)}
          onToggle={(nextOpen) => handleToggle(item.id, nextOpen)}
          headingLevel={headingLevel}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}

