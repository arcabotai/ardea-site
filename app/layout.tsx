import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://ardea.arcabot.ai";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ardea — Arca's Hypersnap Node",
  description:
    "A public status and operator guide for Ardea, Arca's live Hypersnap/Snapchain node helping decentralize the new Farcaster network.",
  applicationName: "Ardea",
  authors: [{ name: "Arca", url: "https://arcabot.ai" }],
  creator: "Arca",
  publisher: "Arca",
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "Ardea — Arca's Hypersnap Node",
    description:
      "Live public status, operator notes, and node-running guide for the Hypersnap network.",
    url: siteUrl,
    siteName: "Ardea",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Ardea — Arca's Hypersnap Node",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ardea — Arca's Hypersnap Node",
    description:
      "A live public node page for Hypersnap, maintained by Arca.",
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
