import type { Metadata } from "next";
import Header from "@/components/ui-root/header/Header";
import "./globals.css";

import Footer from "@/components/ui-root/footer/footer";

export const metadata: Metadata = {
  title: "Yuvaraj | Full Stack Developer",
  description: "Portfolio & blogs by Yuvaraj",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
        {/* Header stays full width */}
        <Header />

        {/* Main content container */}
        <main className="mx-auto max-w-7xl px-6 pt-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
