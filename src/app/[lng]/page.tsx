"use client";
import { motion } from "motion/react";
import Link from "@/app/components/MotionLink";
import Image from "next/image";
import { use } from "react";
import { useTranslation } from "@/app/i18n/client";
import PageLayout, {
  AnimatedCard,
  Section,
  HeroSection,
  ContentGrid,
  CTASection,
} from "@/app/components/PageLayout";
import { Button } from "@/components/ui";
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
      <HeroSection>
        <motion.div
          className="pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Profile Image with enhanced styling */}
          <div className="relative w-48 h-48 lg:w-56 lg:h-56 mx-auto mb-8">
            <motion.div
              className="relative w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/image-amam.png"
                alt="Mustofa Amami - Full-Stack Developer Portrait"
                width={224}
                height={224}
                priority
                unoptimized
                className="rounded-full border-4 border-secondary object-cover shadow-lg"
                style={{
                  width: "100%",
                  height: "100%",
                  objectPosition: "center 15%",
                }}
              />
              {/* Professional status indicator */}
              <motion.div
                className="absolute bottom-2 right-2 w-6 h-6 bg-success rounded-full border-4 border-background shadow-lg"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                title="Available for projects"
              />
            </motion.div>
          </div>

          {/* Name and Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              {t("name") || "Mustofa Amami"}
            </h1>

            <p className="text-xl lg:text-2xl text-text-secondary mb-8 max-w-2xl mx-auto">
              Full-Stack Developer & UI/UX Enthusiast
            </p>

            <p className="text-base lg:text-lg text-text-muted mb-12 max-w-xl mx-auto leading-relaxed">
              Passionate about creating beautiful, functional web experiences
              with modern technologies. Based in Jakarta, Indonesia.
            </p>
          </motion.div>

          {/* Contact Info Cards */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {[
              {
                icon: "📧",
                text: t("email") || "mustofaamami@email.com",
                label: "Email",
              },
              {
                icon: "📱",
                text: t("phone") || "+62 123 456 7890",
                label: "Phone",
              },
              { icon: "📍", text: "Jakarta, Indonesia", label: "Location" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className="group flex items-center gap-3 bg-card border border-border rounded-full px-6 py-3 hover:shadow-lg hover:border-secondary transition-all duration-300 cursor-pointer"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              >
                <motion.span
                  className="text-2xl group-hover:scale-110 transition-transform duration-300"
                  animate={{
                    rotate:
                      index === 0
                        ? [0, 10, -10, 0]
                        : index === 1
                        ? [0, 15, -15, 0]
                        : [0, 0, 0, 0],
                    y: index === 2 ? [0, -3, 3, 0] : [0, 0, 0, 0],
                  }}
                  transition={{
                    duration: 2 + index * 0.5,
                    repeat: Infinity,
                    repeatDelay: 3 + index,
                  }}
                >
                  {item.icon}
                </motion.span>
                <span className="text-text-muted text-sm font-medium group-hover:text-foreground transition-colors duration-300">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {[
              {
                href: "https://linkedin.com/in/mustofaamami",
                icon: FaLinkedin,
                label: "LinkedIn",
                color: "from-blue-600 to-blue-700",
                hoverColor: "from-blue-500 to-blue-600",
                shadowColor: "blue-500/25",
              },
              {
                href: "https://github.com/cakasuma",
                icon: FaGithub,
                label: "GitHub",
                color: "from-secondary to-warning",
                hoverColor: "from-warning to-secondary",
                shadowColor: "secondary/25",
              },
              {
                href: "https://twitter.com/mustofaamami",
                icon: FaTwitter,
                label: "Twitter",
                color: "from-sky-500 to-sky-600",
                hoverColor: "from-sky-400 to-sky-500",
                shadowColor: "sky-500/25",
              },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative w-14 h-14 bg-gradient-to-br ${social.color} rounded-xl flex items-center justify-center hover:shadow-lg hover:shadow-${social.shadowColor} transition-all duration-300 overflow-hidden`}
                whileHover={{ scale: 1.1, rotate: index % 2 === 0 ? 5 : -5 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Visit my ${social.label} profile`}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${social.hoverColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
                <social.icon className="text-white text-xl relative z-10 group-hover:scale-110 transition-transform duration-300" />
                <div
                  className={`absolute -inset-1 bg-gradient-to-r ${social.color} rounded-xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-300`}
                />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </HeroSection>

      {/* Main Content Sections */}
      <ContentGrid columns={2} className="mb-12">
        {/* About Section */}
        <AnimatedCard delay={0.2} direction="left">
          <header className="mb-6">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="text-secondary text-3xl">⚡</span>
              {t("about.title") || "About Me"}
            </h2>
          </header>
          <p className="text-text-secondary leading-relaxed mb-4">
            {t("about.content") ||
              "I'm a passionate full-stack developer with expertise in modern web technologies. I love creating seamless user experiences and robust backend systems."}
          </p>
          <p className="text-text-muted text-sm">
            Continuously learning and staying up-to-date with the latest
            industry trends and best practices.
          </p>
        </AnimatedCard>

        {/* Skills Section */}
        <AnimatedCard delay={0.3} direction="right">
          <header className="mb-6">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="text-warning text-3xl">🎯</span>
              {t("what-i-do.title") || "What I Do"}
            </h2>
          </header>
          <p className="text-text-secondary leading-relaxed mb-6">
            {t("what-i-do.content") ||
              "I specialize in building full-stack web applications using cutting-edge technologies and following industry best practices."}
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "React",
              "Next.js",
              "TypeScript",
              "Node.js",
              "Tailwind CSS",
              "PostgreSQL",
            ].map((skill) => (
              <motion.span
                key={skill}
                className="px-3 py-2 bg-accent text-foreground text-sm rounded-lg border border-border hover:border-secondary hover:bg-secondary/10 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </AnimatedCard>
      </ContentGrid>

      {/* Testimonials Section */}
      <Section
        delay={0.4}
        className="mb-12"
        id="testimonials"
        ariaLabel="Client testimonials"
      >
        <AnimatedCard>
          <header className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
              <span className="text-info text-3xl">💬</span>
              {t("testimonials.title") || "What Clients Say"}
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Trusted by clients and colleagues for delivering high-quality work
              and exceptional results.
            </p>
          </header>

          <ContentGrid columns={2} gap="md">
            <blockquote className="border-l-4 border-secondary pl-6 bg-accent/50 p-6 rounded-r-lg">
              <p className="text-text-secondary italic mb-4 leading-relaxed">
                &ldquo;Mustofa is an exceptional developer who consistently
                delivers high-quality work. His attention to detail and
                problem-solving skills are outstanding.&rdquo;
              </p>
              <cite className="text-secondary font-semibold text-sm">
                - Sarah Johnson, Project Manager
              </cite>
            </blockquote>

            <blockquote className="border-l-4 border-warning pl-6 bg-accent/50 p-6 rounded-r-lg">
              <p className="text-text-secondary italic mb-4 leading-relaxed">
                &ldquo;Working with Mustofa was a pleasure. He&apos;s
                professional, reliable, and his technical expertise helped bring
                our vision to life.&rdquo;
              </p>
              <cite className="text-warning font-semibold text-sm">
                - Alex Chen, Startup Founder
              </cite>
            </blockquote>
          </ContentGrid>
        </AnimatedCard>
      </Section>

      {/* Call to Action */}
      <CTASection
        title="Ready to work together?"
        description="Let's create something amazing together! I'm always excited to take on new challenges and bring innovative ideas to life."
        variant="primary"
      >
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link href={`/${lng}/contact`}>
            <Button variant="cta" size="lg">
              Get in Touch
            </Button>
          </Link>
          <Link href={`/${lng}/portfolio`}>
            <Button variant="outline" size="lg">
              View My Work
            </Button>
          </Link>
        </motion.div>
      </CTASection>
    </PageLayout>
  );
}
