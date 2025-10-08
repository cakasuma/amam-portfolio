"use client";
import { useTranslation } from "@/app/i18n/client";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { use } from "react";

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
    <motion.main
      className="min-h-screen bg-gradient-to-br from-primary via-secondary to-accent p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white mb-4">{t("title")}</h1>
          <p className="text-white/80 mb-6">{t("subtitle")}</p>
          <Link
            href={`/${lng}`}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            ← {t("back-to-home")}
          </Link>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="bg-background/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-border/50 group hover:bg-background/15 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Project Image */}
              <div className="relative h-48 bg-muted/20">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-muted mb-4">{project.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-primary/20 text-primary rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <a
                    href={project.demoUrl}
                    className="flex-1 bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg text-center transition-colors"
                  >
                    {t("view-demo")}
                  </a>
                  <a
                    href={project.githubUrl}
                    className="flex-1 bg-foreground/10 hover:bg-foreground/20 text-foreground px-4 py-2 rounded-lg text-center transition-colors"
                  >
                    {t("view-code")}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="bg-background/10 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {t("cta.title")}
            </h2>
            <p className="text-muted mb-6">{t("cta.description")}</p>
            <Link
              href={`/${lng}/contact`}
              className="inline-block bg-accent hover:bg-accent/80 text-background px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              {t("cta.button")}
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
