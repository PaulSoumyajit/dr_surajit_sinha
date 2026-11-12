"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface NavItem {
  label: string;
  href: string;
  badge?: number;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Articles & Monographs", href: "/admin/articles" },
  { label: "Practice FAQs", href: "/admin/faqs" },
  { label: "Consultation Inquiries", href: "/admin/inquiries" },
];

export function AdminNav({ unreadInquiriesCount = 0 }: { unreadInquiriesCount?: number }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const supabase = createClient();

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      if (supabase) {
        await supabase.auth.signOut();
      }
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-warm-white/95 backdrop-blur-md border-b border-border-subtle/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Monogram */}
          <div className="flex items-center gap-3">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded-sm"
            >
              <span className="w-8 h-8 rounded-full bg-forest-deep text-warm-ivory flex items-center justify-center font-serif text-sm font-semibold shadow-xs">
                SS
              </span>
              <span className="flex flex-col">
                <span className="font-serif text-base font-medium text-charcoal tracking-tight leading-none">
                  Dr. Surajit Sinha
                </span>
                <span className="text-[10px] font-sans text-charcoal/60 uppercase tracking-wider mt-0.5">
                  Chambers Administration
                </span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav aria-label="Admin Navigation" className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/admin/dashboard"
                  ? pathname === item.href
                  : pathname.startsWith(item.href);
              const showBadge = item.href === "/admin/inquiries" && unreadInquiriesCount > 0;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? "bg-forest-deep text-warm-ivory shadow-xs"
                      : "text-charcoal/75 hover:text-charcoal hover:bg-sand/60"
                  }`}
                >
                  <span>{item.label}</span>
                  {showBadge && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? "bg-warm-ivory text-forest-deep font-semibold"
                          : "bg-forest-deep text-warm-ivory"
                      }`}
                    >
                      {unreadInquiriesCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right utility buttons: View Public Site & Sign Out */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-sans text-charcoal/65 hover:text-charcoal flex items-center gap-1 transition-colors px-2 py-1 rounded"
              title="Open public website in new tab"
            >
              <span>View Public Folio</span>
              <span aria-hidden="true">↗</span>
            </Link>

            <div className="h-4 w-px bg-border-subtle" />

            <button
              type="button"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="text-xs font-sans font-medium text-red-900/80 hover:text-red-950 px-2.5 py-1.5 rounded-lg hover:bg-red-50/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              {isSigningOut ? "Signing out..." : "Sign Out"}
            </button>
          </div>

          {/* Mobile hamburger menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-charcoal hover:bg-sand/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle admin navigation menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border-subtle bg-warm-white px-4 pt-3 pb-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/admin/dashboard"
                ? pathname === item.href
                : pathname.startsWith(item.href);
            const showBadge = item.href === "/admin/inquiries" && unreadInquiriesCount > 0;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-sans font-medium ${
                  isActive
                    ? "bg-forest-deep text-warm-ivory font-semibold"
                    : "text-charcoal/80 hover:bg-sand/60"
                }`}
              >
                <span>{item.label}</span>
                {showBadge && (
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-sand text-charcoal">
                    {unreadInquiriesCount} unread
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-3 mt-2 border-t border-border-subtle flex flex-col gap-2">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-sm font-sans text-charcoal/70 hover:text-charcoal flex items-center justify-between"
            >
              <span>View Public Folio</span>
              <span aria-hidden="true">↗</span>
            </Link>

            <button
              type="button"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="text-left px-3 py-2 text-sm font-sans font-medium text-red-900 rounded-lg hover:bg-red-50"
            >
              {isSigningOut ? "Signing out..." : "Sign Out of Chambers"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

