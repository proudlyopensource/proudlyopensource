# Proudly Open Source

A curated directory of open-source software, self-hosted tools, and open-source
alternatives to commercial SaaS.

This repository is a production-ready **npm workspaces + Turborepo** monorepo
containing three Next.js applications and a shared shadcn/ui component library.
Product UI and API endpoints are intentionally not implemented yet; this is the
initial project skeleton.

## Repository Structure

```text
.
├── apps/
│   ├── frontend/         Public Next.js application (port 3000)
│   ├── api/              Next.js API service (port 3001)
│   └── admin/            Internal admin panel (port 3002)
├── packages/
│   ├── database/         Prisma schema, client, migrations and seed
│   ├── ui/               Shared shadcn/ui components, theme and fonts
│   ├── eslint-config/    Shared ESLint flat configs
│   └── typescript-config/ Shared tsconfig presets
├── .github/              CI and open-source templates
├── .husky/               Git hooks
├── docker-compose.yml    Optional local PostgreSQL service
├── turbo.json            Turborepo pipeline
└── package.json          npm workspaces root
```

## Requirements

- Node.js 20.19+ (22 LTS recommended; see `.nvmrc`)
- npm 10+
- Git
- PostgreSQL 16+ (Docker is optional but recommended for local development)

## Getting Started

```bash
npm install
cp .env.example .env
docker compose up -d postgres
npm run db:migrate:deploy
npm run db:seed
npm run dev
```

`npm install` generates the Prisma Client. On a fresh machine without a database
you can still run `npm run db:generate` and `npm run typecheck`.

Open the applications:

| Application | URL                   |
| ----------- | --------------------- |
| Frontend    | http://localhost:3000 |
| API         | http://localhost:3001 |
| Admin       | http://localhost:3002 |

The API health check is available at
`http://localhost:3001/api/health`.

## Scripts

| Script                 | Description                                |
| ---------------------- | ------------------------------------------ |
| `npm run dev`          | Start all applications in development mode |
| `npm run dev:frontend` | Start only the frontend application        |
| `npm run dev:api`      | Start only the API application             |
| `npm run dev:admin`    | Start only the admin application           |
| `npm run build`        | Build every workspace                      |
| `npm run start`        | Start every production build               |
| `npm run lint`         | Run ESLint across the monorepo             |
| `npm run lint:fix`     | Run ESLint with auto-fix                   |
| `npm run typecheck`    | Run TypeScript checks across the monorepo  |
| `npm run format`       | Format the repository with Prettier        |
| `npm run format:check` | Check formatting without writing changes   |
| `npm run db:generate`  | Generate Prisma Client                     |
| `npm run db:validate`  | Validate the Prisma schema                 |
| `npm run db:migrate`   | Create and apply a development migration   |
| `npm run db:seed`      | Seed development data                      |
| `npm run db:studio`    | Open Prisma Studio                         |

See [packages/database/README.md](packages/database/README.md) for the full
database command reference and data model.

Use Turborepo filters for a single workspace, for example:

```bash
npx turbo run build --filter=@proudlyopensource/frontend
```

## UI Components

The shared UI library uses the shadcn/ui **Nova** preset with the neutral base
color and CSS variables. Its configuration lives in
`packages/ui/components.json`, and the theme is defined in
`packages/ui/src/styles/globals.css`.

Add components from any app:

```bash
npx shadcn@latest add button -c apps/frontend
npx shadcn@latest add card -c apps/admin
```

The CLI writes components to `packages/ui/src/components` and updates
`packages/ui/package.json` when dependencies are required. Import them through
the package name:

```tsx
import { Button } from "@proudlyopensource/ui/components/button"
```

## Fonts

The design uses **Google Sans**. The font files are self-hosted in
`packages/ui/src/fonts/google-sans` (latin and latin-ext subsets, normal and
italic, variable weights 400–700), so no runtime request is made to Google.
Font faces are declared in `packages/ui/src/fonts/google-sans/font-faces.css`
and imported by the shared stylesheet.

To update the font, replace the `.woff2` files and keep the file names in
`font-faces.css` in sync.

## Database

The shared schema lives in `packages/database/prisma/schema.prisma`. It models
admins, GitHub-only users, product ownership, comments, upvotes, orders,
payments, sponsorships and advertising campaigns.

The package exposes a singleton client and generated types:

```ts
import { prisma, type Product } from "@proudlyopensource/database"

const products = await prisma.product.findMany({
  where: { status: "PUBLISHED" },
  include: { owner: true },
})
```

Migrations are committed under `packages/database/prisma/migrations`. Apply
them with `npm run db:migrate:deploy`; use `npm run db:migrate` only while
developing a schema change.

## Environment Variables

Copy `.env.example` to `.env` and adjust values as needed:

| Variable                | Description                  |
| ----------------------- | ---------------------------- |
| `DATABASE_URL`          | PostgreSQL connection string |
| `NEXT_PUBLIC_SITE_URL`  | Canonical public site URL    |
| `NEXT_PUBLIC_API_URL`   | Public API base URL          |
| `NEXT_PUBLIC_ADMIN_URL` | Admin application URL        |

Never commit real secrets. Environment files are ignored by Git.

## Tooling

- **Turborepo** – task orchestration and caching
- **npm workspaces** – dependency management and workspace linking
- **ESLint 9** with shared flat configs
- **Prettier** with the Tailwind CSS plugin
- **TypeScript** in strict mode with shared configs
- **Husky**, **lint-staged** and **Commitlint**
- **GitHub Actions** for format, lint, typecheck and build checks

## Contributing

We welcome contributions! Read [CONTRIBUTING.md](CONTRIBUTING.md) for setup,
conventions and the pull request process.

## License

This project is licensed under the [MIT License](LICENSE). Dependency licenses
and third-party assets must be respected.

Google Sans is a trademark of Google LLC. Ensure you have the right to use and
redistribute any font assets in your deployment.

## Security

To report a vulnerability, see [SECURITY.md](SECURITY.md). Do not report
security issues in public GitHub issues.

## Support

See [SUPPORT.md](SUPPORT.md) for information about getting help and the
difference between bugs, questions, and feature requests.
