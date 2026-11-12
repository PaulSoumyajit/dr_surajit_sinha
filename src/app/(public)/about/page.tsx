import React from "react";
import type { Metadata } from "next";
import { AboutBio } from "@/components/sections/AboutBio";
import { LegalPhilosophy } from "@/components/sections/LegalPhilosophy";
import { AdmissionsTable } from "@/components/sections/AdmissionsTable";
import { AcademicFoundations } from "@/components/sections/AcademicFoundations";
import { ChambersCulture } from "@/components/sections/ChambersCulture";
import { SITE_CONFIG } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Dr. Surajit Sinha — Professional Profile & Biography",
  description:
    "Explore the professional background, qualifications, public prosecution service, and legal practice of Dr. Surajit Sinha, Advocate — High Court & Lower Courts.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/about`,
  },
  openGraph: {
    title: "Dr. Surajit Sinha — Professional Profile & Biography",
    description:
      "Explore the professional background, qualifications, public prosecution service, and legal practice of Dr. Surajit Sinha, Advocate — High Court & Lower Courts.",
    url: `${SITE_CONFIG.url}/about`,
    type: "profile",
    locale: "en_IN",
  },
};

/**
 * About / Professional Profile Page (P5-01)
 *
 * Route: /about
 * Presents counsel's biographical monograph, philosophy of legal craft,
 * verified regulatory admissions, and chambers culture.
 */
export default function AboutPage() {
  return (
    <>
      {/* 1. Biographical Monograph */}
      <AboutBio />

      {/* 2. Philosophy of Legal Craft */}
      <LegalPhilosophy />

      {/* 3. Formal Admissions & Regulatory Standing */}
      <AdmissionsTable />

      {/* 4. Academic Foundations */}
      <AcademicFoundations />

      {/* 5. Chambers Culture & Research Discipline */}
      <ChambersCulture />
    </>
  );
}
