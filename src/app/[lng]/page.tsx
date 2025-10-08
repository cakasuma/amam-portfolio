"use client";
import { motion, AnimatePresence } from "motion/react";
import Link from "@/app/components/MotionLink";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { useTranslation } from "@/app/i18n/client";

interface HomeProps {
  params: Promise<{
    lng: string;
  }>;
}

export default function Home({ params }: HomeProps) {
  const { lng } = use(params);
  const { t } = useTranslation(lng);
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const [innerWidth, setInnerWidth] = useState(0);

  useEffect(() => {
    setInnerWidth(window.innerWidth);
  }, []);

  return (
    <motion.main
      className="min-h-screen bg-gradient-to-br from-primary via-secondary to-accent p-6 pb-24 md:pb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="grid md:grid-cols-[350px_1fr] gap-6 max-w-7xl mx-auto">
        {/* Left Sidebar - Profile Info */}
        <motion.div
          className="bg-background/10 backdrop-blur-sm rounded-2xl p-6 border border-border
                    md:sticky md:top-6 md:self-start h-fit"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="flex flex-col items-center cursor-pointer md:cursor-default"
            onClick={() => setIsProfileExpanded(!isProfileExpanded)}
          >
            <div className="flex items-center gap-4 w-full md:flex-col">
              <Image
                src="/profile-placeholder.svg"
                alt="Profile"
                width={60}
                height={60}
                className="rounded-full md:w-[200px] md:h-[200px]"
              />
              <h2 className="text-2xl font-bold text-foreground">
                {t("name")}
              </h2>
              <span className="block md:hidden ml-auto">
                {isProfileExpanded ? "↑" : "↓"}
              </span>
            </div>

            <AnimatePresence>
              {(isProfileExpanded || innerWidth >= 768) && (
                <motion.div
                  className="space-y-4 w-full mt-4"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <div className="space-y-2 text-center">
                    <p className="text-muted">{t("email")}</p>
                    <p className="text-muted">{t("phone")}</p>
                    <p className="text-muted">{t("birthday")}</p>
                  </div>
                  <div className="flex gap-4 justify-center">
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-accent transition-colors"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-accent transition-colors"
                    >
                      GitHub
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-accent transition-colors"
                    >
                      Twitter
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Right Content Area */}
        <motion.div
          className="flex flex-col space-y-8 bg-background/5 backdrop-blur-sm rounded-2xl p-6 border border-border/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Navigation - Hidden on mobile */}
          <div className="hidden md:flex justify-end">
            <nav
              className="inline-flex flex-wrap gap-4 p-4 bg-background/10 
                  backdrop-blur-sm rounded-2xl border border-border/50"
            >
              {["resume", "portfolio", "blog", "contact"].map((item) => (
                <Link
                  key={item}
                  href={`/${lng}/${item}`}
                  className="group relative px-6 py-2 transition-all duration-300"
                >
                  <span className="relative z-10 text-foreground/80 group-hover:text-white transition-colors">
                    {t(`nav.${item}`)}
                  </span>
                  {/* Hover effect - bottom line */}
                  <span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-primary 
                    group-hover:w-full transition-all duration-300"
                  />
                  {/* Hover effect - background glow */}
                  <span
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-accent/20 to-primary/20 
                    opacity-0 group-hover:opacity-100 transition-all duration-300 -z-0"
                  />
                </Link>
              ))}
            </nav>
          </div>

          {/* Content Container */}
          <div className="space-y-8">
            {/* About Section */}
            <motion.div
              className="group bg-background/10 backdrop-blur-sm rounded-2xl p-6 border border-border/50
                        hover:bg-background/15 transition-all duration-300"
              whileHover={{ scale: 1.01 }}
            >
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-accent">⚡</span>
                {t("about.title")}
              </h3>
              <p className="text-muted group-hover:text-foreground transition-colors">
                {t("about.content")}
              </p>
            </motion.div>

            {/* What I Do Section */}
            <motion.div
              className="group bg-background/10 backdrop-blur-sm rounded-2xl p-6 border border-border/50
                        hover:bg-background/15 transition-all duration-300"
              whileHover={{ scale: 1.01 }}
            >
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-primary">🎯</span>
                {t("what-i-do.title")}
              </h3>
              <p className="text-muted group-hover:text-foreground transition-colors">
                {t("what-i-do.content")}
              </p>
            </motion.div>

            {/* Testimonials Section */}
            <motion.div
              className="group bg-background/10 backdrop-blur-sm rounded-2xl p-6 border border-border/50
                        hover:bg-background/15 transition-all duration-300"
              whileHover={{ scale: 1.01 }}
            >
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-secondary">💬</span>
                {t("testimonials.title")}
              </h3>
              <div className="space-y-4">
                <blockquote className="border-l-4 border-primary pl-4">
                  <p className="text-muted italic mb-2">
                    &ldquo;Mustofa is an exceptional developer who consistently
                    delivers high-quality work. His attention to detail and
                    problem-solving skills are outstanding.&rdquo;
                  </p>
                  <cite className="text-primary font-semibold">
                    - Sarah Johnson, Project Manager
                  </cite>
                </blockquote>
                <blockquote className="border-l-4 border-secondary pl-4">
                  <p className="text-muted italic mb-2">
                    &ldquo;Working with Mustofa was a pleasure. He&apos;s
                    professional, reliable, and his technical expertise helped
                    bring our vision to life.&rdquo;
                  </p>
                  <cite className="text-secondary font-semibold">
                    - Alex Chen, Startup Founder
                  </cite>
                </blockquote>
              </div>
            </motion.div>

            {/* Clients Section */}
            <motion.div
              className="group bg-background/10 backdrop-blur-sm rounded-2xl p-6 border border-border/50
                        hover:bg-background/15 transition-all duration-300"
              whileHover={{ scale: 1.01 }}
            >
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-accent">🤝</span>
                {t("clients.title")}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["TechCorp", "InnovateLab", "DigitalFlow", "StartupXYZ"].map(
                  (client) => (
                    <div
                      key={client}
                      className="bg-background/20 rounded-lg p-4 text-center border border-border/30 hover:border-accent/50 transition-colors"
                    >
                      <div className="w-12 h-12 bg-accent/20 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-accent font-bold">
                          {client.charAt(0)}
                        </span>
                      </div>
                      <p className="text-muted text-sm">{client}</p>
                    </div>
                  )
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 md:hidden z-50">
        <div className="flex justify-around p-4 bg-background/60 backdrop-blur-lg border-t border-border">
          <Link
            href={`/${lng}/resume`}
            className="flex flex-col items-center text-sm text-foreground/80 hover:text-accent"
          >
            <span>📄</span>
            <span>{t("nav.resume")}</span>
          </Link>
          <Link
            href={`/${lng}/portfolio`}
            className="flex flex-col items-center text-sm text-foreground/80 hover:text-accent"
          >
            <span>💼</span>
            <span>{t("nav.portfolio")}</span>
          </Link>
          <Link
            href={`/${lng}/blog`}
            className="flex flex-col items-center text-sm text-foreground/80 hover:text-accent"
          >
            <span>📝</span>
            <span>{t("nav.blog")}</span>
          </Link>
          <Link
            href={`/${lng}/contact`}
            className="flex flex-col items-center text-sm text-foreground/80 hover:text-accent"
          >
            <span>📧</span>
            <span>{t("nav.contact")}</span>
          </Link>
        </div>
      </nav>
    </motion.main>
  );
}
