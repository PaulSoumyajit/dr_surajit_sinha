import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/seo";

/**
 * Dynamic Robots.txt Generator (P9-08)
 *
 * Directs search engine crawlers:
 * - Permits indexing of all public folios, monographs, and statutory policy pages.
 * - Explicitly disallows administrative back-office (/admin), API routes (/api), and auth endpoints (/auth).
 * - References canonical XML sitemap location.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_CONFIG.url;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api", "/api/", "/auth", "/auth/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

