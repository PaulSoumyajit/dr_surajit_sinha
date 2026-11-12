"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { generateSlug } from "@/lib/slug";
import { saveArticleAction } from "@/app/(admin)/admin/articles/actions";
import type { Article, Category, ArticleStatus } from "@/types";

interface ArticleEditorProps {
  initialArticle?: Partial<Article>;
  categories: Category[];
}

export function ArticleEditor({ initialArticle, categories }: ArticleEditorProps) {
  const router = useRouter();

  const [id] = useState(initialArticle?.id || "");
  const [title, setTitle] = useState(initialArticle?.title || "");
  const [slug, setSlug] = useState(initialArticle?.slug || "");
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(!!initialArticle?.slug);
  const [categoryId, setCategoryId] = useState(initialArticle?.category_id || "");
  const [excerpt, setExcerpt] = useState(initialArticle?.excerpt || "");
  const [contentMd, setContentMd] = useState(initialArticle?.content_md || "");
  const [coverImageUrl, setCoverImageUrl] = useState(initialArticle?.cover_image_url || "");
  const [status, setStatus] = useState<ArticleStatus>(initialArticle?.status || "draft");

  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);

  // Auto-generate slug from title if user has not manually modified slug
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isSlugManuallyEdited) {
      setSlug(generateSlug(val));
    }
  };

  const handleSlugChange = (val: string) => {
    setIsSlugManuallyEdited(true);
    setSlug(generateSlug(val));
  };

  const executeSave = async (targetStatus: ArticleStatus) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSubmitting(true);
    setShowPublishConfirm(false);

    const formData = new FormData();
    if (id) formData.append("id", id);
    formData.append("title", title);
    formData.append("slug", slug || generateSlug(title));
    formData.append("category_id", categoryId);
    formData.append("excerpt", excerpt);
    formData.append("content_md", contentMd);
    if (coverImageUrl) formData.append("cover_image_url", coverImageUrl);
    formData.append("status", targetStatus);

    const res = await saveArticleAction(formData);

    if (!res.success) {
      setErrorMessage(res.error || "Failed to save article.");
      setIsSubmitting(false);
      return;
    }

    setStatus(targetStatus);
    setSuccessMessage(
      targetStatus === "published"
        ? "Monograph successfully published to the live Insights folio."
        : targetStatus === "archived"
        ? "Monograph moved to chambers archive."
        : "Draft saved successfully."
    );
    setIsSubmitting(false);
    router.refresh();
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-warm-white p-4 sm:p-5 rounded-xl border border-border-subtle shadow-xs">
        <div className="flex items-center gap-3">
          <Badge variant="pill" showDot={status === "published"}>
            {status}
          </Badge>
          <span className="text-xs font-sans text-charcoal/60">
            {id ? "Editing Existing Monograph" : "New Monograph Draft"}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Mobile Edit/Preview tab switcher */}
          <div className="xl:hidden flex rounded-lg border border-border-subtle p-0.5 bg-sand/40 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab("edit")}
              className={`px-3 py-1 rounded-md transition-colors ${
                activeTab === "edit" ? "bg-warm-white font-medium text-charcoal shadow-xs" : "text-charcoal/60"
              }`}
            >
              Editor
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`px-3 py-1 rounded-md transition-colors ${
                activeTab === "preview" ? "bg-warm-white font-medium text-charcoal shadow-xs" : "text-charcoal/60"
              }`}
            >
              Live Preview
            </button>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isSubmitting}
            onClick={() => executeSave("draft")}
            className="text-xs"
          >
            Save Draft
          </Button>

          {status === "published" ? (
            <>
              <Button
                type="button"
                variant="primary"
                size="sm"
                disabled={isSubmitting}
                onClick={() => executeSave("published")}
                className="text-xs"
              >
                {isSubmitting ? "Updating..." : "Update Published"}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isSubmitting}
                onClick={() => executeSave("draft")}
                className="text-xs text-amber-800"
              >
                Unpublish
              </Button>
            </>
          ) : (
            <Button
              type="button"
              variant="primary"
              size="sm"
              disabled={isSubmitting}
              onClick={() => setShowPublishConfirm(true)}
              className="text-xs"
            >
              Publish Monograph →
            </Button>
          )}

          {status !== "archived" && id && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isSubmitting}
              onClick={() => executeSave("archived")}
              className="text-xs text-charcoal/60"
            >
              Archive
            </Button>
          )}
        </div>
      </div>

      {/* Editorial Legal Approval Advisory Banner */}
      <div className="p-3.5 rounded-lg bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 leading-relaxed flex items-start gap-2.5">
        <svg
          className="w-4 h-4 text-amber-700 shrink-0 mt-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
        <p>
          <span className="font-semibold">Counsel Review Requirement:</span> In accordance with Bar
          Council of India Rule 36, all legal essays, commentaries, and statutory analyses must be
          formally reviewed and approved by Dr. Surajit Sinha, Advocate prior to publication.
        </p>
      </div>

      {/* Confirmation Modal for Publication */}
      {showPublishConfirm && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/40 backdrop-blur-xs"
        >
          <div className="bg-warm-white rounded-2xl border border-navy-light/20 p-6 max-w-md w-full shadow-card space-y-4">
            <h3 className="font-serif text-lg text-charcoal">Confirm Publication to Public Folio</h3>
            <p className="text-xs font-sans text-charcoal/75 leading-relaxed">
              Publishing will make this monograph immediately available on the public website at{" "}
              <code className="px-1 py-0.5 bg-canvas rounded font-mono text-[11px]">
                /insights/{slug}
              </code>
              . Has this text received formal clearance from counsel?
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowPublishConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => executeSave("published")}
              >
                Confirm &amp; Publish
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Banners */}
      {errorMessage && (
        <div
          role="alert"
          className="p-3.5 rounded-lg bg-red-50/80 border border-red-200/80 text-xs text-red-900 leading-relaxed"
        >
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div
          role="status"
          className="p-3.5 rounded-lg bg-forest/10 border border-forest/20 text-xs text-forest-deep leading-relaxed"
        >
          {successMessage}
        </div>
      )}

      {/* Split-View Working Area: Form + Live Preview */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
        {/* Left Column: Form & Markdown Source */}
        <div className={`space-y-4 ${activeTab === "preview" ? "hidden xl:block" : "block"}`}>
          {/* Metadata Card */}
          <div className="bg-warm-white p-5 rounded-xl border border-border-subtle shadow-xs space-y-4">
            <div>
              <label className="block text-xs font-sans font-medium text-charcoal mb-1">
                Monograph Title <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Navigating Corporate Insolvency under IBC 2016"
                className="w-full px-3.5 py-2 rounded-lg border border-border-subtle bg-warm-ivory/50 text-charcoal text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-sans font-medium text-charcoal mb-1">
                  URL Route Slug <span className="text-red-700">*</span>
                </label>
                <div className="flex items-center">
                  <span className="px-2.5 py-2 bg-sand/60 border border-r-0 border-border-subtle rounded-l-lg text-xs font-mono text-charcoal/60">
                    /insights/
                  </span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => handleSlugChange(e.target.value)}
                    placeholder="corporate-insolvency-ibc"
                    className="w-full px-2.5 py-2 rounded-r-lg border border-border-subtle bg-warm-ivory/50 text-charcoal text-xs font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-sans font-medium text-charcoal mb-1">
                  Practice Domain Category
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-warm-ivory/50 text-charcoal text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
                >
                  <option value="none">Uncategorized</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-sans font-medium text-charcoal mb-1">
                Editorial Abstract / Excerpt <span className="text-red-700">*</span>
              </label>
              <textarea
                rows={2}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A concise synopsis of the legal principle, statutory question, or procedural consideration examined..."
                className="w-full px-3.5 py-2 rounded-lg border border-border-subtle bg-warm-ivory/50 text-charcoal text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
              />
            </div>

            <div>
              <label className="block text-xs font-sans font-medium text-charcoal mb-1">
                Cover Image URL (Optional)
              </label>
              <input
                type="url"
                value={coverImageUrl}
                onChange={(e) => setCoverImageUrl(e.target.value)}
                placeholder="https://... (valid image URL)"
                className="w-full px-3.5 py-2 rounded-lg border border-border-subtle bg-warm-ivory/50 text-charcoal text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
              />
            </div>
          </div>

          {/* Markdown Content Area */}
          <div className="bg-warm-white p-5 rounded-xl border border-border-subtle shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-sans font-medium text-charcoal">
                Monograph Body (Markdown) <span className="text-red-700">*</span>
              </label>
              <span className="text-[11px] font-mono text-charcoal/60">
                {contentMd.split(/\s+/).filter(Boolean).length} words
              </span>
            </div>

            <textarea
              rows={20}
              value={contentMd}
              onChange={(e) => setContentMd(e.target.value)}
              placeholder="Write your legal monograph in Markdown..."
              className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-warm-ivory/30 text-charcoal font-mono text-xs leading-relaxed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
            />
          </div>
        </div>

        {/* Right Column: Live Editorial Preview */}
        <div className={`space-y-4 ${activeTab === "edit" ? "hidden xl:block" : "block"}`}>
          <div className="bg-warm-white p-6 rounded-xl border border-border-subtle shadow-xs sticky top-20 max-h-[82vh] overflow-y-auto">
            <div className="pb-4 mb-6 border-b border-border-subtle flex items-center justify-between">
              <span className="text-xs font-sans font-semibold uppercase tracking-wider text-forest-deep">
                Live Editorial Preview
              </span>
              <span className="text-xs font-sans text-charcoal/60">
                Matches Public /insights/[slug]
              </span>
            </div>

            {/* Simulated Header */}
            <div className="mb-6">
              <span className="text-xs font-mono text-charcoal/60 block mb-2">
                /{slug || "slug-placeholder"}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
                {title || "Untitled Monograph"}
              </h2>
              {excerpt && (
                <p className="mt-3 text-sm font-sans text-charcoal/70 leading-relaxed italic">
                  {excerpt}
                </p>
              )}
            </div>

            {/* Rendered Markdown Body */}
            {contentMd.trim() ? (
              <div className="border-t border-border-subtle/60 pt-6">
                <MarkdownRenderer content={contentMd} />
              </div>
            ) : (
              <div className="py-12 text-center text-xs font-sans text-charcoal/50 border border-dashed border-border-subtle rounded-lg">
                Enter markdown text on the left to see the formatted legal folio preview.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
