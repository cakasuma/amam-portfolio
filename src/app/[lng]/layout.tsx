import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { dir } from "i18next";
import { use } from "react";
import { languages } from "@/app/i18n/settings";
import { Providers } from "@/app/theme/Providers";
import { Navigation } from "@/app/components/Navigation";
import "./globals.css";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

// font-setup
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
// end font-setup

// app metadata
export const metadata: Metadata = {
  title: "Amam Portfolio",
  description: "Personal portfolio website",
  authors: [{ name: "Mustofa Amami" }],
  viewport: "width=device-width, initial-scale=1",
};

// end app metadata

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}>) {
  const { lng } = use(params);

  return (
    <html lang={lng} dir={dir(lng)} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen`}
      >
        <Providers>
          <Navigation lng={lng} />
          <main className="pb-16">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
