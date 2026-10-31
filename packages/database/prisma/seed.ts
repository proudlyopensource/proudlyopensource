import { randomBytes, scryptSync } from "node:crypto"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

import { PrismaPg } from "@prisma/adapter-pg"
import { config } from "dotenv"

import { PrismaClient } from "../src/generated/prisma/client"

const seedDirectory = dirname(fileURLToPath(import.meta.url))

config({
  path: [
    resolve(seedDirectory, "../.env.local"),
    resolve(seedDirectory, "../.env"),
    resolve(seedDirectory, "../../../.env.local"),
    resolve(seedDirectory, "../../../.env"),
  ],
  quiet: true,
})

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. Copy .env.example to .env before seeding."
  )
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
})

const DAY = 24 * 60 * 60 * 1000
const DEMO_ADMIN_EMAIL = "admin@proudlyopensource.com"
const DEMO_ADMIN_PASSWORD = "ChangeMe123!"

// Matches the format the admin authentication layer should verify:
// scrypt:<salt>:<derived-key>
function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex")
  const hash = scryptSync(password, salt, 64).toString("hex")

  return `scrypt:${salt}:${hash}`
}

async function main() {
  console.log("Seeding database...")

  const admin = await prisma.admin.upsert({
    where: { email: DEMO_ADMIN_EMAIL },
    update: {},
    create: {
      email: DEMO_ADMIN_EMAIL,
      passwordHash: hashPassword(DEMO_ADMIN_PASSWORD),
      name: "Demo Admin",
      role: "SUPER_ADMIN",
      status: "ACTIVE",
    },
  })

  const user = await prisma.user.upsert({
    where: { githubId: "583231" },
    update: {},
    create: {
      githubId: "583231",
      githubUsername: "octocat",
      name: "The Octocat",
      email: "octocat@github.com",
      avatarUrl: "https://avatars.githubusercontent.com/u/583231?v=4",
      bio: "Open-source maintainer and demo account.",
      location: "San Francisco",
      websiteUrl: "https://github.com/octocat",
      company: "@github",
      status: "ACTIVE",
      lastLoginAt: new Date(),
    },
  })

  const developerTools = await prisma.category.upsert({
    where: { slug: "developer-tools" },
    update: {},
    create: {
      name: "Developer Tools",
      slug: "developer-tools",
      description: "Tools for developers and engineers",
      icon: "code",
      order: 1,
    },
  })

  const selfHosted = await prisma.category.upsert({
    where: { slug: "self-hosted" },
    update: {},
    create: {
      name: "Self Hosted",
      slug: "self-hosted",
      description: "Self-hostable applications",
      icon: "server",
      order: 2,
    },
  })

  const openSource = await prisma.tag.upsert({
    where: { slug: "open-source" },
    update: {},
    create: { name: "Open Source", slug: "open-source" },
  })

  const selfHostable = await prisma.tag.upsert({
    where: { slug: "self-hostable" },
    update: {},
    create: { name: "Self Hostable", slug: "self-hostable" },
  })

  const typescript = await prisma.technology.upsert({
    where: { slug: "typescript" },
    update: {},
    create: {
      name: "TypeScript",
      slug: "typescript",
      description: "TypeScript programming language",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
  })

  const postgresql = await prisma.technology.upsert({
    where: { slug: "postgresql" },
    update: {},
    create: {
      name: "PostgreSQL",
      slug: "postgresql",
      description: "PostgreSQL database",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    },
  })

  const notion = await prisma.alternative.upsert({
    where: { slug: "notion" },
    update: {},
    create: {
      name: "Notion",
      slug: "notion",
      description: "All-in-one workspace",
      websiteUrl: "https://www.notion.so",
    },
  })

  const products = await Promise.all([
    prisma.product.upsert({
      where: { slug: "appflowy" },
      update: {},
      create: {
        name: "AppFlowy",
        slug: "appflowy",
        tagline: "Open-source alternative to Notion",
        about:
          "AppFlowy is an open-source alternative to Notion. You are in charge of your data and customizations.",
        description:
          "# AppFlowy\n\nAppFlowy is an open-source alternative to Notion, built with Flutter and Rust.",
        logo: "https://avatars.githubusercontent.com/u/86008395?s=200&v=4",
        websiteUrl: "https://www.appflowy.io",
        repoUrl: "https://github.com/AppFlowy-IO/AppFlowy",
        repoProvider: "github",
        repositoryOwner: "AppFlowy-IO",
        repositoryName: "AppFlowy",
        license: "AGPL-3.0",
        pricingType: "FREE",
        sourceAvailability: "OPEN_SOURCE",
        hostingType: "BOTH",
        stars: 52000,
        forks: 3400,
        issues: 100,
        lastCommitAt: new Date(Date.now() - 2 * DAY),
        statsUpdatedAt: new Date(),
        status: "PUBLISHED",
        featured: true,
        releasedAt: new Date("2022-11-01"),
        publishedAt: new Date(Date.now() - 7 * DAY),
        ownerId: user.id,
        upvoteCount: 1,
        categories: { connect: [{ id: developerTools.id }] },
        tags: { connect: [{ id: openSource.id }, { id: selfHostable.id }] },
        technologies: { connect: [{ id: typescript.id }] },
        alternatives: {
          create: [{ alternativeId: notion.id }],
        },
      },
    }),
    prisma.product.upsert({
      where: { slug: "gitea" },
      update: {},
      create: {
        name: "Gitea",
        slug: "gitea",
        tagline: "Painless self-hosted Git service",
        about:
          "Gitea is a community-managed lightweight code hosting solution written in Go.",
        description:
          "# Gitea\n\nGitea is a lightweight, self-hosted Git service with issues, pull requests, and package registries.",
        logo: "https://avatars.githubusercontent.com/u/12724356?s=200&v=4",
        websiteUrl: "https://gitea.com",
        repoUrl: "https://github.com/go-gitea/gitea",
        repoProvider: "github",
        repositoryOwner: "go-gitea",
        repositoryName: "gitea",
        license: "MIT",
        pricingType: "FREE",
        sourceAvailability: "OPEN_SOURCE",
        hostingType: "SELF_HOSTED",
        stars: 48000,
        forks: 5800,
        issues: 2300,
        lastCommitAt: new Date(Date.now() - DAY),
        statsUpdatedAt: new Date(),
        status: "PUBLISHED",
        releasedAt: new Date("2016-11-01"),
        publishedAt: new Date(Date.now() - 7 * DAY),
        ownerId: user.id,
        upvoteCount: 1,
        categories: {
          connect: [{ id: developerTools.id }, { id: selfHosted.id }],
        },
        tags: { connect: [{ id: openSource.id }, { id: selfHostable.id }] },
        technologies: { connect: [{ id: postgresql.id }] },
      },
    }),
    prisma.product.upsert({
      where: { slug: "umami" },
      update: {},
      create: {
        name: "Umami",
        slug: "umami",
        tagline: "Simple, privacy-friendly web analytics",
        about:
          "Umami is a simple, fast, privacy-focused alternative to Google Analytics.",
        description:
          "# Umami\n\nUmami is a self-hosted analytics platform that respects your visitors.",
        logo: "https://avatars.githubusercontent.com/u/77911351?s=200&v=4",
        websiteUrl: "https://umami.is",
        repoUrl: "https://github.com/umami-software/umami",
        repoProvider: "github",
        repositoryOwner: "umami-software",
        repositoryName: "umami",
        license: "MIT",
        pricingType: "FREE",
        sourceAvailability: "OPEN_SOURCE",
        hostingType: "BOTH",
        stars: 24000,
        forks: 4200,
        issues: 60,
        lastCommitAt: new Date(Date.now() - DAY),
        statsUpdatedAt: new Date(),
        status: "PUBLISHED",
        featured: true,
        releasedAt: new Date("2020-07-01"),
        publishedAt: new Date(Date.now() - 7 * DAY),
        ownerId: user.id,
        upvoteCount: 1,
        categories: {
          connect: [{ id: developerTools.id }, { id: selfHosted.id }],
        },
        tags: { connect: [{ id: openSource.id }, { id: selfHostable.id }] },
        technologies: {
          connect: [{ id: typescript.id }, { id: postgresql.id }],
        },
      },
    }),
  ])

  const [appflowy, gitea] = products

  for (const product of products) {
    await prisma.productUpvote.upsert({
      where: { productId_userId: { productId: product.id, userId: user.id } },
      update: {},
      create: { productId: product.id, userId: user.id },
    })
  }

  const comment = await prisma.comment.findFirst({
    where: {
      productId: gitea.id,
      userId: user.id,
      content:
        "Runs comfortably on a small VPS. A great first self-hosted service.",
    },
    select: { id: true },
  })

  if (!comment) {
    await prisma.comment.create({
      data: {
        productId: gitea.id,
        userId: user.id,
        content:
          "Runs comfortably on a small VPS. A great first self-hosted service.",
        status: "PUBLISHED",
      },
    })
  }

  const sponsor = await prisma.sponsor.upsert({
    where: { slug: "example-sponsor" },
    update: {},
    create: {
      name: "Example Sponsor",
      slug: "example-sponsor",
      logo: "https://placehold.co/200x80/111111/ffffff?text=Example",
      websiteUrl: "https://example.com",
      description: "Supporting open-source projects",
      contactEmail: "sponsors@example.com",
      active: true,
      createdById: admin.id,
    },
  })

  const plan = await prisma.sponsorPlan.upsert({
    where: { slug: "homepage-featured" },
    update: {},
    create: {
      name: "Homepage Featured",
      slug: "homepage-featured",
      price: 50000,
      currency: "USD",
      billingInterval: "MONTHLY",
      placement: "HOMEPAGE",
      description: "Featured placement in the homepage sponsor rail.",
      features: ["Homepage placement", "Click and impression reporting"],
      active: true,
      order: 1,
    },
  })

  const existingCampaign = await prisma.sponsorshipCampaign.findFirst({
    where: { sponsorId: sponsor.id, headline: "Build with open source" },
    select: { id: true },
  })

  const campaign =
    existingCampaign ??
    (await prisma.sponsorshipCampaign.create({
      data: {
        sponsorId: sponsor.id,
        planId: plan.id,
        createdById: admin.id,
        status: "ACTIVE",
        placement: "HOMEPAGE",
        headline: "Build with open source",
        body: "Ship faster with self-hosted tools trusted by the community.",
        targetUrl: "https://example.com/open-source",
        ctaLabel: "Learn more",
        priceSnapshot: plan.price,
        currencySnapshot: plan.currency,
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * DAY),
        impressions: 1,
      },
    }))

  await prisma.sponsorshipEvent.create({
    data: {
      campaignId: campaign.id,
      type: "IMPRESSION",
      userId: user.id,
      sessionId: "seed-session",
      ipHash: "seed-ip-hash",
      userAgent: "proudlyopensource-seed",
      metadata: { source: "seed" },
    },
  })

  await prisma.blog.upsert({
    where: { slug: "welcome-to-proudly-open-source" },
    update: {},
    create: {
      title: "Welcome to Proudly Open Source",
      slug: "welcome-to-proudly-open-source",
      excerpt:
        "A directory for open-source software, self-hosted tools, and open alternatives.",
      content:
        "# Welcome\n\nProudly Open Source lists software you can inspect, self-host, and share.",
      authorId: admin.id,
      authorName: "Demo Admin",
      authorEmail: DEMO_ADMIN_EMAIL,
      status: "PUBLISHED",
      featured: true,
      tags: ["open-source", "community"],
      publishedAt: new Date(),
      seoDescription:
        "Discover open-source software, self-hosted tools, and open alternatives.",
    },
  })

  for (const email of ["reader@example.com", "maintainer@example.com"]) {
    await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: { active: true, unsubscribedAt: null },
      create: { email, active: true },
    })
  }

  console.log(
    `Seeded ${products.length} products, ${appflowy.id} as the first product.`
  )
  console.log(`Demo admin: ${DEMO_ADMIN_EMAIL} / ${DEMO_ADMIN_PASSWORD}`)
  console.log(`Demo user: @${user.githubUsername}`)
  console.log(`Demo campaign: ${campaign.id}`)
  console.log("Seeding completed!")
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
