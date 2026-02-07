'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import BlogTemplate from '@/components/pages/learn/BlogTemplate';

export default function Blogs() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const learnID = searchParams.get('id');
  const urlBlogID = searchParams.get('blog');

  const [blogID, setBlogID] = useState<string | null>(urlBlogID);
  const [sectionCollectionData, setSectionCollectionData] = useState<any[]>([]);
  const [blogData, setBlogData] = useState<any[]>([]);

  const [loadingSections, setLoadingSections] = useState(false);
  const [loadingBlog, setLoadingBlog] = useState(false);

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
        setSectionCollectionData(data);
      } catch (err) {
        console.error('Failed to load sections', err);
      } finally {
        setLoadingSections(false);
      }
    };

    fetchSections();
  }, [learnID]);

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
  }, [sectionCollectionData, blogID]);

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
        setBlogData(data);
      } catch (err) {
        console.error('Failed to load blog', err);
      } finally {
        setLoadingBlog(false);
      }
    };

    fetchBlog();
  }, [blogID]);

  /**
   * Handle blog click
   */
  const handleBlogSelect = (blog: any) => {
    const encodedBlogID = btoa(blog.collectionId);
    setBlogID(encodedBlogID);

    router.push(
      `/learn?id=${learnID}&blog=${encodedBlogID}`
    );
  };

  const collectionContent = loadingSections ? (
    <div className="space-y-3">
      {[...Array(3)].map((_, i) => (
        <div
          key={`section-skeleton-${i}`}
          className="rounded-xl border border-slate-800 bg-slate-900/40 p-3"
        >
          <div className="mb-2 h-3 w-24 animate-pulse rounded bg-slate-700/60" />
          <div className="space-y-2">
            {[...Array(4)].map((__, j) => (
              <div
                key={`item-skeleton-${i}-${j}`}
                className="h-8 w-full animate-pulse rounded bg-slate-800/60"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  ) : (
    sectionCollectionData.map((c: any) => (
      <div
        key={c.id}
        className="mt-4 rounded-xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-3"
      >
        <div className="mb-2 text-xs uppercase tracking-widest text-purple-300/80">
          {c.section_name}
        </div>

        {c.collections &&
          c.collections.map((s: any) => {
            const encodedId = btoa(s.collectionId);
            const isActive = encodedId === blogID;

            return (
              <button
                key={s.id}
                className={`mt-2 w-full rounded-lg border px-3 py-2 text-left text-sm transition ${
                  isActive
                    ? "border-purple-400/70 bg-gradient-to-r from-purple-500/30 to-sky-500/20 text-white shadow-[0_8px_30px_-18px_rgba(168,85,247,0.8)]"
                    : "border-slate-800 bg-slate-900/40 text-slate-300 hover:border-slate-700 hover:text-white"
                }`}
                onClick={() => handleBlogSelect(s)}
                type="button"
              >
                {s.collection_title}
              </button>
            );
          })}
      </div>
    ))
  );

  let blogContent = null;
  if (loadingBlog) {
    blogContent = (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
        <div className="mb-4 h-8 w-2/3 animate-pulse rounded bg-slate-700/60" />
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={`blog-line-${i}`}
              className="h-4 w-full animate-pulse rounded bg-slate-800/60"
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
        blog={JSON.parse(firstBlog.content)}
      />
    );
  }

  return (
    <div className="flex gap-6 pb-12">
      <aside className="w-1/4 max-w-xs border-r border-slate-800 pr-4">
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
