import type { MetadataRoute } from "next";
import { getAllCollectionsForSitemap, getAllTopics } from "@/lib/contentQueries";

const encodeBase64 = (value: string | number) =>
  Buffer.from(String(value), "utf-8").toString("base64");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://yuvarajs.dev"
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

    // Dynamic Topic Index URLs
    const topicRoutes: MetadataRoute.Sitemap = topics.map((t) => ({
      url: `${baseUrl}/learn?id=${encodeBase64(t.id)}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    }));

    // Dynamic Article/Blog URLs
    const articleRoutes: MetadataRoute.Sitemap = collections.map((col) => ({
      url: `${baseUrl}/learn?id=${encodeBase64(col.topicId)}&blog=${encodeBase64(col.collectionId)}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    return [...staticRoutes, ...topicRoutes, ...articleRoutes];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return staticRoutes;
  }
}
