import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PixelCatLoader from "@/components/PixelCatLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://pixel-loader-cartoon.onrender.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Pixel Cat Loader | Animated Pixel Art Loader for React & Next.js",
    template: "%s | Pixel Cat Loader",
  },
  description:
    "A lightweight pixel-art cat loader component for React and Next.js. Canvas-based, no images, with a wagging tail and a smooth fade-out.",
  applicationName: "Pixel Cat Loader",
  keywords: [
    "pixel cat loader",
    "pixel loader",
    "react loader component",
    "next.js loader",
    "pixel art animation",
    "loading screen",
    "splash screen",
    "react component",
  ],
  authors: [{ name: "Jeya Jothi S" }],
  creator: "Jeya Jothi S",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Pixel Cat Loader",
    title: "Pixel Cat Loader | Animated Pixel Art Loader",
    description:
      "A pixel-art cat loading screen with a wagging tail. Built for React and Next.js.",
    locale: "en_IN",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Pixel Cat Loader preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pixel Cat Loader | Animated Pixel Art Loader",
    description:
      "A pixel-art cat loading screen with a wagging tail. Built for React and Next.js.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  name: "Pixel Cat Loader",
  description:
    "A canvas-based pixel-art cat loader component for React and Next.js.",
  url: siteUrl,
  programmingLanguage: "TypeScript",
  author: { "@type": "Person", name: "Jeya Jothi S" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <PixelCatLoader />
        {children}
      </body>
    </html>
  );
}
