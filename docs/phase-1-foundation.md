# ShipQuick Phase 1 Foundation

## Goal
Build the base SaaS boilerplate stack before auth and feature modules.

## What We Completed
1. Initialized a Next.js 15 app with App Router and TypeScript.
2. Set up Tailwind CSS v4 for utility-first styling.
3. Initialized shadcn/ui and started the component library setup.
4. Added Prisma ORM and initialized Prisma in the project.
5. Defined the Phase 1 data model in Prisma:
   - `User`
   - `Subscription`
   - `WaitlistEmail`
6. Connected Prisma configuration to Supabase PostgreSQL environment variables.
7. Fixed Prisma 7 datasource configuration changes:
   - Removed `url` and `directUrl` from `schema.prisma`.
   - Moved datasource URL resolution to `prisma.config.ts`.
8. Verified Prisma client generation locally (`npx prisma generate`).

## Stack and Why
1. Next.js 15 (App Router)
   - Chosen for modern React architecture, server components, and production-ready routing.
2. Tailwind CSS
   - Chosen for rapid UI development with consistent utility classes.
3. shadcn/ui
   - Chosen for accessible, composable UI primitives you own in your codebase.
4. Supabase (PostgreSQL)
   - Chosen for managed Postgres + auth + realtime ecosystem with fast startup.
5. Prisma ORM
   - Chosen for type-safe schema, migrations, and database access from TypeScript.

## Commands We Used
```bash
npx create-next-app@15 shipquick --ts --eslint --app --src-dir --tailwind --import-alias "@/*"
cd shipquick
npx shadcn@latest init
npm install @prisma/client
npm install -D prisma
npx prisma init
npx prisma generate
```

## Environment Variables Used
1. Database
   - `DATABASE_URL` (pooled connection for runtime/CLI fallback)
   - `DIRECT_URL` (direct connection, preferred for Prisma schema operations)

## Known Notes
1. Prisma 7 changed datasource handling and no longer accepts `url` and `directUrl` in `schema.prisma`.
2. Supabase credentials and connection strings are copied from Supabase Dashboard -> Connect -> ORMs -> Prisma.

## Deliverable State at End of Phase 1
1. App scaffold is ready.
2. UI system is initialized.
3. Database schema is defined and Prisma client can be generated.
4. Project is ready for Phase 2 authentication flow.
