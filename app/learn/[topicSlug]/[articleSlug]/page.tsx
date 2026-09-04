import LearnReaderPage, {
  generateReaderMetadata,
} from "@/components/pages/learn/LearnReaderPage";
import type { Metadata } from "next";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ topicSlug: string; articleSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topicSlug, articleSlug } = await params;
  return generateReaderMetadata({ topicSlug, articleSlug });
}

export default async function ArticlePage({ params }: Props) {
  const { topicSlug, articleSlug } = await params;
  return <LearnReaderPage topicSlug={topicSlug} articleSlug={articleSlug} />;
}
