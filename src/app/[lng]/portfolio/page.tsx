"use client";
import { useTranslation } from "@/app/i18n/client";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { use } from "react";
import PageLayout, {
  PageHeader,
  Section,
  ContentGrid,
  CTASection,
} from "@/app/components/PageLayout";
import { Card, CardContent, Button } from "@/components/ui";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

interface PortfolioProps {
  params: Promise<{
    lng: string;
  }>;
}

export default function Portfolio({ params }: PortfolioProps) {
  const { lng } = use(params);
  const { t, ready } = useTranslation(lng, "portfolio");

  const projects = [
    {
      id: 1,
      title: "Wedding Invitation - Rina & Amam",
      description:
        "A beautiful and elegant wedding invitation website featuring interactive RSVP system, event details, gallery, and guest management. Built with modern web technologies for a seamless mobile experience.",
      image: "/projects/wedding-invitation.svg",
      technologies: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Vercel",
      ],
      demoUrl: "https://wedding-rina-amam-invitation.vercel.app/",
      githubUrl: "https://github.com/cakasuma/wedding-rina-amam",
      featured: true,
    },
    {
      id: 2,
      title: "WeImpact",
      description:
        "A social impact platform connecting volunteers with meaningful causes and projects. Features include project listings, volunteer matching, impact tracking, and community engagement tools.",
      image: "/projects/weimpact.svg",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Firebase"],
      demoUrl: "https://weimpact.netlify.app/",
      githubUrl: "https://github.com/cakasuma/weimpact",
      featured: true,
    },
    {
      id: 3,
      title: "Astro TV Channels",
      description:
        "A comprehensive TV schedule browser for Astro channels with real-time program listings, search functionality, filtering options, and dark mode support. Built with React Hooks, MobX state management, and styled components.",
      image: "/projects/tv-channels.svg",
      technologies: ["React", "MobX", "Styled Components", "Axios", "React Router"],
      demoUrl: "https://my-tv-channels.netlify.app",
      githubUrl: "https://github.com/cakasuma/tv-channels",
      featured: true,
    },
    {
      id: 4,
      title: "Pacemaker FHIR Integration",
      description:
        "Healthcare data integration solution implementing FHIR standards for interoperability. Developed for HubSpot Pacemaker to streamline patient data exchange and medical records management.",
      image: "/projects/pacemaker-fhir.svg",
      technologies: ["React", "TypeScript", "FHIR API", "Node.js", "Healthcare Standards"],
      demoUrl: null,
      githubUrl: "https://github.com/cakasuma/hubspot-pacemaker",
      featured: true,
    },
    {
      id: 5,
      title: "Deriv",
      description:
        "Led transformative web initiatives at Deriv, a global fintech company. Spearheaded OAuth implementation across applications, managed partner onboarding and dashboard experience, architected new web platform using fullstack engineering with lowcode and AI tools, and supervised super app implementation to integrate onboarding and platform ecosystems.",
      image: "/projects/deriv.svg",
      technologies: ["React", "TypeScript", "OAuth", "Fullstack", "AI Tools", "Low-code"],
      demoUrl: "https://app.deriv.com",
      githubUrl: null,
      featured: false,
    },
    {
      id: 6,
      title: "MoneyLion",
      description:
        "Drove engineering excellence at MoneyLion, a leading fintech platform. Led organization-wide initiatives to enhance design system and monitoring infrastructure, built and documented mobile payment features using React Native, Redux, and Redux Saga, managed iOS and Android deployment pipelines, and maintained 99.9x% availability while ensuring exceptional code quality and architecture.",
      image: "/projects/moneylion.svg",
      technologies: ["React Native", "Redux", "Redux Saga", "iOS", "Android", "Mobile Payments"],
      demoUrl: "https://app.moneylion.com",
      githubUrl: null,
      featured: false,
    },
  ];

  const featuredProjects = projects.filter((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);

  // Show loading state until translations are ready
  if (!ready) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-muted">Loading...</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* Header */}
      <PageHeader
        title={t("title") || "Portfolio"}
        subtitle={
          t("subtitle") || "A showcase of my recent projects and creative work"
        }
        level={1}
      />

      {/* Professional Experience */}
      <Section id="professional-experience" ariaLabel="Professional experience">
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <span className="text-warning text-3xl">🚀</span>
            {t("other-projects.title") || "Professional Experience"}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            {t("other-projects.description") || "Companies where I've led impactful initiatives and built innovative solutions at scale"}
          </p>
        </div>

        <ContentGrid columns={2} gap="lg">
          {otherProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="group h-full" hover>
                {/* Project Image */}
                <div className="relative h-48 bg-accent/30 rounded-t-xl mb-6 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`${project.title} project screenshot`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                </div>

                <CardContent className="p-6">
                  {/* Project Content */}
                  <header className="mb-4">
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {project.description}
                    </p>
                  </header>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-warning/10 text-warning rounded-full text-sm border border-warning/20 font-medium hover:bg-warning/20 transition-colors duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <footer className="flex gap-3">
                    {project.demoUrl ? (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View demo of ${project.title}`}
                        className="flex-1"
                      >
                        <Button
                          variant="cta"
                          size="sm"
                          className="w-full"
                        >
                          <FaExternalLinkAlt className="w-3 h-3 mr-2" />
                          {t("view-demo") || "Live Demo"}
                        </Button>
                      </a>
                    ) : (
                      <Button
                        variant="cta"
                        size="sm"
                        className="w-full opacity-50 cursor-not-allowed"
                        disabled
                      >
                        <FaExternalLinkAlt className="w-3 h-3 mr-2" />
                        {t("private-project") || "Private Project"}
                      </Button>
                    )}
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View code for ${project.title}`}
                        className="flex-1"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                        >
                          <FaGithub className="w-3 h-3 mr-2" />
                          {t("view-code") || "GitHub"}
                        </Button>
                      </a>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full opacity-50 cursor-not-allowed"
                        disabled
                      >
                        <FaGithub className="w-3 h-3 mr-2" />
                        {t("private-repo") || "Private Repo"}
                      </Button>
                    )}
                  </footer>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </ContentGrid>
      </Section>

      {/* Featured Projects */}
      <Section id="featured-projects" ariaLabel="Featured projects">
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <span className="text-secondary text-3xl">⭐</span>
            {t("featured-projects.title") || "Featured Projects"}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            {t("featured-projects.description") || "Highlighting some of my most impactful and technically challenging projects"}
          </p>
        </div>

        <ContentGrid columns={2} gap="lg">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="group h-full" hover>
                {/* Project Image */}
                <div className="relative h-48 bg-accent/30 rounded-t-xl mb-6 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`${project.title} project screenshot`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
                      {t("featured") || "Featured"}
                    </span>
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* Project Content */}
                  <header className="mb-4">
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {project.description}
                    </p>
                  </header>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm border border-secondary/20 font-medium hover:bg-secondary/20 transition-colors duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <footer className="flex gap-3">
                    {project.demoUrl ? (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View live demo of ${project.title}`}
                        className="flex-1"
                      >
                        <Button variant="cta" size="sm" className="w-full">
                          <FaExternalLinkAlt className="w-3 h-3 mr-2" />
                          {t("view-demo") || "Live Demo"}
                        </Button>
                      </a>
                    ) : (
                      <Button variant="cta" size="sm" className="w-full opacity-50 cursor-not-allowed" disabled>
                        <FaExternalLinkAlt className="w-3 h-3 mr-2" />
                        {t("private-project") || "Private Project"}
                      </Button>
                    )}
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View source code for ${project.title}`}
                        className="flex-1"
                      >
                        <Button variant="outline" size="sm" className="w-full">
                          <FaGithub className="w-3 h-3 mr-2" />
                          {t("view-code") || "GitHub"}
                        </Button>
                      </a>
                    ) : (
                      <Button variant="outline" size="sm" className="w-full opacity-50 cursor-not-allowed" disabled>
                        <FaGithub className="w-3 h-3 mr-2" />
                        {t("private-repo") || "Private Repo"}
                      </Button>
                    )}
                  </footer>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </ContentGrid>
      </Section>

      {/* Contact CTA */}
      <CTASection
        title={t("cta.title") || "Interested in working together?"}
        description={
          t("cta.description") ||
          "I'm always excited to take on new challenges and collaborate on innovative projects. Let's discuss how we can bring your ideas to life!"
        }
        variant="primary"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href={`/${lng}/contact`}>
            <Button variant="cta" size="lg">
              {t("cta.button") || "Get in Touch"}
            </Button>
          </Link>
          <Link href={`/${lng}/resume`}>
            <Button variant="outline" size="lg">
              {t("view-resume") || "View Resume"}
            </Button>
          </Link>
        </div>
      </CTASection>
    </PageLayout>
  );
}
