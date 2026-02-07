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
          <div className="mb-5 text-slate-300 leading-relaxed" key={b.id}>
            <div
              className="prose prose-invert prose-p:text-slate-300 prose-a:text-purple-300 prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: b.content }}
            />
          </div>
        );
      }

      case 'subheading': {
        return (
          <h3
            className="mt-8 mb-3 text-2xl font-semibold text-white"
            key={b.id}
          >
            <span
              className="inline-block rounded-md bg-gradient-to-r from-emerald-400/20 via-sky-400/20 to-purple-400/20 px-3 py-1 text-white"
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
                className="overflow-x-auto text-sm p-4 [&_pre]:m-0"
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
                  className="rounded-full border border-fuchsia-400 px-4 py-2 text-sm text-fuchsia-200 hover:bg-fuchsia-500 hover:text-white transition"
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
              className="overflow-hidden rounded-xl border border-slate-700 shadow-[0_12px_40px_-30px_rgba(59,130,246,0.7)]"
              style={{ width: "500px", height: "350px" }}
            >
              <img
                src={b.image}
                alt="Uploaded"
                className="h-full w-full object-cover"
              />
            </div>

            {b.btn && (
              <Link
                className="mt-4 rounded-full bg-gradient-to-r from-purple-500 to-sky-500 px-5 py-2 text-sm text-white shadow-lg shadow-purple-500/20 hover:from-purple-400 hover:to-sky-400 transition"
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
    <div className="p-6 md:p-8 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 shadow-[0_0_0_1px_rgba(148,163,184,0.1),0_30px_80px_-40px_rgba(59,130,246,0.45)]">
      <h1 className="mb-3 text-3xl md:text-4xl font-bold text-white">
        <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-sky-400 bg-clip-text text-transparent">
          {heading}
        </span>
      </h1>
      <div className="mb-6 h-px w-full bg-gradient-to-r from-purple-500/50 via-slate-700/60 to-sky-500/50" />
      {blogContent.length > 0 ? (
        blogContent
      ) : (
        <div className="text-slate-400">No blog content found.</div>
      )}
    </div>
  );
};

export default BlogTemplate;
