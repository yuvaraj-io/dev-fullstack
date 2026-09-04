import type { Metadata } from "next";
import BlogTemplate, { type ArticleNavTarget } from "@/components/pages/learn/BlogTemplate";
import LearnNavClient from "@/app/learn/LearnNavClient";
import { buildBlogTocItems } from "@/lib/blogToc";
import { slugify } from "@/lib/slug";
import {
  getBlogsByCollectionId,
  getGroupedSectionCollections,
  getSiblingCollections,
  getTopicBySlug,
  getCollectionBySlug,
  type TopicDocument,
  type CollectionDocument,
} from "@/lib/contentQueries";
import { cookies } from "next/headers";
import {
  canAccessAdmin,
  getCurrentUser,
  getSessionTokenFromCookie,
  SESSION_COOKIE,
} from "@/lib/auth";
import { notFound } from "next/navigation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

export async function generateReaderMetadata({
  topicSlug,
  articleSlug,
}: {
  topicSlug: string;
  articleSlug?: string;
}): Promise<Metadata> {
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://yuvaraj.io"
  ).replace(/\/$/, "");

  const topic = await getTopicBySlug(topicSlug);
  if (!topic) {
    return {};
  }

  const sections = await getGroupedSectionCollections(topic.id);
  const initialCollection = sections?.[0]?.collections?.[0];

  const collection = articleSlug
    ? await getCollectionBySlug(topic.id, articleSlug)
    : initialCollection;

  const topicName = topic.name;
  const currentTopicSlug = slugify(topicName);

  if (!collection) {
    const topicUrl = `${baseUrl}/learn/${currentTopicSlug}`;
    const ogImage = `${baseUrl}/api/og?title=${encodeURIComponent(`Learn ${topicName}`)}&topic=${encodeURIComponent(topicName)}`;
    return {
      title: `Learn ${topicName} | Software Architecture & Guides | Yuvaraj`,
      description: `Explore detailed tutorials, code patterns, and practical guides on ${topicName} by Yuvaraj.`,
      alternates: {
        canonical: topicUrl,
      },
      openGraph: {
        title: `Learn ${topicName} | Yuvaraj`,
        description: `Explore detailed tutorials on ${topicName}.`,
        url: topicUrl,
        type: "website",
        images: [{ url: ogImage, width: 1200, height: 630, alt: `Learn ${topicName}` }],
      },
      twitter: {
        card: "summary_large_image",
        title: `Learn ${topicName} | Yuvaraj`,
        description: `Explore detailed tutorials on ${topicName}.`,
        images: [ogImage],
      },
    };
  }

  const collectionId = "id" in collection ? (collection as CollectionDocument).id : (collection as { collectionId: number }).collectionId;
  const collectionTitle = "title" in collection ? (collection as CollectionDocument).title : (collection as { collection_title: string }).collection_title;

  const blogData = await getBlogsByCollectionId(collectionId);
  const heading = blogData[0]?.heading || collectionTitle || "Tutorial";
  const currentArticleSlug = slugify(collectionTitle || heading);
  const blogArray = normalizeBlogContent(blogData[0]?.content ?? []);
  const description = extractSnippet(blogArray);

  const pageUrl = `${baseUrl}/learn/${currentTopicSlug}/${currentArticleSlug}`;
  const ogImage = `${baseUrl}/api/og?title=${encodeURIComponent(heading)}&topic=${encodeURIComponent(topicName)}`;

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
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: heading,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${heading} | Learn ${topicName}`,
      description,
      images: [ogImage],
    },
  };
}

export default async function LearnReaderPage({
  topicSlug,
  articleSlug,
}: {
  topicSlug: string;
  articleSlug?: string;
}) {
  const topic = await getTopicBySlug(topicSlug);
  if (!topic) {
    notFound();
  }

  const sectionCollectionData = await getGroupedSectionCollections(topic.id);
  const initialCollection = sectionCollectionData?.[0]?.collections?.[0];

  let selectedCollectionId: number | null = null;
  let activeArticleSlug: string = "";

  if (articleSlug) {
    const col = await getCollectionBySlug(topic.id, articleSlug);
    if (col) {
      selectedCollectionId = col.id;
      activeArticleSlug = slugify(col.title);
    }
  }

  if (!selectedCollectionId && initialCollection) {
    selectedCollectionId = initialCollection.collectionId;
    activeArticleSlug = slugify(initialCollection.collection_title);
  }

  const blogData = selectedCollectionId
    ? await getBlogsByCollectionId(selectedCollectionId)
    : [];

  const blogArray = normalizeBlogContent(blogData[0]?.content ?? []);
  const heading = blogData[0]?.heading || initialCollection?.collection_title || "Untitled";

  const tocItems = buildBlogTocItems(heading, blogArray);
  const blogContent =
    blogData.length > 0
      ? {
          heading,
          blog: blogArray,
        }
      : null;

  const { prev, next } = getSiblingCollections(
    sectionCollectionData,
    selectedCollectionId
  );

  const topicCleanSlug = slugify(topic.name);

  const prevArticle: ArticleNavTarget | null = prev
    ? {
        title: prev.collection_title,
        href: `/learn/${topicCleanSlug}/${slugify(prev.collection_title)}`,
        sectionName: prev.section_name,
      }
    : null;

  const nextArticle: ArticleNavTarget | null = next
    ? {
        title: next.collection_title,
        href: `/learn/${topicCleanSlug}/${slugify(next.collection_title)}`,
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
    selectedCollectionId
      ? `/edit?blog=${Buffer.from(String(selectedCollectionId)).toString("base64")}&id=${Buffer.from(String(topic.id)).toString("base64")}`
      : null;

  // JSON-LD Structured Data
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://yuvaraj.io"
  ).replace(/\/$/, "");
  const pageUrl = `${baseUrl}/learn/${topicCleanSlug}${activeArticleSlug ? `/${activeArticleSlug}` : ""}`;

  const techArticleLd = {
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

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Learn",
        item: `${baseUrl}/learn`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: topic.name,
        item: `${baseUrl}/learn/${topicCleanSlug}`,
      },
      ...(blogContent?.heading
        ? [
            {
              "@type": "ListItem",
              position: 4,
              name: blogContent.heading,
              item: pageUrl,
            },
          ]
        : []),
    ],
  };

  return (
    <div className="w-full py-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <LearnNavClient
        sections={sectionCollectionData}
        topicSlug={topicCleanSlug}
        topicTitle={topic.name}
        activeArticleSlug={activeArticleSlug}
        selectedCollectionId={selectedCollectionId}
        activeArticleTitle={heading}
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
