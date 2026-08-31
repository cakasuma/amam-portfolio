import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaLinkedin, FaGithub, FaTwitter, FaWhatsapp } from "@/components/icons";
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
      // The link has always gone to wa.me, so a generic phone glyph was
      // mis-signalling where it lands. `--success` rather than WhatsApp's own
      // green: `theming` wants colour to come from the token set, and at this
      // size it reads the same.
      icon: <FaWhatsapp className="text-success" aria-hidden="true" />,
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

  const skills = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Tailwind CSS",
    "PostgreSQL",
  ];

  // Onward paths for a visitor who is interested but not ready to make contact.
  // The closing CTA is the only exit otherwise, and by then the nav is far
  // above them.
  const exploreLinks = [
    {
      href: `/${lng}/resume`,
      icon: "\u{1F4C4}",
      title: t("explore.resume-title") || "Résumé",
      description:
        t("explore.resume-description") ||
        "The roles, the stack, and what I actually shipped in each.",
    },
    {
      href: `/${lng}/portfolio`,
      icon: "\u{1F4BC}",
      title: t("explore.portfolio-title") || "Portfolio",
      description:
        t("explore.portfolio-description") ||
        "Projects I have built, with the problem each one set out to solve.",
    },
    {
      href: `/${lng}/blog`,
      icon: "\u{1F4DD}",
      title: t("explore.blog-title") || "Blog",
      description:
        t("explore.blog-description") ||
        "Notes on engineering, leading a team, and teaching.",
    },
  ];

  return (
    <PageLayout>
      <HeroSection animate={false}>
        {/*
          The hero is sized to the usable viewport — the space below the sticky
          header and above the mobile nav — with the identity centred in it and
          the scroll cue at its foot. That is the point: the fold lands on a
          section boundary instead of slicing whatever happened to be there,
          and the cue is on the first screen rather than 400px below it.

          Measured before this: the hero wanted 1054-1134px against 573-771px
          of usable height, overrunning on every phone AND on a 1440x900
          desktop, because it carried the bio and the contact details as well
          as the identity. Those moved to #intro, directly below. The `14rem` /
          `15rem` allowances are the real chrome: 72px header + 89px mobile nav
          + 64px page padding on small screens, 94px header + 128px padding on
          large.

          Within the hero, each `hero-plane` lags the scroll by its own
          `--parallax-y` over the first viewport of scrolling, so the hero
          gently compresses as it leaves rather than sliding away as one flat
          sheet. Only the decorative glow animates opacity — copy the visitor
          may still be reading is displaced, never faded. All of it is
          suppressed for `prefers-reduced-motion: reduce` and for browsers
          without scroll timelines; see `globals.css`.
        */}
        <div className="flex flex-col min-h-[calc(100svh-14rem)] lg:min-h-[calc(100svh-15rem)]">
          <div className="flex flex-1 flex-col justify-center">
            <div
              className="hero-plane relative w-48 h-48 sm:w-52 sm:h-52 lg:w-60 lg:h-60 mx-auto mb-6 lg:mb-8"
              style={
                {
                  "--parallax-y": "40px",
                  "--parallax-scale": "0.97",
                } as CSSProperties
              }
            >
              {/* Furthest plane: a glow that blooms and drifts out from behind
                the portrait, giving the photo something to have depth against.
                It sits inside the portrait's plane, so these values compose on
                top of the parent's — 32px here lands at 72px of total lag. */}
              <div
                aria-hidden="true"
                className="hero-plane pointer-events-none absolute -inset-10 rounded-full"
                style={
                  {
                    "--parallax-y": "32px",
                    "--parallax-scale": "1.12",
                    "--parallax-opacity": "0.4",
                    backgroundImage:
                      "radial-gradient(circle, color-mix(in srgb, var(--secondary) 26%, transparent) 0%, transparent 68%)",
                  } as CSSProperties
                }
              />
              <div className="relative w-full h-full">
                <Image
                  src="/image-amam.png"
                  alt="Mustofa Amami - Full-Stack Developer Portrait"
                  width={240}
                  height={240}
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 640px) 192px, (max-width: 1024px) 208px, 240px"
                  className="rounded-full border-4 border-secondary object-cover shadow-lg w-full h-full"
                  style={{ objectPosition: "center 15%" }}
                />
                <span
                  className="absolute bottom-4 right-5 lg:right-7 w-7 h-7 bg-success rounded-full border-4 border-background shadow-lg animate-pulse"
                  title="Available for projects"
                />
              </div>
            </div>

            <div
              className="hero-plane"
              style={{ "--parallax-y": "22px" } as CSSProperties}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                {t("name") || "Mustofa Amami"}
              </h1>

              <p className="text-xl lg:text-2xl text-text-secondary max-w-2xl mx-auto">
                {t("role") || "Full-Stack Developer & UI/UX Enthusiast"}
              </p>
            </div>
          </div>

          {/*
            A real anchor, not a decorative flourish: operable, present in the
            accessibility tree, and working under reduced motion and without
            scroll-timeline support. The bob is decoration on top of a link
            that works without it.
          */}
          <a
            href="#intro"
            className="group mx-auto mt-8 inline-flex min-h-11 flex-col items-center gap-2 rounded-full px-6 py-3 text-text-muted transition-colors duration-200 hover:text-foreground hover:bg-card/60"
          >
            <span className="text-base lg:text-sm font-medium tracking-wide">
              {t("scroll-cue") || "Scroll to read on"}
            </span>
            <span
              aria-hidden="true"
              className="scroll-cue-arrow text-2xl lg:text-xl leading-none"
            >
              ↓
            </span>
          </a>
        </div>
      </HeroSection>

      {/* What the hero used to carry. First thing below the fold, so the cue
          has somewhere real to land — and the payoff for scrolling, so it gets
          depth of its own: the block lags as it crosses the viewport while its
          three parts rise in sequence. The lag is on the wrapper and the rises
          are on the children, because two animations on one element would both
          be driving `transform` and the later would simply win. */}
      <Section
        className="mb-12"
        id="intro"
        ariaLabel="Introduction"
        animate={false}
      >
        <div
          className="parallax-drift"
          style={{ "--parallax-y": "26px" } as CSSProperties}
        >
          <p className="reveal-on-scroll text-base lg:text-lg text-text-muted mb-8 lg:mb-10 max-w-2xl mx-auto text-center leading-relaxed">
            {t("hero-description") ||
              "Passionate about creating beautiful, functional web experiences with modern technologies. Based in Jakarta, Indonesia."}
          </p>

          {/* No `hero-plane` here any more: that timeline is ranged to the first
            viewport of scrolling, so below the fold it would only hold a dead
            10px offset. */}
          <div
            className="reveal-on-scroll flex flex-wrap justify-center gap-4 mb-8 lg:mb-12"
            style={{ "--reveal-start": "20%" } as CSSProperties}
          >
            {contactInfo.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.label === "Location" ? "_blank" : undefined}
                rel={
                  item.label === "Location" ? "noopener noreferrer" : undefined
                }
                className="group flex items-center gap-3 bg-card border border-border rounded-full px-6 py-3 hover:shadow-lg hover:border-secondary transition-all duration-200 cursor-pointer border-runner active:scale-95"
              >
                <span className="flex items-center justify-center text-2xl leading-none group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </span>
                <span className="text-text-muted text-sm font-medium group-hover:text-foreground transition-colors duration-200">
                  {item.text}
                </span>
              </a>
            ))}
          </div>

          <div
            className="reveal-on-scroll flex justify-center gap-6"
            style={{ "--reveal-start": "32%" } as CSSProperties}
          >
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
      </Section>

      <ContentGrid columns={2} className="mb-12" id="about">
        <AnimatedCard direction="left" reveal>
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

        {/* Staggered a little behind its neighbour so the pair reads as two
            beats rather than one. */}
        <AnimatedCard direction="right" reveal revealStart={25}>
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
        reveal
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
                -{" "}
                {t("testimonials.author1") || "Sarah Johnson, Project Manager"}
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

      <Section className="mb-12" ariaLabel="Keep exploring" reveal>
        <header className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">
            {t("explore.title") || "Keep exploring"}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            {t("explore.description") ||
              "Not ready to get in touch yet? There is more to look through."}
          </p>
        </header>

        <ContentGrid columns={3} gap="md">
          {exploreLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={true}
              className="group flex flex-col gap-2 rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-secondary hover:shadow-lg active:scale-[0.99]"
            >
              <span aria-hidden="true" className="text-2xl">
                {item.icon}
              </span>
              <span className="flex items-center gap-2 text-lg font-semibold text-foreground">
                {item.title}
                <span
                  aria-hidden="true"
                  className="text-secondary transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
              <span className="text-sm text-text-muted leading-relaxed">
                {item.description}
              </span>
            </Link>
          ))}
        </ContentGrid>
      </Section>

      <CTASection
        title={t("cta.title") || "Ready to work together?"}
        description={
          t("cta.description") ||
          "Let's create something amazing together! I'm always excited to take on new challenges and bring innovative ideas to life."
        }
        variant="primary"
        reveal
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
