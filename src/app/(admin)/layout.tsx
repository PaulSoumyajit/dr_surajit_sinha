import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chambers Portal — Dr. Surajit Sinha Advocate",
  description: "Secure administrative management interface for chamber staff.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-canvas text-charcoal flex flex-col font-sans">
      {children}
    </div>
  );
}

