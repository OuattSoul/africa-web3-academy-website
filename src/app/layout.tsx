import type { Metadata, Viewport } from "next";
import { Newsreader, Open_Sans } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/RevealObserver";
import { SITE, LABELS, formatDate } from "@/content/site";
import { upcomingSessions } from "@/content/trainings";
import { communityHref } from "@/content/community";
import "./globals.css";

// Open Sans matches the logo wordmark; Newsreader carries editorial headlines (round-topped 3 keeps "Web3" legible).
const openSans = Open_Sans({ variable: "--font-open-sans", subsets: ["latin"], display: "swap" });
const serif = Newsreader({ variable: "--font-serif", subsets: ["latin"], axes: ["opsz"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Africa Web3 Academy — Apprendre et construire avec la blockchain", template: "%s · Africa Web3 Academy" },
  description: SITE.description,
  openGraph: { type: "website", locale: "fr_FR", siteName: SITE.name, images: [{ url: "/og.png", width: 1200, height: 630, alt: "Africa Web3 Academy" }] },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#03024c" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const sessions = upcomingSessions().map((s) => ({
    title: s.training.shortTitle ?? s.training.title,
    href: `/formations/${s.training.slug}`,
    date: formatDate(s.start),
    modality: LABELS.modality[s.modality],
  }));
  return (
    <html lang="fr" className={`${openSans.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#contenu" className="skip-link">Aller au contenu</a>
        <Header sessions={sessions} communityHref={communityHref()} />
        <main id="contenu" tabIndex={-1}>{children}</main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
