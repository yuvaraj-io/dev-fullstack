"use client";

import Link from "next/link";
import { FaHome, FaChevronRight } from "react-icons/fa";

interface BreadcrumbProps {
  topicName?: string;
  topicHref?: string;
  articleTitle?: string;
}

export default function LearnBreadcrumbs({
  topicName,
  topicHref,
  articleTitle,
}: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumbs"
      className="mb-4 flex flex-wrap items-center gap-1.5 text-xs font-medium text-[var(--ink-soft)]"
    >
      <Link
        href="/"
        className="flex items-center gap-1 text-[var(--ink-soft)] transition-colors hover:text-[var(--signal)]"
        title="Home"
      >
        <FaHome className="text-xs" />
        <span className="hidden sm:inline">Home</span>
      </Link>

      <FaChevronRight className="text-[0.6rem] opacity-50" />

      <Link
        href="/learn"
        className="transition-colors hover:text-[var(--signal)]"
      >
        Learn
      </Link>

      {topicName && (
        <>
          <FaChevronRight className="text-[0.6rem] opacity-50" />
          {topicHref ? (
            <Link
              href={topicHref}
              className="max-w-[150px] sm:max-w-[220px] truncate transition-colors hover:text-[var(--signal)]"
            >
              {topicName}
            </Link>
          ) : (
            <span className="max-w-[150px] sm:max-w-[220px] truncate text-[var(--ink)] font-semibold">
              {topicName}
            </span>
          )}
        </>
      )}

      {articleTitle && (
        <>
          <FaChevronRight className="text-[0.6rem] opacity-50" />
          <span className="max-w-[180px] sm:max-w-[320px] truncate font-semibold text-[var(--ink)]">
            {articleTitle}
          </span>
        </>
      )}
    </nav>
  );
}
