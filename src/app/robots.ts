import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  const waitlistMode = process.env.NEXT_PUBLIC_WAITLIST_MODE === "true"

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: waitlistMode
        ? ["/api/", "/dashboard", "/settings", "/admin", "/login", "/signup"]
        : ["/api/", "/dashboard", "/settings", "/admin"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
