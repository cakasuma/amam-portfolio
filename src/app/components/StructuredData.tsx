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

  // Plain <script> tags, not next/script.
  //
  // `next/script` exists to control *when executable JavaScript runs*. JSON-LD
  // is not executable — it is data a crawler reads out of the markup. Sending
  // it through `next/script` with `afterInteractive` meant the tags were server
  // rendered but their contents were injected on the client, so:
  //
  //   * a crawler that does not run JavaScript found three empty blocks, which
  //     is the opposite of what `seo-metadata` requires; and
  //   * each script's text node differed between server and client, which is
  //     what React reported as the hydration mismatch (#418) on every route.
  //
  // This component is a Server Component, so a plain tag renders the JSON
  // straight into the HTML, where both problems disappear.
  return (
    <>
      <script
        id="person-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        id="profile-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
    </>
  );
}
