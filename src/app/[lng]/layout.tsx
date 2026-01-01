import type { Metadata } from "next";
import { dir } from "i18next";
import { use } from "react";
import { languages } from "@/app/i18n/settings";
import { Providers } from "@/app/theme/Providers";
import { SmartHeader } from "@/app/components/SmartHeader";
import { SmartFooter } from "@/app/components/SmartFooter";
import { Footer } from "@/app/components/Footer";
import { StructuredData } from "@/app/components/StructuredData";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

// Viewport configuration
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#8b4513" },
    { media: "(prefers-color-scheme: dark)", color: "#8b4513" },
  ],
};

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
  },
  twitter: {
    card: "summary_large_image",
    title: "Mustofa Amami - Full-Stack Developer",
    description:
      "Professional portfolio showcasing full-stack development expertise and modern web technologies.",
    creator: "@mustofaamami",
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
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Mustofa Amami",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
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
        
        {/* Manifest - must use absolute path with dynamic routes */}
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className="antialiased relative min-h-screen bg-background text-foreground"
        style={{
          fontFamily:
            'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        }}
      >
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-button-cta-bg text-white px-4 py-2 rounded-md font-medium"
        >
          Skip to main content
        </a>

        <Providers>
          <StructuredData lng={lng} />
          <Analytics />
          <SpeedInsights />
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
