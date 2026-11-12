# Supabase Clients & Security Infrastructure (`src/lib/supabase`)

This directory houses database clients, server helpers, and session middleware for the administrative CMS and inquiry logging.

### Expected Modules (Phase 9, Step P9-01):
- `client.ts`: Browser-safe Supabase client constrained by Row Level Security (RLS).
- `server.ts`: Server Component and Server Action database client using secure cookies.
- `middleware.ts`: Next.js edge session validator protecting `/admin/*` routes.

