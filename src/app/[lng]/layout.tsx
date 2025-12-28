import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { dir } from "i18next";
import { use } from "react";
import { languages } from "@/app/i18n/settings";
import { Providers } from "@/app/theme/Providers";
import { SmartHeader } from "@/app/components/SmartHeader";
import { SmartFooter } from "@/app/components/SmartFooter";
import { Footer } from "@/app/components/Footer";
import GoogleAnalytics from "@/app/components/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

// Optimized font loading
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Improve font loading performance
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false, // Only preload if needed
});

// Enhanced SEO metadata
export const metadata: Metadata = {
  title: {
    template: "%s | Mustofa Amami - Full-Stack Developer",
    default: "Mustofa Amami - Full-Stack Developer & UI/UX Enthusiast",
  },
  description:
    "Professional portfolio of Mustofa Amami, a passionate full-stack developer specializing in React, Next.js, and modern web technologies. Explore my projects, experience, and blog posts.",
  keywords: [
    "Mustofa Amami",
    "Full-Stack Developer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "UI/UX",
    "Web Development",
    "Frontend",
    "Backend",
    "Jakarta",
    "Indonesia",
  ],
  authors: [{ name: "Mustofa Amami", url: "https://mustofaamami.dev" }],
  creator: "Mustofa Amami",
  publisher: "Mustofa Amami",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://mustofaamami.dev"
  ),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "id-ID": "/id",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Mustofa Amami - Full-Stack Developer & UI/UX Enthusiast",
    description:
      "Professional portfolio showcasing full-stack development expertise, modern web technologies, and creative problem-solving.",
    siteName: "Mustofa Amami Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mustofa Amami - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mustofa Amami - Full-Stack Developer",
    description:
      "Professional portfolio showcasing full-stack development expertise and modern web technologies.",
    creator: "@mustofaamami",
    images: ["/twitter-image.png"],
  },
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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}>) {
  const { lng } = use(params);

  return (
    <html
      lang={lng}
      dir={dir(lng)}
      suppressHydrationWarning
      className="scroll-smooth"
    >
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicons/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicons/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#8b4513" />
        <meta name="msapplication-TileColor" content="#8b4513" />

        {/* Enhanced viewport for better mobile experience */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen bg-background text-foreground`}
      >
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-button-cta-bg text-white px-4 py-2 rounded-md font-medium"
        >
          Skip to main content
        </a>

        <Providers>
          <GoogleAnalytics />
          <Analytics />
          <div className="flex flex-col min-h-screen">
            <SmartHeader lng={lng} />
            <main
              id="main-content"
              className="flex-1 pt-16 pb-24 md:pb-16"
              role="main"
            >
              {children}
            </main>
            <SmartFooter lng={lng} />
            <Footer lng={lng} />
          </div>
        </Providers>
      </body>
    </html>
  );
}
