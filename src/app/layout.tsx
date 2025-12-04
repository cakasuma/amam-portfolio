import type { Metadata } from "next";
import "./[lng]/globals.css";

export const metadata: Metadata = {
  title: "Mustofa Amami - Portfolio",
  description: "Full-Stack Developer & UI/UX Enthusiast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
