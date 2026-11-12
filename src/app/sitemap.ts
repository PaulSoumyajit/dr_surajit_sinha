import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/seo";
import { PRACTICE_AREAS } from "@/lib/data/practice-areas";
import { fetchPublishedArticles } from "@/lib/data/articles";

export const dynamic = "force-dynamic";

/**
 * Dynamic XML Sitemap Generator (P9-08)
 *
 * Programmatically indexes all legitimate, public routes:
 * 1. Primary folios (Homepage, About, Career, Practice Areas, Publications, Judgments, Insights, Contact).
 * 2. Verified practice discipline detail pages.
 * 3. Live published editorial legal monographs (from Supabase or local fallback).
 * 4. Regulatory compliance policy folios (Disclaimer, Privacy Policy, Terms).
 *
 * STRICT EXCLUSIONS:
 * - Never includes /admin or administrative CMS routes.
 * - Never includes /api ingestion endpoints.
 * - Never includes draft or archived articles.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;
  const now = new Date();

  // 1. Static Core Public Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/career`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/practice-areas`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/academic-background`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/court-experience`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/insights`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // 2. Practice Discipline Sub-Routes
  const practiceRoutes: MetadataRoute.Sitemap = PRACTICE_AREAS.map((pa) => ({
    url: `${baseUrl}/practice-areas/${pa.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // 3. Dynamically Published Legal Monographs
  const publishedArticles = await fetchPublishedArticles();
  const articleRoutes: MetadataRoute.Sitemap = publishedArticles.map((art) => ({
    url: `${baseUrl}/insights/${art.slug}`,
    lastModified: new Date(art.updated_at || art.published_at || now),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...practiceRoutes, ...articleRoutes];
}

