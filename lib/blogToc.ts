export type TocItem = {
  id: string;
  text: string;
  level: 1 | 2 | 3;
};

type TocBlock = {
  id: string | number;
  type: string;
  content: string;
};

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, "").trim();

export function buildBlogTocItems(
  heading: string,
  blocks: TocBlock[]
): TocItem[] {
  const items: TocItem[] = [];

  const title = heading.trim();
  if (title) {
    items.push({ id: "blog-title", text: title, level: 1 });
  }

  for (const block of blocks) {
    if (block.type === "heading") {
      items.push({
        id: `heading-${block.id}`,
        text: stripHtml(block.content),
        level: 2,
      });
    } else if (block.type === "subheading") {
      items.push({
        id: `heading-${block.id}`,
        text: stripHtml(block.content),
        level: 3,
      });
    }
  }

  return items.filter((item) => item.text.length > 0);
}
