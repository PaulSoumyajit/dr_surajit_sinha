import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Signature Split-Screen Hero Section (P4-01)
 *
 * Implements the centerpiece 50/50 asymmetric hero composition observed in video
 * reference frames 001 and 038:
 * - Left panel: Deep forest-green editorial container with high-impact Newsreader
 *   serif headline, factual practice summary, and neutral contact CTA.
 * - Right panel: High-resolution architectural photography with atmospheric
 *   caption overlay, optimized via Next.js Image.
 * - Strict BCI Rule 36 compliance: Neutral, dignified, non-promotional language.
 */
export function HeroSplit() {
  return (
    <section aria-labelledby="hero-title" className="pt-6 sm:pt-8 pb-12 sm:pb-16">
      <Container>
        <Reveal>
          <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-border-subtle bg-forest-deep shadow-[inset_0_1px_1px_rgba(255,255,255,0.22),0_12px_36px_-6px_rgba(20,43,32,0.25)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[560px] lg:min-h-[620px]">
              {/* Left Column: Deep Forest Editorial Card */}
              <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 flex flex-col justify-between bg-forest-deep text-warm-ivory">
                {/* Header Eyebrow & Verified Indicator */}
                <div>
                  <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-sans font-semibold tracking-[0.16em] uppercase text-muted-sage mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-sage shrink-0" aria-hidden="true" />
                    <span>Criminal Law &bull; Public Prosecution &bull; Cyber Law</span>
                  </div>

                  <h1
                    id="hero-title"
                    className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-[54px] font-normal tracking-tight text-warm-ivory leading-[1.12]"
                  >
                    Criminal Law. <br />
                    <span className="italic font-normal text-muted-sage">Public Prosecution. Cyber Law.</span>
                  </h1>

                  <p className="mt-6 text-sm sm:text-base lg:text-lg font-sans text-warm-ivory/80 leading-relaxed max-w-lg">
                    Advocate with a professional background spanning criminal and civil proceedings,
                    public prosecution, cybercrime-related matters, banking and debt recovery, and land
                    and revenue-related legal work.
                  </p>
                </div>

                {/* Footer Action & Verified Identity Badge */}
                <div className="pt-8 sm:pt-10 border-t border-warm-ivory/15 mt-8 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <Button
                    href="/contact"
                    variant="glass"
                    size="lg"
                    showArrow={true}
                    className="bg-warm-ivory text-forest hover:bg-stone-subtle font-medium px-6 py-3 tracking-tight shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_4px_14px_-2px_rgba(20,43,32,0.15)]"
                  >
                    Contact Chambers
                  </Button>

                  <div className="text-left sm:text-right">
                    <p className="text-xs font-sans font-medium text-warm-ivory">
                      Dr. Surajit Sinha
                    </p>
                    <p className="text-[11px] font-sans text-muted-sage/80 tracking-wide">
                      Advocate &bull; High Court &amp; Lower Courts
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Architectural Photographic Media Panel */}
              <div className="lg:col-span-6 relative min-h-[340px] sm:min-h-[420px] lg:min-h-full overflow-hidden bg-forest group">
                <Image
                  src="/images/Surajit's Images/DSC02474.png"
                  alt="Dr. Surajit Sinha, Advocate"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-[1.04] transition-transform duration-700 ease-out motion-reduce:transform-none"
                />

                {/* Atmospheric Vignette & Contrast Gradient */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/20 to-transparent"
                  aria-hidden="true"
                />

                {/* Editorial Overlay Caption in Liquid Glass Card (Frame 001/038) */}
                <div className="absolute inset-x-6 sm:inset-x-8 bottom-6 sm:bottom-8 p-4 sm:p-5 rounded-2xl bg-forest-deep/80 backdrop-blur-md border border-warm-ivory/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] text-warm-ivory">
                  <p className="text-[11px] sm:text-xs font-sans font-semibold tracking-[0.18em] uppercase bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] mb-1">
                    Factual Rigor &bull; Statutory Precision
                  </p>
                  <p className="text-xs sm:text-sm font-sans text-zinc-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] leading-snug">
                    Chambers practicing across Criminal Law, Public Prosecution, Cyber Law, Civil &amp; DRT Proceedings
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

