import DOMPurify from 'dompurify';
import { Editor, OnMount } from '@monaco-editor/react';
import type * as monaco from 'monaco-editor';
import {redirect}  from '@/constants/commons/common-method'

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
          <div className="text-secondary mb-4" key={b.id}>
            <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
          </div>
        );
      }

      case 'subheading': {
        const cleanHtml = DOMPurify.sanitize(b.content);
        return (
          <h3
            className="text-white mt-4 mb-3"
            key={b.id}
            dangerouslySetInnerHTML={{ __html: cleanHtml }}
          />
        );
      }

      case 'code':
        return (
          <div className="mb-4" key={b.id}>
            <div className="border rounded overflow-hidden">
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
              <div className="d-flex justify-content-center mt-3">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => redirect(b.link!)}
                >
                  {b.btn || 'Source'}
                </button>
              </div>
            )}
          </div>
        );

      case 'image':
        return (
          <div
            className="d-flex flex-column align-items-center mb-4"
            key={b.id}
          >
            <div
              className="border rounded shadow-sm overflow-hidden"
              style={{ width: '500px', height: '350px' }}
            >
              <img
                src={b.image}
                alt="Uploaded"
                className="img-fluid w-100 h-100"
                style={{ objectFit: 'cover' }}
              />
            </div>

            {b.btn && (
              <button
                className="btn btn-primary mt-2"
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
      <h1 className="text-primary font-weight-bold display-4 mb-4">
        {heading}
      </h1>
      {blogContent}
    </div>
  );
};

export default BlogTemplate;
