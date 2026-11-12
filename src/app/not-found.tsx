import React from "react";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/**
 * Custom Editorial 404 Error Screen
 *
 * Implements a dignified, publication-grade not-found presentation:
 * - Newsreader serif display typography.
 * - Restrained editorial explanatory copy.
 * - Primary action returning visitor to the Chambers Foyer (/).
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-primary-canvas flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8">
      {/* Top Header Identity */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        <BrandLogo size="md" />
      </div>

      {/* Central Editorial 404 Notice */}
      <Container variant="narrow" className="py-20 text-center flex flex-col items-center">
        <div className="inline-block text-xs font-sans font-semibold tracking-[0.18em] uppercase text-forest bg-muted-sage/35 border border-forest/15 px-3.5 py-1 rounded-full mb-6">
          Error 404 &bull; Record Unavailable
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-charcoal tracking-tight max-w-2xl">
          Page Not Located
        </h1>

        <p className="font-sans text-base sm:text-lg text-muted-slate mt-5 max-w-lg leading-relaxed">
          The page or document you are looking for may have moved, been archived, or is no longer available in this folio.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <Button
            href="/"
            variant="primary"
            size="lg"
            showArrow={true}
            className="tracking-tight"
          >
            Return to Chambers Foyer
          </Button>

          <Button
            href="/contact"
            variant="outline"
            size="lg"
            className="tracking-tight"
          >
            Contact Chambers
          </Button>
        </div>
      </Container>

      {/* Bottom Legal Attribution */}
      <div className="w-full max-w-7xl mx-auto text-center border-t border-border-subtle/60 pt-6">
        <p className="font-sans text-xs text-muted-slate">
          Dr. Surajit Sinha &mdash; Advocate, High Court &amp; Lower Courts &bull; Bar Council of India Rule 36 Compliant
        </p>
      </div>
    </div>
  );
}
