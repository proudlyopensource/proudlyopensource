import { PrismaPg } from "@prisma/adapter-pg"
import { config } from "dotenv"

import { PrismaClient } from "./generated/prisma/client"

// Prisma 7 does not load .env automatically. Support both a package-level env
// file and the monorepo root env file; existing process env vars win.
config({
  path: [".env.local", ".env", "../../.env.local", "../../.env"],
  quiet: true,
})

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Add it to the application environment or the monorepo root .env file."
    )
  }

  return new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}

export { Prisma, PrismaClient } from "./generated/prisma/client"
export * from "./generated/prisma/enums"
export type * from "./generated/prisma/models"

export type {
  AdminModel as Admin,
  AlternativeModel as Alternative,
  AuditLogModel as AuditLog,
  BlogModel as Blog,
  CategoryModel as Category,
  CommentModel as Comment,
  NewsletterSubscriberModel as NewsletterSubscriber,
  OrderItemModel as OrderItem,
  OrderModel as Order,
  PaymentModel as Payment,
  ProductAlternativeModel as ProductAlternative,
  ProductClaimModel as ProductClaim,
  ProductModel as Product,
  ProductRelationModel as ProductRelation,
  ProductUpvoteModel as ProductUpvote,
  SessionModel as Session,
  SponsorModel as Sponsor,
  SponsorPlanModel as SponsorPlan,
  SponsorSubscriptionModel as SponsorSubscription,
  SponsorshipCampaignModel as SponsorshipCampaign,
  SponsorshipEventModel as SponsorshipEvent,
  SubmissionModel as Submission,
  SupporterModel as Supporter,
  TagModel as Tag,
  TechnologyModel as Technology,
  UserModel as User,
  WebhookEventModel as WebhookEvent,
} from "./generated/prisma/models"
