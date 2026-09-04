import type { Metadata } from "next";
import LearnHubPage from "@/components/pages/learn/LearnHubPage";
import {
  getAllTopicsWithStats,
  getTopicById,
  getCollectionById,
} from "@/lib/contentQueries";
import { slugify } from "@/lib/slug";
import { redirect } from "next/navigation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SearchParams = {
  id?: string;
  blog?: string;
};

const decodeBase64 = (value?: string | null) => {
  if (!value) return null;
  try {
    return Buffer.from(value, "base64").toString("utf-8");
  } catch {
    return null;
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://yuvaraj.io"
  ).replace(/\/$/, "");

  const pageUrl = `${baseUrl}/learn`;
  const ogImage = `${baseUrl}/api/og?title=${encodeURIComponent("Explore Learning Tracks")}&topic=${encodeURIComponent("Full Stack Development")}`;

  return {
    title: "Learn Full-Stack Architecture & Engineering Tracks | Yuvaraj",
    description:
      "Interactive chapter-by-chapter tutorials, code patterns, and software architecture guides across JavaScript, React, Angular, CSS, and backend engineering.",
    keywords: [
      "Learn Full Stack",
      "Software Architecture",
      "React Guides",
      "Angular Tutorials",
      "JavaScript Internals",
      "CSS Mastery",
      "Yuvaraj",
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "Learn Full-Stack Architecture & Engineering Tracks | Yuvaraj",
      description:
        "Interactive chapter-by-chapter tutorials and guides across JavaScript, React, Angular, and full-stack engineering.",
      url: pageUrl,
      type: "website",
      siteName: "Yuvaraj Dev FullStack",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Learn Full-Stack Tracks",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Learn Full-Stack Architecture & Engineering Tracks | Yuvaraj",
      description:
        "Interactive chapter-by-chapter tutorials and software guides by Yuvaraj.",
      images: [ogImage],
    },
  };
}

export default async function LearnMainPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const decodedLearnId = decodeBase64(resolvedSearchParams.id);
  const decodedBlogId = decodeBase64(resolvedSearchParams.blog);

  // Backward compatibility redirect: If accessed with query params, redirect cleanly to hierarchical path
  if (decodedLearnId) {
    const topic = await getTopicById(decodedLearnId);
    if (topic) {
      const topicSlug = slugify(topic.name);
      if (decodedBlogId) {
        const collection = await getCollectionById(decodedBlogId);
        if (collection) {
          const articleSlug = slugify(collection.title);
          redirect(`/learn/${topicSlug}/${articleSlug}`);
        }
      }
      redirect(`/learn/${topicSlug}`);
    }
  }

  // Render the Dedicated Learning Tracks Preview Hub Page
  const topics = await getAllTopicsWithStats();

  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://yuvaraj.io"
  ).replace(/\/$/, "");

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: topics.map((t, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: t.name,
      url: `${baseUrl}/learn/${t.slug}`,
    })),
  };

  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <LearnHubPage topics={topics} />
    </div>
  );
}
