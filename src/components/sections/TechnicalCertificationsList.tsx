"use client";

import React, { useState, useMemo } from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { TECHNICAL_CERTIFICATIONS } from "@/lib/data/academic";
import { cn } from "@/lib/utils";

/**
 * Technical Certifications & Specialised Training List
 * Dr. Surajit Sinha — Advocate, High Court & Lower Courts
 *
 * Implements the filterable technical credentials repository:
 * - Client-side category filtering (All, Cyber & IT, Commerce & Finance, Academic Teaching).
 * - Displays verifiable professional qualifications from CV.
 * - Preserves the exact visual design, liquid glass touches, and typography of the approved folio.
 */
export function TechnicalCertificationsList() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(TECHNICAL_CERTIFICATIONS.map((c) => c.category)));
    return ["All", ...cats];
  }, []);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") return TECHNICAL_CERTIFICATIONS;
    return TECHNICAL_CERTIFICATIONS.filter((c) => c.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section
      aria-labelledby="certifications-heading"
      className="py-16 sm:py-20 md:py-24 border-t border-border-subtle bg-surface"
    >
      <Container>
        <Reveal>
          {/* Eyebrow & Section Heading */}
          <div className="max-w-3xl mb-10 sm:mb-14">
            <Badge variant="eyebrow" className="mb-3.5">
              SPECIALISED TRAINING &bull; TECHNICAL CREDENTIALS
            </Badge>
            <h2
              id="certifications-heading"
              className="font-serif text-3xl sm:text-4xl font-normal text-charcoal tracking-tight leading-[1.16]"
            >
              Technical Certifications &amp; <br />
              <span className="italic text-forest">Applied Qualifications.</span>
            </h2>
            <p className="mt-4 text-base font-sans text-charcoal/75 leading-relaxed">
              Specialized technical certifications in cyber security, networking protocols,
              accounting software, and professional training supporting electronic litigation.
            </p>
          </div>

          {/* Category Filter Pills */}
          {categories.length > 1 && (
            <div
              role="group"
              aria-label="Filter credentials by domain"
              className="flex flex-wrap items-center gap-2 mb-8"
            >
              {categories.map((category) => {
                const isSelected = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      "text-xs font-sans font-medium px-4 py-1.5 rounded-full transition-all cursor-pointer select-none",
                      "focus-visible:outline-2 focus-visible:outline-forest focus-visible:outline-offset-2",
                      isSelected
                        ? "bg-forest-deep text-warm-ivory shadow-[inset_0_1px_1px_rgba(255,255,255,0.22)] scale-105 active:scale-95"
                        : "bg-surface-card text-charcoal/80 border border-border-subtle hover:border-forest/40 hover:scale-105 active:scale-95"
                    )}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          )}

          {/* Credentials Listing Cards */}
          <div className="space-y-4">
            {filteredItems.map((cert) => (
              <div
                key={cert.id}
                className="group relative overflow-hidden p-6 sm:p-7 rounded-2xl bg-surface-card border border-border-subtle shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-forest/40 hover:-translate-y-1 hover:shadow-md transition-all duration-300 motion-reduce:transform-none"
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-hidden="true"
                />

                <div className="space-y-1.5 max-w-3xl">
                  <div className="flex items-center gap-2">
                    <Badge variant="pill" showDot={false} className="text-[11px] py-0.5">
                      {cert.category}
                    </Badge>
                    {cert.date_or_period && (
                      <span className="text-xs font-mono text-charcoal/60">
                        {cert.date_or_period}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-xl font-normal text-charcoal">
                    {cert.title}
                  </h3>

                  {cert.issuer && (
                    <p className="text-xs font-sans text-forest font-medium uppercase tracking-wider">
                      Issuer / Body: {cert.issuer}
                    </p>
                  )}

                  <p className="text-sm font-sans text-charcoal/75 leading-relaxed pt-1">
                    {cert.description}
                  </p>
                </div>

                <div className="shrink-0 text-right sm:text-left">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-muted-sage/30 text-xs font-mono text-forest">
                    Verified Credential
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

