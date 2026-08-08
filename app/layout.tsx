import type { Metadata } from "next";
import { Figtree, Syne } from "next/font/google";
import Header from "@/components/ui-root/header/Header";
import "./globals.css";
import Footer from "@/components/ui-root/footer/footer";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

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
    <html lang="en" className={`${syne.variable} ${figtree.variable}`}>
      <body className="bg-[var(--paper)] font-[family-name:var(--font-body)] text-[var(--ink)] antialiased">
        <Header />
        <main className="mx-auto max-w-7xl px-6 pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
