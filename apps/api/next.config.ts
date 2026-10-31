import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  poweredByHeader: false,
  transpilePackages: ["@proudlyopensource/database"],
  serverExternalPackages: ["@prisma/client", "@prisma/adapter-pg", "pg"],
}

export default nextConfig
