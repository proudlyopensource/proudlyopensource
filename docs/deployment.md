# Deployment

Each application has its own manual GitHub Actions workflow and its own Vercel
project:

| App      | Workflow                                | Vercel project secret        | Root Directory  |
| -------- | --------------------------------------- | ---------------------------- | --------------- |
| frontend | `.github/workflows/deploy-frontend.yml` | `VERCEL_PROJECT_ID_FRONTEND` | `apps/frontend` |
| api      | `.github/workflows/deploy-api.yml`      | `VERCEL_PROJECT_ID_API`      | `apps/api`      |
| admin    | `.github/workflows/deploy-admin.yml`    | `VERCEL_PROJECT_ID_ADMIN`    | `apps/admin`    |

Deployments are **manual only**. Trigger one from
**Actions → Deploy <App> → Run workflow**, pick a branch or tag, and run it.
There is no push or pull request trigger.

## One-time Vercel setup

Create three Vercel projects in the same team, one per app.

For every project:

1. Set **Root Directory** to the app directory (`apps/frontend`, `apps/api` or
   `apps/admin`).
2. Keep **Include source files outside of the Root Directory in the Build Step**
   enabled. The apps import the shared `@proudlyopensource/ui` and
   `@proudlyopensource/database` workspace packages.
3. Set **Framework Preset** to Next.js and Node.js to **22.x**.
4. Add the environment variables the app needs for the **Production**
   environment. At minimum this means `DATABASE_URL`, plus the
   `NEXT_PUBLIC_*` URLs from `.env.example`.
5. Do not connect the project to Git, or disable Git-triggered deployments.
   Otherwise a push to `main` will also deploy automatically and bypass the
   manual workflow.

The workflows build locally on the runner with `vercel build` and upload the
result with `vercel deploy --prebuilt`, so Vercel does not build the source
itself.

## Repository secrets

Add these under **Settings → Secrets and variables → Actions**:

| Secret                       | Description                                        |
| ---------------------------- | -------------------------------------------------- |
| `VERCEL_TOKEN`               | Vercel access token from Account Settings → Tokens |
| `VERCEL_ORG_ID`              | Team or personal account ID                        |
| `VERCEL_PROJECT_ID_FRONTEND` | Project ID for the frontend project                |
| `VERCEL_PROJECT_ID_API`      | Project ID for the API project                     |
| `VERCEL_PROJECT_ID_ADMIN`    | Project ID for the admin project                   |

`VERCEL_ORG_ID` and each project ID can be read from the `.vercel/project.json`
file created by `vercel link`:

```bash
cd apps/frontend
npx vercel link
cat .vercel/project.json
```

Repeat for `apps/api` and `apps/admin`. The `.vercel` directory is gitignored.

If a secret is missing, the workflow fails before calling Vercel and prints the
name of the missing secret.

## Database migrations

These workflows only deploy application code. They do not touch the database.
Apply pending migrations separately before deploying code that depends on them:

```bash
npm run db:migrate:deploy
```
