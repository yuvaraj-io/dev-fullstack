import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://yuvaraj.io"
  ).replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/learn",
          "/medium",
          "/about",
          "/portfolio",
          "/careers",
          "/connect",
          "/pricing",
          "/sections",
        ],
        disallow: [
          "/admin",
          "/admin/*",
          "/admin-signup",
          "/api/*",
          "/auth",
          "/auth/*",
          "/edit",
          "/edit/*",
          "/profile",
          "/profile/*",
          "/reset-password",
          "/forgot-password",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: [
          "/",
          "/learn",
          "/medium",
          "/about",
          "/portfolio",
          "/careers",
          "/connect",
          "/pricing",
          "/sections",
        ],
        disallow: [
          "/admin",
          "/admin/*",
          "/admin-signup",
          "/api/*",
          "/auth",
          "/auth/*",
          "/edit",
          "/edit/*",
          "/profile",
          "/profile/*",
        ],
      },
      {
        userAgent: "Bingbot",
        allow: [
          "/",
          "/learn",
          "/medium",
          "/about",
          "/portfolio",
        ],
        disallow: [
          "/admin",
          "/admin/*",
          "/api/*",
          "/auth",
          "/edit",
          "/profile",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
