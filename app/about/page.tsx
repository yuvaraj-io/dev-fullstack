import type { Metadata } from "next";
import AboutMePage from "@/components/pages/about/AboutMePage";

export const metadata: Metadata = {
  title: "About Yuvaraj | Learning with Purpose",
  description:
    "Yuvaraj's engineering philosophy, learning journey, principles, and mindset for building production-ready software systems.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Yuvaraj | Learning with Purpose",
    description:
      "A premium portfolio about page focused on purposeful learning, systems thinking, and engineering growth.",
    type: "profile",
    url: "/about",
  },
};

export default function AboutPage() {
  return <AboutMePage />;
}
