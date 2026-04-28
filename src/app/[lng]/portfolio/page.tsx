import Link from "next/link";
import Image from "next/image";
import PageLayout, {
  PageHeader,
  Section,
  ContentGrid,
  CTASection,
} from "@/app/components/PageLayout";
import { Card, CardContent, Button } from "@/components/ui";
import { FaExternalLinkAlt, FaGithub } from "@/components/icons";
import { usingTranslation } from "@/app/i18n";

interface PortfolioProps {
  params: Promise<{
    lng: string;
  }>;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Wedding Invitation - Rina & Amam",
    description:
      "A beautiful and elegant wedding invitation website featuring interactive RSVP system, event details, gallery, and guest management. Built with modern web technologies for a seamless mobile experience.",
    image: "/projects/wedding-invitation.svg",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    demoUrl: "https://wedding-rina-amam-invitation.vercel.app/",
    githubUrl: "https://github.com/cakasuma/wedding-rina-amam",
    featured: true,
  },
  {
    id: 2,
    title: "WeImpact",
    description:
      "A social impact platform connecting volunteers with meaningful causes and projects. Features include project listings, volunteer matching, impact tracking, and community engagement tools.",
    image: "/projects/weimpact.svg",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Firebase"],
    demoUrl: "https://weimpact.netlify.app/",
    githubUrl: "https://github.com/cakasuma/weimpact",
    featured: true,
  },
  {
    id: 3,
    title: "Astro TV Channels",
    description:
      "A comprehensive TV schedule browser for Astro channels with real-time program listings, search functionality, filtering options, and dark mode support. Built with React Hooks, MobX state management, and styled components.",
    image: "/projects/tv-channels.svg",
    technologies: ["React", "MobX", "Styled Components", "Axios", "React Router"],
    demoUrl: "https://my-tv-channels.netlify.app",
    githubUrl: "https://github.com/cakasuma/tv-channels",
    featured: true,
  },
  {
    id: 4,
    title: "Pacemaker FHIR Integration",
    description:
      "Healthcare data integration solution implementing FHIR standards for interoperability. Developed for HubSpot Pacemaker to streamline patient data exchange and medical records management.",
    image: "/projects/pacemaker-fhir.svg",
    technologies: ["React", "TypeScript", "FHIR API", "Node.js", "Healthcare Standards"],
    demoUrl: null,
    githubUrl: "https://github.com/cakasuma/hubspot-pacemaker",
    featured: true,
  },
  {
    id: 5,
    title: "Deriv",
    description:
      "Led transformative web initiatives at Deriv, a global fintech company. Spearheaded OAuth implementation across applications, managed partner onboarding and dashboard experience, architected new web platform using fullstack engineering with lowcode and AI tools, and supervised super app implementation to integrate onboarding and platform ecosystems.",
    image: "/projects/deriv.svg",
    technologies: ["React", "TypeScript", "OAuth", "Fullstack", "AI Tools", "Low-code"],
    demoUrl: "https://app.deriv.com",
    githubUrl: null,
    featured: false,
  },
  {
    id: 6,
    title: "MoneyLion",
    description:
      "Drove engineering excellence at MoneyLion, a leading fintech platform. Led organization-wide initiatives to enhance design system and monitoring infrastructure, built and documented mobile payment features using React Native, Redux, and Redux Saga, managed iOS and Android deployment pipelines, and maintained 99.9x% availability while ensuring exceptional code quality and architecture.",
    image: "/projects/moneylion.svg",
    technologies: ["React Native", "Redux", "Redux Saga", "iOS", "Android", "Mobile Payments"],
    demoUrl: "https://app.moneylion.com",
    githubUrl: null,
    featured: false,
  },
];

const webApps = [
  {
    id: 101,
    title: "Hijriah Calendar",
    description:
      "An Islamic Hijri calendar web app for easily checking today's Hijri date, month, and year. Hosted on a custom subdomain for quick access.",
    image: "/projects/hijriah.svg",
    technologies: ["JavaScript", "HTML", "CSS"],
    demoUrl: "https://hijriah.amammustofa.com",
    githubUrl: null,
  },
  {
    id: 102,
    title: "Faraid Calculator",
    description:
      "An Islamic inheritance (Faraid) calculator that computes the rightful share of each heir according to Islamic law. Helps families determine estate distribution quickly and accurately.",
    image: "/projects/calculator.svg",
    technologies: ["JavaScript", "HTML", "CSS"],
    demoUrl: "https://calculator.amammustofa.com",
    githubUrl: null,
  },
];

export default async function Portfolio({ params }: PortfolioProps) {
  const { lng } = await params;
  const { t } = await usingTranslation(lng, "portfolio");

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <PageLayout>
      <PageHeader
        title={t("title") || "Portfolio"}
        subtitle={t("subtitle") || "A showcase of my recent projects and creative work"}
        level={1}
      />

      <Section id="web-apps" ariaLabel="Web apps">
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <span className="text-secondary text-3xl">🌐</span>
            {t("web-apps.title") || "Web Apps"}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            {t("web-apps.description") ||
              "Small yet handy apps I built and host under my own subdomain at amammustofa.com"}
          </p>
        </div>

        <ContentGrid columns={2} gap="lg">
          {webApps.map((app) => (
            <Card key={app.id} className="group h-full" hover>
              <div className="relative h-48 bg-accent/30 rounded-t-xl mb-6 overflow-hidden">
                <Image
                  src={app.image}
                  alt={`${app.title} screenshot`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
              </div>

              <CardContent className="p-6">
                <header className="mb-4">
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors duration-200">
                    {app.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">{app.description}</p>
                </header>

                <div className="flex flex-wrap gap-2 mb-6">
                  {app.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm border border-secondary/20 font-medium hover:bg-secondary/20 transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <footer className="flex gap-3">
                  {app.demoUrl ? (
                    <a
                      href={app.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${app.title}`}
                      className="flex-1"
                    >
                      <Button variant="cta" size="sm" className="w-full">
                        <FaExternalLinkAlt className="w-3 h-3 mr-2" />
                        {t("view-demo") || "Live Demo"}
                      </Button>
                    </a>
                  ) : (
                    <Button variant="cta" size="sm" className="w-full opacity-50 cursor-not-allowed" disabled>
                      <FaExternalLinkAlt className="w-3 h-3 mr-2" />
                      {t("private-project") || "Private Project"}
                    </Button>
                  )}
                  {app.githubUrl ? (
                    <a
                      href={app.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View source code for ${app.title}`}
                      className="flex-1"
                    >
                      <Button variant="outline" size="sm" className="w-full">
                        <FaGithub className="w-3 h-3 mr-2" />
                        {t("view-code") || "GitHub"}
                      </Button>
                    </a>
                  ) : (
                    <Button variant="outline" size="sm" className="w-full opacity-50 cursor-not-allowed" disabled>
                      <FaGithub className="w-3 h-3 mr-2" />
                      {t("private-repo") || "Private Repo"}
                    </Button>
                  )}
                </footer>
              </CardContent>
            </Card>
          ))}
        </ContentGrid>
      </Section>

      <Section id="professional-experience" ariaLabel="Professional experience">
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <span className="text-warning text-3xl">🚀</span>
            {t("other-projects.title") || "Professional Experience"}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            {t("other-projects.description") ||
              "Companies where I've led impactful initiatives and built innovative solutions at scale"}
          </p>
        </div>

        <ContentGrid columns={2} gap="lg">
          {otherProjects.map((project) => (
            <Card key={project.id} className="group h-full" hover>
              <div className="relative h-48 bg-accent/30 rounded-t-xl mb-6 overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.title} project screenshot`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-60"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
              </div>

              <CardContent className="p-6">
                <header className="mb-4">
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">{project.description}</p>
                </header>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-warning/10 text-warning rounded-full text-sm border border-warning/20 font-medium hover:bg-warning/20 transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <footer className="flex gap-3">
                  {project.demoUrl ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View demo of ${project.title}`}
                      className="flex-1"
                    >
                      <Button variant="cta" size="sm" className="w-full">
                        <FaExternalLinkAlt className="w-3 h-3 mr-2" />
                        {t("view-demo") || "Live Demo"}
                      </Button>
                    </a>
                  ) : (
                    <Button variant="cta" size="sm" className="w-full opacity-50 cursor-not-allowed" disabled>
                      <FaExternalLinkAlt className="w-3 h-3 mr-2" />
                      {t("private-project") || "Private Project"}
                    </Button>
                  )}
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View code for ${project.title}`}
                      className="flex-1"
                    >
                      <Button variant="outline" size="sm" className="w-full">
                        <FaGithub className="w-3 h-3 mr-2" />
                        {t("view-code") || "GitHub"}
                      </Button>
                    </a>
                  ) : (
                    <Button variant="outline" size="sm" className="w-full opacity-50 cursor-not-allowed" disabled>
                      <FaGithub className="w-3 h-3 mr-2" />
                      {t("private-repo") || "Private Repo"}
                    </Button>
                  )}
                </footer>
              </CardContent>
            </Card>
          ))}
        </ContentGrid>
      </Section>

      <Section id="featured-projects" ariaLabel="Featured projects">
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <span className="text-secondary text-3xl">⭐</span>
            {t("featured-projects.title") || "Featured Projects"}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            {t("featured-projects.description") ||
              "Highlighting some of my most impactful and technically challenging projects"}
          </p>
        </div>

        <ContentGrid columns={2} gap="lg">
          {featuredProjects.map((project) => (
            <Card key={project.id} className="group h-full" hover>
              <div className="relative h-48 bg-accent/30 rounded-t-xl mb-6 overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.title} project screenshot`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-60"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
                    {t("featured") || "Featured"}
                  </span>
                </div>
              </div>

              <CardContent className="p-6">
                <header className="mb-4">
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">{project.description}</p>
                </header>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm border border-secondary/20 font-medium hover:bg-secondary/20 transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <footer className="flex gap-3">
                  {project.demoUrl ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View live demo of ${project.title}`}
                      className="flex-1"
                    >
                      <Button variant="cta" size="sm" className="w-full">
                        <FaExternalLinkAlt className="w-3 h-3 mr-2" />
                        {t("view-demo") || "Live Demo"}
                      </Button>
                    </a>
                  ) : (
                    <Button variant="cta" size="sm" className="w-full opacity-50 cursor-not-allowed" disabled>
                      <FaExternalLinkAlt className="w-3 h-3 mr-2" />
                      {t("private-project") || "Private Project"}
                    </Button>
                  )}
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View source code for ${project.title}`}
                      className="flex-1"
                    >
                      <Button variant="outline" size="sm" className="w-full">
                        <FaGithub className="w-3 h-3 mr-2" />
                        {t("view-code") || "GitHub"}
                      </Button>
                    </a>
                  ) : (
                    <Button variant="outline" size="sm" className="w-full opacity-50 cursor-not-allowed" disabled>
                      <FaGithub className="w-3 h-3 mr-2" />
                      {t("private-repo") || "Private Repo"}
                    </Button>
                  )}
                </footer>
              </CardContent>
            </Card>
          ))}
        </ContentGrid>
      </Section>

      <CTASection
        title={t("cta.title") || "Interested in working together?"}
        description={
          t("cta.description") ||
          "I'm always excited to take on new challenges and collaborate on innovative projects. Let's discuss how we can bring your ideas to life!"
        }
        variant="primary"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href={`/${lng}/contact`} prefetch={true}>
            <Button variant="cta" size="lg">
              {t("cta.button") || "Get in Touch"}
            </Button>
          </Link>
          <Link href={`/${lng}/resume`} prefetch={true}>
            <Button variant="outline" size="lg">
              {t("view-resume") || "View Resume"}
            </Button>
          </Link>
        </div>
      </CTASection>
    </PageLayout>
  );
}
