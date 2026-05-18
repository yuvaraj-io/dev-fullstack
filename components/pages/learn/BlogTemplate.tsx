import Link from "next/link";
import { codeToHtml } from "shiki";

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
  assetId?: string;
  link?: string;
  btn?: string;
}

export type BlogItem =
  | ContentItem
  | SubHeadingItem
  | CodeItem
  | ImageItem;

interface BlogTemplateProps {
  blog: BlogItem[];
  heading: string;
}

const normalizeLanguage = (value: string) => {
  const lang = value.toLowerCase().trim();

  const map: Record<string, string> = {
    js: "javascript",
    javascript: "javascript",
    ts: "typescript",
    typescript: "typescript",
    jsx: "jsx",
    tsx: "tsx",
    html: "html",
    css: "css",
    json: "json",
    bash: "bash",
    shell: "bash",
    sh: "bash",
  };

  return map[lang] ?? "text";
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const renderCodeHtml = async (
  code: string,
  language: string
) => {
  const lang = normalizeLanguage(language);

  if (lang === "text") {
    return `<pre><code>${escapeHtml(code)}</code></pre>`;
  }

  try {
    return await codeToHtml(code, {
      lang,
      theme: "github-dark",
    });
  } catch {
    return `<pre><code>${escapeHtml(code)}</code></pre>`;
  }
};

const BlogTemplate = async ({ blog, heading }: BlogTemplateProps) => {
  const blogContent = await Promise.all(
    blog.map(async (b) => {
    switch (b.type) {
      case 'content': {
        return (
          <div className="mb-5 leading-relaxed text-slate-700" key={b.id}>
            <div
              className="prose max-w-none prose-slate prose-p:text-slate-700 prose-a:text-blue-700 prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: b.content }}
            />
          </div>
        );
      }

      case 'subheading': {
        return (
          <h3
            id={`heading-${b.id}`}
            className="mb-3 mt-8 scroll-mt-28 text-xl font-semibold text-slate-950 sm:text-2xl"
            key={b.id}
          >
            <span
              className="inline-block rounded-md bg-teal-50 px-3 py-1 text-slate-950 ring-1 ring-teal-100"
              dangerouslySetInnerHTML={{ __html: b.content }}
            />
          </h3>
        );
      }

      case 'code':
        return (
          <div className="mb-8" key={b.id}>
            <div className="overflow-hidden rounded-lg border border-slate-700 bg-slate-950 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
              <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-red-400" />
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                </div>
                <span className="uppercase tracking-wider">{b.codeType}</span>
              </div>
              <div
                className="overflow-x-auto text-sm p-4 sm:p-5 [&_pre]:m-0"
                dangerouslySetInnerHTML={{
                  __html: await renderCodeHtml(
                    b.code,
                    b.codeType
                  ),
                }}
              />
            </div>

            {b.link && (
              <div className="mt-3 flex justify-center">
                <Link
                  className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm text-blue-700 transition hover:bg-blue-600 hover:text-white"
                  href={b.link}
                  rel="noreferrer"
                  target="_blank"
                >
                  {b.btn || "Source"}
                </Link>
              </div>
            )}
          </div>
        );

      case 'image':
        return (
          <div
            className="mb-8 flex flex-col items-center"
            key={b.id}
          >
            <div
              className="w-full max-w-md overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
            >
              <img
                src={b.image}
                alt="Uploaded"
                className="h-auto w-full object-cover"
              />
            </div>

            {b.btn && (
              <Link
                className="mt-4 rounded-full bg-blue-600 px-5 py-2 text-sm text-white shadow-sm transition hover:bg-blue-700"
                href={b.link || "#"}
                rel={b.link ? "noreferrer" : undefined}
                target={b.link ? "_blank" : undefined}
              >
                {b.btn}
              </Link>
            )}
          </div>
        );

      default:
        return null;
    }
    })
  );

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-6 md:p-8">
      <h1 className="mb-3 text-2xl font-bold text-slate-950 sm:text-3xl md:text-4xl">
        {heading}
      </h1>
      <div className="mb-6 h-px w-full bg-slate-200" />
      {blogContent.length > 0 ? (
        blogContent
      ) : (
        <div className="text-slate-500">No blog content found.</div>
      )}
    </div>
  );
};

export default BlogTemplate;
