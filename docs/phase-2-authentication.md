# ShipQuick Phase 2 Authentication

## Objective
Implement a production-style authentication foundation in Next.js 15 (App Router) using Supabase SSR and protect core app routes.

## What We Built

### 1) Supabase SSR Client Utilities

We created three utilities so Supabase works correctly in each Next.js runtime context.

1. Browser client  
   File: `src/utils/supabase/client.ts`  
   Purpose: Used in client components (login/signup pages) for email/password and OAuth calls.

2. Server client  
   File: `src/utils/supabase/server.ts`  
   Purpose: Used in server components and route handlers where cookie-aware server access is needed.

3. Middleware client  
   File: `src/utils/supabase/middleware.ts`  
   Purpose: Reads and refreshes auth session in middleware and redirects unauthenticated users.

Why this separation:
1. Browser and server runtimes have different cookie access APIs.
2. Middleware must update cookies on both request/response while checking sessions.
3. This keeps auth logic clean, reusable, and aligned with Supabase SSR patterns.

### 2) Route Protection Middleware

File: `middleware.ts`  
Protected matchers:
1. `/dashboard/:path*`
2. `/settings/:path*`
3. `/admin/:path*`

Behavior:
1. If user has a valid Supabase session, request proceeds.
2. If no session, user is redirected to `/login`.
3. Original path is added as `redirectedFrom` query param so post-login return works.

Why:
1. Access control is enforced at the edge before rendering protected pages.
2. Protected pages do not depend only on client-side checks.

### 3) Auth Pages (Email/Password + Google OAuth)

1. Login page  
   File: `src/app/login/page.tsx`
2. Signup page  
   File: `src/app/signup/page.tsx`

Implemented UI with shadcn-style components:
1. `Card`
2. `Input`
3. `Button`

Implemented flows:
1. Email/password sign in (`signInWithPassword`)
2. Email/password sign up (`signUp`)
3. Google OAuth sign in/up (`signInWithOAuth`)
4. Post-login redirect to originally requested protected route or `/dashboard`

Why:
1. Covers both frictionless social auth and standard credential auth.
2. Provides a user-ready entry point to protected app features.

### 4) OAuth Callback Route

File: `src/app/auth/callback/route.ts`

Behavior:
1. Reads OAuth `code` from query params.
2. Exchanges code for session via Supabase.
3. Redirects to requested `next` path or `/dashboard`.

Why:
1. OAuth flows need a server callback endpoint to finalize session creation securely.

### 5) Supporting UI Components Added

1. `src/components/ui/input.tsx`
2. `src/components/ui/card.tsx`

Why:
1. Login/signup pages require these components.
2. Keeps UI consistent with your shadcn-based component system.

### 6) Environment Variable Setup

Updated local env to include:
1. `NEXT_PUBLIC_SUPABASE_URL`
2. `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Template file included:
1. `.env.example`

Why:
1. Supabase browser/server clients require these values at runtime.

### 7) Protected Test Pages Added

1. `src/app/dashboard/page.tsx`
2. `src/app/settings/page.tsx`
3. `src/app/admin/page.tsx`

Why:
1. Middleware targets these routes, so concrete pages are needed for end-to-end verification.
2. Dashboard includes a server-side sign-out action to verify logout/session cleanup.

## Why This Architecture Is Correct For Next.js 15 + Supabase SSR

1. Uses App Router-compatible server/client patterns.
2. Uses middleware for centralized auth gating.
3. Uses server route callback for OAuth session exchange.
4. Keeps auth state based on Supabase-managed cookies (not fragile local-only state).

## How To Test Phase 2 End-to-End

Run app:
```bash
npm run dev
```

### Test A: Unauthenticated Access Guard
1. Open `http://localhost:3000/dashboard`
2. Expected: redirected to `http://localhost:3000/login?redirectedFrom=/dashboard`
3. Repeat for:
   - `http://localhost:3000/settings`
   - `http://localhost:3000/admin`

### Test B: Email Signup
1. Open `http://localhost:3000/signup`
2. Create account with email/password.
3. If email confirmation is enabled, confirm from inbox.
4. Expected:
   - Either immediate sign-in and redirect to `/dashboard`
   - Or success message instructing email confirmation

### Test C: Email Login
1. Open `http://localhost:3000/login`
2. Sign in with created credentials.
3. Expected: redirected to `/dashboard` (or original `redirectedFrom` path).

### Test D: Google Login
1. Open `http://localhost:3000/login`
2. Click `Sign in with Google`
3. Complete Google consent screen.
4. Expected:
   - Browser returns via `/auth/callback`
   - Session created
   - Redirect to `/dashboard` or original route

### Test E: Middleware + Session Persistence
1. After login, open:
   - `/dashboard`
   - `/settings`
   - `/admin`
2. Expected: all load without redirect.
3. Refresh each page.
4. Expected: still authenticated.

### Test F: Sign Out
1. On dashboard, click `Sign out`.
2. Expected: redirected to `/login`.
3. Try `/dashboard` again.
4. Expected: redirected back to `/login?redirectedFrom=/dashboard`.

## Common Failure Checks

1. Google button fails:
   - Verify Supabase Google provider is enabled.
   - Verify redirect URL includes `http://localhost:3000/auth/callback`.
2. Redirect loop or always logged out:
   - Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. OAuth callback returns but no session:
   - Verify callback route exists and provider credentials are valid.

## Completion Status
Phase 2 is complete from implementation perspective:
1. Auth UI implemented.
2. Email/password and Google OAuth wired.
3. Middleware protection active for target routes.
4. Callback flow implemented.
5. End-to-end test pages and sign-out path available.
