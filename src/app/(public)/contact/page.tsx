import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { ContactInfo } from "@/components/sections/ContactInfo";
import { ConsultationForm } from "@/components/sections/ConsultationForm";
import { ChambersMap } from "@/components/sections/ChambersMap";
import { SITE_CONFIG } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Professional Details & Contact — Dr. Surajit Sinha, Advocate",
  description:
    "Arrange preliminary consultations or submit matter briefing to Dr. Surajit Sinha, Advocate in criminal litigation, public prosecution, cyber law, and civil proceedings.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/contact`,
  },
  openGraph: {
    title: "Professional Details & Contact — Dr. Surajit Sinha, Advocate",
    description:
      "Direct consultation intake and preliminary matter briefing in criminal litigation, cyber law, and court proceedings.",
    url: `${SITE_CONFIG.url}/contact`,
    type: "website",
    locale: "en_IN",
  },
};

/**
 * Chambers Contact & Consultation Page (P8-01)
 *
 * Implements the preliminary legal briefing and inquiry portal:
 * - Dignified editorial introduction and verified counsel identity.
 * - Intake protocol, conflict verification notice, and conference formats.
 * - Secure consultation inquiry form with client/server validation.
 * - Conditional static map card (rendered only when verified location data exists).
 * - Full adherence to Bar Council of India Rule 36 non-solicitation guidelines.
 */
export default function ContactPage() {
  return (
    <div className="pt-8 sm:pt-12 pb-20 sm:pb-28">
      <Container>
        <Reveal>
          {/* Page Introduction */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <Badge variant="eyebrow" className="mb-3.5">
              CHAMBERS INTAKE &bull; DIRECT CONSULTATION
            </Badge>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal text-charcoal tracking-tight leading-[1.12]">
              Professional Details &amp; <br />
              <span className="italic text-forest">Consultation Intake.</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg md:text-xl font-sans text-charcoal/75 leading-relaxed">
              Preliminary matter discussions are conducted directly with Dr. Surajit Sinha, Advocate.
              Inquiries undergo appropriate conflict verification prior to substantive counsel conferences.
            </p>
          </div>

          {/* Main Asymmetric Split: Contact Info Protocol + Consultation Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12">
            {/* Left Column: Chambers Protocol & Credentials */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <ContactInfo />
              {/* Chambers Map Card (Gracefully hides when location is unverified) */}
              <ChambersMap />
            </div>

            {/* Right Column: Secure Consultation Form */}
            <div className="lg:col-span-7">
              <ConsultationForm />
            </div>
          </div>

          {/* Mandatory Bar Council Regulatory Footnote */}
          <div className="mt-12 p-5 rounded-2xl bg-surface border border-border-subtle text-xs font-sans text-charcoal/65 leading-relaxed">
            <p>
              &bull; <strong>Bar Council of India Rule 36 Compliance Notice:</strong> The information
              provided on this page and the accompanying consultation form are published exclusively
              to facilitate preliminary communication initiated by the visitor. Submitting an inquiry
              does not create an advocate-client relationship or constitute legal representation.
            </p>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}

