import React from "react";
import Link from "next/link";
import { AdminNav } from "@/components/cms/AdminNav";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";

interface DashboardMetrics {
  publishedArticles: number;
  draftArticles: number;
  unreadInquiries: number;
  activeFaqs: number;
}

interface RecentInquiry {
  id: string;
  full_name: string;
  organization: string | null;
  category: string;
  status: string;
  created_at: string;
}

interface RecentArticle {
  id: string;
  title: string;
  slug: string;
  status: string;
  updated_at: string;
}

async function getDashboardData(): Promise<{
  isConfigured: boolean;
  metrics: DashboardMetrics;
  recentInquiries: RecentInquiry[];
  recentArticles: RecentArticle[];
}> {
  const supabase = await createClient();

  if (!supabase) {
    return {
      isConfigured: false,
      metrics: {
        publishedArticles: 0,
        draftArticles: 0,
        unreadInquiries: 0,
        activeFaqs: 0,
      },
      recentInquiries: [],
      recentArticles: [],
    };
  }

  try {
    // 1. Fetch metrics in parallel
    const [
      { count: publishedCount },
      { count: draftCount },
      { count: unreadCount },
      { count: faqsCount },
      { data: inquiries },
      { data: articles },
    ] = await Promise.all([
      supabase.from("articles").select("*", { count: "exact", head: true }).eq("status", "published"),
      supabase.from("articles").select("*", { count: "exact", head: true }).eq("status", "draft"),
      supabase.from("contact_inquiries").select("*", { count: "exact", head: true }).eq("status", "unread"),
      supabase.from("faqs").select("*", { count: "exact", head: true }),
      supabase
        .from("contact_inquiries")
        .select("id, full_name, organization, category, status, created_at")
        .order("created_at", { ascending: false })
        .limit(5),
      supabase
        .from("articles")
        .select("id, title, slug, status, updated_at")
        .order("updated_at", { ascending: false })
        .limit(5),
    ]);

    return {
      isConfigured: true,
      metrics: {
        publishedArticles: publishedCount || 0,
        draftArticles: draftCount || 0,
        unreadInquiries: unreadCount || 0,
        activeFaqs: faqsCount || 0,
      },
      recentInquiries: (inquiries as RecentInquiry[]) || [],
      recentArticles: (articles as RecentArticle[]) || [],
    };
  } catch {
    return {
      isConfigured: false,
      metrics: {
        publishedArticles: 0,
        draftArticles: 0,
        unreadInquiries: 0,
        activeFaqs: 0,
      },
      recentInquiries: [],
      recentArticles: [],
    };
  }
}

export default async function AdminDashboardPage() {
  const { isConfigured, metrics, recentInquiries, recentArticles } = await getDashboardData();

  return (
    <div className="min-h-screen bg-canvas pb-20">
      <AdminNav unreadInquiriesCount={metrics.unreadInquiries} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        {/* Welcome & Overview Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 border-b border-border-subtle">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-charcoal font-normal">
              Chambers Command Overview
            </h1>
            <p className="mt-1 text-xs sm:text-sm font-sans text-charcoal/70">
              Editorial publication pipeline, consultation inquiries, and practice guidelines.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              href="/admin/articles?action=new"
              variant="primary"
              size="sm"
              className="text-xs font-medium tracking-wide uppercase"
            >
              Draft New Monograph ↗
            </Button>
          </div>
        </div>

        {/* Infrastructure Advisory Banner if Supabase is unconfigured */}
        {!isConfigured && (
          <div
            role="alert"
            className="my-6 p-4 rounded-xl bg-sand/60 border border-border-subtle text-xs text-charcoal/80 flex items-start gap-3"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-charcoal text-sm mb-0.5">
                Database Connection Pending
              </p>
              <p className="leading-relaxed">
                Supabase credentials have not been configured in{" "}
                <code className="px-1 py-0.5 bg-canvas rounded font-mono text-[11px]">
                  .env.local
                </code>
                . Live metrics and data ingestion are running in isolated development preview mode.
                All back-office schemas and tables are defined in{" "}
                <code className="px-1 py-0.5 bg-canvas rounded font-mono text-[11px]">
                  supabase/migrations/20261104000000_phase9_schema_and_security.sql
                </code>
                .
              </p>
            </div>
          </div>
        )}

        {/* Metric Cards Grid */}
        <section aria-label="Key Chambers Metrics" className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Metric 1: Published Articles */}
            <div className="bg-warm-white p-5 sm:p-6 rounded-xl border border-border-subtle/80 shadow-xs">
              <p className="text-xs font-sans text-charcoal/60 uppercase tracking-wider">
                Published Monographs
              </p>
              <p className="mt-2 font-serif text-3xl sm:text-4xl text-forest-deep">
                {metrics.publishedArticles}
              </p>
              <div className="mt-3 flex items-center justify-between text-xs font-sans text-charcoal/65">
                <span>Public Folio</span>
                <Link href="/insights" className="text-forest hover:underline">
                  View Public ↗
                </Link>
              </div>
            </div>

            {/* Metric 2: Draft Articles */}
            <div className="bg-warm-white p-5 sm:p-6 rounded-xl border border-border-subtle/80 shadow-xs">
              <p className="text-xs font-sans text-charcoal/60 uppercase tracking-wider">
                Draft Monographs
              </p>
              <p className="mt-2 font-serif text-3xl sm:text-4xl text-charcoal">
                {metrics.draftArticles}
              </p>
              <div className="mt-3 flex items-center justify-between text-xs font-sans text-charcoal/65">
                <span>In Preparation</span>
                <Link href="/admin/articles?status=draft" className="text-forest hover:underline">
                  Manage Drafts →
                </Link>
              </div>
            </div>

            {/* Metric 3: Consultation Inquiries (Unread) */}
            <div className="bg-warm-white p-5 sm:p-6 rounded-xl border border-border-subtle/80 shadow-xs">
              <p className="text-xs font-sans text-charcoal/60 uppercase tracking-wider">
                Unread Inquiries
              </p>
              <p className="mt-2 font-serif text-3xl sm:text-4xl text-amber-700">
                {metrics.unreadInquiries}
              </p>
              <div className="mt-3 flex items-center justify-between text-xs font-sans text-charcoal/65">
                <span>Matter Intake</span>
                <Link href="/admin/inquiries" className="text-forest hover:underline">
                  Review Inbox →
                </Link>
              </div>
            </div>

            {/* Metric 4: Active FAQs */}
            <div className="bg-warm-white p-5 sm:p-6 rounded-xl border border-border-subtle/80 shadow-xs">
              <p className="text-xs font-sans text-charcoal/60 uppercase tracking-wider">
                Practice FAQs
              </p>
              <p className="mt-2 font-serif text-3xl sm:text-4xl text-charcoal">
                {metrics.activeFaqs}
              </p>
              <div className="mt-3 flex items-center justify-between text-xs font-sans text-charcoal/65">
                <span>Client Guidance</span>
                <Link href="/admin/faqs" className="text-forest hover:underline">
                  Manage FAQs →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Dual Operational Columns: Recent Inquiries & Recent Articles */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Column A: Recent Consultation Inquiries */}
          <section
            aria-labelledby="recent-inquiries-heading"
            className="bg-warm-white rounded-xl border border-border-subtle/80 p-6 shadow-xs"
          >
            <div className="flex items-center justify-between mb-4">
              <h2
                id="recent-inquiries-heading"
                className="font-serif text-lg font-normal text-charcoal"
              >
                Recent Consultation Enquiries
              </h2>
              <Link
                href="/admin/inquiries"
                className="text-xs font-sans text-forest hover:underline"
              >
                All Inquiries →
              </Link>
            </div>

            {recentInquiries.length === 0 ? (
              <div className="py-8 text-center border border-dashed border-border-subtle rounded-lg">
                <p className="text-xs font-sans text-charcoal/60">
                  No consultation inquiries received yet.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-border-subtle/60">
                {recentInquiries.map((inq) => (
                  <li key={inq.id} className="py-3 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-sans font-medium text-charcoal truncate">
                        {inq.full_name}
                        {inq.organization && (
                          <span className="text-xs text-charcoal/60 font-normal">
                            {" "}
                            &middot; {inq.organization}
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-charcoal/60 mt-0.5">
                        {inq.category} &middot;{" "}
                        {new Date(inq.created_at).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })}
                      </p>
                    </div>
                    <Badge
                      variant="pill"
                      showDot={inq.status === "unread"}
                    >
                      {inq.status}
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Column B: Recent Articles / Publications */}
          <section
            aria-labelledby="recent-articles-heading"
            className="bg-warm-white rounded-xl border border-border-subtle/80 p-6 shadow-xs"
          >
            <div className="flex items-center justify-between mb-4">
              <h2
                id="recent-articles-heading"
                className="font-serif text-lg font-normal text-charcoal"
              >
                Recent Monographs &amp; Essays
              </h2>
              <Link
                href="/admin/articles"
                className="text-xs font-sans text-forest hover:underline"
              >
                All Articles →
              </Link>
            </div>

            {recentArticles.length === 0 ? (
              <div className="py-8 text-center border border-dashed border-border-subtle rounded-lg">
                <p className="text-xs font-sans text-charcoal/60">
                  No editorial monographs created yet.
                </p>
                <div className="mt-3">
                  <Button
                    href="/admin/articles?action=new"
                    variant="outline"
                    size="sm"
                    className="text-xs"
                  >
                    Create First Monograph
                  </Button>
                </div>
              </div>
            ) : (
              <ul className="divide-y divide-border-subtle/60">
                {recentArticles.map((art) => (
                  <li key={art.id} className="py-3 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-sans font-medium text-charcoal truncate">
                        {art.title}
                      </p>
                      <p className="text-xs text-charcoal/60 mt-0.5 font-mono">
                        /{art.slug}
                      </p>
                    </div>
                    <Badge
                      variant="pill"
                      showDot={art.status === "published"}
                    >
                      {art.status}
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
