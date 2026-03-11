import type { Metadata } from "next";

import { DM_Sans, Sora, IBM_Plex_Mono } from "next/font/google";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import AnalyticsProvider from "@/components/analytics/AnalyticsProvider";
import { globalStructuredData } from "@/app/structured-data";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-display",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://forgespace.co"),
  title: {
    default: "Forge Space — Generate code with AI. Ship it with confidence.",
    template: "%s | Forge Space",
  },
  description:
    "Open-source Internal Developer Platform. AI code generation with scorecards, policy packs, and audit trails. Free for individuals.",
  keywords: [
    "internal developer platform",
    "IDP",
    "AI code generation",
    "governance",
    "scorecard",
    "MCP",
    "open source",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Forge Space",
    title: "Forge Space — Generate code with AI. Ship it with confidence.",
    description:
      "Platform-grade governance without a platform team. Scorecards, policy packs, and audit trails from prompt to production.",
    url: "https://forgespace.co",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Forge Space" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forge Space — IDP for the rest of us",
    description:
      "AI code generation with built-in governance. Free & open source.",
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://forgespace.co",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalStructuredData) }}
        />
      </head>
      <body
        className={`${dmSans.variable} ${sora.variable} ${ibmPlexMono.variable} flex min-h-screen flex-col font-sans antialiased`}
      >
        <AnalyticsProvider>
          <Nav />
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
          <Footer />
        </AnalyticsProvider>
      </body>
    </html>
  );
}
