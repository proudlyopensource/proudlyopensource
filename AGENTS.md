# AGENTS.md

Guidance for AI agents and contributors working in this repository.

## Project

Proudly Open Source is an npm workspaces + Turborepo monorepo. It currently
contains the initial skeleton only. Do not add product UI or product API
endpoints unless the task explicitly asks for them.

## Workspace Map

- `apps/frontend` – public Next.js application (`@proudlyopensource/frontend`)
- `apps/api` – Next.js API service (`@proudlyopensource/api`)
- `apps/admin` – internal Next.js admin panel (`@proudlyopensource/admin`)
- `packages/database` – Prisma schema, client, migrations and seed
- `packages/ui` – shared shadcn/ui components, theme and Google Sans fonts
- `packages/eslint-config` – shared ESLint flat configs
- `packages/typescript-config` – shared tsconfig presets

## Commands

Use npm only.

```bash
npm install
npm run dev
npm run build
npm run lint
npm run typecheck
npm run format
npm run format:check
npm run db:generate
npm run db:validate
npm run db:migrate
npm run db:seed
npm run db:studio
```

Run a single workspace with Turborepo filters:

```bash
npx turbo run build --filter=@proudlyopensource/frontend
```

## Database Conventions

- Edit `packages/database/prisma/schema.prisma`; never edit generated files in
  `packages/database/src/generated`.
- Commit migrations in `packages/database/prisma/migrations`.
- Use `db:migrate` during development and `db:migrate:deploy` in production.
  Do not use `db:push` against production.
- Import the shared client from `@proudlyopensource/database`. Use
  `@proudlyopensource/database/enums` or `/models` for browser-safe types.
- Users authenticate with GitHub only; never add password fields to `User`.
- Store session tokens only as `Session.tokenHash` (SHA-256) and keep sessions
  revocable via `expiresAt`/`revokedAt`. Never log raw tokens.
- Product ownership changes go through `ProductClaim` review; never set
  `Product.verifiedOwner` without an approved claim.
- Admins use `Admin.passwordHash`. Never select or return it in API responses.
- Store only hashed IP addresses in analytics tables; never raw IPs.

## Conventions

- TypeScript strict mode everywhere. Prefer `type` imports.
- Server Components by default in Next.js. Add `"use client"` only when a
  component needs browser APIs or client state.
- Put shared components, hooks and utilities in `packages/ui`. Do not duplicate
  shadcn components across apps.
- Add shadcn components with the CLI:
  `npx shadcn@latest add <component> -c apps/frontend`. The files land in
  `packages/ui/src/components`.
- Import UI primitives via the package export:
  `@proudlyopensource/ui/components/<name>`.
- Keep the shared theme and font setup in
  `packages/ui/src/styles/globals.css`.
- Do not edit generated files in `.next`, `node_modules` or `.turbo`.
- Use Conventional Commits.

## Next.js Version

This repo uses a recent Next.js release. Read the documentation bundled with
the installed package at `node_modules/next/dist/docs/` before relying on older
APIs or conventions.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may
all differ from your training data. Read the relevant guide in
`node_modules/next/dist/docs/` before writing any code. Heed deprecation
notices.

<!-- END:nextjs-agent-rules -->
