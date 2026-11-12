import React from "react";
import type { Metadata } from "next";
import { CareerTimeline } from "@/components/sections/CareerTimeline";
import { AppointmentsList } from "@/components/sections/AppointmentsList";
import { SITE_CONFIG } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Career Journey & Professional Roles — Dr. Surajit Sinha",
  description:
    "Explore the professional career journey, public prosecution roles, criminal practice, and institutional associations of Dr. Surajit Sinha, Advocate.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/career`,
  },
  openGraph: {
    title: "Career Journey & Professional Roles — Dr. Surajit Sinha",
    description:
      "Explore the professional career journey, public prosecution roles, criminal practice, and institutional associations of Dr. Surajit Sinha, Advocate.",
    url: `${SITE_CONFIG.url}/career`,
    type: "profile",
    locale: "en_IN",
  },
};

/**
 * Career Journey Page (P5-05)
 *
 * Route: /career
 * Presents counsel's career milestones, professional trajectory,
 * and verified institutional appointments.
 */
export default function CareerPage() {
  return (
    <>
      {/* 1. Career Trajectory & Interactive Milestone Tracker */}
      <CareerTimeline />

      {/* 2. Notable Institutional Appointments & Retainers */}
      <AppointmentsList />
    </>
  );
}
