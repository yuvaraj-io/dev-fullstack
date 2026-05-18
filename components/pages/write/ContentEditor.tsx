"use client";

import { useCallback, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

type EditorValue = {
  id: number;
  type: "content" | "subheading";
  content: string;
};

type ContentEditorProps = {
  value: EditorValue;
  index: number;
  remove: (id: number) => void;
  handleChange: (value: string, id: number) => void;
};

const ContentEditor = ({ handleChange, value, index, remove }: ContentEditorProps) => {
  const isSubheading = value.type === "subheading";

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
        class: `tiptap-content outline-none p-3 text-lg leading-relaxed ${
          isSubheading ? "min-h-[50px]" : "min-h-[120px]"
        }`,
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
        className={`rounded border p-2 ${isSubheading ? "border-green-400" : "border-red-400"}`}
        onClick={() => remove(index)}
        type="button"
      >
        Remove
      </button>{" "}
      {index}

      <div
        className={`mt-2 rounded-md border ${
          isSubheading ? "border-green-400" : "border-slate-300"
        }`}
      >
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
