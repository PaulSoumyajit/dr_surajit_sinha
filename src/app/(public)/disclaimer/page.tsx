import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { SITE_CONFIG } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Regulatory Disclaimer — Dr. Surajit Sinha, Advocate",
  description:
    "Bar Council of India Rule 36 regulatory disclaimer, non-solicitation declaration, and terms of legal information access.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/disclaimer`,
  },
  openGraph: {
    title: "Regulatory Disclaimer — Dr. Surajit Sinha, Advocate",
    description:
      "Statutory non-solicitation declaration under Bar Council of India regulations.",
    url: `${SITE_CONFIG.url}/disclaimer`,
    type: "website",
    locale: "en_IN",
  },
};

/**
 * Regulatory Disclaimer & Non-Solicitation Folio (P8-06)
 *
 * Implements the full statutory compliance disclosure under Bar Council of India Rule 36.
 */
export default function DisclaimerPage() {
  return (
    <div className="pt-8 sm:pt-12 pb-20 sm:pb-28">
      <Container variant="narrow">
        <Reveal>
          {/* Header */}
          <div className="mb-10 sm:mb-14">
            <Badge variant="eyebrow" className="mb-3.5">
              REGULATORY COMPLIANCE &bull; BCI RULE 36
            </Badge>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-charcoal tracking-tight leading-[1.14]">
              Regulatory Disclaimer &amp; <br />
              <span className="italic text-forest">Terms of Information Access.</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg font-sans text-charcoal/75 leading-relaxed">
              Declaration of statutory non-solicitation, informational limitations, and absence of an
              advocate-client relationship.
            </p>
          </div>

          {/* Substantive Policy Text */}
          <div className="editorial-reading-body space-y-8 text-charcoal/80 font-sans text-base sm:text-[17px] leading-relaxed">
            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-normal text-charcoal tracking-tight">
                1. Bar Council of India Non-Solicitation Notice
              </h2>
              <p>
                Under the Bar Council of India Rules, an advocate enrolled under the Advocates Act,
                1961, is strictly prohibited from soliciting work, advertising legal services, or
                engaging in personal commercial promotion, whether directly or indirectly.
              </p>
              <p>
                This website is established exclusively as an informational resource provided at the
                specific voluntary request of the visitor. Nothing contained on this website is intended
                to constitute, or should be construed as, an advertisement, solicitation, commercial
                inducement, or personal marketing of legal services in any form.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-normal text-charcoal tracking-tight">
                2. Informational Nature &amp; No Legal Advice
              </h2>
              <p>
                All materials, articles, statutory commentaries, judicial ratio summaries, and
                monographs published on this website are provided solely for general educational and
                informational purposes.
              </p>
              <p>
                The content does not constitute formal legal opinion, statutory counsel, or procedural
                advice on any specific transaction, dispute, or circumstance. Visitors must not act or
                refrain from acting upon any information published on this website without seeking
                independent, professional legal advice from qualified counsel admitted to practice in
                the relevant jurisdiction.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-normal text-charcoal tracking-tight">
                3. Absence of Advocate-Client Relationship
              </h2>
              <p>
                Neither browsing this website, reading published monographs, nor transmitting a
                consultation inquiry through the contact form establishes an advocate-client
                relationship between Dr. Surajit Sinha, Advocate and the visitor or sending entity.
              </p>
              <p>
                An advocate-client relationship is created exclusively through direct personal consultation,
                formal conflict-of-interest clearance, mutual execution of an engagement mandate, and
                delivery of formal vakalatnama or memorandum of appearance.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-normal text-charcoal tracking-tight">
                4. Reported Judgments &amp; Public Records
              </h2>
              <p>
                Judgments, court orders, prosecution records, and case summaries referenced on this website
                are compiled exclusively from certified public judicial records and published law journals.
                Past appearances, reported determinations, or prosecution tenures do not constitute a promise,
                representation, or guarantee of similar results in subsequent or pending legal proceedings.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-normal text-charcoal tracking-tight">
                5. Limitation of Liability
              </h2>
              <p>
                While diligence is exercised to ensure the accuracy of doctrinal citations and statutory
                references at the time of publication, laws and precedents evolve. Dr. Surajit Sinha, Advocate
                expressly disclaims all liability to any person or entity in respect of anything done or
                omitted to be done wholly or partly in reliance upon any content on this website.
              </p>
            </section>

            {/* Implementation Draft Notice */}
            <div className="mt-12 p-5 rounded-2xl bg-surface border border-border-subtle text-xs font-sans text-charcoal/65 leading-relaxed">
              <p>
                &bull; <strong>Editorial Notice:</strong> This regulatory disclaimer is an implementation
                draft formulated in accordance with Bar Council of India Rule 36 and docs/04_CONTENT_REQUIREMENTS.md.
                Final text remains subject to counsel verification prior to public commercial deployment.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}

