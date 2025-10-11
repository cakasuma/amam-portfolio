"use client";
import { motion } from "motion/react";
import Link from "@/app/components/MotionLink";
import Image from "next/image";
import { use } from "react";
import { useTranslation } from "@/app/i18n/client";
import PageLayout, { AnimatedCard, Section } from "@/app/components/PageLayout";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

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
          className="text-center mb-20 pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative w-48 h-48 lg:w-56 lg:h-56 mx-auto mb-12">
            <Image
              src="/image-amam.png"
              alt="Mustofa Amami Profile"
              width={224}
              height={224}
              priority
              unoptimized
              className="rounded-full border-4 border-border object-cover"
              style={{
                width: "100%",
                height: "100%",
                objectPosition: "center 15%",
              }}
            />
            {/* <div className="absolute bottom-2 right-2 w-8 h-8 bg-success rounded-full border-4 border-background"></div> */}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            {t("name")}
          </h1>

          <p className="text-xl lg:text-2xl text-secondary mb-12 max-w-2xl mx-auto">
            Full-Stack Developer & UI/UX Enthusiast
          </p>

          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              className="flex items-center gap-3 bg-accent rounded-full px-6 py-3 border border-border hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer group"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span
                className="text-2xl group-hover:scale-110 transition-transform duration-300"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                📧
              </motion.span>
              <span className="text-muted text-sm font-medium group-hover:text-foreground transition-colors duration-300">
                {t("email")}
              </span>
            </motion.div>

            <motion.div
              className="flex items-center gap-3 bg-accent rounded-full px-6 py-3 border border-border hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer group"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span
                className="text-2xl group-hover:scale-110 transition-transform duration-300"
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4 }}
              >
                📱
              </motion.span>
              <span className="text-muted text-sm font-medium group-hover:text-foreground transition-colors duration-300">
                {t("phone")}
              </span>
            </motion.div>

            <motion.div
              className="flex items-center gap-3 bg-accent rounded-full px-6 py-3 border border-border hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer group"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span
                className="text-2xl group-hover:scale-110 transition-transform duration-300"
                animate={{ y: [0, -3, 3, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              >
                📍
              </motion.span>
              <span className="text-muted text-sm font-medium group-hover:text-foreground transition-colors duration-300">
                Jakarta, ID
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.a
              href="https://linkedin.com/in/mustofaamami"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 focus-ring overflow-hidden"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <FaLinkedin className="text-white text-xl relative z-10 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-300" />
            </motion.a>

            <motion.a
              href="https://github.com/cakasuma"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-14 h-14 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center hover:shadow-lg hover:shadow-gray-800/25 transition-all duration-300 focus-ring overflow-hidden"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <FaGithub className="text-white text-xl relative z-10 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-600 to-gray-800 rounded-xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-300" />
            </motion.a>

            <motion.a
              href="https://twitter.com/mustofaamami"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-14 h-14 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center hover:shadow-lg hover:shadow-sky-500/25 transition-all duration-300 focus-ring overflow-hidden"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <FaTwitter className="text-white text-xl relative z-10 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-sky-600 rounded-xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-300" />
            </motion.a>
          </motion.div>
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
          <p className="text-secondary leading-relaxed">{t("about.content")}</p>
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
                  className="px-3 py-1 bg-accent text-foreground text-sm rounded-md border border-border"
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
          <blockquote className="border-l-4 border-primary pl-6">
            <p className="text-secondary italic mb-3 leading-relaxed">
              &ldquo;Mustofa is an exceptional developer who consistently
              delivers high-quality work. His attention to detail and
              problem-solving skills are outstanding.&rdquo;
            </p>
            <cite className="text-primary font-semibold">
              - Sarah Johnson, Project Manager
            </cite>
          </blockquote>
          <blockquote className="border-l-4 border-warning pl-6">
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
        <div className="bg-primary p-8 rounded-xl text-foreground">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Ready to work together?
          </h2>
          <p className="mb-6 text-lg opacity-90">
            Let&apos;s create something amazing together!
          </p>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href={`/${lng}/contact`}
              className="group relative inline-block bg-background text-primary hover:bg-accent border border-border px-8 py-3 rounded-lg font-semibold transition-all duration-300 focus-ring overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
              <span className="relative z-10 group-hover:text-primary transition-colors duration-300">
                Get in Touch
              </span>
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                style={{ width: "100%" }}
              />
            </Link>
          </motion.div>
        </div>
      </AnimatedCard>
    </PageLayout>
  );
}
