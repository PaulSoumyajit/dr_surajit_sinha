import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";
import { ArticleToc } from "@/components/sections/ArticleToc";
import { ArticleShareBar } from "@/components/sections/ArticleShareBar";
import { RelatedArticles } from "@/components/sections/RelatedArticles";
import {
  fetchArticleBySlug,
  fetchPublishedArticles,
} from "@/lib/data/articles";
import { generateArticleSchema, safeJsonLd, SITE_CONFIG } from "@/lib/seo";

export const dynamicParams = true;

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Static generation for pre-rendered published articles.
 */
export async function generateStaticParams() {
  const published = await fetchPublishedArticles();
  return published.map((article) => ({
    slug: article.slug,
  }));
}

/**
 * Dynamic metadata generation for published legal monographs.
 */
export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    return {
      title: "Monograph Not Located — Dr. Surajit Sinha, Advocate",
    };
  }

  const url = `${SITE_CONFIG.url}/insights/${article.slug}`;

  return {
    title: `${article.title} — Dr. Surajit Sinha, Advocate`,
    description: article.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${article.title} — Dr. Surajit Sinha, Advocate`,
      description: article.excerpt,
      url,
      type: "article",
      publishedTime: article.published_at || undefined,
      modifiedTime: article.updated_at || undefined,
      authors: ["Dr. Surajit Sinha, Advocate"],
      locale: "en_IN",
      ...(article.cover_image_url
        ? {
            images: [
              {
                url: article.cover_image_url,
                alt: article.title,
              },
            ],
          }
        : {}),
    },
  };
}

/**
 * Individual Article Reading Folio (P7-02 & P9-05)
 *
 * Implements a prestigious long-form legal review reading experience:
 * - Restrained reading column (max-w-[680px] / max-w-prose) optimized for 65–75 characters per line.
 * - Sticky Table of Contents rail on viewports >= 1280px (ArticleToc).
 * - Secure server-rendered Markdown engine (MarkdownRenderer).
 * - Academic citation generator & sharing bar (ArticleShareBar).
 * - Related monographs recommendation module (RelatedArticles).
 * - Dynamic route support for newly published CMS articles.
 */
export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const schema = generateArticleSchema(article);

  return (
    <article className="pt-8 sm:pt-12 pb-20 sm:pb-28">
      {/* Schema.org Article JSON-LD Structured Data */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLd(schema),
          }}
        />
      )}

      <Container>
        <Reveal>
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumbs" className="mb-6 sm:mb-8">
            <Link
              href="/insights"
              className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-forest hover:underline"
            >
              <span aria-hidden="true">&larr;</span>
              <span>All Insights &amp; Monographs</span>
            </Link>
          </nav>

          {/* Article Header Monograph */}
          <header className="max-w-3xl mb-10 sm:mb-14">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              {article.category && (
                <Badge variant="pill" showDot={false}>
                  {article.category.name}
                </Badge>
              )}
              <span className="text-xs font-mono text-charcoal/60">
                {article.reading_time_min} min read
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-normal text-charcoal tracking-tight leading-[1.14]">
              {article.title}
            </h1>

            <p className="mt-5 text-base sm:text-lg md:text-xl font-sans text-charcoal/75 leading-relaxed">
              {article.excerpt}
            </p>

            {/* Author Byline & Publication Date */}
            <div className="mt-8 pt-6 border-t border-border-subtle/80 flex flex-wrap items-center justify-between gap-4 text-xs font-sans text-charcoal/70">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-forest-deep text-warm-ivory flex items-center justify-center font-serif font-medium text-sm">
                  SS
                </span>
                <div>
                  <p className="font-medium text-charcoal">Dr. Surajit Sinha</p>
                  <p className="text-[11px] text-charcoal/60">
                    Advocate — High Court &amp; Lower Courts
                  </p>
                </div>
              </div>

              {article.published_at && (
                <time dateTime={article.published_at} className="font-mono text-xs">
                  {new Date(article.published_at).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              )}
            </div>
          </header>

          {/* Main Reading Folio with Sticky TOC */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12 relative">
            {/* Left/Main Reading Body */}
            <div className="xl:col-span-8 min-w-0">
              <MarkdownRenderer content={article.content_md} />
              <ArticleShareBar article={article} />
            </div>

            {/* Right Sticky TOC Sidebar (viewports >= 1280px) */}
            <div className="hidden xl:block xl:col-span-4">
              <ArticleToc content={article.content_md} />
            </div>
          </div>

          {/* Related Articles Module */}
          <RelatedArticles currentArticle={article} />
        </Reveal>
      </Container>
    </article>
  );
}
