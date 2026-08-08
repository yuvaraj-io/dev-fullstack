"use client";

import { useEffect, useReducer, useRef, useState } from "react";
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

type InsertPosition = {
  /** Insert after this block id. Use null to insert at the start. Omit to append at the end. */
  afterId?: number | null;
};

type EditorAction =
  | ({ type: "image" } & InsertPosition)
  | { type: "updateImageFields"; id: number; payload: Partial<ImageBlock> }
  | ({
      type: "code";
      payload: { code: string; codeType?: string; link?: string; btn?: string };
    } & InsertPosition)
  | { type: "codeEdit"; id: number; payload: Partial<CodeBlock> }
  | ({ type: "content"; payload: { content: string } } & InsertPosition)
  | { type: "contentEdit"; id: number; payload: { content: string } }
  | ({ type: "heading"; payload: { content: string } } & InsertPosition)
  | { type: "headingEdit"; id: number; payload: { content: string } }
  | ({ type: "subheading"; payload: { content: string } } & InsertPosition)
  | { type: "subheadingEdit"; id: number; payload: { content: string } }
  | { type: "remove"; payload: { id: number } }
  | { type: "reorder"; payload: { fromId: number; toId: number } }
  | { type: "move"; payload: { id: number; direction: "up" | "down" } }
  | { type: "reset" };

const initialState: BlogBlock[] = [];

function insertBlock(
  state: BlogBlock[],
  block: BlogBlock,
  afterId?: number | null
): BlogBlock[] {
  if (afterId === undefined) {
    return [...state, block];
  }

  if (afterId === null) {
    return [block, ...state];
  }

  const index = state.findIndex((item) => item.id === afterId);
  if (index === -1) {
    return [...state, block];
  }

  const nextState = [...state];
  nextState.splice(index + 1, 0, block);
  return nextState;
}

function reducer(state: BlogBlock[], action: EditorAction): BlogBlock[] {
  switch (action.type) {
    case "image":
      return insertBlock(
        state,
        {
          id: Date.now(),
          type: "image",
          image: "",
          link: "",
          btn: "",
        },
        action.afterId
      );

    case "updateImageFields":
      return state.map((item) => {
        if (item.id !== action.id || item.type !== "image") {
          return item;
        }
        return { ...item, ...action.payload };
      });

    case "code":
      return insertBlock(
        state,
        {
          id: Date.now(),
          type: "code",
          code: action.payload.code,
          codeType: action.payload.codeType || "javascript",
          link: action.payload.link || "",
          btn: action.payload.btn || "",
        },
        action.afterId
      );

    case "codeEdit":
      return state.map((item) => {
        if (item.id !== action.id || item.type !== "code") {
          return item;
        }
        return { ...item, ...action.payload };
      });

    case "content":
      return insertBlock(
        state,
        { id: Date.now(), type: "content", content: action.payload.content },
        action.afterId
      );

    case "contentEdit":
      return state.map((item) => {
        if (item.id !== action.id || item.type !== "content") {
          return item;
        }
        return { ...item, content: action.payload.content };
      });

    case "heading":
      return insertBlock(
        state,
        { id: Date.now(), type: "heading", content: action.payload.content },
        action.afterId
      );

    case "headingEdit":
      return state.map((item) => {
        if (item.id !== action.id || item.type !== "heading") {
          return item;
        }
        return { ...item, content: action.payload.content };
      });

    case "subheading":
      return insertBlock(
        state,
        { id: Date.now(), type: "subheading", content: action.payload.content },
        action.afterId
      );

    case "subheadingEdit":
      return state.map((item) => {
        if (item.id !== action.id || item.type !== "subheading") {
          return item;
        }
        return { ...item, content: action.payload.content };
      });

    case "remove":
      return state.filter((item) => item.id !== action.payload.id);

    case "reorder": {
      const fromIndex = state.findIndex((item) => item.id === action.payload.fromId);
      const toIndex = state.findIndex((item) => item.id === action.payload.toId);

      if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) {
        return state;
      }

      const nextState = [...state];
      const [movedItem] = nextState.splice(fromIndex, 1);
      nextState.splice(toIndex, 0, movedItem);
      return nextState;
    }

    case "move": {
      const currentIndex = state.findIndex((item) => item.id === action.payload.id);
      const nextIndex =
        action.payload.direction === "up" ? currentIndex - 1 : currentIndex + 1;

      if (currentIndex === -1 || nextIndex < 0 || nextIndex >= state.length) {
        return state;
      }

      const nextState = [...state];
      [nextState[currentIndex], nextState[nextIndex]] = [
        nextState[nextIndex],
        nextState[currentIndex],
      ];
      return nextState;
    }

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

type BlockInsertType = "content" | "heading" | "subheading" | "code" | "image";

function Editor({ blurChange, initialEditor, heading, onHeadingChange }: EditorProps) {
  const headingInputRef = useRef<HTMLInputElement>(null);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [dragOverId, setDragOverId] = useState<number | null>(null);
  /** null = closed; "start" = insert before first block; number = insert after that block id */
  const [insertMenuTarget, setInsertMenuTarget] = useState<"start" | number | null>(null);
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

  const insertBlockOfType = (
    blockType: BlockInsertType,
    afterId?: number | null
  ) => {
    if (blockType === "content") {
      setEditor({ type: "content", payload: { content: "" }, afterId });
    } else if (blockType === "heading") {
      setEditor({ type: "heading", payload: { content: "" }, afterId });
    } else if (blockType === "subheading") {
      setEditor({ type: "subheading", payload: { content: "" }, afterId });
    } else if (blockType === "code") {
      setEditor({
        type: "code",
        payload: { code: "", codeType: "html", link: "", btn: "Try on Stackblitz" },
        afterId,
      });
    } else {
      setEditor({ type: "image", afterId });
    }
    setInsertMenuTarget(null);
  };

  const addContent = () => insertBlockOfType("content");
  const addHeading = () => insertBlockOfType("heading");
  const addSubhead = () => insertBlockOfType("subheading");
  const addCodeEditor = () => insertBlockOfType("code");
  const addImgEditor = () => insertBlockOfType("image");

  const renderInsertSlot = (afterId: number | null) => {
    if (draggingId !== null) return null;

    const slotKey: "start" | number = afterId === null ? "start" : afterId;
    const isOpen = insertMenuTarget === slotKey;

    return (
      <div className="group relative my-2 flex items-center justify-center">
        <div className="absolute inset-x-0 top-1/2 h-px bg-slate-200 transition group-hover:bg-blue-300" />
        <button
          className="relative z-10 rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
          onClick={() => setInsertMenuTarget(isOpen ? null : slotKey)}
          type="button"
        >
          {isOpen ? "Close" : "+ Insert"}
        </button>

        {isOpen && (
          <div className="absolute top-full z-20 mt-2 flex flex-wrap justify-center gap-2 rounded-md border border-slate-200 bg-white p-2 shadow-md">
            {(
              [
                ["content", "Content"],
                ["heading", "H2 Section"],
                ["subheading", "H3 Subsection"],
                ["code", "Code"],
                ["image", "Image"],
              ] as const
            ).map(([type, label]) => (
              <button
                key={type}
                className="rounded border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                onClick={() => insertBlockOfType(type, afterId)}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const focusHeading = () => {
    headingInputRef.current?.focus();
    headingInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const moveBlock = (id: number, direction: "up" | "down") => {
    setEditor({ type: "move", payload: { id, direction } });
  };

  useEffect(() => {
    if (draggingId === null) return;

    const findBlockIdAtPoint = (clientX: number, clientY: number) => {
      const element = document.elementFromPoint(clientX, clientY);
      const block = element?.closest("[data-editor-block='true']");
      const blockId = block?.getAttribute("data-block-id");

      if (!blockId) return null;

      const parsedBlockId = Number(blockId);
      return Number.isFinite(parsedBlockId) ? parsedBlockId : null;
    };

    const handlePointerMove = (event: PointerEvent) => {
      setDragOverId(findBlockIdAtPoint(event.clientX, event.clientY));
    };

    const handlePointerUp = (event: PointerEvent) => {
      const toId = findBlockIdAtPoint(event.clientX, event.clientY) ?? dragOverId;

      if (toId !== null) {
        setEditor({ type: "reorder", payload: { fromId: draggingId, toId } });
      }

      setDraggingId(null);
      setDragOverId(null);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [dragOverId, draggingId]);

  const isReorderHandle = (target: EventTarget | null) => {
    return target instanceof HTMLElement && target.closest("[data-block-drag-handle]");
  };

  const preventNativeEditorDrag = (event: React.DragEvent<HTMLDivElement>) => {
    if (isReorderHandle(event.target)) return;

    event.preventDefault();
    event.stopPropagation();
  };

  const handleReorderPointerDown = (
    event: React.PointerEvent<HTMLButtonElement>,
    id: number
  ) => {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    setInsertMenuTarget(null);
    setDraggingId(id);
    setDragOverId(id);
  };

  const getBlockLabel = (block: BlogBlock) => {
    if (block.type === "heading") return "H2 · Section";
    if (block.type === "subheading") return "H3 · Subsection";
    if (block.type === "code") return `Code (${block.codeType || "code"})`;
    return block.type.charAt(0).toUpperCase() + block.type.slice(1);
  };

  return (
    <div>
      {onHeadingChange !== undefined && (
        <div className="mt-6">
          <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">H1 · Blog title</div>
          <input
            ref={headingInputRef}
            className="w-full rounded-md border border-blue-400 bg-white p-3 text-2xl font-bold text-slate-950 outline-none focus:border-blue-600"
            type="text"
            value={heading ?? ""}
            onChange={(event) => onHeadingChange(event.target.value)}
            placeholder="Blog title (H1)"
          />
          <p className="mt-2 text-sm text-slate-500">
            Use <span className="font-medium text-slate-700">H2 Section</span> blocks for main sections and{" "}
            <span className="font-medium text-slate-700">H3 Subsection</span> blocks for nested headings. This
            structure powers the Learn page navigation.
          </p>
        </div>
      )}

      {allEditor.length > 0 && renderInsertSlot(null)}

      {allEditor.map((editor, position) => {
        let editorBlock: React.ReactNode = null;

        if (editor.type === "content" || editor.type === "heading" || editor.type === "subheading") {
          editorBlock = (
            <ContentEditor
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
          editorBlock = (
            <CodeEditor
              key={`${editor.id}-${position}`}
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
          editorBlock = (
            <ImageEditor
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

        return (
          <div key={editor.id}>
            <div
              data-editor-block="true"
              data-block-id={editor.id}
              data-block-type={editor.type}
              className={`mt-2 rounded-md border bg-white p-3 transition ${
                dragOverId === editor.id
                  ? "border-blue-500 shadow-[0_0_0_3px_rgba(59,130,246,0.18)]"
                  : "border-slate-200"
              } ${draggingId === editor.id ? "opacity-60" : ""}`}
              onDragStartCapture={preventNativeEditorDrag}
              onDragOverCapture={preventNativeEditorDrag}
              onDragLeave={() => setDragOverId(null)}
              onDropCapture={preventNativeEditorDrag}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <button
                    data-block-drag-handle
                    className="cursor-grab rounded border border-slate-300 bg-slate-50 px-2 py-1 text-slate-600 active:cursor-grabbing"
                    onPointerDown={(event) => handleReorderPointerDown(event, editor.id)}
                    title="Drag to reorder"
                    type="button"
                  >
                    Drag
                  </button>
                  <span>Block {position + 1}</span>
                  <span className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-600">
                    {getBlockLabel(editor)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="rounded border border-slate-300 px-3 py-1 text-sm text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    disabled={position === 0}
                    onClick={() => moveBlock(editor.id, "up")}
                    type="button"
                  >
                    Up
                  </button>
                  <button
                    className="rounded border border-slate-300 px-3 py-1 text-sm text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    disabled={position === allEditor.length - 1}
                    onClick={() => moveBlock(editor.id, "down")}
                    type="button"
                  >
                    Down
                  </button>
                </div>
              </div>

              <div className={draggingId !== null ? "pointer-events-none select-none" : ""}>
                {editorBlock}
              </div>
            </div>

            {renderInsertSlot(editor.id)}
          </div>
        );
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
          H2 Section
        </button>
        <button className="rounded-md border border-slate-200 bg-white p-3 shadow-sm hover:border-green-200 hover:bg-green-50 hover:text-green-700" onClick={addSubhead} type="button">
          H3 Subsection
        </button>
        <button className="rounded-md border border-slate-200 bg-white p-3 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700" onClick={addImgEditor} type="button">
          Image
        </button>
      </div>
    </div>
  );
}

export default Editor;
