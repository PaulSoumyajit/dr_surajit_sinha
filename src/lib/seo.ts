import { COUNSEL_PROFILE } from "@/lib/data/profile";
import type { PracticeArea, Publication, JournalArticle, Judgment, Article } from "@/types";

/**
 * Site Metadata & SEO Configuration
 *
 * Adheres strictly to Bar Council of India Rule 36 and docs/04_CONTENT_REQUIREMENTS.md:
 * - Factual, non-promotional description.
 * - Only verified lawyer information included in Schema.org JSON-LD.
 * - Zero fabricated addresses, telephone numbers, ratings, or comparative claims.
 * - Safe JSON-LD serialization to prevent script-injection.
 */

export const SITE_CONFIG = {
  name: "Dr. Surajit Sinha",
  title: "Dr. Surajit Sinha — Advocate | High Court & Lower Courts",
  description:
    "Dr. Surajit Sinha is an Advocate whose professional background includes criminal law, public prosecution, POCSO-related prosecution, cybercrime and cyber law, civil and writ proceedings, banking and Debt Recovery Tribunal matters, and land and revenue-related legal work.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://surajitsinha.com",
  disciplines: COUNSEL_PROFILE.core_disciplines,
};

/**
 * Safely serializes JSON-LD structured data to avoid script injection (XSS).
 * Replaces '<' with unicode escape '\u003c' to prevent closing script tags.
 */
export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/**
 * Generates Schema.org JSON-LD structured data for LegalService & Person.
 * Strict ethical compliance: Includes only confirmed facts.
 */
export function generateLegalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LegalService",
        "@id": `${SITE_CONFIG.url}/#chambers`,
        name: "Chambers of Dr. Surajit Sinha, Advocate",
        url: SITE_CONFIG.url,
        description: SITE_CONFIG.description,
        knowsAbout: SITE_CONFIG.disciplines,
        founder: {
          "@type": "Person",
          "@id": `${SITE_CONFIG.url}/#counsel`,
          name: COUNSEL_PROFILE.name,
          jobTitle: COUNSEL_PROFILE.title,
        },
      },
      {
        "@type": "Person",
        "@id": `${SITE_CONFIG.url}/#counsel`,
        name: COUNSEL_PROFILE.name,
        jobTitle: COUNSEL_PROFILE.title,
        url: SITE_CONFIG.url,
        knowsAbout: SITE_CONFIG.disciplines,
      },
    ],
  };
}

/**
 * Generates Schema.org JSON-LD for an individual verified practice discipline.
 */
export function generatePracticeAreaSchema(practice: PracticeArea) {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: `${practice.title} — Legal Counsel & Advocacy`,
    description: practice.description,
    url: `${SITE_CONFIG.url}/practice-areas/${practice.slug}`,
    provider: {
      "@type": "Person",
      name: COUNSEL_PROFILE.name,
      jobTitle: COUNSEL_PROFILE.title,
    },
    areaServed: "India",
  };
}

/**
 * Generates Schema.org JSON-LD for verified publications & articles.
 * Returns null if dataset is empty (never emits empty or fake Book schemas).
 */
export function generatePublicationsSchema(
  publications: Publication[],
  articles: JournalArticle[]
) {
  if (publications.length === 0 && articles.length === 0) {
    return null;
  }

  const items = [
    ...publications.map((book) => ({
      "@type": "Book",
      name: book.title,
      headline: book.subtitle || book.title,
      author: {
        "@type": "Person",
        name: COUNSEL_PROFILE.name,
      },
      publisher: {
        "@type": "Organization",
        name: book.publisher,
      },
      datePublished: `${book.publication_year}`,
      ...(book.isbn ? { isbn: book.isbn } : {}),
      description: book.description,
    })),
    ...articles.map((article) => ({
      "@type": "ScholarlyArticle",
      headline: article.title,
      author: {
        "@type": "Person",
        name: COUNSEL_PROFILE.name,
      },
      datePublished: article.publication_date,
      isPartOf: {
        "@type": "Periodical",
        name: article.citation,
      },
      about: article.topic,
    })),
  ];

  return {
    "@context": "https://schema.org",
    "@graph": items,
  };
}

/**
 * Generates Schema.org JSON-LD for verified reported judgments.
 * Returns null if dataset is empty. Never applies "Legislation" schema to judicial decisions.
 */
export function generateJudgmentsSchema(judgments: Judgment[]) {
  if (judgments.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@graph": judgments.map((judg) => ({
      "@type": "ItemPage",
      name: judg.case_title,
      description: judg.ratio_summary,
      url: judg.official_report_url || `${SITE_CONFIG.url}/judgments`,
      about: {
        "@type": "Thing",
        name: judg.legal_subject,
      },
    })),
  };
}

/**
 * Generates Schema.org JSON-LD structured data for an individual published Article.
 * Strict compliance:
 * - Only generated for articles with status === 'published'.
 * - Uses verified counsel profile as author.
 * - Never includes fabricated dates or credentials.
 */
export function generateArticleSchema(article: Article) {
  if (article.status !== "published") {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    url: `${SITE_CONFIG.url}/insights/${article.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url}/insights/${article.slug}`,
    },
    author: {
      "@type": "Person",
      name: COUNSEL_PROFILE.name,
      jobTitle: COUNSEL_PROFILE.title,
      url: SITE_CONFIG.url,
    },
    publisher: {
      "@type": "LegalService",
      name: "Chambers of Dr. Surajit Sinha, Advocate",
      url: SITE_CONFIG.url,
    },
    ...(article.published_at ? { datePublished: article.published_at } : {}),
    ...(article.updated_at ? { dateModified: article.updated_at } : {}),
    ...(article.cover_image_url ? { image: article.cover_image_url } : {}),
    ...(article.category ? { articleSection: article.category.name } : {}),
  };
}

