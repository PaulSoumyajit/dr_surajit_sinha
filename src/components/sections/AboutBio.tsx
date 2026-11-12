import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { COUNSEL_PROFILE } from "@/lib/data/profile";

/**
 * About Page Hero & Biographical Monograph (P5-01)
 *
 * Implements the opening biographical monograph for the /about folio:
 * - Monumental serif headline: "The Counsel Behind the Practice"
 * - Dignified architectural chambers photography frame with verified metadata
 * - Strict adherence to docs/04_CONTENT_REQUIREMENTS.md:
 *   Zero fabricated degrees, career dates, clerkships, or superlatives.
 * - Pure factual narrative establishing counsel's independent practice in
 *   corporate advisory, commercial arbitration, and appellate advocacy.
 */
export function AboutBio() {
  return (
    <section
      aria-labelledby="about-bio-heading"
      className="pt-8 sm:pt-12 pb-16 sm:pb-24"
    >
      <Container>
        <Reveal>
          {/* Eyebrow & Page Header */}
          <div className="max-w-3xl mb-10 sm:mb-14">
            <Badge variant="eyebrow" className="mb-3.5">
              PROFESSIONAL BIOGRAPHY &bull; ADVOCATE PROFILE
            </Badge>
            <h1
              id="about-bio-heading"
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-normal text-charcoal tracking-tight leading-[1.12]"
            >
              The Professional Journey <br />
              <span className="italic text-forest">of Dr. Surajit Sinha.</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg md:text-xl font-sans text-charcoal/75 leading-relaxed">
              Advocate practicing across the High Court and lower courts, combining extensive criminal
              litigation and public prosecution experience with specialized doctoral research in cyber
              law and e-commerce.
            </p>
          </div>

          {/* Asymmetric Editorial Monograph Composition */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Photographic Frame & Verified Counsel Identity */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="group relative rounded-2xl overflow-hidden border border-border-subtle bg-forest-deep aspect-[4/5] shadow-xs transition-all duration-500 hover:shadow-xl hover:border-forest/30">
                <Image
                  src="/images/chambers/chambers-consultation.jpg"
                  alt="Chambers consultation library and private legal study"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transform-none"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-forest-deep/85 via-transparent to-forest-deep/20"
                  aria-hidden="true"
                />
                {/* Floating Bottom Card with Liquid Glass */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <div className="p-4 rounded-xl bg-forest-deep/80 backdrop-blur-md border border-warm-ivory/20 text-warm-ivory shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] transition-transform duration-300 group-hover:scale-[1.01] motion-reduce:transform-none">
                    <p className="text-xs font-sans font-semibold tracking-wider uppercase text-muted-sage">
                      INDEPENDENT ADVOCATE
                    </p>
                    <p className="font-serif text-lg font-normal text-warm-ivory mt-0.5">
                      {COUNSEL_PROFILE.name}
                    </p>
                    <p className="text-xs font-sans text-warm-ivory/70 mt-1">
                      {COUNSEL_PROFILE.title}
                    </p>
                  </div>
                </div>
              </div>

              {/* Verified Practice Snapshot Card with tactile hover */}
              <div className="p-6 rounded-2xl bg-surface-card border border-border-subtle shadow-xs transition-all duration-300 hover:shadow-md hover:border-forest/30">
                <h2 className="text-xs font-sans font-semibold uppercase tracking-[0.14em] text-forest mb-3">
                  Verified Core Disciplines
                </h2>
                <div className="flex flex-wrap gap-2">
                  {COUNSEL_PROFILE.core_disciplines.map((discipline) => (
                    <Badge key={discipline} variant="pill" showDot={false}>
                      {discipline}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border-subtle/80 flex items-center justify-between text-xs text-charcoal/65">
                  <span>Practice Forums</span>
                  <span className="font-medium text-charcoal">High Court &amp; Lower Courts, West Bengal</span>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Biography Narrative */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div className="prose prose-lg max-w-none text-charcoal/80 font-sans space-y-6">
                <p className="text-lg sm:text-xl font-serif text-charcoal leading-relaxed">
                  Dr. Surajit Sinha is an Advocate whose legal career is anchored in rigorous trial
                  advocacy, state public prosecution, and specialized digital jurisprudence. With
                  approximately nineteen years of criminal legal practice across Birbhum district courts
                  and the High Court at Calcutta, his practice emphasizes procedural accuracy, evidentiary
                  discipline, and constitutional fairness.
                </p>

                <p className="text-base sm:text-[17px] leading-relaxed">
                  His professional trajectory includes a decade of public prosecution service representing
                  the State as Assistant Public Prosecutor (APP), Public Prosecutor (PP), and Sub-Divisional
                  Public Prosecutor. In specialized appointments, he served as District POCSO Public Prosecutor-in-Charge,
                  overseeing sensitive child safeguarding proceedings under strict in-camera confidentiality, and as
                  District Cyber Crime Public Prosecutor, prosecuting offenses under the Information Technology Act.
                </p>

                <p className="text-base sm:text-[17px] leading-relaxed">
                  Dr. Sinha brings a rare multidisciplinary foundation to the legal profession. He holds a Doctor
                  of Philosophy (PhD) in Cyber Law and E-commerce, complemented by postgraduate degrees in law (LL.M.),
                  computer applications (MCA), and commerce (M.Com.), alongside technical certifications in ethical
                  hacking and network infrastructure. This technical fluency enables him to evaluate complex electronic
                  records, digital trails, and statutory certifications under Section 65B with forensic precision.
                </p>

                {/* Editorial Pull-Quote / Principle */}
                <div className="my-8 pl-6 border-l-2 border-forest py-2 bg-surface/50 rounded-r-xl">
                  <blockquote className="m-0">
                    <p className="font-serif italic text-lg sm:text-xl text-charcoal leading-snug">
                      &ldquo;Substantive advocacy is forged through meticulous command of the factual record,
                      fidelity to constitutional due process, and a commitment to honesty, integrity, and
                      public justice.&rdquo;
                    </p>
                    <cite className="block mt-2 text-xs font-sans not-italic font-semibold tracking-wider uppercase text-forest">
                      &bull; Professional Objective &amp; Advocacy Canons
                    </cite>
                  </blockquote>
                </div>

                <p className="text-base sm:text-[17px] leading-relaxed">
                  Beyond criminal and cyber law, his background encompasses five years of practice at Jalan &amp; Jalan
                  Solicitor Firm in Kolkata, extensive proceedings before Debt Recovery Tribunals (DRT I, II, and III),
                  civil suits, High Court writ petitions, and West Bengal land revenue matters (BLLRO, DLLRO, LRT).
                  He has also contributed to legal academia through teaching experience as a Lecturer at Barrackpore Training College.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-8 border-t border-border-subtle flex flex-wrap items-center gap-4">
                <Button href="/contact" variant="primary" size="lg" showArrow={true}>
                  Contact Chambers
                </Button>
                <Button href="/career" variant="outline" size="lg" showArrow={true}>
                  View career journey
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

