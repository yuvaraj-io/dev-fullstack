"use client";

import { useCallback, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

type EditorValue = {
  id: number;
  type: "content" | "heading" | "subheading";
  content: string;
};

type ContentEditorProps = {
  value: EditorValue;
  index: number;
  remove: (id: number) => void;
  handleChange: (value: string, id: number) => void;
};

const blockStyles = {
  content: {
    label: "Content",
    removeBorder: "border-red-400",
    editorBorder: "border-slate-300",
    minHeight: "min-h-[120px]",
  },
  heading: {
    label: "Heading",
    removeBorder: "border-violet-400",
    editorBorder: "border-violet-400",
    minHeight: "min-h-[60px]",
  },
  subheading: {
    label: "Subheading",
    removeBorder: "border-green-400",
    editorBorder: "border-green-400",
    minHeight: "min-h-[50px]",
  },
} as const;

const ContentEditor = ({ handleChange, value, index, remove }: ContentEditorProps) => {
  const styles = blockStyles[value.type];

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false, blockquote: false, codeBlock: false }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
    ],
    content: value.content || "",
    onUpdate({ editor }) {
      handleChange(editor.getHTML(), index);
    },
    editorProps: {
      attributes: {
        class: `tiptap-content outline-none p-3 text-lg leading-relaxed ${styles.minHeight}`,
      },
    },
  });

  useEffect(() => {
    if (!editor || editor.isDestroyed) return;
    if (editor.getHTML() !== value.content && value.content !== undefined) {
      editor.commands.setContent(value.content || "", { emitUpdate: false });
    }
  }, [value.content, editor]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href ?? "";
    const url = window.prompt("Enter URL", prev);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  }, [editor]);

  if (!editor) return null;

  const btn = (active: boolean, extra = "") =>
    `rounded px-2 py-1 text-sm font-medium transition ${extra} ${
      active
        ? "bg-slate-800 text-white"
        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
    }`;

  return (
    <div className="mt-6">
      <button
        className={`rounded border p-2 ${styles.removeBorder}`}
        onClick={() => remove(index)}
        type="button"
      >
        Remove
      </button>{" "}
      {index} ({styles.label})

      <div className={`mt-2 rounded-md border ${styles.editorBorder}`}>
        <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50 px-2 py-1.5">
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={btn(editor.isActive("bold"), "font-bold")}
            type="button"
          >
            B
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={btn(editor.isActive("italic"), "italic")}
            type="button"
          >
            I
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={btn(editor.isActive("underline"), "underline")}
            type="button"
          >
            U
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={btn(editor.isActive("code"), "font-mono")}
            type="button"
          >
            {"</>"}
          </button>
          <div className="mx-1 h-4 w-px bg-slate-300" />
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={setLink}
            className={btn(editor.isActive("link"))}
            type="button"
          >
            Link
          </button>
          {editor.isActive("link") && (
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => editor.chain().focus().unsetLink().run()}
              className="rounded bg-red-100 px-2 py-1 text-sm font-medium text-red-700 transition hover:bg-red-200"
              type="button"
            >
              Remove Link
            </button>
          )}
        </div>

        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default ContentEditor;
