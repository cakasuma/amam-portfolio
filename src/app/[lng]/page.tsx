import Link from "next/link";
import Image from "next/image";
import { FaLinkedin, FaGithub, FaTwitter } from "@/components/icons";
import PageLayout, {
  AnimatedCard,
  Section,
  HeroSection,
  ContentGrid,
  CTASection,
} from "@/app/components/PageLayout";
import { Button } from "@/components/ui";
import { usingTranslation } from "@/app/i18n";

interface HomeProps {
  params: Promise<{
    lng: string;
  }>;
}

export default async function Home({ params }: HomeProps) {
  const { lng } = await params;
  const { t } = await usingTranslation(lng);

  const contactInfo = [
    {
      icon: "📧",
      text: t("email") || "amammustofa@gmail.com",
      label: t("contact-info.email-label") || "Email",
      href: "mailto:amammustofa@gmail.com",
    },
    {
      icon: "📱",
      text: t("phone") || "+60 10-844 4970",
      label: t("contact-info.phone-label") || "Phone",
      href: "https://wa.me/60108444970",
    },
    {
      icon: "📍",
      text: t("location") || "Kuala Lumpur, Malaysia",
      label: t("contact-info.location-label") || "Location",
      href: "https://maps.google.com/?q=Kuala+Lumpur,+Malaysia",
    },
  ];

  const socialLinks = [
    {
      href: "https://www.linkedin.com/in/mustofa-ghaleb-amami?originalSubdomain=my",
      icon: FaLinkedin,
      label: "LinkedIn",
      color: "from-blue-600 to-blue-700",
      hoverColor: "from-blue-500 to-blue-600",
    },
    {
      href: "https://github.com/cakasuma",
      icon: FaGithub,
      label: "GitHub",
      color: "bg-github border-2 border-github",
      hoverColor: "bg-github-hover border-github-hover",
    },
    {
      href: "https://x.com/cakasuma",
      icon: FaTwitter,
      label: "Twitter",
      color: "from-sky-500 to-sky-600",
      hoverColor: "from-sky-400 to-sky-500",
    },
  ];

  const skills = ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "PostgreSQL"];

  return (
    <PageLayout>
      <HeroSection animate={false}>
        <div>
          <div className="relative w-48 h-48 lg:w-56 lg:h-56 mx-auto mb-8">
            <div className="relative w-full h-full">
              <Image
                src="/image-amam.png"
                alt="Mustofa Amami - Full-Stack Developer Portrait"
                width={224}
                height={224}
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 192px, 224px"
                className="rounded-full border-4 border-secondary object-cover shadow-lg w-full h-full"
                style={{ objectPosition: "center 15%" }}
              />
              <span
                className="absolute bottom-4 right-5 lg:right-7 w-7 h-7 bg-success rounded-full border-4 border-background shadow-lg animate-pulse"
                title="Available for projects"
              />
            </div>
          </div>

          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              {t("name") || "Mustofa Amami"}
            </h1>

            <p className="text-xl lg:text-2xl text-text-secondary mb-8 max-w-2xl mx-auto">
              {t("role") || "Full-Stack Developer & UI/UX Enthusiast"}
            </p>

            <p className="text-base lg:text-lg text-text-muted mb-12 max-w-xl mx-auto leading-relaxed">
              {t("hero-description") ||
                "Passionate about creating beautiful, functional web experiences with modern technologies. Based in Jakarta, Indonesia."}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {contactInfo.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.label === "Location" ? "_blank" : undefined}
                rel={item.label === "Location" ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-3 bg-card border border-border rounded-full px-6 py-3 hover:shadow-lg hover:border-secondary transition-all duration-200 cursor-pointer border-runner active:scale-95"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </span>
                <span className="text-text-muted text-sm font-medium group-hover:text-foreground transition-colors duration-200">
                  {item.text}
                </span>
              </a>
            ))}
          </div>

          <div className="flex justify-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative w-14 h-14 ${
                  social.label === "GitHub"
                    ? social.color
                    : `bg-gradient-to-br ${social.color}`
                } rounded-xl flex items-center justify-center hover:shadow-lg transition-all duration-200 overflow-hidden active:scale-95`}
                aria-label={`Visit my ${social.label} profile`}
              >
                {social.label !== "GitHub" && (
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${social.hoverColor} opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
                  />
                )}
                {social.label === "GitHub" && (
                  <div
                    className={`absolute inset-0 ${social.hoverColor} opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl`}
                  />
                )}
                <social.icon
                  className={`${
                    social.label === "GitHub" ? "text-foreground" : "text-white"
                  } text-xl relative z-10 group-hover:scale-110 transition-transform duration-200`}
                />
              </a>
            ))}
          </div>
        </div>
      </HeroSection>

      <ContentGrid columns={2} className="mb-12">
        <AnimatedCard direction="left" animate={false}>
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
            {t("about.learning") ||
              "Continuously learning and staying up-to-date with the latest industry trends and best practices."}
          </p>
        </AnimatedCard>

        <AnimatedCard direction="right" animate={false}>
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
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-2 bg-accent text-foreground text-sm rounded-lg border border-border transition-all duration-200 hover:border-foreground active:scale-95"
              >
                {skill}
              </span>
            ))}
          </div>
        </AnimatedCard>
      </ContentGrid>

      <Section
        className="mb-12"
        id="testimonials"
        ariaLabel="Client testimonials"
        animate={false}
      >
        <AnimatedCard animate={false}>
          <header className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
              <span className="text-info text-3xl">💬</span>
              {t("testimonials.title") || "What Clients Say"}
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              {t("testimonials.trusted") ||
                "Trusted by clients and colleagues for delivering high-quality work and exceptional results."}
            </p>
          </header>

          <ContentGrid columns={2} gap="md">
            <blockquote className="border-l-4 border-secondary pl-6 bg-accent/50 p-6 rounded-r-lg">
              <p className="text-text-secondary italic mb-4 leading-relaxed">
                &ldquo;
                {t("testimonials.quote1") ||
                  "Mustofa is an exceptional developer who consistently delivers high-quality work. His attention to detail and problem-solving skills are outstanding."}
                &rdquo;
              </p>
              <cite className="text-secondary font-semibold text-sm">
                - {t("testimonials.author1") || "Sarah Johnson, Project Manager"}
              </cite>
            </blockquote>

            <blockquote className="border-l-4 border-warning pl-6 bg-accent/50 p-6 rounded-r-lg">
              <p className="text-text-secondary italic mb-4 leading-relaxed">
                &ldquo;
                {t("testimonials.quote2") ||
                  "Working with Mustofa was a pleasure. He's professional, reliable, and his technical expertise helped bring our vision to life."}
                &rdquo;
              </p>
              <cite className="text-secondary font-semibold text-sm">
                - {t("testimonials.author2") || "Alex Chen, Startup Founder"}
              </cite>
            </blockquote>
          </ContentGrid>
        </AnimatedCard>
      </Section>

      <CTASection
        title={t("cta.title") || "Ready to work together?"}
        description={
          t("cta.description") ||
          "Let's create something amazing together! I'm always excited to take on new challenges and bring innovative ideas to life."
        }
        variant="primary"
        animate={false}
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href={`/${lng}/contact`} prefetch={true}>
            <Button variant="cta" size="lg" className="cursor-pointer">
              {t("cta.get-in-touch") || "Get in Touch"}
            </Button>
          </Link>
          <Link href={`/${lng}/portfolio`} prefetch={true}>
            <Button variant="outline" size="lg" className="cursor-pointer">
              {t("cta.view-my-work") || "View My Work"}
            </Button>
          </Link>
        </div>
      </CTASection>
    </PageLayout>
  );
}
