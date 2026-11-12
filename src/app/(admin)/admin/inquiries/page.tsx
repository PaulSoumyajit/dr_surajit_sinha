import React from "react";
import Link from "next/link";
import { AdminNav } from "@/components/cms/AdminNav";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { updateInquiryStatusAction, deleteInquiryAction } from "./actions";
import type { ConsultationInquiry } from "@/types";

export const dynamic = "force-dynamic";

interface InquiriesPageProps {
  searchParams: Promise<{
    view?: string;
    status?: string;
  }>;
}

export default async function AdminInquiriesPage({ searchParams }: InquiriesPageProps) {
  const { view: viewId, status: statusFilter } = await searchParams;

  const supabase = await createClient();

  let inquiries: ConsultationInquiry[] = [];
  let selectedInquiry: ConsultationInquiry | undefined = undefined;
  let unreadCount = 0;

  if (supabase) {
    let query = supabase
      .from("contact_inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (statusFilter && ["unread", "reviewed", "archived"].includes(statusFilter)) {
      query = query.eq("status", statusFilter);
    }

    const { data } = await query;
    inquiries = (data as ConsultationInquiry[]) || [];

    const { count } = await supabase
      .from("contact_inquiries")
      .select("*", { count: "exact", head: true })
      .eq("status", "unread");
    unreadCount = count || 0;

    if (viewId) {
      selectedInquiry = inquiries.find((i) => i.id === viewId);
      if (!selectedInquiry) {
        const { data: single } = await supabase
          .from("contact_inquiries")
          .select("*")
          .eq("id", viewId)
          .single();
        selectedInquiry = (single as ConsultationInquiry) || undefined;
      }
    }
  }

  return (
    <div className="min-h-screen bg-canvas pb-20">
      <AdminNav unreadInquiriesCount={unreadCount} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        {/* Header */}
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
              <span className="text-xs font-sans text-charcoal font-medium">Matter Inquiries</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
              Consultation Intake Inbox
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs font-sans text-charcoal/70">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 inline-block" />
            <span>{unreadCount} Unread Matters Pending Clerking Review</span>
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
                Database Storage Unconfigured
              </p>
              <p className="leading-relaxed">
                Supabase database credentials are not configured in environment variables.
                Inquiry persistence and review workflows require active Supabase setup.
              </p>
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="mt-6 flex items-center gap-1 border-b border-border-subtle text-xs font-sans">
          {[
            { label: "All Enquiries", val: "" },
            { label: "Unread", val: "unread" },
            { label: "Reviewed", val: "reviewed" },
            { label: "Archived", val: "archived" },
          ].map((tab) => {
            const isActive = (statusFilter || "") === tab.val;
            const href = tab.val ? `/admin/inquiries?status=${tab.val}` : "/admin/inquiries";
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

        {/* Inquiries Table */}
        <div className="mt-6">
          {inquiries.length === 0 ? (
            <div className="bg-warm-white p-12 text-center rounded-xl border border-dashed border-border-subtle">
              <p className="font-serif text-lg text-charcoal mb-2">No Consultation Enquiries</p>
              <p className="text-xs font-sans text-charcoal/60 max-w-md mx-auto">
                {statusFilter
                  ? `There are currently no enquiries marked as '${statusFilter}'.`
                  : "No preliminary consultation briefings have been submitted through the portal."}
              </p>
            </div>
          ) : (
            <div className="bg-warm-white rounded-xl border border-border-subtle overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs font-sans">
                  <thead>
                    <tr className="border-b border-border-subtle bg-sand/40 text-charcoal/70 uppercase tracking-wider text-[11px]">
                      <th className="py-3 px-4 font-semibold">Client / Sender</th>
                      <th className="py-3 px-4 font-semibold">Matter Domain</th>
                      <th className="py-3 px-4 font-semibold">Status</th>
                      <th className="py-3 px-4 font-semibold">Transmitted</th>
                      <th className="py-3 px-4 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle/60">
                    {inquiries.map((inq) => (
                      <tr
                        key={inq.id}
                        className={`hover:bg-sand/30 transition-colors ${
                          inq.status === "unread" ? "bg-sand/20 font-medium" : ""
                        }`}
                      >
                        <td className="py-3.5 px-4">
                          <p className="font-medium text-sm text-charcoal">{inq.full_name}</p>
                          <p className="text-charcoal/60 text-xs mt-0.5">
                            {inq.organization ? `${inq.organization} · ` : ""}
                            {inq.email}
                          </p>
                        </td>
                        <td className="py-3.5 px-4 text-charcoal/80">{inq.category}</td>
                        <td className="py-3.5 px-4">
                          <Badge variant="pill" showDot={inq.status === "unread"}>
                            {inq.status}
                          </Badge>
                        </td>
                        <td className="py-3.5 px-4 text-charcoal/70">
                          {new Date(inq.created_at).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <Link
                            href={`/admin/inquiries?view=${inq.id}${
                              statusFilter ? `&status=${statusFilter}` : ""
                            }`}
                            className="text-xs text-forest font-semibold hover:underline px-2.5 py-1 rounded bg-sand/60 hover:bg-sand transition-colors inline-block"
                          >
                            Open Briefing →
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Selected Inquiry Modal / Folio View */}
        {selectedInquiry && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="inquiry-detail-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/40 backdrop-blur-xs"
          >
            <div className="bg-warm-white rounded-2xl border border-navy-light/20 p-6 sm:p-8 max-w-2xl w-full shadow-card max-h-[90vh] overflow-y-auto space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 border-b border-border-subtle pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Badge variant="pill" showDot={selectedInquiry.status === "unread"}>
                      {selectedInquiry.status}
                    </Badge>
                    <span className="text-xs font-mono text-charcoal/60">
                      {new Date(selectedInquiry.created_at).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <h2 id="inquiry-detail-title" className="font-serif text-2xl text-charcoal">
                    {selectedInquiry.full_name}
                  </h2>
                  {selectedInquiry.organization && (
                    <p className="text-xs font-sans text-charcoal/70 mt-0.5">
                      {selectedInquiry.organization}
                    </p>
                  )}
                </div>

                <Link
                  href={statusFilter ? `/admin/inquiries?status=${statusFilter}` : "/admin/inquiries"}
                  className="text-charcoal/50 hover:text-charcoal p-1 text-sm font-sans"
                  aria-label="Close inquiry detail"
                >
                  ✕
                </Link>
              </div>

              {/* Contact Information Card */}
              <div className="bg-sand/40 p-4 rounded-xl border border-border-subtle/80 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                <div>
                  <span className="text-charcoal/60 uppercase tracking-wider block mb-0.5 text-[10px]">
                    Email Address
                  </span>
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    className="font-medium text-forest hover:underline"
                  >
                    {selectedInquiry.email}
                  </a>
                </div>

                <div>
                  <span className="text-charcoal/60 uppercase tracking-wider block mb-0.5 text-[10px]">
                    Telephone / Registry Line
                  </span>
                  <span className="font-medium text-charcoal">
                    {selectedInquiry.telephone || "Not provided"}
                  </span>
                </div>

                <div>
                  <span className="text-charcoal/60 uppercase tracking-wider block mb-0.5 text-[10px]">
                    Matter Domain Category
                  </span>
                  <span className="font-medium text-charcoal">{selectedInquiry.category}</span>
                </div>

                <div>
                  <span className="text-charcoal/60 uppercase tracking-wider block mb-0.5 text-[10px]">
                    Regulatory Acknowledgment
                  </span>
                  <span className="text-forest font-medium">✓ BCI Rule 36 Confirmed</span>
                </div>
              </div>

              {/* Submitted Message Body (Safely escaped text rendering) */}
              <div>
                <h3 className="text-xs font-sans font-semibold uppercase tracking-wider text-charcoal/60 mb-2">
                  Transmitted Consultation Synopsis
                </h3>
                <div className="bg-warm-ivory/60 p-4 rounded-xl border border-border-subtle/80 text-xs sm:text-sm font-sans text-charcoal leading-relaxed whitespace-pre-wrap select-text">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Clerking Status Actions */}
              <div className="pt-4 border-t border-border-subtle flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  {selectedInquiry.status !== "reviewed" && (
                    <form
                      action={async () => {
                        "use server";
                        await updateInquiryStatusAction(selectedInquiry!.id, "reviewed");
                      }}
                    >
                      <Button type="submit" variant="primary" size="sm" className="text-xs">
                        Mark as Reviewed ✓
                      </Button>
                    </form>
                  )}

                  {selectedInquiry.status !== "unread" && (
                    <form
                      action={async () => {
                        "use server";
                        await updateInquiryStatusAction(selectedInquiry!.id, "unread");
                      }}
                    >
                      <Button type="submit" variant="outline" size="sm" className="text-xs">
                        Return to Unread
                      </Button>
                    </form>
                  )}

                  {selectedInquiry.status !== "archived" && (
                    <form
                      action={async () => {
                        "use server";
                        await updateInquiryStatusAction(selectedInquiry!.id, "archived");
                      }}
                    >
                      <Button
                        type="submit"
                        variant="outline"
                        size="sm"
                        className="text-xs text-charcoal/60"
                      >
                        Archive
                      </Button>
                    </form>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <form
                    action={async () => {
                      "use server";
                      await deleteInquiryAction(selectedInquiry!.id);
                    }}
                  >
                    <button
                      type="submit"
                      className="text-xs text-red-900/70 hover:text-red-950 px-2.5 py-1.5 rounded hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </button>
                  </form>

                  <Button
                    href={statusFilter ? `/admin/inquiries?status=${statusFilter}` : "/admin/inquiries"}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
