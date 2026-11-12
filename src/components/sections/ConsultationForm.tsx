"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ConsultationFeedback } from "@/components/sections/ConsultationFeedback";
import {
  validateInquiryPayload,
  ALLOWED_MATTER_CATEGORIES,
} from "@/lib/validation";
import { cn } from "@/lib/utils";
import type { MatterCategory } from "@/types";

export interface ConsultationFormProps {
  className?: string;
}

interface FormState {
  full_name: string;
  organization: string;
  email: string;
  telephone: string;
  category: MatterCategory | "";
  message: string;
  disclaimer_accepted: boolean;
}

const INITIAL_FORM_STATE: FormState = {
  full_name: "",
  organization: "",
  email: "",
  telephone: "",
  category: "",
  message: "",
  disclaimer_accepted: false,
};

/**
 * Secure Consultation Intake Form (P8-02)
 *
 * Implements preliminary briefing intake under strict BCI Rule 36 compliance:
 * - Structured matter intake with field-level validation and sanitization.
 * - Mandatory non-solicitation acknowledgment checkbox.
 * - Explicit confidentiality warning prohibiting premature transmission of privileged records.
 * - Accessible input controls with visible focus rings and aria-describedby error associations.
 * - Preserves user input across recoverable submission errors.
 */
export function ConsultationForm({ className }: ConsultationFormProps) {
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear field-specific error on change
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }

    if (serverError) {
      setServerError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);

    // Client-side pre-validation
    const validation = validateInquiryPayload(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validation.data),
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result?.success) {
        setSubmissionSuccess(true);
        setFormData(INITIAL_FORM_STATE);
        setErrors({});
      } else {
        // Handle server-side validation, rate limiting, or backend unconfigured
        if (result?.errors && typeof result.errors === "object") {
          setErrors(result.errors);
        }
        setServerError(
          result?.error ||
            "Unable to submit inquiry at this time. Please try again later or arrange an appointment directly."
        );
      }
    } catch {
      setServerError(
        "Network connection interrupted. Please verify your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmissionSuccess(false);
    setServerError(null);
    setFormData(INITIAL_FORM_STATE);
    setErrors({});
  };

  // When submission succeeds, show verified success monograph
  if (submissionSuccess) {
    return <ConsultationFeedback status="success" onReset={handleReset} className={className} />;
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border-subtle bg-surface-card p-6 sm:p-8 md:p-10 shadow-xs",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest/20 to-transparent"
        aria-hidden="true"
      />

      {/* Form Section Header */}
      <div className="mb-8">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-forest block mb-2">
          MATTER INTAKE &bull; CONSULTATION BRIEF
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl font-normal text-charcoal tracking-tight">
          Preliminary Matter Consultation
        </h3>
        <p className="mt-2 text-sm font-sans text-charcoal/75 leading-relaxed">
          Provide high-level details regarding your corporate mandate or dispute proceeding.
          All inquiries are received confidentially and undergo immediate conflict clearance.
        </p>
      </div>

      {/* Server Error Alert (Preserves Form Input) */}
      {serverError && (
        <div className="mb-6">
          <ConsultationFeedback status="error" errorMessage={serverError} />
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label
              htmlFor="full_name"
              className="block text-xs font-sans font-semibold uppercase tracking-wider text-charcoal mb-2"
            >
              Full Name <span className="text-forest">*</span>
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              autoComplete="name"
              required
              value={formData.full_name}
              onChange={handleChange}
              aria-invalid={Boolean(errors.full_name)}
              aria-describedby={errors.full_name ? "full_name-error" : undefined}
              placeholder="e.g. Anandita Verma"
              className={cn(
                "w-full rounded-xl border bg-primary-canvas px-4 py-3 text-sm font-sans text-charcoal transition-all",
                "focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20",
                errors.full_name ? "border-red-600 ring-1 ring-red-600" : "border-border-subtle"
              )}
            />
            {errors.full_name && (
              <p id="full_name-error" className="mt-1.5 text-xs text-red-600 font-sans">
                {errors.full_name}
              </p>
            )}
          </div>

          {/* Organization */}
          <div>
            <label
              htmlFor="organization"
              className="block text-xs font-sans font-semibold uppercase tracking-wider text-charcoal mb-2"
            >
              Organization / Enterprise <span className="text-charcoal/40 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              id="organization"
              name="organization"
              autoComplete="organization"
              value={formData.organization}
              onChange={handleChange}
              placeholder="e.g. Apex Holdings Pvt Ltd"
              className="w-full rounded-xl border border-border-subtle bg-primary-canvas px-4 py-3 text-sm font-sans text-charcoal transition-all focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-sans font-semibold uppercase tracking-wider text-charcoal mb-2"
            >
              Email Address <span className="text-forest">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              placeholder="counsel@enterprise.com"
              className={cn(
                "w-full rounded-xl border bg-primary-canvas px-4 py-3 text-sm font-sans text-charcoal transition-all",
                "focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20",
                errors.email ? "border-red-600 ring-1 ring-red-600" : "border-border-subtle"
              )}
            />
            {errors.email && (
              <p id="email-error" className="mt-1.5 text-xs text-red-600 font-sans">
                {errors.email}
              </p>
            )}
          </div>

          {/* Telephone */}
          <div>
            <label
              htmlFor="telephone"
              className="block text-xs font-sans font-semibold uppercase tracking-wider text-charcoal mb-2"
            >
              Telephone / Direct Line <span className="text-charcoal/40 font-normal">(Optional)</span>
            </label>
            <input
              type="tel"
              id="telephone"
              name="telephone"
              autoComplete="tel"
              value={formData.telephone}
              onChange={handleChange}
              placeholder="+91 (0) 98765 43210"
              className={cn(
                "w-full rounded-xl border bg-primary-canvas px-4 py-3 text-sm font-sans text-charcoal transition-all",
                "focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20",
                errors.telephone ? "border-red-600 ring-1 ring-red-600" : "border-border-subtle"
              )}
            />
            {errors.telephone && (
              <p id="telephone-error" className="mt-1.5 text-xs text-red-600 font-sans">
                {errors.telephone}
              </p>
            )}
          </div>
        </div>

        {/* Matter Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-xs font-sans font-semibold uppercase tracking-wider text-charcoal mb-2"
          >
            Matter Category <span className="text-forest">*</span>
          </label>
          <select
            id="category"
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            aria-invalid={Boolean(errors.category)}
            aria-describedby={errors.category ? "category-error" : undefined}
            className={cn(
              "w-full rounded-xl border bg-primary-canvas px-4 py-3 text-sm font-sans text-charcoal transition-all cursor-pointer",
              "focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20",
              errors.category ? "border-red-600 ring-1 ring-red-600" : "border-border-subtle"
            )}
          >
            <option value="" disabled>
              Select applicable legal domain...
            </option>
            {ALLOWED_MATTER_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p id="category-error" className="mt-1.5 text-xs text-red-600 font-sans">
              {errors.category}
            </p>
          )}
        </div>

        {/* Brief Overview */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="message"
              className="block text-xs font-sans font-semibold uppercase tracking-wider text-charcoal"
            >
              Brief Overview <span className="text-forest">*</span>
            </label>
            <span className="text-[11px] font-sans text-charcoal/50">
              {formData.message.length} / 3000 chars
            </span>
          </div>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : "message-note"}
            placeholder="Please outline the high-level subject matter, relevant jurisdiction, and prospective urgency. Do not include confidential, privileged, or time-sensitive court documents."
            className={cn(
              "w-full rounded-xl border bg-primary-canvas p-4 text-sm font-sans text-charcoal transition-all leading-relaxed",
              "focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20",
              errors.message ? "border-red-600 ring-1 ring-red-600" : "border-border-subtle"
            )}
          />
          {errors.message ? (
            <p id="message-error" className="mt-1.5 text-xs text-red-600 font-sans">
              {errors.message}
            </p>
          ) : (
            <p id="message-note" className="mt-1.5 text-xs text-charcoal/60 font-sans">
              State the parties involved for preliminary conflict verification.
            </p>
          )}
        </div>

        {/* Mandatory Privacy & Confidentiality Pre-Submission Notice */}
        <div className="p-4 rounded-xl bg-surface border border-border-subtle text-xs font-sans text-charcoal/70 leading-relaxed space-y-1.5">
          <p className="font-semibold text-charcoal uppercase tracking-wider text-[11px]">
            Privilege &bull; Confidentiality Notice
          </p>
          <p>
            Please note: Transmitting an enquiry through this form does not establish an advocate-client relationship.
            Confidential, privileged, or time-sensitive legal documents should not be sent prior to the formal
            execution of an engagement letter and conflict clearance.
          </p>
        </div>

        {/* Mandatory Acknowledgement Checkbox */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              name="disclaimer_accepted"
              checked={formData.disclaimer_accepted}
              onChange={handleChange}
              aria-invalid={Boolean(errors.disclaimer_accepted)}
              aria-describedby={errors.disclaimer_accepted ? "disclaimer-error" : undefined}
              className="mt-1 h-4 w-4 rounded border-border-subtle text-forest focus:ring-forest/20 accent-forest cursor-pointer"
            />
            <span className="text-xs font-sans text-charcoal/85 leading-normal">
              I understand that submitting this enquiry does not create an advocate-client relationship.{" "}
              <span className="text-forest font-semibold">*</span>
            </span>
          </label>
          {errors.disclaimer_accepted && (
            <p id="disclaimer-error" className="mt-1.5 pl-7 text-xs text-red-600 font-sans">
              {errors.disclaimer_accepted}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-border-subtle/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            showArrow={!isSubmitting}
            disabled={isSubmitting}
            className="w-full sm:w-auto min-w-[200px]"
          >
            {isSubmitting ? "Transmitting..." : "Submit Consultation Enquiry"}
          </Button>

          <span className="text-[11px] font-sans text-charcoal/55 leading-tight">
            Encrypted submission &bull; BCI Rule 36 compliant
          </span>
        </div>
      </form>
    </div>
  );
}

