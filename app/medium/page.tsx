import type { Metadata } from "next";
import MediumArticlesPage from "@/components/pages/medium/MediumArticlesPage";

export const metadata: Metadata = {
  title: "Engineering Notes & Articles | Yuvaraj",
  description:
    "Explore in-depth technical publications on React architecture, Angular decorators, RxJS observable pipelines, and JavaScript internals by Yuvaraj.",
  alternates: {
    canonical: "/medium",
  },
  openGraph: {
    title: "Engineering Notes & Articles | Yuvaraj",
    description:
      "Explore in-depth technical publications on React, Angular, RxJS, and JavaScript by Yuvaraj.",
    type: "website",
    url: "/medium",
  },
};

export default function MediumPage() {
  return <MediumArticlesPage />;
}
