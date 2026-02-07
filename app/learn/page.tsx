import Link from 'next/link';
import pool from '@/lib/db';
import BlogTemplate from '@/components/pages/learn/BlogTemplate';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface SectionCollectionRow {
  sectionId: number;
  section_name: string;
  collectionId: number;
  collection_title: string;
  topic_title: string;
  topicId: number;
  [key: string]: any;
}

interface GroupedSection {
  sectionId: number;
  section_name: string;
  collections: SectionCollectionRow[];
}

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

const fetchSections = async (topicId: string) => {
  const sql = `
      SELECT 
        sc.*,
        c.title AS collection_title,
        t.name AS topic_title,
        s.name AS section_name
      FROM section_collections sc
      JOIN collections c ON sc.collectionId = c.id
      JOIN topics t ON sc.topicId = t.id
      JOIN sections s ON sc.sectionId = s.id
      WHERE sc.topicId = ?;
    `;

  const [results] = await pool.query(sql, [topicId]);
  const rows = results as SectionCollectionRow[];

  rows.sort((a, b) => a.sectionId - b.sectionId);

  const grouped: Record<string, GroupedSection> = {};

  rows.forEach((item) => {
    const key = `${item.sectionId}-${item.section_name}`;

    if (!grouped[key]) {
      grouped[key] = {
        sectionId: item.sectionId,
        section_name: item.section_name,
        collections: [],
      };
    }

    grouped[key].collections.push(item);
  });

  return Object.values(grouped).sort(
    (a, b) => a.sectionId - b.sectionId
  );
};

const fetchBlogs = async (collectionId: string) => {
  const [results]: any = await pool.query(
    'SELECT * FROM blogs WHERE collections_id = ?',
    [collectionId]
  );

  return results ?? [];
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
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 text-slate-300">
        Missing or invalid learn id.
      </div>
    );
  }

  const sectionCollectionData = await fetchSections(learnId);

  const initialCollectionId =
    sectionCollectionData?.[0]?.collections?.[0]?.collectionId;

  const selectedCollectionId =
    decodeBase64(resolvedSearchParams.blog) ??
    (initialCollectionId ? String(initialCollectionId) : null);

  const blogData = selectedCollectionId
    ? await fetchBlogs(selectedCollectionId)
    : [];

  const selectedBlogEncoded = selectedCollectionId
    ? encodeBase64(selectedCollectionId)
    : null;

  const blogContent =
    blogData.length > 0
      ? {
          heading: blogData[0]?.heading ?? 'Untitled',
          blog: (() => {
            try {
              return JSON.parse(blogData[0]?.content ?? '[]');
            } catch {
              return [];
            }
          })(),
        }
      : null;

  return (
    <div className="flex gap-6 pb-12">
      <aside className="w-1/4 max-w-xs border-r border-slate-800 pr-4">
        <div className="sticky top-24">
          <div className="mb-3 text-xs uppercase tracking-[0.3em] bg-gradient-to-r from-purple-400 via-fuchsia-400 to-sky-400 bg-clip-text text-transparent">
            Collections
          </div>
          <div className="max-h-[70vh] overflow-y-auto pr-2 space-y-3">
            {sectionCollectionData.map((c: any) => (
              <div
                key={`${c.sectionId}-${c.section_name}`}
                className="mt-4"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] bg-gradient-to-r from-purple-300 via-fuchsia-300 to-sky-300 bg-clip-text text-transparent">
                    {c.section_name}
                  </div>
                </div>

                <div className="space-y-3">
                  {c.collections &&
                    c.collections.map((s: any) => {
                      const encodedId = encodeBase64(
                        s.collectionId
                      );
                      const isActive =
                        encodedId === selectedBlogEncoded;

                      return (
                        <Link
                          key={s.id}
                          prefetch={false}
                          href={{
                            pathname: '/learn',
                            query: {
                              id:
                                encodedLearnId ??
                                encodeBase64(learnId),
                              blog: encodedId,
                            },
                          }}
                          className={`block w-full rounded-md px-3 py-2.5 text-left text-sm transition ring-1 ring-transparent ${
                            isActive
                              ? 'bg-purple-500/20 text-white ring-1 ring-purple-400/70'
                              : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="line-clamp-2">
                              {s.collection_title}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
      <div className="w-3/4">
        {blogContent ? (
          <BlogTemplate
            heading={blogContent.heading}
            blog={blogContent.blog}
          />
        ) : (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 text-slate-400">
            No blog content found.
          </div>
        )}
      </div>
    </div>
  );
}
