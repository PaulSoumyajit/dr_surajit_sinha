import React from "react";
import { SiteShell } from "@/components/layout/SiteShell";

export interface PublicLayoutProps {
  children: React.ReactNode;
}

/**
 * Public Route Group Layout
 *
 * Encapsulates all public folios, essays, and profile sections within the SiteShell.
 * Ensures the upcoming administrative suite (/admin) remains cleanly decoupled.
 */
export default function PublicLayout({ children }: PublicLayoutProps) {
  return <SiteShell>{children}</SiteShell>;
}

