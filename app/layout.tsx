import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Tree of Life — Explore the Known Diversity of Life",
  description:
    "An interactive evolutionary tree visualizing the history and branching of life from LUCA (Last Universal Common Ancestor) to modern organisms. Explore the ~3.8 billion year story of life on Earth.",
  keywords: [
    "tree of life",
    "phylogeny",
    "evolution",
    "taxonomy",
    "biology",
    "LUCA",
    "biodiversity",
    "interactive visualization",
  ],
  authors: [{ name: "Tree of Life Project" }],
  openGraph: {
    title: "Tree of Life — Explore the Known Diversity of Life",
    description: "An interactive evolutionary tree from LUCA to modern life.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080c10",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
