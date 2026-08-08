"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DOMPurify from "dompurify";
import Editor, { type BlogBlock } from "@/components/pages/write/Editor";

type BlogRecord = {
  heading: string;
  content: unknown;
};

type CollectionRecord = {
  id: number;
  topics_id: number;
};

export default function EditPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlBlogID = searchParams.get("blog");
  const urlLearnID = searchParams.get("id");

  const [blogID, setBlogID] = useState<string | null>(urlBlogID);
  const [learnID, setLearnID] = useState<string | null>(urlLearnID);
  const [blogData, setBlogData] = useState<BlogRecord[] | null>(null);
  const [loadingBlog, setLoadingBlog] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [heading, setHeading] = useState("");
  const [divContent, setDivContent] = useState<BlogBlock[]>([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    if (urlBlogID) setBlogID(urlBlogID);
  }, [urlBlogID]);

  useEffect(() => {
    if (urlLearnID) setLearnID(urlLearnID);
  }, [urlLearnID]);

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
    if (!blogID || urlLearnID) return;

    const resolveLearnId = async () => {
      try {
        const collectionId = Number(atob(blogID));
        const res = await fetch("/api/collections");
        const data = (await res.json()) as CollectionRecord[];
        if (!Array.isArray(data)) return;

        const collection = data.find((item) => item.id === collectionId);
        if (collection?.topics_id != null) {
          setLearnID(btoa(String(collection.topics_id)));
        }
      } catch (err) {
        console.error(err);
      }
    };

    resolveLearnId();
  }, [blogID, urlLearnID]);

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

  const learnHref = useMemo(() => {
    if (!learnID) return "/learn";
    if (!blogID) return `/learn?id=${learnID}`;
    return `/learn?id=${learnID}&blog=${blogID}`;
  }, [blogID, learnID]);

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
      setShowSuccessPopup(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleGoToLearn = () => {
    setShowSuccessPopup(false);
    router.push(learnHref);
  };

  const handleRefreshPage = () => {
    setShowSuccessPopup(false);
    window.location.reload();
  };

  const handleOpenLearnNewPage = () => {
    setShowSuccessPopup(false);
    window.open(learnHref, "_blank", "noopener,noreferrer");
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

      {showSuccessPopup ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="save-success-title"
        >
          <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-xl">
            <h2 id="save-success-title" className="text-xl font-bold text-slate-900">
              Changes are done
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Your blog was saved successfully. What would you like to do next?
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <button
                className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                onClick={handleGoToLearn}
                type="button"
              >
                Navigate to Learn page
              </button>
              <button
                className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                onClick={handleRefreshPage}
                type="button"
              >
                Refresh this page
              </button>
              <button
                className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                onClick={handleOpenLearnNewPage}
                type="button"
              >
                Open Learn in new page
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
