import type { Metadata } from "next";
import Header from "@/components/ui-root/header/Header";
import "./globals.css";
import { Topic } from "@/types/topic";

export const metadata: Metadata = {
  title: "Yuvaraj | Full Stack Developer",
  description: "Portfolio & blogs by Yuvaraj",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const res = await fetch("http://localhost:3000/api/topics", {
    next: { revalidate: 60 },
  });

  const topics: Topic[] = await res.json();

  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
        {/* Header stays full width */}
        <Header topics={topics} />

        {/* Main content container */}
        <main className="mx-auto max-w-7xl px-6 pt-24">
          {children}
        </main>
      </body>
    </html>
  );
}
