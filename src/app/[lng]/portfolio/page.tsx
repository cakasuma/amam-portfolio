"use client";
import { useTranslation } from "@/app/i18n/client";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { use } from "react";
import PageLayout, {
  PageHeader,
  AnimatedCard,
} from "@/app/components/PageLayout";

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
        "A modern e-commerce platform built with Next.js and Stripe integration",
      image: "/file.svg",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates",
      image: "/file.svg",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description:
        "A beautiful weather dashboard with location-based forecasts",
      image: "/file.svg",
      technologies: ["React", "OpenWeather API", "Chart.js", "CSS3"],
      demoUrl: "#",
      githubUrl: "#",
    },
  ];

  return (
    <PageLayout>
      {/* Header */}
      <PageHeader
        title={t("title") || "Portfolio"}
        subtitle={t("subtitle") || "A showcase of my recent projects and work"}
      />

      {/* Projects Grid */}
      <AnimatedCard delay={0.2}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="card p-6 group hover-lift"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Project Image */}
              <div className="relative h-48 bg-accent/30 rounded-xl mb-6 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>

              {/* Project Content */}
              <h3 className="text-xl font-bold text-foreground mb-3">
                {project.title}
              </h3>
              <p className="text-secondary mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm border border-primary/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <a
                  href={project.demoUrl}
                  className="flex-1 bg-primary hover:bg-primary/80 text-white px-4 py-3 rounded-xl text-center transition-colors font-medium"
                >
                  {t("view-demo")}
                </a>
                <a
                  href={project.githubUrl}
                  className="flex-1 bg-accent hover:bg-accent/80 text-foreground px-4 py-3 rounded-xl text-center transition-colors font-medium border border-border"
                >
                  {t("view-code")}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatedCard>

      {/* Contact CTA */}
      <AnimatedCard delay={0.5} className="text-center">
        <div className="bg-gradient-to-r from-primary to-success p-8 rounded-xl text-white">
          <h2 className="text-3xl font-bold mb-4">{t("cta.title")}</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t("cta.description")}
          </p>
          <Link
            href={`/${lng}/contact`}
            className="inline-block bg-background text-primary hover:bg-accent border border-border px-8 py-4 rounded-xl font-semibold transition-colors shadow-lg focus-ring"
          >
            {t("cta.button")}
          </Link>
        </div>
      </AnimatedCard>
    </PageLayout>
  );
}
