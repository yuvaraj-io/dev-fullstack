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
    <div>Loading sections...</div>
  ) : (
    sectionCollectionData.map((c: any) => (
      <div key={c.id} className="mt-4 text-purple-500">
        {c.section_name}

        {c.collections && c.collections.map((s: any) => {
          const encodedId = btoa(s.collectionId);

          return (
            <div
              key={s.id}
              className={`mt-2 p-2 text-white ${
                encodedId === blogID ? 'bg-gray-500' : ''
              }`}
              onClick={() => handleBlogSelect(s)}
            >
              {s.collection_title}
            </div>
          );
        })}
      </div>
    ))
  );

  let blogContent = null;
  if (loadingBlog) {
    blogContent = <div>Loading blog...</div>;
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
    <div className="flex">
      <div style={{ width: '20%' }}>{collectionContent}</div>
      <div style={{ width: '60%' }}>{blogContent}</div>
    </div>
  );
}
