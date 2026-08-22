import type { Metadata } from "next";
import { Figtree, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui-root/header/Header";
import Footer from "@/components/ui-root/footer/footer";
import AnalyticsProvider from "@/components/providers/AnalyticsProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yuvaraj.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Yuvaraj | Full Stack Developer & Software Architect",
    template: "%s | Yuvaraj",
  },
  description:
    "Portfolio, production architecture notes, technical tutorials, and full-stack engineering blogs by Yuvaraj.",
  keywords: [
    "Yuvaraj",
    "Full Stack Developer",
    "Software Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "System Design",
    "Portfolio",
    "Web Development",
    "Tutorials",
  ],
  authors: [{ name: "Yuvaraj" }],
  creator: "Yuvaraj",
  publisher: "Yuvaraj",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/yuvaraj.png" },
      { url: "/icon.png" },
    ],
    shortcut: "/yuvaraj.png",
    apple: "/yuvaraj.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Yuvaraj | Full Stack Developer & Software Architect",
    description:
      "Explore production-grade software engineering, architecture notes, and tutorials by Yuvaraj.",
    siteName: "Yuvaraj Dev FullStack",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yuvaraj | Full Stack Developer",
    description:
      "Portfolio, architecture notes, and technical articles by Yuvaraj.",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Yuvaraj",
        url: siteUrl,
        jobTitle: "Full Stack Developer & Software Architect",
        sameAs: [
          "https://github.com/yuvaraj",
          "https://linkedin.com/in/yuvaraj",
          "https://medium.com/@yuvaraj",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Yuvaraj | Dev FullStack",
        description:
          "Portfolio, technical blogs, and full-stack software tutorials by Yuvaraj.",
        publisher: {
          "@id": `${siteUrl}/#person`,
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${plusJakarta.variable} ${figtree.variable}`}>
      <head>
        <link rel="icon" href="/yuvaraj.png?v=2" type="image/png" />
        <link rel="shortcut icon" href="/yuvaraj.png?v=2" type="image/png" />
        <link rel="apple-touch-icon" href="/yuvaraj.png?v=2" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[var(--paper)] font-[family-name:var(--font-body)] text-[var(--ink)] antialiased transition-colors duration-200">
        <ThemeProvider>
          <AnalyticsProvider>
            <Header />
            <main className="mx-auto max-w-[1600px] px-3 sm:px-6 lg:px-8 pt-20 sm:pt-24 min-h-[calc(100vh-80px)]">
              {children}
            </main>
            <Footer />
          </AnalyticsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
