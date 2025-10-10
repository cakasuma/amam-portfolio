"use client";
import { useTranslation } from "@/app/i18n/client";
import { use } from "react";
import PageLayout, {
  PageHeader,
  AnimatedCard,
  Section,
} from "@/app/components/PageLayout";

interface ResumeProps {
  params: Promise<{
    lng: string;
  }>;
}

export default function Resume({ params }: ResumeProps) {
  const { lng } = use(params);
  const { t } = useTranslation(lng, "resume");

  return (
    <PageLayout maxWidth="4xl">
      {/* Header */}
      <PageHeader
        title={t("title")}
        subtitle="Professional Experience & Skills"
      />

      {/* Resume Content */}
      <AnimatedCard delay={0.2} className="mb-12">
        {/* Personal Info */}
        <Section>
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
            <span className="text-primary">👤</span>
            {t("personal-info.title")}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-secondary">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-foreground min-w-[80px]">
                  {t("personal-info.name")}:
                </span>
                <span>Mustofa Amami</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-foreground min-w-[80px]">
                  {t("personal-info.email")}:
                </span>
                <span>mustofa.amami@email.com</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-foreground min-w-[80px]">
                  {t("personal-info.phone")}:
                </span>
                <span>+62 123 456 7890</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-foreground min-w-[80px]">
                  {t("personal-info.location")}:
                </span>
                <span>Jakarta, Indonesia</span>
              </div>
            </div>
          </div>
        </Section>

        {/* Skills */}
        <Section className="border-t border-border pt-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
            <span className="text-warning">⚡</span>
            {t("skills.title")}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="text-primary">🎨</span>
                {t("skills.frontend")}
              </h3>
              <div className="flex flex-wrap gap-3">
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
                    className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm border border-primary/20 font-medium transition-all duration-300 hover:bg-primary/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="text-info">⚙️</span>
                {t("skills.backend")}
              </h3>
              <div className="flex flex-wrap gap-3">
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
                    className="px-4 py-2 bg-info/10 text-info rounded-full text-sm border border-info/20 font-medium transition-all duration-300 hover:bg-info/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Experience */}
        <Section className="border-t border-border pt-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
            <span className="text-success">💼</span>
            {t("experience.title")}
          </h2>
          <div className="space-y-8">
            <div className="border-l-4 border-primary pl-6 py-2 transition-all duration-300 hover:border-primary/60">
              <h3 className="text-xl font-semibold text-foreground">
                {t("experience.job1.title")}
              </h3>
              <p className="text-primary font-medium text-lg">
                {t("experience.job1.company")}
              </p>
              <p className="text-muted text-sm mb-3">
                {t("experience.job1.period")}
              </p>
              <p className="text-secondary leading-relaxed">
                {t("experience.job1.description")}
              </p>
            </div>
            <div className="border-l-4 border-warning pl-6 py-2 transition-all duration-300 hover:border-warning/60">
              <h3 className="text-xl font-semibold text-foreground">
                {t("experience.job2.title")}
              </h3>
              <p className="text-warning font-medium text-lg">
                {t("experience.job2.company")}
              </p>
              <p className="text-muted text-sm mb-3">
                {t("experience.job2.period")}
              </p>
              <p className="text-secondary leading-relaxed">
                {t("experience.job2.description")}
              </p>
            </div>
          </div>
        </Section>

        {/* Education */}
        <Section className="border-t border-border pt-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
            <span className="text-info">🎓</span>
            {t("education.title")}
          </h2>
          <div className="border-l-4 border-info pl-6 py-2 transition-all duration-300 hover:border-info/60">
            <h3 className="text-xl font-semibold text-foreground">
              {t("education.degree")}
            </h3>
            <p className="text-info font-medium text-lg">
              {t("education.school")}
            </p>
            <p className="text-muted text-sm">{t("education.period")}</p>
          </div>
        </Section>
      </AnimatedCard>
    </PageLayout>
  );
}
