import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Full-Width Photographic Editorial Quote Break (P4-06)
 *
 * Implements the cinematic visual pause observed in video frame 022:
 * - High-resolution executive conference / library photography with dark graded scrim overlay.
 * - Left-aligned white serif display text: Newsreader headline, editorial body copy,
 *   and purposeful navigation to counsel profile and consultation chambers.
 * - Adheres strictly to Bar Council of India Rule 36: Restrained, non-promotional,
 *   focused on intellectual diligence and judicial craft.
 */
export function PhotoQuoteBreak() {
  return (
    <section
      aria-label="Counsel Philosophy and Perspective"
      className="py-12 sm:py-16 md:py-20"
    >
      <Container>
        <Reveal>
          <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-warm-ivory/15 bg-forest-deep min-h-[480px] sm:min-h-[540px] md:min-h-[580px] flex flex-col justify-between p-8 sm:p-12 md:p-16 lg:p-20 text-warm-ivory shadow-lg shadow-forest-deep/15 transition-all duration-500 hover:shadow-2xl hover:shadow-forest-deep/25">
            {/* Top specular reflection line */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-ivory/30 to-transparent z-20"
              aria-hidden="true"
            />

            {/* Background Photographic Image with gentle zoom on card hover */}
            <Image
              src="/images/hero/photo-quote-break.jpg"
              alt="Executive conference library with architectural perspective"
              fill
              priority={false}
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
            />

            {/* Graded Scrim Overlays for Text Legibility */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-forest-deep/95 via-forest-deep/85 to-forest-deep/60"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-transparent to-transparent sm:hidden"
              aria-hidden="true"
            />

            {/* Top Eyebrow Tag with Liquid Glass treatment */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-deep/70 backdrop-blur-md border border-warm-ivory/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] text-[11px] sm:text-xs font-sans font-semibold tracking-[0.18em] uppercase text-muted-sage transition-all duration-300">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-sage shrink-0" aria-hidden="true" />
                <span>INTEGRITY &bull; DUE PROCESS</span>
              </div>
            </div>

            {/* Central Monograph & Quote */}
            <div className="relative z-10 my-auto py-8 sm:py-12 max-w-2xl">
              <blockquote className="m-0">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-normal text-warm-ivory leading-[1.15] tracking-tight">
                  Counsel grounded in <br />
                  <span className="italic text-muted-sage">responsibility and due process.</span>
                </h2>
                <p className="mt-6 text-sm sm:text-base md:text-lg font-sans text-warm-ivory/85 leading-relaxed">
                  Effective legal practice begins with rigorous factual preparation and evidentiary discipline.
                  It demands thorough statutory precision, respect for constitutional safeguards, and a steadfast
                  dedication to honesty, integrity, and public justice.
                </p>
              </blockquote>
            </div>

            {/* Bottom Action & Signature Tag */}
            <div className="relative z-10 pt-6 border-t border-warm-ivory/15 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="flex flex-wrap items-center gap-3">
                <Button href="/about" variant="secondary" size="lg" showArrow={true}>
                  Explore counsel profile
                </Button>
                <Button
                  href="/contact"
                  variant="outline"
                  size="lg"
                  showArrow={true}
                  className="border-warm-ivory/30 text-warm-ivory hover:border-warm-ivory hover:bg-warm-ivory/10"
                >
                  Contact Chambers
                </Button>
              </div>

              <div className="text-[11px] font-sans font-medium text-warm-ivory/60 tracking-widest uppercase">
                DR. SURAJIT SINHA &bull; ADVOCATE
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

