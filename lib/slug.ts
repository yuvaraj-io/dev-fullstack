/**
 * Utility functions for generating clean, SEO-friendly URL slugs
 */

export function slugify(text: string): string {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove non-word chars (except spaces and hyphens)
    .replace(/[\s_-]+/g, "-") // Replace spaces, underscores, multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ""); // Trim leading and trailing hyphens
}

const encodeBase64 = (value: string | number) =>
  Buffer.from(String(value), "utf-8").toString("base64");

/**
 * Builds a Medium-style SEO friendly learning URL with IDs and slugs
 */
export function buildLearnUrl({
  topicId,
  topicName,
  collectionId,
  articleTitle,
}: {
  topicId: string | number;
  topicName?: string;
  collectionId?: string | number | null;
  articleTitle?: string;
}): string {
  const encodedTopicId = encodeBase64(topicId);
  const params = new URLSearchParams();
  params.set("id", encodedTopicId);

  if (collectionId !== undefined && collectionId !== null) {
    params.set("blog", encodeBase64(collectionId));
  }

  if (topicName) {
    params.set("topic", slugify(topicName));
  }

  if (articleTitle) {
    params.set("article", slugify(articleTitle));
  }

  return `/learn?${params.toString()}`;
}
