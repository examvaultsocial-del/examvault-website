import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Caveat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const skrivaBold = localFont({
  src: "./fonts/SkrivaBold.ttf",
  variable: "--font-skriva",
  weight: "700",
  style: "normal",
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-notes",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ExamVault - Visual Study Materials for Competitive Exams",
    template: "%s | ExamVault",
  },
  icons: {
    icon: "/logo-solid-bg-square.jpeg",
    shortcut: "/logo-solid-bg-square.jpeg",
    apple: "/logo-solid-bg-square.jpeg",
  },
  description:
    "AI-powered visual study materials for Indian competitive exam aspirants. Infographics, PDF notes, and animated videos for UPSC, SSC, Banking & more.",
  keywords: [
    "UPSC preparation",
    "SSC study materials",
    "Banking exam prep",
    "visual learning",
    "infographics",
    "exam preparation India",
    "competitive exams",
  ],
  authors: [{ name: "ExamVault" }],
  creator: "ExamVault",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://examvault.in",
    siteName: "ExamVault",
    title: "ExamVault - Visual Study Materials for Competitive Exams",
    description:
      "AI-powered visual study materials for Indian competitive exam aspirants.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ExamVault - Visual Study Materials",
    description:
      "AI-powered visual study materials for Indian competitive exam aspirants.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { CartProvider } from "@/components/providers/CartProvider";
import { CartDrawer } from "@/components/CartDrawer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cause:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${skrivaBold.variable} ${caveat.variable} antialiased`}
      >
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>

        {/* Invisible SVG filter for pencil displacement effect */}
        <svg style={{ display: 'none' }}>
          <filter id="pencilFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.05 0.2" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="heavySketch">
            <feTurbulence type="fractalNoise" baseFrequency="0.05 0.15" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
      </body>
    </html>
  );
}