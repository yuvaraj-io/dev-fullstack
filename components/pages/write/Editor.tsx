"use client";

import { useEffect, useReducer } from "react";
import ContentEditor from "./ContentEditor";
import CodeEditor from "./CodeEditor";
import ImageEditor from "./ImageEditor";

type ContentBlock = {
  id: number;
  type: "content" | "subheading";
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
  link?: string;
  btn?: string;
};

type BlogBlock = ContentBlock | CodeBlock | ImageBlock;

type EditorAction =
  | { type: "image" }
  | { type: "updateImageFields"; id: number; payload: Partial<ImageBlock> }
  | { type: "code"; payload: { code: string; codeType?: string; link?: string; btn?: string } }
  | { type: "codeEdit"; id: number; payload: Partial<CodeBlock> }
  | { type: "content"; payload: { content: string } }
  | { type: "contentEdit"; id: number; payload: { content: string } }
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
      return state.map((item) =>
        item.id === action.id ? { ...item, ...action.payload } : item
      );

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
      return state.map((item) =>
        item.id === action.id ? { ...item, ...action.payload } : item
      );

    case "content":
      return [
        ...state,
        { id: Date.now(), type: "content", content: action.payload.content },
      ];

    case "contentEdit":
      return state.map((item) =>
        item.id === action.id ? { ...item, content: action.payload.content } : item
      );

    case "subheading":
      return [
        ...state,
        { id: Date.now(), type: "subheading", content: action.payload.content },
      ];

    case "subheadingEdit":
      return state.map((item) =>
        item.id === action.id ? { ...item, content: action.payload.content } : item
      );

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
};

function Editor({ blurChange, initialEditor }: EditorProps) {
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

  return (
    <div>
      {allEditor.map((editor) => {
        if (editor.type === "content" || editor.type === "subheading") {
          return (
            <ContentEditor
              key={editor.id}
              value={editor}
              index={editor.id}
              remove={removeIndex}
              handleChange={(value) =>
                setEditor({
                  type: editor.type === "subheading" ? "subheadingEdit" : "contentEdit",
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

      <div className="mt-6 flex justify-center gap-6 text-slate-200">
        <button className="border border-purple-300 p-3" onClick={addCodeEditor} type="button">
          Code Editor
        </button>
        <button className="border border-purple-300 p-3" onClick={addContent} type="button">
          Content
        </button>
        <button className="border border-purple-300 p-3" onClick={addSubhead} type="button">
          Subheading
        </button>
        <button className="border border-purple-300 p-3" onClick={addImgEditor} type="button">
          Image
        </button>
      </div>
    </div>
  );
}

export default Editor;
