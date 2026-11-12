import React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";

interface Canon {
  number: string;
  title: string;
  description: string;
}

const CANONS_OF_CRAFT: Canon[] = [
  {
    number: "01",
    title: "Forensic Factual Diligence",
    description:
      "A legal brief is only as resilient as its mastery of the factual record. Thorough documentary analysis, case diary examination, and chronological reconstruction precede every statutory framing.",
  },
  {
    number: "02",
    title: "Evidentiary Safeguards",
    description:
      "Rigorous fidelity to statutory admissibility and electronic evidence standards. Every electronic record, forensic trail, and statutory touchpoint is critically evaluated under the Evidence Act.",
  },
  {
    number: "03",
    title: "Institutional Responsibility",
    description:
      "An advocate owes an undivided duty of diligence to the client and uncompromising candor to the court. Serving the administration of justice with honesty, integrity, and public welfare.",
  },
];

/**
 * Philosophy of Legal Craft Module (P5-02)
 *
 * Implements the asymmetric editorial essay component exploring the foundations
 * of advocacy and judicial craft:
 * - Asymmetrical card pairing:
 *   - Left: 3 fundamental canons of practice (Diligence, Strategic Listening, Institutional Candor).
 *   - Right: Editorial discourse on statutory interpretation, commercial disputes,
 *     and the advocate's role in the administration of justice.
 * - Strict ethical compliance: Focuses on established canons of advocacy and jurisprudence
 *   without attributing unverified personal declarations.
 */
export function LegalPhilosophy() {
  return (
    <section
      aria-labelledby="philosophy-heading"
      className="py-16 sm:py-20 md:py-28 border-t border-border-subtle bg-surface"
    >
      <Container>
        <Reveal>
          {/* Eyebrow & Section Heading */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <Badge variant="eyebrow" className="mb-3.5">
              THE ADVOCATE&apos;S CRAFT &bull; ETHICAL PERSPECTIVE
            </Badge>
            <h2
              id="philosophy-heading"
              className="font-serif text-3xl sm:text-4xl md:text-[44px] font-normal text-charcoal tracking-tight leading-[1.16]"
            >
              The Canons of <br />
              <span className="italic text-forest">Disciplined Advocacy.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg font-sans text-charcoal/75 leading-relaxed">
              Legal counsel is an intellectual and ethical discipline. In high-stakes
              commercial transactions and appellate proceedings, lasting outcomes depend
              on methodical preparation, clear statutory reasoning, and institutional integrity.
            </p>
          </div>

          {/* Asymmetric Two-Column Composition */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left Column: The 3 Core Canons */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              {CANONS_OF_CRAFT.map((canon) => (
                <div
                  key={canon.number}
                  className="group relative overflow-hidden p-6 sm:p-7 rounded-2xl bg-surface-card border border-border-subtle hover:border-forest/40 hover:-translate-y-1 hover:scale-[1.015] hover:shadow-lg hover:shadow-forest/5 transition-all duration-300 shadow-xs motion-reduce:transform-none"
                >
                  {/* Subtle specular reflection on card top */}
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-hidden="true"
                  />
                  <div className="flex items-center gap-3 mb-2.5">
                    <span className="font-serif text-lg font-normal text-forest transition-transform duration-300 group-hover:scale-105">
                      {canon.number}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-border-subtle" aria-hidden="true" />
                    <h3 className="font-serif text-lg sm:text-xl font-medium text-charcoal tracking-tight">
                      {canon.title}
                    </h3>
                  </div>
                  <p className="text-sm font-sans text-charcoal/75 leading-relaxed">
                    {canon.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Right Column: Commentary on Jurisprudence & Craft */}
            <div className="relative overflow-hidden lg:col-span-7 p-8 sm:p-10 lg:p-12 rounded-2xl bg-surface-card border border-border-subtle flex flex-col justify-between shadow-xs transition-all duration-300 hover:shadow-md hover:border-forest/30">
              {/* Subtle top reflection */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest/20 to-transparent"
                aria-hidden="true"
              />
              <div className="space-y-6 text-charcoal/80 font-sans leading-relaxed text-base sm:text-[17px]">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/5 border border-forest/15 text-xs font-sans font-semibold tracking-wider uppercase text-forest">
                  <span>DISCOURSE ON ADVOCACY &amp; JURISPRUDENCE</span>
                </div>

                <p className="font-serif text-xl sm:text-2xl text-charcoal font-normal leading-snug">
                  Jurisprudence evolves through the clarity and integrity of arguments presented before the bench.
                  The advocate&apos;s role is neither merely procedural nor purely adversarial;
                  it is to assist the court in discerning truth through lawful process.
                </p>

                <p>
                  In criminal defense and public prosecution alike, procedural fairness is the supreme safeguard.
                  Statutory mandates under the Code of Criminal Procedure and Evidence Act exist to protect individual
                  liberties and institutional integrity. Rigorous advocates identify procedural infirmities early,
                  scrutinize evidence dispassionately, and ensure that every proceeding adheres to constitutional guarantees.
                </p>

                <p>
                  In the contemporary era of cybercrime and electronic evidence, legal craft requires technological
                  sophistication. Electronic outputs—whether transaction logs, messaging histories, or digital records—cannot
                  be accepted mechanically. By rigorously examining statutory conditions under Section 65B and the IT Act,
                  counsel ensures that judicial determinations rest upon credible, lawfully verified evidence.
                </p>

                <p className="text-sm text-charcoal/65 italic border-t border-border-subtle/80 pt-6">
                  &bull; Grounded in the enduring traditions of the Indian Bar, where honesty, integrity,
                  and public welfare form the core of the advocate&apos;s calling.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

