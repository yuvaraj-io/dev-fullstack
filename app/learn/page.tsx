import type { Metadata } from "next";
import BlogTemplate, { type ArticleNavTarget } from "@/components/pages/learn/BlogTemplate";
import LearnNavClient from "./LearnNavClient";
import { buildBlogTocItems } from "@/lib/blogToc";
import {
  getBlogsByCollectionId,
  getGroupedSectionCollections,
  getSiblingCollections,
  getFirstTopicId,
  getAllTopics,
} from "@/lib/contentQueries";
import { cookies } from "next/headers";
import {
  canAccessAdmin,
  getCurrentUser,
  getSessionTokenFromCookie,
  SESSION_COOKIE,
} from "@/lib/auth";
import Link from "next/link";
import { FaGraduationCap } from "react-icons/fa";

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

const encodeBase64 = (value: string | number) =>
  Buffer.from(String(value), "utf-8").toString("base64");

const normalizeBlogContent = (content: unknown) => {
  if (Array.isArray(content)) return content;
  if (typeof content !== "string") return [];
  try {
    return JSON.parse(content);
  } catch {
    return [];
  }
};

const extractSnippet = (contentArray: Array<{ type: string; content?: string }>) => {
  for (const item of contentArray) {
    if (item.type === "content" && item.content) {
      const text = item.content.replace(/<[^>]*>/g, "").trim();
      if (text.length > 20) {
        return text.slice(0, 160) + (text.length > 160 ? "..." : "");
      }
    }
  }
  return "Comprehensive technical tutorial, architecture breakdown, and full-stack software guide by Yuvaraj.";
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}): Promise<Metadata> {
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://yuvarajs.dev"
  ).replace(/\/$/, "");

  const resolvedSearchParams = (await searchParams) ?? {};
  const learnId = decodeBase64(resolvedSearchParams.id) || (await getFirstTopicId());

  if (!learnId) {
    return {
      title: "Learn Full-Stack Development | Tutorials & Guides | Yuvaraj",
      description:
        "Comprehensive tutorials, architecture notes, frontend, and backend engineering guides by Yuvaraj.",
    };
  }

  const sections = await getGroupedSectionCollections(learnId);
  const initialCollection = sections?.[0]?.collections?.[0];
  const selectedCollectionId =
    decodeBase64(resolvedSearchParams.blog) ??
    (initialCollection ? String(initialCollection.collectionId) : null);

  const topicName = initialCollection?.topic_title || "Engineering";

  if (!selectedCollectionId) {
    return {
      title: `Learn ${topicName} | Software Architecture & Guides | Yuvaraj`,
      description: `Explore detailed tutorials, code patterns, and practical guides on ${topicName} by Yuvaraj.`,
      alternates: {
        canonical: `${baseUrl}/learn?id=${encodeBase64(learnId)}`,
      },
    };
  }

  const blogData = await getBlogsByCollectionId(selectedCollectionId);
  const heading = blogData[0]?.heading || initialCollection?.collection_title || "Tutorial";
  const blogArray = normalizeBlogContent(blogData[0]?.content ?? []);
  const description = extractSnippet(blogArray);

  const pageUrl = `${baseUrl}/learn?id=${encodeBase64(learnId)}&blog=${encodeBase64(selectedCollectionId)}`;

  return {
    title: `${heading} | Learn ${topicName} | Yuvaraj`,
    description,
    keywords: [
      topicName,
      heading,
      "Full Stack Development",
      "Software Architecture",
      "Next.js",
      "React",
      "Node.js",
      "Yuvaraj",
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${heading} | Learn ${topicName}`,
      description,
      url: pageUrl,
      type: "article",
      siteName: "Yuvaraj Dev FullStack",
    },
    twitter: {
      card: "summary_large_image",
      title: `${heading} | Learn ${topicName}`,
      description,
    },
  };
}

export default async function LearnPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const resolvedSearchParams = (await searchParams) ?? {};
  let encodedLearnId = resolvedSearchParams.id ?? null;
  let learnId = decodeBase64(encodedLearnId);

  // Fallback: If no learnId provided in URL, automatically load the first topic from database
  if (!learnId) {
    const firstTopicId = await getFirstTopicId();
    if (firstTopicId) {
      learnId = String(firstTopicId);
      encodedLearnId = encodeBase64(firstTopicId);
    }
  }

  if (!learnId) {
    const allTopics = await getAllTopics();
    return (
      <div className="mx-auto max-w-4xl py-12 px-4">
        <div className="rounded-3xl border border-[var(--line)] bg-[var(--card)] p-8 text-center shadow-sm">
          <FaGraduationCap className="mx-auto mb-4 text-4xl" style={{ color: "var(--signal)" }} />
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ink)]">
            Explore Learning Tracks
          </h1>
          <p className="mt-2 text-sm text-[var(--ink-soft)]">
            Select a topic below to explore interactive guides, notes, and architecture tutorials.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {allTopics.map((topic) => (
              <Link
                key={topic.id}
                href={`/learn?id=${encodeBase64(topic.id)}`}
                className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-2.5 text-sm font-semibold text-[var(--ink)] hover:border-[var(--signal)] hover:shadow-sm transition"
              >
                {topic.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const sectionCollectionData = await getGroupedSectionCollections(learnId);

  const initialCollectionId =
    sectionCollectionData?.[0]?.collections?.[0]?.collectionId;

  const selectedCollectionId =
    decodeBase64(resolvedSearchParams.blog) ??
    (initialCollectionId ? String(initialCollectionId) : null);

  const blogData = selectedCollectionId
    ? await getBlogsByCollectionId(selectedCollectionId)
    : [];

  const selectedBlogEncoded = selectedCollectionId
    ? encodeBase64(selectedCollectionId)
    : null;

  const blogArray = normalizeBlogContent(blogData[0]?.content ?? []);

  const tocItems = buildBlogTocItems(
    blogData[0]?.heading ?? "Untitled",
    blogArray
  );

  const blogContent =
    blogData.length > 0
      ? {
          heading: blogData[0]?.heading ?? "Untitled",
          blog: blogArray,
        }
      : null;

  // Calculate Previous and Next Articles in the sequence
  const { prev, next } = getSiblingCollections(
    sectionCollectionData,
    selectedCollectionId
  );

  const prevArticle: ArticleNavTarget | null = prev
    ? {
        title: prev.collection_title,
        href: `/learn?id=${encodedLearnId}&blog=${encodeBase64(prev.collectionId)}`,
        sectionName: prev.section_name,
      }
    : null;

  const nextArticle: ArticleNavTarget | null = next
    ? {
        title: next.collection_title,
        href: `/learn?id=${encodedLearnId}&blog=${encodeBase64(next.collectionId)}`,
        sectionName: next.section_name,
      }
    : null;

  const cookieStore = await cookies();
  const currentUser = await getCurrentUser(
    getSessionTokenFromCookie(cookieStore.get(SESSION_COOKIE)?.value ?? null)
  );
  const editHref =
    currentUser &&
    canAccessAdmin(currentUser.role) &&
    selectedBlogEncoded
      ? `/edit?blog=${selectedBlogEncoded}&id=${encodedLearnId}`
      : null;

  // JSON-LD Structured Data Schema for Search Engines
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://yuvarajs.dev"
  ).replace(/\/$/, "");
  const pageUrl = `${baseUrl}/learn?id=${encodedLearnId}${selectedBlogEncoded ? `&blog=${selectedBlogEncoded}` : ""}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: blogContent?.heading || "Tutorial",
    description: extractSnippet(blogArray),
    author: {
      "@type": "Person",
      name: "Yuvaraj",
      url: baseUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Yuvaraj",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  };

  return (
    <div className="w-full py-4">
      {/* Search Engine Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <LearnNavClient
        sections={sectionCollectionData}
        encodedLearnId={encodedLearnId ?? encodeBase64(learnId)}
        selectedBlogEncoded={selectedBlogEncoded}
        tocItems={tocItems}
      >
        {blogContent ? (
          <BlogTemplate
            heading={blogContent.heading}
            blog={blogContent.blog}
            editHref={editHref}
            prevArticle={prevArticle}
            nextArticle={nextArticle}
          />
        ) : (
          <div className="rounded-3xl border border-[var(--line)] bg-[var(--card)] p-8 text-[var(--ink-soft)] shadow-2xs">
            No blog content found.
          </div>
        )}
      </LearnNavClient>
    </div>
  );
}
