import type { Metadata } from "next";
import { Figtree, Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/ui-root/header/Header";
import "./globals.css";
import Footer from "@/components/ui-root/footer/footer";
import AnalyticsProvider from "@/components/providers/AnalyticsProvider";

const plusJakarta = Plus_Jakarta_Sans({
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
  icons: {
    icon: [
      { url: "/yuvaraj.png" },
      { url: "/icon.png" },
    ],
    shortcut: "/yuvaraj.png",
    apple: "/yuvaraj.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${figtree.variable}`}>
      <head>
        <link rel="icon" href="/yuvaraj.png?v=2" type="image/png" />
        <link rel="shortcut icon" href="/yuvaraj.png?v=2" type="image/png" />
        <link rel="apple-touch-icon" href="/yuvaraj.png?v=2" />
      </head>
      <body className="bg-[var(--paper)] font-[family-name:var(--font-body)] text-[var(--ink)] antialiased">
        <AnalyticsProvider>
          <Header />
          <main className="mx-auto max-w-7xl px-2 pt-24">{children}</main>
          <Footer />
        </AnalyticsProvider>
      </body>
    </html>
  );
}
