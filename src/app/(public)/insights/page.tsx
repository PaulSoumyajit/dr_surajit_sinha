import React from "react";
import type { Metadata } from "next";
import { InsightsListing } from "@/components/sections/InsightsListing";
import { fetchPublishedArticles, fetchPublishedCategories } from "@/lib/data/articles";
import { SITE_CONFIG } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Insights & Legal Commentary — Dr. Surajit Sinha, Advocate",
  description:
    "Analytical legal essays, statutory interpretations, and procedural commentaries on criminal law, public prosecution, and cyber jurisprudence by Dr. Surajit Sinha, Advocate.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/insights`,
  },
  openGraph: {
    title: "Insights & Legal Commentary — Dr. Surajit Sinha, Advocate",
    description:
      "Analytical legal essays and procedural commentaries on criminal law, public prosecution, and cyber jurisprudence.",
    url: `${SITE_CONFIG.url}/insights`,
    type: "website",
    locale: "en_IN",
  },
};

/**
 * Editorial Legal Insights & Journal Directory Page (P7-01 & P9-05)
 *
 * Implements the main Insights folio page.
 * Seamlessly integrates published CMS records from Supabase with safe fallback.
 */
export default async function InsightsPage() {
  const articles = await fetchPublishedArticles();
  const categories = await fetchPublishedCategories();

  return <InsightsListing articles={articles} categories={categories} />;
}
