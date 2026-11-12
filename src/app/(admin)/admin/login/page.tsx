"use client";

import React, { useState, useId, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";

type AuthMode = "password" | "magic-link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/admin/dashboard";
  const urlError = searchParams.get("error");

  const [authMode, setAuthMode] = useState<AuthMode>("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(urlError);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const emailId = useId();
  const passwordId = useId();

  const supabase = createClient();

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!supabase) {
      setErrorMessage(
        "Supabase configuration is not provisioned in environment variables. Please configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
      );
      return;
    }

    if (!email.trim() || !password) {
      setErrorMessage("Please enter both your chambers email address and password.");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setErrorMessage(error.message || "Invalid authentication credentials.");
        setIsLoading(false);
        return;
      }

      if (data.user) {
        // Safe internal redirect
        const safeTarget =
          returnTo.startsWith("/") && !returnTo.startsWith("//")
            ? returnTo
            : "/admin/dashboard";
        router.push(safeTarget);
      }
    } catch {
      setErrorMessage("An unexpected authentication error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  const handleMagicLinkLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setMagicLinkSent(false);

    if (!supabase) {
      setErrorMessage(
        "Supabase configuration is not provisioned in environment variables. Magic-link dispatch requires active Supabase Auth credentials."
      );
      return;
    }

    if (!email.trim()) {
      setErrorMessage("Please enter your registered chambers email address.");
      return;
    }

    setIsLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/auth/callback?returnTo=${encodeURIComponent(returnTo)}`;
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: redirectUrl,
        },
      });

      if (error) {
        setErrorMessage(error.message || "Failed to transmit magic-link token.");
        setIsLoading(false);
        return;
      }

      setMagicLinkSent(true);
      setIsLoading(false);
    } catch {
      setErrorMessage("An unexpected network error occurred while dispatching the magic link.");
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-warm-white/90 backdrop-blur-md py-8 px-6 sm:px-10 shadow-card rounded-2xl border border-navy-light/20">
      {/* Missing Supabase configuration advisory */}
      {!supabase && (
        <div
          role="alert"
          className="mb-6 p-3.5 rounded-lg bg-sand/60 border border-border-subtle text-xs text-charcoal/80 leading-relaxed"
        >
          <p className="font-semibold text-charcoal flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-amber-600 inline-block" />
            Infrastructure Setup Pending
          </p>
          Supabase authentication credentials are not configured in environment variables.
          To activate back-office functions, populate{" "}
          <code className="px-1 py-0.5 bg-canvas rounded font-mono text-[11px]">
            NEXT_PUBLIC_SUPABASE_URL
          </code>{" "}
          and{" "}
          <code className="px-1 py-0.5 bg-canvas rounded font-mono text-[11px]">
            NEXT_PUBLIC_SUPABASE_ANON_KEY
          </code>
          .
        </div>
      )}

      {/* Mode Selector Tabs */}
      <div className="flex border-b border-border-subtle mb-6 text-xs font-sans">
        <button
          type="button"
          onClick={() => {
            setAuthMode("password");
            setErrorMessage(null);
          }}
          className={`pb-2.5 px-3 font-medium transition-colors border-b-2 -mb-px ${
            authMode === "password"
              ? "border-forest-deep text-forest-deep font-semibold"
              : "border-transparent text-charcoal/60 hover:text-charcoal"
          }`}
        >
          Chambers Password
        </button>
        <button
          type="button"
          onClick={() => {
            setAuthMode("magic-link");
            setErrorMessage(null);
          }}
          className={`pb-2.5 px-3 font-medium transition-colors border-b-2 -mb-px ${
            authMode === "magic-link"
              ? "border-forest-deep text-forest-deep font-semibold"
              : "border-transparent text-charcoal/60 hover:text-charcoal"
          }`}
        >
          Magic Link Dispatch
        </button>
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div
          role="alert"
          className="mb-5 p-3 rounded-lg bg-red-50/80 border border-red-200/80 text-xs text-red-900 leading-relaxed"
        >
          {errorMessage}
        </div>
      )}

      {/* Magic Link Confirmation View */}
      {magicLinkSent && authMode === "magic-link" ? (
        <div className="py-4 text-center">
          <div className="w-10 h-10 rounded-full bg-forest-deep/10 text-forest-deep mx-auto flex items-center justify-center mb-3">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
          </div>
          <h2 className="font-serif text-lg text-charcoal">Magic Link Dispatched</h2>
          <p className="mt-1 text-xs text-charcoal/70 leading-relaxed">
            An authentication token has been dispatched to{" "}
            <span className="font-semibold text-charcoal">{email}</span>. Click the link in
            your inbox to access chambers administration.
          </p>
          <button
            type="button"
            onClick={() => setMagicLinkSent(false)}
            className="mt-4 text-xs text-forest-deep font-medium hover:underline"
          >
            Dispatch another link or change email
          </button>
        </div>
      ) : (
        /* Authentication Form */
        <form
          onSubmit={authMode === "password" ? handlePasswordLogin : handleMagicLinkLogin}
          className="space-y-4"
          noValidate
        >
          <div>
            <label
              htmlFor={emailId}
              className="block text-xs font-sans font-medium text-charcoal mb-1"
            >
              Chambers Email Address
            </label>
            <input
              id={emailId}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              placeholder="counsel@chambers.internal"
              className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle bg-warm-ivory/50 text-charcoal text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest transition-colors"
            />
          </div>

          {authMode === "password" && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor={passwordId}
                  className="block text-xs font-sans font-medium text-charcoal"
                >
                  Administrative Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[11px] font-sans text-charcoal/60 hover:text-charcoal focus-visible:outline-none focus-visible:underline"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <div className="relative">
                <input
                  id={passwordId}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle bg-warm-ivory/50 text-charcoal text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest transition-colors"
                />
              </div>
            </div>
          )}

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              className="w-full py-2.5 text-xs font-medium tracking-wide uppercase justify-center"
            >
              {isLoading
                ? "Authenticating..."
                : authMode === "password"
                ? "Access Chambers Dashboard →"
                : "Transmit Magic Link →"}
            </Button>
          </div>
        </form>
      )}

      {/* Regulatory & Security Notice */}
      <div className="mt-6 pt-5 border-t border-border-subtle/80 text-center">
        <p className="text-[11px] font-sans text-charcoal/60 leading-relaxed">
          Public registration is disabled. Administrative clearance is granted exclusively to
          authorized counsel and chamber clerks through verified registry provisioning.
        </p>
        <div className="mt-3">
          <Link
            href="/"
            className="text-xs font-sans font-medium text-forest hover:underline inline-flex items-center gap-1"
          >
            <span aria-hidden="true">&larr;</span> Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-canvas flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Chambers Monogram / Brand */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded-sm"
        >
          <span className="w-9 h-9 rounded-full bg-forest-deep text-warm-ivory flex items-center justify-center font-serif text-base font-semibold shadow-sm">
            SS
          </span>
          <span className="font-serif text-lg font-medium text-charcoal tracking-tight">
            Dr. Surajit Sinha, Advocate
          </span>
        </Link>
        <h1 className="mt-4 font-serif text-2xl sm:text-3xl font-normal text-charcoal">
          Chambers Portal
        </h1>
        <p className="mt-1.5 text-xs font-sans text-charcoal/65 tracking-wide uppercase">
          Authorized Administrative Access Only
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <Suspense
          fallback={
            <div className="bg-warm-white/90 p-8 rounded-2xl border border-navy-light/20 text-center text-xs text-charcoal/60">
              Loading chambers authentication portal...
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
