"use client";

import { useReducer, useState } from "react";
import SelectTopics from "./SelectTopics";
import Editor from "./Editor";

type InputState = {
  topicId: number | null;
  collectionTitle: string | null;
  blogTitle: string | null;
};

type ReducerAction =
  | { type: "topic"; payload: number }
  | { type: "collection"; payload: string }
  | { type: "blog"; payload: string }
  | { type: "reset" };

const initialState: InputState = {
  topicId: null,
  collectionTitle: null,
  blogTitle: null,
};

function reducer(state: InputState, action: ReducerAction): InputState {
  switch (action.type) {
    case "topic":
      return { ...state, topicId: action.payload };
    case "collection":
      return { ...state, collectionTitle: action.payload };
    case "blog":
      return { ...state, blogTitle: action.payload };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

export default function WritePage() {
  const [inputState, dispatch] = useReducer(reducer, initialState);
  const [blogContent, setBlogContent] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editorChange = (data: any[]) => {
    setBlogContent(data);
  };

  const handleTopicChange = (topic: { id: number }) => {
    dispatch({ type: "topic", payload: topic.id });
  };

  const handleNavTitle = (ev: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "collection", payload: ev.target.value });
  };

  const handleBlogTitle = (ev: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "blog", payload: ev.target.value });
  };

  const handleSubmit = async () => {
    setError(null);
    if (!inputState.topicId || !inputState.blogTitle || !inputState.collectionTitle) {
      setError("Please fill out all required fields.");
      return;
    }

    setSaving(true);
    try {
      const collectionRes = await fetch("/api/collections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: inputState.collectionTitle,
          topics_id: inputState.topicId,
        }),
      });

      if (!collectionRes.ok) {
        const msg = await collectionRes.json();
        throw new Error(msg?.error || "Failed to create collection");
      }

      const collectionJson = await collectionRes.json();
      const collectionId = collectionJson.id;

      const blogRes = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: blogContent,
          collections_id: collectionId,
          heading: inputState.blogTitle,
        }),
      });

      if (!blogRes.ok) {
        const msg = await blogRes.json();
        throw new Error(msg?.error || "Failed to create blog");
      }
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="pt-8">
      <div className="flex items-center justify-between gap-4 pb-4">
        <SelectTopics topicSend={handleTopicChange} />
        <button
          className="rounded-lg bg-purple-500 px-4 py-2 text-lg font-bold text-white hover:bg-purple-600 disabled:opacity-60"
          onClick={handleSubmit}
          disabled={saving}
          type="button"
        >
          {saving ? "Saving..." : "Submit blog"}
        </button>
      </div>

      {error && <div className="mb-3 text-sm text-red-400">{error}</div>}

      <div className="my-2 mt-3 text-lg">Navigation Title:</div>
      <input
        className="w-full border p-2 text-black"
        type="text"
        value={inputState.collectionTitle || ""}
        onChange={handleNavTitle}
      />

      <div className="my-2 mt-3 text-lg">Blog title:</div>
      <input
        className="w-full border p-2 text-black"
        type="text"
        value={inputState.blogTitle || ""}
        onChange={handleBlogTitle}
      />

      <Editor blurChange={editorChange} />
      <br />
      <br />
    </div>
  );
}
