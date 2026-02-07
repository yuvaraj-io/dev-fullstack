"use client";

import DOMPurify from "dompurify";
import { Editor, OnMount } from "@monaco-editor/react";
import type * as monaco from "monaco-editor";
import { redirect } from "@/constants/commons/common-method";

interface BaseBlogItem {
  id: string | number;
  type: string;
}

interface ContentItem extends BaseBlogItem {
  type: 'content';
  content: string;
}

interface SubHeadingItem extends BaseBlogItem {
  type: 'subheading';
  content: string;
}

interface CodeItem extends BaseBlogItem {
  type: 'code';
  code: string;
  codeType: string;
  link?: string;
  btn?: string;
}

interface ImageItem extends BaseBlogItem {
  type: 'image';
  image: string;
  link?: string;
  btn?: string;
}

type BlogItem =
  | ContentItem
  | SubHeadingItem
  | CodeItem
  | ImageItem;

interface BlogTemplateProps {
  blog: BlogItem[];
  heading: string;
}

const BlogTemplate: React.FC<BlogTemplateProps> = ({ blog, heading }) => {
  const autoResize = (editor: monaco.editor.IStandaloneCodeEditor) => {
    const updateHeight = () => {
      const contentHeight = editor.getContentHeight();
      editor.layout({
        width: editor.getLayoutInfo().width,
        height: contentHeight,
      });
    };

    updateHeight();
    editor.onDidChangeModelContent(updateHeight);
  };

  const handleEditorDidMount: OnMount = (editor) => {
    autoResize(editor);
  };

  const blogContent = blog.map((b) => {
    switch (b.type) {
      case 'content': {
        const cleanHtml = DOMPurify.sanitize(b.content);
        return (
          <div className="mb-4 text-slate-300 leading-relaxed" key={b.id}>
            <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
          </div>
        );
      }

      case 'subheading': {
        const cleanHtml = DOMPurify.sanitize(b.content);
        return (
          <h3
            className="mt-6 mb-3 text-xl font-semibold text-white"
            key={b.id}
            dangerouslySetInnerHTML={{ __html: cleanHtml }}
          />
        );
      }

      case 'code':
        return (
          <div className="mb-6" key={b.id}>
            <div className="overflow-hidden rounded border border-slate-700 bg-slate-950">
              <Editor
                theme="vs-dark"
                language={b.codeType}
                value={b.code}
                onMount={handleEditorDidMount}
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                }}
              />
            </div>

            {b.link && (
              <div className="mt-3 flex justify-center">
                <button
                  className="rounded border border-purple-500 px-4 py-2 text-sm text-purple-300 hover:bg-purple-500 hover:text-white transition"
                  onClick={() => redirect(b.link!)}
                >
                  {b.btn || "Source"}
                </button>
              </div>
            )}
          </div>
        );

      case 'image':
        return (
          <div
            className="mb-6 flex flex-col items-center"
            key={b.id}
          >
            <div
              className="overflow-hidden rounded border border-slate-700 shadow-sm"
              style={{ width: "500px", height: "350px" }}
            >
              <img
                src={b.image}
                alt="Uploaded"
                className="h-full w-full object-cover"
              />
            </div>

            {b.btn && (
              <button
                className="mt-3 rounded bg-purple-600 px-4 py-2 text-sm text-white hover:bg-purple-500 transition"
                onClick={() => b.link && redirect(b.link)}
              >
                {b.btn}
              </button>
            )}
          </div>
        );

      default:
        return null;
    }
  });

  return (
    <div className="p-4">
      <h1 className="mb-6 text-3xl font-bold text-white">
        {heading}
      </h1>
      {blogContent.length > 0 ? (
        blogContent
      ) : (
        <div className="text-slate-400">No blog content found.</div>
      )}
    </div>
  );
};

export default BlogTemplate;
