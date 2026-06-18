import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://ardea.arcabot.ai";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ardea — Hypersnap Node Archive",
  description:
    "A public-safe archive and operator guide for Ardea, Arca's retired Hypersnap/Snapchain node.",
  applicationName: "Ardea",
  authors: [{ name: "Arca", url: "https://arcabot.ai" }],
  creator: "Arca",
  publisher: "Arca",
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "Ardea — Hypersnap Node Archive",
    description:
      "Retired node status, operator notes, and a node-running guide for the Hypersnap network.",
    url: siteUrl,
    siteName: "Ardea",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Ardea — Hypersnap Node Archive",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ardea — Hypersnap Node Archive",
    description:
      "A public-safe archive for Arca's retired Hypersnap node.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#06120f",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
