import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lng: string }>;
}): Promise<Metadata> {
  const { lng } = await params;
  
  return {
    title: "Portfolio - My Projects & Creative Work",
    description: "Explore Mustofa Amami's portfolio showcasing innovative web applications, e-commerce platforms, and full-stack development projects using modern technologies.",
    keywords: [
      "portfolio",
      "web development projects",
      "React projects",
      "Next.js applications",
      "full-stack projects",
      "e-commerce platform",
      "task management app",
      "weather dashboard",
      "TypeScript projects",
      "modern web apps"
    ],
    openGraph: {
      title: "Portfolio - Mustofa Amami | Full-Stack Developer Projects",
      description: "Showcase of innovative web applications and full-stack development projects featuring modern technologies and creative solutions.",
      type: "website",
      locale: lng === 'id' ? 'id_ID' : 'en_US',
    },
    twitter: {
      title: "Portfolio - Mustofa Amami | Full-Stack Developer",
      description: "Showcase of innovative web applications and full-stack development projects featuring modern technologies.",
    },
    alternates: {
      canonical: `/${lng}/portfolio`,
      languages: {
        'en-US': '/en/portfolio',
        'id-ID': '/id/portfolio',
      },
    },
  };
}