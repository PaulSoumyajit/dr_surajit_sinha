import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PUBLICATIONS } from "@/lib/data/publications";
import type { Publication } from "@/types";

export interface BookShowcaseProps {
  publications?: Publication[];
}

/**
 * Publications & Authored Treatises Showcase (P6-03)
 *
 * Implements the scholarly monographs and legal treatises catalog for /publications:
 * - When verified publications exist: Renders realistic book presentation cards
 *   with ISBN metadata, publisher details, and safe external acquisition links.
 * - Zero-record behaviour (Strict adherence to docs/04_CONTENT_REQUIREMENTS.md):
 *   Renders a dignified editorial statement on legal scholarship without inventing
 *   fictional book titles, publishers, or ISBNs.
 */
export function BookShowcase({ publications = PUBLICATIONS }: BookShowcaseProps) {
  return (
    <section
      aria-labelledby="books-heading"
      className="pt-8 sm:pt-12 pb-16 sm:pb-20"
    >
      <Container>
        <Reveal>
          {/* Eyebrow & Page Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <Badge variant="eyebrow" className="mb-3.5">
              LEGAL SCHOLARSHIP &bull; AUTHORED WORKS
            </Badge>
            <h1
              id="books-heading"
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal text-charcoal tracking-tight leading-[1.12]"
            >
              Authored Treatises &amp; <br />
              <span className="italic text-forest">Legal Commentary.</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg md:text-xl font-sans text-charcoal/75 leading-relaxed">
              Scholarly monographs, statutory commentaries, and analytical treatises
              examining commercial jurisprudence, arbitration practice, and constitutional law.
            </p>
          </div>

          {publications.length > 0 ? (
            /* Render Verified Publications Grid with tactile hover */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {publications.map((book) => (
                <div
                  key={book.id}
                  className="group relative overflow-hidden rounded-2xl bg-surface-card border border-border-subtle p-6 sm:p-8 flex flex-col sm:flex-row gap-6 shadow-xs transition-all duration-300 hover:shadow-xl hover:border-forest/40 hover:-translate-y-1 motion-reduce:transform-none"
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-hidden="true"
                  />
                  {/* Book Cover Frame (rendered only with genuine cover imagery) */}
                  {book.cover_image_url && (
                    <div className="relative w-36 sm:w-44 aspect-[2/3] shrink-0 rounded-r-md overflow-hidden shadow-md bg-forest-deep transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none">
                      <Image
                        src={book.cover_image_url}
                        alt={`Cover of ${book.title}`}
                        fill
                        sizes="176px"
                        className="object-cover"
                      />
                      <div
                        className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/40 via-black/10 to-transparent"
                        aria-hidden="true"
                      />
                    </div>
                  )}

                  {/* Book Metadata & Synopsis */}
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-charcoal/60 mb-2">
                        <span>{book.publication_year}</span>
                        {book.isbn && (
                          <>
                            <span>&bull;</span>
                            <span>ISBN: {book.isbn}</span>
                          </>
                        )}
                      </div>

                      <h2 className="font-serif text-2xl font-normal text-charcoal leading-snug">
                        {book.title}
                      </h2>
                      {book.subtitle && (
                        <p className="text-sm font-sans italic text-charcoal/70 mt-1">
                          {book.subtitle}
                        </p>
                      )}

                      <p className="text-xs font-sans font-medium text-forest uppercase tracking-wider mt-2">
                        Publisher: {book.publisher}
                      </p>

                      <p className="mt-4 text-sm font-sans text-charcoal/75 leading-relaxed">
                        {book.description}
                      </p>
                    </div>

                    {book.purchase_url && (
                      <div className="mt-6 pt-4 border-t border-border-subtle">
                        <Button
                          href={book.purchase_url}
                          variant="outline"
                          size="sm"
                          showArrow={true}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Acquire treatise
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Dignified Empty State (Zero Fabricated Records) */
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border-subtle bg-surface-card p-8 sm:p-12 md:p-14 shadow-xs transition-all duration-300 hover:shadow-md hover:border-forest/30">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest/20 to-transparent"
                aria-hidden="true"
              />
              <div className="max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/5 border border-forest/15 text-xs font-sans font-semibold uppercase tracking-[0.14em] text-forest">
                  <span>SCHOLARLY PUBLICATIONS &bull; OFFICIAL REPOSITORY</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-charcoal">
                  Academic Research &amp; Doctrinal Studies
                </h2>
                <p className="text-base font-sans text-charcoal/80 leading-relaxed">
                  Dr. Surajit Sinha&apos;s legal research and doctrinal writing focus on criminal jurisprudence,
                  electronic evidence under cyber law, and statutory litigation before the High Court and subordinate courts.
                </p>
                <p className="text-sm font-sans text-charcoal/65 leading-relaxed">
                  Formal textbook editions, statutory commentaries, and gazetted monographs are cataloged
                  upon publisher release and documentation of registered ISBNs.
                </p>
                <div className="pt-4 border-t border-border-subtle/80 flex items-center gap-2 text-xs font-sans text-charcoal/60">
                  <span className="text-forest" aria-hidden="true">&bull;</span>
                  <span>Published monographs are indexed through official legal repositories and publisher catalogs.</span>
                </div>
              </div>
            </div>
          )}
        </Reveal>
      </Container>
    </section>
  );
}

