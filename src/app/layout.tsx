import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ibnu's Business Library | World-Class Books for the AI Era",
  description:
    "65+ expertly curated business books spanning AI strategy, functional expertise, and timeless principles. Build comprehensive business acumen in 6-9 months.",
  openGraph: {
    title: "Ibnu's Business Library | World-Class Books for the AI Era",
    description:
      "65+ expertly curated business books spanning AI strategy, functional expertise, and timeless principles.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
