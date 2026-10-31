import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

import { config } from "dotenv"
import { defineConfig } from "prisma/config"

const packageDirectory = dirname(fileURLToPath(import.meta.url))

// Load the package-level environment first, then fall back to the monorepo root.
config({
  path: [
    resolve(packageDirectory, ".env.local"),
    resolve(packageDirectory, ".env"),
    resolve(packageDirectory, "../../.env.local"),
    resolve(packageDirectory, "../../.env"),
  ],
  quiet: true,
})

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // Do not use env() here: `prisma generate` must work without a database URL
    // (for example in CI). Commands that need a database will fail with a clear
    // Prisma error if DATABASE_URL is missing.
    url: process.env.DATABASE_URL ?? "",
  },
})
