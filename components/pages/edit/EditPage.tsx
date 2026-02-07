"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Editor from "@/components/pages/write/Editor";

type BlogRecord = {
  heading: string;
  content: string;
};

export default function EditPage() {
  const searchParams = useSearchParams();
  const urlBlogID = searchParams.get("blog");

  const [blogID, setBlogID] = useState<string | null>(urlBlogID);
  const [blogData, setBlogData] = useState<BlogRecord[] | null>(null);
  const [loadingBlog, setLoadingBlog] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [divContent, setDivContent] = useState<any[]>([]);

  useEffect(() => {
    if (urlBlogID) setBlogID(urlBlogID);
  }, [urlBlogID]);

  useEffect(() => {
    if (!blogID) return;
    const fetchBlog = async () => {
      setLoadingBlog(true);
      setError(null);
      try {
        const res = await fetch(`/api/blogs/${atob(blogID)}`);
        const data = await res.json();
        setBlogData(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Failed to load blog");
      } finally {
        setLoadingBlog(false);
      }
    };
    fetchBlog();
  }, [blogID]);

  const initialEditor = useMemo(() => {
    if (!blogData || blogData.length === 0) return [];
    try {
      return JSON.parse(blogData[0].content || "[]");
    } catch {
      return [];
    }
  }, [blogData]);

  const editorChange = (ref: any[]) => {
    setDivContent(ref);
  };

  const handleSubmit = async () => {
    if (!blogID || !blogData || blogData.length === 0) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/blogs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: divContent,
          collections_id: atob(blogID),
          heading: blogData[0].heading,
        }),
      });
      if (!res.ok) {
        const msg = await res.json();
        throw new Error(msg?.error || "Failed to update blog");
      }
      alert("Saved. Refresh to confirm.");
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  let blogContent: React.ReactNode = null;
  if (loadingBlog) {
    blogContent = <div>Loading blog...</div>;
  } else if (error) {
    blogContent = <div className="text-red-400">{error}</div>;
  } else if (blogData && blogData.length > 0) {
    blogContent = (
      <>
        <h1 className="py-5 pb-10 text-3xl font-bold text-purple-400">
          {blogData[0].heading}
        </h1>
        <Editor blurChange={editorChange} initialEditor={initialEditor} />
      </>
    );
  }

  return (
    <div>
      <div className="flex">
        <div className="w-1/5">
          <button
            className="rounded-lg bg-purple-500 px-4 py-2 text-lg font-bold text-white hover:bg-purple-600 disabled:opacity-60"
            onClick={handleSubmit}
            disabled={saving}
            type="button"
          >
            {saving ? "Saving..." : "Submit blog"}
          </button>
        </div>
        <div className="w-3/5">{blogContent}</div>
      </div>
    </div>
  );
}
