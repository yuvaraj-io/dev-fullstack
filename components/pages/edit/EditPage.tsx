"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import DOMPurify from "dompurify";
import Editor, { type BlogBlock } from "@/components/pages/write/Editor";

type BlogRecord = {
  heading: string;
  content: unknown;
};

export default function EditPage() {
  const searchParams = useSearchParams();
  const urlBlogID = searchParams.get("blog");

  const [blogID, setBlogID] = useState<string | null>(urlBlogID);
  const [blogData, setBlogData] = useState<BlogRecord[] | null>(null);
  const [loadingBlog, setLoadingBlog] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [heading, setHeading] = useState("");
  const [divContent, setDivContent] = useState<BlogBlock[]>([]);

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

  useEffect(() => {
    if (blogData?.[0]) {
      setHeading(blogData[0].heading ?? "");
    }
  }, [blogData]);

  const initialEditor = useMemo(() => {
    if (!blogData || blogData.length === 0) return [];
    if (Array.isArray(blogData[0].content)) return blogData[0].content as BlogBlock[];
    if (typeof blogData[0].content !== "string") return [];
    try {
      return JSON.parse(blogData[0].content || "[]");
    } catch {
      return [];
    }
  }, [blogData]);

  const editorChange = useCallback((ref: BlogBlock[]) => {
    setDivContent(ref);
  }, []);

  const sanitizeBlocks = (blocks: BlogBlock[]): BlogBlock[] =>
    blocks.map((block) => {
      if (block.type === "content" || block.type === "heading" || block.type === "subheading") {
        return { ...block, content: DOMPurify.sanitize(block.content) };
      }
      return block;
    });

  const handleSubmit = async () => {
    if (!blogID || !blogData || blogData.length === 0) return;

    const trimmedHeading = heading.trim();
    if (!trimmedHeading) {
      setError("H1 (blog title) is required.");
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/blogs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: sanitizeBlocks(divContent),
          collections_id: atob(blogID),
          heading: trimmedHeading,
        }),
      });
      if (!res.ok) {
        const msg = await res.json();
        throw new Error(msg?.error || "Failed to update blog");
      }
      alert("Saved. Refresh to confirm.");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  let blogContent: React.ReactNode = null;
  if (loadingBlog) {
    blogContent = <div>Loading blog...</div>;
  } else if (error && !blogData) {
    blogContent = <div className="text-red-400">{error}</div>;
  } else if (blogData && blogData.length > 0) {
    blogContent = (
      <Editor
        key={blogID}
        blurChange={editorChange}
        initialEditor={initialEditor}
        heading={heading}
        onHeadingChange={setHeading}
      />
    );
  }

  return (
    <div>
      <div className="flex">
        <div className="w-1/5">
          <button
            className="rounded-lg bg-blue-600 px-4 py-2 text-lg font-bold text-white hover:bg-blue-700 disabled:opacity-60"
            onClick={handleSubmit}
            disabled={saving}
            type="button"
          >
            {saving ? "Saving..." : "Submit blog"}
          </button>
          {error && blogData ? <div className="mt-3 text-sm text-red-400">{error}</div> : null}
        </div>
        <div className="w-3/5">{blogContent}</div>
      </div>
    </div>
  );
}
