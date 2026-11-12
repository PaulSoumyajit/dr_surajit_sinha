import React from "react";
import type { Metadata } from "next";
import { PracticeGrid } from "@/components/sections/PracticeGrid";
import { SITE_CONFIG } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Practice Areas & Legal Disciplines — Dr. Surajit Sinha",
  description:
    "Explore the verified practice areas of Dr. Surajit Sinha, Advocate — High Court & Lower Courts, focusing on Criminal Law, Public Prosecution, Cyber Law, POCSO, Civil & Writ Litigation, and DRT matters.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/practice-areas`,
  },
  openGraph: {
    title: "Practice Areas & Legal Disciplines — Dr. Surajit Sinha",
    description:
      "Explore the verified practice areas of Dr. Surajit Sinha, Advocate — High Court & Lower Courts, focusing on Criminal Law, Public Prosecution, Cyber Law, POCSO, Civil & Writ Litigation, and DRT matters.",
    url: `${SITE_CONFIG.url}/practice-areas`,
    type: "website",
    locale: "en_IN",
  },
};

/**
 * Practice Areas Overview Directory (P6-01)
 *
 * Route: /practice-areas
 * Presents the 3 confirmed core disciplines handled by counsel:
 * 1. Corporate Advisory
 * 2. Commercial Arbitration
 * 3. Appellate Advocacy
 */
export default function PracticeAreasPage() {
  return (
    <>
      <PracticeGrid />
    </>
  );
}

