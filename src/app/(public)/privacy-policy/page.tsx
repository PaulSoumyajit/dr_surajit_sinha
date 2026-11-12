import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { SITE_CONFIG } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy & Data Handling Policy — Dr. Surajit Sinha, Advocate",
  description:
    "Information regarding data intake, privacy safeguards, and zero-tracking practices implemented across this legal folio.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/privacy-policy`,
  },
  openGraph: {
    title: "Privacy & Data Handling Policy — Dr. Surajit Sinha, Advocate",
    description:
      "Data protection, inquiry intake safeguards, and privacy disclosures.",
    url: `${SITE_CONFIG.url}/privacy-policy`,
    type: "website",
    locale: "en_IN",
  },
};

/**
 * Privacy Policy & Data Intake Disclosures (P8-06)
 *
 * Implements factual privacy disclosure reflecting actual technical practices:
 * - Documents specific fields collected via ConsultationForm.
 * - Outlines zero third-party tracking, advertising pixels, or commercial resale.
 * - Explains HMAC-SHA-256 IP hashing for abuse mitigation without raw IP storage.
 * - Clarifies first-party localStorage keys strictly used for compliance state.
 */
export default function PrivacyPolicyPage() {
  return (
    <div className="pt-8 sm:pt-12 pb-20 sm:pb-28">
      <Container variant="narrow">
        <Reveal>
          {/* Header */}
          <div className="mb-10 sm:mb-14">
            <Badge variant="eyebrow" className="mb-3.5">
              DATA PRIVACY &bull; PRIVILEGE SAFEGUARDS
            </Badge>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-charcoal tracking-tight leading-[1.14]">
              Privacy &amp; Data Intake Policy.
            </h1>
            <p className="mt-4 text-base sm:text-lg font-sans text-charcoal/75 leading-relaxed">
              Transparent disclosure of data handling practices, preliminary matter intake, and
              browser storage utilized across this professional legal folio.
            </p>
          </div>

          {/* Substantive Policy Text */}
          <div className="editorial-reading-body space-y-8 text-charcoal/80 font-sans text-base sm:text-[17px] leading-relaxed">
            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-normal text-charcoal tracking-tight">
                1. Information Collected Through Matter Intake
              </h2>
              <p>
                When visitors transmit a preliminary consultation inquiry through the website&apos;s
                intake form, the following fields are collected solely for preliminary conflict
                clearance and liaison:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base">
                <li>Full Name</li>
                <li>Organization or Enterprise entity (optional)</li>
                <li>Email address</li>
                <li>Telephone number (optional)</li>
                <li>Matter Category (Criminal Litigation, Public Prosecution, Cybercrime, POCSO, Civil &amp; Writ, Banking &amp; DRT, Land &amp; Revenue, Other)</li>
                <li>Brief overview of the legal subject matter</li>
                <li>Non-solicitation regulatory acknowledgement confirmation</li>
              </ul>
              <p className="text-sm">
                Prospective clients are expressly instructed not to transmit confidential, privileged,
                or time-sensitive case records through the online inquiry form prior to formal conflict clearance.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-normal text-charcoal tracking-tight">
                2. Purpose of Processing &amp; Zero Commercial Resale
              </h2>
              <p>
                Information provided is processed strictly for:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base">
                <li>Performing mandatory legal conflict-of-interest checks.</li>
                <li>Evaluating preliminary counsel jurisdiction and matter feasibility.</li>
                <li>Scheduling exploratory matter conferences with prospective clients or instructing solicitors.</li>
              </ul>
              <p>
                Personal and organizational details are never sold, rented, leased, or disclosed to
                commercial third parties, advertising brokers, or marketing networks under any circumstances.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-normal text-charcoal tracking-tight">
                3. Security Safeguards &amp; IP Anonymization
              </h2>
              <p>
                To protect against automated abuse and denial-of-service attempts while respecting visitor
                anonymity, incoming server requests are rate-limited using an HMAC-SHA-256 cryptographic
                hash of the client IP address. Raw IP addresses are never recorded or stored in database tables.
              </p>
              <p>
                Submissions are transmitted via encrypted HTTPS protocols. Privileged database credentials
                remain strictly isolated within server-side environments and are never exposed to browser bundles.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-normal text-charcoal tracking-tight">
                4. Cookies &amp; Browser Local Storage
              </h2>
              <p>
                This website does not deploy third-party advertising cookies, analytics tracking beacons,
                or behavioral fingerprinting scripts. First-party browser storage is utilized strictly for
                essential functional compliance:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base">
                <li>
                  <strong className="font-medium text-charcoal font-mono text-xs">bci-disclaimer-acknowledged-v1</strong>:
                  Stores the visitor&apos;s voluntary acknowledgement of the Bar Council of India entrance notice in localStorage to prevent repetitive interruption.
                </li>
                <li>
                  <strong className="font-medium text-charcoal font-mono text-xs">ss_bci_regulatory_notice_dismissed</strong>:
                  Stores tab-session dismissal of the top regulatory notice bar in sessionStorage.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-normal text-charcoal tracking-tight">
                5. Data Retention &amp; Erasure Requests
              </h2>
              <p>
                Inquiries that do not proceed to formal engagement or where an insurmountable conflict of
                interest exists are purged in accordance with chambers record-keeping protocols.
              </p>
              <p>
                Prospective clients may contact chambers directly to request verification, update, or
                erasure of their transmitted contact inquiry records.
              </p>
            </section>

            {/* Implementation Draft Notice */}
            <div className="mt-12 p-5 rounded-2xl bg-surface border border-border-subtle text-xs font-sans text-charcoal/65 leading-relaxed">
              <p>
                &bull; <strong>Editorial Notice:</strong> This privacy policy reflects the implemented
                architecture of the website and consultation intake pipeline. Final review and approval
                by the advocate is required prior to commercial production launch.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}

