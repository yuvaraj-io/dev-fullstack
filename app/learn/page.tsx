import BlogTemplate from '@/components/pages/learn/BlogTemplate';
import LearnNavClient from './LearnNavClient';
import {
  getBlogsByCollectionId,
  getGroupedSectionCollections,
} from '@/lib/contentQueries';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type SearchParams = {
  id?: string;
  blog?: string;
};

const decodeBase64 = (value?: string | null) => {
  if (!value) return null;
  try {
    return Buffer.from(value, 'base64').toString('utf-8');
  } catch {
    return null;
  }
};

const encodeBase64 = (value: string | number) =>
  Buffer.from(String(value), 'utf-8').toString('base64');

const normalizeBlogContent = (content: unknown) => {
  if (Array.isArray(content)) return content;
  if (typeof content !== 'string') return [];
  try {
    return JSON.parse(content);
  } catch {
    return [];
  }
};

export default async function LearnPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const encodedLearnId = resolvedSearchParams.id ?? null;
  const learnId = decodeBase64(encodedLearnId);

  if (!learnId) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-6 text-slate-600 shadow-sm">
        Missing or invalid learn id.
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

  const blogContent =
    blogData.length > 0
      ? {
          heading: blogData[0]?.heading ?? 'Untitled',
          blog: normalizeBlogContent(blogData[0]?.content),
        }
      : null;

  return (
    <LearnNavClient
      sections={sectionCollectionData}
      encodedLearnId={encodedLearnId ?? encodeBase64(learnId)}
      selectedBlogEncoded={selectedBlogEncoded}
    >
      {blogContent ? (
        <BlogTemplate
          heading={blogContent.heading}
          blog={blogContent.blog}
        />
      ) : (
        <div className="rounded-lg border border-slate-200 bg-white p-6 text-slate-500 shadow-sm">
          No blog content found.
        </div>
      )}
    </LearnNavClient>
  );
}
