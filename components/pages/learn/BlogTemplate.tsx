import Link from "next/link";
import { codeToHtml } from "shiki";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface BaseBlogItem {
  id: string | number;
  type: string;
}

interface ContentItem extends BaseBlogItem {
  type: "content";
  content: string;
}

interface HeadingItem extends BaseBlogItem {
  type: "heading";
  content: string;
}

interface SubHeadingItem extends BaseBlogItem {
  type: "subheading";
  content: string;
}

interface CodeItem extends BaseBlogItem {
  type: "code";
  code: string;
  codeType: string;
  link?: string;
  btn?: string;
}

interface ImageItem extends BaseBlogItem {
  type: "image";
  image: string;
  assetId?: string;
  link?: string;
  btn?: string;
}

export type BlogItem =
  | ContentItem
  | HeadingItem
  | SubHeadingItem
  | CodeItem
  | ImageItem;

export interface ArticleNavTarget {
  title: string;
  href: string;
  sectionName?: string;
}

interface BlogTemplateProps {
  blog: BlogItem[];
  heading: string;
  editHref?: string | null;
  prevArticle?: ArticleNavTarget | null;
  nextArticle?: ArticleNavTarget | null;
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

const renderCodeHtml = async (code: string, language: string) => {
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

const BlogTemplate = async ({
  blog,
  heading,
  editHref,
  prevArticle,
  nextArticle,
}: BlogTemplateProps) => {
  const blogContent = await Promise.all(
    blog.map(async (b) => {
      switch (b.type) {
        case "content": {
          return (
            <div className="mb-5 leading-relaxed text-[var(--ink)]" key={b.id}>
              <div
                className="prose max-w-none prose-slate dark:prose-invert prose-p:text-[var(--ink)] prose-a:text-[var(--signal)] prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: b.content }}
              />
            </div>
          );
        }

        case "heading": {
          return (
            <h2
              id={`heading-${b.id}`}
              className="mb-4 mt-10 scroll-mt-28 text-2xl font-bold text-[var(--ink)] sm:text-3xl"
              key={b.id}
            >
              <span
                className="inline-block rounded-xl border border-[var(--line)] px-3.5 py-1 text-[var(--ink)]"
                style={{ backgroundColor: "var(--signal-soft)" }}
                dangerouslySetInnerHTML={{ __html: b.content }}
              />
            </h2>
          );
        }

        case "subheading": {
          return (
            <h3
              id={`heading-${b.id}`}
              className="mb-3 mt-8 scroll-mt-28 text-xl font-semibold text-[var(--ink)] sm:text-2xl"
              key={b.id}
            >
              <span
                className="inline-block rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-1 text-[var(--ink)]"
                dangerouslySetInnerHTML={{ __html: b.content }}
              />
            </h3>
          );
        }

        case "code":
          return (
            <div className="mb-8" key={b.id}>
              <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-slate-950 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
                <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-400" />
                    <span className="h-2 w-2 rounded-full bg-amber-400" />
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  </div>
                  <span className="uppercase tracking-wider font-mono">
                    {b.codeType}
                  </span>
                </div>
                <div
                  className="overflow-x-auto text-sm p-4 sm:p-5 [&_pre]:m-0"
                  dangerouslySetInnerHTML={{
                    __html: await renderCodeHtml(b.code, b.codeType),
                  }}
                />
              </div>

              {b.link && (
                <div className="mt-3 flex justify-center">
                  <Link
                    className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-semibold transition hover:opacity-90"
                    style={{
                      backgroundColor: "var(--signal-soft)",
                      color: "var(--signal)",
                    }}
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

        case "image":
          return (
            <div className="mb-8 flex flex-col items-center" key={b.id}>
              <div className="w-full max-w-md overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] shadow-xs">
                <img
                  src={b.image}
                  alt="Uploaded"
                  className="h-auto w-full object-cover"
                />
              </div>

              {b.btn && (
                <Link
                  className="mt-4 rounded-full px-5 py-2 text-sm font-bold text-white shadow-xs transition hover:opacity-90"
                  style={{ backgroundColor: "var(--signal)" }}
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
    <article className="rounded-3xl border border-[var(--line)] bg-[var(--card)] p-5 sm:p-7 md:p-9 shadow-2xs transition-all duration-300">
      {/* Header / Title */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <h1
          id="blog-title"
          className="scroll-mt-28 font-[family-name:var(--font-display)] text-2xl font-extrabold tracking-tight text-[var(--ink)] sm:text-3xl md:text-4xl"
        >
          {heading}
        </h1>
        {editHref ? (
          <Link
            href={editHref}
            className="shrink-0 rounded-xl border border-[var(--line)] px-3.5 py-1.5 text-xs font-bold transition hover:opacity-85"
            style={{
              backgroundColor: "var(--signal-soft)",
              color: "var(--signal)",
            }}
          >
            Edit
          </Link>
        ) : null}
      </div>

      <div className="mb-8 h-px w-full bg-[var(--line)]" />

      {/* Main Content */}
      {blogContent.length > 0 ? (
        <div className="space-y-6">{blogContent}</div>
      ) : (
        <div className="text-[var(--ink-soft)] font-light">
          No blog content found.
        </div>
      )}

      {/* Next and Previous Navigation Buttons */}
      {(prevArticle || nextArticle) && (
        <div className="mt-12 border-t border-[var(--line)] pt-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {prevArticle ? (
              <Link
                href={prevArticle.href}
                className="group flex flex-col justify-between rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4 transition-all duration-200 hover:border-[var(--signal)] hover:shadow-md"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-[var(--ink-soft)]">
                  <FaArrowLeft className="transition-transform group-hover:-translate-x-1" />
                  <span>Previous Article</span>
                </div>
                <div className="mt-2 font-[family-name:var(--font-display)] text-sm font-bold text-[var(--ink)] line-clamp-2 group-hover:text-[var(--signal)]">
                  {prevArticle.title}
                </div>
                {prevArticle.sectionName && (
                  <div className="mt-1 text-[11px] font-mono text-[var(--ink-soft)] truncate">
                    {prevArticle.sectionName}
                  </div>
                )}
              </Link>
            ) : (
              <div className="hidden sm:block" />
            )}

            {nextArticle && (
              <Link
                href={nextArticle.href}
                className="group flex flex-col justify-between rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4 text-right transition-all duration-200 hover:border-[var(--signal)] hover:shadow-md"
              >
                <div className="flex items-center justify-end gap-2 text-xs font-semibold text-[var(--ink-soft)]">
                  <span>Next Article</span>
                  <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                </div>
                <div className="mt-2 font-[family-name:var(--font-display)] text-sm font-bold text-[var(--ink)] line-clamp-2 group-hover:text-[var(--signal)]">
                  {nextArticle.title}
                </div>
                {nextArticle.sectionName && (
                  <div className="mt-1 text-[11px] font-mono text-[var(--ink-soft)] truncate">
                    {nextArticle.sectionName}
                  </div>
                )}
              </Link>
            )}
          </div>
        </div>
      )}
    </article>
  );
};

export default BlogTemplate;
