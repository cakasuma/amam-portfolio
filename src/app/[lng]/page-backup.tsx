"use client";
import { motion } from "motion/react";
import Link from "@/app/components/MotionLink";
import Image from "next/image";
import { use } from "react";
import { useTranslation } from "@/app/i18n/client";
import PageLayout, { PageHeader, AnimatedCard, Section } from "@/app/components/PageLayout";

interface HomeProps {
  params: Promise<{
    lng: string;
  }>;
}

export default function Home({ params }: HomeProps) {
  const { lng } = use(params);
  const { t } = useTranslation(lng);

  return (
    <PageLayout>
      {/* Hero Section */}
      <Section>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative w-48 h-48 lg:w-52 lg:h-52 mx-auto mb-8">
            <Image
              src="/image-amam.png"
              alt="Mustofa Amami Profile"
              width={208}
              height={208}
              priority
              unoptimized
              className="rounded-full ring-4 ring-primary/20 shadow-2xl object-cover transition-all duration-300 hover:ring-primary/40"
              style={{
                width: "100%",
                height: "100%",
                objectPosition: "center 15%",
              }}
            />
            <div className="absolute bottom-1 right-1 w-8 h-8 bg-success rounded-full border-4 border-card transition-colors duration-300"></div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-foreground to-muted bg-clip-text text-transparent mb-6">
            {t("name")}
          </h1>

          <p className="text-xl lg:text-2xl text-secondary mb-8 max-w-2xl mx-auto">
            Full-Stack Developer & UI/UX Enthusiast
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 glass rounded-full px-4 py-2 transition-all duration-300 hover:scale-105">
              <span className="text-muted">📧</span>
              <span className="text-muted text-sm">{t("email")}</span>
            </div>
            <div className="flex items-center gap-2 glass rounded-full px-4 py-2 transition-all duration-300 hover:scale-105">
              <span className="text-muted">📱</span>
              <span className="text-muted text-sm">{t("phone")}</span>
            </div>
            <div className="flex items-center gap-2 glass rounded-full px-4 py-2 transition-all duration-300 hover:scale-105">
              <span className="text-muted">📍</span>
              <span className="text-muted text-sm">Jakarta, ID</span>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
            >
              <span className="text-white text-lg font-bold">in</span>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-foreground rounded-full flex items-center justify-center hover:bg-muted transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
            >
              <span className="text-background text-lg font-bold">gh</span>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-info rounded-full flex items-center justify-center hover:bg-info/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
            >
              <span className="text-white text-lg font-bold">tw</span>
            </a>
          </div>
        </motion.div>
      </Section>

      {/* Content Sections */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* About Section */}
        <AnimatedCard delay={0.2} direction="left">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="text-primary">⚡</span>
            {t("about.title")}
          </h2>
          <p className="text-secondary leading-relaxed">
            {t("about.content")}
          </p>
        </AnimatedCard>

        {/* Skills Section */}
        <AnimatedCard delay={0.3} direction="right">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="text-warning">🎯</span>
            {t("what-i-do.title")}
          </h2>
          <p className="text-secondary leading-relaxed mb-6">
            {t("what-i-do.content")}
          </p>
          <div className="flex flex-wrap gap-2">
            {["React", "Next.js", "TypeScript", "Node.js", "Tailwind"].map(
              (skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20 transition-all duration-300 hover:bg-primary/20"
                >
                  {skill}
                </span>
              )
            )}
          </div>
        </AnimatedCard>
      </div>

      {/* Testimonials Section */}
      <AnimatedCard delay={0.4} className="mb-12">
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
          <span className="text-info">💬</span>
          {t("testimonials.title")}
        </h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <blockquote className="border-l-4 border-primary pl-6 transition-all duration-300 hover:border-primary/60">
            <p className="text-secondary italic mb-3 leading-relaxed">
              &ldquo;Mustofa is an exceptional developer who consistently
              delivers high-quality work. His attention to detail and
              problem-solving skills are outstanding.&rdquo;
            </p>
            <cite className="text-primary font-semibold">
              - Sarah Johnson, Project Manager
            </cite>
          </blockquote>
          <blockquote className="border-l-4 border-warning pl-6 transition-all duration-300 hover:border-warning/60">
            <p className="text-secondary italic mb-3 leading-relaxed">
              &ldquo;Working with Mustofa was a pleasure. He&apos;s
              professional, reliable, and his technical expertise helped bring
              our vision to life.&rdquo;
            </p>
            <cite className="text-warning font-semibold">
              - Alex Chen, Startup Founder
            </cite>
          </blockquote>
        </div>
      </AnimatedCard>

      {/* Call to Action */}
      <AnimatedCard delay={0.5} className="text-center">
        <div className="bg-gradient-to-r from-primary to-success p-8 rounded-2xl shadow-xl text-white">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Ready to work together?
          </h2>
          <p className="text-white/90 mb-6 text-lg">
            Let&apos;s create something amazing together!
          </p>
          <Link
            href={`/${lng}/contact`}
            className="inline-block bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Get in Touch
          </Link>
        </div>
      </AnimatedCard>
    </PageLayout>
  );
}

        {/* Content Sections */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* About Section */}
          <motion.div
            className="card glass p-8 shadow-xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-2xl font-bold text-primary dark:text-white mb-4 flex items-center gap-3 transition-colors duration-300">
              <span className="text-blue-500 dark:text-blue-400">⚡</span>
              {t("about.title")}
            </h2>
            <p className="text-secondary dark:text-gray-200 leading-relaxed transition-colors duration-300">
              {t("about.content")}
            </p>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            className="card glass p-8 shadow-xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-2xl font-bold text-primary dark:text-white mb-4 flex items-center gap-3 transition-colors duration-300">
              <span className="text-gray-600 dark:text-gray-400">🎯</span>
              {t("what-i-do.title")}
            </h2>
            <p className="text-secondary dark:text-gray-200 leading-relaxed mb-6 transition-colors duration-300">
              {t("what-i-do.content")}
            </p>
            <div className="flex flex-wrap gap-2">
              {["React", "Next.js", "TypeScript", "Node.js", "Tailwind"].map(
                (skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm rounded-full transition-colors duration-300"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </div>

        {/* Testimonials Section */}
        <motion.div
          className="mt-8 card glass p-8 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-6 flex items-center gap-3 transition-colors duration-300">
            <span className="text-gray-600 dark:text-gray-400">💬</span>
            {t("testimonials.title")}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <blockquote className="border-l-4 border-blue-500 dark:border-blue-400 pl-6 transition-colors duration-300">
              <p className="text-secondary dark:text-gray-200 italic mb-3 transition-colors duration-300">
                &ldquo;Mustofa is an exceptional developer who consistently
                delivers high-quality work. His attention to detail and
                problem-solving skills are outstanding.&rdquo;
              </p>
              <cite className="text-blue-600 dark:text-blue-400 font-semibold transition-colors duration-300">
                - Sarah Johnson, Project Manager
              </cite>
            </blockquote>
            <blockquote className="border-l-4 border-gray-500 dark:border-gray-400 pl-6 transition-colors duration-300">
              <p className="text-secondary dark:text-gray-200 italic mb-3 transition-colors duration-300">
                &ldquo;Working with Mustofa was a pleasure. He&apos;s
                professional, reliable, and his technical expertise helped bring
                our vision to life.&rdquo;
              </p>
              <cite className="text-gray-600 dark:text-gray-400 font-semibold transition-colors duration-300">
                - Alex Chen, Startup Founder
              </cite>
            </blockquote>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 rounded-2xl p-8 shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to work together?
            </h2>
            <p className="text-blue-100 dark:text-blue-200 mb-6 transition-colors duration-300">
              Let&apos;s create something amazing together!
            </p>
            <Link
              href={`/${lng}/contact`}
              className="inline-block bg-white dark:bg-gray-100 text-blue-600 dark:text-blue-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Get in Touch
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
