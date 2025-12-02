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
  const { t } = useTranslation(lng, "portfolio");

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "A modern, responsive e-commerce platform built with Next.js featuring Stripe payment integration, user authentication, and admin dashboard.",
      image: "/file.svg",
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Stripe",
        "PostgreSQL",
      ],
      demoUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates, team collaboration features, and intuitive drag-and-drop interface.",
      image: "/file.svg",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Express"],
      demoUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description:
        "A beautiful, responsive weather dashboard with location-based forecasts, interactive charts, and severe weather alerts.",
      image: "/file.svg",
      technologies: ["React", "OpenWeather API", "Chart.js", "CSS3"],
      demoUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      id: 4,
      title: "Personal Finance Tracker",
      description:
        "A comprehensive personal finance tracking application with expense categorization, budget planning, and financial insights.",
      image: "/file.svg",
      technologies: ["Vue.js", "Firebase", "Chart.js", "Vuetify"],
      demoUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      id: 5,
      title: "Blog CMS Platform",
      description:
        "A headless CMS platform for bloggers with rich text editing, SEO optimization, and multi-author support.",
      image: "/file.svg",
      technologies: ["Next.js", "Sanity", "TypeScript", "Vercel"],
      demoUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      id: 6,
      title: "Real Estate Portal",
      description:
        "A modern real estate portal with property listings, advanced search filters, and virtual tour integration.",
      image: "/file.svg",
      technologies: ["React", "Node.js", "PostgreSQL", "Redis"],
      demoUrl: "#",
      githubUrl: "#",
      featured: false,
    },
  ];

  const featuredProjects = projects.filter((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);

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
                  </footer>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </ContentGrid>
      </Section>

      {/* Other Projects */}
      <Section id="other-projects" ariaLabel="Other projects">
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <span className="text-warning text-3xl">🚀</span>
            {t("other-projects.title") || "Other Projects"}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            {t("other-projects.description") || "Additional projects showcasing various technologies and creative solutions"}
          </p>
        </div>

        <ContentGrid columns={3} gap="md">
          {otherProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="group h-full" hover>
                {/* Project Image */}
                <div className="relative h-32 bg-accent/30 rounded-t-xl mb-4 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`${project.title} project screenshot`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                </div>

                <CardContent className="p-4">
                  {/* Project Content */}
                  <header className="mb-3">
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-secondary transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </header>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-warning/10 text-warning rounded text-xs border border-warning/20"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-accent text-text-muted rounded text-xs">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <footer className="flex gap-2">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View demo of ${project.title}`}
                      className="flex-1"
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-xs"
                      >
                        <FaExternalLinkAlt className="w-3 h-3 mr-1" />
                        {t("demo") || "Demo"}
                      </Button>
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View code for ${project.title}`}
                      className="flex-1"
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-xs"
                      >
                        <FaGithub className="w-3 h-3 mr-1" />
                        {t("code") || "Code"}
                      </Button>
                    </a>
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
