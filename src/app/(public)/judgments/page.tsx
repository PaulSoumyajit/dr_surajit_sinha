import React from "react";
import type { Metadata } from "next";
import { CourtExperienceList } from "@/components/sections/CourtExperienceList";
import { SITE_CONFIG } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Court & Prosecution Experience — Dr. Surajit Sinha, Advocate`,
  description:
    "Public prosecution appointments, POCSO proceedings, cybercrime prosecution, trial litigation, and tribunal practice of Dr. Surajit Sinha, Advocate.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/court-experience`,
  },
  openGraph: {
    title: `Court & Prosecution Experience — Dr. Surajit Sinha, Advocate`,
    description:
      "Public prosecution appointments, POCSO proceedings, cybercrime prosecution, trial litigation, and tribunal practice before High Courts and Lower Courts.",
    url: `${SITE_CONFIG.url}/court-experience`,
    type: "website",
    locale: "en_IN",
  },
};

/**
 * Judgments Directory -> Repurposed to Court & Prosecution Experience
 * Route: /judgments (Redirects to /court-experience)
 */
export default function JudgmentsPage() {
  return <CourtExperienceList />;
}
