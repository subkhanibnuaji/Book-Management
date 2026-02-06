import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ibnu's Business Library | World-Class Books for the AI Era",
  description:
    "65+ expertly curated business books spanning AI strategy, functional expertise, and timeless principles. Build comprehensive business acumen in 6-9 months.",
  keywords: [
    "business books",
    "AI strategy",
    "management consulting",
    "leadership",
    "book recommendations",
    "professional development",
  ],
  authors: [{ name: "Ibnu" }],
  openGraph: {
    title: "Ibnu's Business Library | World-Class Books for the AI Era",
    description:
      "65+ expertly curated business books spanning AI strategy, functional expertise, and timeless principles.",
    type: "website",
    siteName: "Ibnu's Business Library",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Ibnu's Business Library",
    description:
      "65+ expertly curated business books for the AI era.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Ibnu's Business Library",
    description:
      "65+ expertly curated business books spanning AI strategy, functional expertise, and timeless principles.",
    creator: {
      "@type": "Person",
      name: "Ibnu",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen" suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
