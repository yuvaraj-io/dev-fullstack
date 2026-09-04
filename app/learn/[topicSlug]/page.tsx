import LearnReaderPage, {
  generateReaderMetadata,
} from "@/components/pages/learn/LearnReaderPage";
import type { Metadata } from "next";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ topicSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topicSlug } = await params;
  return generateReaderMetadata({ topicSlug });
}

export default async function TopicPage({ params }: Props) {
  const { topicSlug } = await params;
  return <LearnReaderPage topicSlug={topicSlug} />;
}
