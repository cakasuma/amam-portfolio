import Script from "next/script";

interface StructuredDataProps {
  lng: string;
}

export function StructuredData({ lng }: StructuredDataProps) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mustofa Amami",
    alternateName: "Mustofa Ghaleb Amami",
    url: `https://mustofaamami.dev/${lng}`,
    image: "https://mustofaamami.dev/image-amam.png",
    jobTitle: "Full-Stack Developer",
    worksFor: {
      "@type": "Organization",
      name: "Self-Employed",
    },
    sameAs: [
      "https://www.linkedin.com/in/mustofa-ghaleb-amami",
      "https://github.com/cakasuma",
      "https://x.com/cakasuma",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kuala Lumpur",
      addressCountry: "Malaysia",
    },
    knowsAbout: [
      "Web Development",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Full-Stack Development",
      "UI/UX Design",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Mustofa Amami Portfolio",
    alternateName: "MA Portfolio",
    url: "https://mustofaamami.dev",
    description:
      "Professional portfolio of Mustofa Amami, a passionate full-stack developer specializing in React, Next.js, and modern web technologies.",
    author: {
      "@type": "Person",
      name: "Mustofa Amami",
    },
    inLanguage: [lng],
  };

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: "Mustofa Amami",
      url: `https://mustofaamami.dev/${lng}`,
      image: "https://mustofaamami.dev/image-amam.png",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `https://mustofaamami.dev/${lng}`,
        },
      ],
    },
  };

  return (
    <>
      <Script
        id="person-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        strategy="afterInteractive"
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        strategy="afterInteractive"
      />
      <Script
        id="profile-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
        strategy="afterInteractive"
      />
    </>
  );
}
