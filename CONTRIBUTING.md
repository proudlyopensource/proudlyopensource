# Contributing to Proudly Open Source

Thanks for helping make open-source discovery better. This guide covers the
monorepo setup, conventions, and how to contribute.

## Code of Conduct

This project follows the [Code of Conduct](CODE_OF_CONDUCT.md). Be kind and
assume good intent.

## Getting Started

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally:

   ```bash
   git clone https://github.com/<your-username>/proudlyopensource.git
   cd proudlyopensource
   ```

3. **Install dependencies** with npm (the lockfile is committed):

   ```bash
   npm install
   ```

4. **Copy the environment template**:

   ```bash
   cp .env.example .env
   ```

5. **Start PostgreSQL and apply migrations**:

   ```bash
   docker compose up -d postgres
   npm run db:migrate:deploy
   npm run db:seed
   ```

6. **Start all applications**:

   ```bash
   npm run dev
   ```

   | App      | URL                   |
   | -------- | --------------------- |
   | Frontend | http://localhost:3000 |
   | API      | http://localhost:3001 |
   | Admin    | http://localhost:3002 |

## Monorepo Layout

```text
apps/
  frontend/   Public Next.js application
  api/        Next.js API service
  admin/      Internal Next.js admin panel
packages/
  database/   Prisma schema, client, migrations and seed
  ui/         Shared shadcn/ui component library
  eslint-config/
  typescript-config/
```

Shared code belongs in `packages/*`. Features that are specific to one
application stay inside that application. Add a new workspace package when code
is used by two or more applications.

## Development Workflow

1. Create a feature branch from `main`:

   ```bash
   git checkout -b feat/your-feature
   ```

2. Make focused changes that follow the existing style and structure.
3. Add shadcn/ui components to the shared package rather than copying them
   between apps:

   ```bash
   npx shadcn@latest add button -c apps/frontend
   ```

   Components are written to `packages/ui/src/components`. Dependencies needed
   by shared components belong in `packages/ui/package.json`, not in an
   individual application. If the CLI adds a dependency to an app, move it to
   the UI package and run `npm install` again.

4. Run checks locally before committing:

   ```bash
   npm run format:check
   npm run lint
   npm run typecheck
   npm run build
   ```

5. Commit using [Conventional Commits](https://www.conventionalcommits.org/):

   ```bash
   git commit -m "feat: add software category filters"
   ```

   Git hooks (via Husky) run lint-staged and commitlint on commit.

6. Push your branch and open a Pull Request against `main`.

## What Reviewers Expect

- Clear, focused PRs with a descriptive summary and motivation.
- Tests added or updated when appropriate.
- Documentation updated if behavior or configuration changes.
- All CI checks passing.
- No secrets, credentials, or generated artifacts committed.
- Shared components and utilities placed in the correct workspace.

## Reporting Bugs or Requesting Features

- **Bugs:** Open an issue using the Bug Report template with steps to
  reproduce, expected/actual behavior, and environment details.
- **Features:** Open an issue using the Feature Request template describing the
  problem, proposed solution, and alternatives.
- **Security:** Follow [SECURITY.md](SECURITY.md) for private vulnerability
  reports.

## Notes

- Use **npm** for all workspace commands. Do not commit lockfiles from other
  package managers.
- Do **not** push directly to `main`. All changes go through pull requests.
- Respect dependency licenses and third-party assets.
