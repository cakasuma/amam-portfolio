"use client";
import { motion } from "motion/react";
import Link from "@/app/components/MotionLink";
import Image from "next/image";
import { use } from "react";
import { useTranslation } from "@/app/i18n/client";
import PageLayout, { AnimatedCard, Section } from "@/app/components/PageLayout";

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
            <div className="absolute bottom-2 right-2 w-8 h-8 bg-success rounded-full border-4 border-background"></div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            {t("name")}
          </h1>

          <p className="text-xl lg:text-2xl text-secondary mb-12 max-w-2xl mx-auto">
            Full-Stack Developer & UI/UX Enthusiast
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 bg-accent rounded-full px-4 py-2 border border-border">
              <span className="text-muted">📧</span>
              <span className="text-muted text-sm">{t("email")}</span>
            </div>
            <div className="flex items-center gap-2 bg-accent rounded-full px-4 py-2 border border-border">
              <span className="text-muted">📱</span>
              <span className="text-muted text-sm">{t("phone")}</span>
            </div>
            <div className="flex items-center gap-2 bg-accent rounded-full px-4 py-2 border border-border">
              <span className="text-muted">📍</span>
              <span className="text-muted text-sm">Jakarta, ID</span>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:bg-button-bg-hover transition-colors duration-200 focus-ring"
            >
              <span className="text-white text-lg font-bold">in</span>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-foreground rounded-full flex items-center justify-center hover:opacity-80 transition-opacity duration-200 focus-ring"
            >
              <span className="text-background text-lg font-bold">gh</span>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-info rounded-full flex items-center justify-center hover:opacity-80 transition-opacity duration-200 focus-ring"
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
        <div className="bg-primary p-8 rounded-xl text-white">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Ready to work together?
          </h2>
          <p className="mb-6 text-lg opacity-90">
            Let&apos;s create something amazing together!
          </p>
          <Link
            href={`/${lng}/contact`}
            className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 focus-ring"
          >
            Get in Touch
          </Link>
        </div>
      </AnimatedCard>
    </PageLayout>
  );
}
