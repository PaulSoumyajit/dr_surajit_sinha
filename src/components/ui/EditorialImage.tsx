import React from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

export type EditorialAspectRatio = "16/9" | "4/3" | "3/4" | "1/1";

export interface EditorialImageProps {
  /** Image source path or imported static image */
  src: ImageProps["src"];
  /** Accessible alternative text */
  alt: string;
  /** Aspect ratio constraint */
  aspectRatio?: EditorialAspectRatio;
  /** Optional caption displayed beneath the image */
  caption?: React.ReactNode;
  /** Optional caption rendered inside an overlay at the bottom of the image */
  overlayCaption?: React.ReactNode;
  /** CSS object-position (e.g. "top center", "center") */
  objectPosition?: string;
  /** Loading priority for Above-The-Fold / LCP images */
  priority?: boolean;
  /** Responsive image sizes hint */
  sizes?: string;
  /** Whether to apply the subtle warm sepia/ivory wash on hover */
  hoverWash?: boolean;
  /** Additional classes applied to the root container */
  className?: string;
  /** Additional classes applied to the Next.js Image component */
  imageClassName?: string;
}

const aspectRatioStyles: Record<EditorialAspectRatio, string> = {
  "16/9": "aspect-[16/9]",
  "4/3": "aspect-[4/3]",
  "3/4": "aspect-[3/4]",
  "1/1": "aspect-square",
};

/**
 * Editorial Photographic Frame Primitive
 *
 * Wraps Next.js `Image` with editorial aspect ratios, subtle borders (`#E5E0D6`),
 * restrained `rounded-xl` geometry, and an optional warm ivory hover glaze.
 * Eliminates Cumulative Layout Shift (CLS) via aspect-ratio container enforcement.
 */
export function EditorialImage({
  src,
  alt,
  aspectRatio = "4/3",
  caption,
  overlayCaption,
  objectPosition = "center",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  hoverWash = true,
  className,
  imageClassName,
}: EditorialImageProps) {
  return (
    <figure className={cn("m-0 group flex flex-col", className)}>
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-xl border border-border-subtle bg-stone-subtle",
          aspectRatioStyles[aspectRatio]
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          style={{ objectPosition }}
          className={cn(
            "object-cover transition-transform duration-500 ease-out motion-reduce:transition-none",
            hoverWash && "group-hover:scale-[1.015]",
            imageClassName
          )}
        />

        {/* Subtle warm ivory glaze on hover */}
        {hoverWash && (
          <div
            className="absolute inset-0 bg-primary-canvas/20 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 pointer-events-none motion-reduce:transition-none"
            aria-hidden="true"
          />
        )}

        {/* Optional interior overlay caption */}
        {overlayCaption && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-transparent p-4 sm:p-5 pt-10 text-warm-ivory">
            <div className="text-xs sm:text-sm font-sans tracking-tight leading-snug">
              {overlayCaption}
            </div>
          </div>
        )}
      </div>

      {/* Exterior caption beneath frame */}
      {caption && (
        <figcaption className="mt-2.5 text-xs text-muted-slate font-sans tracking-tight leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

