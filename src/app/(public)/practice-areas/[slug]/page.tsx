import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PRACTICE_AREAS } from "@/lib/data/practice-areas";
import { PUBLICATIONS } from "@/lib/data/publications";
import { JUDGMENTS } from "@/lib/data/judgments";
import { generatePracticeAreaSchema, safeJsonLd, SITE_CONFIG } from "@/lib/seo";

interface PracticeDetailProps {
  params: Promise<{
    slug: string;
  }>;
}

const PRACTICE_IMAGES: Record<string, { src: string; alt: string }> = {
  "criminal-litigation": {
    src: "/images/practice/appellate-advocacy.jpg",
    alt: "Criminal court trial and appellate litigation",
  },
  "public-prosecution": {
    src: "/images/practice/appellate-advocacy.jpg",
    alt: "Public prosecution in trial and sessions courts",
  },
  "pocso-proceedings": {
    src: "/images/practice/process-listen.jpg",
    alt: "POCSO special court child safeguarding framework",
  },
  "cyber-law": {
    src: "/images/practice/corporate-advisory.jpg",
    alt: "Cyber law and digital commerce forensics",
  },
  "civil-writ-proceedings": {
    src: "/images/practice/appellate-advocacy.jpg",
    alt: "High Court civil and constitutional writ litigation",
  },
  "banking-drt": {
    src: "/images/practice/commercial-arbitration.jpg",
    alt: "Debt Recovery Tribunal banking litigation",
  },
  "land-revenue": {
    src: "/images/practice/process-listen.jpg",
    alt: "Land revenue and tenancy proceedings in West Bengal",
  },
  "corporate-institutional": {
    src: "/images/practice/corporate-advisory.jpg",
    alt: "Corporate and institutional legal advisory",
  },
};

const PRACTICE_NARRATIVES: Record<
  string,
  {
    subtitle: string;
    scopeOverview: string[];
    advisoryPillars: { title: string; desc: string }[];
  }
> = {
  "criminal-litigation": {
    subtitle:
      "Trial advocacy, defense pleadings, bail applications, and criminal appellate proceedings across subordinate courts and the High Court.",
    scopeOverview: [
      "The criminal litigation practice represents clients across all stages of criminal proceedings—from initial pre-charge advice and bail applications to trial advocacy and appellate challenges before the High Court.",
      "With approximately nineteen years of courtroom practice across Birbhum district and appellate venues, counsel brings deep familiarity with the Code of Criminal Procedure (CrPC / BNSS), Indian Penal Code (IPC / BNS), and Evidence Act (BSA).",
      "Every brief is examined with forensic rigor: analyzing first information reports (FIRs), police case diaries, seizure lists, and witness statements to identify procedural non-compliance, evidentiary gaps, and defensible legal ratios.",
    ],
    advisoryPillars: [
      {
        title: "Bail & Anticipatory Bail",
        desc: "Strategic formulation and advocacy of regular, interim, and anticipatory bail petitions before Sessions Courts and the High Court.",
      },
      {
        title: "Sessions Trials & Defense",
        desc: "Cross-examination, evidentiary challenges, and final arguments across sessions trials and special court offenses.",
      },
      {
        title: "Criminal Appeals & Revisions",
        desc: "Challenging convictions, seeking stay of orders, and filing revision petitions against procedural irregularities.",
      },
    ],
  },
  "public-prosecution": {
    subtitle:
      "Representation of the State in trial, sessions, and appellate criminal courts with strict fidelity to due process and public justice.",
    scopeOverview: [
      "Public prosecution is an essential pillar of the criminal justice administration. A decade of service representing the State as Assistant Public Prosecutor (APP), Public Prosecutor (PP), and Sub-Divisional Public Prosecutor has cultivated extensive trial command.",
      "A prosecutor's statutory mandate is not to obtain convictions at all costs, but to assist the court in arriving at truth. Proceedings demand objective assessment of police investigations, impartial presentation of evidence, and adherence to statutory fairness.",
      "Experience includes conducting sessions cases, special statute trials, bail hearings on behalf of the State, and preparing state responses to revision petitions.",
    ],
    advisoryPillars: [
      {
        title: "Trial Conduct & Evidence",
        desc: "Systematic examination of prosecution witnesses, forensic experts, and exhibition of material evidence.",
      },
      {
        title: "Sub-Divisional Jurisdiction",
        desc: "Prosecutorial administration and court conduct across diverse magistrate and sessions benches.",
      },
      {
        title: "Due Process & Statutory Standards",
        desc: "Ensuring state cases satisfy procedural prerequisites under the criminal procedure code.",
      },
    ],
  },
  "pocso-proceedings": {
    subtitle:
      "Specialized public prosecution and procedural legal practice under the Protection of Children from Sexual Offences (POCSO) Act, 2012.",
    scopeOverview: [
      "The POCSO Act establishes an exacting statutory regime designed to protect children from sexual offenses while securing fair trial procedures before designated Special Courts.",
      "Having served as District POCSO Public Prosecutor-in-Charge, counsel possesses specialized insight into the procedural, evidentiary, and ethical dimensions of child protection litigation.",
      "Proceedings require strict adherence to in-camera trial rules (Section 33(2)), confidentiality of the victim's identity (Section 33(7)), and child-friendly statement recording protocols under Sections 24 and 26.",
    ],
    advisoryPillars: [
      {
        title: "In-Camera Trial Protocols",
        desc: "Ensuring complete statutory confidentiality, privacy, and sensitive evidence recording for vulnerable witnesses.",
      },
      {
        title: "Statutory Presumptions",
        desc: "Analyzing and addressing statutory presumptions under Sections 29 and 30 with structured evidentiary foundations.",
      },
      {
        title: "Safeguarding & Procedure",
        desc: "Factual and statutory compliance with child welfare standards and victim compensation frameworks.",
      },
    ],
  },
  "cyber-law": {
    subtitle:
      "Legal counsel at the intersection of technology, e-commerce, digital fraud, and electronic evidence admissibility.",
    scopeOverview: [
      "As digital communications and electronic transactions dominate personal and commercial spheres, cyber law has evolved into a critical legal discipline requiring both statutory command and technical comprehension.",
      "Anchored by a Doctor of Philosophy (PhD) in Cyber Law and E-commerce, technical certifications in ethical hacking and networking, and experience as District Cyber Crime Public Prosecutor, counsel bridges complex technical realities with judicial standards.",
      "Practice covers cybercrime defense and prosecution under the Information Technology Act, 2000, e-commerce regulatory compliance, digital contract validity, and electronic evidence admissibility under Section 65B of the Evidence Act.",
    ],
    advisoryPillars: [
      {
        title: "Section 65B Evidence Certification",
        desc: "Forensic verification and legal challenge of electronic records, server logs, CCTV, and mobile data.",
      },
      {
        title: "Cyber Offenses & IT Act",
        desc: "Legal representation involving unauthorized access, data alteration, financial cyber fraud, and digital defamation.",
      },
      {
        title: "E-Commerce Regulation",
        desc: "Advisory on digital transactions, intermediary liability (Section 79), and electronic commerce governance.",
      },
    ],
  },
  "civil-writ-proceedings": {
    subtitle:
      "Representation in original civil suits, statutory appeals, injunction applications, and High Court constitutional writ petitions.",
    scopeOverview: [
      "Civil litigation demands disciplined drafting, precise cause-of-action formulation, and meticulous documentary evidence. Counsel represents clients across civil courts and appellate forums in West Bengal.",
      "Under Article 226 of the Constitution of India, High Courts exercise extraordinary writ jurisdiction to redress administrative illegality, arbitrariness, or infringement of fundamental and legal rights by public authorities.",
      "Work encompasses declaratory suits, specific performance, injunction applications under Order 39 of the CPC, property title disputes, and filing constitutional writ petitions before the High Court.",
    ],
    advisoryPillars: [
      {
        title: "Constitutional Writ Petitions",
        desc: "Drafting and arguing petitions for Mandamus, Certiorari, and Prohibition challenging unlawful state actions.",
      },
      {
        title: "Original Civil Suits",
        desc: "Drafting precise plaints, written statements, and conducting trial hearings in title and contract disputes.",
      },
      {
        title: "Injunctions & Interim Relief",
        desc: "Seeking urgent injunctive protection to preserve status quo and protect property rights.",
      },
    ],
  },
  "banking-drt": {
    subtitle:
      "Specialized representation before Debt Recovery Tribunals (DRT I, II & III) across recovery proceedings, securitization disputes, and banking litigation.",
    scopeOverview: [
      "Banking litigation requires navigating specialized financial legislation, tribunal rules, and debt recovery mechanisms before Debt Recovery Tribunals I, II, and III in Kolkata.",
      "Enriched by five years of banking and corporate practice at Jalan & Jalan Solicitor Firm, counsel handles complex original applications under the Recovery of Debts and Bankruptcy Act, 1993, and securitization challenges under the SARFAESI Act, 2002.",
      "Representation covers defending borrowers and guarantors against symbolic or physical possession, auction notices, and advising financial stakeholders on statutory recovery procedures.",
    ],
    advisoryPillars: [
      {
        title: "DRT I, II & III Tribunal Advocacy",
        desc: "Representation in Original Applications (OAs) and miscellaneous applications before DRT benches.",
      },
      {
        title: "SARFAESI Section 17 Challenges",
        desc: "Challenging possession notices, property attachments, and auction sales initiated by secured creditors.",
      },
      {
        title: "Negotiable Instruments (Section 138)",
        desc: "Handling dishonor of cheque proceedings with strict compliance with statutory demand notice timelines.",
      },
    ],
  },
  "land-revenue": {
    subtitle:
      "Substantive representation across West Bengal land reforms, revenue appeals, mutation proceedings, and tenancy tribunals.",
    scopeOverview: [
      "Land and tenancy law in West Bengal is governed by intricate statutory provisions under the West Bengal Land Reforms Act, 1955, and administrative revenue codes.",
      "Counsel represents landowners, agricultural stakeholders, and property holders in revenue proceedings before Block Land and Land Reforms Officers (BLLRO) and District Land and Land Reforms Officers (DLLRO).",
      "Practice also includes appellate revision proceedings before the West Bengal Land Reforms and Tenancy Tribunal (LRT) and subsequent constitutional writ petitions before the High Court.",
    ],
    advisoryPillars: [
      {
        title: "BLLRO & DLLRO Proceedings",
        desc: "Handling plot mutation, Record of Rights (RoR) corrections, and land classification disputes.",
      },
      {
        title: "Land Reforms Tenancy Tribunal (LRT)",
        desc: "Filing statutory appeals and original applications before the LRT against administrative revenue orders.",
      },
      {
        title: "Land Title & Vesting Disputes",
        desc: "Legal evaluation of land ceiling limits, vesting challenges, and property transfer encumbrances.",
      },
    ],
  },
  "corporate-institutional": {
    subtitle:
      "Corporate documentation, regulatory compliance, ROC matters, and advisory associations with regional institutions.",
    scopeOverview: [
      "Corporate and institutional legal work provides strategic documentation and compliance counsel to businesses, municipal bodies, and regional authorities.",
      "Building upon five years of solicitor firm experience, work includes drafting commercial agreements, reviewing corporate charter documents, and navigating Registrar of Companies (ROC) compliance under the Companies Act, 2013.",
      "Counsel maintains a record of CV-reported legal advisory associations involving regional municipal and panchayat entities, statutory authorities, and financial institutions.",
    ],
    advisoryPillars: [
      {
        title: "Commercial Drafting & Covenants",
        desc: "Structuring agreements, vendor contracts, and employment covenants with enforceable dispute mechanisms.",
      },
      {
        title: "ROC Regulatory Filings",
        desc: "Advising on statutory secretarial compliance, company registrations, and administrative filings.",
      },
      {
        title: "Institutional Legal Advisory",
        desc: "Providing neutral, statutory-grounded legal guidance to regional organizations and authorities.",
      },
    ],
  },
};

export async function generateStaticParams() {
  return PRACTICE_AREAS.map((practice) => ({
    slug: practice.slug,
  }));
}

export async function generateMetadata({
  params,
}: PracticeDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const practice = PRACTICE_AREAS.find((p) => p.slug === slug);

  if (!practice) {
    return {
      title: "Practice Area Not Found — Dr. Surajit Sinha",
    };
  }

  return {
    title: `${practice.title} — Dr. Surajit Sinha, Advocate`,
    description: practice.description,
    alternates: {
      canonical: `${SITE_CONFIG.url}/practice-areas/${practice.slug}`,
    },
    openGraph: {
      title: `${practice.title} — Dr. Surajit Sinha, Advocate`,
      description: practice.description,
      url: `${SITE_CONFIG.url}/practice-areas/${practice.slug}`,
      type: "article",
      locale: "en_IN",
    },
  };
}

/**
 * Individual Practice Area Detail Template (P6-02)
 *
 * Implements the statutory deep-dive folio for confirmed practice disciplines.
 */
export default async function PracticeDetailPage({ params }: PracticeDetailProps) {
  const { slug } = await params;
  const practice = PRACTICE_AREAS.find((p) => p.slug === slug);

  if (!practice) {
    notFound();
  }

  const narrative = PRACTICE_NARRATIVES[practice.slug] || {
    subtitle: practice.description,
    scopeOverview: [practice.description],
    advisoryPillars: [],
  };

  const imageMeta = PRACTICE_IMAGES[practice.slug] || {
    src: "/images/practice/corporate-advisory.jpg",
    alt: practice.title,
  };

  // Filter verified related publications or judgments if any exist
  const relatedPublications = PUBLICATIONS.filter(
    (pub) => pub.title.toLowerCase().includes(practice.title.toLowerCase())
  );
  const relatedJudgments = JUDGMENTS.filter(
    (judg) => judg.legal_subject.toLowerCase().includes(practice.title.toLowerCase())
  );

  return (
    <article className="pt-8 sm:pt-12 pb-16 sm:pb-24">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(generatePracticeAreaSchema(practice)),
        }}
      />
      <Container>
        <Reveal>
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumbs" className="mb-6 sm:mb-8">
            <Link
              href="/practice-areas"
              className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-forest hover:underline"
            >
              <span aria-hidden="true">&larr;</span>
              <span>All Practice Disciplines</span>
            </Link>
          </nav>

          {/* Header Title Section */}
          <div className="max-w-4xl mb-10 sm:mb-14">
            <Badge variant="eyebrow" className="mb-3.5">
              PRACTICE DISCIPLINE &bull; STATUTORY SCOPE
            </Badge>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal text-charcoal tracking-tight leading-[1.12]">
              {practice.title}
            </h1>
            <p className="mt-5 text-base sm:text-lg md:text-xl font-sans text-charcoal/75 leading-relaxed">
              {narrative.subtitle}
            </p>
          </div>

          {/* Split Photographic & Scope Monograph */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
            {/* Left Photographic Frame with subtle hover zoom */}
            <div className="group relative lg:col-span-5 rounded-2xl overflow-hidden border border-border-subtle bg-forest-deep aspect-[4/3] sm:aspect-[16/11] shadow-xs transition-all duration-500 hover:shadow-xl hover:border-forest/30">
              <Image
                src={imageMeta.src}
                alt={imageMeta.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transform-none"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent"
                aria-hidden="true"
              />
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <span className="inline-block px-3.5 py-1.5 rounded-full bg-forest-deep/80 backdrop-blur-md border border-warm-ivory/25 text-xs font-sans text-warm-ivory shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transform-none">
                  {practice.title} &bull; Practice Overview
                </span>
              </div>
            </div>

            {/* Right Scope Narrative */}
            <div className="lg:col-span-7 space-y-5 text-charcoal/80 font-sans leading-relaxed text-base sm:text-[17px]">
              {narrative.scopeOverview.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Statutory Frameworks & Key Advisory Pillars */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            {/* Left: Verified Statutory Frameworks */}
            <div className="relative overflow-hidden lg:col-span-4 p-6 sm:p-8 rounded-2xl bg-surface-card border border-border-subtle shadow-xs transition-all duration-300 hover:shadow-md hover:border-forest/30">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest/20 to-transparent"
                aria-hidden="true"
              />
              <h2 className="text-xs font-sans font-semibold uppercase tracking-[0.14em] text-forest mb-4">
                Statutory Frameworks
              </h2>
              {practice.statutory_touchpoints && practice.statutory_touchpoints.length > 0 ? (
                <ul className="space-y-3 font-sans text-sm text-charcoal/80">
                  {practice.statutory_touchpoints.map((tp) => (
                    <li key={tp} className="flex items-start gap-2.5">
                      <span className="text-forest mt-0.5" aria-hidden="true">&bull;</span>
                      <span className="font-medium text-charcoal">{tp}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-charcoal/60">
                  Statutory provisions applicable to specific briefing mandates.
                </p>
              )}
            </div>

            {/* Right: Advisory & Advocacy Pillars with tactile hover lifts */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {narrative.advisoryPillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden p-6 rounded-2xl bg-surface-card border border-border-subtle shadow-xs flex flex-col justify-between hover:border-forest/40 hover:-translate-y-1 hover:scale-[1.015] hover:shadow-lg hover:shadow-forest/5 transition-all duration-300 motion-reduce:transform-none"
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-hidden="true"
                  />
                  <div>
                    <span className="font-serif text-lg font-normal text-forest transition-transform duration-300 group-hover:scale-105 inline-block">
                      0{idx + 1}
                    </span>
                    <h3 className="font-serif text-lg font-medium text-charcoal mt-2 mb-2 tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-sans text-charcoal/70 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conditionally Render Related Works / Judgments if Verified */}
          {(relatedPublications.length > 0 || relatedJudgments.length > 0) && (
            <div className="my-16 pt-12 border-t border-border-subtle">
              <h2 className="font-serif text-2xl font-normal text-charcoal mb-6">
                Related Scholarly Works &amp; Public Records
              </h2>
              {/* Renders only when genuine records exist */}
            </div>
          )}

          {/* Closing Chambers Consultation Action Card with specular line */}
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border-subtle bg-surface-card p-8 sm:p-12 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 transition-all duration-300 hover:shadow-md hover:border-forest/30">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest/20 to-transparent"
              aria-hidden="true"
            />
            <div className="max-w-xl space-y-2">
              <Badge variant="eyebrow">CHAMBERS BRIEFING</Badge>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-charcoal">
                Consult with counsel on {practice.title.toLowerCase()} matters.
              </h2>
              <p className="text-sm font-sans text-charcoal/70">
                Direct preliminary matter conferences are arranged confidentially by appointment
                or conducted via secure communication channels.
              </p>
            </div>
            <div className="shrink-0 flex flex-wrap items-center gap-3">
              <Button href="/contact" variant="primary" size="lg" showArrow={true}>
                Contact Chambers
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </article>
  );
}
