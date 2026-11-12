import React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { NOTABLE_APPOINTMENTS } from "@/lib/data/career";
import type { InstitutionalAppointment } from "@/types";

export interface AppointmentsListProps {
  appointments?: InstitutionalAppointment[];
  hideIfEmpty?: boolean;
}

/**
 * Notable Appointments & Retainers Module (P5-06)
 *
 * Displays verified institutional appointments, arbitral panels, and advisory roles:
 * - Strict adherence to docs/04_CONTENT_REQUIREMENTS.md:
 *   Zero invented institutional retainers, panel memberships, or dates.
 * - Dynamic card grid for verified appointments.
 * - Graceful conditional presentation: When dataset is empty, renders a dignified
 *   statement on institutional advisory standards without dummy placeholders.
 */
export function AppointmentsList({
  appointments = NOTABLE_APPOINTMENTS,
  hideIfEmpty = false,
}: AppointmentsListProps) {
  const verified = appointments.filter(
    (item) => item.verification_status === "verified"
  );

  if (verified.length === 0 && hideIfEmpty) {
    return null;
  }

  return (
    <section
      aria-labelledby="appointments-heading"
      className="py-16 sm:py-20 md:py-24 border-t border-border-subtle bg-surface"
    >
      <Container>
        <Reveal>
          {/* Eyebrow & Section Heading */}
          <div className="max-w-3xl mb-10 sm:mb-14">
            <Badge variant="eyebrow" className="mb-3.5">
              INSTITUTIONAL STANDING &bull; ADVISORY ROLES
            </Badge>
            <h2
              id="appointments-heading"
              className="font-serif text-3xl sm:text-4xl font-normal text-charcoal tracking-tight leading-[1.16]"
            >
              Institutional Advisory &amp; <br />
              <span className="italic text-forest">Appointments.</span>
            </h2>
            <p className="mt-4 text-base font-sans text-charcoal/75 leading-relaxed">
              Serving as independent counsel to corporate boards, arbitral institutions,
              and public entities navigating regulatory compliance, risk governance, and dispute mandates.
            </p>
          </div>

          {verified.length > 0 ? (
            /* Render Verified Appointment Cards with tactile hover */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {verified.map((appt) => (
                <div
                  key={appt.id}
                  className="group relative overflow-hidden p-6 sm:p-8 rounded-2xl bg-surface-card border border-border-subtle shadow-xs flex flex-col justify-between hover:border-forest/40 hover:-translate-y-1 hover:scale-[1.015] hover:shadow-lg hover:shadow-forest/5 transition-all duration-300 motion-reduce:transform-none"
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-hidden="true"
                  />
                  <div>
                    {appt.tenure && (
                      <span className="text-xs font-mono font-semibold tracking-wider text-forest uppercase">
                        {appt.tenure}
                      </span>
                    )}
                    <h3 className="font-serif text-xl font-medium text-charcoal mt-2 mb-1">
                      {appt.appointing_authority}
                    </h3>
                    <p className="text-sm font-sans text-charcoal/80 font-medium">
                      {appt.role_or_capacity}
                    </p>
                  </div>

                  {appt.jurisdiction_or_scope && (
                    <div className="mt-6 pt-4 border-t border-border-subtle text-xs text-charcoal/65">
                      <span>Scope: {appt.jurisdiction_or_scope}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            /* Dignified Explanatory Panel (Zero Fabricated Records) */
            <div className="relative overflow-hidden p-8 sm:p-10 rounded-2xl bg-surface-card border border-border-subtle shadow-xs transition-all duration-300 hover:shadow-md hover:border-forest/30">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest/20 to-transparent"
                aria-hidden="true"
              />
              <div className="max-w-2xl space-y-3">
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-charcoal">
                  Institutional Mandates &amp; Panel Representation
                </h3>
                <p className="text-sm sm:text-base font-sans text-charcoal/75 leading-relaxed">
                  Dr. Surajit Sinha has represented the State as Public Prosecutor and advised regional
                  and statutory bodies on regulatory compliance, administrative matters, and litigation.
                </p>
                <p className="text-xs sm:text-sm font-sans text-charcoal/60 leading-relaxed">
                  In compliance with Bar Council of India regulations and professional client confidentiality,
                  specific institutional retainers and panel appointments are disclosed selectively during formal
                  conflict checks and matter clearance.
                </p>
              </div>
            </div>
          )}
        </Reveal>
      </Container>
    </section>
  );
}

