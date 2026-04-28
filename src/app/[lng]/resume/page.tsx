import PageLayout, {
  PageHeader,
  Section,
  ContentGrid,
} from "@/app/components/PageLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { usingTranslation } from "@/app/i18n";

interface ResumeProps {
  params: Promise<{
    lng: string;
  }>;
}

export default async function Resume({ params }: ResumeProps) {
  const { lng } = await params;
  const { t } = await usingTranslation(lng, "resume");

  return (
    <PageLayout maxWidth="4xl">
      <PageHeader
        title={t("title") || "Professional Resume"}
        subtitle={t("subtitle") || "Experience, Skills, and Professional Journey"}
        level={1}
      />

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
              <article className="border-l-4 border-secondary pl-6 py-4 bg-accent/30 rounded-r-lg transition-all duration-300 hover:border-secondary/80 hover:bg-accent/50">
                <header>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {t("experience.job1.title") || "Senior Full-Stack Developer"}
                  </h3>
                  <p className="text-secondary font-medium text-lg mb-1">
                    {t("experience.job1.company") || "Tech Company Inc."}
                  </p>
                  <p className="text-text-muted text-sm mb-3">
                    {t("experience.job1.period") || "2022 - Present"}
                  </p>
                </header>
                <p className="text-text-secondary leading-relaxed">
                  {t("experience.job1.description") ||
                    "Led development of multiple full-stack applications using modern technologies. Collaborated with cross-functional teams to deliver high-quality software solutions."}
                </p>
              </article>

              <article className="border-l-4 border-warning pl-6 py-4 bg-accent/30 rounded-r-lg transition-all duration-300 hover:border-warning/80 hover:bg-accent/50">
                <header>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {t("experience.job2.title") || "Frontend Developer"}
                  </h3>
                  <p className="text-warning font-medium text-lg mb-1">
                    {t("experience.job2.company") || "Digital Agency"}
                  </p>
                  <p className="text-text-muted text-sm mb-3">
                    {t("experience.job2.period") || "2020 - 2022"}
                  </p>
                </header>
                <p className="text-text-secondary leading-relaxed">
                  {t("experience.job2.description") ||
                    "Developed responsive web applications and user interfaces. Worked closely with designers to implement pixel-perfect designs and ensure excellent user experience."}
                </p>
              </article>

              <article className="border-l-4 border-info pl-6 py-4 bg-accent/30 rounded-r-lg transition-all duration-300 hover:border-info/80 hover:bg-accent/50">
                <header>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {t("experience.job3.title") || "Senior Mobile Engineer"}
                  </h3>
                  <p className="text-info font-medium text-lg mb-1">
                    {t("experience.job3.company") || "MoneyLion"}
                  </p>
                  <p className="text-text-muted text-sm mb-3">
                    {t("experience.job3.period") || "October 2021 - September 2023"}
                  </p>
                </header>
                <p className="text-text-secondary leading-relaxed">
                  {t("experience.job3.description") ||
                    "Worked closely with managers, backend, and testers to ensure payment flows and features run smoothly."}
                </p>
              </article>

              <article className="border-l-4 border-success pl-6 py-4 bg-accent/30 rounded-r-lg transition-all duration-300 hover:border-success/80 hover:bg-accent/50">
                <header>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {t("experience.job4.title") || "Software Engineering Lecturer"}
                  </h3>
                  <p className="text-success font-medium text-lg mb-1">
                    {t("experience.job4.company") || "RevoU"}
                  </p>
                  <p className="text-text-muted text-sm mb-3">
                    {t("experience.job4.period") || "Part-time"}
                  </p>
                </header>
                <p className="text-text-secondary leading-relaxed">
                  {t("experience.job4.description") ||
                    "Coaching and mentoring software engineering students, sharing practical insights from industry experience."}
                </p>
              </article>
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
                  {t("education.degree") || "Bachelor of Computer Science"}
                </h3>
                <p className="text-info font-medium text-lg mb-1">
                  {t("education.school") || "University of Technology"}
                </p>
                <p className="text-text-muted text-sm">
                  {t("education.period") || "2016 - 2020"}
                </p>
              </header>
            </article>
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
            <ContentGrid columns={2} gap="lg">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-secondary text-2xl">🎨</span>
                  {t("skills.frontend") || "Frontend Development"}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3"].map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm border border-secondary/20 font-medium transition-all duration-300 hover:bg-secondary/20 hover:border-secondary/40"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-info text-2xl">⚙️</span>
                  {t("skills.backend") || "Backend Development"}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs", "GraphQL"].map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-info/10 text-info rounded-full text-sm border border-theme-accent font-medium transition-all duration-300 hover:bg-info/20 hover:border-info/40"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ContentGrid>
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
              <div className="p-4 bg-accent/50 rounded-lg border border-border">
                <h4 className="font-semibold text-foreground mb-2">
                  {t("certifications.cert1.name") || "Javascript (Intermediate)"}
                </h4>
                <p className="text-text-muted text-sm">
                  {t("certifications.cert1.issuer") || "Team HackerRank"} •{" "}
                  {t("certifications.cert1.year") || "2021"}
                </p>
              </div>
              <div className="p-4 bg-accent/50 rounded-lg border border-border">
                <h4 className="font-semibold text-foreground mb-2">
                  {t("certifications.cert2.name") || "DEV401 Salesforce Platform App Builder"}
                </h4>
                <p className="text-text-muted text-sm">
                  {t("certifications.cert2.issuer") || "Salesforce"} •{" "}
                  {t("certifications.cert2.year") || "2017"}
                </p>
              </div>
              <div className="p-4 bg-accent/50 rounded-lg border border-border">
                <h4 className="font-semibold text-foreground mb-2">
                  {t("certifications.cert3.name") || "Microsoft Azure Fundamentals"}
                </h4>
                <p className="text-text-muted text-sm">
                  {t("certifications.cert3.issuer") || "Microsoft"} •{" "}
                  {t("certifications.cert3.year") || "2017"}
                </p>
              </div>
            </ContentGrid>
          </CardContent>
        </Card>
      </Section>
    </PageLayout>
  );
}
