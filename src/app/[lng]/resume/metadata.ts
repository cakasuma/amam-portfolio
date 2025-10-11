import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lng: string }>;
}): Promise<Metadata> {
  const { lng } = await params;
  
  return {
    title: "Resume - Professional Experience & Skills",
    description: "View Mustofa Amami's professional resume, including work experience, technical skills, education, and certifications in full-stack development.",
    keywords: [
      "resume",
      "CV",
      "professional experience",
      "full-stack developer",
      "technical skills",
      "React developer",
      "Next.js experience",
      "TypeScript",
      "Node.js",
      "career history"
    ],
    openGraph: {
      title: "Resume - Mustofa Amami | Full-Stack Developer",
      description: "Professional resume showcasing extensive experience in full-stack development, modern web technologies, and successful project deliveries.",
      type: "profile",
      locale: lng === 'id' ? 'id_ID' : 'en_US',
    },
    twitter: {
      title: "Resume - Mustofa Amami | Full-Stack Developer",
      description: "Professional resume showcasing extensive experience in full-stack development and modern web technologies.",
    },
    alternates: {
      canonical: `/${lng}/resume`,
      languages: {
        'en-US': '/en/resume',
        'id-ID': '/id/resume',
      },
    },
  };
}