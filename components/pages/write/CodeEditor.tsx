"use client";

import { useRef } from "react";
import { Editor } from "@monaco-editor/react";

type CodeBlock = {
  id: number;
  type: "code";
  code: string;
  codeType: "html" | "css" | "javascript" | string;
  link?: string;
  btn?: string;
};

type CodeEditorProps = {
  value: CodeBlock;
  onUpdate: (value: CodeBlock) => void;
  remove: (id: number) => void;
  index: number;
};

function CodeEditor({ value, onUpdate, remove, index }: CodeEditorProps) {
  const editorRef = useRef<unknown>(null);
  const latestValueRef = useRef(value);

  latestValueRef.current = value;

  const handleEditorChange = (newValue: string | undefined) => {
    latestValueRef.current.code = newValue ?? "";
    onUpdate({ ...latestValueRef.current });
  };

  const handleEditorDidMount = (editor: { getValue: () => string; onDidBlurEditorText: (cb: () => void) => void; }) => {
    editorRef.current = editor;
    editor.onDidBlurEditorText(() => {
      latestValueRef.current.code = editor.getValue();
      onUpdate({ ...latestValueRef.current });
    });
  };

  const handleLanguageChange = (newLang: "html" | "css" | "javascript") => {
    latestValueRef.current.codeType = newLang;
    onUpdate({ ...latestValueRef.current });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "link" | "btn"
  ) => {
    latestValueRef.current[field] = e.target.value;
    onUpdate({ ...latestValueRef.current });
  };

  return (
    <div className="mt-4 border border-slate-200 p-4">
      <button
        className="rounded border border-red-400 p-2"
        onClick={() => remove(index)}
        type="button"
      >
        Remove
      </button>
      {` ${index}`}

      <div className="mb-3 mt-3 flex gap-3">
        {["html", "css", "javascript"].map((lang) => (
          <button
            key={lang}
            className={`border px-4 py-2 ${
              value.codeType === lang
                ? "bg-purple-400 text-white"
                : "border-purple-400"
            }`}
            onClick={() => handleLanguageChange(lang as "html" | "css" | "javascript")}
            type="button"
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="mb-3 flex gap-3">
        <label className="flex items-center gap-2">
          Link:
          <input
            type="text"
            className="border p-1 text-black"
            value={value.link || ""}
            onChange={(e) => handleInputChange(e, "link")}
          />
        </label>
        <label className="flex items-center gap-2">
          BTN:
          <input
            type="text"
            className="border p-1 text-black"
            value={value.btn || ""}
            onChange={(e) => handleInputChange(e, "btn")}
          />
        </label>
      </div>

      <Editor
        height="300px"
        theme="vs-dark"
        language={value.codeType}
        value={value.code}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
      />
    </div>
  );
}

export default CodeEditor;
