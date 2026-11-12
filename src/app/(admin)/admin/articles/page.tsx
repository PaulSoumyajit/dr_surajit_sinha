import React from "react";
import Link from "next/link";
import { AdminNav } from "@/components/cms/AdminNav";
import { ArticleEditor } from "@/components/cms/ArticleEditor";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { deleteArticleAction } from "./actions";
import type { Article, Category } from "@/types";

export const dynamic = "force-dynamic";

interface ArticlesPageProps {
  searchParams: Promise<{
    action?: string;
    edit?: string;
    status?: string;
  }>;
}

export default async function AdminArticlesPage({ searchParams }: ArticlesPageProps) {
  const { action, edit, status: statusFilter } = await searchParams;

  const supabase = await createClient();

  let categories: Category[] = [];
  let articles: Article[] = [];
  let editingArticle: Article | undefined = undefined;

  if (supabase) {
    // 1. Fetch categories
    const { data: catData } = await supabase.from("categories").select("*").order("name");
    categories = (catData as Category[]) || [];

    // 2. If editing specific article, load it
    if (edit) {
      const { data: artData } = await supabase
        .from("articles")
        .select("*, category:categories(*)")
        .eq("id", edit)
        .single();
      editingArticle = (artData as Article) || undefined;
    }

    // 3. Fetch articles list
    let query = supabase
      .from("articles")
      .select("*, category:categories(*)")
      .order("updated_at", { ascending: false });

    if (statusFilter && ["draft", "published", "archived"].includes(statusFilter)) {
      query = query.eq("status", statusFilter);
    }

    const { data: listData } = await query;
    articles = (listData as Article[]) || [];
  }

  const isEditorMode = action === "new" || !!edit;

  return (
    <div className="min-h-screen bg-canvas pb-20">
      <AdminNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-border-subtle">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                href="/admin/dashboard"
                className="text-xs font-sans text-charcoal/60 hover:text-charcoal"
              >
                Chambers Dashboard
              </Link>
              <span className="text-xs text-charcoal/40">/</span>
              <span className="text-xs font-sans text-charcoal font-medium">Articles &amp; Monographs</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
              {isEditorMode
                ? editingArticle
                  ? `Editing: ${editingArticle.title}`
                  : "Draft New Legal Monograph"
                : "Articles & Legal Commentary"}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {isEditorMode ? (
              <Button href="/admin/articles" variant="outline" size="sm" className="text-xs">
                &larr; Back to Articles List
              </Button>
            ) : (
              <Button
                href="/admin/articles?action=new"
                variant="primary"
                size="sm"
                className="text-xs font-medium uppercase tracking-wide"
              >
                Draft New Monograph ↗
              </Button>
            )}
          </div>
        </div>

        {/* Infrastructure Advisory Banner if Supabase is unconfigured */}
        {!supabase && (
          <div
            role="alert"
            className="my-6 p-4 rounded-xl bg-sand/60 border border-border-subtle text-xs text-charcoal/80 flex items-start gap-3"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-charcoal text-sm mb-0.5">
                Database Persistence Notice
              </p>
              <p className="leading-relaxed">
                Supabase database credentials are not configured in environment variables.
                Article persistence requires active Supabase project configuration.
              </p>
            </div>
          </div>
        )}

        <div className="mt-6">
          {isEditorMode ? (
            /* Editor Form View */
            <ArticleEditor initialArticle={editingArticle} categories={categories} />
          ) : (
            /* Articles Directory Table / Listing */
            <div className="space-y-6">
              {/* Filter Tabs */}
              <div className="flex items-center gap-1 border-b border-border-subtle text-xs font-sans">
                {[
                  { label: "All Items", val: "" },
                  { label: "Drafts", val: "draft" },
                  { label: "Published", val: "published" },
                  { label: "Archived", val: "archived" },
                ].map((tab) => {
                  const isActive = (statusFilter || "") === tab.val;
                  const href = tab.val ? `/admin/articles?status=${tab.val}` : "/admin/articles";
                  return (
                    <Link
                      key={tab.label}
                      href={href}
                      className={`pb-2.5 px-3 font-medium transition-colors border-b-2 -mb-px ${
                        isActive
                          ? "border-forest-deep text-forest-deep font-semibold"
                          : "border-transparent text-charcoal/60 hover:text-charcoal"
                      }`}
                    >
                      {tab.label}
                    </Link>
                  );
                })}
              </div>

              {/* Table / List */}
              {articles.length === 0 ? (
                <div className="bg-warm-white p-12 text-center rounded-xl border border-dashed border-border-subtle">
                  <p className="font-serif text-lg text-charcoal mb-2">No Monographs Found</p>
                  <p className="text-xs font-sans text-charcoal/60 max-w-md mx-auto mb-6">
                    {statusFilter
                      ? `There are currently no articles marked as '${statusFilter}'.`
                      : "The editorial publishing folio contains no monographs. Draft your first legal essay to begin."}
                  </p>
                  <Button href="/admin/articles?action=new" variant="primary" size="sm" className="text-xs">
                    Draft New Monograph ↗
                  </Button>
                </div>
              ) : (
                <div className="bg-warm-white rounded-xl border border-border-subtle overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs font-sans">
                      <thead>
                        <tr className="border-b border-border-subtle bg-sand/40 text-charcoal/70 uppercase tracking-wider text-[11px]">
                          <th className="py-3 px-4 font-semibold">Title &amp; Route Slug</th>
                          <th className="py-3 px-4 font-semibold">Category</th>
                          <th className="py-3 px-4 font-semibold">Status</th>
                          <th className="py-3 px-4 font-semibold">Reading Time</th>
                          <th className="py-3 px-4 font-semibold">Last Modified</th>
                          <th className="py-3 px-4 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border-subtle/60">
                        {articles.map((art) => (
                          <tr key={art.id} className="hover:bg-sand/30 transition-colors">
                            <td className="py-3.5 px-4">
                              <p className="font-medium text-sm text-charcoal">{art.title}</p>
                              <p className="font-mono text-[11px] text-charcoal/60 mt-0.5">
                                /insights/{art.slug}
                              </p>
                            </td>
                            <td className="py-3.5 px-4 text-charcoal/80">
                              {art.category?.name || "Uncategorized"}
                            </td>
                            <td className="py-3.5 px-4">
                              <Badge variant="pill" showDot={art.status === "published"}>
                                {art.status}
                              </Badge>
                            </td>
                            <td className="py-3.5 px-4 text-charcoal/70 font-mono">
                              {art.reading_time_min} min
                            </td>
                            <td className="py-3.5 px-4 text-charcoal/70">
                              {new Date(art.updated_at).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                {art.status === "published" && (
                                  <Link
                                    href={`/insights/${art.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-charcoal/60 hover:text-charcoal px-2 py-1"
                                    title="View public page"
                                  >
                                    View ↗
                                  </Link>
                                )}
                                <Link
                                  href={`/admin/articles?edit=${art.id}`}
                                  className="text-xs text-forest font-medium hover:underline px-2 py-1"
                                >
                                  Edit
                                </Link>
                                <form
                                  action={async () => {
                                    "use server";
                                    await deleteArticleAction(art.id);
                                  }}
                                >
                                  <button
                                    type="submit"
                                    className="text-xs text-red-900/70 hover:text-red-950 px-2 py-1 rounded hover:bg-red-50 transition-colors"
                                  >
                                    Delete
                                  </button>
                                </form>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

