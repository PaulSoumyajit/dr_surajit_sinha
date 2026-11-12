import React from "react";
import type { Metadata } from "next";
import { AcademicShowcase } from "@/components/sections/AcademicShowcase";
import { TechnicalCertificationsList } from "@/components/sections/TechnicalCertificationsList";
import { SITE_CONFIG } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Academic Background & Research — Dr. Surajit Sinha, Advocate`,
  description:
    "Doctor of Philosophy (PhD) in Cyber Law and E-commerce, Master of Laws (LL.M.), MCA, M.Com., and technical qualifications of Dr. Surajit Sinha, Advocate.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/academic-background`,
  },
  openGraph: {
    title: `Academic Background & Research — Dr. Surajit Sinha, Advocate`,
    description:
      "Doctoral scholarship in cyber law and electronic commerce, advanced degrees in law, computing, and commerce, and technical qualifications underpinning digital litigation.",
    url: `${SITE_CONFIG.url}/academic-background`,
    type: "website",
    locale: "en_IN",
  },
};

/**
 * Academic Background & Research Folio
 * Route: /academic-background (Canonical)
 */
export default function AcademicBackgroundPage() {
  return (
    <>
      <AcademicShowcase />
      <TechnicalCertificationsList />
    </>
  );
}

