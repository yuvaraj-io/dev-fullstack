'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import BlogTemplate, { type BlogItem } from '@/components/pages/learn/BlogTemplate';

type SectionCollectionItem = {
  id?: number;
  collectionId: number;
  collection_title: string;
};

type GroupedSection = {
  sectionId: number;
  section_name: string;
  collections: SectionCollectionItem[];
};

type BlogRecord = {
  heading: string;
  content: unknown;
};

export default function Blogs() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const learnID = searchParams.get('id');
  const urlBlogID = searchParams.get('blog');

  const [blogID, setBlogID] = useState<string | null>(urlBlogID);
  const [sectionCollectionData, setSectionCollectionData] = useState<GroupedSection[]>([]);
  const [blogData, setBlogData] = useState<BlogRecord[]>([]);

  const [loadingSections, setLoadingSections] = useState(false);
  const [loadingBlog, setLoadingBlog] = useState(false);

  const normalizeBlogContent = (content: unknown): BlogItem[] => {
    if (Array.isArray(content)) return content as BlogItem[];
    if (typeof content !== 'string') return [];
    try {
      return JSON.parse(content);
    } catch {
      return [];
    }
  };

  /**
   * Sync blogID from URL
   */
  useEffect(() => {
    if (urlBlogID) {
      setBlogID(urlBlogID);
    }
  }, [urlBlogID]);

  /**
   * Fetch sections → /api/sections/:id
   */
  useEffect(() => {
    if (!learnID) return;

    const fetchSections = async () => {
      setLoadingSections(true);
      try {
        const res = await fetch(`/api/collections/${atob(learnID)}`);
        const data = await res.json();
        setSectionCollectionData(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to load sections', err);
      } finally {
        setLoadingSections(false);
      }
    };

    fetchSections();
  }, [learnID]);

  /**
   * Handle blog click
   */
  const handleBlogSelect = useCallback((blog: SectionCollectionItem) => {
    const encodedBlogID = btoa(String(blog.collectionId));
    setBlogID(encodedBlogID);

    router.push(
      `/learn?id=${learnID}&blog=${encodedBlogID}`
    );
  }, [learnID, router]);

  /**
   * Auto select first blog
   */
  useEffect(() => {
    if (blogID) return;

    const first =
      sectionCollectionData?.[0]?.collections?.[0];

    if (first) {
      handleBlogSelect(first);
    }
  }, [sectionCollectionData, blogID, handleBlogSelect]);

  /**
   * Fetch blog → /api/blogs/:id
   */
  useEffect(() => {
    if (!blogID) return;

    const fetchBlog = async () => {
      setLoadingBlog(true);
      try {
        const res = await fetch(`/api/blogs/${atob(blogID)}`);
        const data = await res.json();
        setBlogData(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to load blog', err);
      } finally {
        setLoadingBlog(false);
      }
    };

    fetchBlog();
  }, [blogID]);

  const collectionContent = loadingSections ? (
    <div className="space-y-3">
      {[...Array(3)].map((_, i) => (
        <div
          key={`section-skeleton-${i}`}
          className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm"
        >
          <div className="mb-2 h-3 w-24 animate-pulse rounded bg-slate-200" />
          <div className="space-y-2">
            {[...Array(4)].map((__, j) => (
              <div
                key={`item-skeleton-${i}-${j}`}
                className="h-8 w-full animate-pulse rounded bg-slate-100"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  ) : (
    sectionCollectionData.map((c) => (
      <div key={c.sectionId} className="mt-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            {c.section_name}
          </div>
        </div>

        <div className="space-y-3">
          {c.collections &&
            c.collections.map((s) => {
              const encodedId = btoa(String(s.collectionId));
              const isActive = encodedId === blogID;

              return (
                <button
                  key={s.id ?? s.collectionId}
                  className={`w-full rounded-md px-3 py-2.5 text-left text-sm transition ring-1 ring-transparent ${
                    isActive
                      ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                  }`}
                  onClick={() => handleBlogSelect(s)}
                  type="button"
                >
                  <div className="flex items-center gap-2">
                    <span className="line-clamp-2">{s.collection_title}</span>
                  </div>
                </button>
              );
            })}
        </div>
      </div>
    ))
  );

  let blogContent = null;
  if (loadingBlog) {
    blogContent = (
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 h-8 w-2/3 animate-pulse rounded bg-slate-200" />
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={`blog-line-${i}`}
              className="h-4 w-full animate-pulse rounded bg-slate-100"
            />
          ))}
        </div>
      </div>
    );
  } else if (blogData.length > 0) {
    const firstBlog = blogData[0];
    blogContent = (
      <BlogTemplate
        heading={firstBlog.heading}
        blog={normalizeBlogContent(firstBlog.content)}
      />
    );
  }

  return (
    <div className="flex gap-6 pb-12">
      <aside className="w-1/4 max-w-xs border-r border-slate-200 pr-4">
        <div className="sticky top-24">
          <div className="mb-3 text-xs uppercase tracking-[0.3em] text-slate-500">
            Collections
          </div>
          <div className="max-h-[70vh] overflow-y-auto pr-2 space-y-3">
            {collectionContent}
          </div>
        </div>
      </aside>
      <div className="w-3/4">{blogContent}</div>
    </div>
  );
}
