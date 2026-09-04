import type { MetadataRoute } from "next";
import { getAllCollectionsForSitemap, getAllTopics } from "@/lib/contentQueries";
import { slugify } from "@/lib/slug";

const encodeBase64 = (value: string | number) =>
  Buffer.from(String(value), "utf-8").toString("base64");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://yuvaraj.io"
  ).replace(/\/$/, "");

  const currentDate = new Date();

  // Static Marketing & Portfolio Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/medium`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/connect`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/careers/internship`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sections`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/learn`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  try {
    const [topics, collections] = await Promise.all([
      getAllTopics().catch(() => []),
      getAllCollectionsForSitemap().catch(() => []),
    ]);

    // Dynamic Topic Clean Paths & Query URLs
    const topicRoutes: MetadataRoute.Sitemap = topics.flatMap((t) => {
      const topSlug = slugify(t.name);
      return [
        {
          url: `${baseUrl}/learn/${topSlug}`,
          lastModified: currentDate,
          changeFrequency: "weekly" as const,
          priority: 0.88,
        },
        {
          url: `${baseUrl}/learn?id=${encodeBase64(t.id)}&topic=${topSlug}`,
          lastModified: currentDate,
          changeFrequency: "weekly" as const,
          priority: 0.85,
        },
      ];
    });

    // Dynamic Article Clean Paths & Medium-Style URLs
    const articleRoutes: MetadataRoute.Sitemap = collections.flatMap((col) => {
      const topSlug = slugify(col.topicTitle);
      const artSlug = slugify(col.collectionTitle);
      return [
        {
          url: `${baseUrl}/learn/${topSlug}/${artSlug}`,
          lastModified: currentDate,
          changeFrequency: "weekly" as const,
          priority: 0.85,
        },
        {
          url: `${baseUrl}/learn?id=${encodeBase64(col.topicId)}&blog=${encodeBase64(col.collectionId)}&topic=${topSlug}&article=${artSlug}`,
          lastModified: currentDate,
          changeFrequency: "weekly" as const,
          priority: 0.8,
        },
      ];
    });

    return [...staticRoutes, ...topicRoutes, ...articleRoutes];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return staticRoutes;
  }
}
