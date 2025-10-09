"use client";
import { useTranslation } from "@/app/i18n/client";
import { motion } from "motion/react";
import Link from "next/link";
import { use } from "react";

interface ResumeProps {
  params: Promise<{
    lng: string;
  }>;
}

export default function Resume({ params }: ResumeProps) {
  const { lng } = use(params);
  const { t } = useTranslation(lng, "resume");

  return (
    <motion.main
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 pt-20 px-4 pb-24 md:pb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white mb-4">{t("title")}</h1>
          <Link
            href={`/${lng}`}
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← {t("back-to-home")}
          </Link>
        </motion.div>

        {/* Resume Content */}
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Personal Info */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              {t("personal-info.title")}
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-white/80">
              <div>
                <p>
                  <strong>{t("personal-info.name")}:</strong> Mustofa Amami
                </p>
                <p>
                  <strong>{t("personal-info.email")}:</strong>{" "}
                  mustofa.amami@email.com
                </p>
              </div>
              <div>
                <p>
                  <strong>{t("personal-info.phone")}:</strong> +62 123 456 7890
                </p>
                <p>
                  <strong>{t("personal-info.location")}:</strong> Jakarta,
                  Indonesia
                </p>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              {t("skills.title")}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {t("skills.frontend")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React",
                    "Next.js",
                    "TypeScript",
                    "Tailwind CSS",
                    "HTML5",
                    "CSS3",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {t("skills.backend")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Node.js",
                    "Express",
                    "PostgreSQL",
                    "MongoDB",
                    "REST APIs",
                    "GraphQL",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-slate-500/20 text-slate-400 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Experience */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              {t("experience.title")}
            </h2>
            <div className="space-y-6">
              <div className="border-l-2 border-primary pl-4">
                <h3 className="text-lg font-semibold text-foreground">
                  {t("experience.job1.title")}
                </h3>
                <p className="text-primary font-medium">
                  {t("experience.job1.company")}
                </p>
                <p className="text-muted text-sm">
                  {t("experience.job1.period")}
                </p>
                <p className="text-muted mt-2">
                  {t("experience.job1.description")}
                </p>
              </div>
              <div className="border-l-2 border-secondary pl-4">
                <h3 className="text-lg font-semibold text-foreground">
                  {t("experience.job2.title")}
                </h3>
                <p className="text-secondary font-medium">
                  {t("experience.job2.company")}
                </p>
                <p className="text-muted text-sm">
                  {t("experience.job2.period")}
                </p>
                <p className="text-muted mt-2">
                  {t("experience.job2.description")}
                </p>
              </div>
            </div>
          </section>

          {/* Education */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {t("education.title")}
            </h2>
            <div className="border-l-2 border-accent pl-4">
              <h3 className="text-lg font-semibold text-foreground">
                {t("education.degree")}
              </h3>
              <p className="text-accent font-medium">{t("education.school")}</p>
              <p className="text-muted text-sm">{t("education.period")}</p>
            </div>
          </section>
        </motion.div>
      </div>
    </motion.main>
  );
}
