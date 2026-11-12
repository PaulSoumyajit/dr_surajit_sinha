import React from "react";
import Link from "next/link";
import { AdminNav } from "@/components/cms/AdminNav";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { saveFaqAction, deleteFaqAction } from "./actions";
import type { FAQ } from "@/types";

export const dynamic = "force-dynamic";

interface FaqsPageProps {
  searchParams: Promise<{
    action?: string;
    edit?: string;
  }>;
}

export default async function AdminFaqsPage({ searchParams }: FaqsPageProps) {
  const { action, edit } = await searchParams;

  const supabase = await createClient();

  let faqs: FAQ[] = [];
  let editingFaq: FAQ | undefined = undefined;

  if (supabase) {
    const { data } = await supabase
      .from("faqs")
      .select("*")
      .order("order_index", { ascending: true })
      .order("created_at", { ascending: true });

    faqs = (data as FAQ[]) || [];

    if (edit) {
      editingFaq = faqs.find((f) => f.id === edit);
    }
  }

  const isFormOpen = action === "new" || !!edit;

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
              <span className="text-xs font-sans text-charcoal font-medium">Practice FAQs</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
              Practice Guidance &amp; Consultation FAQs
            </h1>
          </div>

          <div>
            {!isFormOpen && (
              <Button
                href="/admin/faqs?action=new"
                variant="primary"
                size="sm"
                className="text-xs font-medium uppercase tracking-wide"
              >
                Add Guidance FAQ +
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
                FAQ CRUD operations require active Supabase configuration.
              </p>
            </div>
          </div>
        )}

        {/* Add/Edit Form Card */}
        {isFormOpen && (
          <div className="my-6 bg-warm-white p-6 rounded-xl border border-border-subtle shadow-card">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-border-subtle">
              <h2 className="font-serif text-lg text-charcoal">
                {editingFaq ? "Edit Practice FAQ" : "New Practice Guidance Entry"}
              </h2>
              <Link href="/admin/faqs" className="text-xs font-sans text-charcoal/60 hover:text-charcoal">
                Cancel
              </Link>
            </div>

            <form
              action={async (formData: FormData) => {
                "use server";
                await saveFaqAction(formData);
              }}
              className="space-y-4"
            >
              {editingFaq && <input type="hidden" name="id" value={editingFaq.id} />}

              <div>
                <label className="block text-xs font-sans font-medium text-charcoal mb-1">
                  Procedural Question <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  name="question"
                  defaultValue={editingFaq?.question || ""}
                  required
                  placeholder="e.g. What documentation is required prior to an initial corporate briefing?"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle bg-warm-ivory/50 text-charcoal text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans font-medium text-charcoal mb-1">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    name="category"
                    defaultValue={editingFaq?.category || "General"}
                    placeholder="General, Arbitration, Fees, Protocol"
                    className="w-full px-3.5 py-2 rounded-lg border border-border-subtle bg-warm-ivory/50 text-charcoal text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-medium text-charcoal mb-1">
                    Display Order Index
                  </label>
                  <input
                    type="number"
                    name="order_index"
                    defaultValue={editingFaq?.order_index || 0}
                    className="w-full px-3.5 py-2 rounded-lg border border-border-subtle bg-warm-ivory/50 text-charcoal text-xs font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-sans font-medium text-charcoal mb-1">
                  Chambers Guidance Answer <span className="text-red-700">*</span>
                </label>
                <textarea
                  name="answer"
                  rows={4}
                  defaultValue={editingFaq?.answer || ""}
                  required
                  placeholder="Provide precise, objective procedural guidance without speculative claims or legal advice..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle bg-warm-ivory/50 text-charcoal text-xs leading-relaxed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button href="/admin/faqs" variant="outline" size="sm">
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Save Guidance Item
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* FAQs List */}
        <div className="mt-6">
          {faqs.length === 0 ? (
            <div className="bg-warm-white p-12 text-center rounded-xl border border-dashed border-border-subtle">
              <p className="font-serif text-lg text-charcoal mb-2">No Practice Guidance FAQs</p>
              <p className="text-xs font-sans text-charcoal/60 max-w-md mx-auto mb-6">
                Chambers procedural guidelines and consultation FAQs have not yet been seeded.
                Add questions to assist clients with briefing requirements and clerking norms.
              </p>
              {!isFormOpen && (
                <Button href="/admin/faqs?action=new" variant="primary" size="sm" className="text-xs">
                  Add First Guidance FAQ +
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-warm-white p-5 rounded-xl border border-border-subtle shadow-xs hover:border-forest/30 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1.5 max-w-3xl">
                      <div className="flex items-center gap-2">
                        <Badge variant="pill" showDot={false}>
                          {faq.category}
                        </Badge>
                        <span className="text-[11px] font-mono text-charcoal/50">
                          #{faq.order_index}
                        </span>
                      </div>
                      <h3 className="font-serif text-base sm:text-lg text-charcoal font-medium">
                        {faq.question}
                      </h3>
                      <p className="text-xs font-sans text-charcoal/75 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-start shrink-0">
                      <Link
                        href={`/admin/faqs?edit=${faq.id}`}
                        className="text-xs text-forest font-medium hover:underline px-2 py-1"
                      >
                        Edit
                      </Link>
                      <form
                        action={async () => {
                          "use server";
                          await deleteFaqAction(faq.id);
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
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
