import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "editorial-text" | "glass";
export type ButtonSize = "sm" | "md" | "lg";

export interface BaseButtonProps {
  /** Visual hierarchy variant */
  variant?: ButtonVariant;
  /** Component dimensions */
  size?: ButtonSize;
  /** Whether to render the diagonal arrow indicator (↗) */
  showArrow?: boolean;
  /** Position of the diagonal arrow icon */
  arrowPosition?: "trailing" | "leading";
  /** Optional icon to render alongside text */
  icon?: React.ReactNode;
  /** Additional custom class names */
  className?: string;
  /** Content of the button */
  children: React.ReactNode;
}

export type ButtonAsButton = BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> & {
    href?: undefined;
  };

export type ButtonAsLink = BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Editorial diagonal arrow icon (↗) with tactile translation on hover.
 */
function DiagonalArrow({
  className,
  position = "trailing",
}: {
  className?: string;
  position?: "trailing" | "leading";
}) {
  return (
    <svg
      className={cn(
        "inline-block w-3.5 h-3.5 transition-transform duration-200 ease-out",
        "group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transform-none",
        position === "leading" ? "mr-1.5 -ml-0.5" : "ml-1.5 -mr-0.5",
        className
      )}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4.5 11.5L11.5 4.5" />
      <path d="M5.5 4.5H11.5V10.5" />
    </svg>
  );
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-forest text-warm-ivory border border-forest-deep/30 hover:bg-forest-deep shadow-[inset_0_1px_1.5px_0_rgba(255,255,255,0.35),inset_0_-1px_1px_0_rgba(0,0,0,0.2),0_4px_16px_-2px_rgba(20,43,32,0.22)] hover:shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.5),0_8px_24px_-4px_rgba(20,43,32,0.32)] hover:-translate-y-0.5 hover:scale-[1.015] active:translate-y-[1px] active:scale-[0.98] active:shadow-[inset_0_1px_1px_0_rgba(0,0,0,0.3),0_2px_6px_-1px_rgba(20,43,32,0.2)] transition-all duration-250 ease-out motion-reduce:transform-none overflow-hidden relative",
  secondary:
    "bg-parchment text-charcoal border border-border-subtle/90 hover:bg-stone-subtle hover:border-forest/30 shadow-[inset_0_1px_1.5px_0_rgba(255,255,255,0.95),inset_0_-1px_1px_0_rgba(27,59,43,0.05),0_2px_8px_-1px_rgba(20,43,32,0.06)] hover:shadow-[inset_0_1px_2px_0_rgba(255,255,255,1),0_8px_20px_-3px_rgba(20,43,32,0.09)] hover:-translate-y-0.5 hover:scale-[1.015] active:translate-y-[1px] active:scale-[0.98] transition-all duration-250 ease-out motion-reduce:transform-none overflow-hidden relative",
  outline:
    "bg-transparent text-charcoal border border-border-subtle hover:border-forest hover:text-forest hover:bg-forest/5 hover:-translate-y-0.5 hover:scale-[1.015] active:translate-y-[1px] active:scale-[0.98] transition-all duration-250 ease-out motion-reduce:transform-none overflow-hidden relative",
  glass:
    "bg-warm-ivory/75 hover:bg-warm-ivory/90 text-charcoal border border-white/65 hover:border-forest/30 backdrop-blur-xl shadow-[inset_0_1.5px_2px_0_rgba(255,255,255,0.98),inset_0_-1px_1px_0_rgba(20,43,32,0.06),0_4px_18px_-2px_rgba(20,43,32,0.08)] hover:shadow-[inset_0_2px_2px_0_rgba(255,255,255,1),0_10px_28px_-4px_rgba(20,43,32,0.12)] hover:-translate-y-0.5 hover:scale-[1.015] active:translate-y-[1px] active:scale-[0.98] transition-all duration-250 ease-out motion-reduce:transform-none overflow-hidden relative",
  "editorial-text":
    "bg-transparent text-charcoal hover:text-forest underline underline-offset-4 decoration-border-subtle hover:decoration-forest px-0 py-0 rounded-none transition-colors duration-200",
};

const sizeStyles: Record<ButtonVariant, Record<ButtonSize, string>> = {
  primary: {
    sm: "text-xs px-4 py-1.5 rounded-full font-medium gap-1",
    md: "text-sm px-5 py-2.5 rounded-full font-medium gap-1.5",
    lg: "text-base px-7 py-3.5 rounded-full font-medium gap-2",
  },
  secondary: {
    sm: "text-xs px-4 py-1.5 rounded-full font-medium gap-1",
    md: "text-sm px-5 py-2.5 rounded-full font-medium gap-1.5",
    lg: "text-base px-7 py-3.5 rounded-full font-medium gap-2",
  },
  outline: {
    sm: "text-xs px-4 py-1.5 rounded-full font-medium gap-1",
    md: "text-sm px-5 py-2.5 rounded-full font-medium gap-1.5",
    lg: "text-base px-7 py-3.5 rounded-full font-medium gap-2",
  },
  glass: {
    sm: "text-xs px-4 py-1.5 rounded-full font-medium gap-1",
    md: "text-sm px-5 py-2.5 rounded-full font-medium gap-1.5",
    lg: "text-base px-7 py-3.5 rounded-full font-medium gap-2",
  },
  "editorial-text": {
    sm: "text-xs font-medium gap-1",
    md: "text-sm font-medium gap-1.5",
    lg: "text-base font-medium gap-2",
  },
};

/**
 * Editorial Button Primitive
 *
 * Supports semantic HTML `<button>` and Next.js `<Link>` based on presence of `href`.
 * Features pill geometry, dignified colors (Forest / Parchment), Newsreader/Plus Jakarta
 * typographic discipline, and restrained 2px diagonal arrow micro-interactions.
 */
export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(props, ref) {
  const {
    variant = "primary",
    size = "md",
    showArrow = false,
    arrowPosition = "trailing",
    icon,
    className,
    children,
    ...rest
  } = props;

  const isEditorialText = variant === "editorial-text";

  const combinedClasses = cn(
    "group inline-flex items-center justify-center font-sans tracking-tight select-none",
    "transition-colors duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-primary-canvas",
    "disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
    variantStyles[variant],
    sizeStyles[variant][size],
    className
  );

  const content = (
    <>
      {/* Dynamic Liquid Glass Specular Surface Glaze */}
      {!isEditorialText && (
        <span
          className="absolute inset-x-0 top-0 h-[48%] rounded-t-full bg-gradient-to-b from-white/28 via-white/8 to-transparent pointer-events-none group-hover:from-white/40 transition-all duration-300"
          aria-hidden="true"
        />
      )}
      {/* Light-sweep satin bloom across the button on hover */}
      {!isEditorialText && (
        <span
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
        </span>
      )}
      {showArrow && arrowPosition === "leading" && (
        <DiagonalArrow position="leading" />
      )}
      {icon && <span className="inline-flex shrink-0 relative z-10">{icon}</span>}
      <span className={cn(isEditorialText ? "inline" : "relative z-10")}>{children}</span>
      {showArrow && arrowPosition === "trailing" && (
        <DiagonalArrow position="trailing" />
      )}
    </>
  );

  if ("href" in props && typeof props.href === "string") {
    const { href, ...anchorRest } = rest as React.AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
    };
    const isExternal = href.startsWith("http") || href.startsWith("//");

    return (
      <Link
        href={href}
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={combinedClasses}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...anchorRest}
      >
        {content}
      </Link>
    );
  }

  const buttonProps = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={buttonProps.type ?? "button"}
      className={combinedClasses}
      {...buttonProps}
    >
      {content}
    </button>
  );
});

Button.displayName = "Button";

