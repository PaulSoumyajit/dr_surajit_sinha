import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { SITE_CONFIG } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms of Engagement & Website Use — Dr. Surajit Sinha, Advocate",
  description:
    "Terms governing the non-commercial informational use of this legal folio, published works, and preliminary inquiry channels.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/terms`,
  },
  openGraph: {
    title: "Terms of Engagement & Website Use — Dr. Surajit Sinha, Advocate",
    description:
      "Terms of access, intellectual property in legal writings, and conditions of inquiry submission.",
    url: `${SITE_CONFIG.url}/terms`,
    type: "website",
    locale: "en_IN",
  },
};

/**
 * Terms of Website Use & Legal Engagement (P8-06)
 *
 * Implements terms governing information access, intellectual property, and external citations.
 */
export default function TermsPage() {
  return (
    <div className="pt-8 sm:pt-12 pb-20 sm:pb-28">
      <Container variant="narrow">
        <Reveal>
          {/* Header */}
          <div className="mb-10 sm:mb-14">
            <Badge variant="eyebrow" className="mb-3.5">
              TERMS OF USE &bull; FOLIO ACCESS
            </Badge>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-charcoal tracking-tight leading-[1.14]">
              Terms of Website Access &amp; <br />
              <span className="italic text-forest">Conditions of Engagement.</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg font-sans text-charcoal/75 leading-relaxed">
              Rules and conditions governing the informational use of this website, authored legal
              commentaries, and preliminary inquiry submissions.
            </p>
          </div>

          {/* Substantive Policy Text */}
          <div className="editorial-reading-body space-y-8 text-charcoal/80 font-sans text-base sm:text-[17px] leading-relaxed">
            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-normal text-charcoal tracking-tight">
                1. Permitted Informational Use
              </h2>
              <p>
                Access to this website is granted solely for personal, non-commercial, and informational
                reference. Users may read, review, and cite published articles and monographs for
                academic, judicial, or educational study in accordance with recognized fair-use principles.
              </p>
              <p>
                Reproduction, republication, redistribution, automated scraping, or commercial exploitation
                of any text, design element, or legal compilation from this website without prior written
                authorization is strictly prohibited.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-normal text-charcoal tracking-tight">
                2. Intellectual Property &amp; Copyright
              </h2>
              <p>
                All original legal analyses, commentary, monographs, site structure, and typographic
                arrangements are the intellectual property of Dr. Surajit Sinha, Advocate and protected under
                the Copyright Act, 1957.
              </p>
              <p>
                Citations to published articles should accurately reference the author&apos;s name,
                monograph title, and canonical URL as provided through the built-in citation generator.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-normal text-charcoal tracking-tight">
                3. Conditions of Formal Legal Engagement
              </h2>
              <p>
                Submitting a matter overview via the consultation form does not create an engagement or
                bind counsel to accept representation. Formal engagement occurs exclusively upon:
              </p>
              <ol className="list-decimal pl-5 space-y-1.5 text-sm sm:text-base">
                <li>Completion of formal conflict-of-interest checks.</li>
                <li>Mutual written agreement on terms of brief and scope of representation.</li>
                <li>Execution of a formal vakalatnama, memorandum of appearance, or engagement letter.</li>
              </ol>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-normal text-charcoal tracking-tight">
                4. External Portals &amp; Third-Party References
              </h2>
              <p>
                Hyperlinks to official court registries, neutral judicial citation databases, statutory
                portals, or publisher catalogs are provided solely as a convenience. Dr. Surajit
                Sinha does not control, endorse, or accept responsibility for the content, privacy
                practices, or availability of external third-party domains.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-normal text-charcoal tracking-tight">
                5. Modifications &amp; Updates
              </h2>
              <p>
                These terms of website access may be amended periodically to reflect statutory updates,
                Bar Council directives, or technological modifications. Continued access to the website
                constitutes acceptance of the prevailing terms.
              </p>
            </section>

            {/* Implementation Draft Notice */}
            <div className="mt-12 p-5 rounded-2xl bg-surface border border-border-subtle text-xs font-sans text-charcoal/65 leading-relaxed">
              <p>
                &bull; <strong>Editorial Notice:</strong> These terms of website use constitute an
                implementation draft. Formal dispute resolution mechanisms, governing jurisdiction, and
                advocate-client terms require formal confirmation by counsel before production deployment.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}

