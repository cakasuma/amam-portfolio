import PageLayout, {
  PageHeader,
  Section,
  ContentGrid,
} from "@/app/components/PageLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { Button } from "@/components/ui";
import { FaDownload } from "@/components/icons";
import { usingTranslation } from "@/app/i18n";
import {
  EXPERIENCE_ENTRIES,
  HIGHLIGHT_KEYS,
  CERTIFICATION_KEYS,
  SKILL_GROUPS,
} from "@/lib/resume-data";

interface ResumeProps {
  params: Promise<{
    lng: string;
  }>;
}

// Tailwind needs literal class names, so map the semantic accent to concrete
// utilities rather than interpolating the colour into the string.
const ACCENT_CLASSES = {
  secondary: { border: "border-secondary hover:border-secondary/80", text: "text-secondary" },
  info: { border: "border-info hover:border-info/80", text: "text-info" },
  warning: { border: "border-warning hover:border-warning/80", text: "text-warning" },
  success: { border: "border-success hover:border-success/80", text: "text-success" },
};

export default async function Resume({ params }: ResumeProps) {
  const { lng } = await params;
  const { t } = await usingTranslation(lng, "resume");

  return (
    <PageLayout maxWidth="4xl">
      <PageHeader
        title={t("title") || "Professional Resume"}
        subtitle={t("subtitle") || "Experience, Skills, and Professional Journey"}
        level={1}
      >
        <a href={`/api/resume/pdf?lng=${lng}`} download>
          <Button variant="cta" size="md" className="inline-flex items-center gap-2">
            <FaDownload className="w-4 h-4" />
            {t("download-pdf") || "Download PDF"}
          </Button>
        </a>
      </PageHeader>

      <Section id="summary" ariaLabel="Professional summary">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <span className="text-secondary text-3xl">👋</span>
              {t("summary.title") || "Profile"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-text-secondary leading-relaxed text-lg">
              {t("summary.content")}
            </p>
          </CardContent>
        </Card>
      </Section>

      <Section id="highlights" ariaLabel="Career highlights">
        <ContentGrid columns={2} gap="md">
          {HIGHLIGHT_KEYS.map((key) => (
            <div
              key={key}
              className="p-6 bg-accent/40 rounded-lg border border-border text-center transition-all duration-300 hover:bg-accent/60"
            >
              <p className="text-3xl md:text-4xl font-bold text-secondary mb-2">
                {t(`highlights.${key}.value`)}
              </p>
              <p className="text-text-secondary text-sm leading-snug">
                {t(`highlights.${key}.label`)}
              </p>
            </div>
          ))}
        </ContentGrid>
      </Section>

      <Section id="experience" ariaLabel="Professional experience">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <span className="text-success text-3xl">💼</span>
              {t("experience.title") || "Professional Experience"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {EXPERIENCE_ENTRIES.map(({ key, accent }) => {
                const bullets = t(`experience.${key}.bullets`, {
                  returnObjects: true,
                }) as unknown as string[];

                return (
                  <article
                    key={key}
                    className={`border-l-4 ${ACCENT_CLASSES[accent].border} pl-6 py-4 bg-accent/30 rounded-r-lg transition-all duration-300 hover:bg-accent/50`}
                  >
                    <header>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {t(`experience.${key}.title`)}
                      </h3>
                      <p
                        className={`${ACCENT_CLASSES[accent].text} font-medium text-lg mb-1`}
                      >
                        {t(`experience.${key}.company`)}
                      </p>
                      <p className="text-text-muted text-sm mb-3">
                        {t(`experience.${key}.period`)}
                      </p>
                    </header>
                    {Array.isArray(bullets) && (
                      <ul className="space-y-2">
                        {bullets.map((bullet, index) => (
                          <li
                            key={index}
                            className="text-text-secondary leading-relaxed flex gap-3"
                          >
                            <span
                              className={`${ACCENT_CLASSES[accent].text} mt-1.5 shrink-0`}
                              aria-hidden="true"
                            >
                              •
                            </span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </Section>

      <Section id="skills" ariaLabel="Technical skills">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <span className="text-warning text-3xl">⚡</span>
              {t("skills.title") || "Technical Skills"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {SKILL_GROUPS.map((group) => (
                <div key={group.labelKey}>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {t(group.labelKey)}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm border border-secondary/20 font-medium transition-all duration-300 hover:bg-secondary/20 hover:border-secondary/40"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </Section>

      <Section id="education" ariaLabel="Educational background">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <span className="text-info text-3xl">🎓</span>
              {t("education.title") || "Education"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <article className="border-l-4 border-info pl-6 py-4 bg-accent/30 rounded-r-lg transition-all duration-300 hover:border-info/80 hover:bg-accent/50">
              <header>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {t("education.degree")}
                </h3>
                <p className="text-info font-medium text-lg mb-1">
                  {t("education.school")}
                </p>
                <p className="text-text-muted text-sm mb-3">{t("education.period")}</p>
              </header>
              <p className="text-text-secondary leading-relaxed">
                {t("education.detail")}
              </p>
            </article>
          </CardContent>
        </Card>
      </Section>

      <Section id="writing" ariaLabel="Writing and community involvement">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <span className="text-secondary text-3xl">✍️</span>
              {t("writing.title") || "Writing & Community"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-text-secondary leading-relaxed mb-6">
              {t("writing.content")}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://dev.to/cakasuma"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-accent/50 text-foreground rounded-lg border border-border text-sm font-medium transition-all duration-300 hover:bg-accent hover:border-foreground"
              >
                {t("writing.devto")}
              </a>
              <a
                href="https://github.com/cakasuma"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-accent/50 text-foreground rounded-lg border border-border text-sm font-medium transition-all duration-300 hover:bg-accent hover:border-foreground"
              >
                {t("writing.github")}
              </a>
            </div>
          </CardContent>
        </Card>
      </Section>

      <Section id="certifications" ariaLabel="Professional certifications">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <span className="text-secondary text-3xl">🏆</span>
              {t("certifications.title") || "Certifications & Achievements"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ContentGrid columns={2} gap="md">
              {CERTIFICATION_KEYS.map((key) => (
                <div
                  key={key}
                  className="p-4 bg-accent/50 rounded-lg border border-border"
                >
                  <h4 className="font-semibold text-foreground mb-2">
                    {t(`certifications.${key}.name`)}
                  </h4>
                  <p className="text-text-muted text-sm">
                    {t(`certifications.${key}.issuer`)} •{" "}
                    {t(`certifications.${key}.year`)}
                  </p>
                </div>
              ))}
            </ContentGrid>
          </CardContent>
        </Card>
      </Section>
    </PageLayout>
  );
}
