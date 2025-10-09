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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 px-6 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold text-white mb-6">{t("title")}</h1>
          <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 group hover:bg-white/15 transition-all duration-300 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Project Image */}
              <div className="relative h-48 bg-slate-800/50">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-blue-200 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-600/30 text-blue-200 rounded-full text-sm border border-blue-400/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <a
                    href={project.demoUrl}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl text-center transition-colors font-medium"
                  >
                    {t("view-demo")}
                  </a>
                  <a
                    href={project.githubUrl}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl text-center transition-colors font-medium border border-white/20"
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
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 border border-white/20 shadow-xl">
            <h2 className="text-3xl font-bold text-white mb-4">
              {t("cta.title")}
            </h2>
            <p className="text-blue-200 mb-8 max-w-2xl mx-auto leading-relaxed">
              {t("cta.description")}
            </p>
            <Link
              href={`/${lng}/contact`}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors shadow-lg"
            >
              {t("cta.button")}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
