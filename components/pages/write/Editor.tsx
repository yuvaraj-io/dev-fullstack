"use client";

import { useEffect, useReducer, useRef } from "react";
import ContentEditor from "./ContentEditor";
import CodeEditor from "./CodeEditor";
import ImageEditor from "./ImageEditor";

type ContentBlock = {
  id: number;
  type: "content" | "heading" | "subheading";
  content: string;
};

type CodeBlock = {
  id: number;
  type: "code";
  code: string;
  codeType: string;
  link?: string;
  btn?: string;
};

type ImageBlock = {
  id: number;
  type: "image";
  image?: string;
  assetId?: string;
  link?: string;
  btn?: string;
};

export type BlogBlock = ContentBlock | CodeBlock | ImageBlock;

type EditorAction =
  | { type: "image" }
  | { type: "updateImageFields"; id: number; payload: Partial<ImageBlock> }
  | { type: "code"; payload: { code: string; codeType?: string; link?: string; btn?: string } }
  | { type: "codeEdit"; id: number; payload: Partial<CodeBlock> }
  | { type: "content"; payload: { content: string } }
  | { type: "contentEdit"; id: number; payload: { content: string } }
  | { type: "heading"; payload: { content: string } }
  | { type: "headingEdit"; id: number; payload: { content: string } }
  | { type: "subheading"; payload: { content: string } }
  | { type: "subheadingEdit"; id: number; payload: { content: string } }
  | { type: "remove"; payload: { id: number } }
  | { type: "reset" };

const initialState: BlogBlock[] = [];

function reducer(state: BlogBlock[], action: EditorAction): BlogBlock[] {
  switch (action.type) {
    case "image":
      return [
        ...state,
        {
          id: Date.now(),
          type: "image",
          image: "",
          link: "",
          btn: "",
        },
      ];

    case "updateImageFields":
      return state.map((item) => {
        if (item.id !== action.id || item.type !== "image") {
          return item;
        }
        return { ...item, ...action.payload };
      });

    case "code":
      return [
        ...state,
        {
          id: Date.now(),
          type: "code",
          code: action.payload.code,
          codeType: action.payload.codeType || "javascript",
          link: action.payload.link || "",
          btn: action.payload.btn || "",
        },
      ];

    case "codeEdit":
      return state.map((item) => {
        if (item.id !== action.id || item.type !== "code") {
          return item;
        }
        return { ...item, ...action.payload };
      });

    case "content":
      return [
        ...state,
        { id: Date.now(), type: "content", content: action.payload.content },
      ];

    case "contentEdit":
      return state.map((item) => {
        if (item.id !== action.id || item.type !== "content") {
          return item;
        }
        return { ...item, content: action.payload.content };
      });

    case "heading":
      return [
        ...state,
        { id: Date.now(), type: "heading", content: action.payload.content },
      ];

    case "headingEdit":
      return state.map((item) => {
        if (item.id !== action.id || item.type !== "heading") {
          return item;
        }
        return { ...item, content: action.payload.content };
      });

    case "subheading":
      return [
        ...state,
        { id: Date.now(), type: "subheading", content: action.payload.content },
      ];

    case "subheadingEdit":
      return state.map((item) => {
        if (item.id !== action.id || item.type !== "subheading") {
          return item;
        }
        return { ...item, content: action.payload.content };
      });

    case "remove":
      return state.filter((item) => item.id !== action.payload.id);

    case "reset":
      return initialState;

    default:
      return state;
  }
}

type EditorProps = {
  blurChange: (data: BlogBlock[]) => void;
  initialEditor?: BlogBlock[];
  heading?: string;
  onHeadingChange?: (value: string) => void;
};

function Editor({ blurChange, initialEditor, heading, onHeadingChange }: EditorProps) {
  const headingInputRef = useRef<HTMLInputElement>(null);
  const [allEditor, setEditor] = useReducer(
    reducer,
    initialEditor ?? initialState
  );

  useEffect(() => {
    blurChange(allEditor);
  }, [allEditor, blurChange]);

  const removeIndex = (id: number) => {
    setEditor({ type: "remove", payload: { id } });
  };

  const addContent = () => {
    setEditor({ type: "content", payload: { content: "" } });
  };

  const addHeading = () => {
    setEditor({ type: "heading", payload: { content: "" } });
  };

  const addSubhead = () => {
    setEditor({ type: "subheading", payload: { content: "" } });
  };

  const addCodeEditor = () => {
    setEditor({
      type: "code",
      payload: { code: "", codeType: "html", link: "", btn: "Try on Stackblitz" },
    });
  };

  const addImgEditor = () => {
    setEditor({ type: "image" });
  };

  const focusHeading = () => {
    headingInputRef.current?.focus();
    headingInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div>
      {onHeadingChange !== undefined && (
        <div className="mt-6">
          <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">H1</div>
          <input
            ref={headingInputRef}
            className="w-full rounded-md border border-blue-400 bg-white p-3 text-2xl font-bold text-slate-950 outline-none focus:border-blue-600"
            type="text"
            value={heading ?? ""}
            onChange={(event) => onHeadingChange(event.target.value)}
            placeholder="Blog title (H1)"
          />
        </div>
      )}

      {allEditor.map((editor) => {
        if (editor.type === "content" || editor.type === "heading" || editor.type === "subheading") {
          return (
            <ContentEditor
              key={editor.id}
              value={editor}
              index={editor.id}
              remove={removeIndex}
              handleChange={(value) =>
                setEditor({
                  type:
                    editor.type === "subheading"
                      ? "subheadingEdit"
                      : editor.type === "heading"
                        ? "headingEdit"
                        : "contentEdit",
                  id: editor.id,
                  payload: { content: value },
                })
              }
            />
          );
        }
        if (editor.type === "code") {
          return (
            <CodeEditor
              key={editor.id}
              value={editor}
              index={editor.id}
              remove={removeIndex}
              onUpdate={(value) =>
                setEditor({
                  type: "codeEdit",
                  id: value.id,
                  payload: value,
                })
              }
            />
          );
        }
        if (editor.type === "image") {
          return (
            <ImageEditor
              key={editor.id}
              value={editor}
              index={editor.id}
              remove={removeIndex}
              onUpdate={(id, data) =>
                setEditor({
                  type: "updateImageFields",
                  id,
                  payload: data,
                })
              }
            />
          );
        }
        return null;
      })}

      <div className="mt-6 flex flex-wrap justify-center gap-6 text-slate-700">
        {onHeadingChange !== undefined && (
          <button
            className="rounded-md border border-blue-400 bg-blue-50 p-3 shadow-sm hover:border-blue-500 hover:bg-blue-100 hover:text-blue-800"
            onClick={focusHeading}
            type="button"
          >
            H1
          </button>
        )}
        <button className="rounded-md border border-slate-200 bg-white p-3 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700" onClick={addCodeEditor} type="button">
          Code Editor
        </button>
        <button className="rounded-md border border-slate-200 bg-white p-3 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700" onClick={addContent} type="button">
          Content
        </button>
        <button className="rounded-md border border-slate-200 bg-white p-3 shadow-sm hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700" onClick={addHeading} type="button">
          Heading
        </button>
        <button className="rounded-md border border-slate-200 bg-white p-3 shadow-sm hover:border-green-200 hover:bg-green-50 hover:text-green-700" onClick={addSubhead} type="button">
          Subheading
        </button>
        <button className="rounded-md border border-slate-200 bg-white p-3 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700" onClick={addImgEditor} type="button">
          Image
        </button>
      </div>
    </div>
  );
}

export default Editor;
