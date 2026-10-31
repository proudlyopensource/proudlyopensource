# @proudlyopensource/database

Prisma schema, generated client, migrations and seed data for Proudly Open
Source.

## Stack

- PostgreSQL
- Prisma ORM 7 with the `prisma-client` generator
- `@prisma/adapter-pg` (node-postgres driver adapter)
- TypeScript, ESM

## Layout

```text
packages/database/
├── prisma/
│   ├── migrations/       Versioned SQL migrations (commit these)
│   ├── schema.prisma     Data model
│   └── seed.ts           Idempotent development seed
├── src/
│   ├── generated/prisma/ Generated client (gitignored, created on install)
│   └── index.ts          Shared PrismaClient singleton and exports
├── prisma.config.ts      Prisma CLI configuration
└── package.json
```

## Environment

`prisma.config.ts` and the seed load environment variables in this order:

1. `packages/database/.env.local`
2. `packages/database/.env`
3. `<repo>/.env.local`
4. `<repo>/.env`

For local development the monorepo root `.env` is usually enough:

```bash
DATABASE_URL="postgresql://proudlyopensource:proudlyopensource@localhost:5432/proudlyopensource"
```

Never commit real database credentials.

## Commands

Run from the repository root:

```bash
npm run db:generate       # Generate Prisma Client
npm run db:validate       # Validate the schema
npm run db:format         # Format the schema
npm run db:migrate        # Create/apply a migration in development
npm run db:migrate:deploy # Apply pending migrations in production
npm run db:migrate:status # Show migration status
npm run db:push           # Push schema without a migration (prototyping only)
npm run db:seed           # Seed development data
npm run db:studio         # Open Prisma Studio
npm run db:reset          # Drop, migrate and seed the database
```

Start the optional local database with Docker:

```bash
docker compose up -d postgres
```

## Usage

The package exports a ready-to-use singleton and the generated client:

```ts
import { prisma, ProductStatus } from "@proudlyopensource/database"

const published = await prisma.product.findMany({
  where: { status: ProductStatus.PUBLISHED },
  include: { owner: true },
})
```

Browser-safe imports (types and enums only, no client):

```ts
import type { Product } from "@proudlyopensource/database/models"
import { ProductStatus } from "@proudlyopensource/database/enums"
import type { Product as BrowserProduct } from "@proudlyopensource/database/browser"
```

`DATABASE_URL` must be set in the application runtime. The singleton is reused
across hot reloads in development to avoid exhausting PostgreSQL connections.

## Data model

### Staff

- `Admin` — email + hashed password, role, status, last login.
- `AuditLog` — immutable admin action trail with optional hashed IP.

### Public accounts

- `User` — GitHub-only accounts (`githubId`, `githubUsername`). There are no
  password fields; authentication is delegated to GitHub OAuth.
  `trustLevel` tracks community standing (`NEW`, `TRUSTED`, `FLAGGED`).
- `Session` — custom revocable sessions. Stores only `tokenHash` (SHA-256 of the
  raw cookie token), optional hashed IP, expiry, last-used and revocation times.
- `Product.ownerId` links a listed product to the user who owns or manages it.
- `Submission.userId` links a submission to the signed-in user when available.
- Email OTP is used only as claim evidence, not as a login method; there is no
  OTP table and GitHub identity stays required.

### Catalogue

- `Product`, `Category`, `Tag`, `Technology`, `Alternative`
- `ProductAlternative` and `ProductRelation` for comparisons
- `ProductClaim` — a user's request to own a product (method, GitHub repo and
  permission snapshot, evidence, admin review). Unique per product and user.
  `Product.verifiedOwner`, `claimedAt` and `ownerDeletedAt` track the outcome.
- `Blog`, `Submission`

### Community

- `Comment` — threaded replies (`parentId`), moderation status, soft delete via
  `deletedAt`. There is intentionally no `DELETED` status value.
- `ProductUpvote` — one upvote per user per product. `Product.upvoteCount` is a
  denormalised counter for sorting and list pages.

### Commerce and advertising

- `Order`, `OrderItem`, `Payment`, `WebhookEvent`, `PaymentProvider`
- `Sponsor`, `SponsorPlan`, `SponsorSubscription`
- `SponsorshipCampaign` — placement, creative, targeting (category/product),
  schedule, pricing snapshot, priority, impression/click counters.
- `SponsorshipEvent` — impression/click events with optional session and hashed
  IP. Raw IP addresses must not be stored.

### Growth

- `Supporter`, `NewsletterSubscriber`

## Database-level constraints

Some invariants are enforced in the hand-written SQL section of the initial
migration (`prisma/migrations/20261031000000_init`):

- `campaign_placement_product_chk` — `PRODUCT_PAGE` campaigns need a `productId`.
- `campaign_placement_category_chk` — `CATEGORY` campaigns need a `categoryId`.
- `claim_verified_requires_review_chk` — a `VERIFIED` claim needs `reviewedAt`.

Update those constraints in a new migration if the rules change; Prisma does not
track them in `schema.prisma`.

## Seed data

`prisma/seed.ts` creates an idempotent demo dataset: one admin, one GitHub user,
three published products, a comment, upvotes, a sponsor campaign and a blog
post.

Development credentials:

```text
Admin: admin@proudlyopensource.com / ChangeMe123!
User:  @octocat
```

Change or remove these before deploying.

## Deployment notes

- Run `prisma migrate deploy` during release, not `db push`.
- Generate the client during the build (`npm run db:generate`).
- The generated client is intentionally gitignored.
- Keep `DATABASE_URL` server-side only. Never expose it to the browser.
- Back up the database before applying destructive migrations.
