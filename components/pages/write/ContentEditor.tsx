"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ContentEditor.module.css";

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

const ContentEditor = ({
  handleChange,
  value,
  index,
  remove,
}: ContentEditorProps) => {
  const [showToolbar, setShowToolbar] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const editorRef = useRef<HTMLDivElement | null>(null);
  const savedRangeRef = useRef<Range | null>(null);

  // Keep editor in sync without cursor jumps
  useEffect(() => {
    if (
      editorRef.current &&
      value?.content !== undefined &&
      editorRef.current.innerHTML !== value.content
    ) {
      editorRef.current.innerHTML = value.content || "";
    }
  }, [value?.content]);

  const receiveChange = () => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    if (html !== value.content) {
      handleChange(html, index);
    }
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      setShowToolbar(false);
      return;
    }

    const range = selection.getRangeAt(0);
    if (!editorRef.current?.contains(range.commonAncestorContainer)) {
      setShowToolbar(false);
      return;
    }

    const selectedText = selection.toString().trim();
    if (!selectedText) {
      setShowToolbar(false);
      return;
    }

    savedRangeRef.current = range;
    const rect = range.getBoundingClientRect();
    setToolbarPosition({
      top: rect.top + window.scrollY - 40,
      left: rect.left + rect.width / 2,
    });

    setShowToolbar(true);
  };

  const restoreSelection = () => {
    const selection = window.getSelection();
    if (!selection) return;
    selection.removeAllRanges();
    if (savedRangeRef.current) {
      selection.addRange(savedRangeRef.current);
    }
    editorRef.current?.focus();
  };

  const applyFormatting = (command: "bold" | "italic" | "underline") => {
    if (!savedRangeRef.current) return;
    restoreSelection();
    document.execCommand(command, false, undefined);
    receiveChange();
    setShowToolbar(false);
  };

  const handleAddLink = () => {
    setShowLinkInput(true);
  };

  const insertLink = () => {
    if (!savedRangeRef.current) return;
    restoreSelection();
    if (linkUrl.trim()) {
      document.execCommand("createLink", false, linkUrl);
    }
    setShowLinkInput(false);
    setLinkUrl("");
    receiveChange();
    setShowToolbar(false);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();

    const html = e.clipboardData.getData("text/html");
    if (!html) {
      const text = e.clipboardData.getData("text/plain");
      document.execCommand("insertText", false, text);
      receiveChange();
      return;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    doc.body.querySelectorAll("*").forEach((el) => {
      if (el.tagName.toLowerCase() === "a") {
        const href = el.getAttribute("href");
        [...el.attributes].forEach((attr) => el.removeAttribute(attr.name));
        if (href) el.setAttribute("href", href);
      } else {
        [...el.attributes].forEach((attr) => el.removeAttribute(attr.name));
      }
    });

    const cleaned = doc.body.innerHTML;
    document.execCommand("insertHTML", false, cleaned);
    receiveChange();
  };

  return (
    <div className="mt-6" style={{ position: "relative" }}>
      <button
        className={`rounded border p-2 ${
          value.type === "subheading" ? "border-green-400" : "border-red-400"
        }`}
        onClick={() => remove(index)}
        type="button"
      >
        Remove
      </button>{" "}
      {index}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onMouseUp={handleTextSelection}
        onKeyUp={handleTextSelection}
        onInput={receiveChange}
        onPaste={handlePaste}
        className={`text-lg leading-relaxed ${styles.contentEdit}`}
        style={{
          border: `${
            value.type === "subheading" ? "1px solid green" : "1px solid #ccc"
          }`,
          padding: "10px",
          borderRadius: "5px",
          minHeight: value.type === "subheading" ? "50px" : "120px",
          cursor: "text",
        }}
      />

      {showToolbar && (
        <div
          className="flex gap-4 text-base"
          style={{
            position: "absolute",
            top: toolbarPosition.top,
            left: toolbarPosition.left,
            backgroundColor: "#333",
            color: "#fff",
            padding: "6px 10px",
            borderRadius: "6px",
            transform: "translateX(-50%)",
            zIndex: 1000,
          }}
        >
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => applyFormatting("bold")}
            style={{ background: "transparent", border: "none", color: "#fff" }}
            type="button"
          >
            <b>B</b>
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => applyFormatting("italic")}
            style={{ background: "transparent", border: "none", color: "#fff" }}
            type="button"
          >
            <i>I</i>
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => applyFormatting("underline")}
            style={{ background: "transparent", border: "none", color: "#fff" }}
            type="button"
          >
            <u>U</u>
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleAddLink}
            style={{ background: "transparent", border: "none", color: "#fff" }}
            type="button"
          >
            🔗
          </button>
        </div>
      )}

      {showLinkInput && (
        <div
          style={{
            position: "absolute",
            top: toolbarPosition.top + 50,
            left: toolbarPosition.left,
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            padding: "6px",
            borderRadius: "6px",
            transform: "translateX(-50%)",
            zIndex: 1000,
          }}
        >
          <input
            type="text"
            placeholder="Enter URL"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className="text-black"
            style={{
              padding: "5px",
              marginRight: "6px",
              border: "1px solid #ccc",
              borderRadius: "3px",
            }}
          />
          <button
            onClick={insertLink}
            style={{
              padding: "5px 10px",
              backgroundColor: "#333",
              color: "#fff",
              border: "none",
              borderRadius: "3px",
              cursor: "pointer",
            }}
            type="button"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default ContentEditor;
